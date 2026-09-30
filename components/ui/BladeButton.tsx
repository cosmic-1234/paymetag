import React from "react";

export interface BladeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const BladeButton: React.FC<BladeButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  // Size specs
  const sizeClasses = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
    md: "h-10 px-5 text-[13px] gap-2 rounded-lg",
    lg: "h-11 px-6 text-sm gap-2.5 rounded-lg",
  }[size];

  // Razorpay Blade Variant styles
  const variantClasses = {
    primary:
      "bg-[#336765] hover:bg-[#234947] active:bg-[#1a3837] text-white font-bold shadow-xs hover:shadow focus:ring-2 focus:ring-[#336765]/25",
    secondary:
      "border border-[#CBD5E1] dark:border-white/10 bg-white dark:bg-[#1A1F2E] hover:bg-[#F8FAFC] dark:hover:bg-white/[0.04] text-[#334155] dark:text-slate-200 font-semibold focus:ring-2 focus:ring-slate-300",
    outline:
      "border border-[#336765] bg-transparent text-[#336765] hover:bg-[#EEF5F4] dark:hover:bg-teal-950/20 font-bold",
    danger:
      "bg-[#EF4444] hover:bg-[#dc2626] active:bg-[#b91c1c] text-white font-bold shadow-xs",
    success:
      "bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white font-bold shadow-xs",
    ghost:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.06] text-[#515B6F] dark:text-slate-300 font-semibold",
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-sans tracking-wide hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <span>{children}</span>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};
