# GameAIgents — BMAD Starting Brief v1

_Date: 2026-03-17_
_Status: Starting brief for BMAD product work_

## 1. Executive Summary

GameAIgents should **not** be positioned as another generic prompt-to-game toy.
That lane is already getting crowded by Unity AI, Google/Gemini/Genie, Rosebud, Base44, SEELE, Roblox AI, and a flood of smaller tools.

The stronger opportunity is to build a **creator-to-production copilot** that helps small teams go from fuzzy game idea to structured, editable, engine-native playable prototype fast — without sacrificing creative control, exportability, or platform safety.

The core product thesis is:

> **GameAIgents turns fuzzy game ideas into structured, editable, engine-native projects through an agentic design cascade, world-sketch-assisted prototyping, deterministic game logic scaffolding, and playtest intelligence.**

This means:
- natural language remains the front door
- world models are used as **ideation / spatial prototyping tools**, not as the final runtime
- the real moat is **Idea Cascade → World Sketch → Engine Compile → Playtest Agents**
- Godot and Unity must both be treated as first-class outputs at the product thesis level

## 2. Why Now

Several strong signals validate the timing:
- AI-assisted game development is already mainstream enough to be credible
- prompt-to-prototype expectations are now normalizing
- creators want faster iteration, but distrust black-box "AI slop"
- platform and legal rules are converging around disclosure, moderation, provenance, and human accountability
- world-model tech like Project Genie validates the direction, but still does not solve the practical path to shippable games

So the market is now mature enough that novelty alone is not enough.
The winner will likely be the product that makes AI-assisted game creation feel:
- more coherent
- more editable
- more exportable
- more trustworthy
- more production-ready

## 3. Problem Statement

Game development is still fragmented across too many disconnected tools and roles.
A small creator or indie team can get flashes of momentum from AI tools, but still struggles to turn that momentum into a coherent, editable project.

Current pain points:
- ideation, mechanics, art, narrative, prototyping, and balancing live in separate tools
- early AI outputs are fast, but brittle and hard to extend
- prototypes often collapse when teams try to turn them into real projects
- game logic, balance, progression, and feel remain under-supported compared to assets and surface-level generation
- creators are increasingly exposed to legal, compliance, moderation, and IP risks they do not want to manage alone

The result is a market full of exciting demos and weak production pipelines.

## 4. Target Users

### Primary Users
1. **Indie founders / solo technical creators**
   - can ship, but need leverage across design, prototyping, and production structure
   - want speed without giving up control

2. **Small distributed studios (2-10 people)**
   - need faster prototype-to-production workflows
   - want structured collaboration without hiring every specialty immediately

3. **Design-led creators with product instincts**
   - strong ideas, weaker implementation bandwidth
   - want to shape mechanics and player experience without drowning in engine setup

### Secondary Users
4. **Game jam / prototype-heavy creators**
   - need fast concept validation
   - may become top-of-funnel users for the broader platform

5. **AI-curious game developers**
   - skeptical of hype
   - interested in tools that genuinely reduce grind and preserve authorship

## 5. Non-Users / Not for MVP

GameAIgents should **not** initially optimize for:
- AAA studios with fully custom pipelines
- large live-service teams needing enterprise-grade production governance on day one
- users expecting one-click generation of a full polished RPG/MMO
- pure browser toy creators who do not care about structured export or editability

## 6. Product Thesis

### Core Thesis
GameAIgents should be a **creator-first game-generation copilot**, not a full autonomous replacement for game developers.

### Product Promise
> Go from idea to structured playable prototype fast — with real engine export, editable artifacts, and a path to something you can keep building.

### Strategic Position
Better than:
- "Lovable for games"
- "Genie but smaller"
- "another text-to-game generator"

Stronger positioning:
- creator-to-production copilot
- anti-slop, pro-builder
- engine-flexible
- human-led, AI-accelerated
- exportable and compliance-aware

## 7. Differentiation Strategy

### What competitors are already good at
- fast prompt-based ideation
- rough prototypes
- asset generation
- browser-first instant gratification
- flashy world-model demos

