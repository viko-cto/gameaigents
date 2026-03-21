import { WorkspaceShell } from '@/src/components/workspace/workspace-shell.jsx';
import { getAlphaSession } from '@/src/lib/auth/server.js';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';

export default async function WorkspaceLayout({ children }) {
  const session = await getAlphaSession();
  const sessionLabel = session.user?.email ?? 'Authenticated alpha';

  return (
    <WorkspaceShell project={alphaPreviewProject} sessionLabel={sessionLabel}>
      {children}
    </WorkspaceShell>
  );
}
