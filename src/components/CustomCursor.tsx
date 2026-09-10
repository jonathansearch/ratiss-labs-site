import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverType, setHoverType] = useState<'interactive' | 'canvas' | 'text' | null>(null);

  useEffect(() => {
    // Check if pointer is fine (desktop/mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant update for the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check target element under cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], label, .cursor-pointer');
        const isCanvas = target.tagName.toLowerCase() === 'canvas' || target.closest('#hero-canvas, .cursor-crosshair');
        const isTextInput = target.closest('input[type="text"], input[type="email"], textarea');

        if (interactive) {
          setIsHovered(true);
          setHoverType('interactive');
        } else if (isCanvas) {
          setIsHovered(true);
          setHoverType('canvas');
        } else if (isTextInput) {
          setIsHovered(true);
          setHoverType('text');
        } else {
          setIsHovered(false);
          setHoverType(null);
        }
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth animation loop for the outer ring using lerp
    const render = () => {
      // Lerp ring towards mouse position (0.16 smoothing factor)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300">
      {/* Outer reactive aura ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out will-change-transform ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        } ${
          isClicked
            ? 'w-8 h-8 scale-90 border border-cyan-300 bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.6)]'
            : isHovered
            ? hoverType === 'canvas'
              ? 'w-14 h-14 border border-cyan-400/80 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.4)] backdrop-blur-[1px]'
              : 'w-12 h-12 border-2 border-cyan-400 bg-cyan-400/15 shadow-[0_0_30px_rgba(34,211,238,0.45)] backdrop-blur-[1px]'
            : 'w-7 h-7 border border-white/40 bg-transparent shadow-[0_0_12px_rgba(255,255,255,0.1)]'
        }`}
      >
        {/* Subtle crosshair notches when hovering 3D canvas or interactive elements */}
        {isHovered && hoverType === 'interactive' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-cyan-300 animate-ping opacity-75" />
          </div>
        )}
      </div>

      {/* Precise Center Point Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-100 ease-out will-change-transform ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        } ${
          isClicked
            ? 'w-1.5 h-1.5 bg-white shadow-[0_0_8px_#ffffff]'
            : isHovered
            ? 'w-1.5 h-1.5 bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)] scale-125'
            : 'w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]'
        }`}
      />
    </div>
  );
}
