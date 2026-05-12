"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Signature homepage moment. Each service is a full-height card that
 * sticks at the top with a small offset; subsequent cards slide on top of
 * the previous as the user scrolls — like dealing playing cards in reverse.
 *
 * The trick: every card has `position: sticky; top: <stagger>;` and a
 * progressively-larger top value. The previous card stays pinned until
 * the next card scrolls into its sticky slot.
 */
export function StickyCardStack({ services }: { services: Service[] }) {
  return (
    <div className="relative">
      {services.map((s, i) => (
        <StickyCard key={s.slug} service={s} index={i} total={services.length} />
      ))}
    </div>
  );
}

function StickyCard({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle scale + opacity wash so deeper cards appear "to fade behind"
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1, 0.6]);
  const top = `${5 + index * 1.5}rem`;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top, paddingBottom: index === total - 1 ? "0" : "0" }}
    >
      <motion.article
        style={{ scale, opacity }}
        className={cn(
          "relative mx-auto w-full max-w-6xl",
          "rounded-3xl border border-white/8 bg-kpc-deep text-white shadow-kpc-card overflow-hidden",
          "min-h-[520px] md:min-h-[600px]",
        )}
      >
        <div className="grid md:grid-cols-[1fr_1.1fr] h-full">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <span className="font-display text-7xl md:text-8xl font-semibold text-white/10 tracking-tighter leading-none block">
                {service.number}
              </span>
              <h3 className="mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
                {service.name}
              </h3>
              <p className="mt-5 text-base md:text-lg text-white/70 max-w-md leading-relaxed">
                {service.pitch}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-kpc-signal transition-colors group/link"
              >
                Learn more
                <ArrowUpRight className="size-4 transition-transform group-hover/link:rotate-45" />
              </Link>
              <span className="text-xs text-white/40 uppercase tracking-[0.2em]">
                {service.responseTime}
              </span>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-kpc-night to-kpc-deep overflow-hidden">
            {/* IMAGE: industrial-grade hero photography for {service.name} */}
            {/* Placeholder visual: animated radial gradient signature */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,122,26,0.18),transparent_60%)]" />
            <div className="absolute inset-0 grain-overlay" />
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-3">
              {service.outcomes.slice(0, 2).map((o, i) => (
                <div key={i} className="rounded-xl bg-black/30 backdrop-blur-sm border border-white/8 p-4">
                  <p className="text-xs text-white/60 leading-snug">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
