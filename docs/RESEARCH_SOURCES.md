# Research sources and interpretation boundaries

This list records the public sources used to guide the v0.4.0 conceptual integrations. NEUROWEAVE implements simplified, synthetic analogues; it does not reproduce the source models or their empirical results.

## Connectome and graph controls

- [Fly-Distill repository](https://github.com/michelangeloromerochisco/fly-distill) — frozen larval fly connectome as recurrent substrate, LIF-style dynamics, topology controls, hub capping and distillation experiments.
- [Fly-Brain Hub: WireType](https://fly-brain-hub.vercel.app/projects/wiretype) — connectivity-informed transmitter-type prediction. NEUROWEAVE uses a small heuristic hypothesis layer, not the trained WireType model.

## Sparse coding and sequence search

- [Fly-Brain Hub: Fly-Protein](https://fly-brain-hub.vercel.app/projects/fly-protein) — sparse-code-inspired sequence variant search. NEUROWEAVE's local assay is a synthetic sequence landscape with matched random/evolutionary controls; it is not a protein model or a reproduction of the project.

## Hardware mapping

- [Fly-Brain Hub: FlyWire FPGA accelerator](https://fly-brain-hub.vercel.app/projects/flywire-fpga-accelerator) — tiled/systolic hardware mapping inspiration. NEUROWEAVE exports a logical mapping manifest only; it does not emit RTL or a bitstream.

## Supermix and local agent design

- [Supermix repository](https://github.com/kai9987kai/Supermix) — source project for sparse expert routing, multi-representation processing, memory and continual-learning design inspiration.
- [Supermix v53 MimoMix architecture notes](https://github.com/kai9987kai/Supermix/blob/main/docs/V53_MIMOMIX_ARCHITECTURE.md) — architecture context for the small local Micro-Collective adaptation. No Supermix weights are copied.
- [Sonapse-LAB](https://github.com/kai9987kai/Sonapse-LAB) and [ODDITY-LAB](https://github.com/kai9987kai/ODDITY-LAB) — prior architecture and experiment workflow context.

## Sensory embodiment and neuromodulation

- [Mechanisms of neuromodulatory volume transmission](https://www.nature.com/articles/s41380-024-02608-3), *Molecular Psychiatry* (2024) — emphasizes transmitter-specific release, diffusion, uptake and receptor positioning. NEUROWEAVE does not yet simulate those biophysical processes.
- [Neuromodulator and neuropeptide sensors and probes for precise circuit interrogation in vivo](https://pmc.ncbi.nlm.nih.gov/articles/PMC11488521/), *Science* (2024) — discusses receptor diversity and the need to measure distinct neurochemical signals rather than infer them from spiking alone.
- [NeuroMechFly / FlyGym](https://github.com/NeLy-EPFL/flygym) — inspiration for separating sensory modalities and embodied state. NEUROWEAVE does not include the detailed fly morphology or calibrated physics of these systems.

## Interpretation boundaries

- A connectivity-only transmitter score is a hypothesis, not a biological annotation.
- Valence, arousal, curiosity, stress and motivation are computational state variables, not evidence of subjective emotion.
- Dopamine, serotonin, octopamine, acetylcholine, noradrenaline and endocannabinoid-like signals are simplified modulatory fields. Their actual roles depend on cell type, receptor subtype, location, release dynamics and timescale.
- Webcam and microphone features are low-dimensional engineering descriptors, not biologically calibrated sensory transduction.
- The Micro-Collective is a small newly initialised sensor-prediction model, not the Supermix language model.
- The FPGA manifest is not an implemented accelerator.
