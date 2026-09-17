"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR } from "@/lib/formatters";
import { DEMO_INSURANCE } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function InsurancePage() {
  const [policies, setPolicies] = useState(DEMO_INSURANCE);

  const handlePayPremium = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === policyId ? { ...p, status: "active", daysLeft: 365 } : p))
    );
    alert("Premium payment completed via your HDFC NRE account.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
            Life & Health Insurance Policies
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Keep your family insurance active, pay premiums from abroad, and make sure nominees are listed
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="Total Life Cover in India"
          value="₹25,00,000"
          subtitle="LIC Jeevan Anand Policy"
          trend={{ direction: "up", text: "Active Protection" }}
        />

        <BladeStatCard
          label="Family Health Insurance"
          value="₹10,00,000"
          subtitle="HDFC ERGO (Covers parents in Mumbai)"
          trend={{ direction: "up", text: "Cashless Network" }}
        />

        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Nominee Check Needed
              </span>
              <StatusBadge status="warning" label="2 Reminders" />
            </div>
            <div className="mt-2 text-[32px] font-extrabold text-[#0C2340] leading-tight font-sans">
              2 Items
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-normal text-amber-700">
            Add back-up nominee on father's policy
          </div>
        </BladeCard>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {policies.map((p) => (
          <BladeCard
            key={p.id}
            variant="interactive"
            className="flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {p.type}
                </span>
                <StatusBadge
                  status={p.status === "active" ? "active" : p.status === "due_soon" ? "warning" : "critical"}
                  label={p.status === "active" ? "Active" : p.status === "due_soon" ? "Due Soon" : "Lapsed"}
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-[#0C2340]">{p.policyName}</h4>
                <div className="text-xs font-normal text-slate-500">{p.provider}</div>
                <div className="mt-1 font-mono text-[11px] text-slate-400">
                  Policy #: {p.policyNumber}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Insurance Cover:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatINR(p.sumAssured)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Yearly Premium:</span>
                  <span className="font-mono text-slate-700">
                    {formatINR(p.annualPremium)}
                  </span>
                </div>
                {p.surrenderValue && (
                  <div className="flex justify-between text-amber-700 font-bold">
                    <span>Cash Out Value:</span>
                    <span className="font-mono">
                      {formatINR(p.surrenderValue)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Beneficiary Nominee:</span>
                  <span className="text-slate-800 font-medium">{p.nominee}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              {p.status === "due_soon" && (
                <button
                  onClick={() => handlePayPremium(p.id)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#3451D1] py-2.5 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Pay {formatINR(p.annualPremium)} Premium</span>
                </button>
              )}
              {p.status === "lapsed" && (
                <button
                  onClick={() => alert("Reactivation request sent to Star Health team")}
                  className="w-full rounded-xl bg-[#0D2266] py-2.5 text-xs font-bold text-white hover:bg-[#081745] transition"
                >
                  Restart Policy or Claim ₹28,000
                </button>
              )}
              {p.status === "active" && (
                <div className="flex items-center justify-center gap-1 text-xs text-emerald-700 font-bold py-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Policy In Good Standing</span>
                </div>
              )}
            </div>
          </BladeCard>
        ))}
      </div>
    </div>
  );
}
