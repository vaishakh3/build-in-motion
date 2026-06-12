"use client";

import {
  APPLY_LINK,
  CONTACT_LINK,
  MEDIA_DISCLAIMER,
  PARTNER_LINE,
  PRIZE_DISCLAIMER,
  PULL_QUOTE,
  SUPPORT_LINE,
  applyCriteria,
  formatData,
  mediaFrames,
  prizesData,
  rulesData,
  scheduleData,
  statsData,
  tracksData,
  whyData,
} from "@/lib/content";
import { CountUp, MagneticButton, Reveal, SectionHeading, TiltCard } from "./ui";

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-20 md:px-8 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function PartnerStrip() {
  const partners = [
    "Codex Community Kochi",
    "In collaboration with Kochi Metro Rail Limited",
    "Supported through the Codex Ambassador programme",
  ];
  return (
    <Section className="!py-10 md:!py-14">
      <Reveal>
        <div className="glass flex flex-col items-center justify-center gap-4 rounded-3xl px-8 py-7 md:flex-row md:gap-0">
          {partners.map((p, i) => (
            <div key={p} className="flex items-center">
              {i > 0 && (
                <span
                  aria-hidden
                  className="mx-8 hidden h-7 w-px bg-white/15 md:block"
                />
              )}
              <span className="text-center font-display text-sm font-medium tracking-wide text-ink-2">
                {p}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function CoachSchematic() {
  return (
    <svg
      viewBox="0 0 420 240"
      role="img"
      aria-label="Schematic of a metro coach set up as a build lab with builder seats, a mentor zone, and a media zone along the route line"
      className="w-full"
    >
      <rect x="10" y="30" width="400" height="170" rx="36" fill="#08111F" stroke="rgba(0,214,201,0.25)" strokeWidth="1.5" />
      <line x1="10" y1="115" x2="410" y2="115" stroke="rgba(0,214,201,0.18)" strokeWidth="1" strokeDasharray="6 6" />
      {[60, 130, 200, 270, 340].map((x) => (
        <rect key={`w${x}`} x={x} y="42" width="40" height="16" rx="6" fill="rgba(91,124,255,0.12)" stroke="rgba(91,124,255,0.3)" strokeWidth="1" />
      ))}
      {[
        [55, 80], [115, 80], [175, 80], [235, 80], [295, 80], [355, 80],
        [55, 150], [115, 150], [175, 150], [295, 150], [355, 150],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 14} y={y} width="28" height="22" rx="6" fill="rgba(0,214,201,0.08)" stroke="rgba(0,214,201,0.35)" strokeWidth="1" />
          <rect x={x - 8} y={y + 5} width="16" height="9" rx="2" fill="#00D6C9" opacity="0.7">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      <g>
        <rect x="221" y="150" width="28" height="22" rx="6" fill="rgba(183,242,65,0.08)" stroke="rgba(183,242,65,0.4)" strokeWidth="1" />
        <text x="235" y="165" textAnchor="middle" fontSize="9" fill="#B7F241" fontFamily="var(--font-jetbrains)">M</text>
      </g>
      <text x="40" y="222" fontSize="10" fill="#6F7A8C" fontFamily="var(--font-jetbrains)">BUILDER SEATS</text>
      <text x="200" y="222" fontSize="10" fill="#B7F241" fontFamily="var(--font-jetbrains)">MENTOR ZONE</text>
      <text x="330" y="222" fontSize="10" fill="#FFB454" fontFamily="var(--font-jetbrains)">MEDIA</text>
      <circle cx="385" cy="190" r="7" fill="none" stroke="#FFB454" strokeWidth="1.5" />
      <circle cx="385" cy="190" r="2.5" fill="#FFB454" />
      <line x1="30" y1="14" x2="390" y2="14" stroke="#00D6C9" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="30" cy="14" r="4" fill="#05070A" stroke="#00D6C9" strokeWidth="1.5" />
      <circle cx="210" cy="14" r="4" fill="#05070A" stroke="#00D6C9" strokeWidth="1.5" />
      <circle cx="390" cy="14" r="4" fill="#05070A" stroke="#00D6C9" strokeWidth="1.5" />
    </svg>
  );
}

export function Concept() {
  return (
    <Section id="concept">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="The Concept" title="The metro ride is the build window." />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-2 md:text-lg">
              For one night, the Kochi Metro becomes a moving AI build lab. Builders
              start from scratch, use Codex to move faster, and race the route clock
              to ship something demoable before the train returns to Vyttila.
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-2">
              This is not a traditional long-form hackathon. It is a focused AI build
              sprint designed around motion, constraint, speed, documentation, and
              final-stage demos.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-sm text-ink-2">
              {[
                "The metro ride is the build window.",
                "The route becomes the timer.",
                "The train becomes the lab.",
                "The final station becomes the stage.",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-6 bg-cyan" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="card card-cyan p-6 md:p-8">
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-ink-3 uppercase">
              Coach 02 / Build Lab Schematic
            </p>
            <CoachSchematic />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Stats() {
  return (
    <Section>
      <SectionHeading eyebrow="At a Glance" title="One night. One train. One sprint." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
        {statsData.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <TiltCard className="card card-cyan h-full p-6">
              <p className="font-display text-4xl font-bold text-ink md:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-cyan">
                {s.label}
              </p>
              <p className="mt-1.5 text-sm text-ink-3">{s.note}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Schedule() {
  return (
    <Section id="schedule">
      <SectionHeading eyebrow="Event Flow" title="From boarding to build to demo." />
      <div className="card overflow-hidden">
        <div className="hidden grid-cols-[200px_1fr] border-b border-line px-7 py-3 font-mono text-[10px] tracking-[0.3em] text-ink-3 uppercase md:grid">
          <span>Time</span>
          <span>Phase</span>
        </div>
        {scheduleData.map((row, i) => (
          <Reveal key={row.time} delay={i * 0.08}>
            <div className="group grid gap-2 border-b border-line px-6 py-6 transition-colors last:border-0 hover:bg-white/[0.02] md:grid-cols-[200px_1fr] md:gap-6 md:px-7">
              <p className="font-mono text-sm text-cyan">{row.time}</p>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {row.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{row.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function EventFormat() {
  return (
    <Section id="format">
      <SectionHeading
        eyebrow="Format"
        title="Solo builders. Real prototypes. One moving deadline."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {formatData.map((item, i) => (
          <Reveal key={item} delay={i * 0.05}>
            <div className="card h-full p-5">
              <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-blue-soft">
                PROTOCOL {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-sm leading-relaxed text-ink-2">{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Tracks() {
  return (
    <Section id="tracks">
      <SectionHeading
        eyebrow="Tracks"
        title="Build for the city, the commute, and everyday life."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {tracksData.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.07}>
            <div className="group card relative h-full overflow-hidden p-7 transition-colors duration-500 hover:border-cyan/30">
              <span
                aria-hidden
                className="absolute -top-px left-7 h-px w-10 bg-cyan opacity-40 transition-all duration-500 group-hover:w-24 group-hover:opacity-100"
              />
              <p className="font-mono text-[10px] tracking-[0.3em] text-ink-3">
                TRACK {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.copy}</p>
              <div className="mt-5 border-t border-line pt-4">
                <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
                  Example builds
                </p>
                <ul className="space-y-1.5">
                  {t.examples.map((e) => (
                    <li
                      key={e}
                      className="text-sm text-ink-3 transition-colors duration-300 group-hover:text-ink-2"
                    >
                      · {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Rules() {
  return (
    <Section id="rules">
      <SectionHeading eyebrow="Rules" title="Simple rules. Serious builders." />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rulesData.map((rule, i) => (
          <Reveal key={rule} delay={i * 0.04}>
            <li className="card flex h-full items-start gap-4 p-5">
              <span className="font-mono text-sm font-bold text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-2">{rule}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function WhyThisMatters() {
  return (
    <Section className="route-grid" id="why">
      <SectionHeading eyebrow="Why" title="A new kind of AI community event." />
      <div className="grid gap-5 md:grid-cols-3">
        {whyData.map((w, i) => (
          <Reveal key={w.audience} delay={i * 0.08}>
            <div className="card h-full p-7">
              <p className="font-mono text-[11px] tracking-[0.25em] text-blue-soft uppercase">
                {w.audience}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{w.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <blockquote className="mx-auto mt-16 max-w-3xl text-center">
          <p className="font-display text-2xl leading-snug font-bold text-ink md:text-4xl">
            &ldquo;{PULL_QUOTE}&rdquo;
          </p>
        </blockquote>
      </Reveal>
    </Section>
  );
}

export function Prizes() {
  return (
    <Section id="prizes">
      <SectionHeading eyebrow="Prizes" title="Recognition for builders who ship." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prizesData.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="card card-cyan h-full p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="mt-6 font-mono text-xs text-ink-3">{PRIZE_DISCLAIMER}</p>
      </Reveal>
    </Section>
  );
}

function BuilderPass() {
  return (
    <TiltCard className="card card-cyan mx-auto w-full max-w-sm overflow-hidden">
      <div className="border-b border-line-cyan bg-cyan/5 px-6 py-4">
        <p className="font-display text-lg font-bold tracking-wide text-ink">
          BUILD IN MOTION
        </p>
      </div>
      <div className="space-y-4 px-6 py-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ink-3">PASS TYPE</p>
          <p className="mt-1 font-mono text-sm text-cyan">SOLO BUILDER</p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ink-3">DATE</p>
          <p className="mt-1 font-mono text-sm text-ink">18 JULY 2026</p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ink-3">ROUTE</p>
          <p className="mt-1 font-mono text-xs leading-relaxed text-ink">
            VYTTILA → ALUVA → THRIPPUNITHURA → VYTTILA
          </p>
        </div>
        <div aria-hidden className="flex items-end gap-[3px] pt-2">
          {[5, 9, 4, 10, 6, 8, 3, 9, 5, 7, 4, 10, 8, 5, 9, 6, 3, 8, 10, 4, 7, 9, 5, 8].map(
            (h, i) => (
              <span key={i} className="w-[3px] bg-ink-3" style={{ height: `${h * 2.4}px` }} />
            )
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export function WhoShouldApply() {
  return (
    <Section id="apply">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading eyebrow="Apply" title="Built for serious builders." />
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-2">
              This is for student developers, independent builders, designers who
              code, AI experimenters, and makers who can turn an idea into a working
              prototype under pressure.
            </p>
            <ul className="mt-8 space-y-3">
              {applyCriteria.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-ink-2">
                  <span aria-hidden className="mt-0.5 font-mono text-cyan">
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <MagneticButton href={APPLY_LINK}>Apply to Build</MagneticButton>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <BuilderPass />
        </Reveal>
      </div>
    </Section>
  );
}

export function MediaStoryboard() {
  return (
    <Section id="media">
      <SectionHeading eyebrow="Storytelling" title="Designed to be documented." />
      <Reveal>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-ink-2">
          Build in Motion is designed as a high-energy public technology story:
          builders coding inside an exclusive moving metro, creator coverage,
          participant interviews, final demos, and behind-the-scenes documentation.
        </p>
      </Reveal>
      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
        {mediaFrames.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.07} className="min-w-[230px] md:min-w-0">
            <div className="card h-full overflow-hidden">
              <div className="flex aspect-[4/3] items-center justify-center border-b border-line bg-night">
                <span className="font-mono text-3xl text-ink-3 opacity-50">
                  {f.num}
                </span>
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] tracking-[0.3em] text-amber">
                  FRAME {f.num}
                </p>
                <h3 className="mt-1 font-display text-base font-bold text-ink">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-3">{f.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="mt-4 font-mono text-xs text-ink-3">{MEDIA_DISCLAIMER}</p>
      </Reveal>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden text-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_60%,rgba(0,214,201,0.09),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="light-streak" style={{ top: "30%", width: "26vw", animationDuration: "9s" }} />
        <span className="light-streak" style={{ top: "65%", width: "20vw", animationDuration: "11s", animationDelay: "3s" }} />
      </div>
      <div className="relative z-10">
        <Reveal>
          <svg aria-hidden viewBox="0 0 400 40" className="mx-auto mb-10 w-64">
            <path d="M10 20 H 330" stroke="#00D6C9" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <circle cx="10" cy="20" r="4" fill="#05070A" stroke="#00D6C9" strokeWidth="2" />
            <rect x="344" y="8" width="10" height="24" fill="#00D6C9">
              <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.1s" repeatCount="indefinite" />
            </rect>
          </svg>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            One train. One night. Build something that moves.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-2">
            Applications are for serious builders ready to create under pressure
            inside one of India&rsquo;s most unique AI build environments.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={APPLY_LINK}>Apply to Build</MagneticButton>
            <MagneticButton href={CONTACT_LINK} variant="secondary">
              Media / Partner Enquiry
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line px-5 py-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-display text-lg font-bold text-ink">Build in Motion</p>
            <p className="mt-2 text-sm text-ink-2">Codex Community Kochi</p>
            <p className="text-sm text-ink-3">Kochi, Kerala</p>
            <p className="mt-1 font-mono text-xs text-ink-3">
              Saturday night, 18 July 2026
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["Apply", APPLY_LINK],
              ["Schedule", "#schedule"],
              ["Route", "#route"],
              ["FAQ", "#faq"],
              ["Contact", CONTACT_LINK],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs leading-relaxed text-ink-3">
            {SUPPORT_LINE} {PARTNER_LINE}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink-3">
            Event details, route, permissions, branding, media access, and prizes are
            subject to final confirmation.
          </p>
        </div>
      </div>
    </footer>
  );
}
