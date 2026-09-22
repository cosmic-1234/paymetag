"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Landmark,
  Building2,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Download,
  AlertCircle,
  Percent,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function LoansPage() {
  const { loans, totalLoansINR, totalNetWorthINR, currency, activeUser } = useApp();
  const [selectedLoanId, setSelectedLoanId] = useState<string>(loans[0]?.id || "");

  const activeLoans = loans.filter((l) => l.status === "active");
  const plannedLoans = loans.filter((l) => l.status === "planned");
  const totalMonthlyEmiINR = activeLoans.reduce((sum, l) => sum + l.monthlyEmiINR, 0);
  const netWealthAfterDebtINR = totalNetWorthINR - totalLoansINR;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0C2340]">
              Loans & Liabilities
            </h1>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1]">
              Future Planning
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track NRI Home Loans, EMI debit schedules, and mortgage liabilities against Indian assets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Downloading consolidated Loan Interest Certificate (Section 24b / 80C)")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-[#3451D1]" />
            <span>Interest Certificate (Sec 24b)</span>
          </button>
        </div>
      </div>

      {/* Future Planning Concept Banner */}
      <div className="rounded-xl border border-blue-100 bg-[#F4F7FF] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3451D1] text-white shrink-0 mt-0.5">
            <CreditCard className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-xs text-[#0D2266] block">
              Liability Command Center (Roadmap Feature)
            </span>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              Automated Account Aggregator integration for Indian home loans, loan against mutual funds (LAMF), and EMI autopay debit synchronization with your NRE accounts.
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center shrink-0 text-[10px] font-bold uppercase tracking-wider bg-white border border-blue-200 text-[#3451D1] px-2.5 py-1 rounded-md">
          Planned for Q4
        </span>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Outstanding */}
        <BladeStatCard
          label="Total Loan Outstanding"
          value={currency === "INR" ? formatINR(totalLoansINR) : formatUSD(totalLoansINR)}
          subtitle={
            activeLoans.length > 0
              ? `${activeLoans.length} active loan facility`
              : "No active borrowings"
          }
          trend={{ direction: "down", text: "Principal reducing" }}
        />

        {/* Monthly EMI Outflow */}
        <BladeStatCard
          label="Monthly EMI Commitment"
          value={currency === "INR" ? `${formatINR(totalMonthlyEmiINR)} / mo` : `${formatUSD(totalMonthlyEmiINR)} / mo`}
          subtitle="Auto-debited from NRE account"
          trend={{ direction: "down", text: "Due on 5th of each month" }}
        />

        {/* Total Assets vs Liabilities (Net Wealth) */}
        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Net Indian Wealth
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Assets - Debt
              </span>
            </div>
            <div className="mt-2 text-[26px] font-extrabold text-[#0C2340] leading-tight font-sans">
              {currency === "INR" ? formatINR(netWealthAfterDebtINR) : formatUSD(netWealthAfterDebtINR)}
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            Assets: {formatINR(totalNetWorthINR)} • Debt: {formatINR(totalLoansINR)}
          </div>
        </BladeCard>

        {/* Tax Saving Under Sec 24b */}
        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Sec 24(b) Tax Deduction
              </span>
              <StatusBadge status="active" label="Eligible" />
            </div>
            <div className="mt-2 text-[26px] font-extrabold text-emerald-700 leading-tight font-sans">
              ₹2,00,000 / yr
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            Max interest deduction on Indian ITR-2
          </div>
        </BladeCard>
      </div>

      {/* Loan Facilities List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
          Borrowing Portfolio for {activeUser.name} ({loans.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                      {loan.loanType}
                    </span>
                    <h4 className="mt-2 text-base font-bold text-[#0C2340]">
                      {loan.bankName}
                    </h4>
                    <span className="font-mono text-xs text-slate-500">
                      {loan.accountNumberMasked}
                    </span>
                  </div>

                  <StatusBadge
                    status={loan.status === "active" ? "active" : "neutral"}
                    label={loan.status === "active" ? "In Repayment" : "Planned"}
                  />
                </div>

                {loan.propertyLinked && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Collateral: {loan.propertyLinked}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Outstanding Balance
                    </span>
                    <div className="font-mono text-base font-bold text-[#0C2340] mt-0.5">
                      {formatINR(loan.outstandingBalanceINR)}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Sanctioned: {formatINR(loan.sanctionedAmountINR)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Monthly EMI
                    </span>
                    <div className="font-mono text-base font-bold text-rose-600 mt-0.5">
                      {loan.monthlyEmiINR > 0 ? formatINR(loan.monthlyEmiINR) : "₹0"}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Rate: {loan.interestRate}
                    </span>
                  </div>
                </div>

                {loan.status === "active" && (
                  <div className="rounded-lg bg-slate-50 p-2.5 text-xs space-y-1 border border-slate-100">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Debit Account:</span>
                      <span className="font-medium text-[#0C2340]">{loan.emiDebitAccount}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Next EMI Date:</span>
                      <span className="font-medium text-[#3451D1]">{loan.nextEmiDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Tenure Remaining:</span>
                      <span className="font-medium text-slate-700">{loan.tenureRemainingMonths} Months</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => alert(`Showing loan repayment schedule for ${loan.accountNumberMasked}`)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  View Amortization Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
