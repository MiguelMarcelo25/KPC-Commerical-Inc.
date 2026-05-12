import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Truck } from "lucide-react";

import { SITE } from "@/lib/site";
import { PhoneButton } from "@/components/phone-button";
import { MapPanel } from "@/components/map-panel";

export const metadata: Metadata = {
  title: "Service Areas — 60-minute response across Southern California",
  description:
    "KPC dispatches crews across Greater Los Angeles, Orange County, and the Inland Empire — with 60-minute on-site response in the core service area.",
};

const CITIES: { name: string; crews: number; tier: "core" | "extended" }[] = [
  { name: "Los Angeles", crews: 6, tier: "core" },
  { name: "Long Beach", crews: 3, tier: "core" },
  { name: "Burbank", crews: 2, tier: "core" },
  { name: "Santa Monica", crews: 2, tier: "core" },
  { name: "Pasadena", crews: 2, tier: "core" },
  { name: "Glendale", crews: 2, tier: "core" },
  { name: "Anaheim", crews: 3, tier: "core" },
  { name: "Irvine", crews: 2, tier: "core" },
  { name: "Riverside", crews: 2, tier: "extended" },
  { name: "Torrance", crews: 2, tier: "core" },
  { name: "Beverly Hills", crews: 2, tier: "core" },
  { name: "Culver City", crews: 2, tier: "core" },
];

export default function LocationsPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Service areas</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            We respond across {SITE.region}
            <br />
            <span className="text-gradient-signal">within 60 minutes.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            CAT trailers staged across the basin, crews living in every county, and a dispatch
            board that knows which truck is closest before the call ends.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <Link
              href="/emergency-response-agreement"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Lock in priority dispatch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section-dark pt-0 pb-24 md:pb-32">
        <div className="container-kpc relative">
          <MapPanel />
          <p className="mt-4 text-sm text-white/55 max-w-2xl">
            Live truck staging is approximate. Exact response time depends on traffic, time of
            day, and active job load — dispatcher will quote you on the call.
          </p>
        </div>
      </section>

      {/* CITY GRID */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="eyebrow">Where we live</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                12 cities. 30 crews. One number.
              </h2>
            </div>
            <p className="max-w-md text-kpc-muted leading-relaxed">
              Crew counts below are full-time technicians who live and stage in the named city —
              not contractors we can call.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CITIES.map((c) => (
              <article
                key={c.name}
                className="card-light p-6 flex items-start gap-4 hover:border-kpc-signal/50 transition"
              >
                <div className="size-11 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg font-semibold text-kpc-ink leading-snug">
                    {c.name}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-kpc-muted">
                    <Truck className="size-3.5" />
                    <span className="tabular-nums">{c.crews} full-time crews</span>
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] font-semibold">
                    {c.tier === "core" ? (
                      <span className="text-kpc-success">60-min response</span>
                    ) : (
                      <span className="text-kpc-signal">90-min extended</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 p-7 md:p-8 rounded-3xl bg-kpc-paper border border-black/8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="font-display text-xl font-semibold text-kpc-ink">
                Outside this area?
              </div>
              <p className="mt-2 text-kpc-muted leading-relaxed">
                We dispatch within 90 minutes to extended zones across San Bernardino, Ventura,
                and northern San Diego counties — and run mutual-aid contracts in Kern and
                Imperial when CAT events demand it.
              </p>
            </div>
            <PhoneButton withLabel className="shrink-0" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Closer than you think</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            There&apos;s a truck nearby. Right now.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            Call dispatch and we&apos;ll quote you a real arrival window before you hang up.
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
