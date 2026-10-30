import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export const PHONE_W = 280;
export const PHONE_H = 600;

/**
 * Android reference frame — 393×852 logical px scaled to 280×600 (~0.712).
 * Screens are authored as plain components that fill the inner area.
 */
export function PhoneFrame({
  children,
  className,
  tilt = true,
  bezel = "#17191d",
  caption,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  bezel?: string;
  caption?: string;
}) {
  return (
    <figure className={cn("inline-flex flex-col items-center", className)}>
      <div
        className={cn("relative rounded-[38px] p-[9px] shadow-phone", tilt && "phone-tilt")}
        style={{ background: bezel, width: PHONE_W + 18, height: PHONE_H + 18 }}
      >
        <div className="relative overflow-hidden rounded-[30px]" style={{ width: PHONE_W, height: PHONE_H }}>
          {children}
          {/* punch-hole camera */}
          <span className="pointer-events-none absolute left-1/2 top-2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-black/85 ring-1 ring-white/10" aria-hidden />
        </div>
        {/* side buttons */}
        <span className="absolute -right-[2.5px] top-28 h-14 w-[3px] rounded-full" style={{ background: bezel }} aria-hidden />
        <span className="absolute -right-[2.5px] top-48 h-9 w-[3px] rounded-full" style={{ background: bezel }} aria-hidden />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
