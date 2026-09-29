"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  BrainCircuit,
  X,
  Send,
  Sparkles,
  ArrowRight,
  RefreshCw,
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
  actionLinks?: { label: string; href: string }[];
  highlightMetrics?: { label: string; value: string; change?: string }[];
}

const PRESET_PROMPTS = [
  {
    title: "Send Money Abroad",
    desc: "How to sell Indian property & transfer funds to US bank.",
    query:
      "How do I sell my Oberoi Woods property and transfer the sale proceeds to my US bank account?",
  },
  {
    title: "Save US Tax on Dividends",
    desc: "How the US-India tax treaty saves tax on your demat stocks.",
    query:
      "How does the US-India DTAA treaty help me save tax on my Indian stock dividends?",
  },
  {
    title: "Indian Will & Caretaker",
    desc: "How to protect your Mumbai flat & family assets in India.",
    query:
      "Do I need an Indian Will for my Mumbai flat, and how can I appoint a family caretaker?",
  },
  {
    title: "Claim Lost Indian Shares",
    desc: "Recover ₹1.18 Lakhs in unclaimed dividends and shares.",
    query:
      "How can I easily claim my forgotten Infosys dividends and shares from IEPF?",
  },
];

const INITIAL_CONVERSATION: Message[] = [
  {
    id: "init-1",
    sender: "assistant",
    timestamp: "Just now",
    text: "Hi Brijal! 👋 I'm Sovereign AI, your NRI Financial & Tax Assistant.\n\nI can help you understand your Indian portfolio, plan foreign tax credits in the US, or navigate sending money home.\n\nChoose a question below or ask anything!",
    highlightMetrics: [
      { label: "Total Indian Wealth", value: "₹2,69,23,900" },
      { label: "USD Value", value: "$324,200", change: "Synced" },
      { label: "Tax Treaty Savings", value: "₹12,480/yr", change: "Active" },
    ],
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
  dividend: {
    text: `### Saving US Tax on Your Indian Dividends (US-India DTAA)

Because you live in California and pay US taxes, you qualify for the **US-India Double Tax Treaty (Article 10)**:

1. **Lower Indian Tax Rate (15% instead of 20%)**:
   - The treaty caps Indian dividend tax at **15%**. This saves you approximately **₹12,480** every year on your dividend income.

2. **Claim It on Your US Tax Return (Form 1116)**:
   - Any tax paid in India can be claimed dollar-for-dollar as a **Foreign Tax Credit (FTC)** on your US Form 1040 (via Form 1116). You will not be double-taxed!

3. **What You Need to Do**:
   - Submit a simple **Form 10F** and an IRS Tax Residency Certificate to your Indian broker (Zerodha/HDFC Securities) so they deduct only 15%.`,
    highlightMetrics: [
      { label: "Treaty Tax Rate", value: "15%", change: "vs 20% Standard" },
      { label: "US Tax Credit", value: "100%", change: "No Double Tax" },
    ],
    actionLinks: [
      { label: "View Tax Credits", href: "/dashboard/tax" },
      { label: "Check Stock Portfolio", href: "/dashboard/investments" },
    ],
  },
  property: {
    text: `### Selling Property & Sending Money to the US (Step-by-Step)

For your **Oberoi Woods Flat 4B in Mumbai** (Valuation: ~₹1.12 Cr):

1. **Keep More of Your Money (Lower TDS)**:
   - Usually buyers deduct 20% tax upfront from NRIs. You can apply for a **Lower TDS Certificate (Form 13)** through the income tax portal to reduce this to your actual profit tax (often ~3% to 5%).

2. **Money Deposited into NRO Account**:
   - The sale proceeds from an Indian property must first be deposited into your Indian **NRO Bank Account**.

3. **Transfer to Your US Bank (Form 15CA & 15CB)**:
   - Under RBI rules, you are legally allowed to send up to **$1,000,000 USD every financial year** back to your US bank.
   - Your Indian Chartered Accountant (CA) issues a simple certificate (Form 15CB), you fill Form 15CA online, and your bank wires the US dollars directly to your US account.`,
    highlightMetrics: [
      { label: "Annual Transfer Limit", value: "$1,000,000", change: "USD / Year" },
      { label: "Typical CA Timeline", value: "3 - 5 Days", change: "Form 15CB" },
    ],
    actionLinks: [
      { label: "View Property Details", href: "/dashboard/property" },
      { label: "Check Money Transfer Calculator", href: "/dashboard/income" },
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

export const SovereignCopilotDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}> = ({ isOpen, onClose, initialQuery }) => {
  const { activeUser } = useApp();
  const [messages, setMessages] = useState<Message[]>(INITIAL_CONVERSATION);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle external query trigger
  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  const handleSend = (queryText?: string) => {
    const query = queryText || inputValue;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: "Just now",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
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
      setIsTyping(false);
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        timestamp: "Just now",
        text: responseData.text,
        actionLinks: responseData.actionLinks,
        highlightMetrics: responseData.highlightMetrics,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
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
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Container */}
      <aside className="relative z-50 flex h-full w-full max-w-[500px] flex-col border-l border-slate-200/80 dark:border-white/[0.08] bg-[#F8FAFC] dark:bg-[#0E131F] shadow-2xl transition-all duration-300">
        {/* Simple Friendly Header */}
        <div className="flex h-[66px] items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121826] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0D2266] to-[#3451D1] text-white shadow-sm">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[15px] tracking-tight text-[#0D2266] dark:text-white">
                  Sovereign AI
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  NRI Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Clear answers for your Indian wealth & taxes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMessages(INITIAL_CONVERSATION)}
              title="Reset Chat"
              className="rounded-lg p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              {/* Sender label */}
              <div className="mb-1 flex items-center gap-1.5 px-1 text-[11px] text-slate-400">
                {msg.sender === "assistant" ? (
                  <span className="font-semibold text-[#3451D1]">Sovereign AI</span>
                ) : (
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {activeUser?.name || "You"}
                  </span>
                )}
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`relative w-full rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                  msg.sender === "user"
                    ? "bg-[#0D2266] text-white font-medium"
                    : "border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#151B2B] text-slate-800 dark:text-slate-200"
                }`}
              >
                {/* Copy Button */}
                {msg.sender === "assistant" && (
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}

                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Highlight Metrics */}
                {msg.highlightMetrics && (
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/10 pt-3">
                    {msg.highlightMetrics.map((met, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] p-2.5"
                      >
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {met.label}
                        </span>
                        <div className="mt-0.5 flex items-baseline justify-between">
                          <span className="text-sm font-bold text-[#0D2266] dark:text-white">
                            {met.value}
                          </span>
                          {met.change && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              {met.change}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                {msg.actionLinks && msg.actionLinks.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 dark:border-white/10 pt-3">
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
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Sparkles className="h-4 w-4 text-[#3451D1] animate-spin" />
              <span>Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#121826] p-3.5">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Quick Questions
          </span>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="text-left rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#151B2B] p-2 hover:border-[#3451D1] hover:bg-white dark:hover:bg-white/[0.04] transition-all group cursor-pointer"
              >
                <span className="block text-[11px] font-bold text-[#0D2266] dark:text-white group-hover:text-[#3451D1] transition-colors truncate">
                  {p.title}
                </span>
                <span className="block text-[10px] text-slate-500 truncate mt-0.5">
                  {p.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#121826] p-4">
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
                placeholder="Ask anything about Indian taxes, property, or money transfers..."
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-3.5 py-2.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:border-[#3451D1] focus:outline-none focus:ring-1 focus:ring-[#3451D1] transition-all"
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
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Private & secure</span>
            <span>Press ↵ to send</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
