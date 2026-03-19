# GameAIgents PRD Step 3 — Data and Interface Contracts Elicitation Log

_Date: 2026-03-19_  
_Status: Completed challenge pass for PRD data and interface contracts step_

## Overview
This log records the advanced elicitation pass used to convert the locked MVP feature spine into enforceable artifact, compile, trust, and interface contracts.

## Elicitation 01 — Architecture Decision Records
**Question:** Which structural decisions must be made now so the MVP does not drift into ad hoc implementation?  
**Finding:** The artifact graph, compile manifest, revision checkpoint, semantic recompile scope, and provenance record all need to be first-class contracts, not later cleanup.

## Elicitation 02 — Artifact Graph Schema Test
**Question:** Should GameAIgents use only typed artifacts, only event history, or a hybrid?  
**Finding:** The best fit is a typed artifact graph with immutable revisions and explicit lineage links. Pure event history is too indirect for creator UX; pure blobs are too opaque for trust.

## Elicitation 03 — Semantic Scope vs File-Path Recompile Debate
**Question:** Should selective recompile be defined by creator-facing scope, raw file paths, or both?  
**Finding:** Recompile must start from creator-meaningful semantic scopes and resolve into constrained artifact/file maps. Raw paths alone are not safe or usable.

## Elicitation 04 — Cross-Functional War Room
**Participants simulated:** product, engine developer, UX, trust/compliance, analytics, indie creator  
**Finding:** Product and UX pushed for creator-readable scope labels and manifests; engineering pushed for explicit checkpoints and fail-closed scope guards; trust/compliance pushed for provenance and policy-gate records; analytics pushed for domain events at the contract layer.

## Elicitation 05 — Compile Manifest Reality Check
**Question:** What must a compile manifest contain to be genuinely useful?  
**Finding:** Generated artifacts, file map, warnings, and "inspect here first" entry points are the minimum. A compile summary without these is cosmetic.

## Elicitation 06 — Failure-Mode Analysis: Unsafe Recompile
**Question:** What is the most likely trust-killing failure mode in this workflow?  
**Finding:** Silent overwrite outside the requested boundary. This forced the ScopeContract + blast-radius disclosure + fail-closed preservation rule.

## Elicitation 07 — Provenance Export Audit Lens
**Question:** What would a creator need later for publishing, review, or team handoff?  
**Finding:** They need provenance that survives export, including provider/model, revision linkage, and whether an artifact was generated, modified, or human-edited after AI.

## Elicitation 08 — Engine-Flexibility Stress Test
**Question:** How do we stay Godot-first without turning the core model into Godot-only architecture?  
**Finding:** Engine target belongs on artifacts, runs, and manifests. Godot-specific compilation lives in the adapter layer, not the entire project model.

## Elicitation 09 — World Sketch Compatibility Pass
**Question:** How can World Sketch remain optional now but still fit later?  
**Finding:** Treat world/sketch input as an optional artifact type with extracted facts. That preserves future compatibility without infecting every MVP contract.

## Elicitation 10 — Event-Driven Observability Pass
**Question:** Which events must exist so progress, failures, and trust issues are measurable?  
**Finding:** Intake capture, brief approval, compile/recompile requests and success, rollback, playtest guidance generation, and provenance export all need declared events.

## Elicitation 11 — Privacy and Publish-Safety Review
**Question:** Which data classes require separation before shipping?  
**Finding:** Raw project-private inputs, generated build data, publish-support outputs, and system-sensitive data need different visibility and handling rules from day one.

## Elicitation 12 — Self-Consistency Validation
**Question:** Do these contracts still support the wedge and feature spine already locked in Steps 1 and 2?  
**Finding:** Yes. The contracts strengthen the Godot-first continuation workflow instead of reopening scope or adding platform bloat.

## Synthesized Decisions from the Elicitation Pass
1. The core implementation spine is now **ProjectWorkspace → CreatorIntentBundle → BriefRevision → ProjectArtifact graph → CompileRun/Manifest → RevisionCheckpoint → ProvenanceRecord**.
2. Selective recompile now has a real enforcement model instead of being a product promise with no boundary logic.
3. Compile summary, compare/rollback, and provenance all resolve against the same underlying records, which reduces drift between UX and engineering.
4. World Sketch compatibility is preserved structurally without being made mandatory.
5. Policy gates and domain events are now part of the contract layer, not later observability garnish.

## Notable Contradictions Preserved for Step 4
- exact starter template lane for the public flagship prototype slice
- how deep local-edit detection goes in MVP beyond scoped manifest/path preservation
- whether v1 playtest guidance stays heuristics-only or adds lightweight telemetry after initial validation
- which provenance export format should become the long-term default for publishing workflows
