import { PLANNED_MILESTONES } from '../data/content';

export function OngoingSection() {
  return (
    <section id="en-cours" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <div className="space-y-10 sm:space-y-14">
        <div className="space-y-4 max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 uppercase tracking-widest">
            04 / Feuille de route
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white font-sans">
            En cours
          </h2>
          <p className="text-base sm:text-lg text-zinc-100 font-normal leading-relaxed">
            Jalons planifiés et modules d'infrastructure en cours d'intégration.
          </p>
        </div>

        <div className="divide-y divide-white/15 border-y border-white/20">
          {PLANNED_MILESTONES.map((item, index) => (
            <div
              key={index}
              className="py-5 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 group px-3 sm:px-5 rounded-xl hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                <div className="shrink-0">
                  <span className="inline-block font-mono text-xs font-bold text-amber-300 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30">
                    {item.horizon}
                  </span>
                </div>
                <p className="text-base sm:text-lg text-white font-normal font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-200 font-mono text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span>{item.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
