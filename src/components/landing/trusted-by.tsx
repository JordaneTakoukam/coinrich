"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { ArrowLeftRight } from "lucide-react";

export function TrustedBy() {
  const t = useTranslations("trustedBy");
  const exchanges = t("exchanges").split(",").map((name: string) => name.trim());
  const doubled = [...exchanges, ...exchanges];

  return (
    <section className="border-y border-border/50 bg-card/30 pt-10 pb-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedReveal>
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {t("badge")}
              </span>
            </div>
            <h3 className="text-center text-lg sm:text-xl font-semibold text-foreground">
              {t("title")}
            </h3>
          </div>
        </AnimatedReveal>
      </div>

      {/* Marquee scroll */}
      <div className="relative">
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" },
          }}
          className="flex items-center gap-14 md:gap-20 whitespace-nowrap"
        >
          {doubled.map((exchange: string, i: number) => (
            <span
              key={`${exchange}-${i}`}
              className="font-mono text-xl font-bold text-muted-foreground/30 transition-colors duration-300 hover:text-primary cursor-default select-none"
            >
              {exchange}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
