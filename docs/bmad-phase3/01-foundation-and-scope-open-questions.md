# GameAIgents PRD Step 1 — Foundation and Scope Open Questions

_Date: 2026-03-19_

## Purpose
This file captures the still-legitimate implementation forks that remain after the PRD foundation is locked.
These are not reasons to reopen the wedge or user decision. They are inputs for PRD step 2.

## 1. Flagship Demo Genre
### Tension
The PRD now locks a world-driven single-player prototype slice, but the exact flagship slice is still open.

### Candidate directions
- exploration-survival
- action-adventure
- light roguelite-adjacent

### Why this matters
The chosen genre will shape the first compile template, objective structure, and playtest heuristics.

### Current working answer
Stay inside the world-driven single-player lane and decide the exact public proof during feature-detail expansion.

## 2. World Sketch Entry Timing
### Tension
World Sketch remains strategically important, but it is not required for the first proof loop.

### Why this matters
Bringing it in too early increases provider, UX, and reliability complexity. Bringing it in too late weakens the differentiated north-star story.

### Current working answer
Treat World Sketch as optional in the first release proof and confirm whether it belongs in MVP only if compile-and-continue quality remains intact.

## 3. First Selective Recompile Boundary
### Tension
Selective recompile is now foundational, but the first shipping boundary still needs prioritization.

### Candidate starting points
- scene structure
- config/data surfaces
- mechanics shell
- UI/interaction shell

### Current working answer
Bias toward the boundary that most often blocks continuation in early tests, with scene structure plus config/data as the likely first pair.

## 4. Playtest Depth in v1
### Tension
The product promises playtest agents, but the first release should not overclaim sophistication.

### Candidate approaches
- rules/heuristics only
- heuristics plus light telemetry
- deeper replay analysis later

### Current working answer
Start narrow and artifact-linked, then deepen after compile trust is earned.

## 5. Unity Visibility Packaging
### Tension
Unity must stay visible enough to preserve the engine-flexible thesis, but not so prominent that the v1 depth claim becomes misleading.

### Current working answer
Keep Unity visible in roadmap and architecture language, while making Godot-first compile depth explicit in product and PRD language.

## 6. Trust Surface Packaging
### Tension
Rollback, provenance, and privacy are in scope, but the UI prominence is still unresolved.

### Current working answer
Expose compare/rollback clearly in the core workflow, keep deeper publishing-safety helpers contextual rather than top-level in the initial release.
