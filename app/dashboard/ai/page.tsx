"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  BrainCircuit,
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
    title: "Succession & Probate Legal Scan",
    desc: "Assess Bombay High Court probate exposure and Power of Attorney validity.",
    query:
      "What is my legal probate exposure in Maharashtra without a registered Indian Will?",
  },
  {
    title: "IEPF Unclaimed Recovery Dossier",
    desc: "Check MCA IEPF-5 recovery status for old dividend and physical share folios.",
    query:
      "Outline the step-by-step IEPF Form 5 restitution workflow for my ₹1.18 Lakhs in unclaimed shares.",
  },
];

const PREPARED_RESPONSES: Record<
  string,
  {
    text: string;
    citations: string[];
    actionLinks?: { label: string; href: string }[];
    highlightMetrics?: { label: string; value: string; change?: string }[];
  }
> = {
  dividend: {
    text: `### DTAA Article 10 Sovereign Tax Assessment\n\nUnder the **India-US Double Tax Avoidance Agreement (DTAA)** Article 10(2), dividend distributions from Indian entities to a US tax resident are subject to a capped treaty withholding rate of **15%**, as opposed to the standard domestic non-resident rate of 20% (plus surcharge and cess under Section 115A).\n\n1. **Withholding Offset**: You can claim a direct dollar-for-dollar **Foreign Tax Credit (FTC)** on IRS Form 1116 against your California Federal income tax.\n2. **Estimated Recovery**: On your projected Indian dividend income of ₹2,40,000, treaty calibration saves approximately **₹12,480** in excess withholding.\n3. **Prerequisite**: A certified Form 10F and Tax Residency Certificate (TRC) issued by the US IRS must be filed with your Indian depository.`,
    citations: [
      "India-US DTAA (Article 10 - Dividends)",
      "Section 90(2) & Section 115A, Indian Income Tax Act 1961",
      "IRS Form 1116 (Foreign Tax Credit)",
    ],
    highlightMetrics: [
      { label: "Treaty Cap Rate", value: "15.0%", change: "vs 20% + Cess" },
      { label: "Form 1116 Credit", value: "100%", change: "Direct Offset" },
    ],
    actionLinks: [
      { label: "View Tax Optimization", href: "/dashboard/tax" },
      { label: "Check Demat Folios", href: "/dashboard/investments" },
    ],
  },
  property: {
    text: `### Oberoi Woods Repatriation & Form 15CA/15CB Simulation\n\nFor your **Oberoi Woods Flat 4B, Goregaon East** (Indicative Valuation: ₹1.12 Cr, Acquired 2018 at ₹78L):\n\n1. **Capital Gain Classification**: Long-Term Capital Asset (> 24 months holding). Eligible for indexation benefit up to FY 2024.\n2. **Section 195 Withholding**: The buyer is statutorily required to deduct 20% TDS (plus surcharge) unless a **Section 197 Nil/Lower TDS Certificate** is obtained from the Mumbai Jurisdictional Assessing Officer.\n3. **FEMA Repatriation Pipeline**: Sale proceeds must be credited to your **NRO Account** first. Outward remittance to the US is fully permitted up to **$1,000,000 USD per financial year** under the RBI Liberalised Remittance Scheme (LRS) via Form 15CA (online submission) and Form 15CB (CA certification).`,
    citations: [
      "RBI FEMA Master Direction No. 13/2015-16 (Remittance of Assets)",
      "Section 195 & Section 197, Indian Income Tax Act 1961",
      "CBDT Rule 37BB (Form 15CA & Form 15CB)",
    ],
    highlightMetrics: [
      { label: "FEMA Annual Cap", value: "$1,000,000", change: "USD / FY" },
      { label: "Form 15CB Protocol", value: "CA Verified", change: "Section 195" },
    ],
    actionLinks: [
      { label: "Inspect Property Records", href: "/dashboard/property" },
      { label: "Simulate Outward Remittance", href: "/dashboard/income" },
    ],
  },
  will: {
    text: `### Succession Exposure & Maharashtra Probate Analysis\n\n1. **Jurisdictional Rule**: Under Section 57 and Section 213 of the **Indian Succession Act, 1925**, any immovable property located within the ordinary original civil jurisdiction of the **Bombay High Court** (including Mumbai Suburban district where Goregaon is situated) statutorily requires a **Probate** if devised under a Will.\n2. **Intestate Risk**: In the absence of a registered Will, your 50% undivided share in Oberoi Woods Flat 4B and Nagpur Farmland is governed by the **Hindu Succession Act, 1956 (Class-I Heirs)**, requiring legal heirship certificates from local civil courts.\n3. **Power of Attorney Caution**: A General Power of Attorney automatically extinguishes upon demise and cannot be utilized for post-life asset transfer.`,
    citations: [
      "Sections 57 & 213, Indian Succession Act 1925",
      "Sections 8 & 10, Hindu Succession Act 1956",
      "Bombay High Court Original Side Rules (Probate)",
    ],
    highlightMetrics: [
      { label: "Probate Mandatory", value: "Yes", change: "Mumbai Suburbs" },
      { label: "Intestate Risk", value: "High", change: "Class-I Heirs" },
    ],
    actionLinks: [{ label: "View Will Registry", href: "/dashboard/will" }],
  },
  iepf: {
    text: `### IEPF Form 5 Restitution Roadmap\n\nYour portfolio holds approximately **₹1,18,400** in unclaimed assets, including ₹64,200 in 120 equity shares transferred to the **Investor Education and Protection Fund (IEPF)** under Section 124(6) of the Companies Act 2013.\n\n1. **MCA IEPF-5 Filing**: Submit electronic Form IEPF-5 on the Ministry of Corporate Affairs portal.\n2. **Physical Verification Docket**: Submit notarized indemnity bond, original share certificates, and CKYC client master list (CML) to the company's Registrar & Transfer Agent (RTA).\n3. **Direct Demat Credit**: Shares and accrued dividends are restored directly into your designated PINS NRE Demat account.`,
    citations: [
      "Section 124(6), Companies Act 2013",
      "IEPF (Accounting, Audit, Transfer and Refund) Rules, 2016",
    ],
    highlightMetrics: [
      { label: "Traceable Capital", value: "₹1,18,400", change: "Recoverable" },
      { label: "Restitution Time", value: "60-90 Days", change: "MCA RTA Cycle" },
    ],
    actionLinks: [{ label: "Track IEPF Dossier", href: "/dashboard/forgotten" }],
  },
  default: {
    text: `### Sovereign Cross-Border Analysis\n\nI have scanned your portfolio against relevant Indian and international tax frameworks:\n\n1. **Tax Residency**: Validated under Indian Section 6(1) and US Substantial Presence Test.\n2. **FEMA Compliance**: All bank accounts verified for non-resident status.\n3. **Repatriation Clearance**: Proceeds eligible for outward remittance under Form 15CA/CB protocols.`,
    citations: [
      "RBI FEMA Regulations 2016",
      "Indian Income Tax Act 1961",
      "IRS FATCA Guidelines",
    ],
  },
};

