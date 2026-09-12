import { motion } from 'motion/react';
import { HERO_CONTENT } from '../data/content';
import { ExternalLink, FileText, Globe } from 'lucide-react';
import { AuditTerminal } from './AuditTerminal';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 text-center">
      {/* OpenAI-like soft ambient radial aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[420px] bg-gradient-to-tr from-cyan-500/12 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-10 w-full"
      >
        {/* OpenAI-style Research / Index metadata badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 hover:border-white/30 transition-colors backdrop-blur-md max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0" />
            <span className="font-mono text-[11px] tracking-wider text-white uppercase truncate font-medium">
              Audit scientifique exécutable · Yaoundé
            </span>
          </div>
        </motion.div>

        {/* Title: monumental, fluid, tight letter spacing */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] text-white leading-[1.08] font-sans px-2"
        >
          RATISS Labs
          <span className="block text-2xl sm:text-4xl md:text-5xl font-light text-zinc-200 tracking-[-0.02em] mt-2.5 sm:mt-4 font-sans">
            l'audit scientifique exécutable.
          </span>
        </motion.h1>

        {/* Subtitle with elevated white clarity */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl text-zinc-100 font-normal leading-relaxed max-w-3xl mx-auto font-sans px-2 sm:px-0"
        >
          {HERO_CONTENT.subtitle}
        </motion.p>

        {/* Action Pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2 sm:pt-4"
        >
          <motion.a
            href={HERO_CONTENT.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-zinc-100 transition-all inline-flex items-center gap-2 shadow-xl cursor-pointer"
          >
            <FileText size={14} className="text-black" />
            <span>{HERO_CONTENT.links[0].label}</span>
            <ExternalLink size={12} className="opacity-80" />
          </motion.a>

          <motion.a
            href={HERO_CONTENT.links[1].url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Globe size={14} className="text-cyan-400" />
            <span>{HERO_CONTENT.links[1].label}</span>
            <ExternalLink size={12} className="opacity-70" />
          </motion.a>

          <motion.a
            href={HERO_CONTENT.links[2].url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>{HERO_CONTENT.links[2].label}</span>
            <ExternalLink size={12} className="opacity-70" />
          </motion.a>
        </motion.div>

        {/* Interactive Executable Audit Demonstration Terminal */}
        <AuditTerminal />
      </motion.div>
    </section>
  );
}
