import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../lib/animations';

const expertiseItems = [
  {
    num: "01",
    title: "Audit Quantique & Topologique",
    description: "Validation cross-IBM, signature Psig. Analyse approfondie des structures de données quantiques et métriques invariantes."
  },
  {
    num: "02",
    title: "Agents IA Souverains",
    description: "Architecture local-first, ZK-proof, multi-LLM. Systèmes autonomes respectant la confidentialité native sans fuite de données."
  },
  {
    num: "03",
    title: "Reproductibilité Scientifique",
    description: "Code déterministe, artefacts versionnés. Garantir que chaque résultat est vérifiable, traçable et constant par des tiers."
  },
  {
    num: "04",
    title: "Architecture Systèmes Critiques",
    description: "Low-power, offline-first, résilience extrême. Performance maximale dans des environnements souverains hautement contraints."
  }
];

export function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} id="expertise" className="py-32 bg-transparent relative overflow-hidden border-t border-white/5">
      {/* Subtle parallax accent */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute -bottom-20 right-10 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20 space-y-4 text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="text-xs font-mono text-cyan-400 tracking-widest uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>02 / COMPÉTENCES FONDAMENTALES</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight text-readable-title">
            Expertise Fondamentale.
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            Quatre piliers théoriques et expérimentaux garantissant l'ancrage formel, la vérifiabilité des preuves et la robustesse en environnement perturbé.
          </motion.p>

          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-16"
        >
          {expertiseItems.map((item) => (
            <motion.div
              key={item.num}
              variants={fadeInUp}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 group shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {item.num}
                </span>
                <span className="text-zinc-600 text-xs font-mono group-hover:text-cyan-400 transition-colors">
                  DOMAINE VALIDÉ
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-base text-zinc-400 leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
