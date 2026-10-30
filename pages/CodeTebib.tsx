import { Reveal, HonestBadge, navigate, ArrowRight, ArrowUpRight, CropMarks, SpecNote } from "@/components/ui";
import { BrowserFrame, MobileViewport, CodeTebibPreview } from "@/components/BrowserFrame";
import { CODE_TEBIB, IDENTITY } from "@/config";

const verified = (
  <span className="inline-flex items-center gap-1.5 rounded-sm border border-moss/30 bg-moss/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-moss">
    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> Verified from live source
  </span>
);
const toVerify = (
  <span className="inline-flex items-center gap-1.5 rounded-sm border border-signal/40 bg-signal-soft px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> To verify with me
  </span>
);

const tokens = [
  { name: "Ink (canvas)", hex: "#0b120f", role: "Deep green-black page background + theme-color" },
  { name: "Gold (accent)", hex: "#e9b84d", role: "Logo mark, keywords, focus outlines, selections" },
  { name: "Cream (text)", hex: "#ede6d2", role: "Primary text on dark surfaces" },
  { name: "Syntax green", hex: "#6fc292", role: "String tokens in code displays" },
  { name: "Sage", hex: "#8fa396", role: "Punctuation / secondary code tokens" },
];

const typePairs = [
  { face: "Noto Serif Ethiopic", role: "Display wordmark — ኮድ ጠቢብ", note: "weights up to 900" },
  { face: "Noto Sans Ethiopic", role: "Amharic body & tagline", note: "300–700" },
  { face: "Space Grotesk", role: "Latin display / UI", note: "400–700" },
  { face: "JetBrains Mono", role: "Code blocks & meta", note: "400, 600" },
];

