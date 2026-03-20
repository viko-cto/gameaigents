# GameAIgents — Product Requirements Document

_Date: 2026-03-20_  
_Status: Completed — Steps 1 `foundation-and-scope`, 2 `feature-detail`, 3 `data-and-interface-contracts`, and 4 `polish-and-traceability` completed_  
_Authoritative PRD ready for downstream UX / architecture handoff_

## Document status
This PRD is being built section-by-section through the BMAD process.
All four PRD steps are now complete: **foundation-and-scope**, **feature-detail**, **data-and-interface-contracts**, and **polish-and-traceability**.
Downstream phases should extend this file rather than reopen its strategic wedge, target user, or trust posture casually.

## 1. Executive Summary
GameAIgents is building a **creator-to-production copilot** for game development.
The first release is intentionally narrow: it serves a **solo technical creator** who wants to move from a fuzzy game idea to an **editable Godot prototype slice** without getting trapped in brittle prompt-to-game output.

The first release does not try to prove the whole long-term platform.
It proves one specific value loop:

> **idea cascade → editable Godot scaffold → human continuation → selective recompile → narrow playtest refinement**

The product succeeds only if creators perceive the output as a real starting point worth continuing.

## 2. Product Objective
### 2.1 Release objective
Reduce blank-page friction and restart waste for solo technical creators by producing an editable Godot-first prototype slice they can continue building within the same week.

### 2.2 Product promise
GameAIgents helps a creator transform:
- fuzzy concept
- scattered references
- uncertain mechanic structure
- unclear technical starting point

into:
- structured project brief
- compile-ready artifact graph
- editable Godot scaffold
- compare / rollback history
- focused refinement loop

## 3. Target User and Jobs Contract
### 3.1 Primary user
**Solo technical creator**
- indie founder, technical designer, or hacker-builder
- comfortable inside a real engine workflow
- wants leverage without surrendering authorship or editability

### 3.2 Early adjacency
**Solo/duo builders** may participate in alpha validation, but the release should not broaden itself around collaboration complexity yet.

### 3.3 Core job to be done
> Help me go from a vague game idea to an editable, engine-native prototype I can continue building this week.

### 3.4 Trust and emotional jobs
- reduce blank-page intimidation
- create real momentum without dead-end generated junk
- preserve inspectability, reversibility, and control
- lower early publish/provenance anxiety without turning the product into bureaucracy

## 4. Core Experience Contract
The MVP must support this canonical loop:
1. creator starts from prompt, references, and constraints
2. system runs Idea Cascade into a structured brief
3. system compiles the brief into an editable Godot scaffold
4. creator opens and continues the project in Godot
5. system supports selective recompile on narrow high-value boundaries
6. system provides narrow playtest-guided refinement suggestions

## 5. Scope Boundary
### 5.1 In scope for the first release
- structured project creation and Idea Cascade
- compile-ready artifact graph baseline
- Godot-first scaffold generation for a world-driven single-player prototype slice
- selective recompile on narrow approved boundaries
- compare / rollback and provenance baseline
- private-by-default project posture
- narrow playtest guidance tied to artifacts

### 5.2 Explicitly out of scope
- equal-depth Unity support at launch
- Unreal support
- world-model-as-runtime claims
- mandatory World Sketch in every flow
- multiplayer or live-service depth
- creator marketplace / discovery feed
- full in-house asset-generation stack
- “build any game instantly” promise

## 6. Foundational Functional Requirements
### FR-01 Structured project creation
The system shall create and persist a structured project brief from prompt, references, and creator constraints.

### FR-02 Idea Cascade decomposition
The system shall turn fuzzy inputs into explicit gameplay, world, progression, mechanic, and technical assumptions.

### FR-03 Compile-ready artifact graph
The system shall maintain durable intermediate artifacts between the brief and engine outputs.

### FR-04 Editable Godot scaffold generation
The system shall generate a Godot-first prototype scaffold that target users can open and continue editing.

### FR-05 Narrow selective recompile
The system shall support targeted recompile on approved boundaries while preserving edits outside the selected scope.

### FR-06 Compare and rollback
The system shall allow revision comparison and rollback for meaningful generation and compile actions.

### FR-07 Provenance baseline
The system shall record meaningful generation, compile, and lineage events sufficient for trust and future publishing-support layers.

### FR-08 Private-by-default posture
The system shall treat creator projects as private by default.

### FR-09 Playtest-guided refinement baseline
The system shall provide narrow, artifact-linked playtest guidance around onboarding clarity, pacing/readability, and basic balance hypotheses.

### FR-10 Continuation-first output integrity
The system shall optimize outputs for continuation value inside Godot rather than browser-demo spectacle.

## 7. Success Criteria and Validation Gates
### 7.1 Core success question
Do target users experience the compiled output as a real scaffold worth continuing?

### 7.2 Validation gates
- **Brief usefulness:** users say the structured brief clarified the project
- **Continuation reality:** users can open and modify the scaffold meaningfully
- **Recompile trust:** users complete one selective recompile without feeling progress was destroyed
- **Repeat willingness:** users would use the workflow again for another prototype slice

