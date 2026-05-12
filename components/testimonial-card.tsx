"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <motion.figure
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative card-light p-7 md:p-8 h-full flex flex-col",
        className,
      )}
    >
      <Quote className="size-8 text-kpc-signal/80 mb-5" aria-hidden />
      <blockquote className="text-lg leading-relaxed text-kpc-ink font-medium flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 pt-6 border-t border-black/8">
        <div className="font-semibold text-kpc-ink">{t.name}</div>
        <div className="text-sm text-kpc-muted">{t.role}</div>
        <div className="text-xs text-kpc-muted/80 mt-0.5">{t.property}</div>
      </figcaption>
    </motion.figure>
  );
}
