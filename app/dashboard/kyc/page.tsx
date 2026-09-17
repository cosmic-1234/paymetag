"use client";

import React, { useState } from "react";
import {
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Video,
  Check,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { VideoKycModal } from "@/components/dashboard/Modals/VideoKycModal";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function KycPage() {
  const { kycList, activeUser } = useApp();
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

  const verifiedCount = kycList.filter((k) => k.ckycStatus === "verified").length;
  const issuesCount = kycList.length - verifiedCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            Identity & Bank KYC Check
          </h1>
          <p className="text-xs text-slate-500">
            Check which banks have verified your identity and renew overdue accounts with a quick 2-minute video call
          </p>
        </div>
      </div>

      {/* CKYC Card & Summary Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* CKYC Card */}
        <div className="lg:col-span-5">
          <BladeCard variant="default" className="p-6 space-y-6 bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Government of India Central ID
                </span>
                <Fingerprint className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  CENTRAL KYC NUMBER (KIN)
                </span>
                <div className="font-mono text-xl font-extrabold tracking-widest text-[#0C2340]">
                  4002 9104 9281 04
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 font-medium">NAME</span>
                  <div className="font-bold text-[#0C2340]">{activeUser.name}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-medium">PAN CARD</span>
                  <div className="font-mono font-bold text-[#0C2340]">{activeUser.pan}</div>
                </div>
              </div>
            </div>
          </BladeCard>
        </div>

        {/* Status Metrics */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BladeStatCard
            label="Verified Banks & Brokers"
            value={`${verifiedCount} of ${kycList.length}`}
            subtitle="HDFC, Demat stocks, mutual funds active"
            trend={{ direction: "up", text: "Verified" }}
          />

          <BladeCard variant="stat" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                  Action Required
                </span>
                <StatusBadge status="critical" label="1 Video Call" />
              </div>
              <div className="mt-2 text-[32px] font-extrabold text-[#0C2340] leading-tight font-sans">
                {issuesCount} Bank
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-normal text-rose-600">
              SBI periodic renewal overdue
            </div>
          </BladeCard>
        </div>
      </div>

      {/* Table */}
      <BladeCard variant="default" className="p-0 overflow-hidden min-h-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Bank / Company</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Last Checked</th>
                <th className="px-5 py-3.5">Next Renewal</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kycList.map((k) => (
                <tr key={k.institution} className="odd:bg-white dark:odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4 font-bold text-[#0C2340]">
                    {k.institution}
                    {k.issueDetails && (
                      <div className="text-[11px] font-normal text-rose-600 mt-0.5">
                        {k.issueDetails}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600 font-semibold text-[11px]">
                      {k.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-500">{k.lastVerified}</td>
                  <td className="px-5 py-4 font-mono text-slate-700">{k.expiryOrDue}</td>
                  <td className="px-5 py-4 text-center">
                    {k.ckycStatus === "verified" ? (
                      <StatusBadge status="active" label="Verified" />
                    ) : k.ckycStatus === "expired" ? (
                      <StatusBadge status="critical" label="Overdue" />
                    ) : (
                      <StatusBadge status="warning" label="Due Soon" />
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {k.ckycStatus !== "verified" ? (
                      <button
                        onClick={() => setSelectedInstitution(k.institution)}
                        className="inline-flex items-center gap-1 rounded-xl bg-[#3451D1] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#1D3FAD] transition shadow-sm ml-auto cursor-pointer"
                      >
                        <Video className="h-3.5 w-3.5" />
                        <span>Start Video Call</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" />
                        <span>Up to date</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BladeCard>

      <VideoKycModal
        isOpen={!!selectedInstitution}
        onClose={() => setSelectedInstitution(null)}
        institutionName={selectedInstitution || undefined}
      />
    </div>
  );
}
