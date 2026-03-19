# GameAIgents Product Brief — Scope, Risk, and Validation Cluster Draft

_Date: 2026-03-19_  
_Status: Challenged BMAD draft after scope / risk / validation pass_  
_Scope: MVP scope, constraints, major risks, validation plan, and PRD-entry readiness_

## 1. Cluster Goal

This cluster exists to answer the question:

> **What is the smallest credible GameAIgents product that proves the creator-to-production thesis without collapsing into hype, scope sprawl, or fake depth?**

The product brief is now far enough along that the main danger is no longer lack of vision.  
The main danger is **trying to prove too many truths at once**.

So this cluster narrows the MVP, names the real constraints, pressure-tests the biggest failure modes, and defines what evidence is required before entering PRD.

## 2. MVP Scope Decision

### MVP thesis
The MVP should prove that a **solo technical creator** can move from a fuzzy game idea to an **editable Godot prototype slice** faster and with less restart waste than with a fragmented manual workflow.

### MVP promise
> **Describe the game, structure it through the cascade, compile an editable Godot prototype scaffold, continue building it yourself, and get narrow playtest-guided refinement without losing control.**

### What the MVP must prove
1. GameAIgents can convert vague intent into structured game artifacts.
2. Those artifacts can compile into a Godot project scaffold that a real creator can open and continue editing.
3. The workflow preserves enough traceability and rollback to feel trustworthy.
4. A narrow refinement loop can improve the prototype without requiring full regeneration.

## 3. P0 Scope — In for the First Credible Proof

### 3.1 Core creator workflow
The MVP must support this exact flow:
1. creator starts from prompt + references + constraints
2. system runs the Idea Cascade into a structured project brief
3. system compiles that brief into an editable Godot scaffold
4. creator edits / continues inside Godot
5. system supports selective recompile on the highest-pain surfaces
6. system provides narrow playtest-guided feedback

### 3.2 Required product capabilities
#### A. Structured brief generation
- project premise
- genre / camera / perspective assumptions
- core loop
- progression assumptions
- world / level assumptions
- mechanic priorities
- technical constraints
- contradiction and risk notes

#### B. Artifact graph baseline
- persistent project brief
- mechanic / systems notes
- compile-ready intermediate representation
- file/version history anchors

#### C. Godot-first compile proof
- Godot 4.x project scaffold
- scene tree shells
- input mappings
- movement/controller baseline
- UI shell
- config/data files
- objective / progression skeleton
- placeholder content where necessary

#### D. Selective recompile at the highest-value boundaries
Initial selective recompile should focus on:
- scene structure
- mechanics/config surfaces
- UI shell or interaction shell when needed

#### E. Trust baseline
- compare / rollback
- provenance log for meaningful generated artifacts
- private-by-default project posture
- export/package history sufficient for later publishing support

#### F. Narrow playtest intelligence
For MVP, playtest guidance should stay narrow:
- onboarding friction
- pacing / readability issues
- basic balance hypotheses

## 4. Explicitly Out of Scope for MVP

These are strategically important, but including them in the first proof would weaken credibility.

### 4.1 Engine scope that should wait
- equal-depth Unity compile path
- Unreal support
- deep in-editor Unity workflow parity

### 4.2 World-model scope that should wait
- mandatory World Sketch for every workflow
- proprietary world-model development
- open-ended generated-world runtime as product core
- provider-perfect world exploration dependency

### 4.3 Game complexity scope that should wait
- multiplayer generation
- live-service economy systems
- fully autonomous quest/content pipelines
- broad genre coverage claims
- full finished game generation

### 4.4 Platform/community scope that should wait
- creator marketplace
- UGC feed/discovery surfaces
- in-app community moderation at platform scale
- mobile creator-platform breadth

### 4.5 AI surface area that should wait
- rebuilding broad asset-generation stack in-house
- deep NPC-social simulation as core value proof
- advanced telemetry science masquerading as MVP playtest intelligence

## 5. Flagship Proof Artifact

### Chosen proof object
The first flagship proof should be:

> **an editable Godot single-player prototype slice with movement, interaction, objective/progression shell, and enough structure that a creator can continue building rather than restart.**

### Why this proof object wins
It proves more than visuals.
It proves:
- engine-native continuation
- structured mechanic intent
- editable project reality
- practical usefulness over spectacle

### What it should not try to prove yet
- final-polish game feel
- asset-art excellence
- multiplayer depth
- full production pipeline completeness
- equal Unity and Godot depth

## 6. Major Constraints

## 6.1 Product constraints
1. The product must remain creator-first, not autonomy-first.
2. The first workflow must stay narrow enough to compile reliably.
3. World Sketch cannot be a brittle hard dependency for the MVP proof.
4. Trust surfaces must exist, but cannot dominate the top-line user experience.

## 6.2 Technical constraints
1. Compile quality matters more than breadth.
2. Selective recompile must be useful before it is comprehensive.
3. Artifact mapping from brief to generated project must remain inspectable.
4. Godot-first depth is acceptable; fake dual-engine parity is not.

