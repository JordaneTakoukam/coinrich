"use client";

import { useTranslations } from "next-intl";
import { UserPlus, Settings, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";

const steps = [
  { key: "step1", icon: UserPlus, number: 1 },
  { key: "step2", icon: Settings, number: 2 },
  { key: "step3", icon: Rocket, number: 3 },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-12 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className="flex w-full flex-1 items-center gap-4 lg:flex-col lg:gap-0"
              >
                <AnimatedReveal delay={index * 0.15}>
                  <div className="flex-1 rounded-xl border border-border bg-card p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    <Icon className="mx-auto mt-4 h-6 w-6 text-primary" />
                    <h3 className="mt-3 text-lg font-semibold">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>
                </AnimatedReveal>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden lg:block",
                      "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
