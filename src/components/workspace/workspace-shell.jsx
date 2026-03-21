'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  getRouteByHref,
  getWorkspaceMetaRail,
  getWorkspaceTopbar,
  resolveResumeHref,
  WORKSPACE_ROUTES,
} from '@/src/lib/workspace/contracts.mjs';

function NavItem({ route, activePath }) {
  const isActive = activePath === route.href;

  return (
    <Link className={`shell-nav-item ${isActive ? 'active' : ''}`} href={route.href}>
      <span>{route.label}</span>
      <small>{route.description}</small>
    </Link>
  );
}

function MetaRail({ project }) {
  const metaItems = getWorkspaceMetaRail(project);

  return (
    <aside className="shell-meta-rail">
      <h2>Project meta</h2>
      <div className="meta-stack">
        {metaItems.map((item) => (
          <div className="meta-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="meta-card meta-warning-card">
        <span>Next recommended move</span>
        <strong>{resolveResumeHref(project)}</strong>
      </div>
      {project?.warnings?.length ? (
        <div className="meta-list-card">
          <span>Warnings</span>
          <ul>
            {project.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

export function WorkspaceShell({ project, sessionLabel, children }) {
  const pathname = usePathname();
  const topbar = getWorkspaceTopbar(project);
  const activeRoute = getRouteByHref(pathname);

  return (
    <div className="workspace-shell">
      <header className="shell-topbar">
        <div>
          <p className="eyebrow">GameAIgents alpha workspace</p>
          <h1>{topbar.projectName}</h1>
          <p className="muted">{activeRoute.label} · human-led, exportable, traceable</p>
        </div>
        <div className="topbar-pills">
          <span>{topbar.engineTarget}</span>
          <span>{topbar.currentCheckpoint}</span>
          <span>{topbar.compileStatus}</span>
          <span>{sessionLabel}</span>
        </div>
      </header>

      <div className="shell-grid">
        <aside className="shell-nav">
          <div className="shell-nav-header">
            <p className="eyebrow">Workspace</p>
            <strong>Core routes</strong>
          </div>
          <nav>
            {WORKSPACE_ROUTES.map((route) => (
              <NavItem activePath={pathname} key={route.key} route={route} />
            ))}
          </nav>
        </aside>

        <main className="shell-main">{children}</main>

        <MetaRail project={project} />
      </div>
    </div>
  );
}

export function PageFrame({ eyebrow, title, description, actions, children }) {
  return (
    <section className="page-frame">
      <div className="page-frame-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="muted page-description">{description}</p>
        </div>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({ tone = 'neutral', children }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}

export function TwoColumnCards({ left, right }) {
  return (
    <div className="two-column-cards">
      <div className="surface-card">{left}</div>
      <div className="surface-card">{right}</div>
    </div>
  );
}
