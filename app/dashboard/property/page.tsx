"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Check,
  ShieldAlert,
  Download,
  Eye,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_PROPERTIES } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { BladeActionCard } from "@/components/ui/BladeActionCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function PropertyPage() {
  const { totalRealEstateINR, currency } = useApp();
  const [selectedProperty, setSelectedProperty] = useState(DEMO_PROPERTIES[0]);
  const [activeDocPreview, setActiveDocPreview] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            Properties & Land Records
          </h1>
          <p className="text-xs text-slate-500">
            Ownership documents, property tax receipts, rental income, and family co-owners
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Downloading all verified sale deeds and tax receipts (ZIP)")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-blue-600" />
            <span>Download All Property Deeds (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BladeStatCard
          label="Total Property Valuation"
          value={currency === "INR" ? formatINR(totalRealEstateINR) : formatUSD(totalRealEstateINR)}
          subtitle="Mumbai Flat (₹1.12 Cr) + Nagpur Land (₹35 Lakhs)"
          trend={{ direction: "up", text: "+11.4% appreciation" }}
        />

        <BladeStatCard
          label="Monthly Rent Received"
          value="₹30,000 / mo"
          subtitle="Oberoi Flat 4B (Lease active till Aug 2026)"
          trend={{ direction: "up", text: "Paid on 1st" }}
        />

        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Boundary Check
              </span>
              <StatusBadge status="warning" label="1 Dispute" />
            </div>
            <div className="mt-2 text-[32px] font-extrabold text-[#0C2340] leading-tight font-sans">
              1 Pending
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs font-normal text-amber-700">
            Nagpur 2.4-Acre Farmland Neighbor Boundary
          </div>
        </BladeCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Property List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
            Your Properties in India (2)
          </h3>

          {DEMO_PROPERTIES.map((prop) => (
            <BladeCard
              key={prop.id}
              variant="interactive"
              onClick={() => setSelectedProperty(prop)}
              className={`p-5 space-y-3 cursor-pointer ${
                selectedProperty.id === prop.id
                  ? "border-blue-600 bg-blue-50/20"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                    {prop.type}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-[#0C2340]">{prop.title}</h4>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{prop.city}, {prop.state}</span>
                  </div>
                </div>

                <StatusBadge
                  status={prop.encumbranceStatus === "clear" ? "active" : "warning"}
                  label={prop.encumbranceStatus === "clear" ? "Title Clear" : "Check Needed"}
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="font-mono text-sm font-bold text-[#0C2340]">
                  {formatINR(prop.currentValuation)}
                </span>
                <span className="text-slate-500">{prop.area}</span>
              </div>
            </BladeCard>
          ))}
        </div>

        {/* Right: Detailed Inspection */}
        <div className="lg:col-span-7">
          <BladeCard variant="default" className="p-6 space-y-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Purchased in {selectedProperty.purchaseYear}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    Growth: +{(((selectedProperty.currentValuation - selectedProperty.purchasePrice) / selectedProperty.purchasePrice) * 100).toFixed(1)}%
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-[#0C2340]">
                  {selectedProperty.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600">{selectedProperty.location}</p>
              </div>

              {selectedProperty.alertMessage && (
                <BladeActionCard
                  module="PROPERTY"
                  severity="warning"
                  title="Boundary Dispute Notice"
                  description={selectedProperty.alertMessage}
                  ctaText="Contact Local Lawyer in Nagpur"
                  onCtaClick={() => alert("Connecting you with our local lawyer in Nagpur")}
                />
              )}

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
                <div className="font-bold text-[#0C2340]">Who Owns This Property:</div>
                <div className="space-y-1">
                  {selectedProperty.coOwners.map((owner, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-700">
                      <span>{owner}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>On Official Deed</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0C2340]">
                    Verified Property Documents ({selectedProperty.documents.length})
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">Digital Copies Available</span>
                </div>

                <div className="space-y-2">
                  {selectedProperty.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-slate-800">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => setActiveDocPreview(doc.name)}
                        className="flex items-center gap-1 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BladeCard>
        </div>
      </div>

      {activeDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-[#0C2340]">{activeDocPreview}</h4>
            <div className="h-64 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-500 text-xs">
              <FileText className="h-12 w-12 text-blue-600 mb-2" />
              <span>Verified Maharashtra Land Registry Extract</span>
              <span className="text-[10px] text-slate-400 mt-1">Official Government Record</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveDocPreview(null)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-blue-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
