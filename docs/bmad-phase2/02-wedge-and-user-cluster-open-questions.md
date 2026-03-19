# GameAIgents Wedge and User Cluster — Contradictions, Forks, and Open Questions

_Date: 2026-03-19_

## Purpose
This file captures the real unresolved decisions surfaced during the wedge-and-user challenge pass.
These are not filler questions. They are the forks that meaningfully affect launch clarity, workflow shape, or scope.

## 1. Godot-First Messaging Fork
### Tension
- The strongest launch wedge is clearly **Godot-first**.
- The long-term product thesis still needs to remain **engine-flexible** and commercially credible.

### Why this matters
If the product hides Godot, the wedge gets mushy. If it sounds Godot-only, some buyers may infer the product is smaller or less extensible than intended.

### Current working answer
Use **Godot-first** in launch workflow language and first proof artifacts, while keeping **Unity visible as a strategic follow-on path** in architecture and roadmap language.

## 2. Solo-Primary vs Duo-Ready Scope Fork
### Tension
- The primary user is the **solo technical creator**.
- Early real-world adoption may still come from **solo-duo teams**.

### Why this matters
The answer affects onboarding, artifact sharing, comments/review needs, pricing assumptions, and how much collaboration UX belongs in v1.

### Current working answer
Design for **single-user proof of value first**. Allow duo usage operationally, but do not require collaboration features to validate the wedge.

## 3. First Flagship Proof Genre Fork
### Tension
The research supports **world-driven prototype slices**, but that still leaves multiple candidate flagship demos:
- exploration / survival
- action-adventure
- action-roguelite
- adjacent world-driven single-player formats

### Why this matters
A flagship demo helps turn “prototype slice” from a strong concept into a vivid, testable promise.

### Current working answer
Stay at **world-driven single-player prototype slice** for now and resolve the exact demo genre in the next cluster or scope work.

## 4. World Sketch Dependency Fork
### Tension
- World Sketch is central to product identity.
- Provider access, quality, and speed may make it risky to treat as mandatory in every first proof.

### Why this matters
If the workflow depends too heavily on external world-model capability, the product becomes more vendor-sensitive and harder to prove consistently.

### Current working answer
Treat **World Sketch as a powerful but optional accelerator** in the wedge. The product must still be valuable when compiling from the structured brief alone.

## 5. Launch Promise Metric Fork
### Tension
The product promise is qualitatively strong, but the first measurable success condition is not yet fully locked.

### Candidate proof metrics
- editable prototype scaffold produced in one session
- first playable reached within one day
- meaningful vertical-slice scaffold reached within one week
- creator reports that they continued building rather than abandoning the output

### Why this matters
The wrong metric could bias the product toward speed theater instead of durable continuation.

### Current working answer
Favor a metric tied to **successful human continuation**, not just generation speed.

## 6. Buyer Language Fork
### Tension
Possible top-line labels include:
- solo technical creator
- founder-builder
- technical designer
- indie creator / solo-duo builder

### Why this matters
The language shapes who self-identifies with the product and how narrow or broad the wedge feels.

### Current working answer
Use **solo technical creator** as the internal product-definition answer. Test friendlier GTM variants later without changing the underlying wedge.

## Decision Readiness Summary
### Ready enough to carry forward
- primary user = **solo technical creator**
- early adjacency = **solo-duo builder**
- initial wedge = **Godot-first creator-to-production copilot**
- first proof unit = **world-driven single-player prototype slice**
- anti-wedge stance = avoid generic prompt-to-game and browser-toy framing

### Not yet fully resolved
- exact public wording for Godot-first vs engine-flexible
- exact first flagship genre/demo
- whether World Sketch is mandatory or optional in the strongest first proof
- what precise launch metric best proves continuation value