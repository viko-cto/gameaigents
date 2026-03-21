import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getAlphaUserIdentifiers,
  isAlphaUserAllowed,
  parseAlphaAllowlist,
} from '../../src/lib/auth/env.mjs';
import { buildSignInHref, isPublicPath } from '../../src/lib/auth/guards.mjs';

test('allowlist parsing normalizes identifiers and drops blanks', () => {
  assert.deepEqual(parseAlphaAllowlist(' vadim@example.com, , GITHUB_user '), [
    'vadim@example.com',
    'github_user',
  ]);
});

test('alpha user matching works across email, id, and username', () => {
  const user = {
    email: 'Vadim@example.com',
    id: 'user_123',
    user_metadata: {
      user_name: 'Viko-CTO',
    },
  };

  assert.deepEqual(getAlphaUserIdentifiers(user), ['vadim@example.com', 'user_123', 'viko-cto']);
  assert.equal(isAlphaUserAllowed(user, ['other@example.com', 'viko-cto']), true);
  assert.equal(isAlphaUserAllowed(user, ['another@example.com']), false);
});

test('public path guard only exempts landing and auth routes', () => {
  assert.equal(isPublicPath('/'), true);
  assert.equal(isPublicPath('/auth/sign-in'), true);
  assert.equal(isPublicPath('/auth/callback'), true);
  assert.equal(isPublicPath('/projects'), false);
});

test('sign-in redirects preserve reason and return path', () => {
  assert.equal(
    buildSignInHref({ reason: 'not-allowed', nextPath: '/compile?project=proj_1' }),
    '/auth/sign-in?reason=not-allowed&next=%2Fcompile%3Fproject%3Dproj_1',
  );
});
