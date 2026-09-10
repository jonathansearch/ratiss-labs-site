import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { INTEGRITY_STATEMENTS } from '../data/labData';
import { XCircle } from 'lucide-react';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';

export function IntegritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} id="integrite" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Subtle parallax background glow */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/2 -right-36 w-96 h-96 bg-red-500/5 blur-[150px] rounded-full pointer-events-none"
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
            <span>05 / INTÉGRITÉ SCIENTIFIQUE & DÉLIMITATION STRICTE</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            Nous savons ce que nous <br />
            <span className="italic font-light text-zinc-300">ne revendiquons pas.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            En deep-tech, la crédibilité repose sur la précision des frontières expérimentales. Nos audits ne tolèrent aucun flou entre théorie, simulation et silicium.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        {/* 4 Integrity Statements Grid with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {INTEGRITY_STATEMENTS.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="p-8 rounded-3xl bg-zinc-950 border border-white/10 hover:border-red-500/30 transition-all space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-red-400 transition-colors">
                  RÈGLE D'ÉTIQUE {item.id}
                </span>
                <XCircle size={18} className="text-zinc-600 group-hover:text-red-400 transition-colors" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Statement Banner with Entrance Animation */}
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="p-8 sm:p-10 rounded-3xl bg-zinc-950/70 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">
              Garantie d'auditabilité pour comités de direction et investisseurs
            </h4>
            <p className="text-sm text-zinc-400 font-light max-w-2xl">
              Chaque mandat d'audit ou de développement est remis avec un manifeste exhaustif des dépendances, des hashs Git, et la séparation formelle des niveaux de preuve (1 à 8).
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs font-mono shrink-0 hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Demander la charte d'audit ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
