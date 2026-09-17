"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Landmark, ArrowRight, Lock, Mail, User, Globe2, Loader2, CheckCircle2 } from "lucide-react";
import { ThreeFloatingElements } from "@/components/3d/ThreeFloatingElements";
import { useApp } from "@/lib/store";

export default function SignUpPage() {
  const router = useRouter();
  const { setActiveUser } = useApp();
  const [name, setName] = useState("Shrirang Mehta");
  const [email, setEmail] = useState("shrirang.mehta@siliconvalley.io");
  const [country, setCountry] = useState("USA");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, country, password }),
      });

      const data = await res.json();
      if (res.ok && data.user) {
        setActiveUser(data.user);
        router.push("/onboard");
      } else {
        setError(data.error || "Failed to create account");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#F0F0F0] dark:border-white/[0.06] bg-white dark:bg-[#0F1523] px-6 md:px-12">
        <Link href="/" className="flex items-center gap-[10px]">
          <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] shadow-sm shrink-0">
            <svg
              className="h-[20px] w-[20px] text-white"
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
          <span className="font-extrabold text-[16px] tracking-tight text-[#0D2266] dark:text-white">
            DESHVAULT
          </span>
        </Link>
        <div className="text-xs text-[#9CA3AF]">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-[#3451D1] hover:text-[#1D3FAD] transition-colors">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-4xl w-full rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] shadow-card overflow-hidden">
          {/* Left Form */}
          <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#3451D1] uppercase tracking-[0.06em]">
                Create Free NRI Account
              </span>
              <h2 className="mt-1 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                Take Control of Your Assets in India
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Consolidate your bank accounts, properties, insurance, and taxes in 2 minutes.
              </p>

              {error && (
                <div className="mt-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-[#E8E8E8] dark:border-white/[0.08] p-3 text-xs text-[#DC2626] flex items-center gap-2 shadow-sm">
                  <span className="rounded-[6px] bg-[#FEE2E2] px-2 py-0.5 font-bold text-[10px]">ERROR</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSignUp} className="mt-6 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Shrirang Mehta"
                      className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-slate-50/60 dark:bg-white/[0.03] pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#3451D1] focus:bg-white dark:focus:bg-[#1A1F2E] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-slate-50/60 dark:bg-white/[0.03] pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#3451D1] focus:bg-white dark:focus:bg-[#1A1F2E] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Country of Residence
                  </label>
                  <div className="relative">
                    <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-slate-50/60 dark:bg-white/[0.03] pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#3451D1] focus:bg-white dark:focus:bg-[#1A1F2E] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    >
                      <option value="USA">United States (FBAR / FATCA)</option>
                      <option value="UAE">United Arab Emirates (Dubai / Abu Dhabi)</option>
                      <option value="CAN">Canada (CRA T1135)</option>
                      <option value="SGP">Singapore</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-slate-50/60 dark:bg-white/[0.03] pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-[#3451D1] focus:bg-white dark:focus:bg-[#1A1F2E] focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3451D1] py-3 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Create Account & Start Onboarding</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-6 text-[11px] text-slate-400 text-center">
              By creating an account, you agree to secure non-resident Indian data handling.
            </div>
          </div>

          {/* Right 3D Visual Panel */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0C2340] to-[#07162C] p-8 text-white flex flex-col justify-between items-center text-center relative overflow-hidden">
            <div className="z-10">
              <span className="text-xs font-mono tracking-widest text-blue-300 uppercase">
                Bank-Grade Protection
              </span>
              <h3 className="mt-1 text-lg font-bold text-white">
                3D Protected Financial Vault
              </h3>
            </div>

            <div className="relative h-64 w-full flex items-center justify-center my-4 z-10">
              <ThreeFloatingElements type="shield" className="h-64 w-full" />
            </div>

            <div className="z-10 space-y-1">
              <div className="flex items-center justify-center gap-2 text-xs text-blue-200 font-medium">
                <CheckCircle2 className="h-4 w-4 text-blue-300" />
                Account Aggregator Framework
              </div>
              <p className="text-[11px] text-slate-300">
                Direct view-only sync with your Indian bank and depository accounts.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        © 2026 DeshVault Technologies. Designed for Global Indian Families.
      </footer>
    </div>
  );
}
