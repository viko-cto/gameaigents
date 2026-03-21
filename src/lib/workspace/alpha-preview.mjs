export const alphaPreviewProject = {
  id: 'proj_ruins_of_glass',
  name: 'Ruins of Glass',
  engineTarget: 'Godot 4.x',
  lifecycleState: 'compile-ready',
  compileStatus: 'Compile-ready',
  currentCheckpoint: 'Awaiting first scaffold',
  sliceLabel: 'Light action-adventure exploration',
  privacyLabel: 'Private by default',
  lastCompileLabel: 'Compile lane not yet wired',
  revisionLabel: 'brief-v1 approved',
  warnings: [
    'Compile worker remains a stub until the first API + queue slice lands.',
    'UI panels are seeded against Sprint 0 contracts, not live database reads yet.',
  ],
  cards: [
    {
      id: 'proj_ruins_of_glass',
      projectName: 'Ruins of Glass',
      sliceLabel: 'Light action-adventure exploration',
      engineTarget: 'Godot 4.x',
      statusLabel: 'Compile-ready',
      lastActivityAt: 'Today · auth + workspace baseline',
      nextActionLabel: 'Open compile workspace',
      currentCheckpoint: 'Awaiting first scaffold',
    },
    {
      id: 'proj_low_tide_signal',
      projectName: 'Low Tide Signal',
      sliceLabel: 'Narrative traversal prototype',
      engineTarget: 'Godot 4.x',
      statusLabel: 'Draft brief',
      lastActivityAt: 'Seeded alpha preview data',
      nextActionLabel: 'Review brief assumptions',
      currentCheckpoint: 'No checkpoint yet',
    },
  ],
  intake: {
    rawIdea: 'A forgotten glass city where traversal across broken light bridges reveals hidden routes, with one strong movement verb and a single objective chain.',
    constraints: [
      'Engine target fixed to Godot 4.x.',
      'Third-person exploration slice.',
      'Avoid combat-first scope in MVP.',
    ],
  },
  brief: {
    fields: [
      { label: 'Setting', value: 'Ruined crystalline city with shifting light bridges', status: 'confirmed' },
      { label: 'Player role', value: 'Solo explorer restoring traversal paths', status: 'inferred' },
      { label: 'Camera / movement', value: 'Third-person traversal with one momentum mechanic', status: 'confirmed' },
      { label: 'Objective structure', value: 'Restore route → reach signal tower → unlock final path', status: 'confirmed' },
      { label: 'Risk / non-goal', value: 'No combat systems or procedural quest sprawl in Sprint 1', status: 'risk' },
    ],
  },
  compileReadiness: {
    briefApproved: true,
    engineTargetValid: true,
    sliceInScope: true,
    checkpointWillBeCreated: true,
    knownWarnings: [
      'Compile lane is still a stub, so CTA remains presentational for now.',
      'Manifest/checkpoint/provenance contracts exist but are not wired to UI mutations yet.',
    ],
  },
  compare: {
    revisions: [
      { id: 'brief-v1', label: 'Brief v1 approved', createdAt: 'Today', type: 'brief', scope: 'project brief', summary: 'Compile-ready project contract approved.' },
      { id: 'cp_stub', label: 'First compile pending', createdAt: 'Next chunk', type: 'compile', scope: 'scaffold', summary: 'Checkpoint will appear once compile request wiring lands.' },
    ],
    semanticSummary: {
      requestedChange: 'Improve traversal feel without widening scope.',
      willChange: ['Movement config', 'Jump timing constants'],
      willPreserve: ['Project brief', 'Scene shell layout', 'Objective chain'],
      unsupported: ['HUD redesign', 'combat systems'],
      preservationConfidence: 'Blocked until compile output exists',
    },
  },
  provenance: {
    lineage: [
      'Raw intake captured → structured brief v1 approved',
      'Sprint 0 data/runtime spine created canonical manifests, checkpoints, and provenance contracts',
      'Workspace shell now surfaces lineage as a first-class quiet trust zone',
    ],
    exports: ['JSON provenance bundle', 'Markdown summary', 'Disclosure helper'],
  },
};
