"use client";

import { useTranslations } from "next-intl";
import { Mail, ArrowRight, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <AnimatedReveal direction="left">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("namePlaceholder")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("emailPlaceholder")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("messagePlaceholder")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t("messagePlaceholder")}
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>
                <Button
                  className={cn(
                    "w-full rounded-lg bg-gradient-to-r from-primary to-amber-600 py-3 text-sm font-semibold text-primary-foreground",
                    "hover:from-primary/90 hover:to-amber-600/90"
                  )}
                >
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </AnimatedReveal>

          {/* Contact Info */}
          <AnimatedReveal>
            <div className="flex flex-col gap-6">
              {/* Email card */}
              <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t("emailLabel")}</h3>
                    <p className="mt-1 text-primary font-medium">{t("email")}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("response")}</p>
                  </div>
                </div>
              </div>

              {/* Social card */}
              <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-foreground mb-4">{t("social")}</h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: MessageCircle, label: "Discord" },
                    { icon: Send, label: "Telegram" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                    >
                      <social.icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Live indicator */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    24/7 Support Available
                  </span>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
