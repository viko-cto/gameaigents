# GameAIgents — Product Brief v1

_Date: 2026-03-18_
_Status: Authoritative BMAD product brief input_

## 1. Product in One Sentence

GameAIgents is a **creator-to-production copilot for game development** that helps creators move from vague game idea to structured, editable, engine-native playable prototype through an AI-guided design cascade, bounded world-sketch exploration, real engine compilation, and playtest intelligence.

## 2. The Core Problem

AI game creation tools are getting good at one thing:
**making exciting early demos quickly**.

They are still much weaker at:
- turning fuzzy ideas into coherent design structure
- preserving editability after generation
- exporting into real engine-native projects people can continue building
- keeping logic, progression, and state reliable instead of fragile
- helping creators tune feel, balance, pacing, and readability
- reducing legal / platform / moderation / provenance headaches

Today’s creator usually gets one of two bad outcomes:
1. **traditional workflow** — powerful but slow, fragmented, tool-heavy
2. **AI toy workflow** — fast but chaotic, brittle, hard to extend, hard to ship

GameAIgents exists to fill the gap between those two worlds.

## 3. Why This Matters Now

The category is crossing from novelty into competition.

Market signals now point to:
- widespread AI adoption for game ideation, prototyping, and code assistance
- a surge of prompt-to-game tools from both startups and giants
- strong creator interest paired with strong skepticism about "AI slop"
- platform rules increasingly focused on disclosure, moderation, and accountability
- world-model research proving the future direction, but not yet solving production reality

This is the moment to build the product that is **less magical but more useful**.

## 4. Product Vision

### Vision
Enable a small creator or team to go from:
> "I have a game idea in my head"

to:
> "I have a structured, editable, engine-native prototype I can keep building"

without drowning in disconnected tools, brittle generation, or dead-end outputs.

### Strategic North Star

> **Idea Cascade → World Sketch → Engine Compile → Playtest Agents**

That sequence is the product identity.

## 5. Target Users

### Primary User 1 — Indie Technical Creator
- solo founder, hacker, or technical designer
- can build, but not fast enough across all disciplines
- wants leverage, not loss of control
- values engine export and continuation

### Primary User 2 — Small Game Team (2–10 people)
- collaborative but resource-constrained
- needs faster alignment between design, prototype, and implementation
- wants AI help without pipeline chaos

### Primary User 3 — Design-Led Creator
- strong creative vision, weaker implementation bandwidth
- wants to direct the product through language and examples
- needs structure more than raw generation fireworks

### Secondary Users
- game jam creators
- AI-curious game devs
- prototype-heavy experimental teams

## 6. Jobs to Be Done

### Functional JTBD
1. Help me turn a vague idea into a structured game concept
2. Help me explore world / space / vibe possibilities before committing
3. Help me generate a real engine-native starting point, not just a flashy demo
4. Help me iterate on mechanics, pacing, and player experience
5. Help me keep outputs organized, editable, and exportable

### Emotional JTBD
1. Reduce the intimidation of starting from a blank page
2. Make me feel momentum early without locking me into junk output
3. Let me feel like I am directing the game, not fighting the tool
4. Give me confidence that the result is real enough to keep investing in

### Trust JTBD
1. Help me avoid IP, disclosure, and platform-policy landmines
2. Make it obvious what was generated, changed, exported, and by whom

## 7. Positioning

### What GameAIgents is
- creator-first
- AI-assisted
- exportable
- engine-flexible
- production-aware
- anti-slop

### What GameAIgents is not
- not "one prompt = full AAA game"
- not a black-box autonomous game factory
- not just another asset generator
- not just another browser toy
- not just a world-model demo wrapper

### Positioning statement
For indie creators and small game teams who want to go from idea to playable prototype faster, GameAIgents is a creator-to-production game copilot that produces structured, editable, engine-native outputs — unlike generic prompt-to-game tools that stop at demos or generate brittle chaos.

## 8. Competitive Insight Summary

### Big platforms
- **Unity AI / Muse / ML ecosystems**: deep engine context, strong workflow gravity
- **Google Gemini / Project Genie**: powerful world-sketching and market narrative, but not production-ready end-to-end
- **Roblox AI**: powerful for behavior + object generation, but platform-locked

### Startup tools
- **Rosebud / Base44 / similar**: strong first-win experience, often weaker production continuity
- **SEELE / Meshy / related**: strong asset/mechanics narratives, but not the whole trustworthy pipeline

### Strategic takeaway
Prompt-to-prototype is already becoming commodity.
GameAIgents must differentiate on:
- coherence
- exportability
- editability
- deterministic state
- playtest / balance / feel intelligence
- provenance / moderation / publishing safety

## 9. Product Principles

1. **Human-led, AI-accelerated**
2. **Editability over spectacle**
3. **Engine-native over browser-only**
4. **Deterministic where it matters**
5. **Fast first win, but not dead-end output**
6. **Compliance and provenance by design**
7. **Quality > hype**

## 10. Product Flow

### Stage 1 — Idea Cascade
The user begins with:
- a prompt
- a reference image set
- a vibe
- a genre inspiration
- a gameplay fantasy

The system helps structure it into:
- target fantasy
- genre and camera
- core loop
- progression assumptions
- world topology assumptions
- art direction
- engine/export preference
- risk areas / open choices

**Output:** structured project brief + artifact graph seed

### Stage 2 — World Sketch
The user explores a bounded world-sketch mode using an external provider or generated preview.

