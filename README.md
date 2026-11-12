# NEUROWEAVE LAB 0.4.0

**A local-first synthetic connectome workbench for multi-compartment neurons, structural representation, adaptive learning, embodied control and portable model export.**

NEUROWEAVE is an independent research prototype informed by four Fly-Brain Hub projects, the user's Sonapse-LAB and ODDITY-LAB work. It is not a merge of those repositories and does not copy their source code or redistribute their datasets.

> **Evidence boundary:** this is an experimental computational abstraction. It is not a validated biological neuron model, a real FlyWire connectome simulation, an ESM protein model, an FPGA implementation, evidence of general intelligence, or evidence of consciousness. Mechanisms can help, do nothing, or make performance worse. Treat benchmark outcomes as hypotheses requiring controlled replication.

## Start locally

Open `index.html` directly in a modern browser. No build step, package installation, server, account or external runtime dependency is required. For webcam and microphone support, use `localhost` or HTTPS and explicitly grant browser permission. Media processing is local and permission-gated.

On Windows, `RUN-LOCAL.cmd` starts a local static server where Python is available. Alternatively:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## What's new in 0.4.0

- Expanded the selectable population ceiling from 96 to 512 neurons while retaining the original 48-neuron default and original topology options.
- Added multi-region and dense multi-region connectomes with ten explicit sensory/association/memory/motor populations and long-range routing.
- Doubled the embodied ecology arena to 1200 × 660 units and expanded it to ten obstacles, eighteen food patches and three thermal zones.
- Added sixteen sensory channels: webcam visual statistics (luminance, colour opponency, edge density and motion), microphone low/mid/high spectral bands, plus simulated olfactory, gustatory, thermosensory, mechanosensory, proprioceptive and interoceptive channels.
- Added seven independently switchable mechanisms: multimodal sensory integration, affective neuromodulation, Micro-Collective, expert routing, meta-plasticity, predictive replay and heuristic WireType-inspired connectivity-only transmitter inference.
- Added a local four-expert top-2 Micro-Collective sensor predictor with opt-in live self-supervised training, bounded replay, held-out validation, routing-load balancing, best-state snapshots and rollback. It is a newly initialized small model, not a downloaded or copied Supermix checkpoint.
- Added valence, arousal, curiosity, stress and motivation state proxies alongside distinct dopamine, serotonin, octopamine, acetylcholine, noradrenaline and endocannabinoid-like control fields, plus heterogeneous local receptor profiles. These are computational control signals, not subjective emotions.
- Added a WireType-inspired connectivity-only transmitter hypothesis layer with six candidate transmitter classes and confidence, without relabelling known excitatory/inhibitory source signs.
- Added a Fly-Protein-inspired synthetic sequence-variant search assay comparing sparse-code guidance, evolutionary search and random search under equal query budgets; it is not a protein-folding model or ProteinGym result.
- Added a systolic-array-inspired FPGA mapping JSON export with signed-int8 synapses, Q8.8 neuron-state hints, tile schedule and sign/endpoint checks. It is a mapping manifest only, not RTL, UVM verification or a bitstream.
- Added schema 1.2.0 exports for region/receptor/local-modulator state, transmitter hypotheses, affect state, sensory channel manifest and Micro-Collective weights/training receipt; schema 1.0.0 and 1.1.0 imports remain supported.
- Expanded the controlled topology assay to seven graph conditions and added regression checks for the new subsystems.

## Historical changes in 0.3.0

