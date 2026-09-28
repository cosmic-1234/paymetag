"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import countriesData from "@/public/data/countries.json";

interface GlobalAssetGlobeProps {
  className?: string;
}

export const GlobalAssetGlobe: React.FC<GlobalAssetGlobeProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    camera.position.z = 62;

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported in browser", e);
      return;
    }

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.0);
    dirLight1.position.set(45, 30, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.8);
    dirLight2.position.set(-45, -25, 30);
    scene.add(dirLight2);

    // 4. Main Rotating Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 20;

    // 5. Render Real High-Resolution World Map on Equirectangular Canvas
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Deep Institutional Navy Ocean
    ctx.fillStyle = "#071324";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Precision Graticule Grid
    ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 128) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Real GeoJSON Boundaries for all 177 Countries
    const features = (countriesData as any).features || [];
    features.forEach((feature: any) => {
      const isIndia =
        feature.properties?.NAME === "India" ||
        feature.properties?.ADMIN === "India" ||
        feature.properties?.ISO_A3 === "IND";

      const geom = feature.geometry;
      if (!geom) return;

      // Theme-matching colors:
      // Non-India countries: translucent high-tech slate/navy with electric cyan outlines
      // India: prominent Razorpay blue fill with gold boundary
      ctx.fillStyle = isIndia ? "rgba(11, 114, 231, 0.75)" : "rgba(15, 33, 64, 0.85)";
      ctx.strokeStyle = isIndia ? "#F59E0B" : "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = isIndia ? 2.5 : 1;

      const drawRing = (ring: [number, number][]) => {
        if (!ring || ring.length === 0) return;
        ctx.beginPath();
        ring.forEach(([lng, lat], idx) => {
          const x = ((lng + 180) / 360) * canvas.width;
          const y = ((90 - lat) / 180) * canvas.height;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      if (geom.type === "Polygon") {
        geom.coordinates.forEach((ring: [number, number][]) => drawRing(ring));
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach((poly: [number, number][][]) => {
          poly.forEach((ring: [number, number][]) => drawRing(ring));
        });
      }
    });

    const earthTexture = new THREE.CanvasTexture(canvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;

    // 6. Realistic Globe Sphere Mesh
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.5,
      metalness: 0.25,
      emissive: new THREE.Color("#050D19"),
      emissiveIntensity: 0.6,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // 7. Glowing Atmospheric Outer Halo
    const glowGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 48, 48);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // 8. Equator / Orbital Ring
    const ringGeo = new THREE.RingGeometry(GLOBE_RADIUS * 1.1, GLOBE_RADIUS * 1.28, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0b72e7,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.15;
    globeGroup.add(ringMesh);

    // Helper: Convert Lat/Lng to 3D Cartesian coordinates
    const toVector3 = (lat: number, lng: number, r = GLOBE_RADIUS) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Helper: Create 3D Billboard Sprite Badge that tracks rotating hubs
    const create3dTag = (
      text: string,
      flag: string,
      bgColor: string,
      borderColor: string,
      textColor = "#ffffff"
    ) => {
      const c = document.createElement("canvas");
      c.width = 360;
      c.height = 76;
      const cx = c.getContext("2d")!;

      cx.fillStyle = bgColor;
      cx.strokeStyle = borderColor;
      cx.lineWidth = 3;
      cx.beginPath();
      // Round pill shape
      if (typeof (cx as any).roundRect === "function") {
        (cx as any).roundRect(4, 4, c.width - 8, c.height - 8, 16);
      } else {
        cx.rect(4, 4, c.width - 8, c.height - 8);
      }
      cx.fill();
      cx.stroke();

      cx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      cx.fillStyle = textColor;
      cx.textAlign = "center";
      cx.textBaseline = "middle";
      cx.fillText(`${text}  ${flag}`, c.width / 2, c.height / 2);

      const tex = new THREE.CanvasTexture(c);
      const spriteMat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(6.8, 1.45, 1);
      return sprite;
    };

    // 9. Sovereign NRI Operating Hubs
    const hubs = [
      {
        name: "India (Mumbai)",
        flag: "🇮🇳",
        lat: 19.076,
        lng: 72.877,
        color: 0xf59e0b,
        bgColor: "rgba(12, 35, 64, 0.95)",
        borderColor: "#F59E0B",
        textColor: "#F59E0B",
        isCenter: true,
      },
      {
        name: "San Jose, CA",
        flag: "🇺🇸",
        lat: 37.338,
        lng: -121.886,
        color: 0x38bdf8,
        bgColor: "rgba(7, 19, 36, 0.92)",
        borderColor: "#38BDF8",
        textColor: "#FFFFFF",
        isCenter: false,
      },
      {
        name: "Dubai",
        flag: "🇦🇪",
        lat: 25.204,
        lng: 55.270,
        color: 0x10b981,
        bgColor: "rgba(7, 19, 36, 0.92)",
        borderColor: "#10B981",
        textColor: "#FFFFFF",
        isCenter: false,
      },
      {
        name: "London",
        flag: "🇬🇧",
        lat: 51.507,
        lng: -0.1278,
        color: 0xa855f7,
        bgColor: "rgba(7, 19, 36, 0.92)",
        borderColor: "#A855F7",
        textColor: "#FFFFFF",
        isCenter: false,
      },
    ];

    const hubPositions = hubs.map((h) => ({
      ...h,
      pos: toVector3(h.lat, h.lng, GLOBE_RADIUS * 1.01),
    }));

    // Add 3D Hub Markers & Attached Tracking Billboard Badges
    hubPositions.forEach((h) => {
      // 3D Pin
      const pinGeo = new THREE.SphereGeometry(h.isCenter ? 0.75 : 0.5, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: h.color });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(h.pos);
      globeGroup.add(pinMesh);

      // Glowing Pulse Ring
      const ringG = new THREE.RingGeometry(h.isCenter ? 1.0 : 0.7, h.isCenter ? 1.4 : 0.95, 32);
      const ringM = new THREE.MeshBasicMaterial({
        color: h.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ringMsh = new THREE.Mesh(ringG, ringM);
      ringMsh.position.copy(h.pos);
      ringMsh.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ringMsh);

      // 3D Tracking Badge floating just above the pin
      const tag = create3dTag(h.name, h.flag, h.bgColor, h.borderColor, h.textColor);
      tag.position.copy(h.pos.clone().multiplyScalar(1.15));
      globeGroup.add(tag);
    });

    // 10. Sovereign Cross-Border Flight & Remittance Arcs
    const indiaPos = hubPositions.find((h) => h.isCenter)!.pos;
    const arcPulses: { mesh: THREE.Mesh; points: THREE.Vector3[]; progress: number; speed: number }[] = [];

    const foreignHubs = hubPositions.filter((h) => !h.isCenter);

    foreignHubs.forEach((hub) => {
      const start = hub.pos;
      const end = indiaPos;

      // Arc apex elevates outward smoothly
      const distance = start.distanceTo(end);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const altitude = GLOBE_RADIUS + distance * 0.28;
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(60);

      // Arc Line
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: hub.color,
        transparent: true,
        opacity: 0.65,
        linewidth: 2,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Moving Light Pulse (Representing live capital & data sync)
      const pulseGeo = new THREE.SphereGeometry(0.38, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeGroup.add(pulseMesh);

      arcPulses.push({
        mesh: pulseMesh,
        points,
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.004,
      });
    });

    // Initial View: Beautifully Centered on India and the Middle East / Europe
    globeGroup.rotation.y = -Math.PI / 1.7;
    globeGroup.rotation.x = 0.22;

    // Interactive Drag Controls
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

    // Mobile Touch Controls
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

    // Responsive Resize Observer
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

    // Animation Loop: 60 FPS Auto-Rotation & Pulse Travelling
    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
      }

      // Animate Arcs Pulses
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

    // Cleanup
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
      ringGeo.dispose();
      ringMat.dispose();
      earthTexture.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-[280px] h-[280px] min-[380px]:w-[340px] min-[380px]:h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[520px] lg:h-[520px] xl:w-[560px] xl:h-[560px] max-w-full flex items-center justify-center bg-transparent border-0 shadow-none select-none before:absolute before:inset-[-10%] before:rounded-full before:bg-[radial-gradient(circle,rgba(52,81,209,0.25)_0%,transparent_70%)] before:pointer-events-none before:z-0 ${className}`}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
