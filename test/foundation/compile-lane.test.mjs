import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildProjectStoragePaths,
  canTransitionRunStatus,
} from '../../src/lib/domain/gameaigents.mjs';

import {
  createCheckpointRecord,
  createCompileLifecycleEvents,
  createCompileRunDraft,
  createManifestRecord,
  createProvenanceRecord,
  progressCompileRun,
} from '../../src/lib/compile/compile-lane.mjs';

test('compile run lifecycle only allows guarded forward transitions', () => {
  const run = createCompileRunDraft({
    projectId: 'proj_1',
    ownerId: 'owner_1',
  });

  assert.equal(run.status, 'queued');
  assert.equal(canTransitionRunStatus('queued', 'accepted'), true);
  assert.equal(canTransitionRunStatus('queued', 'running'), false);

  const accepted = progressCompileRun(run, 'accepted');
  const running = progressCompileRun(accepted, 'running');
  const promoting = progressCompileRun(running, 'awaiting-artifact-promotion');
  const succeeded = progressCompileRun(promoting, 'succeeded');

  assert.equal(succeeded.status, 'succeeded');
  assert.throws(() => progressCompileRun(succeeded, 'running'), /Invalid run status transition/);
});

test('project storage paths remain private-by-default and project-scoped', () => {
  const paths = buildProjectStoragePaths({
    projectId: 'proj_abc',
    runId: 'run_123',
    checkpointId: 'cp_999',
    exportId: 'exp_456',
  });

  assert.equal(paths.referencesRoot, 'projects/proj_abc/references');
  assert.equal(paths.compileRunsRoot, 'projects/proj_abc/compile-runs/run_123');
  assert.equal(paths.checkpointsRoot, 'projects/proj_abc/checkpoints/cp_999');
  assert.equal(paths.exportsRoot, 'projects/proj_abc/exports/exp_456');
});

test('manifest, checkpoint, provenance, and lifecycle events share one trustworthy run contract', () => {
  const run = createCompileRunDraft({
    projectId: 'proj_1',
    ownerId: 'owner_1',
    lane: 'compile',
    sourceBriefRevisionId: 'brief_2',
    scope: { flagshipSlice: 'light-action-adventure-exploration' },
  });

  const manifest = createManifestRecord({
    projectId: run.projectId,
    ownerId: run.ownerId,
    runId: 'run_1',
    manifest: {
      scenes: ['world/main.tscn'],
      scripts: ['player/controller.gd'],
      warnings: [],
    },
  });

  const checkpoint = createCheckpointRecord({
    projectId: run.projectId,
    ownerId: run.ownerId,
    runId: 'run_1',
    manifestId: 'manifest_1',
    checkpointId: 'cp_1',
    summaryMarkdown: 'Initial compile checkpoint created.',
  });

  const provenance = createProvenanceRecord({
    projectId: run.projectId,
    ownerId: run.ownerId,
    runId: 'run_1',
    manifestId: 'manifest_1',
    checkpointId: checkpoint.id,
    subjectType: 'compile-run',
    subjectId: 'run_1',
    provider: 'internal',
    model: 'deterministic-skeleton',
    metadata: {
      engineTarget: 'godot',
      preservedPrivacyMode: 'private',
    },
  });

  const events = createCompileLifecycleEvents({
    projectId: run.projectId,
    ownerId: run.ownerId,
    runId: 'run_1',
    lane: run.lane,
    checkpointId: checkpoint.id,
  });

  assert.equal(manifest.storageRef, 'projects/proj_1/compile-runs/run_1/manifest.json');
  assert.equal(checkpoint.snapshotRef, 'projects/proj_1/checkpoints/cp_1/snapshot.tar.gz');
  assert.equal(provenance.provenanceClass, 'compile');
  assert.equal(events.length, 4);
  assert.deepEqual(
    events.map((event) => event.eventType),
    [
      'compile.requested',
      'compile.manifest-finalized',
      'compile.checkpoint-created',
      'compile.provenance-recorded',
    ],
  );
});
