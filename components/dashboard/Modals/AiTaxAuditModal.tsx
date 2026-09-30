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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#336765] to-[#234947] text-white shadow-sm">
              <BrainCircuit className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[15px] text-[#001535] dark:text-white">
                Tax Review & Credit Check by Sovereign AI
              </h3>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                Matches taxes paid in India against your US tax return to maximize your foreign credits
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
              <div className="rounded-xl border border-[#C6DFDD] dark:border-slate-800 bg-[#EEF5F4] dark:bg-[#001535]/30 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#336765] dark:text-teal-400 mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  What Sovereign AI Verifies
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 mt-2">
                  <li>• Taxes deducted on Indian shares and fixed deposits</li>
                  <li>• Direct bank and mutual fund income records</li>
                  <li>• Dollar-for-dollar foreign tax credits on your US return</li>
                  <li>• Special 15% treaty tax rate applied instead of 30%</li>
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Records Scanned</span>
                  <span className="font-extrabold text-base text-[#001535] dark:text-white">124 Items</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Countries Covered</span>
                  <span className="font-extrabold text-base text-[#001535] dark:text-white">US & India</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Accuracy Score</span>
                  <span className="font-extrabold text-base text-[#16A34A]">100% Matched</span>
                </div>
              </div>

              <button
                onClick={startAudit}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#336765] hover:bg-[#234947] py-3 text-xs font-bold text-white shadow-sm transition-colors"
              >
                <BrainCircuit className="h-4 w-4" />
                <span>Run Sovereign AI Tax & Credit Check</span>
              </button>
            </div>
          )}

          {auditStep === "scanning" && (
            <div className="py-8 text-center space-y-4">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                <div className="h-14 w-14 rounded-full border-2 border-[#336765]/20 border-t-[#336765] animate-spin" />
                <BrainCircuit className="h-6 w-6 text-[#336765] absolute" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#001535] dark:text-white">
                  Checking Tax Statements & Credits
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reconciling bank records with foreign tax credit calculations...
                </p>
              </div>
              <div className="w-64 mx-auto h-1.5 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#336765] to-[#234947] animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {auditStep === "completed" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-950/50 bg-[#DCFCE7]/50 dark:bg-emerald-950/20 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#16A34A] dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  All Records Matched: Zero Tax Discrepancies
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Everything matches your bank deposits. You can claim the full ₹1,42,000 ($1,710 USD) as a credit on your US tax return.
                </p>
              </div>

              <div className="space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Summary of Findings
                </span>
                <div className="divide-y divide-slate-100 dark:divide-white/[0.06] rounded-xl border border-slate-200 dark:border-white/[0.08] text-xs">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#001535] dark:text-white block">Indian Statement Match</span>
                      <span className="text-[11px] text-slate-500">All dividend and interest entries verified</span>
                    </div>
                    <span className="font-bold text-emerald-600">₹0 Mismatch</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#001535] dark:text-white block">US Tax Credit Claimable</span>
                      <span className="text-[11px] text-slate-500">Foreign passive income category</span>
                    </div>
                    <span className="font-bold text-[#336765]">₹1,42,000 ($1,710 USD)</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#001535] dark:text-white block">Advance Lower Tax Certificate</span>
                      <span className="text-[11px] text-slate-500">Eligible to reduce advance tax</span>
                    </div>
                    <span className="font-bold text-[#16A34A]">Eligible</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    openAiCopilot("Explain how my Indian taxes give me foreign tax credits on my US return, and verify my 15% treaty rate.");
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#336765] bg-[#EEF5F4] dark:bg-[#001535]/40 py-2.5 text-xs font-bold text-[#336765] dark:text-teal-300 hover:bg-[#336765] hover:text-white transition-all"
                >
                  <BrainCircuit className="h-3.5 w-3.5" />
                  <span>Discuss with Sovereign AI</span>
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-[#001535] text-white dark:bg-white dark:text-[#001535] px-5 py-2.5 text-xs font-bold hover:opacity-90 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
