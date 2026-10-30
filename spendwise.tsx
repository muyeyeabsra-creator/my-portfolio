import {
  type MTheme, StatusBar, TabBar, FAB, MBtn, Chip, ProgressRing, BarMini, Card,
  IcHome, IcChart, IcList, IcGear, IcBack, IcSearch, IcWallet, IcTag, IcCoffee, IcArrowDown, IcArrowUp, IcSpark, IcChevronR, IcCal,
} from "./atoms";

export const sw: MTheme = {
  appBg: "#F4F4F0", surface: "#FFFFFF", ink: "#1C2233", sub: "#545C70", mute: "#98A0B0",
  border: "#E3E4DE", primary: "#202E5C", onPrimary: "#F4F5FF", tint: "#E4E7F5",
  accent: "#F0A81C", onAccent: "#2A2005", success: "#2F7D55", warning: "#B97D14", danger: "#C03B2D",
};

const tabs = (active: string) => [
  { icon: <IcHome size={17} />, label: "Home", active: active === "home" },
  { icon: <IcChart size={17} />, label: "Insights", active: active === "insights" },
  { icon: <IcList size={17} />, label: "Budgets", active: active === "budgets" },
  { icon: <IcGear size={17} />, label: "Settings", active: active === "settings" },
];

const CatIcon = ({ name }: { name: string }) => {
  const map: Record<string, { icon: React.ReactNode; bg: string; fg: string }> = {
    Food: { icon: <IcCoffee size={13} />, bg: "#FBEFD9", fg: "#A66A00" },
    Transport: { icon: <IcArrowUp size={13} />, bg: "#E4E7F5", fg: "#202E5C" },
    Home: { icon: <IcHome size={13} />, bg: "#E1EDE5", fg: "#1B4D3E" },
    Fun: { icon: <IcSpark size={13} />, bg: "#FADFE7", fg: "#A62B52" },
    Salary: { icon: <IcWallet size={13} />, bg: "#E1EDE5", fg: "#2F7D55" },
  };
  const c = map[name] ?? map.Food;
  return <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: c.bg, color: c.fg }}>{c.icon}</span>;
};

const Txn = ({ name, cat, time, amount, plus }: { name: string; cat: string; time: string; amount: string; plus?: boolean }) => (
  <div className="flex items-center gap-2.5 py-1.5">
    <CatIcon name={cat} />
    <div className="min-w-0 flex-1">
      <p className="truncate text-[10.5px] font-bold" style={{ color: sw.ink }}>{name}</p>
      <p className="text-[8.5px] font-medium" style={{ color: sw.mute }}>{cat} · {time}</p>
    </div>
    <span className="text-[10.5px] font-extrabold" style={{ color: plus ? sw.success : sw.ink }}>{plus ? "+" : "−"}{amount}</span>
  </div>
);

