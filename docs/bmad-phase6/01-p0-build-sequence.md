# GameAIgents Implementation-Planning Step 1 — P0 Build Sequence

_Date: 2026-03-20_  
_Status: Implementation-planning step complete_  
_Scope: define the first executable build order that converts the locked PRD, UX, and architecture into a disciplined MVP implementation sequence_

## 1. Step Goal

This step answers one build-critical question:

> **What should GameAIgents build first, in what order, so the Godot-first creator-to-production promise becomes real without collapsing into feature sprawl or AI-demo theater?**

Architecture is done.
That does **not** mean the team should start coding everything in parallel.
The build order now matters as much as the feature list.

## 2. Build Principles Locked in This Step

- **Trust-critical scaffolding comes before clever generation depth.** If checkpoints, manifests, job state, and private-by-default boundaries are weak, the whole product promise rots.
- **One serious compile loop beats five fake capabilities.** The MVP should prove editable continuation, not breadth theater.
- **The first shipped slice must create durable project truth.** UI-only prototypes or provider demos are insufficient.
- **Safe re-entry matters.** A creator must be able to return to a project, see what happened, and continue without guesswork.
- **Deferred scope must be explicit.** World Sketch, Unity depth, social/community surfaces, and autonomous playtest expansion stay out of the first build sequence unless the core loop is already behaving.

## 3. Phase Definition Locked Here

The post-architecture bridge phase is now defined as:

> **Implementation Planning**

Its job is not to reopen product strategy.
Its job is to lock the order of execution so engineering starts on the right spine.

### First completed section in this phase
**Section:** `1-p0-build-sequence`

### Immediate next execution step after this planning section
**Next:** `implementation / sprint-0-foundation-and-trust-scaffolding`

## 4. Decision Verdict

The correct opening build order is:

1. **Sprint 0 — foundation and trust scaffolding**
2. **Sprint 1 — first compile loop and compile summary**
3. **Sprint 2 — safe recompile, compare/rollback, and provenance export**
4. **Sprint 3 — bounded playtest guidance and alpha hardening**

This means GameAIgents should **not** start with World Sketch providers, Unity parity, community feeds, or mobile/community moderation surfaces.
Those are real later opportunities, but they are the wrong first proof.

## 5. Why Sprint 0 Must Go First

Sprint 0 is the minimum serious substrate needed before any compile-facing claim is believable.
Without it, the team risks building a fancy shell around unstable runtime truth.

### Sprint 0 objective
Create the smallest real system that can hold creator projects, preserve approved brief truth, run a tracked async compile command, and store checkpoint/provenance metadata safely.

### Sprint 0 must establish
- app shell and project workspace routing
- authenticated single-owner alpha posture
- canonical Postgres schema for project + brief + run + checkpoint + provenance truth
- project-scoped object storage layout
- durable async run lifecycle state
- guarded compile worker boundary, even if the first worker is narrow and boring
- manifest/checkpoint/provenance creation contract
- baseline observability for run diagnosis

### Why this is the right first slice
Because GameAIgents wins on **editable, traceable continuation**.
That promise begins at the data/runtime layer, not at the prettiest generation UI.

## 6. Locked P0 Build Sequence

## 6.1 Sprint 0 — Foundation and Trust Scaffolding
**Purpose:** make the product capable of holding trustworthy project truth before deep feature behavior arrives.

### In scope
- workspace shell with core routes: `Projects`, `Intake`, `Brief`, `Compile`, `Compare`, `Provenance`
- auth and single-owner project access model
- project lifecycle state model aligned to UX contracts
- Postgres schema for:
  - projects
  - intake bundles
  - brief revisions
  - compile runs
  - checkpoints
  - provenance records
  - domain events
- object storage partitioning by project
- async job coordinator and compile-lane stub
- durable run-state transitions: `queued`, `accepted`, `running`, `succeeded`, `failed-*`
- baseline manifest/checkpoint/provenance record creation path
- redacted structured logging keyed by `projectId` and `runId`

