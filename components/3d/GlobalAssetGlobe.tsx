"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobalAssetGlobeProps {
  className?: string;
}

export const GlobalAssetGlobe: React.FC<GlobalAssetGlobeProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let globeInstance: any = null;
    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;

    const initGlobe = async () => {
      try {
        const GlobeModule = await import("globe.gl");
        const Globe = GlobeModule.default;

        if (!isMounted || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth || 500;
        const height = container.clientHeight || 500;

        globeInstance = (Globe as any)()(container)
          .width(width)
          .height(height)
          .globeImageUrl(null)
          .backgroundColor("rgba(0,0,0,0)")
          .showAtmosphere(true)
          .atmosphereColor("#3B82F6")
          .atmosphereAltitude(0.18)
          .polygonCapColor((feat: any) => {
            const name = feat.properties?.NAME || feat.properties?.name || feat.properties?.ADMIN;
            return name === "India" ? "rgba(52, 81, 209, 0.75)" : "rgba(255, 255, 255, 0.04)";
          })
          .polygonSideColor(() => "rgba(52, 81, 209, 0.15)")
          .polygonStrokeColor((feat: any) => {
            const name = feat.properties?.NAME || feat.properties?.name || feat.properties?.ADMIN;
            return name === "India" ? "#60A5FA" : "rgba(99, 132, 255, 0.35)";
          })
          .polygonAltitude((feat: any) => {
            const name = feat.properties?.NAME || feat.properties?.name || feat.properties?.ADMIN;
            return name === "India" ? 0.025 : 0.005;
          })
          .arcsData([
            {
              startLat: 20.5,
              startLng: 78.9, // India center
              endLat: 37.7,
              endLng: -122.4, // San Jose, USA
              color: ["#F59E0B", "#3B82F6"],
              stroke: 1.2,
            },
            {
              startLat: 20.5,
              startLng: 78.9,
              endLat: 25.2,
              endLng: 55.3, // Dubai, UAE
              color: ["#F59E0B", "#10B981"],
              stroke: 1.2,
            },
            {
              startLat: 20.5,
              startLng: 78.9,
              endLat: 51.5,
              endLng: -0.12, // London, UK
              color: ["#F59E0B", "#8B5CF6"],
              stroke: 1.2,
            },
          ])
          .arcColor("color")
          .arcStroke("stroke")
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(1500)
          .arcAltitude(0.3)
          .pointsData([
            { lat: 37.7, lng: -122.4, label: "San Jose" },
            { lat: 25.2, lng: 55.3, label: "Dubai" },
            { lat: 51.5, lng: -0.12, label: "London" },
            { lat: 20.5, lng: 78.9, label: "India" },
          ])
          .pointColor(() => "#F59E0B")
          .pointAltitude(0.01)
          .pointRadius(0.65)
          .htmlElementsData([
            { lat: 37.7, lng: -122.4, label: "San Jose, CA · 🇺🇸" },
            { lat: 25.2, lng: 55.3, label: "Dubai · 🇦🇪" },
            { lat: 51.5, lng: -0.12, label: "London · 🇬🇧" },
          ])
          .htmlElement((d: any) => {
            const el = document.createElement("div");
            el.innerHTML = `<span>${d.label}</span>`;
            el.style.fontFamily = "var(--font-mulish), sans-serif";
            el.style.fontSize = "11px";
            el.style.fontWeight = "600";
            el.style.color = "#FFFFFF";
            el.style.backgroundColor = "rgba(6, 11, 24, 0.9)";
            el.style.border = "1px solid rgba(99, 132, 255, 0.3)";
            el.style.padding = "4px 10px";
            el.style.borderRadius = "6px";
            el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.6)";
            el.style.pointerEvents = "auto";
            el.style.userSelect = "none";
            el.style.whiteSpace = "nowrap";
            el.style.transform = "translate(-50%, -120%)";
            el.style.backdropFilter = "blur(4px)";
            return el;
          })
          .htmlAltitude(0.04);

        // Customize Globe Surface to #0A1628 (dark ocean)
        if (globeInstance.globeMaterial) {
          const mat = globeInstance.globeMaterial();
          if (mat) {
            mat.color = new THREE.Color("#0A1628");
            mat.emissive = new THREE.Color("#050D19");
          }
        }

        // Camera must instantly point at India on mount (0ms delay)
        globeInstance.pointOfView({ lat: 22, lng: 80, altitude: 2.0 }, 0);

        // Controls
        const controls = globeInstance.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.45;
          controls.enableZoom = false;
        }

        // Load Countries GeoJSON
        try {
          const res = await fetch("/data/countries.json");
          if (res.ok) {
            const data = await res.json();
            if (isMounted && globeInstance) {
              globeInstance.polygonsData(data.features);
              // Re-affirm India center position without resetting
              globeInstance.pointOfView({ lat: 22, lng: 80, altitude: 2.0 }, 0);
              setLoading(false);
            }
          } else {
            const fallbackRes = await fetch(
              "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
            );
            const fallbackData = await fallbackRes.json();
            if (isMounted && globeInstance) {
              globeInstance.polygonsData(fallbackData.features);
              globeInstance.pointOfView({ lat: 22, lng: 80, altitude: 2.0 }, 0);
              setLoading(false);
            }
          }
        } catch (fetchErr) {
          console.error("Failed to load country polygons:", fetchErr);
          setLoading(false);
        }

        // Responsive resizing
        resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            if (globeInstance && entry.contentRect.width > 0 && entry.contentRect.height > 0) {
              globeInstance.width(entry.contentRect.width);
              globeInstance.height(entry.contentRect.height);
            }
          }
        });
        resizeObserver.observe(container);
      } catch (err) {
        console.error("Error initializing globe:", err);
      }
    };

    initGlobe();

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (globeInstance && typeof globeInstance._destructor === "function") {
        globeInstance._destructor();
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
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
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="h-6 w-6 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
};
