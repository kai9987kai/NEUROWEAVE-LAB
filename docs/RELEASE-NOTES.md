# NEUROWEAVE LAB 0.4.0 release notes

## Added

- Selectable connectome population from 24 to 512 neurons; the original 48-neuron default is retained.
- Ten named synthetic populations and multi-region / dense multi-region graph generators.
- A 1200 × 660 embodied ecology with ten moving obstacles, eighteen replenishing food patches and three thermal zones.
- Sixteen sensory features, optional permission-gated webcam and microphone processing, and no raw media persistence.
- Six neuromodulator-like signals, per-unit receptor profiles and local modulation traces, with affect-state control proxies.
- WireType-inspired connectivity-only transmitter hypotheses with per-neuron confidence.
- A four-expert Micro-Collective with opt-in live self-supervised learning, top-2 routing, replay, validation and rollback; its predicted sensory state can augment the embodied agent input.
- A synthetic sparse sequence-search benchmark with sparse-code, evolutionary and random-search controls at equal budgets.
- A signed-int8 FPGA mapping manifest with tile scheduling, rough resource estimates and explicit verification boundaries.
- Model schema 1.2.0 and a frozen standalone Micro-Collective predictor.

## Preserved

- All 24 v0.3 mechanisms and all 19 original mechanism IDs.
- Original 48-neuron default, baseline/candidate comparison, all-off identity path, existing task set, session JSON/CSV exports, model JSON import/export, standalone inference, topology and lesion assays, and original UI integration hooks.
- Import compatibility for model schemas 1.0.0 and 1.1.0.

## Automated verification

`npm test` passes with no external npm dependencies. The smoke suite checks the legacy DOM/feature compatibility manifest, all-off identity, eight-seed replication, seven topology conditions, lesion assay, live Micro-Collective training and agent integration, finite neuromodulator/transmitter state, sequence-search controls, 512-neuron configuration, model schema 1.2 integrity, schema 1.0/1.1 imports, FPGA mapping constraints and standalone inference.

## Known limitations

- Webcam and microphone capture have not been manually validated across Chromium, Firefox and Safari/WebKit in this environment. Browser permission and HTTPS/localhost requirements apply.
- Sensory visual/audio features are engineered low-dimensional descriptors, not calibrated biological photoreceptor or auditory-neuron transduction.
- The connectome and region labels are synthetic; no real FlyWire, hemibrain or MaleCNS data is bundled.
- Transmitter hypotheses are heuristic and connectivity-derived; they are not trained WireType predictions or ground-truth neurotransmitter labels.
- The Micro-Collective is a small new model, not the Supermix language model; its training is self-supervised sensor prediction, not language generation.
- The protein-inspired assay uses synthetic sequence landscapes and does not model protein folding or ProteinGym.
- FPGA export is a mapping manifest only. No RTL, UVM verification, synthesis, bitstream or board execution is produced.
- The standalone HTML accepts manual input and runs frozen inference; it does not access live camera/microphone devices or continue online learning.