export function CodeTebib() {
  return (
    <div className="bg-canvas">
      {/* ---------- hero ---------- */}
      <header className="canvas-grid relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -right-8 top-6 hidden select-none font-display text-[180px] font-extrabold leading-none text-ink/[0.045] lg:block" aria-hidden>
          04
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pt-12">
          <Reveal>
            <button onClick={() => navigate("#/")} className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-accent">
              <ArrowRight className="rotate-180 transition-transform group-hover:-translate-x-1" /> All work
            </button>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm font-semibold text-accent">04 / Additional</span>
              <HonestBadge kind="concept" label="Personal project · live" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Web design & development</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
              {CODE_TEBIB.name} <span className="text-ink-soft">—</span>{" "}
              <span style={{ fontFamily: "'Noto Serif Ethiopic', serif" }}>{CODE_TEBIB.amharic}</span>
            </h1>
            <p className="mt-3 font-mono text-[13px] font-semibold tracking-wide text-accent" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
              {CODE_TEBIB.tagline} <span className="text-ink-mute">· “I will write complete websites”</span>
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              An Amharic-first website, live on Vercel. This page documents what could be verified directly from
              the deployed site's source — and honestly flags the rest as to-verify, rather than inventing a story.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={CODE_TEBIB.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent"
              >
                View Live Website <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${IDENTITY.email}?subject=${encodeURIComponent("Code Tebib — question")}`}
                className="inline-flex items-center gap-2 border border-ink px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Ask me about it
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <Reveal delay={100} className="relative">
              <CropMarks />
              <BrowserFrame url={CODE_TEBIB.url} caption="Stylized preview rendered from the live site's verified tokens · not a screenshot">
                <CodeTebibPreview />
              </BrowserFrame>
            </Reveal>
            <Reveal delay={200} className="space-y-4">
              <div className="border border-line bg-paper px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Live URL (exact)</p>
                <a href={CODE_TEBIB.url} target="_blank" rel="noreferrer" className="mt-1 block break-all text-[13px] font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {CODE_TEBIB.url}
                </a>
              </div>
              <div className="border border-line bg-paper px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Language</p>
                <p className="mt-1 text-[13px] font-semibold text-ink">Amharic · &lt;html lang="am"&gt; {verified}</p>
              </div>
              <div className="border border-line bg-paper px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Hosting</p>
                <p className="mt-1 text-[13px] font-semibold text-ink">Vercel (client-rendered React build) {verified}</p>
              </div>
              <div className="border border-dashed border-line-strong bg-canvas px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Verification note</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
                  The site renders in the browser, so its full content wasn't crawlable — facts here come from its
                  HTML head, bundled CSS and favicon. Screenshots will replace the stylized preview.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---------- 01 overview ---------- */}
        <section className="border-b border-line py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-sm text-accent">01</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">Project overview</h2>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Reveal className="space-y-4 text-[15px] leading-relaxed text-ink-soft">
              <p>
                <span className="font-bold text-ink">{CODE_TEBIB.name} ({CODE_TEBIB.amharic})</span> is a personal
                web project by {IDENTITY.name}, published live at the URL above. Its own meta description presents
                it as a modern Amharic web showcase built with React, TypeScript and Tailwind CSS.
              </p>
              <p>
                It sits deliberately apart from the three mobile UI/UX case studies: it demonstrates the other half
                of the skill set — taking a design identity all the way into a shipped, responsive, deployed web
                experience, in a script (Ge'ez/Ethiopic) that most template libraries don't consider.
              </p>
              <div className="border-l-2 border-accent bg-accent-soft/40 px-4 py-3">
                <p className="text-[13px] leading-relaxed text-ink-soft">
                  <span className="font-bold text-ink">Why recruiters should care:</span> it's evidence of shipping —
                  a real URL, real typography engineering for Ethiopic script, real production decisions — not only
                  concept screens.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100} className="grid grid-cols-2 gap-3">
              {[
                { k: "Status", v: "Live on Vercel" },
                { k: "Role", v: "Designer & builder [to verify]" },
                { k: "Script", v: "Ethiopic (Amharic)" },
                { k: "Category", v: "Web design & development" },
              ].map((m) => (
                <div key={m.k} className="border border-line bg-paper px-4 py-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{m.k}</p>
                  <p className="mt-1 text-[13.5px] font-bold leading-snug text-ink">{m.v}</p>
                </div>
              ))}
              <div className="col-span-2 border border-line bg-paper px-4 py-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Live meta description (original)</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink" style={{ fontFamily: "'Noto Sans Ethiopic', sans-serif" }}>
                  ኮድ ጠቢብ — ሙሉ ዌብሳይት እጽፋለሁ። React፣ TypeScript እና Tailwind CSS በመጠቀም የተሰራ የአማርኛ ዘመናዊ ድረ-ገጽ ማሳያ።
                </p>
                <p className="mt-1.5 text-[12px] italic leading-relaxed text-ink-mute">
                  “Code Tebib — I will write complete websites. A showcase of modern Amharic web pages built using React, TypeScript and Tailwind CSS.” {verified}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- 02 purpose & audience ---------- */}
        <section className="border-b border-line py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-sm text-accent">02</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">Purpose & audience</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">Stated plainly, with the verification status of each claim.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Reveal className="border border-line bg-paper p-5">
              <div className="mb-3">{verified}</div>
              <p className="font-display text-lg font-bold text-ink">A web showcase, in Amharic</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                The site describes itself as a showcase of modern Amharic web pages — the tagline promises complete
                websites, written in the first person.
              </p>
            </Reveal>
            <Reveal delay={80} className="border border-line bg-paper p-5">
              <div className="mb-3">{toVerify}</div>
              <p className="font-display text-lg font-bold text-ink">Who it serves</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                Likely Amharic-speaking audiences looking for a modern web presence — but the exact audience and
                intent should be confirmed with me rather than assumed from metadata alone.
              </p>
            </Reveal>
            <Reveal delay={160} className="border border-line bg-paper p-5">
              <div className="mb-3">{toVerify}</div>
              <p className="font-display text-lg font-bold text-ink">Scope of my role</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                Built with React + TypeScript + Tailwind (verified in the bundle). Which parts I designed vs.
                implemented with AI assistance is a story I'll tell accurately in conversation — not invented here.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- 03 design identity ---------- */}
        <section className="border-b border-line py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-sm text-accent">03</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">Design identity, observed</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              Every token below was extracted from the deployed stylesheet — this is the site's real visual system. {verified}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Colour system</h3>
              <div className="divide-y divide-line border border-line bg-paper">
                {tokens.map((t) => (
                  <div key={t.hex} className="flex items-center gap-4 px-4 py-3">
                    <span className="h-9 w-9 shrink-0 border border-line" style={{ background: t.hex }} />
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-ink">{t.name} <span className="ml-1 font-mono text-[10.5px] font-normal uppercase text-ink-mute">{t.hex}</span></p>
                      <p className="truncate text-[12px] text-ink-soft">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 border-l-2 border-signal bg-signal-soft/50 px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
                Note the discipline: gold is the only accent, reserved for interactive emphasis — the same
                “one loud colour” principle I applied in DoseWise's mobile design.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Typography pairing</h3>
              <div className="divide-y divide-line border border-line bg-paper">
                {typePairs.map((t) => (
                  <div key={t.face} className="flex items-center justify-between gap-4 px-4 py-3.5">
                    <div>
                      <p className="text-[13.5px] font-bold text-ink">{t.face}</p>
                      <p className="text-[12px] text-ink-soft">{t.role}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-ink-mute">{t.note}</span>
                  </div>
                ))}
              </div>
              <h3 className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Texture & motion (observed)</h3>
              <ul className="space-y-2.5">
                {[
                  "54 px engineering grid overlay + SVG grain texture on dark surfaces",
                  "Marquee bands with pause-on-hover, forward & reversed variants",
                  "Floating Ethiopic glyphs with long, slow ease-in-out cycles",
                  "Scroll-reveal (.rv) with cubic-bezier(0.22, 0.7, 0.25, 1)",
                  "Full prefers-reduced-motion fallback — all animation disabled",
                ].map((m, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-2.5 text-[13px] leading-snug text-ink-soft">
                    <span className="font-mono text-[10.5px] font-semibold text-accent">M{i + 1}</span>{m}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- 04 tech + responsive ---------- */}
        <section className="border-b border-line py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-sm text-accent">04</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">Technology & responsive behaviour</h2>
          </Reveal>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="flex flex-wrap gap-2.5">
                {["React 19.2.6", "TypeScript", "Tailwind CSS (v4)", "Vite single-file build", "Vercel hosting", "Google Fonts (Ethiopic)"].map((t) => (
                  <span key={t} className="border border-line bg-paper px-3.5 py-2 font-mono text-[12px] font-semibold text-ink">{t}</span>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-ink-mute">Versions read directly from the deployed bundle. {verified}</p>

              <h3 className="mb-3 mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Responsive strategy (from its stylesheet)</h3>
              <div className="overflow-x-auto border border-line bg-paper">
                <table className="w-full min-w-[460px] text-left">
                  <thead>
                    <tr className="border-b border-line font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                      <th className="px-4 py-2.5">Breakpoint</th><th className="px-4 py-2.5">Width</th><th className="px-4 py-2.5">Observed adaptations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-[13px] text-ink-soft">
                    <tr><td className="px-4 py-2.5 font-mono text-[12px] text-ink">base</td><td className="px-4 py-2.5 font-mono text-[12px]">&lt;640</td><td className="px-4 py-2.5">Single column, stacked sections, compact type</td></tr>
                    <tr><td className="px-4 py-2.5 font-mono text-[12px] text-ink">sm</td><td className="px-4 py-2.5 font-mono text-[12px]">640</td><td className="px-4 py-2.5">2–4 column grids appear, flex rows</td></tr>
                    <tr><td className="px-4 py-2.5 font-mono text-[12px] text-ink">md</td><td className="px-4 py-2.5 font-mono text-[12px]">768</td><td className="px-4 py-2.5">3–4 column layouts, 12-column grid regions, larger display sizes</td></tr>
                    <tr><td className="px-4 py-2.5 font-mono text-[12px] text-ink">lg</td><td className="px-4 py-2.5 font-mono text-[12px]">1024</td><td className="px-4 py-2.5">Sticky sidebars (top-28), split hero ratios (.8fr/1.2fr)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 border-l-2 border-moss bg-moss/5 px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
                Also observed: visible <span className="font-mono text-[11.5px]">:focus-visible</span> gold outlines
                and thin custom scrollbars — small accessibility and craft details that survive into production.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col items-center gap-6">
              <div className="flex items-end gap-6">
                <MobileViewport><CodeTebibPreview compact /></MobileViewport>
                <SpecNote>same identity,<br />small viewport</SpecNote>
              </div>
              <p className="max-w-xs text-center font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-ink-mute">
                Mobile rendering · stylized from verified tokens
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------- 05 open questions + lessons ---------- */}
        <section className="py-14 sm:py-20">
          <Reveal>
            <p className="font-mono text-sm text-accent">05</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">What I'd verify — and what it taught</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
              The honest end of this case study: the questions only I can answer, and the lessons the build actually produced.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Open questions (ask me in an interview)</h3>
              <ul className="space-y-3">
                {[
                  "What is Code Tebib's exact purpose and target audience — portfolio piece, service page, or product?",
                  "Which parts did I design, which did I implement, and where did AI assistance lead vs. follow?",
                  "What was the hardest Ethiopic-typography decision (serif display vs. sans body vs. mono code)?",
                  "What would I change in a v2 — performance, content structure, testing?",
                ].map((q, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="font-mono text-[11px] font-semibold text-signal">Q{i + 1}</span>{q}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-moss">Lessons carried into my mobile work</h3>
              <ul className="space-y-3">
                {[
                  "Shipping beats polish-paralysis: a live URL with rough edges teaches more than a perfect local file.",
                  "Non-Latin scripts force real typography decisions — line height, weights and fallbacks can't be afterthoughts.",
                  "A restrained palette (one accent on deep ink) reads as confidence on the web exactly as it does on Android.",
                  "Reduced-motion and focus styles are cheap to add during the build and painful to retrofit.",
                ].map((l, i) => (
                  <li key={i} className="flex gap-3 border border-line bg-paper px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="font-mono text-[11px] font-semibold text-moss">L{i + 1}</span>{l}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border border-dashed border-line-strong bg-canvas px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
                <span className="font-bold text-ink">Screenshots:</span> the live site renders client-side, so I can't
                capture it from this build. When you add screenshots to <span className="font-mono text-[11.5px]">public/</span>,
                they'll replace the stylized preview here.
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
