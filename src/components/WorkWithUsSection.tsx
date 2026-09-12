import { motion } from 'motion/react';
import { WORK_WITH_LAB_CONTENT } from '../data/content';
import { ArrowRight, Mail } from 'lucide-react';

export function WorkWithUsSection() {
  return (
    <section id="travailler-avec-le-labo" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <div
        className="relative space-y-6 sm:space-y-8 p-6 sm:p-12 md:p-14 rounded-3xl bg-[#060813] border border-white/20 hover:border-white/30 transition-all shadow-2xl overflow-hidden text-center sm:text-left transform-gpu"
      >
        {/* Ambient subtle light cone */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold uppercase tracking-widest mx-auto sm:mx-0">
            05 / Mandats d'audit
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white font-sans">
            {WORK_WITH_LAB_CONTENT.title}
          </h2>
        </div>

        <p className="text-base sm:text-xl text-zinc-100 font-normal leading-relaxed font-sans max-w-3xl mx-auto sm:mx-0">
          {WORK_WITH_LAB_CONTENT.text}
        </p>

        <div className="pt-2 flex justify-center sm:justify-start">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-sans text-xs font-semibold hover:bg-zinc-100 transition-all shadow-xl cursor-pointer active:scale-95"
          >
            <Mail size={15} />
            <span>Contacter le labo</span>
            <ArrowRight size={14} className="opacity-80" />
          </a>
        </div>
      </div>
    </section>
  );
}
