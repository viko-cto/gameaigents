import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { getAuthConfigStatus, isAlphaUserAllowed } from '@/src/lib/auth/env.mjs';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot always write cookies; middleware handles refresh persistence.
          }
        },
      },
    },
  );
}

export async function getAlphaSession() {
  const authConfig = getAuthConfigStatus();

  if (!authConfig.hasSupabaseUrl || !authConfig.hasSupabaseAnonKey) {
    return {
      authConfig,
      isAllowed: false,
      user: null,
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    authConfig,
    isAllowed: isAlphaUserAllowed(user),
    user,
  };
}
