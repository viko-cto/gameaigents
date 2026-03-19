# GameAIgents — Product Requirements Document

_Date: 2026-03-19_  
_Status: In progress — Step 1 `foundation-and-scope` completed_  
_Authoritative working file for PRD expansion_

## Document status
This PRD is being built section-by-section through the BMAD process.
The current completed PRD step is **foundation-and-scope**.
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

## 9. Open Questions to Carry Into PRD Step 2
- exact flagship demo genre inside the world-driven single-player lane
- whether World Sketch enters MVP as a secondary path or immediately after compile proof
- which selective recompile boundary ships first
- whether first playtest guidance is rules-first or light-telemetry-assisted
- how Unity stays visible without overstating v1 depth

## 10. Next PRD Sections to Expand
1. feature-detail and user flows
2. data and interface contracts
3. polish and traceability

## 11. Foundation Step Decision Summary
- primary user locked to **solo technical creator**
- MVP proof object locked to **editable Godot prototype slice**
- canonical loop locked to **idea cascade → compile → continue → selective recompile → playtest refinement**
- trust baseline includes **compare / rollback / provenance / privacy defaults**
- World Sketch remains strategically important but optional in the first proof
- Unity remains strategically visible but not first-depth scope
