# GameAIgents — Product Requirements Document

_Date: 2026-03-19_  
_Status: In progress — Steps 1 `foundation-and-scope` and 2 `feature-detail` completed_  
_Authoritative working file for PRD expansion_

## Document status
This PRD is being built section-by-section through the BMAD process.
The current completed PRD steps are **foundation-and-scope** and **feature-detail**.
Future steps should extend this file rather than rewrite its foundation casually.

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

## 9. Open Questions to Carry Into PRD Step 3
- exact flagship demo genre inside the world-driven single-player lane
- precise internal schema for artifact graph and revision lineage
- exact compile output manifest structure for Godot projects
- how selective recompile targets map to artifact contracts vs file-level contracts
- whether first playtest guidance is heuristics-only or light-telemetry-assisted
- how Unity stays visible without overstating v1 depth
- how future World Sketch support plugs into the artifact graph without polluting MVP simplicity

## 10. Next PRD Sections to Expand
1. data and interface contracts
2. polish and traceability

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
