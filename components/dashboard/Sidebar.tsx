"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  FileSpreadsheet,
  Grid,
  BrainCircuit,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Landmark,
  Building2,
  CreditCard,
  ShieldCheck,
  Scroll,
  Coins,
  PiggyBank,
  ArrowRightLeft,
  Fingerprint,
} from "lucide-react";
import { openAiCopilot } from "@/lib/aiCopilot";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onOpenAiCopilot?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  onOpenAiCopilot,
}) => {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const toggleCollapse = onToggleCollapse || (() => setInternalCollapsed((prev) => !prev));

  const handleAiTrigger = () => {
    if (onOpenAiCopilot) {
      onOpenAiCopilot();
    } else {
      openAiCopilot();
    }
  };

  // Primary 5 Navigation Items (Matching iNRI / Goinri Simplicity)
  const primaryNav = [
    {
      name: "Home",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      name: "Investments",
      href: "/dashboard/investments",
      icon: TrendingUp,
      isActive: pathname === "/dashboard/investments" || pathname === "/dashboard/alternates" || pathname === "/dashboard/retirement",
      badge: "+14.3%",
    },
    {
      name: "Services",
      href: "/dashboard/accounts",
      icon: Grid,
      isActive:
        pathname === "/dashboard/accounts" ||
        pathname === "/dashboard/property" ||
        pathname === "/dashboard/insurance" ||
        pathname === "/dashboard/will" ||
        pathname === "/dashboard/forgotten" ||
        pathname === "/dashboard/kyc",
      hasSubmenu: true,
      badge: "Action",
    },
    {
      name: "Taxation",
      href: "/dashboard/tax",
      icon: FileSpreadsheet,
      isActive: pathname === "/dashboard/tax",
      badge: "FBAR",
    },
    {
      name: "Sovereign AI",
      href: "/dashboard/ai",
      icon: BrainCircuit,
      isActive: pathname === "/dashboard/ai",
      isAi: true,
    },
  ];

  // Specific Indian Financial Services (cleanly accessible)
  const serviceSubItems = [
    { name: "Bank Accounts", href: "/dashboard/accounts", icon: Landmark, badge: "1 Alert" },
    { name: "Properties & Land", href: "/dashboard/property", icon: Building2 },
    { name: "Insurance Cover", href: "/dashboard/insurance", icon: ShieldCheck },
    { name: "Will & Caretaker", href: "/dashboard/will", icon: Scroll },
    { name: "Find Lost Money", href: "/dashboard/forgotten", icon: Search, badge: "₹1.18L" },
    { name: "Identity & KYC", href: "/dashboard/kyc", icon: Fingerprint },
    { name: "Gold & Bonds", href: "/dashboard/alternates", icon: Coins },
    { name: "PF & Pension", href: "/dashboard/retirement", icon: PiggyBank },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Glassmorphic Sidebar */}
      <aside
        style={{
          background:
            "linear-gradient(155deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.90))",
          boxShadow: "4px 0 24px rgba(13, 34, 102, 0.04)",
        }}
        className={`fixed left-0 top-[64px] bottom-0 z-50 flex flex-col justify-between border-r border-slate-200/70 dark:border-white/[0.08] dark:bg-[#0B0F1A]/95 backdrop-blur-xl px-3 py-4 overflow-y-auto no-scrollbar transition-[width,transform] duration-300 ease-in-out ${
          isCollapsed ? "lg:w-[76px]" : "lg:w-[220px]"
        } w-[260px] sm:w-[240px] ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-4">
          {/* Quick Search / Ask Pill */}
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/60 dark:border-white/[0.06]">
            {!isCollapsed ? (
              <button
                onClick={handleAiTrigger}
                type="button"
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-[#1A1F2E] border border-slate-200/80 dark:border-white/10 hover:border-[#3451D1]/60 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all shadow-2xs group cursor-pointer"
                title="Search or ask AI (Cmd+K)"
              >
                <Search className="h-4 w-4 text-[#3451D1] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium truncate">Search or ask...</span>
                <span className="ml-auto text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-white/10 rounded px-1 py-0.5">
                  ⌘K
                </span>
              </button>
            ) : (
              <button
                onClick={handleAiTrigger}
                type="button"
                className="h-10 w-10 mx-auto flex items-center justify-center rounded-xl bg-white dark:bg-[#1A1F2E] border border-slate-200/80 dark:border-white/10 text-[#3451D1] hover:bg-[#EEF2FF] dark:hover:bg-blue-950/40 transition-all shadow-2xs cursor-pointer group"
                title="Search or ask AI (Cmd+K)"
              >
                <Sparkles className="h-4 w-4 text-[#3451D1] group-hover:rotate-12 transition-transform" />
              </button>
            )}

            {/* Desktop Collapse Toggle */}
            <button
              onClick={toggleCollapse}
              type="button"
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/70 dark:border-white/10 text-slate-400 hover:text-[#0D2266] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Clean 5-Item Navigation (Goinri Style) */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="relative group">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex-1 flex items-center ${
                        isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                      } rounded-xl transition-all duration-200 ease-out select-none cursor-pointer ${
                        item.isActive
                          ? "bg-[#EEF2FF] dark:bg-[rgba(52,81,209,0.18)] text-[#3451D1] font-bold shadow-2xs"
                          : "text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100/70 dark:hover:bg-white/[0.06] hover:text-[#0D2266] dark:hover:text-white hover:translate-x-0.5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center shrink-0 ${
                            isCollapsed ? "h-9 w-9 rounded-xl" : "h-6 w-6"
                          } ${
                            item.isActive && isCollapsed
                              ? "bg-[#3451D1] text-white shadow-[0_2px_8px_rgba(52,81,209,0.4)]"
                              : ""
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 shrink-0 transition-colors ${
                              item.isActive
                                ? isCollapsed
                                  ? "text-white"
                                  : "text-[#3451D1]"
                                : "text-slate-400 group-hover:text-[#3451D1]"
                            }`}
                          />
                        </div>

                        {!isCollapsed && (
                          <span className="text-[14px] tracking-tight">{item.name}</span>
                        )}
                      </div>

                      {/* Indicator pill in expanded mode */}
                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5">
                          {item.badge && (
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                item.badge === "Action"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                                  : item.badge === "+14.3%"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                                  : "bg-blue-100 text-[#3451D1] dark:bg-blue-950/40 dark:text-blue-300"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.isAi && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                          )}
                        </div>
                      )}
                    </Link>

                    {/* Services Dropdown Toggle (Expanded Mode) */}
                    {!isCollapsed && item.hasSubmenu && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsServicesExpanded((prev) => !prev);
                        }}
                        className="ml-1 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
                        title="Show All Services"
                      >
                        {isServicesExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Tooltip in Collapsed Mode */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-900/95 dark:bg-[#1E293B] text-white font-semibold text-xs shadow-xl border border-white/10 z-50 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.isAi && (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      )}
                    </div>
                  )}

                  {/* Clean Expandable Submenu for Services */}
                  {!isCollapsed && item.hasSubmenu && isServicesExpanded && (
                    <div className="mt-1 ml-4 pl-3 border-l border-slate-200 dark:border-white/10 space-y-1 py-1">
                      {serviceSubItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={onClose}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                              isSubActive
                                ? "bg-[#EEF2FF] text-[#3451D1] font-bold"
                                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/60"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <SubIcon className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{sub.name}</span>
                            </div>
                            {sub.badge && (
                              <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1 rounded">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>


      </aside>
    </>
  );
};
