import { enforceAlphaAuth } from '@/src/lib/auth/middleware.js';

export async function proxy(request) {
  return enforceAlphaAuth(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
