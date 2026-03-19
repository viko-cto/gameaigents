# GameAIgents PRD Step 3 — Data and Interface Contracts

_Date: 2026-03-19_  
_Status: Challenged BMAD draft for data and interface contracts_  
_Scope: canonical artifact graph, compile/recompile interfaces, provenance, and trust-safe delivery contracts for the Godot-first MVP_

## 1. Step Goal

This PRD step exists to answer the next build-critical question:

> **What durable data structures, state transitions, and interfaces make the GameAIgents MVP implementable without collapsing into prompt soup, unsafe overwrites, or trust theater?**

Step 2 locked the feature spine.
Step 3 turns that feature spine into concrete contracts that product, design, engineering, analytics, and trust review can build against.

## 2. Contract Design Principles

All contracts in this step are governed by seven rules:

1. **Typed artifacts beat chat-history dependency.**
2. **Lineage must survive every compile, recompile, rollback, and export.**
3. **Semantic scopes come before file paths.** Recompile starts from creator-meaningful targets, then resolves to constrained files/artifacts.
4. **Deterministic build facts, model-assisted drafting.** LLMs may propose structure; compiler, manifest, scope guard, and provenance systems define what actually happened.
5. **Godot-first execution, engine-flexible core.** The artifact graph cannot hardcode Godot assumptions so deeply that Unity handoff becomes a rewrite later.
6. **Private by default, explicit when exported.** Projects are private until the creator chooses otherwise.
7. **World Sketch stays optional but structurally compatible.** It can plug into the graph later without polluting the MVP loop now.

## 3. Canonical Domain Entities

### 3.1 Project and intake entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProjectWorkspace` | Canonical project shell | `id`, `ownerId`, `name`, `primaryEngine`, `privacyMode`, `status`, `createdAt` | MVP assumes solo ownership but must not block future collaborators. |
| `CreatorIntentBundle` | Stores raw creator input before structured drafting | `id`, `projectId`, `rawPrompt`, `constraintJson`, `capturedAt`, `createdBy` | Keeps original intent visible instead of replacing it with only inferred structure. |
| `SourceReference` | Tracks uploaded/linked references | `id`, `projectId`, `referenceType`, `storageRef`, `label`, `rightsNote`, `addedAt` | Covers screenshots, docs, mood boards, snippets, or future world inputs. |
| `BriefRevision` | Versioned structured brief state | `id`, `projectId`, `parentRevisionId?`, `briefJson`, `status`, `createdAt`, `createdBy` | Compile can only run against an explicit brief revision, never a loose draft. |

### 3.2 Artifact graph, compile, and revision entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProjectArtifact` | Typed node in the artifact graph | `id`, `projectId`, `artifactType`, `semanticScope`, `engineTarget`, `currentRevisionId`, `status`, `createdAt` | Artifact types include `brief`, `compile-spec`, `scene-shell`, `config`, `ui-shell`, `playtest-note`, and future `world-sketch`. |
| `ArtifactLink` | Lineage relationship between artifacts | `id`, `fromArtifactId`, `toArtifactId`, `relationshipType`, `createdAt` | Allows "derived-from", "supersedes", "depends-on", or "references" tracking. |
| `ArtifactRevision` | Immutable content revision for a typed artifact | `id`, `artifactId`, `contentRef`, `summary`, `createdAt`, `createdBy`, `sourceRunId?` | The graph points to the current revision, but history must remain inspectable. |
| `CompileRun` | One compile or recompile execution unit | `id`, `projectId`, `runType`, `engineTarget`, `sourceBriefRevisionId`, `status`, `requestedBy`, `requestedAt`, `completedAt?` | `runType` starts as `compile` or `selective-recompile`. |
| `CompileManifest` | Machine-readable + creator-readable output summary | `id`, `compileRunId`, `generatedArtifactsJson`, `fileMapJson`, `inspectionPointsJson`, `warningsJson`, `createdAt` | This is the backbone for compare/rollback, compile summary, and trust surfaces. |
| `ScopeContract` | Semantic recompile boundary mapped to real files/artifacts | `id`, `projectId`, `scopeType`, `label`, `artifactIdsJson`, `allowedPathsJson`, `blockedPathsJson`, `blastRadius`, `createdAt` | MVP scope types: `scene-structure`, `mechanics-config`, `interaction-ui`. |
| `RecompileRequest` | User request for a bounded update | `id`, `projectId`, `scopeContractId`, `requestedChange`, `baselineRevisionId`, `approvalState`, `executionState`, `createdAt` | Separates creator intent from execution approval. |
| `RevisionCheckpoint` | Restore point for compile/recompile/rollback | `id`, `projectId`, `checkpointType`, `sourceRunId`, `manifestId`, `snapshotRef`, `createdAt` | Compare/rollback must target meaningful checkpoints, not arbitrary chat turns. |

### 3.3 Trust, playtest, and future-compatibility entities

