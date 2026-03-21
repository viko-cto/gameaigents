import { PageFrame, StatusBadge, TwoColumnCards } from '@/src/components/workspace/workspace-shell.jsx';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';
import { resolveResumeHref } from '@/src/lib/workspace/contracts.mjs';

export default function ProjectsPage() {
  return (
    <PageFrame
      eyebrow="Projects"
      title="Resume durable creator work"
      description="The dashboard foregrounds project state, next action, and trust posture instead of vanity generation counts."
      actions={<button className="primary-button">New project (next chunk)</button>}
    >
      <div className="filter-row">
        <StatusBadge tone="active">All</StatusBadge>
        <StatusBadge>Draft brief</StatusBadge>
        <StatusBadge>Ready to compile</StatusBadge>
        <StatusBadge>Compiled</StatusBadge>
        <StatusBadge>Needs review</StatusBadge>
      </div>

      <div className="project-grid">
        {alphaPreviewProject.cards.map((card) => (
          <article className="surface-card project-card" key={card.id}>
            <div>
              <p className="eyebrow">{card.sliceLabel}</p>
              <h3>{card.projectName}</h3>
              <p className="muted">{card.engineTarget}</p>
            </div>
            <div className="project-card-meta">
              <StatusBadge tone={card.statusLabel === 'Compile-ready' ? 'success' : 'neutral'}>{card.statusLabel}</StatusBadge>
              <p>{card.lastActivityAt}</p>
              <p>Next: {card.nextActionLabel}</p>
              <p>Checkpoint: {card.currentCheckpoint}</p>
            </div>
            <a className="inline-link" href={card.id === alphaPreviewProject.id ? resolveResumeHref(alphaPreviewProject) : '/brief'}>
              Resume
            </a>
          </article>
        ))}
      </div>

      <TwoColumnCards
        left={
          <>
            <p className="eyebrow">What this chunk unlocks</p>
            <h3>Real workspace routing</h3>
            <ul className="feature-list">
              <li>Protected alpha routes for Projects, Intake, Brief, Compile, Compare, and Provenance</li>
              <li>Stable left-nav shell and top-bar identity state</li>
              <li>Quiet meta rail for privacy, revision, and warning context</li>
            </ul>
          </>
        }
        right={
          <>
            <p className="eyebrow">Still queued inside Sprint 0</p>
            <h3>Next repo move</h3>
            <ul className="feature-list">
              <li>Wire project creation to the canonical Postgres schema</li>
              <li>Persist intake and brief revisions through authenticated API routes</li>
              <li>Turn compile CTA into a real enqueue action</li>
            </ul>
          </>
        }
      />
    </PageFrame>
  );
}
