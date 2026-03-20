# GameAIgents UX Design Step 1 — Elicitation Log

_Date: 2026-03-20_

## Elicitation Summary
This UX step used **12** challenge passes to pressure-test the MVP experience before any wireframes were declared stable.

---

## 1. Information-Architecture Mapping
**Question:** what are the smallest top-level product areas that preserve the compile-and-continue workflow without collapsing everything into one overloaded screen?

**Finding:** the MVP needs explicit areas for Projects, Intake, Brief, Compile, Compare & Recompile, Playtest, and Provenance & Export.

**Decision:** treat compile and compare/recompile as distinct trust-heavy workspaces rather than secondary tabs.

---

## 2. Creator-Journey Compression Test
**Question:** can a solo technical creator move from rough idea to first compile in a short session without feeling trapped in form-fill hell?

**Finding:** yes, if Intake stays permissive and the Brief editor carries the structure burden.

**Decision:** let Intake stay messy; force structure and approval in Brief.

---

## 3. Compile-Trust-Surface Review
**Question:** where does the user most need reassurance that the product is producing something real rather than theatrical output?

**Finding:** immediately before compile and immediately after compile.

**Decision:** compile workspace must preview expected outputs, and compile summary must show inspection points, warnings, and checkpoint creation.

---

## 4. Cross-Functional War Room
**Participants simulated:** product, UX, engineering, trust/compliance, GTM.

**Tension:** product wanted a simpler single-screen flow; engineering and trust required stronger visibility for approvals, checkpoints, and bounded recompile scope.

**Decision:** keep the shell simple, but give Compile and Compare & Recompile their own spaces so trust is not buried.

---

## 5. Contradiction Hunt
**Question:** does the UX accidentally position GameAIgents like a browser toy while the PRD says engine-native continuation?

**Finding:** it would, if the first moment of excitement happened only inside the browser.

**Decision:** every major screen should point toward editable Godot continuation, not browser spectacle.

---

## 6. Failure-Mode UX Analysis
**Question:** what happens when selective recompile is unsafe, ambiguous, or preservation confidence is weak?

**Finding:** a vague warning is not enough; creators will either distrust the system or click through blindly.

**Decision:** explicit blast-radius panels and fail-closed language are required.

---

## 7. Anti-Slop Interface Test
**Question:** what would make the UI feel like generic "AI makes games" slop?

**Findings:**
- overemphasis on prompts
- marketing-heavy empty states
- hidden provenance
- compile results reduced to shiny thumbnails instead of structural outputs

**Decision:** favor structured summaries, scope labels, and project-state clarity.

---

## 8. Compare/Rollback Clarity Pass
**Question:** how should compare feel for the target user?

**Finding:** raw diffs alone are wrong for this wedge; the user needs semantic understanding first.

**Decision:** compare view should lead with semantic scopes and checkpoint summaries, with file-level detail as secondary depth.

---

## 9. Provenance Packaging Test
**Question:** how do we keep provenance valuable without forcing it into every creative action?

**Finding:** provenance should be quiet in the main workflow and stronger in a dedicated export workspace.

**Decision:** persistent subtle cues, full detail only in Provenance & Export.

---

## 10. Single-Owner Discipline Review
**Question:** does the UX accidentally drift into collaboration complexity before the product is ready?

**Finding:** yes, if projects, exports, and visibility controls are framed like team workspaces.

**Decision:** alpha UX stays single-owner, private by default, with read-only export/share as later secondary actions.

---

## 11. World Sketch Scope Test
**Question:** should World Sketch appear as a primary MVP navigation item now that it is strategically important?

**Finding:** not yet. It risks overstating MVP breadth and reopening the wrong product promise.

**Decision:** keep World Sketch future-compatible and optional, not a top-level MVP dependency in this step.

---

## 12. Self-Consistency Validation
**Question:** does this UX still serve the locked wedge and trust posture?

**Validation result:** yes.
- supports the solo technical creator
- supports Godot-first continuation
- reinforces compile/recompile trust
- keeps provenance/export lightweight but real
- avoids prompt-to-game commodity framing

**Final decision:** the UX specification is stable enough for downstream wireframes and component contracts.
