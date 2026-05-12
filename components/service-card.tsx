"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Droplets, Flame, Bug, Wind, Biohazard, Hammer, Sparkles } from "lucide-react";
import type { Service } from "@/lib/content";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const ICONS: Record<Service["slug"], React.ComponentType<{ className?: string }>> = {
  "water-damage": Droplets,
  "fire-damage": Flame,
  "mold-remediation": Bug,
  "storm-response": Wind,
  "biohazard-cleanup": Biohazard,
  "reconstruction": Hammer,
  "commercial-cleaning": Sparkles,
};

export function ServiceCard({ s, className }: { s: Service; className?: string }) {
  const Icon = ICONS[s.slug];
  return (
    <motion.div variants={fadeInUp} className={cn("group", className)}>
      <Link
        href={`/services/${s.slug}`}
        className={cn(
          "relative block h-full rounded-2xl border border-black/8 bg-white p-7 transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(255,122,26,0.35)] hover:border-kpc-signal/30",
        )}
      >
        {/* Brand-color sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,transparent_30%,rgba(255,122,26,0.08)_50%,transparent_70%)] opacity-0 group-hover:opacity-100 group-hover:[background-position:120%_0] [background-size:200%_100%] transition-all duration-700"
        />

        <div className="relative">
          <div className="size-12 rounded-xl bg-kpc-fog text-kpc-ink flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-kpc-signal group-hover:text-white group-hover:rotate-[8deg]">
            <Icon className="size-5" />
          </div>
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="text-xs font-semibold tabular-nums text-kpc-signal tracking-wider">
              {s.number}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-kpc-muted">
              {s.responseTime.split(",")[0]}
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-kpc-ink leading-tight">
            {s.name}
          </h3>
          <p className="mt-3 text-sm text-kpc-muted leading-relaxed">{s.pitch}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-kpc-ink group-hover:text-kpc-signal transition-colors">
            Learn more
            <ArrowUpRight className="size-3.5 transition-transform group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