- Expanded each synthetic neuron from a four-channel state unit into a multi-compartment computational cell with four dendritic compartments, six coupled soma-state channels (fast, slow, context, integrator, burst and gating), membrane dynamics, adaptive spike threshold, refractory period, calcium, axon hillock, two axonal branches, terminal release, homeostatic gain, astrocyte-like reservoir and activity-dependent myelin proxy.
- Retained the 19 mechanisms from v0.2.0 and added five in v0.3.0, bringing the total at that release to 24 independently switchable mechanisms.
- Added WireType-inspired connectivity-context attention and a 16-channel FlyHash-style random projection.
- Added neuromodulatory state proxies for dopamine, serotonin, octopamine and acetylcholine.
- Added utility-guided structural plasticity with bounded synapse pruning and growth, sleep-like replay/consolidation, universal fast-weight associative memory, an action-grounded efference self-model and an ensemble prediction/uncertainty signal.
- Added adaptive conduction delay and INT8-like quantised synaptic weight experiments.
- Added `Erdős–Rényi`, ring-lattice and hub-capped topologies. The degree-shuffled condition uses double-edge swaps to preserve the degree sequence of its clustered source graph.
- Added a 5-topology × 4-seed controlled topology assay.
- Added the Neuron Studio page, global neuromodulator display and full compartment inspection.
- Added Model Export Studio: versioned JSON model package plus a self-contained HTML inference runner.
- Added five independently switchable mechanisms: local predictive coding, pair-based spike-timing-dependent plasticity (STDP), context-adaptive synaptic routing, hierarchical fast/medium/slow temporal memory, and uncertainty-gated recurrent propagation.
- Added per-neuron prediction-error/surprise state and multi-timescale memory state, plus per-synapse pre/post spike traces (bounded to 1.5 by the update rule) and bounded routing-gain state.
- Added a matched 3-condition × 3-seed lesion robustness assay (intact, high-in-degree-targeted lesions, random matched lesions).
- Added model JSON import and read-only validation, including previous schema 1.0 compatibility, current schema 1.2 payload-fingerprint verification, and standalone HTML export from imported snapshots.
- Extended standalone inference with explicit uncertainty diagnostics and a heuristic abstain/review outcome while retaining the raw probability in the diagnostics. The selective score is not calibrated confidence.
- Extended regression checks to cover all 31 switches, new state invariants, STDP trace bounds, routing-gain bounds, lesion-assay execution, schema compatibility, tamper detection and standalone execution.

## Research workspace

### Live system

The live observatory retains the original v0.1 workflow: matched baseline and candidate recurrent networks, deterministic input stream, single-step/run/pause/reset controls, live network and agent canvases, rolling prequential metrics, event log, optional microphone-amplitude input and session JSON/CSV export.

### Full-compartment synthetic neuron

Each candidate unit now contains distinct state variables for:

| Compartment | Modelled state / role |
|---|---|
| Proximal dendrite | Fast local input integration |
| Distal dendrite | Recurrent and weighted synaptic integration |
| Apical dendrite | Contextual and attention-derived input |
| Basal dendrite | Coupled proximal/distal integration |
| Fast soma | Short-timescale response |
| Slow soma | Long-timescale integration |
| Context soma | Neighbour and graph-context state |
| Integrator soma | Coupled multi-compartment integration |
| Burst soma | Suprathreshold drive proxy |
| Gating soma | State-dependent signal gain |
| Membrane / AIS | Membrane-like state, adaptive threshold and spike initiation |
| Axon hillock | Output initiation signal |
| Axon branches A/B | Separate branch state traces |
| Terminal | Signed output/release proxy |
| Intracellular calcium | Activity and spike-linked slow trace |
| Glial/homeostatic state | Local activity regulation and gain control |
| Myelin proxy | Activity-dependent conduction parameter |

The terms are inspired by neurobiology; the update equations are deliberately simplified and should not be interpreted as biophysical measurements. Excitatory and inhibitory source signs are constrained in synaptic updates (Dale-style constraint).

### Twenty-four independent candidate mechanisms

The original eight toggles are preserved. Eleven mechanisms from v0.2.0 remain. Five further mechanisms were added in v0.3.0:

