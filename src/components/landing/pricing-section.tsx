"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { PricingCard } from "@/components/shared/pricing-card";
import { cn } from "@/lib/utils";

const plans = ["starter", "pro", "enterprise"] as const;

export function PricingSection() {
  const t = useTranslations("pricing");
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="flex items-center justify-center gap-3 mt-8 mb-12">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            !isYearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {t("monthly")}
        </span>
        <button
          type="button"
          onClick={() => setIsYearly(!isYearly)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            isYearly ? "bg-primary" : "bg-secondary"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
              isYearly ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isYearly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {t("yearly")}
        </span>
        <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
          {t("yearlyDiscount")}
        </span>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan, index) => (
          <AnimatedReveal key={plan} delay={index * 0.1}>
            <PricingCard
              name={t(`plans.${plan}.name`)}
              price={isYearly ? t(`plans.${plan}.priceYearly`) : t(`plans.${plan}.price`)}
              description={t(`plans.${plan}.description`)}
              features={t(`plans.${plan}.features`).split(",")}
              cta={plan === "pro" ? t("ctaPopular") : t("cta")}
              popular={plan === "pro"}
              popularLabel={t("popular")}
              perMonth={t("perMonth")}
            />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
