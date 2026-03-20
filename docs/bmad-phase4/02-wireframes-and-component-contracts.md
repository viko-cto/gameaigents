# GameAIgents UX Design Step 2 — Wireframes and Component Contracts

_Date: 2026-03-20_  
_Status: Wireframe-level layouts and reusable component/state contracts defined for the MVP_  
_Scope: translate the locked UX specification into implementation-grade screen structure without reopening the product thesis_

## 1. Step Goal

This step answers one downstream design/build question:

> **What are the concrete screen layouts, reusable UI primitives, and state contracts needed to implement the MVP creator workflow cleanly?**

The goal is not visual polish.
The goal is structure the team can build against.

## 2. Wireframe System Rules

These wireframes assume:
- desktop-first alpha for a solo technical creator
- left-nav workspace shell
- a persistent right-side project meta rail on trust-sensitive screens
- cards, panels, and timelines that prioritize project state over AI theater
- semantic summaries before raw low-level detail

## 3. Global Workspace Shell

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Top Bar: Project name | engine target | current checkpoint | compile status │
├───────────────┬──────────────────────────────────────────────┬───────────────┤
│ Left Nav      │ Main Workspace                               │ Meta Rail     │
│ - Projects    │ Screen-specific content                      │ - Privacy      │
│ - Intake      │                                              │ - Slice tag    │
│ - Brief       │                                              │ - Last compile │
│ - Compile     │                                              │ - Revision     │
│ - Compare     │                                              │ - Warnings     │
│ - Playtest    │                                              │ - Quick links  │
│ - Provenance  │                                              │                │
└───────────────┴──────────────────────────────────────────────┴───────────────┘
```

### Shell contract
- Left nav is stable across the product.
- Top bar carries identity and current-state information.
- Meta rail is persistent on `Brief`, `Compile`, `Compare & Recompile`, and `Provenance & Export`.
- Mobile adaptation can come later; do not let mobile-first constraints distort the alpha trust model.

## 4. Screen Wireframes

## 4.1 Projects dashboard

```text
┌──────────────────────────────── Main Area ────────────────────────────────┐
│ Header: Your Projects                                  [New Project]      │
│ Filter row: All | Draft brief | Ready to compile | Compiled | Needs review │
│                                                                            │
│ ┌──────────────── Project Card ────────────────┐  ┌──────────────────────┐ │
│ │ Project: Ruins of Glass                      │  │ Recent checkpoint    │ │
│ │ Slice: Light action-adventure exploration    │  │ v0.3 mechanics pass  │ │
│ │ Engine: Godot 4.x                            │  │ Status: Compiled     │ │
│ │ Last action: 2h ago                          │  │ Next: Compare change │ │
│ │ [Resume] [View provenance]                   │  │ [Resume]             │ │
│ └──────────────────────────────────────────────┘  └──────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Contract
- Each card must show project name, current state, slice type, engine target, last activity, and next action.
- `Resume` always returns the creator to the highest-priority pending screen for that project.
- Cards do not show vanity generation counts.

## 4.2 Intake workspace

```text
┌──────────────────────────────── Main Area ─────────────────────────────────┐
│ Header: Start a new prototype                                              │
│                                                                            │
│ ┌──────────── Raw idea ────────────┐  ┌──────── Constraints ─────────────┐ │
│ │ Freeform concept textarea        │  │ Engine target: Godot 4.x         │ │
│ │ References / notes / messy input │  │ Camera: [optional]               │ │
│ │ Upload links / assets            │  │ Movement assumptions: [optional] │ │
│ └──────────────────────────────────┘  │ Explicit non-goals               │ │
│                                        └──────────────────────────────────┘ │
│ Raw-input preservation note                                                   │
│                                                     [Generate brief draft]   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Contract
- Raw input is preserved verbatim.
- Constraint form stays intentionally narrow.
- The primary CTA is disabled until the user provides minimum viable intent.

## 4.3 Brief editor

```text
┌──────────────────────────────── Main Area ─────────────────────────────────┐
│ Header: Review and approve the project brief                               │
│                                                                            │
│ ┌──────────────── Structured Brief ───────────────┐ ┌──── Raw input ─────┐ │
│ │ Fantasy / setting                               │ │ Original notes     │ │
│ │ Player role                                     │ │ Links / refs       │ │
│ │ Camera / movement                               │ │                   │ │
│ │ Objective structure                             │ │                   │ │
│ │ Core mechanics                                  │ └───────────────────┘ │
│ │ Constraints / non-goals                         │                       │
│ │ [Explicit] [Inferred] [Risk] badges per row     │                       │
│ └─────────────────────────────────────────────────┘                       │
│ Out-of-scope flags / contradictions panel                                  │
│                                     [Save draft] [Approve for compile]      │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Contract
- Each structured field carries a certainty label: `creator-confirmed`, `inferred`, or `risk/out-of-scope`.
- Approval creates an immutable brief revision.
- Compile remains locked until approval occurs.

## 4.4 Compile workspace

