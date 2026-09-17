"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_RETIREMENT } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";

export default function RetirementPage() {
  const { totalRetirementINR, currency } = useApp();
  const [activeTab, setActiveTab] = useState<"EPFO" | "NPS" | "PPF">("EPFO");

  const activeAsset = DEMO_RETIREMENT.find((r) => r.type === activeTab) || DEMO_RETIREMENT[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            PF & Government Retirement Savings
          </h1>
          <p className="text-xs text-slate-500">
            Provident Fund from previous employers, National Pension System, and 15-year PPF accounts
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="Total Retirement Savings"
          value={currency === "INR" ? formatINR(totalRetirementINR) : formatUSD(totalRetirementINR)}
          subtitle="Old PF (₹4.82L) + NPS (₹3.9L) + PPF (₹9.4L)"
          trend={{ direction: "up", text: "+8.25% weighted yield" }}
        />

        <BladeStatCard
          label="Old Company PF"
          value="₹4,82,000"
          subtitle="TCS account (Claimable online to NRO)"
          trend={{ direction: "up", text: "Sitting Idle" }}
        />

        <BladeStatCard
          label="SBI PPF Lock-in"
          value="Matures 2031"
          subtitle="7.10% Tax-Free Compound Growth (Year 9 of 15)"
          trend={{ direction: "up", text: "Govt Backed" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3">
        {(["EPFO", "NPS", "PPF"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-blue-sm"
                : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
            }`}
          >
            {tab === "EPFO" ? "Old Employer PF (TCS)" : tab === "NPS" ? "National Pension System" : "15-Year PPF Account"}
          </button>
        ))}
      </div>

      <BladeCard variant="default" className="p-6 bg-white space-y-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-600">
                {activeAsset.identifierLabel}: {activeAsset.identifier}
              </span>
              <h3 className="text-xl font-bold text-[#0C2340]">
                {activeAsset.institution}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Accumulated Balance
              </span>
              <div className="font-mono text-2xl font-bold text-[#0C2340]">
                {formatINR(activeAsset.balanceINR)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(activeAsset.details).map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs">
                <div className="text-slate-500 font-medium">{k}</div>
                <div className="mt-1 font-mono text-sm font-bold text-[#0C2340]">
                  {typeof v === "number" ? formatINR(v) : v}
                </div>
              </div>
            ))}
          </div>

          {activeAsset.type === "EPFO" && (
            <BladeCard variant="default" className="p-4 bg-white min-h-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FEF9C3] text-[#A16207]">
                  <AlertTriangle className="h-4 w-4 text-[#A16207]" />
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[6px] bg-[#FEF9C3] px-2.5 py-0.5 font-bold text-[11px] uppercase tracking-[0.06em] text-[#A16207]">
                      Withdrawal Action
                    </span>
                    <span className="font-bold text-[14px] text-[#0D2266]">
                      How to withdraw this PF money
                    </span>
                  </div>
                  <p className="font-normal text-[13px] text-[#6B7280] leading-[1.6]">
                    Since you no longer work at TCS and live abroad, you can transfer this full balance (₹4,82,000) directly to your SBI or HDFC account online.
                  </p>
                </div>
              </div>
              <button
                onClick={() => alert("EPFO online claim initiated. Money will be transferred directly to your registered NRO account.")}
                className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm transition"
              >
                Claim Full PF (₹4,82,000)
              </button>
            </BladeCard>
          )}
        </div>
      </BladeCard>
    </div>
  );
}
