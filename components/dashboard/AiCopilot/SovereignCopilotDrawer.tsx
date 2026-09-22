"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BrainCircuit,
  X,
  Send,
  ShieldCheck,
  Scale,
  FileText,
  Building2,
  Landmark,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useApp } from "@/lib/store";

interface Message {
  id: string;
  sender: "user" | "assistant";
  timestamp: string;
  text: string;
  citations?: string[];
  actionLinks?: { label: string; href: string }[];
  highlightMetrics?: { label: string; value: string; change?: string }[];
}

const PRESET_PROMPTS = [
  {
    title: "US-India DTAA Dividend Arbitrage",
    desc: "Calculate foreign tax credit (Form 1116) under Article 10 treaty rates.",
    query:
      "Analyze DTAA Article 10 dividend withholding rates for my Indian demat portfolio vs US IRS taxation.",
  },
  {
    title: "Goregaon Property Repatriation",
    desc: "Simulate Section 195 TDS & Form 15CA/15CB on Oberoi Woods sale.",
    query:
      "Simulate repatriation tax liability and Form 15CA/CB procedure for selling my Oberoi Woods property.",
  },
  {
    title: "Will & US-India Probate Conflicts",
    desc: "Harmonize California trust structures with Indian Succession Act 1925.",
    query:
      "Scan my digital will for cross-border probate bottlenecks between US Probate Courts and Bombay High Court.",
  },
  {
    title: "IEPF Claim Recovery Odds",
    desc: "Evaluate approval probability for ₹14.8L L&T unclaimed share folio.",
    query:
      "What are the approval odds and required affidavits for recovering my unclaimed L&T shares from IEPF?",
  },
];

const INITIAL_CONVERSATION: Message[] = [
  {
    id: "init-1",
    sender: "assistant",
    timestamp: "Just now",
    text: "Welcome to DeshBoard Sovereign Intelligence. I have synthesized your cross-jurisdictional portfolio across the United States (US IRS / FinCEN) and India (RBI / ITD / MCA).\n\nActive Profile: **Brijal Patel** (US Tax Resident, California) with Indian domicile ties in Goregaon, Mumbai. How may I assist your cross-border wealth governance today?",
    citations: [
      "RBI Master Direction No. 13/2015-16 (FEMA Compliance)",
      "US-India Double Taxation Avoidance Agreement (Article 10 & 11)",
      "FinCEN Form 114 (FBAR) Threshold Rule (31 CFR § 1010.350)",
    ],
    highlightMetrics: [
      { label: "Aggregate Indian Holdings", value: "₹1,84,73,500" },
      { label: "FBAR Exposure Limit", value: "$221,480", change: "Filing Mandated" },
      { label: "Potential DTAA Credits", value: "₹3,84,000", change: "Actionable" },
    ],
  },
];

const PREPARED_RESPONSES: Record<
  string,
  {
    text: string;
    citations: string[];
    actionLinks: { label: string; href: string }[];
    highlightMetrics?: { label: string; value: string; change?: string }[];
  }
