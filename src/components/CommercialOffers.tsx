import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { COMMERCIAL_OFFERS } from '../data/labData';
import { ShieldCheck, ArrowRight, Check, Building2 } from 'lucide-react';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';

export function CommercialOffers() {
  const [selectedOfferId, setSelectedOfferId] = useState<string>(COMMERCIAL_OFFERS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const currentOffer = COMMERCIAL_OFFERS.find(o => o.id === selectedOfferId) || COMMERCIAL_OFFERS[0];

  return (
    <section ref={sectionRef} id="offres" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Subtle parallax background glow */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"
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
            <span>SERVICES & TRANSFERT / MATRICE CONSULTING</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            Sept offres <br />
            <span className="italic font-light text-zinc-300">cadrées et auditées.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            Positionnement en cabinet de consulting deep-tech souverain : audit de haut niveau, gouvernance CTO, formation avancée et architectures critiques.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        {/* Interactive Offer Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex overflow-x-auto pb-2 gap-2 border-b border-white/10 scrollbar-none"
        >
          {COMMERCIAL_OFFERS.map((offer) => (
            <button
              key={offer.id}
              onClick={() => setSelectedOfferId(offer.id)}
              className={`px-4 py-3 rounded-t-xl text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 border-t border-x ${
                selectedOfferId === offer.id
                  ? 'bg-zinc-950 text-cyan-300 border-white/20 border-b-2 border-b-cyan-400'
                  : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/40'
              }`}
            >
              {offer.title}
            </button>
          ))}
        </motion.div>

        {/* Active Offer Detail Card with Smooth Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOffer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 grid lg:grid-cols-12 gap-10 items-start shadow-[0_0_50px_rgba(0,0,0,0.6)]"
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  Offre Commerciale Cadrée
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {currentOffer.title}
                </h3>
                <p className="text-base text-zinc-300 font-light">
                  {currentOffer.tagline}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/70 border border-white/5 space-y-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                  Formulation commerciale auditée :
                </span>
                <p className="text-sm font-mono text-zinc-300 italic">
                  « {currentOffer.recommendedFormulation} »
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold block">
                  Livrables et engagements :
                </span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentOffer.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-900/60 p-3 rounded-lg border border-white/5">
                      <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 bg-black/60 p-6 sm:p-8 rounded-2xl border border-white/5">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Preuves de base documentées :
                </span>
                <p className="text-xs font-mono text-zinc-300 bg-zinc-900/80 p-3 rounded border border-white/5 break-words">
                  {currentOffer.baseProofs}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Niveau d'audit actuel :
                </span>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded border border-cyan-500/30">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  <span>{currentOffer.currentLevel}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Public cible :
                </span>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Building2 size={14} className="text-zinc-600 shrink-0" />
                  <span>{currentOffer.audience}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-xs font-mono flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <span>Demander un protocole pour cette offre</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
