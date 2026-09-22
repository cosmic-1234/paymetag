"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  FileCheck,
  ArrowUpRight,
  Scale,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { formatINR } from "@/lib/formatters";
import { DEMO_TAX } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { FbarExportModal } from "@/components/dashboard/Modals/FbarExportModal";
import { AiTaxAuditModal } from "@/components/dashboard/Modals/AiTaxAuditModal";
import { openAiCopilot } from "@/lib/aiCopilot";

export default function TaxPage() {
  const [isFbarModalOpen, setIsFbarModalOpen] = useState(false);
  const [isTaxAuditModalOpen, setIsTaxAuditModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            Indian Taxes & US Tax Reporting (FBAR)
          </h1>
          <p className="text-xs text-slate-500">
            Form 26AS matching, lower treaty tax rates (15%), and pre-filled US foreign account filing sheets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFbarModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Pre-Filled FBAR Sheet</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="Indian Tax Return Status"
          value="Refund Received"
          subtitle={`${formatINR(DEMO_TAX.refundApprovedINR)} sent to your HDFC account`}
          trend={{ direction: "up", text: "Processed by IT Dept" }}
        />

        <BladeStatCard
          label="Taxes Already Deducted (TDS)"
          value={formatINR(DEMO_TAX.totalTdsDeductedINR)}
          subtitle="Reconciled with Form 26AS records"
          trend={{ direction: "up", text: "Fully Matched" }}
        />

        <BladeStatCard
          label="Taxes Saved Using US Treaty"
          value={formatINR(DEMO_TAX.dtaaTreaty.savingINR)}
          subtitle="15% tax rate instead of 30% standard"
          trend={{ direction: "up", text: "DTAA Active" }}
        />
      </div>

      {/* AI Cross-Border Tax Arbitrage & DTAA Treaty Analyzer */}
      <div className="rounded-2xl border border-[#3451D1]/30 bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF2FF] dark:from-[#0F172A] dark:via-[#131C35] dark:to-[#0F172A] p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] text-white shadow-xs">
                <Scale className="h-3.5 w-3.5" />
              </span>
              <span className="rounded-md bg-[#EEF2FF] dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3451D1] border border-[#3451D1]/20">
                Sovereign Tax Intelligence
              </span>
              <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                Form 1116 Active
              </span>
            </div>
            <h3 className="font-extrabold text-[15px] text-[#0D2266] dark:text-white">
              AI Cross-Border Tax Arbitrage & DTAA Treaty Analyzer
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
              Automated reconciliation of Indian Section 195 TDS (20%) with US California Marginal Tax Brackets (37% Federal + 9.3% State). Foreign Tax Credit (FTC) offsets US passive liability dollar-for-dollar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsTaxAuditModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#3451D1] hover:bg-[#1D3FAD] px-4 py-2.5 text-xs font-bold text-white transition shadow-sm"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Run AI Tax Mismatch Audit</span>
            </button>
            <button
              onClick={() =>
                openAiCopilot(
                  "Analyze DTAA Article 10 dividend withholding rates for my Indian demat portfolio vs US IRS taxation."
                )
              }
              className="flex items-center gap-1.5 rounded-xl border border-[#3451D1] bg-white dark:bg-blue-950/50 px-3.5 py-2.5 text-xs font-bold text-[#3451D1] dark:text-blue-300 hover:bg-[#EEF2FF] transition"
            >
              <span>Ask AI Counsel</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Inline AI Tax Insights */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#3451D1]/15 pt-3.5">
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Total FTC Reclaimable</span>
            <span className="font-extrabold text-sm text-[#0D2266] dark:text-white mt-0.5 block">₹1,42,000 ($1,710 USD)</span>
            <span className="text-[10px] text-emerald-600 font-medium">IRS Form 1116 Line 8</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Section 197 Optimization</span>
            <span className="font-extrabold text-sm text-[#0D2266] dark:text-white mt-0.5 block">Lower Deduction Eligible</span>
            <span className="text-[10px] text-[#3451D1] font-medium">Saves ₹2,42,000 withholding</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Form 10F & TRC Filing</span>
            <span className="font-extrabold text-sm text-[#16A34A] mt-0.5 block">Valid for FY2026-27</span>
            <span className="text-[10px] text-slate-500 font-medium">No 30% Non-Resident Surcharge</span>
          </div>
        </div>
      </div>

      {/* US FBAR Alert Card — Clean Blade design, no amateur tint */}
      <BladeCard
        variant="default"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 min-h-0 bg-white"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#1D4ED8]">
            <ArrowUpRight className="h-4 w-4 text-[#1D4ED8]" />
          </span>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-[6px] bg-[#DBEAFE] px-2.5 py-0.5 font-bold text-[11px] uppercase tracking-[0.06em] text-[#1D4ED8]">
                FinCEN 114
              </span>
              <h4 className="font-bold text-[14px] text-[#0D2266] dark:text-white">
                US FBAR Reporting Notice (Due April 15)
              </h4>
            </div>
            <p className="font-normal text-[13px] text-[#6B7280] dark:text-slate-400 leading-[1.6]">
              Because your total Indian bank and stock balances exceed $10,000 USD, US law requires reporting them on FinCEN Form 114. We have pre-filled this spreadsheet for you.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsFbarModalOpen(true)}
          className="shrink-0 rounded-xl bg-[#3451D1] px-4 py-2 font-bold text-xs text-white hover:bg-[#1D3FAD] shadow-sm transition cursor-pointer"
        >
          View FBAR Spreadsheet
        </button>
      </BladeCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Income Sources */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Your Income in India & Taxes Paid
          </h3>

          <BladeCard variant="default" className="p-0 overflow-hidden min-h-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
                <thead className="bg-slate-50 dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-[#E8E8E8] dark:border-white/[0.08]">
                  <tr>
                    <th className="px-5 py-3.5">Income Source</th>
                    <th className="px-5 py-3.5 text-right">Total Earned</th>
                    <th className="px-5 py-3.5 text-right">Tax Deducted</th>
                    <th className="px-5 py-3.5 text-center">Form 26AS Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                  {DEMO_TAX.inflowSources.map((s, idx) => (
                    <tr key={idx} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                      <td className="px-5 py-4 font-bold text-[#0C2340]">{s.source}</td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-[#0C2340]">
                        {formatINR(s.amountINR)}
                      </td>
                      <td className="px-5 py-4 text-right font-mono text-emerald-700 font-semibold">
                        {formatINR(s.tdsDeductedINR)}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#16A34A]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                          Matched
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BladeCard>
        </div>

        {/* Treaty Details */}
        <div className="lg:col-span-5">
          <BladeCard variant="default" className="p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                US-India Tax Treaty
              </span>
              <span className="rounded-[6px] bg-[#DBEAFE] px-2 py-0.5 text-[10px] font-bold text-[#1D4ED8]">
                Form 10F Active
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-[#0C2340]">
                Avoid Double Taxation
              </h4>
              <p className="mt-1 text-xs font-normal text-slate-500 leading-relaxed">
                By showing you are a US tax resident, Indian banks charge you only 15% tax instead of 30%.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Your Special Treaty Rate:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {DEMO_TAX.dtaaTreaty.reducedTdsRate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Standard Indian Rate:</span>
                <span className="font-mono text-slate-500 line-through">
                  {DEMO_TAX.dtaaTreaty.standardRate}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-bold">Total Money Saved:</span>
                <span className="font-mono font-bold text-[#0C2340]">
                  {formatINR(DEMO_TAX.dtaaTreaty.savingINR)}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert("Downloading your Form 10F and Tax Residency Certificate packet")}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <FileCheck className="h-3.5 w-3.5 text-blue-600" />
              <span>Download Tax Treaty Papers (PDF)</span>
            </button>
          </BladeCard>
        </div>
      </div>

      <FbarExportModal
        isOpen={isFbarModalOpen}
        onClose={() => setIsFbarModalOpen(false)}
      />

      <AiTaxAuditModal
        isOpen={isTaxAuditModalOpen}
        onClose={() => setIsTaxAuditModalOpen(false)}
      />
    </div>
  );
}
