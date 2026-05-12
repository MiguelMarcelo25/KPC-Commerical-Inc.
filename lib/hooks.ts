"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Wraps Framer's `useReducedMotion` so consumers get a guaranteed boolean
 * and `false` during SSR (avoids hydration mismatch on first paint).
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  return Boolean(reduced);
}

/**
 * Triggers exactly once when the element first scrolls into view.
 * Use for stat counters, line-draw timelines, and other "reveal" effects
 * that should not re-fire on scroll-back-up.
 */
export function useInViewOnce<T extends HTMLElement>(
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

/**
 * Animated count-up from 0 to `target` over `duration` ms once `start` is true.
 * Eases with a cubic out so the final digits don't feel mechanical.
 */
export function useCountUp(target: number, start: boolean, duration = 1600): number {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);

  return value;
}

/** Track scroll position as a 0–1 progress value relative to document height. */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/** Detect mouse-capable viewport — used to gate cursor follower & magnetic effects. */
export function useHasFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return fine;
}
