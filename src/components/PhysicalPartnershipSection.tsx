import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Cpu, Wrench, ShieldCheck, Download, Copy, Check, ExternalLink, 
  Layers, Terminal, FileText, Sparkles, ChevronRight, Zap, Scale, Award 
} from 'lucide-react';
import { PHYSICAL_CONSTRUCTION_PARTNERSHIP } from '../data/labData';
import { staggerContainer, fadeInUp, fadeInScale } from '../lib/animations';

interface PhysicalPartnershipSectionProps {
  onRunTest?: (repoName: string) => void;
}

export function PhysicalPartnershipSection({ onRunTest }: PhysicalPartnershipSectionProps) {
  const [selectedPillar, setSelectedPillar] = useState<string>('ratiss-atelier');
  const [copied, setCopied] = useState(false);
  const [showFullDoc, setShowFullDoc] = useState(false);

  const activePillarData = PHYSICAL_CONSTRUCTION_PARTNERSHIP.pillars.find(
    (p) => p.name === selectedPillar
  ) || PHYSICAL_CONSTRUCTION_PARTNERSHIP.pillars[0];

  const fullContractMarkdown = `# CONTRAT-CADRE DE PARTENARIAT INDUSTRIEL ET DE CONSTRUCTION PHYSIQUE
**RÉFÉRENCE : RATISS-MOU-IND-7030**
**CADRE : CONSORTIUM MATÉRIEL SOUVERAIN (5 PILIERS RATISS)**

---

## 1. PARTIES PRENANTES
1. **LE PARTENAIRE INDUSTRIEL (CONSTRUCTEUR PHYSIQUE)**
   - Rôle : Financement CAPEX, usinage de précision, fabrication salle blanche, supply chain, packaging mécatronique et distribution commerciale mondiale.
   - Quote-part financière : **70 % (soixante-dix pour cent)** des revenus nets générés.

2. **LE LABORATOIRE RATISS / CONCEPTEUR SCIENTIFIQUE**
   - Auteur / Chercheur : Jonathan Evina (ORCID: 0009-0000-4092-5313).
   - Rôle : Propriété intellectuelle, brevets & formulations topologiques (invariance P_sig), microcode temps-réel, suites de tests déterministes, architecture système et certification ZK.
   - Quote-part financière : **30 % (trente pour cent)** des revenus nets générés.

---

## 2. PÉRIMÈTRE TECHNIQUE : LES 5 DÉPÔTS PILIERS
La fabrication physique repose exclusivement sur l'intégration concertée des 5 sous-systèmes logiciels et matériels suivants :

1. **ratiss-qpu-ambient** (Ambiant) : Instrumentation quantique à température ambiante, résonateurs RF et cartes de corrélation de Bell.
2. **ratiss-biolab** (Bio) : Systèmes thermo-optiques, capteurs microfluidiques et régulation thermique de haute précision.
3. **ratiss-atelier** (Atelier) : Plans de fabrication CAO/CAM, usinage mécatronique CNC, bancs d'assemblage et outillage d'instrumentation.
4. **ratiss-hpc** (HPC) : Accélération de calcul physique embarqué, clusters basse consommation et simulation tensorielle.
5. **ratiss-grid** (Grid) : Réseau énergétique résilient, onduleurs durcis et tolérance aux défaillances réseau.

---

## 3. CLÉ DE RÉPARTITION FINANCIÈRE ET MODÈLE ÉCONOMIQUE
- **70% Constructeur / 30% RATISS** s'applique à :
  a) La vente directe de matériel physique instrumenté.
  b) Les contrats de maintenance industrielle et de recalibration annuelle.
  c) Les redevances de licence OEM concédées à des intégrateurs tiers.
- Tout versement est liquidé trimestriellement sur présentation d'un rapport de production certifié.

---

## 4. CONTRÔLE QUALITÉ ET INVARIANCE TOPOLOGIQUE
Chaque pièce matérielle sortant de l'atelier de fabrication doit subir avec succès l'ensemble des 123 tests déterministes du harnais d'essai hermétique (ratiss-runner) avant toute expédition client.

Fait pour valoir protocole d'accord industriel souverain.
`;

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(fullContractMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDoc = () => {
    const blob = new Blob([fullContractMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'RATISS-PROTOCOLE-PARTENARIAT-70-30.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="partenariat" className="py-32 bg-transparent border-t border-white/10 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-20 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-4xl mx-auto space-y-4 flex flex-col items-center"
        >
          <motion.div 
            variants={fadeInUp} 
            className="text-xs font-mono text-amber-400 tracking-widest uppercase inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30"
          >
            <Building2 size={13} className="text-amber-400 animate-pulse" />
            <span>08 / PÔLE INDUSTRIEL & FABRICATION PHYSIQUE</span>
          </motion.div>

          <motion.h2 
            variants={fadeInUp} 
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-readable-title"
          >
            Le Consortium des 5 Piliers. <br />
            <span className="italic font-light text-zinc-300">
              Pacte de Construction Physique (Clé 70/30)
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeInUp} 
            className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-3xl text-readable-body"
          >
            Pour franchir le cap de l'usinage matériel et du déploiement en usine, les 5 dépôts centraux (
            <span className="text-cyan-300 font-mono font-medium">Ambiant</span>,{' '}
            <span className="text-emerald-300 font-mono font-medium">Bio</span>,{' '}
            <span className="text-amber-300 font-mono font-medium">Atelier</span>,{' '}
            <span className="text-purple-300 font-mono font-medium">HPC</span>,{' '}
            <span className="text-blue-300 font-mono font-medium">Grid</span>) 
            sont structurés au sein d'un partenariat clair : <strong className="text-white font-semibold">70% pour le constructeur industriel</strong> (fabrication & CAPEX) et <strong className="text-white font-semibold">30% pour RATISS Labs</strong> (PI, microcode & certification).
          </motion.p>
          <motion.div variants={fadeInUp} className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent pt-2" />
        </motion.div>

        {/* 70 / 30 Revenue Split Visualizer Card */}
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.06)] space-y-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Scale size={14} /> Modèle d'Affaires & Partenariat Équilibré
              </span>
              <h3 className="text-2xl font-bold text-white">Clé de Répartition Contractuelle 70 / 30</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFullDoc(true)}
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileText size={14} />
                <span>Voir le Mémorandum Pro</span>
              </button>
              <button
                onClick={handleDownloadDoc}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Télécharger (.md)</span>
              </button>
            </div>
          </div>

          {/* Graphical Split Bar */}
          <div className="space-y-3">
            <div className="h-6 w-full rounded-full bg-zinc-900 overflow-hidden flex border border-white/10 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-l-full flex items-center justify-center text-[11px] font-mono font-bold text-black"
                style={{ width: '70%' }}
              >
                70% CONSTRUCTEUR INDUSTRIEL
              </div>
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-r-full flex items-center justify-center text-[11px] font-mono font-bold text-black"
                style={{ width: '30%' }}
              >
                30% RATISS LABS
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-3">
              <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    70% PARTENAIRE INDUSTRIEL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    CAPEX & Fabrication
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Prise en charge complète des infrastructures physiques : usinage mécatronique de précision, approvisionnement silicium, assemblage en salle blanche, certification ISO/CEI, chaîne logistique et commercialisation à grande échelle.
                </p>
                <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-amber-400 shrink-0" />
                    <span>Investissements machines & fabrication physique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-amber-400 shrink-0" />
                    <span>Assemblage, conditionnement et SAV client</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    30% RATISS LABS & INVENTEUR
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Propriété Intellectuelle & Logiciel
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Apport technologique exclusif : architecture des circuits, invariance topologique P<sub>sig</sub>, microcode déterministe, firmware embarqué, protocoles de test hermétiques et certification cryptographique zéro-régression.
                </p>
                <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-1">
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-cyan-400 shrink-0" />
                    <span>Licence exclusive de la PI et des algorithmes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-cyan-400 shrink-0" />
                    <span>Maintien des suites de tests et audit de conformité</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The 5 Pillars Repositories Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <Wrench size={20} className="text-amber-400" />
              <span>Les 5 Dépôts de Base pour la Construction Physique</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              Tous hébergés sous licence ouverte et auditables
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PHYSICAL_CONSTRUCTION_PARTNERSHIP.pillars.map((pillar) => {
              const isSelected = selectedPillar === pillar.name;
              return (
                <button
                  key={pillar.name}
                  onClick={() => setSelectedPillar(pillar.name)}
                  className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-4 cursor-pointer relative ${
                    isSelected
                      ? 'bg-zinc-900/90 border-amber-400/60 shadow-[0_0_25px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40'
                      : 'bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                        {pillar.shortName}
                      </span>
                      {pillar.name === 'ratiss-atelier' && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white truncate">{pillar.name}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {pillar.role}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 block truncate">
                      {pillar.tests}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Pillar Focused Blueprint Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-medium">
                  Pilier #{activePillarData.shortName.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {activePillarData.tests}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white">{activePillarData.role}</h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                <strong className="text-amber-300 font-medium">Implication dans la construction physique :</strong> {activePillarData.hardwareFabricationFocus}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href={activePillarData.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <span>Consulter le Dépôt GitHub</span>
                <ExternalLink size={14} className="text-zinc-400" />
              </a>

              {onRunTest && (
                <button
                  onClick={() => onRunTest(activePillarData.name)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-200 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Terminal size={14} className="text-amber-400" />
                  <span>Tester dans la Console</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Document Modal (Doc Pro interactif pour signature ou export) */}
      <AnimatePresence>
        {showFullDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-zinc-900/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-amber-400" />
                    <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider uppercase">
                      Document Officiel de Partenariat
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Protocole d'Accord Industriel (Clé 70/30 - 5 Piliers)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyDoc}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                  </button>
                  <button
                    onClick={handleDownloadDoc}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-black hover:bg-amber-400 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Télécharger</span>
                  </button>
                  <button
                    onClick={() => setShowFullDoc(false)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content - Styled Contract Preview */}
              <div className="p-6 sm:p-8 overflow-y-auto font-mono text-xs text-zinc-300 space-y-6 leading-relaxed bg-black/50">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200 flex items-start gap-3">
                  <ShieldCheck size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Validité & Traçabilité :</strong>
                    Ce document cadre régit l'usinage et la fabrication matérielle des dispositifs physiques basés sur les 5 dépôts piliers du laboratoire RATISS.
                  </div>
                </div>

                <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-300 bg-zinc-950 p-6 rounded-2xl border border-white/5 select-text overflow-x-auto">
                  {fullContractMarkdown}
                </pre>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Réf: RATISS-MOU-IND-7030 · Prêt pour signature</span>
                <button
                  onClick={() => setShowFullDoc(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
