"use client";

import React from "react";
import Link from "next/link";
import CountUp from "react-countup";
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
  Users,
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
      name: "Family Access",
      desc: "Role-based shared access for you, your spouse, and elderly parents in India",
      icon: Users,
      href: "/dashboard",
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
              DESHVAULT
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
            className="rounded-[8px] border border-white/15 bg-white/[0.06] px-5 py-[9px] text-[14px] font-semibold text-white/85 hover:bg-white/10 hover:border-white/25 backdrop-blur-[8px] transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="group flex items-center gap-1.5 rounded-[8px] bg-[#3451D1] px-5 py-[9px] text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(52,81,209,0.4)] hover:bg-[#2A40A8] transition-all"
          >
            <span>Open Dashboard</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* ─── HERO SECTION (Depth, Radial Glows, & Grid Overlay) ─── */}
      <section className="relative min-h-[calc(100vh-68px)] bg-[#060B18] pt-[100px] pb-[80px] px-6 md:px-12 lg:px-20 flex items-center overflow-visible">
        {/* Radial Glow 1 (top-left behind text) */}
        <div
          className="pointer-events-none absolute -top-[10%] left-0 h-[800px] w-[800px] rounded-full opacity-100 blur-[130px]"
          style={{
            background:
              "radial-gradient(ellipse 800px 600px at 15% 40%, rgba(52,81,209,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Radial Glow 2 (right behind globe) */}
        <div
          className="pointer-events-none absolute top-[15%] right-0 h-[700px] w-[700px] rounded-full opacity-100 blur-[140px]"
          style={{
            background:
              "radial-gradient(ellipse 700px 700px at 85% 50%, rgba(59,130,246,0.12) 0%, transparent 65%)",
          }}
        />

        {/* Radial Glow 3 (bottom center, subtle warm) */}
        <div
          className="pointer-events-none absolute -bottom-[10%] left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-100 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse 600px 300px at 50% 95%, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Linear/Vercel-style 60px subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto w-full max-w-[1280px] relative z-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[52%_48%] overflow-visible">
            {/* Left Column (52% on desktop) */}
            <div className="flex flex-col items-start z-10">
              {/* Eyebrow tag with shimmer animation */}
              <div className="inline-flex items-center gap-2 rounded-[24px] border border-[rgba(99,132,255,0.25)] bg-[rgba(52,81,209,0.12)] px-4 py-[7px] text-[12px] font-medium text-[#93C5FD] mb-6 animate-shimmer backdrop-blur-md">
                <span className="text-[14px]">🇮🇳</span>
                <span>Trusted by NRIs across USA · UAE · Canada</span>
              </div>

              {/* H1 Headline */}
              <h1 className="tracking-[-0.02em] leading-[1.1]">
                <span className="block font-extrabold text-[42px] sm:text-[52px] lg:text-[58px] text-white">
                  All Your Indian Assets.
                </span>
                <span className="block font-extrabold text-[42px] sm:text-[52px] lg:text-[58px] bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#60A5FA] bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                  In One View.
                </span>
              </h1>

              {/* Subtext */}
              <p className="mt-5 max-w-[460px] text-[17px] font-normal leading-[1.75] text-white/45">
                A single command center for Indian families in the US, UAE, and Canada to monitor bank accounts, properties, mutual funds, and taxes back home.
              </p>

              {/* CTA Row */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#3451D1] to-[#2563EB] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_0_0_1px_rgba(99,132,255,0.3),0_8px_32px_rgba(52,81,209,0.45)] hover:shadow-[0_0_0_1px_rgba(99,132,255,0.5),0_12px_38px_rgba(52,81,209,0.65)] hover:-translate-y-[1px] transition-all duration-200"
                >
                  <span>Go to Dashboard →</span>
                </Link>

                <Link
                  href="/signin"
                  className="rounded-[10px] border border-white/15 bg-white/[0.06] px-6 py-3.5 text-[15px] font-semibold text-white/80 hover:bg-white/10 hover:border-white/25 hover:text-white backdrop-blur-[8px] transition-all duration-200"
                >
                  Sign In
                </Link>
              </div>

              {/* Stats Row (No top rule, clean vertical separators, count-up animation) */}
              <div className="mt-[52px] flex items-center gap-12">
                <div>
                  <div className="text-[36px] font-extrabold text-white tracking-tight leading-none">
                    <CountUp end={12} duration={1.5} />
                  </div>
                  <div className="mt-1 text-[13px] font-normal text-white/40">
                    Asset Modules
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-[36px] w-[1px] bg-white/[0.08]" />

                <div>
                  <div className="text-[36px] font-extrabold text-white tracking-tight leading-none">
                    <CountUp end={1.84} decimals={2} duration={1.5} prefix="₹" suffix=" Cr" />
                  </div>
                  <div className="mt-1 text-[13px] font-normal text-white/40">
                    Demo Portfolio
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-[36px] w-[1px] bg-white/[0.08]" />

                <div>
                  <div className="text-[36px] font-extrabold text-white tracking-tight leading-none">
                    <CountUp end={3} duration={1.5} />
                  </div>
                  <div className="mt-1 text-[13px] font-normal text-white/40">
                    Countries
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (48% on desktop, floating globe bleeding past column boundary) */}
            <div className="w-full flex justify-center lg:justify-end overflow-visible relative z-10">
              <GlobalAssetGlobe />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULE GRID SECTION ─── */}
      <section className="bg-white px-6 py-20 md:px-12 lg:px-20 border-b border-[#EAECF0] relative z-20">
        <div className="mx-auto max-w-[1280px]">
          {/* Section Header */}
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#3451D1]">
              WHAT WE COVER
            </div>
            <h2 className="mt-2 text-[32px] md:text-[36px] font-extrabold tracking-tight text-[#0D2266]">
              Every Indian Asset, Explained
            </h2>
            <p className="mt-2 text-[16px] font-normal text-[#6B7280] max-w-[520px] mx-auto">
              From dormant bank accounts in Mumbai to California tax reporting, DeshVault keeps you in total control.
            </p>
          </div>

          {/* 4-col Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <Link
                  key={idx}
                  href={m.href}
                  className="group relative flex flex-col justify-between rounded-[16px] border border-[#EAECF0] bg-white p-6 shadow-[0px_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_32px_rgba(0,0,0,0.10)] hover:border-[#3451D1] hover:-translate-y-[3px] transition-all duration-[220ms] cursor-pointer"
                >
                  <div>
                    {/* Icon container */}
                    <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-gradient-to-br from-[#EEF2FF] to-[#DBEAFE] text-[#3451D1] shadow-sm">
                      <Icon className="h-[22px] w-[22px]" />
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-[15px] font-bold text-[#111827] tracking-tight">
                      {m.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-[13px] font-normal leading-[1.6] text-[#6B7280]">
                      {m.desc}
                    </p>
                  </div>

                  {/* Bottom Arrow (transitions in on hover) */}
                  <div className="mt-5 flex items-center text-[13px] font-bold text-[#3451D1]">
                    <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                      Explore Module →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#FAFAFA] border-t border-[#F0F0F0] py-12 px-6 md:px-12 text-xs text-[#9CA3AF] relative z-20">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#3451D1] text-white">
              <Landmark className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-sm text-[#0D2266]">
              DESHVAULT
            </span>
            <span className="text-[#9CA3AF]">| NRI Financial Portal</span>
          </div>

          <p className="text-center md:text-right max-w-xl text-[11px] leading-relaxed text-[#9CA3AF]">
            DeshVault is an NRI wealth command center. Banking, demat, and EPFO services are consolidated using authorized account aggregator protocols and government portals.
          </p>
        </div>
      </footer>
    </div>
  );
}
