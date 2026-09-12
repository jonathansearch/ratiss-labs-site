import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; z: number; radius: number; phase: number; speed: number };

export function GlobalThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const isSmall = window.innerWidth < 700;
    const count = isSmall ? 55 : 120;
    const points: Point[] = Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * (0.7 + (index % 7) * 0.035),
        y: Math.sin(angle) * (0.42 + (index % 5) * 0.04),
        z: (index % 11) / 11,
        radius: 0.8 + (index % 4) * 0.45,
        phase: index * 0.37,
        speed: 0.25 + (index % 5) * 0.06,
      };
    });

    let width = 0;
    let height = 0;
    let frame = 0;
    let animation = 0;
    let visible = true;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      if (!visible) return;
      frame += 1;
      const time = frame * 0.004;
      context.clearRect(0, 0, width, height);
      const cx = width * 0.58;
      const cy = height * 0.32;
      const scale = Math.min(width, height) * 0.46;
      const projected = points.map((point) => {
        const orbit = time * point.speed + point.phase;
        const depth = 0.72 + Math.sin(orbit) * 0.18 + point.z * 0.14;
        return {
          x: cx + point.x * Math.cos(time * 0.35) * scale * depth,
          y: cy + point.y * scale * depth + Math.sin(orbit) * 8,
          alpha: 0.18 + depth * 0.28,
          radius: point.radius * (0.8 + depth * 0.45),
        };
      });

      context.lineWidth = 0.7;
      for (let index = 0; index < projected.length; index += 1) {
        const point = projected[index];
        const next = projected[(index + 1) % projected.length];
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(next.x, next.y);
        context.strokeStyle = `rgba(34, 211, 238, ${Math.min(point.alpha, 0.14)})`;
        context.stroke();
        if (index % 3 === 0) {
          context.beginPath();
          context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(103, 232, 249, ${point.alpha})`;
          context.fill();
        }
      }

      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.9);
      glow.addColorStop(0, 'rgba(8, 145, 178, 0.10)');
      glow.addColorStop(0.45, 'rgba(14, 116, 144, 0.035)');
      glow.addColorStop(1, 'rgba(7, 11, 22, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      animation = window.requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      if (visible) animation = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    animation = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.cancelAnimationFrame(animation);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="ambient-canvas" />;
}
