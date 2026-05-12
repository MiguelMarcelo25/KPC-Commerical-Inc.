"use client";

import { forwardRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotionSafe } from "@/lib/hooks";

const buttonStyles = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-kpc-emergency text-white hover:brightness-110 shadow-kpc-emergency",
        signal:
          "bg-kpc-signal text-white hover:brightness-110 shadow-kpc-glow",
        ghost:
          "bg-transparent text-current border border-current/20 hover:border-current/40 hover:bg-current/5",
        ghostLight:
          "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
        ghostDark:
          "bg-transparent text-kpc-ink border border-black/15 hover:border-black/30 hover:bg-black/5",
        link:
          "bg-transparent text-current underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "text-sm h-9 px-4",
        md: "text-sm h-11 px-5",
        lg: "text-base h-13 px-7",
        xl: "text-base h-14 px-8 md:h-16 md:px-10 md:text-lg",
      },
    },
    defaultVariants: { variant: "signal", size: "md" },
  },
);

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, onClick, children, ...props }, ref) => {
    const reduced = useReducedMotionSafe();
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Material-style ripple — originates at the click point, expands outward
      if (!reduced) {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2.2;
        const id = Date.now() + Math.random();
        setRipples((prev) => [...prev, { id, x, y, size }]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
      }
      onClick?.(e);
    };

    // asChild + Slot can only take a SINGLE child, so ripple is gated to
    // the native <button> path. PhoneButton-style <Button asChild><a></Button>
    // gets the lift + shadow but skips ripple — acceptable trade-off.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonStyles({ variant, size }), className)}
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(buttonStyles({ variant, size }), className)}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              aria-hidden
              initial={{ scale: 0, opacity: 0.35 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                left: r.x - r.size / 2,
                top: r.y - r.size / 2,
                width: r.size,
                height: r.size,
              }}
              className="pointer-events-none absolute rounded-full bg-white"
            />
          ))}
        </AnimatePresence>
      </button>
    );
  },
);
Button.displayName = "Button";
