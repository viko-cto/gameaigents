# GameAIgents PRD Step 2 — Feature Detail

_Date: 2026-03-19_  
_Status: Challenged BMAD draft for feature-detail expansion_  
_Scope: feature set, user flows, acceptance logic, and hard sequencing for the Godot-first MVP_

## 1. Step Goal

This PRD step exists to answer the next build-critical question:

> **What specific product features must exist in the MVP, how do they connect in the user journey, and what must be true for each feature to count as useful rather than theatrical?**

Step 1 locked the wedge, user, and proof object.
Step 2 turns that into an actionable feature contract.

## 2. Feature Detail Principles

All feature decisions in this step are governed by five rules:

1. **Continuation beats spectacle.**
2. **Editable artifacts beat opaque generations.**
3. **Targeted updates beat destructive regeneration.**
4. **Trust surfaces must help creators, not bureaucratize them.**
5. **World Sketch can enhance the loop, but compile-and-continue must stand on its own.**

## 3. Canonical MVP Flow

The release must support one end-to-end creator journey clearly:

1. creator creates a project from idea + references + constraints
2. system runs Idea Cascade and produces a structured brief
3. creator reviews, edits, and confirms the brief
4. system compiles the brief into an editable Godot scaffold
5. creator inspects/open the output and makes local engine edits
6. creator requests a selective recompile on a narrow boundary
7. system shows compare / rollback and provenance context
8. creator runs or reviews narrow playtest guidance tied to artifacts
9. creator decides whether to continue building

If any feature does not strengthen this journey, it should not dominate MVP scope.

## 4. Detailed MVP Feature Set

## F1 — Project Intake Workspace

### Purpose
Convert rough creator intent into a bounded, durable starting point.

### User value
The creator can begin with incomplete thinking without being punished for not already having a full GDD.

### Core capabilities
- create project from freeform prompt, references, and explicit constraints
- optionally capture target engine, genre lane, camera/perspective, control assumptions, and art/style references
- preserve raw input alongside structured outputs
- surface risk flags when the request drifts outside launch scope (for example multiplayer, full MMO, photoreal AAA expectations)

### Acceptance expectations
- creator can start from messy input in under one session
- system preserves the original idea, not just its structured interpretation
- system warns without blocking when the idea exceeds MVP boundaries

## F2 — Idea Cascade Editor

### Purpose
Turn fuzzy intent into an inspectable project brief that drives downstream generation.

### User value
The creator receives structure without losing authorship.

### Core capabilities
- convert intake into explicit fields covering fantasy, player role, camera, movement mode, core loop, objectives, world topology, progression assumptions, mechanic priorities, and technical constraints
- show what the system inferred vs what the user explicitly provided
- allow creator edits before compile
- preserve versioned brief history

### Acceptance expectations
- creator says the brief clarified the project rather than bloated it
- inferred assumptions are visible and editable
- no compile can proceed without a concrete brief state

## F3 — Artifact Graph / Project Memory

### Purpose
Maintain durable intermediate artifacts so the workflow is not dependent on a single chat thread.

### User value
The creator gets stability, traceability, and reusability across iterations.

### Core capabilities
- store the structured brief, compile-ready intermediate specs, engine output manifests, and revision metadata
- maintain lineage between creator edits, compile actions, and generated artifacts
- support revision anchors that compare / rollback can target
- keep project state private by default

### Acceptance expectations
- a compile has durable upstream artifacts behind it
- revisions can be inspected by artifact, not only by message history
- future selective recompile targets can resolve against known artifact boundaries

## F4 — Godot Compile Workspace

### Purpose
Convert the structured brief into an editable Godot-first prototype slice.

### User value
The creator receives a serious engine-native starting point instead of a browser-only mockup.

### Core capabilities
- generate Godot 4.x scaffold with scene hierarchy shells
- produce core movement/controller baseline appropriate to the chosen perspective
- establish input mappings, objective/progression shell, lightweight UI shell, and configuration/data files
- generate output biased toward inspectability and continuation, not one-shot polish
- produce a compile summary that explains what was created and where to look first

