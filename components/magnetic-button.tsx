"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";
import { useHasFinePointer, useReducedMotionSafe } from "@/lib/hooks";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Activation radius in pixels — beyond this, no pull. */
  radius?: number;
  /** Maximum pull distance in pixels at the center. */
  strength?: number;
  children: React.ReactNode;
}

/**
 * Wraps any clickable child with a "magnetic" hover that translates the child
 * up to `strength`px toward the cursor when within `radius`px. Disabled on
 * touch devices and when prefers-reduced-motion is on.
 */
export function MagneticButton({
  radius = 100,
  strength = 8,
  children,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 220, damping: 18 });
  const ys = useSpring(y, { stiffness: 220, damping: 18 });
  const fine = useHasFinePointer();
  const reduced = useReducedMotionSafe();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fine || reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    const k = (1 - dist / radius) * strength;
    x.set((dx / radius) * k * 4);
    y.set((dy / radius) * k * 4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={cn("inline-block", className)}
      {...rest}
    >
      <motion.div style={{ x: xs, y: ys }}>{children}</motion.div>
    </div>
  );
}