/* 01 — Month overview ------------------------------------------------- */
export function SWOverview() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: sw.appBg }}>
      <StatusBar t={sw} />
      <div className="flex items-center justify-between px-5 pt-3">
        <h2 className="text-[17px] font-extrabold" style={{ color: sw.ink }}>March</h2>
        <span className="flex items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-bold" style={{ borderColor: sw.border, background: sw.surface, color: sw.sub }}><IcCal size={10} /> 2026 <IcChevronR size={9} /></span>
      </div>

      <div className="mx-5 mt-3 rounded-2xl p-3.5" style={{ background: sw.primary }}>
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#ffffff88" }}>Spent this month</p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-[22px] font-extrabold leading-none" style={{ color: "#fff" }}>€842.50</p>
          <p className="text-[9.5px] font-semibold" style={{ color: "#ffffffaa" }}>of €1,200 budget</p>
        </div>
        <div className="mt-2.5 h-[6px] w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full" style={{ width: "70%", background: sw.accent }} />
        </div>
        <div className="mt-2 flex justify-between text-[8.5px] font-bold">
          <span style={{ color: "#C9F158" }}>€357.50 left</span>
          <span style={{ color: "#ffffffaa" }}>17 days to go</span>
        </div>
      </div>

      <div className="mx-5 mt-2 grid grid-cols-3 gap-1.5">
        {[
          { c: "Food", v: 0.82 }, { c: "Transport", v: 0.45 }, { c: "Fun", v: 0.61 },
        ].map((b) => (
          <div key={b.c} className="rounded-xl border px-2 py-1.5" style={{ borderColor: sw.border, background: sw.surface }}>
            <p className="text-[8px] font-bold" style={{ color: sw.sub }}>{b.c}</p>
            <div className="mt-1"><BarMini t={sw} value={b.v} color={b.v > 0.75 ? sw.accent : sw.primary} h={4} /></div>
            <p className="mt-1 text-[8px] font-bold" style={{ color: b.v > 0.75 ? sw.warning : sw.mute }}>{Math.round(b.v * 100)}%</p>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-2.5 flex items-center justify-between">
        <p className="text-[10.5px] font-bold" style={{ color: sw.ink }}>Recent</p>
        <span className="text-[9px] font-semibold" style={{ color: sw.primary }}>See all</span>
      </div>
      <Card t={sw} className="mx-5 mt-1.5 pb-1.5">
        <Txn name="Supermarket" cat="Food" time="Today 12:40" amount="€38.20" />
        <div className="h-px" style={{ background: sw.border }} />
        <Txn name="Metro card top-up" cat="Transport" time="Today 08:15" amount="€10.00" />
        <div className="h-px" style={{ background: sw.border }} />
        <Txn name="Salary — March" cat="Salary" time="1 Mar" amount="€1,850" plus />
      </Card>

      <FAB t={sw} />
      <TabBar t={sw} items={tabs("home")} />
    </div>
  );
}

/* 02 — Add expense (sheet) ---------------------------------------------- */
export function SWAddExpense() {
  return (
    <div className="relative h-full" style={{ background: sw.appBg }}>
      <div className="absolute inset-0 opacity-95"><SWOverview /></div>
      <div className="absolute inset-0" style={{ background: "#1C223366" }} />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[22px] p-4 pb-5" style={{ background: sw.surface }}>
        <div className="mx-auto mb-3 h-1 w-9 rounded-full" style={{ background: sw.border }} />
        <div className="flex items-center justify-between">
          <h3 className="text-[13.5px] font-extrabold" style={{ color: sw.ink }}>Add expense</h3>
          <span className="text-[9.5px] font-bold" style={{ color: sw.mute }}>Cancel</span>
        </div>

        <div className="mt-3 rounded-xl border px-3 py-3 text-center" style={{ borderColor: sw.primary, background: sw.tint, boxShadow: `0 0 0 2.5px ${sw.primary}2e` }}>
          <p className="text-[8.5px] font-bold uppercase tracking-[0.14em]" style={{ color: sw.sub }}>Amount</p>
          <p className="mt-0.5 text-[24px] font-extrabold tracking-tight" style={{ color: sw.primary }}>€ 24.90<span className="blink text-accent">|</span></p>
        </div>

        <div className="mt-3">
          <p className="mb-1 text-[9px] font-semibold" style={{ color: sw.sub }}>Category</p>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { n: "Food", on: true }, { n: "Transport", on: false }, { n: "Home", on: false }, { n: "Fun", on: false },
            ].map((c) => (
              <div key={c.n} className="flex flex-col items-center gap-1 rounded-xl border py-2" style={c.on ? { borderColor: sw.primary, background: sw.tint } : { borderColor: sw.border, background: sw.surface }}>
                <CatIcon name={c.n} />
                <span className="text-[8px] font-bold" style={{ color: c.on ? sw.primary : sw.sub }}>{c.n}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-lg border px-2.5 py-2" style={{ borderColor: sw.border, background: sw.surface }}>
            <p className="text-[8px] font-bold" style={{ color: sw.mute }}>Note</p>
            <p className="text-[10px] font-semibold" style={{ color: sw.ink }}>Lunch with Sam</p>
          </div>
          <div className="rounded-lg border px-2.5 py-2" style={{ borderColor: sw.border, background: sw.surface }}>
            <p className="text-[8px] font-bold" style={{ color: sw.mute }}>Date</p>
            <p className="text-[10px] font-semibold" style={{ color: sw.ink }}>Today</p>
          </div>
        </div>

        <MBtn t={sw} className="mt-3">Save expense</MBtn>
      </div>
    </div>
  );
}

/* 03 — Transactions + search ----------------------------------------------- */
export function SWTransactions() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: sw.appBg }}>
      <StatusBar t={sw} />
      <div className="flex items-center gap-2 px-5 pt-3">
        <h2 className="flex-1 text-[17px] font-extrabold" style={{ color: sw.ink }}>Transactions</h2>
        <span className="text-[9.5px] font-bold" style={{ color: sw.primary }}>This month</span>
      </div>

      <div className="px-5 pt-2.5">
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5" style={{ borderColor: sw.primary, boxShadow: `0 0 0 2.5px ${sw.primary}2e` }}>
          <IcSearch size={13} className="shrink-0" strokeWidth={2.2} />
          <span className="flex-1 text-[10.5px] font-semibold" style={{ color: sw.ink }}>supermarket</span>
          <span className="h-3.5 w-px" style={{ background: sw.primary }} />
        </div>
        <div className="mt-2 flex gap-1.5 overflow-hidden">
          <Chip t={sw} active small>All</Chip><Chip t={sw} small>Food</Chip><Chip t={sw} small>Transport</Chip><Chip t={sw} small>Home</Chip><Chip t={sw} small>Fun</Chip>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-hidden px-5 pb-20">
        <p className="text-[8.5px] font-extrabold uppercase tracking-[0.14em]" style={{ color: sw.mute }}>Today</p>
        <Card t={sw} className="mt-1 pb-1.5">
          <Txn name="Supermarket — fresh week" cat="Food" time="12:40" amount="€38.20" />
          <div className="h-px" style={{ background: sw.border }} />
          <Txn name="Supermarket — snacks" cat="Food" time="Yesterday" amount="€6.10" />
        </Card>
        <p className="mt-2.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em]" style={{ color: sw.mute }}>This week</p>
        <Card t={sw} className="mt-1 pb-1.5">
          <Txn name="Supermarket" cat="Food" time="Mon" amount="€52.75" />
          <div className="h-px" style={{ background: sw.border }} />
          <Txn name="Corner shop" cat="Food" time="Sun" amount="€9.40" />
        </Card>
        <p className="mt-2 text-center text-[8.5px] font-semibold" style={{ color: sw.mute }}>4 results for “supermarket” · total €106.45</p>
      </div>

      <FAB t={sw} />
      <TabBar t={sw} items={tabs("home")} />
    </div>
  );
}

