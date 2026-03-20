# GameAIgents UX Design Step 1 — Specification and Flows

_Date: 2026-03-20_  
_Status: UX specification and creator flows defined for the MVP_  
_Scope: turn the locked PRD into a usable solo-creator interface contract without reopening the wedge or inflating scope_

## 1. UX Goal

This UX step answers one question:

> **What should the GameAIgents MVP feel like for a solo technical creator who wants to get from fuzzy idea to editable Godot prototype without losing control?**

The UX must prove:
- speed to meaningful first structure
- visible creator control at each irreversible step
- continuation value over spectacle
- trust surfaces that reduce anxiety instead of adding paperwork

The UX must not drift into:
- toy prompt-box vibes
- full-team collaboration complexity
- fake no-code magic promises
- compliance bureaucracy that interrupts creation

## 2. UX Design Principles

### 2.1 Creator-first, not model-first
The interface should center the creator's project, decisions, revisions, and next actions — not model cleverness or prompt theater.

### 2.2 Structured momentum over blank-page intimidation
The first ten minutes must convert a vague idea into visible structure fast.
The user should feel progress after intake and feel commitment after brief approval.

### 2.3 Trust at the point of risk
Blast radius, preservation confidence, provenance, and publish-safety cues must appear exactly where the creator is about to make a risky action — not buried in settings.

### 2.4 Continue in the engine, not in the chat
The product should always imply that the real win is an editable engine-native scaffold, not a browser-native illusion.

### 2.5 Honest boundaries beat magical lies
If a requested change is too broad, the UI should explain why and offer safe alternatives instead of pretending it can safely preserve everything.

### 2.6 Low-bureaucracy compliance
Provenance and disclosure support should feel lightweight by default, with deeper inspection available only when needed.

## 3. Primary User Experience Contract

### Primary user
**Solo technical creator**
- comfortable with engines and files
- wants leverage, not surrender
- will tolerate some rough edges if output is real and editable

### Core UX promise
> **Help me shape the idea, approve the brief, compile an editable Godot scaffold, refine safely, and understand what changed.**

### MVP experience test
If the user cannot answer these questions quickly, the UX failed:
- What is my project currently trying to become?
- What did the system actually generate?
- What can I safely change next?
- What would this recompile touch?
- How do I undo a bad move?
- What do I need if I want to export or disclose AI usage later?

## 4. Information Architecture

## 4.1 Top-level navigation
The MVP should use a project-centered shell with these primary areas:

1. **Projects**
2. **Intake**
3. **Brief**
4. **Compile**
5. **Compare & Recompile**
6. **Playtest**
7. **Provenance & Export**

A project-level right rail or persistent meta panel should always show:
- active engine target
- current revision/checkpoint
- privacy mode
- latest compile status
- current flagship slice tag

## 4.2 Navigation rationale
- **Projects** keeps the system grounded in durable work, not one-off prompts.
- **Intake + Brief** separate raw intent from structured truth.
- **Compile** gets its own space because it is the emotional hinge of the product.
- **Compare & Recompile** becomes a trust zone, not a hidden modal.
- **Playtest** remains narrow and artifact-linked.
- **Provenance & Export** exists because publishing safety is part of the product, but should stay quiet until needed.

## 5. Core Screens and Purpose

## 5.1 Projects dashboard
### Purpose
Let the creator start, resume, and assess projects without drowning in noise.

### Must show
- project cards with title, prototype lane, engine target, last activity, current step
- current status label such as `draft brief`, `ready to compile`, `compiled`, `recompile available`
- latest checkpoint summary
- quick CTA: **Resume**
- secondary CTA: **New Project**

### Key design note
Do not show vanity metrics first. Show progress and next action.

## 5.2 Intake workspace
### Purpose
Capture raw idea, references, and hard constraints without forcing premature structure.

### Must show
- freeform idea input area
- optional references upload/link block
- constraint fields: engine target, prototype lane, camera/movement assumptions if known, explicit non-goals
- visible note that the raw idea is preserved
- CTA: **Generate structured brief draft**

### UX stance
This screen should feel permissive, messy, and generative — but still bounded.

## 5.3 Brief editor
### Purpose
Turn the project into explicit structured truth before compile.

### Must show
- editable sections for fantasy, player role, camera, movement, objective structure, world assumptions, mechanics, constraints
- badges for inferred vs explicit creator-confirmed assumptions
- risk flags for out-of-scope asks like multiplayer, instant full game, full open world runtime
- side-by-side access to raw input
- CTA: **Approve for compile**

### UX stance
The creator should feel like director and editor here, not prompt janitor.

## 5.4 Compile workspace
### Purpose
Make the first compile feel consequential, inspectable, and exciting without being theatrical.

### Must show
- approved brief summary
- engine target card: **Godot 4.x**
- flagship lane card: **light action-adventure exploration slice**
- compile readiness checklist
- expected output summary: scenes, controller shell, interaction/objective shell, config/data layer, simple HUD shell, checkpoint creation
- CTA: **Compile editable scaffold**

### Post-compile summary must show
- what was generated
- where to inspect first in Godot
- warnings / assumptions
- checkpoint created
- next recommended actions

## 5.5 Compare & Recompile workspace
### Purpose
Give the creator one safe place to understand changes and request bounded updates.

### Must show
- revision timeline with meaningful checkpoints
- compare view summarized by semantic scope, not only raw file diffs
- selectable recompile scopes: `scene structure`, `mechanics/config`, `interaction/UI shell`
- blast-radius panel with:
  - will change
  - will preserve
  - blocked / unsupported
  - preservation confidence
