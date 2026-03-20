# GameAIgents Architecture Step 3 — Runtime Operations and Delivery

_Date: 2026-03-20_  
_Status: Architecture runtime, delivery, and operational posture locked for the MVP_  
_Scope: define how the system runs, ships, recovers, gets observed, and stays supportable without breaking the product’s trust promise_

## 1. Step Goal

This step answers the final architecture question for the MVP:

> **How should GameAIgents run and ship in production so the Godot-first compile-and-continue workflow is reliable, supportable, cost-bounded, and trust-preserving from day one?**

Step 1 locked the topology.  
Step 2 locked the data, security, and integration boundaries.  
Step 3 locks the runtime operating model so the architecture can be implemented without hand-wavy ops optimism.

## 2. Runtime Principles Locked in This Step

- **Async jobs must feel trustworthy, not mysterious.** Creators need durable run states, bounded waiting, and explicit failure surfaces.
- **Operational simplicity beats platform cleverness.** MVP should run on the smallest production architecture that can honestly support compile, compare, checkpoint, and export.
- **Compile reliability matters more than peak throughput theater.** One creator getting a trustworthy result beats premature scale fantasies.
- **Recovery paths must exist before growth paths.** Backups, reruns, checkpoints, and run diagnosis matter more than auto-scaling slides.
- **Observability must explain creator reality.** Metrics, traces, and logs should map to project, run, revision, and export truth.
- **Support must be possible without collapsing privacy posture.** Break-glass access is allowed only as an explicit audited workflow.
- **Rollout must preserve reversibility.** Schema, workers, adapters, and policy changes need versioned promotion paths.

## 3. Locked MVP Runtime Topology

## 3.1 Environment model
The MVP should launch with **three environments**:
- **local/dev** — fast iteration, fake or low-risk provider wiring, disposable data
- **staging** — production-like stack, seeded test projects, provider contracts, migration rehearsal
- **production** — creator-facing environment with real project isolation, backups, audit logs, and stricter secrets posture

**Decision locked here**
A two-environment model is too fragile because compile workers, storage policies, and migration paths need rehearsal before production.
A bigger environment matrix is unnecessary at MVP.

## 3.2 Runtime services
Production should run as a **small multi-service deployment around one logical modular monolith**:
- web app / API-BFF service
- background job coordinator
- guarded compile worker lane
- Postgres
- object storage
- optional lightweight realtime/status channel for job updates

**Decision locked here**
Do not split into many independently deployed domain services yet.
The runtime separation exists to isolate job behavior and operational failure modes, not to chase microservice aesthetics.

## 3.3 Job lane model
Jobs should be separated into operational lanes with distinct budgets and controls:
- **compile lane** — highest trust sensitivity, isolation, CPU/storage usage
- **recompile lane** — same controls as compile, narrower scope packages
- **export/provenance lane** — packaging-oriented, less heavy than compile but still audited
- **playtest guidance lane** — async advisory work, lowest criticality, never blocks canonical project truth

**Decision locked here**
The system should not put all work on one undifferentiated queue.
Lane separation is required for sane retry, timeout, alerting, and cost control.

## 4. Job Lifecycle and Delivery Contract

## 4.1 Canonical run states
Every async job must move through durable lifecycle states such as:
- `queued`
- `accepted`
- `running`
- `awaiting-artifact-promotion` when relevant
- `succeeded`
- `failed-retryable`
- `failed-terminal`
- `cancelled`
- `expired`

**Rule locked here**
The UI may compress these into friendlier language, but the runtime must keep precise machine states.

## 4.2 Idempotency and replay posture
All creator-triggered workflow commands must be idempotent at the API boundary.
Compile/recompile/export runs must have stable request IDs so retries or duplicate clicks do not create contradictory project state.

**Operational implication**
A rerun is an explicit new run linked to the original request, not an invisible overwrite.

## 4.3 Timeout and retry posture
Default lane posture:
- compile / recompile: bounded retries for infrastructure failures, no silent auto-retry on semantic generation contradictions
- export: safe retries when packaging is deterministic
- playtest guidance: looser retry policy, clearly attributable

