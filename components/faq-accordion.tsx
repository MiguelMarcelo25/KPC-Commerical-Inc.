"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Faq } from "@/lib/content";

export function FaqAccordion({ items, className }: { items: Faq[]; className?: string }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("divide-y divide-black/8 border-y border-black/8", className)}
    >
      {items.map((it, i) => (
        <Accordion.Item key={i} value={`item-${i}`} className="group">
          <Accordion.Header className="flex">
            <Accordion.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-left focus-ring rounded">
              <span className="font-display text-xl md:text-2xl font-semibold text-kpc-ink leading-snug pr-4">
                {it.q}
              </span>
              <Plus className="size-5 shrink-0 text-kpc-muted transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-[fade-up_0.3s_ease] text-base text-kpc-muted leading-relaxed pb-6 pr-12">
            {it.a}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
