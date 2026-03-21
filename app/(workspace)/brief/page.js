import { PageFrame, StatusBadge, TwoColumnCards } from '@/src/components/workspace/workspace-shell.jsx';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';

const TONE_BY_STATUS = {
  confirmed: 'success',
  inferred: 'warning',
  risk: 'danger',
};

export default function BriefPage() {
  return (
    <PageFrame
      eyebrow="Brief"
      title="Separate creator-confirmed truth from system inference"
      description="The brief editor is the handoff point between messy intake and compile-safe project truth. Approval stays explicit and immutable."
      actions={
        <div className="button-row">
          <button className="secondary-button">Save draft (next)</button>
          <button className="primary-button">Approve for compile (next)</button>
        </div>
      }
    >
      <TwoColumnCards
        left={
          <>
            <p className="eyebrow">Structured brief</p>
            <h3>Field-level certainty survives into compile</h3>
            <div className="detail-stack">
              {alphaPreviewProject.brief.fields.map((field) => (
                <div className="detail-row" key={field.label}>
                  <div>
                    <strong>{field.label}</strong>
                    <p className="muted">{field.value}</p>
                  </div>
                  <StatusBadge tone={TONE_BY_STATUS[field.status]}>{field.status}</StatusBadge>
                </div>
              ))}
            </div>
          </>
        }
        right={
          <>
            <p className="eyebrow">Raw input rail</p>
            <h3>Original phrasing stays inspectable</h3>
            <p className="rich-block">{alphaPreviewProject.intake.rawIdea}</p>
            <div className="callout warning">
              <strong>Trust rule</strong>
              <p>Compile remains locked until an approved brief revision exists in canonical project truth.</p>
            </div>
          </>
        }
      />
    </PageFrame>
  );
}
