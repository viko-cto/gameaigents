export const DEFAULT_APP_REDIRECT = '/projects';

export const PUBLIC_PATH_PREFIXES = [
  '/',
  '/auth/sign-in',
  '/auth/callback',
];

export function isPublicPath(pathname = '/') {
  if (pathname === '/') {
    return true;
  }

  return PUBLIC_PATH_PREFIXES.some((prefix) => prefix !== '/' && pathname.startsWith(prefix));
}

export function buildSignInHref({
  reason = 'auth-required',
  nextPath = DEFAULT_APP_REDIRECT,
} = {}) {
  const params = new URLSearchParams();
  params.set('reason', reason);
  params.set('next', nextPath || DEFAULT_APP_REDIRECT);
  return `/auth/sign-in?${params.toString()}`;
}
