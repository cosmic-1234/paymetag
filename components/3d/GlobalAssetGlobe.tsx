"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobalAssetGlobeProps {
  className?: string;
}

export const GlobalAssetGlobe: React.FC<GlobalAssetGlobeProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let animationFrameId: number;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 65;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(40, 30, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.8);
    dirLight2.position.set(-40, -20, 30);
    scene.add(dirLight2);

    // 4. Main Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 20;

    // Generate Procedural High-Tech Dot-Matrix Earth Texture
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Dark oceanic background
    ctx.fillStyle = "#071324";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Subtle Latitude/Longitude Grid
    ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw World Continents simplified high-tech landmass silhouettes
    ctx.fillStyle = "rgba(59, 130, 246, 0.22)";
    ctx.strokeStyle = "rgba(96, 165, 250, 0.45)";
    ctx.lineWidth = 2;

    // Helper for approximate continent polygons on equirectangular projection
    const drawLand = (pts: [number, number][]) => {
      ctx.beginPath();
      pts.forEach(([xPct, yPct], i) => {
        const x = (xPct / 100) * canvas.width;
        const y = (yPct / 100) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    // North America
    drawLand([
      [12, 18], [28, 16], [32, 28], [24, 45], [18, 48], [14, 34], [9, 24]
    ]);
    // South America
    drawLand([
      [25, 52], [35, 56], [32, 78], [28, 88], [23, 72], [22, 58]
    ]);
    // Europe
    drawLand([
      [46, 20], [56, 18], [58, 30], [52, 38], [45, 34], [43, 24]
    ]);
    // Africa
    drawLand([
      [46, 40], [58, 40], [60, 58], [54, 76], [48, 68], [42, 50]
    ]);
    // Asia
    drawLand([
      [58, 18], [82, 16], [86, 32], [78, 50], [68, 45], [62, 32]
    ]);
    // Australia
    drawLand([
      [78, 65], [88, 65], [86, 82], [76, 80]
    ]);

    // Highlight Indian Subcontinent in Glowing Blue & Amber
    ctx.fillStyle = "rgba(11, 114, 231, 0.65)";
    ctx.strokeStyle = "#F59E0B";
    ctx.lineWidth = 2.5;
    drawLand([
      [68, 38], [72, 38], [74, 48], [71, 56], [68, 48]
    ]);

    const earthTexture = new THREE.CanvasTexture(canvas);

    // Globe Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,
      metalness: 0.3,
      emissive: new THREE.Color("#050D19"),
      emissiveIntensity: 0.8,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // Atmosphere Glow Outer Shell
    const glowGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 48, 48);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // Outer Halo Rim
    const haloGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.08, GLOBE_RADIUS * 1.25, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x0b72e7,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.2;
    globeGroup.add(haloMesh);

    // Lat/Long to 3D Cartesian coordinates
    const toVector3 = (lat: number, lng: number, r = GLOBE_RADIUS) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // 4 Key Sovereign Hubs
    const hubs = [
      { name: "India (Mumbai)", lat: 19.076, lng: 72.877, color: 0xf59e0b, isCenter: true },
      { name: "San Jose, USA", lat: 37.338, lng: -121.886, color: 0x38bdf8, isCenter: false },
      { name: "Dubai, UAE", lat: 25.204, lng: 55.270, color: 0x10b981, isCenter: false },
      { name: "London, UK", lat: 51.507, lng: -0.1278, color: 0xa855f7, isCenter: false },
    ];

    const hubPositions = hubs.map((h) => ({
      ...h,
      pos: toVector3(h.lat, h.lng, GLOBE_RADIUS * 1.01),
    }));

    // Add Markers for Hubs
    hubPositions.forEach((h) => {
      // Core Pin Dot
      const pinGeo = new THREE.SphereGeometry(h.isCenter ? 0.65 : 0.45, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: h.color });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(h.pos);
      globeGroup.add(pinMesh);

      // Pulse Ring
      const ringGeo = new THREE.RingGeometry(h.isCenter ? 0.9 : 0.6, h.isCenter ? 1.2 : 0.8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: h.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(h.pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ringMesh);
    });

    // Create 3 Sovereign Cross-Border Flight/Transfer Arcs
    const indiaPos = hubPositions.find((h) => h.isCenter)!.pos;
    const arcPointsList: THREE.Vector3[][] = [];
    const arcPulses: { mesh: THREE.Mesh; points: THREE.Vector3[]; progress: number; speed: number }[] = [];

    const foreignHubs = hubPositions.filter((h) => !h.isCenter);

    foreignHubs.forEach((hub) => {
      const start = hub.pos;
      const end = indiaPos;

      // Arc apex elevates outward
      const distance = start.distanceTo(end);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const altitude = GLOBE_RADIUS + distance * 0.28;
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      arcPointsList.push(points);

      // Arc Line
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: hub.color,
        transparent: true,
        opacity: 0.5,
        linewidth: 2,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Moving Light Pulse on Arc
      const pulseGeo = new THREE.SphereGeometry(0.35, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pulseMesh);

      arcPulses.push({
        mesh: pulseMesh,
        points,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.004,
      });
    });

    // Initial Angle pointing towards India and the Middle East / Europe
    globeGroup.rotation.y = -Math.PI / 1.5;
    globeGroup.rotation.x = 0.25;

    // Mouse Drag Interaction
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
      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          const w = entry.contentRect.width;
          const h = entry.contentRect.height;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop (60 FPS smooth auto-rotation & traveling pulses)
    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.0022; // Smooth graceful rotation
      }

      // Update light pulses travelling along arcs to India
      arcPulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) pulse.progress = 0;
        const idx = Math.floor(pulse.progress * (pulse.points.length - 1));
        const pt = pulse.points[idx];
        if (pt) pulse.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (container) {
        container.innerHTML = "";
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      earthTexture.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-[280px] h-[280px] min-[380px]:w-[330px] min-[380px]:h-[330px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] xl:w-[540px] xl:h-[540px] max-w-full flex items-center justify-center bg-transparent border-0 shadow-none select-none before:absolute before:inset-[-10%] before:rounded-full before:bg-[radial-gradient(circle,rgba(52,81,209,0.25)_0%,transparent_70%)] before:pointer-events-none before:z-0 ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
      />

      {/* Floating Institutional Gateway Badges */}
      <div className="absolute top-4 left-2 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-[#071324]/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span>San Jose, CA &bull; 🇺🇸</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-[#071324]/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Dubai &bull; 🇦🇪</span>
        </div>
      </div>

      <div className="absolute top-12 right-2 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-[#071324]/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          <span>London &bull; 🇬🇧</span>
        </div>
      </div>

      <div className="absolute bottom-10 right-8 z-20 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-[#071324]/90 px-3 py-1 text-[11px] font-bold text-amber-300 shadow-xl backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>India Hub (Mumbai) &bull; 🇮🇳</span>
        </div>
      </div>
    </div>
  );
};
