# GameAIgents Architecture Step 2 — Data, Security, and Integration Boundaries

_Date: 2026-03-20_  
_Status: Architecture data and trust boundaries locked for the MVP_  
_Scope: define what data is canonical, what is sensitive, how isolation works, and how external providers integrate without becoming the product’s source of truth_

## 1. Step Goal

This step answers the next build-critical architecture question:

> **How should GameAIgents partition project data, secrets, workers, and external integrations so the Godot-first compile-and-continue workflow is private, auditable, and safe to extend?**

Step 1 locked the system topology.
Step 2 locks the boundary rules that prevent that topology from quietly becoming a privacy leak, an IP-risk machine, or a provider-coupled mess.

## 2. Boundary Principles Locked in This Step

- **Project truth stays inside first-party data stores.** Providers may assist, but they do not become the durable record.
- **Private-by-default means enforceable isolation, not UI copy.** Authorization, storage layout, and export rules must reflect it.
- **Secrets never cross into creator-facing or compile-output surfaces.** Credentials, policy configs, and provider keys are system-only data.
- **Compile workers are privileged, so their blast radius must be narrow.** They should read scoped inputs and write scoped outputs, not roam the project.
- **Provider calls must be minimal, attributable, and replaceable.** Every external dependency must be boxed behind adapters and provenance.
- **Trust artifacts are product data, not logging leftovers.** Provenance, policy results, manifests, and checkpoints belong in the core architecture.
- **Future collaboration cannot weaken solo-owner discipline.** MVP assumes one owner, but the data model should survive expansion without re-platforming.

## 3. Canonical Data Domains

## 3.1 Domain A — Core project truth
This domain is the product’s canonical state and lives in first-party storage.

**Includes**
- `ProjectWorkspace`
- `CreatorIntentBundle`
- `SourceReference` metadata
- `BriefRevision`
- `ProjectArtifact`
- `ArtifactRevision`
- `ArtifactLink`
- `CompileRun`
- `CompileManifest`
- `ScopeContract`
- `RecompileRequest`
- `RevisionCheckpoint` metadata
- `ProvenanceRecord`
- `PolicyGateResult`
- `PlaytestObservation`
- domain events / outbox records

**Rule locked here**
If the system cannot reconstruct a creator-facing trust surface from first-party records in this domain, then the feature is under-specified.

## 3.2 Domain B — Large object payloads
This domain stores bulky content referenced by canonical records.

**Includes**
- uploaded files and mood boards
- compile output bundles
- checkpoint archives
- manifest payload files when too large for relational storage
- provenance export packages
- optional future world-sketch captures or session clips

**Rule locked here**
Blob storage is addressable and durable, but not canonical by itself.
Every stored object must be reachable through a first-party metadata record with ownership and lifecycle information.

## 3.3 Domain C — System-sensitive configuration
This domain contains internal-only data required to operate the platform safely.

**Includes**
- provider API keys
- service-to-service credentials
- object storage secrets
- database credentials
- policy rule configuration not intended for public disclosure
- abuse-detection thresholds
- worker signing keys

**Rule locked here**
This domain is never returned through creator APIs, embedded in compile artifacts, or copied into user-exported bundles.

## 3.4 Domain D — Ephemeral execution state
This domain covers short-lived runtime data that supports jobs but should not be treated as durable business truth.

**Includes**
- queue locks
- worker leases
- temporary file system workdirs
- retry counters
- transient provider response staging
- stream buffers

**Rule locked here**
Ephemeral execution state may accelerate work, but any creator-visible result must be committed back into canonical records before the run is considered successful.

## 4. Data Classification and Handling Rules

| Class | Examples | Default Access | Handling Rule |
|---|---|---|---|
| `project-private` | prompts, brief drafts, references, artifact revisions, manifests | owner only | encrypted at rest and in transit; excluded from public surfaces unless explicitly exported |
| `project-sensitive-generated` | generated code/assets, checkpoints, scope maps, compare payloads | owner only | same as project-private, plus rollback-safe retention rules |
| `publish-support` | provenance bundles, disclosure helpers, checklist outputs | owner-controlled export | generated only on explicit action; never auto-shared |
| `system-sensitive` | secrets, policy internals, abuse rules, signing material | internal service accounts only | secret manager / env-injected only; never persisted in creator-visible tables |
| `ops-observability` | logs, traces, worker diagnostics | internal support / engineering | redact prompts and references by default unless scoped support access is justified |

