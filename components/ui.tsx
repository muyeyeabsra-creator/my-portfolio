import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ---------------- routing ---------------- */

export function navigate(hash: string) {
  window.location.hash = hash;
}

export function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || "#/");
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

/* ---------------- scroll reveal ---------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ---------------- typography bits ---------------- */

export function Kicker({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "signal" | "ink" }) {
  const color =
    tone === "accent" ? "text-accent" : tone === "signal" ? "text-signal" : "text-ink-soft";
  return (
    <p className={cn("font-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] flex items-center gap-2", color)}>
      <span className="inline-block h-[7px] w-[7px] bg-current" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHead({
  index,
  title,
  lede,
  dark,
}: {
  index: string;
  title: string;
  lede?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <div className="flex items-baseline gap-4">
        <span className={cn("font-mono text-xs sm:text-sm", dark ? "text-white/50" : "text-accent")}>{index}</span>
        <span className={cn("h-px flex-1", dark ? "bg-white/15" : "bg-line-strong")} aria-hidden />
      </div>
      <h2
        className={cn(
          "mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight",
          dark ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-4 max-w-2xl text-base sm:text-lg leading-relaxed", dark ? "text-white/65" : "text-ink-soft")}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- honesty labels ---------------- */

export type HonestKind = "concept" | "hypothesis" | "plan" | "validated";

const honestStyles: Record<HonestKind, string> = {
  concept: "bg-accent-soft text-accent border-accent/30",
  hypothesis: "bg-signal-soft text-signal border-signal/30",
  plan: "bg-ink text-paper border-ink",
  validated: "bg-moss/10 text-moss border-moss/30",
};

export function HonestBadge({ kind, label }: { kind: HonestKind; label?: string }) {
  const text = label ?? kind.toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] rounded-sm",
        honestStyles[kind]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {text}
    </span>
  );
}

export function HonestCallout({ kind, children }: { kind: HonestKind; children: ReactNode }) {
  return (
    <div
      className={cn(
        "border-l-[3px] rounded-r-md px-4 py-3.5 sm:px-5",
        kind === "hypothesis" ? "border-signal bg-signal-soft/60" : kind === "plan" ? "border-ink bg-ink/5" : "border-accent bg-accent-soft/50"
      )}
    >
      <div className="mb-1.5">
        <HonestBadge kind={kind} label={kind === "hypothesis" ? "Assumption — not yet validated" : kind === "plan" ? "Plan — not yet conducted" : "Concept project"} />
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}

/* ---------------- misc ---------------- */

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 12L12 4M6 4h6v6" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 10" className={cn("h-2.5 w-5", className)} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M0 5h18M14 1l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

/** Corner crop marks — the "artboard" decoration */
export function CropMarks({ className }: { className?: string }) {
  const c = "absolute h-4 w-4 border-ink-soft/50";
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <span className={cn(c, "top-0 left-0 border-t border-l")} />
      <span className={cn(c, "top-0 right-0 border-t border-r")} />
      <span className={cn(c, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(c, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}

/** Figma-style blue spec annotation */
export function SpecNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-signal/40 bg-signal-soft px-2 py-1 font-mono text-[10px] font-medium text-signal rounded-sm shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
