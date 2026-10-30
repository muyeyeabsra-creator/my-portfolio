import {
  type MTheme, StatusBar, TabBar, FAB, MBtn, Chip, ProgressRing, BarMini, Card, MField,
  IcHome, IcList, IcRepeat, IcChart, IcPlus, IcCheck, IcBack, IcMore, IcBell, IcClock, IcFlame, IcSpark, IcMoon, IcCoffee, IcSun,
} from "./atoms";

export const ff: MTheme = {
  appBg: "#F3F6F0", surface: "#FFFFFF", ink: "#1A2B22", sub: "#4E5F55", mute: "#93A29A",
  border: "#E2E8E0", primary: "#1B4D3E", onPrimary: "#F3F6F0", tint: "#E1EDE5",
  accent: "#C9F158", onAccent: "#1A2B22", success: "#2E7D5B", warning: "#C77E1D", danger: "#C4442A",
};

const tabs = (active: string) => [
  { icon: <IcHome size={17} />, label: "Today", active: active === "today" },
  { icon: <IcList size={17} />, label: "Tasks", active: active === "tasks" },
  { icon: <IcRepeat size={17} />, label: "Routines", active: active === "routines" },
  { icon: <IcChart size={17} />, label: "Stats", active: active === "stats" },
];

/* 01 — Today dashboard -------------------------------------------- */
export function FFToday() {
  const tasks = [
    { time: "09:00", title: "Review sprint notes", tag: "Work", done: true },
    { time: "10:30", title: "Deep work — wireframes", tag: "Design", done: true, now: true },
    { time: "13:00", title: "Lunch walk", tag: "Health", done: false },
    { time: "15:00", title: "Prepare client summary", tag: "Work", done: false },
    { time: "19:30", title: "Read 20 pages", tag: "Personal", done: false },
  ];
  return (
    <div className="relative flex h-full flex-col" style={{ background: ff.appBg }}>
      <StatusBar t={ff} />
      <div className="flex items-start justify-between px-5 pt-3">
        <div>
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: ff.mute }}>Tue · 14 Mar</p>
          <h2 className="mt-0.5 text-[17px] font-extrabold leading-tight" style={{ color: ff.ink }}>Good morning, Maya</h2>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: ff.accent, color: ff.onAccent }}>MK</div>
      </div>

      <Card t={ff} className="mx-5 mt-3 flex items-center gap-3" style={{ background: ff.primary, borderColor: ff.primary }}>
        <ProgressRing t={{ ...ff, border: "#ffffff2e", primary: "#C9F158" }} value={5 / 8} size={56} stroke={5.5} label="5/8" />
        <div className="flex-1">
          <p className="text-[11.5px] font-bold" style={{ color: "#fff" }}>You're halfway there</p>
          <p className="mt-0.5 text-[9px] leading-snug" style={{ color: "#ffffffb0" }}>3 tasks left · next one starts in 12 min</p>
          <div className="mt-1.5 h-[4px] w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full" style={{ width: "62%", background: ff.accent }} />
          </div>
        </div>
      </Card>

      <div className="mt-3.5 flex items-center justify-between px-5">
        <p className="text-[10.5px] font-bold" style={{ color: ff.ink }}>Up next</p>
        <span className="text-[9px] font-semibold" style={{ color: ff.primary }}>See all</span>
      </div>

      <div className="mt-1.5 flex-1 space-y-1.5 overflow-hidden px-5 pb-24">
        {tasks.map((tk) => (
          <div key={tk.title} className="flex items-center gap-2.5 rounded-xl border px-2.5 py-2" style={{ background: tk.now ? ff.tint : ff.surface, borderColor: tk.now ? ff.primary : ff.border }}>
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px]" style={tk.done ? { background: ff.primary, borderColor: ff.primary, color: ff.onPrimary } : { borderColor: ff.mute, color: "transparent" }}>
              <IcCheck size={10} strokeWidth={3} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10.5px] font-semibold" style={{ color: tk.done ? ff.mute : ff.ink, textDecoration: tk.done ? "line-through" : "none" }}>{tk.title}</p>
              <p className="mt-px flex items-center gap-1 text-[8.5px]" style={{ color: ff.mute }}><IcClock size={9} /> {tk.time}</p>
            </div>
            <Chip t={ff} small active={tk.tag === "Design"}>{tk.tag}</Chip>
          </div>
        ))}
      </div>

      <FAB t={ff} />
      <TabBar t={ff} items={tabs("today")} />
    </div>
  );
}

