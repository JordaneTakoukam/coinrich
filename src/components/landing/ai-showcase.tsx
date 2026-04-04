"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Signal, Bot, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";

const tabConfig = [
  { key: "analysis", icon: BarChart3, bullets: ["indicators", "accuracy", "latency"] },
  { key: "signals", icon: Signal, bullets: ["daily", "pairs", "backtested"] },
  { key: "automation", icon: Bot, bullets: ["strategies", "execution", "protection"] },
] as const;

/* --- Analysis Mockup --- */
function AnalysisMockup() {
  const indicators = [
    { name: "RSI (14)", value: "62.4", status: "Neutral", color: "text-amber-400" },
    { name: "MACD", value: "Bullish", status: "Buy", color: "text-green-500" },
    { name: "EMA 50/200", value: "Golden Cross", status: "Strong Buy", color: "text-green-500" },
    { name: "Bollinger", value: "Upper Band", status: "Overbought", color: "text-red-400" },
  ];
  const data = [60, 55, 68, 62, 75, 70, 82, 78, 88, 85, 90];
  const w = 400, h = 120;
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <div className="space-y-4">
      {/* Mini chart */}
      <div className="rounded-lg border border-border/50 bg-secondary/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">BTC/USDT</span>
            <span className="text-xs font-mono text-green-500">$67,842.50</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-green-500 font-medium">
            <ArrowUpRight className="h-3 w-3" /> +5.23%
          </span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
          <defs>
            <linearGradient id="showcase-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={`${pts} ${w},${h} 0,${h}`} fill="url(#showcase-grad)" stroke="none" />
          <polyline points={pts} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Indicators */}
      <div className="grid grid-cols-2 gap-2">
        {indicators.map((ind) => (
          <div key={ind.name} className="rounded-lg border border-border/50 bg-secondary/20 px-3 py-2.5">
            <p className="text-[10px] text-muted-foreground mb-0.5">{ind.name}</p>
            <p className="text-sm font-semibold text-foreground">{ind.value}</p>
            <p className={cn("text-[10px] font-medium", ind.color)}>{ind.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Signals Mockup --- */
function SignalsMockup() {
  const signals = [
    { pair: "BTC/USDT", action: "BUY", confidence: 96, entry: "$67,200", target: "$71,500", time: "2m ago", up: true },
    { pair: "ETH/USDT", action: "SELL", confidence: 89, entry: "$3,450", target: "$3,180", time: "5m ago", up: false },
    { pair: "SOL/USDT", action: "BUY", confidence: 93, entry: "$148.20", target: "$165.00", time: "8m ago", up: true },
    { pair: "AVAX/USDT", action: "BUY", confidence: 91, entry: "$38.50", target: "$43.20", time: "12m ago", up: true },
  ];

  return (
    <div className="space-y-2">
      {signals.map((s) => (
        <div key={s.pair} className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 px-4 py-3">
          <div className="flex items-center gap-3">
            {s.up ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
            <div>
              <p className="text-sm font-semibold text-foreground">{s.pair}</p>
              <p className="text-[10px] text-muted-foreground">{s.time}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold", s.up ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500")}>{s.action}</span>
              <span className="text-xs font-mono text-foreground">{s.entry}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-muted-foreground">Target: {s.target}</span>
              <span className="text-[10px] font-mono text-primary">{s.confidence}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --- Automation Mockup --- */
function AutomationMockup() {
  const bots = [
    { name: "BTC Grid Bot", status: "Running", pnl: "+$2,847", trades: 142, color: "bg-green-500" },
    { name: "ETH DCA Bot", status: "Running", pnl: "+$1,203", trades: 56, color: "bg-green-500" },
    { name: "SOL Scalper", status: "Paused", pnl: "+$687", trades: 89, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-3">
      {bots.map((bot) => (
        <div key={bot.name} className="rounded-lg border border-border/50 bg-secondary/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", bot.color)} />
              <span className="text-sm font-semibold text-foreground">{bot.name}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{bot.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground">P&L</p>
              <p className="text-lg font-bold font-mono text-green-500">{bot.pnl}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">Trades</p>
              <p className="text-lg font-bold font-mono text-foreground">{bot.trades}</p>
            </div>
            <div className="h-8 w-24">
              <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                <polyline points="0,25 15,20 30,22 45,15 60,18 75,10 90,12 100,5" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const mockups = {
  analysis: <AnalysisMockup />,
  signals: <SignalsMockup />,
  automation: <AutomationMockup />,
};

export function AiShowcase() {
  const t = useTranslations("aiShowcase");
  const [activeTab, setActiveTab] = useState<"analysis" | "signals" | "automation">("analysis");

  const currentConfig = tabConfig.find((c) => c.key === activeTab)!;

  return (
    <AnimatedReveal>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mx-auto mt-12 max-w-6xl">
          {/* Tab pills with icons */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-secondary/20 backdrop-blur-sm p-1 gap-1 mx-4 sm:mx-0">
              {tabConfig.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t(`tabs.${tab.key}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content area */}
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — text */}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {t(`${activeTab}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {t(`${activeTab}.description`)}
                    </p>
                    <ul className="space-y-3">
                      {currentConfig.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <CheckCircle className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {t(`${activeTab}.${bullet}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right — mockup */}
              <div className="border-t lg:border-t-0 lg:border-l border-border/50 bg-secondary/10 p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {mockups[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedReveal>
  );
}
