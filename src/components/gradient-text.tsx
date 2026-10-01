"use client";

import type { ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
};

export function GradientText({
  children,
  className = "",
  colors = ["#a855f7", "#3b82f6", "#a855f7"],
  animationSpeed = 3,
}: GradientTextProps) {
  return (
    <div
      className={`gradient-text max-w-fit ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
      }}
    >
      {children}
    </div>
  );
}