/* 02 — Add task (bottom sheet) ------------------------------------- */
export function FFAddTask() {
  return (
    <div className="relative h-full" style={{ background: ff.appBg }}>
      <div className="absolute inset-0 opacity-95"><FFToday /></div>
      <div className="absolute inset-0" style={{ background: "#1A2B2266" }} />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[22px] p-4 pb-5" style={{ background: ff.surface }}>
        <div className="mx-auto mb-3 h-1 w-9 rounded-full" style={{ background: ff.border }} />
        <div className="flex items-center justify-between">
          <h3 className="text-[13.5px] font-extrabold" style={{ color: ff.ink }}>New task</h3>
          <span className="text-[9.5px] font-bold" style={{ color: ff.mute }}>Discard</span>
        </div>
        <div className="mt-3 space-y-2.5">
          <MField t={ff} label="Task name" value="Prepare client summary" state="focused" />
          <MField t={ff} label="Notes (optional)" value="Include Q1 metrics and next steps…" />
          <div>
            <p className="mb-1 text-[9px] font-semibold" style={{ color: ff.sub }}>List</p>
            <div className="flex gap-1.5">
              <Chip t={ff} active>Work</Chip><Chip t={ff}>Personal</Chip><Chip t={ff}>Study</Chip><Chip t={ff}>Health</Chip>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <MField t={ff} label="Due date" value="Today" />
            <MField t={ff} label="Time" value="15:00" />
          </div>
          <div>
            <p className="mb-1 text-[9px] font-semibold" style={{ color: ff.sub }}>Priority</p>
            <div className="grid grid-cols-3 overflow-hidden rounded-lg border text-center text-[9.5px] font-bold" style={{ borderColor: ff.border }}>
              <span className="py-1.5" style={{ background: ff.danger, color: "#fff" }}>High</span>
              <span className="py-1.5" style={{ background: ff.tint, color: ff.primary }}>Medium</span>
              <span className="py-1.5" style={{ color: ff.sub }}>Low</span>
            </div>
          </div>
          <MBtn t={ff}>Add task</MBtn>
        </div>
      </div>
    </div>
  );
}

/* 03 — Task detail --------------------------------------------------- */
export function FFTaskDetail() {
  const sub = [
    { t: "Collect Q1 metrics", done: true },
    { t: "Draft summary outline", done: true },
    { t: "Add charts from analytics", done: false },
    { t: "Send for review", done: false },
  ];
  return (
    <div className="relative flex h-full flex-col" style={{ background: ff.appBg }}>
      <StatusBar t={ff} />
      <div className="flex items-center justify-between px-4 pt-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: ff.border, background: ff.surface, color: ff.ink }}><IcBack size={15} /></span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.16em]" style={{ color: ff.mute }}>Task detail</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: ff.border, background: ff.surface, color: ff.ink }}><IcMore size={15} /></span>
      </div>

      <div className="px-5 pt-3">
        <div className="flex items-center gap-1.5">
          <Chip t={ff} small active>Work</Chip><Chip t={ff} small>High priority</Chip>
        </div>
        <h2 className="mt-2 text-[16.5px] font-extrabold leading-snug" style={{ color: ff.ink }}>Prepare client summary</h2>
        <p className="mt-1 flex items-center gap-1.5 text-[9.5px] font-medium" style={{ color: ff.sub }}>
          <IcClock size={11} /> Today · 15:00 <span style={{ color: ff.border }}>|</span> <IcBell size={11} /> Remind 15 min before
        </p>
      </div>

      <Card t={ff} className="mx-5 mt-3">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px] font-bold" style={{ color: ff.ink }}>Subtasks</p>
          <span className="text-[9px] font-bold" style={{ color: ff.primary }}>2 of 4</span>
        </div>
        <div className="mt-2"><BarMini t={ff} value={0.5} /></div>
        <div className="mt-2.5 space-y-2">
          {sub.map((s) => (
            <div key={s.t} className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded border-[1.5px]" style={s.done ? { background: ff.primary, borderColor: ff.primary, color: ff.onPrimary } : { borderColor: ff.mute, color: "transparent" }}>
                <IcCheck size={9} strokeWidth={3.2} />
              </span>
              <span className="text-[10px] font-medium" style={{ color: s.done ? ff.mute : ff.ink, textDecoration: s.done ? "line-through" : "none" }}>{s.t}</span>
            </div>
          ))}
          <span className="text-[9.5px] font-bold" style={{ color: ff.primary }}>+ Add subtask</span>
        </div>
      </Card>

      <Card t={ff} className="mx-5 mt-2">
        <p className="text-[10.5px] font-bold" style={{ color: ff.ink }}>Notes</p>
        <p className="mt-1 text-[9.5px] leading-relaxed" style={{ color: ff.sub }}>Keep it under one page. Client cares about retention and onboarding drop-off the most.</p>
      </Card>

      <div className="mt-auto px-5 pb-6"><MBtn t={ff} variant="secondary">Mark as done</MBtn></div>
    </div>
  );
}

