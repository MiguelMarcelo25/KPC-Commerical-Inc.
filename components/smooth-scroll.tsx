"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionSafe } from "@/lib/hooks";

/**
 * Whole-page smooth scroll. Lerps wheel/trackpad scroll deltas to a target
 * value and re-emits a smoothed scrollY each rAF tick, so the browser
 * paints in-between frames. The result is the "buttery" Apple-site feel.
 *
 * Plays nicely with Framer Motion's useScroll — Lenis updates the real
 * window.scrollY, so existing scroll-linked animations Just Work.
 *
 * Respects prefers-reduced-motion: when reduced, Lenis is never attached
 * and native scroll runs as normal.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,                              // higher = smoother, but laggier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
