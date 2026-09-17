"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_STOCKS, DEMO_MUTUAL_FUNDS } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";

export default function InvestmentsPage() {
  const { totalInvestmentsINR, currency } = useApp();
  const [activeView, setActiveView] = useState<"stocks" | "mutual_funds">("stocks");

  const totalStocksVal = DEMO_STOCKS.reduce((acc, s) => acc + s.currentValue, 0);
  const totalMfVal = DEMO_MUTUAL_FUNDS.reduce((acc, m) => acc + m.currentValueINR, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            Indian Shares & Mutual Funds
          </h1>
          <p className="text-xs text-slate-500">
            Demat stock holdings and mutual fund investments tracked in real time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Downloading your investment holding statement (PDF)")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-blue-600" />
            <span>Download Portfolio Statement</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <BladeStatCard
          label="Total Investments"
          value={currency === "INR" ? formatINR(totalInvestmentsINR) : formatUSD(totalInvestmentsINR)}
          subtitle="Portfolio valuation across demat & funds"
          trend={{ direction: "up", text: "+14.3% overall gain" }}
        />

        <BladeStatCard
          label="Demat Indian Shares"
          value={formatINR(totalStocksVal)}
          subtitle="4 Major Stocks (Zerodha Demat)"
          trend={{ direction: "up", text: "Direct Equity" }}
        />

        <BladeStatCard
          label="Mutual Fund Folios"
          value={formatINR(totalMfVal)}
          subtitle="3 Active Funds (CAMS / KFintech)"
          trend={{ direction: "up", text: "Diversified" }}
        />

        <BladeStatCard
          label="Monthly Auto-Invest (SIP)"
          value="₹15,000 / mo"
          subtitle="Parag Parikh (₹10k) + SBI Index (₹5k)"
          trend={{ direction: "up", text: "Auto-debit active" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#F0F0F0] dark:border-white/[0.06] pb-3">
        <button
          onClick={() => setActiveView("stocks")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeView === "stocks"
              ? "bg-[#3451D1] text-white shadow-sm"
              : "text-[#374151] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] bg-white dark:bg-[#1A1F2E] border border-[#E5E7EB] dark:border-white/[0.1]"
          }`}
        >
          Indian Shares (Demat)
        </button>
        <button
          onClick={() => setActiveView("mutual_funds")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            activeView === "mutual_funds"
              ? "bg-[#3451D1] text-white shadow-sm"
              : "text-[#374151] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04] bg-white dark:bg-[#1A1F2E] border border-[#E5E7EB] dark:border-white/[0.1]"
          }`}
        >
          Mutual Funds (CAMS)
        </button>
      </div>

      {/* Table */}
      {activeView === "stocks" ? (
        <BladeCard variant="default" className="p-0 overflow-hidden min-h-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-[#E8E8E8] dark:border-white/[0.08]">
                <tr>
                  <th className="px-5 py-3.5">Company Name</th>
                  <th className="px-5 py-3.5">Account</th>
                  <th className="px-5 py-3.5 text-right">Shares</th>
                  <th className="px-5 py-3.5 text-right">Buy Price</th>
                  <th className="px-5 py-3.5 text-right">Current Price</th>
                  <th className="px-5 py-3.5 text-right">Total Value</th>
                  <th className="px-5 py-3.5 text-right">Profit / Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {DEMO_STOCKS.map((s) => (
                  <tr key={s.ticker} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#0D2266] dark:text-white">{s.name}</div>
                      <div className="font-mono text-[11px] text-[#3451D1] font-semibold">{s.ticker}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[#9CA3AF]">{s.depository}</td>
                    <td className="px-5 py-4 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">{s.shares}</td>
                    <td className="px-5 py-4 text-right font-mono text-[#9CA3AF]">₹{s.avgBuyPrice}</td>
                    <td className="px-5 py-4 text-right font-mono text-slate-900 dark:text-white font-medium">₹{s.cmp}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-[#0D2266] dark:text-white">
                      {formatINR(s.currentValue)}
                    </td>
                    <td className="px-5 py-4 text-right font-mono">
                      <span
                        className={`inline-flex items-center rounded-[6px] px-2.5 py-0.5 text-[11px] font-bold ${
                          s.gainLossPercent >= 0
                            ? "text-[#16A34A] bg-[#DCFCE7] dark:bg-emerald-950/40"
                            : "text-[#DC2626] bg-[#FEE2E2] dark:bg-rose-950/40"
                        }`}
                      >
                        {s.gainLossPercent >= 0 ? "+" : ""}
                        {s.gainLossPercent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BladeCard>
      ) : (
        <BladeCard variant="default" className="p-0 overflow-hidden min-h-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-[#E8E8E8] dark:border-white/[0.08]">
                <tr>
                  <th className="px-5 py-3.5">Fund Name</th>
                  <th className="px-5 py-3.5">Folio Number</th>
                  <th className="px-5 py-3.5">Fund House</th>
                  <th className="px-5 py-3.5 text-right">Invested</th>
                  <th className="px-5 py-3.5 text-right">Current Value</th>
                  <th className="px-5 py-3.5 text-right">Monthly Auto-Debit</th>
                  <th className="px-5 py-3.5 text-right">Yearly Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {DEMO_MUTUAL_FUNDS.map((mf) => (
                  <tr key={mf.folio} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#0D2266] dark:text-white">{mf.fundName}</div>
                      <div className="text-[11px] text-[#9CA3AF]">{mf.category}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[#9CA3AF]">{mf.folio}</td>
                    <td className="px-5 py-4 font-mono text-[#9CA3AF]">{mf.registrar}</td>
                    <td className="px-5 py-4 text-right font-mono text-[#9CA3AF]">
                      {formatINR(mf.investedINR)}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-[#0D2266] dark:text-white">
                      {formatINR(mf.currentValueINR)}
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-[#3451D1]">
                      {mf.sipAmount ? `₹${mf.sipAmount.toLocaleString()}/mo` : "Lumpsum"}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-[#16A34A] dark:text-emerald-400 font-bold">
                      +{mf.xirr}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BladeCard>
      )}
    </div>
  );
}
