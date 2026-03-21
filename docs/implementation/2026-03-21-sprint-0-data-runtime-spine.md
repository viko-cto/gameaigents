# Sprint 0 — Data & Runtime Spine

_Date: 2026-03-21_
_Status: completed as the first implementation chunk for `implementation / sprint-0-foundation-and-trust-scaffolding`_

## What this chunk delivers

This chunk builds the first durable backend truth layer for GameAIgents:

1. **Canonical project/runtime schema** in Supabase/Postgres
2. **Single-owner alpha access posture** via row-level security
3. **Private-by-default storage path conventions**
4. **Compile-lane lifecycle contract** for queueing and checkpoint/provenance creation
5. **Tested domain helpers** for run status, storage partitioning, and trust artifact creation

## Why this chunk first

The repo had planning artifacts but no executable runtime spine.
Starting with UI shell alone would have created fake momentum.
The BMAD build order explicitly says the trustworthy compile loop begins with:

- canonical project truth
- durable job lifecycle state
- project-scoped storage boundaries
- manifest/checkpoint/provenance creation contracts

So this chunk implements those first.

## Files added

### SQL
- `supabase/migrations/20260321103000_sprint0_foundation.sql`
- `supabase/policies/20260321103100_project_owner_policies.sql`

### Runtime/domain contracts
- `src/lib/domain/gameaigents.mjs`
- `src/lib/compile/compile-lane.mjs`

### Tests
- `test/foundation/compile-lane.test.mjs`

## Schema decisions locked here

### Core tables
- `projects`
- `intake_bundles`
- `brief_revisions`
- `artifacts`
- `artifact_revisions`
- `compile_runs`
- `compile_manifests`
- `revision_checkpoints`
- `provenance_records`
- `domain_events`

### Enum decisions
- project lifecycle: mirrors the locked UX state model
- run lane: `compile | recompile | export-provenance | playtest-guidance`
- run status: `queued | accepted | running | awaiting-artifact-promotion | succeeded | failed-retryable | failed-terminal | cancelled | expired`
- checkpoint type: `compile | recompile | rollback | manual`

### Access posture
- every canonical record carries `owner_id`
- RLS is enabled for project truth tables
- owner-only policies are established for alpha
- no collaboration or team-sharing posture is introduced yet

## Storage partitioning locked here

Project-scoped paths:

- `projects/{projectId}/references/...`
- `projects/{projectId}/compile-runs/{runId}/...`
- `projects/{projectId}/checkpoints/{checkpointId}/...`
- `projects/{projectId}/exports/{exportId}/...`

This preserves the architecture rule that object storage is subordinate to first-party records and always project-bounded.

## Compile-lane contract locked here

The runtime helper module establishes a minimal but serious compile flow contract:

1. create compile run draft
2. promote through allowed lifecycle states only
3. build manifest metadata
4. build checkpoint metadata
5. build provenance metadata

This is intentionally narrow.
It does **not** pretend to compile Godot projects yet.
It makes the future compile worker accountable to durable contracts.

## Acceptance achieved in this chunk

This chunk satisfies a real part of Sprint 0 acceptance:

- canonical truth model exists
- owner-scoped access rules exist
- compile run lifecycle is explicit
- manifest/checkpoint/provenance helpers exist
- trust-critical contracts are covered by tests

## Not yet done

Still needed in later Sprint 0 chunks:

- actual workspace shell routes
- auth wiring in app layer
- compile request API / BFF endpoints
- queue coordinator persistence wiring
- object storage bucket setup scripts
- seeded project flow from UI

## Next recommended chunk

**Next:** app shell + authenticated project workspace routes (`Projects`, `Intake`, `Brief`, `Compile`, `Compare`, `Provenance`) wired onto this runtime spine.
