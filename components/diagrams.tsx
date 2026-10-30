import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { MTheme } from "@/screens/atoms";
import { MBtn, MField, Toggle, Chip } from "@/screens/atoms";
import { PHONE_W, PHONE_H } from "./PhoneFrame";

/* ------------------------------------------------------------------ */
/* User flow diagram                                                   */
/* ------------------------------------------------------------------ */

export type FlowNode = {
  label: string;
  kind: "start" | "screen" | "action" | "decision" | "end";
  note?: string; // e.g. error branch
};

const nodeStyle: Record<FlowNode["kind"], string> = {
  start: "bg-ink text-paper border-ink rounded-full",
  screen: "bg-paper border-line-strong text-ink",
  action: "bg-signal-soft border-signal/40 text-signal",
  decision: "bg-accent-soft border-accent/50 text-accent",
  end: "bg-moss/10 border-moss/40 text-moss rounded-full",
};

export function FlowDiagram({ steps }: { steps: FlowNode[] }) {
  return (
    <div className="flex flex-wrap items-start gap-y-5">
      {steps.map((s, i) => (
        <div key={i} className="flex items-start">
          <div className="flex flex-col items-center">
            {s.kind === "decision" ? (
              <div className="relative mx-2 mt-1 h-20 w-20 shrink-0">
                <div className={cn("absolute inset-1.5 rotate-45 border-2", nodeStyle.decision)} />
                <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[10px] font-bold leading-tight text-accent">
                  {s.label}
                </span>
              </div>
            ) : (
              <div className={cn("mx-1 mt-2.5 max-w-[130px] border px-3 py-2 text-center text-[11px] font-bold leading-snug shadow-sm", nodeStyle[s.kind])}>
                {s.label}
              </div>
            )}
            {s.note && (
              <p className="mt-1.5 max-w-[130px] border-t border-dashed border-accent/50 pt-1 text-center font-mono text-[9.5px] leading-snug text-ink-soft">{s.note}</p>
            )}
          </div>
          {i < steps.length - 1 && (
            <svg viewBox="0 0 24 10" className="mt-6 h-2.5 w-6 shrink-0 text-line-strong" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M0 5h21M17 1l4 4-4 4" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Low-fi wireframes                                                   */
/* ------------------------------------------------------------------ */

export function WBar({ w = "100%", h = 8, r = 4, tone = "#C7CCC2" }: { w?: string | number; h?: number; r?: number; tone?: string }) {
  return <div className="rounded-full" style={{ width: w, height: h, borderRadius: r, background: tone }} />;
}
export function WBox({ h = 60, tone = "#E4E6E0", dashed, children }: { h?: number; tone?: string; dashed?: boolean; children?: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center rounded-lg" style={{ height: h, background: tone, border: dashed ? "1.5px dashed #B6BCB1" : undefined }}>
      {children}
    </div>
  );
}
export function WList({ n = 3, gap = 8 }: { n?: number; gap?: number }) {
  return (
    <div className="w-full space-y-2">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="flex items-center gap-2" style={{ marginBottom: gap - 8 }}>
          <span className="h-7 w-7 shrink-0 rounded-md" style={{ background: "#D5D9D0" }} />
          <div className="flex-1 space-y-1">
            <WBar w={i % 2 ? "60%" : "78%"} h={6} />
            <WBar w="40%" h={5} tone="#D5D9D0" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoFiFrame({ children, caption }: { children: ReactNode; caption: string }) {
  const scale = 0.62;
  return (
    <figure className="inline-flex flex-col items-center">
      <div className="rounded-[26px] border-2 border-dashed border-line-strong bg-white p-2" style={{ width: PHONE_W * scale + 16, height: PHONE_H * scale + 16 }}>
        <div className="origin-top-left overflow-hidden rounded-[16px] bg-[#F7F8F5]" style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${scale})` }}>
          <div className="flex h-full flex-col px-4 pt-4">{children}</div>
        </div>
      </div>
      <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{caption}</figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Journey map                                                         */
/* ------------------------------------------------------------------ */

export type JourneyRow = { label: string; cells: string[]; tone?: "feeling" };
export function JourneyMap({ stages, rows }: { stages: string[]; rows: JourneyRow[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[720px] border border-line bg-paper">
        <div className="grid" style={{ gridTemplateColumns: `110px repeat(${stages.length}, 1fr)` }}>
          <div className="border-b border-line bg-canvas" />
          {stages.map((s) => (
            <div key={s} className="border-b border-l border-line bg-canvas px-3 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft">{s}</div>
          ))}
          {rows.map((row) => (
            <RowCells key={row.label} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}
function RowCells({ row }: { row: JourneyRow }) {
  return (
    <>
      <div className="border-b border-line px-3 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">{row.label}</div>
      {row.cells.map((c, i) => (
        <div key={i} className="border-b border-l border-line px-3 py-3 text-[12px] leading-snug text-ink-soft last:border-b">
          {row.tone === "feeling" ? (
            <span className="flex items-center gap-2">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", c.startsWith("+") ? "bg-success bg-moss" : c.startsWith("−") || c.startsWith("-") ? "bg-accent" : "bg-line-strong")} />
              {c.replace(/^[+−-]\s*/, "")}
            </span>
          ) : (
            c
          )}
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Information architecture tree                                       */
/* ------------------------------------------------------------------ */

export type IANode = { label: string; note?: string; children?: IANode[] };
export function IATree({ nodes }: { nodes: IANode[] }) {
  return (
    <ul className="space-y-4">
      {nodes.map((n) => (
        <li key={n.label}>
          <div className="inline-flex items-baseline gap-2 border border-ink bg-ink px-3 py-1.5 text-[12px] font-bold text-paper">
            {n.label}
            {n.note && <span className="font-mono text-[9px] font-normal text-paper/60">{n.note}</span>}
          </div>
          {n.children && (
            <ul className="ml-4 mt-2 space-y-1.5 border-l border-dashed border-line-strong pl-4">
              {n.children.map((c) => (
                <li key={c.label} className="flex items-baseline gap-2">
                  <span className="border border-line-strong bg-paper px-2.5 py-1 text-[11.5px] font-semibold text-ink">{c.label}</span>
                  {c.note && <span className="font-mono text-[9.5px] text-ink-mute">{c.note}</span>}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Design-system spec renderers                                        */
/* ------------------------------------------------------------------ */

export function ColorGrid({ tokens }: { tokens: { name: string; hex: string; usage: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {tokens.map((tk) => (
        <div key={tk.name} className="border border-line bg-paper">
          <div className="h-14 border-b border-line" style={{ background: tk.hex }} />
          <div className="px-3 py-2">
            <p className="text-[11.5px] font-bold text-ink">{tk.name}</p>
            <p className="font-mono text-[10px] uppercase text-ink-mute">{tk.hex}</p>
            <p className="mt-1 text-[10.5px] leading-snug text-ink-soft">{tk.usage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TypeScale({ rows }: { rows: { name: string; px: number; weight: number; lh: number; sample: string }[] }) {
  const max = Math.max(...rows.map((r) => r.px));
  return (
    <div className="divide-y divide-line border border-line bg-paper">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-4 px-4 py-3">
          <div className="w-24 shrink-0">
            <p className="text-[11px] font-bold text-ink">{r.name}</p>
            <p className="font-mono text-[9.5px] text-ink-mute">{r.px} / {r.weight} / {r.lh}</p>
          </div>
          <p className="truncate font-display font-bold text-ink" style={{ fontSize: Math.min(26, 8 + (r.px / max) * 18), fontWeight: r.weight, lineHeight: 1.15 }}>
            {r.sample}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SpacingScale() {
  const steps = [4, 8, 12, 16, 24, 32, 48];
  return (
    <div className="border border-line bg-paper px-4 py-4">
      {steps.map((s) => (
        <div key={s} className="mb-2.5 flex items-center gap-3 last:mb-0">
          <span className="w-10 shrink-0 font-mono text-[10px] text-ink-mute">{s}px</span>
          <span className="h-3.5 rounded-sm bg-signal/70" style={{ width: s * 4.5 }} />
        </div>
      ))}
      <p className="mt-3 border-t border-line pt-3 text-[11.5px] leading-relaxed text-ink-soft">
        One base unit (4 px). Components pad in multiples of 4; sections separate with 24–48 px. Grid: 4-column on phones, 16 px margins.
      </p>
    </div>
  );
}

export function ButtonStates({ t }: { t: MTheme }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {[
        { label: "Default", v: "primary" as const },
        { label: "Secondary", v: "secondary" as const },
        { label: "Disabled", v: "disabled" as const },
      ].map((b) => (
        <div key={b.label} className="border border-line bg-paper p-4">
          <MBtn t={t} variant={b.v}>{b.label === "Default" ? "Save task" : "Button"}</MBtn>
          <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">{b.label}</p>
        </div>
      ))}
      <div className="border border-line bg-paper p-4">
        <MBtn t={t}>
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
            <circle cx="12" cy="12" r="9" opacity="0.25" /><path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
          </svg>
          Saving…
        </MBtn>
        <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">Loading</p>
      </div>
      <div className="border border-line bg-paper p-4">
        <div className="rounded-xl px-3 py-2.5 text-center text-[11.5px] font-semibold" style={{ background: `${t.danger}14`, color: t.danger, border: `1px solid ${t.danger}55` }}>
          Try again
        </div>
        <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">Error / retry</p>
      </div>
      <div className="flex flex-col justify-between border border-line bg-paper p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold" style={{ color: t.ink }}>Focus mode</span>
          <Toggle t={t} on />
        </div>
        <div className="mt-3 flex gap-1.5">
          <Chip t={t} small active>Selected</Chip><Chip t={t} small>Default</Chip>
        </div>
        <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">Toggle · Chips</p>
      </div>
    </div>
  );
}

export function FieldStates({ t }: { t: MTheme }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="border border-line bg-paper p-4"><MField t={t} label="Task name" value="Water the plants" /><p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">Default</p></div>
      <div className="border border-line bg-paper p-4"><MField t={t} label="Task name" value="Water the pl" state="focused" /><p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">Focused</p></div>
      <div className="border border-line bg-paper p-4"><MField t={t} label="Task name" state="error" hint="Please enter a task name" /><p className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-mute">Error</p></div>
    </div>
  );
}
