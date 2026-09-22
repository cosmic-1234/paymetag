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
  BrainCircuit,
  Scale,
  FileText,
  ArrowRight,
  ShieldAlert,
  CreditCard,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD, formatCompactINR } from "@/lib/formatters";
import { VideoKycModal } from "@/components/dashboard/Modals/VideoKycModal";
import { openAiCopilot } from "@/lib/aiCopilot";
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
          Viewing as <strong className="font-bold text-[#0C2340]">{activeUser.name}</strong> ({activeUser.role === "resident_parent" ? "Father in Mumbai • Caretaker with POA" : "NRI Primary • San Jose, USA"})
        </div>
        <div className="text-xs font-normal text-slate-400 font-mono">
          PAN: {activeUser.pan}
        </div>
      </div>

      {/* Sovereign AI Executive Intelligence Briefing */}
      <div className="rounded-2xl border border-[#3451D1]/25 bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#F0F4FF] dark:from-[#0F172A] dark:via-[#111C38] dark:to-[#0F172A] p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#3451D1]/15 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] text-white shadow-sm">
              <BrainCircuit className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[14px] text-[#0D2266] dark:text-white tracking-tight">
                  Sovereign AI Executive Briefing
                </h3>
                <span className="rounded-full bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                  3 Actions Identified
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                Cross-jurisdictional intelligence scan across US IRS (FATCA/FBAR), India Income Tax Dept, & RBI FEMA
              </p>
            </div>
          </div>
          <button
            onClick={() => openAiCopilot()}
            className="self-start sm:self-auto flex items-center gap-1.5 rounded-lg border border-[#3451D1] bg-white dark:bg-blue-950/60 px-3 py-1.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300 hover:bg-[#3451D1] hover:text-white transition-all shadow-xs"
          >
            <span>Launch Copilot</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* 3 Strategic AI Findings */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Finding 1: Tax Treaty */}
          <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#151B2B]/90 p-3.5 flex flex-col justify-between hover:border-[#3451D1] transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-bold text-[#0D2266] dark:text-white flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5 text-[#3451D1]" />
                  DTAA Tax Arbitrage
                </span>
                <span className="text-[10px] font-bold text-[#16A34A] bg-[#DCFCE7] dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                  ₹3.84L Credit
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400 leading-relaxed">
                Indian 20% Section 195 TDS on dividends qualifies for direct IRS Form 1116 Foreign Tax Credit against your CA 37% Federal bracket.
              </p>
            </div>
            <button
              onClick={() => openAiCopilot("Analyze DTAA Article 10 dividend withholding rates for my Indian demat portfolio vs US IRS taxation.")}
              className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#3451D1] hover:underline"
            >
              <span>Inspect Tax Arbitrage</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Finding 2: Succession & Property */}
          <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#151B2B]/90 p-3.5 flex flex-col justify-between hover:border-[#3451D1] transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-bold text-[#0D2266] dark:text-white flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-[#F59E0B]" />
                  Probate Harmonization
                </span>
                <span className="text-[10px] font-bold text-[#F59E0B] bg-[#FEF9C3] dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
                  Dual-Probate Risk
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400 leading-relaxed">
                Oberoi Woods flat requires probate under Indian Succession Act 1925. Registered POA for Shagun Patel prevents 14-month transfer freeze.
              </p>
            </div>
            <button
              onClick={() => openAiCopilot("Scan my digital will for cross-border probate bottlenecks between US Probate Courts and Bombay High Court.")}
              className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#3451D1] hover:underline"
            >
              <span>Run Succession Scan</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Finding 3: IEPF Recovery */}
          <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#151B2B]/90 p-3.5 flex flex-col justify-between hover:border-[#3451D1] transition-all">
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="font-bold text-[#0D2266] dark:text-white flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#3451D1]" />
                  IEPF Claim Dossier
                </span>
                <span className="text-[10px] font-bold text-[#3451D1] bg-[#EEF2FF] dark:bg-blue-950/50 px-1.5 py-0.5 rounded">
                  94.2% Match
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400 leading-relaxed">
                350 L&T physical shares (₹14.80L) detected in IEPF escrow. Automated name affidavit generated for &apos;Brijal A. Patel&apos; variance.
              </p>
            </div>
            <button
              onClick={() => openAiCopilot("What are the approval odds and required affidavits for recovering my unclaimed L&T shares from IEPF?")}
              className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#3451D1] hover:underline"
            >
              <span>View Claim Admissibility</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Wealth & Health Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Total Wealth */}
        <BladeCard variant="stat" className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Total Indian Wealth
              </span>
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                ↑ +8.4% this year
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <h2 className="font-mono text-[32px] sm:text-[36px] font-extrabold tracking-tight text-[#0C2340] leading-tight">
                {currency === "INR" ? formatINR(totalNetWorthINR) : formatUSD(totalNetWorthINR)}
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {currency === "INR" ? `≈ ${formatUSD(totalNetWorthINR)}` : `≈ ${formatINR(totalNetWorthINR)}`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>Asset Allocation</span>
              <span className="font-normal text-slate-500">Properties (61%) • Bank (27%) • Stocks (14%)</span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div style={{ width: "61%" }} className="bg-blue-600" title="Properties: ₹1.47 Cr" />
              <div style={{ width: "27%" }} className="bg-sky-500" title="Bank: ₹49.6L" />
              <div style={{ width: "14%" }} className="bg-emerald-500" title="Stocks: ₹24.9L" />
              <div style={{ width: "10%" }} className="bg-purple-500" title="PF/Pension: ₹18.1L" />
              <div style={{ width: "8%" }} className="bg-amber-500" title="Gold: ₹14.5L" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-4 text-xs">
            <div>
              <span className="text-[11px] font-medium text-slate-500">BANK ACCOUNTS</span>
              <div className="font-mono font-bold text-[#0C2340] mt-0.5">
                {formatCompactINR(totalLiquidINR)}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500">PROPERTIES</span>
              <div className="font-mono font-bold text-[#0C2340] mt-0.5">
                {formatCompactINR(totalRealEstateINR)}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500">STOCKS & FUNDS</span>
              <div className="font-mono font-bold text-[#0C2340] mt-0.5">
                {formatCompactINR(totalInvestmentsINR)}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500">LOST MONEY</span>
              <div className="font-mono font-bold text-amber-600 mt-0.5">
                {formatCompactINR(totalForgottenINR)}
              </div>
            </div>
          </div>
        </BladeCard>

        {/* Health Score */}
        <BladeCard variant="default" className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Health Index
            </span>
            <span className="text-xs font-semibold text-slate-600">
              Grade B+
            </span>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="h-28 w-28 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 transition-all duration-700"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-2xl font-bold text-[#0C2340]">
                  {healthScore}
                </span>
                <span className="text-[9px] text-slate-400 font-bold">/ 100</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs">
            <div className="flex justify-between text-slate-600 font-normal">
              <span>SBI KYC overdue</span>
              <span className="font-mono font-semibold text-rose-600">-12 pts</span>
            </div>
            <div className="flex justify-between text-slate-600 font-normal">
              <span>No Indian Will registered</span>
              <span className="font-mono font-semibold text-amber-600">-10 pts</span>
            </div>
            <div className="flex justify-between text-slate-600 font-normal">
              <span>Nagpur boundary check</span>
              <span className="font-mono font-semibold text-amber-600">-6 pts</span>
            </div>
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
