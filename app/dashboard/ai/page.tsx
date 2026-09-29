"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  BrainCircuit,
  Send,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Building2,
  TrendingUp,
  FileSpreadsheet,
  Search,
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
    title: "Send Money Abroad",
    icon: Building2,
    desc: "How to sell Indian property & transfer funds to US bank.",
    query:
      "How do I sell my Oberoi Woods property and transfer the sale proceeds to my US bank account?",
  },
  {
    title: "Save US Tax on Dividends",
    icon: TrendingUp,
    desc: "How the US-India tax treaty saves tax on your demat stocks.",
    query:
      "How does the US-India DTAA treaty help me save tax on my Indian stock dividends?",
  },
  {
    title: "Indian Will & Caretaker",
    icon: FileSpreadsheet,
    desc: "How to protect your Mumbai flat & family assets in India.",
    query:
      "Do I need an Indian Will for my Mumbai flat, and how can I appoint a family caretaker?",
  },
  {
    title: "Claim Lost Indian Shares",
    icon: Search,
    desc: "Recover ₹1.18 Lakhs in unclaimed dividends and shares.",
    query:
      "How can I easily claim my forgotten Infosys dividends and shares?",
  },
];

const PREPARED_RESPONSES: Record<
  string,
  {
    text: string;
    actionLinks?: { label: string; href: string }[];
    highlightMetrics?: { label: string; value: string; change?: string }[];
  }
> = {
  property: {
    text: `### Selling Property & Sending Money to the US (Step-by-Step)

For your **Oberoi Woods Flat 4B in Mumbai** (Valuation: ~₹1.12 Cr):

1. **Keep More of Your Money (Lower TDS)**:
   - Usually buyers deduct 20% tax upfront from NRIs. You can apply for a **Lower TDS Certificate (Form 13)** through the income tax portal to reduce this to your actual profit tax (often ~3% to 5%).

2. **Money Deposited into NRO Account**:
   - The sale proceeds from an Indian property must first be deposited into your Indian **NRO Bank Account**.

3. **Transfer to Your US Bank (Form 15CA & 15CB)**:
   - Under RBI rules, you are legally allowed to send up to **$1,000,000 USD every financial year** back to your US bank.
   - Your Indian Chartered Accountant (CA) issues a simple certificate (Form 15CB), you fill Form 15CA online, and your bank (HDFC/ICICI) wires the US dollars directly to your US account.`,
    highlightMetrics: [
      { label: "Annual Transfer Limit", value: "$1,000,000", change: "USD / Year" },
      { label: "Typical CA Timeline", value: "3 - 5 Days", change: "Form 15CB" },
    ],
    actionLinks: [
      { label: "View Property Details", href: "/dashboard/property" },
      { label: "Check Money Transfer Calculator", href: "/dashboard/income" },
    ],
  },
  dividend: {
    text: `### Saving US Tax on Your Indian Dividends (US-India DTAA)

Because you live in California and pay US taxes, you qualify for the **US-India Double Tax Treaty (Article 10)**:

1. **Lower Indian Tax Rate (15% instead of 20%)**:
   - The treaty caps Indian dividend withholding tax at **15%**. This saves you approximately **₹12,480** every year on your dividend income.

2. **Claim It on Your US Tax Return (Form 1116)**:
   - Any tax paid in India can be claimed dollar-for-dollar as a **Foreign Tax Credit (FTC)** on your US Form 1040 (via Form 1116). You will not be double-taxed!

3. **What You Need to Do**:
   - Submit a simple **Form 10F** and a US IRS Tax Residency Certificate (TRC) to your Indian broker (Zerodha/HDFC Securities) so they deduct only 15%.`,
    highlightMetrics: [
      { label: "Treaty Tax Rate", value: "15%", change: "vs 20% Standard" },
      { label: "US Tax Credit", value: "100%", change: "No Double Tax" },
    ],
    actionLinks: [
      { label: "View Tax Credits", href: "/dashboard/tax" },
      { label: "Check Stock Portfolio", href: "/dashboard/investments" },
    ],
  },
  will: {
    text: `### Protecting Your Indian Assets (Will & Succession)

1. **Why You Need an Indian Will**:
   - In Maharashtra (Mumbai), any property passed down requires a court **Probate** if disputed.
   - Having a clear, registered Indian Will ensures your Oberoi Woods flat and bank accounts pass smoothly to your spouse or children without court delays.

2. **Appointing a Family Caretaker (Power of Attorney)**:
   - Your registered General Power of Attorney with **Shagun Patel** allows her to sign utility documents, inspect physical boundaries, and attend society meetings while you are in the US.
   - Note: Power of Attorney is valid only during your lifetime; a Will handles inheritance.`,
    highlightMetrics: [
      { label: "Protected Assets", value: "₹1.85 Cr", change: "Mumbai & Land" },
      { label: "Caretaker Assigned", value: "Shagun Patel", change: "Active GPA" },
    ],
    actionLinks: [
      { label: "View Will & Caretaker Registry", href: "/dashboard/will" },
      { label: "See Property Records", href: "/dashboard/property" },
    ],
  },
  iepf: {
    text: `### Claiming Forgotten Shares & Dividends (₹1.18 Lakhs)

We found **₹1,18,400** in unclaimed money linked to your PAN, including 120 old Infosys shares transferred to the government's IEPF authority:

1. **Submit Online Claim Form**:
   - An online claim is submitted to government registries using your PAN.

2. **Verify Documents**:
   - Submit your PAN, Aadhaar, and bank statement to the company's registrar.

3. **Direct Credit to Your Demat**:
   - The recovered shares and cash dividends will be deposited straight into your active NRE Demat account.`,
    highlightMetrics: [
      { label: "Claimable Amount", value: "₹1,18,400", change: "100% Recoverable" },
      { label: "Time to Credit", value: "60 Days", change: "Direct to Demat" },
    ],
    actionLinks: [
      { label: "Open Lost Money Claim", href: "/dashboard/forgotten" },
    ],
  },
  default: {
    text: `### Quick Summary of Your Indian Wealth

Here is a quick look at your profile:
- **Total Indian Net Worth**: ₹2.69 Crores (~$324,000 USD)
- **Primary Assets**: Mumbai Oberoi Woods flat (₹1.12 Cr), 6 bank accounts across HDFC, SBI, Axis, ICICI, BoB, and Kotak (₹64.6L), and Demat investments (₹25L).
- **Key Action Needed**: 1 dormant resident account can be converted to NRO with one click, and an SBI video KYC is ready to complete.

How else can I help you today? You can ask about tax filing, repatriating money, or buying property.`,
    actionLinks: [
      { label: "Go to Dashboard Overview", href: "/dashboard" },
      { label: "View Bank Accounts", href: "/dashboard/accounts" },
    ],
  },
};

