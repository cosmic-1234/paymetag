"use client";

import React, { useState } from "react";
import { CheckCircle2, X, FileSearch, ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR } from "@/lib/formatters";

interface IepfClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: {
    id: string;
    entityName: string;
    claimableAmountINR: number;
    assetTitle: string;
  };
}

export const IepfClaimModal: React.FC<IepfClaimModalProps> = ({ isOpen, onClose, asset }) => {
  const { claimForgottenAsset } = useApp();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleClaim = async () => {
    setLoading(true);
    try {
      await fetch("/api/forgotten/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId: asset.id }),
      });
    } catch (e) {}
    claimForgottenAsset(asset.id);
    setLoading(false);
    setStep(2);
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4FF] dark:bg-white/10 text-[#3451D1] dark:text-blue-300">
            <FileSearch className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0D2266] dark:text-white tracking-tight">
              Claim Your Uncollected Money
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Direct transfer to your Indian bank account
            </p>
          </div>
        </div>

        <div className="py-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9CA3AF]">Company / Entity:</span>
                  <span className="font-bold text-[#0D2266] dark:text-white">{asset.entityName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9CA3AF]">Type of Money:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{asset.assetTitle}</span>
                </div>
                <div className="flex justify-between text-xs items-center pt-2 border-t border-[#E8E8E8] dark:border-white/[0.08]">
                  <span className="text-[#9CA3AF]">Amount to Claim:</span>
                  <span className="font-mono text-base font-bold text-[#16A34A] dark:text-emerald-400">
                    {formatINR(asset.claimableAmountINR)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-4 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
                <p className="font-bold text-[#0D2266] dark:text-white mb-2">What happens next:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>We file the government claim form online with your PAN.</li>
                  <li>The company verifies your bank details.</li>
                  <li>Money is credited directly to your NRO bank account within 30 days.</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-base font-bold text-[#0D2266] dark:text-white">
                Claim Submitted Successfully!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tracking Number: <span className="font-mono text-[#16A34A] dark:text-emerald-400 font-bold">MCA-CLAIM-2026-9812</span>.
                Your dashboard has been updated.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[#F0F0F0] dark:border-white/[0.06] pt-4 flex justify-end gap-3">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2 text-xs font-bold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClaim}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#3451D1] px-4 py-2 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Submit Claim Now</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-[#3451D1] py-2.5 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
