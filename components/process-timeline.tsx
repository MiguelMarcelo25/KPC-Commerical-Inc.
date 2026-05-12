"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, ClipboardList, ShieldCheck, Wrench, Hammer } from "lucide-react";
import { fadeInUp, stagger } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    icon: Phone,
    title: "Call & Dispatch",
    body: "One number, 24/7. Dispatcher captures property, damage, and access. Trucks roll within 15 minutes of call.",
    target: "60 min on-site",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Assess & Document",
    body: "Crew lead walks the loss with thermal imaging, photo log, and Xactimate scope. Adjuster gets file before mitigation starts.",
    target: "First-hour scope",
  },
  {
    n: "03",
    icon: ShieldCheck,
    title: "Mitigate & Stabilize",
    body: "Containment up. Extraction running. Drying chambers established. Property stops getting worse within hour one.",
    target: "Hour 1 stabilization",
  },
  {
    n: "04",
    icon: Wrench,
    title: "Restore & Clean",
    body: "Daily moisture readings. Antimicrobial treatment per IICRC S500. Independent post-clearance when relevant.",
    target: "Standard 3-5 days",
  },
  {
    n: "05",
    icon: Hammer,
    title: "Reconstruct & Return",
    body: "Same project manager carries you through reconstruction. Drywall, paint, flooring, finish. Final walk with property manager.",
    target: "Single accountability",
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto">
      {/* Vertical line track */}
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-white/10" aria-hidden />
      {/* Drawing line */}
      <motion.div
        aria-hidden
        style={{ height: lineHeight }}
        className="absolute left-[27px] top-2 w-px bg-gradient-to-b from-kpc-signal via-kpc-signal to-transparent origin-top"
      />

      <motion.ol
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-12 md:space-y-16"
      >
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <motion.li key={step.n} variants={fadeInUp} className="relative pl-20">
              <motion.div
                whileInView={{ scale: [0.6, 1.15, 1], opacity: [0, 1, 1] }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="absolute left-0 top-0 size-14 rounded-2xl bg-kpc-signal text-white flex items-center justify-center shadow-kpc-glow"
              >
                <Icon className="size-6" />
              </motion.div>
              <div>
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="font-display text-sm font-semibold text-kpc-signal tabular-nums tracking-wider">
                    {step.n}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                    {step.target}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-white/70 leading-relaxed max-w-lg">
                  {step.body}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