| Entity | Purpose | Required Fields | Notes |
|---|---|---|---|
| `ProvenanceRecord` | Source + generation history for meaningful outputs | `id`, `projectId`, `subjectType`, `subjectId`, `provenanceClass`, `provider`, `model`, `promptRef?`, `createdAt` | Provenance must survive export and future publishing workflows. |
| `PolicyGateResult` | Safety / disclosure / platform-aware check result | `id`, `projectId`, `subjectType`, `subjectId`, `gateType`, `result`, `reasonJson`, `checkedAt` | Keeps trust logic auditable instead of hidden in prompts. |
| `PlaytestObservation` | Artifact-linked playtest guidance unit | `id`, `projectId`, `checkpointId`, `observationType`, `artifactRef`, `severity`, `hypothesis`, `suggestedAction`, `createdAt` | Must point to a concrete artifact/scope, not vague commentary. |
| `WorldSketchArtifact` | Optional future world/sketch input artifact | `id`, `projectId`, `captureType`, `mediaRef`, `extractedFactsJson`, `compatibilityStatus`, `createdAt` | Exists so the graph can absorb world input later without making it mandatory now. |

## 4. Core State and Lifecycle Contracts

### 4.1 Artifact lifecycle

| State | Meaning | User Impact |
|---|---|---|
| `draft` | Artifact exists but is not approved for downstream compile use | Editable but not compile-eligible |
| `approved` | Artifact is accepted as current structured truth | Eligible for compile planning |
| `materialized` | Artifact produced real engine or system output | Can appear in compare/rollback and provenance |
| `superseded` | A newer revision/artifact replaced it | Remains inspectable but not current |
| `reverted` | Artifact was rolled back from a later state | History remains visible; previous checkpoint restored |
| `archived` | Artifact retained for history/export only | Hidden from default workflow views |

### 4.2 Compile lifecycle

`requested` → `planning` → `queued` → `running` → `succeeded` or `failed` or `cancelled`

A compile is not complete unless it produces:
- a `CompileRun` status transition
- a `CompileManifest`
- at least one `RevisionCheckpoint`
- provenance records for meaningful generated outputs

### 4.3 Selective recompile lifecycle

`proposed` → `reviewed` → `approved` → `executing` → `succeeded` or `failed` or `rejected` or `reverted`

Selective recompile may only execute against a declared `ScopeContract`. If requested changes exceed the scope contract or overlap blocked paths, the system must warn, reject, or force a broader explicit approval instead of silently proceeding.

### 4.4 Provenance classes

| Class | Meaning | User Impact |
|---|---|---|
| `human-authored` | Created directly by the creator | Exported as human-originated |
| `ai-generated` | Generated fresh by the system | Must remain visible in provenance/export views |
| `ai-modified` | Existing artifact was transformed by AI | Requires before/after linkage |
| `imported-reference` | External source used as inspiration/context | Must preserve source note and rights label |
| `user-edited-after-ai` | Human changed an AI-origin artifact later | Important for trust, continuation, and future disclosure packaging |

## 5. Technical and Interface Requirements

### Canonical requirements

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

## 6. Interface Specifications

### 6.1 Client-facing API surface

| Endpoint / Action | Purpose | Required Request Fields | Contract Notes |
|---|---|---|---|
| `POST /api/projects` | Create project workspace | `idempotencyKey`, `name`, `primaryEngine`, `privacyMode` | Returns `ProjectWorkspace` and initial empty graph root. |
| `POST /api/projects/{id}/intake` | Capture raw creator intent and references | `idempotencyKey`, `rawPrompt`, `constraintJson`, `references[]` | Produces `CreatorIntentBundle` and `SourceReference` records. |
| `POST /api/projects/{id}/brief-revisions` | Save/edit structured brief revision | `idempotencyKey`, `parentRevisionId?`, `briefJson`, `status` | Compile may only use an approved revision. |
| `GET /api/projects/{id}/artifact-graph` | Read artifact graph for UI and compare flows | `revisionId?` | Returns artifacts, links, statuses, and current checkpoints. |
| `POST /api/projects/{id}/compile-runs` | Start first compile | `idempotencyKey`, `sourceBriefRevisionId`, `engineTarget` | Returns `CompileRun` id and initial status. |
| `GET /api/compile-runs/{id}` | Poll compile status and summary | none | Must return lifecycle status, warnings, and manifest reference when available. |
| `POST /api/projects/{id}/recompile-requests` | Start selective recompile flow | `idempotencyKey`, `scopeContractId`, `requestedChange`, `baselineRevisionId` | Must return blast-radius disclosure before execution finalization. |
| `GET /api/projects/{id}/revisions/{id}/compare` | Compare revision checkpoints | `againstRevisionId` | Compare view must be manifest-aware, not raw file diff only. |
| `POST /api/projects/{id}/revisions/{id}/rollback` | Restore prior checkpoint | `idempotencyKey`, `targetCheckpointId` | Must create a new checkpoint that records the rollback action. |
| `GET /api/projects/{id}/provenance/export` | Export provenance bundle | `format?` | Export should include revision lineage and policy flags. |
| `POST /api/projects/{id}/playtest-guidance` | Generate bounded playtest observations | `checkpointId`, `focusAreas[]` | Returns artifact-linked observations and suggested next actions. |

### 6.2 Internal service contracts

