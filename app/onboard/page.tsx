"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Fingerprint,
  FileCheck2,
  Building2,
  CheckCircle2,
  ArrowRight,
  Lock,
  Scan,
  KeyRound,
  RefreshCw,
  FileText,
  CreditCard,
  Check,
  Loader2,
  Smartphone,
  Clock,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { BladeCard } from "@/components/ui/BladeCard";
import { BladeButton } from "@/components/ui/BladeButton";
import { BladeNotice } from "@/components/ui/BladeNotice";
import { formatINR } from "@/lib/formatters";
import { useApp } from "@/lib/store";
import { DEMO_USERS } from "@/lib/mockData";

function OnboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activeUser, setActiveUser } = useApp();

  // Wizard state: 1: Jurisdiction, 2: PAN Query, 3: Aadhaar e-KYC, 4: AA Discovery, 5: Vault Activation
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Jurisdiction (Restricted strictly to USA, UAE, UK)
  const initialCountry = searchParams.get("country") || "USA";
  const [selectedCountry, setSelectedCountry] = useState(
    ["USA", "UAE", "UK"].includes(initialCountry) ? initialCountry : "USA"
  );

  // Step 2: PAN
  const [pan, setPan] = useState("ABCPM1234D");
  const [isPanQuerying, setIsPanQuerying] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  const [panStageIndex, setPanStageIndex] = useState(0);

  // Step 3: Aadhaar
  const [aadhaarNumber, setAadhaarNumber] = useState("XXXX-XXXX-4521");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("452109");
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [aadhaarStageIndex, setAadhaarStageIndex] = useState(0);
  const [otpCountdown, setOtpCountdown] = useState(30);

  // Step 4: Asset Discovery
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredCount, setDiscoveredCount] = useState(0);

  // Step 5: Key Generation
  const [isActivating, setIsActivating] = useState(false);

  // Strict operating jurisdictions: USA, UAE, UK only
  const jurisdictions = [
    {
      code: "USA",
      name: "United States",
      badge: "IRS FATCA / Form 8938",
      subtext: "DTAA Article 10/11 treaty optimization & FinCEN FBAR Form 114 reporting",
    },
    {
      code: "UAE",
      name: "United Arab Emirates",
      badge: "Zero DTT Repatriation",
      subtext: "FEMA Section 6 capital repatriation & NRE inward/outward pipeline",
    },
    {
      code: "UK",
      name: "United Kingdom",
      badge: "HMRC Worldwide Disclosure",
      subtext: "Remittance-basis foreign asset registry & cross-border double tax relief",
    },
  ];

  // Executive checkpoints for PAN query
  const panStages = [
    {
      title: "Connecting to Income Tax Department e-Filing Gateway",
      detail: "Establishing TLS 1.3 encrypted handshake with ITD 2.0 servers",
    },
    {
      title: "Validating Permanent Account Number & Tax Residency",
      detail: "Cross-referencing NSDL/Protean database for Operative NRI status",
    },
    {
      title: "Retrieving Central KYC Records Registry (CERSAI)",
      detail: "Locating 14-digit KIN identifier and 7 registered financial entities",
    },
  ];

  // Executive checkpoints for Aadhaar verification
  const aadhaarStages = [
    {
      title: "Connecting to UIDAI e-KYC 2.1 Authentication Server",
      detail: "Validating cryptographic OTP challenge response",
    },
    {
      title: "Decrypting Certified XML Identity Package",
      detail: "Verifying SHA-256 digital signature of sovereign registry",
    },
    {
      title: "Extracting Certified Indian Domicile Address",
      detail: "Binding address node to Mumbai Bandra Sub-Registrar jurisdiction",
    },
  ];

  // Asset discovery nodes
  const assetNodes = [
    { name: "HDFC Bank (NRE Savings)", ref: "ACC-50100294821034", amount: 1240000, status: "Active" },
    { name: "State Bank of India (NRO Savings)", ref: "ACC-20194820194812", amount: 320000, status: "KYC Overdue" },
    { name: "Axis Bank (Fixed Deposit Ledger)", ref: "ACC-91802004810293", amount: 2500000, status: "Cumulative" },
    { name: "ICICI Bank (FCNR-B USD Deposit)", ref: "ACC-000401928301", amount: 1500300, status: "$18,000 USD" },
    { name: "Kotak Mahindra Bank (NRE Savings)", ref: "ACC-748291039401", amount: 860000, status: "Active" },
    { name: "CDSL Demat Holding (4 Equities)", ref: "DP-12081600192847", amount: 826600, status: "Synchronized" },
    { name: "CAMS / KFintech (3 Mutual Fund Folios)", ref: "REG-CAMS-910283", amount: 1670000, status: "Active SIP" },
    { name: "Oberoi Woods 4B (Residential Flat, Mumbai)", ref: "REG-BND-4029-2022", amount: 11200000, status: "Index-II Verified" },
    { name: "Kalmeshwar Parcel (Agricultural Land, Nagpur)", ref: "REV-7/12-142/2", amount: 3500000, status: "Mutation Dispute" },
    { name: "MCA IEPF Registry (Unclaimed Dividends)", ref: "IEPF-INFY-2019", amount: 18400, status: "Claimable" },
    { name: "Bank of Baroda (Inoperative Account)", ref: "UDGAM-BOB-0182", amount: 44000, status: "Claimable" },
  ];

  // OTP Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpCountdown]);

  // Handle PAN Query execution
  const handleExecutePanQuery = () => {
    setIsPanQuerying(true);
    setPanStageIndex(0);

    const int1 = setTimeout(() => setPanStageIndex(1), 700);
    const int2 = setTimeout(() => setPanStageIndex(2), 1400);
    const finish = setTimeout(() => {
      setIsPanQuerying(false);
      setPanVerified(true);
    }, 2200);

    return () => {
      clearTimeout(int1);
      clearTimeout(int2);
      clearTimeout(finish);
    };
  };

  // Handle Send Aadhaar OTP
  const handleSendAadhaarOtp = () => {
    setOtpSent(true);
    setOtpCountdown(30);
  };

  // Handle Verify Aadhaar OTP
  const handleVerifyAadhaarOtp = () => {
    setIsOtpVerifying(true);
    setAadhaarStageIndex(0);

    const int1 = setTimeout(() => setAadhaarStageIndex(1), 600);
    const int2 = setTimeout(() => setAadhaarStageIndex(2), 1200);
    const finish = setTimeout(() => {
      setIsOtpVerifying(false);
      setAadhaarVerified(true);
    }, 1800);

    return () => {
      clearTimeout(int1);
      clearTimeout(int2);
      clearTimeout(finish);
    };
  };

  // Handle Account Aggregator Discovery
  const handleStartDiscovery = () => {
    setIsDiscovering(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setDiscoveredCount(count);
      if (count >= assetNodes.length) {
        clearInterval(interval);
        setIsDiscovering(false);
      }
    }, 220);
  };

  // Handle Final Vault Activation
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
    }, 1000);
  };

  const stepTitles = [
    { num: 1, title: "Tax Jurisdiction", subtitle: "Select residency country" },
    { num: 2, title: "PAN Query", subtitle: "ITD & CERSAI Registry" },
    { num: 3, title: "Aadhaar e-KYC", subtitle: "UIDAI OTP verification" },
    { num: 4, title: "Asset Discovery", subtitle: "RBI Account Aggregator" },
    { num: 5, title: "Vault Sealed", subtitle: "Command Center access" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RAZORPAY INSTITUTIONAL HEADER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#F0F0F0] dark:border-white/[0.06] bg-white dark:bg-[#0F1523] px-6 md:px-12 shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
        <Link href="/" className="flex items-center gap-[10px] group cursor-pointer select-none">
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] shadow-sm shrink-0">
            <svg
              className="h-[20px] w-[20px] text-white"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              <path d="M12 8v8" />
              <path d="M9.5 10.5h5" />
              <path d="M9.5 13.5h5" />
            </svg>
          </div>
          <div>
            <span className="block font-extrabold text-[16px] tracking-tight text-[#0D2266] dark:text-white leading-tight">
              DESHBOARD
            </span>
            <span className="block font-medium text-[11px] text-[#9CA3AF] leading-none mt-0.5">
              NRI Wealth Portal &bull; Onboarding
            </span>
          </div>
        </Link>

        {/* Sovereign Security Badges */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-[#DCFCE7] dark:border-emerald-900/40 bg-[#DCFCE7]/60 dark:bg-emerald-950/20 px-3 py-1 text-[11px] font-bold text-[#16A34A] dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ITD & CERSAI Compliant Gateway</span>
          </div>
          <div className="text-[11px] font-medium text-[#9CA3AF]">
            Operating in: US &bull; UAE &bull; UK
          </div>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN ONBOARDING CONTAINER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-10">
        <div className="w-full max-w-2xl">
          {/* RAZORPAY BLADE CONNECTED STEPPER */}
          <div className="mb-6 rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] px-4 py-4 sm:px-6 sm:py-5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              {stepTitles.map((s, idx) => {
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
                            ? "bg-[#0B72E7] text-white shadow-[0_0_0_4px_#E0EDFF] dark:shadow-[0_0_0_4px_rgba(11,114,231,0.25)]"
                            : "border border-[#CBD5E1] dark:border-white/20 bg-white dark:bg-white/[0.04] text-[#94A3B8]"
                        }`}
                      >
                        {isPassed ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : s.num}
                      </div>
                      <span
                        className={`mt-1.5 text-[11px] text-center leading-tight truncate max-w-[70px] sm:max-w-none ${
                          isCurrent
                            ? "font-bold text-[#0C2340] dark:text-white"
                            : isPassed
                            ? "font-semibold text-[#10B981] dark:text-emerald-400"
                            : "font-medium text-[#94A3B8]"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    {idx < 4 && (
                      <div
                        className={`h-[2px] flex-1 mx-1.5 sm:mx-3 transition-colors ${
                          s.num < step ? "bg-[#10B981]" : "bg-[#E2E8F0] dark:bg-white/[0.08]"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* MAIN CARD */}
          <BladeCard variant="default" className="p-5 sm:p-7 md:p-8 shadow-[0px_2px_8px_rgba(0,0,0,0.06),0px_0px_1px_rgba(0,0,0,0.04)] relative overflow-hidden">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 1: REGULATORY JURISDICTION & READINESS OVERVIEW
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Razorpay Blade Notice Banner: Document Readiness */}
                <BladeNotice
                  variant="info"
                  title="Keep Your Statutory Documents Ready"
                  badge="PRE-REQUISITES"
                  icon={<FileText className="h-4 w-4" />}
                  trailing={
                    <span className="rounded-full bg-white dark:bg-white/10 border border-[#BFDBFE] dark:border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#0B72E7] dark:text-blue-300 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>5 Steps &bull; ~2 Mins Total</span>
                    </span>
                  }
                >
                  <p className="mb-3 text-[12px] text-[#515B6F] dark:text-slate-300">
                    To automate regulatory compliance and discover linked financial accounts, please ensure you have the following credentials at hand:
                  </p>

                  {/* 2 Clean Document Spec Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    {/* Item 1: PAN Card */}
                    <div className="rounded-lg border border-[#E2E8F0] dark:border-white/10 bg-white dark:bg-[#1A1F2E] p-3.5 shadow-xs flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-white/[0.06] text-[#0B72E7]">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[13px] text-[#0C2340] dark:text-white">
                            1. Indian PAN Card
                          </span>
                          <span className="rounded bg-[#DBEAFE] text-[#0B72E7] px-1.5 py-0.2 text-[10px] font-bold">
                            Step 2
                          </span>
                        </div>
                        <p className="text-[12px] text-[#515B6F] dark:text-slate-400 leading-snug">
                          Your 10-digit number to query Income Tax Dept (ITD) & Central KYC records.
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Aadhaar + Phone */}
                    <div className="rounded-lg border border-[#E2E8F0] dark:border-white/10 bg-white dark:bg-[#1A1F2E] p-3.5 shadow-xs flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] dark:bg-white/[0.06] text-[#0B72E7]">
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[13px] text-[#0C2340] dark:text-white">
                            2. Aadhaar & Phone
                          </span>
                          <span className="rounded bg-[#DBEAFE] text-[#0B72E7] px-1.5 py-0.2 text-[10px] font-bold">
                            Step 3
                          </span>
                        </div>
                        <p className="text-[12px] text-[#515B6F] dark:text-slate-400 leading-snug">
                          Keep mobile nearby to receive the 6-digit UIDAI OTP for address decryption.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clean Razorpay Security Assurance Strip */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#DBEAFE] dark:border-white/10 text-[11px] text-[#515B6F] dark:text-slate-300">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#10B981] shrink-0" />
                    <span>
                      <strong className="font-bold text-[#0C2340] dark:text-white">Zero-Fund-Movement Mandate:</strong> 100% read-only regulatory query. No banking passwords or transaction PINs required.
                    </span>
                  </div>
                </BladeNotice>

                {/* Section Header */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[4px] bg-[#F1F5F9] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#475569] dark:text-slate-300">
                      STEP 1 OF 5
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      Tax Residency
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold text-[#0C2340] dark:text-white tracking-tight">
                    Select Your Country of Tax Residence
                  </h2>
                  <p className="mt-1 text-xs text-[#515B6F] dark:text-slate-400 leading-relaxed">
                    We currently support Non-Resident Indians residing in the <strong>United States</strong>, <strong>United Arab Emirates</strong>, and <strong>United Kingdom</strong> to reconcile cross-border taxes, treaty rates, and FEMA outward remittances.
                  </p>
                </div>

                {/* Country Radio Selection Cards */}
                <div className="space-y-2.5">
                  {jurisdictions.map((j) => {
                    const isSelected = selectedCountry === j.code;
                    return (
                      <button
                        key={j.code}
                        type="button"
                        onClick={() => setSelectedCountry(j.code)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#0B72E7] bg-[#F0F7FF] dark:bg-blue-950/20 ring-1 ring-[#0B72E7] shadow-xs"
                            : "border-[#E2E8F0] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                              isSelected
                                ? "bg-[#0B72E7] text-white shadow-xs"
                                : "bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {j.code}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[14px] text-[#0C2340] dark:text-white">
                                {j.name}
                              </span>
                              <span className="rounded bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                                {j.badge}
                              </span>
                            </div>
                            <p className="text-[12px] text-[#515B6F] dark:text-slate-400 mt-0.5 leading-snug">
                              {j.subtext}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                            isSelected
                              ? "border-[#0B72E7] bg-[#0B72E7] text-white"
                              : "border-slate-300 dark:border-white/20"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Uniform Button Bar */}
                <div className="pt-2 flex justify-end">
                  <BladeButton
                    variant="primary"
                    size="md"
                    onClick={() => setStep(2)}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Proceed to PAN Verification
                  </BladeButton>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 2: PAN STATUTORY VERIFICATION & FETCH
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[4px] bg-[#F1F5F9] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#475569] dark:text-slate-300">
                      STEP 2 OF 5
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      Statutory Identification
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold text-[#0C2340] dark:text-white tracking-tight">
                    Permanent Account Number (PAN) Query
                  </h2>
                  <p className="mt-1 text-xs text-[#515B6F] dark:text-slate-400 leading-relaxed">
                    Under Section 139A of the Income Tax Act, 1961, your PAN anchors your financial records across scheduled commercial banks, Central KYC Records Registry (CERSAI), and depositories. <strong>Next up in Step 3: Aadhaar OTP e-KYC.</strong>
                  </p>
                </div>

                {/* Input Card */}
                <div className="rounded-xl border border-[#E2E8F0] dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2340] dark:text-white mb-1.5">
                      Enter 10-Digit Alphanumeric PAN
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
                        className="w-full h-11 rounded-lg border border-[#CBD5E1] dark:border-white/[0.1] bg-white dark:bg-[#1A1F2E] pl-10 pr-4 font-bold tracking-widest text-sm text-[#0C2340] dark:text-white focus:border-[#0B72E7] focus:ring-2 focus:ring-[#0B72E7]/20 focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {!panVerified && !isPanQuerying && (
                    <BladeButton
                      variant="primary"
                      size="md"
                      onClick={handleExecutePanQuery}
                      disabled={pan.length !== 10}
                      icon={<Scan className="h-4 w-4" />}
                      className="w-full"
                    >
                      Verify with Income Tax Gateway & Central KYC
                    </BladeButton>
                  )}

                  {/* Verification Animation */}
                  {isPanQuerying && (
                    <div className="rounded-xl border border-[#BFDBFE] dark:border-blue-900/40 bg-white dark:bg-[#1A1F2E] p-5 shadow-xs space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0EDFF] dark:bg-blue-950/50 text-[#0B72E7] shrink-0">
                          <Loader2 className="h-5 w-5 animate-spin text-[#0B72E7]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0C2340] dark:text-white leading-tight">
                            Verifying Tax & Regulatory Credentials
                          </h4>
                          <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">
                            Interfacing with Central KYC Records Registry for PAN: {pan}
                          </span>
                        </div>
                      </div>

                      {/* Smooth Progress Bar */}
                      <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] dark:bg-white/[0.08] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0B72E7] to-[#1D3FAD] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${((panStageIndex + 1) / panStages.length) * 100}%` }}
                        />
                      </div>

                      {/* Step Checkpoints */}
                      <div className="space-y-2 pt-1">
                        {panStages.map((stage, idx) => {
                          const isDone = panStageIndex > idx;
                          const isCurrent = panStageIndex === idx;

                          return (
                            <div
                              key={idx}
                              className={`flex items-start gap-2.5 text-xs transition-opacity duration-300 ${
                                isDone || isCurrent ? "opacity-100" : "opacity-40"
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                                  </div>
                                ) : isCurrent ? (
                                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E0EDFF] text-[#0B72E7]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#0B72E7] animate-ping" />
                                  </div>
                                ) : (
                                  <div className="h-4 w-4 rounded-full border border-slate-300 dark:border-white/20" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800 dark:text-slate-200">
                                  {stage.title}
                                </div>
                                <div className="text-[11px] text-[#9CA3AF]">
                                  {stage.detail}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Extracted Record Card */}
                {panVerified && (
                  <BladeNotice
                    variant="success"
                    title="Entity Authenticated by Income Tax Department"
                    badge="MATCH CONFIRMED"
                    icon={<CheckCircle2 className="h-4 w-4 text-[#16A34A]" />}
                  >
                    <div className="text-[11px] text-[#16A34A] font-semibold mb-3">
                      NSDL/Protean Status: Operative & Seeded with CERSAI Registry
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Full Legal Name
                        </span>
                        <span className="font-bold text-[#0C2340] dark:text-white">
                          Brijal Patel
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Father's Legal Name
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Rameshchandra Patel
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Date of Birth (ITD Record)
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          18 Oct 1984
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Tax Residency Status
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Non-Resident Indian (RNOR Expired)
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Central KYC KIN (CERSAI)
                        </span>
                        <span className="font-bold text-[#0B72E7] dark:text-blue-300">
                          40029104928104
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Mapped Financial Nodes
                        </span>
                        <span className="font-semibold text-[#16A34A]">
                          7 Regulated Institutions Linked
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 border-t border-[#BBF7D0] dark:border-emerald-900/40 pt-2 text-[11px] text-[#515B6F] dark:text-slate-300 leading-normal">
                      <strong>Statutory Requirement:</strong> Under RBI Master Direction on KYC (Section 16), official residential address proof and biometric tokens are authenticated via Aadhaar e-KYC.
                    </div>
                  </BladeNotice>
                )}

                {/* Uniform Button Bar */}
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
                    Proceed to Aadhaar e-KYC
                  </BladeButton>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 3: AADHAAR E-KYC & ADDRESS EXTRACTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[4px] bg-[#F1F5F9] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#475569] dark:text-slate-300">
                      STEP 3 OF 5
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      UIDAI e-KYC 2.1 Handshake
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold text-[#0C2340] dark:text-white tracking-tight">
                    Aadhaar e-KYC & Domicile Address Decryption
                  </h2>
                  <p className="mt-1 text-xs text-[#515B6F] dark:text-slate-400 leading-relaxed">
                    Authenticate via the UIDAI Aadhaar e-KYC gateway to extract your digitally signed Indian domicile address with a 6-digit OTP sent to your linked phone. <strong>Next up in Step 4: Central Asset Discovery.</strong>
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2340] dark:text-white mb-1.5">
                      12-Digit Aadhaar / Virtual ID (VID)
                    </label>
                    <div className="relative">
                      <Fingerprint className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        disabled={otpSent || aadhaarVerified}
                        placeholder="XXXX-XXXX-4521"
                        className="w-full h-11 rounded-lg border border-[#CBD5E1] dark:border-white/[0.1] bg-white dark:bg-[#1A1F2E] pl-10 pr-4 font-bold tracking-wider text-sm text-[#0C2340] dark:text-white focus:border-[#0B72E7] focus:ring-2 focus:ring-[#0B72E7]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  {!otpSent && !aadhaarVerified && (
                    <BladeButton
                      variant="primary"
                      size="md"
                      onClick={handleSendAadhaarOtp}
                      icon={<KeyRound className="h-4 w-4" />}
                      className="w-full"
                    >
                      Request One-Time Password via UIDAI
                    </BladeButton>
                  )}

                  {/* OTP Entry Phase */}
                  {otpSent && !aadhaarVerified && (
                    <div className="space-y-3.5 pt-2 border-t border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#0C2340] dark:text-white">
                          Enter 6-Digit Authentication Code (OTP)
                        </label>
                        <span className="text-[11px] text-[#9CA3AF]">
                          Sent to linked mobile (••••••4521)
                        </span>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="452109"
                          disabled={isOtpVerifying}
                          className="w-full h-11 rounded-lg border border-[#CBD5E1] dark:border-white/[0.1] bg-white dark:bg-[#1A1F2E] pl-10 pr-4 font-bold tracking-widest text-base text-[#0C2340] dark:text-white focus:border-[#0B72E7] focus:ring-2 focus:ring-[#0B72E7]/20 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-0.5">
                        <span>Validity: {otpCountdown}s remaining</span>
                        <button
                          type="button"
                          onClick={() => setOtpCountdown(30)}
                          disabled={otpCountdown > 0}
                          className="text-[#0B72E7] hover:text-[#095ec0] disabled:opacity-40 font-semibold cursor-pointer"
                        >
                          Resend Code
                        </button>
                      </div>

                      {!isOtpVerifying && (
                        <BladeButton
                          variant="primary"
                          size="md"
                          onClick={handleVerifyAadhaarOtp}
                          disabled={otpCode.length !== 6}
                          icon={<FileCheck2 className="h-4 w-4" />}
                          className="w-full"
                        >
                          Verify Code & Decrypt Domicile Address
                        </BladeButton>
                      )}

                      {/* Aadhaar Verification Animation */}
                      {isOtpVerifying && (
                        <div className="rounded-xl border border-[#BFDBFE] dark:border-blue-900/40 bg-white dark:bg-[#1A1F2E] p-4 shadow-xs space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E0EDFF] dark:bg-blue-950/50 text-[#0B72E7] shrink-0">
                              <Loader2 className="h-4 w-4 animate-spin text-[#0B72E7]" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-[#0C2340] dark:text-white leading-tight">
                                Decrypting Sovereign Identity Package
                              </h4>
                              <span className="text-[11px] text-[#9CA3AF]">
                                Interfacing with UIDAI verification servers
                              </span>
                            </div>
                          </div>

                          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] dark:bg-white/[0.08] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#0B72E7] to-[#1D3FAD] rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${((aadhaarStageIndex + 1) / aadhaarStages.length) * 100}%` }}
                            />
                          </div>

                          <div className="space-y-1.5 pt-0.5">
                            {aadhaarStages.map((stage, idx) => {
                              const isDone = aadhaarStageIndex > idx;
                              const isCurrent = aadhaarStageIndex === idx;

                              return (
                                <div
                                  key={idx}
                                  className={`flex items-start gap-2 text-xs transition-opacity duration-300 ${
                                    isDone || isCurrent ? "opacity-100" : "opacity-40"
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    {isDone ? (
                                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                                        <Check className="h-2 w-2 stroke-[3]" />
                                      </div>
                                    ) : isCurrent ? (
                                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E0EDFF] text-[#0B72E7]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#0B72E7] animate-ping" />
                                      </div>
                                    ) : (
                                      <div className="h-3.5 w-3.5 rounded-full border border-slate-300 dark:border-white/20" />
                                    )}
                                  </div>
                                  <div className="font-medium text-slate-800 dark:text-slate-200">
                                    {stage.title}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Aadhaar Decrypted Address Card */}
                {aadhaarVerified && (
                  <BladeNotice
                    variant="success"
                    title="UIDAI e-KYC Package Authenticated"
                    badge="BIOMETRIC CERTIFIED"
                    icon={<CheckCircle2 className="h-4 w-4 text-[#16A34A]" />}
                  >
                    <div className="text-[11px] text-[#16A34A] font-semibold mb-2">
                      SHA-256 Digital Signature Verified & Certificate Seeded
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Certified Indian Domicile Address (Permanent)
                        </span>
                        <span className="font-bold text-[#0C2340] dark:text-white leading-snug block mt-0.5">
                          Flat 4B, Oberoi Woods, Mohan Gokhale Rd, Goregaon East, Mumbai 400063, Maharashtra
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#BBF7D0] dark:border-emerald-900/40">
                        <div>
                          <span className="text-[11px] text-[#9CA3AF] block">
                            Sub-Registrar Jurisdiction
                          </span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            Bandra Sub-Registrar Office, Mumbai
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] text-[#9CA3AF] block">
                            Cross-Match Validation
                          </span>
                          <span className="font-semibold text-[#16A34A]">
                            Name & D.O.B Matched with PAN
                          </span>
                        </div>
                      </div>
                    </div>
                  </BladeNotice>
                )}

                {/* Uniform Button Bar */}
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
                    Proceed to Asset Discovery
                  </BladeButton>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 4: AUTONOMOUS ACCOUNT AGGREGATOR DISCOVERY
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[4px] bg-[#F1F5F9] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-[#475569] dark:text-slate-300">
                      STEP 4 OF 5
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      RBI NBFC-AA Protocol
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-xl font-bold text-[#0C2340] dark:text-white tracking-tight">
                    Central Asset Discovery & Consolidation
                  </h2>
                  <p className="mt-1 text-xs text-[#515B6F] dark:text-slate-400 leading-relaxed">
                    Executing read-only financial node discovery across scheduled commercial banks, depositories, real estate titles, and statutory recovery funds linked to verified PAN <strong>{pan}</strong> and KIN <strong>40029104928104</strong>.
                  </p>
                </div>

                {/* Discovery Trigger Card */}
                {discoveredCount === 0 && (
                  <div className="rounded-xl border border-[#E2E8F0] dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] p-6 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0EDFF] dark:bg-blue-950/50 text-[#0B72E7]">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0C2340] dark:text-white">
                        Ready to Synchronize 11 Financial Asset Nodes
                      </h4>
                      <p className="text-xs text-[#515B6F] dark:text-slate-400 mt-0.5">
                        Will retrieve account balances, demat folios, real estate extracts, and unclaimed government funds.
                      </p>
                    </div>
                    <BladeButton
                      variant="primary"
                      size="md"
                      onClick={handleStartDiscovery}
                      icon={<RefreshCw className="h-4 w-4" />}
                    >
                      Synchronize Portfolio Ledgers
                    </BladeButton>
                  </div>
                )}

                {/* Discovered Ledger List */}
                {discoveredCount > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0C2340] dark:text-white">
                        Synchronized Nodes: {discoveredCount} of {assetNodes.length}
                      </span>
                      {isDiscovering && (
                        <span className="flex items-center gap-1.5 text-xs text-[#0B72E7] font-semibold">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Fetching financial balances...</span>
                        </span>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2 rounded-xl border border-[#E2E8F0] dark:border-white/[0.08] p-2 bg-white dark:bg-[#1A1F2E]">
                      {assetNodes.slice(0, discoveredCount).map((node, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-white/[0.02] text-xs transition-all animate-fadeIn"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E0EDFF] dark:bg-blue-950/40 text-[#0B72E7] font-bold text-[11px]">
                              {i + 1}
                            </div>
                            <div>
                              <div className="font-bold text-[#0C2340] dark:text-white">
                                {node.name}
                              </div>
                              <div className="text-[11px] text-[#9CA3AF]">
                                {node.ref} &bull; {node.status}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-[#0C2340] dark:text-white text-right">
                            {formatINR(node.amount)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Discovered Metric */}
                    {!isDiscovering && discoveredCount === assetNodes.length && (
                      <div className="rounded-xl border border-[#DCFCE7] dark:border-emerald-900/40 bg-[#F0FDF4]/60 dark:bg-emerald-950/20 p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] block">
                            Aggregated Verified Indian Wealth
                          </span>
                          <span className="text-2xl font-extrabold text-[#0C2340] dark:text-white font-sans">
                            ₹1,84,73,500
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 rounded bg-[#16A34A] text-white px-2.5 py-0.5 text-[10px] font-bold">
                            <Check className="h-3 w-3 stroke-[2.5]" />
                            <span>11 NODES ACTIVE</span>
                          </span>
                          <span className="text-[11px] text-[#9CA3AF] block mt-1">
                            Includes ₹1,18,400 Claimable Capital
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Uniform Button Bar */}
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
                    onClick={() => setStep(5)}
                    disabled={isDiscovering || discoveredCount < assetNodes.length}
                    icon={<ArrowRight className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Proceed to Vault Activation
                  </BladeButton>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 5: VAULT KEY GENERATION & ACTIVATION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 5 && (
              <div className="space-y-6 text-center py-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E0EDFF] dark:bg-white/10 text-[#0B72E7] shadow-xs">
                  <Lock className="h-8 w-8" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#DCFCE7] dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] mb-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>STEP 5 OF 5 &bull; VAULT SEALED</span>
                  </span>
                  <h2 className="text-2xl font-bold text-[#0C2340] dark:text-white tracking-tight">
                    Sovereign NRI Wealth Node Sealed
                  </h2>
                  <p className="mt-1 text-xs text-[#515B6F] dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Your institutional dashboard has been initialized with authenticated Permanent Account Number and Aadhaar identity tokens.
                  </p>
                </div>

                {/* Summary Matrix Card */}
                <div className="text-left rounded-xl border border-[#E2E8F0] dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02] p-5 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] border-b border-[#F0F0F0] dark:border-white/[0.06] pb-2">
                    Verified Identity & Portfolio Credential
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Account Holder (Primary NRI)
                      </span>
                      <span className="font-bold text-[#0C2340] dark:text-white">
                        Brijal Patel
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Country of Tax Residence
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {jurisdictions.find((j) => j.code === selectedCountry)?.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Permanent Indian Domicile
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block">
                        Oberoi Woods, Goregaon East, Mumbai
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Central KYC KIN (CERSAI)
                      </span>
                      <span className="font-bold text-[#0B72E7] dark:text-blue-300">
                        40029104928104
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Connected Institutions
                      </span>
                      <span className="font-semibold text-[#16A34A]">
                        7 Regulated Entities Synchronized
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Aggregated Indian Wealth
                      </span>
                      <span className="font-extrabold text-[#0C2340] dark:text-white">
                        ₹1,84,73,500
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <BladeButton
                    variant="primary"
                    size="lg"
                    onClick={handleCompleteActivation}
                    disabled={isActivating}
                    isLoading={isActivating}
                    icon={!isActivating ? <ArrowRight className="h-4 w-4" /> : undefined}
                    iconPosition="right"
                    className="w-full"
                  >
                    Enter NRI Wealth Command Center
                  </BladeButton>
                </div>
              </div>
            )}
          </BladeCard>
        </div>
      </main>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="border-t border-[#F0F0F0] dark:border-white/[0.06] bg-white dark:bg-[#0F1523] py-4 text-center text-xs text-[#9CA3AF]">
        Prototype of DeshBoard &bull; Institutional Read-Only Sovereign Asset Aggregation for Non-Resident Indians &bull; Operating in US, UAE & UK
      </footer>
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0E17] flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B72E7]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading Sovereign Protocol...</span>
          </div>
        </div>
      }
    >
      <OnboardContent />
    </Suspense>
  );
}
