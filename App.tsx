import { useEffect, useState } from "react";
import { useHashRoute, navigate } from "@/components/ui";
import { projectById } from "@/data/projects";
import { IDENTITY } from "@/config";
import { downloadSourceZip, sourceFileCount } from "@/utils/sourceZip";
import { Home } from "@/pages/Home";
import { CaseStudy } from "@/pages/CaseStudy";
import { CodeTebib } from "@/pages/CodeTebib";
import { Resume } from "@/pages/Resume";
import { cn } from "@/utils/cn";

const navLinks = [
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Footer source download — assembles the ZIP in-browser, works in any deployment */
function SourceDownload() {
  const [state, setState] = useState<"idle" | "packing" | "saved">("idle");
  const onClick = () => {
    if (state !== "idle") return;
    setState("packing");
    setTimeout(() => {
      downloadSourceZip();
      setState("saved");
      setTimeout(() => setState("idle"), 2400);
    }, 150);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
        state === "saved" ? "text-moss" : "text-accent hover:underline"
      )}
    >
      {state === "idle" && (
        <>
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" strokeLinecap="square" /></svg>
          Source (.zip)
        </>
      )}
      {state === "packing" && <span className="animate-pulse">Packing {sourceFileCount()} files…</span>}
      {state === "saved" && <span>✓ Saved — unpack & see DEPLOY.md</span>}
    </button>
  );
}

/** Resume link — becomes a real button as soon as resumeUrl is set in src/config.ts */
function ResumeLink({ dark, mobile }: { dark?: boolean; mobile?: boolean }) {
  if (IDENTITY.resumeUrl) {
    return (
      <a
        href={IDENTITY.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
          dark ? "border-accent text-accent hover:bg-accent hover:text-white" : "border-accent text-accent hover:bg-accent hover:text-white",
          mobile && "mt-3 inline-block"
        )}
      >
        Resume ↗
      </a>
    );
  }
  return (
    <span
      title="Add your resume: set resumeUrl in src/config.ts"
      className={cn(
        "inline-block cursor-not-allowed border border-dashed px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]",
        dark ? "border-paper/25 text-paper/40" : "border-line-strong text-ink-mute",
        mobile && "mt-3"
      )}
    >
      Resume · add PDF
    </span>
  );
}

export default function App() {
  const hash = useHashRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const caseMatch = hash.match(/^#\/work\/([\w-]+)/);
  const project = caseMatch ? projectById(caseMatch[1]) : undefined;
  const isCodeTebib = hash === "#/work/code-tebib";
  const isResume = hash === "#/resume";

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [hash]);

  const goSection = (id: string) => {
    setMenuOpen(false);
    if (project) {
      navigate("#/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a href="#main" className="sr-only-focusable">Skip to content</a>

      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2.5px] bg-transparent" aria-hidden>
        <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* header */}
      <nav className="sticky top-0 z-40 border-b border-line bg-canvas/92 backdrop-blur-sm" aria-label="Main navigation">
        <div className="mx-auto flex h-[57px] max-w-6xl items-center gap-6 px-5 sm:px-8">
          <button onClick={() => navigate("#/")} className="group flex items-center gap-2.5" aria-label={`${IDENTITY.name} — home`}>
            <span className="flex h-8 w-8 items-center justify-center bg-ink transition-colors group-hover:bg-accent">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="#F2F3EF" strokeWidth="2" aria-hidden>
                <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                <circle cx="12" cy="17.5" r="1.3" fill="#F2F3EF" stroke="none" />
              </svg>
            </span>
            <span className="hidden font-display text-[15px] font-bold tracking-tight sm:block">
              {IDENTITY.name} <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-mute">/ MOBILE UI·UX</span>
            </span>
          </button>

          <div className="ml-auto hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => goSection(l.id)}
                className="relative px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-ink hover:after:scale-x-100"
              >
                {l.label}
              </button>
            ))}
            <div className="ml-3"><ResumeLink /></div>
          </div>

          {/* mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={cn("h-[2px] w-5 bg-ink transition-transform", menuOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-[2px] w-5 bg-ink transition-opacity", menuOpen && "opacity-0")} />
            <span className={cn("h-[2px] w-5 bg-ink transition-transform", menuOpen && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>

        {/* mobile panel */}
        {menuOpen && (
          <div className="border-t border-line bg-paper px-5 py-4 md:hidden">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => goSection(l.id)} className="block w-full border-b border-line py-3.5 text-left font-display text-lg font-bold text-ink last:border-0">
                {l.label}
              </button>
            ))}
            <ResumeLink mobile />
          </div>
        )}
      </nav>

      {/* page */}
      <main id="main">
        {project ? (
          <CaseStudy key={project.id} project={project} />
        ) : isCodeTebib ? (
          <CodeTebib />
        ) : isResume ? (
          <Resume />
        ) : (
          <Home />
        )}
      </main>

      {/* footer */}
      <footer className="border-t border-line bg-canvas">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-ink">{IDENTITY.name}</p>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">{IDENTITY.title} · Android</p>
            <a href={`mailto:${IDENTITY.email}`} className="mt-2 inline-block text-[12.5px] font-semibold text-accent hover:underline">
              {IDENTITY.email}
            </a>
          </div>
          <div className="max-w-md border-l-2 border-accent pl-4">
            <p className="text-[12px] leading-relaxed text-ink-soft">
              <span className="font-bold text-ink">Honesty note:</span> all projects are self-initiated concepts.
              Personas, research, feedback and outcomes shown here are clearly labelled hypotheses or plans —
              never presented as real studies or client work.
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-[12px] text-ink-soft">© 2026 · Built with React + Tailwind</p>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">393 × 852 dp forever</p>
            <div className="mt-3 flex items-center gap-4 md:justify-end">
              <SourceDownload />
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent hover:underline">
                ↑ Back to top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
