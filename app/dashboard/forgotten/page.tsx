"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Scale,
  ShieldCheck,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { ForgottenAssetItem } from "@/lib/mockData";
import { BladeCard } from "@/components/ui/BladeCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { IepfClaimModal } from "@/components/dashboard/Modals/IepfClaimModal";
import { openAiCopilot } from "@/lib/aiCopilot";

export default function ForgottenAssetsPage() {
  const { forgottenAssets, totalForgottenINR, activeUser, currency } = useApp();
  const [searchPan, setSearchPan] = useState(activeUser.pan);
  const [isSearching, setIsSearching] = useState(false);
  const [activeClaimAsset, setActiveClaimAsset] = useState<ForgottenAssetItem | null>(null);
  const [isAffidavitGenerating, setIsAffidavitGenerating] = useState(false);
  const [affidavitReady, setAffidavitReady] = useState(false);

  const handleScan = async () => {
    setIsSearching(true);
    try {
      await fetch("/api/accounts");
    } catch (e) {}
    setTimeout(() => {
      setIsSearching(false);
      alert("Search Complete: Found 4 records of uncollected money linked to your PAN.");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
            Lost & Unclaimed Money Finder
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Search government registers to find uncollected dividends, old forgotten bank balances, and old employer PF
          </p>
        </div>
      </div>

      {/* Hero Recovery Banner */}
      <BladeCard variant="default" className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Total Lost Money Found For You
            </span>
            <div className="font-mono text-4xl font-extrabold text-[#0D2266] dark:text-white">
              {currency === "INR" ? formatINR(totalForgottenINR) : formatUSD(totalForgottenINR)}
            </div>
            <p className="text-xs font-normal text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Found across 4 government registries linked to PAN <strong>{activeUser.pan}</strong>. You can claim this money directly into your Indian bank account.
            </p>
          </div>

          <div>
            <button
              onClick={() => alert("Initiating full batch claim for all 4 items")}
              className="rounded-xl bg-[#3451D1] px-6 py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition"
            >
              Claim All ₹1,18,400 Now
            </button>
          </div>
        </div>
      </BladeCard>

      {/* AI IEPF Claim Dossier & Match Confidence Engine */}
      <div className="rounded-2xl border border-[#3451D1]/30 bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF2FF] dark:from-[#0F172A] dark:via-[#131C35] dark:to-[#0F172A] p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] text-white shadow-xs">
                <FileText className="h-3.5 w-3.5" />
              </span>
              <span className="rounded-md bg-[#EEF2FF] dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3451D1] border border-[#3451D1]/20">
                Sovereign Recovery AI
              </span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                94.2% Admissibility
              </span>
            </div>
            <h3 className="font-extrabold text-[15px] text-[#0D2266] dark:text-white">
              AI IEPF Claim Dossier & Match Confidence Engine
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
              Scans MCA IEPF authority records for 350 physical equity shares of <strong className="text-[#0D2266] dark:text-white">Larsen & Toubro Ltd</strong> (₹14,80,000 total liquidity). Analyzes name variation risk between PAN (<strong className="text-[#0D2266] dark:text-white">Brijal Arvind Patel</strong>) and old physical share certificates (<strong className="text-[#0D2266] dark:text-white">Brijal A. Patel</strong>).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setIsAffidavitGenerating(true);
                setTimeout(() => {
                  setIsAffidavitGenerating(false);
                  setAffidavitReady(true);
                }, 1300);
              }}
              disabled={isAffidavitGenerating}
              className="flex items-center gap-1.5 rounded-xl bg-[#3451D1] hover:bg-[#1D3FAD] px-4 py-2.5 text-xs font-bold text-white transition shadow-sm disabled:opacity-50"
            >
              <FileText className="h-4 w-4" />
              <span>{isAffidavitGenerating ? "Synthesizing Legal Affidavit..." : "Draft AI Name Variance Affidavit"}</span>
            </button>
            <button
              onClick={() =>
                openAiCopilot(
                  "What are the approval odds and required affidavits for recovering my unclaimed L&T shares from IEPF?"
                )
              }
              className="flex items-center gap-1.5 rounded-xl border border-[#3451D1] bg-white dark:bg-blue-950/50 px-3.5 py-2.5 text-xs font-bold text-[#3451D1] dark:text-blue-300 hover:bg-[#EEF2FF] transition"
            >
              <span>Consult Recovery AI</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Affidavit Generated Notification */}
        {affidavitReady && (
          <div className="mt-4 rounded-xl border border-emerald-200 dark:border-emerald-950/50 bg-[#DCFCE7]/50 dark:bg-emerald-950/20 p-3.5 flex items-start justify-between">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-[#16A34A] dark:text-emerald-300 block">
                  AI Legal Affidavit Ready: Form IEPF-5 Verification Pack
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                  Notarized affidavit draft harmonizing &apos;Brijal A. Patel&apos; to &apos;Brijal Arvind Patel&apos; with SEBI ISR-2 bank confirmation ready for electronic submission to L&T Investor Services and MCA IEPF Escrow.
                </p>
              </div>
            </div>
            <button
              onClick={() => setAffidavitReady(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* 3 Inline AI Claim Metrics */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#3451D1]/15 pt-3.5">
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Total Unclaimed Liquidity</span>
            <span className="font-extrabold text-sm text-[#0D2266] dark:text-white mt-0.5 block">₹14,80,000</span>
            <span className="text-[10px] text-emerald-600 font-medium">350 Shares + 7-Yr Dividends</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Approval Probability</span>
            <span className="font-extrabold text-sm text-[#16A34A] mt-0.5 block">94.2% Post-Affidavit</span>
            <span className="text-[10px] text-slate-500 font-medium">Up from 38.5% baseline</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Recovery Processing Time</span>
            <span className="font-extrabold text-sm text-[#3451D1] mt-0.5 block">45–60 Days</span>
            <span className="text-[10px] text-[#3451D1] font-medium">Direct NRE Account Credit</span>
          </div>
        </div>
      </div>

      {/* PAN Search Bar */}
      <BladeCard variant="default" className="p-4 min-h-0">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchPan}
              onChange={(e) => setSearchPan(e.target.value.toUpperCase())}
              placeholder="Search by PAN Card to check unclaimed funds"
              className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.04] pl-10 pr-4 py-2.5 font-mono text-xs font-semibold text-slate-900 dark:text-white focus:border-[#3451D1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>
          <button
            onClick={handleScan}
            disabled={isSearching}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Searching Records...</span>
              </>
            ) : (
              <>
                <span>Search For Lost Money</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </BladeCard>

      {/* Discovered Items */}
      <div className="space-y-3">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF]">
          Unclaimed Money Found For You ({forgottenAssets.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forgottenAssets.map((asset) => (
            <BladeCard
              key={asset.id}
              variant="interactive"
              className="space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {asset.authority}
                  </span>
                  <StatusBadge
                    status={asset.status === "claimable" ? "warning" : "active"}
                    label={asset.status === "claimable" ? "Ready to Claim" : "Claim Submitted"}
                  />
                </div>

                <h4 className="text-base font-bold text-[#0C2340]">{asset.assetTitle}</h4>
                <div className="text-xs text-blue-600 font-bold">{asset.entityName}</div>
                <div className="text-[11px] text-slate-500">{asset.period}</div>
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {asset.claimProcess}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AMOUNT TO RECEIVE</span>
                  <div className="font-mono text-lg font-bold text-emerald-700">
                    {formatINR(asset.claimableAmountINR)}
                  </div>
                </div>

                {asset.status === "claimable" ? (
                  <button
                    onClick={() => setActiveClaimAsset(asset)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#3451D1] px-4 py-2 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition"
                  >
                    <span>Claim Online</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Claim Under Process
                  </span>
                )}
              </div>
            </BladeCard>
          ))}
        </div>
      </div>

      {activeClaimAsset && (
        <IepfClaimModal
          isOpen={true}
          onClose={() => setActiveClaimAsset(null)}
          asset={activeClaimAsset}
        />
      )}
    </div>
  );
}
