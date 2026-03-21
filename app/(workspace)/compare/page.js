import { PageFrame, StatusBadge, TwoColumnCards } from '@/src/components/workspace/workspace-shell.jsx';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';

export default function ComparePage() {
  return (
    <PageFrame
      eyebrow="Compare"
      title="Make bounded change requests legible before any recompile runs"
      description="The compare workspace leads with semantic scope and blast-radius framing, even before raw diffs exist."
      actions={
        <div className="button-row">
          <button className="secondary-button">Rollback (later)</button>
          <button className="primary-button">Run recompile (later)</button>
        </div>
      }
    >
      <TwoColumnCards
        left={
          <>
            <p className="eyebrow">Revision timeline</p>
            <h3>Checkpoint history</h3>
            <div className="timeline-list">
              {alphaPreviewProject.compare.revisions.map((revision) => (
                <div className="timeline-item" key={revision.id}>
                  <div>
                    <strong>{revision.label}</strong>
                    <p className="muted">{revision.summary}</p>
                  </div>
                  <StatusBadge>{revision.scope}</StatusBadge>
                </div>
              ))}
            </div>
          </>
        }
        right={
          <>
            <p className="eyebrow">Semantic compare summary</p>
            <h3>{alphaPreviewProject.compare.semanticSummary.requestedChange}</h3>
            <div className="compare-columns">
              <div>
                <strong>Will change</strong>
                <ul className="feature-list">
                  {alphaPreviewProject.compare.semanticSummary.willChange.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Will preserve</strong>
                <ul className="feature-list">
                  {alphaPreviewProject.compare.semanticSummary.willPreserve.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="callout danger">
              <strong>Unsupported right now</strong>
              <p>{alphaPreviewProject.compare.semanticSummary.unsupported.join(' · ')}</p>
              <p className="muted">Preservation confidence: {alphaPreviewProject.compare.semanticSummary.preservationConfidence}</p>
            </div>
          </>
        }
      />
    </PageFrame>
  );
}
