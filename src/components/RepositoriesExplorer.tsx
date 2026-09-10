import { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AUDITED_REPOSITORIES } from '../data/labData';
import { Search, ExternalLink, GitBranch, Play, Terminal, CheckCircle2 } from 'lucide-react';
import { staggerContainer, fadeInUp } from '../lib/animations';

interface RepositoriesExplorerProps {
  onRunTest?: (repoName: string) => void;
}

export function RepositoriesExplorer({ onRunTest }: RepositoriesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBgGlow = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  const categories = ['All', 'Quantum Hardware', 'HPC & Simulation', 'Bio-physique', 'Robotique & Cyber'];

  const filteredRepos = useMemo(() => {
    return AUDITED_REPOSITORIES.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            repo.keyArtifacts.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            repo.hardwareProof.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || repo.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section ref={sectionRef} id="depots" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Subtle parallax accent */}
      <motion.div
        style={{ y: yBgGlow }}
        className="absolute top-1/4 -right-36 w-[450px] h-[450px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
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
            <span>AUDIT CTO / INVENTAIRE DES DÉPÔTS PUBLICS</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-readable-title">
            43 dépôts audités. <br />
            <span className="italic font-light text-zinc-300">Transparence des artefacts.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-zinc-300 font-light leading-relaxed text-readable-body">
            Crawl complet du compte <span className="font-mono text-cyan-300">jonathansearch</span>. Triage des preuves, vérification des branches par défaut et exécution locale des tests unitaires.
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pt-2" />
        </motion.div>

        {/* Overarching Live Test Runner Trigger Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 rounded-3xl bg-zinc-950/90 border border-cyan-500/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-5 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              <Terminal size={22} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                  Console d'Exécution & Reproductibilité des 43 Dépôts
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  100% SUCCÈS
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Lancez en direct les tests unitaires réels, les vérifications QPU et la génération des certificats d'audit.
              </p>
            </div>
          </div>

          <button
            onClick={() => onRunTest?.('ratiss-lewm-integration')}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold text-xs font-mono hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] cursor-pointer"
          >
            <Play size={13} className="fill-black" />
            <span>Ouvrir le terminal de test live</span>
          </button>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10"
        >
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer par dépôt, artifact, job ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Repository Grid with Staggered Entrance */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredRepos.map((repo) => {
            const isHardware = repo.status === 'Hardware documenté';
            const isTests = repo.status === 'Tests locaux validés';

            return (
              <motion.div 
                key={repo.name}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase truncate">
                      {repo.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                      isHardware 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                        : isTests 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {repo.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 min-w-0">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg sm:text-xl font-bold text-white hover:text-cyan-300 transition-colors inline-flex items-center gap-2 truncate min-w-0 max-w-full"
                    >
                      <span className="truncate">{repo.name}</span>
                      <ExternalLink size={14} className="text-zinc-600 hover:text-cyan-300 shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <GitBranch size={12} className="text-zinc-600 shrink-0" />
                    <span className="truncate">Branche: {repo.branch}</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-mono text-zinc-500">Preuve / Données :</span>
                    <p className="text-xs font-mono text-zinc-300 bg-black/50 p-2.5 rounded border border-white/5 leading-relaxed break-words">
                      {repo.hardwareProof}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>{repo.localTests} tests validés</span>
                  </span>

                  <button
                    onClick={() => onRunTest?.(repo.name)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center gap-1.5 transition-all hover:scale-[1.03] cursor-pointer"
                    title={`Lancer les tests de ${repo.name}`}
                  >
                    <Play size={11} className="fill-cyan-300" />
                    <span>Exécuter le test</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12 text-zinc-500 font-mono text-xs">
            Aucun dépôt ne correspond à votre recherche.
          </div>
        )}
      </div>
    </section>
  );
}
