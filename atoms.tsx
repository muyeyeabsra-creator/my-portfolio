import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Theme model shared by every rendered app screen                     */
/* ------------------------------------------------------------------ */

export interface MTheme {
  appBg: string; // screen background
  surface: string; // cards
  ink: string; // primary text
  sub: string; // secondary text
  mute: string; // muted text
  border: string; // hairlines
  primary: string; // brand primary
  onPrimary: string; // text on primary
  tint: string; // light primary tint
  accent: string; // accent
  onAccent: string;
  success: string;
  warning: string;
  danger: string;
}

/* ------------------------------------------------------------------ */
/* Icons (24 grid, stroke)                                             */
/* ------------------------------------------------------------------ */

type IcProps = { size?: number; className?: string; strokeWidth?: number };
const ic =
  (d: ReactNode) =>
  ({ size = 18, className, strokeWidth = 1.9 }: IcProps) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {d}
    </svg>
  );

export const IcHome = ic(<><path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>);
export const IcList = ic(<><path d="M8 6h12M8 12h12M8 18h12" /><circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" /></>);
export const IcRepeat = ic(<><path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" /></>);
export const IcChart = ic(<><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></>);
export const IcGear = ic(<><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v3M12 18.2v3M21.2 12h-3M5.8 12h-3M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1M18.5 18.5l-2.1-2.1M7.6 7.6L5.5 5.5" /></>);
export const IcPlus = ic(<path d="M12 5v14M5 12h14" />);
export const IcCheck = ic(<path d="M4.5 12.5l5 5 10-11" />);
export const IcBack = ic(<path d="M15 5l-7 7 7 7" />);
export const IcMore = ic(<><circle cx="5" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="19" cy="12" r="1.4" fill="currentColor" /></>);
export const IcBell = ic(<><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 19a2 2 0 004 0" /></>);
export const IcSearch = ic(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5" /></>);
export const IcClock = ic(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>);
export const IcCal = ic(<><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M8 3v4M16 3v4" /></>);
export const IcPill = ic(<><rect x="3.2" y="8.6" width="17.6" height="6.8" rx="3.4" transform="rotate(-45 12 12)" /><path d="M8.5 8.5l7 7" /></>);
export const IcWallet = ic(<><rect x="3" y="6" width="18" height="14" rx="2.5" /><path d="M3 10h18" /><path d="M15.5 15h2.5" /></>);
export const IcTag = ic(<><path d="M3 3h8l10 10-8 8L3 11z" /><circle cx="8" cy="8" r="1.4" fill="currentColor" /></>);
export const IcFlame = ic(<path d="M12 3s5.5 4.5 5.5 9.5a5.5 5.5 0 01-11 0C6.5 9 9 7.5 9 5c1.5 1 2 2.5 2 2.5S12 5 12 3z" />);
export const IcX = ic(<path d="M6 6l12 12M18 6L6 18" />);
export const IcChevronR = ic(<path d="M9 5l7 7-7 7" />);
export const IcEdit = ic(<><path d="M4 20h4l11-11-4-4L4 16z" /><path d="M13 7l4 4" /></>);
export const IcTrash = ic(<><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13" /></>);
export const IcSun = ic(<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3" /></>);
export const IcMoon = ic(<path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" />);
export const IcText = ic(<><path d="M4 7V5h16v2" /><path d="M12 5v14" /><path d="M9 19h6" /></>);
export const IcEye = ic(<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>);
export const IcSpark = ic(<path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z" />);
export const IcArrowUp = ic(<path d="M12 19V5M6 11l6-6 6 6" />);
export const IcArrowDown = ic(<path d="M12 5v14M6 13l6 6 6-6" />);
export const IcCoffee = ic(<><path d="M5 8h11v7a4 4 0 01-4 4H9a4 4 0 01-4-4z" /><path d="M16 9h2a2.5 2.5 0 010 5h-2" /><path d="M8 4.5c0 .8.8.8.8 1.6M11.5 4.5c0 .8.8.8.8 1.6" /></>);

/* ------------------------------------------------------------------ */
/* System chrome                                                       */
/* ------------------------------------------------------------------ */

export function StatusBar({ t, time = "9:41", light }: { t: MTheme; time?: string; light?: boolean }) {
  const c = light ? "#fff" : t.ink;
  return (
    <div className="flex items-center justify-between px-5 pt-2.5 pb-1" style={{ color: c }}>
      <span className="text-[11px] font-semibold tracking-tight">{time}</span>
      <span className="flex items-center gap-1.5">
        <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor" aria-hidden>
          <rect x="0" y="6" width="2.4" height="4" rx="0.6" /><rect x="3.5" y="4" width="2.4" height="6" rx="0.6" /><rect x="7" y="2" width="2.4" height="8" rx="0.6" /><rect x="10.5" y="0" width="2.4" height="10" rx="0.6" opacity="0.4" />
        </svg>
        <svg width="13" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
          <path d="M7 9.6L5.6 8.2a2 2 0 012.8 0z" /><path d="M3.4 6a5.2 5.2 0 017.2 0L9.2 7.4a3.2 3.2 0 00-4.4 0z" opacity="0.85" /><path d="M1.2 3.8a8.4 8.4 0 0111.6 0l-1.4 1.4a6.4 6.4 0 00-8.8 0z" opacity="0.6" />
        </svg>
        <svg width="20" height="10" viewBox="0 0 22 11" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="13" height="7" rx="1.4" fill="currentColor" />
          <rect x="19.6" y="3.5" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

export function TabBar({ t, items }: { t: MTheme; items: { icon: ReactNode; label: string; active?: boolean }[] }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-stretch justify-around border-t px-1 pb-3.5 pt-2" style={{ background: t.surface, borderColor: t.border }}>
      {items.map((it) => (
        <div key={it.label} className="flex w-14 flex-col items-center gap-0.5" style={{ color: it.active ? t.primary : t.mute }}>
          {it.icon}
          <span className="text-[8.5px] font-semibold" style={it.active ? { color: t.primary } : undefined}>{it.label}</span>
          {it.active && <span className="mt-0.5 h-[3px] w-6 rounded-full" style={{ background: t.primary }} />}
        </div>
      ))}
    </div>
  );
}

export function FAB({ t, icon, bottom = 76 }: { t: MTheme; icon?: ReactNode; bottom?: number }) {
  return (
    <div
      className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg"
      style={{ bottom, background: t.primary, color: t.onPrimary, boxShadow: `0 10px 22px -8px ${t.primary}` }}
    >
      {icon ?? <IcPlus size={22} strokeWidth={2.2} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

export function MBtn({
  t,
  children,
  variant = "primary",
  className,
  small,
}: {
  t: MTheme;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "disabled";
  className?: string;
  small?: boolean;
}) {
  const base = cn("flex items-center justify-center gap-1.5 rounded-xl font-semibold", small ? "px-3 py-1.5 text-[10px]" : "w-full py-2.5 text-[11.5px]");
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: t.primary, color: t.onPrimary },
    secondary: { background: t.tint, color: t.primary },
    ghost: { background: "transparent", color: t.primary, border: `1px solid ${t.border}` },
    danger: { background: t.danger, color: "#fff" },
    disabled: { background: t.border, color: t.mute },
  };
  return (
    <div className={cn(base, className)} style={styles[variant]}>
      {children}
    </div>
  );
}

export function Chip({ t, active, children, small }: { t: MTheme; active?: boolean; children: ReactNode; small?: boolean }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap", small ? "px-2 py-0.5 text-[8.5px]" : "px-2.5 py-1 text-[9.5px]")}
      style={active ? { background: t.primary, color: t.onPrimary } : { background: t.surface, color: t.sub, border: `1px solid ${t.border}` }}
    >
      {children}
    </span>
  );
}

export function ProgressRing({ t, value, size = 64, stroke = 6, label, sub }: { t: MTheme; value: number; size?: number; stroke?: number; label?: string; sub?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={t.border} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={t.primary} strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={c * (1 - value)} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[13px] font-bold leading-none" style={{ color: t.ink }}>{label ?? `${Math.round(value * 100)}%`}</span>
        {sub && <span className="mt-0.5 text-[7px] font-medium" style={{ color: t.mute }}>{sub}</span>}
      </div>
    </div>
  );
}

export function BarMini({ t, value, color, h = 5 }: { t: MTheme; value: number; color?: string; h?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ background: t.border, height: h }}>
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, value * 100)}%`, background: color ?? t.primary }} />
    </div>
  );
}

export function Toggle({ t, on }: { t: MTheme; on?: boolean }) {
  return (
    <span className="inline-flex h-[18px] w-[32px] items-center rounded-full px-[2px]" style={{ background: on ? t.primary : t.border, justifyContent: on ? "flex-end" : "flex-start" }}>
      <span className="h-[14px] w-[14px] rounded-full bg-white shadow" />
    </span>
  );
}

export function MField({ t, label, value, state = "default", hint }: { t: MTheme; label: string; value?: string; state?: "default" | "focused" | "error"; hint?: string }) {
  const border = state === "error" ? t.danger : state === "focused" ? t.primary : t.border;
  return (
    <div>
      <p className="mb-1 text-[9px] font-semibold" style={{ color: t.sub }}>{label}</p>
      <div className="flex items-center justify-between rounded-lg border px-2.5 py-2" style={{ borderColor: border, background: t.surface, boxShadow: state === "focused" ? `0 0 0 2.5px ${t.primary}33` : undefined }}>
        <span className="text-[10.5px]" style={{ color: value ? t.ink : t.mute }}>{value ?? "—"}</span>
        {state === "focused" && <span className="h-3.5 w-px" style={{ background: t.primary }} />}
      </div>
      {state === "error" && <p className="mt-1 text-[8.5px] font-medium" style={{ color: t.danger }}>{hint ?? "This field is required"}</p>}
    </div>
  );
}

export function Card({ t, children, className, style }: { t: MTheme; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("rounded-2xl border p-3", className)} style={{ background: t.surface, borderColor: t.border, ...style }}>
      {children}
    </div>
  );
}
