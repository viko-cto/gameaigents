create extension if not exists "pgcrypto";

create type project_lifecycle_status as enum (
  'new',
  'intake-draft',
  'brief-draft',
  'brief-approved',
  'compile-ready',
  'compiling',
  'compiled',
  'recompile-ready',
  'recompiling',
  'compiled-updated'
);

create type run_lane as enum (
  'compile',
  'recompile',
  'export-provenance',
  'playtest-guidance'
);

create type run_status as enum (
  'queued',
  'accepted',
  'running',
  'awaiting-artifact-promotion',
  'succeeded',
  'failed-retryable',
  'failed-terminal',
  'cancelled',
  'expired'
);

create type artifact_kind as enum (
  'intake-reference',
  'brief-structure',
  'engine-project',
  'scene',
  'script',
  'config',
  'asset-bundle',
  'export-bundle',
  'playtest-note',
  'provenance-bundle'
);

create type artifact_origin as enum (
  'user-upload',
  'system-generated',
  'provider-generated',
  'manual-edit',
  'rollback-restore'
);

create type checkpoint_type as enum (
  'compile',
  'recompile',
  'rollback',
  'manual'
);

create type provenance_class as enum (
  'compile',
  'recompile',
  'export',
  'ingestion',
  'playtest-guidance'
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  slug text not null unique,
  name text not null,
  engine_target text not null default 'godot',
  flagship_slice_tag text not null default 'light-action-adventure-exploration',
  privacy_mode text not null default 'private',
  lifecycle_status project_lifecycle_status not null default 'new',
  latest_checkpoint_id uuid,
  latest_run_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists intake_bundles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  raw_idea text not null,
  constraints_json jsonb not null default '{}'::jsonb,
  references_json jsonb not null default '[]'::jsonb,
  source_snapshot_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists brief_revisions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  revision_number integer not null,
  status text not null check (status in ('draft', 'approved', 'superseded')),
  brief_json jsonb not null,
  approved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  unique(project_id, revision_number)
);

create table if not exists artifacts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  kind artifact_kind not null,
  logical_key text not null,
  latest_revision_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique(project_id, logical_key)
);

create table if not exists compile_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  lane run_lane not null,
  status run_status not null default 'queued',
  requested_by text not null default 'owner',
  source_brief_revision_id uuid references brief_revisions(id) on delete set null,
  base_checkpoint_id uuid,
  scope_json jsonb not null default '{}'::jsonb,
  policy_summary_json jsonb not null default '{}'::jsonb,
  worker_version text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists compile_manifests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  run_id uuid not null references compile_runs(id) on delete cascade,
  engine_target text not null default 'godot',
  manifest_json jsonb not null,
  storage_ref text,
  created_at timestamptz not null default timezone('utc', now()),
  unique(run_id)
);

create table if not exists artifact_revisions (
  id uuid primary key default gen_random_uuid(),
  artifact_id uuid not null references artifacts(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  run_id uuid references compile_runs(id) on delete set null,
  origin artifact_origin not null,
  revision_number integer not null,
  storage_ref text,
  checksum text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique(artifact_id, revision_number)
);

create table if not exists revision_checkpoints (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  checkpoint_type checkpoint_type not null,
  source_run_id uuid references compile_runs(id) on delete set null,
  manifest_id uuid references compile_manifests(id) on delete set null,
  snapshot_ref text,
  summary_markdown text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists provenance_records (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  owner_id uuid not null,
  subject_type text not null,
  subject_id uuid,
  run_id uuid references compile_runs(id) on delete set null,
  manifest_id uuid references compile_manifests(id) on delete set null,
  checkpoint_id uuid references revision_checkpoints(id) on delete set null,
  provenance_class provenance_class not null,
  provider text,
  model text,
  prompt_ref text,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists domain_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  owner_id uuid,
  run_id uuid references compile_runs(id) on delete cascade,
  event_type text not null,
  payload_json jsonb not null default '{}'::jsonb,
  emitted_at timestamptz not null default timezone('utc', now())
);

alter table projects
  add constraint projects_latest_checkpoint_fk
  foreign key (latest_checkpoint_id) references revision_checkpoints(id) on delete set null;

alter table projects
  add constraint projects_latest_run_fk
  foreign key (latest_run_id) references compile_runs(id) on delete set null;

alter table artifacts
  add constraint artifacts_latest_revision_fk
  foreign key (latest_revision_id) references artifact_revisions(id) on delete set null;

create index if not exists idx_projects_owner_id on projects(owner_id);
create index if not exists idx_intake_bundles_project_id on intake_bundles(project_id);
create index if not exists idx_brief_revisions_project_id on brief_revisions(project_id);
create index if not exists idx_compile_runs_project_status on compile_runs(project_id, status, lane);
create index if not exists idx_artifacts_project_id on artifacts(project_id);
create index if not exists idx_artifact_revisions_artifact_id on artifact_revisions(artifact_id);
create index if not exists idx_revision_checkpoints_project_id on revision_checkpoints(project_id, created_at desc);
create index if not exists idx_provenance_records_project_id on provenance_records(project_id, created_at desc);
create index if not exists idx_domain_events_project_id on domain_events(project_id, emitted_at desc);

create or replace function touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger projects_touch_updated_at
before update on projects
for each row execute function touch_updated_at();

create trigger artifacts_touch_updated_at
before update on artifacts
for each row execute function touch_updated_at();
