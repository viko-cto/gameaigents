# GameAIgents UX Design Step 2 — Open Questions

_Date: 2026-03-20_

These are downstream implementation/design questions after wireframes and component contracts were locked. None of them reopen the product wedge.

## 1. Visual system style direction
What visual language best fits the target user without drifting into gamer cliché or enterprise SaaS blandness?
- dark technical workspace
- neutral IDE-like shell
- restrained game-tool hybrid

## 2. Godot inspection shortcuts
Which post-compile inspection shortcuts should be first-class buttons in the compile summary?
- main scene
- input map
- movement config
- objective chain shell

## 3. Raw diff drill-down format
Once semantic compare is complete, what file-detail presentation is most useful as secondary depth?
- inline grouped diff cards
- collapsible file tree diff
- split-pane revision compare

## 4. Revision timeline granularity
Should the timeline show every meaningful event by default, or collapse low-signal internal checkpoints behind a simplified view?

## 5. Brief editor field density
Should the structured brief remain a long single-page editor, or use section groups with anchored navigation for faster scanning?

## 6. Compile job feedback cadence
What amount of in-progress compile feedback is useful without simulating precision the backend cannot actually guarantee?

## 7. Playtest action defaults
Should `ObservationCard` default to the recommended action selected, or require the creator to consciously choose every next step?