## 6.3 GTM constraints
1. Messaging must not sound like “make any game instantly.”
2. The first user needs to self-serve enough to survive rough edges.
3. Launch proof should fit indie creator channels, not enterprise sales theater.

## 6.4 Trust and policy constraints
1. Provenance must exist early enough to support future disclosure/publishing layers.
2. Community/UGC surfaces should not launch before moderation obligations are understood and designed.
3. Privacy defaults must support creators treating project work as sensitive.

## 7. Major Risks and Failure Modes

## 7.1 Primary product risk — fake continuation
### Failure mode
The compile output looks impressive in a demo, but real creators cannot meaningfully extend it.

### Why this is the most dangerous risk
If continuation fails, the whole thesis collapses and GameAIgents becomes a fancier prompt-to-game tool.

### Mitigation
- optimize for editable scaffold quality over visual spectacle
- validate with creators actually opening and modifying the project
- keep the prototype slice narrow enough to stay structurally coherent

## 7.2 Scope-bloat risk — trying to prove the whole dream
### Failure mode
The team tries to prove world sketch, Godot, Unity, playtest intelligence, provenance, community, and platform readiness all at once.

### Mitigation
- MVP proves Godot-first compile + continuation first
- World Sketch remains optional in the initial proof
- Unity remains architecture-visible, not equal-depth launch scope

## 7.3 Recompile risk — iteration feels destructive
### Failure mode
Re-running the system wipes out creator edits or forces broad regeneration.

### Mitigation
- start with selective recompile on scene / mechanics / config boundaries
- preserve rollback and diff views
- make manual continuation the default expectation between structured changes

## 7.4 Trust-visibility risk
### Failure mode
Either trust systems are too invisible to matter, or too heavy and bureaucratic for creators to love.

### Mitigation
- keep compare/rollback and provenance embedded in workflow
- lead with creator value, not compliance posture
- reserve heavier publishing support for later layers

## 7.5 Playtest-vagueness risk
### Failure mode
“Playtest intelligence” becomes hand-wavy chat advice rather than actionable refinement.

### Mitigation
- narrow MVP playtest scope to onboarding, pacing/readability, and basic balance hypotheses
- tie feedback back to explicit artifacts or candidate edits

## 7.6 Distribution risk
### Failure mode
The product attracts the wrong early audience: hobbyists expecting instant magic or studios expecting deep production maturity.

### Mitigation
- market explicitly to solo technical creators and serious indie builders
- show editable engine-native proof artifacts, not just sizzle clips

## 8. Validation Plan Before and During PRD

## 8.1 Core validation question
Will the target user actually perceive the output as a real starting point worth continuing?

## 8.2 Validation cohort
Recommended first cohort:
- **8-12 solo technical creators**
- optional adjacency: **2-4 solo/duo builders**
- channels: Discord, itch.io circles, indie dev subreddits, founder/creator network intros

## 8.3 Validation tasks
Each tester should attempt a controlled workflow:
1. submit a rough game concept
2. review the structured brief
3. compile the first Godot scaffold
4. open it in Godot and make a targeted edit
5. run one selective recompile task
6. review one playtest-guided improvement suggestion

## 8.4 Evidence gates
### Gate 1 — Brief usefulness
Users say the structured brief clarified the design rather than bloating it.

### Gate 2 — Continuation reality
Users can open the Godot scaffold and make meaningful progress without feeling trapped by generated junk.

### Gate 3 — Iteration trust
Selective recompile plus rollback feels safer than brute-force regeneration.

### Gate 4 — Value perception
Users would choose this workflow again for another prototype slice.

## 8.5 Candidate success metrics
- time to first editable playable scaffold
- % of users who continue editing after compile
- % of users who complete one selective recompile without losing trust
- creator-rated output usefulness / editability
- creator-rated reduction in blank-page and restart pain

## 9. PRD Entry Recommendation

### Ready to carry into PRD
The product is ready to enter PRD if the PRD stays anchored on this exact scope:
- solo technical creator
- Godot-first compile depth
- world-driven single-player prototype slice
- optional World Sketch
- selective recompile on narrow high-value boundaries
- provenance / rollback baseline
- narrow playtest-guided refinement

### Not allowed to reopen casually in PRD
These should be treated as already directionally settled unless strong evidence appears:
- generic prompt-to-game framing
- non-technical-first wedge
- equal dual-engine depth at launch
- mandatory world-model runtime dependence
- community/platform breadth as MVP core

## 10. Decision Summary

### Locked by this cluster
1. MVP scope should prove **editable Godot continuation**, not broad AI game magic.
2. The flagship proof object is a **single-player prototype slice**, not a full game.
3. **World Sketch is optional** in the first proof, not required.
4. **Selective recompile** should start at scene / mechanics / config boundaries.
5. **Playtest intelligence** should be narrow and artifact-linked in MVP.
6. Unity stays strategically important, but **not equal-depth in the first proof**.
7. Trust systems belong in the workflow baseline, but must stay **creator-helpful, not bureaucracy-first**.

### What this cluster resolves
The MVP is no longer “AI game platform, broadly.”
It is now a tightly defined proof of **creator-to-production continuation**.

That is the right boundary before PRD.