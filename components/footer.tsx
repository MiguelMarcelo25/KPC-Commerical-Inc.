import Link from "next/link";
import { Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

/**
 * Dark footer — 4 column sitemap + certifications + social, capped with the
 * closing big-type "When disaster strikes" statement.
 */
export function Footer() {
  return (
    <footer className="bg-kpc-night text-white border-t border-white/5 grain-overlay">
      <div className="container-kpc pt-20 pb-10">
        {/* Big closer line */}
        <div className="border-b border-white/8 pb-16 mb-16">
          <p className="font-display text-display-lg font-semibold leading-[0.95] tracking-tight max-w-4xl">
            When disaster strikes,{" "}
            <span className="text-kpc-signal">call KPC.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 text-2xl md:text-3xl font-semibold tabular-nums text-white hover:text-kpc-signal transition-colors"
            >
              <Phone className="size-6" aria-hidden />
              {SITE.phone}
            </a>
            <span className="text-sm text-white/50">— {SITE.hours}</span>
          </div>
        </div>

        {/* Sitemap columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS[0].children!.map((sub) => (
                <li key={sub.href}>
                  <Link href={sub.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
              Industries
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS[1].children!.map((sub) => (
                <li key={sub.href}>
                  <Link href={sub.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS[3].children!.map((sub) => (
                <li key={sub.href}>
                  <Link href={sub.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {sub.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/about" className="text-sm text-white/70 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-sm text-white/70 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
              Dispatch
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 shrink-0 text-kpc-signal" aria-hidden />
                <a href={SITE.phoneHref} className="tabular-nums hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 shrink-0 text-kpc-signal" aria-hidden />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 shrink-0 text-kpc-signal" aria-hidden />
                <span>
                  {SITE.address.street}<br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                </span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={SITE.social.linkedin} aria-label="LinkedIn" className="size-10 rounded-lg bg-white/5 hover:bg-white/10 inline-flex items-center justify-center transition-colors">
                <Linkedin className="size-4" />
              </a>
              <a href={SITE.social.youtube} aria-label="YouTube" className="size-10 rounded-lg bg-white/5 hover:bg-white/10 inline-flex items-center justify-center transition-colors">
                <Youtube className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications strip */}
        <div className="border-t border-white/8 pt-8 mb-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em] text-white/40">
            {SITE.certifications.map((c) => (
              <span key={c.short} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-kpc-signal/60" aria-hidden />
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {SITE.name}. CA Lic #1067432. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/70">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70">Terms</Link>
            <Link href="/accessibility" className="hover:text-white/70">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
