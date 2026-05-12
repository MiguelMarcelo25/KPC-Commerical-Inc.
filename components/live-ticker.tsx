"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * Live-incrementing counter shown in the emergency bar. Starts from a
 * baseline (date-derived so it feels real and slowly climbs across the
 * year), bumps by 1 every 12 seconds while the page is open.
 *
 * Reduced-motion: still shows the number, just doesn't animate the
 * crossfade between digit states.
 */
interface LiveTickerProps {
  /** Base count for January 1 of the current year. */
  baselinePerYear?: number;
  /** Suffix label, e.g. "properties restored". */
  label?: string;
  /** Tick interval in ms. Default 12s. */
  tickMs?: number;
}

function startOfYearCount(baseline: number): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const elapsedMs = now.getTime() - start.getTime();
  const yearMs = 365.25 * 24 * 60 * 60 * 1000;
  const yearProgress = Math.max(0, Math.min(1, elapsedMs / yearMs));
  return Math.floor(baseline * yearProgress) + Math.floor(Math.random() * 12);
}

export function LiveTicker({
  baselinePerYear = 1840,
  label = "properties restored",
  tickMs = 12_000,
}: LiveTickerProps) {
  const reduced = useReducedMotionSafe();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(startOfYearCount(baselinePerYear));
    const t = setInterval(() => setCount((c) => (c == null ? c : c + 1)), tickMs);
    return () => clearInterval(t);
  }, [baselinePerYear, tickMs]);

  if (count == null) return null; // avoid hydration mismatch

  const formatted = count.toLocaleString();

  return (
    <span className="hidden md:inline-flex items-center gap-2 text-white/55">
      <span aria-hidden className="size-1 rounded-full bg-kpc-signal animate-pulse" />
      <span className="tabular-nums" aria-live="polite">
        {reduced ? (
          formatted
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {formatted}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
      <span className="whitespace-nowrap">{label} YTD</span>
    </span>
  );
}