**Decision locked here**
Retries should be **failure-class aware**:
- infrastructure/transient → retryable
- policy-blocked / invalid scope / malformed output → terminal until human action
- provider timeout → retryable within budget
- missing canonical inputs → terminal and surfaced immediately

## 4.4 Creator-facing status delivery
MVP status freshness should use:
- durable read models in Postgres as source of truth
- short polling as baseline
- optional server-sent events for active run status if implementation cost is low

**Decision locked here**
Do not require websocket-heavy architecture for MVP.
The product promise is trustworthy status, not flashy realtime plumbing.

## 5. Deployment and Promotion Model

## 5.1 Deployment posture
The MVP should support **separate deployable units** for:
- web/API
- worker lane image/process
- database migrations
- policy/config bundles

**Rule locked here**
A web deploy must not implicitly and uncontrollably roll the compile lane.
Runtime-sensitive worker changes need explicit release handling.

## 5.2 Migration discipline
Database schema changes must follow expand-contract discipline where practical:
- additive schema first
- backfill / dual-read or dual-write when needed
- cutover only after staging validation
- cleanup later

**Why this matters**
Artifact graphs, manifests, checkpoints, and provenance objects are too central to treat migrations casually.

## 5.3 Version tagging
Each compile, export, and policy result should be attributable to:
- app version
- worker version
- adapter/provider version where relevant
- policy config version when gating or disclosure logic matters

This is required for support, trust, and rollback diagnosis.

## 6. Reliability, Backup, and Retention Posture

## 6.1 Backup model
The MVP should implement:
- scheduled Postgres backups with tested restore path
- versioned object storage for checkpoint/export-critical buckets when supported
- retention-aware cleanup for transient execution storage

**Decision locked here**
Backups are not considered real until a restore drill succeeds in staging.

## 6.2 Recovery model by failure type
- **web/API failure:** safe restart, no project truth loss
- **worker crash:** run remains attributable; retry rules decide next action
- **provider failure:** canonical state preserved; run records bounded failure
- **storage failure:** object access errors surfaced; promotion blocked rather than faked
- **bad deploy:** roll back app/worker version, preserve data truth, rerun impacted jobs selectively

## 6.3 Retention posture by class
Initial MVP retention should follow class-aware defaults:
- canonical project truth: durable until explicit deletion policy says otherwise
- checkpoints: retained aggressively enough to preserve rollback trust for active projects
- exports/provenance bundles: retained on a bounded but creator-visible policy
- ephemeral workdirs and temp artifacts: short TTL, auto-cleaned
- observability payloads: redacted and retained on an engineering/support schedule

**Decision locked here**
One global retention window is too blunt.
Retention must respect trust-critical rollback objects versus disposable runtime residue.

## 7. Observability and Incident Model

## 7.1 Observability primitives
The MVP must emit structured telemetry keyed by:
- `projectId`
- `runId`
- `artifactId` or `checkpointId` where relevant
- lane type
- worker version
- provider capability / model metadata when relevant

## 7.2 Required operational views
Operations should be able to answer:
- which runs are stuck and why
- which provider or adapter is degrading
- which worker version introduced failure changes
- how long compile/recompile/export runs take by lane
- how many runs fail before manifest/checkpoint/provenance completion
- whether storage or policy gating is the blocker

## 7.3 Logging posture
Logs should be structured and redacted by default.
Prompt/reference bodies should not spill into general logs unless a consciously scoped debug path is used.

**Decision locked here**
Metadata-first observability is the default.
Full payload capture is an exception, not normal operations.

## 7.4 Alerts and thresholds
MVP alerting should focus on boring, high-value signals:
- queue backlog beyond budget by lane
- compile failure spike
- storage/object access failures
- migration failure
- backup failure
- provider timeout spike
- worker crash loops

Do not create vanity alerts for every minor anomaly.

## 8. Support and Break-Glass Access Model

## 8.1 Default support posture
Support should diagnose from:
- run metadata
- structured diagnostics
- redacted logs
- manifest/checkpoint/provenance summaries
- explicit creator-shared exports when possible

