export function ParallaxBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Autonomous Ambient Layer 1: Deep Quantum Glow (Cyan / Azure) - Fixed in viewport */}
      <div
        className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_70%)] blur-[140px]"
      />

      {/* Autonomous Ambient Layer 2: Soft Right Light (Indigo / Cyan Orb) */}
      <div
        className="absolute top-[35vh] -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.07),transparent_65%)] blur-[120px]"
      />

      {/* Autonomous Ambient Layer 3: Soft Left Ambient Glow */}
      <div
        className="absolute top-[70vh] -left-40 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06),transparent_70%)] blur-[130px]"
      />

      {/* Autonomous Topological Geometric Rings (Zero Scroll Influence) */}
      <div
        className="absolute top-[20vh] right-[8%] w-[420px] h-[420px] rounded-full border border-white/[0.025]"
      >
        <div className="absolute inset-4 rounded-full border border-cyan-400/[0.03] border-dashed animate-[spin_120s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-white/[0.015]" />
      </div>

      <div
        className="absolute top-[65vh] left-[6%] w-[480px] h-[480px] rounded-full border border-cyan-400/[0.02]"
      >
        <div className="absolute inset-12 rounded-full border border-white/[0.015] border-dotted animate-[spin_160s_linear_infinite_reverse]" />
      </div>

      {/* Matrix Grid (Pure fixed background, zero scroll offset) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35"
      />
    </div>
  );
}

