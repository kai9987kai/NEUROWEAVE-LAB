/* Minimal no-dependency DOM smoke test for the standalone NEUROWEAVE app. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const compatibility = JSON.parse(fs.readFileSync(path.join(__dirname, 'compatibility-v0.2.json'), 'utf8'));
const currentDomIds = [...html.matchAll(/\bid=\"([^\"]+)\"/g)].map(m => m[1]);
assert.equal(new Set(currentDomIds).size, currentDomIds.length, 'DOM ids remain unique');
for (const id of compatibility.requiredDomIds) assert.ok(currentDomIds.includes(id), `v0.2 DOM hook remains present: ${id}`);
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert(match, 'Application script exists');

class FakeElement {
  constructor(tag = 'div', id = '') {
    this.tagName = tag.toUpperCase(); this.id = id; this.value = ''; this.checked = false;
    this.textContent = ''; this.innerHTML = ''; this.className = ''; this.dataset = {};
    this.style = {}; this.children = []; this.listeners = {}; this.disabled = false;
    this.classList = { add: (...xs) => { this._classes = new Set([...(this._classes || []), ...xs]); },
      remove: (...xs) => { this._classes ||= new Set(); xs.forEach(x => this._classes.delete(x)); },
      contains: x => (this._classes || new Set()).has(x) };
  }
  addEventListener(name, fn) { (this.listeners[name] ||= []).push(fn); }
  async fire(name, event = {}) { for (const fn of this.listeners[name] || []) await fn(event); }
  appendChild(el) { this.children.push(el); return el; }
  append(...els) { this.children.push(...els); }
  prepend(el) { this.children.unshift(el); }
  remove() {}
  get lastChild() { return this.children[this.children.length - 1]; }
  getBoundingClientRect() { return { width: 640, height: 275, left: 0, top: 0 }; }
  getContext() { return fakeContext; }
  click() { return this.fire('click'); }
}
const fakeContext = new Proxy({}, { get(target, prop) { if (prop in target) return target[prop]; return () => {}; }, set(target, prop, value) { target[prop] = value; return true; } });
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
const elements = new Map(ids.map(id => [id, new FakeElement(id.includes('Canvas') ? 'canvas' : 'div', id)]));
const defaults = { topology: 'clustered', units: '48', sparsity: '22', tile: '8', task: 'echo6', seed: '4242', speed: '2' };
for (const [id, value] of Object.entries(defaults)) elements.get(id).value = value;
const featureIds = ['multiSoma','structural','sparse','memory','plasticity','delays','glial','tiled','wiretype','flyHash','neuromod','neurogenesis','sleep','worldModel','myelination','quantized','axonBranches','fastWeights','selfModel','predictiveCoding','stdp','adaptiveRouting','hierarchicalMemory','uncertaintyGate','multimodalSensory','affectiveSignals','microCollective','expertRouting','metaLearning','predictiveReplay','wireTypeInference'];
for (const id of featureIds) elements.get(id).checked = true;
const nav = ['dashboard','architecture','experiments','neuron','model','protocol'].map(view => { const el = new FakeElement('button'); el.dataset.view = view; return el; });
const views = ['dashboard','architecture','experiments','neuron','model','protocol'].map(view => new FakeElement('section', `view-${view}`));
const document = {
  getElementById: id => elements.get(id) || (elements.set(id, new FakeElement('div', id)), elements.get(id)),
  querySelectorAll: selector => selector === '.navbtn' ? nav : selector === '.view' ? views : [],
  createElement: tag => new FakeElement(tag),
  body: new FakeElement('body')
};
const window = { devicePixelRatio: 1, addEventListener() {} };
const context = {
  document, window, navigator: {}, performance: { now: () => Date.now() },
  requestAnimationFrame: () => 1, cancelAnimationFrame() {},
  setTimeout, clearTimeout, console, Math, Date, Blob, URL,
  Float32Array, Uint8Array, Array, Object, Map, Set, Promise,
  Number, String, JSON, Error
};
vm.runInNewContext(match[1], context, { timeout: 10000, filename: 'neuroweave-app.js' });

(async () => {
  assert.equal(elements.get('mSteps').textContent, '0', 'Initial state is rendered');
  await elements.get('stepBtn').fire('click');
  assert.equal(elements.get('mSteps').textContent, '1', 'Single step advances the simulation');
  assert.match(elements.get('mAcc').textContent, /%/, 'Prequential metric updates');
  await elements.get('replicateBtn').fire('click');
  assert.match(elements.get('repStatus').textContent, /8 paired seeds complete/, 'Replication suite completes');
  const rows = (elements.get('repRows').innerHTML.match(/<tr>/g) || []).length;
  assert.equal(rows, 8, 'Eight per-seed rows are rendered');
  assert.notEqual(elements.get('repMean').textContent, '—', 'Paired mean is reported');
  const api = window.NEUROWEAVE;
  assert.equal(api.version, '0.4.0', 'Expanded model version is exposed');
  assert.equal(api.featureIds.length, 31, 'All original and new mechanisms are registered');
  for (const id of compatibility.requiredFeatureIds) assert.ok(api.featureIds.includes(id), `Original v0.2 mechanism remains available: ${id}`);
  const routerBeforeTraining = JSON.stringify(api.getMicroCollectiveSnapshot().router);
  await elements.get('collectiveTrainBtn').fire('click');
  for (let i = 0; i < 300; i++) await elements.get('stepBtn').fire('click');
  assert.ok(api.getMicroCollectiveSnapshot().updates > 0, 'Micro-Collective performs live self-supervised updates');
  assert.notEqual(JSON.stringify(api.getMicroCollectiveSnapshot().router), routerBeforeTraining, 'Micro-Collective learns its sparse expert router as well as expert weights');
  assert.equal(api.getMicroCollectiveSnapshot().dimension, 16, 'Micro-Collective consumes a 16-channel sensory state');
  assert.equal(api.getSnapshot().environment.agentInputChannels, 24, 'Trained Micro-Collective predictions are grafted into the embodied agent as 16 predictive context channels');
  assert.ok(Number.isFinite(api.getMicroCollectiveSnapshot().validationLoss) || api.getMicroCollectiveSnapshot().validationLoss === null, 'Micro-Collective validation telemetry remains finite or explicitly unavailable');
  const invariantReport = api.getInvariantReport();
  assert.equal(invariantReport.daleViolations, 0, 'Dale-style source sign is preserved');
  assert.equal(invariantReport.weightBoundViolations, 0, 'Synaptic magnitudes remain bounded');
  assert.equal(invariantReport.finiteNeuronState, true, 'Neuron state remains finite');
  assert.equal(invariantReport.affectFinite, true, 'Affective state remains finite');
  assert.equal(invariantReport.localNeuromodulatorsFinite, true, 'Local neuromodulator receptor state remains finite');
  assert.equal(invariantReport.microCollectiveFinite, true, 'Micro-Collective parameters remain finite');
  assert.equal(invariantReport.transmitterInferenceFinite, true, 'Connectivity-only transmitter confidence remains finite');
  assert.ok(invariantReport.episodeCount <= invariantReport.episodeLimit, 'Associative memory remains bounded');
  assert.ok(invariantReport.maxDelayQueue <= 4, 'Synaptic delay queues remain bounded');
  assert.ok(invariantReport.sleepCycles >= 1, 'Sleep-like consolidation has executed');
  assert.ok(invariantReport.structuralEvents >= 1, 'Structural plasticity has executed');
  const liveSnapshotBeforeImport = JSON.stringify(api.getSnapshot());
  const bundle = api.getModelBundle();
  const hardwareMap = api.getHardwareManifest();
  assert.equal(hardwareMap.format, 'NEUROWEAVE_FPGA_MAPPING', 'FPGA mapping exporter produces a dedicated manifest');
  assert.equal(hardwareMap.graph.neuronCount, 48, 'FPGA manifest preserves the active graph population');
  assert.equal(hardwareMap.verification.sourceSignPreserved, true, 'FPGA quantisation preserves Dale-style source signs');
  assert.equal(hardwareMap.verification.rtlGenerated, false, 'FPGA manifest explicitly avoids claiming RTL generation');
  assert.ok(hardwareMap.graph.edges.every(e => Number.isInteger(e.weightInt8) && Math.abs(e.weightInt8) <= 127), 'FPGA mapping exports bounded signed int8 weights');
  const validation = api.validateModelBundle(bundle);
  assert.equal(validation.valid, true, 'Model export passes structural and fingerprint validation');
  const badCount = JSON.parse(JSON.stringify(bundle)); badCount.network.neuronCount += 1;
  assert.equal(api.validateModelBundle(badCount).valid, false, 'Importer rejects an inconsistent declared neuron count');
  const badState = JSON.parse(JSON.stringify(bundle)); badState.network.neurons[0].fast = null;
  assert.equal(api.validateModelBundle(badState).valid, false, 'Importer rejects null in a required numeric neuron-state field');
  const imported = api.importModelText(JSON.stringify(bundle));
  assert.equal(imported.valid, true, 'New model package imports and validates');
  assert.equal(JSON.stringify(api.getSnapshot()), liveSnapshotBeforeImport, 'Read-only model import does not mutate the active experiment');
  const tampered = JSON.parse(JSON.stringify(bundle)); tampered.network.synapses[0].weight += 0.01;
  assert.equal(api.importModelText(JSON.stringify(tampered)).valid, false, 'Tampered model payload fails integrity validation');
  assert.throws(() => api.exportImportedStandalone(), /Import and validate a model package first/, 'Rejected import clears any previous imported-model selection');
  const legacy11 = JSON.parse(JSON.stringify(bundle)); legacy11.formatVersion = '1.1.0'; delete legacy11.microCollective; delete legacy11.sensory;
  const legacy11Payload = { config: legacy11.config, features: legacy11.features, network: legacy11.network, readout: legacy11.readout, agentController: legacy11.agentController };
  let legacy11Hash = 0x811c9dc5; const legacy11Text = JSON.stringify(legacy11Payload);
  for (let i = 0; i < legacy11Text.length; i++) { legacy11Hash ^= legacy11Text.charCodeAt(i); legacy11Hash = Math.imul(legacy11Hash, 0x01000193); }
  legacy11.integrity = { fingerprint: ('00000000' + (legacy11Hash >>> 0).toString(16)).slice(-8), fingerprintAlgorithm: 'FNV-1a-32 (non-cryptographic integrity checksum)' };
  assert.equal(api.validateModelBundle(legacy11).valid, true, 'Previous v1.1 model schema remains import-compatible');
  const legacy = JSON.parse(JSON.stringify(bundle)); legacy.formatVersion = '1.0.0'; delete legacy.integrity; delete legacy.features.predictiveCoding; delete legacy.features.stdp; delete legacy.features.adaptiveRouting; delete legacy.features.hierarchicalMemory; delete legacy.features.uncertaintyGate;
  legacy.network.neurons.forEach(n => { delete n.predictive; delete n.temporalMemory; });
  assert.equal(api.validateModelBundle(legacy).valid, true, 'Previous v1.0 model schema remains import-compatible');
  const legacyStandalone = api.createStandaloneHtml(legacy);
  assert.match(legacyStandalone, /legacy package/, 'Legacy model can still generate a standalone runner without a v1.1 integrity field');
  const legacyScript = legacyStandalone.match(/<script>([\s\S]*)<\/script>/);
  assert.ok(legacyScript, 'Legacy standalone page contains an executable script');
  new vm.Script(legacyScript[1], { filename: 'neuroweave-legacy-standalone.js' });
  assert.equal(bundle.network.neurons.length, 48, 'Model export preserves the active neuron population');
  assert.equal(bundle.network.synapses.length, bundle.network.synapseCount, 'Model export preserves synapse count');
  const variantAssay = api.runVariantSearchAssay();
  assert.equal(variantAssay.results.length, 3, 'Sparse-code, evolutionary and random search controls are compared');
  assert.equal(variantAssay.runs, 80, 'Variant search includes ten landscapes and eight matched seeds');
  assert.equal(variantAssay.budget, 50, 'All variant search methods share a 50-query budget');
  assert.equal(variantAssay.syntheticOnly, true, 'Variant search is explicitly labelled synthetic, not a protein folding result');
  assert.equal((elements.get('variantRows').innerHTML.match(/<tr>/g) || []).length, 3, 'Variant search renders all three control conditions');
  const topoMulti = api.topologyDiagnostics('multiregion', 9090);
  const topoDenseMulti = api.topologyDiagnostics('dense-multiregion', 9090);
  assert.ok(topoMulti.edges > 0 && Object.keys(topoMulti.regions).length >= 5, 'Multi-region topology creates a sensory-region graph');
  assert.ok(topoDenseMulti.edges > topoMulti.edges, 'Dense multi-region topology expands edge density');
  const topoClustered = api.topologyDiagnostics('clustered', 9090);
  const topoShuffled = api.topologyDiagnostics('degree-shuffled', 9090);
  assert.deepEqual([...topoClustered.inDegrees].sort((a,b)=>a-b), [...topoShuffled.inDegrees].sort((a,b)=>a-b), 'Degree-shuffled topology preserves the in-degree sequence');
  assert.deepEqual([...topoClustered.outDegrees].sort((a,b)=>a-b), [...topoShuffled.outDegrees].sort((a,b)=>a-b), 'Degree-shuffled topology preserves the out-degree sequence');
  assert.ok(bundle.network.neurons[0].dendrites && bundle.network.neurons[0].axon && bundle.network.neurons[0].soma, 'Export contains full neuron compartments');
  assert.ok(bundle.network.neurons[0].region && bundle.network.neurons[0].receptors && bundle.network.neurons[0].neuromodLocal, 'Export preserves region identity, receptor profile and local modulators');
  assert.ok(bundle.network.neurons[0].transmitterPrediction && Number.isFinite(bundle.network.neurons[0].transmitterConfidence), 'Export preserves connectivity-only transmitter hypotheses and confidence');
  assert.ok(bundle.microCollective && bundle.microCollective.expertCount === 4 && bundle.sensory.channels.length === 16, 'Schema 1.2 exports the trained micro-model and sensory channel contract');
  assert.equal(bundle.sensory.rawMediaStored, false, 'Model package explicitly excludes raw webcam and microphone media');
  const badMicro = JSON.parse(JSON.stringify(bundle)); badMicro.microCollective.experts = {};
  assert.equal(api.validateModelBundle(badMicro).valid, false, 'Importer rejects malformed Micro-Collective matrix shapes without throwing');
  assert.ok(bundle.network.neurons[0].predictive && bundle.network.neurons[0].temporalMemory, 'Export contains predictive and multi-timescale memory states');
  assert.ok(Number.isFinite(bundle.network.synapses[0].preSpikeTrace), 'Export contains spike-timing plasticity traces');
  assert.ok(bundle.features.predictiveCoding && bundle.features.stdp && bundle.features.adaptiveRouting && bundle.features.hierarchicalMemory && bundle.features.uncertaintyGate && bundle.features.wireTypeInference, 'Export preserves the five new mechanism flags');
  assert.equal(bundle.formatVersion, '1.2.0', 'Model package schema is incremented');
  assert.equal(bundle.network.fastMemory.length, 8, 'Export includes the universal fast-weight matrix');
  assert.equal(bundle.network.fastMemory[0].length, 8, 'Fast-weight matrix has eight value channels');
  assert.ok(bundle.agentController.network.neurons.length > 0, 'Model package also preserves the embodied agent controller');
  assert.ok(bundle.agentController.environment.efference, 'Model package includes the action-grounded self-model state');
  assert.equal(api.getInvariantReport().fastMemoryFinite, true, 'Fast-weight matrix remains finite');
  const standalone = api.createStandaloneHtml(bundle);
  assert.match(standalone, /const MODEL=/, 'Standalone HTML embeds the frozen model package');
  assert.match(standalone, /class Runtime/, 'Standalone HTML includes an inference runtime');
  assert.match(standalone, /ABSTAIN · REVIEW/, 'Standalone runner includes uncertainty-aware selective output');
  assert.match(standalone, /<\/script><\/body><\/html>$/, 'Standalone HTML has a valid closing script and document');
  const hostileLabel = JSON.parse(JSON.stringify(bundle)); hostileLabel.config.topology = '<script>alert(1)</script>' + String.fromCharCode(39);
  const escapedStandalone = api.createStandaloneHtml(hostileLabel);
  assert.ok(escapedStandalone.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Imported topology labels are HTML escaped in the standalone shell');
  assert.doesNotMatch(standalone, /u003cscript/, 'Standalone HTML contains no malformed script terminator');
  const standaloneScript = standalone.match(/<script>([\s\S]*)<\/script>/);
  assert.ok(standaloneScript, 'Standalone HTML contains an executable script');
  new vm.Script(standaloneScript[1], { filename: 'neuroweave-standalone.js' });
  const runnerElements = new Map();
  const runnerDocument = { getElementById: id => { if (!runnerElements.has(id)) runnerElements.set(id, new FakeElement('div', id)); return runnerElements.get(id); } };
  runnerElements.set('input', new FakeElement('textarea', 'input'));
  runnerElements.get('input').value = '1,' + Array(23).fill(0).join(',');
  const runnerContext = { document: runnerDocument, console, Math, Number, String, JSON, Float64Array, Set, Map, Array, Object, Error };
  vm.runInNewContext(standaloneScript[1], runnerContext, { timeout: 10000, filename: 'neuroweave-standalone.js' });
  await runnerElements.get('step').fire('click');
  assert.match(runnerElements.get('prediction').textContent, /%|ABSTAIN/, 'Standalone model executes an inference step or explicitly abstains');
  assert.match(runnerElements.get('diag').innerHTML, /Raw probability/, 'Selective runner retains the raw probability in diagnostics');
  await runnerElements.get('microPredict').fire('click');
  assert.match(runnerElements.get('microPrediction').textContent, /Next sensory-state estimate/, 'Standalone runner executes the exported frozen Micro-Collective predictor');
  await elements.get('exportModelBtn').fire('click');
  assert.match(elements.get('modelExportStatus').textContent, /Exported model JSON \+ standalone HTML/, 'Model export UI generates both model artifacts');
  await elements.get('exportBtn').fire('click');
  await elements.get('topologyAssayBtn').fire('click');
  assert.match(elements.get('topoStatus').textContent, /7 topologies × 4 seeds complete/, 'Topology assay completes all controlled conditions');
  assert.equal((elements.get('topoRows').innerHTML.match(/<tr>/g) || []).length, 7, 'Topology assay reports all five graph conditions');
  await elements.get('lesionAssayBtn').fire('click');
  assert.match(elements.get('lesionStatus').textContent, /3 conditions × 3 seeds complete/, 'Causal lesion assay completes matched intervention conditions');
  assert.equal((elements.get('lesionRows').innerHTML.match(/<tr>/g) || []).length, 3, 'Lesion assay reports intact, targeted and random conditions');
  elements.get('units').value = '512';
  await elements.get('applyBtn').fire('click');
  assert.equal(api.getSnapshot().neurons, 512, 'Large connectome scale is selectable without changing the original default');
  assert.ok(api.getSnapshot().synapses > 0, '512-neuron connectome creates a non-empty graph');
  elements.get('units').value = '48';
  await elements.get('applyBtn').fire('click');
  assert.equal(api.getSnapshot().neurons, 48, 'Original 48-neuron default can be restored');
  assert.equal(api.getSnapshot().environment.width, 1200, 'Expanded embodied environment exports its larger width');
  assert.equal(api.getSnapshot().environment.foodPatches, 18, 'Expanded ecology retains replenishing food patches');
  await elements.get('ablateBtn').fire('click');
  await elements.get('stepBtn').fire('click');
  assert.match(elements.get('configStatus').textContent, /IDENTITY CONTROL PASS/, 'All-off candidate reproduces baseline outputs');
  console.log('NEUROWEAVE v0.4.0 regression tests passed: v0.2 legacy workflows, 8-seed replication, all-off identity, 31 mechanisms, multimodal sensory streams, WireType-inspired transmitter inference and FPGA mapping export, live Micro-Collective learning and affective neuromodulation, 106 retained v0.2 DOM hooks, all original 19 mechanism ids, compartment invariants, STDP/routing/predictive state, degree-preserving topology, seven-topology, three-condition lesion and three-method sparse sequence-search assays, v1.0/v1.1 import compatibility, v1.2 integrity validation, 512-neuron scale and expanded ecology, and standalone inference.');
  process.exit(0);
})().catch(err => { console.error(err); process.exitCode = 1; });