### Acceptance gate
Sprint 0 is complete only when a seeded project can move through:
- project creation
- intake save
- brief approval persistence
- compile request enqueue
- tracked run lifecycle
- checkpoint/provenance record creation

even if the first compile output is still narrow or partially stubbed.

## 6.2 Sprint 1 — First Compile Loop and Compile Summary
**Purpose:** prove the flagship value path for the light action-adventure exploration slice.

### In scope
- intake form with raw input preservation
- brief editor with confirmed/inferred/risk field states
- compile readiness checklist
- first Godot adapter path for a narrow editable scaffold
- compile summary showing what exists now, warnings, and first inspection links
- first checkpoint surfaced in the UI

### Acceptance gate
A creator can go from vague idea to approved brief to first editable Godot scaffold for the flagship slice without leaving the product blind about what was generated.

## 6.3 Sprint 2 — Safe Recompile, Compare/Rollback, and Provenance Export
**Purpose:** prove continuation value instead of one-shot generation.

### In scope
- revision timeline
- semantic diff summary
- one bounded recompile scope at launch: **mechanics/config first**
- blast-radius review before recompile
- rollback action linked to checkpoint history
- provenance export: JSON + creator-readable markdown

### Acceptance gate
A creator can request one safe bounded change, understand what will change vs stay, and either accept the result or roll back cleanly.

## 6.4 Sprint 3 — Bounded Playtest Guidance and Alpha Hardening
**Purpose:** add the first narrow post-compile improvement loop and strengthen alpha reliability.

### In scope
- artifact-linked playtest observation cards
- suggestion routing to local edit vs recompile
- backup/restore rehearsal in staging
- queue budgets and alert thresholds
- basic support diagnostics grounded in metadata, not payload spelunking

### Acceptance gate
The MVP can support a founder-controlled alpha where compile and recompile are diagnosable, recoverable, and not purely manual heroics.

## 7. Explicit Deferrals

The following remain intentionally out of the first build sequence:

- World Sketch provider integration
- observer/extractor pipeline from world sessions
- Unity compile depth
- community showcase/feed/discovery
- in-app creator marketplace behavior
- autonomous playtest scoring theater
- deep mobile surfaces
- live generative player-facing content

These are all strategically valid later, but none of them should land before the core compile-and-continue spine works.

## 8. Challenge Findings That Changed the Build Order

### 8.1 Anti-spectacle cut
The most tempting wrong move is to start with the most demoable layer.
That would likely be World Sketch or flashy compile output.
This step rejects that.
The product needs durable truth before spectacle.

### 8.2 Trust-critical dependency audit
Compare/recompile and provenance are impossible to make trustworthy if the team postpones manifests, checkpoints, run states, and storage boundaries.
So those foundations moved earlier.

### 8.3 Blank-page-to-first-value compression test
The fastest believable value path is still:
`intake → brief approval → compile → inspect → bounded refine`

Not:
`chat → magic world → maybe export someday`

### 8.4 Alpha-ops war room result
A founder-controlled alpha can survive narrow feature depth.
It cannot survive opaque failures, missing checkpoint truth, or accidental overwrite behavior.

## 9. Team-Level Build Guidance Locked Here

- Build the backend truth model and the creator shell in parallel, but do not allow UI speed to outrun durable state.
- Prefer one narrow Godot compile lane with honest limitations over broad scaffolding that cannot preserve edits.
- Treat provenance and checkpoint creation as part of the definition of done for compile-facing work.
- Use fake/stubbed secondary capabilities only when they preserve the same data contracts the real system will use later.

## 10. Next Step

**Next actual build step:** `implementation / sprint-0-foundation-and-trust-scaffolding`

That is the first engineering slice worth starting now.
Anything broader would dilute the wedge before it proves itself.

## 11. Step Verdict

**Verdict: GameAIgents now has a credible post-architecture bridge into execution.**

The build order is locked around:
- trustworthy project truth first
- first compile loop second
- safe continuation third
- bounded playtest/alpha hardening fourth

That is the right sequencing for a creator-to-production copilot that wants to earn trust instead of borrowing hype.
