export const PROJECT_LIFECYCLE = [
  'new',
  'intake-draft',
  'brief-draft',
  'brief-approved',
  'compile-ready',
  'compiling',
  'compiled',
  'recompile-ready',
  'recompiling',
  'compiled-updated',
];

export const RUN_LANES = [
  'compile',
  'recompile',
  'export-provenance',
  'playtest-guidance',
];

export const RUN_STATUS = [
  'queued',
  'accepted',
  'running',
  'awaiting-artifact-promotion',
  'succeeded',
  'failed-retryable',
  'failed-terminal',
  'cancelled',
  'expired',
];

export const ALLOWED_RUN_TRANSITIONS = {
  queued: ['accepted', 'cancelled', 'expired'],
  accepted: ['running', 'cancelled', 'expired'],
  running: ['awaiting-artifact-promotion', 'failed-retryable', 'failed-terminal', 'cancelled'],
  'awaiting-artifact-promotion': ['succeeded', 'failed-retryable', 'failed-terminal'],
  succeeded: [],
  'failed-retryable': ['queued', 'cancelled', 'expired'],
  'failed-terminal': [],
  cancelled: [],
  expired: [],
};

export function assertKnownRunLane(lane) {
  if (!RUN_LANES.includes(lane)) {
    throw new Error(`Unknown run lane: ${lane}`);
  }

  return lane;
}

export function assertKnownRunStatus(status) {
  if (!RUN_STATUS.includes(status)) {
    throw new Error(`Unknown run status: ${status}`);
  }

  return status;
}

export function canTransitionRunStatus(fromStatus, toStatus) {
  assertKnownRunStatus(fromStatus);
  assertKnownRunStatus(toStatus);
  return ALLOWED_RUN_TRANSITIONS[fromStatus].includes(toStatus);
}

export function transitionRunStatus(fromStatus, toStatus) {
  if (!canTransitionRunStatus(fromStatus, toStatus)) {
    throw new Error(`Invalid run status transition: ${fromStatus} -> ${toStatus}`);
  }

  return toStatus;
}

export function buildProjectStoragePaths({ projectId, runId, checkpointId, exportId }) {
  if (!projectId) {
    throw new Error('projectId is required');
  }

  return {
    referencesRoot: `projects/${projectId}/references`,
    compileRunsRoot: runId ? `projects/${projectId}/compile-runs/${runId}` : `projects/${projectId}/compile-runs`,
    checkpointsRoot: checkpointId ? `projects/${projectId}/checkpoints/${checkpointId}` : `projects/${projectId}/checkpoints`,
    exportsRoot: exportId ? `projects/${projectId}/exports/${exportId}` : `projects/${projectId}/exports`,
  };
}

export function createDomainEvent({ projectId, ownerId, runId = null, eventType, payload = {} }) {
  if (!projectId) throw new Error('projectId is required');
  if (!ownerId) throw new Error('ownerId is required');
  if (!eventType) throw new Error('eventType is required');

  return {
    projectId,
    ownerId,
    runId,
    eventType,
    payload,
    emittedAt: new Date().toISOString(),
  };
}
