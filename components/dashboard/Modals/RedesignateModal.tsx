"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, X, FileText, ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "@/lib/store";

interface RedesignateModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: {
    id: string;
    bankName: string;
    accountNumberMasked: string;
    balanceINR: number;
  };
}

export const RedesignateModal: React.FC<RedesignateModalProps> = ({ isOpen, onClose, account }) => {
  const { redesignateAccount } = useApp();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleExecute = async () => {
    setLoading(true);
    try {
      await fetch("/api/accounts/redesignate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: account.id }),
      });
    } catch (e) {}
    redesignateAccount(account.id);
    setLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[#F0F0F0] dark:border-white/[0.06] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF9C3] dark:bg-amber-950/40 text-[#A16207] dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0D2266] dark:text-white tracking-tight">
              Convert Old Resident Savings Account
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Mandatory government rule when you move abroad
            </p>
          </div>
        </div>

        <div className="py-6">
          {!isSuccess ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="rounded-[6px] bg-[#FEF9C3] text-[#A16207] font-bold text-[11px] px-2 py-0.5 mr-2">
                  RBI Compliance
                </span>
                Indian law requires anyone living abroad to redesignate their ordinary savings account to an <strong>NRO (Non-Resident Ordinary)</strong> account so money can easily be transferred without penalties.
              </div>

              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF]">Bank & Branch:</span>
                  <span className="font-bold text-[#0D2266] dark:text-white">{account.bankName} (Alkapuri)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF]">Account Number:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{account.accountNumberMasked}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E8E8] dark:border-white/[0.08]">
                  <span className="text-[#9CA3AF]">Account Status Change:</span>
                  <span className="flex items-center gap-1.5 font-bold text-[#16A34A] dark:text-emerald-400">
                    Old Savings <ArrowRight className="h-3 w-3" /> NRO Savings
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-3 text-[11px] text-slate-600 dark:text-slate-300">
                <FileText className="h-4 w-4 text-[#3451D1] shrink-0 mt-0.5" />
                <span>
                  We will automatically generate the 1-page digital form and submit it to Bank of Baroda online.
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-base font-bold text-[#0D2266] dark:text-white">
                Account Successfully Updated!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Your {account.bankName} account is now an <strong>NRO Savings</strong> account. The compliance warning has been cleared.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[#F0F0F0] dark:border-white/[0.06] pt-4 flex justify-end gap-3">
          {!isSuccess ? (
            <>
              <button
                onClick={onClose}
                className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2 text-xs font-bold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleExecute}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#3451D1] px-4 py-2 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Convert to NRO Account</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-[#3451D1] py-2.5 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
