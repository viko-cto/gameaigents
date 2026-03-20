# GameAIgents Architecture Step 1 — Open Questions

_Date: 2026-03-20_

These questions are intentionally downstream implementation/architecture questions. None of them reopen the product wedge.

## 1. Queue and worker substrate
What is the best MVP worker/job substrate for compile, recompile, export, and playtest tasks?
- Postgres-backed queue (`pg-boss` / similar)
- hosted job runner (`Inngest`, `Trigger.dev`, etc.)
- hybrid command queue + isolated compile runner

## 2. Compile worker isolation model
How isolated should the Godot compile runner be in the first shipping architecture?
- same deploy environment with guarded worker process
- isolated container per compile run
- heavier ephemeral VM/job isolation for checkpoint safety

## 3. Checkpoint packaging format
What checkpoint format gives the cleanest rollback guarantees without bloating storage too early?
- full zipped project snapshot each meaningful run
- manifest + content-addressed delta packs
- hybrid full snapshot every N runs plus deltas between

## 4. Read-model freshness strategy
How should compile status, compare data, and provenance views stay current in the UI?
- short-interval polling
- server-sent events
- websocket subscriptions only where job status needs it

## 5. Provider registry depth in MVP
What minimum provider metadata belongs in the runtime architecture from day one?
- provider + model + version only
- plus commercial-use / disclosure flags
- plus policy-class and asset-risk metadata

## 6. World Sketch storage boundary
If World Sketch arrives in a later phase, what raw capture should be retained?
- final extracted facts only
- raw video/session capture + extracted facts
- bookmark-based excerpts + extracted facts

## 7. Playtest execution posture
Should the first playtest-guidance pass run fully async, or can it share compile-adjacent execution infrastructure without muddying accountability?
