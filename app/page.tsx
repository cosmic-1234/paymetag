import React from "react";
import Link from "next/link";
import {
  Landmark,
  ShieldCheck,
  Building2,
  TrendingUp,
  Coins,
  PiggyBank,
  FileSpreadsheet,
  Fingerprint,
  Scroll,
  Search,
  ArrowRightLeft,
  Lock,
  CreditCard,
  Scale,
  KeyRound,
  Eye,
} from "lucide-react";
import { GlobalAssetGlobe } from "@/components/3d/GlobalAssetGlobe";

export default function LandingPage() {

  const modules = [
    {
      name: "Bank Accounts",
      desc: "NRE, NRO, and Fixed Deposits across Indian banks with repatriation alerts",
      icon: Landmark,
      href: "/dashboard/accounts",
    },
    {
      name: "Properties & Land",
      desc: "Title records, boundary details, municipal tax, and rental income tracking",
      icon: Building2,
      href: "/dashboard/property",
    },
    {
      name: "Stocks & Funds",
      desc: "Demat portfolio and mutual fund folios consolidated in real time",
      icon: TrendingUp,
      href: "/dashboard/investments",
    },
    {
      name: "Gold & Bonds",
      desc: "Sovereign Gold Bonds, RBI savings bonds, and physical asset logs",
      icon: Coins,
      href: "/dashboard/alternates",
    },
    {
      name: "PF & Pension",
      desc: "Previous employer PF balance, EPFO claim sync, and PPF accounts",
      icon: PiggyBank,
      href: "/dashboard/retirement",
    },
    {
      name: "Insurance Policies",
      desc: "Life and health insurance cover with premium schedule & nominee audits",
      icon: ShieldCheck,
      href: "/dashboard/insurance",
    },
    {
      name: "Taxes & US Report",
      desc: "Form 26AS matching, DTAA foreign credit, and pre-filled US FBAR reports",
      icon: FileSpreadsheet,
      href: "/dashboard/tax",
    },
    {
      name: "Identity & KYC",
      desc: "CKYC verification status, re-KYC alerts, and remote video renewal",
      icon: Fingerprint,
      href: "/dashboard/kyc",
    },
    {
      name: "Will & Caretaker",
      desc: "Registered succession documents, digital POA, and caretaker contacts",
      icon: Scroll,
      href: "/dashboard/will",
    },
    {
      name: "Lost Money Finder",
      desc: "Search IEPF unclaimed dividends, dormant bank accounts, and forgotten PF",
      icon: Search,
      href: "/dashboard/forgotten",
    },
    {
      name: "Money Sent Abroad",
      desc: "Track Indian rental income and outwards LRS repatriation transfers",
      icon: ArrowRightLeft,
      href: "/dashboard/income",
    },
    {
      name: "Loans & Mortgages",
      desc: "Cross-border home loans, interest certificates (Sec 24b), and EMI schedules",
      icon: CreditCard,
      href: "/dashboard/loans",
    },
  ];

  const upcomingFeatures = [
    {
      title: "Cross-Border NRI Loans & Mortgages",
      tag: "Future Planning",
      desc: "Automated liability tracking for Indian home loans, loan against mutual funds (LAMF), and EMI autopay synchronization with NRE accounts.",
      icon: CreditCard,
    },
    {
      title: "Direct FinCEN FBAR & IRS Form 8938 E-Filing",
      tag: "US Compliance",
      desc: "One-click export directly into US tax filing formats (TurboTax, H&R Block, or your US CPA) with maximum calendar-year peak balance calculations.",
      icon: FileSpreadsheet,
    },
    {
      title: "1-Click Form 15CA & 15CB Outward Repatriation",
      tag: "FEMA Capital Pipeline",
      desc: "Automated Chartered Accountant digital certification and instant outward remittance submission directly to Authorized Dealer (AD) Category-I banks.",
      icon: ArrowRightLeft,
    },
    {
      title: "Multi-Corridor Currency Forward Rate Locks",
      tag: "Treasury Hedging",
      desc: "Real-time USD/INR, AED/INR, and GBP/INR rate guarantees protecting your Indian dividend and property sale repatriations from exchange volatility.",
      icon: TrendingUp,
    },
    {
      title: "Cross-Border Will & Bombay High Court Probate Engine",
      tag: "Succession Vault",
      desc: "Statutory succession docket generation ensuring compliance with Sections 57 & 213 of the Indian Succession Act 1925 for Mumbai properties.",
      icon: Scale,
    },
    {
      title: "Autonomous Central KYC (CKYC) Video Re-KYC",
      tag: "Identity Network",
      desc: "Direct API bridge with CERSAI for unified re-KYC across all Indian scheduled commercial banks without physical branch visits.",
      icon: Fingerprint,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-900 font-sans selection:bg-[#3451D1] selection:text-white">
      {/* ─── LANDING NAVBAR ─── */}
      <header className="sticky top-0 z-50 flex h-[68px] w-full items-center justify-between border-b border-white/[0.06] bg-[#060B18]/80 px-6 md:px-12 backdrop-blur-[12px] transition-all">
        {/* Logo Lockup */}
        <Link href="/" className="flex items-center gap-[10px]">
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] shadow-sm shrink-0">
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
          <div className="flex flex-col">
            <span className="font-extrabold text-[16px] tracking-tight text-white leading-none">
              DESHBOARD
            </span>
            <span className="text-[11px] font-medium text-[#9CA3AF] mt-0.5">
              NRI Wealth Portal
            </span>
          </div>
        </Link>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="rounded-[8px] border border-white/15 bg-white/[0.06] px-5 py-[9px] text-[14px] font-semibold text-white/85 hover:bg-white/10 hover:border-white/25 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/onboard"
            className="flex items-center gap-1.5 rounded-[8px] bg-[#3451D1] px-5 py-[9px] text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(52,81,209,0.4)] hover:bg-[#1D3FAD] transition-all"
          >
            <span>Get Started</span>
            <span>→</span>
          </Link>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[calc(100vh-68px)] bg-[#060B18] pt-[80px] pb-[80px] px-6 md:px-12 lg:px-20 flex items-center overflow-visible">
        {/* Subtle Radial Glows */}
        <div
          className="pointer-events-none absolute -top-[10%] left-0 h-[800px] w-[800px] rounded-full opacity-100 blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse 800px 600px at 15% 40%, rgba(52,81,209,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute top-[15%] right-0 h-[700px] w-[700px] rounded-full opacity-100 blur-[140px]"
          style={{
            background:
              "radial-gradient(ellipse 700px 700px at 85% 50%, rgba(59,130,246,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Subtle Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto w-full max-w-[1280px] relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[54%_46%] overflow-visible">
            {/* Left Column: Heading + Security Badges */}
            <div className="flex flex-col items-start z-10">
              <h1 className="tracking-[-0.02em] leading-[1.1]">
                <span className="block font-extrabold text-[40px] sm:text-[50px] lg:text-[56px] text-white">
                  All Your Indian Assets.
                </span>
                <span className="block font-extrabold text-[40px] sm:text-[50px] lg:text-[56px] bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#A78BFA] bg-clip-text text-transparent">
                  In One Sovereign View.
                </span>
              </h1>

              <p className="mt-5 max-w-[490px] text-[16px] font-normal leading-[1.7] text-white/60">
                A single institutional command center for Non-Resident Indians to monitor bank accounts, real estate, demat folios, and cross-border taxes back home.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/onboard"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3451D1] to-[#2563EB] px-6 py-3 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(52,81,209,0.4)] hover:bg-[#1D3FAD] transition-all"
                >
                  <span>Get Started →</span>
                </Link>

                <Link
                  href="/signin"
                  className="rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-[14px] font-semibold text-white/80 hover:bg-white/10 hover:border-white/25 hover:text-white transition-all"
                >
                  Sign In
                </Link>
              </div>

              {/* ─── SECURITY & PRIVACY TRUST PILLARS (Replaces the 12 Modules / ₹1.84 Cr / Countries stats) ─── */}
              <div className="mt-8 w-full max-w-[540px] grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
                <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <Lock className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs text-white">
                      256-Bit HSM
                    </span>
                    <span className="text-[11px] text-white/50">
                      Zero-knowledge security
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <Eye className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs text-white">
                      Zero Monetization
                    </span>
                    <span className="text-[11px] text-white/50">
                      No selling of records
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <KeyRound className="h-4 w-4 text-[#60A5FA] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs text-white">
                      DPDP Compliant
                    </span>
                    <span className="text-[11px] text-white/50">
                      1-click revocation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Global Asset Globe */}
            <div className="w-full flex justify-center lg:justify-end overflow-visible relative z-10">
              <GlobalAssetGlobe />
            </div>
          </div>
        </div>
      </section>



      {/* ─── DEDICATED SECURITY & PRIVACY SECTION ─── */}
      <section className="bg-white px-6 py-20 md:px-12 lg:px-20 border-b border-[#EAECF0] relative z-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#3451D1]">
              SOVEREIGN DATA INTEGRITY
            </span>
            <h2 className="mt-2 text-[30px] md:text-[34px] font-extrabold tracking-tight text-[#0D2266]">
              Bank-Grade Security & Privacy by Design
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Built specifically for Non-Resident Indians managing high-value assets across multiple regulatory jurisdictions.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#EAECF0] bg-[#FAFAFA] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3451D1]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-[#0D2266]">
                RBI Account Aggregator
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                We utilize the Reserve Bank of India's Account Aggregator framework. All financial data is encrypted point-to-point from financial information providers (FIP) with explicit time-bound consents.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-[#FAFAFA] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3451D1]">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-[#0D2266]">
                Zero Read/Write Fund Access
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                DeshBoard does not ask for or store transaction passwords, debit card PINs, or OTP credentials. Your money cannot be transferred, moved, or withdrawn through our portal.
              </p>
            </div>

            <div className="rounded-2xl border border-[#EAECF0] bg-[#FAFAFA] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3451D1]">
                <KeyRound className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-[#0D2266]">
                DPDP Act & GDPR Compliant
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Our infrastructure complies strictly with India's Digital Personal Data Protection Act 2023 and European GDPR standards, guaranteeing full data deletion upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UPCOMING FEATURES AS MENTIONED IN CONCEPT ─── */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-12 lg:px-20 border-b border-[#EAECF0] relative z-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#3451D1]">
              ROADMAP & CONCEPT PIPELINE
            </span>
            <h2 className="mt-2 text-[30px] md:text-[34px] font-extrabold tracking-tight text-[#0D2266]">
              Upcoming Features in DeshBoard
            </h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Continuous enhancements tailored for Non-Resident Indians across cross-border tax, lending, and repatriation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3451D1]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-[#3451D1]">
                        {feat.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#0D2266]">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── MODULE GRID SECTION ─── */}
      <section className="bg-white px-6 py-20 md:px-12 lg:px-20 border-b border-[#EAECF0] relative z-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#3451D1]">
              CORE PORTAL MODULES
            </div>
            <h2 className="mt-2 text-[30px] md:text-[34px] font-extrabold tracking-tight text-[#0D2266]">
              Every Indian Asset, Unified
            </h2>
            <p className="mt-2 text-sm text-[#6B7280] max-w-lg mx-auto">
              From dormant bank accounts in Mumbai to California tax reporting, DeshBoard keeps you in total control.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <Link
                  key={idx}
                  href={m.href}
                  className="group relative flex flex-col justify-between rounded-[16px] border border-[#EAECF0] bg-white p-6 shadow-[0px_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_24px_rgba(0,0,0,0.08)] hover:border-[#3451D1] transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#DBEAFE] text-[#3451D1] shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-[#111827] tracking-tight">
                      {m.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-[#6B7280] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center text-xs font-bold text-[#3451D1]">
                    <span>View Module →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FOOTER (Prototype of DeshBoard) ─── */}
      <footer className="bg-[#FAFAFA] border-t border-[#F0F0F0] py-10 px-6 md:px-12 text-xs text-[#9CA3AF] relative z-20">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#3451D1] text-white">
              <Landmark className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-sm text-[#0D2266]">
              DESHBOARD
            </span>
            <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-700">
              Prototype of DeshBoard
            </span>
          </div>

          <p className="text-center md:text-right max-w-xl text-[11px] leading-relaxed text-[#9CA3AF]">
            Prototype of DeshBoard • Private Alpha for Non-Resident Indians. Banking, demat, and EPFO services are consolidated using authorized RBI Account Aggregator protocols and government portals.
          </p>
        </div>
      </footer>
    </div>
  );
}
