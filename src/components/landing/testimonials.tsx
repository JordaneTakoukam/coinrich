"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { TestimonialCard } from "@/components/shared/testimonial-card";

const testimonialKeys = ["t1", "t2", "t3", "t4", "t5", "t6"] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="mx-auto mt-12 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialKeys.map((key, index) => (
          <AnimatedReveal key={key} delay={index * 0.08}>
            <TestimonialCard
              name={t(`items.${key}.name`)}
              role={t(`items.${key}.role`)}
              quote={t(`items.${key}.quote`)}
              rating={parseInt(t(`items.${key}.rating`), 10)}
            />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