| Mechanism | Main idea | Research connection |
|---|---|---|
| Multi-soma integration | Coupled fast, slow, contextual and integrator states | ODDITY dual-soma / Sonapse recurrent substrates |
| Structural encoder | Graph fingerprints and structural weighting | WireType |
| Sparse distributed code | Global k-winners activation | Fly-Protein / FlyHash |
| Associative trace memory | Bounded similarity-retrieved episodes | Fly-Protein / Sonapse episodic memory |
| Reward-gated plasticity | Eligibility traces and bounded signed-weight update | Fly-Protein / Sonapse plasticity |
| Synaptic delays | Per-edge 1–3 step delay queues | ODDITY delay lines / recurrent connectomes |
| Homeostatic governor | Local gain regulation | Sonapse homeostasis / glial regulation |
| Tiled execution | Tiled edge traversal and synchronous state buffers | FPGA accelerator concepts |
| Connectivity-context attention | Self/strong-neighbour contextual aggregation | WireType |
| FlyHash projection | Fixed random sparse feature projection | Fly-Protein |
| Neuromodulatory field | DA, 5-HT, OA and ACh state proxies | Sonapse neuromodulation |
| Structural plasticity | Utility-guided pruning and regrowth | Sonapse neurogenesis / connectome evolution |
| Sleep-like consolidation | Bounded replay, trace consolidation and weak downscaling | Sonapse sleep engine |
| Predictive world model | Small ensemble prediction and disagreement proxy | Sonapse experience model / ODDITY embodied testing |
| Adaptive conduction | Activity-dependent myelin proxy and delay adjustment | Neuromorphic execution research |
| Quantised synapses | INT8-like signed weight quantisation | FPGA accelerator concepts |
| Axonal branches | Two branch traces and terminal release | ODDITY synthetic axonal grafts |
| Universal fast weights | Reward-updated 8 × 8 key/value association matrix | Sonapse fast-weight / test-time associative memory |
| Action-grounded self-model | Compares planned movement with observed displacement; estimates authorship, disturbance and actuator slip | Sonapse efference self-model |
| Local predictive coding | Per-unit prediction estimate, bounded residual and surprise trace modulate state fusion | Predictive-processing research direction; synthetic abstraction |
| Pair-based STDP | Pre/post spike traces produce local potentiation/depression; source sign remains fixed | Activity-dependent plasticity research |
| Context-adaptive routing | Destination soma/dendrite state scales transmission within a bounded gain interval | WireType-style contextual encoding; adaptive routing hypothesis |
| Hierarchical temporal memory | Fast, medium and slow traces provide distinct decay timescales inside each unit | Sonapse episodic/fast-weight memory direction |
| Uncertainty-gated propagation | Ensemble disagreement attenuates recurrent input; standalone can abstain heuristically | Sonapse ensemble uncertainty / selective prediction direction |

The original v0.2 additions remain, and v0.3.0 adds local predictive coding, pair-based STDP, adaptive routing, hierarchical temporal memory and uncertainty-gated propagation. The all-off candidate is intended to be an identity control against the baseline. The automated regression test checks this after a single update. Do not infer that the active, full configuration is superior from its complexity alone.

### Structural and topology experiments

Available graph options:

- Clustered small-world synthetic graph.
- Hub-skewed synthetic graph.
- Uniform random graph.
- Degree-preserving double-edge-shuffled graph.
- Erdős–Rényi graph.
- Hub-capped graph.
- Ring lattice.

The dedicated topology assay holds the selected task, feature switches, readout protocol and evaluation schedule constant while comparing seven topologies across four seeds each. It reports accuracy, log-loss, edge count, maximum in-degree and degree coefficient of variation. A separate lesion robustness assay compares intact operation with targeted high-in-degree lesions and random matched lesions across three paired seeds per condition.

The degree-shuffled control is produced by double-edge swaps from the same clustered source graph. These swaps preserve every node's in-degree and out-degree exactly, while rewiring pairings where a valid swap exists. It is a synthetic topology control, not FlyWire data.

### Embodied agent

The expanded synthetic ecology runs over 1200 × 660 units with ten moving obstacles, eighteen replenishing food patches and three thermal zones. It preserves goal seeking, obstacle avoidance, energy, reward and collision tracking. With the predictive world-model switch enabled, a short local candidate-heading search acts as a small planning layer alongside a fast reactive control signal. This is an illustrative short-horizon controller, not a trained or validated MPC system.

Webcam and microphone inputs are optional and permission-gated. Webcam frames are reduced locally to five scalar features; microphone input supplies amplitude plus three spectral bands. Raw media is neither recorded nor exported. When the Micro-Collective has been trained, its predicted sensory vector is appended as a separate predictive-context stream to the embodied agent.

## Model export

The **Model Export Studio** exports two artifacts from the current candidate:

1. **Versioned JSON package (schema 1.2.0)** — configuration, 31 mechanism flags, neuron compartment/predictive/temporal-memory state, region and receptor profiles, local neuromodulators and connectivity-only transmitter hypotheses, directed synapses including STDP traces and routing metadata, connectivity fingerprints, sparse projection matrix, fast-weight matrix, recent associative episodes, affect state, sensory-channel manifest, Micro-Collective weights and validation receipt, predictive ensemble, learned readout, embodied-agent network/environment/self-model and training metadata.
2. **Standalone HTML inference runner** — a self-contained page with an embedded frozen model, a 24-value input editor when multimodal integration is enabled (eight task plus sixteen sensory channels), reset and inference-step controls, raw output probability, uncertainty proxy, selective score and runtime diagnostics. The exported Micro-Collective also has a frozen next-sensory prediction action. It can abstain with an explicit review outcome; this score is heuristic and not calibrated.

