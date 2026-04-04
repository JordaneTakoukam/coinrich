/** Reusable section title with optional badge, title, and subtitle. Wraps content in an AnimatedReveal for scroll-triggered entrance. */
"use client";

import { cn } from "@/lib/utils";
import { AnimatedReveal } from "./animated-reveal";
import { GradientText } from "./gradient-text";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <AnimatedReveal className={cn("text-center", className)}>
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <GradientText>{title}</GradientText>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </AnimatedReveal>
  );
}
