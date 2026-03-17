

## Advanced Elicitation \#14: Self-Consistency Validation

### Methodology

Three independent validation passes, then synthesis:

* Pass 1 (Factual Reviewer): Check each item against stated constraints — does it fit?  
* Pass 2 (Senior Engineer): Check buildability — can it ship in the timeline?  
* Pass 3 (Consistency Auditor): Check cross-item coherence — do items contradict each other?

---

### 1\) Consistency Matrix

#### Core Innovations (1-5)

| \# | Item | Product | Compliance | Technical | Execution | Strategic | Rating |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | CRO pre-population pipeline | Strong — directly drives 100 profiles | Strong — Art 14 \+ LIA documented, source provenance built-in | Strong — batch pipeline via Edge Functions, CTG+PubMed APIs well-documented | Acceptable — 5-7 days for pipeline \+ claim flow \+ emails | Strong — CRO cold-start is the strategy | Strong |
| 2 | Profile enrichment UX | Strong — quality drives sponsor conversion | Strong — consent at claim, no PHI fields | Strong — standard form UI \+ AI autocomplete | Acceptable — 3-4 days for editor \+ showcase \+ progress | Strong — "professional asset" thesis | Strong |
| 3 | Guided Trial Profile Builder → SQL search | Strong — sponsor onboarding IS the builder | Strong — no AI in results, structured query | Strong — Supabase RPC, GIN indexes on JSONB | Tight — 12 branches (3 polished \+ 9 functional) is 4-5 days | Strong — progressive disclosure is the differentiation | Acceptable |
| 4 | Site comparison view | Strong — where buying decisions happen | Strong — only shows claimed profiles (RLS) | Acceptable — study-type-aware columns add dynamic logic | Acceptable — 2-3 days for fixed comparison \+ study-type column mapping | Strong — structured comparability is the moat | Strong |
| 5 | Structured feasibility workflow | Strong — verification loop ignition, saves sponsors weeks | Acceptable — pre-fill must respect field confirmation status (see contradiction \#2) | Acceptable — JSONB templates \+ responses, 6 question types | Tight — template builder \+ response flow \+ status tracking \+ reminders \= 5-6 days | Strong — this is where directory becomes workflow | Acceptable |

#### Stakeholder Refinements (6-14)

| \# | Item | Product | Compliance | Technical | Execution | Strategic | Rating |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 6 | Per-field Confirm / Edit / Remove | Strong — \#1 trust safeguard per all stakeholders | Strong — supports Art 16 rectification, strengthens lawful basis on confirmation | Acceptable — adds field-level confirmation\_status \+ confirmed\_by \+ confirmed\_at to data model; increases UI complexity per field | Tight — adds \~2 days to enrichment UI build | Strong — trust infrastructure | Acceptable |
| 7 | "May be yours" uncertain framing | Strong — prevents false-certainty trust break | Strong — honest data presentation reduces misrepresentation risk | Simple — UI copy \+ confidence flag per source match | Low effort — 0.5 days (copy \+ conditional rendering) | Strong — intellectual honesty | Strong |
| 8 | Identity/source correction ("Not mine" \+ admin queue) | Strong — repair mechanism when pre-population fails | Strong — Art 16 \+ Art 17 compliance support | Acceptable — admin queue \+ audit trail for corrections | Acceptable — 1-2 days (simple form \+ admin list view) | Strong — trust repair | Acceptable |
| 9 | Quality-weighted match counts | Strong — prevents sponsor disappointment at first search | N/A — no compliance dimension | Simple — COUNT with GROUP BY on profile completeness bucket \+ verification tier | Low effort — 1 day (query \+ UI) | Strong — honesty builds trust | Strong |
| 10 | CRO invitation campaign dashboard | Strong — drives batch 2 invitations \= more profiles | Acceptable — email tracking requires privacy policy disclosure | Acceptable — Resend webhooks for delivery/open/click events, aggregation query | Acceptable — 2-3 days (webhook handler \+ dashboard view) | Strong — CRO is the distribution engine | Acceptable |
| 11 | CRC-first enrichment \<15-20 min | Strong — completion rate determines profile quality | N/A | N/A — this is a design constraint, not a feature | Risk — see contradiction \#1 | Strong | Acceptable (execution risk) |
| 12 | Feasibility template builder (6 question types \+ prefill) | Strong — replaces Word docs | Acceptable — prefill must use confirmed fields only | Acceptable — JSONB schema handles question types, prefill is key-matching | Tight — 6 question types \+ prefill logic \+ confirmation \= 3-4 days | Strong | Acceptable |
| 13 | Study-type-aware comparison columns | Strong — relevant comparison drives better decisions | N/A | Acceptable — mapping from study type → comparison column set, stored as config | Acceptable — 1 day on top of base comparison | Strong | Strong |
| 14 | Polish 3 branches, keep 9 functional | Strong — focuses effort on likely first trials | N/A | Simple — 9 branches use generic common steps, 3 get custom fields | Strong — saves \~1 week vs. polishing all 12 | Strong | Strong |

#### Items NOT in the 14 but Required for Kill Metric

| Item | Status | Risk |
| :---- | :---- | :---- |
| Payment/subscription mechanism | Not in any Phase 1a item list | P1 gap — kill metric requires 5 PAYING sponsors. At 5 sponsors, manual invoicing works, but sponsor must have a way to sign up for paid tier. Minimum: landing page → Stripe Checkout → access granted. |
| Sponsor registration/onboarding | Implied but not explicitly scoped | P1 gap — sponsor signs up, creates account, gets role assigned, sees builder. Must be \<10 min per success criteria. |
| Admin data quality tools | In Journey 6 but not in innovation list | P2 gap — duplicate detection, staleness flagging, re-engagement prompts. At launch scale, Vadim handles manually. |
| Profile showcase page (sponsor-facing) | Implied by enrichment UX but not explicitly called out | P1 gap — this is what sponsors SEE when they click a search result. Must render as professional showcase, not database form. Part of enrichment build but needs explicit design attention. |

---

### 2\) Contradictions List

#### P0 Contradictions (Must Resolve Before Build)

Contradiction \#1: Per-Field Confirmation vs. Enrichment Time Budget  
The \<15-20 minute enrichment target assumes a site coordinator enriches beyond auto-fill. But the per-field Confirm/Edit/Remove requirement means the coordinator must ALSO review and confirm every pre-populated field before enrichment begins.  
If pre-population fills 25-30 fields from CTG \+ PubMed, and each confirmation takes 5-10 seconds (read field → check accuracy → click confirm), that's 2-5 minutes just confirming pre-populated data — BEFORE any enrichment starts. At the upper end, confirmation \+ enrichment could exceed 20 minutes.  
Resolution: Batch confirmation UX. Instead of confirming each field individually:

* Show pre-populated data grouped by source (CTG group, PubMed group)  
* Offer "Confirm all from this source" with expandable detail  
* Flag uncertain items separately (these require individual review)  
* Confirmed-all fields still show source attribution but with green ✓  
* Estimated time: 1-2 minutes for batch confirmation vs. 5 minutes for per-field

This preserves the trust safeguard while keeping the time budget. The per-field Confirm/Edit/Remove still exists for individual fields, but batch confirmation is the default path.  
---

Contradiction \#2: Feasibility Pre-Fill vs. Field Confirmation Status  
The feasibility workflow pre-fills answers from profile data. But what happens when a profile field is pre-populated (from a source) but NOT yet confirmed by the site?  
Scenario: CTG says site has "Phase II oncology experience." Site hasn't confirmed this field yet. Sponsor sends feasibility asking "Phase II oncology experience?" System pre-fills "Yes" from unconfirmed source data. Site sees pre-filled "Yes" and assumes it's correct. But it was the WRONG site's data (disambiguation error).  
Resolution: Feasibility pre-fill must ONLY use confirmed fields. Unconfirmed pre-populated fields are NOT eligible for pre-fill. The feasibility response shows:

* Pre-filled (confirmed) → green indicator, "From your verified profile"  
* Not pre-filled (unconfirmed/missing) → blank field, site must answer manually

This creates an additional incentive to confirm profile fields: confirmed fields save time on future feasibility responses.  
---

Contradiction \#3: Source-Agnostic Ingestion Framework (ADR-06) vs. 6-Week Build  
ADR-06 specifies a full source-agnostic ingestion architecture with per-field source metadata, allowed-use constraints, freshness policies, confidence levels, and rights constraint tracking. This is a FRAMEWORK design — it anticipates 5-10 future sources.  
At launch, there are exactly 2 sources: ClinicalTrials.gov and PubMed. Plus CRO CSV upload (which is a partner channel, not a registry source). Plus first-party site input.  
Building a generic ingestion framework for 2 sources is over-engineering. But NOT building provenance metadata means retrofit later.  
Resolution: Implement ADR-06 as a data model, not as an abstraction layer.

* Every externally sourced field carries source\_system, source\_record\_id, source\_url, processed\_at, freshness\_status  
* These are columns/JSONB fields on the profile data, not a separate ingestion service  
* The "framework" is a database convention, not an application architecture  
* Source-specific API clients (CTG fetcher, PubMed fetcher) are concrete implementations, not plugins to an abstract ingestion interface  
* When source \#3 arrives (Phase 1b), you write another concrete fetcher following the same column convention

This gives you 80% of ADR-06's value with 20% of the build cost.  
---

#### P1 Contradictions (Should Resolve, Won't Block Launch)

Contradiction \#4: CRO Campaign Dashboard Timing vs. Build Priority  
The CRO campaign dashboard is needed for batch 2 — which happens AFTER launch, not during the 6-week build. Building it in weeks 1-6 takes 2-3 days from features that drive initial launch quality.  
But: if the dashboard isn't ready when batch 1 goes out, the data isn't being captured. Resend webhooks must be configured from day 1 to capture open/click events, even if the dashboard UI ships later.  
Resolution: Split into two pieces:

* Week 2 (with invitation flow): Configure Resend webhooks, store delivery/open/click events in invitation\_events table. 0.5 days.  
* Week 7-8 (post-launch polish): Dashboard UI that queries the events table. 1-2 days.

Henrik gets his data. The dashboard just ships 1-2 weeks after the first batch.  
---

Contradiction \#5: Study-Type-Aware Comparison vs. Profile Data Availability  
The comparison view should show different columns for different study types (oncology → enrollment history, IVDR → lab accreditation). But at launch, most profiles will have been enriched generically — CRCs don't know which study types will search for them, so they fill in what they know. The comparison view might select "lab accreditation" as an IVDR-relevant column and find it empty across all sites because no CRC thought to add it during enrichment.  
Resolution: Study-type-aware comparison uses "available data" columns, not "ideal data" columns. The column selection logic is:

1. Start with study-type-relevant field list  
2. Filter to fields where ≥30% of compared sites have data  
3. If a relevant field is empty across all sites, show it but grayed out with "No sites have reported this yet"

This prevents empty comparison columns from making the view look broken, while still signaling to sponsors what data would be valuable (indirect feedback to sites on what to enrich).  
---

Contradiction \#6: Payment Mechanism Gap  
Kill metric requires 5 PAYING sponsors. No payment feature is in the Phase 1a innovation list. This is solvable at small scale (manual invoicing \+ email \+ bank transfer or a simple Stripe Checkout link), but someone needs to build it or at least set up a Stripe account.  
Resolution: Minimal payment path:

* Stripe Checkout session created manually per sponsor (no in-app subscription management)  
* On successful payment, admin manually upgrades account role  
* Phase 1b: self-service subscription management, tier selection, billing portal

Effort: 0.5 days to configure Stripe \+ create checkout link generation script. Not a feature — an operational setup task.  
---

#### P2 Contradictions (Track, Don't Resolve Now)

Contradiction \#7: Profile View Count (Site Signal) vs. Privacy  
The stakeholder round table recommended showing sites "Your profile was viewed N times this week" as a motivation signal. But profile views are by sponsors — do sponsors know their viewing activity is being counted and surfaced? Platform terms should cover this, but it's worth noting.  
Resolution: Aggregate count only (no viewer identity). Disclosed in platform terms under "usage analytics." Standard practice for professional networks. No action needed beyond ensuring terms mention it.  
---

Contradiction \#8: "All 12 Study-Type Branches Functional" vs. Edge-Case Study Types  
The decision is "polish 3, keep 9 functional." But some of the 9 unpolished branches have genuinely different data models (IVDR uses analyte/specimen language, vaccine trials use cold chain requirements). "Functional with generic common steps" means these branches will ask questions using pharmaceutical-trial language that doesn't fit the study type.  
Resolution: Accept the imperfection. The 9 unpolished branches use generic common steps and work. If a sponsor selects "Vaccine" and sees "condition" instead of "target pathogen," the search still works — the results are still SQL-filtered by the selected criteria. Language polish (conditional field labels per study type) is a Phase 1a-late or Phase 1b task. The 3 polished branches (rare disease, oncology Phase II/III, IVDR) cover the most likely first CRO partnership trial types.  
---

### 3\) Scope Correction Recommendations

#### Must Cut (Remove from Phase 1a entirely)

| Item | Reason |
| :---- | :---- |
| Automated leakage detection alerts | Already deferred. Confirm it stays cut. At 5 sponsors, Vadim knows them personally. |
| Express Interest | Already deferred. Confirm it stays cut. Empty trial feed at launch volume. |
| Evidence Expiry Engine automation | Already deferred. Data model has expiry\_date field — no automation needed until V2 evidence exists. |
| Dispute Resolution workflow UI | Already deferred. If a dispute arises, handle via email \+ admin database update. |

#### Must Simplify

| Item | Current Scope | Simplified Scope | Time Saved |
| :---- | :---- | :---- | :---- |
| Per-field Confirm/Edit/Remove | Individual confirmation per field | Batch confirmation by source group \+ individual review for uncertain items only | 1 day |
| ADR-06 ingestion framework | Source-agnostic abstraction layer with plugins | Database column convention \+ concrete CTG/PubMed fetchers. No abstraction layer. | 2 days |
| CRO campaign dashboard | Full dashboard in 6-week build | Webhook event capture in weeks 1-6. Dashboard UI in weeks 7-8. | 1.5 days (deferred, not cut) |
| Engagement state machine | 7 states \+ edge states | 5 states: matched\_anonymous → confidentiality\_accepted → engagement\_active → engagement\_concluded \+ confidentiality\_declined. Expiry is a cron-set decline. nda\_required\_external is a flag, no UI. | 1 day |
| Feasibility question types | 6 types (yes/no, numeric, free text, single-select, multi-select, table) | 5 types (drop table/matrix — complex UI component for rare use). Add table type in Phase 1b. | 1 day |

Total time recovered: \~6.5 developer-days (\~2 calendar days with 3 developers)

#### Must Delay (Explicitly Move to Phase 1b)

| Item | Why Delay | Phase |
| :---- | :---- | :---- |
| Persistent comparison notes | Session-based text field is sufficient for Phase 1a. Saved/shareable notes require dedicated data model. | 1b |
| CRO search-on-behalf delegation | CROs use own accounts in 1a. Delegation UX is complexity without necessity at 5 sponsors. | 1b |
| Feasibility template import | Sponsors can recreate templates manually using 5 question types. Import from Word/PDF is a convenience feature, not a launch requirement. | 1b |
| Comparison column customization | Study-type-aware defaults are sufficient. Custom column selection is a power-user feature. | 1b |
| Admin data quality dashboard | At 100 profiles, Vadim queries the database directly. Admin tooling scales with profile count. | 1b (month 3+) |

#### Must Upgrade to Non-Negotiable

| Item | Current Status | Why Upgrade |
| :---- | :---- | :---- |
| Profile showcase page design | Implied but not explicitly scoped | This is the sponsor's FIRST impression of a site. If it looks like a database form, comparison view is meaningless. Must be explicitly designed as a professional showcase — even if simple. |
| Sponsor registration \+ role assignment | Not in scope list | Cannot have paying sponsors without signup flow. Simple: email \+ Google SSO → role assignment → builder access. |
| Stripe payment setup | Not mentioned anywhere | Kill metric requires 5 PAYING sponsors. Even manual Stripe Checkout links need configuration. |
| Feasibility pre-fill ONLY from confirmed fields | Not explicitly stated | P0 contradiction \#2. Unconfirmed pre-fill creates trust risk. Must be a hard rule. |

---

### 4\) Phase 1a Final Integrity Judgment

Verdict: The plan is self-consistent enough to proceed, with 3 mandatory repairs and 2 caveats.

#### Mandatory Repairs (Before Build Starts)

1. Resolve P0 Contradiction \#1: Implement batch confirmation by source group as the default enrichment path. Per-field confirm/edit/remove remains available for individual fields and uncertain items. This keeps enrichment under 20 minutes while preserving trust safeguards.  
2. Resolve P0 Contradiction \#2: Hard rule: feasibility pre-fill uses ONLY confirmed profile fields. Unconfirmed fields are left blank in feasibility responses. This creates a natural incentive loop: confirm your profile fields → future feasibility responses are pre-filled → less work.  
3. Resolve P0 Contradiction \#3: Implement ADR-06 as a data model convention (source metadata columns on profile data), not as an abstraction layer. Concrete CTG and PubMed fetchers, not pluggable ingestion framework.

#### Caveats

Caveat 1: The 6-week timeline is extremely tight. After simplifications, the build contains: 14 distinct views/pages, 2 external API integrations, email infrastructure, RLS policies for 4 roles, 3 polished study-type branches, and GDPR compliance gates. With 3 developers and the scope corrections above, this is feasible but leaves zero buffer. Any unexpected complexity (API rate limits, RLS debugging, email deliverability issues) could push to 7-8 weeks.  
Risk mitigation: The "if only 3 things ship" fallback (pre-population \+ builder \+ feasibility) must remain the floor. Comparison view and dashboards are the cut candidates if timeline pressure hits.  
Caveat 2: Data quality at launch will be thin. Even with perfect execution, profiles at launch will be 40-65% complete. Many comparison columns will have sparse data. Match counts will be small for niche searches. The product must be honest about this (quality-weighted counts, sparse-data indicators) rather than hiding it. Early sponsors must be explicitly set with realistic expectations — this is a pilot, not a mature marketplace.  
---

### 5\) Final Output

#### Lock Now

| \# | Item | Why Lock |
| :---- | :---- | :---- |
| 1 | CRO pre-population pipeline with batch confirmation UX | Supply-side engine. Without profiles, no product. Batch confirmation solves P0 \#1. |
| 2 | Guided Trial Profile Builder (3 polished \+ 9 functional branches) → structured SQL search with quality-weighted results | Sponsor onboarding IS the builder. Quality-weighted counts solve trust. |
| 3 | Structured feasibility workflow with confirmed-field-only pre-fill | Verification loop ignition. Confirmed-only pre-fill solves P0 \#2. |
| 4 | Profile enrichment editor with per-field source attribution and confirm/edit/remove | Trust infrastructure. CRC-first design with \<20 minute target. |
| 5 | Study-type-aware comparison view with available-data column logic | Where buying decisions happen. Dynamic columns based on data availability. |
| 6 | Sponsor registration \+ Stripe payment setup | Kill metric requires paying sponsors. Simple checkout flow. |
| 7 | Confidentiality clickwrap at identity reveal | Legal gate. 5 core states, no edge-state UI. |
| 8 | Append-only audit event log | Compliance foundation. All legal/engagement events logged immutably. |
| 9 | Art 14 notice delivery with proof-of-delivery tracking | GDPR launch gate. Non-negotiable. |
| 10 | "Not mine" correction workflow with admin queue | Trust repair. Simple form \+ admin list. |
| 11 | Profile showcase page (professional rendering of profile data) | Sponsor's first impression. Must look like LinkedIn, not a form. |
| 12 | Source provenance as database column convention (ADR-06 simplified) | Future-proof data model without framework overhead. |
| 13 | Resend webhook event capture for invitation tracking | Data capture from day 1, even if dashboard UI ships later. |
| 14 | Site profile view count signal | Lightweight motivation for sites before trial feed exists. |

#### Defer Now

| \# | Item | Earliest Phase | Why Defer |
| :---- | :---- | :---- | :---- |
| 1 | CRO campaign dashboard UI | Phase 1a week 7-8 | Data captured from day 1 via webhooks. Dashboard is post-launch polish. |
| 2 | Express Interest | Phase 1b | Requires sponsor volume for meaningful trial feed. |
| 3 | Bi-directional matching feed | Phase 1b | Same volume dependency. |
| 4 | Evidence Expiry Engine automation | Phase 1b | No V2 evidence at launch. Field exists in schema. |
| 5 | Dispute Resolution workflow UI | Phase 1b | Zero disputes at launch scale. Handle manually. |
| 6 | Capability binding re-confirmation automation | Phase 1b | No PI affiliation changes at launch. Classification stored in schema. |
| 7 | Leakage detection automation | Phase 1b | Know all 5 sponsors by name. Manual quarterly review. |
| 8 | Persistent comparison notes | Phase 1b | Session-based text field sufficient. |
| 9 | Feasibility template import | Phase 1b | Manual recreation from 5 question types. |
| 10 | CRO search-on-behalf delegation | Phase 1b | CROs use own accounts. |
| 11 | Table/matrix question type | Phase 1b | 5 question types cover 90% of templates. |
| 12 | Comparison column customization | Phase 1b | Study-type-aware defaults sufficient. |
| 13 | Admin data quality dashboard | Phase 1b month 3+ | Vadim queries database directly at launch. |
| 14 | nda\_required\_external UI | Phase 1b | Flag in database, handle manually. |

#### Watch Closely During Build

| \# | Item | Risk | Trigger for Concern | Mitigation |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Enrichment time budget | Batch confirmation \+ enrichment could exceed 20 min for profiles with many pre-populated fields | Internal testing shows \>18 min for 60% completeness | Cut low-priority enrichment fields. Reduce "suggested" fields. Accept 55% completeness threshold instead of 60%. |
| 2 | CTG/PubMed API reliability | Rate limits, downtime, or data quality issues during batch pre-population | \>10% of batch profiles fail API enrichment | Fallback: ship profiles with CRO-provided data only (name, email, institution). Manual enrichment by admin for failed API calls. |
| 3 | Builder → search quality at low profile volume | Niche searches return 0-3 results. Empty-state UX must work perfectly. | \>30% of test searches return \<3 results | Ensure criteria relaxation suggestions are excellent. "Save and notify" must work. Consider broadening default search radius. |
| 4 | RLS policy complexity | 4 roles × 15 tables × read/write/update policies \= 60+ RLS rules | RLS debugging takes \>2 days in week 1-2 | Start with 2 roles (sponsor, site) \+ admin bypass. Add CRO role policies in week 3\. |
| 5 | Feasibility template builder scope creep | 5 question types could expand to "just one more type" pressure | Any request for conditional logic, branching, or scoring in templates | Hard no. Templates are flat question lists. No logic. No scoring. Phase 2\. |
| 6 | Profile showcase page design quality | Professional-looking profile requires design investment | Profile page looks like a form with better CSS | Allocate 1 full day to a design-focused developer for the showcase page. This is NOT a low-priority task — it's the sponsor's first impression. |
| 7 | 12 study-type branches functional | "Functional but unpolished" could mean broken edge cases in 9 branches | Any branch crashes, shows wrong fields, or produces 0 results when data exists | Integration test per branch: builder completes → search executes → results render. 30 min per branch. Non-negotiable QA. |

---

Select: \[A\] Advanced Elicitation \[P\] Party Mode \[C\] Continue to Project Type Analysis (Step 7 of 11\)  
