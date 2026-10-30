import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { CODE_TEBIB } from "@/config";

/* Tokens verified from the live site's own stylesheet */
const CT = {
  ink: "#0b120f",
  gold: "#e9b84d",
  cream: "#ede6d2",
  green: "#6fc292",
  sage: "#8fa396",
  faint: "#5f7268",
};

/** Stylized rendering of Code Tebib's identity — built from its verified
 *  meta/CSS tokens. Labelled as a rendering, never as a screenshot. */
export function CodeTebibPreview({ compact }: { compact?: boolean }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: CT.ink,
        backgroundImage: `linear-gradient(90deg, ${CT.cream}0d 1px, transparent 1px), linear-gradient(${CT.cream}0d 1px, transparent 1px)`,
        backgroundSize: "34px 34px",
      }}
    >
      {/* floating Ethiopic glyphs (motion from the live site) */}
      <span className="glyph-float absolute right-[8%] top-[12%] select-none text-[26px] font-bold" style={{ color: `${CT.gold}55`, fontFamily: "'Noto Serif Ethiopic', serif" }} aria-hidden>ቁ</span>
      <span className="glyph-float-slow absolute left-[6%] bottom-[16%] select-none text-[20px] font-bold" style={{ color: `${CT.cream}30`, fontFamily: "'Noto Serif Ethiopic', serif" }} aria-hidden>ጠ</span>

      <div className={cn("relative flex h-full flex-col px-[7%]", compact ? "justify-center gap-3 py-4" : "justify-center gap-4 py-6")}>
        {/* mark */}
        <span
          className="flex items-center justify-center border-2"
          style={{ width: compact ? 30 : 40, height: compact ? 30 : 40, borderColor: CT.gold, color: CT.gold, fontFamily: "'Noto Serif Ethiopic', serif", fontSize: compact ? 15 : 21 }}
          aria-hidden
        >
          ቁ
        </span>
        {/* wordmark + tagline — exact strings from the live site */}
        <div>
          <p className="leading-tight" style={{ color: CT.cream, fontFamily: "'Noto Serif Ethiopic', serif", fontWeight: 900, fontSize: compact ? 24 : 34 }}>
            ኮድ ጠቢብ
          </p>
          <p className="mt-1" style={{ color: CT.gold, fontFamily: "'Noto Sans Ethiopic', sans-serif", fontWeight: 600, fontSize: compact ? 10 : 13 }}>
            {CODE_TEBIB.tagline}
          </p>
        </div>
        {/* code editor card — token colours match the live site's syntax classes */}
        {!compact && (
          <div className="mt-1 max-w-[75%] border p-3 font-mono text-[10px] leading-relaxed shadow-[0_20px_45px_-20px_rgba(0,0,0,0.9)]" style={{ background: "#0e1713", borderColor: `${CT.cream}22` }}>
            <p style={{ color: CT.faint }}><i>// የተረጋገጠ ከቀጥታ ምንጭ · verified from live source</i></p>
            <p>
              <span style={{ color: CT.gold }}>const</span> <span style={{ color: CT.cream, fontWeight: 600 }}>codeTebib</span> <span style={{ color: CT.sage }}>=</span> <span style={{ color: CT.sage }}>{"{"}</span>
            </p>
            <p className="pl-3">
              <span style={{ color: CT.sage }}>stack</span>: <span style={{ color: CT.green }}>["React", "TS", "Tailwind"]</span>,
            </p>
            <p className="pl-3">
              <span style={{ color: CT.sage }}>lang</span>: <span style={{ color: CT.green }}>"am"</span> <span style={{ color: CT.faint }}>· status: <span style={{ color: CT.gold }}>live</span></span>
            </p>
            <p><span style={{ color: CT.sage }}>{"}"}</span><span className="cursor-blink" style={{ color: CT.gold }}>▍</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Desktop browser chrome + viewport */
export function BrowserFrame({ children, url, className, caption }: { children: ReactNode; url: string; className?: string; caption?: string }) {
  return (
    <figure className={cn("inline-flex w-full flex-col items-center", className)}>
      <div className="w-full overflow-hidden rounded-xl border border-ink bg-ink shadow-lift">
        {/* chrome bar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#e9b84d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1">
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0 text-[#6fc292]" fill="currentColor" aria-hidden>
              <path d="M6 1a3 3 0 00-3 3v1.5H2.5v5h7v-5H9V4a3 3 0 00-3-3zm-1.8 4V4a1.8 1.8 0 113.6 0v1z" />
            </svg>
            <span className="truncate font-mono text-[10px] text-white/70">{url.replace("https://", "")}</span>
          </span>
          <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M2 8h12M10 4l4 4-4 4" />
          </svg>
        </div>
        {/* viewport */}
        <div className="relative aspect-[16/10] w-full">{children}</div>
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-md text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Small phone-like viewport to show responsive behaviour of the web project */
export function MobileViewport({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[20px] border-[6px] border-ink bg-ink shadow-lift", className)} style={{ width: 150 }}>
      <div className="relative h-[260px] w-full">{children}</div>
    </div>
  );
}
