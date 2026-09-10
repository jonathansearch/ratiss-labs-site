import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';

export function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Light parallax for the background glow & visual element
  const yParallaxGlow = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yParallaxImage = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id="vision" className="py-32 bg-transparent relative overflow-hidden">
      {/* Light parallax background accent */}
      <motion.div
        style={{ y: yParallaxGlow }}
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        {/* Centered Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="text-xs font-mono text-cyan-400 tracking-widest uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 / FONDATIONS & VISION</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight text-readable-title">
            Au-delà de la corrélation <span className="text-cyan-400">statistique.</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light text-readable-body">
            Nous ne construisons pas des chatbots. Nous forgeons des systèmes qui comprennent la physique du monde via la topologie persistante (P<sub>sig</sub>) et la régulation thermodynamique native.
          </motion.p>

          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="p-8 sm:p-10 rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/10 space-y-6 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white tracking-tight">
              L'ancrage physique dans le silicium
            </h3>
            <p className="text-zinc-300 leading-relaxed text-readable-body">
              Face aux hallucinations des modèles prédictifs amnésiques, notre formalisme extrait des invariants géométriques formels (codes de torsion, cycles d'homologie $H_0, H_1$) insensibles aux perturbations thermiques.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Physique souveraine</span>
              </div>

              <div className="text-xs font-mono text-zinc-400 border-l border-white/10 pl-3">
                Invariance topologique formelle
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: yParallaxImage }}
            variants={fadeInScale}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            <div className="absolute inset-0 bg-cyan-500/15 blur-[100px] rounded-full" />
            <img 
              src="/src/assets/images/quantum_topology_visual.webp" 
              alt="Visualisation topologique" 
              className="w-full h-full object-cover rounded-3xl relative z-10 border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
