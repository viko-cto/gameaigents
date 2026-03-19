# GameAIgents Product Brief — Wedge and User Cluster Draft

_Date: 2026-03-19_  
_Status: Challenged BMAD draft after wedge-and-user elicitation pass_  
_Scope: target user, first commercial wedge, canonical creator workflow, anti-wedges_

## 1. Primary User Decision

### Primary user
**The first true primary user is the solo technical creator** — a founder-builder, technical designer, or highly capable indie developer who can already ship prototypes, but loses too much time moving from idea to coherent playable structure.

### Adjacent user in the same lane
**Solo-duo builders are still in-scope, but as an adjacency rather than the opening copy target.**
The product should not require collaboration to prove value. If a duo uses it, that is a bonus, not a prerequisite for the first win.

### Why this user wins the wedge test
This user:
- feels the workflow pain sharply enough to pay for relief
- can tell the difference between a flashy demo and a usable scaffold
- tolerates rough v1 edges if continuation value is real
- cares about editability, exportability, and control
- is reachable through Discord, itch.io, Reddit, X/devlogs, and alpha communities
- is a better fit for Godot-first execution than studio or no-code segments

### Working user profile
- builds alone most of the time, sometimes with one collaborator
- comfortable opening and editing a real engine project
- wants speed, but not black-box autonomy
- values ownership, inspectability, and versioned progress
- is trying to get to a first playable / vertical-slice-quality prototype, not a full shipped game in one step

## 2. Initial Commercial Wedge

### Wedge statement
**GameAIgents should launch as a Godot-first creator-to-production copilot for solo technical creators building world-driven single-player prototype slices.**

### More concrete promise
> **Start with a vague game idea, shape it through an idea cascade, optionally explore a bounded world sketch, and get an editable Godot prototype scaffold you can keep building this week.**

### Why this is the right wedge
It is the best overlap between:
- what the research says creators want
- what GameAIgents can credibly differentiate on
- what the team can likely build without hype debt
- what avoids direct head-on competition with Unity-native incumbents and browser-first toy builders

### Launch-level constraints inside the wedge
- **Godot-first in workflow depth and messaging**
- **Unity remains architecturally visible and strategically important**, but not equally deep in the opening proof
- **single-player, world-driven prototype slices** are the clearest first proof unit
- **prototype slice** is the proof object, not “full game”

## 3. Canonical Creator Workflow

The first workflow should feel like a serious builder loop, not a prompt party.

### Step 1 — Intent Capture
The creator brings:
- a vague idea
- references / screenshots / inspiration
- target fantasy
- preferred engine target
- rough genre and feel assumptions

### Step 2 — Idea Cascade
GameAIgents structures the fuzzy concept into:
- genre / camera / perspective
- core loop
- progression assumptions
- world topology
- mechanic priorities
- art/mood direction
- technical constraints
- open decisions and risk flags

**Output:** a structured brief the creator can inspect and edit.

### Step 3 — Optional World Sketch
The creator uses a bounded world-sketch mode to test:
- routes
- landmarks
- traversal ideas
- biome or mood direction
- spatial composition

**Output:** bookmarked moments and extractable environmental cues.

### Step 4 — Engine Compile
GameAIgents converts the structured brief and any world-sketch signals into a **Godot-native scaffold**:
- scene tree shells
- node structure
- input mapping
- movement/controller assumptions
- UI shell
- data/config files
- mechanics or progression skeletons

### Step 5 — Human Continuation
The creator opens the project, edits it, replaces pieces, and continues development in-engine.

This is the decisive moment. If the project can be continued without regeneration chaos, the wedge is working.

### Step 6 — Playtest-Guided Refinement
GameAIgents helps improve:
- clarity
- pacing
- balance
- onboarding
- encounter readability
- prototype cohesion

## 4. Anti-Wedges

These are not just “nice to avoid.” They are lanes that would damage focus or product credibility if treated as the opening wedge.

### Anti-wedge 1 — Generic prompt-to-game-for-everyone
Why not:
- too broad
- already crowded
- invites hype debt
- weakens trust with serious builders

### Anti-wedge 2 — Browser-first no-code toy creator
Why not:
- attracts users who want instant magic, not continuation value
- pushes the product toward shallow demos and support-heavy disappointment
- weak fit with engine-native, editable, production-aware positioning

### Anti-wedge 3 — Unity-first studio workflow at launch
Why not:
- higher integration expectations
- stronger incumbent competition on Unity’s home turf
- raises the depth bar before the product has proved its artifact and compile loop

### Anti-wedge 4 — Design-led non-technical creator as the first paid segment
Why not:
- increases support burden and automation expectations
- makes output quality failures more painful
- nudges the roadmap toward “AI does everything for me” positioning

### Anti-wedge 5 — World-model spectacle product
Why not:
- over-depends on provider capability and access
- confuses ideation infrastructure with the product moat
- does not solve prompt-to-production continuity by itself

## 5. Wedge Messaging Guidance

### What we should say
- creator-first
- Godot-first, engine-flexible direction
- structured, editable prototype scaffold
- human-led, AI-accelerated
- built for continuation, not just generation

### What we should not say
- make any game instantly
- AI builds the whole game for you
- full game from one prompt
- world-model game engine
- no-code for everyone

## 6. Decision Summary

### Locked for the next cluster
1. **Primary user:** solo technical creator
2. **Adjacent early user:** solo-duo builder
3. **Initial wedge:** Godot-first creator-to-production copilot
4. **First proof shape:** world-driven single-player prototype slice
5. **Workflow identity:** idea cascade → optional world sketch → engine compile → human continuation → playtest refinement
6. **Core anti-wedge principle:** avoid generic prompt-to-game and no-code browser-toy framing

### What this cluster clarifies
The product is not trying to win by serving the widest audience first.
It is trying to win by being genuinely useful to the user segment most likely to value real continuation.

That makes the opening story narrower, more credible, and more buildable.