### 7.3 Candidate MVP metrics
- time to first editable scaffold
- % of users who continue editing after first compile
- % of users who complete one selective recompile successfully
- creator-rated editability/usefulness
- creator-rated reduction in blank-page and restart pain

## 8. Non-Goals
The first release does not attempt to prove:
- the entire GameAIgents platform vision
- equal engine depth
- a complete World Sketch surface
- finished-game quality
- generalized AI game creation for all creator types
- platform-scale community governance

## 9. Historical Open Questions Carried Forward From Step 1
- exact flagship demo genre inside the world-driven single-player lane
- precise internal schema for artifact graph and revision lineage
- exact compile output manifest structure for Godot projects
- how selective recompile targets map to artifact contracts vs file-level contracts
- whether first playtest guidance is heuristics-only or light-telemetry-assisted
- how Unity stays visible without overstating v1 depth
- how future World Sketch support plugs into the artifact graph without polluting MVP simplicity

Most of these were resolved in Sections 16-26. They remain here only as historical traceability from the initial PRD foundation pass.

## 10. Historical PRD Build Sequence (Completed)
1. data and interface contracts — completed in Sections 16-22
2. polish and traceability — completed in Sections 23-26

## 11. Foundation Step Decision Summary
- primary user locked to **solo technical creator**
- MVP proof object locked to **editable Godot prototype slice**
- canonical loop locked to **idea cascade → compile → continue → selective recompile → playtest refinement**
- trust baseline includes **compare / rollback / provenance / privacy defaults**
- World Sketch remains strategically important but optional in the first proof
- Unity remains strategically visible but not first-depth scope

## 12. Feature Detail and User Flows

### 12.1 MVP feature spine
The first release shall center on this explicit feature sequence:
- project intake workspace
- Idea Cascade editor
- artifact graph / project memory
- Godot compile workspace
- selective recompile v1
- compare / rollback surface
- provenance and trust baseline
- narrow playtest guidance

### 12.2 Project intake workspace
The intake workspace shall let a creator begin from rough prompt, references, and explicit constraints while preserving the raw idea alongside structured interpretation.
The intake experience shall flag out-of-scope ambitions such as multiplayer or instant full-game expectations without blocking productive use.

### 12.3 Idea Cascade editor
The system shall convert raw input into an editable structured brief covering fantasy, player role, camera, movement mode, core loop, objective structure, world assumptions, mechanic priorities, and technical constraints.
Creators shall review and edit this brief before compile.

### 12.4 Artifact graph / project memory
The system shall persist durable artifacts between the brief and engine output, including revision anchors and lineage metadata.
This artifact graph is required so selective recompile, compare/rollback, and provenance resolve against stable project structure instead of one opaque prompt transcript.

### 12.5 Godot compile workspace
The compile workspace shall generate a Godot 4.x prototype scaffold with scene hierarchy shells, controller baseline, input mappings, objective/progression shell, lightweight UI shell, and configuration/data files appropriate to the chosen prototype lane.
The compile flow shall include a creator-readable summary of what was generated and where to inspect first.

### 12.6 Selective recompile v1
Selective recompile shall ship only for narrow, approved boundaries in MVP.
Initial target boundaries are:
- scene structure
- mechanics/config surfaces
- selected interaction or UI shell changes where safe

The system shall disclose expected blast radius before execution and preserve creator edits outside the selected boundary unless a broader overwrite is explicitly approved.

### 12.7 Compare / rollback surface
The system shall create revision checkpoints for compile and recompile actions and expose a creator-helpful compare view for meaningful changes.
Rollback shall be available for meaningful generation events so creators can recover from poor outcomes.

### 12.8 Provenance and trust baseline
The product shall record material generation and compile/recompile actions, preserve artifact lineage and timestamps, and expose lightweight contextual provenance summaries.
Trust surfaces must help creators understand what changed and where outputs came from without turning the product into a governance dashboard.

### 12.9 Narrow playtest guidance
The product shall provide artifact-linked refinement guidance focused on onboarding clarity, objective readability, pacing roughness, and basic balance/friction hypotheses.
This layer shall remain honest and bounded; it helps creators refine a prototype slice rather than claiming full autonomous QA depth.

## 13. Core User Flows

### Flow A — First compile
1. creator creates a project from rough idea, references, and constraints
2. system drafts the Idea Cascade brief
3. creator reviews and edits the brief
4. system compiles the project into an editable Godot scaffold
5. creator opens the output in Godot and inspects top-level project structure

**Success condition:** the creator sees the output as a real starting point worth continuing.

### Flow B — Targeted change via selective recompile
1. creator requests a narrow change or edits the brief
2. system proposes safe recompile boundaries
3. creator selects an approved target scope
4. system recompiles only that boundary
5. compare view shows what changed
6. creator accepts the result or rolls back

**Success condition:** the creator feels progress was preserved rather than erased.

### Flow C — Post-compile refinement
1. creator reviews the compiled prototype slice
2. system surfaces narrow playtest observations
3. creator inspects the linked artifact/system behind the observation
4. creator chooses local edit, selective recompile, or rollback

**Success condition:** the guidance leads to a real next action.

