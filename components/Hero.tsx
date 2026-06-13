"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { APPLY_LINK } from "@/lib/content";

const TAGS = ["Codex Community Kochi", "Kochi Metro", "100 Solo Builders"];

const CARD_ROWS = [
  "Saturday night, July 4, 2026",
  "10:35 PM IST onward",
  "Vyttila",
];

function StationIcon() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-cyan/40 bg-cyan/[0.06]">
      <span className="h-2 w-2 rounded-[2px] border border-cyan/80" />
    </span>
  );
}

function ExperienceCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-[21rem] max-w-full overflow-hidden rounded-2xl border border-cyan/20 bg-deep/55 p-6 backdrop-blur-md ${className}`}
    >
      <div className="mb-5 flex items-center gap-6 font-mono text-[11px] font-semibold tracking-[0.28em] text-lime uppercase">
        <span>Experience</span>
        <span>Invite</span>
      </div>
      <ul className="space-y-4">
        {CARD_ROWS.map((row) => (
          <li key={row} className="flex items-center gap-3.5">
            <StationIcon />
            <span className="text-lg leading-snug text-ink">{row}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 font-mono text-xs font-semibold tracking-[0.28em] text-cyan uppercase">
        Solo AI Sprint
      </p>
      <svg
        aria-hidden
        viewBox="0 0 80 80"
        className="pointer-events-none absolute -bottom-1 right-2 h-16 w-16 text-cyan/45"
      >
        <path
          d="M16 18 H64 L38 66"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    const clamped = p < 0 ? 0 : p > 1 ? 1 : p;
    targetTime.current = clamped * v.duration;
  });

  useEffect(() => {
    if (reduced) return;
    let alive = true;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration && !Number.isNaN(v.duration)) {
        const cur = v.currentTime;
        const next = cur + (targetTime.current - cur) * 0.2;
        if (Math.abs(next - cur) > 0.004) {
          try {
            v.currentTime = next;
          } catch {
            /* seeking not ready yet */
          }
        }
      }
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const prime = () => {
      v.pause();
      try {
        v.currentTime = 0.0001;
      } catch {
        /* noop */
      }
    };
    if (v.readyState >= 1) prime();
    v.addEventListener("loadedmetadata", prime, { once: true });
    return () => v.removeEventListener("loadedmetadata", prime);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: reduced ? "100svh" : "240vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scroll-scrubbed background */}
        <div aria-hidden className="absolute inset-0">
          {reduced ? (
            // eslint-disable-next-line @next/next/no-img-element -- static full-bleed poster used only as the reduced-motion fallback
            <img
              src="/hero/poster.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover object-center"
              src="/hero/train.mp4"
              poster="/hero/poster.jpg"
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
            />
          )}
          <div className="route-grid absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/85 to-deep/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/25 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-deep/90 to-transparent" />
        </div>

        {/* Static content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-16 md:px-10">
          <div className="max-w-2xl">
            <div className="inline-flex flex-wrap items-center divide-x divide-white/10 overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-sm">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-7 font-display text-6xl font-bold leading-[0.92] tracking-tight sm:text-7xl lg:text-[7.5rem]">
              <span className="block bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent">
                Build in
              </span>
              <span className="hero-glow block text-cyan">Motion</span>
            </h1>

            <p className="mt-7 max-w-xl text-xl leading-snug font-medium text-ink sm:text-2xl">
              A first-of-its-kind Codex-powered AI sprint inside a moving Kochi
              Metro train.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2">
              Board after hours at Vyttila, build through the round trip, then
              present what you made before sunrise.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={APPLY_LINK}
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#a6f7ee] to-[#16e0d0] px-7 py-4 font-display text-sm font-bold tracking-[0.08em] text-[#03201d] uppercase shadow-[0_0_45px_rgba(22,224,208,0.3)] transition-transform duration-200 hover:scale-[1.02]"
              >
                Apply to Build
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 L17 7 M9 7 H17 V15" />
                </svg>
              </a>
              <a
                href="#schedule"
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 bg-white/[0.02] px-7 py-4 font-display text-sm font-bold tracking-[0.12em] text-ink uppercase backdrop-blur-sm transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
              >
                View Event Flow
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 5 L18 12 L7 19 Z" />
                </svg>
              </a>
            </div>

            <div className="mt-10 lg:hidden">
              <ExperienceCard />
            </div>
          </div>
        </div>

        {/* Scroll-to-ride indicator */}
        <div className="absolute bottom-7 left-5 z-10 hidden items-center gap-3.5 md:flex md:left-10">
          <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-white/35 pt-2">
            <span className="hero-scroll-dot h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-[0.28em] text-ink-3 uppercase">
            Scroll to ride
          </span>
        </div>

        {/* Experience / Invite card */}
        <div className="absolute bottom-10 right-10 z-10 hidden lg:block">
          <ExperienceCard />
        </div>
      </div>
    </section>
  );
}
