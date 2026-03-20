# GameAIgents UX Design Step 2 — Elicitation Log

_Date: 2026-03-20_

## Elicitation Summary
This step used **12** challenge passes to pressure-test the MVP wireframes and component contracts before declaring them implementation-ready.

---

## 1. Layout-Hierarchy Pass
**Question:** what screen frame best supports trust-heavy creation work without feeling like enterprise dashboard sludge?

**Finding:** a stable left-nav shell plus top-bar identity plus optional right-side meta rail balances orientation, focus, and trust cues.

**Decision:** adopt a three-zone workspace shell for alpha.

---

## 2. Projects-Dashboard Utility Test
**Question:** what should a solo technical creator see first when returning to the product?

**Finding:** next action beats history. The user needs to resume work, not admire stats.

**Decision:** dashboard cards lead with status, checkpoint, and resume CTA rather than generation counts.

---

## 3. Brief-Editor Truth-Separation Test
**Question:** how do we make structured truth editable without losing the original creator voice?

**Finding:** hiding raw input behind tabs increases anxiety and weakens trust in the transformation step.

**Decision:** use a side-by-side layout with structured brief on the left and raw input on the right.

---

## 4. Compile-Summary Packaging Test
**Question:** what is the most useful first post-compile summary for the target user?

**Finding:** task-oriented inspection cards outperform generic success banners and raw file trees.

**Decision:** compile summaries must foreground what exists now, what to inspect first, and what remains thin.

---

## 5. Compare-Density Review
**Question:** should compare start with a file diff, a timeline, or a semantic summary?

**Finding:** file diffs are too low-level as the first read; timeline alone lacks consequence framing.

**Decision:** the default compare layout is timeline + semantic summary + blast radius, with file detail as secondary depth.

---

## 6. Recompile-Scope Discipline Pass
**Question:** how do we stop the MVP from pretending it supports broad, fuzzy change requests safely?

**Finding:** multi-scope selection in v1 invites false safety and unclear preservation promises.

**Decision:** MVP recompile supports one semantic scope at a time.

---

## 7. Blast-Radius Contract Review
**Question:** what must the user understand before approving a recompile?

**Finding:** they need one explicit panel showing will-change, will-preserve, blocked scope, confidence, and rollback target.

**Decision:** make `TrustBlastRadiusPanel` mandatory for recompile confirmation.

---

## 8. State-Model Compression Test
**Question:** what is the minimum useful state model for the MVP frontend?

**Finding:** the system needs compact but explicit state transitions for project, compile jobs, recompile requests, and playtest observations.

**Decision:** define narrow state machines instead of ad hoc screen booleans.

---

## 9. Confidence-Communication Test
**Question:** how should preservation confidence be communicated in the MVP?

**Finding:** percentages imply fake precision; plain-language tiers are clearer and more honest.

**Decision:** use `High`, `Medium`, `Low`, and `Blocked` confidence labels first.

---

## 10. Provenance-Visibility Test
**Question:** should provenance stay hidden until export time, or remain globally reachable?

**Finding:** hiding it entirely weakens the trust posture and makes provenance feel bolted-on.

**Decision:** keep Provenance & Export in the main nav, but visually quiet.

---

## 11. Build-Order Reality Check
**Question:** what component sequence gives the fastest path to a working, testable UX slice?

**Finding:** shell → dashboard → intake → brief → compile → compare beats trying to build every page evenly.

**Decision:** lock a frontend build order that mirrors the creator workflow and trust hinge points.

---

## 12. Self-Consistency Validation
**Question:** do the wireframes and components still defend the locked wedge instead of drifting into generic AI-app patterns?

**Validation result:** yes.
- the layouts are project-centric rather than prompt-centric
- the compare model protects continuation value
- the compile summary reinforces engine-native work
- the components encode trust, reversibility, and provenance directly

**Final decision:** the UX wireframe/component layer is stable enough for implementation scaffolding.
