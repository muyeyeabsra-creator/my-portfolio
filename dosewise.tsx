import {
  type MTheme, StatusBar, TabBar, MBtn, Chip, ProgressRing, BarMini, Card, MField, Toggle,
  IcHome, IcList, IcChart, IcGear, IcCheck, IcBack, IcPill, IcBell, IcClock, IcText, IcEye, IcMoon, IcChevronR, IcFlame,
} from "./atoms";

export const dw: MTheme = {
  appBg: "#F0F6F5", surface: "#FFFFFF", ink: "#14312E", sub: "#48625E", mute: "#8FA6A2",
  border: "#DCE8E6", primary: "#0B6E6B", onPrimary: "#EFF9F8", tint: "#DDEEEC",
  accent: "#FF7A59", onAccent: "#3A1508", success: "#177A50", warning: "#B97D14", danger: "#C03B2D",
};

const tabs = (active: string) => [
  { icon: <IcHome size={17} />, label: "Today", active: active === "today" },
  { icon: <IcList size={17} />, label: "Meds", active: active === "meds" },
  { icon: <IcChart size={17} />, label: "History", active: active === "history" },
  { icon: <IcGear size={17} />, label: "Settings", active: active === "settings" },
];

const Dose = ({ time, name, dose, state, tag }: { time: string; name: string; dose: string; state: "done" | "now" | "next"; tag?: string }) => (
  <div className="flex gap-2.5">
    <div className="flex w-10 flex-col items-center pt-2.5">
      <span className="text-[9.5px] font-bold" style={{ color: state === "next" ? dw.mute : dw.ink }}>{time}</span>
      <span className="mt-1.5 h-2.5 w-2.5 rounded-full border-2" style={state === "done" ? { background: dw.primary, borderColor: dw.primary } : state === "now" ? { background: dw.accent, borderColor: dw.accent } : { borderColor: dw.mute, background: dw.surface }} />
      <span className="mt-1 w-px flex-1" style={{ background: dw.border }} />
    </div>
    <Card t={dw} className="mb-2 flex-1" style={state === "now" ? { borderColor: dw.accent, boxShadow: `0 8px 20px -12px ${dw.accent}` } : undefined}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: state === "done" ? dw.tint : "#FFF0EB", color: state === "done" ? dw.primary : dw.accent }}>
          {state === "done" ? <IcCheck size={13} strokeWidth={2.6} /> : <IcPill size={13} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10.5px] font-bold" style={{ color: state === "next" ? dw.sub : dw.ink }}>{name}</p>
          <p className="text-[8.5px] font-medium" style={{ color: dw.mute }}>{dose}</p>
        </div>
        {state === "done" && <span className="text-[8.5px] font-bold" style={{ color: dw.success }}>Taken</span>}
      </div>
      {state === "now" && (
        <div className="mt-2 flex gap-1.5">
          <MBtn t={dw} small className="flex-1">Mark as taken</MBtn>
          <MBtn t={dw} small variant="ghost" className="flex-1">Snooze 10 min</MBtn>
        </div>
      )}
      {tag && <p className="mt-1.5 text-[8px] font-semibold" style={{ color: dw.warning }}>{tag}</p>}
    </Card>
  </div>
);

/* 01 — Today timeline ------------------------------------------------ */
export function DWToday() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: dw.appBg }}>
      <StatusBar t={dw} />
      <div className="flex items-center justify-between px-5 pt-3">
        <div>
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: dw.mute }}>Wed · 15 Mar</p>
          <h2 className="mt-0.5 text-[17px] font-extrabold" style={{ color: dw.ink }}>Your doses today</h2>
        </div>
        <ProgressRing t={dw} value={2 / 5} size={44} stroke={4.5} label="2/5" />
      </div>

      <div className="mt-2 px-5">
        <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: "#FDF3E3", borderColor: "#F0DDB8" }}>
          <IcBell size={13} className="shrink-0" strokeWidth={2.1} />
          <p className="flex-1 text-[8.5px] font-semibold leading-snug" style={{ color: dw.warning }}>Refill soon: Metformin 500 mg — 4 tablets left</p>
          <span className="text-[8.5px] font-extrabold underline" style={{ color: dw.ink }}>Order</span>
        </div>
      </div>

      <div className="mt-3 flex-1 overflow-hidden px-5 pb-20">
        <Dose time="08:00" name="Metformin 500 mg" dose="1 tablet · with breakfast" state="done" />
        <Dose time="08:00" name="Vitamin D 1000 IU" dose="1 capsule · with food" state="done" />
        <Dose time="13:00" name="Metformin 500 mg" dose="1 tablet · with lunch" state="now" tag="Due now — best taken with food" />
        <Dose time="20:00" name="Lisinopril 10 mg" dose="1 tablet · evening" state="next" />
        <Dose time="21:30" name="Magnesium 200 mg" dose="1 capsule · before bed" state="next" />
      </div>

      <TabBar t={dw} items={tabs("today")} />
    </div>
  );
}

