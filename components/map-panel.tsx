"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { stagger } from "@/lib/motion";

const PINS = [
  { x: 32, y: 38, label: "Los Angeles" },
  { x: 28, y: 30, label: "Burbank" },
  { x: 38, y: 42, label: "Long Beach" },
  { x: 48, y: 36, label: "Anaheim" },
  { x: 58, y: 40, label: "Irvine" },
  { x: 22, y: 48, label: "Torrance" },
  { x: 64, y: 28, label: "Pasadena" },
  { x: 72, y: 50, label: "Riverside" },
  { x: 44, y: 24, label: "Glendale" },
  { x: 52, y: 50, label: "Santa Ana" },
];

export function MapPanel() {
  return (
    <div className="relative aspect-[16/10] w-full rounded-3xl border border-white/8 bg-kpc-deep overflow-hidden">
      {/* Stylized region shape — abstract, not a real map (avoids licensing) */}
      <svg
        aria-hidden
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="region" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#1E2A44" />
            <stop offset="1" stopColor="#0F1729" />
          </linearGradient>
        </defs>
        <path
          d="M5,20 Q12,12 25,15 T55,18 Q70,16 80,25 Q90,32 88,42 Q82,52 65,55 Q40,57 22,52 Q8,46 5,35 Z"
          fill="url(#region)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.2"
        />
      </svg>

      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="absolute inset-0"
      >
        {PINS.map((p, i) => (
          <motion.li
            key={p.label}
            variants={{
              hidden: { opacity: 0, y: -16, scale: 0.5 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
            }}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-full"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <MapPin className="size-5 text-kpc-signal drop-shadow-[0_4px_8px_rgba(255,122,26,0.5)]" fill="currentColor" />
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-2 rounded-full bg-kpc-signal/60 blur-sm"
                  aria-hidden
                />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80 bg-kpc-night/70 backdrop-blur-sm px-1.5 py-0.5 rounded whitespace-nowrap">
                {p.label}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      {/* Coverage caption */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-kpc-night/70 backdrop-blur-md border border-white/8 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-kpc-success animate-pulse" />
          <span className="text-xs font-semibold text-white">10 crews available now</span>
        </div>
        <span className="text-xs text-white/60 tabular-nums">60-min response radius</span>
      </div>
    </div>
  );
}
