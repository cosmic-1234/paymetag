import React from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

export interface BladeNoticeProps {
  variant?: "info" | "success" | "warning" | "negative";
  title?: string;
  badge?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}

export const BladeNotice: React.FC<BladeNoticeProps> = ({
  variant = "info",
  title,
  badge,
  children,
  icon,
  trailing,
  className = "",
}) => {
  const styles = {
    info: {
      container: "border-[#BFDBFE] dark:border-blue-900/40 bg-[#F0F7FF] dark:bg-blue-950/20 text-[#1E3A8A] dark:text-blue-200",
      iconBg: "bg-[#0B72E7] text-white",
      badge: "bg-[#DBEAFE] text-[#0B72E7] dark:bg-blue-900/60 dark:text-blue-300",
      titleColor: "text-[#0C2340] dark:text-white",
      defaultIcon: <Info className="h-4 w-4" />,
    },
    success: {
      container: "border-[#BBF7D0] dark:border-emerald-900/40 bg-[#F0FDF4] dark:bg-emerald-950/20 text-[#14532D] dark:text-emerald-200",
      iconBg: "bg-[#10B981] text-white",
      badge: "bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-900/60 dark:text-emerald-300",
      titleColor: "text-[#0C2340] dark:text-white",
      defaultIcon: <CheckCircle2 className="h-4 w-4" />,
    },
    warning: {
      container: "border-[#FDE68A] dark:border-amber-900/40 bg-[#FFFBEB] dark:bg-amber-950/20 text-[#78350F] dark:text-amber-200",
      iconBg: "bg-[#F59E0B] text-white",
      badge: "bg-[#FEF3C7] text-[#D97706] dark:bg-amber-900/60 dark:text-amber-300",
      titleColor: "text-[#0C2340] dark:text-white",
      defaultIcon: <AlertTriangle className="h-4 w-4" />,
    },
    negative: {
      container: "border-[#FECACA] dark:border-red-900/40 bg-[#FEF2F2] dark:bg-red-950/20 text-[#7F1D1D] dark:text-red-200",
      iconBg: "bg-[#EF4444] text-white",
      badge: "bg-[#FEE2E2] text-[#DC2626] dark:bg-red-900/60 dark:text-red-300",
      titleColor: "text-[#0C2340] dark:text-white",
      defaultIcon: <AlertCircle className="h-4 w-4" />,
    },
  }[variant];

  return (
    <div
      className={`rounded-xl border p-4 sm:p-4.5 transition-all shadow-xs ${styles.container} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${styles.iconBg} shadow-xs mt-0.5`}>
          {icon || styles.defaultIcon}
        </div>
        <div className="flex-1 min-w-0">
          {(title || badge || trailing) && (
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {badge && (
                  <span className={`rounded-[4px] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ${styles.badge}`}>
                    {badge}
                  </span>
                )}
                {title && (
                  <h4 className={`text-[13px] sm:text-[14px] font-bold ${styles.titleColor} leading-snug`}>
                    {title}
                  </h4>
                )}
              </div>
              {trailing && <div className="shrink-0">{trailing}</div>}
            </div>
          )}
          <div className="text-[12px] sm:text-[13px] leading-relaxed text-[#515B6F] dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
