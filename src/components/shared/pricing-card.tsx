"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  popularLabel?: string;
  perMonth?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  popular = false,
  popularLabel = "Most Popular",
  perMonth = "/month",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl border bg-card p-6",
        popular ? "border-primary lg:scale-105 shadow-lg shadow-primary/10" : "border-border",
        className
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {popularLabel}
        </span>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground">{price}</span>
        {price !== "Custom" && (
          <span className="ml-1 text-sm text-muted-foreground">{perMonth}</span>
        )}
      </div>

      {/* CTA Button at top */}
      <button
        className={cn(
          "mb-6 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300",
          popular
            ? "bg-gradient-to-r from-primary via-amber-500 to-orange-400 text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20"
            : "border border-border bg-transparent text-foreground hover:bg-primary/10 hover:border-primary/50"
        )}
      >
        {cta}
      </button>

      {/* Features list - grows to fill remaining space */}
      <ul className="flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
