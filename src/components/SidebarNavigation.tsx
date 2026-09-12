import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Menu } from 'lucide-react';

interface SidebarNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  { id: 'hero', num: '01', label: 'Accueil' },
  { id: 'ce-que-nous-faisons', num: '02', label: 'Ce que nous faisons' },
  { id: 'protocole', num: '03', label: 'Le protocole' },
  { id: 'registre', num: '04', label: 'Registre public' },
  { id: 'travailler-avec-le-labo', num: '05', label: 'Travailler avec le labo' },
  { id: 'en-cours', num: '06', label: 'En cours' },
  { id: 'contact', num: '07', label: 'Contact' },
];

export function SidebarNavigation({ isOpen, onClose }: SidebarNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[380px] bg-black border-l border-white/20 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-white/15 flex items-center justify-between bg-white/[0.02]">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-white tracking-tight font-mono">
                  RATISS Labs
                </span>
                <p className="text-xs text-zinc-300 font-mono">Navigation</p>
              </div>

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white font-mono text-xs font-semibold transition-all cursor-pointer"
                title="Fermer le menu"
              >
                <X size={15} />
                <span>Fermer</span>
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <nav className="space-y-1 font-mono text-xs">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleNavClick(sec.id)}
                      className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-white/10 text-cyan-300 font-bold border border-cyan-500/40'
                          : 'text-zinc-200 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400 text-[10px] font-semibold">{sec.num}</span>
                        <span className="font-semibold">{sec.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                  Registres & Dépôts
                </span>
                <div className="space-y-2 font-mono text-xs">
                  <a
                    href="https://github.com/jonathansearch/ratiss-audit-public"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                  >
                    <span>Rapport d'audit public</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                  <a
                    href="https://orcid.org/0009-0000-4092-5313"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                  >
                    <span>Registre ORCID</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                  <a
                    href="https://github.com/jonathansearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                  >
                    <span>Dépôts GitHub</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer & Close action */}
            <div className="p-5 border-t border-white/15 bg-black space-y-3">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <X size={15} />
                <span>Fermer le menu</span>
              </button>
              <div className="text-[11px] font-mono text-zinc-400 text-center">
                RATISS Labs — Yaoundé, Cameroun
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
