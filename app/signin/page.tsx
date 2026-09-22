"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Landmark, ArrowRight, Lock, Mail, ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { ThreeFloatingElements } from "@/components/3d/ThreeFloatingElements";
import { useApp } from "@/lib/store";
import { DEMO_USERS } from "@/lib/mockData";

export default function SignInPage() {
  const router = useRouter();
  const { setActiveUser } = useApp();
  const [email, setEmail] = useState("brijal.patel@siliconvalley.io");
  const [password, setPassword] = useState("password123");
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-[#F0F0F0] dark:border-white/[0.06] bg-white dark:bg-[#0F1523] px-6 md:px-12">
        <Link href="/" className="flex items-center gap-[10px]">
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
          <span className="font-extrabold text-[16px] tracking-tight text-[#0D2266] dark:text-white">
            DESHBOARD
          </span>
        </Link>
        <div className="text-xs text-[#9CA3AF]">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[#3451D1] hover:text-[#1D3FAD] transition-colors">
            Create an Account
          </Link>
        </div>
      </header>

      {/* Main Login Card with 3D Visual */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-4xl w-full rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] shadow-card overflow-hidden">
          {/* Left Form */}
          <div className="lg:col-span-6 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#F0F4FF] dark:bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>NRI Financial Command Center</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-[#0D2266] dark:text-white tracking-tight">
                Sign In to Your Indian Wealth Portal
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Access your bank accounts, properties, insurance, and taxes in one safe place.
              </p>

              {error && (
                <div className="mt-4 rounded-xl bg-white dark:bg-[#1A1F2E] border border-[#E8E8E8] dark:border-white/[0.08] p-3 text-xs text-[#DC2626] flex items-center gap-2 shadow-sm">
                  <span className="rounded-[6px] bg-[#FEE2E2] px-2 py-0.5 font-bold text-[10px]">ERROR</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSignIn} className="mt-6 space-y-4">
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
                    setPassword("password123");
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#3451D1] hover:text-[#1D3FAD] transition-colors"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Prefill Registered Account (Brijal Patel)</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-[11px] text-slate-400 text-center">
              DeshVault &bull; Read-only asset consolidation for Non-Resident Indians
            </div>
          </div>

          {/* Right 3D Visual Panel */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0C2340] to-[#07162C] p-8 text-white flex flex-col justify-between items-center text-center relative overflow-hidden">
            <div className="z-10">
              <span className="text-xs font-mono tracking-widest text-blue-300 uppercase">
                3D Interactive Node
              </span>
              <h3 className="mt-1 text-lg font-bold text-white">
                Live Indian Wealth Flow
              </h3>
            </div>

            {/* 3D Floating Coin & Card */}
            <div className="relative h-64 w-full flex items-center justify-center my-4 z-10">
              <ThreeFloatingElements type="all" className="h-64 w-full" />
            </div>

            <div className="z-10 space-y-1">
              <div className="font-mono text-sm font-semibold text-emerald-400">
                ₹1,84,73,500 Tracked
              </div>
              <p className="text-[11px] text-slate-300">
                Direct connection to Banks, Land Registries, and PF funds.
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
