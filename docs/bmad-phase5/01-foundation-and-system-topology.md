# GameAIgents Architecture Step 1 — Foundation and System Topology

_Date: 2026-03-20_  
_Status: Architecture foundation locked for the MVP_  
_Scope: define the system shape and runtime boundaries before deeper security, data-boundary, and delivery detail work_

## 1. Step Goal

This step answers one downstream build question:

> **What technical foundation should GameAIgents stand on so the Godot-first creator-to-production workflow is real, durable, and safe to implement?**

The goal is not to finalize every integration detail.
The goal is to lock the topology, ownership boundaries, and first vertical slice so later architecture work stays disciplined.

## 2. Architecture Principles Locked in This Step

- **Continuation-first beats generation theater.** The architecture must optimize for editable engine-native output, not flashy browser demos.
- **Deterministic records beat chat reconstruction.** Artifact graph, manifests, checkpoints, and provenance must live in durable system state.
- **Async build lanes beat synchronous wishful thinking.** Compile and recompile are jobs with lifecycle, not UI-side magic.
- **Godot-first depth, engine-flexible core.** Engine-specific logic belongs behind adapters, not inside the whole product model.
- **Trust surfaces require backend truth.** Compare, rollback, provenance, and blast-radius UI must resolve against real manifests and records.
- **Optional world-sketch, mandatory compile spine.** World-model experimentation stays additive and cannot become the runtime source of truth.
- **Web-first single-owner alpha.** The MVP serves one technical creator at a time; no architecture decisions should be distorted by premature collaboration or community feeds.

## 3. Proposed MVP System Topology

```text
┌──────────────────────────────── Creator Browser ───────────────────────────────┐
│ Next.js Creator Workspace                                                      │
│ Projects | Intake | Brief | Compile | Compare | Playtest | Provenance        │
└───────────────────────────────┬───────────────────────────────────────────────┘
                                │ HTTPS / session-authenticated API
┌───────────────────────────────▼───────────────────────────────────────────────┐
│ Application API / BFF                                                         │
│ - project + brief endpoints                                                   │
│ - compile/recompile request handling                                          │
│ - compare / provenance read models                                            │
│ - policy / scope preflight                                                    │
└───────────────┬───────────────────────┬───────────────────────┬──────────────┘
                │                       │                       │
                │                       │                       │
┌───────────────▼──────────────┐ ┌──────▼────────────────┐ ┌───▼────────────────┐
│ Postgres / Artifact Graph    │ │ Object / Blob Storage │ │ Event / Job Layer  │
│ - projects                   │ │ - references          │ │ - queued jobs       │
│ - briefs                     │ │ - generated bundles   │ │ - outbox events     │
│ - artifacts + revisions      │ │ - manifests / exports │ │ - worker dispatch   │
│ - checkpoints                │ │ - checkpoint payloads │ │ - lifecycle status  │
│ - provenance / policy gates  │ └──────────┬────────────┘ └──────┬─────────────┘
└───────────────┬──────────────┘            │                     │
                │                           │                     │
                │                ┌──────────▼──────────┐  ┌──────▼────────────────┐
                │                │ Orchestration Layer │  │ Observability / Audit │
                │                │ - brief structuring │  │ - logs / traces        │
                │                │ - compile planning  │  │ - domain event sinks   │
                │                │ - scope guarding    │  │ - support diagnostics  │
                │                │ - playtest guidance │  └───────────────────────┘
                │                └──────────┬──────────┘
                │                           │
                │               ┌───────────▼───────────────────────────────────┐
                │               │ Engine / Provider Adapters                    │
                │               │ - Godot compiler adapter (MVP primary)        │
                │               │ - future Unity compiler adapter               │
                │               │ - optional World Sketch provider abstraction  │
                │               └───────────────────────────────────────────────┘
```

## 4. Core Runtime Boundaries

## 4.1 Creator control surface
**Technology posture:** Next.js + TypeScript web app.

**Why this boundary exists**
- It matches the locked UX creator workspace.
- It supports the single-owner alpha without premature native/mobile complexity.
- It keeps stateful creator work inside a controlled shell rather than a prompt box.

