"use client";

import React, { useState } from "react";
import { ArrowRight, SendHorizontal, DollarSign } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";

export default function IncomePage() {
  const { currency } = useApp();
  const [remitInr, setRemitInr] = useState(1000000);

  const months = [
    { name: "Apr 2024", rent: 30000, interest: 12000, dividend: 1000 },
    { name: "May 2024", rent: 30000, interest: 12000, dividend: 0 },
    { name: "Jun 2024", rent: 30000, interest: 12000, dividend: 2500 },
    { name: "Jul 2024", rent: 30000, interest: 12000, dividend: 0 },
    { name: "Aug 2024", rent: 30000, interest: 12000, dividend: 4500 },
    { name: "Sep 2024", rent: 30000, interest: 12000, dividend: 1000 },
  ];

  const repatriationLogs = [
    {
      date: "14 Nov 2024",
      amountUSD: 12000,
      amountINR: 1000200,
      from: "HDFC NRE Savings",
      to: "Chase Checking (San Jose, USA)",
      compliance: "Zero Tax on NRE",
      status: "Received",
    },
    {
      date: "28 Jul 2024",
      amountUSD: 8500,
      amountINR: 708475,
      from: "ICICI FCNR USD Deposit",
      to: "Chase Checking (San Jose, USA)",
      compliance: "Direct USD Wire",
      status: "Received",
    },
  ];

  const calculatedUSD = (remitInr / 83.35).toFixed(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
            Indian Earnings & Money Sent Abroad
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track monthly rental income and easily calculate sending money back to your US or foreign bank account
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="YEARLY INCOME IN INDIA"
          value="₹5,16,000 / yr"
          subtext="About ₹43,000 / month from rent and bank interest"
        />

        <BladeStatCard
          label="SENT TO US ACCOUNT (12 MO)"
          value="$20,500 USD"
          subtext="Transferred safely to Chase Bank California"
          badge={{ text: "Compliant", color: "green" }}
        />

        <BladeStatCard
          label="ANNUAL TRANSFER ALLOWANCE"
          value="$229,500 Available"
          subtext="Out of annual $250,000 RBI quota"
          badge={{ text: "RBI Quota", color: "blue" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Monthly Inflow Breakdown (Rent + Interest)
          </h3>

          <BladeCard variant="default" className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
                <thead className="bg-slate-50 dark:bg-white/[0.03] text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-[#E8E8E8] dark:border-white/[0.08]">
                  <tr>
                    <th className="px-5 py-3.5">Month</th>
                    <th className="px-5 py-3.5 text-right">Rent</th>
                    <th className="px-5 py-3.5 text-right">Bank Interest</th>
                    <th className="px-5 py-3.5 text-right">Stock Dividends</th>
                    <th className="px-5 py-3.5 text-right">Total Inflow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                  {months.map((m) => {
                    const total = m.rent + m.interest + m.dividend;
                    return (
                      <tr key={m.name} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                        <td className="px-5 py-3.5 font-bold text-[#0D2266] dark:text-white">{m.name}</td>
                        <td className="px-5 py-3.5 text-right font-mono text-slate-700 dark:text-slate-300">
                          {formatINR(m.rent)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono text-slate-700 dark:text-slate-300">
                          {formatINR(m.interest)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                          {formatINR(m.dividend)}
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono font-bold text-[#0D2266] dark:text-white">
                          {formatINR(total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </BladeCard>
        </div>

        {/* Transfer Calculator */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Money Transfer Calculator
          </h3>
          <BladeCard variant="default" className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E8E8] dark:border-white/[0.08] pb-3">
              <span className="text-xs font-bold text-[#3451D1] uppercase tracking-wider">
                Remittance Estimator
              </span>
              <span className="rounded-[6px] bg-[#F0F4FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300">
                NRE Account Transfer
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Amount in Rupees to Send (INR)
              </label>
              <input
                type="number"
                value={remitInr}
                onChange={(e) => setRemitInr(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.04] px-3.5 py-2.5 font-mono text-sm font-bold text-[#0D2266] dark:text-white focus:border-[#3451D1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
            </div>

            <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">You Will Receive (USD):</span>
                <span className="font-mono text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  ${Number(calculatedUSD).toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Exchange Rate Used:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">₹83.35 per USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Transfer Time:</span>
                <span className="text-[#3451D1] font-bold">Same Day / 24 Hours</span>
              </div>
            </div>

            <button
              onClick={() => alert("Wire transfer form generated for your HDFC NRE account")}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#3451D1] py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-all"
            >
              <span>Start Transfer to US Account</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </BladeCard>
        </div>
      </div>

      {/* Historical Ledger */}
      <div className="space-y-3">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF]">
          Past Money Transfers Sent to Your US Account
        </h3>

        <div className="space-y-3">
          {repatriationLogs.map((log, idx) => (
            <BladeCard
              key={idx}
              variant="default"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#0D2266] dark:text-white text-sm">
                    ${log.amountUSD.toLocaleString()} USD
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs">({formatINR(log.amountINR)})</span>
                </div>
                <div className="mt-1 text-slate-600 dark:text-slate-400 text-xs font-medium">
                  {log.from} ➔ {log.to}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-[6px] bg-[#DCFCE7] dark:bg-emerald-950/40 px-2.5 py-0.5 font-bold text-[11px] text-[#16A34A] dark:text-emerald-400">
                  {log.compliance}
                </span>
                <span className="text-slate-400 font-mono text-xs">{log.date}</span>
              </div>
            </BladeCard>
          ))}
        </div>
      </div>
    </div>
  );
}
