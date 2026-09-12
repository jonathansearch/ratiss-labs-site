import { useState } from 'react';
import { motion } from 'motion/react';
import { CONTACT_CONTENT } from '../data/content';
import { ExternalLink, MessageSquare, Mail, Copy, Check } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_CONTENT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto">
      <div
        className="relative space-y-8 p-6 sm:p-12 md:p-14 rounded-3xl bg-[#060813] border border-white/20 hover:border-white/30 transition-all shadow-2xl overflow-hidden text-center sm:text-left transform-gpu"
      >
        {/* Ambient subtle light cone */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold uppercase tracking-widest mx-auto sm:mx-0">
            06 / Contact
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white font-sans">
            Contact & Mandats
          </h2>
        </div>

        <p className="text-base sm:text-xl text-zinc-100 font-normal leading-relaxed font-sans max-w-3xl mx-auto sm:mx-0">
          {CONTACT_CONTENT.text}
        </p>

        {/* Email Pro Highlight Box */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.05] border border-white/20 max-w-xl mx-auto sm:mx-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
              <Mail size={20} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                Email professionnel
              </div>
              <a
                href={`mailto:${CONTACT_CONTENT.email}`}
                className="text-base sm:text-lg font-mono text-white hover:text-cyan-300 transition-colors font-bold break-all"
              >
                {CONTACT_CONTENT.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-mono font-semibold text-white transition-all cursor-pointer active:scale-95"
              title="Copier l'adresse email"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-300" />
                  <span className="text-emerald-300 font-bold">Copié !</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-zinc-300" />
                  <span>Copier</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${CONTACT_CONTENT.email}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-100 text-xs font-mono font-bold transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Mail size={13} />
              <span>Écrire</span>
            </a>
          </div>
        </div>

        {/* Alternative Links */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
          <a
            href={CONTACT_CONTENT.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-sans text-xs font-semibold transition-all shadow-lg cursor-pointer active:scale-95"
          >
            <MessageSquare size={15} className="text-cyan-400" />
            <span>Discussion GitHub (ratiss-audit-public)</span>
            <ExternalLink size={13} className="opacity-80" />
          </a>
        </div>
      </div>
    </section>
  );
}