## 14. Additional Functional Requirements from Step 2

### FR-11 Project intake must preserve raw creator intent
The system shall store original prompt/reference input alongside structured outputs.

### FR-12 Brief review before compile
The system shall provide an editable structured brief review step before compile execution.

### FR-13 Compile summary visibility
The system shall provide a creator-readable compile summary describing major generated artifacts and suggested next inspection points.

### FR-14 Recompile boundary disclosure
The system shall explain the selected recompile boundary and expected blast radius before execution.

### FR-15 Edit preservation outside target scope
The system shall preserve creator edits outside the selected recompile boundary unless the user explicitly approves a broader overwrite.

### FR-16 Revision checkpoints for compile actions
The system shall create revision checkpoints for compile and recompile events that compare/rollback can target.

### FR-17 Artifact-linked guidance
The system shall connect playtest guidance to visible artifacts, systems, or config surfaces whenever possible.

### FR-18 Risk flagging for out-of-scope requests
The system shall flag, but not theatrically over-block, requests that exceed the MVP wedge or trust envelope.

## 15. Step 2 Decision Summary
- MVP feature spine locked to **intake → Idea Cascade → artifact graph → Godot compile → selective recompile → compare/rollback → provenance → narrow playtest guidance**.
- **Compile summary**, **artifact graph**, and **compare/rollback** are treated as trust-critical product features, not polish.
- **Selective recompile** is locked to narrow shipping boundaries with explicit blast-radius disclosure.
- **Playtest guidance** remains inside scope only as artifact-linked refinement help.
- Step 3 should now define the underlying data and interface contracts that make these features implementable.

## 16. Data and Interface Contracts

This section defines the canonical contracts that make the GameAIgents MVP implementable without depending on chat-history reconstruction, unsafe overwrite behavior, or vague trust surfaces.
The goal is to keep **intake → brief → artifact graph → compile → selective recompile → compare/rollback → provenance → playtest guidance** on one coherent underlying model.

### 16.1 Contract design principles

- **Typed artifacts beat chat-history dependency:** project state must survive outside a conversation transcript.
- **Lineage must survive every compile, recompile, rollback, and export:** creator trust collapses if history cannot be reconstructed.
- **Semantic scopes come before file paths:** creators think in scene/mechanics/UI boundaries, not internal path trees.
- **Deterministic build facts, model-assisted drafting:** LLMs can help draft structure, but manifests, scope guards, and provenance define what actually happened.
- **Godot-first execution, engine-flexible core:** Godot is the first deep adapter, not the entire product data model.
- **Private by default, explicit when exported:** creator work is private unless intentionally shared or exported.
- **World Sketch stays optional but structurally compatible:** future world inputs should fit the graph without becoming mandatory in MVP.

### 16.2 Canonical domain entities

#### Project and intake entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProjectWorkspace` | Canonical project shell | `id`, `ownerId`, `name`, `primaryEngine`, `privacyMode`, `status`, `createdAt` | MVP assumes solo ownership but should not block later collaborator support. |
| `CreatorIntentBundle` | Raw creator input before structured drafting | `id`, `projectId`, `rawPrompt`, `constraintJson`, `capturedAt`, `createdBy` | Preserves original intent instead of replacing it with only inferred structure. |
| `SourceReference` | Uploaded or linked source context | `id`, `projectId`, `referenceType`, `storageRef`, `label`, `rightsNote`, `addedAt` | Covers screenshots, docs, mood boards, snippets, and future world inputs. |
| `BriefRevision` | Versioned structured brief state | `id`, `projectId`, `parentRevisionId?`, `briefJson`, `status`, `createdAt`, `createdBy` | Compile may only run against an explicit approved revision. |

#### Artifact graph, compile, and revision entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProjectArtifact` | Typed node in the artifact graph | `id`, `projectId`, `artifactType`, `semanticScope`, `engineTarget`, `currentRevisionId`, `status`, `createdAt` | Artifact types include `brief`, `compile-spec`, `scene-shell`, `config`, `ui-shell`, `playtest-note`, and future `world-sketch`. |
| `ArtifactLink` | Explicit lineage relationship between artifacts | `id`, `fromArtifactId`, `toArtifactId`, `relationshipType`, `createdAt` | Supports `derived-from`, `supersedes`, `depends-on`, and `references`. |
| `ArtifactRevision` | Immutable content revision for one artifact | `id`, `artifactId`, `contentRef`, `summary`, `createdAt`, `createdBy`, `sourceRunId?` | History must remain inspectable even when the graph points at the current revision. |
| `CompileRun` | One compile or recompile execution unit | `id`, `projectId`, `runType`, `engineTarget`, `sourceBriefRevisionId`, `status`, `requestedBy`, `requestedAt`, `completedAt?` | `runType` starts as `compile` or `selective-recompile`. |
| `CompileManifest` | Machine-readable + creator-readable output summary | `id`, `compileRunId`, `generatedArtifactsJson`, `fileMapJson`, `inspectionPointsJson`, `warningsJson`, `createdAt` | Backbone for compile summary, compare/rollback, and trust surfaces. |
| `ScopeContract` | Semantic recompile boundary mapped to real files/artifacts | `id`, `projectId`, `scopeType`, `label`, `artifactIdsJson`, `allowedPathsJson`, `blockedPathsJson`, `blastRadius`, `createdAt` | MVP scope types: `scene-structure`, `mechanics-config`, `interaction-ui`. |
| `RecompileRequest` | User request for a bounded update | `id`, `projectId`, `scopeContractId`, `requestedChange`, `baselineRevisionId`, `approvalState`, `executionState`, `createdAt` | Separates creator intent from execution approval. |
| `RevisionCheckpoint` | Restore point for compile/recompile/rollback | `id`, `projectId`, `checkpointType`, `sourceRunId`, `manifestId`, `snapshotRef`, `createdAt` | Compare/rollback must target meaningful checkpoints, not arbitrary chat turns. |