### Acceptance expectations
- target creator can open the project in Godot and understand the top-level structure
- scaffold supports at least one meaningful local edit without collapse
- output looks like a continuation-worthy prototype, not disposable demo sludge

## F5 — Selective Recompile v1

### Purpose
Allow creators to update high-value surfaces without blowing away the whole project.

### User value
The creator can ask for change while preserving momentum and trust.

### Initial shipping boundaries
- scene structure
- mechanics/config surfaces
- selected interaction or UI shell changes where safe

### Core capabilities
- user selects a bounded target for recompile
- system explains what may change and what should remain untouched
- system preserves creator edits outside the approved target boundary
- system refuses or warns on requests that would require unsafe broad regeneration

### Acceptance expectations
- creator can successfully run at least one targeted recompile
- the system does not silently overwrite unrelated work
- failure cases are explicit and recoverable

## F6 — Compare / Rollback Surface

### Purpose
Make iteration safe enough that creators are willing to keep using the workflow.

### User value
The creator can inspect what changed and recover from bad AI decisions.

### Core capabilities
- show meaningful revision checkpoints across compile and selective recompile events
- compare revisions at a creator-helpful level (files/artifacts/scopes, not raw internal noise only)
- restore a prior meaningful state
- tie compare views back to the prompting or brief change that caused the revision

### Acceptance expectations
- creator can answer “what changed?” without spelunking blindly
- rollback is available for meaningful generation events
- compare/rollback are discoverable inside the main workflow, not hidden admin features

## F7 — Provenance and Trust Baseline

### Purpose
Give creators confidence that GameAIgents is production-aware and disclosure-ready.

### User value
The creator can understand where generated outputs came from and retain evidence for later publishing or team review.

### Core capabilities
- log material generation/compile/recompile actions
- preserve artifact lineage and revision timestamps
- expose creator-helpful provenance summaries
- keep privacy default strong; sharing/export remains explicit

### Acceptance expectations
- provenance exists for meaningful generated outputs
- the creator does not need to reconstruct history from memory
- trust surfaces remain lightweight and contextual in MVP

## F8 — Narrow Playtest Guidance

### Purpose
Help creators improve the prototype slice after first compile.

### User value
The creator gets useful iteration guidance instead of empty praise.

### Initial focus areas
- onboarding clarity
- objective readability
- pacing roughness
- basic balance or friction hypotheses

### Core capabilities
- generate artifact-linked feedback rather than generic game-design commentary
- associate observations with concrete scenes, systems, or config surfaces where possible
- distinguish observed issue, hypothesis, and recommended action
- remain narrow; do not overclaim deep autonomous QA

### Acceptance expectations
- creators can trace guidance to a visible artifact or system
- the guidance suggests actionable next moves
- the system avoids pretending to know retention truths it cannot support yet

## 5. Feature Sequencing and Dependency Logic

## 5.1 Must-build-before relationships
- **Project Intake Workspace** must exist before a usable Idea Cascade flow
- **Idea Cascade Editor** must exist before compile can be trusted
- **Artifact Graph / Project Memory** must exist before selective recompile and provenance can be credible
- **Godot Compile Workspace** is the central proof feature
- **Selective Recompile v1** depends on artifact boundaries and revision anchors
- **Compare / Rollback** should ship with selective recompile, not after it
- **Playtest Guidance** depends on stable artifact references from compile output

## 5.2 MVP critical path
1. project intake
2. idea cascade editor
3. artifact graph foundation
4. Godot compile workspace
5. selective recompile + compare/rollback baseline
6. provenance surface
7. narrow playtest guidance

## 6. Core User Flows

## Flow A — First Compile
1. creator creates project with rough prompt, style refs, and constraints
2. system runs Idea Cascade draft
3. creator reviews and edits structured brief
4. creator confirms compile
5. system generates Godot scaffold + compile summary
6. creator opens result in Godot and reviews key project surfaces

