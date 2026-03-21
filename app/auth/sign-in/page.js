import { redirect } from 'next/navigation';

import SignInActions from '@/src/components/auth/sign-in-actions.jsx';
import { getAuthConfigStatus } from '@/src/lib/auth/env.mjs';
import { getAlphaSession } from '@/src/lib/auth/server.js';

const REASON_COPY = {
  'auth-required': 'Sign in to enter the founder-controlled alpha workspace.',
  'not-allowed': 'This account authenticated successfully, but it is not on the alpha allowlist yet.',
  'config-missing': 'Supabase auth environment variables are not configured yet, so the workspace stays locked.',
  'missing-code': 'The auth callback did not receive a session code. Try again from the sign-in page.',
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const reason = params?.reason ?? 'auth-required';
  const nextPath = params?.next ?? '/projects';
  const session = await getAlphaSession();
  const authConfig = getAuthConfigStatus();

  if (session.isAllowed) {
    redirect(nextPath);
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Invite-only alpha</p>
        <h1>Sign in to the GameAIgents workspace</h1>
        <p className="muted">
          {REASON_COPY[reason] ?? REASON_COPY['auth-required']} GitHub is the default path; magic-link email remains as a
          fallback for allowlisted accounts.
        </p>

        <div className="auth-config-grid">
          <div className="surface-card compact">
            <span>Supabase URL</span>
            <strong>{authConfig.hasSupabaseUrl ? 'Configured' : 'Missing'}</strong>
          </div>
          <div className="surface-card compact">
            <span>Anon key</span>
            <strong>{authConfig.hasSupabaseAnonKey ? 'Configured' : 'Missing'}</strong>
          </div>
          <div className="surface-card compact">
            <span>Allowlist</span>
            <strong>{authConfig.hasAllowlist ? `${authConfig.allowlistCount} identifiers` : 'Missing'}</strong>
          </div>
        </div>

        <SignInActions disabled={!authConfig.hasSupabaseUrl || !authConfig.hasSupabaseAnonKey} nextPath={nextPath} provider={authConfig.defaultProvider} />
      </section>
    </main>
  );
}
