import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  Bug,
  Wind,
  Biohazard,
  Hammer,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import type { Service } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PhoneButton } from "@/components/phone-button";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";

const ICONS: Record<Service["slug"], React.ComponentType<{ className?: string }>> = {
  "water-damage": Droplets,
  "fire-damage": Flame,
  "mold-remediation": Bug,
  "storm-response": Wind,
  "biohazard-cleanup": Biohazard,
  "reconstruction": Hammer,
  "commercial-cleaning": Sparkles,
};

const PROCESS_STEPS = [
  { label: "Call", note: "Live dispatcher, 24/7" },
  { label: "Assess", note: "On-site within 60 min" },
  { label: "Mitigate", note: "Stabilize the loss" },
  { label: "Restore", note: "Dry, clean, decontaminate" },
  { label: "Reconstruct", note: "Build it back to spec" },
] as const;

export function ServiceDetailLayout({ service }: { service: Service }) {
  const Icon = ICONS[service.slug];

  return (
    <main className="bg-kpc-paper text-kpc-ink">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-dark grain-overlay">
        <div
          aria-hidden
          className="absolute inset-0 bg-kpc-radial-night opacity-90 pointer-events-none"
        />
        <div className="container-kpc relative">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow">Service {service.number}</span>
              <span className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
                <span className="size-1.5 rounded-full bg-kpc-success animate-pulse" />
                Crews available now
              </span>
            </div>

            <div className="flex items-start gap-5 mb-8">
              <div className="hidden md:flex shrink-0 size-16 rounded-2xl bg-kpc-signal/15 border border-kpc-signal/30 text-kpc-signal items-center justify-center">
                <Icon className="size-7" />
              </div>
              <h1 className="font-display text-display-xl font-semibold text-white leading-[0.95]">
                {service.name}
              </h1>
            </div>

            <p className="text-lg md:text-2xl text-white/75 max-w-3xl leading-relaxed text-pretty">
              {service.pitch}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <PhoneButton pulse size="lg" />
              <Button asChild size="lg" variant="ghostLight">
                <Link href="/quote">
                  Start damage report
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-kpc-signal" aria-hidden />
                {service.responseTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-kpc-success" aria-hidden />
                IICRC Certified Firm
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-kpc-success" aria-hidden />
                Insurance approved
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Long description ─────────────────────────────────── */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <span className="eyebrow mb-6">What this service is</span>
              <p className="mt-6 font-display text-display-md text-kpc-ink text-balance leading-tight">
                {service.description}
              </p>
            </div>
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="card-light p-7">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-kpc-emergency">
                  <span className="size-2 rounded-full bg-kpc-emergency animate-pulse" />
                  Response standard
                </div>
                <p className="mt-4 font-display text-2xl text-kpc-ink leading-snug">
                  {service.responseTime}
                </p>
                <p className="mt-4 text-sm text-kpc-muted leading-relaxed">
                  Dispatch is staffed by humans on a {SITE.hours} rotation out of {SITE.address.city}, {SITE.address.state}. No call trees, no overflow service.
                </p>
                <div className="mt-6 pt-6 border-t border-black/8">
                  <PhoneButton size="md" withLabel className="w-full" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Capabilities grid ────────────────────────────────── */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow mb-6">Capabilities</span>
            <h2 className="mt-6 font-display text-display-lg text-kpc-ink leading-tight">
              What's included on every {service.name.toLowerCase()} engagement.
            </h2>
            <p className="mt-5 text-lg text-kpc-muted leading-relaxed">
              Every line below is standard scope — not an upsell. Documented to industry standards, billed to insurance, delivered with photo evidence.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-4">
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className={cn(
                  "group flex items-start gap-4 rounded-2xl border border-black/8 bg-white p-6",
                  "transition-all duration-300 hover:border-kpc-signal/40 hover:shadow-[0_20px_40px_-25px_rgba(255,122,26,0.4)]",
                )}
              >
                <span className="shrink-0 mt-0.5 size-9 rounded-xl bg-kpc-fog text-kpc-signal flex items-center justify-center transition-colors group-hover:bg-kpc-signal group-hover:text-white">
                  <CheckCircle2 className="size-5" aria-hidden />
                </span>
                <span className="text-base text-kpc-ink leading-snug pt-1.5">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Outcomes band ────────────────────────────────────── */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow mb-6">Outcomes</span>
            <h2 className="mt-6 font-display text-display-lg text-white leading-tight">
              Receipts, not promises.
            </h2>
            <p className="mt-5 text-lg text-white/65 leading-relaxed">
              The numbers below come from completed {service.name.toLowerCase()} engagements over the last 18 months. Audited internally, available to verified clients on request.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {service.outcomes.map((outcome, idx) => {
              const match = outcome.match(/^([\d.,]+%?|\$[\d.,]+[A-Z]?\+?|Sub-\d+-?[a-z]*|Zero|\d+\+?)/i);
              const lead = match ? match[0] : `0${idx + 1}`;
              const rest = match ? outcome.slice(match[0].length).replace(/^[\s,]+/, "") : outcome;
              return (
                <div
                  key={outcome}
                  className="card-dark p-8 md:p-10 relative overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute -top-12 -right-10 size-44 rounded-full bg-kpc-signal/10 blur-3xl pointer-events-none"
                  />
                  <div className="relative">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-kpc-signal">
                      Outcome 0{idx + 1}
                    </div>
                    <p className="mt-5 font-display text-4xl md:text-5xl text-gradient-signal font-semibold leading-[1.05]">
                      {lead}
                    </p>
                    <p className="mt-4 text-lg text-white/80 leading-snug max-w-md">
                      {rest || outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process recap ────────────────────────────────────── */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow mb-6">How the work runs</span>
              <h2 className="mt-6 font-display text-display-lg text-kpc-ink leading-tight">
                Same five steps, every loss.
              </h2>
            </div>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-semibold text-kpc-ink hover:text-kpc-signal transition-colors focus-ring rounded-md"
            >
              See the full process
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <ol className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, idx) => (
              <li
                key={step.label}
                className="relative card-light p-6 transition-all duration-300 hover:-translate-y-1 hover:border-kpc-signal/30"
              >
                <div className="text-xs font-semibold tabular-nums text-kpc-signal tracking-wider">
                  0{idx + 1}
                </div>
                <div className="mt-3 font-display text-xl font-semibold text-kpc-ink">
                  {step.label}
                </div>
                <div className="mt-2 text-xs text-kpc-muted leading-relaxed">
                  {step.note}
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 size-4 text-kpc-muted/40"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="section-dark grain-overlay">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kpc-signal/40 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-kpc-radial-night opacity-80 pointer-events-none"
        />
        <div className="container-kpc relative">
          <div className="max-w-4xl">
            <span className="eyebrow mb-6">Right now</span>
            <h2 className="mt-6 font-display text-display-xl text-white font-semibold leading-[0.95] text-balance">
              Damage to your property?{" "}
              <span className="text-gradient-signal">Crew rolling in 60 minutes.</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              One call to {SITE.phone} reaches a live dispatcher. We confirm scope, hand it to the closest crew lead, and start documenting the loss before the truck arrives.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <PhoneButton pulse size="lg" />
              <Button asChild size="lg" variant="ghostLight">
                <Link href="/contact">
                  <PhoneCall className="size-4" aria-hidden />
                  Request callback
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
