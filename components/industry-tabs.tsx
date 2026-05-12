"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/content";
import { KPC_EASE } from "@/lib/motion";

/**
 * Vertical tabs (mobile: horizontal scroll). Selecting an industry smoothly
 * swaps the right-panel content. Used on the homepage commercial focus
 * section AND inside any other commercial-vertical layout.
 *
 * Layout note: rendered inside an already-nested grid on the homepage,
 * so the content panel is intentionally single-column — splitting it
 * further would crush text into one-word-per-line wrapping.
 */
export function IndustryTabs() {
  return (
    <Tabs.Root
      defaultValue={INDUSTRIES[0].slug}
      className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] gap-6 lg:gap-10"
    >
      <Tabs.List
        aria-label="Industries"
        className="flex md:flex-col overflow-x-auto scrollbar-none gap-1 md:gap-0 md:border-l md:border-white/10"
      >
        {INDUSTRIES.map((ind) => (
          <Tabs.Trigger
            key={ind.slug}
            value={ind.slug}
            className="group relative shrink-0 md:shrink whitespace-nowrap md:whitespace-normal text-left px-4 md:px-5 py-3 md:py-4 text-base md:text-lg font-display font-semibold text-white/40 hover:text-white/80 data-[state=active]:text-white transition-colors focus-ring rounded-md"
          >
            <span
              aria-hidden
              className="absolute md:left-[-1px] md:top-1/2 md:-translate-y-1/2 md:h-7 md:w-[3px] left-0 right-0 bottom-0 h-[3px] md:bottom-auto md:right-auto bg-kpc-signal scale-0 group-data-[state=active]:scale-100 origin-center transition-transform duration-300"
            />
            {ind.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="relative min-h-[440px]">
        <AnimatePresence mode="wait">
          {INDUSTRIES.map((ind) => (
            <Tabs.Content
              key={ind.slug}
              value={ind.slug}
              asChild
              forceMount
              className="data-[state=inactive]:hidden"
            >
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: KPC_EASE }}
                className="card-dark p-7 md:p-9 flex flex-col h-full"
              >
                {/* Headline + pitch */}
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[1.1] tracking-tight text-balance">
                  {ind.headline}
                </h3>
                <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed text-pretty">
                  {ind.pitch}
                </p>

                {/* Stat row */}
                <dl className="mt-7 pt-7 border-t border-white/10 grid grid-cols-3 gap-4">
                  {ind.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-xl md:text-2xl font-semibold text-kpc-signal tabular-nums leading-none">
                        {s.value}
                      </dd>
                      <p className="mt-2 text-[11px] uppercase tracking-wider text-white/50 leading-snug">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </dl>

                {/* Considerations */}
                <div className="mt-7 pt-7 border-t border-white/10 flex-1">
                  <span className="eyebrow">Considerations</span>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {ind.considerations.map((c) => (
                      <li key={c} className="flex gap-2.5 text-sm text-white/80 leading-snug">
                        <span className="mt-1.5 size-1.5 rounded-full bg-kpc-signal shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/industries/${ind.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-kpc-signal transition-colors self-start"
                >
                  Read more about {ind.name.toLowerCase()}
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            </Tabs.Content>
          ))}
        </AnimatePresence>
      </div>
    </Tabs.Root>
  );
}
