export const WORKSPACE_ROUTES = [
  { key: 'projects', label: 'Projects', href: '/projects', description: 'Resume current projects and trust-critical status.' },
  { key: 'intake', label: 'Intake', href: '/intake', description: 'Capture raw creator intent without flattening it.' },
  { key: 'brief', label: 'Brief', href: '/brief', description: 'Separate confirmed truth from inference and risk.' },
  { key: 'compile', label: 'Compile', href: '/compile', description: 'Gate the first scaffold behind explicit readiness.' },
  { key: 'compare', label: 'Compare', href: '/compare', description: 'Bound changes with timeline and blast-radius context.' },
  { key: 'provenance', label: 'Provenance', href: '/provenance', description: 'Keep lineage exportable and quiet by default.' },
];

const RESUME_BY_LIFECYCLE = {
  new: '/intake',
  'intake-draft': '/brief',
  'brief-draft': '/brief',
  'brief-approved': '/compile',
  'compile-ready': '/compile',
  compiling: '/compile',
  compiled: '/compare',
  'recompile-ready': '/compare',
  recompiling: '/compare',
  'compiled-updated': '/provenance',
};

export function resolveResumeHref(project) {
  return RESUME_BY_LIFECYCLE[project?.lifecycleState] ?? '/projects';
}

export function getWorkspaceTopbar(project) {
  return {
    projectName: project?.name ?? 'No project selected',
    engineTarget: project?.engineTarget ?? 'Godot 4.x',
    currentCheckpoint: project?.currentCheckpoint ?? 'Awaiting first compile',
    compileStatus: project?.compileStatus ?? 'Draft',
  };
}

export function getWorkspaceMetaRail(project) {
  return [
    { label: 'Privacy', value: project?.privacyLabel ?? 'Private by default' },
    { label: 'Slice tag', value: project?.sliceLabel ?? 'Light action-adventure exploration' },
    { label: 'Last compile', value: project?.lastCompileLabel ?? 'No compile yet' },
    { label: 'Revision', value: project?.revisionLabel ?? 'brief-v1 draft' },
    { label: 'Warnings', value: project?.warnings?.length ? `${project.warnings.length} active` : 'None' },
  ];
}

export function getRouteByHref(href) {
  return WORKSPACE_ROUTES.find((route) => route.href === href) ?? WORKSPACE_ROUTES[0];
}
