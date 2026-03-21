import {
  assertKnownRunLane,
  buildProjectStoragePaths,
  createDomainEvent,
  transitionRunStatus,
} from '../domain/gameaigents.mjs';

export function createCompileRunDraft({
  projectId,
  ownerId,
  lane = 'compile',
  sourceBriefRevisionId = null,
  baseCheckpointId = null,
  scope = {},
  policySummary = {},
  workerVersion = 'sprint-0-skeleton',
}) {
  if (!projectId) throw new Error('projectId is required');
  if (!ownerId) throw new Error('ownerId is required');

  assertKnownRunLane(lane);

  return {
    projectId,
    ownerId,
    lane,
    status: 'queued',
    requestedBy: 'owner',
    sourceBriefRevisionId,
    baseCheckpointId,
    scope,
    policySummary,
    workerVersion,
    createdAt: new Date().toISOString(),
  };
}

export function progressCompileRun(run, nextStatus) {
  return {
    ...run,
    status: transitionRunStatus(run.status, nextStatus),
    updatedAt: new Date().toISOString(),
  };
}

export function createManifestRecord({ projectId, ownerId, runId, engineTarget = 'godot', manifest }) {
  if (!manifest || typeof manifest !== 'object') {
    throw new Error('manifest object is required');
  }

  const storage = buildProjectStoragePaths({ projectId, runId });

  return {
    projectId,
    ownerId,
    runId,
    engineTarget,
    storageRef: `${storage.compileRunsRoot}/manifest.json`,
    manifest,
    createdAt: new Date().toISOString(),
  };
}

export function createCheckpointRecord({
  projectId,
  ownerId,
  runId,
  manifestId,
  checkpointId,
  checkpointType = 'compile',
  summaryMarkdown,
}) {
  if (!checkpointId) throw new Error('checkpointId is required');

  const storage = buildProjectStoragePaths({ projectId, checkpointId });

  return {
    id: checkpointId,
    projectId,
    ownerId,
    sourceRunId: runId,
    manifestId,
    checkpointType,
    snapshotRef: `${storage.checkpointsRoot}/snapshot.tar.gz`,
    summaryMarkdown,
    createdAt: new Date().toISOString(),
  };
}

export function createProvenanceRecord({
  projectId,
  ownerId,
  runId,
  manifestId,
  checkpointId,
  subjectType,
  subjectId = null,
  provenanceClass = 'compile',
  provider = null,
  model = null,
  promptRef = null,
  metadata = {},
}) {
  if (!subjectType) throw new Error('subjectType is required');

  return {
    projectId,
    ownerId,
    runId,
    manifestId,
    checkpointId,
    subjectType,
    subjectId,
    provenanceClass,
    provider,
    model,
    promptRef,
    metadata,
    createdAt: new Date().toISOString(),
  };
}

export function createCompileLifecycleEvents({ projectId, ownerId, runId, lane, checkpointId = null }) {
  return [
    createDomainEvent({
      projectId,
      ownerId,
      runId,
      eventType: `${lane}.requested`,
      payload: { checkpointId },
    }),
    createDomainEvent({
      projectId,
      ownerId,
      runId,
      eventType: `${lane}.manifest-finalized`,
      payload: { checkpointId },
    }),
    createDomainEvent({
      projectId,
      ownerId,
      runId,
      eventType: `${lane}.checkpoint-created`,
      payload: { checkpointId },
    }),
    createDomainEvent({
      projectId,
      ownerId,
      runId,
      eventType: `${lane}.provenance-recorded`,
      payload: { checkpointId },
    }),
  ];
}
