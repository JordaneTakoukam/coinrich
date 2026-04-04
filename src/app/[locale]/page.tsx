import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { TrustedBy } from "@/components/landing/trusted-by";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { StatsSection } from "@/components/landing/stats-section";
import { AiPerformance } from "@/components/landing/ai-performance";
import { AiShowcase } from "@/components/landing/ai-showcase";
import { SecuritySection } from "@/components/landing/security-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { Testimonials } from "@/components/landing/testimonials";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { CtaSection } from "@/components/landing/cta-section";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { CookieConsent } from "@/components/shared/cookie-consent";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <main>
        <HeroSection />
        <TrustedBy />
        <FeaturesSection />
        <HowItWorks />
        <StatsSection />
        <AiPerformance />
        <AiShowcase />
        <SecuritySection />
        <PricingSection />
        <Testimonials />
        <FaqSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