### Success condition
Creator says: “This is a real starting point I can work from.”

## Flow B — Targeted Change via Selective Recompile
1. creator changes the brief or requests a narrow improvement
2. system proposes allowed recompile boundaries
3. creator selects a safe target scope
4. system recompiles only that boundary
5. compare view shows what changed
6. creator accepts or rolls back

### Success condition
Creator feels progress was preserved rather than erased.

## Flow C — Post-Compile Refinement
1. creator compiles and reviews prototype slice
2. system surfaces narrow playtest observations
3. creator inspects issue location and recommendation
4. creator chooses local edit, selective recompile, or rollback

### Success condition
Guidance leads to a real next action rather than passive commentary.

## 7. Feature-Level Requirements

### FR-11 Project intake must preserve raw creator intent
The system shall store original prompt/reference input alongside structured outputs.

### FR-12 Brief review before compile
The system shall provide an editable structured brief review step before compile execution.

### FR-13 Compile summary visibility
The system shall provide a creator-readable compile summary describing major generated artifacts and suggested next inspection points.

### FR-14 Recompile boundary disclosure
The system shall explain the selected recompile boundary and the expected blast radius before execution.

### FR-15 Edit preservation outside target scope
The system shall preserve creator edits outside the selected recompile boundary unless the user explicitly approves a broader overwrite.

### FR-16 Revision checkpoints for compile actions
The system shall create revision checkpoints for compile and recompile events that compare/rollback can target.

### FR-17 Artifact-linked guidance
The system shall connect playtest guidance to visible artifacts, systems, or config surfaces whenever possible.

### FR-18 Risk flagging for out-of-scope requests
The system shall flag, but not theatrically over-block, requests that exceed the MVP wedge or trust envelope.

## 8. Explicit Feature Non-Goals in This Step

This feature-detail step does **not** add:
- full World Sketch as required workflow surface
- Unity parity features
- deep multiplayer/systemic economy generators
- broad asset-generation studio functionality
- autonomous live balancing or retention optimization claims
- public marketplace/community/discovery features

## 9. Contradictions Resolved in This Step

1. **Compile summary vs raw engine purity**  
   Resolved in favor of a compile summary because engine-native output alone is not enough for onboarding trust.

2. **Selective recompile breadth vs reliability**  
   Resolved in favor of narrow shipping boundaries. A smaller safe recompile is more valuable than a broad brittle one.

3. **Playtest ambition vs honesty**  
   Resolved in favor of artifact-linked narrow guidance, not inflated autonomous QA claims.

4. **Trust surface depth vs UX clutter**  
   Resolved in favor of contextual trust surfaces embedded in core workflow, not compliance-dashboard sprawl.

## 10. Remaining Legitimate Open Questions for Step 3

1. exact internal schema for artifact graph and revision lineage
2. precise compile output manifest structure for Godot projects
3. how selective recompile targets map to artifact contracts vs file-level contracts
4. whether playtest guidance in v1 is heuristics-only or heuristics-plus-light telemetry
5. how World Sketch optionality should appear in the future data model without polluting MVP simplicity

## 11. Step-Level Decision Summary

### Locked by this step
1. The MVP feature set centers on **Intake → Idea Cascade → Artifact Graph → Godot Compile → Selective Recompile → Compare/Rollback → Provenance → Narrow Playtest Guidance**.
2. **Godot compile** remains the central proof feature; all surrounding features must strengthen continuation trust.
3. **Selective recompile** ships only on narrow boundaries with explicit blast-radius disclosure.
4. **Compare/rollback** is inseparable from recompile trust and therefore belongs in MVP, not post-MVP polish.
5. **Playtest guidance** is useful only when it is artifact-linked and operationally honest.

### What this enables next
The next PRD step can now define the underlying data and interface contracts without reopening which features matter or how they fit the user journey.
