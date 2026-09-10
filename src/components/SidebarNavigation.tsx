import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Terminal, 
  Sliders, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  Activity, 
  Compass, 
  FileCode,
  Sparkles,
  Keyboard
} from 'lucide-react';

interface SidebarNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTestConsole: () => void;
  onOpenShortcutsModal: () => void;
}

const SECTIONS = [
  { id: 'hero', num: '00', label: 'Accueil / Hero', tag: 'Topologie' },
  { id: 'vision', num: '01', label: 'Vision & Fondations', tag: 'Théorie' },
  { id: 'expertise', num: '02', label: 'Compétences Fondamentales', tag: 'Recherche' },
  { id: 'offres', num: '—', label: '7 Offres Commerciales', tag: 'Consulting' },
  { id: 'validation', num: '03', label: 'Validation Empirique & Data-Viz', tag: 'Hardware' },
  { id: 'depots', num: '—', label: 'Audit des 43 Dépôts Publics', tag: 'Codebase' },
  { id: 'partenariat', num: '08', label: 'Pacte Industriel (Clé 70/30)', tag: 'Fabrication' },
  { id: 'protocole', num: '04', label: 'Protocole Scientifique (4 Étapes)', tag: 'Méthode' },
  { id: 'parametres', num: '07', label: 'Banc d\'Essai & Calibration', tag: 'Simulateur' },
  { id: 'integrite', num: '05', label: 'Intégrité & Délimitations', tag: 'Éthique' },
  { id: 'contact', num: '06', label: 'Contact & Mandat', tag: 'Protocole' },
];

export function SidebarNavigation({
  isOpen,
  onClose,
  onOpenTestConsole,
  onOpenShortcutsModal,
}: SidebarNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle, and Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Sidebar Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-zinc-950/95 border-l border-white/15 backdrop-blur-2xl flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Compass size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span>PANNEAU SOUVERAIN</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      v2.4
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">Navigation & Télémétrie</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer border border-transparent hover:border-white/10"
                title="Fermer la barre latérale (Échap ou Ctrl+B)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Actions Shortcuts Banner */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                  Actions Rapides
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenTestConsole();
                    }}
                    className="p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Terminal size={14} className="text-cyan-400" />
                      <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/20 px-1 rounded">
                        Ctrl+K
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-200">
                      Console Test
                    </div>
                    <div className="text-[10px] text-zinc-400">Benchmark unitaire</div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      const el = document.getElementById('parametres');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 hover:border-white/20 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Sliders size={14} className="text-purple-400" />
                      <span className="text-[9px] font-mono text-zinc-400 bg-zinc-800 px-1 rounded">
                        Ctrl+P
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-200">
                      Paramètres
                    </div>
                    <div className="text-[10px] text-zinc-400">Banc de simulation</div>
                  </button>
                </div>
              </div>

              {/* Navigation Index */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                  Sommaire des Sections
                </span>
                <nav className="space-y-1 font-mono text-xs">
                  {SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => handleNavClick(sec.id)}
                        className={`w-full px-3 py-2.5 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={`text-[10px] ${isActive ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>
                            {sec.num}
                          </span>
                          <span className="truncate">{sec.label}</span>
                        </div>
                        <span className="text-[9px] text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 shrink-0">
                          {sec.tag}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Hardware & QPU Live Telemetry */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Activity size={13} className="text-emerald-400" />
                    <span>TÉLÉMÉTRIE HARDWARE</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                    CONNECTÉ
                  </span>
                </div>

                <div className="space-y-2 text-[11px] text-zinc-300">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Backend Quantique :</span>
                    <span className="font-semibold text-white">IBM Marrakesh (156 Q)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Temps de cohérence T1 :</span>
                    <span className="text-cyan-400">142 µs (nominal)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Topologie persistante :</span>
                    <span className="text-emerald-400">P_sig = 0.7133 (99.87%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Codebase certifiée :</span>
                    <span>43 dépôts audités</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Footer with Shortcuts Link */}
            <div className="p-4 border-t border-white/10 bg-zinc-900/70 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => {
                  onClose();
                  onOpenShortcutsModal();
                }}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <Keyboard size={14} className="text-cyan-400" />
                <span>Raccourcis clavier (Ctrl+/)</span>
              </button>

              <button
                onClick={onClose}
                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                Fermer (Esc)
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
