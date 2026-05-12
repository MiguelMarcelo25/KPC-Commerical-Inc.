import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Shield, FileText } from "lucide-react";

import { PhoneButton } from "@/components/phone-button";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Start a damage report",
  description:
    "File a commercial damage report with KPC. Dispatcher responds within 30 minutes; mitigation crews on-site in under 60.",
};

const TRUST_ROW = [
  { icon: Clock, label: "30-min dispatcher callback" },
  { icon: Shield, label: "60-min on-site response" },
  { icon: FileText, label: "24-hour claim file delivery" },
];

export default function QuotePage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Damage report</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Start a
            <br />
            <span className="text-gradient-signal">damage report.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            For commercial losses that aren&apos;t actively spreading. Active emergencies should
            call dispatch directly — the form takes longer than the phone.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <span className="text-sm text-white/60">
              The fastest path is always voice.
            </span>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-3 max-w-3xl">
            {TRUST_ROW.map((t) => {
              const Icon = t.icon;
              return (
                <li
                  key={t.label}
                  className="flex items-center gap-3 card-dark px-5 py-4"
                >
                  <Icon className="size-4 text-kpc-signal shrink-0" />
                  <span className="text-sm text-white/85">{t.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FORM */}
      <section className="section-light">
        <div className="container-kpc grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <span className="eyebrow">What happens next</span>
              <h2 className="font-display text-display-md font-semibold text-kpc-ink">
                Submit, get a callback, see a truck.
              </h2>
              <ol className="space-y-5 text-kpc-muted">
                <li className="flex gap-4">
                  <span className="font-display text-kpc-signal font-semibold tabular-nums">01</span>
                  <span>You submit. Report lands on the dispatch floor instantly.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-kpc-signal font-semibold tabular-nums">02</span>
                  <span>Dispatcher calls within 30 minutes to verify and quote arrival.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-kpc-signal font-semibold tabular-nums">03</span>
                  <span>You receive a secure photo-upload link by text.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-kpc-signal font-semibold tabular-nums">04</span>
                  <span>Crew arrives on-site within 60 minutes of dispatch.</span>
                </li>
              </ol>
            </div>
          </div>
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Or skip the form entirely</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Phone is always faster.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            A dispatcher walks you through everything the form asks — in under two minutes — and
            starts rolling trucks while you talk.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <PhoneButton pulse magnetic size="xl" />
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              See how the process works
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
