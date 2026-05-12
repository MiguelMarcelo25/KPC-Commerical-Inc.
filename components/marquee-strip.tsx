"use client";

import { cn } from "@/lib/cn";

interface MarqueeStripProps {
  items: { label: string; short?: string }[];
  className?: string;
}

/**
 * Infinite horizontal marquee. Duplicates the items list so the keyframe
 * `translateX(-50%)` produces a seamless loop. Pauses on hover.
 */
export function MarqueeStrip({ items, className }: MarqueeStripProps) {
  // Duplicate so the loop seam is invisible
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden border-y border-white/8 bg-kpc-night/60",
        className,
      )}
      aria-label="Trusted certifications and partners"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-kpc-night to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-kpc-night to-transparent z-10" />

      <ul className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused] gap-12 py-6 pr-12">
        {doubled.map((item, i) => (
          <li
            key={`${item.label}-${i}`}
            className="flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-white/45 whitespace-nowrap"
            aria-hidden={i >= items.length}
          >
            <span className="size-1.5 rounded-full bg-kpc-signal/70" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
