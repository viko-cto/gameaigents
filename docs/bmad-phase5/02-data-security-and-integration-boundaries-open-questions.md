# GameAIgents Architecture Step 2 — Open Questions

_Date: 2026-03-20_

These are downstream implementation and runtime-delivery questions. None of them reopen the wedge, product scope, or security principles locked in Step 2.

## 1. Worker isolation substrate
What is the cleanest MVP execution substrate for guarded compile workers?
- container-per-job
- pooled workers with strict sandboxing
- hosted job runners plus isolated compile sidecars

## 2. Secret-management implementation choice
What concrete secret-management path best fits the initial deployment target?
- platform-managed environment secrets
- dedicated secret manager
- hybrid with rotated worker tokens

## 3. Support-access escalation model
How should support or engineering inspect a broken project without weakening the private-by-default posture?
- audited break-glass admin tooling
- temporary owner-consented support sessions
- export-based debugging only for MVP

## 4. Log redaction depth
What prompt/reference redaction defaults belong in observability before support loses too much diagnostic value?
- metadata-only by default
- prompt hashes plus selective snippets
- full payload capture only for explicitly opted-in debug sessions

## 5. Retention policy by data class
How long should references, checkpoints, exports, and transient world-sketch captures be retained in MVP?
- one global retention window
- class-specific retention rules
- creator-configurable retention later

## 6. Cross-region and residency posture
Does the first launch need region-aware storage / processing posture, or can it begin with one trusted region as long as policy and export controls are clear?

## 7. Provider-policy registry depth
What minimum metadata belongs in the provider registry at MVP?
- provider + model + version only
- plus commercial-use and disclosure tags
- plus asset-risk / moderation-policy tags from day one