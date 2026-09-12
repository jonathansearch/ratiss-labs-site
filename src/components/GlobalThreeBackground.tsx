import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function GlobalThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();
    // Deep black fog to melt wave naturally into the infinite dark abyss
    scene.fog = new THREE.FogExp2(0x000000, 0.0045);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Perspective looking across the undulating 3D wave
    camera.position.set(0, -75, 70);
    camera.lookAt(0, 30, -10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Soft Radial Particle Texture with Bright White Core ---
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
      grad.addColorStop(0.55, 'rgba(6, 182, 212, 0.35)');
      grad.addColorStop(0.85, 'rgba(3, 105, 161, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // --- 3D Wave Matrix Lattice ---
    const cols = 68;
    const rows = 68;
    const count = cols * rows;
    const separation = 3.6;

    const positions = new Float32Array(count * 3);
    const baseColors = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const halfWidth = ((cols - 1) * separation) / 2;
    const halfDepth = ((rows - 1) * separation) / 2;

    const colorCrest = new THREE.Color(0xffffff); // Pure bright white on crests
    const colorCyan = new THREE.Color(0x38bdf8);  // Electric cyan
    const colorBlue = new THREE.Color(0x0284c7);  // Ocean blue
    const colorDeep = new THREE.Color(0x0f172a);  // Deep abyssal slate

    for (let iy = 0; iy < rows; iy++) {
      for (let ix = 0; ix < cols; ix++) {
        const i = iy * cols + ix;
        const i3 = i * 3;

        const x = ix * separation - halfWidth;
        const y = iy * separation - halfDepth;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = 0; // z will be computed by wave equation

        // Distance from center for radial color gradient
        const distNorm = Math.sqrt(x * x + y * y) / (halfWidth * 1.3);
        const c = new THREE.Color().copy(colorCyan).lerp(colorDeep, THREE.MathUtils.clamp(distNorm, 0, 1));

        baseColors[i3] = c.r;
        baseColors[i3 + 1] = c.g;
        baseColors[i3 + 2] = c.b;

        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.6,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const waveSystem = new THREE.Points(geometry, material);
    // Orient the wave plane gracefully in 3D perspective
    waveSystem.rotation.x = -Math.PI * 0.38; // Tilted towards user
    waveSystem.position.y = -10;
    scene.add(waveSystem);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // If reduced motion, render single static wave frame
    if (prefersReducedMotion) {
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = posArray[i3];
        const y = posArray[i3 + 1];
        posArray[i3 + 2] = Math.sin(x * 0.06) * 8 + Math.cos(y * 0.06) * 8;
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        geometry.dispose();
        material.dispose();
        particleTexture.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }

    // --- High-Performance Animation Loop ---
    let animationFrameId: number;
    let lastTime = 0;
    let waveTime = 0;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!lastTime) lastTime = currentTime;
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      waveTime += delta * 1.35; // Controlled, elegant undulation speed

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Subtle dynamic camera tilt
      camera.position.x = mouseX * 12;
      camera.position.y = -75 - mouseY * 8;
      camera.lookAt(0, 30, -10);

      // Gentle rotation of the wave system
      waveSystem.rotation.z = Math.sin(waveTime * 0.15) * 0.04 + mouseX * 0.05;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;
      const colArray = colAttr.array as Float32Array;

      // Compute wave heights & crest highlighting
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = posArray[i3];
        const y = posArray[i3 + 1];

        // Harmonious multi-octave wave equation
        const w1 = Math.sin(x * 0.055 + waveTime) * 9.5;
        const w2 = Math.cos(y * 0.065 + waveTime * 0.85) * 8.5;
        const w3 = Math.sin((x + y) * 0.035 + waveTime * 0.6) * 5.5;
        const z = w1 + w2 + w3;

        posArray[i3 + 2] = z;

        // Brighten wave crests to brilliant pure white
        const crestFactor = (z + 23) / 46; // Normalized height ~0 to 1
        if (crestFactor > 0.65) {
          const t = (crestFactor - 0.65) / 0.35;
          colArray[i3] = THREE.MathUtils.lerp(baseColors[i3], colorCrest.r, t);
          colArray[i3 + 1] = THREE.MathUtils.lerp(baseColors[i3 + 1], colorCrest.g, t);
          colArray[i3 + 2] = THREE.MathUtils.lerp(baseColors[i3 + 2], colorCrest.b, t);
        } else {
          colArray[i3] = baseColors[i3];
          colArray[i3 + 1] = baseColors[i3 + 1];
          colArray[i3 + 2] = baseColors[i3 + 2];
        }
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Deep, pure pitch-black base with subtle dark oceanic focus */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-black"
        style={{
          background: 'radial-gradient(ellipse 85% 55% at 50% 15%, rgba(6, 182, 212, 0.08) 0%, rgba(2, 6, 23, 0.6) 45%, #000000 100%)'
        }}
        aria-hidden="true"
      />
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      />
    </>
  );
}
