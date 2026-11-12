# NEUROWEAVE model package format

## Identifier

- `format`: `NEUROWEAVE_MODEL_PACKAGE`
- Current `formatVersion`: `1.2.0`
- Backward-compatible import: `1.0.0`, `1.1.0`
- Runtime artifact: self-contained HTML inference runner generated from the JSON package.

## Main fields

| Field | Contents |
|---|---|
| `config` | Topology, neuron count, sparsity, tile size, task and seed |
| `features` | 31 independent mechanism switches in schema 1.2; absent new keys in legacy packages are treated as disabled |
| `architecture` | Declared neuron compartments, synapse fields, representation channels and learning mechanisms |
| `network.neurons` | Per-unit soma, dendrite, membrane, spike, calcium, axon, glial, myelin, region, receptor, local neuromodulator, connectivity-derived transmitter hypothesis, predictive-error and hierarchical temporal-memory state |
| `network.synapses` | Directed edge endpoints, signed weights, delays, eligibility traces, STDP pre/post traces and routing gain |
| `network.structuralFingerprints` | Graph-derived feature vectors |
| `network.hashProjection` | Fixed 16 × 8 random projection matrix |
| `network.fastMemory` | Learned 8 × 8 associative fast-weight matrix |
| `network.episodes` | Bounded episode keys and state snapshots |
| `network.neuromodulators` | DA, serotonin, octopamine, acetylcholine, noradrenaline and endocannabinoid-like state proxies |
| `network.ensemble` | Frozen small predictive ensemble parameters |
| `readout` | Eight input weights, bias and activation metadata |
| `agentController` | Separate embodied-agent network, feature flags, world state, efference diagnostics and planner state |
| `training` | Step count, rolling metrics, compute estimates and structural/sleep/STDP/routing diagnostics |
| `provenance` | Synthetic-data disclosure and source inspiration list |
| `integrity` | FNV-1a 32-bit content fingerprint and algorithm label |

## Validation and compatibility

The validator checks package identifier and schema, consistent declared and actual neuron/synapse counts, eight finite readout weights and finite bias, valid integer edge endpoints, bounded synapse weights, delay ranges, STDP trace bounds, routing-gain bounds, required finite neuron state, temporal-memory values and boolean feature flags. Schemas 1.1 and 1.2 require the embodied-agent snapshot. Schema 1.2 additionally validates the 16-channel, four-expert Micro-Collective dimensions and recomputes the FNV-1a fingerprint over the config, feature manifest, candidate network, readout, embodied-agent snapshot, Micro-Collective and sensory manifest. Imports are limited to 25 MB of JSON text, 4,096 neurons and 250,000 synapses. Legacy schema 1.0.0 remains accepted without v1.1-only fields and can still generate a standalone runner.

FNV-1a is a non-cryptographic checksum. It can detect accidental modifications but does not establish authorship, tamper resistance or scientific provenance.

## Import semantics

Import is read-only: it validates a user-selected JSON package and stores it separately from the live candidate. It does not replace, reset or mutate the active network. A validated imported snapshot can be used to produce a standalone HTML inference runner. Invalid imports are rejected, clear any previously selected imported bundle, and cannot be exported through the UI. Model metadata inserted into the standalone HTML shell is HTML-escaped; embedded JSON is script-safe encoded.

## Inference semantics

The JSON package includes the task-predictor network and the separate embodied-agent controller snapshot. The standalone runner deploys the frozen predictor network and a frozen Micro-Collective sensor predictor. It starts from the state captured at export and advances recurrent state using the stored graph, compartment values, features, delay queues, sparse mask, context attention, fixed hash projection and frozen readout. When multimodal sensory integration is enabled, the main runner accepts 24 finite values in `[-1, 1]` (eight task channels followed by sixteen sensory channels); otherwise it accepts eight task channels. The Micro-Collective predicts a 16-value next-sensory vector from the sensory slice. Camera/microphone access is not activated in the standalone file; values must be supplied manually. Learning updates, STDP updates, pruning/regrowth and consolidation are disabled in this inference snapshot.

The standalone runner reports the raw sigmoid readout, uncertainty proxy and a heuristic selective score. The optional abstain/review outcome is not calibrated confidence, does not imply safety and should not be used for high-stakes decisions.

The model package is an inference snapshot, not an optimizer checkpoint or training-resume format. To reproduce training, preserve the source revision, configuration, seed, session receipt and training logs.


## Schema 1.2 additions

- `network.neurons[*].region`, `receptors` and `neuromodLocal` store synthetic region identity and local transmitter-response state. `transmitterPrediction`, `transmitterConfidence`, `transmitterProbabilities` and `transmitterGain` store a connectivity-only hypothesis, not a measured neurotransmitter annotation.
- `network.affect` stores bounded valence, arousal, curiosity, stress, motivation, novelty and reward-prediction-error proxies.
- `microCollective` stores the four-expert 16-channel predictor, router weights/bias, update count, validation loss and rollback count. It is a model snapshot, not an optimizer-resume checkpoint.
- `sensory.channels` defines the sixteen-channel interface. `cameraEnabled`, `microphoneEnabled` and `rawMediaStored:false` are provenance flags; raw camera frames and audio are never embedded.
- Schema 1.2 fingerprint coverage includes the micro-model and sensory manifest in addition to the main connectome, readout and embodied-agent snapshot.
- Import compatibility remains available for schema 1.0.0 and 1.1.0.


## FPGA mapping manifest

The separate `NEUROWEAVE_FPGA_MAPPING` export contains the synthetic graph, signed-int8 quantised weights, source-sign identity, tile assignments, schedule estimates and rough memory estimates. It is not part of the model package schema and does not contain RTL, UVM tests, a Vivado project or a bitstream.