#### Trust, playtest, and future-compatibility entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProvenanceRecord` | Source + generation history for meaningful outputs | `id`, `projectId`, `subjectType`, `subjectId`, `provenanceClass`, `provider`, `model`, `promptRef?`, `createdAt` | Provenance must survive export and future publishing workflows. |
| `PolicyGateResult` | Safety / disclosure / platform-aware check result | `id`, `projectId`, `subjectType`, `subjectId`, `gateType`, `result`, `reasonJson`, `checkedAt` | Keeps trust logic auditable instead of hidden in prompts. |
| `PlaytestObservation` | Artifact-linked playtest guidance unit | `id`, `projectId`, `checkpointId`, `observationType`, `artifactRef`, `severity`, `hypothesis`, `suggestedAction`, `createdAt` | Must point to a concrete artifact or scope, not vague commentary. |
| `WorldSketchArtifact` | Optional future world/sketch input artifact | `id`, `projectId`, `captureType`, `mediaRef`, `extractedFactsJson`, `compatibilityStatus`, `createdAt` | Keeps future world input structurally compatible without forcing it into MVP. |

### 16.3 Core state and lifecycle contracts

#### Artifact lifecycle

| State | Meaning | User Impact |
|---|---|---|
| `draft` | Artifact exists but is not approved for downstream compile use | Editable but not compile-eligible |
| `approved` | Artifact is accepted as current structured truth | Eligible for compile planning |
| `materialized` | Artifact produced real engine or system output | Appears in compare/rollback and provenance |
| `superseded` | A newer revision or artifact replaced it | Remains inspectable but not current |
| `reverted` | Artifact was rolled back from a later state | Previous checkpoint restored, history retained |
| `archived` | Artifact retained for history/export only | Hidden from default workflow views |

#### Compile lifecycle

`requested` → `planning` → `queued` → `running` → `succeeded` or `failed` or `cancelled`

A compile is not complete unless it produces:
- a `CompileRun` status transition
- a `CompileManifest`
- at least one `RevisionCheckpoint`
- provenance records for meaningful generated outputs

#### Selective recompile lifecycle

`proposed` → `reviewed` → `approved` → `executing` → `succeeded` or `failed` or `rejected` or `reverted`

Selective recompile may only execute against a declared `ScopeContract`. If requested changes exceed that scope contract or overlap blocked paths, the system must warn, reject, or require broader explicit approval instead of silently proceeding.

#### Provenance classes

| Class | Meaning | User Impact |
|---|---|---|
| `human-authored` | Created directly by the creator | Exported as human-originated |
| `ai-generated` | Generated fresh by the system | Must remain visible in provenance/export views |
| `ai-modified` | Existing artifact was transformed by AI | Requires before/after linkage |
| `imported-reference` | External source used as inspiration/context | Must preserve source note and rights label |
| `user-edited-after-ai` | Human changed an AI-origin artifact later | Important for continuation and disclosure support |

## 17. Technical and Interface Requirements

- **FR-19** The system shall persist one canonical `CreatorIntentBundle` for each project revision cycle so raw input remains visible alongside structured brief revisions.
- **FR-20** The system shall store project state as a typed artifact graph rather than as a chat transcript or opaque blob.
- **FR-21** Each durable artifact relationship shall be represented through explicit `ArtifactLink` lineage so downstream outputs can trace back to source artifacts.
- **FR-22** Brief revisions shall be immutable once approved for compile planning; later changes create new revisions rather than mutating history in place.
- **FR-23** Every compile or recompile shall create a `CompileRun` record containing source brief revision, engine target, run type, status, and request timestamps.
- **FR-24** Every successful compile or recompile shall produce a `CompileManifest` containing generated artifacts, file map, creator inspection points, and warnings.
- **FR-25** Selective recompile shall execute only against a declared `ScopeContract` that maps creator-meaningful scope to constrained artifact and file paths.
- **FR-26** Before a selective recompile executes, the system shall disclose expected blast radius, preserved areas, and blocked areas in creator-readable language.
- **FR-27** The system shall preserve creator edits outside the approved recompile scope or explicitly refuse execution when edit-preservation cannot be verified.
- **FR-28** The system shall create a `RevisionCheckpoint` for each compile, recompile, and rollback event so compare/rollback always target durable restore points.
- **FR-29** The system shall record provenance for meaningful generated, modified, imported, and exported artifacts with model/provider and revision linkage.
- **FR-30** Creator-facing compile summaries, compare views, and rollback views shall resolve against manifests and checkpoints rather than best-effort text reconstruction.
- **FR-31** Playtest observations shall reference concrete artifact ids, semantic scopes, or checkpoint ids rather than generic project-level commentary.
- **FR-32** The artifact graph shall support optional `WorldSketchArtifact` nodes without making world input mandatory in the MVP loop.
- **FR-33** Trust-critical write operations, including project creation, compile requests, recompile requests, rollback actions, and export generation, shall accept idempotency keys.
- **FR-34** The platform shall emit domain events for core workflow state changes so analytics, orchestration, and audit flows do not depend on ad hoc UI instrumentation.
- **FR-35** Project workspaces and artifacts shall be private by default; exports, shares, or collaboration surfaces require explicit user action.
- **FR-36** Policy checks for publish-safety, provenance completeness, and out-of-scope risk shall run as explicit `PolicyGateResult` records rather than hidden one-off prompt rules.