**What belongs here**
- authenticated workspace shell
- intake and brief editing flows
- compile/recompile request initiation
- compare, provenance, and playtest read models
- status polling / subscription UI for long-running jobs

**What does not belong here**
- compile execution
- manifest synthesis logic
- checkpoint mutation rules
- provider credentials or policy secrets

## 4.2 Application API / backend-for-frontend
**Role:** the API layer owns command validation, request shaping, session-aware authorization, idempotency enforcement, and read-model composition.

**Why it matters**
The UI must never directly mutate artifact graph or storage primitives in an ad hoc way.
Every trust-sensitive write should pass through a narrow command surface.

**MVP commands that live here**
- create project
- capture intake bundle and references
- save / approve brief revision
- request compile
- request recompile
- request rollback
- request provenance export
- request playtest guidance generation

## 4.3 Artifact graph and durable state store
**Technology posture:** Postgres-first relational core with typed tables for projects, artifacts, revisions, checkpoints, manifests, provenance, policy gates, and domain events.

**Why this is the architectural center**
The product’s moat is not model prompts; it is durable, inspectable, versioned project state.
Postgres is the right first source of truth because it gives:
- transactional integrity for trust-sensitive writes
- strong queryability for compare/provenance views
- clean outbox/event patterns
- a straightforward path to row-level project isolation

**Rule locked here**
The artifact graph is canonical product state.
Generated files, exports, and checkpoints point back to it; they do not replace it.

## 4.4 Object storage boundary
**Purpose:** store bulky or binary payloads outside the relational core.

**Examples**
- uploaded references
- generated project bundles
- checkpoint archives
- compile manifests with large file maps
- provenance export bundles
- optional future world-sketch captures

**Rule locked here**
Storage objects are addressed by durable IDs recorded in Postgres.
The system does not treat storage alone as the authoritative state model.

## 4.5 Job and orchestration lane
**Technology posture:** background-job system with explicit queue semantics and outbox-driven event emission.

**Why async is mandatory**
- compile and recompile are variable-duration operations
- provider calls and engine packaging can fail or retry
- compare/provenance trust depends on explicit lifecycle state
- the UI needs honest status, not fake progress theater

**Core orchestrated workflows in MVP**
1. intake normalization + brief drafting
2. compile planning
3. Godot compile execution
4. manifest + checkpoint finalization
5. recompile scope analysis
6. rollback execution
7. provenance export packaging
8. bounded playtest observation generation

## 4.6 Engine adapter boundary
**MVP primary adapter:** Godot compiler adapter.

**Why adapterization is locked now**
GameAIgents is strategically engine-flexible even though Godot is the first deep path.
If engine assumptions leak everywhere, Unity support becomes a rewrite instead of an additive adapter.

**Godot adapter responsibility**
- convert compile plan into Godot project scaffold artifacts
- generate scene shells, config/data files, controller baselines, and project metadata
- return generated outputs in a manifestable structure
- respect scope contracts during selective recompile

**Future adapter boundary**
Unity remains a future adapter contract, not dead strategy.
But no architecture choice in this step should pretend Unity launch parity exists.

## 4.7 Optional provider layer for world sketch and model services
This layer exists to protect the core from provider lock-in and hype-driven architecture drift.

**Allowed here**
- LLM brief-structuring providers
- optional World Sketch providers
- future vision/extractor services for captured world sessions

**Not allowed here**
- making provider sessions the canonical project state
- coupling core UX to a single vendor’s runtime assumptions
- requiring World Sketch in the first vertical slice

## 4.8 Observability and audit layer
Observability is a product requirement because compile trust, rollback confidence, and supportability depend on it.

**Must capture from day one**
- request IDs / idempotency keys
- compile/recompile lifecycle transitions
- checkpoint creation outcomes
- scope-guard decisions
- policy-gate results
- export generation events

This is not “enterprise later.”
It is how the team proves the workflow is real when something breaks.

## 5. First Vertical Slice Locked by This Architecture

The first implementation slice should travel through the architecture like this:

