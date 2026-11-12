# NEUROWEAVE LAB 0.4.0 — Architecture

## System overview

NEUROWEAVE is a standalone browser workbench. The reference runtime currently lives in `index.html` so that the project remains directly runnable offline. Its system is partitioned logically, with explicit feature flags and export boundaries.

## Runtime layers

1. **Stimulus layer** — seeded temporal tasks plus sixteen bounded sensory channels, optional local webcam feature extraction and microphone spectral bands.
2. **Connectome layer** — directed signed graph, ten region identities, connectivity-only transmitter hypotheses inspired by WireType, deterministic topology generators (including multi-region and dense multi-region), edge delay lines and adjacency indices.
3. **Structural representation layer** — degree/strength/reciprocity/two-hop/motif/delay/myelin/activity fingerprints.
4. **Context encoder layer** — attention-weighted aggregation of up to eight strongest incoming neighbours plus a fixed FlyHash-inspired random projection.
5. **Neuron layer** — dendritic compartments, six coupled soma-state channels, membrane/spike process, calcium, axon branches and terminal release.
6. **Modulation layer** — DA/5-HT/OA/ACh/NE/endocannabinoid-like fields, per-unit receptor profiles, local neuromodulator traces, connectivity-only transmitter hypotheses, affect-state proxies, astrocyte-like reservoir and homeostatic gain.
7. **Learning layer** — sparse k-winners mask, associative episode retrieval, reward-gated eligibility traces, bounded synaptic updates, an 8 × 8 fast-weight association matrix, structural pruning/regrowth and sleep-like consolidation.
8. **Predictive/control layer** — three-member scalar prediction ensemble, disagreement proxy, expanded 1200 × 660 ecology, reactive agent controller, short-horizon local heading search and action-grounded efference/self-model diagnostics.
9. **Micro-Collective layer** — optional four-expert top-2 sensor-transition predictor with online self-supervised training, bounded replay, novelty prioritisation, held-out validation and rollback. This is a fresh small model, not a Supermix checkpoint.
10. **Execution layer** — tile-grouped edge traversal, synchronous previous/next state buffers, optional quantisation and operation/byte estimates.
11. **Evaluation layer** — fixed matched baseline, candidate readout, prequential scoring, paired multi-seed replication, multi-topology and lesion assays, and budget-matched sparse sequence-search controls.
12. **Intervention layer** — matched intact, targeted high-degree lesion and random-lesion conditions across three paired seeds.
13. **Export layer** — schema-validated model JSON 1.2.0, standalone frozen inference, and a separate signed-int8 systolic-array-inspired FPGA mapping manifest, legacy 1.0.0/1.1.0 import, read-only import verification, dependency-free frozen standalone HTML inference page, separate session JSON/CSV exports.

## Neuron state model

A synthetic unit maintains:

- `dendrites`: proximal, distal, apical and basal branch states.
- `fast`, `slow`, `context`: three distinct soma-state channels retained from v0.1.
- `soma.integrator`, `soma.burst`, `soma.gating`: three additional coupled soma-state channels.
- Total: six interacting soma-state channels distributed across one synthetic multi-compartment unit; these are state compartments, not six separate biological neurons.
- `membrane`, `threshold`, `refractory`, `spike`: event-like membrane dynamics.
- `calcium`, `adaptation`, `trace`: slower intracellular/temporal state variables.
- `axon.hillock`, `axon.branchA`, `axon.branchB`, `axon.terminal`, `axon.release`: output tree and terminal proxy.
- `astrocyte`, `homeo`, `myelin`, `utility`, `consolidation`: local regulation and structural/learning state.
- `predictive.estimate`, `predictive.error`, `predictive.surprise`: local state prediction and bounded residual/surprise.
- `temporalMemory.fast`, `temporalMemory.mid`, `temporalMemory.slow`: distinct memory traces with different decay constants.

