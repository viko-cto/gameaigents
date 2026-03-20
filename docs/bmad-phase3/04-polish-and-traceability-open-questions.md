# GameAIgents PRD Step 4 — Residual Open Questions

_Date: 2026-03-20_

## Purpose
This file captures only the **remaining implementation-level forks** after the PRD polish pass.
These are no longer reasons to reopen the wedge, target user, or core trust model.

## 1. Flagship Slice Reference Pack
### Tension
The flagship lane is now locked to a light action-adventure exploration slice, but the concrete visual/theme reference pack is still open.

### Candidate directions
- stylized ruined-island exploration
- forest-temple traversal loop
- small sci-fi outpost exploration lane

### Current working answer
Pick the reference pack that best demonstrates traversal, interactable objectives, and readable scene edits without introducing heavy combat or survival-system complexity.

## 2. Compile Summary Default UI Shape
### Tension
The PRD now requires compile summaries to be trust surfaces, but the default information architecture is still undecided.

### Candidate directions
- task-oriented inspection cards first
- file-map table first
- hybrid overview + drill-down

### Current working answer
Bias toward a hybrid: high-level inspection cards first, detailed file map one click deeper.

## 3. Checkpoint Storage Implementation
### Tension
The PRD now requires durable checkpoints for compile, recompile, and rollback, but the first storage strategy is still open.

### Candidate directions
- snapshot-per-run storage
- manifest + patch/delta storage
- hybrid checkpoint + delta model

### Current working answer
Choose the simplest approach that guarantees clean rollback semantics before optimizing storage efficiency.

## 4. Runtime Marker Timing
### Tension
The product keeps playtest guidance heuristics-first, but lightweight runtime markers could improve evidence quality.

### Candidate directions
- no runtime markers in P0
- one minimal onboarding/objective marker set in P0
- defer all markers to P1

### Current working answer
Do not make runtime markers a blocker for P0; add them only if they can ride along without slowing the compile-and-continue loop.
