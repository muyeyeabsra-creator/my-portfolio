import { projects, type Project } from "@/data/projects";
import { screenRegistry } from "@/screens/registry";
import { PhoneFrame } from "@/components/PhoneFrame";
import {
  Reveal, HonestBadge, HonestCallout, navigate, ArrowRight, CropMarks,
} from "@/components/ui";
import {
  FlowDiagram, IATree, JourneyMap, ColorGrid, TypeScale, SpacingScale, ButtonStates, FieldStates, LoFiFrame,
} from "@/components/diagrams";
import { IcCheck } from "@/screens/atoms";

const sections = [
  ["users", "Users & journey"],
  ["research", "Research"],
  ["architecture", "IA & flow"],
  ["wireframes", "Wireframes"],
  ["system", "Design system"],
  ["screens", "Final screens"],
  ["prototype", "Prototype"],
  ["accessibility", "Accessibility"],
  ["testing", "Test plan"],
  ["tradeoffs", "Trade-offs"],
  ["reflection", "Reflection"],
] as const;

function Section({ id, index, title, lede, children }: { id: string; index: string; title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-line py-14 sm:py-20">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-accent">{index}</span>
          <span className="h-px flex-1 bg-line-strong" aria-hidden />
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
        {lede && <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{lede}</p>}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function MetaItem({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-line bg-paper px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{k}</p>
      <p className="mt-1 text-[13px] font-semibold leading-snug text-ink">{v}</p>
    </div>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const Hero = project.heroScreen;

  return (
    <div className="bg-canvas">
      {/* ---------- case hero ---------- */}
      <header className="canvas-grid relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -right-10 top-8 hidden select-none font-display text-[220px] font-extrabold leading-none text-ink/[0.045] lg:block" aria-hidden>
          {project.index}
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pt-12">
          <Reveal>
            <button onClick={() => navigate("#/")} className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-accent">
              <ArrowRight className="rotate-180 transition-transform group-hover:-translate-x-1" /> All work
            </button>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-semibold text-accent">{project.index} / 03</span>
              <HonestBadge kind="concept" label="Concept project" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">{project.kind}</span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-7xl">{project.name}</h1>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-ink-soft sm:text-xl">{project.tagline}</p>
          </Reveal>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal delay={100}>
              <div className="relative">
                <CropMarks />
                <p className="border border-line bg-paper px-5 py-4 text-[15px] leading-relaxed text-ink-soft">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Case summary · </span>
                  {project.summary}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <MetaItem k="Role" v={project.role} />
                  <MetaItem k="Timeline" v={project.timeline} />
                  <MetaItem k="Platform" v={project.platform} />
                  <MetaItem k="Tools" v={project.tools} />
                </div>
                <div className="mt-4 border border-line bg-paper px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">The problem</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{project.problem.statement}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">Product goal</p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{project.problem.goal}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-moss">Proposed solution</p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{project.problem.solution}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-line pt-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Target users</p>
                    <ul className="mt-1.5 space-y-1">
                      {project.problem.audience.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-[13px] text-ink-soft">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200} className="flex justify-center lg:justify-end lg:pr-6">
              <PhoneFrame caption={`${project.name} · Today`}>
                <Hero />
              </PhoneFrame>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------- section index ---------- */}
      <nav className="sticky top-[57px] z-30 border-b border-line bg-canvas/95 backdrop-blur-sm" aria-label="Case study sections">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-2.5 sm:px-8">
          {sections.map(([id, label], i) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="shrink-0 border border-line bg-paper px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {String(i + 1).padStart(2, "0")} · {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---------- 01 users & journey ---------- */}
        <Section id="users" index="01" title="Target users & journey" lede="Who this is for, and what the experience should feel like at each stage. The persona is hypothetical — a design target, not a research result.">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="relative border border-line bg-paper p-6">
              <CropMarks />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Persona</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">{project.persona.name}</h3>
                </div>
                <HonestBadge kind="hypothesis" />
              </div>
              <p className="mt-4 border-l-2 border-accent pl-4 text-[15px] font-medium italic leading-relaxed text-ink">{project.persona.quote}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-moss">Goals</p>
                  <ul className="mt-2 space-y-1.5">
                    {project.persona.goals.map((g) => <li key={g} className="flex gap-2 text-[13px] leading-snug text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-moss" />{g}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Frustrations</p>
                  <ul className="mt-2 space-y-1.5">
                    {project.persona.pains.map((g) => <li key={g} className="flex gap-2 text-[13px] leading-snug text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />{g}</li>)}
                  </ul>
                </div>
              </div>
              <p className="mt-5 border-t border-line pt-3 text-[12.5px] text-ink-mute">{project.persona.meta} · {project.persona.tech}</p>
              <div className="mt-5 border border-line bg-canvas p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">User needs (proposed)</p>
                  <HonestBadge kind="hypothesis" label="Derived from assumptions" />
                </div>
                <ul className="mt-2.5 space-y-1.5">
                  {project.userNeeds.map((n) => (
                    <li key={n} className="flex gap-2 text-[12.5px] leading-snug text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-signal" /> {n}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <JourneyMap stages={project.journey.stages} rows={project.journey.rows} />
              <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-ink-mute">
                + positive moment · − friction point · opportunities below each stage are hypotheses to test, not findings.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 02 research ---------- */}
        <Section id="research" index="02" title="Research approach" lede={project.researchMethod}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Key assumptions to validate</h3>
              <ul className="mt-4 space-y-3">
                {project.assumptions.map((a, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-3">
                    <span className="font-mono text-[11px] font-semibold text-signal">A{i + 1}</span>
                    <p className="text-[13.5px] leading-relaxed text-ink-soft">{a}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Research questions</h3>
              <ul className="mt-4 space-y-3">
                {project.researchQuestions.map((q, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-3">
                    <span className="font-mono text-[11px] font-semibold text-accent">Q{i + 1}</span>
                    <p className="text-[13.5px] leading-relaxed text-ink-soft">{q}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <HonestCallout kind="hypothesis">
                  Every assumption and persona trait above is a starting hypothesis used to make design decisions responsibly. When testing runs, this section will be updated with observations — including ones that disprove the design.
                </HonestCallout>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 03 IA & flow ---------- */}
        <Section id="architecture" index="03" title="Information architecture & user flow" lede="Flat by design: four top-level destinations, every primary task reachable in two gestures or fewer.">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Sitemap</h3>
              <IATree nodes={project.ia} />
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Primary flow · happy path + error branch</h3>
              <div className="border border-line bg-paper p-5">
                <FlowDiagram steps={project.flow} />
              </div>
              <p className="mt-4 border-l-2 border-signal bg-signal-soft/50 px-4 py-3 text-[13px] leading-relaxed text-ink-soft">{project.flowNote}</p>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 04 wireframes ---------- */}
        <Section id="wireframes" index="04" title="Low-fidelity wireframes" lede="Greyscale first: structure, hierarchy and content order were settled before a single brand colour was applied.">
          <Reveal className="flex flex-wrap items-start justify-center gap-8 border border-line bg-paper p-6 sm:p-10 lg:justify-between">
            {project.wireframes.map((w) => (
              <LoFiFrame key={w.caption} caption={w.caption}>{w.body}</LoFiFrame>
            ))}
          </Reveal>
        </Section>

        {/* ---------- 05 design system ---------- */}
        <Section id="system" index="05" title="Design system" lede="A small, strict token set. One theme object drives every screen, so consistency is enforced by code, not by discipline.">
          <div className="space-y-10">
            <Reveal>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Colour tokens</h3>
              <ColorGrid tokens={project.colors} />
            </Reveal>
            <div className="grid gap-10 lg:grid-cols-2">
              <Reveal>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Type scale</h3>
                <TypeScale rows={project.typeScale} />
              </Reveal>
              <Reveal delay={100}>
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Spacing & grid</h3>
                <SpacingScale />
              </Reveal>
            </div>
            <Reveal>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Component states · rendered live from the theme</h3>
              <ButtonStates t={project.theme} />
              <div className="mt-4"><FieldStates t={project.theme} /></div>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 06 final screens ---------- */}
        <Section id="screens" index="06" title="High-fidelity screens" lede="Six screens — every one earns its place by supporting a real task. States shown include empty, focused, error and warning. Reference: 393×852 dp, scaled to fit.">
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {project.screens.map((s, i) => {
              const Comp = screenRegistry[s.key];
              return (
                <Reveal key={s.key} delay={(i % 3) * 90} className="flex flex-col items-center">
                  <PhoneFrame caption={`0${i + 1} · ${s.name}`}>
                    {Comp ? <Comp /> : null}
                  </PhoneFrame>
                  <div className="mt-4 w-full max-w-[300px]">
                    <p className="text-[13.5px] font-bold leading-snug text-ink">{s.purpose}</p>
                    <ul className="mt-2.5 space-y-1.5 border-t border-dashed border-line-strong pt-2.5">
                      {s.notes.map((n) => (
                        <li key={n} className="flex gap-2 text-[12px] leading-snug text-ink-soft">
                          <span className="mt-0.5 text-signal"><IcCheck size={11} strokeWidth={2.6} /></span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14">
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Key UX decisions & rationale</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {project.decisions.map((d, i) => (
                <Reveal key={i} delay={i * 60} className="border border-line bg-paper p-5">
                  <p className="text-[14px] font-bold leading-snug text-ink">{d.decision}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{d.rationale}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ---------- 07 prototype ---------- */}
        <Section id="prototype" index="07" title="Key interactions & prototype spec" lede="The interactions that carry the core task, specified trigger → response → motion, ready to implement in Figma or Android. These are specs, not live prototypes.">
          <Reveal>
            <div className="overflow-x-auto border border-line bg-paper">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    <th className="px-4 py-3">Trigger</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Destination</th><th className="px-4 py-3">Motion & feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {project.prototype.map((p, i) => (
                    <tr key={i} className="align-top transition-colors hover:bg-canvas">
                      <td className="px-4 py-3 text-[13px] font-bold text-ink">{p.trigger}</td>
                      <td className="px-4 py-3 text-[13px] text-ink-soft">{p.action}</td>
                      <td className="px-4 py-3 text-[13px] text-ink-soft">{p.destination}</td>
                      <td className="px-4 py-3 font-mono text-[11.5px] leading-relaxed text-signal">{p.motion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <HonestCallout kind="concept">
              This portfolio renders the screens live in the browser, but the interactions above are specifications to be wired in a design tool — they are not presented as a working prototype.
            </HonestCallout>
          </Reveal>
        </Section>

        {/* ---------- 08 accessibility ---------- */}
        <Section id="accessibility" index="08" title="Accessibility considerations" lede="Checked per screen, not as an afterthought. WCAG 2.2 AA is the bar for every project in this portfolio.">
          <div className="grid gap-3 md:grid-cols-2">
            {project.accessibility.map((a, i) => (
              <Reveal key={i} delay={i * 50} className="flex gap-3 border border-line bg-paper px-4 py-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-moss/10 text-moss"><IcCheck size={12} strokeWidth={2.6} /></span>
                <p className="text-[13.5px] leading-relaxed text-ink-soft">{a}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- 09 testing ---------- */}
        <Section id="testing" index="09" title="Usability testing plan" lede={project.testPlan.intro}>
          <div className="mb-6"><HonestBadge kind="plan" label="Plan — not yet conducted" /></div>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Test tasks & per-task success criteria</h3>
              <ol className="space-y-3">
                {project.testPlan.tasks.map((t, i) => (
                  <li key={i} className="border border-line bg-paper p-4">
                    <p className="text-[13.5px] font-bold text-ink"><span className="mr-2 font-mono text-[11px] text-accent">T{i + 1}</span>{t.task}</p>
                    <p className="mt-1.5 flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">
                      <span className="font-mono text-[10px] font-semibold uppercase text-moss">Pass if</span>{t.success}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Pre-defined success criteria</h3>
              <ul className="space-y-2.5 border border-line bg-paper p-4">
                {project.testPlan.criteria.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />{c}
                  </li>
                ))}
              </ul>
              <h3 className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Observation method</h3>
              <p className="border border-line bg-paper p-4 text-[13px] leading-relaxed text-ink-soft">{project.testPlan.notes}</p>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 10 trade-offs ---------- */}
        <Section id="tradeoffs" index="10" title="Design challenges & trade-offs">
          <div className="grid gap-3 md:grid-cols-3">
            {project.challenges.map((c, i) => (
              <Reveal key={i} delay={i * 70} className="flex flex-col border border-line bg-paper p-5">
                <p className="text-[13.5px] font-bold leading-snug text-ink">{c.challenge}</p>
                <p className="mt-2.5 border-t border-dashed border-line-strong pt-2.5 text-[12.5px] leading-relaxed text-ink-soft">
                  <span className="font-mono text-[10px] font-semibold uppercase text-accent">Trade-off · </span>{c.tradeoff}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- 11 reflection ---------- */}
        <Section id="reflection" index="11" title="Lessons learned & next steps">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">What this project taught me</h3>
              <ul className="space-y-3">
                {project.lessons.map((l, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="font-mono text-[11px] font-semibold text-accent">L{i + 1}</span>{l}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Where it goes next</h3>
              <ul className="space-y-3">
                {project.nextSteps.map((n, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="font-mono text-[11px] font-semibold text-signal">N{i + 1}</span>{n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ---------- prev / next ---------- */}
        <nav className="grid gap-4 border-t border-line py-12 sm:grid-cols-2">
          <button onClick={() => navigate(`#/work/${prev.id}`)} className="group border border-line bg-paper p-6 text-left transition-colors hover:border-ink">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">← Previous case study</p>
            <p className="mt-2 flex items-center gap-2 font-display text-2xl font-bold text-ink">
              {prev.name}
            </p>
            <p className="mt-1 text-[13px] text-ink-soft">{prev.kind}</p>
          </button>
          <button onClick={() => navigate(`#/work/${next.id}`)} className="group border border-line bg-paper p-6 text-right transition-colors hover:border-ink">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Next case study →</p>
            <p className="mt-2 flex items-center justify-end gap-2 font-display text-2xl font-bold text-ink">
              {next.name}
            </p>
            <p className="mt-1 text-[13px] text-ink-soft">{next.kind}</p>
          </button>
        </nav>

        {/* additional project pointer */}
        <button
          onClick={() => navigate("#/work/code-tebib")}
          className="group mb-14 flex w-full items-center justify-between gap-4 border border-dashed border-line-strong bg-canvas px-6 py-5 text-left transition-colors hover:border-accent"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">04 · Additional project · Web design & development</p>
            <p className="mt-1.5 font-display text-xl font-bold text-ink transition-colors group-hover:text-accent">
              Code Tebib — <span style={{ fontFamily: "'Noto Serif Ethiopic', serif" }}>ኮድ ጠቢብ</span>
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper text-ink transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowRight />
          </span>
        </button>
      </main>
    </div>
  );
}