When trained and enabled, Micro-Collective predictions are appended to the embodied controller as sixteen predictive-context channels. The feature flags selectively activate these mechanisms. The v0.4 affect state is a computational appraisal/control vector, not evidence of subjective feeling or a biologically complete emotional circuit. The all-off path retains the prior v0.1 baseline update equations, allowing an identity test against a same-seed baseline.

## Synapse state model

Each directed synapse stores:

- `src`, `dst`: source and destination unit indices.
- `w`: signed connection weight.
- `delay`: one to three discrete update steps.
- `trace`, `eligibility`: local pre/post activity traces.
- `utility`: contribution proxy used by structural plasticity.
- `preSpikeTrace`, `postSpikeTrace`: exponentially decayed spike-event traces used by pair-based STDP.
- `routingGain`: latest bounded destination-context transmission gain.
- `myelin`, `lastSignal`: conduction state and last delivered signal.

Reward-gated eligibility updates and pair-based STDP clamp magnitudes to a bounded interval and preserve the source neuron's excitatory/inhibitory sign. Quantised mode maps magnitudes to an INT8-like 127-level grid. Adaptive routing multiplies the delivered signal by a bounded target-state gain; uncertainty gating applies a second bounded attenuation based on the previous ensemble disagreement.

## Graph controls

- Clustered small-world and ring lattice provide local recurrent structure.
- Hub-skewed creates a concentrated in-degree profile.
- Hub-capped limits initial destination fan-in.
- Erdős–Rényi samples directed edges with a fixed connection probability.
- Degree-shuffled begins with the same seeded clustered graph and performs valid double-edge swaps. Each accepted swap `(a→b, c→d)` becomes `(a→d, c→b)` only if it avoids self-loops and duplicate edges. This preserves all node-level in-degrees and out-degrees.
- Uniform random remains as the original random-graph option.

## v0.3 additional mechanisms

- **Local predictive coding:** each unit predicts its fused local drive from its estimate and fast/slow state, records a bounded error/surprise trace, and injects a small bounded residual.
- **Pair-based STDP:** pre/post spike traces decay each step; coincident pre-spike with recent post trace potentiates, while post-spike with recent pre trace depresses. It is a simplified timing rule, not a biophysical synapse.
- **Context-adaptive routing:** destination soma/dendrite state maps to an effective gain bounded to `[0.62, 1.14]`.
- **Hierarchical temporal memory:** fast, medium and slow activity traces are updated at three different decay rates and feed a small bounded temporal contrast into local fusion.
- **Uncertainty-gated propagation:** previous ensemble disagreement attenuates graph transmission within `[0.58, 1]`. The standalone page additionally exposes a heuristic selective score and can abstain; it does not claim calibrated confidence.

## Learning and control boundaries

The live candidate is trained online using a simple logistic readout and prequential scoring. Synaptic reward and neuromodulatory signals are lagged to avoid using the current target before the prediction has been scored. Associative memory is capacity-limited. Structural changes are bounded and occur on fixed intervals.

The embodied agent uses a separate brain instance. Its short-horizon heading selection is a small synthetic control heuristic. It is not connected to the temporal-task readout or represented as general planning capability.

## Baseline and regression contract

- Same config, seed, topology and generated stream for baseline/candidate comparisons.
- Candidate-only mechanisms are behind explicit switches, including all five v0.3 additions.
- All switches disabled should reproduce the baseline's output vector and prediction within `1e-9` on the tested initial step.
- Existing v0.1 controls, views, live canvas, run/pause/step/reset, microphone, session exports and paired-seed test remain present.
- The test suite additionally checks finite neuron/predictive/temporal state, synaptic bounds, Dale-style sign preservation, STDP trace validity, routing bounds, bounded episode memory and delay queues, sleep and structural-plasticity execution, degree-sequence preservation, topology and lesion assays, model schema compatibility/fingerprint, tamper rejection and standalone inference.

## Fast-weight and efference state

The fast-weight matrix maps eight input key channels into eight pooled representation channels. Reads are fused into the unit drive with a bounded coefficient; reward-gated updates are clamped and exported with the model. It is an experimental associative memory, not a large-scale external-memory system.

