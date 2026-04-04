/** Language switcher — dropdown on desktop, inline toggle on mobile */
"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { ChevronDown, Globe, Check } from "lucide-react";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeConfig: Record<string, { label: string }> = {
  en: { label: "English" },
  sr: { label: "Srpski" },
};

export function LanguageSwitcher({
  className,
  variant = "dropdown",
}: {
  className?: string;
  variant?: "dropdown" | "inline";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    setOpen(false);
    let cleanPath = pathname;
    for (const loc of routing.locales) {
      if (cleanPath.startsWith(`/${loc}/`)) {
        cleanPath = cleanPath.slice(loc.length + 1);
        break;
      }
      if (cleanPath === `/${loc}`) {
        cleanPath = "/";
        break;
      }
    }
    router.push(cleanPath || "/", { locale: newLocale });
  }

  const current = localeConfig[locale] || localeConfig.en;

  // Inline variant — for mobile nav
  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <div className="flex items-center rounded-full border border-border/40 bg-secondary/20 p-0.5 gap-0.5">
          {routing.locales.map((loc) => {
            const config = localeConfig[loc];
            const isActive = locale === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => switchLocale(loc)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Dropdown variant — for desktop header
  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
          "text-muted-foreground hover:text-foreground",
          open && "text-foreground"
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{current.label}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-border bg-popover p-1 shadow-lg shadow-black/20">
          {routing.locales.map((loc) => {
            const config = localeConfig[loc];
            const isActive = locale === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => switchLocale(loc)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-secondary/50"
                )}
              >
                <span>{config.label}</span>
                {isActive && <Check className="ml-auto h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
