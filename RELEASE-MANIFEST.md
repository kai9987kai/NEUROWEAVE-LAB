# NEUROWEAVE LAB v0.3.0 release manifest

This repository bootstrap records the v0.3.0 release identity and research scope.

## Package scope

- 24 independently switchable synthetic computational mechanisms.
- Multi-compartment neuron units with dendritic compartments, six soma-state channels, axonal branches, membrane dynamics and local traces.
- Structural/connectivity representations, neighbour attention and sparse distributed coding.
- Reward-gated plasticity, STDP, adaptive routing, fast-weight memory, hierarchical memory and consolidation.
- Topology experiments including degree-preserving rewiring, hub comparisons and lesion controls.
- Predictive coding, ensemble world-model proxies and action-grounded agent self-modelling.
- Tiled execution, buffering and quantised-synapse experiments.
- Model Export Studio: versioned JSON model packages, validation, schema compatibility and standalone frozen inference HTML.

## Research lineage

The project investigates ideas inspired by WireType, Fly-Distill, Fly-Protein and the FlyWire FPGA accelerator. It also carries forward experimental practices and architecture concepts from Sonapse-LAB and ODDITY-LAB.

## Validation boundary

NEUROWEAVE is an experimental synthetic computational model, not a validated biological neuron model or a claim of biological equivalence. FPGA-inspired techniques are software experiments and do not establish hardware execution. Protein-model integration is conceptual; this release does not package ESM-2 or reproduce the source research systems.

## Release verification

The prepared v0.3.0 package reports a passing targeted Node.js regression suite. It checks preservation of 106 prior DOM integration hooks and 19 original mechanism IDs, all-mechanisms-off identity behaviour, the expanded mechanism set, topology/lesion assays and model export/import checks. Manual browser/hardware matrix validation remains outstanding.

## Packaging note

This first repository commit establishes the project documentation and release manifest. The full v0.3.0 source archive is available as the accompanying conversation download; it has not been uploaded as a GitHub release asset in this commit.