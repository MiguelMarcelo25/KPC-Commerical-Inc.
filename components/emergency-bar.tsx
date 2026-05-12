"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { LiveTicker } from "./live-ticker";

/**
 * Top sticky strip — 36px tall, deep night bg, pulsing red dot.
 * Always visible; the Nav sits underneath and slides into glass on scroll.
 */
export function EmergencyBar() {
  return (
    <div
      role="region"
      aria-label="24/7 emergency dispatch"
      className="sticky top-0 z-50 h-9 w-full bg-kpc-night text-white border-b border-white/5"
    >
      <div className="container-kpc h-full flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span className="size-2 rounded-full bg-kpc-emergency" />
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.8], opacity: [0.55, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-kpc-emergency"
            />
          </span>
          <span className="font-semibold tracking-wide hidden sm:inline">
            24/7 Emergency Response
          </span>
          <span className="font-semibold tracking-wide sm:hidden">24/7</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-white/60">
            <Clock className="size-3" aria-hidden />
            <span>Crews available now</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LiveTicker />
          <span className="hidden lg:inline-flex items-center gap-1.5 text-white/60">
            <MapPin className="size-3" aria-hidden />
            <span>{SITE.region}</span>
          </span>
          <a
            href={SITE.phoneHref}
            className="font-semibold tabular-nums tracking-wide text-white hover:text-kpc-signal transition-colors"
          >
            {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
