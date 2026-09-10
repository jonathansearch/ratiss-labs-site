import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Activity, Play, Check } from 'lucide-react';

export function BlochSphereVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [theta, setTheta] = useState<number>(Math.PI / 3); // Polar angle
  const [phi, setPhi] = useState<number>(Math.PI / 4); // Azimuthal angle
  const [activePreset, setActivePreset] = useState<string>('superposition');

  // Math calculated quantities
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);

  // Amplitudes
  const alphaMag = Math.cos(theta / 2);
  const betaMag = Math.sin(theta / 2);
  const prob0 = (alphaMag * alphaMag * 100).toFixed(1);
  const prob1 = (betaMag * betaMag * 100).toFixed(1);

  // References for Three.js state updating
  const stateVectorRef = useRef<THREE.ArrowHelper | null>(null);
  const pointMeshRef = useRef<THREE.Mesh | null>(null);
  const projLineRef = useRef<THREE.Line | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for entire sphere to allow gentle rotation
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Translucent Bloch Sphere Shell
    const sphereGeo = new THREE.SphereGeometry(1, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereGroup.add(sphereMesh);

    // 2. Equatorial Circle & Meridian Rings
    const createRing = (radius: number, color: number, rotation: [number, number, number]) => {
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 });
      const ring = new THREE.Line(ringGeo, ringMat);
      ring.rotation.set(...rotation);
      return ring;
    };

    sphereGroup.add(createRing(1, 0x22d3ee, [Math.PI / 2, 0, 0])); // XY Equator
    sphereGroup.add(createRing(1, 0xffffff, [0, 0, 0])); // XZ Meridian
    sphereGroup.add(createRing(1, 0x3b82f6, [0, Math.PI / 2, 0])); // YZ Meridian

    // 3. Axes X, Y, Z
    const createAxis = (from: THREE.Vector3, to: THREE.Vector3, color: number) => {
      const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 });
      return new THREE.Line(geo, mat);
    };

    sphereGroup.add(createAxis(new THREE.Vector3(-1.3, 0, 0), new THREE.Vector3(1.3, 0, 0), 0xff4444)); // X
    sphereGroup.add(createAxis(new THREE.Vector3(0, -1.3, 0), new THREE.Vector3(0, 1.3, 0), 0x44ff44)); // Y
    sphereGroup.add(createAxis(new THREE.Vector3(0, 0, -1.3), new THREE.Vector3(0, 0, 1.3), 0x4488ff)); // Z

    // 4. State Vector Arrow (|psi>)
    const dir = new THREE.Vector3(x, z, y).normalize();
    const arrow = new THREE.ArrowHelper(dir, new THREE.Vector3(0, 0, 0), 1, 0x22d3ee, 0.15, 0.08);
    sphereGroup.add(arrow);
    stateVectorRef.current = arrow;

    // 5. Tip Indicator Point
    const pointGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const pointMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pointMesh = new THREE.Mesh(pointGeo, pointMat);
    pointMesh.position.set(x, z, y);
    sphereGroup.add(pointMesh);
    pointMeshRef.current = pointMesh;

    // 6. Projection Dashed Line down to XY Plane
    const projGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, z, y),
      new THREE.Vector3(x, 0, y),
    ]);
    const projMat = new THREE.LineDashedMaterial({
      color: 0x06b6d4,
      dashSize: 0.05,
      gapSize: 0.03,
      transparent: true,
      opacity: 0.5,
    });
    const projLine = new THREE.Line(projGeo, projMat);
    projLine.computeLineDistances();
    sphereGroup.add(projLine);
    projLineRef.current = projLine;

    // Mouse drag rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      sphereGroup.rotation.y += deltaX * 0.01;
      sphereGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isDragging) {
        sphereGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Vector on angle change
  useEffect(() => {
    // In Three.js: X is X, Y is Z, Z is Y for canonical physics orientation
    const vecX = Math.sin(theta) * Math.cos(phi);
    const vecY = Math.cos(theta);
    const vecZ = Math.sin(theta) * Math.sin(phi);

    const dir = new THREE.Vector3(vecX, vecY, vecZ).normalize();

    if (stateVectorRef.current) {
      stateVectorRef.current.setDirection(dir);
    }
    if (pointMeshRef.current) {
      pointMeshRef.current.position.set(vecX, vecY, vecZ);
    }
    if (projLineRef.current) {
      const positions = projLineRef.current.geometry.attributes.position;
      if (positions) {
        (positions as any).setXYZ(0, vecX, vecY, vecZ);
        (positions as any).setXYZ(1, vecX, 0, vecZ);
        positions.needsUpdate = true;
        projLineRef.current.computeLineDistances();
      }
    }
  }, [theta, phi]);

  const applyPreset = (presetName: string, t: number, p: number) => {
    setActivePreset(presetName);
    setTheta(t);
    setPhi(p);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Sparkles size={14} />
          <span className="font-bold tracking-wider uppercase">SPHÈRE DE BLOCH 3D · ÉTAT QUBIT</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
          |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩
        </span>
      </div>

      {/* 3D Visualizer Canvas */}
      <div className="relative w-full h-[280px] rounded-2xl bg-black/70 border border-white/5 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />
        
        {/* Poles Labels */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white bg-zinc-900/80 px-2 py-0.5 rounded border border-white/10 pointer-events-none">
          |0⟩ (Pôle Nord)
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-white/10 pointer-events-none">
          |1⟩ (Pôle Sud)
        </div>
        <div className="absolute top-2 right-2 text-[9px] font-mono text-zinc-500 bg-black/60 px-2 py-1 rounded pointer-events-none">
          Glisser pour pivoter
        </div>
      </div>

      {/* State Presets */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
          États de superposition canoniques :
        </span>
        <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
          {[
            { id: 'zero', label: '|0⟩', t: 0, p: 0 },
            { id: 'one', label: '|1⟩', t: Math.PI, p: 0 },
            { id: 'plus', label: '|+⟩', t: Math.PI / 2, p: 0 },
            { id: 'superposition', label: '|ψ_psig⟩', t: Math.PI / 3, p: Math.PI / 4 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => applyPreset(item.id, item.t, item.p)}
              className={`py-1.5 rounded-lg border transition-all text-center ${
                activePreset === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 font-bold'
                  : 'bg-zinc-900/50 text-zinc-400 border-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Angle Sliders */}
      <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-400">
            <span>Angle polaire (θ) :</span>
            <span className="text-cyan-300">{(theta / Math.PI).toFixed(2)}π</span>
          </div>
          <input
            type="range"
            min="0"
            max={Math.PI}
            step="0.02"
            value={theta}
            onChange={(e) => {
              setTheta(parseFloat(e.target.value));
              setActivePreset('custom');
            }}
            className="w-full accent-cyan-400 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-400">
            <span>Angle azimutal (φ) :</span>
            <span className="text-cyan-300">{(phi / Math.PI).toFixed(2)}π</span>
          </div>
          <input
            type="range"
            min="0"
            max={Math.PI * 2}
            step="0.02"
            value={phi}
            onChange={(e) => {
              setPhi(parseFloat(e.target.value));
              setActivePreset('custom');
            }}
            className="w-full accent-cyan-400 bg-zinc-800 rounded-lg cursor-pointer h-1.5"
          />
        </div>
      </div>

      {/* Measurement Telemetry */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/5 grid grid-cols-3 gap-3 text-center text-xs font-mono">
        <div>
          <span className="text-zinc-500 block text-[10px]">Probabilité P(|0⟩)</span>
          <span className="text-cyan-400 font-bold text-sm">{prob0}%</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">Probabilité P(|1⟩)</span>
          <span className="text-white font-bold text-sm">{prob1}%</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">Espérance ⟨σ_z⟩</span>
          <span className="text-emerald-400 font-bold text-sm">{z.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
