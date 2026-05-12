# KPC & Commercial Inc. — Marketing Site

Production-grade marketing site for a commercial restoration & cleanup company. Built with Next.js 15, React 19, TypeScript (strict), Tailwind v3, and Framer Motion 11.

> Voice: confident, calm, direct, commercial-grade. Never frantic. Sentences are short. We move fast so the customer doesn't have to think.

---

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build       # Production build
npm run start       # Run the production build
npm run typecheck   # TypeScript check (no emit)
npm run lint        # ESLint
```

Node 20+ recommended. Tested with npm 11.

---

## 📂 Project layout

```
app/                      Next.js App Router pages
  api/dispatch/           Stub form endpoint — REPLACE with CRM/email/Slack
  industries/[slug]/      5 industry pages (healthcare, hospitality, …)
  services/[slug]/        7 service detail pages (water-damage, fire-damage, …)
  case-studies/[slug]/    Dynamic case study pages
  layout.tsx              Root layout: fonts, metadata, JSON-LD, providers
  template.tsx            Page-transition wrapper (fade + 12px y-translate)
  globals.css             Tailwind base + design tokens + reduced-motion fallback
  page.tsx                Homepage (17 sections)
  sitemap.ts | robots.ts  SEO metadata routes

components/               Reusable UI
  button.tsx              Variants: primary, signal, ghost, ghostLight, ghostDark, link
  phone-button.tsx        Branded emergency-red phone CTA with optional pulse + magnetic
  emergency-bar.tsx       Top sticky strip with pulsing red dot
  emergency-dialog.tsx    Global dispatch dialog (Radix + react-hook-form + zod)
  nav.tsx                 Sticky nav with mega-menu, mobile sheet, scroll-progress bar
  footer.tsx              Dark 4-column footer with closing big-type statement
  providers.tsx           EmergencyDialogContext (open/close from anywhere)
  split-text.tsx          Per-word stagger reveal (used on hero H1)
  stat-counter.tsx        Animated count-up grid (eased)
  marquee-strip.tsx       Infinite horizontal scroll, pauses on hover
  sticky-card-stack.tsx   Signature scroll moment — services stack as you scroll
  process-timeline.tsx    Scroll-anchored vertical timeline, line draws in
  industry-tabs.tsx       Vertical tabs with smooth panel swap
  before-after-slider.tsx Draggable divider, keyboard-accessible
  case-study-card.tsx     Hover-lifted card with brand sweep
  testimonial-card.tsx    Quote card
  faq-accordion.tsx       Radix Accordion with rotating + icon
  map-panel.tsx           Stylized region map with drop-pin sequence
  magnetic-button.tsx     Cursor-pull wrapper (disabled on touch + reduced-motion)
  service-card.tsx        Compact service tile with icon-rotate hover
  service-detail-layout.tsx  Shared layout for the 7 service pages
  industry-page.tsx       Shared layout for the 5 industry pages
  quote-form.tsx          Long-form damage report intake
  contact-form.tsx        Contact-page intake form
  case-studies-grid.tsx   Filterable case studies grid

lib/                      Headless utilities & content
  cn.ts                   clsx + tailwind-merge
  motion.ts               KPC_EASE constant + reusable Framer Motion variants
  hooks.ts                useReducedMotionSafe, useInViewOnce, useCountUp,
                          useScrollProgress, useHasFinePointer
  site.ts                 Brand, contact, navigation — single source of truth
  content.ts              Services, industries, case studies, testimonials, FAQs, stats

.claude/skills/ui-ux-pro-max/  Bundled design-intelligence skill (project-local)
```

---

## 🎨 Design system

### Color palette (`tailwind.config.ts`, `app/globals.css`)

| Token | Value | Use |
|-------|-------|-----|
| `kpc-night` | `#0A0F1C` | Hero / footer bg |
| `kpc-deep` | `#0F1729` | Cards on dark |
| `kpc-steel` | `#1E2A44` | Borders on dark |
| `kpc-fog` | `#F5F7FA` | Light section bg |
| `kpc-paper` | `#FFFFFF` | Paper sections |
| `kpc-ink` | `#0A0F1C` | Body text on light |
| `kpc-muted` | `#5B6478` | Secondary text |
| `kpc-emergency` | `#E63946` | 24/7 phone CTA — **never decorative** |
| `kpc-signal` | `#FF7A1A` | Primary brand accent |
| `kpc-gold` | `#D4A85A` | Premium tier accent |
| `kpc-success` | `#2DBE7E` | Success states |

> `kpc-emergency` is reserved for phone CTAs and live-status pulses.
> `kpc-signal` is the everyday brand accent.

### Typography

- **Display:** Space Grotesk 500/600/700 — headings only
- **Body:** Inter 400/500/600
- **H1:** `clamp(2.75rem, 6vw, 5.5rem)`, line-height 0.95, letter-spacing -0.03em (`text-display-xl`)
- **H2:** `clamp(2rem, 4vw, 3.5rem)`, line-height 1.0 (`text-display-lg`)
- Body: 16px / 1.65

### Spacing & layout

- 8-point spacing scale (Tailwind default)
- Max content width: `1280px` via `.container-kpc`
- Section padding: `py-24 md:py-32` via `.section-dark`/`.section-light`/`.section-paper`
- Card radii: `rounded-2xl` cards, `rounded-xl` buttons, `rounded-full` pills

---

## 🎬 Animation specs

