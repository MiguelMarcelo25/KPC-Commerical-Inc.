/**
 * Reusable Framer Motion variants and easing constants for the KPC site.
 * Centralised so timing tweaks ripple across every animation.
 */
import type { Variants, Transition } from "framer-motion";

/** Default custom cubic-bezier — feels "premium expensive" */
export const KPC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ENTRANCE: Transition = { duration: 0.6, ease: KPC_EASE };
export const HOVER: Transition = { duration: 0.3, ease: KPC_EASE };

/** Fade + slight upward translate — primary section reveal */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: ENTRANCE },
};

/** Stagger container — wraps children that should ladder in */
export const stagger = (childrenDelay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: childrenDelay, delayChildren: 0.1 } },
});

/** Used by SplitText word reveal */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: KPC_EASE } },
};

/** Card hover — used by service cards, case study cards */
export const cardHover: Variants = {
  rest: { scale: 1, y: 0, transition: HOVER },
  hover: { scale: 1.02, y: -4, transition: HOVER },
};

/** Pulsing emergency ring */
export const pulseRing: Variants = {
  initial: { scale: 1, opacity: 0.45 },
  animate: {
    scale: 1.6,
    opacity: 0,
    transition: { duration: 2, ease: KPC_EASE, repeat: Infinity, repeatDelay: 0 },
  },
};
