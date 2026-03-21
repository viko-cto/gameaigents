import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { isAlphaUserAllowed } from '@/src/lib/auth/env.mjs';
import { buildSignInHref, DEFAULT_APP_REDIRECT } from '@/src/lib/auth/guards.mjs';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const nextPath = requestUrl.searchParams.get('next') || DEFAULT_APP_REDIRECT;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.redirect(new URL(buildSignInHref({ reason: 'config-missing', nextPath }), request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL(buildSignInHref({ reason: 'missing-code', nextPath }), request.url));
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  await supabase.auth.exchangeCodeForSession(code);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAlphaUserAllowed(user)) {
    return NextResponse.redirect(new URL(buildSignInHref({ reason: 'not-allowed', nextPath }), request.url));
  }

  return NextResponse.redirect(new URL(nextPath, request.url));
}