/* 02 — Confirm dose (modal) ------------------------------------------- */
export function DWConfirm() {
  return (
    <div className="relative h-full" style={{ background: dw.appBg }}>
      <div className="absolute inset-0 opacity-95"><DWToday /></div>
      <div className="absolute inset-0" style={{ background: "#14312E73" }} />
      <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-[20px] p-4" style={{ background: dw.surface }}>
        <p className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: dw.mute }}>Dose reminder</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "#FFF0EB", color: dw.accent }}><IcPill size={24} /></span>
          <div>
            <h3 className="text-[15px] font-extrabold leading-tight" style={{ color: dw.ink }}>Metformin 500 mg</h3>
            <p className="text-[10px] font-semibold" style={{ color: dw.sub }}>1 tablet · with lunch</p>
          </div>
        </div>
        <div className="mt-3 rounded-xl px-3 py-2.5" style={{ background: dw.tint }}>
          <p className="text-[9.5px] font-semibold leading-relaxed" style={{ color: dw.primary }}>Take with food to reduce stomach upset. Next dose is at 20:00 — 7 hours apart.</p>
        </div>
        <div className="mt-3.5 space-y-2">
          <MBtn t={dw}><IcCheck size={14} strokeWidth={2.6} /> I took it</MBtn>
          <div className="grid grid-cols-2 gap-2">
            <MBtn t={dw} variant="ghost"><IcClock size={12} /> Snooze 10 min</MBtn>
            <MBtn t={dw} variant="ghost">Skip & log</MBtn>
          </div>
        </div>
        <p className="mt-3 text-center text-[8px] font-medium" style={{ color: dw.mute }}>Skipping is logged in History and never deleted silently.</p>
      </div>
    </div>
  );
}

/* 03 — Add medication (step 2 of 3) ------------------------------------- */
export function DWAddMed() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: dw.appBg }}>
      <StatusBar t={dw} />
      <div className="flex items-center justify-between px-4 pt-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: dw.border, background: dw.surface, color: dw.ink }}><IcBack size={15} /></span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.16em]" style={{ color: dw.mute }}>Add medicine · step 2 of 3</span>
        <span className="w-8" />
      </div>
      <div className="mx-5 mt-2 flex gap-1">
        <span className="h-1 flex-1 rounded-full" style={{ background: dw.primary }} />
        <span className="h-1 flex-1 rounded-full" style={{ background: dw.primary }} />
        <span className="h-1 flex-1 rounded-full" style={{ background: dw.border }} />
      </div>

      <div className="flex-1 space-y-3 overflow-hidden px-5 pt-3">
        <MField t={dw} label="Medicine name" value="Metformin" />
        <div>
          <p className="mb-1 text-[9px] font-semibold" style={{ color: dw.sub }}>Strength</p>
          <div className="flex gap-1.5">
            <Chip t={dw}>250 mg</Chip><Chip t={dw} active>500 mg</Chip><Chip t={dw}>850 mg</Chip><Chip t={dw}>Other</Chip>
          </div>
        </div>
        <div>
          <p className="mb-1 text-[9px] font-semibold" style={{ color: dw.sub }}>Form</p>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[9.5px] font-bold">
            <span className="rounded-lg border py-2" style={{ borderColor: dw.primary, background: dw.tint, color: dw.primary }}>Tablet</span>
            <span className="rounded-lg border py-2" style={{ borderColor: dw.border, background: dw.surface, color: dw.sub }}>Capsule</span>
            <span className="rounded-lg border py-2" style={{ borderColor: dw.border, background: dw.surface, color: dw.sub }}>Liquid</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <MField t={dw} label="How often" value="2× daily" />
          <MField t={dw} label="First dose" value="08:00" />
        </div>
        <div className="flex items-center justify-between rounded-xl border px-3 py-2.5" style={{ borderColor: dw.border, background: dw.surface }}>
          <div>
            <p className="text-[10px] font-bold" style={{ color: dw.ink }}>Refill reminders</p>
            <p className="text-[8.5px]" style={{ color: dw.mute }}>Warn when fewer than 7 left</p>
          </div>
          <Toggle t={dw} on />
        </div>
      </div>
      <div className="px-5 pb-6 pt-2"><MBtn t={dw}>Continue</MBtn></div>
    </div>
  );
}

