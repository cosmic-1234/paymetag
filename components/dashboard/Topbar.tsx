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
  Menu,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_USERS } from "@/lib/mockData";

export const Topbar: React.FC<{
  onOpenFbar?: () => void;
  onOpenAiCopilot?: () => void;
  onToggleMobileNav?: () => void;
}> = ({ onOpenFbar, onOpenAiCopilot, onToggleMobileNav }) => {
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
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] border-b border-slate-200/70 dark:border-white/[0.08] bg-white/85 dark:bg-[#0F1523]/85 backdrop-blur-md px-3 sm:px-6 shadow-[0px_1px_6px_rgba(0,0,0,0.03)] flex items-center justify-between transition-colors">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LEFT SECTION — Mobile Drawer Toggle & Logo lockup
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleMobileNav}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 shrink-0 cursor-pointer transition-colors"
          aria-label="Toggle navigation drawer"
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="flex items-center group cursor-pointer select-none">
          <img
            src="/deshboard-logo.png"
            alt="DeshBoard"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CENTER SECTION — Clean Wealth metric (Centered)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="flex items-center gap-3 bg-white dark:bg-white/[0.04] border border-[#D8E6E4] dark:border-white/10 rounded-full px-4 py-1.5 shadow-2xs">
          <span className="font-bold text-[10px] tracking-wider text-slate-400 uppercase">
            Indian Wealth
          </span>
          <span className="font-extrabold text-[17px] tracking-tight text-[#001535] dark:text-white leading-none font-sans">
            {formattedWealth}
          </span>
          <button
            onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
            className="border border-[#C6DFDD] dark:border-white/15 bg-[#EEF5F4] dark:bg-teal-950/40 rounded-full px-2.5 py-[3px] font-bold text-[10px] text-[#336765] dark:text-teal-300 hover:bg-[#DCEEEB] transition-colors cursor-pointer select-none shadow-2xs"
            title="Toggle currency display"
          >
            {currency === "INR" ? "$ USD" : "₹ INR"}
          </button>
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
              isSyncing ? "animate-spin text-[#336765]" : ""
            }`}
          />
          <span>Refresh Banks</span>
        </button>

        {/* "US Tax Report (FBAR)" button: Blade Primary Outline button */}
        {onOpenFbar && (
          <button
            onClick={onOpenFbar}
            className="hidden 2xl:flex items-center gap-1.5 border border-[#336765] text-[#336765] bg-transparent rounded-lg px-3.5 py-2 font-bold text-[13px] hover:bg-[#EEF5F4] dark:hover:bg-teal-950/30 transition-all cursor-pointer"
          >
            <FileDown className="h-3.5 w-3.5 text-[#336765]" />
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
                <span className="text-xs font-bold text-[#001535] dark:text-white">
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
                      <span className="font-bold text-[#001535] dark:text-white truncate">
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
            {/* Avatar: 28px circle, dynamic initials, bg #001535 */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#001535] text-white font-bold text-[11px]">
              {userInitials}
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-semibold text-[13px] text-[#111827] dark:text-white leading-tight">
                {activeUser?.name || "Brijal Patel"}
              </div>
              <div className="font-normal text-[11px] text-[#9CA3AF] leading-none mt-0.5">
                {activeUser?.location?.split(",")[0] || "NRI"}
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" />
          </button>

          {/* User Switcher Dropdown */}
          {isFamilyOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-2 shadow-xl z-50 backdrop-blur-sm">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF] border-b border-[#F3F4F6] dark:border-white/[0.06]">
                Switch User Portfolio
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
                        ? "bg-[#EEF5F4] dark:bg-teal-950/30 text-[#336765] font-bold"
                        : "hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#336765] text-[10px] font-bold text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#001535] dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF]">
                        {user.location} • PAN: {user.pan}
                      </div>
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
