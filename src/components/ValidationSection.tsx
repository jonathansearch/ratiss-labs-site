import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CALIBRATION_POINTS } from '../data/labData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { ExternalLink, Info, ShieldCheck, Activity, Cpu, CheckCircle, Sparkles, Layers } from 'lucide-react';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';
import { BlochSphereVisualizer } from './BlochSphereVisualizer';
import { PersistenceDiagramChart } from './PersistenceDiagramChart';
import { RadarHardwareChart } from './RadarHardwareChart';

export function ValidationSection() {
  const [showTheorique, setShowTheorique] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(0.125);
  const [activeGraphicTab, setActiveGraphicTab] = useState<'bloch' | 'persistence' | 'radar'>('bloch');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBgGlow = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} id="validation" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Light parallax ambient light */}
      <motion.div
        style={{ y: yBgGlow }}
        className="absolute top-1/3 -right-28 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        {/* Centered Section Header with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="text-xs font-mono text-cyan-400 tracking-widest uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>03 / VALIDATION EMPIRIQUE & DATA-VIZ</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            Des données réelles. <br />
            <span className="italic font-light text-zinc-300">Des limites visibles.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            Le laboratoire sépare strictement code/test, validation analytique, simulation et hardware documenté. Calibration <span className="text-cyan-300 font-mono font-semibold">P<sub>sig</sub></span> issue du dépôt public{' '}
            <a 
              href="https://github.com/jonathansearch/ratiss-lewm-integration" 
              target="_blank" 
              rel="noreferrer" 
              className="text-white underline decoration-cyan-400 underline-offset-4 hover:text-cyan-300 font-medium"
            >
              ratiss-lewm-integration ↗
            </a>.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        {/* Chart + Aside Layout with Staggered Entrance */}
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Chart Shell */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-between space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-semibold tracking-wider">CALIBRATION SENSIBILITÉ P<sub>sig</sub></span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">96 POINTS · GRAINE 42</span>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white">
                  <input
                    type="checkbox"
                    checked={showTheorique}
                    onChange={(e) => setShowTheorique(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Courbe théorique</span>
                </label>
              </div>
            </div>

            {/* Recharts interactive stage */}
            <div className="w-full h-[360px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CALIBRATION_POINTS} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="niveau" 
                    stroke="#71717a" 
                    fontSize={11}
                    fontFamily="monospace"
                    tickLine={false}
                    axisLine={{ stroke: '#27272a' }}
                    tickFormatter={(v) => `σ ${v.toFixed(2)}`}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={11}
                    fontFamily="monospace"
                    tickLine={false}
                    axisLine={{ stroke: '#27272a' }}
                    domain={[0, 2.6]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#09090b', 
                      borderColor: '#27272a', 
                      borderRadius: '12px',
                      color: '#f4f4f5',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      boxShadow: '0 0 20px rgba(0,0,0,0.8)'
                    }}
                    formatter={(value: any, name: string) => [
                      `${Number(value).toFixed(4)}`,
                      name === 'p_sig' ? 'Psig Mesuré' : 'Psig Théorique'
                    ]}
                    labelFormatter={(label) => `Niveau de Bruit (σ) : ${label}`}
                  />
                  <ReferenceLine 
                    x={0.125} 
                    stroke="#22d3ee" 
                    strokeDasharray="4 4" 
                    label={{ value: "Inflexion ~0.125", fill: "#22d3ee", fontSize: 11, position: "top" }} 
                  />
                  {showTheorique && (
                    <Line 
                      type="monotone" 
                      dataKey="theorique" 
                      stroke="#52525b" 
                      strokeWidth={1.5}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="p_sig" 
                    stroke="url(#lineGlow)" 
                    strokeWidth={2.5}
                    dot={{ fill: '#22d3ee', strokeWidth: 2, r: 4, stroke: '#09090b' }}
                    activeDot={{ r: 7, stroke: '#22d3ee', strokeWidth: 2, fill: '#ffffff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/10 pt-3">
              <span>BRUIT / NIVEAU SIGMA</span>
              <span className="text-cyan-400">P<sub>sig</sub> MAX LIFETIME</span>
            </div>
          </div>

          {/* Aside Observation */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                OBSERVATION 01 · SEUIL D'INFLEXION
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                ≈ 0.125
              </div>
              <h3 className="text-lg font-bold text-zinc-200">
                Point d’inflexion candidat
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Le seuil est un candidat de calibration. Le dépôt indique qu’il doit encore être confirmé sur des embeddings LeWM réels avant d’être injecté comme politique permanente.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Source versionnée · Rapport de sensibilité</span>
              </div>
              <a
                href="https://github.com/jonathansearch/ratiss-lewm-integration"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white"
              >
                <span>Examiner le fichier de calibration</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Additional Interactive Scientific Graphics Suite */}
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <Sparkles size={13} />
                <span>OBSERVATOIRE SCIENTIFIQUE COMPLÉMENTAIRE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
                Visualisations topologiques et quantiques
              </h3>
            </div>

            {/* Graphics Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveGraphicTab('bloch')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeGraphicTab === 'bloch'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sphère de Bloch 3D
              </button>
              <button
                onClick={() => setActiveGraphicTab('persistence')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeGraphicTab === 'persistence'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Homologie Persistante
              </button>
              <button
                onClick={() => setActiveGraphicTab('radar')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeGraphicTab === 'radar'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Radar QPU 6-Axes
              </button>
            </div>
          </div>

          {/* Render Active Scientific Graphic */}
          <div>
            {activeGraphicTab === 'bloch' && <BlochSphereVisualizer />}
            {activeGraphicTab === 'persistence' && <PersistenceDiagramChart />}
            {activeGraphicTab === 'radar' && <RadarHardwareChart />}
          </div>
        </motion.div>

        {/* 3 Real Provenance Cards with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Hardware Documenté */}
          <motion.div variants={fadeInUp} className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>HARDWARE DOCUMENTÉ</span>
              <Cpu size={15} className="text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              +0.7133
            </div>
            <p className="text-sm text-zinc-400 font-light">
              Spearman · LCT monotonicity · IBM Marrakesh · 3 runs moyennés (4096 shots).
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/jonathansearch/RATISS-ODV-AEON"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                RATISS-ODV-AEON ↗
              </a>
            </div>
          </motion.div>

          {/* Tests Locaux */}
          <motion.div variants={fadeInUp} className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>TESTS LOCAUX VALIDÉS</span>
              <CheckCircle size={15} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              123
            </div>
            <p className="text-sm text-zinc-400 font-light">
              Tests unitaires et d’intégration passés avec succès sur 6 dépôts pendant l’audit CTO.
            </p>
            <div className="pt-2">
              <a
                href="#depots"
                className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                Consulter les 43 dépôts audités ↗
              </a>
            </div>
          </motion.div>

          {/* Simulation Explicite */}
          <motion.div variants={fadeInUp} className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>SIMULATION EXPLICITE</span>
              <Info size={15} className="text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              FALSE
            </div>
            <p className="text-sm text-zinc-400 font-light">
              <code className="text-cyan-300 font-mono text-xs">validated_on_hardware=false</code> dans COSMOS. La frontière est conservée et documentée.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/jonathansearch/QPU-Ratiss-COSMOS"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                QPU-Ratiss-COSMOS ↗
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Methodological Boundary Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 rounded-2xl bg-zinc-950/80 border border-white/15 space-y-3"
        >
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
            <ShieldCheck size={15} />
            <span>NOTE DE MÉTHODE & INTÉGRITÉ DES REVENDICATIONS</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed font-light">
            La calibration PushT publiée ici correspond à une analyse de sensibilité déterministe sur des points synthétiques. Elle ne revendique pas un rollout PushT complet ni une campagne de 25 650 frames, car cette preuve n’a pas été retrouvée dans les artefacts audités. Conformément à notre charte, nous ne publions que ce qui est traçable dans le code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
