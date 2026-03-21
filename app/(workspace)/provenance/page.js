import { PageFrame, TwoColumnCards } from '@/src/components/workspace/workspace-shell.jsx';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';

export default function ProvenancePage() {
  return (
    <PageFrame
      eyebrow="Provenance"
      title="Keep lineage exportable without turning the product into compliance theater"
      description="Provenance stays top-level because trust is part of the wedge, but it remains visually quiet until the creator needs it."
      actions={
        <div className="button-row">
          <button className="secondary-button">Export JSON (later)</button>
          <button className="primary-button">Export markdown (later)</button>
        </div>
      }
    >
      <TwoColumnCards
        left={
          <>
            <p className="eyebrow">Lineage summary</p>
            <h3>Current trust chain</h3>
            <ul className="feature-list">
              {alphaPreviewProject.provenance.lineage.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        }
        right={
          <>
            <p className="eyebrow">Export actions</p>
            <h3>Bounded packaging only</h3>
            <ul className="feature-list">
              {alphaPreviewProject.provenance.exports.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">System-sensitive config stays excluded automatically when these exports become real.</p>
          </>
        }
      />
    </PageFrame>
  );
}
