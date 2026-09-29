"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Landmark,
  TrendingUp,
  BrainCircuit,
  Grid,
} from "lucide-react";
import { useApp } from "@/lib/store";

interface MobileBottomNavProps {
  onOpenAiCopilot: () => void;
  onOpenDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenAiCopilot,
  onOpenDrawer,
}) => {
  const pathname = usePathname();
  const { accounts } = useApp();

  const hasAccountAlert = accounts.some(
    (a) => a.status === "kyc_expired" || a.status === "dormant"
  );

  const isHomeActive = pathname === "/dashboard";
  const isAccountsActive = pathname === "/dashboard/accounts";
  const isInvestActive = pathname === "/dashboard/investments";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden rounded-t-2xl py-2 px-3 bg-white/90 dark:bg-[#0F1523]/90 backdrop-blur-md border-t border-slate-200/80 dark:border-white/10 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]"
      style={{ backdropFilter: "blur(12px)" }}
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* 1. Home / Overview */}
        <Link
          href="/dashboard"
          className="flex-1 flex flex-col items-center justify-center py-1 group select-none cursor-pointer"
        >
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-xl transition-all duration-200 ${
              isHomeActive
                ? "bg-[#EEF2FF] dark:bg-[#3451D1]/20 text-[#3451D1] shadow-xs"
                : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span
            className={`mt-1 text-[11px] font-medium transition-colors ${
              isHomeActive
                ? "text-[#3451D1] font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Overview
          </span>
        </Link>

        {/* 2. Bank Accounts */}
        <Link
          href="/dashboard/accounts"
          className="flex-1 flex flex-col items-center justify-center py-1 group relative select-none cursor-pointer"
        >
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-xl transition-all duration-200 ${
              isAccountsActive
                ? "bg-[#EEF2FF] dark:bg-[#3451D1]/20 text-[#3451D1] shadow-xs"
                : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
            }`}
          >
            <Landmark className="h-5 w-5" />
            {hasAccountAlert && (
              <span className="absolute top-1.5 right-6 h-2 w-2 rounded-full bg-[#EF4444] animate-pulse ring-2 ring-white dark:ring-[#0F1523]" />
            )}
          </div>
          <span
            className={`mt-1 text-[11px] font-medium transition-colors ${
              isAccountsActive
                ? "text-[#3451D1] font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Banks
          </span>
        </Link>

        {/* 3. Sovereign AI Center Button (Elevated, Goinri-style) */}
        <div className="flex-1 flex flex-col items-center justify-center select-none">
          <button
            onClick={onOpenAiCopilot}
            type="button"
            className="group relative -mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0D2266] via-[#1D3FAD] to-[#3451D1] text-white shadow-[0_6px_20px_rgba(13,34,102,0.38)] border-2 border-white dark:border-[#0F1523] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Open Sovereign AI Copilot"
            aria-label="Open Sovereign AI"
          >
            <BrainCircuit className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            {/* Pulsing Green Online Beacon */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#0F1523]" />
            </span>
          </button>
          <span className="mt-1 text-[10px] font-bold tracking-tight bg-gradient-to-r from-[#0D2266] to-[#3451D1] dark:from-sky-400 dark:to-indigo-300 bg-clip-text text-transparent">
            Sovereign AI
          </span>
        </div>

        {/* 4. Investments */}
        <Link
          href="/dashboard/investments"
          className="flex-1 flex flex-col items-center justify-center py-1 group select-none cursor-pointer"
        >
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-xl transition-all duration-200 ${
              isInvestActive
                ? "bg-[#EEF2FF] dark:bg-[#3451D1]/20 text-[#3451D1] shadow-xs"
                : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
            }`}
          >
            <TrendingUp className="h-5 w-5" />
          </div>
          <span
            className={`mt-1 text-[11px] font-medium transition-colors ${
              isInvestActive
                ? "text-[#3451D1] font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Invest
          </span>
        </Link>

        {/* 5. All Services / Full Menu Drawer */}
        <button
          onClick={onOpenDrawer}
          type="button"
          className="flex-1 flex flex-col items-center justify-center py-1 group select-none cursor-pointer"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-xl text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-all duration-200">
            <Grid className="h-5 w-5" />
          </div>
          <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
            Services
          </span>
        </button>
      </div>
    </nav>
  );
};