## 8.2 Break-glass rule
If deeper inspection is required, support access must be:
- explicit
- audited
- time-bounded
- attributable to an operator reason
- limited to the minimum project scope needed

**Decision locked here**
There is no silent roaming admin mode in MVP architecture.
If break-glass exists, it is a workflow, not a convenience habit.

## 8.3 Creator trust implication
When feasible, creator-facing policy/help copy should make clear that support access is exceptional and auditable.
That reinforces the private-by-default posture instead of undermining it.

## 9. Cost, Capacity, and Rollout Strategy

## 9.1 Capacity posture
The MVP should optimize for:
- low parallelism with trustworthy completion
- predictable compile budgets
- explicit backpressure rather than hidden overload

**Decision locked here**
If demand spikes, queues may lengthen before architecture scales out.
That is acceptable as long as status is honest and data safety is preserved.

## 9.2 Cost control primitives
Runtime should support:
- per-lane concurrency limits
- provider budget accounting
- run-level timeouts
- object-storage lifecycle cleanup for transient outputs
- attribution of expensive failures to specific lanes/providers

## 9.3 Rollout posture
Release in waves:
1. internal/dev proof
2. staging rehearsal with seeded projects and failure drills
3. small founder-controlled alpha in production
4. measured expansion only after compile success, rollback trust, and support workflows behave cleanly

## 10. Runtime Decision Records Locked in Step 3

## ADR-013 — Use three environments: dev, staging, production
**Decision:** the MVP ships with exactly three meaningful environments.

**Why**
Compile/runtime behavior and migration paths need rehearsal, but more environment sprawl is unnecessary.

## ADR-014 — Separate runtime lanes by job class
**Decision:** compile, recompile, export, and playtest guidance use differentiated lanes and controls.

**Why**
These tasks have different failure, cost, and trust profiles.

## ADR-015 — Treat job lifecycle state as durable product truth
**Decision:** queued/running/succeeded/failed states are first-class runtime records.

**Why**
Trustworthy async UX depends on durable state, not ephemeral process memory.

## ADR-016 — Keep status delivery simple: durable read models plus polling, optional SSE
**Decision:** MVP does not require websocket-first architecture.

**Why**
Reliable truth matters more than realtime spectacle.

## ADR-017 — Deploy web/API, workers, migrations, and policy/config with explicit release boundaries
**Decision:** runtime-sensitive components should not be coupled into one opaque deploy action.

**Why**
This preserves rollback clarity and operational control.

## ADR-018 — Make restore-tested backups and class-aware retention part of MVP architecture
**Decision:** backup/restore and retention rules are mandatory architecture elements, not post-launch chores.

**Why**
Checkpoint trust and project durability are core to the product promise.

## ADR-019 — Default to redacted structured observability with audited break-glass escalation
**Decision:** support begins with metadata and diagnostics, then escalates through audited bounded access only when needed.

**Why**
Operational support must coexist with the product’s privacy promise.

## ADR-020 — Favor explicit backpressure and bounded alpha throughput over premature scale complexity
**Decision:** the MVP optimizes for honest queueing and successful runs rather than aggressive autoscaling complexity.

**Why**
For this product, false success and opaque overload are more damaging than visible waiting.

## 11. What This Architecture Now Enables

With Steps 1-3 complete, GameAIgents can now move into implementation with a coherent delivery posture across:
- system topology
- canonical data and security boundaries
- compile/recompile execution isolation
- deployment and promotion discipline
- observability and support flows
- backup, retention, and recovery rules
- alpha rollout and capacity control

## 12. Step Verdict

**Verdict: the GameAIgents MVP architecture is now complete and implementation-ready.**

The system is now defined not only as a product shape, but as a running service with explicit answers for:
- where truth lives
- how async work behaves
- how releases are promoted safely
- how incidents are diagnosed
- how privacy survives support needs
- how rollback, checkpoints, and provenance stay credible under real runtime pressure

That is the minimum serious architecture for a creator-to-production copilot that wants to earn trust instead of borrowing it.