/* 04 — Budget detail ------------------------------------------------------------ */
export function SWBudgetDetail() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: sw.appBg }}>
      <StatusBar t={sw} />
      <div className="flex items-center justify-between px-4 pt-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ borderColor: sw.border, background: sw.surface, color: sw.ink }}><IcBack size={15} /></span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.16em]" style={{ color: sw.mute }}>Budget · March</span>
        <span className="w-8" />
      </div>

      <div className="px-5 pt-3">
        <div className="flex items-center gap-3">
          <CatIcon name="Food" />
          <div>
            <h2 className="text-[16px] font-extrabold leading-tight" style={{ color: sw.ink }}>Food & groceries</h2>
            <p className="text-[9.5px] font-semibold" style={{ color: sw.sub }}>€369 of €450 used</p>
          </div>
        </div>
      </div>

      <Card t={sw} className="mx-5 mt-3 flex items-center gap-3.5">
        <ProgressRing t={{ ...sw, primary: sw.accent }} value={0.82} size={62} stroke={6.5} label="82%" />
        <div className="flex-1">
          <p className="text-[10px] font-extrabold" style={{ color: sw.warning }}>Getting close</p>
          <p className="mt-0.5 text-[9px] leading-relaxed" style={{ color: sw.sub }}>€81 left for 17 days — about €4.75 per day to stay on plan.</p>
        </div>
      </Card>

      <div className="px-5 pt-3">
        <p className="text-[10.5px] font-bold" style={{ color: sw.ink }}>Where it went</p>
      </div>
      <Card t={sw} className="mx-5 mt-1.5 pb-1.5">
        <Txn name="Supermarket" cat="Food" time="Today" amount="€38.20" />
        <div className="h-px" style={{ background: sw.border }} />
        <Txn name="Supermarket" cat="Food" time="Mon" amount="€52.75" />
        <div className="h-px" style={{ background: sw.border }} />
        <Txn name="Corner shop" cat="Food" time="Sun" amount="€9.40" />
      </Card>

      <div className="mx-5 mt-2 rounded-xl px-3 py-2.5" style={{ background: sw.tint }}>
        <p className="flex items-center gap-1 text-[9.5px] font-extrabold" style={{ color: sw.primary }}><IcSpark size={11} /> Pattern spotted</p>
        <p className="mt-0.5 text-[8.5px] leading-relaxed" style={{ color: sw.sub }}>Big shops on Mondays cover ~60% of this budget. Two smaller trips could smooth the curve.</p>
      </div>

      <div className="mt-auto px-5 pb-6"><MBtn t={sw} variant="ghost">Edit budget</MBtn></div>
    </div>
  );
}