export default function AiPage() {
  const { activeUser } = useApp();
  const userName = activeUser?.name || "Brijal";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      sender: "assistant",
      timestamp: "Just now",
      text: `### Hi ${userName}! 👋 I'm Sovereign AI, your NRI Financial Assistant

I'm connected to your Indian wealth overview (bank accounts, Oberoi Woods property, demat stocks, and retirement funds). 

Feel free to ask any question in simple terms, or tap one of the common topics above to get started!`,
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
      qLower.includes("stock") ||
      qLower.includes("tax") ||
      qLower.includes("save")
    ) {
      responseData = PREPARED_RESPONSES.dividend;
    } else if (
      qLower.includes("property") ||
      qLower.includes("repatriat") ||
      qLower.includes("flat") ||
      qLower.includes("oberoi") ||
      qLower.includes("sell") ||
      qLower.includes("send money") ||
      qLower.includes("transfer")
    ) {
      responseData = PREPARED_RESPONSES.property;
    } else if (
      qLower.includes("will") ||
      qLower.includes("probate") ||
      qLower.includes("inherit") ||
      qLower.includes("caretaker") ||
      qLower.includes("poa")
    ) {
      responseData = PREPARED_RESPONSES.will;
    } else if (
      qLower.includes("iepf") ||
      qLower.includes("unclaimed") ||
      qLower.includes("lost") ||
      qLower.includes("shares") ||
      qLower.includes("recover")
    ) {
      responseData = PREPARED_RESPONSES.iepf;
    }

    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        timestamp: "Just now",
        text: responseData.text,
        actionLinks: responseData.actionLinks,
        highlightMetrics: responseData.highlightMetrics,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Friendly Header (Goinri Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0D2266] to-[#3451D1] text-white shadow-md">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0D2266] dark:text-white">
                Sovereign AI
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                NRI Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Clear, friendly answers for your Indian investments, taxes, and money transfers.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 bg-white dark:bg-[#1A1F2E] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 self-start sm:self-auto shadow-2xs font-medium">
          🇺🇸 San Jose, CA ↔ 🇮🇳 India
        </div>
      </div>

      {/* 4 Simple, Friendly Question Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRESET_PROMPTS.map((p, idx) => {
          const Icon = p.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#1A1F2E] hover:border-[#3451D1]/60 hover:shadow-md hover:-translate-y-0.5 text-left transition-all duration-200 group cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-white/[0.08] text-[#3451D1] group-hover:bg-[#3451D1] group-hover:text-white transition-colors shrink-0">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#0D2266] dark:text-white group-hover:text-[#3451D1] transition-colors flex items-center justify-between">
                  <span>{p.title}</span>
                  <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-[#3451D1] group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Canvas */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#1A1F2E] shadow-sm flex flex-col min-h-[420px]">
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[500px]">
          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3451D1] text-white shrink-0 shadow-2xs">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed ${
                    isUser
                      ? "bg-[#0D2266] text-white font-medium"
                      : "bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
                    {m.text}
                  </div>

                  {/* Highlight Metrics */}
                  {m.highlightMetrics && (
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60 dark:border-white/10">
                      {m.highlightMetrics.map((met, i) => (
                        <div
                          key={i}
                          className="bg-white dark:bg-white/[0.06] rounded-xl p-2.5 border border-slate-200/60 dark:border-white/10"
                        >
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            {met.label}
                          </div>
                          <div className="text-sm font-bold text-[#0D2266] dark:text-white mt-0.5">
                            {met.value}
                          </div>
                          {met.change && (
                            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                              {met.change}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct Action Links */}
                  {m.actionLinks && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200/60 dark:border-white/10">
                      {m.actionLinks.map((link, i) => (
                        <Link
                          key={i}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF2FF] dark:bg-blue-950/40 text-[#3451D1] dark:text-blue-300 font-bold text-xs hover:bg-blue-100 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Message Footer */}
                  {!isUser && (
                    <div className="mt-2.5 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3451D1] text-white shrink-0">
                <Sparkles className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] rounded-b-2xl">
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
              placeholder="Ask anything about taxes, sending money, or Indian investments..."
              className="flex-1 bg-white dark:bg-[#1A1F2E] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3451D1]/30 transition-all shadow-2xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#0D2266] to-[#3451D1] hover:from-[#132C7D] hover:to-[#254BD1] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer shrink-0"
              title="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
