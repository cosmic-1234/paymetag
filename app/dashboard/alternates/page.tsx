"use client";

import React from "react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_ALTERNATES } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";

export default function AlternatesPage() {
  const { totalAlternatesINR, currency } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
            Gold, Government Bonds & Crypto
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sovereign Gold Bonds, RBI savings bonds, physical vaulted gold, and tax-declared crypto
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="TOTAL ALTERNATE HOLDINGS"
          value={currency === "INR" ? formatINR(totalAlternatesINR) : formatUSD(totalAlternatesINR)}
          subtext="Gold Bonds (₹1.44L) + RBI Bonds (₹5L) + Bullion + Crypto"
        />

        <BladeStatCard
          label="GOVERNMENT GOLD BONDS"
          value="20 Grams (SGB)"
          subtext="2.50% extra yearly interest paid straight to NRE account"
          badge={{ text: "SGB Sovereign", color: "yellow" }}
        />

        <BladeStatCard
          label="TAX FILING STATUS"
          value="Declared"
          subtext="Reported in Indian ITR and US IRS forms"
          badge={{ text: "Compliant", color: "green" }}
        />
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#3451D1]">ⓘ</span>
        <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          HOLDINGS & CERTIFICATES ({DEMO_ALTERNATES.length})
        </h2>
      </div>

      {/* Holdings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_ALTERNATES.map((asset, idx) => (
          <BladeCard
            key={idx}
            variant="interactive"
            className="flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Row 1: Top Bar */}
              <div className="flex items-start justify-between">
                <span className="rounded-[6px] bg-[#F0F4FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#3451D1] dark:text-blue-300">
                  {asset.category}
                </span>
                <span className="rounded-[6px] bg-[#DCFCE7] dark:bg-emerald-950/40 px-2.5 py-0.5 text-[11px] font-bold text-[#16A34A] dark:text-emerald-400">
                  {asset.complianceTag}
                </span>
              </div>

              {/* Row 2: Title */}
              <div className="pt-1">
                <h3 className="text-base font-bold text-[#0D2266] dark:text-white tracking-tight">
                  {asset.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {asset.holdingDetails}
                </p>
              </div>

              {/* Valuation details */}
              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Buy Price:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">
                    {formatINR(asset.purchaseCostINR)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Today's Value:</span>
                  <span className="font-mono font-bold text-[#0D2266] dark:text-white text-sm">
                    {formatINR(asset.currentValueINR)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E8E8E8] dark:border-white/[0.08]">
                  <span className="text-slate-500 dark:text-slate-400">Interest / Terms:</span>
                  <span className="text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    {asset.yieldInfo}
                  </span>
                </div>
              </div>
            </div>

            {/* Row 4: Footer */}
            <div className="mt-4 pt-4 border-t border-[#F3F4F6] dark:border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-normal">Depository Record</span>
              <button
                onClick={() => alert(`Certificate of holding generated for ${asset.title}`)}
                className="font-bold text-[#3451D1] hover:text-[#1D3FAD] transition-colors inline-flex items-center gap-1"
              >
                <span>View Certificate</span>
                <span>→</span>
              </button>
            </div>
          </BladeCard>
        ))}
      </div>
    </div>
  );
}
