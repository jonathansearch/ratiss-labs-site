import { PROTOCOL_RULES, PROTOCOL_LINK } from '../data/content';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export function ProtocolSection() {
  return (
    <section id="protocole" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <div className="space-y-10 sm:space-y-14">
        <div className="space-y-4 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            02 / Méthode
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white font-sans">
            Le protocole
          </h2>
          <p className="text-base sm:text-lg text-zinc-100 font-normal leading-relaxed">
            Règles scellées et principes d'impartialité guidant chaque exécution d'audit.
          </p>
        </div>

        <div className="divide-y divide-white/15 border-y border-white/20">
          {PROTOCOL_RULES.map((item) => (
            <div
              key={item.code}
              className="py-5 sm:py-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 group px-3 sm:px-5 rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              <div className="shrink-0">
                <span className="inline-block font-mono text-xs font-bold text-cyan-300 px-3 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 group-hover:border-cyan-300 transition-colors">
                  {item.code}
                </span>
              </div>
              <p className="text-base sm:text-lg text-white font-normal leading-relaxed font-sans flex-1">
                {item.rule}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-center sm:justify-start">
          <a
            href={PROTOCOL_LINK.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-xs font-mono font-semibold text-white transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ShieldCheck size={15} className="text-cyan-400" />
            <span>{PROTOCOL_LINK.label}</span>
            <ExternalLink size={13} className="opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}
