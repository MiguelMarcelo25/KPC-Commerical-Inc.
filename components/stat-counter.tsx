"use client";

import { motion } from "framer-motion";
import { useCountUp, useInViewOnce } from "@/lib/hooks";
import { fadeInUp, stagger } from "@/lib/motion";
import type { Stat } from "@/lib/content";
import { cn } from "@/lib/cn";

export function StatCounter({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn("grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-3xl overflow-hidden", className)}
    >
      {stats.map((s) => (
        <StatCell key={s.label} stat={s} />
      ))}
    </motion.div>
  );
}

function StatCell({ stat }: { stat: Stat }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.5);
  const value = useCountUp(stat.target, inView, 1800);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="bg-kpc-night px-6 py-10 md:py-12"
    >
      <div className="font-display text-4xl md:text-5xl font-semibold text-white tabular-nums tracking-tight leading-none">
        {stat.prefix}
        {value.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="mt-3 text-sm text-white/60 leading-snug">{stat.label}</div>
    </motion.div>
  );
}
