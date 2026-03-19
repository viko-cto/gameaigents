# GameAIgents PRD Step 2 — Feature Detail Open Questions

_Date: 2026-03-19_

## Purpose
This file captures the real implementation forks left after the MVP feature contract is locked.
These are inputs for PRD step 3, not reasons to reopen step 2.

## 1. Artifact Graph Schema
### Tension
The feature set now depends on durable artifact memory, but the canonical schema is still open.

### Candidate directions
- brief-centric JSON graph with typed child artifacts
- event-sourced project ledger with materialized artifact views
- hybrid model: typed artifacts plus event history

### Current working answer
Bias toward a hybrid model so compile/recompile and provenance can both resolve cleanly.

## 2. Selective Recompile Contract Surface
### Tension
Selective recompile is locked conceptually, but the enforcement layer is still undefined.

### Candidate directions
- semantic target types only (scene, mechanic, UI)
- file-path allowlists only
- semantic targets mapped to constrained file/artifact scopes

### Current working answer
Bias toward semantic targets mapped to constrained artifact/file scopes.

## 3. Compile Output Manifest Depth
### Tension
Creators need a useful compile summary, but too much detail could become noise.

### Current working answer
Expose a creator-readable summary first, with deeper manifest detail available behind it.

## 4. Playtest Signal Source in v1
### Tension
Guidance should be useful without pretending to offer deep autonomous testing.

### Candidate directions
- heuristics only
- heuristics plus light event/telemetry capture
- richer replay analysis later

### Current working answer
Start heuristics-first unless light telemetry can be added without distorting MVP simplicity.

## 5. World Sketch Data Compatibility
### Tension
World Sketch is optional now but strategically important later.

### Current working answer
Design the artifact graph so world/space observations can be added later without forcing a mandatory World Sketch workflow in v1.
