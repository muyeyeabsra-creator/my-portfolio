import { projects } from "@/data/projects";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BrowserFrame, CodeTebibPreview } from "@/components/BrowserFrame";
import { Reveal, Kicker, SectionHead, HonestBadge, navigate, ArrowUpRight, ArrowRight, CropMarks, SpecNote } from "@/components/ui";
import { IDENTITY, CODE_TEBIB } from "@/config";
import { cn } from "@/utils/cn";
import { FFToday as FocusToday } from "@/screens/focusflow";
import { DWToday as DoseToday } from "@/screens/dosewise";
import { SWOverview as SpendHome } from "@/screens/spendwise";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const tickerItems = [
  "User research", "Information architecture", "User flows", "Wireframing", "Design systems",
  "Accessibility · WCAG 2.2", "Prototyping specs", "Usability testing", "Material patterns", "Mobile-first",
];

/* 10-step workflow · status distinguishes done-in-portfolio from planned */
const processStages = [
  { n: "01", t: "Understand the user problem", d: "Frame the real problem in one sentence — and who feels it most.", s: "done" },
  { n: "02", t: "Define needs & assumptions", d: "List user needs and every assumption I haven't validated yet. Label them honestly.", s: "done" },
  { n: "03", t: "Plan research", d: "Write a lightweight study plan a junior can actually run: tasks, criteria, method.", s: "done" },
  { n: "04", t: "Map journey & IA", d: "Journey map per stage; flat IA where every primary task is ≤2 gestures away.", s: "done" },
  { n: "05", t: "User flows & wireframes", d: "Happy path plus every error branch — no dead ends. Greyscale before colour.", s: "done" },
  { n: "06", t: "Develop the design system", d: "Tokens for colour, type, spacing and states — consistency enforced by the system.", s: "done" },
  { n: "07", t: "High-fidelity screens", d: "Final UI with empty, loading, error and success states — not just the happy path.", s: "done" },
  { n: "08", t: "Specify / build prototypes", d: "Interaction specs (trigger → response → motion), wired as a clickable prototype in Figma.", s: "done" },
  { n: "09", t: "Plan usability testing", d: "Success criteria written before testing. Plans are ready in each case study — not yet run.", s: "planned" },
  { n: "10", t: "Iterate on real feedback", d: "Replace assumptions with observations — including the ones that disprove my design.", s: "next" },
] as const;

type Level = "Working Knowledge" | "Practicing" | "Basic Knowledge";
const levelWidth: Record<Level, string> = { "Working Knowledge": "80%", Practicing: "55%", "Basic Knowledge": "35%" };
const levelTone: Record<Level, string> = { "Working Knowledge": "text-moss", Practicing: "text-signal", "Basic Knowledge": "text-accent" };

const skills: { name: string; level: Level }[] = [
  { name: "Mobile UI design", level: "Working Knowledge" },
  { name: "Android interface design (Material)", level: "Practicing" },
  { name: "Wireframing", level: "Working Knowledge" },
  { name: "User flows", level: "Working Knowledge" },
  { name: "Information architecture", level: "Practicing" },
  { name: "Design systems & reusable components", level: "Working Knowledge" },
  { name: "Interactive prototyping", level: "Practicing" },
  { name: "Responsive layouts", level: "Practicing" },
  { name: "Accessibility fundamentals (WCAG 2.2)", level: "Working Knowledge" },
  { name: "UX research planning", level: "Basic Knowledge" },
  { name: "Usability testing", level: "Basic Knowledge" },
];

const tools = ["Figma", "AI Arena.ai (primary AI tool)", "FigJam", "Material Design 3 guidelines", "Notion", "HTML/CSS basics (this site)"];

const interests = [
  "Android utility & productivity apps",
  "Accessible interfaces for every ability and age",
  "Design systems & reusable components",
  "Clear user flows without dead ends",
  "Amharic-language digital experiences",
  "Practical, defensible design decisions",
];

