---
stepsCompleted:
  - 1
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
date: '2026-03-20T13:55:06Z'
---

# GameAIgents — Architecture

_Status: Step 1 complete — foundation and system topology locked for MVP_

## 1. Architecture Summary
GameAIgents should launch on a **web-first modular-monolith architecture** that supports one core promise:

> **idea to approved brief to editable Godot scaffold to safe iteration, backed by real manifests, checkpoints, and provenance**

The architecture must behave like a serious creator system, not a prompt-to-demo toy.
That means the source of truth lives in durable product records, while agent/provider calls remain bounded helpers.

## 2. Architecture Principles
- deterministic artifact graph over chat-history dependence
- async compile/recompile jobs over synchronous UX theater
- Godot-first depth with engine-adapter boundaries
- trust surfaces backed by runtime truth
- private-by-default project posture
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

### 3.3 Data layer
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

## 4. First Vertical Slice
The first architecture-backed implementation slice is:
1. create project
2. capture intake
3. draft + approve brief
4. request compile
5. run Godot compile worker
6. finalize manifest + checkpoint + provenance
7. show compile summary / compare / provenance in UI

## 5. ADRs Locked in Step 1

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

## 6. What This Step Defers
The following are intentionally left for later architecture steps:
- exact security and row-level isolation rules
- provider secret handling
- checkpoint retention format
- worker isolation strategy
- CI/CD and rollout posture
- deeper export/publishing-safety delivery details

## 7. Step 1 Verdict
The architecture is now defined tightly enough to move into **data-security-and-integration-boundaries** without reopening the strategic wedge or UX contract.
