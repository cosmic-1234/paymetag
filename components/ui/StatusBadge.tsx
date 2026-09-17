import React from "react";

export type BadgeVariant = "active" | "warning" | "critical" | "dormant";

interface StatusBadgeProps {
  status: BadgeVariant | "danger" | "gold" | "neutral" | "success";
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = "",
}) => {
  // Normalize variants
  let normalized: BadgeVariant = "active";
  if (status === "critical" || status === "danger") normalized = "critical";
  else if (status === "warning" || status === "gold") normalized = "warning";
  else if (status === "dormant" || status === "neutral") normalized = "dormant";
  else if (status === "active" || status === "success") normalized = "active";

  const config = {
    active: {
      bgLight: "bg-[#DCFCE7] text-[#16A34A]",
      bgDark: "dark:bg-[#16A34A]/15 dark:text-[#22C55E]",
      dot: "bg-[#22C55E]",
      defaultLabel: "Active",
    },
    warning: {
      bgLight: "bg-[#FEF9C3] text-[#A16207]",
      bgDark: "dark:bg-[#EAB308]/15 dark:text-[#EAB308]",
      dot: "bg-[#EAB308]",
      defaultLabel: "Warning",
    },
    critical: {
      bgLight: "bg-[#FEE2E2] text-[#DC2626]",
      bgDark: "dark:bg-[#DC2626]/15 dark:text-[#EF4444]",
      dot: "bg-[#EF4444]",
      defaultLabel: "Critical",
    },
    dormant: {
      bgLight: "bg-[#F3F4F6] text-[#6B7280]",
      bgDark: "dark:bg-[#6B7280]/15 dark:text-[#9CA3AF]",
      dot: "bg-[#9CA3AF]",
      defaultLabel: "Dormant",
    },
  }[normalized];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bgLight} ${config.bgDark} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