| Service Contract | Input | Output | Failure Behavior |
|---|---|---|---|
| `IntakeNormalizationService` | raw prompt, constraints, references | normalized `CreatorIntentBundle` + source refs | Preserve messy input; never discard creator phrasing silently |
| `BriefStructuringService` | intent bundle + approved references | `BriefRevision` candidate | Must surface inferred assumptions separately from explicit creator input |
| `ArtifactGraphService` | project + revisions + manifests | typed graph read model | If lineage is incomplete, mark graph degraded instead of fabricating links |
| `CompilePlanner` | approved brief revision + target engine | compile plan + target artifact set | Reject impossible/out-of-scope plans before compile starts |
| `GodotCompilerAdapter` | compile plan + artifact graph | generated files + artifact revisions + manifest entries | On failure, no partial current revision may masquerade as successful output |
| `ScopeGuardService` | requested change + baseline revision + scope contract | allowed paths, blocked paths, blast-radius summary | Must fail closed when scope cannot be resolved safely |
| `CompareRollbackService` | checkpoint ids + manifest refs | compare payload or restored checkpoint | Rollback must be atomic; partial restore is forbidden |
| `ProvenanceAssembler` | artifact revisions + run metadata + policy results | provenance bundle | Missing provenance must surface as incomplete, not silently omitted |
| `PlaytestObservationService` | checkpoint + artifacts + selected focus areas | `PlaytestObservation[]` | Must reject unsupported grand claims beyond available evidence |
| `PolicyGateService` | artifact/run/export request | `PolicyGateResult[]` | Must block or warn explicitly based on configured policy severity |

### 6.3 Domain event contracts

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

## 7. Trust, Privacy, and Publish-Safety Contracts

### Data classes

| Data Class | Examples | Default Visibility | Handling Rule |
|---|---|---|---|
| `project-private` | raw prompts, references, brief drafts, source files | project owner only | private until explicit export/share action |
| `generated-build` | manifests, generated files, scope maps, checkpoints | project owner only | can be exported, but only with explicit provenance packaging |
| `publish-support` | provenance bundle, disclosure notes, policy results | owner-controlled export | never auto-shared publicly |
| `system-sensitive` | credentials, provider secrets, internal moderation/policy rules | internal only | encrypted, least-privilege, never exposed in creator UI |

### Operating rules

- A compile summary is a trust surface and must reflect actual manifest data, not narrative guesswork.
- Compare/rollback views must prefer creator-meaningful scopes and files over raw model/log noise.
- Selective recompile must fail closed when the system cannot confidently preserve work outside the approved boundary.
- Provenance must remain lightweight in the default workflow, but complete enough for later export and platform disclosure support.
- World Sketch inputs, if introduced later, must be treated as optional source artifacts rather than replacing the deterministic artifact spine.

## 8. Measurable Non-Functional Requirements

- **NFR-001 Graph Responsiveness:** The artifact graph view shall load in <= 1.5 seconds p95 for MVP-scale projects.
- **NFR-002 Compile Acknowledgement:** Creating a compile or recompile request shall return an accepted status and run id in <= 2.0 seconds p95.
- **NFR-003 First Status Visibility:** Compile jobs shall expose their first lifecycle update in <= 5.0 seconds p95 after request acceptance.
- **NFR-004 Blast-Radius Analysis:** Scope analysis for selective recompile shall complete in <= 4.0 seconds p95 for supported MVP boundaries.
- **NFR-005 Manifest Availability:** A successful compile or recompile shall produce a creator-readable summary and machine-readable manifest within <= 15 seconds of job completion p95.
- **NFR-006 Checkpoint Integrity:** 100% of successful compile, recompile, and rollback actions shall create a valid revision checkpoint and manifest linkage.
- **NFR-007 Failure Safety:** Failed or cancelled recompile runs shall leave the last good checkpoint restorable without manual intervention.
- **NFR-008 Reliability:** Core project, graph, compile-status, compare, rollback, and provenance endpoints shall achieve >= 99.5% monthly availability excluding scheduled maintenance.
- **NFR-009 Security:** Project-private and system-sensitive data shall be encrypted in transit and at rest, with secrets stored outside application code.
- **NFR-010 Traceability:** 100% of creator-facing compile summaries, compare views, rollback actions, and playtest observations shall resolve to recorded manifests, checkpoints, or artifact ids in internal audit views.

## 9. Step-Level Decision Summary

### Locked by this step
1. The artifact graph is now defined as a **typed artifact + revision + lineage system**, not a chat-history reconstruction layer.
2. Selective recompile is now explicitly a **semantic scope contract mapped to constrained artifact/file boundaries**, not a vague text instruction.
3. Compile trust depends on four durable records: **CompileRun, CompileManifest, RevisionCheckpoint, and ProvenanceRecord**.
4. Playtest guidance is now contractually tied to checkpoints and artifacts, which prevents generic “AI coach” drift.
5. World Sketch remains optional, but the graph is now compatible with future world-input artifacts without forcing them into MVP.

### What this enables next
The next PRD step can now polish the document for handoff, tighten traceability, and resolve any remaining presentation-level contradictions without reopening the underlying build contracts.