1. **Creator creates a project** in the web workspace.
2. **Raw intent + references** are persisted as intake entities.
3. **Structured brief revision** is created and then explicitly approved.
4. **Compile request** is submitted through the API with idempotency and validation.
5. **Compile planner** resolves the approved brief into a scoped Godot compile plan.
6. **Godot adapter worker** materializes the scaffold into storage-backed outputs.
7. **Manifest + checkpoint + provenance records** are finalized transactionally.
8. **Compare / provenance surfaces** read the durable records back into the UI.

This slice is enough to prove the product promise without needing community, marketplace, or full World Sketch support.

## 6. Architecture Decision Records Locked in Step 1

## ADR-001 — Use a web-first modular monolith for MVP
**Decision:** Start with a modular-monolith application shape rather than distributed microservices.

**Why**
- the workflow is still evolving
- trust-critical writes need transactional integrity
- the team needs shipping speed and debuggability more than service count theater

**Consequence**
Separate modules and workers are allowed, but the architecture should feel like one coherent product system.

## ADR-002 — Keep Postgres as the canonical artifact-graph source of truth
**Decision:** Persist project, artifact, revision, checkpoint, provenance, and policy data in a typed relational core.

**Why**
Trust surfaces, compare/rollback, and implementation sequencing all depend on durable state, not chat transcripts.

**Consequence**
Any cache, blob, or event sink must resolve back to relational truth.

## ADR-003 — Treat compile/recompile as explicit background jobs
**Decision:** Compile and recompile run asynchronously through a job lane with lifecycle states.

**Why**
This avoids fake synchronous UX and gives the product honest state transitions.

**Consequence**
The UI and API must be built around job-aware contracts from the start.

## ADR-004 — Isolate engine-specific behavior behind adapters
**Decision:** Put Godot-specific compile logic behind a defined adapter boundary.

**Why**
Godot-first depth should not become permanent Godot-only lock-in at the data-model layer.

**Consequence**
The core domain model stays engine-aware but engine-agnostic enough for later Unity expansion.

## ADR-005 — Put manifests, checkpoints, and provenance in the primary architecture path
**Decision:** These trust objects are first-class system outputs, not optional extras.

**Why**
Without them, compare, rollback, disclosure, and creator trust collapse.

**Consequence**
Any “successful compile” is incomplete unless those records are created.

## ADR-006 — Keep World Sketch optional and provider-abstracted
**Decision:** World Sketch and other world-model capabilities live behind optional provider interfaces.

**Why**
The deterministic compile spine must remain the core proof object.

**Consequence**
Future world features can be added without polluting the MVP runtime model.

## 7. Delivery Posture and Build Implications

### Stack posture locked in this step
- **Frontend + BFF:** Next.js / TypeScript
- **Primary database:** Postgres
- **Storage:** object/blob storage for references, bundles, exports, checkpoints
- **Execution:** async workers for compile/recompile/export/playtest jobs
- **Primary engine adapter:** Godot 4.x
- **Observability:** structured logs + event stream + support-facing audit trail

### What this architecture intentionally avoids for MVP
- microservice sprawl
- native mobile dependency
- live multiplayer/runtime hosting assumptions
- in-app community feed or marketplace complexity
- world-model runtime dependency
- equal launch depth across engines

## 8. Open Architecture Risks Carried Forward

These are real but intentionally deferred to later steps:
- exact row-level security and project isolation rules
- provider secret handling and integration credential boundaries
- checkpoint storage format and retention policy
- queue implementation choice and worker isolation model
- export/publish-safety pipeline details
- deeper operational rollout, CI/CD, and environment promotion rules

Those belong in the next architecture steps, not in this foundation pass.

## 9. Step Verdict

**Verdict: the architecture foundation is now strong enough to support data-boundary design and later implementation planning without reopening the product wedge.**

GameAIgents now has a clear technical shape:
- a web-first creator workspace
- a durable artifact-graph core
- an async compile/recompile lane
- a Godot-first engine adapter
- trust objects embedded directly in the runtime model

That is the right foundation for a serious creator-to-production copilot.
