---
stepsCompleted:
  - 1
  - 2
  - 3
inputDocuments:
  - docs/bmad-phase3/04-polish-and-traceability.md
  - _bmad/_bmad-output/planning-artifacts/prd-gameaigents.md
  - docs/bmad-phase4/02-wireframes-and-component-contracts.md
  - _bmad/_bmad-output/planning-artifacts/ux-design-gameaigents.md
  - docs/research/phase-1/01-market-user-wedge.md
  - docs/research/phase-1/02-competition-tech-differentiation.md
  - docs/research/phase-1/03-trust-compliance-gtm.md
  - docs/strategy/2026-03-17-competitive-learnings-and-world-model-plan.md
workflowType: 'architecture'
project_name: 'gameaigents'
user_name: 'Node'
date: '2026-03-20T16:15:00Z'
---

# GameAIgents — Architecture

_Status: Architecture complete — topology, trust boundaries, and runtime delivery model locked for MVP_

## 1. Architecture Summary
GameAIgents should launch on a **web-first modular-monolith architecture** that supports one core promise:

> **idea to approved brief to editable Godot scaffold to safe iteration, backed by real manifests, checkpoints, provenance, and enforceable privacy boundaries**

The architecture must behave like a serious creator system, not a prompt-to-demo toy.
That means:
- first-party records own truth
- compile/recompile happen through explicit job lifecycles
- providers stay bounded behind adapters
- trust surfaces resolve to durable runtime records
- private-by-default is enforced in storage, auth, export, and support design
- runtime operations prefer honest delivery over flashy but brittle complexity

## 2. Architecture Principles
- deterministic artifact graph over chat-history dependence
- async compile/recompile jobs over synchronous UX theater
- Godot-first depth with engine-adapter boundaries
- trust surfaces backed by runtime truth
- private-by-default project posture with real access boundaries
- provider minimization and replaceability
- optional World Sketch compatibility without making it mandatory in MVP
- single-owner alpha discipline over premature collaboration complexity
- recovery-first runtime posture over scale-first infra theater

## 3. Locked MVP Topology

### 3.1 Creator layer
A Next.js creator workspace owns:
- Projects
- Intake
- Brief
- Compile
- Compare & Recompile
- Playtest
- Provenance & Export

### 3.2 Application layer
An API / backend-for-frontend owns:
- authenticated commands
- idempotent project and workflow writes
- compile/recompile request validation
- scope and policy preflight
- read-model composition for compare/provenance surfaces
- export orchestration and bounded packaging

### 3.3 Canonical data layer
A Postgres-backed artifact graph owns:
- projects
- intake bundles and source references
- brief revisions
- artifacts and immutable revisions
- compile runs and manifests
- checkpoints
- provenance records
- policy results
- domain events

### 3.4 Storage layer
Object storage owns bulky payloads:
- uploaded references
- generated bundles
- checkpoint archives
- manifest payloads
- provenance exports
- future world-sketch captures

### 3.5 Execution layer
Async workers own:
- intake normalization
- compile planning
- Godot scaffold generation
- selective recompile execution
- rollback processing
- provenance export packaging
- bounded playtest-guidance generation

### 3.6 Adapter layer
- **MVP primary:** Godot compiler adapter
- **Future:** Unity compiler adapter
- **Optional:** World Sketch provider abstraction and extractor services
- **Cross-cutting rule:** every external provider is wrapped by a replaceable capability adapter with provenance and policy hooks

## 4. First Vertical Slice
The first architecture-backed implementation slice remains:
1. create project
2. capture intake
3. draft + approve brief
4. request compile
5. run Godot compile worker
6. finalize manifest + checkpoint + provenance
7. show compile summary / compare / provenance in UI

This slice must also enforce:
- project-scoped auth
- metadata-gated object access
- scoped worker input packages
- system-sensitive secret isolation
- durable job lifecycle visibility

## 5. Data and Security Boundaries

### 5.1 Canonical domains
The architecture distinguishes four domains:
- **core project truth** — canonical first-party records
- **large object payloads** — references, bundles, checkpoints, exports
- **system-sensitive configuration** — secrets, internal policy config, service credentials
- **ephemeral execution state** — temp workdirs, queue locks, transient staging

### 5.2 Data classes
The system adopts explicit data classes:
- `project-private`
- `project-sensitive-generated`
- `publish-support`
- `system-sensitive`
- `ops-observability`

Each class carries default handling and export rules rather than relying on ad hoc engineering judgment.

### 5.3 Private-by-default enforcement
Private-by-default is architectural, not rhetorical:
- all project data resolves through owner/project scope
- storage keys are project-partitioned
- object access is metadata-gated
- support access requires explicit elevated handling