Every animation is defined once in `lib/motion.ts` or `tailwind.config.ts`, then composed by components. To re-tune the entire site's "feel," change the `KPC_EASE` constant or default durations in `lib/motion.ts`.

| # | Animation | Where defined | How to tune |
|---|-----------|---------------|-------------|
| 1 | Hero word reveal | `components/split-text.tsx` + `wordReveal` variant | `staggerDelay` prop (default 0.06s) |
| 2 | Phone-CTA pulse ring | `pulseRing` variant + `animate-pulse-ring` keyframe | Tailwind keyframe `pulse-ring` (2s cycle) |
| 3 | Scroll-progress bar | `nav.tsx` via `useScrollProgress()` | Linear 0–1 transform on `scaleX` |
| 4 | Magnetic buttons | `components/magnetic-button.tsx` | `radius` (100px) + `strength` (8px) props |
| 5 | Trust marquee | `components/marquee-strip.tsx` + `animate-marquee` | Tailwind keyframe `marquee` (32s) |
| 6 | Service-card hover | `components/service-card.tsx` | Border + icon rotation + brand sweep |
| 7 | Stats counter | `useCountUp` in `lib/hooks.ts` | `duration` (1800ms) + easeOutCubic |
| 8 | Process timeline draw | `components/process-timeline.tsx` via `useScroll` | `offset` tuple, `lineHeight` transform |
| 9 | Before/after drag | `components/before-after-slider.tsx` | Pointer events + clip-path inset |
| 10 | Sticky service stack | `components/sticky-card-stack.tsx` via `useScroll` | `top` stagger + scale/opacity transforms |
| 11 | Page transitions | `app/template.tsx` | 0.45s fade + 12px y-translate |
| 12 | Cursor follower | (not enabled — opt-in via `useHasFinePointer`) | — |
| 13 | Live status pill | `app/page.tsx` hero | CSS `animate-ping` on success dot |
| 14 | Map drop-pins | `components/map-panel.tsx` | Spring transition per pin (stagger 0.08s) |

### Easing & timing

```ts
// lib/motion.ts
export const KPC_EASE = [0.22, 1, 0.36, 1];   // Premium expensive feel
export const ENTRANCE = { duration: 0.6, ease: KPC_EASE };
export const HOVER    = { duration: 0.3, ease: KPC_EASE };
```

### Reduced motion

`prefers-reduced-motion: reduce` is honored at the CSS layer (collapses all animation to ≤0.01ms) and in JS via `useReducedMotionSafe()`. Stats counters jump to final value, magnetic buttons disable, page transitions disable.

---

## ✏️ Editing content

All copy lives in two files:

- **`lib/site.ts`** — brand identity, phone, address, navigation menu, certifications
- **`lib/content.ts`** — services, industries, case studies, testimonials, FAQs, stats

No copy is hardcoded in pages. To add a new service: add an entry to `SERVICES`, run `mkdir app/services/<slug>` and copy any existing service page (it's a 15-line wrapper around `<ServiceDetailLayout>`).

---

## 🧪 Backend — what's stubbed

This is a **frontend-only** build. The following endpoints are stubs and must be replaced before production:

- **`app/api/dispatch/route.ts`** — accepts the dispatch form payload, logs to stdout, returns a synthetic ticket. Replace with real CRM/Slack/email/Twilio integration.
- The contact and quote forms `POST` to the same endpoint.

When replacing the backend, consider:
1. Webhook → Slack `#dispatch` channel for instant team notification
2. Email via Resend / Postmark to `dispatch@kpccommercial.com`
3. Optional: Twilio call-routing if `callMeNow=true` in the payload
4. Persist to a database for the dispatcher dashboard

---

## 🧰 Tech stack

| Concern | Library | Version |
|---------|---------|---------|
| Framework | Next.js (App Router) | 15.5.18 |
| UI lib | React | 19.0.0 |
| Language | TypeScript (strict) | 5.7.3 |
| Styling | Tailwind CSS v3 | 3.4.17 |
| Motion | Framer Motion | 11.18.2 |
| Forms | react-hook-form + zod | 7.54 / 3.24 |
| Primitives | Radix UI (Dialog, Accordion, Tabs) | 1.1.x |
| Icons | Lucide React | 0.469 |
| Carousels | Embla Carousel | 8.5 |
| Variants | class-variance-authority | 0.7.1 |

---

## ✅ Lighthouse targets

- Performance ≥ 95
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Bundled tactics: `next/font` for self-hosted Inter + Space Grotesk, `next/image` everywhere with explicit sizes, `optimizePackageImports` for `lucide-react` and `framer-motion`, lazy-mounted decorative motion behind `useInView`.

---

## 📍 Project status

- ✅ Foundation (Next 15, TS strict, Tailwind v3, Framer Motion)
- ✅ Custom design system (`kpc-*` palette, fonts, spacing, motion variants)
- ✅ All 23 pages with production copy
- ✅ All 15+ shared components
- ✅ All 14 named animations
- ✅ SEO (per-page metadata, JSON-LD `LocalBusiness`, sitemap, robots)
- ✅ Mobile-first responsive (375 / 768 / 1280 / 1920)
- ✅ `prefers-reduced-motion` respected
- 🔲 Real images (currently using SVG placeholders + abstract gradients)
- 🔲 Backend integration (CRM / Slack / email)
- 🔲 Live phone routing (replace placeholder phone in `lib/site.ts`)

---

## 📜 License

Proprietary — © KPC & Commercial Inc.
