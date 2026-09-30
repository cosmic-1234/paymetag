"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Check,
  Loader2,
  Smartphone,
  ChevronLeft,
} from "lucide-react";
import { BladeCard } from "@/components/ui/BladeCard";
import { BladeButton } from "@/components/ui/BladeButton";
import { useApp } from "@/lib/store";
import { DEMO_USERS } from "@/lib/mockData";

function OnboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setActiveUser } = useApp();

  // Simple 4-step flow
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Country
  const initialCountry = searchParams.get("country") || "USA";
  const [selectedCountry, setSelectedCountry] = useState(
    ["USA", "UAE", "UK"].includes(initialCountry) ? initialCountry : "USA"
  );

  // Step 2: PAN
  const [pan, setPan] = useState("ABCPM1234D");
  const [isPanQuerying, setIsPanQuerying] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  const [panStageIndex, setPanStageIndex] = useState(0);

  // Step 3: Phone Verification
  const [aadhaarNumber, setAadhaarNumber] = useState("XXXX-XXXX-4521");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("452109");
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);

  // Step 4: Consent & Completion
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [readOnlyAcknowledged, setReadOnlyAcknowledged] = useState(true);
  const [isActivating, setIsActivating] = useState(false);

  // Countries
  const countries = [
    {
      code: "USA",
      name: "United States",
      currency: "USD ($)",
      description: "Optimized for US tax credits and foreign bank reporting (FBAR)",
    },
    {
      code: "UAE",
      name: "United Arab Emirates",
      currency: "AED (د.إ)",
      description: "Direct tax-free transfers and NRI account management",
    },
    {
      code: "UK",
      name: "United Kingdom",
      currency: "GBP (£)",
      description: "UK tax tracking and Indian wealth management",
    },
  ];

  // Plain-English PAN verification stages
  const panStages = [
    "Checking official tax records...",
    "Confirming your identity details...",
    "Finding your linked Indian accounts...",
  ];

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpCountdown]);

  // Handle PAN Query
  const handleExecutePanQuery = () => {
    setIsPanQuerying(true);
    setPanStageIndex(0);

    const int1 = setTimeout(() => setPanStageIndex(1), 600);
    const int2 = setTimeout(() => setPanStageIndex(2), 1200);
    const finish = setTimeout(() => {
      setIsPanQuerying(false);
      setPanVerified(true);
    }, 1800);

    return () => {
      clearTimeout(int1);
      clearTimeout(int2);
      clearTimeout(finish);
    };
  };

  // Handle Send OTP
  const handleSendAadhaarOtp = () => {
    setOtpSent(true);
    setOtpCountdown(30);
  };

  // Handle Verify OTP
  const handleVerifyAadhaarOtp = () => {
    setIsOtpVerifying(true);
    setTimeout(() => {
      setIsOtpVerifying(false);
      setAadhaarVerified(true);
    }, 1200);
  };

  // Handle Asset Discovery
  // Finish Onboarding
  const handleCompleteActivation = () => {
    setIsActivating(true);
    setTimeout(() => {
      setActiveUser({
        ...DEMO_USERS.brijal,
        location:
          selectedCountry === "USA"
            ? "San Jose, California, USA"
            : selectedCountry === "UAE"
            ? "Dubai, UAE"
            : "London, United Kingdom",
      });
      router.push("/dashboard");
    }, 800);
  };

  const steps = [
    { num: 1, title: "Country" },
    { num: 2, title: "PAN" },
    { num: 3, title: "Verify" },
    { num: 4, title: "Consent" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#F0F0F0] dark:border-white/[0.06] bg-white dark:bg-[#0F1523] px-6 md:px-12 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
        <Link href="/" className="flex items-center group cursor-pointer select-none">
          <img
            src="/deshboard-logo.png"
            alt="DeshBoard"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Security Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Bank-Grade 256-Bit Security</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-10">
        <div className="w-full max-w-xl">
          {/* Simple 4-Step Stepper */}
          <div className="mb-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] px-4 py-3.5 sm:px-6 shadow-xs">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => {
                const isPassed = s.num < step;
                const isCurrent = s.num === step;
                return (
                  <React.Fragment key={s.num}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          isPassed
                            ? "bg-[#10B981] text-white"
                            : isCurrent
                            ? "bg-[#336765] text-white shadow-[0_0_0_4px_#EEF5F4] dark:shadow-[0_0_0_4px_rgba(52,81,209,0.25)]"
                            : "border border-slate-300 dark:border-white/20 bg-white dark:bg-white/[0.04] text-slate-400"
                        }`}
                      >
                        {isPassed ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : s.num}
                      </div>
                      <span
                        className={`mt-1.5 text-[11px] text-center leading-tight ${
                          isCurrent
                            ? "font-bold text-[#001535] dark:text-white"
                            : isPassed
                            ? "font-semibold text-emerald-600 dark:text-emerald-400"
                            : "font-medium text-slate-400"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div
                        className={`h-[2px] flex-1 mx-2 sm:mx-3 transition-colors ${
                          s.num < step ? "bg-[#10B981]" : "bg-slate-200 dark:bg-white/[0.08]"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <BladeCard variant="default" className="p-6 sm:p-8 bg-white dark:bg-[#1A1F2E] shadow-sm relative">
            {/* STEP 1: Country */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="rounded-md bg-[#EEF5F4] dark:bg-white/[0.08] px-2.5 py-0.5 text-[11px] font-bold text-[#336765] dark:text-teal-300 uppercase tracking-wider">
                    Step 1 of 4
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-[#001535] dark:text-white">
                    Where do you currently live?
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    We customize your taxes, currencies, and money transfer limits based on where you reside.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {countries.map((c) => {
                    const isSelected = selectedCountry === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setSelectedCountry(c.code)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#336765] bg-[#EEF5F4]/50 dark:bg-blue-950/20 ring-1 ring-[#336765]"
                            : "border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs ${
                              isSelected
                                ? "bg-[#336765] text-white shadow-xs"
                                : "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            {c.code}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#001535] dark:text-white">
                              {c.name}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {c.description}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-[#336765] bg-[#336765] text-white"
                              : "border-slate-300 dark:border-white/20"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <BladeButton
                    variant="primary"
                    size="md"
                    onClick={() => setStep(2)}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Continue to Step 2
                  </BladeButton>
                </div>
              </div>
            )}

            {/* STEP 2: PAN */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="rounded-md bg-[#EEF5F4] dark:bg-white/[0.08] px-2.5 py-0.5 text-[11px] font-bold text-[#336765] dark:text-teal-300 uppercase tracking-wider">
                    Step 2 of 4
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-[#001535] dark:text-white">
                    Enter your Indian PAN Number
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Your PAN allows us to find your Indian bank accounts, property records, and mutual funds.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      10-Digit PAN Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        maxLength={10}
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        disabled={isPanQuerying || panVerified}
                        placeholder="ABCPM1234D"
                        className="w-full h-11 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/60 dark:bg-white/[0.04] pl-10 pr-4 font-bold tracking-widest text-sm text-[#001535] dark:text-white focus:border-[#336765] focus:bg-white focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {!panVerified && !isPanQuerying && (
                    <BladeButton
                      variant="primary"
                      size="md"
                      onClick={handleExecutePanQuery}
                      disabled={pan.length !== 10}
                      className="w-full"
                    >
                      Verify My PAN
                    </BladeButton>
                  )}

                  {isPanQuerying && (
                    <div className="rounded-xl border border-[#C6DFDD] bg-[#EEF5F4]/60 p-4 space-y-3 text-center">
                      <Loader2 className="h-6 w-6 animate-spin text-[#336765] mx-auto" />
                      <p className="font-bold text-xs text-[#001535]">
                        {panStages[panStageIndex]}
                      </p>
                    </div>
                  )}

                  {panVerified && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>PAN Verified Successfully</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-emerald-200/60 text-slate-700">
                        <div>
                          <span className="text-slate-500 text-[11px]">Name:</span>
                          <div className="font-bold text-[#001535]">Brijal Patel</div>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[11px]">Status:</span>
                          <div className="font-bold text-emerald-700">Non-Resident Indian (NRI)</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <BladeButton
                    variant="secondary"
                    size="md"
                    onClick={() => setStep(1)}
                    icon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Back
                  </BladeButton>

                  <BladeButton
                    variant="primary"
                    size="md"
                    onClick={() => setStep(3)}
                    disabled={!panVerified}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Continue to Step 3
                  </BladeButton>
                </div>
              </div>
            )}

            {/* STEP 3: Phone Verification */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="rounded-md bg-[#EEF5F4] dark:bg-white/[0.08] px-2.5 py-0.5 text-[11px] font-bold text-[#336765] dark:text-teal-300 uppercase tracking-wider">
                    Step 3 of 4
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-[#001535] dark:text-white">
                    Confirm your Identity
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    We&apos;ll send a 6-digit confirmation code to your phone to confirm your Indian address.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Aadhaar Number
                    </label>
                    <input
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      disabled={otpSent || aadhaarVerified}
                      className="w-full h-11 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/60 dark:bg-white/[0.04] px-4 font-bold tracking-wider text-sm text-[#001535] dark:text-white focus:border-[#336765] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {!otpSent && !aadhaarVerified && (
                    <BladeButton
                      variant="primary"
                      size="md"
                      onClick={handleSendAadhaarOtp}
                      icon={<Smartphone className="h-4 w-4" />}
                      className="w-full"
                    >
                      Send 6-Digit Code to My Phone
                    </BladeButton>
                  )}

                  {otpSent && !aadhaarVerified && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#001535] dark:text-white">
                          Enter 6-Digit Code
                        </label>
                        <span className="text-[11px] text-slate-400">Sent to ••••••4521</span>
                      </div>

                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="452109"
                        disabled={isOtpVerifying}
                        className="w-full h-11 rounded-xl border border-slate-300 dark:border-white/[0.1] bg-white px-4 font-bold tracking-widest text-center text-lg text-[#001535] focus:border-[#336765] focus:outline-none"
                      />

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Code expires in {otpCountdown}s</span>
                        <button
                          type="button"
                          onClick={() => setOtpCountdown(30)}
                          disabled={otpCountdown > 0}
                          className="text-[#336765] font-semibold disabled:opacity-40"
                        >
                          Resend Code
                        </button>
                      </div>

                      <BladeButton
                        variant="primary"
                        size="md"
                        onClick={handleVerifyAadhaarOtp}
                        disabled={otpCode.length !== 6 || isOtpVerifying}
                        isLoading={isOtpVerifying}
                        className="w-full"
                      >
                        Confirm Code
                      </BladeButton>
                    </div>
                  )}

                  {aadhaarVerified && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Address Confirmed</span>
                      </div>
                      <p className="text-xs text-slate-700">
                        Flat 4B, Oberoi Woods, Mohan Gokhale Rd, Goregaon East, Mumbai 400063
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <BladeButton
                    variant="secondary"
                    size="md"
                    onClick={() => setStep(2)}
                    icon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Back
                  </BladeButton>

                  <BladeButton
                    variant="primary"
                    size="md"
                    onClick={() => setStep(4)}
                    disabled={!aadhaarVerified}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Continue to Step 4
                  </BladeButton>
                </div>
              </div>
            )}

            {/* STEP 4: Consent & Authorization */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="rounded-md bg-[#EEF5F4] dark:bg-white/[0.08] px-2.5 py-0.5 text-[11px] font-bold text-[#336765] dark:text-teal-300 uppercase tracking-wider">
                    Step 4 of 4 &bull; Consent
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-[#001535] dark:text-white">
                    Authorize Account Discovery
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    We use RBI-regulated Account Aggregator technology to retrieve your Indian balances and property records in secure, read-only mode.
                  </p>
                </div>

                {/* Profile Summary Card */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500">Account Holder:</span>
                    <span className="font-bold text-[#001535]">Brijal Patel</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500">Verified PAN:</span>
                    <span className="font-mono font-bold text-[#001535]">{pan}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200/80 pb-2">
                    <span className="text-slate-500">Current Residence:</span>
                    <span className="font-bold text-[#001535]">
                      {countries.find((c) => c.code === selectedCountry)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-slate-500">Protection Level:</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      100% Read-Only (Zero Transaction Authority)
                    </span>
                  </div>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#336765]/40 bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#336765] focus:ring-[#336765]/20 cursor-pointer accent-[#336765]"
                    />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-[#001535] block">
                        I authorize DeshBoard to fetch my financial records
                      </span>
                      I give my explicit consent to securely connect my Indian bank accounts, fixed deposits, mutual funds, demat shares, and registered properties linked to PAN <strong className="font-mono">{pan}</strong> via RBI-approved Account Aggregator framework.
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#336765]/40 bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={readOnlyAcknowledged}
                      onChange={(e) => setReadOnlyAcknowledged(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#336765] focus:ring-[#336765]/20 cursor-pointer accent-[#336765]"
                    />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-[#001535] block">
                        I acknowledge this access is strictly read-only
                      </span>
                      I understand that DeshBoard cannot withdraw funds, execute trades, transfer money, or make changes to any of my Indian accounts.
                    </div>
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <BladeButton
                    variant="secondary"
                    size="md"
                    onClick={() => setStep(3)}
                    icon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Back
                  </BladeButton>

                  <BladeButton
                    variant="primary"
                    size="md"
                    onClick={handleCompleteActivation}
                    disabled={!consentAgreed || !readOnlyAcknowledged || isActivating}
                    isLoading={isActivating}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Agree & Open Dashboard
                  </BladeButton>
                </div>
              </div>
            )}
          </BladeCard>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-4 text-center text-xs text-slate-400">
        DeshBoard &bull; Simple, secure wealth management for Non-Resident Indians
      </footer>
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#336765]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <OnboardContent />
    </Suspense>
  );
}
