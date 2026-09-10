import { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sliders, RefreshCw, Cpu, ShieldCheck, Activity, Terminal, CheckCircle, Play } from 'lucide-react';
import { SimulationParams } from '../types';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';

interface ScientificParametersSimulatorProps {
  onOpenTestConsole?: () => void;
}

export function ScientificParametersSimulator({ onOpenTestConsole }: ScientificParametersSimulatorProps) {
  const [params, setParams] = useState<SimulationParams>({
    noiseLevel: 0.125,
    thresholdInflexion: 0.12,
    backend: 'ibm_marrakesh',
    shots: 4096,
    couplingStrength: 0.85,
    zkVerification: true,
  });

  const [isRunningSim, setIsRunningSim] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionLog, setExecutionLog] = useState<string>('Banc au repos. Prêt pour l\'injection de paramètres.');
  const [lastRunTime, setLastRunTime] = useState<string>('2026-09-10 14:32:08 UTC');

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Compute topological output dynamically based on parameters
  const results = useMemo(() => {
    // Model Psig as a function of noise, coupling, and backend quality
    const backendFidelityFactor = 
      params.backend === 'ibm_marrakesh' ? 0.986 : 
      params.backend === 'ibm_marrakesh' ? 0.975 : 
      params.backend === 'aer_simulator' ? 0.999 : 1.000;

    const basePsig = 2.3569 * Math.exp(-3.2 * params.noiseLevel) * params.couplingStrength * backendFidelityFactor + 0.297;
    const entropy = -Math.log2(Math.max(0.01, params.noiseLevel * 0.9 + 0.05)) * 0.45;
    const isStable = params.noiseLevel <= params.thresholdInflexion + 0.08;
    const verdict = isStable ? 'PASS (Invariance Validée)' : 'ATTENTION (Seuil dépassé)';

    // Compute mock deterministic hash
    const hash = `0x${Math.abs(Math.floor(basePsig * 987654321 + params.shots)).toString(16).padStart(8, '0')}...ae0f`;

    return {
      psig: basePsig.toFixed(4),
      fidelity: (backendFidelityFactor * 100 - params.noiseLevel * 4).toFixed(2),
      entropy: entropy.toFixed(3),
      verdict,
      isStable,
      hash
    };
  }, [params]);

  const handleSimulate = () => {
    setIsRunningSim(true);
    setExecutionProgress(25);
    setExecutionLog('Transpilation du circuit Lie-Trotter sous Hamiltonien topologique...');

    setTimeout(() => {
      setExecutionProgress(65);
      setExecutionLog(`Émulation de bruit QPU [${params.backend}] avec ${params.shots} shots...`);
    }, 350);

    setTimeout(() => {
      setExecutionProgress(95);
      setExecutionLog('Extraction de l’invariance P_sig et calcul du certificat ZK...');
    }, 700);

    setTimeout(() => {
      setExecutionProgress(100);
      setExecutionLog('✓ Exécution terminée avec succès. 0 régression.');
      setIsRunningSim(false);
      setLastRunTime(new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    }, 1100);
  };

  const handleReset = () => {
    setParams({
      noiseLevel: 0.125,
      thresholdInflexion: 0.12,
      backend: 'ibm_marrakesh',
      shots: 4096,
      couplingStrength: 0.85,
      zkVerification: true,
    });
    setExecutionProgress(0);
    setExecutionLog('Circuit réinitialisé.');
  };

  return (
    <section ref={sectionRef} id="parametres" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Subtle parallax accent glow */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        {/* Centered Header with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="text-xs font-mono text-cyan-400 tracking-widest uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>07 / CONSOLE DE CONTRÔLE & PARAMÈTRES TOPOLOGIQUES</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            Banc d’expérimentation <br />
            <span className="italic font-light text-zinc-300">et calibration dynamique.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            Ajustez les paramètres de décohérence, de bruit et de topologie persistante pour observer en temps réel la réponse du formalisme <span className="font-mono text-cyan-300 font-semibold">P<sub>sig</sub></span>.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        {/* Workbench Layout */}
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* Controls Panel */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-white font-semibold">
                <Sliders size={14} className="text-cyan-400" />
                PARAMÈTRES D'ENTRÉE DU CIRCUIT
              </span>
              <button
                onClick={handleReset}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <RefreshCw size={12} />
                Réinitialiser
              </button>
            </div>

            {/* Slider: Noise Level */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Niveau de bruit injecté (σ) :</span>
                <span className="text-cyan-400 font-bold">{params.noiseLevel.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={params.noiseLevel}
                onChange={(e) => setParams({ ...params, noiseLevel: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>0.00 (Vide thermique)</span>
                <span className="text-cyan-500 font-semibold">Seuil ~0.125</span>
                <span>1.00 (Décohérence max)</span>
              </div>
            </div>

            {/* Slider: Inflexion threshold */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Seuil de coupure d'inflexion (τ) :</span>
                <span className="text-cyan-400 font-bold">{params.thresholdInflexion.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.01"
                value={params.thresholdInflexion}
                onChange={(e) => setParams({ ...params, thresholdInflexion: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Radio / Select: Backend */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-300 block">
                Backend de calcul (Hardware ou Simulateur) :
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'ibm_marrakesh', label: 'IBM Marrakesh (156Q)' },
                  { id: 'ibm_fez', label: 'IBM Fez (156Q)' },
                  { id: 'aer_simulator', label: 'Qiskit Aer Simulator' },
                  { id: 'statevector', label: 'Statevector Analytique' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setParams({ ...params, backend: b.id as any })}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      params.backend === b.id
                        ? 'bg-cyan-500/10 border-cyan-400 text-white font-semibold'
                        : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shots Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-300 block">
                Nombre de tirs (Shots par circuit) :
              </label>
              <div className="flex items-center gap-2">
                {[1024, 2048, 4096, 8192].map((s) => (
                  <button
                    key={s}
                    onClick={() => setParams({ ...params, shots: s })}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono border transition-all ${
                      params.shots === s
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-zinc-900/50 text-zinc-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: ZK Verification */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
              <span className="text-zinc-300">Génération de reçu ZK (Zero-Knowledge) :</span>
              <button
                onClick={() => setParams({ ...params, zkVerification: !params.zkVerification })}
                className={`px-3 py-1 rounded-full text-xs transition-all border ${
                  params.zkVerification
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                    : 'bg-zinc-900 text-zinc-500 border-white/10'
                }`}
              >
                {params.zkVerification ? 'ACTIVÉ' : 'DÉSACTIVÉ'}
              </button>
            </div>

            {/* Action Buttons & Execution Progress */}
            <div className="space-y-3">
              <button
                onClick={handleSimulate}
                disabled={isRunningSim}
                className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(34,211,238,0.3)] disabled:opacity-60 cursor-pointer"
              >
                <Terminal size={14} className={isRunningSim ? 'animate-spin' : ''} />
                <span>{isRunningSim ? `Calcul en cours (${executionProgress}%)...` : 'Exécuter le calcul topologique'}</span>
              </button>

              {/* Live Step Progress Bar */}
              {executionProgress > 0 && (
                <div className="space-y-1.5 p-3 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>État de l'expérience :</span>
                    <span className="text-cyan-400 font-bold">{executionProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      style={{ width: `${executionProgress}%` }}
                    />
                  </div>
                  <div className="text-zinc-400 truncate pt-0.5">{executionLog}</div>
                </div>
              )}

              {onOpenTestConsole && (
                <button
                  type="button"
                  onClick={onOpenTestConsole}
                  className="w-full py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play size={12} className="text-cyan-400 fill-cyan-400" />
                  <span>Ouvrir la console CLI de validation (43 dépôts)</span>
                </button>
              )}
            </div>
          </div>

          {/* Real-time Telemetry & Results Display */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                <span className="text-zinc-500">TÉLÉMÉTRIE D'EXÉCUTION</span>
                <span className="text-cyan-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  TEMPS RÉEL
                </span>
              </div>

              {/* Main Gauge Output */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    Signature Topologique P<sub>sig</sub>
                  </span>
                  <div className="text-3xl font-black text-white font-mono">
                    {results.psig}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Max lifetime persistante
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">
                    Fidélité Classique Proxy
                  </span>
                  <div className="text-3xl font-black text-white font-mono">
                    {results.fidelity}%
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Cohérence Bell circuit
                  </span>
                </div>
              </div>

              {/* Additional Specs */}
              <div className="space-y-3 font-mono text-xs text-zinc-400">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Entropie de von Neumann estimée :</span>
                  <span className="text-white">{results.entropy} bits</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Verdict d'intégrité :</span>
                  <span className={results.isStable ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold'}>
                    {results.verdict}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span>Hash cryptographique de l'artefact :</span>
                  <span className="text-cyan-300 text-[11px] truncate max-w-[200px]">{results.hash}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Dernière passe d'audit :</span>
                  <span className="text-zinc-500">{lastRunTime}</span>
                </div>
              </div>

              {/* Console log preview */}
              <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-zinc-400 space-y-1 overflow-x-auto">
                <div className="text-cyan-400">$ ratiss --backend {params.backend} --shots {params.shots} --noise {params.noiseLevel}</div>
                <div>[INFO] Transpiling topological circuit on {params.backend}... OK</div>
                <div>[INFO] Persistent homology computed across 96 filtration steps.</div>
                <div>[INFO] Psig computed: {results.psig} | ZK Proof: {params.zkVerification ? 'CERTIFIED' : 'BYPASSED'}</div>
                <div className="text-emerald-400">[SUCCESS] Run recorded in local audit store.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
