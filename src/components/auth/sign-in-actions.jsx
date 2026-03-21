'use client';

import { useMemo, useState } from 'react';

import { getBrowserSupabaseClient } from '@/src/lib/auth/browser.js';

function getRedirectUrl(nextPath) {
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  return `${origin}/auth/callback?next=${encodeURIComponent(nextPath || '/projects')}`;
}

export default function SignInActions({ nextPath = '/projects', provider = 'github', disabled = false }) {
  const supabase = useMemo(() => {
    if (disabled) {
      return null;
    }

    return getBrowserSupabaseClient();
  }, [disabled]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGithubSignIn() {
    if (!supabase) {
      return;
    }

    setLoading(true);
    setMessage('Redirecting to GitHub…');

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getRedirectUrl(nextPath),
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  }

  async function handleMagicLink(event) {
    event.preventDefault();

    if (!supabase) {
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getRedirectUrl(nextPath),
      },
    });

    setLoading(false);
    setMessage(error ? error.message : 'Magic link sent. Use an allowlisted email to enter the alpha.');
  }

  return (
    <div className="sign-in-actions">
      <button className="primary-button" disabled={disabled || loading} onClick={handleGithubSignIn} type="button">
        Continue with GitHub
      </button>

      <form className="magic-link-form" onSubmit={handleMagicLink}>
        <label htmlFor="email">Email magic link fallback</label>
        <input
          autoComplete="email"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@allowlisted-domain.com"
          type="email"
          value={email}
        />
        <button className="secondary-button" disabled={disabled || loading || !email} type="submit">
          Send magic link
        </button>
      </form>

      {message ? <p className="muted auth-message">{message}</p> : null}
    </div>
  );
}