/* 04 — Medicine detail --------------------------------------------------- */
export function DWMedDetail() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: dw.appBg }}>
      <StatusBar t={dw} />
      <div className="flex items-center justify-between px-4 pt-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: dw.border, background: dw.surface, color: dw.ink }}><IcBack size={15} /></span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.16em]" style={{ color: dw.mute }}>Medicine</span>
        <span className="w-8" />
      </div>

      <div className="px-5 pt-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: dw.tint, color: dw.primary }}><IcPill size={24} /></span>
          <div>
            <h2 className="text-[16px] font-extrabold leading-tight" style={{ color: dw.ink }}>Metformin 500 mg</h2>
            <p className="text-[9.5px] font-semibold" style={{ color: dw.sub }}>Tablet · 2× daily · prescribed by Dr. Okafor</p>
          </div>
        </div>
      </div>

      <Card t={dw} className="mx-5 mt-3">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px] font-bold" style={{ color: dw.ink }}>Supply</p>
          <span className="text-[9px] font-bold" style={{ color: dw.warning }}>4 of 60 left</span>
        </div>
        <div className="mt-2"><BarMini t={dw} value={4 / 60} color={dw.warning} h={7} /></div>
        <MBtn t={dw} small variant="secondary" className="mt-2.5 w-full">Request refill reminder</MBtn>
      </Card>

      <Card t={dw} className="mx-5 mt-2" style={{ background: "#FDF3E3", borderColor: "#F0DDB8" }}>
        <p className="text-[10px] font-extrabold" style={{ color: dw.warning }}>Good to know</p>
        <p className="mt-1 text-[9px] leading-relaxed" style={{ color: dw.sub }}>Take with food. Avoid heavy alcohol. This is general information — always follow your prescriber's advice.</p>
      </Card>

      <div className="px-5 pt-3">
        <p className="text-[10.5px] font-bold" style={{ color: dw.ink }}>Recent doses</p>
        <div className="mt-2 space-y-1.5">
          {[
            { d: "Today 08:00", s: "Taken on time", ok: true },
            { d: "Yesterday 20:00", s: "Taken 25 min late", ok: true },
            { d: "Yesterday 08:00", s: "Skipped", ok: false },
          ].map((r) => (
            <div key={r.d} className="flex items-center justify-between rounded-xl border px-3 py-2" style={{ borderColor: dw.border, background: dw.surface }}>
              <span className="text-[9.5px] font-semibold" style={{ color: dw.sub }}>{r.d}</span>
              <span className="flex items-center gap-1 text-[9px] font-bold" style={{ color: r.ok ? dw.success : dw.danger }}>
                {r.ok ? <IcCheck size={10} strokeWidth={3} /> : <IcClock size={10} />} {r.s}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto px-5 pb-6"><MBtn t={dw} variant="ghost">Edit medicine</MBtn></div>
    </div>
  );
}

/* 05 — History / adherence ------------------------------------------------- */
export function DWHistory() {
  const grid = Array.from({ length: 28 }, (_, i) => [3, 9, 16].includes(i) ? "miss" : "ok");
  return (
    <div className="relative flex h-full flex-col" style={{ background: dw.appBg }}>
      <StatusBar t={dw} />
      <h2 className="px-5 pt-3 text-[17px] font-extrabold" style={{ color: dw.ink }}>History</h2>
      <p className="px-5 pt-0.5 text-[9.5px]" style={{ color: dw.sub }}>Last 4 weeks · all medicines</p>

      <div className="mx-5 mt-3 flex gap-2">
        <Card t={dw} className="flex flex-1 items-center gap-2.5">
          <ProgressRing t={dw} value={0.92} size={52} stroke={5.5} label="92%" />
          <p className="text-[9px] font-semibold leading-snug" style={{ color: dw.sub }}>Doses taken<br />on time</p>
        </Card>
        <Card t={dw} className="flex-1">
          <p className="flex items-center gap-1 text-[9px] font-bold" style={{ color: dw.ink }}><IcFlame size={11} /> Streak</p>
          <p className="mt-1 text-[15px] font-extrabold" style={{ color: dw.primary }}>9 days</p>
          <p className="text-[8.5px]" style={{ color: dw.mute }}>no missed doses</p>
        </Card>
      </div>

      <Card t={dw} className="mx-5 mt-2">
        <p className="text-[10.5px] font-bold" style={{ color: dw.ink }}>February – March</p>
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {grid.map((g, i) => (
            <span key={i} className="aspect-square rounded-[5px]" style={{ background: g === "ok" ? dw.tint : "#FADBD4", border: g === "ok" ? "none" : `1px solid ${dw.danger}55` }} />
          ))}
        </div>
        <div className="mt-2 flex items-center gap-3 text-[8px] font-semibold" style={{ color: dw.mute }}>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: dw.tint }} /> Taken</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: "#FADBD4", border: `1px solid ${dw.danger}55` }} /> Missed / skipped</span>
        </div>
      </Card>

      <div className="px-5 pt-3">
        <p className="text-[10.5px] font-bold" style={{ color: dw.ink }}>Needs attention</p>
        <div className="mt-2 space-y-1.5 pb-20">
          <div className="rounded-xl border px-3 py-2" style={{ borderColor: dw.border, background: dw.surface }}>
            <p className="text-[9.5px] font-bold" style={{ color: dw.ink }}>Evening doses are missed most often</p>
            <p className="mt-0.5 text-[8.5px] leading-snug" style={{ color: dw.mute }}>3 of 4 misses happened after 20:00. Consider moving Lisinopril to 19:00.</p>
          </div>
        </div>
      </div>

      <TabBar t={dw} items={tabs("history")} />
    </div>
  );
}

