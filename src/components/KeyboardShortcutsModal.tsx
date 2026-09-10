import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Terminal, Sliders, Menu, Sparkles, Navigation, CornerDownLeft, ArrowDown, ArrowUp } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTestConsole: () => void;
  onOpenSidebar: () => void;
  onToggleParticleMode?: () => void;
}

interface ShortcutItem {
  keys: string[];
  label: string;
  description: string;
  category: 'Navigation' | 'Outils Scientifiques' | 'Système';
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ['Ctrl', 'K'],
    label: 'Console de Test Unitaire',
    description: 'Ouvre le terminal de test hermétique et recalibration',
    category: 'Outils Scientifiques',
  },
  {
    keys: ['Ctrl', 'P'],
    label: 'Paramètres Topologiques',
    description: 'Focalise le banc d\'expérimentation et simulation Psig',
    category: 'Outils Scientifiques',
  },
  {
    keys: ['Ctrl', 'B'],
    label: 'Barre Latérale (Sidebar)',
    description: 'Déploie le menu souverain et la télémétrie QPU',
    category: 'Navigation',
  },
  {
    keys: ['Ctrl', 'M'],
    label: 'Morphing 3D',
    description: 'Alterne les variétés topologiques du background Three.js',
    category: 'Système',
  },
  {
    keys: ['1'],
    label: 'Section 01 : Vision',
    description: 'Défilement direct vers les fondations physiques',
    category: 'Navigation',
  },
  {
    keys: ['2'],
    label: 'Section 02 : Expertise',
    description: 'Défilement direct vers les compétences fondamentales',
    category: 'Navigation',
  },
  {
    keys: ['3'],
    label: 'Section 03 : Validation',
    description: 'Défilement direct vers la suite de données réelles',
    category: 'Navigation',
  },
  {
    keys: ['4'],
    label: 'Section 04 : Protocole',
    description: 'Défilement direct vers le pipeline en 4 étapes',
    category: 'Navigation',
  },
  {
    keys: ['5'],
    label: 'Section 08 : Partenariat 70/30',
    description: 'Défilement direct vers le pacte de construction physique (5 dépôts)',
    category: 'Navigation',
  },
  {
    keys: ['Esc'],
    label: 'Sortie / Fermeture',
    description: 'Ferme la console active, la sidebar ou les popups',
    category: 'Système',
  },
];

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  onOpenTestConsole,
  onOpenSidebar,
  onToggleParticleMode,
}: KeyboardShortcutsModalProps) {
  // Global Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input, textarea or select
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl+K / Cmd+K: Open Test Execution Console
      if (cmdOrCtrl && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        onOpenTestConsole();
        return;
      }

      // Ctrl+P / Cmd+P: Jump to Parameters
      if (cmdOrCtrl && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        const el = document.getElementById('parametres');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // Ctrl+B / Cmd+B: Toggle Sidebar
      if (cmdOrCtrl && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        onOpenSidebar();
        return;
      }

      // Ctrl+/ or ?: Open shortcuts modal
      if ((cmdOrCtrl && e.key === '/') || (e.key === '?' && !e.shiftKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
        return;
      }

      // Number keys 1-4 for instant section jump (without modifier)
      if (!cmdOrCtrl && !e.altKey && !e.shiftKey) {
        if (e.key === '1') {
          document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '2') {
          document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '3') {
          document.getElementById('validation')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '4') {
          document.getElementById('protocole')?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === '5') {
          document.getElementById('partenariat')?.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Escape key to close
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenTestConsole, onOpenSidebar]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-2xl bg-zinc-950 border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.2)] flex flex-col max-h-[85vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <Keyboard size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">RACCOURCIS CLAVIER</h3>
                  <p className="text-xs text-zinc-400">Navigation fluide et commandes rapides</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              >
                <span>Fermer (Esc)</span>
                <X size={14} />
              </button>
            </div>

            {/* Shortcuts Grid */}
            <div className="p-6 overflow-y-auto space-y-6">
              {['Outils Scientifiques', 'Navigation', 'Système'].map((cat) => {
                const items = SHORTCUTS.filter((s) => s.category === cat);
                return (
                  <div key={cat} className="space-y-2.5">
                    <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold block">
                      {cat}
                    </span>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-cyan-500/30 transition-all flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-white">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-zinc-400 leading-tight">
                              {item.description}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {item.keys.map((k, kIdx) => (
                              <kbd
                                key={kIdx}
                                className="px-2 py-1 rounded-lg bg-zinc-800 border border-white/15 text-[11px] font-mono font-bold text-cyan-300 shadow-sm min-w-[24px] text-center"
                              >
                                {k}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Tip */}
            <div className="px-6 py-3 bg-zinc-900/60 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Conseil : Pressez <kbd className="text-cyan-300 font-bold">Ctrl+K</kbd> n'importe où pour lancer un test.</span>
              </span>
              <span className="text-zinc-500 text-[11px]">RATISS CLI v2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
