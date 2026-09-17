"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeFloatingElementsProps {
  className?: string;
  type?: "coin" | "card" | "shield" | "all";
}

export const ThreeFloatingElements: React.FC<ThreeFloatingElementsProps> = ({
  className = "",
  type = "all",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Studio Lights for high-end Razorpay 3D shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0b72e7, 3);
    dirLight1.position.set(30, 40, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 2);
    dirLight2.position.set(-30, -20, 30);
    scene.add(dirLight2);

    const group = new THREE.Group();
    scene.add(group);

    // 1. 3D GOLD RUPEE COIN
    const coinGeo = new THREE.CylinderGeometry(11, 11, 2, 40);
    const coinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.5,
    });
    const coin = new THREE.Mesh(coinGeo, coinMat);
    coin.rotation.x = Math.PI / 3;
    coin.position.set(-18, 5, 5);
    if (type === "coin" || type === "all") group.add(coin);

    // Inner rim of coin
    const rimGeo = new THREE.TorusGeometry(9.5, 0.8, 16, 40);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.15,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    coin.add(rim);

    // 2. 3D RAZORPAY BLUE DEBIT CARD
    const cardGeo = new THREE.BoxGeometry(22, 14, 0.8);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x0b72e7,
      metalness: 0.6,
      roughness: 0.25,
    });
    const card = new THREE.Mesh(cardGeo, cardMat);
    card.position.set(16, -4, 8);
    card.rotation.set(0.3, -0.4, 0.2);
    if (type === "card" || type === "all") group.add(card);

    // Gold EMV Chip on card
    const chipGeo = new THREE.BoxGeometry(4, 3, 0.9);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(-5, 1, 0.1);
    card.add(chip);

    // 3. 3D SHINY SECURITY SHIELD
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 10);
    shieldShape.quadraticCurveTo(8, 10, 8, 4);
    shieldShape.quadraticCurveTo(8, -6, 0, -11);
    shieldShape.quadraticCurveTo(-8, -6, -8, 4);
    shieldShape.quadraticCurveTo(-8, 10, 0, 10);

    const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: 0.6, bevelThickness: 0.6 };
    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x0c2340,
      metalness: 0.8,
      roughness: 0.2,
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shield.position.set(0, 12, -5);
    shield.scale.set(0.9, 0.9, 0.9);
    if (type === "shield" || type === "all") group.add(shield);

    // 4. FLOATING ORBITAL PARTICLES
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 80;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x0b72e7,
      size: 1.5,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeo, pMat);
    group.add(particles);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * -2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous 3D rotation & hover physics
      coin.rotation.y += 0.02;
      coin.position.y = 5 + Math.sin(elapsedTime * 2) * 2;

      card.rotation.y = -0.4 + Math.sin(elapsedTime * 1.5) * 0.2;
      card.rotation.x = 0.3 + Math.cos(elapsedTime * 1.5) * 0.15;
      card.position.y = -4 + Math.cos(elapsedTime * 1.8) * 1.8;

      shield.rotation.y = Math.sin(elapsedTime * 1.2) * 0.25;
      shield.position.y = 12 + Math.sin(elapsedTime * 2.2) * 1.5;

      // Group responds to mouse tilt smoothly
      group.rotation.y += (mouseX * 0.6 - group.rotation.y) * 0.05;
      group.rotation.x += (mouseY * 0.4 - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div ref={containerRef} className="h-full w-full pointer-events-none" />
    </div>
  );
};
