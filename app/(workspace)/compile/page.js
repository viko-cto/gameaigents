import { PageFrame, StatusBadge, TwoColumnCards } from '@/src/components/workspace/workspace-shell.jsx';
import { alphaPreviewProject } from '@/src/lib/workspace/alpha-preview.mjs';

function ReadinessRow({ label, ready }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <StatusBadge tone={ready ? 'success' : 'danger'}>{ready ? 'Ready' : 'Blocked'}</StatusBadge>
    </div>
  );
}

export default function CompilePage() {
  const readiness = alphaPreviewProject.compileReadiness;

  return (
    <PageFrame
      eyebrow="Compile"
      title="Gate the first editable scaffold behind explicit readiness"
      description="The compile workspace now has a real home in the product shell, matched to the manifest/checkpoint/provenance contracts already landed in Sprint 0."
      actions={<button className="primary-button">Compile editable scaffold (API next)</button>}
    >
      <TwoColumnCards
        left={
          <>
            <p className="eyebrow">Approved brief summary</p>
            <h3>Flagship slice</h3>
            <ul className="feature-list">
              <li>Slice: {alphaPreviewProject.sliceLabel}</li>
              <li>Engine: {alphaPreviewProject.engineTarget}</li>
              <li>Core loop: explore → interact → restore route</li>
            </ul>
          </>
        }
        right={
          <>
            <p className="eyebrow">Compile readiness</p>
            <h3>Trust-critical checklist</h3>
            <ReadinessRow label="Brief approved" ready={readiness.briefApproved} />
            <ReadinessRow label="Engine target in scope" ready={readiness.engineTargetValid} />
            <ReadinessRow label="Slice remains in MVP scope" ready={readiness.sliceInScope} />
            <ReadinessRow label="Checkpoint will be created" ready={readiness.checkpointWillBeCreated} />
          </>
        }
      />

      <div className="surface-card">
        <p className="eyebrow">Expected outputs</p>
        <h3>What the first scaffold should produce</h3>
        <ul className="feature-list">
          <li>Scene shell</li>
          <li>Player controller shell</li>
          <li>Interaction / objective shell</li>
          <li>Configuration layer</li>
          <li>Simple HUD shell</li>
        </ul>
      </div>

      <div className="surface-card">
        <p className="eyebrow">Warnings</p>
        <ul className="feature-list">
          {readiness.knownWarnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </div>
    </PageFrame>
  );
}
