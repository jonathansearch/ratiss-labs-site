import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SERVICES_CONTENT } from '../data/content';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  key?: string | number;
}

function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Responsive, fluid spring physics
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 20 });

  // 3D rotations in degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-14, 14]);

  // Dynamic glare coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          scale: { duration: 0.22, ease: 'easeOut' },
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative rounded-2xl sm:rounded-3xl bg-[#060813] border border-white/15 hover:border-cyan-400/50 transition-all duration-300 shadow-2xl cursor-pointer ${className}`}
      >
        {/* Subtle Specular Glare Layer */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden z-20">
          <motion.div
            className="w-full h-full transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(420px circle at ${glareX} ${glareY}, rgba(34, 211, 238, 0.22), transparent 75%)`,
            }}
          />
        </div>

        {/* 3D Elevated Content Layer */}
        <div
          style={{
            transform: 'translateZ(24px)',
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10 h-full flex flex-col justify-between"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="ce-que-nous-faisons" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="space-y-10 sm:space-y-14">
        <div className="space-y-4 max-w-3xl text-center sm:text-left mx-auto sm:mx-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold uppercase tracking-widest">
            01 / Activité
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white font-sans">
            Ce que nous faisons
          </h2>
          <p className="text-base sm:text-lg text-zinc-100 font-normal leading-relaxed">
            Audit rigoureux et vérification déterministe appliquée aux artefacts scientifiques, codes sources et protocoles de recherche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES_CONTENT.map((card, index) => (
            <div
              key={card.id}
              className="h-full transform-gpu"
            >
              <TiltCard
                className="group p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 text-left"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-bold bg-white/10 px-2.5 py-1 rounded border border-white/20">
                      0{index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                      <CheckCircle2 size={17} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-white font-sans tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed font-sans">
                    {card.claim.text}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <a
                    href={card.claim.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white font-semibold transition-colors underline underline-offset-4"
                  >
                    <span>Preuve publique & rapport</span>
                    <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform opacity-80 group-hover:opacity-100" />
                  </a>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
