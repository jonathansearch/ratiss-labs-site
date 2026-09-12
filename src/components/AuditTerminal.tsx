import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, Play, RefreshCw, Shield, Cpu, Lock } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  step: string;
  command: string;
  hash: string;
  status: 'verified' | 'running' | 'sealed';
}

const AUDIT_STAGES: AuditLog[] = [
  {
    id: '1',
    timestamp: '14:42:01.104',
    step: 'Manifest Scellé',
    command: 'ratiss seal verify --target=osf.io/wf7qm',
    hash: 'sha256:9f8a...3e41',
    status: 'sealed',
  },
  {
    id: '2',
    timestamp: '14:42:01.320',
    step: 'Hashes & Identifiants',
    command: 'ratiss check-hashes --doi=10.17605/OSF.IO/WF7QM',
    hash: 'sha256:4b21...87a0',
    status: 'verified',
  },
  {
    id: '3',
    timestamp: '14:42:01.688',
    step: 'Graines & Reproductibilité',
    command: 'ratiss exec-repro --seed=42 --env=frozen-py311',
    hash: 'sha256:d109...bc92',
    status: 'verified',
  },
  {
    id: '4',
    timestamp: '14:42:02.045',
    step: 'Plausibilité Physique',
    command: 'ratiss test-bounds --strict --ablation',
    hash: 'sha256:77fa...12cc',
    status: 'verified',
  },
];

export function AuditTerminal() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState(AUDIT_STAGES.length - 1);
  const [activeTab, setActiveTab] = useState<'terminal' | 'metrics'>('terminal');

  const triggerReExecution = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStage(0);

    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= AUDIT_STAGES.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return AUDIT_STAGES.length - 1;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform' }}
      className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 text-left transform-gpu"
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#060913] border border-white/20 shadow-2xl overflow-hidden group">
        {/* Subtle OpenAI-style ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-7 py-3.5 sm:py-4 border-b border-white/15 bg-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60 border border-red-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60 border border-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60 border border-green-500/80" />
            </div>
            <div className="h-4 w-px bg-white/20 mx-1" />
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white font-medium">
              <Terminal size={14} className="text-cyan-400 shrink-0" />
              <span className="truncate">console-audit // provenance.lock</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Reproductible</span>
            </div>
            <button
              onClick={triggerReExecution}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white font-mono text-xs font-medium transition-all cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <RefreshCw size={12} className={isRunning ? 'animate-spin text-cyan-400' : 'text-white'} />
              <span>{isRunning ? 'Exécution...' : 'Rejouer'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-7 space-y-4 font-mono text-xs sm:text-sm bg-black/40">
          {/* Target details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10 text-[11px] sm:text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-zinc-400 font-semibold">CIBLE :</span>
              <span className="text-white font-semibold break-words">ratiss-audit-public (preprints OSF & dépôts)</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-zinc-400 font-semibold">MÉTRIQUE :</span>
              <span className="text-cyan-300 font-semibold">Plausibilité & Cohérence physique</span>
            </div>
          </div>

          {/* Stepped execution logs */}
          <div className="space-y-2.5 pt-1">
            {AUDIT_STAGES.map((stage, idx) => {
              const isVisible = idx <= activeStage;
              return (
                <AnimatePresence key={stage.id}>
                  {isVisible && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                        {idx === activeStage && isRunning ? (
                          <RefreshCw size={14} className="text-cyan-400 animate-spin shrink-0 mt-0.5 sm:mt-0" />
                        ) : (
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                          <span className="text-white font-bold text-xs shrink-0 tracking-wide">{stage.step}</span>
                          <span className="text-zinc-100 text-[11px] sm:text-xs font-mono break-all sm:break-normal font-medium">{stage.command}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 text-xs shrink-0 pl-6 sm:pl-0">
                        <span className="font-mono text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/20 text-[10px] sm:text-xs font-semibold">
                          {stage.hash}
                        </span>
                        <span className="text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                          PASS
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Interactive footer summary */}
          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-white/10">
            <div className="flex items-center gap-2 text-zinc-200 font-medium">
              <Shield size={14} className="text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs text-white">Vérification scellée (R4–R7) · Zéro assertion non calculée</span>
            </div>
            <a
              href="https://github.com/jonathansearch/ratiss-audit-public"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-white font-semibold underline underline-offset-4 flex items-center gap-1 text-[11px] sm:text-xs font-mono shrink-0 transition-colors"
            >
              <span>Dépôt de reproduction</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
