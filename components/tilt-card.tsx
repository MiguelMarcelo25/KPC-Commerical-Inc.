"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useHasFinePointer, useReducedMotionSafe } from "@/lib/hooks";
import { cn } from "@/lib/cn";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation degrees on each axis. Default 4° — anything higher looks dated. */
  max?: number;
  /** When true, applies a subtle highlight that follows the cursor. */
  glare?: boolean;
  children: React.ReactNode;
}

/**
 * Tasteful 3D tilt-on-mouse-move wrapper. Reads cursor position relative
 * to the card, maps to rotateX/rotateY (capped at `max` degrees), and
 * uses springs for the easing-out feel. Touch and reduced-motion users
 * get a flat static card.
 */
export function TiltCard({
  max = 4,
  glare = true,
  className,
  children,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useHasFinePointer();
  const reduced = useReducedMotionSafe();

  const x = useMotionValue(0); // normalized -1..1
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 220, damping: 24 });
  const ys = useSpring(y, { stiffness: 220, damping: 24 });

  const rotateY = useTransform(xs, [-1, 1], [-max, max]);
  const rotateX = useTransform(ys, [-1, 1], [max, -max]);
  const glareX = useTransform(xs, [-1, 1], ["20%", "80%"]);
  const glareY = useTransform(ys, [-1, 1], ["20%", "80%"]);
  const glareBg = useTransform(
    [glareX, glareY] as const,
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 55%)`,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!fine || reduced) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    y.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!fine || reduced) {
    return (
      <div className={cn(className)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className={cn("relative will-change-transform", className)}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
        />
      )}
    </motion.div>
  );
}
