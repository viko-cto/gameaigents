import Link from 'next/link';

import { getAlphaSession } from '@/src/lib/auth/server.js';
import { DEFAULT_APP_REDIRECT } from '@/src/lib/auth/guards.mjs';

export default async function HomePage() {
  const session = await getAlphaSession();

  return (
    <main className="marketing-shell">
      <section className="hero-card">
        <p className="eyebrow">GameAIgents · Sprint 0</p>
        <h1>Workspace shell and auth baseline are now the product front door.</h1>
        <p className="hero-copy">
          This alpha is built for solo technical creators who want an editable, engine-native prototype workflow — not
          prompt-to-game theater.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" href={session.isAllowed ? DEFAULT_APP_REDIRECT : '/auth/sign-in'}>
            {session.isAllowed ? 'Enter workspace' : 'Sign in to alpha'}
          </Link>
          <span className="muted">Routes now exist for Projects, Intake, Brief, Compile, Compare, and Provenance.</span>
        </div>
      </section>
    </main>
  );
}
