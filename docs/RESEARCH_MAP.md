# Research integration map — NEUROWEAVE LAB 0.4.0

These are conceptual adaptations, not ports of the source projects. All connectomes, cell classes, neurotransmitter hypotheses and sequence landscapes in the current browser build are synthetic unless explicitly marked otherwise. No source-project weights, private datasets or FlyWire/hemibrain files are redistributed.

| Inspiration | Mechanisms in NEUROWEAVE 0.4.0 | What remains out of scope |
|---|---|---|
| WireType | Connectivity fingerprints, strongest-neighbour attention, and a heuristic connectivity-only six-class transmitter hypothesis with per-neuron confidence | The published WireType model, its trained cross-connectome weights, actual FAFB/MCNS annotations or ground-truth transmitter labels |
| Fly-Distill | Seven controlled graph conditions: clustered, hub-skewed, Erdős–Rényi, degree-preserving shuffle, hub-capped, multi-region and dense multi-region; matched seeds and recurrent temporal tasks | Larval Drosophila connectome, frozen biological graph, LIF paper reproduction or claims that biological wiring is superior |
| Fly-Protein | Sparse random projection, k-winners coding, bounded associative episodes, reward-gated plasticity, and a budget-matched synthetic sequence-search assay against evolutionary and random baselines | ESM-2, ProteinGym, real amino-acid embeddings, molecular structure, real fitness oracle or claims about protein engineering |
| FlyWire FPGA accelerator | Tile traversal, double-buffer-style state arrays, signed-int8 synapse mapping export, Q8.8 state hints, systolic-style schedule and rough memory/cycle estimates | SystemVerilog RTL, UVM testbench, Vivado project, synthesis, FPGA bitstream, timing closure or board measurements |
| Sonapse-LAB | Dale-style source signs, recurrent substrate, multi-soma units, heterogeneous receptor profiles, neuromodulator proxies, glial/homeostatic regulation, neurogenesis-like rewiring, sleep-like consolidation, fast-weight memory, predictive ensemble and action-grounded agent | Full Sonapse model stack, imported Sonapse checkpoints, Poseidon/teacher weights, real imported connectomes or the complete causal benchmark infrastructure |
| Supermix / Supermix-Expanse | A compact, freshly initialised four-expert top-2 predictor; load-balancing router bias; online self-supervised sensory-transition learning; novelty-prioritised replay; held-out validation; rollback; frozen model export; predicted sensory state appended to the embodied agent | The 132M-parameter language model, full MaleCNS type graph, teacher-model distillation, language generation, pretrained Supermix weights or equivalent language-model performance |
| ODDITY-LAB | Matched baseline/candidate, modular switches, prequential metrics, temporal tasks, embodied sandbox and intervention/ablation approach | ODDITY source/runtime, exact task parity or fully matched compute/state capacity |
| NeuroMechFly / FlyGym sensory-body work | Expanded embodied ecology and separate visual, audio, chemical, taste, thermal, touch, proprioceptive and interoceptive feature channels | Anatomical fly morphology, MuJoCo physics, calibrated compound-eye optics, validated sensory transduction or biological locomotor circuits |

## Current sensory and affective contract

The workbench accepts sixteen sensory features: five local webcam-derived visual statistics, three microphone spectral bands, olfactory and gustatory proxies, thermal state, interoception, proprioception, touch, environmental state and task context. The main task model receives its eight task channels plus these sixteen sensory features when multimodal integration is enabled. The embodied agent can additionally receive the Micro-Collective's sixteen predicted next-sensory values as a separate predictive-context stream after live training has been enabled.

The affective state contains valence, arousal, curiosity, stress, motivation, novelty and reward-prediction-error proxies. Distinct dopamine, serotonin, octopamine, acetylcholine, noradrenaline and endocannabinoid-like signals modulate gain, attention and plasticity through heterogeneous synthetic receptor profiles. These are computational control signals, not subjective feelings or a physiologically complete emotional system.

## Recommended follow-up experiments

1. Parameter-matched and state-matched baselines for multi-soma comparisons.
2. Degree-preserving topology assay with more seeds and a declared held-out seed set.
3. Ablation of WireType-style transmitter inference, neighbour attention and dense representations independently.
4. Sparse activity versus information-retention curves rather than accuracy alone.
5. Reward-gated learning with shuffled-reward and zero-reward controls.
6. Structural plasticity with matched edge-count and matched degree controls.
7. Sleep consolidation with replay-only, downscale-only and no-sleep controls.
8. Predictive ensemble calibration using held-out outcomes and reliability diagrams.
9. Quantisation error versus task score, latency and memory measurements on actual target hardware.
10. Validate webcam feature extraction against a calibrated image dataset and test the camera path in multiple browsers.
11. Compare the Micro-Collective against a matched dense MLP, GRU and persistence predictor under identical sensory streams and compute budgets.
12. Test whether connectivity-only transmitter hypotheses transfer between independently generated graph families before interpreting them as useful biological predictions.
13. Export/re-import equivalence tests across a clean browser session and a pinned source revision.

A mechanism should be retained only if it demonstrates a repeatable benefit under relevant controls and its extra compute/state cost is reported.
