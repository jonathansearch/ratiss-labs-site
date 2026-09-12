import { Github, ExternalLink, Menu, FileText, Globe } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar?: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3.5 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-cyan-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src="/ratiss-labs-site/ratiss_labs_logo.webp"
              alt="RATISS Labs Logo" 
              className="relative w-9 h-9 rounded-full border border-white/20 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white font-sans group-hover:text-cyan-300 transition-colors">
              RATISS Labs
            </span>
            <span className="text-[10px] font-mono text-zinc-300 tracking-wider">
              audit scientifique exécutable
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-zinc-100 font-sans tracking-wide">
          <a href="#ce-que-nous-faisons" className="hover:text-cyan-300 transition-colors">Ce que nous faisons</a>
          <a href="#protocole" className="hover:text-cyan-300 transition-colors">Le protocole</a>
          <a href="#registre" className="hover:text-cyan-300 transition-colors">Registre public</a>
          <a href="#travailler-avec-le-labo" className="hover:text-cyan-300 transition-colors">Travailler avec le labo</a>
          <a href="#en-cours" className="hover:text-cyan-300 transition-colors">En cours</a>
          <a 
            href="#contact"
            className="px-4 py-1.5 rounded-full border border-white/25 bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-200 font-mono text-[11px] font-bold shadow-sm active:scale-95"
          >
            Contact
          </a>
        </nav>

        {/* Sidebar Toggle for smaller screens / drawer */}
        <div className="flex items-center gap-2.5">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-mono font-semibold transition-all cursor-pointer active:scale-95"
              title="Ouvrir le menu de navigation"
            >
              <Menu size={15} className="text-cyan-400" />
              <span className="hidden sm:inline font-semibold">Menu</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/15 py-16 sm:py-20 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-start">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img 
                src="/ratiss-labs-site/ratiss_labs_logo.webp"
                alt="RATISS Labs Logo" 
                className="w-10 h-10 rounded-full border border-white/20 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold text-white font-mono">RATISS Labs</span>
            </div>
            <p className="text-zinc-200 max-w-md mx-auto md:mx-0 text-sm leading-relaxed font-sans font-normal">
              Labo indépendant (Yaoundé, Cameroun). Audit d'artefacts de recherche : hashes, identifiants, plausibilité physique, reproductibilité. Rapports publiés avec annexe de reproduction.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://github.com/jonathansearch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://orcid.org/0009-0000-4092-5313"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono font-semibold"
              >
                <Globe size={16} className="text-cyan-400" />
                <span>ORCID</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans text-center sm:text-left">
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm font-mono uppercase tracking-wider">
                Ressources publiques
              </h4>
              <ul className="space-y-2 text-sm text-zinc-200">
                <li>
                  <a
                    href="https://github.com/jonathansearch/ratiss-audit-public"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 inline-flex items-center gap-1 font-medium"
                  >
                    <FileText size={13} />
                    <span>Rapport d'audit public</span>
                    <ExternalLink size={11} className="opacity-70" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jonathansearch/ratiss-audit-public/blob/main/JOURNAL-DEVIATIONS.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 inline-flex items-center gap-1 font-medium"
                  >
                    <span>Journal des déviations</span>
                    <ExternalLink size={11} className="opacity-70" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://orcid.org/0009-0000-4092-5313"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-300 inline-flex items-center gap-1 font-medium"
                  >
                    <span>Registre ORCID</span>
                    <ExternalLink size={11} className="opacity-70" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm font-mono uppercase tracking-wider">
                Contact & Mentions
              </h4>
              <ul className="space-y-2 text-sm text-zinc-200">
                <li className="font-medium text-white">Yaoundé, Cameroun</li>
                <li>
                  <a
                    href="mailto:jonathan.ratisslabs@zohomail.com"
                    className="text-cyan-300 hover:text-white font-mono text-xs font-semibold break-all underline underline-offset-2"
                  >
                    jonathan.ratisslabs@zohomail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/jonathansearch/ratiss-audit-public"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4 decoration-zinc-500 font-medium"
                  >
                    Via issues / discussions GitHub
                  </a>
                </li>
                <li className="pt-2 text-xs font-mono text-zinc-400">
                  © 2026 RATISS Labs — Jonathan Evina
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
