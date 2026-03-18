# GameAIgents — BMAD Workflow Plan (Updated 2026-03-17)

## Goal
Turn the new GameAIgents strategy into a robust BMAD-native execution plan that produces:
- a real product brief
- a grounded PRD
- creator UX
- platform architecture
- implementable epics and stories

This workflow now assumes the new thesis:

> **Idea Cascade → World Sketch → Engine Compile → Playtest Agents**

## Important framing
GameAIgents is **not** itself a single Godot game project.
It is a **creator platform for making games**.

That means:
- use the standard BMAD product/business flow for the platform itself
- use Game Dev Studio (`gds`) as a secondary reference for what generated Godot/Unity outputs should look like

## Workflow Tracks

### Track A — Product Platform Planning (Primary)
This is the main path for the GameAIgents product itself.

#### Session 1 — Product Brief refinement
Goal:
- turn `docs/project-brief-v0.md` into the authoritative product brief
- resolve first wedge, user, non-goals, and success metrics

Inputs:
- `docs/project-brief-v0.md`
- `docs/strategy/2026-03-17-competitive-learnings-and-world-model-plan.md`
- `docs/reference/research-daily/`

Must resolve:
- Godot-first vs Unity-first vs dual-track
- first genre/use-case wedge
- first non-gimmick export artifact
- role of world models in MVP

#### Session 2 — PRD
Goal:
- define the actual MVP product, not the dream pile

Include:
- creator onboarding and idea cascade
- artifact graph / structured outputs
- world sketch workflow
- engine compile outputs
- provenance / disclosure / moderation basics
- version compare and rollback
- playtest intelligence boundaries

Guardrails:
- no generic "build any game instantly" scope
- no world-model-as-runtime assumption
- no browser-only ceiling

#### Session 3 — UX Design
Goal:
- define the creator workflow UI and information architecture

Include:
- prompt/cascade flow
- artifact browser
- world sketch session review
- compare / rollback
- export flow
- publishing / provenance surfaces

#### Session 4 — Architecture
Goal:
- define technical system for the platform

Initial stack hypothesis:
- Next.js creator control surface
- orchestration layer for agents and providers
- artifact graph / structured project model
- world-sketch provider abstraction
- observer / extractor layer
- compiler targets for Godot + Unity
- telemetry + playtest analysis layer

#### Session 5 — Epics & Stories
Goal:
- break MVP into clean implementation slices

Expected epic areas:
1. creator control surface + project setup
2. idea cascade + structured artifact generation
3. engine compile v1
4. world sketch provider + extraction
5. provenance / disclosure / moderation basics
6. playtest review and iteration tools

#### Session 6 — Readiness Check
Goal:
- confirm scope, architecture, and story sequence are tight enough before engineering starts

Pass before any engineering sprint starts.

---

### Track B — Game Dev Studio Reference (Secondary)
Use `gds` selectively to ground what generated game outputs should look like.

#### What GDS is for here
- Godot-specific story structure reference
- UI/UX expectations for generated game projects
- QA / performance / TDD expectations for output projects
- example game-project scaffolds and workflow constraints

#### What GDS is NOT for here
- it is not the main planning framework for the SaaS/platform itself
- do not force the entire GameAIgents product definition through a "single Godot game" lens

## Recommended immediate next actions

### 1. Lock the starting brief
Use:
- `docs/project-brief-v0.md`

This is now the BMAD starting brief, not just a rough memo.

### 2. Produce the authoritative Product Brief
Use the starting brief plus strategy memo to create the real product brief artifact.

### 3. Keep strategy and product docs in sync
Any major decision from BMAD should update:
- `docs/project-brief-v0.md`
- `docs/strategy/2026-03-17-competitive-learnings-and-world-model-plan.md`

## Questions BMAD must answer early

1. What first user are we actually serving?
2. What exact first deliverable proves value?
3. What is the first credible engine export target?
4. How much world-sketch is enough for MVP?
5. Which parts are deterministic from day one?
6. What compliance/publishing helpers belong in MVP vs later?

## North Star
The project should optimize for this outcome:

> A creator can move from vague idea to structured playable engine-native prototype quickly, with real editability, continuation value, and far less chaos than current AI game tools.
