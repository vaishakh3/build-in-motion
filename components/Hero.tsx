"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  APPLY_LINK,
  DATE_SHORT,
  HERO_EYEBROW,
  HERO_SUB,
  METRO_DEPARTURE,
  PRIMARY_CLAIM,
  START_STATION,
} from "@/lib/content";
import { MagneticButton } from "./ui";

const MetroScene = dynamic(() => import("./three/MetroScene"), { ssr: false });

const streaks = [
  { top: "18%", delay: 0, duration: 7, width: "32vw" },
  { top: "31%", delay: 2.4, duration: 9, width: "22vw" },
  { top: "52%", delay: 1.1, duration: 8, width: "28vw" },
  { top: "67%", delay: 4.2, duration: 10, width: "18vw" },
  { top: "80%", delay: 3.0, duration: 7.5, width: "26vw" },
];

function HeroBackdrop({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="route-grid absolute inset-0" />
      <MetroScene reduced={reduced} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(5,7,10,0.55),rgba(5,7,10,0.15)_60%,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,rgba(0,214,201,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_70%,rgba(91,124,255,0.07),transparent_70%)]" />
      {streaks.map((s, i) => (
        <span
          key={i}
          className="light-streak"
          style={{
            top: s.top,
            width: s.width,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {/* stylized train window frames */}
      <div className="absolute bottom-0 left-1/2 hidden h-44 w-[120%] -translate-x-1/2 items-end justify-center gap-6 opacity-[0.16] lg:flex">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-36 w-52 shrink-0 rounded-t-[2.5rem] border border-cyan/30 bg-gradient-to-b from-cyan/5 to-transparent"
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep to-transparent" />
    </div>
  );
}

function RouteLine() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 80"
      className="mx-auto mt-14 w-full max-w-2xl"
      style={{ "--route-len": 900 } as React.CSSProperties}
    >
      <path
        d="M20 40 H 780"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        fill="none"
      />
      <path
        className="route-draw"
        d="M20 40 H 780"
        stroke="#00D6C9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {[20, 273, 526, 780].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={40} r="6" fill="#05070A" stroke="#00D6C9" strokeWidth="2" />
          <circle cx={x} cy={40} r="2" fill="#00D6C9" />
        </g>
      ))}
      <text x="20" y="68" fill="#6F7A8C" fontSize="11" fontFamily="var(--font-jetbrains)" textAnchor="start">VYT</text>
      <text x="273" y="68" fill="#6F7A8C" fontSize="11" fontFamily="var(--font-jetbrains)" textAnchor="middle">ALV</text>
      <text x="526" y="68" fill="#6F7A8C" fontSize="11" fontFamily="var(--font-jetbrains)" textAnchor="middle">TPR</text>
      <text x="780" y="68" fill="#6F7A8C" fontSize="11" fontFamily="var(--font-jetbrains)" textAnchor="end">VYT</text>
    </svg>
  );
}

function DepartureBoard() {
  const rows = [
    ["DATE", DATE_SHORT],
    ["DEPARTURE", METRO_DEPARTURE],
    ["START", START_STATION],
    ["FORMAT", "Solo AI Sprint"],
  ];
  return (
    <div className="glass mx-auto mt-10 w-full max-w-md rounded-2xl p-5 text-left">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-3 uppercase">
          Departure Board
        </span>
        <span className="flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-3 py-1 font-mono text-[10px] tracking-wider text-lime">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          EXCLUSIVE AFTER-HOURS METRO RUN
        </span>
      </div>
      <dl className="space-y-2">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex items-baseline justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
          >
            <dt className="font-mono text-xs tracking-[0.2em] text-ink-3">{k}</dt>
            <dd className="font-mono text-sm text-cyan">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 font-mono text-[10px] text-ink-3">
        boarding_status: <span className="text-cyan">applications_open</span>
        <span className="cursor-blink" aria-hidden />
      </p>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const stagger = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center"
    >
      <HeroBackdrop reduced={!!reduced} />
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.p
          {...stagger(0)}
          className="mb-6 font-mono text-xs tracking-[0.35em] text-cyan uppercase"
        >
          {HERO_EYEBROW}
        </motion.p>
        <motion.h1
          {...stagger(1)}
          className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {PRIMARY_CLAIM}
        </motion.h1>
        <motion.p
          {...stagger(2)}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg"
        >
          {HERO_SUB}
        </motion.p>
        <motion.div
          {...stagger(3)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={APPLY_LINK}>Apply to Build</MagneticButton>
          <MagneticButton href="#schedule" variant="secondary">
            View Event Flow
          </MagneticButton>
        </motion.div>
        <motion.div {...stagger(4)}>
          <RouteLine />
          <DepartureBoard />
        </motion.div>
      </div>
      <p className="sr-only">
        Route: Vyttila to Aluva to Thrippunithura, returning to Vyttila. Schematic
        route, subject to KMRL confirmation.
      </p>
    </section>
  );
}
