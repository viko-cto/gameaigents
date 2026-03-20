---
stepsCompleted:
  - 1
  - 2
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
date: '2026-03-20T14:15:00Z'
---

# GameAIgents — Architecture

_Status: Steps 1-2 complete — topology plus data/security boundaries locked for MVP_

## 1. Architecture Summary
GameAIgents should launch on a **web-first modular-monolith architecture** that supports one core promise:

> **idea to approved brief to editable Godot scaffold to safe iteration, backed by real manifests, checkpoints, provenance, and enforceable privacy boundaries**

The architecture must behave like a serious creator system, not a prompt-to-demo toy.
That means:
- first-party records own truth
- compile/recompile happen through explicit job lifecycles
- providers stay bounded behind adapters
- trust surfaces resolve to durable runtime records
- private-by-default is enforced in storage, auth, and export design

## 2. Architecture Principles
- deterministic artifact graph over chat-history dependence
- async compile/recompile jobs over synchronous UX theater
- Godot-first depth with engine-adapter boundaries
- trust surfaces backed by runtime truth
- private-by-default project posture with real access boundaries
- provider minimization and replaceability
- optional World Sketch compatibility without making it mandatory in MVP
- single-owner alpha discipline over premature collaboration complexity

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

Step 2 clarifies that this slice must also enforce:
- project-scoped auth
- metadata-gated object access
- scoped worker input packages
- system-sensitive secret isolation

## 5. Data and Security Boundaries Locked in Step 2

### 5.1 Canonical domains
The architecture now distinguishes four domains:
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
Private-by-default is now architectural, not rhetorical:
- all project data resolves through owner/project scope
- storage keys are project-partitioned
- object access is metadata-gated
- support access requires explicit elevated handling

### 5.4 Compile worker boundary
Compile/recompile must run through **guarded isolated workers** that receive scoped execution packages and return bounded outputs.
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

## 6. ADRs Locked Across Steps 1-2

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

## 7. What Remains for Step 3
The following are intentionally deferred to `runtime-operations-and-delivery`:
- queue/runtime framework selection
- deployment topology and environment promotion
- backup / retention rules by data class
- alerting and incident thresholds
- support-access escalation workflow
- cost, region, and rollout strategy

## 8. Current Verdict
The architecture is now defined tightly enough to move into **runtime-operations-and-delivery** without reopening the strategic wedge, PRD contracts, or UX trust model.

GameAIgents now has:
- a credible system topology
- a durable canonical data model
- enforceable privacy and storage boundaries
- constrained compile execution lanes
- provider abstraction that protects the product from vendor drift

That is the right architecture posture for a serious creator-to-production copilot.