"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Check,
  Download,
  Eye,
  CreditCard,
  Zap,
  Flame,
  Landmark,
  ExternalLink,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatUSD } from "@/lib/formatters";
import { DEMO_PROPERTIES, PropertyItem } from "@/lib/mockData";
import { BladeCard, BladeStatCard } from "@/components/ui/BladeCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ActionDueItem {
  id: string;
  type: "electricity" | "gas" | "tax";
  title: string;
  provider: string;
  accountNumber: string;
  propertyTitle: string;
  amountINR: number;
  dueDate: string;
  status: "unpaid" | "paid";
  paidOn?: string;
}

const INITIAL_ACTIONS_DUE: ActionDueItem[] = [
  {
    id: "act-elec-mumbai",
    type: "electricity",
    title: "Electricity Bill",
    provider: "Adani Electricity Mumbai",
    accountNumber: "Consumer #102938472",
    propertyTitle: "Flat 4B, Oberoi Woods, Mumbai",
    amountINR: 2450,
    dueDate: "28 Sep 2026 (Due in 6 days)",
    status: "unpaid",
  },
  {
    id: "act-gas-mumbai",
    type: "gas",
    title: "Gas Bill (Piped Natural Gas)",
    provider: "Mahanagar Gas Ltd (MGL)",
    accountNumber: "BP No. 90281746",
    propertyTitle: "Flat 4B, Oberoi Woods, Mumbai",
    amountINR: 680,
    dueDate: "04 Oct 2026 (Due in 12 days)",
    status: "unpaid",
  },
  {
    id: "act-tax-mumbai",
    type: "tax",
    title: "Municipal Property Tax (Half-Yearly)",
    provider: "Municipal Corporation of Greater Mumbai (MCGM)",
    accountNumber: "SAC #KW-04-9102-004",
    propertyTitle: "Flat 4B, Oberoi Woods, Mumbai",
    amountINR: 14200,
    dueDate: "10 Oct 2026 (Due in 18 days)",
    status: "unpaid",
  },
];

