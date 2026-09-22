"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  RefreshCw,
  FileDown,
  ChevronDown,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_USERS } from "@/lib/mockData";

export const Topbar: React.FC<{
  onOpenFbar?: () => void;
  onOpenAiCopilot?: () => void;
}> = ({ onOpenFbar, onOpenAiCopilot }) => {
  const {
    activeUser,
    setActiveUser,
    currency,
    setCurrency,
    totalNetWorthINR,
    healthScore,
    alerts,
  } = useApp();

  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await fetch("/api/accounts");
    } catch (e) {}
    setTimeout(() => setIsSyncing(false), 900);
  };

  const usersList = Object.values(DEMO_USERS);
  const formattedWealth = currency === "INR" ? formatINR(totalNetWorthINR) : formatUSD(totalNetWorthINR);
  const userInitials = activeUser?.name
    ? activeUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "BP";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] border-b border-[#F0F0F0] dark:border-white/[0.06] bg-white dark:bg-[#0F1523] px-6 shadow-[0px_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-between">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LEFT SECTION — Logo lockup
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Link href="/dashboard" className="flex items-center gap-[10px] group cursor-pointer select-none">
        {/* Logo icon: 36px x 36px, rounded-[10px], linear-gradient(135deg, #3451D1, #1D3FAD) */}
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] shadow-sm shrink-0 group-hover:opacity-95 transition-opacity">
          <svg
            className="h-[20px] w-[20px] text-white"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
            <path d="M12 8v8" />
            <path d="M9.5 10.5h5" />
            <path d="M9.5 13.5h5" />
          </svg>
        </div>

        <div>
          <span className="block font-extrabold text-[16px] tracking-tight text-[#0D2266] dark:text-white leading-tight font-sans">
            DESHVAULT
          </span>
          <span className="block font-medium text-[11px] text-[#9CA3AF] leading-none mt-0.5">
            NRI Wealth Portal
          </span>
        </div>
      </Link>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CENTER SECTION — Wealth metric (Centered, no overlap)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="flex flex-col items-center">
          <span className="font-bold text-[10px] xl:text-[11px] uppercase tracking-[0.08em] text-[#9CA3AF]">
            TOTAL INDIAN WEALTH
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-extrabold text-[20px] xl:text-[24px] tracking-tight text-[#0D2266] dark:text-white leading-none font-sans">
              {formattedWealth}
            </span>

            {/* USD toggle: small pill button */}
            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="border border-[#E5E7EB] dark:border-white/[0.1] rounded-[6px] px-2 py-[2px] font-semibold text-[11px] text-[#6B7280] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
              title="Toggle currency display"
            >
              {currency === "INR" ? "$ USD" : "₹ INR"}
            </button>
          </div>
        </div>

        {/* Health Score ring & divider: Only displayed on 2XL screens (1536px+) to prevent overlap on laptops */}
        <div className="hidden 2xl:flex items-center gap-6">
          <div className="h-9 w-[1px] bg-[#F0F0F0] dark:bg-white/[0.08]" />
          <div className="flex flex-col items-center">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <svg className="h-10 w-10 -rotate-90 transform" viewBox="0 0 36 36">
                <defs>
                  <linearGradient id="gold-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                <path
                  className="text-[#F3F4F6] dark:text-white/[0.06]"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  stroke="url(#gold-stroke-grad)"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-extrabold text-[16px] text-[#0D2266] dark:text-white font-sans leading-none">
                {healthScore}
              </span>
            </div>
            <span className="font-medium text-[11px] text-[#F59E0B] leading-none mt-0.5 whitespace-nowrap">
              3 Reminders
            </span>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RIGHT SECTION — Actions & Profile
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex items-center gap-2.5">
        {/* "Refresh Banks" button: Ghost button */}
        <button
          onClick={handleSync}
          className="hidden sm:flex items-center gap-1.5 border border-[#E5E7EB] dark:border-white/[0.1] bg-transparent rounded-lg px-3 py-1.5 font-semibold text-xs text-[#374151] dark:text-slate-200 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] hover:border-[#D1D5DB] transition-all cursor-pointer"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 text-[#374151] dark:text-slate-200 ${
              isSyncing ? "animate-spin text-[#3451D1]" : ""
            }`}
          />
          <span>Refresh Banks</span>
        </button>

        {/* "US Tax Report (FBAR)" button: Blade Primary Outline button */}
        {onOpenFbar && (
          <button
            onClick={onOpenFbar}
            className="hidden 2xl:flex items-center gap-1.5 border border-[#3451D1] text-[#3451D1] bg-transparent rounded-lg px-3.5 py-2 font-bold text-[13px] hover:bg-[#EEF2FF] dark:hover:bg-blue-950/30 transition-all cursor-pointer"
          >
            <FileDown className="h-3.5 w-3.5 text-[#3451D1]" />
            <span>US Tax Report (FBAR)</span>
          </button>
        )}

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="h-5 w-5 text-[#6B7280] dark:text-slate-300" />
            <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EF4444] px-1 font-bold text-[9px] text-white border-2 border-white dark:border-[#0F1523]">
              5
            </span>
          </button>

          {/* Notifications Dropdown */}
          {isAlertsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-3 shadow-xl z-50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-[#F3F4F6] dark:border-white/[0.06] pb-2">
                <span className="text-xs font-bold text-[#0D2266] dark:text-white">
                  Action Reminders
                </span>
                <span className="text-[10px] font-bold text-[#EF4444] bg-[#FEE2E2] dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                  5 Need Action
                </span>
              </div>
              <div className="mt-2 max-h-64 space-y-2 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
                      <span className="font-bold text-[#0D2266] dark:text-white truncate">
                        {alert.title}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#6B7280] dark:text-slate-400 leading-snug">
                      {alert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User profile pill */}
        <div className="relative">
          <button
            onClick={() => setIsFamilyOpen(!isFamilyOpen)}
            className="flex items-center gap-2 bg-[#F3F4F6] dark:bg-white/[0.08] rounded-full pl-1.5 pr-3 py-1.5 hover:bg-[#E9EBF0] dark:hover:bg-white/[0.12] transition-colors cursor-pointer"
          >
            {/* Avatar: 28px circle, dynamic initials, bg #3451D1 */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3451D1] text-white font-bold text-[11px]">
              {userInitials}
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-semibold text-[13px] text-[#111827] dark:text-white leading-tight">
                {activeUser?.name || "Brijal Patel"}
              </div>
              <div className="font-normal text-[11px] text-[#9CA3AF] leading-none mt-0.5">
                {activeUser?.role === "primary_nri" ? "NRI (USA)" : activeUser?.relation || "Family"}
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" />
          </button>

          {/* Family Switcher Dropdown */}
          {isFamilyOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-2 shadow-xl z-50 backdrop-blur-sm">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF] border-b border-[#F3F4F6] dark:border-white/[0.06]">
                Family Members & Caretakers
              </div>
              <div className="mt-1 space-y-1">
                {usersList.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setActiveUser(user);
                      setIsFamilyOpen(false);
                    }}
                    className={`flex w-full items-start gap-2.5 rounded-xl p-2 text-left transition ${
                      activeUser.id === user.id
                        ? "bg-[#EEF2FF] dark:bg-blue-950/30 text-[#3451D1] font-bold"
                        : "hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#3451D1] text-[10px] font-bold text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D2266] dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF]">
                        {user.location}
                      </div>
                      {user.isPOA && (
                        <span className="mt-1 inline-block rounded-[6px] bg-[#FEF9C3] text-[#A16207] px-2 py-0.5 text-[10px] font-bold">
                          Authorized Caretaker in India (POA)
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-2 border-t border-[#F3F4F6] dark:border-white/[0.06] pt-1">
                <Link
                  href="/signin"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#EF4444] hover:bg-[#FEE2E2]/50 dark:hover:bg-rose-950/20 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