## 18. Interface Specifications

### 18.1 Client-facing API surface

| Endpoint / Action | Purpose | Required Request Fields | Contract Notes |
|---|---|---|---|
| `POST /api/projects` | Create project workspace | `idempotencyKey`, `name`, `primaryEngine`, `privacyMode` | Returns `ProjectWorkspace` and initial graph root. |
| `POST /api/projects/{id}/intake` | Capture raw creator intent and references | `idempotencyKey`, `rawPrompt`, `constraintJson`, `references[]` | Produces `CreatorIntentBundle` and `SourceReference` records. |
| `POST /api/projects/{id}/brief-revisions` | Save/edit structured brief revision | `idempotencyKey`, `parentRevisionId?`, `briefJson`, `status` | Compile may only use an approved revision. |
| `GET /api/projects/{id}/artifact-graph` | Read artifact graph for UI and compare flows | `revisionId?` | Returns artifacts, links, statuses, and current checkpoints. |
| `POST /api/projects/{id}/compile-runs` | Start first compile | `idempotencyKey`, `sourceBriefRevisionId`, `engineTarget` | Returns `CompileRun` id and initial status. |
| `GET /api/compile-runs/{id}` | Read compile status and summary | none | Returns lifecycle state, warnings, and manifest reference when available. |
| `POST /api/projects/{id}/recompile-requests` | Start selective recompile flow | `idempotencyKey`, `scopeContractId`, `requestedChange`, `baselineRevisionId` | Must return blast-radius disclosure before execution finalization. |
| `GET /api/projects/{id}/revisions/{id}/compare` | Compare revision checkpoints | `againstRevisionId` | Compare must be manifest-aware, not raw file diff only. |
| `POST /api/projects/{id}/revisions/{id}/rollback` | Restore prior checkpoint | `idempotencyKey`, `targetCheckpointId` | Must create a new checkpoint recording the rollback action. |
| `GET /api/projects/{id}/provenance/export` | Export provenance bundle | `format?` | Export should include revision lineage and policy flags. |
| `POST /api/projects/{id}/playtest-guidance` | Generate bounded playtest observations | `checkpointId`, `focusAreas[]` | Returns artifact-linked observations and next actions. |

### 18.2 Internal service contracts

| Service Contract | Input | Output | Failure Behavior |
|---|---|---|---|
| `IntakeNormalizationService` | raw prompt, constraints, references | normalized `CreatorIntentBundle` + source refs | Preserve messy input; never discard creator phrasing silently |
| `BriefStructuringService` | intent bundle + approved references | `BriefRevision` candidate | Must separate inferred assumptions from explicit creator input |
| `ArtifactGraphService` | project + revisions + manifests | typed graph read model | If lineage is incomplete, mark graph degraded instead of fabricating links |
| `CompilePlanner` | approved brief revision + target engine | compile plan + target artifact set | Reject impossible or out-of-scope plans before compile starts |
| `GodotCompilerAdapter` | compile plan + artifact graph | generated files + artifact revisions + manifest entries | No partial failed output may masquerade as successful current state |
| `ScopeGuardService` | requested change + baseline revision + scope contract | allowed paths, blocked paths, blast-radius summary | Must fail closed when scope cannot be resolved safely |
| `CompareRollbackService` | checkpoint ids + manifest refs | compare payload or restored checkpoint | Rollback must be atomic; partial restore is forbidden |
| `ProvenanceAssembler` | artifact revisions + run metadata + policy results | provenance bundle | Missing provenance must surface as incomplete, not silently omitted |
| `PlaytestObservationService` | checkpoint + artifacts + focus areas | `PlaytestObservation[]` | Must reject unsupported grand claims beyond available evidence |
| `PolicyGateService` | artifact/run/export request | `PolicyGateResult[]` | Must block or warn explicitly by configured severity |

### 18.3 Domain event contracts

