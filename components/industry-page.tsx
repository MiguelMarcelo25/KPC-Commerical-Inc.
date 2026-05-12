import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

import type { ServiceSlug } from "@/lib/site";
import { SITE } from "@/lib/site";
import { INDUSTRIES, SERVICES, TESTIMONIALS, type Industry } from "@/lib/content";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { PhoneButton } from "@/components/phone-button";
import { MarqueeStrip } from "@/components/marquee-strip";

/**
 * Shared layout for every /industries/[slug] page.
 * Server Component — no client-only state. Each industry page imports this
 * and passes a slug; data is looked up from `INDUSTRIES`.
 */
export function IndustryPage({
  industry,
  serviceSlugs,
  testimonialIndex,
}: {
  industry: Industry;
  /** Four most-relevant services to cross-sell on this vertical. */
  serviceSlugs: [ServiceSlug, ServiceSlug, ServiceSlug, ServiceSlug];
  /** Round-robin index into TESTIMONIALS. */
  testimonialIndex: number;
}) {
  const services = serviceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const testimonial = TESTIMONIALS[testimonialIndex % TESTIMONIALS.length];

  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Industries / {industry.name}</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            {industry.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            {industry.pitch}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <Link
              href="/emergency-response-agreement"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Set up an Emergency Response Agreement
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-kpc-night text-white border-y border-white/8">
        <div className="container-kpc">
          <dl className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
            {industry.stats.map((s) => (
              <div key={s.label} className="px-2 py-10 md:py-14 md:px-10 first:md:pl-0 last:md:pr-0">
                <dt className="text-xs uppercase tracking-[0.22em] text-white/50">
                  {s.label}
                </dt>
                <dd className="mt-3 font-display text-4xl md:text-5xl font-semibold text-white tabular-nums tracking-tight leading-none">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CONSIDERATIONS */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
            <div className="lg:col-span-5">
              <span className="eyebrow">{industry.name} considerations</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                The compliance and operational realities we&rsquo;ve already solved.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg text-kpc-muted leading-relaxed">
                Every line item below is standard operating procedure on
                {" "}{industry.name.toLowerCase()} engagements — not an upcharge, not a
                conversation we have to discover during the loss.
              </p>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {industry.considerations.map((item) => (
              <li
                key={item}
                className="card-light p-6 flex items-start gap-4 hover:border-kpc-signal/30 transition-colors"
              >
                <span className="mt-0.5 shrink-0 size-7 rounded-full bg-kpc-signal/10 text-kpc-signal flex items-center justify-center">
                  <Check className="size-4" strokeWidth={2.5} />
                </span>
                <span className="text-kpc-ink leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CROSS-SELL SERVICES */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">Services we deliver to {industry.name}</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink max-w-2xl">
                The four disciplines we run most often on {industry.name.toLowerCase()} losses.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kpc-ink hover:text-kpc-signal transition"
            >
              See every service
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow">Field report</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                What it sounds like from the other side of the loss.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <TestimonialCard t={testimonial} />
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS STRIP */}
      <section className="bg-kpc-night text-white pt-16 pb-4">
        <div className="container-kpc mb-10">
          <div className="flex items-center gap-3 text-white/70">
            <ShieldCheck className="size-5 text-kpc-signal" />
            <span className="text-sm uppercase tracking-[0.22em]">
              Credentialed for {industry.name.toLowerCase()} environments
            </span>
          </div>
        </div>
        <MarqueeStrip
          items={SITE.certifications.map((c) => ({ label: c.name, short: c.short }))}
        />
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Pre-position the next loss</span>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-white">
                Building an emergency response plan for your {industry.name.toLowerCase()}? We&rsquo;re already certified.
              </h2>
              <p className="mt-6 max-w-xl text-white/70 leading-relaxed">
                Sign an Emergency Response Agreement — no cost — and your facility moves
                into our priority dispatch tier with a pre-mapped building, pre-negotiated
                rates, and a 30-minute response target.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Link
                href="/emergency-response-agreement"
                className="group card-dark p-6 hover:border-kpc-signal/40 transition-colors flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-kpc-signal font-semibold">
                    Emergency Response Agreement
                  </div>
                  <div className="mt-1 font-display text-lg text-white">
                    Start the no-cost pre-position
                  </div>
                </div>
                <ArrowRight className="size-5 text-white/60 group-hover:translate-x-1 group-hover:text-white transition" />
              </Link>
              <PhoneButton pulse magnetic size="xl" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Small helper to look up an industry by slug at page-build time. */
export function findIndustry(slug: Industry["slug"]): Industry {
  const i = INDUSTRIES.find((x) => x.slug === slug);
  if (!i) throw new Error(`Industry not found: ${slug}`);
  return i;
}
