# NEUROWEAVE LAB

**Advanced synthetic multi-soma, connectome and adaptive-learning research platform.**

- Release: v0.3.0
- Status: experimental research prototype
- Runtime: standalone browser application; no build step required

## Download the release

The complete v0.3.0 source bundle is stored in `release-parts/` as numbered Base64 segments. On Windows, run `RESTORE-RELEASE.ps1` from the repository root to reconstruct `NEUROWEAVE-LAB-v0.3.0.tar.xz`, then extract it with 7-Zip or `tar -xJf`.

The reconstructed archive contains the full application, source documentation, Windows launcher, regression tests, and GitHub Actions workflow.

## Research capabilities

The v0.3.0 application combines 24 independently switchable synthetic mechanisms:

- Multi-compartment units with four dendritic compartments, six interacting soma-state channels, axonal branches, membrane dynamics and local traces.
- Connectivity-derived structural representations and neighbour attention.
- Sparse distributed coding and FlyHash-inspired projections.
- Reward-gated plasticity, spike-timing-dependent plasticity (STDP), adaptive routing and fast-weight associative memory.
- Hierarchical memory, sleep-like consolidation and uncertainty-gated transmission.
- Recurrent network topology experiments, degree-preserving rewiring, hub and lesion comparisons.
- Predictive coding, ensemble world-model proxies and action-grounded agent self-modelling.
- Tiled processing, buffering and quantised-synapse experiments.
- Model Export Studio with versioned JSON model packages, validation, legacy schema support and standalone frozen inference HTML.

The project takes research inspiration from WireType, Fly-Distill, Fly-Protein and the FlyWire FPGA accelerator, while retaining experimental design ideas from Sonapse-LAB and ODDITY-LAB.

## Run regression tests

From the extracted `neuroweave-lab` directory:

```bash
npm test
```

The release includes `tests/smoke-test.cjs`, `tests/ACCEPTANCE.md` and `tests/compatibility-v0.2.json`. Compatibility tests check preservation of 106 previous DOM hooks and 19 original mechanism IDs, alongside simulation identity controls, mechanism coverage, topology experiments and model export/import checks.

## Evidence and limitations

NEUROWEAVE is a synthetic computational research platform. Its compartments and mechanisms are mathematical abstractions, not validated biological neuron models. The FlyWire-inspired accelerator techniques are software-side experiments and do not imply that the application runs on an FPGA. The package does not include a full ESM-2 protein model or claim to reproduce the original FlyWire research systems.

The standalone HTML export is a frozen inference runner for the supported prediction model. The JSON research package carries the fuller model snapshot; training and environment capabilities are not all reproduced by the standalone runner.

## License

See the `LICENSE` file inside the release archive.