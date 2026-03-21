alter table projects enable row level security;
alter table intake_bundles enable row level security;
alter table brief_revisions enable row level security;
alter table artifacts enable row level security;
alter table artifact_revisions enable row level security;
alter table compile_runs enable row level security;
alter table compile_manifests enable row level security;
alter table revision_checkpoints enable row level security;
alter table provenance_records enable row level security;
alter table domain_events enable row level security;

create policy projects_owner_only on projects
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy intake_bundles_owner_only on intake_bundles
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy brief_revisions_owner_only on brief_revisions
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy artifacts_owner_only on artifacts
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy artifact_revisions_owner_only on artifact_revisions
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy compile_runs_owner_only on compile_runs
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy compile_manifests_owner_only on compile_manifests
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy revision_checkpoints_owner_only on revision_checkpoints
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy provenance_records_owner_only on provenance_records
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy domain_events_owner_only on domain_events
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
