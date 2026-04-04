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
      // Update URL hash without jump
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-border shadow-sm shadow-black/5"
          : "bg-transparent backdrop-blur-sm border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", window.location.pathname);
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Sparkles className="h-4.5 w-4.5 text-primary" />
          </div>
          <span className="text-lg font-bold text-foreground hidden sm:block">
            AI Crypto Tracker
          </span>
        </button>

        {/* Desktop Navigation — real <a> links with #hash */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center rounded-full border border-border/40 bg-secondary/20 backdrop-blur-sm px-1 py-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  activeSection === link.id
                    ? "text-primary-foreground bg-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageSwitcher />

          <Link href="/auth?mode=login">
            <Button variant="ghost" size="sm" className="group gap-1.5 text-primary font-semibold hover:text-primary hover:bg-primary/5 transition-all duration-300">
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

        {/* Mobile Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </header>
  );
}
