# GameAIgents Solution and Loop Cluster — Contradictions, Forks, and Open Questions

_Date: 2026-03-19_

## Purpose
This file captures the real unresolved decisions surfaced during the solution-and-loop challenge pass.
These are the forks that materially affect MVP shape, proof quality, and product credibility.

## 1. First Proof Depth Fork
### Tension
The solution is strongest when it proves both compile quality and refinement quality.
But trying to show the full loop too deeply in the first proof may expand scope too fast.

### Why this matters
If the first proof only shows compile, the product may look like a smarter generator. If it also shows refinement, the product is more differentiated but harder to deliver cleanly.

### Current working answer
Treat **editable compile quality** as the minimum proof and **playtest-guided refinement** as the first amplification layer, not necessarily full depth on day one.

## 2. Selective Recompile Boundary Fork
### Tension
The core loop requires selective iteration, but the product cannot expose every recompile granularity immediately.

### Candidate boundaries
- scene-level selective recompile
- mechanics-level selective recompile
- UI shell selective recompile
- progression/data selective recompile
- full project recompile as fallback

### Why this matters
The wrong initial boundary could either make iteration feel too destructive or create too much implementation complexity.

### Current working answer
Prioritize selective recompile where continuation pain is highest: likely **scene / mechanics / config** before deeper full-graph regeneration control.

## 3. World Sketch Dependency Fork
### Tension
World Sketch is central to product identity, but external provider dependence creates reliability and speed risk.

### Why this matters
If the strongest proof requires provider-perfect world sketch behavior, the workflow becomes brittle and vendor-sensitive.

### Current working answer
Keep **World Sketch optional but high-value**. The solution must still prove itself when starting from the structured brief alone.

## 4. Compile Artifact Proof Fork
### Tension
Several candidate proof artifacts could demonstrate the product is real:
- playable movement + camera + UI shell
- one environment slice with traversal and interaction scaffolds
- objective/progression-capable prototype shell
- a more visual but shallower scene bundle

### Why this matters
The flagship proof artifact will shape both roadmap and GTM clarity.

### Current working answer
Favor an artifact that proves **continuable gameplay structure**, not just visual scene generation.

## 5. Playtest Depth Fork
### Tension
Playtest agents are part of the thesis, but “playtest intelligence” can mean anything from simple critique to meaningful telemetry-backed suggestions.

### Why this matters
If playtest promises are too vague, the loop gets mushy. If too ambitious, MVP scope explodes.

### Current working answer
For the first proof, define playtest intelligence narrowly around:
- onboarding friction
- pacing/readability issues
- basic balance hypotheses

## 6. Trust Surface Visibility Fork
### Tension
Provenance and publish-safety are strategically important, but overemphasizing them in the opening pitch may make the product sound bureaucratic.

### Why this matters
The product must feel creator-helpful first, not compliance-heavy.

### Current working answer
Keep trust systems **inside the workflow and product proof**, while leading public messaging with **editable, engine-native continuation**.

## Decision Readiness Summary
### Ready enough to carry forward
- the core value loop is locked
- the decisive proof object is an editable engine-native prototype scaffold
- World Sketch remains optional but important
- provenance and rollback belong in core product scope
- Godot remains the first deep compile target

### Not yet fully resolved
- the exact first selective recompile boundaries
- the exact flagship prototype artifact for the launch demo
- how much playtest depth belongs in the first MVP proof
- how prominently trust/publish-safety should appear in top-level product messaging