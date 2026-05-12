# KPC & Commercial Inc. — Project Conventions

> Auto-loaded by Claude Code at session start. Treat this as binding for any
> work in this repo.

## 🎨 Design Intelligence: ui-ux-pro-max skill

This project bundles the **ui-ux-pro-max** design intelligence skill at
`.claude/skills/ui-ux-pro-max/`.

**Before designing, modifying, or reviewing any UI in this project:**

1. Read `.claude/skills/ui-ux-pro-max/SKILL.md` for the design philosophy
   and decision framework.
2. Cross-check decisions against the skill's data:
   - `data/ui-reasoning.csv` — product-type → recommended token rules
   - `data/colors.csv` — 161 vetted color palettes
   - `data/typography.csv` — 57 font pairings
   - `data/ux-guidelines.csv` — 99 UX checks (accessibility, hierarchy, etc.)
   - `data/styles.csv` — 50+ UI styles (when picking an aesthetic family)
   - `data/products.csv` — 161 product-type definitions
   - `data/stacks/nextjs.csv`, `stacks/react.csv`, `stacks/shadcn.csv` —
     stack-specific implementation rules for our stack
3. Honor the design tokens already established in:
   - `tailwind.config.ts` — kpc-* color palette, type scale, opacity scale,
     keyframes, easing curves
   - `lib/site.ts` — brand identity, navigation, certifications
   - `lib/content.ts` — services, industries, case studies, testimonials, FAQs
   - `lib/motion.ts` — `KPC_EASE` constant + Framer Motion variants

> The skill's Python search CLI (`scripts/search.py`) is not runnable on this
> machine (Python not installed). Read the CSV data files directly instead —
> they are plain text.

## 🧱 Stack

- **Framework**: Next.js 15.5.x (App Router), React 19
- **Language**: TypeScript strict mode — no `any`
- **Styling**: Tailwind CSS v3, `@apply` in `globals.css` for primitives
- **Motion**: Framer Motion 11 + Lenis (smooth scroll). All motion respects
  `prefers-reduced-motion`.
- **Primitives**: Radix UI (Dialog, Accordion, Tabs, Label, Slot, etc.)
- **Forms**: react-hook-form + zod
- **Icons**: Lucide React (no emoji, no FontAwesome)
- **Variants**: class-variance-authority

## 🎙 Voice

Confident, calm, direct, commercial-grade. Never frantic. Short sentences.

**Avoid**: "we care", "your trusted partner", "family of", "passionate about",
"second to none".

**Prefer**: specific times, specific numbers, specific certifications,
specific outcomes ("60-min on-site", "$50M+ commercial property restored",
"IICRC S500", "Joint Commission ready").

## 🛠 Working conventions

- Server Components by default. `"use client"` only when a component uses
  hooks, Framer Motion, or browser APIs.
- Imports use the `@/*` alias rooted at the project root.
- All copy lives in `lib/site.ts` and `lib/content.ts` — never hardcode in
  pages or components.
- Production-grade content always — no Lorem Ipsum, no placeholder copy,
  no `TODO:` strings shipped.
- Mobile-first responsive. Test at 375 / 768 / 1280 / 1920.
- Section rhythm: dark hero → light body → dark final CTA sandwich on
  every page.

## 🚫 Do not

- Do not commit `.claude/worktrees/` (gitignored — Claude Code internal)
- Do not commit images to `node_modules`, `.next`, or `ruvector.db`
- Do not introduce `@/components/ui/*` shadcn aliases — primitives live
  directly under `components/`
- Do not add new color tokens without updating `tailwind.config.ts` AND
  `app/globals.css` AND this CLAUDE.md
