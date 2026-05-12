"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { Button, type ButtonProps } from "./button";
import { MagneticButton } from "./magnetic-button";
import { pulseRing } from "@/lib/motion";

interface PhoneButtonProps extends Omit<ButtonProps, "asChild" | "children"> {
  /** Show the soft red pulse ring (only set true on hero / final CTA bands). */
  pulse?: boolean;
  /** Show a "Call" prefix before the number. Defaults to true. */
  withLabel?: boolean;
  /** Wrap in MagneticButton for cursor pull. */
  magnetic?: boolean;
  className?: string;
}

/**
 * The KPC emergency phone CTA. Brand-mandated red (--kpc-emergency).
 * Continuous soft red ring pulse when `pulse` is true.
 */
export function PhoneButton({
  pulse = false,
  withLabel = true,
  magnetic = false,
  size = "lg",
  variant = "primary",
  className,
  ...rest
}: PhoneButtonProps) {
  const inner = (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn("relative overflow-visible", className)}
      {...rest}
    >
      <a href={SITE.phoneHref} aria-label={`Call ${SITE.name} 24/7 emergency line ${SITE.phone}`}>
        <Phone className="size-4 shrink-0" aria-hidden />
        <span>{withLabel ? `Call ${SITE.phone}` : SITE.phone}</span>
        {pulse && (
          <motion.span
            aria-hidden
            variants={pulseRing}
            initial="initial"
            animate="animate"
            className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-kpc-emergency"
          />
        )}
      </a>
    </Button>
  );

  return magnetic ? <MagneticButton>{inner}</MagneticButton> : inner;
}