> = {
  dividend: {
    text: "### Sovereign DTAA Analysis: US-India Dividend Arbitrage\n\n1. **Indian Domestic Withholding (Section 195)**:\n   Standard domestic rate for non-residents is **20% + surcharge (21.84%)** withheld at source by Indian listed corporations (Tata Motors, HDFC Bank, L&T).\n\n2. **Treaty Relief (Article 10, US-India DTAA)**:\n   Under Article 10(2)(b), the maximum withholding rate is capped at **25%** for portfolio dividends. However, because domestic rate (20%) is lower, 20% applies in India.\n\n3. **IRS Foreign Tax Credit (Form 1116)**:\n   Because you are in the 37% US Federal bracket + 9.3% CA State tax, the entire 20% Indian tax paid qualifies for a direct dollar-for-dollar Foreign Tax Credit on IRS Form 1116 (Passive Category Income).\n\n**Actionable Opportunity**: Obtaining an electronic Form 10F and Tax Residency Certificate (TRC Form 6166 from the IRS) enables zero-surcharge baseline withholding, preserving ₹3,84,000 in immediate cash flow.",
    citations: [
      "US-India DTAA Treaty Article 10 (Dividends)",
      "Indian Income Tax Act 1961 Section 90 & Section 195",
      "IRS Publication 514 (Foreign Tax Credit for Individuals)",
    ],
    actionLinks: [
      { label: "View Tax Optimization Suite", href: "/dashboard/tax" },
      { label: "Export FBAR & Form 1116 Pack", href: "/dashboard/tax" },
    ],
    highlightMetrics: [
      { label: "Withholding Arbitrage", value: "20.00%", change: "Direct FTC Eligible" },
      { label: "Net Cash Flow Retained", value: "₹3,84,000", change: "+14.2%" },
    ],
  },
  property: {
    text: "### Cross-Border Capital Gains & Repatriation: Oberoi Woods, Goregaon East\n\n1. **Valuation & Benchmark**:\n   - Current Fair Market Value: **₹1,65,00,000** (~₹34,000/sq.ft).\n   - Sub-Registrar Circle Rate: **₹1,38,50,000** (₹28,500/sq.ft). The transaction passes Section 50C compliance with zero deemed tax variance.\n\n2. **Withholding Tax (TDS Section 195)**:\n   Buyer is legally obligated to withhold **20% LTCG + applicable surcharge/cess (~23.92%)** on total gross sale value unless a **Section 197 Nil/Lower TDS Certificate** is pre-approved by the Jurisdictional International Tax Officer (Ward 3(1), Mumbai).\n\n3. **FEMA Repatriation Protocol**:\n   Under FEMA Regulation 13(B), sale proceeds from up to 2 residential properties are eligible for complete repatriation via **Form 15CA (Self Declaration) & Form 15CB (Chartered Accountant Certificate)** within the annual $1,000,000 USD LRS equivalent quota.",
    citations: [
      "FEMA (Remittance of Assets) Regulations 2016",
      "Income Tax Act Section 197 (Lower Deduction Certificate)",
      "Section 50C Stamp Duty Value Harmonization",
    ],
    actionLinks: [
      { label: "Inspect Property Asset Card", href: "/dashboard/property" },
      { label: "Initiate Form 15CB Draft", href: "/dashboard/tax" },
    ],
    highlightMetrics: [
      { label: "Net Repatriation Quota", value: "$1,000,000/yr", change: "Available" },
      { label: "Potential TDS Lockup", value: "₹39,46,800", change: "Mitigate with Form 197" },
    ],
  },
  will: {
    text: "### Sovereign Succession Scan: Cross-Border Probate Vulnerability\n\n1. **Conflict of Laws (Private International Law)**:\n   - Immovable Property (Goregaon Flat): Governed strictly by the *Lex Situs* (Law of the Land)—the **Indian Succession Act 1925**.\n   - Movable Assets (NRE/NRO Bank accounts, Demat): Governed by *Lex Domicilii* (California law for US residents).\n\n2. **Identified Risk - Ancillary Probate Delay**:\n   A US Living Trust or California Probate decree cannot directly transfer title of Mumbai real estate without obtaining **Letters of Administration or Probate confirmation from the Bombay High Court**, which historically entails a 14-22 month delay.\n\n3. **Recommended Structural Remedy**:\n   Execute a standalone **Sovereign India Will** specifically governing Indian immovable and demat assets, appointing your verified co-holder **Shagun Patel** as sole domestic executor with registered General Power of Attorney (POA).",
    citations: [
      "Indian Succession Act 1925 (Sections 57, 213, and 218)",
      "Bombay High Court Original Side Probate Rules 1980",
      "FEMA Notification No. FEMA 13(R)/2016-RB",
    ],
    actionLinks: [
      { label: "Review Digital Will Matrix", href: "/dashboard/will" },
      { label: "Verify POA Caretaker Status", href: "/dashboard/will" },
    ],
    highlightMetrics: [
      { label: "Probate Risk Index", value: "High (US Will)", change: "Resolve via Dual Will" },
      { label: "Succession Asset Shielding", value: "100%", change: "With Shagun Patel POA" },
    ],
  },
  iepf: {
    text: "### AI Claims Dossier: Larsen & Toubro Unclaimed Folio (IEPF Authority)\n\n1. **Asset Recovery Scope**:\n   - **350 Equity Shares of L&T Ltd.** (Current Value: ~₹12,42,500)\n   - **Accumulated Unclaimed Dividends (FY 2016-2023)**: ₹2,37,500\n   - Total Claim Liquidity: **₹14,80,000**.\n\n2. **Discrepancy Audit**:\n   The original share certificate lists shareholder as *'Brijal A. Patel'* whereas your validated Central PAN database records *'Brijal Arvind Patel'*. The MCA IEPF Authority will issue a defect notice without legal name-variance harmonization.\n\n3. **Approval Probability**:\n   - Current Raw Odds: 38.5%.\n   - Post-Dossier Odds: **94.2%** when accompanied by an IEPF Form 5 affidavit, attested PAN-Aadhaar linkage, and bank confirmation letter (Form ISR-2).",
    citations: [
      "Investor Education and Protection Fund Authority (Accounting, Audit, Transfer and Refund) Rules, 2016",
      "MCA Notification G.S.R. 571(E) IEPF-5 Verification Procedure",
      "SEBI Master Circular on Physical Securities Foliation SEBI/HO/MIRSD/2023",
    ],
    actionLinks: [
      { label: "Open IEPF Recovery Console", href: "/dashboard/forgotten" },
      { label: "Generate AI Affidavit Draft", href: "/dashboard/forgotten" },
    ],
    highlightMetrics: [
      { label: "Unclaimed Valuation", value: "₹14,80,000", change: "Escrowed in IEPF" },
      { label: "Projected Admissibility", value: "94.2%", change: "High Confidence" },
    ],
  },
  default: {
    text: "### Sovereign Intelligence Analysis\n\nI have evaluated your query against active Indian financial regulations (FEMA 1999, RBI Circulars, ITD DTAA treaties) and US IRS international tax guidelines.\n\n**Key Strategic Summary**:\n- **Cross-Border Harmonization**: Both your US non-resident filing (IRS Form 1040 Schedule B) and Indian filing (ITR-2/ITR-3) must cross-reference foreign bank accounts under FBAR FinCEN 114 to prevent penalty exposure.\n- **Tax Residency Optimization**: Maintaining fewer than 182 days in India ensures your global income remains non-taxable in India under Section 6(1) of the Income Tax Act.\n- **Asset Liquidity**: Your NRE deposits (₹38,20,000) remain 100% tax-free and freely repatriable back to the US without FEMA approvals.\n\nPlease select any specific topic below to inspect deeper statutory workflows.",
    citations: [
      "Income Tax Act 1961 Section 6(1) NRI Residency Threshold",
      "RBI Master Direction on Non-Resident Accounts (FED Master Direction No. 5/2015-16)",
    ],
    actionLinks: [
      { label: "View Tax Center", href: "/dashboard/tax" },
      { label: "View Demat & Bank Accounts", href: "/dashboard/accounts" },
    ],
    highlightMetrics: [
      { label: "Indian Tax-Exempt Yield", value: "7.10% (NRE FD)", change: "Fully Repatriable" },
      { label: "Residency Compliance Status", value: "Non-Resident", change: "100% Compliant" },
    ],
  },
};

