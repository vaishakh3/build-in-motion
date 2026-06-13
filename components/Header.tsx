"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APPLY_LINK } from "@/lib/content";

type IconProps = { className?: string };

function ConceptIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 2.6 L11.7 8.3 L17.4 10 L11.7 11.7 L10 17.4 L8.3 11.7 L2.6 10 L8.3 8.3 Z" />
    </svg>
  );
}

function RouteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 4 v4 a3 3 0 0 0 3 3 h2 a3 3 0 0 1 3 3 v2" />
      <circle cx="6" cy="4" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ScheduleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10" cy="10" r="7.2" />
      <path d="M10 5.8 V10 L13 12" />
    </svg>
  );
}

function TracksIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 2.8 L17 6.6 L10 10.4 L3 6.6 Z" />
      <path d="M3.4 10.8 L10 14.4 L16.6 10.8" />
    </svg>
  );
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 L17 7 M9 7 H17 V15" />
    </svg>
  );
}

const navLinks = [
  { label: "Concept", href: "#concept", id: "concept", Icon: ConceptIcon },
  { label: "Route", href: "#route", id: "route", Icon: RouteIcon },
  { label: "Schedule", href: "#schedule", id: "schedule", Icon: ScheduleIcon },
  { label: "Tracks", href: "#tracks", id: "tracks", Icon: TracksIcon },
];

function LogoMark() {
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan/30 bg-cyan/[0.07] shadow-[0_0_22px_rgba(22,224,208,0.2)]">
      <svg aria-hidden viewBox="0 0 48 32" className="h-[18px] w-[26px]" fill="none">
        <path
          d="M4 27 L15 7 L24 19 L33 7 L44 27"
          stroke="#16e0d0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 5px rgba(22,224,208,0.6))" }}
        />
      </svg>
    </span>
  );
}

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-line bg-deep/75"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[76px] md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-extrabold tracking-[0.14em] text-ink uppercase">
              Build in Motion
            </span>
            <span className="mt-[5px] font-mono text-[9px] font-medium tracking-[0.32em] text-cyan/70 uppercase">
              Kochi Metro · AI Sprint
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-3 lg:flex">
          <nav
            aria-label="Primary"
            className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md"
          >
            {navLinks.map(({ label, href, id, Icon }) => {
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${
                    isActive
                      ? "bg-cyan/12 text-cyan"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 transition-colors duration-300 ${
                      isActive ? "text-cyan" : "text-ink-3 group-hover:text-cyan"
                    }`}
                  />
                  {label}
                </a>
              );
            })}
          </nav>

          <a
            href={APPLY_LINK}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a6f7ee] to-[#16e0d0] px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.16em] text-[#03201d] uppercase shadow-[0_0_28px_rgba(22,224,208,0.28)] transition-transform duration-200 hover:scale-[1.03]"
          >
            Apply
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.04] backdrop-blur-md lg:hidden"
        >
          <span className="flex flex-col items-center justify-center gap-1.5">
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
          </span>
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
            className="glass overflow-hidden border-b border-line lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map(({ label, href, id, Icon }) => {
                const isActive = active === id;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors ${
                      isActive
                        ? "bg-cyan/12 text-cyan"
                        : "text-ink-2 hover:bg-white/5 hover:text-ink"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                );
              })}
              <a
                href={APPLY_LINK}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#a6f7ee] to-[#16e0d0] px-4 py-3.5 font-mono text-[12px] font-bold tracking-[0.16em] text-[#03201d] uppercase shadow-[0_0_28px_rgba(22,224,208,0.28)]"
              >
                Apply to Build
                <ArrowIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
