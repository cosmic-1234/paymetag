"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeWaveMesh: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 25, 45);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3D Grid Wave Points
    const cols = 55;
    const rows = 35;
    const numPoints = cols * rows;
    const positions = new Float32Array(numPoints * 3);

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        positions[idx * 3] = (i - cols / 2) * 2.2;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (j - rows / 2) * 2.2;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x0b72e7,
      size: 1.6,
      transparent: true,
      opacity: 0.7,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const time = clock.getElapsedTime() * 1.5;
      const pos = geometry.attributes.position.array as Float32Array;

      let pIdx = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          pos[pIdx * 3 + 1] = Math.sin(i * 0.25 + time) * 2.5 + Math.cos(j * 0.25 + time) * 2.5;
          pIdx++;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`pointer-events-none absolute inset-0 ${className}`} />;
};
