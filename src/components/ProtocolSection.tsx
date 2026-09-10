import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { PROTOCOL_STEPS } from '../data/labData';
import { FileText, Shield } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../lib/animations';

export function ProtocolSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} id="protocole" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Parallax background accent */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"
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
            <span>04 / PROTOCOLE & MÉTHODOLOGIE SCIENTIFIQUE</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            Plan. Execute. <br />
            <span className="italic font-light text-zinc-300">Certify. Transfer.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            La méthode RATISS transforme une question deep-tech en trajectoire de décision. Pas de boîte noire : une chaîne d'ingénierie formellement vérifiable.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        {/* 4-Step Pipeline Stepper with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROTOCOL_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                onClick={() => setActiveStep(idx)}
                className={`p-6 sm:p-8 rounded-2xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                  isActive
                    ? 'bg-zinc-950 border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
                    : 'bg-zinc-950/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                      isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-zinc-900 text-zinc-500'
                    }`}>
                      {step.number}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                  </div>

                  <h3 className={`text-2xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">
                    {step.outputArtifacts.length} Artefacts clés
                  </span>
                  <span className={isActive ? 'text-cyan-400' : 'text-zinc-600'}>
                    Inspecter →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detailed Inspection of Active Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/10 grid lg:grid-cols-12 gap-8 items-start shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Artefacts & Données de sortie de l'étape {PROTOCOL_STEPS[activeStep].number} ({PROTOCOL_STEPS[activeStep].title}) :
              </span>
              <div className="space-y-2.5">
                {PROTOCOL_STEPS[activeStep].outputArtifacts.map((art, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-white/5 text-xs font-mono text-zinc-300">
                    <FileText size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{art}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 bg-black/60 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                <Shield size={14} />
                <span>Critère de Falsifiabilité Formel</span>
              </div>
              <p className="text-sm font-mono text-zinc-300 leading-relaxed italic">
                « {PROTOCOL_STEPS[activeStep].falsifiability} »
              </p>
              <div className="pt-2 text-[11px] font-mono text-zinc-500">
                Chaque étape doit générer une empreinte cryptographique vérifiable avant le passage à l'étape suivante.
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