Use cases:
- spatial exploration
- mood testing
- route / landmark discovery
- biome and traversal experimentation

**Output:** bookmarked regions, routes, mood cues, interaction opportunities

### Stage 3 — Observer / Extractor
A model-assisted extraction layer turns world-sketch output into structured signals:
- biome regions
- landmarks
- traversable paths
- encounter zones
- camera/movement assumptions
- mood and lighting cues

**Output:** structured environment metadata

### Stage 4 — Engine Compile
GameAIgents compiles the brief + extracted structure into engine-native project scaffolds.

Targets:
- Godot
- Unity

Outputs may include:
- scene shells
- prefab/node trees
- input maps
- UI shell
- config/data files
- mechanic scaffolds
- quest / progression skeletons

### Stage 5 — Playtest Agents
AI agents help analyze and improve:
- onboarding friction
- pacing
- clarity
- balance
- difficulty spikes
- encounter readability
- early retention/churn risks

## 11. Core Differentiators

### 1. Idea Cascade
A guided decomposition system that converts fuzzy input into structured, actionable design artifacts.

### 2. World Sketch Mode
A bounded, provider-flexible world-exploration capability used for ideation and spatial prototyping.

### 3. Engine Compile
The bridge from concept to real project artifacts in Godot and Unity.

### 4. Deterministic Game Spine
Progression, state, economy, inventory, and core systems are modeled in reliable structured systems rather than delegated to model whim.

### 5. Playtest Intelligence
The system helps improve game feel and player experience, not just generate content.

### 6. Provenance / Publishing Safety
Built-in support for disclosure, moderation, auditability, and platform-aware publishing preparation.

## 12. MVP Recommendation

### Recommended MVP wedge
**Engine-flexible AI game copilot with World Sketch mode**

### MVP goal
Prove that GameAIgents can take a creator from vague idea to a structured, editable, engine-native playable prototype faster and with less chaos than existing tools.

### MVP must-have capabilities
1. project creation + creator control surface
2. idea cascade
3. structured artifact graph
4. Godot export scaffold
5. Unity export scaffold
6. version compare / rollback
7. provenance basics
8. one bounded world-sketch integration or proxy workflow

### Strongly avoid in MVP
- open-ended "build any game instantly" promise
- full autonomous open-world generation
- deep live-service or multiplayer complexity
- enterprise governance scope
- trying to beat Google at world models

## 13. MVP Scope Boundaries

### In scope
- creator onboarding
- structured project brief generation
- artifact graph / editable outputs
- Godot + Unity scaffold generation
- bounded world sketch workflow
- provenance + disclosure basics
- compare / rollback
- first playtest intelligence surfaces

### Out of scope (for now)
- full multiplayer generation
- deep economy/live-ops systems
- full asset generation replacement for all third-party tools
- custom foundational world-model development
- app-store-grade creator ecosystem moderation at full scale
- full Unreal support in v1

## 14. Technical Direction (High Level)

### Control surface
- web-first control center
- project dashboard
- artifact browser
- compare / rollback
- export flow

### Artifact model
- project brief
- mechanic spec
- world spec
- scene graph draft
- export plan
- provenance log

### Compiler layer
- Godot scaffold target
- Unity scaffold target

### World-sketch layer
- provider abstraction
- bounded exploration mode
- observer/extractor pipeline

### Deterministic systems
- state definitions
- progression
- inventory/resources
- quest/event shells
- analytics hooks

## 15. Compliance / Trust Requirements

GameAIgents must be designed with publishing and policy reality in mind.

### Must support early
- provenance logging
- disclosure support for generated player-facing content
- safe model/provider registry internally
- clear ownership / rights language
- moderation-aware publishing checklist support

### Priority platform trust surfaces
- Steam disclosure readiness
- Apple UGC / moderation readiness
- Google Play harmful-content/reporting readiness
- EU AI Act labeling / transparency awareness

## 16. Success Metrics

### User success metrics
- time-to-first-structured-playable prototype
- first export success rate
- iteration depth in first week
- creators continuing in exported engine project

### Product quality metrics
- percentage of outputs considered editable and usable
- reduction in prototype abandonment
- creator-reported coherence vs competitor tools

### Trust metrics
- provenance present on key outputs
- disclosure readiness for player-facing generated content
- low rate of unsafe/export-blocking output issues in alpha usage

## 17. Biggest Risks

1. too much scope too early
2. over-investing in world-model hype instead of useful workflow
3. weak export quality causing loss of trust
4. unclear wedge between Godot-first and Unity-first users
5. compliance/provenance added too late instead of designed in
6. becoming another cool demo with weak continuation value

## 18. Key Open Questions for BMAD

1. What is the first commercial wedge?
   - Godot-first indie?
   - Unity-first commercial?
   - dual-track from day one?

2. What is the first genre/use-case wedge?
   - action / roguelite?
   - exploration / survival?
   - another prototype-friendly lane?

3. What is the first world-sketch output that actually matters?

4. What is the first export artifact that proves the product is real?

5. What belongs in MVP versus in later platform hardening?

## 19. Recommendation for BMAD Next Steps

1. validate / refine this product brief
2. lock first wedge and user
3. write the PRD around a real MVP, not the full dream
4. design the creator UX flow
5. architect the artifact graph + compiler + provider abstraction
6. break into epics and stories

## 20. Bottom Line

GameAIgents should not try to win by being the most magical demo.
It should win by being the tool that helps creators reach a **real, editable, engine-native, trustworthy prototype** faster.

That is the product.
