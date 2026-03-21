import { PageFrame, TwoColumnCards } from '@/src/components/workspace/workspace-shell.jsx';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';

export default function IntakePage() {
  return (
    <PageFrame
      eyebrow="Intake"
      title="Capture raw creator intent without flattening it"
      description="Sprint 0 keeps the intake workspace deliberately narrow: preserve messy input, constrain the opening scope, and make the raw truth visible."
      actions={<button className="primary-button">Generate brief draft (API next)</button>}
    >
      <TwoColumnCards
        left={
          <>
            <p className="eyebrow">Raw idea</p>
            <h3>Verbatim creator input</h3>
            <p className="rich-block">{alphaPreviewProject.intake.rawIdea}</p>
            <p className="muted">Uploads and references will attach through project-scoped storage refs in the next chunk.</p>
          </>
        }
        right={
          <>
            <p className="eyebrow">Constraints</p>
            <h3>Explicit scope boundaries</h3>
            <ul className="feature-list">
              {alphaPreviewProject.intake.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
            <p className="muted">The CTA stays honest: the UI is ready, but persistence wiring is still pending.</p>
          </>
        }
      />
    </PageFrame>
  );
}
