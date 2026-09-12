import { useEffect, useRef } from 'react';

export function GlobalThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const points = Array.from({ length: 42 }, (_, index) => ({
      x: (index * 97) % 1000,
      y: (index * 53) % 700,
      radius: 0.7 + (index % 3) * 0.35,
      phase: index * 0.7,
    }));
    let frame = 0;
    let animation = 0;
    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      for (const point of points) {
        const x = (point.x / 1000) * width;
        const y = ((point.y + Math.sin(frame * 0.004 + point.phase) * 8) / 700) * height;
        context.beginPath();
        context.fillStyle = 'rgba(103, 232, 249, 0.22)';
        context.arc(x, y, point.radius, 0, Math.PI * 2);
        context.fill();
      }
      animation = window.requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    animation = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animation);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="ambient-canvas" />;
}
