"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Twitter, Github, MessageCircle, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
];

/** Map footer link keys to real anchor IDs when they exist on the landing page */
const anchorMap: Record<string, string> = {
  features: "#features",
  pricing: "#pricing",
  contact: "#contact",
};

const productLinks = ["features", "pricing", "api", "changelog"] as const;
const companyLinks = ["about", "blog", "careers", "contact"] as const;
const legalLinks = ["privacy", "terms", "cookies", "disclaimer"] as const;

function FooterLink({ linkKey, ns, children }: { linkKey: string; ns: string; children: React.ReactNode }) {
  const href = anchorMap[linkKey] || "#";
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const id = href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1.5"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                AI Crypto Tracker
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t("description")}
            </p>
            <div className="flex items-center gap-2 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("product")}</h3>
            <ul className="space-y-0.5">
              {productLinks.map((link) => (
                <li key={link}>
                  <FooterLink linkKey={link} ns="productLinks">
                    {t(`productLinks.${link}`)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("company")}</h3>
            <ul className="space-y-0.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <FooterLink linkKey={link} ns="companyLinks">
                    {t(`companyLinks.${link}`)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("legal")}</h3>
            <ul className="space-y-0.5">
              {legalLinks.map((link) => (
                <li key={link}>
                  <FooterLink linkKey={link} ns="legalLinks">
                    {t(`legalLinks.${link}`)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          <p className="text-sm text-muted-foreground">
            {t("madeBy")}{" "}
            <a
              href="https://idrissjordane.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t("madeByName")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
