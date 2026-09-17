"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { FbarExportModal } from "@/components/dashboard/Modals/FbarExportModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFbarOpen, setIsFbarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F1A] text-slate-900 dark:text-white">
      {/* Fixed Full-Width Blade Navbar */}
      <Topbar onOpenFbar={() => setIsFbarOpen(true)} />

      <div className="flex min-h-screen">
        {/* Fixed Left Blade Navigation (240px) */}
        <Sidebar />

        {/* Main Content Container (Centered max 1280px with 24px padding) */}
        <div className="flex-1 ml-[240px] pt-[64px] min-h-screen">
          <main className="max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
            {children}
          </main>
        </div>
      </div>

      {/* Global FBAR Compliance Modal */}
      <FbarExportModal isOpen={isFbarOpen} onClose={() => setIsFbarOpen(false)} />
    </div>
  );
}
