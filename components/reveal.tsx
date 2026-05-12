"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { KPC_EASE } from "@/lib/motion";

/**
 * Word-by-word mask reveal — wraps any string and reveals it line-by-line
 * via an overflow mask + per-word ladder fade-up. Used for section H2s.
 *
 * Behaviour:
 * - Words are wrapped in a span with overflow-hidden so each word "rises"
 *   out from below an invisible mask.
 * - Trigger: whileInView, fires once per element on first reach.
 * - Stagger: 0.05s between words; total reveal stays well under 1s for
 *   even the longest section heading.
 * - Reduced motion: handled at the CSS layer (globals.css collapses to
 *   instant fade).
 */
interface RevealProps {
  text: string;
  /** Render tag — defaults to span; pass "h2" for section headings. */
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  staggerDelay?: number;
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay, delayChildren: 0.05 } },
});

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.7, ease: KPC_EASE } },
};

export function Reveal({ text, as = "span", className, staggerDelay = 0.05 }: RevealProps) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(/(\s+)/);

  return (
    <Tag
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      className={cn("inline", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((w, i) =>
          /\s/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={wordVariants} className="inline-block">
                {w}
              </motion.span>
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}
