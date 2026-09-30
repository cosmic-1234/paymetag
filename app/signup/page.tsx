"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  Globe2,
  Loader2,
  ShieldCheck,
  Landmark,
  Building2,
  TrendingUp,
  FileCheck2,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { DEMO_USERS } from "@/lib/mockData";

export default function SignUpPage() {
  const router = useRouter();
  const { setActiveUser } = useApp();
  const [name, setName] = useState("Brijal Patel");
  const [email, setEmail] = useState("brijal.patel@siliconvalley.io");
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

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setActiveUser(data.user);
          router.push(`/onboard?country=${encodeURIComponent(country)}`);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // Fallback for static site hosting
    }

    const newUser = {
      ...DEMO_USERS.brijal,
      name: name.trim(),
      email: email.trim(),
      location:
        country === "USA"
          ? "San Jose, California, USA"
          : country === "UAE"
          ? "Dubai, UAE"
          : "London, United Kingdom",
    };

    setActiveUser(newUser);
    router.push(`/onboard?country=${encodeURIComponent(country)}`);
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
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-[#336765] hover:text-[#234947] transition-colors">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-4xl w-full rounded-2xl border border-[#E2EBEA] bg-white shadow-card overflow-hidden">
          {/* Left Form */}
          <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#EEF5F4] px-2.5 py-1 text-[11px] font-bold text-[#336765]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Create Free NRI Account</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-[#001535] tracking-tight">
                Take Control of Your Assets in India
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Consolidate your bank accounts, properties, insurance, and taxes in 2 minutes.
              </p>

              {error && (
                <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 flex items-center gap-2">
                  <span className="rounded bg-rose-200 px-2 py-0.5 font-bold text-[10px]">ERROR</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSignUp} className="mt-6 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Brijal Patel"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/60 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-[#336765] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#336765]/20 transition-all"
                    />
                  </div>
                </div>

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
                    Country of Residence
                  </label>
                  <div className="relative">
                    <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/60 pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-[#336765] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#336765]/20 transition-all"
                    >
                      <option value="USA">United States (FBAR / FATCA)</option>
                      <option value="UAE">United Arab Emirates (Dubai / Abu Dhabi)</option>
                      <option value="UK">United Kingdom (HMRC Worldwide Disclosure)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                      <span>Create Account & Start Onboarding</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-6 text-[11px] text-slate-400 text-center">
              DeshBoard &bull; Secure non-resident Indian data handling
            </div>
          </div>

          {/* Right Clean Institutional Feature Panel */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#001535] to-[#042038] p-8 md:p-10 text-white flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#336765]/20 border border-[#336765]/40 px-3 py-1 text-xs font-semibold text-[#66C3BF]">
                <ShieldCheck className="h-4 w-4 text-[#66C3BF]" />
                <span>Bank-Grade Data Protection</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-white leading-snug">
                Unified Indian Asset Command
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Direct view-only sync with your Indian bank and depository accounts without leaving your country of residence.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="my-6 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <Landmark className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">NRE / NRO Account Sync</div>
                  <div className="text-[11px] text-slate-300">Continuous balance aggregation & periodic Re-KYC alerts</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Indian Stocks & Mutual Funds</div>
                  <div className="text-[11px] text-slate-300">Portfolio valuation updated automatically</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Land Records & Properties</div>
                  <div className="text-[11px] text-slate-300">Property tax status and digital title verification</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#336765]/30 text-[#66C3BF]">
                  <FileCheck2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Tax Ready Exports</div>
                  <div className="text-[11px] text-slate-300">Instant reports for FBAR, FATCA, or local CPA filings</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>View-Only Access</span>
              <span className="text-[#66C3BF] font-semibold">RBI-Regulated AA Protocol</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E2EBEA] bg-white py-4 text-center text-xs text-slate-500">
        © 2026 DeshBoard Technologies. Designed for Global Indian Families.
      </footer>
    </div>
  );
}