| Event | Trigger | Required Payload |
|---|---|---|
| `project.intake.captured` | Raw intent persisted | `projectId`, `intentBundleId`, `referenceCount`, `createdBy` |
| `brief.revision.approved` | Brief revision approved for compile | `projectId`, `briefRevisionId`, `parentRevisionId?`, `createdBy` |
| `compile.requested` | Compile run created | `projectId`, `compileRunId`, `engineTarget`, `runType` |
| `compile.succeeded` | Compile completed successfully | `projectId`, `compileRunId`, `manifestId`, `checkpointId` |
| `recompile.requested` | Recompile flow started | `projectId`, `recompileRequestId`, `scopeContractId`, `baselineRevisionId` |
| `recompile.succeeded` | Recompile completed | `projectId`, `recompileRequestId`, `manifestId`, `checkpointId` |
| `revision.rollback.performed` | Rollback completed | `projectId`, `targetCheckpointId`, `newCheckpointId`, `triggeredBy` |
| `playtest.guidance.generated` | Playtest observations created | `projectId`, `checkpointId`, `observationCount`, `focusAreas` |
| `provenance.exported` | Provenance bundle generated | `projectId`, `exportFormat`, `artifactCount`, `policySummary` |

## 19. Trust, Privacy, and Publish-Safety Contracts

### 19.1 Data classes

| Data Class | Examples | Default Visibility | Handling Rule |
|---|---|---|---|
| `project-private` | raw prompts, references, brief drafts, source files | project owner only | private until explicit export/share action |
| `generated-build` | manifests, generated files, scope maps, checkpoints | project owner only | can be exported only with explicit provenance packaging |
| `publish-support` | provenance bundle, disclosure notes, policy results | owner-controlled export | never auto-shared publicly |
| `system-sensitive` | credentials, provider secrets, internal moderation/policy rules | internal only | encrypted, least-privilege, never exposed in creator UI |

### 19.2 Operating rules

- A compile summary is a trust surface and must reflect actual manifest data, not narrative guesswork.
- Compare/rollback views must prefer creator-meaningful scopes and files over raw model or log noise.
- Selective recompile must fail closed when the system cannot confidently preserve work outside the approved boundary.
- Provenance must remain lightweight in the default workflow, but complete enough for later export and platform disclosure support.
- World Sketch inputs, if introduced later, must be treated as optional source artifacts rather than replacing the deterministic artifact spine.

## 20. Measurable Non-Functional Requirements

- **NFR-001 Graph Responsiveness:** The artifact graph view shall load in <= 1.5 seconds p95 for MVP-scale projects.
- **NFR-002 Compile Acknowledgement:** Creating a compile or recompile request shall return accepted status and run id in <= 2.0 seconds p95.
- **NFR-003 First Status Visibility:** Compile jobs shall expose their first lifecycle update in <= 5.0 seconds p95 after request acceptance.
- **NFR-004 Blast-Radius Analysis:** Scope analysis for selective recompile shall complete in <= 4.0 seconds p95 for supported MVP boundaries.
- **NFR-005 Manifest Availability:** A successful compile or recompile shall produce a creator-readable summary and machine-readable manifest within <= 15 seconds of job completion p95.
- **NFR-006 Checkpoint Integrity:** 100% of successful compile, recompile, and rollback actions shall create a valid revision checkpoint and manifest linkage.
- **NFR-007 Failure Safety:** Failed or cancelled recompile runs shall leave the last good checkpoint restorable without manual intervention.
- **NFR-008 Reliability:** Core project, graph, compile-status, compare, rollback, and provenance endpoints shall achieve >= 99.5% monthly availability excluding scheduled maintenance.
- **NFR-009 Security:** Project-private and system-sensitive data shall be encrypted in transit and at rest, with secrets stored outside application code.
- **NFR-010 Traceability:** 100% of creator-facing compile summaries, compare views, rollback actions, and playtest observations shall resolve to recorded manifests, checkpoints, or artifact ids in internal audit views.

## 21. Step 3 Elicitation Outcomes

### Architecture decisions locked in this step

| ADR | Decision | Why It Was Chosen | Product Consequence |
|---|---|---|---|
| ADR-001 | Use a typed artifact graph with immutable revisions and explicit lineage links | Creators need inspectable workflow state, while engineering needs durable structure | The product no longer depends on chat-history reconstruction |
| ADR-002 | Define selective recompile through semantic `ScopeContract` boundaries mapped to constrained files/artifacts | File paths alone are unsafe and not creator-meaningful | Recompile can be honest about blast radius and preservation |
| ADR-003 | Make `CompileRun`, `CompileManifest`, `RevisionCheckpoint`, and `ProvenanceRecord` first-class records | Compile trust requires durable operational facts | Compare/rollback, compile summary, and provenance now share one source of truth |
| ADR-004 | Keep engine target on runs/artifacts but isolate Godot-specific logic inside the compiler adapter layer | Godot-first execution should not become Godot-only architecture | Unity expansion remains additive instead of requiring a full data-model rewrite |
| ADR-005 | Model World Sketch as an optional future artifact type | Strategic compatibility matters, but mandatory world input would bloat the MVP | The north-star story stays intact without distorting launch scope |
| ADR-006 | Require explicit policy-gate records and domain events at the contract layer | Trust/compliance and analytics cannot depend on ad hoc prompts or front-end hacks | Publish-safety review and funnel analysis become implementation-ready |

