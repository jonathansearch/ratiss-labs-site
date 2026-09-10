import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sliders, Menu, Keyboard, ChevronUp, ChevronDown, Sparkles, Building2 } from 'lucide-react';

interface FloatingShortcutsBarProps {
  onOpenTestConsole: () => void;
  onOpenSidebar: () => void;
  onOpenShortcutsModal: () => void;
}

export function FloatingShortcutsBar({
  onOpenTestConsole,
  onOpenSidebar,
  onOpenShortcutsModal,
}: FloatingShortcutsBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 bg-zinc-950/90 border border-white/20 rounded-2xl backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-xs font-mono"
          >
            {/* Quick Test Console Button */}
            <button
              onClick={onOpenTestConsole}
              className="px-3 py-2 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 flex items-center gap-2 transition-all cursor-pointer group shadow-sm"
              title="Ouvrir la console de tests unitaires (Ctrl+K)"
            >
              <Terminal size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-white">Console Tests</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px] text-cyan-200 border border-cyan-500/30">
                Ctrl+K
              </kbd>
            </button>

            {/* Quick Partenariat 70/30 Button */}
            <button
              onClick={() => {
                const el = document.getElementById('partenariat');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 hover:border-amber-400 text-amber-300 flex items-center gap-2 transition-all cursor-pointer group shadow-sm"
              title="Accéder au pacte industriel et aux 5 dépôts (Clé 70/30)"
            >
              <Building2 size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Partenariat 70/30</span>
            </button>

            {/* Quick Parameters Button */}
            <button
              onClick={() => {
                const el = document.getElementById('parametres');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer group shadow-sm"
              title="Accéder aux paramètres topologiques (Ctrl+P)"
            >
              <Sliders size={14} className="text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Paramètres</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-white/10">
                Ctrl+P
              </kbd>
            </button>

            {/* Quick Sidebar Button */}
            <button
              onClick={onOpenSidebar}
              className="px-3 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer group shadow-sm"
              title="Ouvrir le panneau latéral & télémétrie (Ctrl+B)"
            >
              <Menu size={14} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Sidebar</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-white/10">
                Ctrl+B
              </kbd>
            </button>

            {/* Shortcuts Cheatsheet Modal Trigger */}
            <button
              onClick={onOpenShortcutsModal}
              className="px-2.5 py-2 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-300 border border-transparent hover:border-white/10 transition-all cursor-pointer"
              title="Voir la liste complète des raccourcis clavier"
            >
              <Keyboard size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-3 py-1.5 rounded-full bg-zinc-900/85 hover:bg-zinc-800 border border-white/15 text-zinc-400 hover:text-white text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer"
        title={isExpanded ? 'Réduire la barre rapide' : 'Déplier les raccourcis'}
      >
        <Keyboard size={12} className="text-cyan-400" />
        <span>{isExpanded ? 'Raccourcis' : '⌘K Raccourcis'}</span>
        {isExpanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
      </button>
    </div>
  );
}
