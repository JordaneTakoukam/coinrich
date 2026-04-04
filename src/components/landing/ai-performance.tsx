/** AI Performance — dashboard-style section with chart, metrics ring, and live feed */
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Cpu, Zap, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";

/* ---------- SVG Performance Chart ---------- */
function PerformanceChart() {
  const data = [30, 28, 40, 36, 52, 45, 60, 55, 68, 62, 75, 70, 82, 78, 88, 85, 94];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 600;
  const h = 220;

  // Build smooth path
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }));
  const line = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  // Grid lines
  const gridLines = [0.25, 0.5, 0.75].map((f) => h * f);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: "clamp(180px, 25vw, 280px)" }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(25 95% 50%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(25 95% 50%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(30 90% 45%)" />
            <stop offset="100%" stopColor="hsl(25 95% 55%)" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {gridLines.map((y) => (
          <line key={y} x1={0} y1={y} x2={w} y2={y} stroke="hsl(20 15% 15%)" strokeWidth="1" strokeDasharray="6 4" />
        ))}

        {/* Area fill */}
        <path d={area} fill="url(#chart-fill)" />

        {/* Line */}
        <motion.path
          d={line}
          fill="none"
          stroke="url(#chart-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* End dot */}
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4" fill="hsl(25 95% 50%)" />
        <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="8" fill="hsl(25 95% 50%)" opacity="0.3">
          <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ---------- Signal Feed Row ---------- */
function SignalFeed() {
  const signals = [
    { pair: "BTC/USDT", dir: "up", pct: "+2.4%", conf: 96 },
    { pair: "ETH/USDT", dir: "down", pct: "-1.1%", conf: 89 },
    { pair: "SOL/USDT", dir: "up", pct: "+5.7%", conf: 93 },
    { pair: "AVAX/USDT", dir: "up", pct: "+3.2%", conf: 91 },
  ];
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
      {signals.map((s) => (
        <div key={s.pair} className="flex shrink-0 items-center gap-2.5 rounded-lg border border-border/60 bg-secondary/20 px-3 py-2">
          {s.dir === "up" ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
          )}
          <span className="text-xs font-semibold text-foreground">{s.pair}</span>
          <span className={cn("text-xs font-mono font-semibold", s.dir === "up" ? "text-green-500" : "text-red-500")}>
            {s.pct}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {s.conf}%
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Radial stat (circular progress) ---------- */
function RadialStat({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = circ * (value / 100);

  return (
    <AnimatedReveal delay={delay} className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="hsl(20 15% 12%)" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r={r} fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - dash }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </AnimatedReveal>
  );
}

/* ---------- Main Section ---------- */
export function AiPerformance() {
  const t = useTranslations("aiPerformance");

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-transparent to-card/40" />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeading badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />

        {/* Dashboard card */}
        <AnimatedReveal className="mt-12">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Portfolio Performance</p>
                  <p className="text-xs text-muted-foreground">Last 12 months</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs text-green-500 font-medium">Live</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-foreground">+247.3%</span>
                  <span className="ml-2 inline-flex items-center gap-0.5 text-xs font-semibold text-green-500">
                    <TrendingUp className="h-3 w-3" />
                    +12.4% this month
                  </span>
                </div>
              </div>
            </div>

            {/* Chart area */}
            <div className="px-6 pt-4 pb-2">
              <PerformanceChart />
            </div>

            {/* Signal feed */}
            <div className="px-6 py-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Latest AI Signals</span>
              </div>
              <SignalFeed />
            </div>
          </div>
        </AnimatedReveal>

        {/* Radial stats — 2x2 on mobile, single row on desktop */}
        <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
          <RadialStat value={95} label="Win Rate" color="hsl(142 70% 45%)" delay={0} />
          <RadialStat value={89} label="Sentiment Accuracy" color="hsl(25 95% 50%)" delay={0.1} />
          <RadialStat value={97} label="Uptime SLA" color="hsl(217 91% 60%)" delay={0.2} />
          <RadialStat value={91} label="Risk Score" color="hsl(280 65% 60%)" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
