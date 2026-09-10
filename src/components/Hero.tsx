import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-10">
        {/* Monospace Badge / Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/15 backdrop-blur-xl text-xs font-mono text-zinc-300 shadow-[0_0_25px_rgba(34,211,238,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-semibold tracking-wider">RATISS LABS</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">LABORATOIRE DE RECHERCHE & CONSULTING DEEP-TECH</span>
        </motion.div>

        {/* Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] text-readable-title">
            L'intelligence physique <br />
            <span className="italic font-light text-cyan-400">souveraine.</span>
          </h1>
        </motion.div>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl text-zinc-200 max-w-3xl mx-auto font-light leading-relaxed text-readable-body"
        >
          Architectures cognitives ancrées dans la réalité topologique et thermodynamique. 
          Audit de code critique, hardware quantique vérifiable et agents scientifiques autonomes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <a
            href="#offres"
            className="group px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Consulter les 7 offres de consulting</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="#validation"
            className="px-6 py-3.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-white/15 text-zinc-200 font-mono text-xs flex items-center gap-2 transition-all hover:border-cyan-400/40"
          >
            <Cpu size={14} className="text-cyan-400" />
            <span>Données Psig & Preuves QPU</span>
          </a>

          <a
            href="#parametres"
            className="px-6 py-3.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-white/15 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
          >
            <Terminal size={14} className="text-zinc-500" />
            <span>Simulateur topologique</span>
          </a>
        </motion.div>

        {/* Real Audit Proof Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1 text-left">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">DÉPÔTS AUDITÉS</div>
            <div className="text-xl font-bold font-mono text-white">43 dépôts</div>
            <div className="text-[11px] text-zinc-400">Crawl public complet</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1 text-left">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">TESTS LOCAUX</div>
            <div className="text-xl font-bold font-mono text-emerald-400">123 validés</div>
            <div className="text-[11px] text-zinc-400">Harnais de test CTO</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1 text-left">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">HARDWARE QPU</div>
            <div className="text-xl font-bold font-mono text-cyan-400">+0.7133</div>
            <div className="text-[11px] text-zinc-400">Spearman IBM Marrakesh</div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/5 space-y-1 text-left">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">INTÉGRITÉ</div>
            <div className="text-xl font-bold font-mono text-zinc-200">Zéro flou</div>
            <div className="text-[11px] text-zinc-400">Sim vs QPU délimité</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute bottom-0 left-1/2 w-px h-16 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent pointer-events-none"
      />
    </section>
  );
}

