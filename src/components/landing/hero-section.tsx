"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, ArrowRight, TrendingUp, Activity, Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/gradient-text";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

function LiveStatCard({ value, label, icon: Icon, delay }: { value: string; label: string; icon: React.ElementType; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="font-mono text-lg font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      <div className="dot-pattern absolute inset-0 opacity-40" />

      {/* Animated orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-amber-500/15 blur-[100px]"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
          className="absolute h-1 w-1 rounded-full bg-primary/60"
          style={{
            top: `${20 + (i * 12) % 60}%`,
            left: `${10 + (i * 17) % 80}%`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 bg-primary/5 px-4 py-1.5 text-sm backdrop-blur-sm"
          >
            <Zap className="mr-1.5 h-3.5 w-3.5 text-primary" />
            {t("badge")}
          </Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold tracking-tight leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t("title")}{" "}
          <br className="hidden sm:block" />
          <GradientText className="inline-block">{t("titleHighlight")}</GradientText>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/auth?mode=register">
            <Button
              size="lg"
              className={cn(
                "group rounded-xl bg-gradient-to-r from-primary to-amber-600 px-8 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25",
                "hover:from-primary/90 hover:to-amber-600/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              )}
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-border/50 bg-card/30 backdrop-blur-sm px-8 py-6 text-base hover:bg-card/50"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("ctaSecondary")}
          </Button>
        </motion.div>

        {/* Live stats bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <LiveStatCard value={t("liveStats.trades")} label={t("liveStats.tradesLabel")} icon={Activity} delay={0.8} />
          <LiveStatCard value={t("liveStats.profit")} label={t("liveStats.profitLabel")} icon={TrendingUp} delay={1.0} />
          <LiveStatCard value={t("liveStats.uptime")} label={t("liveStats.uptimeLabel")} icon={Shield} delay={1.2} />
        </motion.div>

        {/* Trust text with avatar photos */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center gap-3 pb-8"
        >
          <div className="flex -space-x-2.5">
            {[
              "https://randomuser.me/api/portraits/men/32.jpg",
              "https://randomuser.me/api/portraits/women/44.jpg",
              "https://randomuser.me/api/portraits/men/67.jpg",
              "https://randomuser.me/api/portraits/women/17.jpg",
              "https://randomuser.me/api/portraits/men/52.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-8 w-8 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {t("trustText")}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
