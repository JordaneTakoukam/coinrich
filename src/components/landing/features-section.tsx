"use client";

import { useTranslations } from "next-intl";
import {
  Brain,
  Bot,
  Shield,
  Signal,
  BarChart3,
  Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { FeatureCard } from "@/components/shared/feature-card";

const features = [
  { key: "aiAnalysis", icon: Brain },
  { key: "automatedBots", icon: Bot },
  { key: "riskManagement", icon: Shield },
  { key: "signals", icon: Signal },
  { key: "portfolio", icon: BarChart3 },
  { key: "multiExchange", icon: Globe },
] as const;

export function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section id="features" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <AnimatedReveal key={feature.key} delay={index * 0.1}>
              <FeatureCard
                icon={feature.icon}
                title={t(`items.${feature.key}.title`)}
                description={t(`items.${feature.key}.description`)}
                highlight={t(`items.${feature.key}.highlight`)}
              />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