/* 05 — Insights ------------------------------------------------------------------- */
export function SWInsights() {
  const months = [
    { m: "Nov", v: 0.78 }, { m: "Dec", v: 1.0 }, { m: "Jan", v: 0.86 }, { m: "Feb", v: 0.7 }, { m: "Mar", v: 0.62, now: true },
  ];
  const cats = [
    { n: "Food & groceries", v: 0.82, a: "€369" },
    { n: "Rent & bills", v: 0.95, a: "€310" },
    { n: "Fun & eating out", v: 0.54, a: "€96" },
    { n: "Transport", v: 0.4, a: "€67.50" },
  ];
  return (
    <div className="relative flex h-full flex-col" style={{ background: sw.appBg }}>
      <StatusBar t={sw} />
      <h2 className="px-5 pt-3 text-[17px] font-extrabold" style={{ color: sw.ink }}>Insights</h2>
      <p className="px-5 pt-0.5 text-[9.5px]" style={{ color: sw.sub }}>Spending patterns, plain and simple</p>

      <Card t={sw} className="mx-5 mt-3">
        <p className="text-[10px] font-bold" style={{ color: sw.ink }}>Last 5 months</p>
        <div className="mt-2 flex h-20 items-end gap-2.5 px-1">
          {months.map((m) => (
            <div key={m.m} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-16 w-full items-end rounded-md" style={{ background: sw.tint }}>
                <div className="w-full rounded-md" style={{ height: `${m.v * 100}%`, background: m.now ? sw.accent : sw.primary }} />
              </div>
              <span className="text-[8px] font-bold" style={{ color: m.now ? sw.ink : sw.mute }}>{m.m}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 border-t pt-2" style={{ borderColor: sw.border }}>
          <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ background: "#E1EDE5", color: sw.success }}><IcArrowDown size={9} strokeWidth={2.6} /></span>
          <span className="text-[9px] font-semibold" style={{ color: sw.sub }}>12% less than February — best month this year</span>
        </div>
      </Card>

      <div className="px-5 pt-3">
        <p className="text-[10.5px] font-bold" style={{ color: sw.ink }}>Top categories · March</p>
        <div className="mt-2 space-y-2.5">
          {cats.map((c) => (
            <div key={c.n}>
              <div className="mb-1 flex justify-between text-[9px] font-semibold">
                <span style={{ color: sw.sub }}>{c.n}</span><span className="font-extrabold" style={{ color: sw.ink }}>{c.a}</span>
              </div>
              <BarMini t={sw} value={c.v} color={c.v > 0.9 ? sw.accent : sw.primary} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-3 rounded-xl px-3 py-2.5" style={{ background: sw.primary }}>
        <p className="text-[9.5px] font-extrabold" style={{ color: "#fff" }}>Keep it up</p>
        <p className="mt-0.5 text-[8.5px] leading-relaxed" style={{ color: "#ffffffb3" }}>Transport is down 18% since you started biking on Tuesdays.</p>
      </div>

      <TabBar t={sw} items={tabs("insights")} />
    </div>
  );
}

/* 06 — Search empty state ------------------------------------------------------------- */
export function SWSearchEmpty() {
  return (
    <div className="relative flex h-full flex-col" style={{ background: sw.appBg }}>
      <StatusBar t={sw} />
      <div className="px-5 pt-3">
        <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5" style={{ borderColor: sw.border }}>
          <IcSearch size={13} strokeWidth={2.2} className="shrink-0" />
          <span className="flex-1 text-[10.5px] font-semibold" style={{ color: sw.ink }}>concert tickets</span>
          <span className="text-[9px] font-bold" style={{ color: sw.primary }}>Clear</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-24 text-center">
        <svg width="110" height="100" viewBox="0 0 110 100" fill="none" aria-hidden>
          <circle cx="50" cy="44" r="26" fill="#fff" stroke={sw.border} strokeWidth="2" />
          <path d="M69 63l16 16" stroke={sw.primary} strokeWidth="5" strokeLinecap="round" />
          <path d="M42 40h16M42 48h10" stroke={sw.tint} strokeWidth="5" strokeLinecap="round" />
          <circle cx="94" cy="22" r="3" fill={sw.accent} />
          <circle cx="14" cy="70" r="2.5" fill={sw.primary} opacity="0.3" />
        </svg>
        <h3 className="mt-4 text-[13px] font-extrabold" style={{ color: sw.ink }}>No matching transactions</h3>
        <p className="mt-1.5 text-[9.5px] leading-relaxed" style={{ color: sw.sub }}>Nothing in March matches “concert tickets”. Try a category, or search older months.</p>
        <div className="mt-4 flex gap-1.5">
          <Chip t={sw} small>Fun</Chip><Chip t={sw} small>February</Chip><Chip t={sw} small>“tickets”</Chip>
        </div>
        <div className="mt-4 w-full rounded-xl border px-3 py-2.5 text-left" style={{ borderColor: sw.border, background: sw.surface }}>
          <p className="flex items-center gap-1 text-[9px] font-extrabold" style={{ color: sw.primary }}><IcTag size={10} /> Tip</p>
          <p className="mt-0.5 text-[8.5px] leading-relaxed" style={{ color: sw.sub }}>Tag one-off costs like events to find them again in seconds.</p>
        </div>
      </div>

      <TabBar t={sw} items={tabs("home")} />
    </div>
  );
}
