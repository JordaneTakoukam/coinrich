/** Security & trust section showcasing platform reliability */
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  Fingerprint,
  Award,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";

const securityFeatures = [
  { key: "encryption", icon: Lock },
  { key: "noFunds", icon: ShieldCheck },
  { key: "audit", icon: Eye },
  { key: "uptime", icon: Server },
  { key: "twoFa", icon: Fingerprint },
  { key: "compliance", icon: Award },
] as const;

export function SecuritySection() {
  const t = useTranslations("security");

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <AnimatedReveal key={feature.key} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card/50 p-5 hover:border-primary/40 hover:bg-card transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {t(`items.${feature.key}.title`)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {t(`items.${feature.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
