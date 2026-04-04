/** Animated stat counter that counts up when scrolled into view. Parses prefix/suffix from the value string and animates the numeric portion. */
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: 0, suffix: value, decimals: 0 };
  }

  const numStr = match[2];
  const dotIndex = numStr.indexOf(".");
  const decimals = dotIndex === -1 ? 0 : numStr.length - dotIndex - 1;

  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    decimals,
  };
}

export function StatCounter({ value, label, className }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);

  const { prefix, number: target, suffix, decimals } = parseValue(value);

  const display = useTransform(motionValue, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, target, {
      duration: 1.5,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, motionValue, target]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <DisplayValue display={display} />
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/** Inner component that subscribes to the motion value for re-renders. */
function DisplayValue({
  display,
}: {
  display: ReturnType<typeof useTransform<number, string>>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = v;
      }
    });
    return unsubscribe;
  }, [display]);

  return (
    <span
      ref={ref}
      className="font-mono text-4xl font-bold text-foreground md:text-5xl"
    >
      {display.get()}
    </span>
  );
}
