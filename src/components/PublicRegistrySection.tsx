import { REGISTRY_ITEMS } from '../data/content';
import { ExternalLink } from 'lucide-react';

export function PublicRegistrySection() {
  return (
    <section id="registre" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <div className="space-y-10 sm:space-y-14">
        <div className="space-y-4 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            03 / Traçabilité
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white font-sans">
            Registre public
          </h2>
          <p className="text-base sm:text-lg text-zinc-100 font-normal leading-relaxed">
            Index exhaustif des artefacts audités, dépôts de reproduction, correctifs et notices publiques.
          </p>
        </div>

        <div className="divide-y divide-white/15 border-y border-white/20">
          {REGISTRY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group px-3 sm:px-5 rounded-xl hover:bg-white/[0.04] transition-all"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-xl font-medium text-white group-hover:text-cyan-300 transition-colors inline-flex items-center gap-2 font-sans break-words"
                >
                  <span>{item.title}</span>
                  <ExternalLink size={14} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {item.date && (
                    <span className="text-zinc-300 font-medium">{item.date} ·</span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="break-words">{item.status}</span>
                  </span>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-xs font-mono font-semibold text-white transition-all shadow-sm"
                >
                  <span>Consulter</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
