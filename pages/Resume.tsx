import { navigate } from "@/components/ui";
import { IDENTITY, CODE_TEBIB } from "@/config";
import { ArrowRight } from "@/components/ui";

const profile =
  "Junior Mobile UI/UX Designer focused on Android utility and productivity apps. I design accessible, token-driven mobile interfaces with documented reasoning — from research plans and user flows to high-fidelity screens and interaction specs. Every assumption is labelled honestly; every decision is interview-defensible. Open to remote junior roles.";

const projectRows = [
  {
    name: "FocusFlow",
    kind: "Android productivity · concept",
    desc: "Daily-first task manager: bottom-sheet capture, routines, pattern-based weekly stats.",
    proves: "IA & flows · design system · 6 hi-fi screens · usability-test plan",
  },
  {
    name: "DoseWise",
    kind: "Android health utility · concept",
    desc: "Medication reminder designed for older adults: one-timeline day view, unmissable confirm loop, 30% UI-scale mode.",
    proves: "Accessibility-led design · WCAG 2.2 AA targets · plain-language copy",
  },
  {
    name: "Spendwise",
    kind: "Android finance utility · concept",
    desc: "Personal budgeting with ≤10-second amount-first expense capture and budgets that speak in “per day left”.",
    proves: "Friction-hunting · measurable UX goal · local-first privacy stance",
  },
  {
    name: `Code Tebib — ${CODE_TEBIB.amharic}`,
    kind: "Web design & development · live",
    desc: "Amharic-first showcase site (React · TypeScript · Tailwind), deployed on Vercel with Ethiopic typography engineering.",
    proves: "Shipping to production · responsive behaviour · non-Latin type systems",
  },
];

const skillGroups = [
  { label: "Working Knowledge", tone: "#1b4d3e", skills: ["Mobile UI design", "Wireframing", "User flows", "Design systems & reusable components", "Accessibility fundamentals (WCAG 2.2)"] },
  { label: "Practicing", tone: "#2458e6", skills: ["Android interface patterns (Material)", "Information architecture", "Interactive prototyping", "Responsive layouts"] },
  { label: "Basic Knowledge", tone: "#f14a0e", skills: ["UX research planning", "Usability testing"] },
];

const toolList = ["Figma", "AI Arena.ai (primary AI tool)", "FigJam", "Material Design 3 guidelines", "Notion", "HTML/CSS basics"];

export function Resume() {
  return (
    <div className="bg-canvas py-8 sm:py-12">
      {/* screen-only toolbar */}
      <div className="mx-auto mb-6 flex max-w-[820px] flex-wrap items-center justify-between gap-3 px-4 print:hidden">
        <button onClick={() => navigate("#/")} className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-accent">
          <ArrowRight className="rotate-180 transition-transform group-hover:-translate-x-1" /> Back to portfolio
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* the sheet */}
      <div className="resume-sheet mx-auto max-w-[820px] border border-line bg-paper shadow-lift">
        {/* header band */}
        <div className="border-b-2 border-ink px-8 py-7 sm:px-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">Curriculum Vitae · 2026</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {IDENTITY.name.toUpperCase()}<span className="text-accent">.</span>
          </h1>
          <p className="mt-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-soft">{IDENTITY.title}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[12px] font-medium text-ink-soft">
            <a href={`mailto:${IDENTITY.email}`} className="text-accent hover:underline">{IDENTITY.email}</a>
            <a href={IDENTITY.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-accent hover:underline">linkedin.com/in/yeabsira-munye</a>
            <span>{IDENTITY.location}</span>
            <span className="text-moss">Open to remote · {IDENTITY.availableFrom}</span>
          </div>
        </div>

        <div className="space-y-7 px-8 py-7 sm:px-10">
          {/* profile */}
          <section>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Profile</h2>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">{profile}</p>
          </section>

          {/* projects */}
          <section>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Portfolio projects</h2>
            <div className="mt-3 space-y-4">
              {projectRows.map((p) => (
                <div key={p.name} className="border-l-2 border-line pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <p className="font-display text-[15.5px] font-bold text-ink">{p.name}</p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">{p.kind}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{p.desc}</p>
                  <p className="mt-1 text-[11.5px] font-semibold text-moss">Demonstrates: <span className="font-medium text-ink-soft">{p.proves}</span></p>
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-dashed border-line-strong pt-2.5 text-[11px] leading-relaxed text-ink-mute">
              The three mobile projects are self-initiated concept studies — research plans and personas are clearly labelled hypotheses, not client work. Code Tebib is live at {CODE_TEBIB.url}
            </p>
          </section>

          {/* skills */}
          <section className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Skills</h2>
              <div className="mt-3 space-y-3.5">
                {skillGroups.map((g) => (
                  <div key={g.label}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: g.tone }}>{g.label}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{g.skills.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Tools</h2>
              <ul className="mt-3 space-y-1.5">
                {toolList.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12.5px] text-ink-soft">
                    <span className="h-1.5 w-1.5 shrink-0 bg-accent" /> {t}
                  </li>
                ))}
              </ul>
              <h2 className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Languages</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">Amharic — native<br />English — professional <span className="text-ink-mute">[edit level in src/pages/Resume.tsx]</span></p>
            </div>
          </section>

          {/* approach */}
          <section>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">How I work</h2>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-soft">
              Ten-step process from problem framing to iteration — every case study shows steps 1–8 completed, with
              testing plans written and ready to run. Assumptions wear visible labels; accessibility (48 dp targets,
              contrast-checked tokens, no colour-only states) is verified per screen, not in a final pass.
            </p>
          </section>

          {/* education & experience — user fills this */}
          <section>
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Education & experience</h2>
            {IDENTITY.resumeEntries.length > 0 ? (
              <div className="mt-3 space-y-3.5">
                {IDENTITY.resumeEntries.map((e, i) => (
                  <div key={i} className="border-l-2 border-line pl-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="text-[13.5px] font-bold text-ink">{e.title} <span className="font-medium text-ink-soft">· {e.org}</span></p>
                      <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-mute">{e.period}</span>
                    </div>
                    {e.note && <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{e.note}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 border border-dashed border-line-strong bg-canvas px-4 py-3.5 print:hidden">
                <p className="text-[12.5px] leading-relaxed text-ink-soft">
                  <span className="font-bold text-ink">This section is waiting for you.</span> Add your real
                  education / work history in <span className="font-mono text-[11.5px] text-accent">src/config.ts → resumeEntries</span>{" "}
                  (examples in the file). It prints only once filled — nothing fictional will ever appear here.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* sheet footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-8 py-4 sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{IDENTITY.name} · {IDENTITY.title}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">References & full case studies available on request</p>
        </div>
      </div>
    </div>
  );
}
