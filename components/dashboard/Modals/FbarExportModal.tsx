"use client";

import React from "react";
import { X, FileSpreadsheet, Download, ShieldAlert } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatUSD } from "@/lib/formatters";

interface FbarExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FbarExportModal: React.FC<FbarExportModalProps> = ({ isOpen, onClose }) => {
  const { accounts, totalNetWorthINR } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#F0F0F0] dark:border-white/[0.06] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4FF] dark:bg-white/10 text-[#3451D1] dark:text-blue-300">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0D2266] dark:text-white tracking-tight">
              US Foreign Account Tax Report (FBAR Form 114)
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Pre-filled spreadsheet for your US CPA or TurboTax filing
            </p>
          </div>
        </div>

        <div className="py-5 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-3.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-[6px] bg-[#DBEAFE] dark:bg-blue-950/40 text-[#1D4ED8] dark:text-blue-300 font-bold text-[11px] px-2 py-0.5">
                FinCEN 114
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Your Indian balances exceed $10,000 USD. You must report this to the US IRS by April 15.
              </span>
            </div>
            <span className="font-mono font-bold text-[#0D2266] dark:text-white ml-2 whitespace-nowrap">
              Peak: {formatUSD(totalNetWorthINR)}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E]">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
              <thead className="bg-slate-50 dark:bg-white/[0.03] text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 border-b border-[#E8E8E8] dark:border-white/[0.08]">
                <tr>
                  <th className="px-4 py-3">Bank / Institution</th>
                  <th className="px-4 py-3">Account Number</th>
                  <th className="px-4 py-3">Account Type</th>
                  <th className="px-4 py-3 text-right">Max Balance (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                    <td className="px-4 py-3 font-bold text-[#0D2266] dark:text-white">{acc.bankName}</td>
                    <td className="px-4 py-3 font-mono text-[#9CA3AF]">{acc.accountNumberMasked}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{acc.accountType}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-[#16A34A] dark:text-emerald-400">
                      {formatUSD(acc.balanceINR)}
                    </td>
                  </tr>
                ))}
                <tr className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#0D2266] dark:text-white">Demat Stocks (CDSL)</td>
                  <td className="px-4 py-3 font-mono text-[#9CA3AF]">120816009821034</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Indian Shares</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#16A34A] dark:text-emerald-400">$9,920</td>
                </tr>
                <tr className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#0D2266] dark:text-white">Mutual Funds (CAMS)</td>
                  <td className="px-4 py-3 font-mono text-[#9CA3AF]">10928391/44</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">Mutual Fund Folios</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#16A34A] dark:text-emerald-400">$20,030</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-[#F0F0F0] dark:border-white/[0.06] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-[#9CA3AF]">
            Official US Treasury Exchange Rate: ₹83.35 per USD
          </span>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2 text-xs font-bold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert("Pre-filled FBAR CSV file downloaded: DeshBoard_FBAR_2025.csv");
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-xl bg-[#3451D1] px-4 py-2 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Pre-Filled Spreadsheet (CSV)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
