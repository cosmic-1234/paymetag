import React from "react";
import Link from "next/link";

import { AlertTriangle, ArrowUpRight, Check, AlertCircle } from "lucide-react";

export type ActionSeverity = "critical" | "warning" | "info" | "success";

export interface BladeActionCardProps {
  module: string;
  severity: ActionSeverity | "danger" | "gold" | "neutral";
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const BladeActionCard: React.FC<BladeActionCardProps> = ({
  module,
  severity,
  title,
  description,
  ctaText = "Resolve",
  ctaHref,
  onCtaClick,
  onDismiss,
  className = "",
}) => {
  // Normalize severity
  let normSeverity: ActionSeverity = "info";
  if (severity === "critical" || severity === "danger") normSeverity = "critical";
  else if (severity === "warning" || severity === "gold") normSeverity = "warning";
  else if (severity === "success") normSeverity = "success";
  else normSeverity = "info";

  // Chip styling per spec (SEVERITY INDICATED BY chip color ONLY, not card bg)
  const chipConfig = {
    critical: {
      bg: "bg-[#FEE2E2] text-[#DC2626]",
      iconBadge: "bg-[#FEE2E2] text-[#DC2626]",
      iconNode: <span className="font-extrabold text-[11px] leading-none">!</span>,
    },
    warning: {
      bg: "bg-[#FEF9C3] text-[#A16207]",
      iconBadge: "bg-[#FEF9C3] text-[#A16207]",
      iconNode: <AlertTriangle className="h-2.5 w-2.5 stroke-[2.5]" />,
    },
    info: {
      bg: "bg-[#DBEAFE] text-[#1D4ED8]",
      iconBadge: "bg-[#DBEAFE] text-[#1D4ED8]",
      iconNode: <ArrowUpRight className="h-2.5 w-2.5 stroke-[2.5]" />,
    },
    success: {
      bg: "bg-[#DCFCE7] text-[#16A34A]",
      iconBadge: "bg-[#DCFCE7] text-[#16A34A]",
      iconNode: <Check className="h-2.5 w-2.5 stroke-[2.5]" />,
    },
  }[normSeverity];

  return (
    <div
      className={`rounded-2xl border border-[#E8E8E8] dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] px-6 py-5 shadow-[0px_2px_8px_rgba(0,0,0,0.06),0px_0px_1px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 ease-out flex flex-col justify-between ${className}`}
    >
      <div>
        {/* ROW 1 — TOP BAR */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-[6px] px-2.5 py-0.5 font-bold text-[11px] uppercase tracking-[0.06em] ${chipConfig.bg}`}
          >
            {module}
          </span>
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${chipConfig.iconBadge}`}
            title={normSeverity.toUpperCase()}
          >
            {chipConfig.iconNode}
          </span>
        </div>

        {/* ROW 2 — TITLE */}
        <h4 className="mt-3 font-bold text-[16px] text-[#0D2266] dark:text-white leading-snug">
          {title}
        </h4>

        {/* ROW 3 — DESCRIPTION */}
        <p className="mt-1.5 font-normal text-[13px] text-[#6B7280] dark:text-white/[0.55] leading-[1.6] line-clamp-2">
          {description}
        </p>
      </div>

      {/* ROW 4 — FOOTER */}
      <div className="mt-4 pt-4 border-t border-[#F3F4F6] dark:border-white/[0.06] flex items-center justify-between">
        {onCtaClick ? (
          <button
            onClick={onCtaClick}
            type="button"
            className="font-bold text-[13px] text-[#3451D1] hover:text-[#1D3FAD] inline-flex items-center gap-1 transition-colors duration-150"
          >
            <span>{ctaText}</span>
            <span>→</span>
          </button>
        ) : ctaHref ? (
          <Link
            href={ctaHref}
            className="font-bold text-[13px] text-[#3451D1] hover:text-[#1D3FAD] inline-flex items-center gap-1 transition-colors duration-150"
          >
            <span>{ctaText}</span>
            <span>→</span>
          </Link>
        ) : (
          <span className="font-bold text-[13px] text-[#3451D1]">
            {ctaText} →
          </span>
        )}

        {onDismiss && (
          <button
            onClick={onDismiss}
            type="button"
            className="font-normal text-[13px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors duration-150 bg-transparent border-0 p-0 cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};