```text
┌──────────────────────────────── Main Area ─────────────────────────────────┐
│ Header: Compile editable scaffold                                          │
│                                                                            │
│ ┌──────── Approved brief summary ────────┐ ┌──── Compile readiness ──────┐ │
│ │ Slice: Light action-adventure          │ │ ✔ brief approved            │ │
│ │ Engine: Godot 4.x                      │ │ ✔ output lane in scope      │ │
│ │ Core loop: explore → interact → goal   │ │ ✔ checkpoint will be created│ │
│ └────────────────────────────────────────┘ └──────────────────────────────┘ │
│                                                                            │
│ Expected outputs                                                           │
│ - scene shell                                                              │
│ - player controller shell                                                  │
│ - interaction/objective shell                                              │
│ - config/data layer                                                        │
│ - simple HUD shell                                                         │
│                                                                            │
│ Warnings / assumptions                                                     │
│                                             [Compile editable scaffold]    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Post-compile summary wireframe

```text
┌──────────────────────────────── Compile Summary ───────────────────────────┐
│ Result: Editable scaffold generated                                         │
│ Checkpoint: cp_0003                                                         │
│                                                                            │
│ What exists now                                                            │
│ - 4 scenes                                                                  │
│ - player controller shell                                                   │
│ - objective chain placeholder                                               │
│                                                                            │
│ Inspect first in Godot                                                     │
│ [Main scene] [Input map] [Mechanic config] [Objective shell]              │
│                                                                            │
│ Locked assumptions / thin placeholders / warnings                          │
│                                         [Open compare] [Open provenance]   │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 4.5 Compare & Recompile workspace

```text
┌──────────────────────────────── Main Area ─────────────────────────────────┐
│ Header: Compare and request a bounded change                               │
│                                                                            │
│ ┌──────── Revision timeline ───────┐ ┌──── Semantic compare summary ─────┐ │
│ │ cp_0001 first brief              │ │ Change request: improve traversal │ │
│ │ cp_0002 first compile            │ │ Will affect: movement config      │ │
│ │ cp_0003 mechanic refinement      │ │ Preserves: scene layout           │ │
│ └──────────────────────────────────┘ │ Unsupported: HUD redesign         │ │
│                                      └────────────────────────────────────┘ │
│                                                                            │
│ ┌────────── Scope selection ──────────┐ ┌──── Blast radius / trust ─────┐ │
│ │ ( ) Scene structure                 │ │ Preservation confidence: High  │ │
│ │ (•) Mechanics / config              │ │ Will change / preserve / block │ │
│ │ ( ) Interaction / UI shell          │ │ Rollback target: cp_0002       │ │
│ └─────────────────────────────────────┘ └────────────────────────────────┘ │
│                            [Run recompile] [Rollback] [Cancel]             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Contract
- Timeline column is mandatory.
- Semantic compare summary leads the page.
- Raw file diff is secondary drill-down, never the default first view.
- `Run recompile` is blocked when requested scope exceeds the safe contract.

## 4.6 Playtest workspace

```text
┌──────────────────────────────── Main Area ─────────────────────────────────┐
│ Header: Bounded playtest guidance                                           │
│                                                                            │
│ Observation groups                                                         │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Objective readability: Medium confidence                              │ │
│ │ Linked artifact: objective chain shell                                │ │
│ │ Suggested next action: Recompile mechanics/config                     │ │
│ │ [Accept next action] [Ignore] [Inspect artifact]                      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Early movement friction: Low confidence                               │ │
│ │ Linked artifact: player controller config                             │ │
│ │ Suggested next action: Local edit first                               │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Contract
- Each observation must include focus area, linked artifact/scope, confidence, and recommended next action.
- No generic “fun score” or pseudo-analytics theater.

## 4.7 Provenance & Export workspace