- CTA options: **Run recompile**, **Cancel**, **Rollback to checkpoint**

### UX stance
This screen is where the product earns trust. Calm, explicit, reversible.

## 5.6 Playtest workspace
### Purpose
Offer narrow, artifact-linked refinement guidance without pretending to be a full QA department.

### Must show
- observations grouped by focus area: onboarding clarity, objective readability, pacing, friction
- each observation linked to a concrete artifact or scope
- recommended next action: local edit, recompile, ignore
- confidence label for each observation

### UX stance
More coach than oracle.

## 5.7 Provenance & Export workspace
### Purpose
Help creators inspect lineage and package what they need for trust, sharing, or publishing.

### Must show
- generation history summary by checkpoint
- provider/model lineage summary
- human-edited-after-AI markers where available
- export actions:
  - provenance JSON bundle
  - creator-readable markdown summary
  - disclosure helper summary
- privacy visibility reminder

### UX stance
Quiet by default, powerful when opened.

## 6. End-to-End Creator Flows

## Flow A — First project to first compile
1. creator opens **Projects** and clicks **New Project**
2. lands in **Intake** and enters rough idea, references, and constraints
3. system creates a structured draft in **Brief**
4. creator edits and approves the brief
5. creator enters **Compile** and reviews expected output
6. creator runs compile
7. system presents compile summary, checkpoint, and first-inspection guidance

### Success test
The creator says: **"Yeah, this is a real starting point."**

## Flow B — Safe targeted change
1. creator notices a needed change after opening the project in Godot
2. returns to **Compare & Recompile**
3. selects a semantic scope such as `mechanics/config`
4. reviews blast radius and preservation promise
5. approves recompile
6. reviews change summary or rolls back if needed

### Success test
The creator feels protected, not nervous.

## Flow C — Guided refinement loop
1. creator visits **Playtest** after a compile or recompile
2. sees bounded observations linked to concrete artifacts
3. chooses one next action
4. performs local edit or targeted recompile
5. returns to compare/checkpoint history if needed

### Success test
Playtest guidance creates useful next actions instead of vague commentary.

## Flow D — Trust / publish-readiness check
1. creator opens **Provenance & Export**
2. reviews AI-generated lineage and human modifications
3. exports machine-readable bundle + markdown summary
4. optionally reviews disclosure helper notes for a later publishing path

### Success test
The creator feels less anxious about future disclosure or proof of authorship.

## 7. Key Screen States

## 7.1 Empty state
When no project exists:
- emphasize creator-to-production promise
- show one realistic example, not hype collage
- CTA: **Start your first prototype**

## 7.2 Draft brief state
When intake exists but no approved brief:
- highlight unresolved assumptions
- offer explicit approval path
- do not allow accidental compile against an unapproved draft

## 7.3 Compile-in-progress state
- show meaningful lifecycle status: `planning`, `queued`, `running`
- show what the system is preparing
- do not fake precision if timing is uncertain

## 7.4 Successful compile state
- lead with what exists now
- show checkpoint created
- show where to inspect first
- show next safest action

## 7.5 Failed / blocked recompile state
- explain why the requested change is unsafe or unsupported
- suggest narrower scopes or rollback
- do not present failure as creator error when it is system safety behavior

## 8. Trust Surface Design

## 8.1 Compile trust surface
The compile summary should answer:
- what did we generate?
- what assumptions did we lock?
- where should you inspect first?
- what remains placeholder / thin?

## 8.2 Recompile trust surface
The recompile panel should answer:
- what will change?
- what will stay intact?
- what is too risky to promise?
- can I get back if this sucks?

## 8.3 Provenance trust surface
The provenance view should answer:
- what parts were AI-generated?
- what changed later?
- what provider/model was used?
- what can I export for records or disclosure?

## 8.4 Privacy trust surface
Every project view should quietly reinforce:
- project is private by default
- exports/shares are explicit
- there is one owner for alpha

## 9. UX Challenges Resolved in This Step

### 9.1 Avoiding prompt-box commodity UX
Resolved by making the structured brief, compile summary, and compare/recompile screens the center of gravity.

### 9.2 Avoiding compliance bureaucracy
Resolved by moving provenance/export into a dedicated workspace and surfacing only context-sensitive trust cues elsewhere.

### 9.3 Avoiding no-code hobbyist drift
Resolved by designing around engine-native continuation language and Godot inspection points.

### 9.4 Avoiding false safety in recompile
Resolved by giving blast-radius and preservation confidence their own explicit panel.

### 9.5 Avoiding premature collaboration scope
Resolved by keeping the shell single-owner and treating share/export as downstream actions.

## 10. Recommended First UX Vertical Slice

Build this first:
1. Projects dashboard
2. Intake workspace
3. Brief editor + approval
4. Compile workspace + compile summary
5. Compare & Recompile workspace for one narrow scope
6. Basic Provenance & Export summary

Leave for later:
- richer World Sketch UX
- live collaboration
- deep telemetry-heavy playtest views
- advanced community/showcase surfaces

## 11. Final UX Step Verdict

**Verdict: the MVP UX is now specific enough for downstream wireframes and component contracts.**

The interface is grounded in the solo technical creator's real job:
- shape the idea
- approve the brief
- compile a real scaffold
- refine without fear
- keep trust and provenance visible

That is a stronger UX than generic prompt-to-game glitter.