export function Home() {
  return (
    <div>
      {/* ================= HERO ================= */}
      <header className="canvas-grid relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -left-16 bottom-0 hidden select-none font-display text-[190px] font-extrabold leading-none tracking-tight text-ink/[0.04] md:block" aria-hidden>
          UI·UX
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16">
          {/* left — words */}
          <div>
            <Reveal>
              <Kicker>Portfolio · 2026 · Mobile UI/UX</Kicker>
              <h1 className="mt-5 font-display font-extrabold leading-[0.95] tracking-tight text-ink" style={{ fontSize: "clamp(46px, 8.5vw, 84px)" }}>
                YEABSIRA<span className="text-accent">.</span>
              </h1>
              <p className="mt-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.2em] text-ink-soft sm:text-[13px]">
                <span className="text-accent">—</span> Junior Mobile UI/UX Designer
              </p>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft sm:text-lg">
                I design intuitive, accessible, and thoughtfully structured mobile experiences that turn everyday
                user problems into simple, useful solutions. My focus is Android utility and productivity
                applications, with an emphasis on clear user flows, consistent interfaces, and practical design
                decisions.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("work")}
                  className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent"
                >
                  See the Case Studies
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={`mailto:${IDENTITY.email}`}
                  className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Get in Touch
                </a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                <span className="flex items-center gap-2 border border-moss/30 bg-moss/10 px-2.5 py-1 text-moss">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-moss" /> Open to Remote Junior Roles
                </span>
                <span>{IDENTITY.location}</span>
                <span>Android-focused</span>
              </div>
            </Reveal>
          </div>

          {/* right — phone cluster */}
          <Reveal delay={150} className="relative flex justify-center lg:justify-end">
            <div className="relative origin-top scale-[0.52] min-[430px]:scale-[0.62] sm:scale-[0.78] lg:scale-100 mb-[-300px] sm:mb-[-135px] lg:mb-0" style={{ width: 560, height: 640 }}>
              <div className="absolute left-2 top-1 hidden sm:block" aria-hidden>
                <div className="draw-line h-px w-40 bg-signal/70" />
                <p className="mt-1 font-mono text-[10px] tracking-wide text-signal">393 × 852 dp reference</p>
              </div>
              <div className="group absolute left-0 top-16 -rotate-6 scale-[0.82] sm:scale-90" style={{ zIndex: 1 }}>
                <PhoneFrame><FocusToday /></PhoneFrame>
              </div>
              <div className="group absolute left-[38%] top-0 scale-[0.94] sm:left-[34%]" style={{ zIndex: 2 }}>
                <PhoneFrame><DoseToday /></PhoneFrame>
                <SpecNote className="absolute -left-16 top-24 hidden rotate-[-4deg] md:inline-flex">56 dp target ↗</SpecNote>
                <SpecNote className="absolute -right-10 bottom-40 hidden rotate-[3deg] md:inline-flex">confirm loop</SpecNote>
              </div>
              <div className="group absolute bottom-0 right-0 rotate-6 scale-[0.78] sm:scale-[0.85]" style={{ zIndex: 3 }}>
                <PhoneFrame><SpendHome /></PhoneFrame>
              </div>
              <SpecNote className="absolute left-6 bottom-10 hidden rotate-[-2deg] sm:inline-flex">≤10 s to log</SpecNote>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ================= TICKER ================= */}
      <div className="overflow-hidden border-b border-line bg-ink py-3" aria-hidden>
        <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-8">
              {tickerItems.map((t) => (
                <span key={`${k}-${t}`} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
                  {t} <span className="text-accent">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE WORK ================= */}
      <section id="work" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            index="(01)"
            title="Selected mobile work"
            lede="Three Android utility concepts, each chosen to prove a different skill: a productivity system, an accessibility-led health tool, and a friction-fighting finance app. All screens are rendered live from one shared design-token system."
          />
          <div className="space-y-16 sm:space-y-24">
            {projects.map((p, i) => {
              const Hero = p.heroScreen;
              const Second = p.cluster[1];
              const flip = i % 2 === 1;
              return (
                <Reveal key={p.id}>
                  <article className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={cn(flip && "lg:order-2")}>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-5xl font-extrabold text-ink/15">{p.index}</span>
                        <span className="h-px flex-1 bg-line-strong" />
                        <HonestBadge kind="concept" />
                      </div>
                      <h3 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-5xl">
                        {p.name}
                      </h3>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">{p.kind}</p>
                      <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-ink-soft">{p.tagline}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {["Research plan", "User needs", "IA & flows", "Wireframes", "Design system", `${p.screens.length} hi-fi screens`, "Key interactions", "Test plan"].map((tag) => (
                          <span key={tag} className="border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">{tag}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => navigate(`#/work/${p.id}`)}
                        className="mt-7 inline-flex items-center gap-2.5 border-b-2 border-accent pb-1 text-[13px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
                      >
                        Read the case study
                        <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                    <div className={cn("relative flex justify-center", flip && "lg:order-1")}>
                      <div className="relative">
                        <div className="absolute -inset-6 border border-dashed border-line-strong opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                        <div className="absolute -left-14 top-10 hidden -rotate-[8deg] scale-[0.72] opacity-90 md:block">
                          <PhoneFrame tilt={false}><Second /></PhoneFrame>
                        </div>
                        <PhoneFrame><Hero /></PhoneFrame>
                        <SpecNote className="absolute -right-4 top-8 rotate-3 hidden sm:inline-flex">live render</SpecNote>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ADDITIONAL PROJECT — CODE TEBIB ================= */}
      <section id="more" className="scroll-mt-24 border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHead
            index="(02)"
            title="Additional project · web"
            lede="Separate from the mobile case studies: a shipped, live web project — because a junior portfolio should also show that I can take an identity into production."
          />
          <Reveal>
            <article className="group grid items-center gap-10 border border-line bg-canvas p-6 sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl font-extrabold text-ink/15">04</span>
                  <span className="h-px flex-1 bg-line-strong" />
                  <HonestBadge kind="concept" label="Personal project · live" />
                </div>
                <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {CODE_TEBIB.name}{" "}
                  <span className="text-accent" style={{ fontFamily: "'Noto Serif Ethiopic', serif" }}>{CODE_TEBIB.amharic}</span>
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">Web design & development · Amharic</p>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                  A modern Amharic web showcase — <span style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }} className="font-semibold text-ink">{CODE_TEBIB.tagline}</span>,
                  “I will write complete websites.” Built with React, TypeScript and Tailwind CSS, deployed live on
                  Vercel, with Ethiopic-first typography and a deep ink-and-gold identity.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind CSS", "Vercel", "Ethiopic type", "lang=am"].map((tag) => (
                    <span key={tag} className="border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">{tag}</span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={CODE_TEBIB.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group/cta inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent"
                  >
                    View Live Website
                    <ArrowUpRight className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </a>
                  <button
                    onClick={() => navigate("#/work/code-tebib")}
                    className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Project Details
                  </button>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  Description from the live site's own metadata · opens {CODE_TEBIB.url.replace("https://", "").replace("/", "")} in a new tab
                </p>
              </div>
              <div className="relative">
                <CropMarks />
                <BrowserFrame url={CODE_TEBIB.url}>
                  <CodeTebibPreview />
                </BrowserFrame>
                <SpecNote className="absolute -right-3 top-10 rotate-3 hidden sm:inline-flex">stylized from live tokens</SpecNote>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="process" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            index="(03)"
            title="My design process"
            lede="Ten deliberate steps. Status tags separate what is already applied across these case studies from what is planned next — recruiters should never have to guess."
          />
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {processStages.map((s, i) => (
              <Reveal key={s.n} delay={(i % 5) * 70} as="li" className="group relative border-t-2 border-line pt-4 transition-colors hover:border-accent">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-accent">{s.n}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.12em]",
                      s.s === "done" && "bg-moss/10 text-moss",
                      s.s === "planned" && "bg-signal-soft text-signal",
                      s.s === "next" && "bg-accent-soft text-accent"
                    )}
                  >
                    {s.s === "done" ? "Applied here" : s.s === "planned" ? "Planned" : "Next up"}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-[16.5px] font-bold leading-tight text-ink">{s.t}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 border-l-2 border-signal bg-signal-soft/50 px-4 py-3">
            <p className="text-[12.5px] leading-relaxed text-ink-soft">
              <span className="font-bold text-ink">Honest status:</span> steps 01–08 are completed and visible in the three case studies.
              Step 09 exists as written test plans (not yet run). Step 10 begins the moment real participants touch these prototypes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="scroll-mt-24 border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            index="(04)"
            title="Skills & tools"
            lede="Calibrated with three honest labels instead of invented percentages. A junior portfolio should show exactly where someone is — and the direction they're moving."
          />
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="space-y-4">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[13.5px] font-bold text-ink">{s.name}</span>
                    <span className={cn("font-mono text-[10px] font-semibold uppercase tracking-[0.14em]", levelTone[s.level])}>{s.level}</span>
                  </div>
                  <div className="h-[6px] w-full bg-line">
                    <div className="h-full bg-ink transition-all duration-700" style={{ width: levelWidth[s.level] }} />
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-dashed border-line-strong pt-4 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="text-moss">■ Working Knowledge — used across these case studies</span>
                <span className="text-signal">■ Practicing — comfortable, still sharpening</span>
                <span className="text-accent">■ Basic Knowledge — fundamentals, actively learning</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Daily toolkit</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {tools.map((t) => (
                  <span key={t} className="cursor-default border border-line-strong bg-canvas px-4 py-2.5 text-[13px] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[12px] leading-relaxed text-ink-mute">
                Figma is used for production-ready files; this website itself was drafted AI-assisted in Arena.ai and hand-refined.
                AI assistance doesn't claim mastery for me — the labelled bars above are the honest version.
              </p>
              <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Working agreements with myself</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "No screen without a user task. If I can't name the task, the screen doesn't ship.",
                  "Every assumption wears a visible label — hypothesis, plan, or validated.",
                  "Accessibility is checked per screen, not in a final pass.",
                  "I can explain every decision in an interview — or I change the decision.",
                ].map((v, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-canvas px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="font-mono text-[11px] font-semibold text-accent">0{i + 1}</span>{v}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= ABOUT (text-based — no photo placeholder) ================= */}
      <section id="about" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative">
            <div className="relative h-full border border-line bg-paper p-6 sm:p-8">
              <CropMarks />
              {/* Typographic identity panel — a portrait can be added later via
                  photoUrl in src/config.ts; until then this is intentional design, not a placeholder. */}
              {IDENTITY.photoUrl ? (
                <img src={IDENTITY.photoUrl} alt={`Portrait of ${IDENTITY.name}`} className="mb-6 aspect-[4/5] w-full border border-line object-cover" />
              ) : (
                <div className="canvas-grid mb-6 flex items-center justify-center border border-line bg-canvas py-14">
                  <span className="font-display text-[110px] font-extrabold leading-none tracking-tight text-ink">
                    Y<span className="text-accent">.</span>
                  </span>
                </div>
              )}
              <div className="space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                <p className="flex justify-between gap-4"><span className="shrink-0 text-ink-mute">Name</span><span>{IDENTITY.name}</span></p>
                <p className="flex justify-between gap-4"><span className="shrink-0 text-ink-mute">Title</span><span className="text-right">{IDENTITY.title}</span></p>
                <p className="flex justify-between gap-4"><span className="shrink-0 text-ink-mute">Focus</span><span className="text-right">Android utilities</span></p>
                <p className="flex justify-between gap-4"><span className="shrink-0 text-ink-mute">AI tool</span><span className="text-right">Arena.ai</span></p>
                <p className="flex justify-between gap-4"><span className="shrink-0 text-ink-mute">Web project</span><a href={CODE_TEBIB.url} target="_blank" rel="noreferrer" className="text-right text-accent hover:underline">Code Tebib ↗</a></p>
                <p className="flex justify-between gap-4"><span className="shrink-0 text-ink-mute">Status</span><span className="text-moss">Remote-ready</span></p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-accent">(05)</span>
                <span className="h-px flex-1 bg-line-strong" />
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">About me</h2>
            </div>
            <div className="space-y-4 text-[15.5px] leading-relaxed text-ink-soft">
              <p>
                <span className="font-bold text-ink">I'm Yeabsira — a junior mobile UI/UX designer</span> focused on
                Android utility and productivity apps: the small, everyday tools where clarity, speed and
                accessibility decide whether an app earns a place on the home screen.
              </p>
              <p>
                The three case studies in this portfolio are concept projects — self-initiated, end-to-end, and
                deliberately honest about what is assumption and what is plan. Each one trained a different muscle:
                system thinking (FocusFlow), inclusive design (DoseWise), and friction hunting (Spendwise). With{" "}
                <a href={CODE_TEBIB.url} target="_blank" rel="noreferrer" className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">Code Tebib</a>,
                I carried that same discipline into a shipped, Amharic-first web experience.
              </p>
              <p>
                I work well in written, async remote culture: specs, annotated screens, and decisions documented so
                anyone on the team can challenge them. I'd rather present a smaller portfolio I can defend line by
                line than a large one I can't.
              </p>
            </div>
            <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Design interests</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {interests.map((it) => (
                <span key={it} className="border border-line bg-paper px-3 py-1.5 text-[12.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                  {it}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${IDENTITY.email}`} className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent">
                Email me <ArrowUpRight />
              </a>
              {IDENTITY.resumeUrl ? (
                <a href={IDENTITY.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-ink px-5 py-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper">
                  Resume <ArrowUpRight />
                </a>
              ) : (
                <span title="Add your resume: set resumeUrl in src/config.ts" className="inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-line-strong px-5 py-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-ink-mute">
                  Resume — add file in src/config.ts
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="canvas-grid-dark scroll-mt-24 bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Kicker tone="accent">(06) · Contact</Kicker>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-paper sm:text-6xl">
              Let's design something <span className="text-accent">useful</span> together.
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-paper/65">
              I'm looking for a remote junior Mobile UI/UX role where I can ship, test, and learn in public.
              Happy to walk through any case study live — including the parts I'd do differently.
            </p>
            <p className="mt-8 font-mono text-[15px] tracking-tight text-paper sm:text-lg">
              <span className="mr-3 font-sans text-[11px] uppercase tracking-[0.16em] text-paper/40">Email</span>
              {IDENTITY.email}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${IDENTITY.email}`} className="inline-flex items-center gap-2.5 bg-accent px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5">
                Email me <ArrowUpRight />
              </a>
              {IDENTITY.linkedinUrl ? (
                <a href={IDENTITY.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-paper/30 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper">
                  LinkedIn
                </a>
              ) : (
                <span title="Add your LinkedIn URL in src/config.ts" className="inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-paper/25 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-paper/40">
                  LinkedIn — add later
                </span>
              )}
              {IDENTITY.resumeUrl ? (
                <a href={IDENTITY.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-paper/30 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper">
                  Resume PDF
                </a>
              ) : (
                <span title="Add your resume URL in src/config.ts" className="inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-paper/25 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-paper/40">
                  Resume — add later
                </span>
              )}
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40">
              Replies within 24h · {IDENTITY.location} · Available from {IDENTITY.availableFrom}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
