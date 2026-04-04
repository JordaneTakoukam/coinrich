"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Menu, LogIn, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Link } from "@/i18n/navigation";

const navLinks = [
  { id: "features", key: "features" },
  { id: "how-it-works", key: "howItWorks" },
  { id: "pricing", key: "pricing" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = navLinks.map((l) => l.id);
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-border/80 shadow-lg shadow-black/10"
          : "bg-background/40 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo — always visible with app name */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", window.location.pathname);
          }}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
            AI Crypto Tracker
          </span>
        </button>

        {/* Desktop Navigation — inline links (no pill container) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                activeSection === link.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              )}
            >
              {t(link.key)}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <LanguageSwitcher />

          <Link href="/auth?mode=login">
            <Button
              variant="ghost"
              size="sm"
              className="group gap-1.5 text-primary font-semibold hover:text-primary hover:bg-primary/5 transition-all duration-300"
            >
              <LogIn className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              {t("login")}
            </Button>
          </Link>

          <Link href="/auth?mode=register">
            <Button
              size="sm"
              className="gap-1.5 bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/40 transition-all duration-300"
            >
              {t("getStarted")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0 h-12 w-12"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </Button>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </header>
  );
}
