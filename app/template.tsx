"use client";

import { motion } from "framer-motion";
import { KPC_EASE } from "@/lib/motion";

/**
 * Wraps every route in a fade + 12px y-translate transition.
 * `template.tsx` re-mounts on route change (unlike `layout.tsx`),
 * so each navigation triggers the entrance animation once.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: KPC_EASE }}
    >
      {children}
    </motion.div>
  );
}
