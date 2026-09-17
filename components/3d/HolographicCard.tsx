"use client";

import React from "react";
import { BladeCard } from "@/components/ui/BladeCard";

interface HolographicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "gold" | "emerald";
  variant?: "default" | "interactive" | "highlighted" | "stat" | "glass";
  onClick?: () => void;
}

/**
 * Replaces gimmicky AI 3D tilt with Razorpay Blade Design System Card.
 * Adheres to 16px radius, 24px padding, 16px gap, and crisp Blade elevations.
 */
export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className = "",
  glowColor,
  variant = "interactive",
  onClick,
  ...rest
}) => {
  return (
    <BladeCard
      variant={variant}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </BladeCard>
  );
};
