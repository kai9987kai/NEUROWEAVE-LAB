# Acceptance checklist for v0.4.0

- [x] `index.html` remains directly runnable without a build step or external dependency.
- [x] All v0.1/v0.2 dashboard, architecture, experiment, protocol, run/pause/step/reset, microphone, webcam, session JSON/CSV and model-export workflows remain.
- [x] All 106 v0.2 DOM integration hooks remain and all 19 original mechanism ids remain; five v0.3 switches and seven v0.4 switches are added independently (31 total).
- [x] Predictive coding stores bounded local estimate/error/surprise state.
- [x] STDP maintains finite non-negative pre/post spike traces and bounded signed weights.
- [x] Adaptive routing gains remain inside `[0.62, 1.14]`.
- [x] Hierarchical temporal memory maintains finite fast/medium/slow traces.
- [x] Uncertainty gating only attenuates recurrent propagation within an explicit bounded interval.
- [x] All-off candidate identity control still passes against the same-seed baseline.
- [x] Existing 8-seed replication and 7-topology × 4-seed assay complete.
- [x] New intact/targeted-lesion/random-lesion assay completes 3 conditions × 3 seeds.
- [x] Full neuron, synapse, memory, learning and agent snapshots remain exportable.
- [x] Model schema 1.2.0 validates a fingerprint over the full model payload including sensory and Micro-Collective state.
- [x] Legacy model schemas 1.0.0 and 1.1.0 remain accepted and defaults missing new features to off in its old runtime.
- [x] Tampered schema 1.1/1.2 payloads, inconsistent counts and malformed required numeric states are rejected.
- [x] Read-only model import does not replace or reset the active candidate; rejected imports clear the imported-model selection.
- [x] Standalone HTML compiles and runs inference with uncertainty diagnostics and explicit abstention support.
- [x] Legacy 1.0/1.1 standalone generation remains supported with their original fingerprint rules.
- [x] Standalone HTML escapes imported display metadata and safely encodes embedded JSON.
- [x] `npm test` passes without external npm dependencies.

## Remaining release-quality work

- [ ] Run manual testing on Chromium, Firefox and Safari/WebKit.
- [ ] Confirm GitHub Actions CI results on supported Node versions after publication.
- [ ] Add browser-to-browser deterministic replay tolerance tests.
- [ ] Add parameter/state/compute-matched controls and held-out task families.
- [ ] Validate standalone runner on clean browser sessions and versions.
- [ ] Profile real wall-clock latency and memory on documented hardware; current operation/byte counts are proxies.
- [ ] Consider splitting the single-file UI into modules after an explicit regression-tested migration.


## v0.4.0 expansion gates

- All 24 v0.3 mechanism IDs and the 48-unit default remain intact; seven new feature flags bring the total to 31.
- Unit control permits up to 512 neurons; import remains capped at 4,096 neurons and 250,000 edges.
- Multi-region and dense multi-region topology generators create ten labelled populations and non-zero sensory/association/memory/motor routes.
- Expanded 1200 × 660 ecology contains moving obstacles, replenishing food patches and thermal zones.
- Webcam is permission-gated and local-only; microphone waveform is not recorded; raw media never enters JSON exports.
- Affective and local neuromodulator state remains finite; no claim of subjective emotion is made.
- Micro-Collective training is opt-in, separately checkpointed and then feeds its frozen sensory prediction into the embodied agent as 16 predictive-context channels; it uses bounded replay, held-out validation and rollback.
- WireType-inspired transmitter hypotheses are derived from connectivity features only and remain labelled as unvalidated hypotheses.
- The synthetic variant-search assay compares sparse-code, evolutionary and random search under equal budgets.
- FPGA mapping export preserves source signs and int8 bounds while explicitly marking RTL/bitstream/board verification as not performed.
- Model schema 1.2.0 validates and exports the new state; schema 1.0.0 and 1.1.0 remain import-compatible.
- All-off identity, prior UI hooks, baseline/candidate comparisons, paired replications, lesions, exports and standalone inference remain regression gates.
