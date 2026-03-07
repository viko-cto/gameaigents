# gameAIgents — BMAD Workflow Plan

## Goal
Create a robust BMAD-native plan for building gameAIgents with proper product/tech alignment.

## Workflow Sessions

### Session 1 — Analyst: Product Brief
Command: `/bmad-bmm-create-product-brief`
Inputs:
- Problem: game creation is fragmented across tools and roles
- Audience: indie studios, hobby creators, small game teams
- Value: AI co-builders for design, narrative, prototyping, QA

### Session 2 — PM: PRD
Command: `/bmad-bmm-create-prd`
Include:
- game concept generation
- character/world pipelines
- rapid playable prototype loop
- collaboration and versioning
- monetization model and creator licensing

### Session 3 — UX Design
Command: `/bmad-bmm-create-ux-design`
Include:
- creator workflow UI
- prompt-to-prototype flow
- version compare and rollback
- publish/export pipelines

### Session 4 — Architecture
Command: `/bmad-bmm-create-architecture`
Initial stack hypothesis:
- Next.js control surface
- model orchestration layer
- asset pipeline + storage
- engine export adapters (Unity/Unreal/Web)

### Session 5 — Epics & Stories
Command: `/bmad-bmm-create-epics-and-stories`
Define P0/P1/P2 with dependency graph and acceptance criteria.

### Session 6 — Readiness Check
Command: `/bmad-bmm-check-implementation-readiness`
Pass before any engineering sprint starts.
