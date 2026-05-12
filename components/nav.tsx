"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { SITE, NAV_LINKS } from "@/lib/site";
import { useEmergencyDialog } from "./providers";
import { Button } from "./button";
import { useScrollProgress } from "@/lib/hooks";
import { KPC_EASE } from "@/lib/motion";

/**
 * Sticky nav. Transparent over the hero, glass-blurred after a small scroll.
 * Includes a 1px brand-accent scroll-progress bar pinned along the bottom.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const progress = useScrollProgress();
  const { open: openDialog } = useEmergencyDialog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-9 z-40 w-full transition-colors duration-300",
        scrolled
          ? "bg-kpc-night/70 backdrop-blur-xl border-b border-white/8"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-kpc h-16 md:h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-md" aria-label={`${SITE.name} home`}>
          <Logo />
          <span className="hidden sm:inline font-display text-lg font-semibold text-white tracking-tight">
            KPC<span className="text-kpc-signal">.</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isOpen={openMega === item.label}
              onOpen={() => setOpenMega(item.label)}
              onClose={() => setOpenMega((cur) => (cur === item.label ? null : cur))}
            />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="text-sm font-semibold text-white/80 hover:text-white tabular-nums"
          >
            {SITE.phone}
          </a>
          <Button variant="signal" size="md" onClick={openDialog}>
            Request Service
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="lg:hidden text-white p-2 -mr-2 focus-ring rounded-md"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Scroll-linked progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 overflow-hidden">
        <motion.div
          className="h-full bg-kpc-signal origin-left"
          style={{ scaleX: progress }}
          transition={{ ease: "linear", duration: 0 }}
        />
      </div>

      <AnimatePresence>{mobileOpen && <MobileSheet onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <span aria-hidden className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-kpc-signal to-kpc-emergency shadow-kpc-glow">
      <span className="font-display text-base font-bold text-white">K</span>
    </span>
  );
}

function NavItem({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: (typeof NAV_LINKS)[number];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const hasChildren = "children" in item && Array.isArray(item.children) && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={hasChildren ? onOpen : undefined}
      onMouseLeave={hasChildren ? onClose : undefined}
    >
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md focus-ring"
      >
        {item.label}
        {hasChildren && <ChevronDown className="size-3.5 opacity-60" aria-hidden />}
      </Link>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: KPC_EASE }}
            className="absolute left-0 top-full mt-2 min-w-[260px] rounded-2xl border border-white/8 bg-kpc-night/95 backdrop-blur-xl shadow-kpc-card overflow-hidden"
          >
            <ul className="p-2">
              {item.children!.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="block rounded-lg px-3 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileSheet({ onClose }: { onClose: () => void }) {
  const { open: openDialog } = useEmergencyDialog();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="lg:hidden fixed inset-0 z-50 bg-kpc-night/95 backdrop-blur-xl"
    >
      <div className="container-kpc pt-6 pb-10 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-lg font-semibold text-white">KPC<span className="text-kpc-signal">.</span></span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-white p-2 -mr-2 focus-ring rounded-md"
          >
            <X className="size-6" />
          </button>
        </div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="space-y-1"
        >
          {NAV_LINKS.flatMap((item) => [
            <motion.li
              key={item.href}
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-3 text-2xl font-display font-semibold text-white"
              >
                {item.label}
              </Link>
            </motion.li>,
            ...((item as { children?: { label: string; href: string }[] }).children ?? []).map((sub) => (
              <motion.li
                key={sub.href}
                variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
              >
                <Link
                  href={sub.href}
                  onClick={onClose}
                  className="block py-1.5 pl-4 text-base text-white/60 hover:text-white"
                >
                  {sub.label}
                </Link>
              </motion.li>
            )),
          ])}
        </motion.ul>

        <div className="mt-10 grid gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onClose();
              openDialog();
            }}
          >
            Request Service
          </Button>
          <a
            href={SITE.phoneHref}
            className="block text-center text-sm font-semibold text-white/80 tabular-nums py-2"
          >
            Or call {SITE.phone}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
