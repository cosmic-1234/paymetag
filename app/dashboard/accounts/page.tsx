"use client";

import React, { useState } from "react";
import {
  Landmark,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Download,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { VideoKycModal } from "@/components/dashboard/Modals/VideoKycModal";
import { RedesignateModal } from "@/components/dashboard/Modals/RedesignateModal";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function AccountsPage() {
  const { accounts, currency, totalLiquidINR } = useApp();
  const [selectedKycBank, setSelectedKycBank] = useState<string | null>(null);
  const [redesignateAccountItem, setRedesignateAccountItem] = useState<any | null>(null);

  const activeCount = accounts.filter((a) => a.status === "active").length;
  const issuesCount = accounts.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            All Bank Accounts & Fixed Deposits
          </h1>
          <p className="text-xs text-slate-500">
            NRE, NRO, and Fixed Deposits automatically tracked from India
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Downloading consolidated bank interest certificate for tax filing")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-blue-600" />
            <span>Download Bank Interest Certificate</span>
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="Total Bank Balance"
          value={currency === "INR" ? formatINR(totalLiquidINR) : formatUSD(totalLiquidINR)}
          subtitle="Across 6 bank accounts in India"
          trend={{ direction: "up", text: "+4.2% interest accrual" }}
        />

        <BladeStatCard
          label="US Dollar Deposit (FCNR)"
          value="$18,000 USD"
          subtitle="ICICI Bank (5.25% USD interest rate)"
          trend={{ direction: "up", text: "Fixed Return" }}
        />

        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Needs Your Attention
              </span>
              <StatusBadge status="warning" label={`${issuesCount} Actions`} />
            </div>
            <div className="mt-2 text-[32px] font-extrabold text-[#0C2340] leading-tight font-sans">
              {issuesCount} Accounts
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-normal text-rose-600">
            1 KYC Video Call Due • 1 Old Savings Account
          </div>
        </BladeCard>
      </div>

      {/* Notice Card */}
      <BladeCard
        variant="default"
        className="flex items-start gap-4 p-5 min-h-0 bg-white"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FEF9C3] text-[#A16207]">
          <AlertTriangle className="h-4 w-4 text-[#A16207]" />
        </span>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-[6px] bg-[#FEF9C3] px-2.5 py-0.5 font-bold text-[11px] uppercase tracking-[0.06em] text-[#A16207]">
              Compliance
            </span>
            <h4 className="font-bold text-[14px] text-[#0D2266]">
              Action needed on Bank of Baroda account
            </h4>
          </div>
          <p className="font-normal text-[13px] text-[#6B7280] leading-[1.6]">
            When you live abroad, holding an old resident savings account is against Indian banking rules. Convert your Bank of Baroda account to NRO so you can send money without delays.
          </p>
        </div>
      </BladeCard>

      {/* Accounts Table */}
      <BladeCard variant="default" className="p-0 overflow-hidden min-h-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
            <thead className="bg-slate-50 dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-[#E8E8E8] dark:border-white/[0.08]">
              <tr>
                <th className="px-5 py-3.5">Bank & Branch</th>
                <th className="px-5 py-3.5">Account Type</th>
                <th className="px-5 py-3.5">Account Number</th>
                <th className="px-5 py-3.5">Nominee</th>
                <th className="px-5 py-3.5 text-right">Balance</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {accounts.map((acc) => (
                <tr key={acc.id} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#0C2340]">{acc.bankName}</div>
                    <div className="text-[11px] font-normal text-slate-500">{acc.branch}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700 text-[11px]">
                      {acc.accountType}
                    </span>
                    {acc.interestRate && (
                      <div className="mt-1 text-[11px] text-emerald-700 font-medium">{acc.interestRate}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-600">
                    {acc.accountNumberMasked}
                  </td>
                  <td className="px-5 py-4">
                    <span className={acc.nominee.includes("None") ? "text-rose-600 font-bold" : "text-slate-700 font-medium"}>
                      {acc.nominee}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="font-mono font-bold text-[#0C2340]">
                      {formatINR(acc.balanceINR)}
                    </div>
                    {acc.balanceForeign && (
                      <div className="font-mono text-[11px] text-blue-700 font-semibold">
                        ${acc.balanceForeign.amount.toLocaleString()} USD
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {acc.status === "active" && (
                      <StatusBadge status="active" label="Active" />
                    )}
                    {acc.status === "kyc_expired" && (
                      <StatusBadge status="critical" label="KYC Overdue" />
                    )}
                    {acc.status === "dormant" && (
                      <StatusBadge status="warning" label="Old Savings" />
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {acc.status === "kyc_expired" && (
                      <button
                        onClick={() => setSelectedKycBank(acc.bankName)}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-blue-sm"
                      >
                        Quick Video Call
                      </button>
                    )}
                    {acc.status === "dormant" && (
                      <button
                        onClick={() => setRedesignateAccountItem(acc)}
                        className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition shadow-sm"
                      >
                        Update to NRO
                      </button>
                    )}
                    {acc.status === "active" && (
                      <button
                        onClick={() => alert(`Showing statements for ${acc.bankName} ${acc.accountNumberMasked}`)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Statement →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BladeCard>

      <VideoKycModal
        isOpen={!!selectedKycBank}
        onClose={() => setSelectedKycBank(null)}
        institutionName={selectedKycBank || undefined}
      />

      {redesignateAccountItem && (
        <RedesignateModal
          isOpen={true}
          onClose={() => setRedesignateAccountItem(null)}
          account={redesignateAccountItem}
        />
      )}
    </div>
  );
}
