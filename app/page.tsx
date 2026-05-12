"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Building2 } from "lucide-react";

import { SITE, NAV_LINKS } from "@/lib/site";
import { SERVICES, CASE_STUDIES, TESTIMONIALS, STATS, FAQS } from "@/lib/content";
import { fadeInUp, stagger, KPC_EASE } from "@/lib/motion";

import { Button } from "@/components/button";
import { PhoneButton } from "@/components/phone-button";
import { SplitText } from "@/components/split-text";
import { StatCounter } from "@/components/stat-counter";
import { MarqueeStrip } from "@/components/marquee-strip";
import { StickyCardStack } from "@/components/sticky-card-stack";
import { ProcessTimeline } from "@/components/process-timeline";
import { IndustryTabs } from "@/components/industry-tabs";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CaseStudyCard } from "@/components/case-study-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { MapPanel } from "@/components/map-panel";
import { useEmergencyDialog } from "@/components/providers";

export default function HomePage() {
  const { open } = useEmergencyDialog();

  return (
    <>
      {/* ────────────────────────── 3. HERO ────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-kpc-night text-white pt-16 md:pt-24 pb-24 md:pb-32 grain-overlay">
        {/* Layered backdrop */}
        <div className="absolute inset-0 bg-kpc-radial-night" />
        <div className="absolute inset-0 overflow-hidden">
          <SkylineSilhouette />
          <SirenSweep />
        </div>

        <div className="container-kpc relative">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="eyebrow !text-white/70"
          >
            <span aria-hidden className="inline-block size-1.5 rounded-full bg-kpc-emergency animate-pulse" />
            24/7 Commercial Restoration · {SITE.region}
          </motion.span>

          <h1 className="mt-8 font-display font-semibold text-display-xl text-white max-w-5xl">
            <SplitText text="When disaster hits," />
            <br />
            <span className="text-gradient-signal">
              <SplitText text="we move first." staggerDelay={0.07} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: KPC_EASE }}
            className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
          >
            24/7 commercial restoration, mitigation, and reconstruction across {SITE.region}. IICRC certified. Insurance approved. On-site in 60 minutes or less.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6, ease: KPC_EASE }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <PhoneButton pulse magnetic size="xl" />
            <Button asChild variant="ghostLight" size="xl">
              <Link href="/quote">
                Start a damage report <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Live status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: KPC_EASE }}
            className="mt-16 inline-flex items-center gap-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2"
          >
            <span className="relative size-2">
              <span className="absolute inset-0 rounded-full bg-kpc-success" />
              <span className="absolute inset-0 rounded-full bg-kpc-success animate-ping opacity-70" />
            </span>
            <span className="text-sm font-medium text-white/85">Crews available now</span>
            <span className="text-xs text-white/45 tabular-nums ml-2">
              {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} PT
            </span>
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────── 4. TRUST MARQUEE ────────────────────────── */}
      <MarqueeStrip items={SITE.certifications.map((c) => ({ label: c.name, short: c.short }))} />

      {/* ────────────────────────── 5. STATS BAR ────────────────────────── */}
      <section className="bg-kpc-night py-16 md:py-20">
        <div className="container-kpc">
          <StatCounter stats={STATS} />
        </div>
      </section>

      {/* ────────────────────────── 6. SERVICES (sticky stack) ────────────────────────── */}
      <section className="section-paper">
        <div className="container-kpc mb-16">
          <span className="eyebrow">Services</span>
          <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink max-w-3xl">
            Every restoration service. <span className="text-kpc-muted">One contractor.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-kpc-muted leading-relaxed">
            Mitigation through reconstruction. Same project manager from the first call to the final invoice. Scroll to meet the seven services we run end-to-end.
          </p>
        </div>
        <div className="container-kpc">
          <StickyCardStack services={SERVICES} />
        </div>
      </section>

      {/* ────────────────────────── 7. PROCESS TIMELINE ────────────────────────── */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc">
          <div className="max-w-2xl mb-16">
            <span className="eyebrow">Our process</span>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-white">
              How we restore. Five steps. <span className="text-kpc-muted">Zero confusion.</span>
            </h2>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              Same crew, same paperwork, same accountability — from the first dispatch call to the final walk with your property manager.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* ────────────────────────── 8. COMMERCIAL FOCUS ────────────────────────── */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow">Commercial</span>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink leading-[0.95]">
                Built for commercial property.
              </h2>
              <p className="mt-6 text-lg text-kpc-muted leading-relaxed max-w-md">
                We exist for property managers, asset owners, hospital EVS directors, and insurance partners. Not consumer cleanup.
              </p>
              <Button asChild variant="ghostDark" size="lg" className="mt-8">
                <Link href="/commercial">See the commercial play <ArrowUpRight className="size-4" /></Link>
              </Button>
            </div>

            <div className="bg-kpc-night rounded-3xl p-6 md:p-10">
              <IndustryTabs />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── 9. ERA BAND ────────────────────────── */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">Emergency Response Agreement</span>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-white">
              Skip the chaos. <span className="text-gradient-signal">Sign an ERA.</span>
            </h2>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              A no-cost pre-positioning agreement. We pre-map your facility, pre-negotiate rates, and put you in the priority dispatch tier — so when something happens, there&apos;s nothing to negotiate.
            </p>
          </div>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              { icon: Zap, title: "Priority dispatch", body: "30-min on-site target. ERA holders jump the queue when storms saturate the region." },
              { icon: Building2, title: "Pre-mapped facility", body: "We walk your property in advance. Utility shutoffs, sensitive areas, and contact tree locked in." },
              { icon: ShieldCheck, title: "Pre-negotiated rates", body: "T&M rates and Xactimate scope alignment agreed before any incident — never under duress." },
            ].map(({ icon: Icon, title, body }) => (
              <motion.div key={title} variants={fadeInUp} className="card-dark p-7">
                <Icon className="size-7 text-kpc-signal mb-4" aria-hidden />
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm text-white/70 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="signal" size="lg">
              <Link href="/emergency-response-agreement">
                Become a priority client <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="lg">
              <Link href="/contact">Talk to a dispatcher</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ────────────────────────── 10. BEFORE / AFTER ────────────────────────── */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">Outcomes</span>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink">
              The work, before and after.
            </h2>
            <p className="mt-5 text-lg text-kpc-muted leading-relaxed">
              Drag the slider. Each pair is from a real engagement, documented to insurance scope.
            </p>
          </div>
          <BeforeAfterSlider
            before={
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),transparent)]" />
                <div className="absolute bottom-6 left-6 text-white/60 font-display text-2xl">Water-damaged ceiling · 8th floor</div>
              </div>
            }
            after={
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-white to-stone-200">
                <div className="absolute bottom-6 left-6 text-kpc-ink/70 font-display text-2xl">Restored · 4 days</div>
              </div>
            }
          />
        </div>
      </section>

      {/* ────────────────────────── 11. CASE STUDIES ────────────────────────── */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="eyebrow">Case studies</span>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink">
                Recent work, in detail.
              </h2>
            </div>
            <Link href="/case-studies" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-kpc-ink hover:text-kpc-signal">
              All case studies <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-5"
          >
            {CASE_STUDIES.map((c) => <CaseStudyCard key={c.slug} c={c} />)}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────── 12. TESTIMONIALS ────────────────────────── */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">What clients say</span>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink">
              Trusted across portfolios.
            </h2>
          </div>
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </motion.div>
        </div>
      </section>

      {/* ────────────────────────── 13. INSURANCE PARTNERS ────────────────────────── */}
      <section className="section-light">
        <div className="container-kpc text-center">
          <span className="eyebrow">Insurance</span>
          <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink mx-auto max-w-3xl">
            We work with every major carrier.
          </h2>
          <p className="mt-5 text-lg text-kpc-muted max-w-2xl mx-auto">
            Travelers · Chubb · Liberty Mutual · FM Global · Zurich · AIG · The Hartford · State Farm · Allstate · Farmers · Nationwide · Philadelphia
          </p>
          <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {["Travelers", "Chubb", "Liberty", "FM Global", "Zurich", "AIG", "The Hartford", "State Farm", "Allstate", "Farmers", "Nationwide", "Philly"].map((name) => (
              <div key={name} className="aspect-[2/1] rounded-xl border border-black/8 bg-white flex items-center justify-center text-xs font-display font-semibold text-kpc-muted/80">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────── 14. COVERAGE MAP ────────────────────────── */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div>
              <span className="eyebrow">Service areas</span>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-white">
                We respond across {SITE.region} <span className="text-gradient-signal">within 60 minutes.</span>
              </h2>
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                Crews based in 10+ cities, with catastrophe trailers pre-staged for portfolio events. Outside the standard radius? We dispatch within 90 minutes to extended zones.
              </p>
              <Button asChild variant="ghostLight" size="lg" className="mt-8">
                <Link href="/locations">View all service areas <ArrowUpRight className="size-4" /></Link>
              </Button>
            </div>
            <MapPanel />
          </div>
        </div>
      </section>

      {/* ────────────────────────── 15. FAQ ────────────────────────── */}
      <section className="section-paper">
        <div className="container-kpc grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 self-start">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-5 font-display text-display-lg font-semibold text-kpc-ink">
              Common questions, direct answers.
            </h2>
            <p className="mt-5 text-kpc-muted leading-relaxed">
              Don&apos;t see yours? Call us. The dispatcher answers, not a queue.
            </p>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ────────────────────────── 16. FINAL CTA BAND ────────────────────────── */}
      <section className="relative overflow-hidden bg-kpc-night text-white py-28 md:py-40 grain-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(230,57,70,0.18),transparent_55%)]" />
        <div className="container-kpc relative text-center">
          <h2 className="font-display text-display-xl font-semibold text-white max-w-5xl mx-auto leading-[0.95]">
            Damage doesn&apos;t wait. <span className="text-gradient-signal">Neither do we.</span>
          </h2>
          <p className="mt-7 text-xl text-white/70 max-w-2xl mx-auto">
            One call. One dispatcher. One project manager from the first truck to the final invoice.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneButton pulse magnetic size="xl" />
            <Button variant="ghostLight" size="xl" onClick={open}>
              Request a callback
            </Button>
          </div>
          <p className="mt-8 text-sm text-white/50">
            Or email <a href={`mailto:${SITE.email}`} className="underline hover:text-white">{SITE.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}

/** Stylized SVG city skyline (no licensing concerns). */
function SkylineSilhouette() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 400"
      preserveAspectRatio="xMidYEnd slice"
      className="absolute bottom-0 left-0 right-0 w-full h-1/2 opacity-60"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(15,23,41,0)" />
          <stop offset="1" stopColor="rgba(10,15,28,0.9)" />
        </linearGradient>
      </defs>
      <rect width="1600" height="400" fill="url(#sky)" />
      <g fill="#0F1729" stroke="rgba(255,255,255,0.04)">
        <rect x="40" y="280" width="60" height="120" />
        <rect x="110" y="240" width="80" height="160" />
        <rect x="200" y="200" width="50" height="200" />
        <rect x="260" y="260" width="100" height="140" />
        <rect x="370" y="180" width="60" height="220" />
        <rect x="440" y="220" width="120" height="180" />
        <rect x="570" y="160" width="70" height="240" />
        <rect x="650" y="240" width="90" height="160" />
        <rect x="750" y="120" width="80" height="280" />
        <rect x="840" y="200" width="60" height="200" />
        <rect x="910" y="260" width="100" height="140" />
        <rect x="1020" y="180" width="70" height="220" />
        <rect x="1100" y="220" width="110" height="180" />
        <rect x="1220" y="140" width="80" height="260" />
        <rect x="1310" y="240" width="90" height="160" />
        <rect x="1410" y="200" width="60" height="200" />
        <rect x="1480" y="260" width="80" height="140" />
      </g>
      {/* tiny window lights */}
      <g fill="#FF7A1A" opacity="0.45">
        {Array.from({ length: 60 }).map((_, i) => (
          <rect
            key={i}
            x={(i * 27) % 1600}
            y={200 + ((i * 13) % 180)}
            width="3"
            height="3"
          />
        ))}
      </g>
    </svg>
  );
}

/** Slow red emergency-light sweep across the hero backdrop. */
function SirenSweep() {
  return (
    <motion.div
      aria-hidden
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      className="absolute inset-y-0 w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(230,57,70,0.18),transparent_60%)] mix-blend-screen"
    />
  );
}
