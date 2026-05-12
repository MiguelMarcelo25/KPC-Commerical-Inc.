"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer, useReducedMotionSafe } from "@/lib/hooks";

/**
 * Subtle cursor follower — 10px brand-orange dot with ~180ms spring lag.
 * Uses mix-blend-difference so it stays visible over both light and dark
 * backgrounds without needing per-section color logic.
 *
 * Gated: only renders on fine-pointer (mouse) devices AND when
 * prefers-reduced-motion is off. Touchscreens and accessibility users
 * never see it.
 */
export function CursorDot() {
  const fine = useHasFinePointer();
  const reduced = useReducedMotionSafe();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[60] -ml-[5px] -mt-[5px] size-[10px] rounded-full bg-kpc-signal mix-blend-difference"
    />
  );
}
