"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  Loader2,
  KeyRound,
  Landmark,
  Building2,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { DEMO_USERS } from "@/lib/mockData";

export default function SignInPage() {
  const router = useRouter();
  const { setActiveUser } = useApp();
  const [email, setEmail] = useState("brijal.patel@siliconvalley.io");
  const [password, setPassword] = useState("nripassword");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setActiveUser(data.user);
          router.push("/dashboard");
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // Fallback for static site hosting (Render Static Site)
    }

    // Static site demo fallback: allow demo users and any valid email
    const matchedUser = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    const user = matchedUser || {
      ...DEMO_USERS.brijal,
      email: email.trim(),
    };

    setActiveUser(user);
    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F8] text-slate-900 flex flex-col justify-between font-sans">
      {/* Top Navbar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#E2EBEA] bg-white px-6 md:px-12">
        <Link href="/" className="flex items-center group cursor-pointer select-none">
          <img
            src="/deshboard-logo.png"
            alt="DeshBoard"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>
        <div className="text-xs text-slate-500">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[#336765] hover:text-[#234947] transition-colors">
            Create an Account
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-4xl w-full rounded-2xl border border-[#E2EBEA] bg-white shadow-card overflow-hidden">
          {/* Left Form */}
          <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#EEF5F4] px-2.5 py-1 text-[11px] font-bold text-[#336765]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>NRI Financial Command Center</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-[#001535] tracking-tight">
                Sign In to Your Indian Wealth Portal
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Access your bank accounts, properties, insurance, and taxes in one safe place.
              </p>

              {error && (
                <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center gap-2">
                  <span className="rounded bg-rose-200 px-2 py-0.5 font-bold text-[10px]">ERROR</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/60 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-[#336765] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#336765]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/60 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-[#336765] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#336765]/20 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#336765] hover:bg-[#234947] active:bg-[#1b3a39] py-2.5 px-6 text-[13px] font-bold text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo One-Click Fill */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("brijal.patel@siliconvalley.io");
                    setPassword("nripassword");
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#336765] hover:text-[#234947] transition-colors"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Prefill Registered Account (Brijal Patel)</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-slate-400 text-center">
              DeshBoard &bull; Read-only asset consolidation for Non-Resident Indians
            </div>
          </div>

          {/* Right Clean Institutional Feature Panel (Simple, Perfect, No 3D, No Numbers) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#001535] to-[#042038] p-8 md:p-10 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#336765]/20 border border-[#336765]/40 px-3 py-1 text-xs font-semibold text-[#66C3BF]">
                <ShieldCheck className="h-4 w-4 text-[#66C3BF]" />
                <span>RBI Account Aggregator Framework</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white leading-snug">
                One Clean Portal for All Your Indian Assets
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Connect your Indian bank accounts, land registries, mutual funds, and tax filings in direct view-only mode.
              </p>
            </div>

            {/* Feature Highlights (No numbers) */}
            <div className="my-6 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <Landmark className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">NRE / NRO Bank Accounts</div>
                  <div className="text-[11px] text-slate-300">Centralized balances, fixed deposits & periodic Re-KYC</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Mutual Funds & Demat Stocks</div>
                  <div className="text-[11px] text-slate-300">Automated portfolio consolidation via CAMS & CDSL</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Properties & Land Registries</div>
                  <div className="text-[11px] text-slate-300">Official title tracking and municipal tax verification</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <FileCheck2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Tax & Compliance Tracking</div>
                  <div className="text-[11px] text-slate-300">Annual tax summaries, capital gains, and foreign disclosure readiness</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Strictly Read-Only Access</span>
              <span className="text-[#66C3BF] font-semibold">Zero Transaction Authority</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E2EBEA] bg-white py-4 text-center text-xs text-slate-500">
        © DeshBoard Technologies. Designed for Global Indian Families.
      </footer>
    </div>
  );
}
