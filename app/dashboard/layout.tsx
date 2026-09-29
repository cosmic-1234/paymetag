"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
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
      {/* Fixed Full-Width Frosted Blade Navbar */}
      <Topbar
        onOpenFbar={() => setIsFbarOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        onOpenAiCopilot={() => setIsAiOpen(true)}
      />

      <div className="flex min-h-screen">
        {/* Left Navigation (Responsive Drawer on Mobile/Tablet, Collapsible Frosted on Desktop) */}
        <Sidebar
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          onOpenAiCopilot={() => setIsAiOpen(true)}
        />

        {/* Main Content Container (Centered max 1280px with responsive padding & dynamic sidebar margin) */}
        <div
          className={`flex-1 ${
            isSidebarCollapsed ? "lg:ml-[76px]" : "lg:ml-[240px]"
          } pt-[64px] min-h-screen w-full overflow-x-hidden transition-[margin] duration-300 ease-in-out`}
        >
          <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 lg:pb-8 space-y-6 sm:space-y-8">
            {children}
          </main>
        </div>
      </div>

      {/* Floating Glassmorphic Bottom Navigation Bar (Mobile & Tablet Viewports) */}
      <MobileBottomNav
        onOpenAiCopilot={() => {
          setAiInitialQuery(undefined);
          setIsAiOpen(true);
        }}
        onOpenDrawer={() => setIsMobileNavOpen((prev) => !prev)}
      />

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
    </div>
  );
}
