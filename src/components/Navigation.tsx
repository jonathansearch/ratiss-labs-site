import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ExternalLink, Menu, Terminal } from 'lucide-react';
import logoUrl from '../assets/images/ratiss_labs_logo.webp';

interface HeaderProps {
  onOpenSidebar?: () => void;
  onOpenTestConsole?: () => void;
}

export function Header({ onOpenSidebar, onOpenTestConsole }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/65 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logoUrl}
            alt="RATISS Labs Logo" 
            className="w-10 h-10 rounded-full border border-white/10"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl font-bold tracking-tight text-white font-mono">RATISS Labs</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300 font-sans">
          <a href="#vision" className="hover:text-cyan-300 transition-colors">Vision</a>
          <a href="#expertise" className="hover:text-cyan-300 transition-colors">Expertise</a>
          <a href="#offres" className="hover:text-cyan-300 transition-colors">Offres</a>
          <a href="#validation" className="hover:text-cyan-300 transition-colors">Validation</a>
          <a href="#depots" className="hover:text-cyan-300 transition-colors">Dépôts</a>
          <a href="#partenariat" className="hover:text-amber-300 text-amber-400 font-medium transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Partenariat 70/30</span>
          </a>
          <a 
            href="#contact"
            className="px-4 py-2 rounded-full border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all text-white font-mono text-xs"
          >
            Protocole & Contact
          </a>
        </nav>

        {/* Action Controls & Sidebar Toggle */}
        <div className="flex items-center gap-2.5">
          {onOpenTestConsole && (
            <button
              onClick={onOpenTestConsole}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 hover:text-white font-mono text-xs transition-all cursor-pointer shadow-sm"
              title="Ouvrir la console d'audit et tests unitaires (Ctrl+K)"
            >
              <Terminal size={14} className="text-cyan-400" />
              <span>Test CLI</span>
              <kbd className="text-[10px] bg-cyan-500/20 px-1 rounded text-cyan-300">⌘K</kbd>
            </button>
          )}

          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm"
              title="Ouvrir la barre latérale de navigation et télémétrie (Ctrl+B)"
            >
              <Menu size={16} className="text-cyan-400" />
              <span className="hidden sm:inline font-semibold">Sidebar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/10 py-20 relative z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={logoUrl}
                alt="RATISS Labs" 
                className="w-10 h-10 rounded-full grayscale hover:grayscale-0 transition-all"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold text-white">RATISS Labs</span>
            </div>
            <p className="text-zinc-300 max-w-sm text-sm leading-relaxed text-readable-body">
              Concevoir des architectures cognitives ancrées dans la réalité topologique et thermodynamique.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/jonathansearch" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/jonathan-evina-quantum" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:jonathan.ratisslabs@zohomail.com" className="text-zinc-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Recherche</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <a href="https://orcid.org/0009-0000-4092-5313" target="_blank" className="hover:text-white flex items-center gap-1">
                    ORCID <ExternalLink size={12} />
                  </a>
                </li>
                <li><a href="#" className="hover:text-white">Publications</a></li>
                <li><a href="#" className="hover:text-white">Livre Blanc</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-medium">Légal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>© 2026 RATISS Labs</li>
                <li><a href="#" className="hover:text-white">Confidentialité</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
