/** Renders text with the brand gradient: from-primary via-amber-400 to-orange-300. */
"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-primary via-amber-400 to-orange-300 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
