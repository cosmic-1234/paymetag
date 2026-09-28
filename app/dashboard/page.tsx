"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Building2,
  ShieldCheck,
  PiggyBank,
  TrendingUp,
  Coins,
  FileSpreadsheet,
  Fingerprint,
  Scroll,
  Search,
  ArrowRightLeft,
  ArrowUpRight,
  AlertCircle,
  Info,
  Users,
  CreditCard,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD, formatCompactINR } from "@/lib/formatters";
import { VideoKycModal } from "@/components/dashboard/Modals/VideoKycModal";
import { BladeCard } from "@/components/ui/BladeCard";
import { BladeActionCard } from "@/components/ui/BladeActionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function DashboardMain() {
  const {
    activeUser,
    currency,
    totalNetWorthINR,
    totalLiquidINR,
    totalRealEstateINR,
    totalInvestmentsINR,
    totalRetirementINR,
    totalAlternatesINR,
    totalForgottenINR,
    totalLoansINR,
    healthScore,
    alerts,
    dismissAlert,
  } = useApp();

  const [isVideoKycOpen, setIsVideoKycOpen] = useState(false);

  const moduleCards = [
    {
      title: "Bank Accounts",
      href: "/dashboard/accounts",
      icon: Landmark,
      valueINR: totalLiquidINR,
      badge: "Action Required",
      badgeType: "danger",
      subtitle: "6 accounts across HDFC, SBI, Axis, ICICI, BoB, Kotak",
    },
    {
      title: "Properties & Land",
      href: "/dashboard/property",
      icon: Building2,
      valueINR: totalRealEstateINR,
      badge: "Dispute Flagged",
      badgeType: "warning",
      subtitle: "Mumbai Oberoi flat and Nagpur land parcel",
    },
    {
      title: "Stocks & Mutual Funds",
      href: "/dashboard/investments",
      icon: TrendingUp,
      valueINR: totalInvestmentsINR,
      badge: "+14.3%",
      badgeType: "success",
      subtitle: "CDSL Demat stocks + 3 mutual fund folios",
    },
    {
      title: "Gold, Bonds & Crypto",
      href: "/dashboard/alternates",
      icon: Coins,
      valueINR: totalAlternatesINR,
      badge: "Declared",
      badgeType: "neutral",
      subtitle: "Sovereign Gold Bonds, RBI Bonds, MMTC Gold",
    },
    {
      title: "PF & Pension",
      href: "/dashboard/retirement",
      icon: PiggyBank,
      valueINR: totalRetirementINR,
      badge: "Unclaimed",
      badgeType: "warning",
      subtitle: "Previous employer PF (₹4.82L) + NPS + PPF",
    },
    {
      title: "Insurance Policies",
      href: "/dashboard/insurance",
      icon: ShieldCheck,
      valueINR: 4000000,
      valueLabel: "Total Cover",
      badge: "Due in 23d",
      badgeType: "warning",
      subtitle: "LIC Jeevan Anand + HDFC Ergo Family Floater",
    },
    {
      title: "Loans & Mortgages",
      href: "/dashboard/loans",
      icon: CreditCard,
      valueINR: totalLoansINR,
      valueLabel: "Total Debt",
      badge: "Future Planning",
      badgeType: "neutral",
      subtitle: "HDFC Home Loan on Oberoi Woods • 8.45% p.a.",
    },
    {
      title: "Taxes & US Filing",
      href: "/dashboard/tax",
      icon: FileSpreadsheet,
      valueINR: 18400,
      valueLabel: "Refund Dispatched",
      badge: "FBAR Ready",
      badgeType: "neutral",
      subtitle: "Form 26AS matching & 15% treaty tax rate",
    },
    {
      title: "Identity & KYC",
      href: "/dashboard/kyc",
      icon: Fingerprint,
      valueINR: 0,
      valueLabel: "CKYC #40029104",
      badge: "Overdue",
      badgeType: "danger",
      subtitle: "4 of 7 institutions verified • SBI Video Call due",
    },
    {
      title: "Will & Caretaker",
      href: "/dashboard/will",
      icon: Scroll,
      valueINR: 0,
      valueLabel: "POA: Shagun Patel",
      badge: "Unregistered",
      badgeType: "danger",
      subtitle: "Shagun has Power of Attorney • Indian Will pending",
    },
    {
      title: "Lost Money Finder",
      href: "/dashboard/forgotten",
      icon: Search,
      valueINR: totalForgottenINR,
      valueLabel: "Claimable",
      badge: "4 Found",
      badgeType: "gold",
      subtitle: "Infosys dividends, dormant BoB balance, old PF",
    },
    {
      title: "Money Sent Abroad",
      href: "/dashboard/income",
      icon: ArrowRightLeft,
      valueINR: 516000,
      valueLabel: "Annual Gross",
      badge: "Tracked",
      badgeType: "neutral",
      subtitle: "Rent ₹30k/mo + FD Interest ₹12k/mo",
    },
    {
      title: "Family Access",
      href: "/dashboard",
      icon: Users,
      valueINR: 0,
      valueLabel: "3 Members",
      badge: "Connected",
      badgeType: "success",
      subtitle: "You (San Jose), Spouse, and Father in Mumbai",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Active User Context Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="text-xs font-medium text-slate-700">
          Viewing as <strong className="font-bold text-[#0C2340]">{activeUser.name}</strong> ({activeUser.location})
        </div>
        <div className="text-xs font-normal text-slate-400 font-mono">
          PAN: {activeUser.pan}
        </div>
      </div>

      {/* Main Wealth & Health Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Total Wealth */}
        <BladeCard variant="stat" className="lg:col-span-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                Total Indian Wealth
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                ↑ +8.4% this year
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <h2 className="font-mono text-[32px] sm:text-[36px] font-extrabold tracking-tight text-[#0C2340] dark:text-white leading-tight">
                {currency === "INR" ? formatINR(totalNetWorthINR) : formatUSD(totalNetWorthINR)}
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {currency === "INR" ? `≈ ${formatUSD(totalNetWorthINR)}` : `≈ ${formatINR(totalNetWorthINR)}`}
              </span>
            </div>
          </div>

          {/* Clean Segmented Allocation Bar (Without cluttered text on top) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Portfolio Allocation</span>
              <span className="text-[11px] font-medium text-slate-400 capitalize tracking-normal">
                4 Primary Asset Classes
              </span>
            </div>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.08]">
              <div
                style={{ width: `${totalNetWorthINR > 0 ? ((totalRealEstateINR / totalNetWorthINR) * 100).toFixed(1) : 54.6}%` }}
                className="bg-blue-600 transition-all duration-500"
                title={`Properties: ₹1.47 Cr (${totalNetWorthINR > 0 ? ((totalRealEstateINR / totalNetWorthINR) * 100).toFixed(1) : 54.6}%)`}
              />
              <div
                style={{ width: `${totalNetWorthINR > 0 ? ((totalLiquidINR / totalNetWorthINR) * 100).toFixed(1) : 24.0}%` }}
                className="bg-sky-500 transition-all duration-500"
                title={`Bank Accounts: ₹64.64L (${totalNetWorthINR > 0 ? ((totalLiquidINR / totalNetWorthINR) * 100).toFixed(1) : 24.0}%)`}
              />
              <div
                style={{ width: `${totalNetWorthINR > 0 ? ((totalInvestmentsINR / totalNetWorthINR) * 100).toFixed(1) : 9.3}%` }}
                className="bg-emerald-500 transition-all duration-500"
                title={`Stocks & Funds: ₹24.97L (${totalNetWorthINR > 0 ? ((totalInvestmentsINR / totalNetWorthINR) * 100).toFixed(1) : 9.3}%)`}
              />
              <div
                style={{ width: `${totalNetWorthINR > 0 ? (((totalRetirementINR + totalAlternatesINR) / totalNetWorthINR) * 100).toFixed(1) : 11.5}%` }}
                className="bg-purple-500 transition-all duration-500"
                title={`Retirement & Alternates: ₹31.1L (${totalNetWorthINR > 0 ? (((totalRetirementINR + totalAlternatesINR) / totalNetWorthINR) * 100).toFixed(1) : 11.5}%)`}
              />
              <div
                style={{ width: `${totalNetWorthINR > 0 ? ((totalForgottenINR / totalNetWorthINR) * 100).toFixed(1) : 0.6}%` }}
                className="bg-amber-500 transition-all duration-500"
                title={`Claimable Lost Money: ₹1.52L (${totalNetWorthINR > 0 ? ((totalForgottenINR / totalNetWorthINR) * 100).toFixed(1) : 0.6}%)`}
              />
            </div>
          </div>

          {/* 4 Asset Metrics with % placed cleanly below the amount */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 dark:border-white/10 pt-4 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                <span>Bank Accounts</span>
              </div>
              <div className="font-mono font-bold text-[#0C2340] dark:text-white text-sm sm:text-base mt-0.5">
                {formatCompactINR(totalLiquidINR)}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {totalNetWorthINR > 0 ? ((totalLiquidINR / totalNetWorthINR) * 100).toFixed(1) : "24.0"}% of wealth
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                <span>Properties</span>
              </div>
              <div className="font-mono font-bold text-[#0C2340] dark:text-white text-sm sm:text-base mt-0.5">
                {formatCompactINR(totalRealEstateINR)}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {totalNetWorthINR > 0 ? ((totalRealEstateINR / totalNetWorthINR) * 100).toFixed(1) : "54.6"}% of wealth
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Stocks & Funds</span>
              </div>
              <div className="font-mono font-bold text-[#0C2340] dark:text-white text-sm sm:text-base mt-0.5">
                {formatCompactINR(totalInvestmentsINR)}
              </div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {totalNetWorthINR > 0 ? ((totalInvestmentsINR / totalNetWorthINR) * 100).toFixed(1) : "9.3"}% of wealth
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                <span>Lost Money</span>
              </div>
              <div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm sm:text-base mt-0.5">
                {formatCompactINR(totalForgottenINR)}
              </div>
              <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                Claimable &bull; {totalNetWorthINR > 0 ? ((totalForgottenINR / totalNetWorthINR) * 100).toFixed(1) : "0.6"}%
              </div>
            </div>
          </div>
        </BladeCard>

        {/* Health Score - Positive Accessibility Framing */}
        <BladeCard variant="default" className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500 shrink-0">
              Health Index
            </span>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 whitespace-nowrap">
              Grade B+
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-1">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="h-28 w-28 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-white/10"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#0B72E7] transition-all duration-700"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-extrabold text-[#0C2340] dark:text-white leading-none">
                  {healthScore}
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-1">/ 100</span>
              </div>
            </div>

            <div className="mt-2.5 text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 px-2.5 py-0.5 text-[11px] font-bold text-[#0B72E7] dark:text-blue-300 whitespace-nowrap">
                +28 pts unlockable to reach Grade A
              </span>
            </div>
          </div>

          {/* Positive Wealth Unlock Opportunities */}
          <div className="space-y-1.5 border-t border-slate-100 dark:border-white/10 pt-3 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Wealth Accessibility Opportunities
            </div>

            <button
              type="button"
              onClick={() => setIsVideoKycOpen(true)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors text-left group cursor-pointer"
            >
              <div>
                <div className="font-bold text-[#0C2340] dark:text-white group-hover:text-[#0B72E7] transition-colors flex items-center gap-1.5">
                  <span>Verify SBI NRO KYC</span>
                  <span className="text-[10px] text-slate-400 font-normal">&bull; Video KYC</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Unfreezes ₹3.2L liquid funds for transfers
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 font-mono text-[11px] font-bold">
                +12 pts
              </span>
            </button>

            <Link
              href="/dashboard/property"
              className="block p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0C2340] dark:text-white group-hover:text-[#0B72E7] transition-colors">
                    Draft Sovereign NRI Will
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Protects ₹1.47 Cr family succession
                  </div>
                </div>
                <span className="shrink-0 rounded-md bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 font-mono text-[11px] font-bold">
                  +10 pts
                </span>
              </div>
            </Link>

            <Link
              href="/dashboard/property"
              className="block p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0C2340] dark:text-white group-hover:text-[#0B72E7] transition-colors">
                    Re-verify Nagpur Land 7/12
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Secures ₹35L boundary & clean title
                  </div>
                </div>
                <span className="shrink-0 rounded-md bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 font-mono text-[11px] font-bold">
                  +6 pts
                </span>
              </div>
            </Link>
          </div>

          {/* Positive Accessibility Banner */}
          <div className="rounded-lg bg-[#F0FDF4] dark:bg-emerald-950/20 border border-[#DCFCE7] dark:border-emerald-900/30 p-2.5 text-[11px] text-[#15803D] dark:text-emerald-300 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#16A34A] mt-0.5" />
            <span>
              <strong>Make 100% of your wealth accessible:</strong> Completing these 3 verifications protects ₹1.85 Cr across banking and real estate titles.
            </span>
          </div>
        </BladeCard>
      </div>

      {/* Action Items List */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#9CA3AF]" />
              <h3 className="font-bold text-[12px] uppercase tracking-[0.08em] text-[#9CA3AF]">
                ACTION ITEMS ({alerts.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.slice(0, 3).map((alert) => (
              <BladeActionCard
                key={alert.id}
                module={alert.module}
                severity={alert.severity as any}
                title={alert.title}
                description={alert.description}
                ctaText={alert.id === "alt_sbi_kyc" ? "Start Video Call" : "Resolve"}
                ctaHref={alert.id === "alt_sbi_kyc" ? undefined : alert.route}
                onCtaClick={alert.id === "alt_sbi_kyc" ? () => setIsVideoKycOpen(true) : undefined}
                onDismiss={() => dismissAlert(alert.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 12 Modules Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-[12px] uppercase tracking-[0.08em] text-[#9CA3AF]">
          ALL 12 WEALTH MODULES
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moduleCards.map((m, idx) => {
            const Icon = m.icon;
            const isValuePresent = m.valueINR > 0;
            return (
              <Link key={idx} href={m.href} className="block cursor-pointer">
                <BladeCard
                  variant="interactive"
                  className="group flex flex-col justify-between h-full space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#F0F4FF] dark:bg-white/[0.08] text-[#3451D1] dark:text-blue-300 group-hover:bg-[#3451D1] group-hover:text-white transition-colors duration-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <StatusBadge status={m.badgeType as any} label={m.badge} />
                    </div>

                    <h4 className="mt-4 text-sm font-bold text-[#0C2340] group-hover:text-blue-600 transition-colors duration-150">
                      {m.title}
                    </h4>
                    <p className="mt-1 text-xs font-normal text-slate-500 leading-relaxed">
                      {m.subtitle}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                    <span className="font-mono text-sm font-bold text-[#0C2340]">
                      {isValuePresent
                        ? currency === "INR"
                          ? formatINR(m.valueINR)
                          : formatUSD(m.valueINR)
                        : m.valueLabel}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                  </div>
                </BladeCard>
              </Link>
            );
          })}
        </div>
      </div>

      <VideoKycModal
        isOpen={isVideoKycOpen}
        onClose={() => setIsVideoKycOpen(false)}
        institutionName="State Bank of India"
      />
    </div>
  );
}