### What they are generally weaker at
- coherent design cascade
- durable game logic scaffolding
- exportable structured artifacts
- engine-native continuity
- balancing / playtest intelligence
- provenance and publishing safety workflows

### GameAIgents differentiators
1. **Idea Cascade**
   - turns one fuzzy prompt into structured design inputs
   - captures genre, camera, core loop, progression, world topology, art direction, and export target

2. **World Sketch Mode**
   - uses Genie-like / world-model-like tech for exploration and spatial prototyping
   - helps creators discover interesting world forms before committing

3. **Engine Compile Mode**
   - turns structured design + world sketch outputs into real Godot/Unity project scaffolds
   - this is the practical bridge competitors often lack

4. **Deterministic Game Spine**
   - quest state, inventory, progression, economy, combat variables, multiplayer authority, save/load, analytics all live in deterministic systems
   - AI proposes, but game state is not hallucinated

5. **Playtest Agents**
   - analyze pacing, friction, difficulty spikes, onboarding, churn risk, encounter fairness, and mechanic readability

6. **Provenance / Compliance Layer**
   - asset/source tracking
   - disclosure helpers
   - moderation / publishing checklists
   - export-safe documentation

## 8. How to Use Genie 3 / World Models Intelligently

GameAIgents should **not** try to build a foundation world model from scratch.
That is too compute-heavy, too vendor-sensitive, and too easy to turn into hype soup.

Instead, world models should be used in a bounded way.

### Recommended use of world-model tech
- world sketching
- spatial ideation
- perspective exploration
- environment remixing
- landmark / route discovery
- mood / biome generation

### Not recommended for MVP
- world model as final game runtime
- world model as sole source of truth for gameplay state
- claiming infinite or fully autonomous open-world generation as core deliverable

### Productized interpretation
Use a **provider layer** for:
- Project Genie / Google-style providers when accessible
- Runway-style world exploration providers
- Tencent / open alternatives later
- future local/open models if useful

This keeps the capability flexible without binding product strategy to a single vendor.

## 9. Recommended Product Flow

### Canonical flow
1. **Idea Cascade**
   - user starts with a vague idea, reference set, or game fantasy
   - system asks structured narrowing questions
   - output becomes a coherent project brief

2. **World Sketch**
   - user explores a short generated world / environment concept
   - bookmarks routes, landmarks, areas, and interesting interactions

3. **Observer / Extractor**
   - system extracts structure from world sketch sessions
   - terrain, landmarks, traversable routes, interaction zones, camera assumptions, mood, biome hints

4. **Engine Compile**
   - convert extracted structure + game brief into engine-native scaffolds
   - Godot scenes / nodes / input maps / UI shell
   - Unity scene / prefab / script shells

5. **Playtest & Refine**
   - agents help tune balance, readability, pacing, onboarding, and retention signals

## 10. Product Principles

1. **Human-led creativity**
   - AI accelerates; creators direct

2. **Editability over spectacle**
   - every important output should be inspectable and editable

3. **Engine-native over browser-only**
   - the product must hand creators real project artifacts

4. **Deterministic where it matters**
   - gameplay state and production pipelines cannot rely on model whim

5. **Quality over raw speed**
   - fast is useful; fast garbage is not

6. **Compliance by design**
   - disclosure, provenance, moderation, and publishing safety belong in the workflow from day one

## 11. Proposed MVP Wedge

### Recommended wedge
**Engine-flexible AI game copilot with World Sketch mode**

That is still broad in theory, so the actual MVP should be narrowed further.

### Recommended MVP shape
- creator control surface for design cascade
- first structured artifact system
- Godot + Unity export scaffolds
- version compare / rollback
- provenance basics
- bounded world-sketch integration with one provider or proxy approach

### Strong recommendation
Do **not** make the first wedge:
- "full open-world generator"
- "build any game instantly"
- "fully autonomous game maker"

Those are noisy and brittle promises.

## 12. Candidate First Deliverable

The first non-gimmick deliverable should be something like:

> **A creator enters a game idea, refines it through the cascade, optionally explores a world sketch, and gets a structured Godot or Unity prototype scaffold they can actually continue building.**

That is a far stronger proof than another AI trailer or browser sandbox.

