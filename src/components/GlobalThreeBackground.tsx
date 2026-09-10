import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Layers, Shuffle, Check, Radio } from 'lucide-react';

export type BackgroundTopologyMode = 'auto_morph' | 'torus_psig' | 'quantum_lattice' | 'hopf_vortex' | 'geodesic_shield';

const TOPOLOGY_MODES = [
  { id: 'cosmos', name: 'Cosmos Topologique Éthéré', shapeIndex: 0, spread: 1.05, desc: 'Champ gravitationnel ouvert' },
  { id: 'torus', name: 'Tore Invariant Psig', shapeIndex: 1, spread: 1.02, desc: 'Noeud topologique p=2, q=3' },
  { id: 'lattice', name: 'Réseau Cristallin Ondulatoire', shapeIndex: 2, spread: 1.12, desc: 'Matrice de cohérence QPU' },
  { id: 'hopf', name: 'Entrelacement Dual de Hopf', shapeIndex: 3, spread: 1.08, desc: 'Anneaux orthogonaux intriqués' },
  { id: 'geodesic', name: 'Bouclier Géodésique Formel', shapeIndex: 4, spread: 1.05, desc: 'Enveloppe géodésique fermée' },
];

export function GlobalThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<BackgroundTopologyMode>('auto_morph');
  const [particleDensity] = useState<number>(() => {
    if (typeof window === 'undefined') return 3600;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.innerWidth < 768;
    const lowMemory = 'deviceMemory' in navigator && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4;
    return coarsePointer || narrowViewport || lowMemory ? 1400 : 3600;
  });
  const [showControls, setShowControls] = useState<boolean>(false);
  const [currentTopologyName, setCurrentTopologyName] = useState<string>('Cosmos Topologique Éthéré');
  const [isIntroVisible, setIsIntroVisible] = useState<boolean>(true);

  useEffect(() => {
    // Dismiss intro banner after 2.8s
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.0028);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 95);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Soft Radial Particle Glow Texture ---
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.18, 'rgba(34, 211, 238, 0.95)');
      grad.addColorStop(0.48, 'rgba(6, 182, 212, 0.35)');
      grad.addColorStop(0.78, 'rgba(14, 116, 144, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // --- Main Particle Buffers ---
    const count = particleDensity;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    // Precomputed Canonical Shape Manifolds
    const shape0Cosmos = new Float32Array(count * 3);
    const shape1Torus = new Float32Array(count * 3);
    const shape2Lattice = new Float32Array(count * 3);
    const shape3DualRings = new Float32Array(count * 3);
    const shape4Geodesic = new Float32Array(count * 3);

    const colorCyan = new THREE.Color(0x22d3ee);
    const colorBlue = new THREE.Color(0x3b82f6);
    const colorAmber = new THREE.Color(0xf59e0b);
    const colorIndigo = new THREE.Color(0x6366f1);
    const colorViolet = new THREE.Color(0xa855f7);

    // Populate precomputed shape buffers
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = (i / count) * Math.PI * 2 * 8;
      const v = ((i % 140) / 140) * Math.PI * 2;
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos(2 * ((i % 250) / 250) - 1);

      // Shape 0: Ethereal Cosmos (open ring with cleared central corridor)
      const radius0 = 36 + 28 * Math.sin(u * 0.5);
      const angle0 = u;
      shape0Cosmos[i3] = Math.cos(angle0) * radius0 + (Math.sin(v * 4) * 8);
      shape0Cosmos[i3 + 1] = Math.sin(angle0) * (radius0 * 0.8) + (Math.cos(v * 4) * 8);
      shape0Cosmos[i3 + 2] = Math.sin(u * 2) * 26 + (Math.cos(v * 3) * 10);

      // Shape 1: Torus Knot (p=2, q=3) Invariant Ribbon
      const p = 2;
      const q = 3;
      const r1 = 36 + 13 * Math.cos(q * u);
      const ribbon1 = 6 + 4 * Math.sin(v * 3 + u);
      shape1Torus[i3] = r1 * Math.cos(p * u) + ribbon1 * Math.cos(v);
      shape1Torus[i3 + 1] = r1 * Math.sin(p * u) + ribbon1 * Math.sin(v);
      shape1Torus[i3 + 2] = 20 * Math.sin(q * u) + ribbon1 * Math.sin(u * 2);

      // Shape 2: Quantum Lattice (3D wave matrix with gentle ripple)
      const cols = 60;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x2 = (col - cols / 2) * 3.8;
      const y2 = (row - (count / cols) / 2) * 3.6;
      const z2 = Math.sin(col * 0.28) * Math.cos(row * 0.28) * 16;
      shape2Lattice[i3] = x2;
      shape2Lattice[i3 + 1] = y2;
      shape2Lattice[i3 + 2] = z2;

      // Shape 3: Dual Entangled Rings (Orthogonal torus rings)
      const isRingA = i % 2 === 0;
      const ringRad = 32 + (i % 60) * 0.2;
      const ringAngle = u;
      if (isRingA) {
        shape3DualRings[i3] = Math.cos(ringAngle) * ringRad - 12;
        shape3DualRings[i3 + 1] = Math.sin(ringAngle) * ringRad;
        shape3DualRings[i3 + 2] = Math.sin(v * 2) * 9;
      } else {
        shape3DualRings[i3] = Math.sin(v * 2) * 9 + 12;
        shape3DualRings[i3 + 1] = Math.cos(ringAngle) * ringRad;
        shape3DualRings[i3 + 2] = Math.sin(ringAngle) * ringRad;
      }

      // Shape 4: Geodesic Shell / Helical Shield
      const r4 = 44 + Math.sin(theta * 4) * 4;
      shape4Geodesic[i3] = r4 * Math.sin(phi) * Math.cos(theta);
      shape4Geodesic[i3 + 1] = r4 * Math.sin(phi) * Math.sin(theta) * 0.85;
      shape4Geodesic[i3 + 2] = r4 * Math.cos(phi) * 0.7;

      // Initial positions start condensed in a tight cluster for the opening expansion
      positions[i3] = (Math.random() - 0.5) * 4;
      positions[i3 + 1] = (Math.random() - 0.5) * 4;
      positions[i3 + 2] = (Math.random() - 0.5) * 4;

      // Phases & speeds for micro-fluctuations
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.3 + Math.random() * 0.7;

      // Color scheme
      const c = new THREE.Color();
      const randC = Math.random();
      if (randC < 0.45) c.copy(colorCyan);
      else if (randC < 0.70) c.copy(colorBlue);
      else if (randC < 0.85) c.copy(colorAmber);
      else if (randC < 0.94) c.copy(colorIndigo);
      else c.copy(colorViolet);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.2,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // --- Ephemeral Disintegrating Shapes (Cycles 4 & 5) ---
    // Autonomous polyhedral cluster that periodically crystallizes,
    // violently disintegrates into particles dissipating towards borders, then reconstitutes.
    const transientCount = 540;
    const transientPositions = new Float32Array(transientCount * 3);
    const transientBaseShapes = new Float32Array(transientCount * 3);
    const transientColors = new Float32Array(transientCount * 3);
    const transientVelocities = new Float32Array(transientCount * 3);

    for (let k = 0; k < transientCount; k++) {
      const k3 = k * 3;
      const phiT = (k / transientCount) * Math.PI * 2;
      const thetaT = Math.acos(2 * ((k % 18) / 18) - 1);
      const radT = 16 + (k % 4) * 3;
      
      const baseX = radT * Math.sin(thetaT) * Math.cos(phiT);
      const baseY = radT * Math.sin(thetaT) * Math.sin(phiT);
      const baseZ = radT * Math.cos(thetaT);

      transientBaseShapes[k3] = baseX;
      transientBaseShapes[k3 + 1] = baseY;
      transientBaseShapes[k3 + 2] = baseZ;

      transientPositions[k3] = baseX;
      transientPositions[k3 + 1] = baseY;
      transientPositions[k3 + 2] = baseZ;

      // Trajectories towards outer screen borders
      const dirLength = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ) || 1;
      transientVelocities[k3] = (baseX / dirLength) * (38 + (k % 28));
      transientVelocities[k3 + 1] = (baseY / dirLength) * (32 + (k % 24));
      transientVelocities[k3 + 2] = (baseZ / dirLength) * 22;

      // Amber / Cyan quantum sparkle colors
      const isAmber = k % 2 === 0;
      transientColors[k3] = isAmber ? 0.96 : 0.13;
      transientColors[k3 + 1] = isAmber ? 0.65 : 0.82;
      transientColors[k3 + 2] = isAmber ? 0.15 : 0.93;
    }

    const transientGeometry = new THREE.BufferGeometry();
    transientGeometry.setAttribute('position', new THREE.BufferAttribute(transientPositions, 3));
    transientGeometry.setAttribute('color', new THREE.BufferAttribute(transientColors, 3));

    const transientMaterial = new THREE.PointsMaterial({
      size: 3.4,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const transientSystem = new THREE.Points(transientGeometry, transientMaterial);
    scene.add(transientSystem);

    // --- Filament Lattice (Line Segments) ---
    const lineCount = 200;
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount * 6; i++) {
      lineColors[i] = i % 2 === 0 ? 0.22 : 0.75;
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesSystem);

    // --- Autonomous Dynamics & Pointer Tracking ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const getShapeBuffer = (idx: number): Float32Array => {
      switch (idx) {
        case 0: return shape0Cosmos;
        case 1: return shape1Torus;
        case 2: return shape2Lattice;
        case 3: return shape3DualRings;
        case 4: return shape4Geodesic;
        default: return shape0Cosmos;
      }
    };

    let manualShapeTarget: Float32Array | null = null;
    if (activeMode === 'torus_psig') manualShapeTarget = shape1Torus;
    else if (activeMode === 'quantum_lattice') manualShapeTarget = shape2Lattice;
    else if (activeMode === 'hopf_vortex') manualShapeTarget = shape3DualRings;
    else if (activeMode === 'geodesic_shield') manualShapeTarget = shape4Geodesic;

    // --- Animation Loop: 100% DECOUPLED FROM SCROLL ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let lastHudUpdate = 0;
    let isPageVisible = document.visibilityState === 'visible';
    let lastFrameTime = performance.now();
    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
      if (isPageVisible) {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (!isPageVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      const nowFrame = performance.now();
      if (nowFrame - lastFrameTime < 1000 / 50) return;
      lastFrameTime = nowFrame;
      const elapsedTime = clock.getElapsedTime();
      const now = performance.now();

      // --- 1. Opening Animation (Intro Expansion at page open) ---
      // Smooth blossom from central singularity over 2.4 seconds
      const introRatio = Math.min(elapsedTime / 2.4, 1.0);
      const easeIntro = 1 - Math.pow(1 - introRatio, 3);
      material.opacity = THREE.MathUtils.lerp(0.12, 0.72, easeIntro);

      // Subtle mouse pointer smoothing (organic parallax, NOT locked to scroll)
      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;

      // --- 2. AUTONOMOUS TOPOLOGICAL EVOLUTION (Independent Time Cycles) ---
      // In auto_morph mode, the universe cycles smoothly through the 5 topologies on its own clock!
      // Each topology lasts ~8.5 seconds, then smoothly morphs to the next.
      const cycleDuration = 9.0;
      const totalModes = TOPOLOGY_MODES.length;
      const continuousProgress = (elapsedTime / cycleDuration);
      const currentIdx = Math.floor(continuousProgress) % totalModes;
      const nextIdx = (currentIdx + 1) % totalModes;
      const subCycleProgress = continuousProgress % 1.0;
      
      // Smooth S-curve interpolation between shapes
      const morphProgress = subCycleProgress < 0.55
        ? 0 // dwell on current shape for 55% of the cycle
        : THREE.MathUtils.smoothstep((subCycleProgress - 0.55) / 0.45, 0, 1); // morph over the remaining 45%

      // Update HUD text occasionally (every 300ms)
      if (now - lastHudUpdate > 300) {
        lastHudUpdate = now;
        if (activeMode === 'auto_morph') {
          const displayIdx = subCycleProgress > 0.85 ? nextIdx : currentIdx;
          setCurrentTopologyName(TOPOLOGY_MODES[displayIdx].name);
        }
      }

      const shapeA = getShapeBuffer(TOPOLOGY_MODES[currentIdx].shapeIndex);
      const shapeB = getShapeBuffer(TOPOLOGY_MODES[nextIdx].shapeIndex);
      const spreadA = TOPOLOGY_MODES[currentIdx].spread;
      const spreadB = TOPOLOGY_MODES[nextIdx].spread;
      const currentSpread = THREE.MathUtils.lerp(spreadA, spreadB, morphProgress);

      // --- 3. AUTONOMOUS ROTATION & 3D TRAJECTORY (ZERO SCROLL DEPENDENCY) ---
      // The background drifts, breathes, and rotates continuously on its own internal harmonic clock
      const introSpinDecel = (1 - easeIntro) * 2.0;
      particleSystem.rotation.y = (elapsedTime * 0.09) + introSpinDecel + (Math.sin(elapsedTime * 0.05) * 0.35) + mouseX * 0.15;
      particleSystem.rotation.x = (Math.sin(elapsedTime * 0.06) * 0.22) + mouseY * 0.12;
      particleSystem.rotation.z = Math.cos(elapsedTime * 0.04) * 0.12;

      // Autonomous orbital camera breathing (gentle continuous 3D float)
      camera.position.x = Math.sin(elapsedTime * 0.08) * 8 + mouseX * 3;
      camera.position.y = Math.cos(elapsedTime * 0.06) * 6 + mouseY * 3;
      camera.position.z = 94 + Math.sin(elapsedTime * 0.05) * 7;
      camera.lookAt(0, 0, 0);

      // --- 4. CONTINUOUS CENTRAL DISPERSION (Border Dissipation without scroll jank) ---
      // An autonomous radial clearing breathes gently, keeping the central text corridor legible,
      // while dissipating particle density towards the left and right screen borders.
      const borderDispersalWave = 1.0 + Math.sin(elapsedTime * 0.3) * 0.15;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const morphRate = 0.035;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const phase = phases[i];
        const spd = speeds[i];

        let baseTargetX: number;
        let baseTargetY: number;
        let baseTargetZ: number;

        if (manualShapeTarget) {
          baseTargetX = manualShapeTarget[i3];
          baseTargetY = manualShapeTarget[i3 + 1];
          baseTargetZ = manualShapeTarget[i3 + 2];
        } else {
          baseTargetX = (shapeA[i3] * (1 - morphProgress) + shapeB[i3] * morphProgress) * currentSpread;
          baseTargetY = (shapeA[i3 + 1] * (1 - morphProgress) + shapeB[i3 + 1] * morphProgress) * currentSpread;
          baseTargetZ = (shapeA[i3 + 2] * (1 - morphProgress) + shapeB[i3 + 2] * morphProgress) * currentSpread;
        }

        // Apply intro scale factor (blooming outwards from central seed)
        baseTargetX *= easeIntro;
        baseTargetY *= easeIntro;
        baseTargetZ *= easeIntro;

        // Autonomous lateral border push (clearing central reading corridor)
        const distFromCenter = Math.sqrt(baseTargetX * baseTargetX + baseTargetY * baseTargetY);
        if (distFromCenter < 46) {
          const corridorFactor = (1.0 - distFromCenter / 46.0);
          const pushX = (baseTargetX >= 0 ? 1 : -1) * corridorFactor * 16.0 * borderDispersalWave;
          baseTargetX += pushX;
        }

        // Micro-wave floating undulation
        const waveY = Math.sin(elapsedTime * spd + phase) * 0.12;
        const waveX = Math.cos(phase + elapsedTime * 0.14) * 0.08;

        posArray[i3] += (baseTargetX - posArray[i3]) * morphRate + waveX;
        posArray[i3 + 1] += (baseTargetY - posArray[i3 + 1]) * morphRate + waveY;
        posArray[i3 + 2] += (baseTargetZ - posArray[i3 + 2]) * morphRate;
      }
      posAttr.needsUpdate = true;

      // --- 5. EPHEMERAL SHAPES: AUTONOMOUS DISINTEGRATION & RETURN TO BORDERS ---
      // Runs on an autonomous loop: forms a concentrated crystal -> explodes/disintegrates
      // towards the viewport borders -> then slowly condenses back from the borders.
      {
        const tPosAttr = transientGeometry.attributes.position as THREE.BufferAttribute;
        const tPosArray = tPosAttr.array as Float32Array;

        const ephemeralPeriod = 6.2;
        const ephemeralTime = (elapsedTime * 0.8) % ephemeralPeriod;

        let phaseDisintegration = 0;
        let transientAlpha = 0.7;

        if (ephemeralTime < 2.3) {
          // Phase A: Coherent crystal assembling and softly pulsating
          phaseDisintegration = 0;
          transientAlpha = THREE.MathUtils.lerp(0.15, 0.75, ephemeralTime / 0.8);
        } else if (ephemeralTime < 4.8) {
          // Phase B: Disintegration radiating outwards toward the borders
          const disRatio = (ephemeralTime - 2.3) / 2.5;
          phaseDisintegration = Math.pow(disRatio, 1.4);
          transientAlpha = THREE.MathUtils.lerp(0.75, 0.12, disRatio);
        } else {
          // Phase C: Return cycle condensing from the borders
          const returnRatio = (ephemeralTime - 4.8) / 1.4;
          phaseDisintegration = (1.0 - returnRatio);
          transientAlpha = THREE.MathUtils.lerp(0.12, 0.6, returnRatio);
        }

        transientMaterial.opacity = transientAlpha;

        // Alternate placement between left and right periphery every cycle
        const sideOffset = (Math.floor(elapsedTime / ephemeralPeriod) % 2 === 0) ? 38 : -38;
        const verticalDrift = Math.sin(elapsedTime * 0.3) * 14;

        for (let k = 0; k < transientCount; k++) {
          const k3 = k * 3;
          const baseX = transientBaseShapes[k3];
          const baseY = transientBaseShapes[k3 + 1];
          const baseZ = transientBaseShapes[k3 + 2];

          const velX = transientVelocities[k3];
          const velY = transientVelocities[k3 + 1];
          const velZ = transientVelocities[k3 + 2];

          // Disintegrate outwards toward viewport borders
          const currentX = baseX + sideOffset + (velX * phaseDisintegration);
          const currentY = baseY + verticalDrift + (velY * phaseDisintegration);
          const currentZ = baseZ + (velZ * phaseDisintegration);

          tPosArray[k3] += (currentX - tPosArray[k3]) * 0.08;
          tPosArray[k3 + 1] += (currentY - tPosArray[k3 + 1]) * 0.08;
          tPosArray[k3 + 2] += (currentZ - tPosArray[k3 + 2]) * 0.08;
        }
        tPosAttr.needsUpdate = true;
        transientSystem.rotation.y = elapsedTime * 0.14;
        transientSystem.rotation.x = elapsedTime * 0.09;
      }

      // --- 6. LINE LATTICE FILAMENTS (AUTONOMOUS) ---
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      let lineIdx = 0;

      for (let i = 0; i < lineCount && i * 2 < count; i++) {
        const nodeA = (i * 7) % count;
        const nodeB = (nodeA + 1 + (i % 5)) % count;

        const a3 = nodeA * 3;
        const b3 = nodeB * 3;

        const dx = posArray[a3] - posArray[b3];
        const dy = posArray[a3 + 1] - posArray[b3 + 1];
        const dz = posArray[a3 + 2] - posArray[b3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 360) {
          linePosArray[lineIdx++] = posArray[a3];
          linePosArray[lineIdx++] = posArray[a3 + 1];
          linePosArray[lineIdx++] = posArray[a3 + 2];

          linePosArray[lineIdx++] = posArray[b3];
          linePosArray[lineIdx++] = posArray[b3 + 1];
          linePosArray[lineIdx++] = posArray[b3 + 2];
        }
      }
      linePosAttr.needsUpdate = true;
      linesSystem.rotation.copy(particleSystem.rotation);

      renderer.render(scene, camera);
    };

    animate();

    const updateShape = (mode: BackgroundTopologyMode) => {
      if (mode === 'auto_morph') manualShapeTarget = null;
      else if (mode === 'torus_psig') manualShapeTarget = shape1Torus;
      else if (mode === 'quantum_lattice') manualShapeTarget = shape2Lattice;
      else if (mode === 'hopf_vortex') manualShapeTarget = shape3DualRings;
      else if (mode === 'geodesic_shield') manualShapeTarget = shape4Geodesic;
    };

    (container as any).__updateShape = updateShape;

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      transientGeometry.dispose();
      transientMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [particleDensity, activeMode]);

  const handleSelectMode = (mode: BackgroundTopologyMode) => {
    setActiveMode(mode);
    if (mode === 'torus_psig') setCurrentTopologyName('Tore Invariant Psig');
    else if (mode === 'quantum_lattice') setCurrentTopologyName('Réseau Cristallin Ondulatoire');
    else if (mode === 'hopf_vortex') setCurrentTopologyName('Entrelacement Dual de Hopf');
    else if (mode === 'geodesic_shield') setCurrentTopologyName('Bouclier Géodésique Formel');
    
    if (containerRef.current && (containerRef.current as any).__updateShape) {
      (containerRef.current as any).__updateShape(mode);
    }
  };

  return (
    <>
      {/* Full-Page Fixed WebGL Canvas Behind All Content */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 50% 18%, rgba(6, 30, 48, 0.42) 0%, rgba(3, 7, 18, 0.88) 58%, #000000 100%)'
        }}
        aria-hidden="true"
      />

      {/* Opening Intro Banner (Fades out smoothly after 2.8s) */}
      {isIntroVisible && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-700 animate-in fade-in zoom-in-95">
          <div className="px-4 py-2 rounded-full bg-zinc-950/90 border border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.25)] flex items-center gap-2.5 text-xs font-mono backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-semibold tracking-wider">
              DYNAMIQUE QUANTIQUE AUTONOME EN COURS
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-amber-300 text-[11px]">Découplé du Scroll</span>
          </div>
        </div>
      )}

      {/* Floating Global Particle HUD & Switcher (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {showControls && (
          <div className="p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-cyan-500/30 text-xs font-mono shadow-[0_0_30px_rgba(34,211,238,0.2)] space-y-3 w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles size={13} />
                UNIVERS 3D AUTONOME
              </span>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">
                Asynchrone
              </span>
            </div>

            {/* Dynamic Topology Indicator */}
            <div className="p-2.5 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                Topologie vivante :
              </div>
              <div className="text-white font-bold truncate text-[11px]">
                {currentTopologyName}
              </div>
              <div className="text-cyan-300 text-[10px] truncate">
                ◈ Évolution temporelle continue
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">
                Mode d'animation :
              </span>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => handleSelectMode('auto_morph')}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMode === 'auto_morph'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Shuffle size={11} className="text-cyan-400" />
                    <span>Cycle Vivant Libre (Indépendant)</span>
                  </span>
                  {activeMode === 'auto_morph' && <Check size={12} className="text-cyan-400" />}
                </button>
                <button
                  onClick={() => handleSelectMode('torus_psig')}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMode === 'torus_psig'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                  }`}
                >
                  <span>◆ Tore Invariant P<sub>sig</sub></span>
                  {activeMode === 'torus_psig' && <Check size={12} className="text-cyan-400" />}
                </button>
                <button
                  onClick={() => handleSelectMode('quantum_lattice')}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMode === 'quantum_lattice'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                  }`}
                >
                  <span>◆ Matrice d'Ondes QPU</span>
                  {activeMode === 'quantum_lattice' && <Check size={12} className="text-cyan-400" />}
                </button>
                <button
                  onClick={() => handleSelectMode('hopf_vortex')}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMode === 'hopf_vortex'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                  }`}
                >
                  <span>◆ Anneaux Entrelacés</span>
                  {activeMode === 'hopf_vortex' && <Check size={12} className="text-cyan-400" />}
                </button>
                <button
                  onClick={() => handleSelectMode('geodesic_shield')}
                  className={`px-2.5 py-1.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeMode === 'geodesic_shield'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                      : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                  }`}
                >
                  <span>◆ Bouclier Géodésique</span>
                  {activeMode === 'geodesic_shield' && <Check size={12} className="text-cyan-400" />}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500">
              <span>{particleDensity} particules</span>
              <span className="text-cyan-400">Flux continu autonome</span>
            </div>
          </div>
        )}

        {/* Minimal Floating Indicator Pill */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-lg group cursor-pointer"
          title="Contrôle de la topologie 3D autonome"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse group-hover:scale-125 transition-transform" />
          <span className="hidden sm:inline text-zinc-400">Fond 3D :</span>
          <span className="text-cyan-300 font-bold truncate max-w-[130px]">
            {activeMode === 'auto_morph' ? currentTopologyName : activeMode}
          </span>
          <span className="text-[10px] text-emerald-400 border-l border-white/10 pl-2">
            Autonome
          </span>
        </button>
      </div>
    </>
  );
}
