"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  PhoneCall,
  Download,
  Check,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { BladeCard } from "@/components/ui/BladeCard";
import { BladeActionCard } from "@/components/ui/BladeActionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function WillPage() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

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
                Ramesh Mehta (Father)
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
                  <td className="px-5 py-3.5 text-slate-900 dark:text-slate-200 font-medium">Priya Mehta (Wife - 100%)</td>
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
                  <td className="px-5 py-3.5 text-slate-900 dark:text-slate-200 font-medium">Ramesh Mehta (Father)</td>
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
                  <td className="px-5 py-3.5 text-slate-900 dark:text-slate-200 font-medium">Ramesh Mehta (Father)</td>
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
              DeshVault will automatically put together your Mumbai flat details, bank account numbers, and stock folios into a legally binding Will valid in both India and the US.
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
