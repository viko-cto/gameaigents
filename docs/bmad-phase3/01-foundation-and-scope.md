# GameAIgents PRD Step 1 — Foundation and Scope

_Date: 2026-03-19_  
_Status: Challenged BMAD draft after PRD foundation-and-scope pass_  
_Scope: product objective, MVP contract, user/value boundaries, foundational requirements, and release scope_

## 1. Step Goal

This PRD step exists to answer one question before feature-level expansion begins:

> **What exact product are we building first, for whom, with what success standard, and with what hard boundaries?**

The product brief already settled the strategic argument.
The PRD foundation must now convert that strategy into a buildable contract.

## 2. Executive Summary

GameAIgents v1 should be built as a **creator-to-production copilot** for a **solo technical creator** who wants to turn a fuzzy game idea into an **editable Godot prototype slice** without falling into prompt-to-game chaos.

The first release should not try to prove broad AI game creation.
It should prove one valuable thing exceptionally clearly:

> **A serious indie builder can describe a game idea, structure it through an idea cascade, receive an editable Godot scaffold, continue building it in-engine, selectively recompile high-value surfaces, and use narrow playtest guidance to refine the result without losing control.**

Everything in this PRD should protect that proof.

## 3. Product Objective

### 3.1 Release objective
Deliver the first credible version of GameAIgents that reduces blank-page friction and restart waste for solo technical creators by producing an editable Godot-first prototype slice they can continue building this week.

### 3.2 Product promise
GameAIgents helps a creator move from:
- fuzzy concept
- disconnected references
- half-formed mechanics
- uncertain technical structure

to:
- structured project brief
- compile-ready artifact graph
- editable Godot scaffold
- safe compare / rollback trail
- focused refinement loop

### 3.3 The proof we must earn
The MVP succeeds only if target users see the output as a **real starting point worth continuing**, not a flashy generated dead end.

## 4. Target User and Jobs Contract

### 4.1 Primary user
**Solo technical creator**
- indie founder, technical designer, or hacker-builder
- comfortable editing real engine projects
- wants leverage without losing authorship
- values editability, exportability, and continuation over one-shot magic

### 4.2 Early adjacency
**Solo/duo indie builders**
- still valid for alpha feedback
- should not become the main workflow complexity driver in v1

### 4.3 Explicit non-primary users for v1
- pure no-code hobbyists expecting instant full-game output
- established Unity-first studios expecting deep editor-native workflows on day one
- teams prioritizing multiplayer, live-service, or enterprise governance depth

### 4.4 Core JTBD
> Help me go from a vague game idea to an editable, engine-native prototype I can continue building this week.

### 4.5 Emotional and trust jobs
- reduce blank-page intimidation without replacing creative direction
- create real momentum without trapping the creator in generated junk
- preserve control, reversibility, and inspectability
- reduce obvious publishing/provenance anxiety early enough to matter

## 5. Core Experience Contract

The MVP must support this canonical loop:

1. **Start** with a rough prompt, references, and constraints.
2. **Structure** the concept through Idea Cascade into an explicit project brief.
3. **Compile** the brief into an editable Godot prototype scaffold.
4. **Continue** by opening and modifying the project in Godot.
5. **Refine** using selective recompile on narrow, high-value surfaces.
6. **Review** narrow playtest-guided feedback tied to the created artifacts.

### 5.1 Experience promises that must hold true
- the creator remains the director
- the generated output is inspectable and editable
- regeneration is not the default answer to every change
- trust surfaces are embedded in the workflow rather than bolted on later
- the product stays anti-slop and production-aware

### 5.2 Experience promises we are not making yet
- build any game instantly
- generate a finished commercial game from one prompt
- achieve equal Godot and Unity depth at launch
- turn world-model exploration into the runtime itself
- solve multiplayer or live-service production in v1

## 6. MVP Scope Boundary

## 6.1 P0 in-scope capability set

### A. Project setup and briefing
- create project from prompt + references + constraints
- capture genre, camera, perspective, core loop, progression assumptions, world/level assumptions, mechanic priorities, and risk notes
- persist a structured project brief that becomes the source for downstream steps

### B. Artifact graph baseline
- store the project brief and compile-ready intermediate artifacts
- maintain a stable project history anchor for compare / rollback
- preserve enough structure for later selective recompile and playtest feedback

### C. Godot-first engine compile
- generate a Godot 4.x scaffold for a world-driven single-player prototype slice
- include scene tree shells, input mappings, movement/controller baseline, UI shell, config/data files, and objective/progression skeletons
- bias toward editability and continuation rather than visual spectacle

### D. Selective recompile v1
- support targeted recompile on narrow boundaries only
- initial allowed boundaries: scene structure, mechanics/config surfaces, and selected interaction/UI shell updates where safe
- avoid destructive whole-project regeneration as the default path

### E. Workflow trust baseline
- compare / rollback for meaningful generated states
- provenance log for meaningful generated artifacts and compile actions
- private-by-default project posture
- explicit history of major compile/recompile actions

### F. Narrow playtest intelligence
- onboarding friction observations
- clarity/readability observations
- basic pacing or balance hypotheses
- recommendations must point back to concrete artifacts or candidate changes

