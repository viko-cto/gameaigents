# GameAIgents PRD Step 3 — Data and Interface Contracts Open Questions

_Date: 2026-03-19_

## Purpose
This file captures the real implementation forks that remain after the data and interface contracts are locked.
These are inputs for PRD step 4, not reasons to reopen the step 3 contract model.

## 1. Local Edit Reconciliation Depth
### Tension
The PRD now requires edit preservation outside approved recompile scope, but the exact mechanism is still open.

### Candidate directions
- manifest/path preservation only in v1
- file fingerprinting on project import/open
- deeper Git-like structural reconciliation later

### Current working answer
Ship v1 with manifest-aware scope guards plus file-level preservation checks. Deeper local-edit reconciliation can mature after the first real creator tests.

## 2. Flagship Template Lane
### Tension
The contracts now support compile cleanly, but the first public proof still needs one concrete starter lane.

### Candidate directions
- light action-adventure slice
- exploration-survival slice
- light roguelite-adjacent slice

### Current working answer
Stay inside the world-driven single-player lane and choose the lane that best demonstrates editable scene structure plus mechanics/config recompile value.

## 3. Playtest Signal Depth in v1
### Tension
Playtest observations are now structurally tied to checkpoints and artifacts, but the evidence source can still vary.

### Candidate directions
- artifact/heuristics only
- heuristics plus light runtime markers
- deeper replay analysis later

### Current working answer
Bias to heuristics-first unless lightweight runtime markers can be added without slowing the core compile-and-continue loop.

## 4. Provenance Export Default Format
### Tension
The system now supports provenance export, but the default external format is still undecided.

### Candidate directions
- GameAIgents-native JSON bundle
- JSON + human-readable markdown summary
- future standardized packaging layer later

### Current working answer
Start with JSON plus creator-readable markdown summary so both machines and humans can inspect the record.

## 5. Alpha Collaboration Model Timing
### Tension
The `ProjectWorkspace` contract is future-compatible with collaborators, but MVP still assumes a solo technical creator.

### Candidate directions
- keep alpha strictly single-owner
- add read-only share/export first
- add lightweight collaborator roles after trust loop validation

### Current working answer
Keep MVP single-owner and treat read-only export/share as the first extension path, not live collaborative editing.