```text
┌──────────────────────────────── Main Area ─────────────────────────────────┐
│ Header: Provenance and export                                               │
│                                                                            │
│ ┌──────── Lineage summary ────────────┐ ┌──── Export actions ────────────┐ │
│ │ Brief v1 → compile cp_0002          │ │ [Export JSON bundle]           │ │
│ │ Recompile cp_0003 mechanics scope   │ │ [Export markdown summary]      │ │
│ │ Human edits detected after cp_0002  │ │ [Generate disclosure helper]   │ │
│ └─────────────────────────────────────┘ └────────────────────────────────┘ │
│ Model/provider history                                                     │
│ Human-edited markers                                                       │
│ Privacy reminder: private by default                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 5. Reusable Component Contracts

## 5.1 `ProjectStatusCard`
**Purpose:** summarize project state on dashboard and related pickers.

**Inputs**
- `projectName`
- `sliceLabel`
- `engineTarget`
- `statusLabel`
- `lastActivityAt`
- `nextActionLabel`
- `currentCheckpoint`

**Actions**
- `onResume`
- `onOpenSecondary`

**Rules**
- must foreground next action over historical stats
- must render compile/recompile state consistently across cards and lists

## 5.2 `CertaintyBadge`
**Purpose:** distinguish explicit creator truth from system inference and risk.

**Variants**
- `confirmed`
- `inferred`
- `risk`

**Rules**
- badge meaning must be explained once within the Brief screen
- color cannot be the only signal; include icon/text label

## 5.3 `CompileReadinessChecklist`
**Purpose:** confirm that first compile is proceeding against an approved and in-scope brief.

**Inputs**
- `briefApproved`
- `engineTargetValid`
- `sliceInScope`
- `checkpointWillBeCreated`
- `knownWarnings[]`

**Rules**
- if any blocking item is false, compile CTA disables
- warnings may not disable compile but must remain visible

## 5.4 `OutputExpectationCard`
**Purpose:** list the structural outputs expected from compile or recompile.

**Inputs**
- `category`
- `artifacts[]`
- `thinPlaceholderNotes[]`

**Rules**
- should describe structural output, not aspirational gameplay quality

## 5.5 `RevisionTimeline`
**Purpose:** render checkpoint history for compare/recompile and provenance.

**Inputs**
- `revisions[]` where each revision has `id`, `label`, `createdAt`, `type`, `scope`, `summary`
- `selectedRevisionId`

**Actions**
- `onSelectRevision`

**Rules**
- must support compile and recompile events
- timeline labels should be human-readable before IDs

## 5.6 `SemanticDiffSummary`
**Purpose:** explain requested or completed changes in creator language.

**Inputs**
- `requestedChange`
- `willChange[]`
- `willPreserve[]`
- `unsupported[]`
- `preservationConfidence`

**Rules**
- must render before any file-level diff surface
- unsupported scope should be explicit, not hidden in footnotes

## 5.7 `ScopeSelector`
**Purpose:** constrain recompile requests to bounded semantic scopes.

**Variants**
- `scene-structure`
- `mechanics-config`
- `interaction-ui-shell`

**Rules**
- only one scope is selectable in MVP
- broader-than-safe requests route to fail-closed guidance

## 5.8 `TrustBlastRadiusPanel`
**Purpose:** show the risk contract before recompile.

**Inputs**
- `willChange[]`
- `willPreserve[]`
- `blocked[]`
- `preservationConfidence`
- `rollbackTarget`

**Rules**
- this component is mandatory before recompile confirmation
- rollback target must be visible in the same panel

## 5.9 `ObservationCard`
**Purpose:** package playtest guidance as bounded next-action suggestions.

**Inputs**
- `focusArea`
- `linkedArtifact`
- `confidence`
- `suggestedAction`
- `reasoningSummary`

**Actions**
- `onAcceptAction`
- `onIgnore`
- `onInspectArtifact`

## 5.10 `ProvenanceExportPanel`
**Purpose:** export creator-readable and machine-readable trust artifacts.

**Inputs**
- `lineageSummary`
- `humanEditMarkers[]`
- `availableExports[]`

**Actions**
- `onExportJson`
- `onExportMarkdown`
- `onGenerateDisclosureHelper`

## 6. MVP State Contracts

## 6.1 Project state model
```text
new → intake-draft → brief-draft → brief-approved → compile-ready
→ compiling → compiled → recompile-ready → recompiling → compiled-updated
```

### Rules
- `compile-ready` requires an approved brief.
- `recompile-ready` requires at least one successful compile/checkpoint.
- `compiled-updated` remains the steady state after successful recompiles.

## 6.2 Brief field state
Each structured brief field carries:
- `value`
- `source` = `creator` | `system-inferred`
- `status` = `draft` | `confirmed` | `flagged-risk`
- `lastEditedBy`
- `lastEditedAt`

## 6.3 Compile job state
```text
planning → queued → running → success | blocked | failed
```

### Rules
- `blocked` is used when trust/scope constraints prevent safe execution.
- `failed` is reserved for execution failure, not creator misuse.

## 6.4 Recompile request state
```text
draft-request → scoped → risk-reviewed → approved → running → success | blocked | failed | rolled-back
```

### Rules
- `risk-reviewed` must exist before `approved`.
- `rolled-back` creates a new visible timeline event.

## 6.5 Observation state
```text
new → reviewed → action-selected → resolved | ignored
```

## 7. Default Interaction Decisions Locked in This Step

- Brief editing uses side-by-side structured truth and raw input.
- Compile summaries default to task-oriented inspection cards, not raw file maps alone.
- Compare defaults to semantic summary + blast-radius panel + timeline, with file diff as secondary depth.
- Preservation confidence uses plain-language tiers in MVP: `High`, `Medium`, `Low`, `Blocked`.
- Provenance remains top-level in nav because trust/export is part of the product, but it stays visually quiet.

## 8. First Frontend Build Order Suggested by These Contracts

1. workspace shell
2. Projects dashboard + `ProjectStatusCard`
3. Intake form + state persistence
4. Brief editor + `CertaintyBadge`
5. Compile workspace + `CompileReadinessChecklist` + compile summary
6. Compare workspace + `RevisionTimeline` + `ScopeSelector` + `TrustBlastRadiusPanel`
7. Provenance & Export workspace
8. Playtest observation cards

## 9. Step Verdict

**Verdict: the UX is now specified tightly enough for implementation scaffolding and visual design without reopening the BMAD core.**

The MVP no longer depends on abstract “good UX.”
It now has concrete screen structure, reusable components, and explicit state transitions that defend the Godot-first creator-to-production wedge.