## 6.2 Out of scope for this step and release

### Engine breadth to defer
- equal-depth Unity compile path
- Unreal support
- deep Unity editor-native integration

### World-model breadth to defer
- mandatory World Sketch in every workflow
- proprietary world-model development
- world-model-as-runtime product claims
- dependence on provider-perfect world sessions

### Product breadth to defer
- creator marketplace or community feed
- broad UGC discovery surfaces
- multiplayer generation
- live-service or economy depth
- deep social NPC simulation as a core promise
- full asset-generation stack built in-house

## 7. Foundational Functional Requirements

These requirements define the build contract for later PRD steps.
Detailed feature behavior comes next; these are the foundation.

### FR-01 — Structured project creation
The system shall let a creator start a project from prompt, references, and explicit constraints, then persist a structured project brief as a durable artifact.

### FR-02 — Idea Cascade decomposition
The system shall convert fuzzy input into explicit fields covering gameplay premise, camera/perspective, core loop, progression assumptions, world/level assumptions, mechanic priorities, and technical boundaries.

### FR-03 — Compile-ready artifact graph
The system shall maintain an internal artifact model that bridges the project brief and engine compile outputs without relying on one opaque chat transcript.

### FR-04 — Editable Godot scaffold generation
The system shall generate a Godot-first prototype scaffold that a target user can open, inspect, and continue editing in Godot without requiring a full restart.

### FR-05 — Narrow selective recompile
The system shall support selective recompile on approved boundaries while preserving creator edits outside the selected target boundary.

### FR-06 — Compare and rollback
The system shall provide revision comparison and rollback for meaningful generation and compile events so users can recover from poor outcomes.

### FR-07 — Provenance baseline
The system shall record meaningful generation actions, compile/recompile events, and artifact lineage sufficient for creator trust and later publishing-support layers.

### FR-08 — Private-by-default project posture
The system shall treat creator projects as private by default and make sharing an explicit action.

### FR-09 — Playtest-guided refinement baseline
The system shall generate narrow, artifact-linked playtest guidance focused on onboarding clarity, pacing/readability, and basic balance hypotheses.

### FR-10 — Export and continuation integrity
The system shall optimize generated outputs for continuation value inside Godot rather than for browser-only demo quality.

### FR-11 — Non-destructive workflow expectation
The system shall prefer targeted updates, explicit diffs, and human continuation over broad regeneration whenever the user intent can be fulfilled safely.

### FR-12 — Wedge-preserving messaging alignment
The product experience and product copy shall reinforce the Godot-first creator-to-production wedge and avoid generic prompt-to-game claims.

## 8. Non-Functional and Product Guardrails

### 8.1 Trust and safety guardrails
- provenance must exist early enough to support future publishing/disclosure helpers
- trust UI should remain creator-helpful, not compliance-dashboard-first
- unsafe or high-risk publish surfaces should not be implied as solved when they are not

### 8.2 Product guardrails
- compile reliability beats feature breadth
- continuation value beats initial spectacle
- selective recompile usefulness beats theoretical completeness
- product scope must stay narrow enough to validate with real creators quickly

### 8.3 Go-to-market guardrails
- do not market to “anyone who wants to make games”
- do not promise Unity parity in v1 depth
- do not lead with world-model hype or autonomous-maker rhetoric

## 9. Success Criteria and Validation Gates

## 9.1 Core success question
Do target users experience the first compiled output as a real scaffold worth continuing rather than a disposable generated demo?

## 9.2 Required validation gates

### Gate 1 — Brief usefulness
Users report that the Idea Cascade clarified the project instead of merely producing longer text.

### Gate 2 — Continuation reality
Users can open the Godot scaffold, make at least one targeted change, and still perceive the output as structurally useful.

### Gate 3 — Recompile trust
Users can invoke one selective recompile path without feeling that the system destroys prior progress.

### Gate 4 — Repeat willingness
Users say they would use the workflow again for another prototype slice because it saved restart effort.

## 9.3 Candidate MVP metrics
- time to first editable playable scaffold
- % of target users who continue editing after first compile
- % of target users who complete one selective recompile successfully
- creator-rated output editability and usefulness
- creator-rated reduction in blank-page and restart pain

## 10. Non-Goals

The first PRD foundation does **not** attempt to prove:
- the full long-term GameAIgents platform vision
- equal engine support depth
- a complete world-sketch product surface
- finished-game quality or art excellence
- generalized AI game creation for all creator types
- platform-scale moderation or publishing governance

## 11. Step-Level Decision Summary

### Locked by this step
1. The PRD is anchored on a **solo technical creator** as the primary user.
2. The first product proof is an **editable Godot-first prototype slice**.
3. The canonical MVP loop is **idea cascade → compile → continue → selective recompile → playtest refinement**.
4. Trust baseline includes **compare / rollback / provenance / privacy defaults**.
5. World Sketch remains strategically important but **not mandatory for the first build proof**.
6. Unity remains strategically visible but **not first-depth launch scope**.

### What this enables next
The next PRD step can now expand feature detail without reopening the wedge, user, or proof object.
That is the purpose of this foundation.
