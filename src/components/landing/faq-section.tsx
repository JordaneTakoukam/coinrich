"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export function FaqSection() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <AnimatedReveal className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible>
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="text-left font-medium text-foreground">
                {t(`items.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {t(`items.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedReveal>
    </section>
  );
}
