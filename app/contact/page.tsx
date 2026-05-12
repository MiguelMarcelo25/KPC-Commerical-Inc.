import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";

import { SITE } from "@/lib/site";
import { PhoneButton } from "@/components/phone-button";
import { MapPanel } from "@/components/map-panel";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — We're closer than you think",
  description: `Reach ${SITE.name} dispatch 24/7 at ${SITE.phone}, email ${SITE.email}, or visit our Los Angeles office at ${SITE.address.street}.`,
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

const VALID_TOPICS = ["general", "era", "estimate", "insurance", "careers", "press"] as const;
type Topic = (typeof VALID_TOPICS)[number];

function normalizeTopic(t: string | undefined): Topic {
  if (t && (VALID_TOPICS as readonly string[]).includes(t)) return t as Topic;
  return "general";
}

export default async function ContactPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const defaultTopic = normalizeTopic(sp.type);

  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            We&apos;re closer
            <br />
            <span className="text-gradient-signal">than you think.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            One phone number, one email, one street address. Dispatch is staffed continuously —
            holidays, Sundays, the middle of the night.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="section-light">
        <div className="container-kpc grid gap-12 lg:grid-cols-12">
          {/* LEFT — direct contact */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="eyebrow">Call us</span>
              <h2 className="mt-4 font-display text-display-md font-semibold text-kpc-ink">
                The fastest way is the phone.
              </h2>
              <p className="mt-4 text-kpc-muted leading-relaxed">
                Active losses, ERA setup, panel discussions — all start with one call. Dispatcher
                answers in under three rings.
              </p>
              <div className="mt-6">
                <PhoneButton pulse magnetic size="xl" />
              </div>
            </div>

            <ul className="space-y-5 pt-8 border-t border-black/8">
              <li className="flex items-start gap-4">
                <div className="size-11 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-kpc-muted">
                    Email
                  </div>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-display text-lg font-semibold text-kpc-ink hover:text-kpc-signal transition"
                  >
                    {SITE.email}
                  </a>
                  <div className="text-sm text-kpc-muted">Replies within one business day</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="size-11 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-kpc-muted">
                    Office
                  </div>
                  <div className="font-display text-lg font-semibold text-kpc-ink">
                    {SITE.address.street}
                  </div>
                  <div className="text-sm text-kpc-muted">
                    {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="size-11 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center shrink-0">
                  <Clock className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-kpc-muted">
                    Hours
                  </div>
                  <div className="font-display text-lg font-semibold text-kpc-ink">
                    {SITE.hours}
                  </div>
                  <div className="text-sm text-kpc-muted">
                    Office hours Mon-Fri 8a-6p; dispatch always.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="eyebrow">Or write us</span>
              <h2 className="mt-4 font-display text-display-md font-semibold text-kpc-ink">
                Non-emergency? This works too.
              </h2>
            </div>
            <ContactForm defaultTopic={defaultTopic} />
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="section-dark pt-0 pb-24 md:pb-32">
        <div className="container-kpc relative pt-24 md:pt-32">
          <div className="max-w-2xl mb-10">
            <span className="eyebrow">Where we live</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-white">
              Headquarters in {SITE.address.city}.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Trucks staged across the basin — but the office, dispatch floor, and reconstruction
              shop all sit at one address.
            </p>
          </div>
          <MapPanel />
        </div>
      </section>

      {/* FINAL NOTE */}
      <section className="section-light">
        <div className="container-kpc text-center max-w-2xl">
          <h2 className="font-display text-display-md font-semibold text-kpc-ink">
            Or just call.
            <br />
            <span className="text-kpc-signal">We pick up.</span>
          </h2>
          <p className="mt-5 text-kpc-muted leading-relaxed">
            Forms are fine for non-urgent. For everything else — losses, ERAs, claims —
            the phone is faster and a person is on the other end.
          </p>
          <div className="mt-8 flex justify-center">
            <PhoneButton pulse magnetic size="xl" />
          </div>
        </div>
      </section>
    </>
  );
}
