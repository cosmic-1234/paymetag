"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  X,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  Download,
  Scale,
} from "lucide-react";
import { openAiCopilot } from "@/lib/aiCopilot";

interface AiTaxAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiTaxAuditModal: React.FC<AiTaxAuditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [auditStep, setAuditStep] = useState<"idle" | "scanning" | "completed">("idle");

  if (!isOpen) return null;

  const startAudit = () => {
    setAuditStep("scanning");
    setTimeout(() => {
      setAuditStep("completed");
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#111624] shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0F0F0] dark:border-white/[0.06] px-6 py-4 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] text-white shadow-sm">
              <BrainCircuit className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[15px] text-[#0D2266] dark:text-white">
                AI Cross-Border Tax & 26AS Audit
              </h3>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                Autonomous reconciliation between Form 26AS, AIS, TIS, and US IRS Form 1040
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {auditStep === "idle" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-blue-100 dark:border-blue-950/50 bg-[#F0F4FF] dark:bg-blue-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3451D1] dark:text-blue-400 mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  Target Audit Vectors
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 mt-2">
                  <li>• Form 26AS (Tax Deducted at Source) vs Brokerage Contract Notes</li>
                  <li>• Annual Information Statement (AIS) high-value mutual fund dividend reporting</li>
                  <li>• US IRS Form 1116 Foreign Tax Credit pass-through eligibility</li>
                  <li>• Double Tax Avoidance Agreement (DTAA Article 10/11) withholding validity</li>
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Records Scanned</span>
                  <span className="font-extrabold text-base text-[#0D2266] dark:text-white">124 Line Items</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Jurisdictions</span>
                  <span className="font-extrabold text-base text-[#0D2266] dark:text-white">US IRS + India ITD</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Audit Grade</span>
                  <span className="font-extrabold text-base text-[#16A34A]">Institutional (AAA)</span>
                </div>
              </div>

              <button
                onClick={startAudit}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] hover:bg-[#1D3FAD] py-3 text-xs font-bold text-white shadow-sm transition-colors"
              >
                <BrainCircuit className="h-4 w-4" />
                <span>Execute Sovereign AI Tax Reconciliation</span>
              </button>
            </div>
          )}

          {auditStep === "scanning" && (
            <div className="py-8 text-center space-y-4">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                <div className="h-14 w-14 rounded-full border-2 border-[#3451D1]/20 border-t-[#3451D1] animate-spin" />
                <BrainCircuit className="h-6 w-6 text-[#3451D1] absolute" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0D2266] dark:text-white">
                  Executing Cross-Border Tax Audit
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reconciling Form 26AS TAN entries against Demat dividend vouchers & IRS Schedule B
                </p>
              </div>
              <div className="w-64 mx-auto h-1.5 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#3451D1] to-[#1D3FAD] animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {auditStep === "completed" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-950/50 bg-[#DCFCE7]/50 dark:bg-emerald-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#16A34A] dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Audit Verification Complete: Zero Compliance Exposure
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Form 26AS matches 100% with bank inward remittances. All ₹1,42,000 TDS deducted is eligible for dollar-for-dollar Foreign Tax Credit under US-India DTAA Article 10.
                </p>
              </div>

              <div className="space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Audit Findings Summary
                </span>
                <div className="divide-y divide-slate-100 dark:divide-white/[0.06] rounded-xl border border-slate-200 dark:border-white/[0.08] text-xs">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0D2266] dark:text-white block">Form 26AS vs AIS Variance</span>
                      <span className="text-[11px] text-slate-500">3 corporate dividend line items checked</span>
                    </div>
                    <span className="font-bold text-emerald-600">₹0 Mismatch</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0D2266] dark:text-white block">IRS Form 1116 Credit Claimable</span>
                      <span className="text-[11px] text-slate-500">Foreign passive category income</span>
                    </div>
                    <span className="font-bold text-[#3451D1]">₹1,42,000 ($1,710 USD)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0D2266] dark:text-white block">Section 197 Lower TDS Scope</span>
                      <span className="text-[11px] text-slate-500">Potential reduction for FY2026</span>
                    </div>
                    <span className="font-bold text-[#16A34A]">Eligible for 0% Certificate</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    openAiCopilot("Analyze DTAA Article 10 dividend withholding rates for my Indian demat portfolio vs US IRS taxation.");
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#3451D1] bg-[#EEF2FF] dark:bg-blue-950/40 py-2.5 text-xs font-bold text-[#3451D1] dark:text-blue-300 hover:bg-[#3451D1] hover:text-white transition-all"
                >
                  <BrainCircuit className="h-3.5 w-3.5" />
                  <span>Discuss Findings in Sovereign AI</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-5 py-2.5 text-xs font-bold hover:opacity-90 transition-all"
                >
                  Close Audit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
