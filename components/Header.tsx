"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APPLY_LINK } from "@/lib/content";

const navLinks = [
  { label: "Concept", href: "#concept" },
  { label: "Route", href: "#route" },
  { label: "Schedule", href: "#schedule" },
  { label: "Tracks", href: "#tracks" },
  { label: "Apply", href: APPLY_LINK },
];

function LogoMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 32"
      className="h-7 w-10 shrink-0"
      fill="none"
    >
      <path
        d="M3 28 L15 6 L24 19 L33 6 L45 28"
        stroke="#00d6c9"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(0,214,201,0.6))" }}
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-line bg-deep/80" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <LogoMark />
          <span className="font-display text-base font-bold tracking-[0.22em] text-ink uppercase">
            Build in Motion
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-[13px] font-bold tracking-[0.18em] text-ink/90 uppercase transition-colors hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden border-b border-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-display text-sm font-bold tracking-[0.16em] text-ink-2 uppercase transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