## 5. Authorization and Isolation Model

## 5.1 MVP ownership rule
The MVP is single-owner per project.
That means every project-scoped record must carry `ownerId` or inherit ownership through `projectId`.

**Architecture implication**
All reads and writes resolve through project ownership checks first, even before future collaborator roles exist.

## 5.2 Data access layers
There are only four legitimate access paths:

1. **Creator client → authenticated API**
2. **API → canonical database / object metadata**
3. **API or job dispatcher → scoped worker command**
4. **Worker adapter → bounded provider call or engine execution**

Anything that bypasses these paths is architectural debt and should be treated as suspect.

## 5.3 Object storage isolation
Storage keys should be partitioned by project and object role, for example:

`projects/{projectId}/references/...`
`projects/{projectId}/compile-runs/{runId}/...`
`projects/{projectId}/checkpoints/{checkpointId}/...`
`projects/{projectId}/exports/{exportId}/...`

**Rule locked here**
No globally guessable flat bucket layout.
Every access should be mediated by metadata lookup and authorization, not direct user-composed paths.

## 5.4 Row-level isolation posture
The product should plan for row-level project isolation from the beginning, even if the first deployment uses simple single-tenant ownership checks.

**Minimum architectural requirement**
- all project records include stable project ownership linkage
- all project queries are project-scoped by default
- support tooling must require explicit elevated paths for cross-project inspection

This keeps the MVP simple without painting the system into a multi-tenant corner.

## 6. Secrets and Provider-Credential Boundaries

## 6.1 Secrets posture
Provider keys and system credentials should live outside app code and outside user tables.

**Allowed patterns**
- managed secret store
- environment injection from deployment platform
- short-lived worker credentials where possible

**Forbidden patterns**
- secrets in project records
- secrets in object-storage payloads visible to creators
- secrets in client bundles
- secrets embedded in compile manifests or provenance exports

## 6.2 Provider account attribution
Because provenance and policy matter, each provider interaction should resolve to:
- provider name
- model or service version
- capability class
- commercial/policy label if relevant
- invocation timestamp / run linkage

**Rule locked here**
Creators may see provider attribution and policy-relevant metadata, but never raw credentials or internal account topology.

## 7. Compile Worker Security Boundary

Compile workers are the riskiest component because they touch user inputs, generated outputs, and engine-adapter logic.

## 7.1 Worker input contract
Workers should receive a scoped execution package containing:
- `projectId`
- `runId`
- approved brief revision reference
- allowed artifact / scope identifiers
- signed storage references for required inputs
- execution budget / timeout / policy context

They should **not** receive a broad “entire project dump unless you need it” payload.

## 7.2 Worker output contract
Workers may only write through controlled channels:
- generated output bundle refs
- manifest candidate payloads
- revision/update proposals
- diagnostics / warnings
- policy evidence inputs

Final promotion of outputs to current project truth should happen through transactional application services, not direct worker mutation of all tables.

## 7.3 Isolation decision for MVP
The architecture should assume **guarded isolated workers** for compile/recompile jobs.
For MVP, that can be an isolated container or job runtime per compile lane rather than a permanently shared process with broad filesystem access.

**Why this is the right tradeoff now**
- compile tasks process untrusted project content
- engine toolchains and generated files are noisy and failure-prone
- later stronger isolation can evolve without rewriting the contract surface

## 7.4 Temporary workdir rule
Any temporary workspace created during compile or export must be:
- project/run-scoped
- deleted or expired after completion
- excluded from creator-visible provenance except through normalized outputs

## 8. External Provider Integration Boundary

## 8.1 Provider types expected
- LLMs for intake/brief structuring and bounded suggestions
- optional world-sketch providers later
- potential moderation / policy classifiers
- possible asset-analysis or extraction helpers

