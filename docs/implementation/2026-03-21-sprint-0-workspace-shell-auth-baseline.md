# Sprint 0 — Workspace Shell & Auth Baseline

_Date: 2026-03-21_  
_Status: completed as the second implementation chunk for `implementation / sprint-0-foundation-and-trust-scaffolding`_

## What this chunk delivers

This chunk turns the existing Sprint 0 backend contracts into the first real product surface:

1. **Next.js app scaffold** for the creator workspace
2. **Invite-only alpha auth baseline** using Supabase Auth + allowlist gating
3. **Protected workspace shell** for `Projects`, `Intake`, `Brief`, `Compile`, `Compare`, and `Provenance`
4. **Seeded route surfaces** that mirror the locked UX and trust model without pretending the APIs are already wired
5. **Pure contract tests** for auth guards and workspace route/resume behavior

## Why this chunk now

The prior Sprint 0 chunk established canonical runtime truth, but there was still no app shell to carry it.
That meant the product had durable backend contracts without a creator-facing home.

The BMAD build order explicitly put **workspace shell + auth baseline** next.
So this chunk creates the front door while keeping the UI honest about what is still stubbed.

## Files added in this chunk

### App scaffold
- `package.json`
- `next.config.mjs`
- `jsconfig.json`
- `middleware.js`
- `app/layout.js`
- `app/globals.css`
- `app/page.js`
- `app/auth/sign-in/page.js`
- `app/auth/callback/route.js`
- `app/(workspace)/layout.js`
- `app/(workspace)/projects/page.js`
- `app/(workspace)/intake/page.js`
- `app/(workspace)/brief/page.js`
- `app/(workspace)/compile/page.js`
- `app/(workspace)/compare/page.js`
- `app/(workspace)/provenance/page.js`

### Auth + workspace contracts
- `src/lib/auth/env.mjs`
- `src/lib/auth/guards.mjs`
- `src/lib/auth/browser.js`
- `src/lib/auth/server.js`
- `src/lib/auth/middleware.js`
- `src/lib/workspace/contracts.mjs`
- `src/lib/workspace/alpha-preview.mjs`
- `src/components/auth/sign-in-actions.jsx`
- `src/components/workspace/workspace-shell.jsx`

### Tests
- `test/foundation/auth-guards.test.mjs`
- `test/foundation/workspace-contracts.test.mjs`

## Auth decision locked here

This chunk picks an **invite-only alpha posture** that supports:
- GitHub OAuth as the default path
- magic-link email as a fallback
- allowlist enforcement after authentication

The implementation is intentionally narrow:
- protected routes redirect to `/auth/sign-in`
- non-allowlisted accounts are blocked even if authentication succeeds
- missing auth env config fails closed for workspace routes

This gives Sprint 0 a real auth boundary without prematurely deciding the full future account model.

## Workspace-shell decision locked here

The shell now encodes the UX decisions already made in planning:
- stable left nav
- trust-heavy top bar with project/engine/checkpoint/status identity
- quiet right meta rail for privacy, revision, and warning context
- route surfaces for Projects, Intake, Brief, Compile, Compare, and Provenance

The pages are **seeded, not faked**:
- they reflect real BMAD route contracts and trust surfaces
- they do not claim persistence or compile execution already works
- CTA labels explicitly mark API wiring as the next chunk

## Acceptance achieved in this chunk

This chunk satisfies a meaningful piece of Sprint 0 acceptance:
- there is now a runnable creator app scaffold
- route protection exists
- allowlist auth posture exists
- workspace routing exists for the core Sprint 0 surfaces
- resume-path and shell-state contracts are test-covered

## Still not done inside Sprint 0

Remaining Sprint 0 work after this chunk:
- real project creation API
- intake persistence to canonical schema
- brief revision persistence + approval flow
- compile request endpoint + queue handoff
- live read-models instead of seeded alpha preview data

## Next recommended chunk

**Next:** wire authenticated `project creation → intake save → brief approval persistence` into the canonical schema, so the shell stops being seeded and starts carrying real project truth.
