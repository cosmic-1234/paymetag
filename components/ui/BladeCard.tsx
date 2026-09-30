import React from "react";

export interface BladeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "interactive" | "highlighted" | "stat" | "glass";
  highlightColor?: "blue" | "gold" | "red";
  className?: string;
  onClick?: () => void;
}

export const BladeCard: React.FC<BladeCardProps> = ({
  children,
  variant = "default",
  highlightColor = "blue",
  className = "",
  onClick,
  ...rest
}) => {
  // Base Razorpay Blade card styling:
  // 16px rounded corners (rounded-2xl)
  // 24px padding (p-6)
  // Min height 120px (min-h-[120px])
  // Dark theme surface: #1A1F2E, border: rgba(255,255,255,0.08), shadow: 0px 2px 8px rgba(0,0,0,0.32), 0px 0px 1px rgba(0,0,0,0.24)
  // Light theme: #FFFFFF, border: #E8E8E8, shadow: 0px 2px 8px rgba(0,0,0,0.06), 0px 0px 1px rgba(0,0,0,0.04)
  
  let variantClasses = "";

  if (variant === "glass") {
    // 5. GLASS CARD (landing page hero only)
    variantClasses =
      "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-6 min-h-[120px] rounded-2xl";
  } else if (variant === "stat") {
    // 4. STAT / KPI CARD (net worth, health score, module summary)
    variantClasses =
      "rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] px-6 py-6 min-h-[120px] shadow-[0px_2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0px_2px_8px_rgba(0,0,0,0.32)] hover:border-slate-300/80 dark:hover:border-white/[0.14] hover:shadow-[0px_8px_20px_rgba(13,34,102,0.06)] hover:-translate-y-0.5 transition-all duration-300";
  } else if (variant === "highlighted") {
    variantClasses =
      "rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] px-6 py-5 min-h-[120px] shadow-[0px_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0px_8px_24px_rgba(13,34,102,0.08)] hover:-translate-y-0.5 transition-all duration-300 ease-out";
  } else if (variant === "interactive") {
    // 2. INTERACTIVE CARD (clickable modules on dashboard)
    variantClasses =
      "rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-6 min-h-[120px] shadow-[0px_2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0px_2px_8px_rgba(0,0,0,0.32)] hover:shadow-[0px_10px_25px_rgba(13,34,102,0.08)] dark:hover:shadow-[0px_8px_24px_rgba(0,0,0,0.48)] hover:border-[#336765]/40 dark:hover:border-white/[0.16] hover:-translate-y-1 cursor-pointer transition-all duration-300 ease-out";
  } else {
    // 1. DEFAULT CARD (read-only info)
    variantClasses =
      "rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#1A1F2E] p-6 min-h-[120px] shadow-[0px_2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0px_2px_8px_rgba(0,0,0,0.32)] transition-all duration-200";
  }

  return (
    <div
      className={`${variantClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export interface StatCardProps {
  label: string;
  value: string | React.ReactNode;
  trend?: {
    direction: "up" | "down";
    text: string;
  };
  subtitle?: string;
  subtext?: string;
  className?: string;
  badge?: React.ReactNode | { text: string; color?: "green" | "yellow" | "blue" | "red" | string };
}

export const BladeStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  subtitle,
  subtext,
  className = "",
  badge,
}) => {
  const note = subtext || subtitle;

  const renderBadge = () => {
    if (!badge) return null;
    if (React.isValidElement(badge) || typeof badge === "string" || typeof badge === "number") {
      return badge;
    }
    if (typeof badge === "object" && "text" in badge) {
      const colorMap: Record<string, string> = {
        green: "bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950/40 dark:text-emerald-400",
        yellow: "bg-[#FEF9C3] text-[#A16207] dark:bg-amber-950/40 dark:text-amber-400",
        blue: "bg-[#EEF5F4] text-[#336765] border border-[#C6DFDD] dark:bg-[#336765]/20 dark:text-teal-300",
        red: "bg-[#FEE2E2] text-[#DC2626] dark:bg-rose-950/40 dark:text-rose-400",
      };
      const badgeColor = badge.color || "blue";
      const badgeStyle = colorMap[badgeColor] || colorMap.blue;
      return (
        <span className={`rounded-[6px] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] ${badgeStyle}`}>
          {badge.text}
        </span>
      );
    }
    return null;
  };

  return (
    <BladeCard variant="stat" className={`flex flex-col justify-between ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
            {label}
          </span>
          {renderBadge()}
        </div>
        <div className="text-[32px] font-extrabold text-slate-900 dark:text-white leading-tight font-sans">
          {value}
        </div>
      </div>

      {(trend || note) && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 dark:border-white/[0.08] pt-3 text-sm">
          {trend && (
            <span
              className={`font-medium flex items-center gap-1 ${
                trend.direction === "up" ? "text-[#22C55E]" : "text-[#EF4444]"
              }`}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.text}
            </span>
          )}
          {note && (
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 truncate">
              {note}
            </span>
          )}
        </div>
      )}
    </BladeCard>
  );
};
