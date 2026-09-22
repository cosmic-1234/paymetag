"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  PhoneCall,
  Download,
  Check,
  AlertTriangle,
  AlertCircle,
  Scale,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { BladeCard } from "@/components/ui/BladeCard";
import { BladeActionCard } from "@/components/ui/BladeActionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { openAiCopilot } from "@/lib/aiCopilot";

export default function WillPage() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [aiScanResult, setAiScanResult] = useState<boolean>(false);

  const lawyers = [
    {
      name: "Adv. Vikram Singhania",
      firm: "Singhania Law Chambers",
      location: "Nariman Point, Mumbai",
      experience: "24 Years",
      specialization: "NRI Wills & Property Inheritance in Mumbai",
    },
    {
      name: "Adv. Ananya Iyer",
      firm: "Iyer Estate & Trust Counsel",
      location: "Indiranagar, Bengaluru",
      experience: "18 Years",
      specialization: "Cross-Border Family Trusts (US & India)",
    },
    {
      name: "Adv. Rohan Malhotra",
      firm: "Malhotra Legal Associates",
      location: "Barakhamba Road, New Delhi",
      experience: "20 Years",
      specialization: "Ancestral Land Revenue & Farmland Succession",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            Will, Caretakers & Legal Protection
          </h1>
          <p className="text-xs text-slate-500">
            Registered Power of Attorney for your parents in India, family will drafting, and nominee checks
          </p>
        </div>
      </div>

      {/* Action Item — Clean Blade Action Card, No Pink Tint */}
      <BladeActionCard
        module="Will & Estate"
        severity="critical"
        title="Important: You do not have a registered Will in India"
        description="Without an Indian Will, your ₹1.12 Cr Mumbai flat and bank accounts could get stuck in court for 2–3 years if anything happens. An Indian Will can be drafted completely online."
        ctaText="Draft an Indian Will Online"
        onCtaClick={() => setIsConsultOpen(true)}
      />

      {/* AI Cross-Border Succession & Probate Vulnerability Scanner */}
      <div className="rounded-2xl border border-[#3451D1]/30 bg-gradient-to-br from-[#F4F7FF] via-white to-[#EEF2FF] dark:from-[#0F172A] dark:via-[#131C35] dark:to-[#0F172A] p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] text-white shadow-xs">
                <Scale className="h-3.5 w-3.5" />
              </span>
              <span className="rounded-md bg-[#EEF2FF] dark:bg-blue-950/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3451D1] border border-[#3451D1]/20">
                Sovereign Succession AI
              </span>
              <span className="text-xs font-bold text-[#F59E0B] bg-[#FEF9C3] dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                Cross-Border Harmonization
              </span>
            </div>
            <h3 className="font-extrabold text-[15px] text-[#0D2266] dark:text-white">
              AI Cross-Border Succession & Probate Vulnerability Scanner
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed">
              Analyzes statutory conflict of laws between the <strong className="text-[#0D2266] dark:text-white">Indian Succession Act 1925</strong> (Sections 57, 213) and <strong className="text-[#0D2266] dark:text-white">California Probate Code</strong>. Identifies probate freeze risks for your ₹1.12 Cr Goregaon property and bank folios.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setIsAiScanning(true);
                setTimeout(() => {
                  setIsAiScanning(false);
                  setAiScanResult(true);
                }, 1300);
              }}
              disabled={isAiScanning}
              className="flex items-center gap-1.5 rounded-xl bg-[#3451D1] hover:bg-[#1D3FAD] px-4 py-2.5 text-xs font-bold text-white transition shadow-sm disabled:opacity-50"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{isAiScanning ? "Auditing Cross-Border Probate Laws..." : "Run AI Succession Scan"}</span>
            </button>
            <button
              onClick={() =>
                openAiCopilot(
                  "Scan my digital will for cross-border probate bottlenecks between US Probate Courts and Bombay High Court."
                )
              }
              className="flex items-center gap-1.5 rounded-xl border border-[#3451D1] bg-white dark:bg-blue-950/50 px-3.5 py-2.5 text-xs font-bold text-[#3451D1] dark:text-blue-300 hover:bg-[#EEF2FF] transition"
            >
              <span>Consult Estate AI</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic Scan Result Banner */}
        {aiScanResult && (
          <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-950/50 bg-[#FEF9C3]/60 dark:bg-amber-950/20 p-3.5 flex items-start justify-between">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-[#B45309] dark:text-amber-300 block">
                  Succession Vulnerability Identified: Ancillary Probate Mandate
                </span>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5">
                  Under Bombay High Court Original Side rules, a US Living Trust cannot execute title transfer for Oberoi Woods flat without high court letters of administration. Solution: Draft standalone Indian Holographic Will naming Shagun Patel as sole domestic executor.
                </p>
              </div>
            </div>
            <button
              onClick={() => setAiScanResult(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* 3 Inline AI Succession Metrics */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#3451D1]/15 pt-3.5">
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Probate Delay Without Will</span>
            <span className="font-extrabold text-sm text-[#DC2626] mt-0.5 block">14–22 Months</span>
            <span className="text-[10px] text-slate-500 font-medium">Bombay High Court Backlog</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Registered POA Protection</span>
            <span className="font-extrabold text-sm text-[#16A34A] mt-0.5 block">100% Validated</span>
            <span className="text-[10px] text-emerald-600 font-medium">Shagun Patel (BND-4029)</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#151B2B]/80 text-xs">
            <span className="block text-[10px] uppercase font-bold text-slate-400">Nomination Coverage</span>
            <span className="font-extrabold text-sm text-[#0D2266] dark:text-white mt-0.5 block">6 of 8 Accounts Updated</span>
            <span className="text-[10px] text-[#3451D1] font-medium">Mutual Funds & Demat Active</span>
          </div>
        </div>
      </div>

      {/* 2-Column: Registered POA & Nominee Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: General Power of Attorney Card */}
        <div className="lg:col-span-5">
          <BladeCard variant="default" className="p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Active Power of Attorney (POA)
              </span>
              <span className="rounded-[6px] bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-bold text-[#16A34A]">
                Officially Registered
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-500 font-medium">YOUR LEGAL CARETAKER IN INDIA:</div>
              <h4 className="text-base font-bold text-[#0C2340]">
                Shagun Patel (Family Trustee & Caretaker)
              </h4>
              <p className="text-xs font-normal text-slate-500">Prabhadevi, Mumbai 400025</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Registered At:</span>
                <span className="font-bold text-[#0C2340]">Bandra Sub-Registrar Office</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Document Number:</span>
                <span className="font-mono font-bold text-slate-800">BND-4029-2022</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Registered:</span>
                <span className="font-mono text-slate-700">14 October 2022</span>
              </div>
              <div className="border-t border-slate-200 pt-1.5">
                <span className="text-[11px] text-slate-500">
                  Authority Granted:
                </span>
                <span className="block mt-0.5 text-[11px] font-medium text-emerald-800">
                  Sign society papers, pay property tax, deal with municipal notices
                </span>
              </div>
            </div>

            <button
              onClick={() => alert("Downloading certified copy of registered Power of Attorney (PDF)")}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" />
              <span>Download Registered POA Deed (PDF)</span>
            </button>
          </BladeCard>
        </div>

        {/* Right: Nominee Matrix */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
            Who Inherits What? (Nominee Check)
          </h3>

          <BladeCard variant="default" className="p-0 overflow-hidden min-h-0">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Account / Asset</th>
                  <th className="px-4 py-3">Bank / Insurer</th>
                  <th className="px-4 py-3">Listed Nominee</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                <tr className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#0D2266] dark:text-white">NRE Savings</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">HDFC Bank</td>
                  <td className="px-5 py-3.5 text-slate-900 dark:text-slate-200 font-medium">Shagun Patel (Family - 100%)</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#16A34A] dark:text-emerald-400">
                    <span className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      <span>Safe</span>
                    </span>
                  </td>
                </tr>
                <tr className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#0D2266] dark:text-white">NRO Savings</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">State Bank of India</td>
                  <td className="px-5 py-3.5 text-slate-900 dark:text-slate-200 font-medium">Shagun Patel (Family)</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#A16207] dark:text-amber-400">
                    <span className="inline-flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Add Back-up</span>
                    </span>
                  </td>
                </tr>
                <tr className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#0D2266] dark:text-white">Old Savings</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">Bank of Baroda</td>
                  <td className="px-5 py-3.5 text-[#DC2626] font-bold">None Listed</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#DC2626]">
                    <span className="inline-flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Add Nominee</span>
                    </span>
                  </td>
                </tr>
                <tr className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#0D2266] dark:text-white">Family Health Insurance</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">HDFC ERGO</td>
                  <td className="px-5 py-3.5 text-slate-900 dark:text-slate-200 font-medium">Shagun Patel (Family)</td>
                  <td className="px-5 py-3.5 text-right font-bold text-[#A16207] dark:text-amber-400">
                    <span className="inline-flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Add Back-up</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </BladeCard>
        </div>
      </div>

      {/* Lawyers Directory */}
      <div className="space-y-4">
        <h3 className="font-bold text-[16px] text-[#0C2340]">
          Verified Lawyers for NRIs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lawyers.map((lawyer, i) => (
            <BladeCard
              key={i}
              variant="interactive"
              className="space-y-4 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-[#0C2340]">{lawyer.name}</h4>
                <div className="text-xs text-blue-600 font-bold">{lawyer.firm}</div>
                <div className="mt-1 text-[11px] font-normal text-slate-500">{lawyer.location} • {lawyer.experience} experience</div>
                <p className="mt-2 text-xs font-normal text-slate-600 leading-relaxed">{lawyer.specialization}</p>
              </div>
              <button
                onClick={() => alert(`Consultation request submitted for ${lawyer.name}. A zoom link will be sent to your email.`)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
              >
                <PhoneCall className="h-3.5 w-3.5 text-blue-600" />
                <span>Book 30-Min Video Call</span>
              </button>
            </BladeCard>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isConsultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-[#0C2340]">Create Your Indian Will Online</h4>
            <p className="text-xs text-slate-600">
              DeshBoard will automatically put together your Mumbai flat details, bank account numbers, and stock folios into a legally binding Will valid in both India and the US.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConsultOpen(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Your asset schedule has been sent to our legal partner.");
                  setIsConsultOpen(false);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm"
              >
                Start Will Questionnaire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
