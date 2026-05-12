import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { SERVICES } from "@/lib/content";
import { SITE } from "@/lib/site";
import { ServiceCard } from "@/components/service-card";
import { PhoneButton } from "@/components/phone-button";
import { MarqueeStrip } from "@/components/marquee-strip";

export const metadata: Metadata = {
  title: "Services — Every restoration discipline. One contractor.",
  description:
    "Water, fire, mold, storm, biohazard, reconstruction, and commercial cleaning — delivered by a single IICRC-certified firm with 60-minute on-site response across Southern California.",
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Services</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Every restoration service.
            <br />
            <span className="text-gradient-signal">One contractor.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            Most properties end up juggling three vendors after a loss — mitigation,
            reconstruction, and cleaning. We do all seven disciplines under one license,
            one project manager, and one insurance file.
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

      {/* SERVICES GRID */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">The catalog</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink max-w-2xl">
                Seven disciplines. Same crew chiefs. Same accountability.
              </h2>
            </div>
            <p className="max-w-md text-kpc-muted leading-relaxed">
              Every service below is staffed in-house — no day-of subcontracting, no
              passing your loss to whoever has a truck open.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS STRIP */}
      <section className="bg-kpc-night text-white pt-16 pb-4">
        <div className="container-kpc mb-10">
          <div className="flex items-center gap-3 text-white/70">
            <ShieldCheck className="size-5 text-kpc-signal" />
            <span className="text-sm uppercase tracking-[0.22em]">
              Credentialed, bonded, and insurance-approved
            </span>
          </div>
        </div>
        <MarqueeStrip
          items={SITE.certifications.map((c) => ({ label: c.name, short: c.short }))}
        />
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">{SITE.hours} dispatch</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Loss in progress? Skip the form.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            One call routes the right crew, the right equipment, and a project manager
            to your site within the hour.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <PhoneButton pulse magnetic size="xl" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Or send a non-emergency request
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
