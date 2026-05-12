"use client";

import { motion } from "framer-motion";
import { stagger, wordReveal } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface SplitTextProps {
  text: string;
  /** Delay between each word in seconds. */
  staggerDelay?: number;
  className?: string;
  /** Render tag — defaults to span; set "h1" for accessible hero headings. */
  as?: "span" | "h1" | "h2" | "h3" | "p";
  /** Trigger on view rather than mount. */
  whileInView?: boolean;
}

/**
 * Splits a string into per-word motion spans for ladder-fade entrances.
 * Whitespace is preserved so wrapping behaves like natural text.
 *
 * Accessibility: the full string is rendered visually-hidden as a single
 * <span> for screen readers, while the visual reveal uses aria-hidden words.
 */
export function SplitText({
  text,
  staggerDelay = 0.06,
  className,
  as = "span",
  whileInView = false,
}: SplitTextProps) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(/(\s+)/);

  const triggerProps = whileInView
    ? { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <Tag
      variants={stagger(staggerDelay)}
      {...triggerProps}
      className={cn("inline-block", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((w, i) =>
          /\s/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={wordReveal} className="inline-block">
                {w}
              </motion.span>
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}
