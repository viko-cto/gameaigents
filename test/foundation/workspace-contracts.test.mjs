import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getRouteByHref,
  getWorkspaceMetaRail,
  getWorkspaceTopbar,
  resolveResumeHref,
  WORKSPACE_ROUTES,
} from '../../src/lib/workspace/contracts.mjs';

test('workspace routes stay aligned with Sprint 0 shell priorities', () => {
  assert.deepEqual(
    WORKSPACE_ROUTES.map((route) => route.label),
    ['Projects', 'Intake', 'Brief', 'Compile', 'Compare', 'Provenance'],
  );
});

test('resume href follows lifecycle state instead of vanity defaults', () => {
  assert.equal(resolveResumeHref({ lifecycleState: 'new' }), '/intake');
  assert.equal(resolveResumeHref({ lifecycleState: 'brief-approved' }), '/compile');
  assert.equal(resolveResumeHref({ lifecycleState: 'compiled' }), '/compare');
  assert.equal(resolveResumeHref({ lifecycleState: 'compiled-updated' }), '/provenance');
});

test('topbar and meta rail expose trust-critical shell context', () => {
  const project = {
    name: 'Ruins of Glass',
    engineTarget: 'Godot 4.x',
    currentCheckpoint: 'cp_0002',
    compileStatus: 'Compiled',
    privacyLabel: 'Private by default',
    sliceLabel: 'Traversal slice',
    lastCompileLabel: '2h ago',
    revisionLabel: 'brief-v2 approved',
    warnings: ['One thin placeholder'],
  };

  assert.deepEqual(getWorkspaceTopbar(project), {
    projectName: 'Ruins of Glass',
    engineTarget: 'Godot 4.x',
    currentCheckpoint: 'cp_0002',
    compileStatus: 'Compiled',
  });
  assert.deepEqual(getWorkspaceMetaRail(project), [
    { label: 'Privacy', value: 'Private by default' },
    { label: 'Slice tag', value: 'Traversal slice' },
    { label: 'Last compile', value: '2h ago' },
    { label: 'Revision', value: 'brief-v2 approved' },
    { label: 'Warnings', value: '1 active' },
  ]);
  assert.equal(getRouteByHref('/compile').label, 'Compile');
});
