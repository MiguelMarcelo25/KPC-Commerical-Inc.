"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/content";
import { KPC_EASE } from "@/lib/motion";

/**
 * Vertical tabs (mobile: horizontal scroll). Selecting an industry smoothly
 * swaps the right-panel image + key stats. Used on the homepage commercial
 * focus section.
 */
export function IndustryTabs() {
  return (
    <Tabs.Root defaultValue={INDUSTRIES[0].slug} className="grid lg:grid-cols-[280px_1fr] gap-8">
      <Tabs.List
        aria-label="Industries"
        className="flex lg:flex-col overflow-x-auto scrollbar-none gap-1 lg:gap-0 lg:border-l lg:border-white/10"
      >
        {INDUSTRIES.map((ind) => (
          <Tabs.Trigger
            key={ind.slug}
            value={ind.slug}
            className="group relative shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal text-left px-4 lg:px-6 py-3 lg:py-5 text-base lg:text-lg font-display font-semibold text-white/40 hover:text-white/80 data-[state=active]:text-white transition-colors focus-ring rounded-md"
          >
            <span
              aria-hidden
              className="absolute lg:left-[-1px] lg:top-1/2 lg:-translate-y-1/2 lg:h-8 lg:w-[3px] left-0 right-0 bottom-0 h-[3px] lg:bottom-auto lg:right-auto bg-kpc-signal scale-0 group-data-[state=active]:scale-100 origin-center transition-transform duration-300"
            />
            {ind.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="relative min-h-[460px]">
        {INDUSTRIES.map((ind) => (
          <Tabs.Content
            key={ind.slug}
            value={ind.slug}
            asChild
            forceMount
            className="data-[state=inactive]:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: KPC_EASE }}
                className="grid md:grid-cols-2 gap-6 h-full"
              >
                {/* Stats panel */}
                <div className="card-dark p-7 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
                      {ind.headline}
                    </h3>
                    <p className="mt-4 text-white/70 leading-relaxed">{ind.pitch}</p>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {ind.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-2xl font-semibold text-kpc-signal tabular-nums">
                          {s.value}
                        </div>
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-white/50 leading-snug">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Considerations panel */}
                <div className="card-dark p-7 md:p-8 flex flex-col">
                  <span className="eyebrow">{ind.name} considerations</span>
                  <ul className="mt-5 space-y-3 flex-1">
                    {ind.considerations.map((c) => (
                      <li key={c} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                        <span className="mt-1.5 size-1.5 rounded-full bg-kpc-signal shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-kpc-signal transition-colors"
                  >
                    Read more about {ind.name.toLowerCase()}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  );
}