export default function AiPage() {
  const { activeUser } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "assistant",
      timestamp: "Just now",
      text: `### DeshBoard Sovereign AI Intelligence Active\n\nWelcome ${activeUser.name}. I am calibrated with your live financial portfolio, cross-border tax residency (**${activeUser.taxResidency}**), and statutory compliance matrices across India, the US, UAE, and UK.\n\nSelect one of the strategic queries below or enter a specific statutory question.`,
      citations: [
        "RBI FEMA Master Direction 2016",
        "India-US DTAA Double Tax Treaty",
        "MCGM Property Tax Registry",
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (queryText?: string) => {
    const query = queryText || inputText;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: "Just now",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    const qLower = query.toLowerCase();
    let responseData = PREPARED_RESPONSES.default;
    if (
      qLower.includes("dividend") ||
      qLower.includes("dtaa") ||
      qLower.includes("tax") ||
      qLower.includes("1116")
    ) {
      responseData = PREPARED_RESPONSES.dividend;
    } else if (
      qLower.includes("property") ||
      qLower.includes("repatriat") ||
      qLower.includes("goregaon") ||
      qLower.includes("15ca")
    ) {
      responseData = PREPARED_RESPONSES.property;
    } else if (
      qLower.includes("will") ||
      qLower.includes("probate") ||
      qLower.includes("succession") ||
      qLower.includes("shagun")
    ) {
      responseData = PREPARED_RESPONSES.will;
    } else if (
      qLower.includes("iepf") ||
      qLower.includes("unclaimed") ||
      qLower.includes("l&t") ||
      qLower.includes("share")
    ) {
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
    }, 900);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3451D1] text-white">
              <BrainCircuit className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-bold text-[#0C2340]">
              DeshBoard AI Intelligence
            </h1>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-[#3451D1]">
              Cross-Border Advisor
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous legal, FEMA, DTAA tax, and repatriation intelligence calibrated for {activeUser.name}.
          </p>
        </div>

        <div className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-xs">
          Corridor: <strong className="text-[#0C2340]">{activeUser.location} ⇄ India</strong>
        </div>
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESET_PROMPTS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset.query)}
            className="text-left rounded-xl border border-slate-200 bg-white p-3.5 hover:border-[#3451D1] hover:bg-blue-50/20 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="font-bold text-xs text-[#0D2266] block leading-snug">
                {preset.title}
              </span>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {preset.desc}
              </p>
            </div>
            <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#3451D1]">
              <span>Run Analysis</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        ))}
      </div>

      {/* Main Conversation Container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#F8FAFC]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs shadow-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#0D2266] text-white"
                    : "bg-white border border-slate-200 text-slate-800"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-1.5 text-[10px] text-slate-400">
                  <span className="font-semibold uppercase tracking-wider">
                    {msg.sender === "user" ? activeUser.name : "DeshBoard Counsel"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {msg.sender === "assistant" && (
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="hover:text-slate-600 text-[10px] flex items-center gap-0.5"
                        title="Copy counsel"
                      >
                        {copiedId === msg.id ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Markdown text */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.text.split("\n\n").map((para, pIdx) => {
                    if (para.startsWith("### ")) {
                      return (
                        <h4
                          key={pIdx}
                          className="font-bold text-sm text-[#0D2266] border-b border-slate-100 pb-1 pt-0.5"
                        >
                          {para.replace("### ", "")}
                        </h4>
                      );
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>

                {/* Highlight Metrics */}
                {msg.highlightMetrics && (
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-2.5">
                    {msg.highlightMetrics.map((met, mIdx) => (
                      <div key={mIdx} className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                        <span className="text-[10px] font-semibold text-slate-500 block">
                          {met.label}
                        </span>
                        <div className="mt-0.5 flex items-baseline justify-between">
                          <span className="font-bold text-sm text-[#0D2266] font-mono">
                            {met.value}
                          </span>
                          {met.change && (
                            <span className="text-[10px] font-bold text-[#3451D1]">
                              {met.change}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Citations */}
                {msg.citations && (
                  <div className="mt-3 rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Statutory Authorities & DTAA Articles
                    </span>
                    <ul className="space-y-0.5">
                      {msg.citations.map((cite, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <Scale className="h-3 w-3 text-[#3451D1] shrink-0" />
                          <span>{cite}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Links */}
                {msg.actionLinks && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-2.5">
                    {msg.actionLinks.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-[#3451D1] hover:bg-[#3451D1] hover:text-white transition"
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

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-xs shadow-xs text-slate-500 flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-[#3451D1] animate-pulse" />
                <span>Scanning statutory cross-border provisions...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about DTAA foreign credit, Section 195 TDS, Form 15CA/CB, or Mumbai probate..."
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#3451D1] focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="flex items-center gap-1.5 rounded-xl bg-[#3451D1] hover:bg-[#1D3FAD] text-white px-5 py-2.5 text-xs font-bold transition disabled:opacity-50 shadow-xs"
            >
              <span>Send</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