## 8.2 Adapter contract
Every provider must sit behind an adapter that normalizes:
- request schema
- response schema
- timeout / retry rules
- cost / token accounting hooks
- provenance metadata
- safety/policy annotations

**Rule locked here**
The rest of the product should integrate with capabilities, not vendor-specific quirks.

## 8.3 Data minimization rule
Only send the minimum data required for the task.

Examples:
- brief structuring needs creator intent and selected references, not the entire project history
- scope analysis needs the relevant baseline and semantic target, not unrelated assets
- future world sketch extraction may need selected capture slices, not permanent unrestricted project access

## 8.4 Provider failure rule
If a provider fails, times out, or returns malformed data:
- canonical project state remains intact
- the system records the failure against the run or request
- the UI surfaces bounded failure, not fake success
- retries remain attributable

## 8.5 Training and reuse posture
The architecture should support explicit policy flags for whether project content may be reused for model improvement by third parties.
The default product stance should assume **no silent reuse**.

## 9. Trust and Publish-Safety Integration Boundaries

## 9.1 Provenance boundary
Provenance data is generated from first-party records plus bounded provider metadata.
It should not depend on scraping provider dashboards after the fact.

## 9.2 Policy-gate boundary
Policy checks should run as explicit services that output `PolicyGateResult` records tied to artifacts, runs, or exports.
This allows:
- Steam disclosure readiness
- Apple/Google publishing checklists later
- blocked or warned export actions
- auditability when a creator asks “why did you flag this?”

## 9.3 Export boundary
Exports are deliberate packaging operations, not direct raw bucket access.
Each export should be:
- requested explicitly
- scoped to an artifact set or project view
- represented by a durable export record or loggable event
- filtered to exclude system-sensitive data automatically

## 10. Integration Decision Records Locked in Step 2

## ADR-007 — Keep first-party records canonical over provider memory
**Decision:** provider outputs may inform or draft, but canonical project truth stays in first-party data stores.

**Why**
The product promise is traceable continuation, not dependency on external chat state.

## ADR-008 — Classify data into project-private, generated, publish-support, system-sensitive, and ops-observability domains
**Decision:** the system adopts explicit data classes with default handling rules.

**Why**
Security and privacy posture must be enforceable in code paths, not left to interpretation.

## ADR-009 — Use project-scoped storage paths and metadata-gated access
**Decision:** object storage access is mediated by project metadata and authorization, not direct path trust.

**Why**
Private-by-default collapses if bucket keys act like public URLs.

## ADR-010 — Run compile/recompile in guarded isolated workers with scoped execution packages
**Decision:** compile workers receive only scoped inputs and return bounded outputs.

**Why**
This constrains blast radius for untrusted inputs, engine tooling, and future provider integrations.

## ADR-011 — Put all external providers behind replaceable capability adapters
**Decision:** provider usage is normalized behind adapter contracts with provenance and policy hooks.

**Why**
Vendor churn is inevitable; core product logic should survive it.

## ADR-012 — Make exports explicit packaging actions that automatically exclude system-sensitive data
**Decision:** provenance and publishing helpers are generated from controlled export flows.

**Why**
Trust artifacts should help creators ship safely without leaking internals.

## 11. What This Step Defers to Architecture Step 3

These questions remain real, but they are now properly bounded:
- exact queue framework and worker host choice
- CI/CD environment promotion and infra rollout
- backup / retention SLAs per data class
- support-access workflow and audit escalation path
- deployment-region strategy and cost tradeoffs
- runtime alerting / incident response thresholds

## 12. Step Verdict

**Verdict: GameAIgents now has enforceable data and security boundaries strong enough to support runtime-operations planning without reopening product scope.**

The architecture now clearly says:
- first-party records own truth
- private-by-default is enforced through storage and auth boundaries
- compile workers are constrained execution lanes, not roaming super-processes
- providers are boxed helpers, not hidden product state
- provenance, policy, and export safety are core integration surfaces

That is the right posture for a serious creator-to-production copilot.