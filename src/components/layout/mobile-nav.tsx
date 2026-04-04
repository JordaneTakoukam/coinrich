"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link } from "@/i18n/navigation";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navLinks = [
  { id: "features", key: "features" },
  { id: "how-it-works", key: "howItWorks" },
  { id: "pricing", key: "pricing" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
] as const;

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations("nav");

  const handleNavClick = (id: string) => {
    onOpenChange(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-background w-full sm:w-80">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
              AI Crypto Tracker
            </span>
          </div>
        </SheetHeader>

        <nav className="flex flex-col gap-1 mt-8 px-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
                window.history.pushState(null, "", `#${link.id}`);
              }}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors py-3 text-left cursor-pointer"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <Separator className="my-6" />

        <div className="flex flex-col gap-3 px-2">
          <LanguageSwitcher />

          <Link href="/auth?mode=login" onClick={() => onOpenChange(false)}>
            <Button variant="outline" className="w-full" size="lg">
              {t("login")}
            </Button>
          </Link>

          <Link href="/auth?mode=register" onClick={() => onOpenChange(false)}>
            <Button
              className="w-full bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-600/90 text-primary-foreground"
              size="lg"
            >
              {t("getStarted")}
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