## 13. Scope for BMAD Work

### In scope for current BMAD round
- refine product thesis
- lock first commercial wedge
- define primary user and first JTBD
- define MVP and non-goals
- define Godot/Unity positioning
- define world-model role in product architecture
- define trust/compliance requirements
- define first epics and stories

### Out of scope for this round
- final pricing
- full multiplayer architecture
- polished GTM campaign
- detailed enterprise plan
- deep vendor integration specifics for every model provider
- custom foundation model development

## 14. Non-Negotiables / Guardrails

1. **Not Unity-only**
   - Godot must be treated as a first-class direction, not a decorative bullet point

2. **Not Godot-only at thesis level**
   - Unity remains strategically important

3. **World-model-assisted, not world-model-dependent**
   - GameAIgents must survive even if provider access changes

4. **No pure browser toy positioning**
   - export and continuation matter

5. **No "AI replaces devs" narrative**
   - message should be: assist, accelerate, de-risk

6. **Platform safety matters**
   - Steam, Apple, Google, EU AI Act considerations should be part of product design

## 15. Initial Technical Direction

### Control surface
- web-first control center
- structured artifact browser
- compare / rollback / revision history

### Artifact system
- design brief
- mechanic spec
- world spec
- scene graph draft
- export plan
- provenance log

### Compiler targets
- Godot scaffold
- Unity scaffold
- later Unreal / web as optional expansions

### Deterministic systems to prioritize
- quest state
- combat variables
- inventory / resources
- progression
- save/load schema
- analytics hooks

### World-model layer
- one provider integration or proxy workflow first
- bounded short-session use
- observer/extractor pipeline

## 16. Success Metrics for MVP

### Product metrics
- **time-to-first-structured-playable** under 48 hours
- **first engine-export success rate** high enough to prove continuation value
- **3+ meaningful iteration loops** in week one for active teams
- measurable reduction in discarded prototype effort

### Quality metrics
- creators report outputs are editable, not dead-end demos
- creators can continue in their engine after export
- early users describe the workflow as coherent rather than chaotic

### Trust metrics
- provenance / disclosure data present for generated outputs
- publishing safety checklist support exists for Steam at minimum

## 17. Key Open Questions for BMAD to Resolve

1. What is the first commercial wedge?
   - Godot-first indie workflow?
   - Unity-first commercial workflow?
   - dual-track from day one?

2. What is the first genre wedge?
   - action / arena / roguelite?
   - co-op exploration?
   - world-driven survival crafting?
   - another narrower demoable genre?

3. What is the first meaningful World Sketch output?
   - terrain + route scaffold?
   - biome / landmark extraction?
   - encounter-layout proposal?

4. What is the first truly compelling export artifact?
   - playable Godot scene?
   - Unity prototype package?
   - editable design + scaffold bundle?

5. What should the MVP absolutely not attempt yet?

## 18. Recommended BMAD Approach

Because GameAIgents is a **creator platform**, not a single Godot game, the work should split into two tracks:

### Track A — Product platform planning (primary)
Use the standard BMAD product/business flow to create:
- refined product brief
- PRD
- UX design
- architecture
- epics and stories

### Track B — Game-dev workflow reference (secondary)
Use the Game Dev Studio module where needed to:
- shape engine-specific output expectations
- inform Godot/Unity artifact design
- prototype example generated game flows
- validate what a downstream generated project should look like

This prevents a category mistake.
GameAIgents is a platform for making games, not itself just a Godot game project.

## 19. Recommended Next BMAD Deliverables

1. **Product Brief v1 (authoritative)**
2. **PRD focused on first wedge**
3. **UX design for creator flow**
4. **Architecture for artifact graph + compiler + provider layer**
5. **Epics / stories for MVP implementation**

## 20. Bottom Line

GameAIgents should win by helping creators move from idea to playable engine-native prototype fast **without** producing uneditable chaos, legal headaches, or platform-trust disasters.

That means the right north star is:

> **Idea Cascade → World Sketch → Engine Compile → Playtest Agents**

Not a smaller Genie.
Not another prompt box.
Not a browser toy.

A serious creator workflow.
