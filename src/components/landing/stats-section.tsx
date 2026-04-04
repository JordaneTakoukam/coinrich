"use client";

import { useTranslations } from "next-intl";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { StatCounter } from "@/components/shared/stat-counter";

const statKeys = [
  { valueKey: "volume", labelKey: "volumeLabel" },
  { valueKey: "traders", labelKey: "tradersLabel" },
  { valueKey: "uptime", labelKey: "uptimeLabel" },
  { valueKey: "coins", labelKey: "coinsLabel" },
] as const;

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {statKeys.map((stat, index) => (
          <AnimatedReveal key={stat.valueKey} delay={index * 0.1}>
            <div className="text-center">
              <StatCounter
                value={t(stat.valueKey)}
                label={t(stat.labelKey)}
              />
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
