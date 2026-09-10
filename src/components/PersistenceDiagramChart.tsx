import { useState, useMemo } from 'react';
import { Layers, Activity, Filter, Info, ShieldCheck } from 'lucide-react';

interface HomologyBar {
  dimension: 'H0' | 'H1' | 'H2';
  label: string;
  birth: number;
  death: number;
  isSignal: boolean;
}

export function PersistenceDiagramChart() {
  const [currentFiltration, setCurrentFiltration] = useState<number>(0.48);
  const [selectedDimension, setSelectedDimension] = useState<'ALL' | 'H0' | 'H1' | 'H2'>('ALL');

  const bars: HomologyBar[] = useMemo(() => [
    // H0: Connected components
    { dimension: 'H0', label: 'C0 (Composante connexe principale)', birth: 0.00, death: 1.00, isSignal: true },
    { dimension: 'H0', label: 'C1 (Micro-cluster QPU noise)', birth: 0.03, death: 0.11, isSignal: false },
    { dimension: 'H0', label: 'C2 (Couplage local inter-qubit)', birth: 0.05, death: 0.16, isSignal: false },
    { dimension: 'H0', label: 'C3 (Fluctuation thermique Aer)', birth: 0.08, death: 0.19, isSignal: false },

    // H1: 1D Topological Loops / Invariant Cycles
    { dimension: 'H1', label: 'L0 (Cycle fondamental Psig tore)', birth: 0.14, death: 0.94, isSignal: true },
    { dimension: 'H1', label: 'L1 (Enlacement de Hopf persistant)', birth: 0.19, death: 0.88, isSignal: true },
    { dimension: 'H1', label: 'L2 (Boucle de phase Lie-Trotter)', birth: 0.22, death: 0.41, isSignal: false },
    { dimension: 'H1', label: 'L3 (Bruit de porte CNOT)', birth: 0.28, death: 0.36, isSignal: false },
    { dimension: 'H1', label: 'L4 (Artefact de mesure)', birth: 0.31, death: 0.38, isSignal: false },

    // H2: 2D Cavities / Manifold Volume
    { dimension: 'H2', label: 'V0 (Cavité topologique invariante)', birth: 0.34, death: 0.82, isSignal: true },
    { dimension: 'H2', label: 'V1 (Décohérence de surface)', birth: 0.42, death: 0.52, isSignal: false },
  ], []);

  const filteredBars = useMemo(() => {
    if (selectedDimension === 'ALL') return bars;
    return bars.filter((b) => b.dimension === selectedDimension);
  }, [bars, selectedDimension]);

  // Compute live active cycles at current filtration epsilon
  const activeCycles = useMemo(() => {
    return filteredBars.filter((b) => b.birth <= currentFiltration && b.death >= currentFiltration);
  }, [filteredBars, currentFiltration]);

  const activeSignalCycles = activeCycles.filter((b) => b.isSignal).length;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Layers size={14} />
          <span className="font-bold tracking-wider uppercase">
            HOMOLOGIE PERSISTANTE · CODE-BARRES TOPOLOGIQUE
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-black p-1 rounded-xl border border-white/10 text-[11px] font-mono">
          {(['ALL', 'H0', 'H1', 'H2'] as const).map((dim) => (
            <button
              key={dim}
              onClick={() => setSelectedDimension(dim)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedDimension === dim
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {dim === 'ALL' ? 'Tous (H₀, H₁, H₂)' : dim}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Filtration Epsilon Slider */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-zinc-300">Échelle de filtration de Vietoris-Rips (ε) :</span>
          <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30">
            ε = {currentFiltration.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0.00"
          max="1.00"
          step="0.01"
          value={currentFiltration}
          onChange={(e) => setCurrentFiltration(parseFloat(e.target.value))}
          className="w-full accent-cyan-400 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>0.00 (Points isolés)</span>
          <span className="text-emerald-400">Région optimale Psig [0.35 - 0.65]</span>
          <span>1.00 (Complexité unifiée)</span>
        </div>
      </div>

      {/* Barcode Graph */}
      <div className="space-y-2 font-mono text-xs">
        {filteredBars.map((bar, idx) => {
          const isActive = bar.birth <= currentFiltration && bar.death >= currentFiltration;
          const leftPercent = bar.birth * 100;
          const widthPercent = (bar.death - bar.birth) * 100;

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    bar.dimension === 'H0'
                      ? 'bg-blue-500/20 text-blue-300'
                      : bar.dimension === 'H1'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-violet-500/20 text-violet-300'
                  }`}>
                    {bar.dimension}
                  </span>
                  <span className={`truncate max-w-[210px] sm:max-w-[320px] ${isActive ? 'text-white font-medium' : 'text-zinc-500'}`}>
                    {bar.label}
                  </span>
                </div>
                <span className={`text-[10px] ${isActive ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>
                  [{bar.birth.toFixed(2)}, {bar.death.toFixed(2)}]
                </span>
              </div>

              {/* Bar track */}
              <div className="relative h-3 w-full bg-zinc-900 rounded-full overflow-hidden">
                {/* Filtration vertical cursor */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-white z-10 shadow-[0_0_8px_white]"
                  style={{ left: `${currentFiltration * 100}%` }}
                />

                {/* Interval bar */}
                <div
                  className={`absolute top-0.5 bottom-0.5 rounded-full transition-all duration-150 ${
                    bar.isSignal
                      ? isActive
                        ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                        : 'bg-cyan-700/60'
                      : isActive
                      ? 'bg-zinc-400'
                      : 'bg-zinc-700/40'
                  }`}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Invariant Summary Telemetry */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-cyan-400" />
          <span className="text-zinc-300">
            Cycles invariants persistants à ε={currentFiltration.toFixed(2)} :
          </span>
          <span className="text-cyan-300 font-bold">{activeSignalCycles} actifs</span>
        </div>
        <div className="text-[11px] text-zinc-500">
          Caractéristique d'Euler : <span className="text-white font-bold">χ = {activeCycles.length}</span>
        </div>
      </div>
    </div>
  );
}
