## 0.4.0 — Multimodal connectome, affective modulation and live Micro-Collective

- Preserved all 24 v0.3 mechanisms, the 48-neuron default, existing baseline/candidate workflow, original topology choices, all prior views, microphone amplitude path, paired replication, lesion analysis, model import/export and standalone runner.
- Raised the selectable network ceiling to 512 neurons and added ten region identities plus multi-region and dense multi-region graph generators.
- Expanded the embodied ecology to a 1200 × 660 arena with ten moving obstacles, eighteen replenishing food patches and three thermal zones.
- Added sixteen multimodal sensory channels and opt-in webcam processing. The camera is sampled locally into low-dimensional features; raw frames are not saved or transmitted. Microphone FFT bands are extracted locally; raw audio is not recorded.
- Added seven feature flags, taking the total from 24 to 31: multimodal sensory integration, affective signals, Micro-Collective, balanced expert routing, meta-learning, predictive replay and heuristic WireType-inspired connectivity-only transmitter inference.
- Added distinct neuromodulator-like fields, per-unit receptor profiles, local modulatory traces and valence/arousal/curiosity/stress/motivation proxies. A connectivity-only transmitter hypothesis layer reports six candidate transmitter classes and confidence without relabelling the known excitatory/inhibitory sign.
- Added the opt-in four-expert top-2 Micro-Collective predictor with self-supervised sensor-transition training, novelty-prioritised replay, held-out validation and rollback. No Supermix weights or external datasets are bundled.
- Upgraded model packages to schema 1.2.0 with affect, region/receptor/local-modulator state, sensory manifest and Micro-Collective checkpoint. Legacy 1.0.0 and 1.1.0 import remains supported.
- Added a WireType-inspired connectivity-only transmitter hypothesis layer; inferred labels remain hypotheses and never overwrite measured/synthetic source-sign identity.
- Added a budget-matched synthetic sequence-variant search assay comparing sparse-code guidance, evolutionary search and random search over ten landscapes and eight seeds; it does not model real protein folding.
- Added a systolic-array-inspired FPGA mapping manifest export with signed-int8 weights, tile schedule, resource estimates and explicit unverified hardware status.
- Expanded topology comparisons to seven conditions and added finite-state, export and compatibility regression checks.

## 0.3.0 — Predictive dynamics, temporal memory and intervention analysis


- Preserved the 0.2.0 application, all 19 prior mechanism switches, baseline/candidate workflow, simulation controls, paired-seed replication, topology assay, embodied agent, microphone amplitude input and session/model exports.
- Added five independent mechanisms: local predictive coding with bounded prediction-error/surprise traces; pair-based STDP with pre/post spike traces; context-adaptive synaptic routing with bounded gain; hierarchical fast/medium/slow temporal memory; and uncertainty-gated propagation.
- Extended neuron and synapse model state, inspector diagnostics, live metrics, model JSON and standalone inference to include the new state.
- Added a matched lesion robustness assay with intact, targeted high-in-degree lesion and random matched lesion conditions across three seeds per condition.
- Added read-only model JSON import, structural and finite-state validation, full-payload FNV-1a fingerprint verification for schema 1.1.0, compatibility with legacy schema 1.0.0, and standalone export of imported snapshots.
- Added uncertainty-aware standalone output with a review/abstain path while retaining raw probability; the score is explicitly heuristic and not calibrated confidence.
- Expanded regression checks for 24 mechanisms, all-off identity, numeric invariants, STDP traces, routing bounds, lesion assay, export/import compatibility, tamper detection and standalone inference.

## 0.2.0 — Full-compartment research expansion

- Preserved the v0.1 dashboard, architecture, experiments and protocol views, run/pause/step/reset controls, topology/unit/task/seed/speed controls, all eight original mechanism switches, microphone input, baseline/candidate comparison, paired replication and session JSON/CSV export.
- Expanded synthetic neurons with four dendritic compartments, multi-soma states, membrane/spike/refractory dynamics, calcium, axon hillock and branch states, terminal release, astrocyte-like regulation, homeostatic gain, myelin proxy, utility and consolidation traces.
- Added eleven independent mechanisms: connectivity attention, FlyHash projection, neuromodulator field, structural plasticity, sleep-like consolidation, predictive ensemble, adaptive conduction, quantised synapses, axonal branches, universal fast-weight memory and an action-grounded efference self-model.
- Added additional graph topologies and valid degree-preserving double-edge swaps.
- Added Neuron Studio, full state inspector, neuromodulatory field readout and 5-topology × 4-seed assay.
- Added versioned model JSON package (predictor plus embodied-agent snapshot) and standalone HTML inference runner with validation.
- Added tests for topology invariants, synaptic bounds, Dale-style sign constraint, finite state, bounded memory/delays, structural and sleep events, package validation and standalone inference execution.

## 0.1.0 — Initial research prototype

- Added an offline, single-file browser research interface.
- Added matched baseline/candidate recurrent synthetic networks.
- Added multi-soma state channels, structural fingerprints, sparse coding, associative trace memory, reward-gated plasticity, delay buffers and homeostatic gain control.
- Added tiled software execution path with operation and memory proxies.
- Added synthetic embodied world with sensor stream and optional live microphone amplitude input.
- Added prequential temporal tasks, paired multi-seed replication, session JSON and CSV export.
- Added research limitations and protocol documentation.
