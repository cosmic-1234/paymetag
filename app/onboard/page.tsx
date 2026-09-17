"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Landmark,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Users,
  Building,
  KeyRound,
  FileCheck,
  Sparkles,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { BladeCard } from "@/components/ui/BladeCard";
import { formatINR } from "@/lib/formatters";

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [pan, setPan] = useState("ABCPM1234D");
  const [aadhaar, setAadhaar] = useState("4521");
  const [isConnectingAA, setIsConnectingAA] = useState(false);

  const countries = [
    { code: "USA", flag: "🇺🇸", name: "United States", note: "US tax and foreign assets tracking (FBAR)" },
    { code: "UAE", flag: "🇦🇪", name: "United Arab Emirates", note: "Zero income tax & direct money transfers" },
    { code: "CAN", flag: "🇨🇦", name: "Canada", note: "Canada revenue foreign property reporting" },
    { code: "SGP", flag: "🇸🇬", name: "Singapore", note: "Direct remittance & tax benefits" },
  ];

  const handleConnectAA = () => {
    setIsConnectingAA(true);
    setTimeout(() => {
      setIsConnectingAA(false);
      setStep(5);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
      {/* Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 px-6 md:px-12 bg-white">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-blue-sm">
            <Landmark className="h-4 w-4" />
          </div>
          <span className="font-serif text-base font-bold tracking-tight text-[#0C2340]">
            DESHVAULT
          </span>
        </Link>
        <div className="text-xs font-semibold text-blue-700">
          Step {step} of 5: {step === 1 ? "Country" : step === 2 ? "PAN & Identity" : step === 3 ? "Family Members" : step === 4 ? "Connect Banks" : "All Done"}
        </div>
      </header>

      {/* Main Wizard */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Progress Indicator */}
          <div className="mb-6 flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-blue-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <BladeCard variant="default" className="p-8">
            {/* STEP 1: Country of Residence */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#3451D1] uppercase tracking-[0.06em]">
                    Step 1 — Where You Live
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    Select your country of residence
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    This helps us calculate lower tax rates and remind you about filing requirements in your home country.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCountry(c.code)}
                      className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
                        selectedCountry === c.code
                          ? "border-[#3451D1] bg-[#F0F4FF]/50 dark:bg-white/[0.06] shadow-sm"
                          : "border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] hover:border-slate-300 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <span className="text-2xl">{c.flag}</span>
                      <span className="mt-2 text-sm font-bold text-[#0C2340]">{c.name}</span>
                      <span className="mt-0.5 text-[11px] text-slate-500">{c.note}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm transition"
                >
                  <span>Continue to Identity</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Indian Identification */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Step 2 — Indian Documents
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-[#0C2340]">
                    Enter Your PAN Card
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your PAN allows automatic searching across Indian banks, stocks, mutual funds, and lost money registers.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PAN Card Number
                    </label>
                    <input
                      type="text"
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-sm font-semibold text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                    <span className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified: Shrirang Mehta
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Aadhaar Card (Last 4 Digits)
                    </label>
                    <input
                      type="text"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                      placeholder="XXXX-XXXX-4521"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-sm font-semibold text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm transition"
                  >
                    <span>Next: Add Family Members</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Family Graph */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Step 3 — Family & Caretakers
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-[#0C2340]">
                    Who else helps manage your assets?
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Connect your spouse abroad and parents living in India who look after physical property papers and bank branch visits.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                        P
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0C2340]">Priya Mehta</div>
                        <div className="text-[11px] text-slate-500">Spouse (San Jose, USA)</div>
                      </div>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                      Co-Owner
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                        R
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0C2340]">Ramesh Mehta</div>
                        <div className="text-[11px] text-slate-500">Father (Mumbai, India) — Has Legal Power of Attorney</div>
                      </div>
                    </div>
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                      Caretaker (POA)
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm transition"
                  >
                    <span>Next: Link Your Bank Accounts</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Bank Connect */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Step 4 — Safe Bank Linking
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-[#0C2340]">
                    Connect Your Indian Banks
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Connect your active NRE, NRO, and resident accounts to view balances.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-700">
                    Ready to connect 4 banks and investment accounts:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 p-2.5 text-slate-800 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      HDFC Bank
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 p-2.5 text-slate-800 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      State Bank of India (SBI)
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 p-2.5 text-slate-800 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Axis Bank
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 p-2.5 text-slate-800 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Stocks & Mutual Funds
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConnectAA}
                    disabled={isConnectingAA}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm transition disabled:opacity-60"
                  >
                    {isConnectingAA ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Connecting to Bank Servers...</span>
                      </>
                    ) : (
                      <>
                        <span>Approve & Fetch Balances</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Final Discovery */}
            {step === 5 && (
              <div className="space-y-6 text-center py-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Sparkles className="h-7 w-7 animate-pulse" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                    All Your Indian Assets Found!
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    We found all your bank accounts, properties, insurance, and even lost money you can claim.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-5 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                    Total Indian Wealth Tracked
                  </div>
                  <div className="font-mono text-3xl font-bold text-[#0D2266] dark:text-white">
                    ₹1,84,73,500
                  </div>
                  <div className="text-xs text-[#16A34A] dark:text-emerald-400 font-semibold">
                    11 Accounts & Properties Linked
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-4 text-xs shadow-sm flex items-center gap-3">
                  <span className="rounded-[6px] bg-[#FEF9C3] text-[#A16207] font-bold text-[11px] px-2.5 py-0.5 whitespace-nowrap">
                    IEPF FOUND
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 text-left">
                    We traced <strong>₹18,400</strong> of old Infosys dividends you can claim right away!
                  </span>
                </div>

                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] py-3.5 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition"
                >
                  <span>Open Your Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </BladeCard>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        © 2026 DeshVault Technologies. Designed for Global Indian Families.
      </footer>
    </div>
  );
}
