"use client";

import { motion } from "framer-motion";

interface AnimatedMeshProps {
  /** Color stops as comma-sep RGBA strings. Default = brand orange + emergency red. */
  colors?: [string, string];
  /** Opacity ceiling 0–1, default 0.18 */
  intensity?: number;
}

/**
 * Slow-drifting blob backdrop for dark sections. Two large radial gradients
 * (KPC signal + a hint of emergency red) translate on long-period loops
 * so the page never feels static — but it's subtle enough you don't
 * consciously notice it.
 *
 * Renders fixed positioned blurs inside a parent with `position: relative`
 * + `overflow: hidden`, so it stays contained.
 */
export function AnimatedMesh({
  colors = ["rgba(255,122,26,1)", "rgba(230,57,70,1)"],
  intensity = 0.18,
}: AnimatedMeshProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute size-[60vw] rounded-full blur-[120px]"
        style={{ background: colors[0], opacity: intensity }}
        initial={{ x: "-20%", y: "10%" }}
        animate={{
          x: ["-20%", "30%", "-10%", "-20%"],
          y: ["10%", "-15%", "20%", "10%"],
        }}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute size-[50vw] rounded-full blur-[140px]"
        style={{ background: colors[1], opacity: intensity * 0.7 }}
        initial={{ x: "60%", y: "60%" }}
        animate={{
          x: ["60%", "20%", "70%", "60%"],
          y: ["60%", "30%", "50%", "60%"],
        }}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
