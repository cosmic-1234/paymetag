"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Landmark,
  Building2,
  TrendingUp,
  Coins,
  PiggyBank,
  ShieldCheck,
  FileSpreadsheet,
  Fingerprint,
  Scroll,
  Search,
  ArrowRightLeft,
  CreditCard,
  BrainCircuit,
} from "lucide-react";

interface StatusIndicator {
  type: "critical" | "warning" | "positive";
  count?: string;
  text?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  indicator?: StatusIndicator;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: "OVERVIEW",
      items: [
        { name: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
        {
          name: "DeshBoard AI",
          href: "/dashboard/ai",
          icon: BrainCircuit,
        },
      ],
    },
    {
      title: "LIQUID & FINANCIAL ASSETS",
      items: [
        {
          name: "Bank Accounts",
          href: "/dashboard/accounts",
          icon: Landmark,
          indicator: { type: "critical", count: "1" },
        },
        {
          name: "Stocks & Funds",
          href: "/dashboard/investments",
          icon: TrendingUp,
          indicator: { type: "positive", text: "+14.3%" },
        },
        {
          name: "Gold & Bonds",
          href: "/dashboard/alternates",
          icon: Coins,
        },
        {
          name: "PF & Pension",
          href: "/dashboard/retirement",
          icon: PiggyBank,
          indicator: { type: "warning" },
        },
        {
          name: "Insurance Policies",
          href: "/dashboard/insurance",
          icon: ShieldCheck,
          indicator: { type: "warning", text: "Due" },
        },
      ],
    },
    {
      title: "REAL ESTATE",
      items: [
        {
          name: "Properties & Land",
          href: "/dashboard/property",
          icon: Building2,
          indicator: { type: "warning", count: "1" },
        },
      ],
    },
    {
      title: "LIABILITIES & PLANNING",
      items: [
        {
          name: "Loans (Future Planning)",
          href: "/dashboard/loans",
          icon: CreditCard,
          indicator: { type: "positive", text: "Future" },
        },
      ],
    },
    {
      title: "LEGAL & TAX",
      items: [
        {
          name: "Taxes & US Report",
          href: "/dashboard/tax",
          icon: FileSpreadsheet,
          indicator: { type: "warning", text: "FBAR" },
        },
        {
          name: "Identity & KYC",
          href: "/dashboard/kyc",
          icon: Fingerprint,
          indicator: { type: "critical", count: "1" },
        },
        {
          name: "Will & Caretaker",
          href: "/dashboard/will",
          icon: Scroll,
          indicator: { type: "critical" },
        },
        {
          name: "Lost Money Finder",
          href: "/dashboard/forgotten",
          icon: Search,
          indicator: { type: "positive", text: "₹1.18L" },
        },
        {
          name: "Money Sent Abroad",
          href: "/dashboard/income",
          icon: ArrowRightLeft,
        },
      ],
    },
  ];

  const renderIndicator = (indicator?: StatusIndicator) => {
    if (!indicator) return null;

    if (indicator.type === "critical") {
      return (
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="h-[7px] w-[7px] rounded-full bg-[#EF4444] animate-pulse" />
          {indicator.count && (
            <span className="font-semibold text-[11px] text-[#EF4444]">
              {indicator.count}
            </span>
          )}
        </span>
      );
    }

    if (indicator.type === "warning") {
      return (
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="h-[7px] w-[7px] rounded-full bg-[#F59E0B]" />
          {(indicator.count || indicator.text) && (
            <span className="font-semibold text-[11px] text-[#F59E0B]">
              {indicator.count || indicator.text}
            </span>
          )}
        </span>
      );
    }

    if (indicator.type === "positive") {
      return (
        <span className="font-semibold text-[11px] text-[#22C55E] shrink-0">
          {indicator.text}
        </span>
      );
    }

    return null;
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-[64px] bottom-0 z-50 w-[260px] sm:w-[240px] flex flex-col justify-between border-r border-[#F0F0F0] dark:border-white/[0.06] bg-[#FAFAFA] dark:bg-[#0B0F1A] px-3 py-5 overflow-y-auto no-scrollbar shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-4">
          {sections.map((section, sIdx) => (
            <div key={section.title}>
              {/* Section label */}
              <h3
                className={`font-bold text-[10px] uppercase tracking-[0.10em] text-[#9CA3AF] ml-2 mb-1.5 ${
                  sIdx === 0 ? "mt-1" : "mt-5"
                }`}
              >
                {section.title}
              </h3>

              {/* Nav items */}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <div key={item.href} className="relative">
                      {/* Left accent bar on active: 3px solid #3451D1, border-radius 0 2px 2px 0 on left edge of sidebar */}
                      {isActive && (
                        <div className="absolute -left-3 top-1.5 bottom-1.5 w-[3px] bg-[#3451D1] rounded-r-[2px]" />
                      )}

                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-[9px] rounded-lg transition-all duration-150 ease-out group ${
                        isActive
                          ? "bg-[#EEF2FF] dark:bg-[rgba(52,81,209,0.15)] text-[#3451D1] font-bold"
                          : "text-[#374151] dark:text-[#CBD5E1] font-medium hover:bg-[#F3F4F6] dark:hover:bg-white/[0.06] hover:text-[#111827] dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-[#3451D1]"
                              : "text-[#9CA3AF] group-hover:text-[#3451D1]"
                          }`}
                        />
                        <span className="text-[13px] truncate">{item.name}</span>
                      </div>

                      {renderIndicator(item.indicator)}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM OF SIDEBAR: "Bank Connection" status item */}
      <div className="pt-4 border-t border-[#F0F0F0] dark:border-white/[0.06]">
        <div className="flex items-center gap-2 rounded-[6px] bg-[rgba(34,197,94,0.08)] px-2.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
          <span className="font-medium text-[12px] text-[#22C55E]">
            Bank Connection: 100% Online
          </span>
        </div>
      </div>
    </aside>
    </>
  );
};
