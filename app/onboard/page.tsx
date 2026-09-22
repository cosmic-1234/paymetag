"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Fingerprint,
  FileCheck2,
  Building2,
  Landmark,
  CheckCircle2,
  ArrowRight,
  Lock,
  Search,
  Scan,
  Layers,
  KeyRound,
  RefreshCw,
  FileText,
  CreditCard,
  Globe,
  MapPin,
  Check,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { BladeCard } from "@/components/ui/BladeCard";
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

  // Executive checkpoints for PAN query (matching portal theme)
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

  // Handle PAN Query execution with executive stage progression
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

  // Handle Verify Aadhaar OTP with executive stage progression
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0E17] text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          INSTITUTIONAL HEADER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#F0F0F0] dark:border-white/[0.06] bg-white/95 dark:bg-[#0F1523]/95 backdrop-blur-md px-6 md:px-12">
        <Link href="/" className="flex items-center gap-[10px] group cursor-pointer">
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
              DESHVAULT
            </span>
            <span className="block font-medium text-[11px] text-[#9CA3AF] leading-none mt-0.5">
              NRI Wealth Portal &bull; Onboarding
            </span>
          </div>
        </Link>

        {/* Sovereign Security Badge */}
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
          MAIN CUSTOMER JOURNEY CONTAINER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-2xl">
          {/* Step Progress Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
              <span className="flex items-center gap-2 font-bold text-[#0D2266] dark:text-white text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3451D1] text-white text-[11px] font-bold">
                  {step}
                </span>
                <span>
                  {step === 1 && "Tax Jurisdiction & Regulatory Profile"}
                  {step === 2 && "Income Tax Department PAN & CKYCR Query"}
                  {step === 3 && "Aadhaar e-KYC & Permanent Address Decryption"}
                  {step === 4 && "Central Asset Discovery & Consolidation"}
                  {step === 5 && "Vault Sealed & Portal Access"}
                </span>
              </span>
              <span className="font-semibold text-[11px] text-[#9CA3AF]">
                Step {step} of 5
              </span>
            </div>

            {/* Segmented Progress Line */}
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s < step
                      ? "bg-[#16A34A]"
                      : s === step
                      ? "bg-[#3451D1]"
                      : "bg-[#E5E7EB] dark:bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>
          </div>

          <BladeCard variant="default" className="p-6 md:p-8 shadow-card relative overflow-hidden">
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 1: REGULATORY JURISDICTION (US, UAE, UK)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#EEF2FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300 uppercase tracking-wider">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Cross-Border Compliance</span>
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    Select Your Country of Tax Residence
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    We currently support Non-Resident Indians residing in the <strong>United States</strong>, <strong>United Arab Emirates</strong>, and <strong>United Kingdom</strong> to reconcile cross-border taxes, treaty rates, and FEMA outward remittances.
                  </p>
                </div>

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
                            ? "border-[#3451D1] bg-[#F4F7FF] dark:bg-blue-950/20 shadow-sm"
                            : "border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                              isSelected
                                ? "bg-[#3451D1] text-white shadow-sm"
                                : "bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300"
                            }`}
                          >
                            {j.code}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#0D2266] dark:text-white">
                                {j.name}
                              </span>
                              <span className="rounded bg-slate-100 dark:bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                                {j.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                              {j.subtext}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                            isSelected
                              ? "border-[#3451D1] bg-[#3451D1] text-white"
                              : "border-slate-300 dark:border-white/20"
                          }`}
                        >
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] px-6 py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition cursor-pointer"
                  >
                    <span>Proceed to PAN Verification</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 2: PAN STATUTORY VERIFICATION & FETCH
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#EEF2FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300 uppercase tracking-wider">
                    <FileCheck2 className="h-3.5 w-3.5" />
                    <span>Statutory Identification</span>
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    Permanent Account Number (PAN) Query
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Under Section 139A of the Income Tax Act, 1961, your PAN anchors your financial records across scheduled commercial banks, Central KYC Records Registry (CERSAI), and depositories.
                  </p>
                </div>

                {/* Input Card */}
                <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
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
                        className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-white dark:bg-[#1A1F2E] pl-10 pr-4 py-2.5 font-bold tracking-widest text-sm text-[#0D2266] dark:text-white focus:border-[#3451D1] focus:outline-none uppercase"
                      />
                    </div>
                  </div>

                  {!panVerified && !isPanQuerying && (
                    <button
                      onClick={handleExecutePanQuery}
                      disabled={pan.length !== 10}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] transition disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      <Scan className="h-4 w-4" />
                      <span>Verify with Income Tax Gateway & Central KYC</span>
                    </button>
                  )}

                  {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                      ELEGANT PORTAL-THEMED VERIFICATION ANIMATION
                      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                  {isPanQuerying && (
                    <div className="rounded-xl border border-[#E0E7FF] dark:border-blue-900/40 bg-white dark:bg-[#1A1F2E] p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] dark:bg-blue-950/50 text-[#3451D1] shrink-0">
                          <Loader2 className="h-5 w-5 animate-spin text-[#3451D1]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0D2266] dark:text-white leading-tight">
                            Verifying Tax & Regulatory Credentials
                          </h4>
                          <span className="text-[11px] text-[#9CA3AF] mt-0.5 block">
                            Interfacing with Central KYC Records Registry for PAN: {pan}
                          </span>
                        </div>
                      </div>

                      {/* Smooth Progress Bar */}
                      <div className="h-1.5 w-full rounded-full bg-[#F3F4F6] dark:bg-white/[0.08] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3451D1] to-[#1D3FAD] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${((panStageIndex + 1) / panStages.length) * 100}%` }}
                        />
                      </div>

                      {/* Step Checkpoints matching portal styling */}
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
                                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EEF2FF] text-[#3451D1]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#3451D1] animate-ping" />
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

                {/* Extracted Record Card (BladeCard verified style) */}
                {panVerified && (
                  <div className="space-y-3.5 rounded-2xl border border-[#DCFCE7] dark:border-emerald-900/40 bg-[#F0FDF4]/50 dark:bg-emerald-950/20 p-5">
                    <div className="flex items-center justify-between border-b border-[#DCFCE7] dark:border-emerald-900/40 pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                        <div>
                          <h4 className="text-xs font-bold text-[#0D2266] dark:text-white">
                            Entity Authenticated by Income Tax Department
                          </h4>
                          <span className="text-[11px] text-[#16A34A] font-semibold">
                            NSDL/Protean Status: Operative & Seeded
                          </span>
                        </div>
                      </div>
                      <span className="rounded-[6px] bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold px-2 py-0.5">
                        MATCH CONFIRMED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Full Legal Name
                        </span>
                        <span className="font-bold text-[#0D2266] dark:text-white">
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
                        <span className="font-bold text-[#3451D1] dark:text-blue-300">
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

                    <div className="mt-2 border-t border-[#DCFCE7] dark:border-emerald-900/40 pt-2 text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                      <strong>Statutory Requirement:</strong> Under RBI Master Direction on KYC (Section 16), official residential address proof and biometric tokens are authenticated via Aadhaar e-KYC.
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2.5 text-xs font-semibold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!panVerified}
                    className="flex items-center gap-2 rounded-xl bg-[#3451D1] px-6 py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] disabled:opacity-40 transition cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Aadhaar e-KYC</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 3: AADHAAR E-KYC & ADDRESS EXTRACTION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#EEF2FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300 uppercase tracking-wider">
                    <Fingerprint className="h-3.5 w-3.5" />
                    <span>UIDAI e-KYC 2.1 Handshake</span>
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    Aadhaar e-KYC & Domicile Address Decryption
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Authenticate via the UIDAI Aadhaar e-KYC gateway to extract your digitally signed Indian domicile address and cryptographic biometric compliance token without physical branch visits.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
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
                        className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-white dark:bg-[#1A1F2E] pl-10 pr-4 py-2.5 font-bold tracking-wider text-sm text-[#0D2266] dark:text-white focus:border-[#3451D1] focus:outline-none"
                      />
                    </div>
                  </div>

                  {!otpSent && !aadhaarVerified && (
                    <button
                      onClick={handleSendAadhaarOtp}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] transition cursor-pointer shadow-sm"
                    >
                      <KeyRound className="h-4 w-4" />
                      <span>Request One-Time Password via UIDAI</span>
                    </button>
                  )}

                  {/* OTP Entry Phase */}
                  {otpSent && !aadhaarVerified && (
                    <div className="space-y-3.5 pt-2 border-t border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
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
                          className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-white dark:bg-[#1A1F2E] pl-10 pr-4 py-2.5 font-bold tracking-widest text-base text-[#0D2266] dark:text-white focus:border-[#3451D1] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-0.5">
                        <span>Validity: {otpCountdown}s remaining</span>
                        <button
                          type="button"
                          onClick={() => setOtpCountdown(30)}
                          disabled={otpCountdown > 0}
                          className="text-[#3451D1] disabled:opacity-40 hover:underline font-semibold cursor-pointer"
                        >
                          Resend Code
                        </button>
                      </div>

                      {!isOtpVerifying && (
                        <button
                          onClick={handleVerifyAadhaarOtp}
                          disabled={otpCode.length !== 6}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] transition disabled:opacity-50 cursor-pointer shadow-sm"
                        >
                          <FileCheck2 className="h-4 w-4" />
                          <span>Verify Code & Decrypt Domicile Address</span>
                        </button>
                      )}

                      {/* Aadhaar Verification Elegant Animation */}
                      {isOtpVerifying && (
                        <div className="rounded-xl border border-[#E0E7FF] dark:border-blue-900/40 bg-white dark:bg-[#1A1F2E] p-4 shadow-sm space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF2FF] dark:bg-blue-950/50 text-[#3451D1] shrink-0">
                              <Loader2 className="h-4 w-4 animate-spin text-[#3451D1]" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xs text-[#0D2266] dark:text-white leading-tight">
                                Decrypting Sovereign Identity Package
                              </h4>
                              <span className="text-[11px] text-[#9CA3AF]">
                                Interfacing with UIDAI verification servers
                              </span>
                            </div>
                          </div>

                          <div className="h-1.5 w-full rounded-full bg-[#F3F4F6] dark:bg-white/[0.08] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#3451D1] to-[#1D3FAD] rounded-full transition-all duration-500 ease-out"
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
                                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EEF2FF] text-[#3451D1]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#3451D1] animate-ping" />
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
                  <div className="space-y-3 rounded-2xl border border-[#DCFCE7] dark:border-emerald-900/40 bg-[#F0FDF4]/50 dark:bg-emerald-950/20 p-5">
                    <div className="flex items-center justify-between border-b border-[#DCFCE7] dark:border-emerald-900/40 pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                        <div>
                          <h4 className="text-xs font-bold text-[#0D2266] dark:text-white">
                            UIDAI e-KYC Package Authenticated
                          </h4>
                          <span className="text-[11px] text-[#16A34A] font-semibold">
                            SHA-256 Digital Signature Verified
                          </span>
                        </div>
                      </div>
                      <span className="rounded-[6px] bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold px-2 py-0.5">
                        BIOMETRIC CERTIFIED
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className="text-[11px] text-[#9CA3AF] block">
                          Certified Indian Domicile Address (Permanent)
                        </span>
                        <span className="font-bold text-[#0D2266] dark:text-white leading-snug block mt-0.5">
                          Flat 4B, Oberoi Woods, Mohan Gokhale Rd, Goregaon East, Mumbai 400063, Maharashtra
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
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
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2.5 text-xs font-semibold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(4)}
                    disabled={!aadhaarVerified}
                    className="flex items-center gap-2 rounded-xl bg-[#3451D1] px-6 py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] disabled:opacity-40 transition cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Asset Discovery</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 4: AUTONOMOUS ACCOUNT AGGREGATOR DISCOVERY
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#EEF2FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300 uppercase tracking-wider">
                    <Layers className="h-3.5 w-3.5" />
                    <span>RBI NBFC-AA Protocol</span>
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    Central Asset Discovery & Consolidation
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Executing read-only financial node discovery across scheduled commercial banks, depositories, real estate titles, and statutory recovery funds linked to verified PAN <strong>{pan}</strong> and KIN <strong>40029104928104</strong>.
                  </p>
                </div>

                {/* Discovery Trigger Card */}
                {discoveredCount === 0 && (
                  <div className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-6 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] dark:bg-blue-950/50 text-[#3451D1]">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0D2266] dark:text-white">
                        Ready to Synchronize 11 Financial Asset Nodes
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Will retrieve account balances, demat folios, real estate extracts, and unclaimed government funds.
                      </p>
                    </div>
                    <button
                      onClick={handleStartDiscovery}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] px-6 py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Synchronize Portfolio Ledgers</span>
                    </button>
                  </div>
                )}

                {/* Discovered Ledger List matching BladeCard style */}
                {discoveredCount > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0D2266] dark:text-white">
                        Synchronized Nodes: {discoveredCount} of {assetNodes.length}
                      </span>
                      {isDiscovering && (
                        <span className="flex items-center gap-1.5 text-xs text-[#3451D1] font-semibold">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Fetching financial balances...</span>
                        </span>
                      )}
                    </div>

                    <div className="max-h-64 overflow-y-auto space-y-2 rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] p-2 bg-white dark:bg-[#1A1F2E]">
                      {assetNodes.slice(0, discoveredCount).map((node, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-white/[0.04] bg-slate-50/50 dark:bg-white/[0.02] text-xs transition-all animate-fadeIn"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF2FF] dark:bg-blue-950/40 text-[#3451D1] font-bold text-[11px]">
                              {i + 1}
                            </div>
                            <div>
                              <div className="font-bold text-[#0D2266] dark:text-white">
                                {node.name}
                              </div>
                              <div className="text-[11px] text-[#9CA3AF]">
                                {node.ref} &bull; {node.status}
                              </div>
                            </div>
                          </div>
                          <div className="font-bold text-[#0D2266] dark:text-white text-right">
                            {formatINR(node.amount)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Discovered Metric */}
                    {!isDiscovering && discoveredCount === assetNodes.length && (
                      <div className="rounded-2xl border border-[#DCFCE7] dark:border-emerald-900/40 bg-[#F0FDF4]/50 dark:bg-emerald-950/20 p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] block">
                            Aggregated Verified Indian Wealth
                          </span>
                          <span className="text-2xl font-extrabold text-[#0D2266] dark:text-white font-sans">
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

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="rounded-xl border border-[#E5E7EB] dark:border-white/[0.1] px-4 py-2.5 text-xs font-semibold text-[#374151] dark:text-slate-300 hover:bg-[#F9FAFB] dark:hover:bg-white/[0.04] transition-colors"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(5)}
                    disabled={isDiscovering || discoveredCount < assetNodes.length}
                    className="flex items-center gap-2 rounded-xl bg-[#3451D1] px-6 py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] disabled:opacity-40 transition cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Vault Activation</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                STEP 5: VAULT KEY GENERATION & ACTIVATION
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {step === 5 && (
              <div className="space-y-6 text-center py-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF] dark:bg-white/10 text-[#3451D1] shadow-sm">
                  <Lock className="h-8 w-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    Sovereign NRI Wealth Node Sealed
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Your institutional dashboard has been initialized with authenticated Permanent Account Number and Aadhaar identity tokens.
                  </p>
                </div>

                {/* Summary Matrix Card */}
                <div className="text-left rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-5 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] border-b border-[#F0F0F0] dark:border-white/[0.06] pb-2">
                    Verified Identity & Portfolio Credential
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-[11px] text-[#9CA3AF] block">
                        Account Holder (Primary NRI)
                      </span>
                      <span className="font-bold text-[#0D2266] dark:text-white">
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
                      <span className="font-bold text-[#3451D1] dark:text-blue-300">
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
                      <span className="font-extrabold text-[#0D2266] dark:text-white">
                        ₹1,84,73,500
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCompleteActivation}
                    disabled={isActivating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] py-3.5 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition cursor-pointer disabled:opacity-50"
                  >
                    {isActivating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Launching Command Center...</span>
                      </>
                    ) : (
                      <>
                        <span>Enter NRI Wealth Command Center</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
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
        DeshVault Technologies &bull; Institutional Read-Only Sovereign Asset Aggregation for Non-Resident Indians &bull; Operating in US, UAE & UK
      </footer>
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0E17] flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#3451D1]">
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
