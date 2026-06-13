"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ROUTE_NOTE, routeLegs } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

const STATIONS = [
  { name: "VYTTILA", x: 40 },
  { name: "ALUVA", x: 340 },
  { name: "THRIPPUNITHURA", x: 640 },
  { name: "VYTTILA", x: 940 },
];

const PATH_START = 40;
const PATH_END = 940;

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function DesktopRoute() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeLeg, setActiveLeg] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveLeg(Math.min(2, Math.floor(v * 3)));
  });

  const trainX = useTransform(
    scrollYProgress,
    [0, 1],
    [PATH_START, PATH_END]
  );
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const trainOffset = useTransform(trainX, (x) => x - PATH_START);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-24">
        <div className="card route-grid relative overflow-hidden p-10">
          <svg viewBox="0 0 980 140" className="w-full" aria-hidden>
            <line
              x1={PATH_START}
              y1="70"
              x2={PATH_END}
              y2="70"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <motion.line
              x1={PATH_START}
              y1="70"
              x2={PATH_END}
              y2="70"
              stroke="#16E0D0"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                scaleX: reduced ? 1 : progressScale,
                transformBox: "fill-box",
                originX: 0,
              }}
            />
            {STATIONS.map((s, i) => {
              const reached = reduced || activeLeg >= i - 1;
              return (
                <g key={`${s.name}-${i}`}>
                  <circle
                    cx={s.x}
                    cy="70"
                    r="10"
                    fill="#04070C"
                    stroke={reached ? "#16E0D0" : "rgba(255,255,255,0.2)"}
                    strokeWidth="2.5"
                    style={{ transition: "stroke 0.5s" }}
                  />
                  <circle
                    cx={s.x}
                    cy="70"
                    r="4"
                    fill={reached ? "#16E0D0" : "rgba(255,255,255,0.15)"}
                    style={{ transition: "fill 0.5s" }}
                  />
                  <text
                    x={s.x}
                    y={i % 2 === 0 ? 110 : 40}
                    textAnchor="middle"
                    fontSize="13"
                    fill={reached ? "#A6B2C2" : "#6E7A8B"}
                    fontFamily="var(--font-plex-mono)"
                    letterSpacing="2"
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}
            {!reduced && (
              <motion.g style={{ x: trainOffset }}>
                <rect
                  x={PATH_START - 16}
                  y="58"
                  width="32"
                  height="24"
                  rx="8"
                  fill="#0C1422"
                  stroke="#C9F25E"
                  strokeWidth="2"
                />
                <rect x={PATH_START - 9} y="64" width="6" height="5" rx="1.5" fill="#C9F25E" />
                <rect x={PATH_START + 3} y="64" width="6" height="5" rx="1.5" fill="#C9F25E" />
              </motion.g>
            )}
          </svg>

          <div className="relative mt-10 grid grid-cols-3 gap-6">
            {routeLegs.map((leg, i) => {
              const active = reduced || activeLeg === i;
              return (
                <div
                  key={leg.leg}
                  className={`rounded-2xl border p-6 transition-all duration-500 ${
                    active
                      ? "border-cyan/30 bg-cyan/[0.04] opacity-100"
                      : "border-line bg-transparent opacity-40"
                  }`}
                >
                  <p className="font-mono text-[10px] tracking-[0.3em] text-amber">
                    {leg.leg}
                  </p>
                  <p className="mt-2 font-mono text-xs text-cyan">
                    {leg.from} → {leg.to}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">
                    {leg.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{leg.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-4 font-mono text-xs text-ink-3">{ROUTE_NOTE}</p>
      </div>
    </div>
  );
}

function MobileRoute() {
  return (
    <div>
      <ol className="relative ml-4 border-l-2 border-cyan/30">
        {routeLegs.map((leg, i) => (
          <Reveal key={leg.leg} delay={i * 0.08}>
            <li className="relative pb-10 pl-8">
              <span
                aria-hidden
                className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-cyan bg-deep"
              />
              <p className="font-mono text-[10px] tracking-[0.3em] text-amber">
                {leg.leg}
              </p>
              <p className="mt-1 font-mono text-xs text-cyan">
                {leg.from} → {leg.to}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">
                {leg.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{leg.copy}</p>
            </li>
          </Reveal>
        ))}
        <li className="relative pl-8">
          <span
            aria-hidden
            className="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-lime bg-deep"
          />
          <p className="font-mono text-xs text-lime">VYTTILA · FINAL STAGE</p>
        </li>
      </ol>
      <p className="mt-6 font-mono text-xs text-ink-3">{ROUTE_NOTE}</p>
    </div>
  );
}

export default function RouteScroller() {
  const desktop = useIsDesktop();
  return (
    <section id="route" className="scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="The Route" title="The route becomes the timer." />
        <p className="sr-only">
          Route legs: Vyttila to Aluva, Aluva to Thrippunithura, Thrippunithura back
          to Vyttila. Schematic route, final operating route subject to KMRL
          confirmation.
        </p>
        {desktop ? <DesktopRoute /> : <MobileRoute />}
      </div>
    </section>
  );
}
