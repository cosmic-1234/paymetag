"use client";

import React, { useState } from "react";
import {
  Video,
  Camera,
  CheckCircle2,
  Check,
  X,
  MapPin,
  FileCheck,
  Loader2,
} from "lucide-react";
import { useApp } from "@/lib/store";

interface VideoKycModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutionName?: string;
}

export const VideoKycModal: React.FC<VideoKycModalProps> = ({
  isOpen,
  onClose,
  institutionName = "State Bank of India",
}) => {
  const { resolveKyc } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = async () => {
    setIsProcessing(true);
    if (step === 3) {
      try {
        await fetch("/api/kyc/verify", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ institution: institutionName }),
        });
      } catch (e) {}
      resolveKyc(institutionName);
      setIsProcessing(false);
      setStep(4);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        setStep((prev) => ((prev + 1) as 1 | 2 | 3 | 4));
      }, 700);
    }
  };

  const handleComplete = () => {
    onClose();
    setStep(1);
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
            <Video className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0D2266] dark:text-white tracking-tight">
              Quick 2-Minute Video KYC Call
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              {institutionName} • Safe Bank Identity Renewal
            </p>
          </div>
        </div>

        <div className="py-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#3451D1] dark:text-blue-400">
                  <MapPin className="h-4 w-4" />
                  <span>Location Verification Passed</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Detected IP: <span className="font-mono font-bold text-[#0D2266] dark:text-white">San Jose, California, USA</span>.
                  RBI guidelines permit overseas NRIs to update KYC completely online without traveling to India.
                </p>
              </div>

              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-4 space-y-2 text-xs text-slate-600 dark:text-slate-300 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Bank Account:</span>
                  <span className="font-mono font-bold text-[#0D2266] dark:text-white">SBI NRO Savings (#...4812)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">Name on Record:</span>
                  <span className="font-mono font-bold text-[#0D2266] dark:text-white">Shrirang Mehta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF]">KYC Status:</span>
                  <span className="font-mono font-bold text-[#16A34A] dark:text-emerald-400">Ready for Instant Renewal</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A16207] dark:text-amber-400">
                  <FileCheck className="h-4 w-4" />
                  <span>Document Verification</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cross-referencing your Indian Passport and US Address Proof against CKYC registry records.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-3.5 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">INDIAN PASSPORT</div>
                  <div className="mt-1.5 font-bold text-xs text-[#16A34A] dark:text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
                <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-3.5 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">US ADDRESS PROOF</div>
                  <div className="mt-1.5 font-bold text-xs text-[#16A34A] dark:text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="relative mx-auto flex h-48 w-full max-w-sm flex-col items-center justify-center rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/80 dark:bg-white/[0.03] overflow-hidden">
                <Camera className="h-10 w-10 text-[#3451D1] animate-pulse" />
                <p className="mt-2 text-xs font-bold text-[#0D2266] dark:text-white">
                  Live Video Verification Officer
                </p>
                <p className="text-[11px] text-[#9CA3AF]">
                  SBI Officer: Priya S. (Overseas Customer Desk)
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-[6px] bg-[#DCFCE7] dark:bg-emerald-950/40 px-3 py-1 text-[11px] font-bold text-[#16A34A] dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-ping" />
                  Face Match: 99.4% Verified
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center py-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0D2266] dark:text-white">
                  KYC Verified Successfully!
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {institutionName} has refreshed your account. Your account is completely active and unlocked.
                </p>
              </div>
              <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                Reference ID: <span className="text-[#16A34A] dark:text-emerald-400 font-bold">SBI-KYC-ONLINE-2026</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#F0F0F0] dark:border-white/[0.06] pt-4 flex justify-end gap-3">
          {step < 4 ? (
            <>
              <button
                onClick={onClose}
                className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2 text-xs font-bold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                disabled={isProcessing}
                className="flex items-center gap-2 rounded-xl bg-[#3451D1] px-4 py-2 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm disabled:opacity-50 transition-colors cursor-pointer"
              >
                {isProcessing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {step === 3 ? "Complete & Unlock Account" : "Next Step"}
              </button>
            </>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full rounded-xl bg-[#16A34A] py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
