/** Testimonials — swipeable carousel with auto-scroll and manual navigation */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { cn } from "@/lib/utils";

const testimonialKeys = ["t1", "t2", "t3", "t4", "t5", "t6"] as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // How many cards visible at once
  const getVisible = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => setVisible(getVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getVisible]);

  const maxIndex = testimonialKeys.length - visible;

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  // Auto-scroll every 4s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // Touch/swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <AnimatedReveal className="mt-12 max-w-6xl mx-auto">
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel viewport */}
          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${current * (100 / visible)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonialKeys.map((key) => {
                const name = t(`items.${key}.name`);
                const role = t(`items.${key}.role`);
                const quote = t(`items.${key}.quote`);
                const rating = parseInt(t(`items.${key}.rating`), 10);

                return (
                  <div
                    key={key}
                    className="shrink-0 px-2"
                    style={{ width: `${100 / visible}%` }}
                  >
                    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 relative">
                      {/* Quote icon */}
                      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />

                      {/* User info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                          {getInitials(name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{name}</p>
                          <p className="text-xs text-muted-foreground">{role}</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted"
                            )}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-lg text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-lg text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                current === i
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </AnimatedReveal>
    </section>
  );
}