export default function PropertyPage() {
  const { totalRealEstateINR, currency } = useApp();
  const [properties] = useState<PropertyItem[]>(DEMO_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem>(DEMO_PROPERTIES[0]);
  const [actionsDue, setActionsDue] = useState<ActionDueItem[]>(INITIAL_ACTIONS_DUE);
  const [activeDocPreview, setActiveDocPreview] = useState<string | null>(null);

  const totalMonthlyRentINR = properties.reduce(
    (sum, p) => sum + (p.rentalStatus?.monthlyRent || 0),
    0
  );

  const pendingActionsCount = actionsDue.filter((a) => a.status === "unpaid").length;

  const handleMarkPaid = (actionId: string) => {
    setActionsDue((prev) =>
      prev.map((item) =>
        item.id === actionId
          ? {
              ...item,
              status: item.status === "unpaid" ? "paid" : "unpaid",
              paidOn: item.status === "unpaid" ? "Today via NetBanking" : undefined,
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">
            Properties & Land Records
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real estate holdings in India, indicative valuations, monthly rental income, and pending bills.
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

      {/* 4 Core Summary Metric Cards Requested by User */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Number of Properties */}
        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Number of Properties
              </span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                India Holdings
              </span>
            </div>
            <div className="mt-2 text-[32px] font-extrabold text-[#0C2340] leading-tight font-sans">
              {properties.length}
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-600">
            1 Residential Flat • 1 Land Parcel
          </div>
        </BladeCard>

        {/* Metric 2: Indicative Valuation */}
        <BladeStatCard
          label="Indicative Valuation"
          value={currency === "INR" ? formatINR(totalRealEstateINR) : formatUSD(totalRealEstateINR)}
          subtitle="Mumbai Flat (₹1.12 Cr) + Nagpur Land (₹35 L)"
          trend={{ direction: "up", text: "Estimated market value" }}
        />

        {/* Metric 3: Indicative Rental Value */}
        <BladeStatCard
          label="Indicative Rental Value"
          value={currency === "INR" ? `${formatINR(totalMonthlyRentINR)} / mo` : `${formatUSD(totalMonthlyRentINR)} / mo`}
          subtitle="₹3,60,000 / year • Oberoi Woods Flat 4B"
          trend={{ direction: "up", text: "Active lease through Aug 2026" }}
        />

        {/* Metric 4: Actions Due */}
        <BladeCard variant="stat" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Actions Due
              </span>
              <StatusBadge
                status={pendingActionsCount > 0 ? "warning" : "active"}
                label={pendingActionsCount > 0 ? `${pendingActionsCount} Bills Due` : "All Cleared"}
              />
            </div>
            <div className="mt-2 text-[32px] font-extrabold text-[#0C2340] leading-tight font-sans">
              {pendingActionsCount} Pending
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-amber-700 font-medium">
            Electricity, Gas, and Property Tax dues
          </div>
        </BladeCard>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ACTIONS DUE: Electricity Bill, Gas Bill, Property Taxes
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-[#0C2340]">
              Actions Due (Bills & Taxes)
            </h3>
            <p className="text-xs text-slate-500">
              Active utility and municipal tax accounts for your Indian properties.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Total Pending: <strong className="text-rose-600 font-mono">{formatINR(actionsDue.filter(a => a.status === "unpaid").reduce((s, a) => s + a.amountINR, 0))}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actionsDue.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                item.status === "paid"
                  ? "border-emerald-200 bg-emerald-50/30"
                  : "border-slate-200 bg-slate-50/70 hover:border-slate-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200">
                    {item.title}
                  </span>
                  {item.status === "paid" ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Paid
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      Due
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-xs font-bold text-[#0C2340]">{item.provider}</div>
                  <div className="text-[11px] font-mono text-slate-500">{item.accountNumber}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{item.propertyTitle}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-500">Amount Due:</span>
                    <span className="font-mono text-base font-extrabold text-[#0C2340]">
                      {formatINR(item.amountINR)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.status === "paid" ? (
                      <span className="text-emerald-700 font-medium">{item.paidOn}</span>
                    ) : (
                      item.dueDate
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleMarkPaid(item.id)}
                  className={`w-full rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    item.status === "paid"
                      ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      : "bg-[#3451D1] text-white hover:bg-[#1D3FAD] shadow-xs"
                  }`}
                >
                  {item.status === "paid" ? "Mark as Unpaid" : "Pay / Mark as Paid"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PROPERTIES LIST & INSPECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Properties List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
              Your Properties ({properties.length})
            </h3>
            <span className="text-xs text-slate-400">Select to view records</span>
          </div>

          {properties.map((prop) => (
            <BladeCard
              key={prop.id}
              variant="interactive"
              onClick={() => setSelectedProperty(prop)}
              className={`p-5 space-y-3 cursor-pointer ${
                selectedProperty.id === prop.id
                  ? "border-[#3451D1] bg-blue-50/20"
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

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Indicative Value</span>
                  <div className="font-mono text-sm font-bold text-[#0C2340]">
                    {formatINR(prop.currentValuation)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Indicative Rent</span>
                  <div className="font-mono text-sm font-bold text-emerald-700">
                    {prop.rentalStatus ? `${formatINR(prop.rentalStatus.monthlyRent)}/mo` : "Self-managed"}
                  </div>
                </div>
              </div>
            </BladeCard>
          ))}
        </div>

        {/* Right Column: Detailed Property Records */}
        <div className="lg:col-span-7">
          <BladeCard variant="default" className="p-6 space-y-6">
            <div className="space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Purchased in {selectedProperty.purchaseYear} • Area: {selectedProperty.area}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    Appreciation: +{(((selectedProperty.currentValuation - selectedProperty.purchasePrice) / selectedProperty.purchasePrice) * 100).toFixed(1)}%
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-[#0C2340]">
                  {selectedProperty.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600">{selectedProperty.location}</p>
              </div>

              {/* Property Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Indicative Valuation</span>
                  <span className="mt-1 block font-mono text-base font-extrabold text-[#0C2340]">
                    {formatINR(selectedProperty.currentValuation)}
                  </span>
                  <span className="text-[11px] text-slate-500">Bought for {formatINR(selectedProperty.purchasePrice)}</span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Indicative Rental Value</span>
                  <span className="mt-1 block font-mono text-base font-extrabold text-emerald-700">
                    {selectedProperty.rentalStatus ? `${formatINR(selectedProperty.rentalStatus.monthlyRent)}/mo` : "N/A"}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {selectedProperty.rentalStatus ? "Active Tenant" : "Self-managed"}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Title Status</span>
                  <span className="mt-1 block text-sm font-bold text-[#0C2340]">
                    {selectedProperty.encumbranceStatus === "clear" ? "Title Verified" : "Review Needed"}
                  </span>
                  <span className="text-[11px] text-slate-500">Maharashtra Revenue Records</span>
                </div>
              </div>

              {/* Co-Owners */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
                <div className="font-bold text-[#0C2340]">Registered Co-Owners:</div>
                <div className="space-y-1">
                  {selectedProperty.coOwners.map((owner, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-700">
                      <span>{owner}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Registered on Deed</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Documents */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0C2340]">
                    Property Documents ({selectedProperty.documents.length})
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

      {/* Document Preview Modal */}
      {activeDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-[#0C2340]">{activeDocPreview}</h4>
            <div className="h-64 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-500 text-xs">
              <FileText className="h-12 w-12 text-blue-600 mb-2" />
              <span>Official Maharashtra Land Registry Extract</span>
              <span className="text-[10px] text-slate-400 mt-1">Verified Government Record</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveDocPreview(null)}
                className="rounded-lg bg-[#3451D1] px-4 py-2 text-xs font-bold text-white hover:bg-[#1D3FAD] shadow-sm"
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
