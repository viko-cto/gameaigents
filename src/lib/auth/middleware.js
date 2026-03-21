import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

import { getAuthConfigStatus, isAlphaUserAllowed } from '@/src/lib/auth/env.mjs';
import { buildSignInHref, DEFAULT_APP_REDIRECT, isPublicPath } from '@/src/lib/auth/guards.mjs';

export async function enforceAlphaAuth(request) {
  const { pathname, search } = request.nextUrl;
  const authConfig = getAuthConfigStatus();
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (!authConfig.hasSupabaseUrl || !authConfig.hasSupabaseAnonKey) {
    if (isPublicPath(pathname)) {
      return response;
    }

    return NextResponse.redirect(
      new URL(buildSignInHref({ reason: 'config-missing', nextPath: `${pathname}${search}` }), request.url),
    );
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nextPath = pathname === '/' ? DEFAULT_APP_REDIRECT : `${pathname}${search}`;

  if (!user) {
    if (isPublicPath(pathname)) {
      return response;
    }

    return NextResponse.redirect(
      new URL(buildSignInHref({ reason: 'auth-required', nextPath }), request.url),
    );
  }

  if (!isAlphaUserAllowed(user)) {
    if (pathname.startsWith('/auth/sign-in')) {
      return response;
    }

    return NextResponse.redirect(
      new URL(buildSignInHref({ reason: 'not-allowed', nextPath }), request.url),
    );
  }

  if (pathname === '/' || pathname.startsWith('/auth/sign-in')) {
    return NextResponse.redirect(new URL(DEFAULT_APP_REDIRECT, request.url));
  }

  return response;
}