### 5.4 Compile worker boundary
Compile/recompile runs through **guarded isolated workers** that receive scoped execution packages and return bounded outputs.
Workers are not trusted to mutate broad project state directly.

### 5.5 Provider boundary
External model or world providers:
- receive only minimum necessary data
- are invoked through capability adapters
- are attributable in provenance
- cannot become the canonical state holder

### 5.6 Export boundary
Exports are explicit packaging actions that:
- package creator-facing trust artifacts
- preserve provenance and policy outputs
- automatically exclude secrets and internal policy internals

## 6. Runtime Operations and Delivery

### 6.1 Environment model
The MVP should launch with three environments:
- **dev**
- **staging**
- **production**

Staging is mandatory because compile/runtime behavior, migration paths, and restore drills need rehearsal before production.

### 6.2 Runtime services
Production runs as a small deployment around one logical modular monolith:
- web/API service
- job coordinator
- guarded compile worker lane
- Postgres
- object storage
- optional lightweight status channel

### 6.3 Job lanes
Jobs are separated into operational lanes:
- compile
- recompile
- export/provenance
- playtest guidance

Each lane gets its own timeout, retry, alerting, and concurrency posture.

### 6.4 Canonical job lifecycle
Every async job must carry durable states such as:
- `queued`
- `accepted`
- `running`
- `awaiting-artifact-promotion`
- `succeeded`
- `failed-retryable`
- `failed-terminal`
- `cancelled`
- `expired`

### 6.5 Status delivery
The MVP uses:
- durable read models in Postgres as truth
- polling as the baseline status transport
- optional SSE where cheap and useful

### 6.6 Deployment boundaries
Release boundaries remain explicit across:
- web/API
- workers
- migrations
- policy/config bundles

### 6.7 Backup and retention posture
The architecture requires:
- scheduled Postgres backups
- tested restore drills in staging
- class-aware retention rules
- short-TTL cleanup for ephemeral workdirs and transient runtime residue

### 6.8 Observability posture
Operations telemetry must key on:
- `projectId`
- `runId`
- lane type
- worker version
- provider metadata where relevant

Logs are structured and redacted by default.
Support starts from metadata and diagnostics, not raw creator payload capture.

### 6.9 Support posture
Support access is:
- explicit
- audited
- time-bounded
- reason-scoped
- project-bounded

There is no silent roaming admin mode in the MVP architecture.

### 6.10 Capacity and rollout posture
The MVP optimizes for:
- low parallelism with trustworthy completion
- explicit backpressure
- bounded provider/worker cost
- internal → staging → founder-controlled alpha → measured expansion

## 7. ADRs Locked Across Steps 1-3

### ADR-001
Use a **web-first modular monolith** for MVP.

### ADR-002
Keep **Postgres as the canonical artifact-graph source of truth**.

### ADR-003
Treat **compile and recompile as explicit background jobs** with lifecycle state.

### ADR-004
Isolate **engine-specific behavior behind adapters**, with Godot first.

### ADR-005
Make **manifests, checkpoints, and provenance first-class outputs** of the runtime.

### ADR-006
Keep **World Sketch optional and provider-abstracted**.

### ADR-007
Keep **first-party records canonical over provider memory**.

### ADR-008
Use explicit **data classes and handling rules** for project, publish, system, and ops data.

### ADR-009
Use **project-scoped storage paths and metadata-gated access**.

### ADR-010
Run **compile/recompile in guarded isolated workers with scoped execution packages**.

### ADR-011
Put **all external providers behind replaceable capability adapters**.

### ADR-012
Make **exports explicit packaging actions that exclude system-sensitive data automatically**.

### ADR-013
Use **three environments: dev, staging, production**.

### ADR-014
Separate **runtime lanes by job class**.

### ADR-015
Treat **job lifecycle state as durable product truth**.

### ADR-016
Keep **status delivery simple: durable read models plus polling, optional SSE**.

### ADR-017
Deploy **web/API, workers, migrations, and policy/config with explicit release boundaries**.

### ADR-018
Make **restore-tested backups and class-aware retention** part of MVP architecture.

### ADR-019
Default to **redacted structured observability with audited break-glass escalation**.

### ADR-020
Favor **explicit backpressure and bounded alpha throughput** over premature scale complexity.

## 8. Current Verdict
The architecture is now complete and stable enough to move into implementation planning without reopening the strategic wedge, PRD contracts, UX trust model, or privacy posture.

GameAIgents now has:
- a credible system topology
- a durable canonical data model
- enforceable privacy and storage boundaries
- constrained compile execution lanes
- provider abstraction that protects the product from vendor drift
- deployment and promotion discipline
- observability and support rules that respect creator trust
- backup, retention, and recovery posture strong enough for alpha

That is the right architecture posture for a serious creator-to-production copilot.