The inference export freezes synaptic plasticity and topology. It runs the frozen main reservoir/readout and the frozen Micro-Collective sensor predictor; it does not continue training, create new synapses, access live camera/microphone devices or run sleep consolidation. The output probability is not calibrated confidence. Package validation checks array dimensions, endpoints and finite weights before download.

The model studio can also import a JSON package in read-only mode, validate it and export a standalone runner without changing the active experiment. It supports previous schemas 1.0.0 and 1.1.0 plus current schema 1.2.0. Imports are read-only, limited to 25 MB / 4,096 neurons / 250,000 synapses, validate declared counts and numeric/state bounds, and clear any previously selected imported model after a failed import. Standalone labels are HTML-escaped and embedded JSON is script-safe encoded. Schema 1.2 validates the FNV-1a 32-bit fingerprint over the full network/readout/agent snapshot plus Micro-Collective weights and sensory manifest. This detects accidental changes but is **not cryptographic signing or tamper-proof provenance**. Keep the source revision and experimental receipt alongside exported models for stronger traceability.

Session export remains separate: `Export data` still downloads a JSON session receipt and CSV time-series. `Export model` downloads the architecture/weights package and standalone runner; `Export FPGA mapping` downloads a separate signed-int8 tile-mapping manifest.

## Tests

No dependencies are needed:

```bash
node tests/smoke-test.cjs
```

The test suite checks all 106 v0.2 DOM integration hooks and all 19 original mechanism IDs against a committed compatibility manifest, then runs the app in a small fake DOM and exercises the original live simulation and paired-seed workflow, verifies the all-off identity control, runs topology and lesion assays, checks degree-preserving rewiring, asserts neuron/synapse/STDP/routing invariants, validates schema 1.2 fingerprints and legacy 1.0 compatibility, detects a tampered payload, compiles the generated standalone script and executes an inference step in the exported runner.

## Research interpretation and limitations

- WireType-inspired attention operates over synthetic graph neighbours; it is not a transformer trained on FlyWire neuron labels.
- FlyHash-inspired projections are fixed random projections; the app does not contain the original biological circuit or the Fly-Protein model's full training pipeline.
- Fly-Distill-inspired topology conditions are synthetic; no larval fly connectome or published FlyWire weights are bundled.
- FPGA-inspired tiling, buffering and quantisation are software-side experiments. No RTL, synthesis report, board image or measured power/throughput result is produced.
- Sonapse-inspired neuromodulation, astrocyte, plasticity, sleep, memory, predictive-model and structural-evolution components are reduced local implementations, not a port of Sonapse's complete model stack.
- ODDITY-inspired baselines and ablations are retained, but parameter/state/compute matching remains necessary for stronger claims.
- The browser's compute count and estimated state bytes are proxies, not measured energy, hardware throughput or full memory allocator usage.
- Current tasks are compact synthetic temporal benchmarks, not language, protein-fitness, general reasoning or scientific discovery benchmarks.
- Repeated tuning on the visible task suite can overfit. Prefer held-out tasks, seeds, parameter-matched baselines and sealed evaluation streams.

## Research sources and inspirations

- [WireType](https://fly-brain-hub.vercel.app/projects/wiretype)
- [Fly-Distill](https://fly-brain-hub.vercel.app/projects/fly-distill)
- [Fly-Protein](https://fly-brain-hub.vercel.app/projects/fly-protein)
- [FlyWire FPGA Accelerator](https://fly-brain-hub.vercel.app/projects/flywire-fpga-accelerator)
- [Sonapse-LAB](https://github.com/kai9987kai/Sonapse-LAB)
- [ODDITY-LAB](https://github.com/kai9987kai/ODDITY-LAB)

## Project boundaries

NEUROWEAVE remains its own project. It does not edit Sonapse-LAB or ODDITY-LAB. Any future interoperability should use explicit, versioned import/export contracts and be read-only by default.
