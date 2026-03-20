# GameAIgents — UX Design Specification

_Date: 2026-03-20_  
_Status: Step 1 complete — specification and creator flows locked for MVP UX design_  
_Downstream next: wireframes and component contracts_

## 1. UX Summary
GameAIgents should feel like a **creator workspace for turning fuzzy game ideas into editable engine-native prototypes**, not a generic prompt-to-game toy.

The MVP UX centers on one user:
- **solo technical creator**

And one promise:
- **shape the idea → approve the brief → compile editable Godot scaffold → refine safely → export with trust**

## 2. UX Principles
- creator-first, not model-first
- structured momentum over blank-page intimidation
- trust at the point of risk
- continue in the engine, not in the chat
- honest boundaries beat magical lies
- low-bureaucracy compliance

## 3. MVP Information Architecture
Top-level product areas:
1. Projects
2. Intake
3. Brief
4. Compile
5. Compare & Recompile
6. Playtest
7. Provenance & Export

Persistent project metadata:
- engine target
- current revision/checkpoint
- privacy mode
- latest compile status
- flagship slice tag

## 4. Core Screen Contracts

### 4.1 Projects dashboard
Shows project status, next action, engine target, last checkpoint, and resume/new-project actions.

### 4.2 Intake workspace
Captures raw idea, references, and constraints while preserving the original creator input.

### 4.3 Brief editor
Lets the creator review and approve the structured game brief before compile.
Includes inferred-vs-confirmed distinction and out-of-scope risk flags.

### 4.4 Compile workspace
Previews expected compile outputs and runs the first Godot scaffold compile.
Post-compile summary must include inspection points, warnings, and checkpoint creation.

### 4.5 Compare & Recompile workspace
Owns semantic compare, blast-radius disclosure, bounded recompile approval, and rollback.

### 4.6 Playtest workspace
Shows bounded, artifact-linked observations and next actions.

### 4.7 Provenance & Export workspace
Provides lineage review, export bundles, and disclosure helper outputs.

## 5. MVP Creator Flows

### Flow A — First compile
Projects → Intake → Brief → Compile → Compile Summary

### Flow B — Safe targeted change
Compare & Recompile → scope selection → blast-radius review → recompile → compare or rollback

### Flow C — Guided refinement
Playtest → linked observation → local edit or recompile → checkpoint review

### Flow D — Trust/export
Provenance & Export → lineage review → export bundle / disclosure helper

## 6. Trust Surface Rules
- compile summaries must show what exists now, not vague success language
- recompile must disclose what changes, what stays, and what is unsupported
- rollback must be visible wherever recompile risk is introduced
- provenance should stay quiet in the core workflow but always be exportable
- privacy stays private-by-default and single-owner in alpha

## 7. Locked UX Defaults
- flagship prototype lane: **light action-adventure exploration slice**
- engine target emphasis: **Godot-first**
- compare default: **semantic checkpoint summary before file-level detail**
- recompile emphasis: **mechanics/config and scene-structure first**
- provenance export: **JSON bundle + creator-readable markdown summary**
- collaboration posture: **single-owner alpha**

## 8. First UX Build Slice
1. Projects dashboard
2. Intake workspace
3. Brief editor + approval
4. Compile workspace + compile summary
5. Compare & Recompile for one narrow scope
6. Basic Provenance & Export summary

## 9. UX Step Verdict
The UX is now specific enough for wireframes and component contracts without reopening the product thesis.