### Cross-functional war room resolutions

- **Design + Engineering:** compile manifest must include creator inspection points, not just machine-readable file listings.
- **Product + Trust:** provenance has to be lightweight in the default workflow, but complete enough for later export/disclosure needs.
- **Engineering + Trust:** recompile must fail closed when preservation guarantees are weak; silent overwrite is worse than refusal.
- **Product + Analytics:** domain events belong in the contract layer so step-level conversion and failure analysis stay reliable.
- **Strategy + Architecture:** World Sketch remains optional in MVP, but the graph cannot paint future world inputs into a structural corner.

### Self-consistency validation for this step

- The contracts reinforce the **solo technical creator** wedge by optimizing for inspectable continuation, not multiplayer or team complexity.
- The contracts preserve the **Godot-first compile-and-continue loop** while keeping engine target explicit enough for later Unity expansion.
- The contracts strengthen the **compare / rollback / provenance / privacy** trust position rather than treating it as later hardening.
- The contracts keep **playtest guidance** honest by forcing observations to resolve to checkpoints and artifacts.
- The contracts avoid turning World Sketch into mandatory workflow ceremony while still supporting future integration.

## 22. Step 3 Hardening Summary

This contracts step was deliberately hardened through multiple elicitation lenses:
- **Architecture Decision Records:** forced explicit choices on artifact shape, run records, scope boundaries, and future compatibility.
- **Cross-Functional War Room:** reconciled creator UX, engineering safety, analytics needs, and trust requirements into one enforceable contract set.
- **Failure-Mode Analysis:** centered the design around preventing silent overwrite, opaque compile output, and fake traceability.
- **Self-Consistency Validation:** verified that the contract layer still serves the same wedge, feature spine, and trust promise locked in earlier steps.

**Step 3 verdict:** the PRD now has a real underlying contract model for artifact graph, compile/recompile, compare/rollback, provenance, and bounded playtest guidance. The remaining PRD task was a final polish-and-traceability pass.

## 23. Step 4 — Polish, Traceability, and Handoff Readiness

This step does **not** reopen the wedge.
It exists to make the PRD implementation-ready by tightening language, cleaning contradictions, mapping requirements back to evidence, and locking the working defaults that downstream UX and architecture work should inherit.

### 23.1 Cross-document traceability matrix

| Strategic anchor | Phase 1 / brief evidence | PRD implementation sections | Why it matters in handoff |
|---|---|---|---|
| **Blank-page friction and restart waste are the first paid pain** | `docs/research/phase-1/01-market-user-wedge.md`; Product brief opening + solution loops | Sections 2, 4, 7, 12.2-12.5, Flows A-C | UX and architecture should optimize time-to-first-editable-scaffold, not feature sprawl. |
| **Solo technical creator is the primary user** | `01-market-user-wedge.md`; product-brief wedge-and-user cluster | Sections 3, 5, 11, 21 | Prevents drift into no-code hobbyist or multi-role team complexity in MVP. |
| **Godot-first, engine-flexible later** | `01-market-user-wedge.md`; `02-competition-tech-differentiation.md`; strategy memo | Sections 1, 5, 12.5, 16.1, 21 | Build the first deep path in Godot while preserving clean engine-target abstractions for later Unity depth. |
| **Continuation value beats generation spectacle** | `01-market-user-wedge.md`; `02-competition-tech-differentiation.md`; product-brief solution loop | Sections 4, 6, 12, FR-04, FR-10, FR-13 | Compile output, artifact graph, and recompile trust are core product value, not polish garnish. |
| **Selective recompile trust is a make-or-break differentiator** | product-brief scope-risk-validation; `03-trust-compliance-gtm.md` | Sections 12.6, 14, 16.3, 17, 20 | Engineering must treat boundary disclosure, preservation, and rollback as first-class safety systems. |
| **Provenance, privacy, and publish-safety are product features** | `03-trust-compliance-gtm.md`; strategy memo | Sections 5, 19, FR-07, FR-29, FR-35, FR-36 | Trust/compliance cannot be postponed to a legal appendix or post-launch patch. |
| **World Sketch is strategically important but optional in MVP** | `02-competition-tech-differentiation.md`; strategy memo | Sections 5, 16.1, 16.2, 19.2, 21 | Future compatibility matters, but MVP build order stays focused on the deterministic compile-and-continue loop. |
| **Playtest guidance must stay bounded and honest** | product-brief solution-and-loop cluster; `03-trust-compliance-gtm.md` | Sections 12.8-12.9, FR-09, FR-31, 19.2 | Avoids drifting into fake autonomous QA claims unsupported by MVP evidence. |

### 23.2 Requirement-to-risk traceability highlights

| Risk to control | PRD controls |
|---|---|
| Silent overwrite destroys creator trust | FR-05, FR-14, FR-15, FR-25, FR-26, FR-27, FR-28, NFR-007 |
| Compile summaries become narrative fluff | FR-13, FR-24, FR-30, Section 19.2 |
| Provenance/disclosure gets bolted on too late | FR-07, FR-29, FR-36, Sections 18-19 |
| MVP drifts toward generic prompt-to-game positioning | Sections 1, 3, 5, 8, 11, 21 |
| World Sketch bloats launch scope | Sections 5, 16.1, 16.2, 21 |
| Playtest guidance overclaims evidence | FR-09, FR-17, FR-31, Section 19.2 |

