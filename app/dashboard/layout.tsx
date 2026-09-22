"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { FbarExportModal } from "@/components/dashboard/Modals/FbarExportModal";
import { SovereignCopilotDrawer } from "@/components/dashboard/AiCopilot/SovereignCopilotDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isFbarOpen, setIsFbarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);

  // Automatically close mobile sidebar on navigation
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsAiOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      if (customEvent.detail?.query) {
        setAiInitialQuery(customEvent.detail.query);
      }
      setIsAiOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-ai-copilot" as any, handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-ai-copilot" as any, handleCustomOpen);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F1A] text-slate-900 dark:text-white overflow-x-hidden">
      {/* Fixed Full-Width Blade Navbar */}
      <Topbar
        onOpenFbar={() => setIsFbarOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
      />

      <div className="flex min-h-screen">
        {/* Left Navigation (Responsive Drawer on Mobile/Tablet, Fixed on Desktop) */}
        <Sidebar
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />

        {/* Main Content Container (Centered max 1280px with responsive padding) */}
        <div className="flex-1 lg:ml-[240px] pt-[64px] min-h-screen w-full overflow-x-hidden">
          <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
            {children}
          </main>
        </div>
      </div>

      {/* Global FBAR Compliance Modal */}
      <FbarExportModal isOpen={isFbarOpen} onClose={() => setIsFbarOpen(false)} />

      {/* Global Sovereign AI Intelligence Copilot */}
      <SovereignCopilotDrawer
        isOpen={isAiOpen}
        onClose={() => {
          setIsAiOpen(false);
          setAiInitialQuery(undefined);
        }}
        initialQuery={aiInitialQuery}
      />

      {/* Floating Sovereign AI Action Pill (Right Bottom Corner) */}
      <aside className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setAiInitialQuery(undefined);
            setIsAiOpen(true);
          }}
          className="flex items-center rounded-full border border-[#3451D1]/40 bg-[#0D2266] hover:bg-[#1D3FAD] text-white px-5 py-2.5 shadow-[0px_8px_24px_rgba(13,34,102,0.32)] hover:shadow-[0px_12px_32px_rgba(29,63,173,0.45)] transition-all cursor-pointer select-none"
          title="Open Sovereign AI Intelligence"
        >
          <span className="font-bold text-[13px] tracking-tight">
            Sovereign AI
          </span>
        </button>
      </aside>
    </div>
  );
}
