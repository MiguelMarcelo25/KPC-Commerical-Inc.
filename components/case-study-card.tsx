"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function CaseStudyCard({ c, className }: { c: CaseStudy; className?: string }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/8 bg-kpc-deep text-white shadow-kpc-card",
        "min-h-[480px] flex flex-col justify-end",
        className,
      )}
    >
      {/* IMAGE: case study cover for {c.property} */}
      <div className="absolute inset-0 bg-gradient-to-br from-kpc-night via-kpc-deep to-kpc-night" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,26,0.15),transparent_55%)]" />
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative p-7 md:p-8">
        <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-[0.18em] text-white/50">
          <span className="px-2 py-1 rounded-md bg-white/10 text-white/80">{c.type}</span>
          <span>{c.metric}</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
          {c.property}
        </h3>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.outcome}</p>
        <Link
          href={`/case-studies/${c.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-kpc-signal hover:gap-3 transition-all"
        >
          Read case
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </motion.article>
  );
}