/* 04 — Routines tab --------------------------------------------------- */
export function FFRoutines() {
  const routines = [
    { icon: <IcSun size={15} />, name: "Morning kickoff", steps: "4 steps · 07:30", on: true, tint: "#FBF3D9" },
    { icon: <IcCoffee size={15} />, name: "Post-lunch reset", steps: "2 steps · 13:30", on: true, tint: "#F3E8DC" },
    { icon: <IcMoon size={15} />, name: "Evening wind-down", steps: "3 steps · 21:30", on: false, tint: "#E7E9F4" },
  ];
  return (
    <div className="relative flex h-full flex-col" style={{ background: ff.appBg }}>
      <StatusBar t={ff} />
      <div className="flex items-center justify-between px-5 pt-3">
        <h2 className="text-[17px] font-extrabold" style={{ color: ff.ink }}>Routines</h2>
        <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold" style={{ background: ff.accent, color: ff.onAccent }}><IcFlame size={11} /> 12-day streak</span>
      </div>
      <p className="px-5 pt-1 text-[9.5px]" style={{ color: ff.sub }}>Bundles of small steps that repeat every day.</p>

      <div className="mt-3 flex-1 space-y-2 overflow-hidden px-5 pb-24">
        {routines.map((r) => (
          <Card t={ff} key={r.name} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: r.tint, color: ff.ink }}>{r.icon}</span>
            <div className="flex-1">
              <p className="text-[11px] font-bold" style={{ color: ff.ink }}>{r.name}</p>
              <p className="text-[8.5px] font-medium" style={{ color: ff.mute }}>{r.steps}</p>
            </div>
            <span className="inline-flex h-[18px] w-[32px] items-center rounded-full px-[2px]" style={{ background: r.on ? ff.primary : ff.border, justifyContent: r.on ? "flex-end" : "flex-start" }}>
              <span className="h-[14px] w-[14px] rounded-full bg-white shadow" />
            </span>
          </Card>
        ))}

        <Card t={ff} style={{ background: ff.tint, borderColor: ff.primary + "55" }}>
          <p className="flex items-center gap-1 text-[10.5px] font-bold" style={{ color: ff.primary }}><IcSpark size={12} /> This week</p>
          <p className="mt-1 text-[9px] leading-relaxed" style={{ color: ff.sub }}>Morning kickoff completed 6 of 7 days. Best consistency on weekdays — consider skipping Sundays.</p>
          <div className="mt-2 flex gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="flex h-6 w-6 items-center justify-center rounded-md text-[8px] font-bold" style={i < 6 ? { background: ff.primary, color: ff.onPrimary } : { background: ff.surface, color: ff.mute, border: `1px solid ${ff.border}` }}>{d}</span>
            ))}
          </div>
        </Card>
      </div>

      <FAB t={ff} />
      <TabBar t={ff} items={tabs("routines")} />
    </div>
  );
}

