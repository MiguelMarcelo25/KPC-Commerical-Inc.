"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import type { CaseStudy } from "@/lib/content";
import { CaseStudyCard } from "./case-study-card";
import { stagger } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Client-side filter wrapper around the existing CaseStudyCard.
 * Chip set is derived from the case-study .type field so adding a new
 * vertical to lib/content automatically extends the filter row.
 */
export function CaseStudiesGrid({ items }: { items: CaseStudy[] }) {
  const [active, setActive] = useState<string>("All");

  const types = useMemo(() => {
    const set = new Set<string>();
    items.forEach((c) => set.add(c.type));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((c) => c.type === active)),
    [items, active],
  );

  return (
    <div>
      {/* Filter chips */}
      <div
        role="tablist"
        aria-label="Filter case studies by industry"
        className="flex flex-wrap gap-2 mb-10"
      >
        {types.map((t) => {
          const isActive = t === active;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t)}
              className={cn(
                "h-10 px-4 rounded-full text-sm font-semibold transition focus-ring border",
                isActive
                  ? "bg-kpc-night text-white border-kpc-night shadow-kpc-card"
                  : "bg-white text-kpc-ink border-black/8 hover:border-black/30",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>

      <motion.div
        key={active /* re-trigger stagger on filter change */}
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((c) => (
          <CaseStudyCard key={c.slug} c={c} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-kpc-muted">
          No case studies in that category yet — call us, we&apos;ll talk you through similar work.
        </p>
      )}
    </div>
  );
}
