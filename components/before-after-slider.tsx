"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/cn";

interface BeforeAfterSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  /** Visual content (or empty divs) — anything React-renderable. */
  before: React.ReactNode;
  after: React.ReactNode;
  className?: string;
}

/**
 * Draggable divider over a stacked image pair. The "after" sits on top with a
 * `clip-path: inset(0 X% 0 0)` driven by the divider position.
 *
 * Keyboard: Tab to handle, Left/Right arrows to nudge by 5%.
 */
export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
  before,
  after,
  className,
}: BeforeAfterSliderProps) {
  const [pct, setPct] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPct((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPct((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/8 bg-kpc-deep cursor-ew-resize select-none",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* BEFORE — full layer */}
      <div className="absolute inset-0">{before}</div>
      {/* AFTER — clipped from the right */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        {after}
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs uppercase tracking-[0.2em] bg-black/50 backdrop-blur-sm text-white/80 px-2.5 py-1 rounded">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 text-xs uppercase tracking-[0.2em] bg-kpc-signal text-white px-2.5 py-1 rounded">
        {afterLabel}
      </span>

      {/* Divider line + handle */}
      <motion.div
        aria-hidden
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] pointer-events-none"
        style={{ left: `${pct}%` }}
      />
      <button
        type="button"
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ left: `${pct}%` }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-white text-kpc-night shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing focus-ring"
      >
        <GripVertical className="size-5" />
      </button>
    </div>
  );
}