## 24. Contradiction Cleanup and Locked Working Defaults

### 24.1 Language and consistency cleanup completed

- **Primary user language normalized:** the PRD now consistently treats the **solo technical creator** as the launch user, with solo/duo builders as an early adjacency rather than equal first-class scope.
- **Artifact graph language normalized:** earlier "compile-ready artifact graph baseline" phrasing is now concretely grounded in the typed artifact + revision + lineage model in Sections 16-18.
- **Trust-surface language normalized:** compile summary, compare/rollback, provenance, and blast-radius disclosure are treated as **core workflow surfaces**, not cosmetic polish.
- **Engine strategy normalized:** Godot is the launch-depth path; Unity remains visible at the architecture and roadmap level without pretending launch parity.
- **World Sketch language normalized:** it remains a future-compatible optional artifact class, not a mandatory runtime or launch blocker.
- **Playtest language normalized:** guidance remains artifact-linked and bounded to prototype refinement; no autonomous full-QA positioning is implied.

### 24.2 Locked working defaults for downstream handoff

These defaults are now the implementation assumptions unless later phases deliberately override them with evidence.

| Decision area | Locked default | Reason |
|---|---|---|
| **Flagship prototype lane** | **Light action-adventure exploration slice** with movement, one traversal hook, interactable objective chain, simple HUD, and at most one light encounter/hazard lane | Best demonstrates world-driven structure plus editable scene/mechanics value without dragging the MVP into survival-economy or full combat complexity. |
| **Selective recompile launch depth** | Prioritize **mechanics/config** and **scene-structure** scopes first; keep **interaction/UI shell** narrow and explicitly bounded | Maximizes trust and usefulness while minimizing unsafe overwrite risk. |
| **Local edit protection** | Use manifest-aware preservation checks and fail closed when scope resolution or preservation confidence is weak | Honest refusal is safer than false preservation confidence. |
| **Playtest guidance evidence model** | Ship **heuristics-first, artifact-linked guidance** in P0; treat runtime telemetry as follow-on depth, not a launch dependency | Keeps claims honest and the core loop fast. |
| **Provenance export default** | Export **machine-readable JSON bundle plus creator-readable markdown summary** | Covers both auditability and practical creator review. |
| **Alpha collaboration posture** | Keep alpha **single-owner**; allow read-only export/share before live collaboration | Preserves wedge discipline and avoids premature collaboration complexity. |

## 25. Handoff Notes for UX, Architecture, and Build Sequencing

### 25.1 Recommended first vertical slice

The first build slice should prove the core promise in this order:
1. project intake + raw intent preservation
2. structured brief review/approval
3. first Godot compile for the flagship light action-adventure exploration slice
4. compile summary + manifest + checkpoint creation
5. one safe selective recompile flow against a narrow mechanics/config or scene-structure scope
6. compare/rollback against meaningful checkpoints
7. provenance export baseline
8. heuristic, artifact-linked playtest guidance

### 25.2 Cross-functional handoff guidance

- **UX:** optimize for clarity of compile results, inspection points, and safe recompile boundary explanation before adding community or collaboration surfaces.
- **Architecture:** keep engine target, artifact lineage, checkpoints, and policy-gate records in the core domain model from day one.
- **Engineering:** treat preservation guarantees, idempotent writes, and checkpoint integrity as product behavior, not infrastructure trivia.
- **Trust/compliance:** design disclosure and provenance outputs as lightweight defaults with deeper exportability available when needed.
- **GTM:** position the first proof as a creator-controlled Godot prototype scaffold, not a generic “AI makes games” demo.

### 25.3 What downstream phases should not reopen casually

- the primary user (**solo technical creator**)
- the wedge (**Godot-first creator-to-production copilot**)
- the core loop (**idea cascade → compile → continue → selective recompile → bounded playtest refinement**)
- the trust posture (**private by default, reversible, traceable, platform-aware**)
- the World Sketch stance (**optional strategic layer, not MVP runtime core**)

## 26. Residual Open Questions and Final PRD Verdict

### 26.1 Residual open questions after Step 4

The remaining questions are now implementation-level, not wedge-level:
- exact visual/theme reference pack for the flagship light action-adventure exploration slice
- whether compile summary UI should default to task-oriented inspection cards, file-map tables, or a hybrid view
- which checkpoint storage implementation gives the cleanest rollback guarantees in the first build stack
- whether lightweight runtime markers can be added without slowing the first compile-and-continue loop

### 26.2 Final PRD verdict

**PRD verdict: ready for downstream UX and architecture phases.**

The PRD is now internally consistent around the target user, the Godot-first wedge, the continuation-first product loop, the typed artifact/manifest/checkpoint trust model, and the bounded publishing-safety posture.
Remaining uncertainty is narrow enough to resolve during design and architecture without reopening the core product thesis.