interface SovereignCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SovereignCopilotDrawer: React.FC<SovereignCopilotDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery,
}) => {
  const { activeUser } = useApp();
  const [messages, setMessages] = useState<Message[]>(INITIAL_CONVERSATION);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle external initial query triggers
  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSend = (overrideQuery?: string) => {
    const query = overrideQuery || inputValue;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      timestamp: "Just now",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!overrideQuery) setInputValue("");
    setIsTyping(true);

    // Determine matching prepared response
    const qLower = query.toLowerCase();
    let responseData = PREPARED_RESPONSES.default;
    if (qLower.includes("dividend") || qLower.includes("dtaa") || qLower.includes("tax") || qLower.includes("1116")) {
      responseData = PREPARED_RESPONSES.dividend;
    } else if (qLower.includes("property") || qLower.includes("repatriat") || qLower.includes("goregaon") || qLower.includes("15ca")) {
      responseData = PREPARED_RESPONSES.property;
    } else if (qLower.includes("will") || qLower.includes("probate") || qLower.includes("succession") || qLower.includes("shagun")) {
      responseData = PREPARED_RESPONSES.will;
    } else if (qLower.includes("iepf") || qLower.includes("unclaimed") || qLower.includes("l&t") || qLower.includes("share")) {
      responseData = PREPARED_RESPONSES.iepf;
    }

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        timestamp: "Just now",
        text: responseData.text,
        citations: responseData.citations,
        actionLinks: responseData.actionLinks,
        highlightMetrics: responseData.highlightMetrics,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1100);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
      />

      {/* Drawer Container */}
      <aside className="relative z-50 flex h-full w-full max-w-[540px] flex-col border-l border-[#E8E8E8] dark:border-white/[0.08] bg-[#F8FAFC] dark:bg-[#0E131F] shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="flex h-[70px] items-center justify-between border-b border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#121826] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3451D1] to-[#1D3FAD] text-white shadow-md">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[15px] tracking-tight text-[#0D2266] dark:text-white">
                  Sovereign AI Intelligence
                </h3>
                <span className="rounded-full bg-[#EEF2FF] dark:bg-blue-950/50 px-2 py-0.5 text-[10px] font-bold text-[#3451D1] border border-[#3451D1]/20">
                  Cross-Border Counsel
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                Calibrated for {activeUser?.name} (US-India Sovereign Corridor)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(INITIAL_CONVERSATION)}
              title="Reset Context"
              className="rounded-lg p-2 text-[#6B7280] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[#6B7280] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {/* Sender label & time */}
              <div className="mb-1.5 flex items-center gap-2 px-1 text-[11px] text-[#9CA3AF]">
                {msg.sender === "assistant" ? (
                  <>
                    <ShieldCheck className="h-3 w-3 text-[#3451D1]" />
                    <span className="font-semibold uppercase tracking-wider text-[#3451D1]">
                      DeshBoard Intelligence Engine
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {activeUser?.name}
                  </span>
                )}
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-[92%] rounded-2xl p-4 text-[13px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#0D2266] text-white"
                    : "border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#151B2B] text-slate-800 dark:text-slate-200"
                }`}
              >
                {/* Copy button */}
                {msg.sender === "assistant" && (
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 rounded p-1 text-[#9CA3AF] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}

                {/* Formatted Text */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.text.split("\n\n").map((para, idx) => {
                    if (para.startsWith("### ")) {
                      return (
                        <h4
                          key={idx}
                          className="font-bold text-[14px] text-[#0D2266] dark:text-white border-b border-[#F0F0F0] dark:border-white/[0.06] pb-1.5 pt-1"
                        >
                          {para.replace("### ", "")}
                        </h4>
                      );
                    }
                    return (
                      <p key={idx} className="leading-relaxed">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Highlight Metrics */}
                {msg.highlightMetrics && msg.highlightMetrics.length > 0 && (
                  <div className="mt-3.5 grid grid-cols-2 gap-2 border-t border-[#F0F0F0] dark:border-white/[0.06] pt-3">
                    {msg.highlightMetrics.map((met, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-[#F8FAFC] dark:bg-white/[0.02] p-2.5"
                      >
                        <span className="block text-[10px] font-semibold text-[#6B7280] dark:text-slate-400">
                          {met.label}
                        </span>
                        <div className="mt-0.5 flex items-baseline justify-between">
                          <span className="font-extrabold text-[14px] text-[#0D2266] dark:text-white">
                            {met.value}
                          </span>
                          {met.change && (
                            <span className="text-[10px] font-bold text-[#3451D1] dark:text-blue-400">
                              {met.change}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Citations Box */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3.5 rounded-xl border border-[#E8E8E8] dark:border-white/[0.06] bg-[#F8FAFC] dark:bg-white/[0.02] p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-slate-400 mb-1.5">
                      Statutory Citations & Treaty Authorities
                    </span>
                    <ul className="space-y-1">
                      {msg.citations.map((cite, cIdx) => (
                        <li
                          key={cIdx}
                          className="flex items-center gap-1.5 text-[11px] text-[#475569] dark:text-slate-300"
                        >
                          <Scale className="h-3 w-3 text-[#3451D1] shrink-0" />
                          <span>{cite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Links */}
                {msg.actionLinks && msg.actionLinks.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-2 border-t border-[#F0F0F0] dark:border-white/[0.06] pt-3">
                    {msg.actionLinks.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        href={link.href}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#3451D1] bg-[#EEF2FF] dark:bg-blue-950/40 px-3 py-1.5 text-[11px] font-bold text-[#3451D1] dark:text-blue-300 hover:bg-[#3451D1] hover:text-white transition-all"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start w-full max-w-[85%]">
              <div className="mb-2 text-[11px] font-semibold text-[#0D2266] dark:text-slate-300 flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5 text-[#3451D1]" />
                <span>Synthesizing cross-border statutory counsel...</span>
              </div>
              <div className="w-full rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#151B2B] p-3.5 shadow-xs">
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3451D1] to-[#1D3FAD] rounded-full w-2/3 animate-pulse" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Reconciling ITD & IRS treaty precedents</span>
                  <span className="font-mono">Processing</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="border-t border-[#E8E8E8] dark:border-white/[0.08] bg-white/70 dark:bg-[#121826]/70 p-4 backdrop-blur-sm">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">
            Suggested Cross-Border Inquiries
          </span>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="text-left rounded-xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#151B2B] p-2 hover:border-[#3451D1] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] transition-all group"
              >
                <span className="block text-[11px] font-bold text-[#0D2266] dark:text-white group-hover:text-[#3451D1] transition-colors truncate">
                  {p.title}
                </span>
                <span className="block text-[10px] text-[#6B7280] dark:text-slate-400 truncate mt-0.5">
                  {p.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#121826] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about DTAA, FBAR, FEMA, Goregaon property, or will..."
                className="w-full rounded-xl border border-[#E8E8E8] dark:border-white/[0.1] bg-[#F8FAFC] dark:bg-white/[0.03] px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-[#9CA3AF] focus:border-[#3451D1] focus:outline-none focus:ring-1 focus:ring-[#3451D1] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3451D1] text-white shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1D3FAD] transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] text-[#9CA3AF]">
            <span>Secured via DeshBoard Sovereign Financial Engine</span>
            <span>Press ↵ to send</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
