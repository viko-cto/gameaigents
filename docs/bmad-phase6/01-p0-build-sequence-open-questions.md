# GameAIgents Implementation-Planning Step 1 — Open Questions

_Date: 2026-03-20_

These do not block the build sequence. They are downstream implementation choices inside the locked order.

## 1. Sprint 0 queue substrate
Which MVP job substrate should own compile-lane orchestration first?
- Postgres-backed queue in the modular monolith
- hosted workflow/orchestration service with isolated compile runners
- hybrid model with a simple coordinator plus dedicated worker process

## 2. First compile output depth
What is the narrowest Godot scaffold that still feels honestly useful for Sprint 1?
- scene shell + player controller + one objective chain
- same plus simple HUD shell
- same plus one mechanic/config surface exposed for later recompile

## 3. Auth posture for alpha
Is the first alpha best served by:
- email/password plus allowlist
- GitHub auth plus allowlist
- admin-provisioned invite-only accounts

## 4. Checkpoint packaging format
What is the cleanest initial checkpoint representation for easy rollback and provenance?
- manifest + zipped project subset
- manifest + object-store file graph references
- hybrid project bundle with selective artifact pinning

## 5. Staging restore drill timing
Should the first restore drill happen:
- before Sprint 1 starts
- before Sprint 2 starts
- before the first external alpha user is added

## 6. First recompile scope
Sprint 2 currently prioritizes mechanics/config first.
Should scene-structure recompile stay strictly second, or is there a narrow scene sub-scope safe enough to open in the same sprint?