/* 05 — Stats tab ------------------------------------------------------- */
export function FFStats() {
  const week = [0.6, 0.85, 0.45, 0.9, 0.7, 0.3, 0];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const cats = [
    { name: "Work", v: 0.62, c: ff.primary },
    { name: "Personal", v: 0.44, c: "#5B8C7B" },
    { name: "Health", v: 0.8, c: "#9BB845" },
  ];
  return (
    <div className="relative flex h-full flex-col" style={{ background: ff.appBg }}>
      <StatusBar t={ff} />
      <h2 className="px-5 pt-3 text-[17px] font-extrabold" style={{ color: ff.ink }}>Your week</h2>
      <p className="px-5 pt-0.5 text-[9.5px]" style={{ color: ff.sub }}>9–15 Mar · completion by day</p>

      <Card t={ff} className="mx-5 mt-3">
        <div className="flex h-24 items-end gap-2.5 px-1">
          {week.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-20 w-full items-end rounded-md" style={{ background: ff.tint }}>
                <div className="w-full rounded-md" style={{ height: `${Math.max(6, v * 100)}%`, background: i === 3 ? ff.accent : ff.primary, opacity: v === 0 ? 0 : 1 }} />
              </div>
              <span className="text-[8px] font-bold" style={{ color: i === 3 ? ff.ink : ff.mute }}>{days[i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border-t pt-2" style={{ borderColor: ff.border }}>
          <span className="text-[9px] font-semibold" style={{ color: ff.sub }}>34 tasks completed</span>
          <span className="flex items-center gap-1 text-[9px] font-bold" style={{ color: ff.success }}><IcCheck size={10} /> +18% vs last week</span>
        </div>
      </Card>

      <div className="mx-5 mt-2 flex gap-2">
        <Card t={ff} className="flex flex-1 items-center gap-2.5">
          <ProgressRing t={ff} value={0.78} size={48} stroke={5} label="78%" />
          <p className="text-[9px] font-semibold leading-snug" style={{ color: ff.sub }}>On-time<br />completion</p>
        </Card>
        <Card t={ff} className="flex-1">
          <p className="flex items-center gap-1 text-[9px] font-bold" style={{ color: ff.ink }}><IcFlame size={11} /> Best day</p>
          <p className="mt-1 text-[13px] font-extrabold" style={{ color: ff.primary }}>Thursday</p>
          <p className="text-[8.5px]" style={{ color: ff.mute }}>9 of 10 tasks done</p>
        </Card>
      </div>

      <div className="px-5 pt-3">
        <p className="text-[10.5px] font-bold" style={{ color: ff.ink }}>By list</p>
        <div className="mt-2 space-y-2">
          {cats.map((c) => (
            <div key={c.name}>
              <div className="mb-1 flex justify-between text-[9px] font-semibold">
                <span style={{ color: ff.sub }}>{c.name}</span><span style={{ color: ff.mute }}>{Math.round(c.v * 100)}%</span>
              </div>
              <BarMini t={ff} value={c.v} color={c.c} />
            </div>
          ))}
        </div>
      </div>

      <TabBar t={ff} items={tabs("stats")} />
    </div>
  );
}

/* 06 — Empty state ------------------------------------------------------ */
export function FFEmpty() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: ff.appBg }}>
      <StatusBar t={ff} />
      <div className="flex items-center justify-between px-5 pt-3">
        <div>
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: ff.mute }}>Sun · 19 Mar</p>
          <h2 className="mt-0.5 text-[17px] font-extrabold" style={{ color: ff.ink }}>A clear day</h2>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: ff.accent, color: ff.onAccent }}>MK</div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-24 text-center">
        <svg width="120" height="110" viewBox="0 0 120 110" fill="none" aria-hidden>
          <rect x="26" y="14" width="68" height="82" rx="10" fill="#fff" stroke={ff.border} strokeWidth="2" />
          <rect x="36" y="30" width="40" height="6" rx="3" fill={ff.tint} />
          <rect x="36" y="44" width="48" height="6" rx="3" fill={ff.tint} />
          <rect x="36" y="58" width="30" height="6" rx="3" fill={ff.tint} />
          <circle cx="88" cy="82" r="19" fill={ff.accent} />
          <path d="M88 74v16M80 82h16" stroke={ff.onAccent} strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="26" r="3" fill={ff.primary} opacity="0.35" />
          <circle cx="104" cy="20" r="2.4" fill={ff.primary} opacity="0.25" />
        </svg>
        <h3 className="mt-4 text-[13px] font-extrabold" style={{ color: ff.ink }}>Nothing planned for today</h3>
        <p className="mt-1.5 text-[9.5px] leading-relaxed" style={{ color: ff.sub }}>Enjoy the quiet — or get ahead of the week with one small task.</p>
        <div className="mt-4 w-full space-y-2">
          <MBtn t={ff}><IcPlus size={13} strokeWidth={2.4} /> Add your first task</MBtn>
          <MBtn t={ff} variant="ghost">Start from a routine</MBtn>
        </div>
      </div>

      <TabBar t={ff} items={tabs("today")} />
    </div>
  );
}
