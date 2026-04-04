"use client";

import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/gradient-text";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

      <AnimatedReveal className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          <GradientText>{t("title")}</GradientText>
        </h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="mt-8">
          <Link href="/auth?mode=register">
            <Button
              size="lg"
              className={cn(
                "rounded-lg bg-gradient-to-r from-primary to-amber-600 px-8 py-3 text-base font-semibold text-primary-foreground",
                "hover:from-primary/90 hover:to-amber-600/90"
              )}
            >
              <Zap className="mr-2 h-4 w-4" />
              {t("button")}
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{t("note")}</p>
      </AnimatedReveal>
    </section>
  );
}
