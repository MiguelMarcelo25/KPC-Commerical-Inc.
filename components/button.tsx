"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition focus-ring disabled:pointer-events-none disabled:opacity-50",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonStyles({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