The embodied agent records planned velocity and observed displacement. Their difference produces a bounded self-authorship/agreement score and disturbance/slip proxies. Those outputs are environment diagnostics, not a claim of agency or consciousness.

## Model export contract

`NEUROWEAVE_MODEL_PACKAGE` 1.2.0 carries (the importer continues to accept 1.0.0 and 1.1.0):

- model/config/version/provenance manifest;
- ten-region population identities and per-neuron receptor/local neuromodulator state;
- global affect-state proxies and six neuromodulator-like signals;
- sensory-channel contract, camera/microphone enabled flags (never raw media);
- Micro-Collective expert weights, router, validation summary and training counters;
- enabled mechanism map;
- architecture descriptor;
- neuron state array, including predictive and hierarchical temporal memory state;
- directed synapse array, including STDP spike traces and routing gain;
- structural fingerprints and fixed hash projection;
- associative episode snapshots;
- neuromodulator and predictive ensemble state;
- readout weights and bias;
- training and resource metadata;
- non-cryptographic FNV-1a fingerprint over the full candidate network, readout and agent snapshot.

The standalone HTML uses the exported frozen main-network weights/state to run local inference. The Micro-Collective checkpoint is preserved in the JSON package and the standalone runner executes its frozen 16-channel next-sensory prediction; online training remains in the full workbench. The JSON package includes a separate `agentController` record with the embodied controller network and environment/self-model snapshot. The standalone HTML deploys the candidate task-predictor and frozen Micro-Collective predictor; it does not run the embodied environment or request camera/microphone access. The package can be imported in read-only mode and re-exported as a standalone runner. The package is a snapshot, not an optimizer checkpoint or a training-resume format. Plasticity, new-edge creation and sleep consolidation are frozen in the inference page.

## Multimodal and affective state

The sensory manifest contains sixteen channels: visual luminance, red/green and blue/yellow opponency, edge density, motion, three audio spectral bands, olfactory and gustatory proxies, thermosensation, interoception, proprioception, touch, environmental state and task context. Webcam frames are reduced in-browser to five scalar visual features; no raw frames are written to model state. Microphone waveform buffers are used only to estimate amplitude and three frequency bands; raw audio is not exported. Synthetic chemical/taste/temperature/touch inputs are generated from the local ecology.

Affective state tracks valence, arousal, curiosity, stress, motivation, novelty and reward prediction error. Separate dopamine, serotonin, octopamine, acetylcholine, noradrenaline and endocannabinoid-like fields gate gain and plasticity. Per-unit receptor sensitivities create heterogeneous responses. The WireType-inspired transmitter head uses connectivity features only and emits hypotheses with confidence; it is not trained on real WireType labels and is not a biological neurotransmitter annotation. This is a simplified computational abstraction: transmitter roles are context-dependent and the model does not claim a literal human or fly emotional system.

## Sparse sequence search assay

The optional Fly-Protein-inspired assay uses synthetic 24-position, 20-symbol sequences and a synthetic additive/epistatic fitness landscape. Sparse random-projection guidance, evolutionary search and random search receive the same 50-query budget across ten landscapes and eight seeds. A random-reference 99th-percentile threshold estimates top-1% hits. This is an algorithmic search benchmark only; it does not model amino-acid chemistry, protein folding, real structures or ProteinGym data.

## Hardware mapping export

The optional FPGA mapping export groups edges into tiles, quantises synaptic magnitudes to signed int8, emits Q8.8 state hints and includes a four-stage systolic-style schedule and rough working-set estimates. It explicitly records that no RTL, UVM testbench, Vivado project, bitstream or FPGA execution validation is generated. The output is an interface manifest for future hardware work, not a deployable accelerator.

## Interoperability

NEUROWEAVE does not import from or write into Sonapse-LAB or ODDITY-LAB. Future integrations should use versioned neutral contracts for graph snapshots, neuron state, representations, experiment receipts and model snapshots. Default integration should be read-only; any mutation of another project requires a separate explicit operation and backup.
