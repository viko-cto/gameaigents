# GameAIgents Product Brief — Solution and Loop Cluster Draft

_Date: 2026-03-19_  
_Status: Challenged BMAD draft after solution-and-loop elicitation pass_  
_Scope: workflow solution, value loop, outputs, trust/safety boundaries, engine-flexible product boundaries_

## 1. Solution Thesis

### Working solution statement
**GameAIgents is a Godot-first creator-to-production copilot that converts fuzzy game intent into structured, editable, engine-native prototype artifacts through an idea cascade, optional world sketch, deterministic compile layer, and playtest-guided refinement loop.**

### What the solution is actually selling
The product is not selling “AI makes your game.”  
It is selling a more disciplined promise:

> **move from idea to an editable prototype slice you can keep building, with less chaos and less restart waste.**

That means the solution must do four jobs reliably:
1. structure vague intent into real design artifacts
2. compile those artifacts into engine-native starting points
3. preserve human control and continuation after generation
4. create a loop where every iteration compounds instead of resetting the project

## 2. Canonical Product Workflow

### Step 1 — Idea Cascade
The creator starts with a rough idea, references, desired fantasy, constraints, and target engine preference.

GameAIgents turns that into structured artifacts:
- concise game premise
- genre / camera / perspective assumptions
- core loop
- progression and session assumptions
- world topology and encounter assumptions
- mechanic priorities
- art / mood direction
- technical constraints
- risk flags and open decisions

**Primary output:** editable project brief + artifact graph seed.

### Step 2 — Optional World Sketch
The creator can enter a bounded world-sketch mode to test:
- route ideas
- landmark placement
- traversal feel
- biome/mood directions
- spatial composition

This is useful when the project benefits from space-first ideation, but it must remain optional rather than mandatory.

**Primary output:** bookmarked moments, route candidates, landmark cues, environmental signals.

### Step 3 — Extract + Normalize
GameAIgents converts structured brief data and any world-sketch signals into normalized buildable intent:
- environment metadata
- scene and interaction candidates
- player movement assumptions
- system dependencies
- prototype-slice boundaries

**Primary output:** engine-ready intermediate specification.

### Step 4 — Engine Compile
GameAIgents generates a Godot-native prototype scaffold with:
- scene tree shells
- node group structure
- input mappings
- movement/controller assumptions
- UI shell
- config/data files
- basic mechanic scaffolds
- progression / objective skeleton
- provenance metadata for generated assets and files

Unity remains architecturally supported as a follow-on path, but Godot is the first deep compile target.

**Primary output:** editable Godot project scaffold.

### Step 5 — Human Continuation
The creator opens the generated project, edits it, deletes weak parts, replaces assets, and continues development directly in-engine.

This is the make-or-break moment of the product. If continuation feels real, the solution works.

### Step 6 — Playtest-Guided Refinement
GameAIgents analyzes the playable slice and helps improve:
- onboarding clarity
- pacing
- encounter readability
- balance
- progression friction
- dead space / loop breakdowns

**Primary output:** targeted refinement suggestions and updated artifact state.

## 3. The Core Value Loop

### Loop statement
**Brief → compile → continue → playtest → refine → recompile selectively**

This is the durable loop, and it is the actual moat candidate.

### Why this loop matters
Most AI game tools optimize for the first wow moment. GameAIgents should optimize for the second, third, and fourth useful iteration.

A strong loop means:
- the user does not have to restart from scratch after each generation
- changes can be made selectively instead of via total regeneration
- the artifact graph becomes better with use
- trust increases as the project history remains inspectable and recoverable

### What must be true for the loop to hold
1. intermediate artifacts are visible and editable
2. compile outputs map back to upstream intent
3. re-runs are selective, not destructive
4. provenance and diff history survive iteration
5. playtest analysis feeds back into structured changes, not generic chat advice

## 4. Core Outputs the Product Must Produce

### Output class 1 — Structured design artifacts
- project brief
- mechanic spec
- world/prototype slice spec
- system dependency notes
- risk and contradiction log

### Output class 2 — Engine-native prototype artifacts
- Godot scenes / node trees
- config and data definitions
- input map shells
- UI shell
- movement and interaction scaffolds
- objective / progression shells

### Output class 3 — Iteration and trust artifacts
- compare/diff history
- rollback points
- provenance log
- provider/model usage notes
- publish-safety checklist seeds

### Output class 4 — Playtest intelligence artifacts
- friction notes
- pacing / balance hypotheses
- encounter readability findings
- recommended next edits

## 5. Product Boundaries

### What GameAIgents is responsible for
- structuring the game concept into durable artifacts
- producing an editable engine-native prototype scaffold
- supporting selective recompile and iteration
- maintaining provenance and workflow traceability
- helping creators identify trust, disclosure, and publishing issues early
- improving prototype quality through playtest analysis

### What GameAIgents is not responsible for in the opening wedge
- generating a full finished game
- replacing the creator as designer or implementer
- deep multiplayer / live-service system generation
- being a browser-only toy runtime
- being a standalone world-model company
- replacing all external asset generation providers

## 6. Trust and Safety Boundary for the Solution

### Human-led control boundary
The creator remains the author and decision-maker.  
GameAIgents proposes, structures, compiles, and critiques. It should not behave like an opaque autonomous studio.

### Provenance boundary
Every meaningful generated artifact should be traceable to:
- prompt/brief state
- provider/model used
- generation timestamp
- later human edits

### Publishing-safety boundary
The solution should help creators prepare for:
- Steam disclosure expectations
- Apple/Google moderation/reporting constraints if community features later exist
- basic AI-content provenance and transparency obligations

### Safety posture
The product should default toward:
- anti-slop quality curation
- rights/provenance awareness
- human review before publish-relevant export
- limited, bounded AI generation surfaces rather than unconstrained output firehoses

## 7. Engine Boundary Decision

### Current decision
**GameAIgents is engine-flexible in architecture and market direction, but Godot-first in launch workflow depth, proof artifacts, and messaging.**

### Practical meaning
- the artifact graph should not assume only Godot forever
- the first serious compile path should be Godot
- Unity should remain visible in product language as a serious next compile path
- the opening solution must not pretend equal depth across both engines before the compile loop is proven

## 8. Why This Solution Beats Nearby Alternatives

### Versus generic prompt-to-game
GameAIgents offers continuation and structure rather than disposable demos.

### Versus browser-first toy builders
GameAIgents creates engine-native outputs and real downstream development value.

### Versus pure world-model products
GameAIgents turns exploratory output into deterministic buildable artifacts instead of stopping at spectacle.

### Versus point tools
GameAIgents owns orchestration, artifact continuity, and refinement loops across the workflow.

## 9. Decision Summary

### Locked for the next cluster
1. the solution is a **creator-to-production workflow**, not a one-shot generator
2. the canonical value loop is **brief → compile → continue → playtest → refine → selective recompile**
3. the decisive proof artifact is an **editable Godot prototype scaffold**
4. **World Sketch is optional but strategically important**, not mandatory in every first proof
5. provenance, compare/rollback, and publish-safety scaffolding belong inside the solution, not as later polish
6. engine-flexible thesis remains intact, but launch depth stays **Godot-first**

### What this cluster clarifies
The real product is not any individual generation step.  
The real product is the compounding loop that helps a creator move forward without losing structure, control, or trust.