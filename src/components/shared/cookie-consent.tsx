/** Cookie consent banner — slides up from bottom, stores preference in localStorage */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COOKIE_KEY = "cookie-consent";

export function CookieConsent({ className }: { className?: string }) {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept(level: "all" | "essential") {
    localStorage.setItem(COOKIE_KEY, level);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg",
            "rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20",
            className
          )}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => accept("essential")}
            className="absolute right-3 top-3 rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-5">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("title")}
                </h3>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  {t("privacy")}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {t("description")}
            </p>

            {/* Expandable details */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mb-4 space-y-2.5 rounded-lg border border-border/50 bg-secondary/20 p-3">
                    {(["essential", "analytics", "marketing"] as const).map((key) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-foreground">{t(`types.${key}.title`)}</p>
                          <p className="text-[10px] text-muted-foreground">{t(`types.${key}.desc`)}</p>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-medium",
                            key === "essential"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {key === "essential" ? t("required") : t("optional")}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Details link — above buttons */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mb-3 text-xs text-primary hover:text-primary/80 font-medium underline underline-offset-2"
            >
              {showDetails ? t("hideDetails") : t("showDetails")}
            </button>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => accept("all")}
                size="sm"
                className="flex-1 bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground text-xs rounded-lg"
              >
                {t("acceptAll")}
              </Button>
              <Button
                onClick={() => accept("essential")}
                variant="outline"
                size="sm"
                className="flex-1 text-xs rounded-lg"
              >
                {t("essentialOnly")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
