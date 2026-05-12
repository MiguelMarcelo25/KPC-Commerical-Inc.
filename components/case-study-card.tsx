"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Background photo per case type — Unsplash placeholders, swap to /public/images
 * once production photography is delivered.
 */
const COVER_BY_TYPE: Record<string, string> = {
  Healthcare:
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1400&q=80&auto=format&fit=crop",
  Hospitality:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80&auto=format&fit=crop",
  Multifamily:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80&auto=format&fit=crop",
};

export function CaseStudyCard({ c, className }: { c: CaseStudy; className?: string }) {
  const cover = COVER_BY_TYPE[c.type] ?? COVER_BY_TYPE.Multifamily;

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/8 bg-kpc-deep text-white shadow-kpc-card",
        "min-h-[480px] flex flex-col justify-end isolate",
        "transition-shadow duration-500 hover:shadow-[0_30px_70px_-20px_rgba(255,122,26,0.45)]",
        className,
      )}
    >
      {/* Photo layer — scales on hover */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <Image
          src={cover}
          alt={`${c.property} — ${c.type} case study`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
      </div>

      {/* Gradient mask for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-kpc-night via-kpc-night/85 to-kpc-night/20 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,26,0.18),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="absolute inset-0 grain-overlay -z-10" />

      <div className="relative p-7 md:p-8">
        <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-[0.18em] text-white/55">
          <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white/85">
            {c.type}
          </span>
          <span className="tabular-nums">{c.metric}</span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
          {c.property}
        </h3>
        <p className="mt-3 text-sm text-white/75 leading-relaxed">{c.outcome}</p>
        <Link
          href={`/case-studies/${c.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-kpc-signal group-hover:gap-3 transition-all"
        >
          Read case
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </motion.article>
  );
}
