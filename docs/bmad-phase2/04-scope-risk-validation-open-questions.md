# GameAIgents Scope, Risk, and Validation Cluster — Contradictions, Forks, and Open Questions

_Date: 2026-03-19_

## Purpose
This file captures the real unresolved decisions that remain after narrowing MVP scope.
These are not basic-strategy reopeners. They are implementation-shaping forks to carry into PRD carefully.

## 1. Flagship Demo Genre Fork
### Tension
The product wedge is now clear, but the first public proof still needs a sharper genre/form factor.

### Candidate directions
- exploration-survival slice
- action-adventure slice
- light roguelite-adjacent slice

### Why this matters
The wrong demo shape could either overcomplicate the compile path or undersell the product’s world-driven value.

### Current working answer
Stay with **world-driven single-player prototype slice**, but defer exact genre lock until PRD feature design.

## 2. World Sketch Entry Timing Fork
### Tension
World Sketch is strategically important, but optional in MVP. The remaining question is whether it appears in the first release as a secondary path or waits until immediately after the first compile loop is proven.

### Why this matters
Including it too early adds provider and UX complexity. Excluding it too long weakens the differentiated north-star story.

### Current working answer
Treat it as a **near-following capability** that may appear in MVP only if it does not compromise compile-and-continue proof quality.

## 3. Selective Recompile Granularity Fork
### Tension
The MVP has narrowed selective recompile to scene / mechanics / config, but the order inside that boundary still matters.

### Why this matters
Picking the wrong first granularity could create either implementation drag or user disappointment.

### Current working answer
Bias toward whichever boundary most often blocks continuation in early tests, with a likely starting point of **scene + config**, then **mechanics refinement**.

## 4. Playtest Depth Fork
### Tension
The MVP definition now keeps playtest intelligence narrow, but PRD still needs to decide whether the first implementation is:
- structured heuristics/rules
- light telemetry + heuristics
- deeper replay/agent analysis later

### Why this matters
This affects both implementation complexity and how credible “playtest agents” feels in the first release.

### Current working answer
Start with **narrow, artifact-linked heuristics**, then deepen only after the compile loop earns trust.

## 5. Trust Surface Packaging Fork
### Tension
Rollback, provenance, and publish-safety baselines belong in the workflow, but the visible product packaging remains unresolved.

### Why this matters
If presented too lightly, users may miss the value. If presented too heavily, the product may feel bureaucratic.

### Current working answer
Expose rollback and artifact traceability clearly in the core UI, while keeping richer publish-safety helpers behind contextual surfaces rather than headline navigation.

## 6. Unity Credibility Fork
### Tension
Unity remains strategically important, but the product cannot overstate near-term Unity depth.

### Why this matters
If Unity is hidden, market ambition looks weak. If Unity is overpromised, trust drops when the workflow proves Godot-first only.

### Current working answer
Keep Unity visible in the product thesis and architecture, but make PRD language explicit that **first deep compile proof is Godot-first**.

## Decision Readiness Summary
### Ready enough to carry into PRD
- MVP user and wedge are locked tightly enough
- the first proof object is clear
- major out-of-scope boundaries are clear
- the largest failure modes are now explicit
- validation gates are concrete enough to guide feature design

### Still intentionally unresolved
- exact flagship demo genre
- exact timing of World Sketch entry
- the first selective recompile boundary to ship
- the first playtest implementation depth
- the visible packaging of trust/publish-safety systems