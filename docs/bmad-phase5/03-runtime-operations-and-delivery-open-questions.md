# GameAIgents Architecture Step 3 — Open Questions

_Date: 2026-03-20_

These are downstream implementation choices and operating calibrations. None of them reopen the wedge, UX contracts, or the completed architecture posture.

## 1. Queue substrate choice
What concrete MVP job substrate best fits the compile-heavy runtime?
- Postgres-backed queue
- hosted orchestrator plus isolated compile sidecars
- hybrid coordinator with dedicated compile runners

## 2. Compile isolation depth
What isolation level gives the best alpha tradeoff between safety, speed, and operational friction?
- container per run
- pooled workers with stricter sandboxing
- heavier ephemeral VM isolation for compile lanes only

## 3. Restore-drill cadence
How often should restore drills run once production begins?
- before every major release
- weekly while alpha is unstable
- monthly once the architecture settles

## 4. Checkpoint retention baseline
How long should checkpoints be retained for active alpha projects before creator-configurable retention exists?
- fixed long window for all active projects
- run-count-based retention plus milestone pinning
- hybrid age + milestone policy

## 5. Support escalation UX
How visible should audited support access be to creators in the product?
- documentation-only
- explicit support-consent surface when escalation is requested
- later fine-grained support session controls

## 6. Region and residency posture
Can MVP begin in one trusted region while preserving future residency flexibility, or does the first alpha already require region-aware deployment constraints?

## 7. Status-update transport
Is polling alone good enough for alpha, or is SSE worth adding immediately for compile confidence and operator visibility?