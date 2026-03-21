function normalizeIdentifier(value) {
  return String(value ?? '').trim().toLowerCase();
}

export function parseAlphaAllowlist(value = process.env.GAMEAIGENTS_ALPHA_ALLOWLIST ?? '') {
  return value
    .split(',')
    .map((entry) => normalizeIdentifier(entry))
    .filter(Boolean);
}

export function getAuthConfigStatus() {
  const allowlist = parseAlphaAllowlist();

  return {
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasSupabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasAllowlist: allowlist.length > 0,
    allowlistCount: allowlist.length,
    defaultProvider: process.env.GAMEAIGENTS_AUTH_PROVIDER ?? 'github',
  };
}

export function getAlphaUserIdentifiers(user = {}) {
  return [
    user.email,
    user.id,
    user.user_metadata?.user_name,
    user.user_metadata?.preferred_username,
    user.user_metadata?.email,
  ]
    .map((value) => normalizeIdentifier(value))
    .filter(Boolean);
}

export function isAlphaUserAllowed(user, allowlist = parseAlphaAllowlist()) {
  if (!user || allowlist.length === 0) {
    return false;
  }

  const identifiers = getAlphaUserIdentifiers(user);
  return identifiers.some((identifier) => allowlist.includes(identifier));
}