/* 06 — Settings (accessibility first) --------------------------------------- */
export function DWSettings() {
  const Row = ({ icon, title, sub, on, right }: { icon: React.ReactNode; title: string; sub: string; on?: boolean; right?: string }) => (
    <div className="flex items-center gap-2.5 border-b py-2.5 last:border-0" style={{ borderColor: dw.border }}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: dw.tint, color: dw.primary }}>{icon}</span>
      <div className="flex-1">
        <p className="text-[10.5px] font-bold" style={{ color: dw.ink }}>{title}</p>
        <p className="text-[8.5px]" style={{ color: dw.mute }}>{sub}</p>
      </div>
      {right ? <span className="flex items-center gap-0.5 text-[9.5px] font-bold" style={{ color: dw.sub }}>{right}<IcChevronR size={11} /></span> : <Toggle t={dw} on={on} />}
    </div>
  );
  return (
    <div className="relative flex h-full flex-col" style={{ background: dw.appBg }}>
      <StatusBar t={dw} />
      <h2 className="px-5 pt-3 text-[17px] font-extrabold" style={{ color: dw.ink }}>Settings</h2>

      <div className="mt-2 flex-1 overflow-hidden px-5 pb-20">
        <Card t={dw}>
          <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em]" style={{ color: dw.primary }}>Reading & display</p>
          <Row icon={<IcText size={15} />} title="Larger text" sub="Everything scales up ~30%" on />
          <Row icon={<IcEye size={15} />} title="High contrast" sub="Stronger borders and labels" on />
          <Row icon={<IcMoon size={15} />} title="Dark theme" sub="Follows system" />
        </Card>

        <Card t={dw} className="mt-2">
          <p className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.14em]" style={{ color: dw.primary }}>Reminders</p>
          <Row icon={<IcBell size={15} />} title="Reminder sound" sub="Gentle chime · repeats twice" right="Chime" />
          <Row icon={<IcClock size={15} />} title="Auto-snooze" sub="Repeat after 10 min if ignored" on />
        </Card>

        <Card t={dw} className="mt-2" style={{ background: dw.tint, borderColor: dw.primary + "55" }}>
          <p className="text-[10px] font-extrabold" style={{ color: dw.primary }}>Share with a caregiver</p>
          <p className="mt-0.5 text-[8.5px] leading-snug" style={{ color: dw.sub }}>Weekly summary to one trusted contact. Nothing is shared by default.</p>
        </Card>
      </div>

      <TabBar t={dw} items={tabs("settings")} />
    </div>
  );
}
