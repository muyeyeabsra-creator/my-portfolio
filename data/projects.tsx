import type { ComponentType } from "react";
import type { MTheme } from "@/screens/atoms";
import type { FlowNode, IANode, JourneyRow } from "@/components/diagrams";
import { WBar, WBox, WList } from "@/components/diagrams";
import { ff, FFToday, FFRoutines, FFStats } from "@/screens/focusflow";
import { dw, DWToday, DWConfirm, DWHistory } from "@/screens/dosewise";
import { sw, SWOverview, SWAddExpense, SWInsights } from "@/screens/spendwise";

export interface ScreenEntry {
  key: string;
  name: string;
  purpose: string;
  notes: string[];
}

export interface Project {
  id: string;
  index: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  role: string;
  timeline: string;
  platform: string;
  tools: string;
  theme: MTheme;
  heroScreen: ComponentType;
  cluster: ComponentType[];
  screens: ScreenEntry[];
  problem: { statement: string; audience: string[]; goal: string; solution: string };
  userNeeds: string[];
  persona: { name: string; meta: string; quote: string; goals: string[]; pains: string[]; tech: string };
  assumptions: string[];
  researchQuestions: string[];
  researchMethod: string;
  journey: { stages: string[]; rows: JourneyRow[] };
  ia: IANode[];
  flow: FlowNode[];
  flowNote: string;
  wireframes: { caption: string; body: React.ReactNode }[];
  colors: { name: string; hex: string; usage: string }[];
  typeScale: { name: string; px: number; weight: number; lh: number; sample: string }[];
  decisions: { decision: string; rationale: string }[];
  prototype: { trigger: string; action: string; destination: string; motion: string }[];
  accessibility: string[];
  testPlan: { intro: string; tasks: { task: string; success: string }[]; criteria: string[]; notes: string };
  challenges: { challenge: string; tradeoff: string }[];
  lessons: string[];
  nextSteps: string[];
}

/* ================================================================== */
/* 01 · FocusFlow                                                      */
/* ================================================================== */

const focusFlow: Project = {
  id: "focusflow",
  index: "01",
  name: "FocusFlow",
  kind: "Productivity · Android",
  tagline: "One calm plan for the day — capture in seconds, finish what matters.",
  summary:
    "FocusFlow is a concept Android app that turns scattered tasks and daily routines into one realistic daily plan. The case study covers the full junior workflow: problem framing, assumptions, IA, flows, wireframes, a token-based design system, six high-fidelity screens, and a usability-test plan.",
  role: "Solo designer (concept project) — research plan, IA, flows, wireframes, visual design, prototype spec",
  timeline: "3-week self-directed concept · ~40 hours",
  platform: "Android phone · 393×852 dp reference · Material patterns",
  tools: "AI-assisted drafting (Arena.ai) · Figma for final production · pen & paper sketching",
  theme: ff,
  heroScreen: FFToday,
  cluster: [FFToday, FFRoutines, FFStats],
  screens: [
    { key: "ff-today", name: "Today — dashboard", purpose: "See the whole day at a glance and know exactly what to do next.", notes: ["Progress card answers “how is my day going?” in one glance", "“Up next” list is time-ordered; current task is tinted, not buried", "FAB sits in the thumb zone — capture is always one reach away", "TalkBack reads progress card first, then tasks in order"] },
    { key: "ff-add", name: "New task — bottom sheet", purpose: "Capture a task in under 10 seconds without losing context.", notes: ["Sheet keeps the day visible underneath — no disorienting page jump", "Only “Task name” is required; everything else has sensible defaults", "Focused field shows a visible ring + cursor, error shows inline text", "Keyboard pushes the sheet up; CTA stays reachable"] },
    { key: "ff-detail", name: "Task detail", purpose: "Break one task into subtasks and keep its context in one place.", notes: ["Subtask progress bar makes partial progress feel real", "Reminder row states *when*, not just that a reminder exists", "“Mark as done” is secondary here — completion mostly happens from the list"] },
    { key: "ff-routines", name: "Routines", purpose: "Repeat small bundles of steps daily without re-planning them.", notes: ["Routines are toggles, not tasks — turning one off never creates guilt clutter", "Weekly strip shows consistency, not streak-shaming (one miss ≠ zero)", "Streak chip is informational and can be hidden in settings (planned)"] },
    { key: "ff-stats", name: "Weekly stats", purpose: "Spot patterns (best days, weak lists) — not to gamify.", notes: ["Comparison is vs. your own last week, never vs. other users", "“Best day” invites schedule changes, e.g. heavy tasks on Thursdays", "Zero-height bar on Sunday is honest — empty, not hidden"] },
    { key: "ff-empty", name: "Empty state", purpose: "Make “nothing planned” feel fine, and offer two obvious ways forward.", notes: ["Copy normalizes rest — an empty day is not a failure state", "Two CTAs cover both mindsets: start fresh / reuse a routine", "Illustration is decorative and hidden from TalkBack (labelled null)"] },
  ],
  problem: {
    statement:
      "Students and early-career remote workers keep tasks in 3–4 places (chat messages, notes, calendar, memory). Existing to-do apps either become overwhelming lists or feel like games, and — by assumption — many are abandoned within a couple of weeks. The result is not “low productivity” but low trust in any single plan.",
    audience: ["Adults 18–30, students or remote/hybrid workers", "Android-first, mid-range devices common", "Light-to-moderate task load (5–15 items/day), not power users"],
    goal: "Help the user build one realistic daily plan they actually trust — captured fast, reviewed honestly.",
    solution:
      "A daily-first task app: one Today screen with a progress summary, a bottom-sheet capture that takes seconds, routines for repeating behaviour, and weekly stats that reveal patterns instead of scoring points.",
  },
  userNeeds: [
    "Capture a task in seconds, the moment it comes to mind",
    "See one trustworthy plan for today — not an endless backlog",
    "Know what to do next without re-prioritising every time",
    "Repeat healthy routines without re-planning them daily",
    "Review the week honestly, without feeling judged by the app",
  ],
  persona: {
    name: "Maya K. — 24, remote marketing assistant",
    meta: "Hypothetical persona · assumption-based, to be validated",
    quote: "“I write tasks everywhere and then none of the lists feel true.”",
    goals: ["See one trustworthy plan each morning", "Capture tasks the moment they appear", "Protect evenings from work spillover"],
    pains: ["Overlong lists she stops opening", "Apps that nag but don't help prioritize", "Losing tasks between chat, notes and calendar"],
    tech: "Android mid-range phone · heavy chat-app user · low patience for setup",
  },
  assumptions: [
    "Users abandon to-do apps because lists grow faster than they can be processed — not because they forget the app exists.",
    "Capture friction above ~10 seconds pushes people back to chat/notes apps.",
    "A single daily view feels more manageable than an infinite backlog view.",
    "Streak-style gamification can backfire for anxious users; patterns beat points.",
    "Routines (repeating bundles) cover ~30% of daily tasks and deserve a first-class home.",
  ],
  researchQuestions: [
    "Where do target users currently capture tasks, and what breaks in that chain?",
    "How many items per day still feel like a “winnable” plan?",
    "Do users notice and use the bottom-sheet capture within their first session?",
    "Does weekly pattern feedback change how people schedule hard tasks?",
  ],
  researchMethod:
    "Lightweight junior-appropriate plan: 5 moderated remote usability sessions (video call, think-aloud) on the clickable prototype, plus a short 6-question screener survey to check the persona assumptions. No interviews are claimed as completed — everything on this page is a plan until it is run.",
  journey: {
    stages: ["Capture", "Organize", "Do", "Review"],
    rows: [
      { label: "Doing", cells: ["Types a task into the sheet between meetings", "Assigns list, time and priority in two taps", "Works top-down through “Up next”, ticks off tasks", "Checks weekly stats on Sunday evening"] },
      { label: "Thinking", cells: ["“I must not lose this”", "“Will future-me understand this title?”", "“What's actually next?”", "“Was this week better than the last?”"] },
      { label: "Feeling", tone: "feeling", cells: ["+ Relieved — captured fast", "− Mild friction if priority choice feels heavy", "+ In control — one thing at a time", "+ Calm — patterns, not guilt"] },
      { label: "Opportunity", cells: ["Default list + time make two fields disappear", "Inline “smart title” hint (planned, unvalidated)", "Tint the current task; keep completion one-tap", "Suggest moving heavy tasks to user's best day"] },
    ],
  },
  ia: [
    { label: "Today", note: "start destination", children: [ { label: "New task (bottom sheet)" }, { label: "Task detail", note: "from any list row" } ] },
    { label: "Tasks", note: "all lists & backlog", children: [{ label: "List filters" }, { label: "Task detail" }] },
    { label: "Routines", children: [{ label: "Routine detail / steps" }, { label: "New routine" }] },
    { label: "Stats", children: [{ label: "Week picker" }] },
    { label: "Settings", note: "via avatar", children: [{ label: "Notifications" }, { label: "Appearance & text size" }] },
  ],
  flow: [
    { label: "Open app", kind: "start" },
    { label: "Today dashboard", kind: "screen" },
    { label: "Tap +", kind: "action" },
    { label: "New task sheet", kind: "screen" },
    { label: "Enter details", kind: "action" },
    { label: "Title valid?", kind: "decision", note: "No → inline error, focus stays in field" },
    { label: "Save task", kind: "action" },
    { label: "List updates + toast", kind: "screen" },
    { label: "Mark complete", kind: "action" },
    { label: "Progress updates", kind: "end" },
  ],
  flowNote:
    "Dead ends are designed out: cancelling the sheet returns to the unchanged list; an empty title never navigates away; saving while offline queues locally and syncs later (spec). Every screen has exactly one way forward and one obvious way back.",
  wireframes: [
    {
      caption: "Today · lo-fi",
      body: (
        <>
          <div className="flex items-center justify-between"><WBar w="35%" h={12} tone="#AEB4A8" /><span className="h-8 w-8 rounded-full bg-[#D5D9D0]" /></div>
          <WBox h={76} tone="#E4E6E0" />
          <div className="mt-3"><WBar w="28%" h={8} /></div>
          <div className="mt-2"><WList n={5} /></div>
          <div className="mt-auto flex items-center justify-around border-t border-[#D5D9D0] pt-2 pb-1">{[0, 1, 2, 3].map((i) => <span key={i} className="h-5 w-5 rounded-md bg-[#C7CCC2]" />)}</div>
        </>
      ),
    },
    {
      caption: "Add task · lo-fi",
      body: (
        <>
          <WBox h={330} tone="#EDEFEA" dashed />
          <div className="mt-3 space-y-2.5">
            <WBar w="30%" h={7} /><WBox h={30} tone="#E4E6E0" />
            <div className="flex gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-6 w-14 rounded-full bg-[#D5D9D0]" />)}</div>
            <div className="flex gap-2"><WBox h={28} tone="#E4E6E0" /><WBox h={28} tone="#E4E6E0" /></div>
            <WBox h={34} tone="#AEB4A8" />
          </div>
        </>
      ),
    },
    {
      caption: "Stats · lo-fi",
      body: (
        <>
          <WBar w="40%" h={12} tone="#AEB4A8" />
          <WBox h={130} tone="#EDEFEA">
            <div className="flex h-20 items-end gap-2 px-6">{[40, 70, 35, 85, 60, 20, 0].map((h, i) => <span key={i} className="w-4 rounded-t bg-[#C7CCC2]" style={{ height: `${Math.max(6, h)}%` }} />)}</div>
          </WBox>
          <div className="mt-3 flex gap-2"><WBox h={64} tone="#E4E6E0" /><WBox h={64} tone="#E4E6E0" /></div>
          <div className="mt-3 space-y-2"><WBar w="90%" h={6} /><WBar w="70%" h={6} /><WBar w="80%" h={6} /></div>
        </>
      ),
    },
  ],
  colors: [
    { name: "Primary · Forest", hex: "#1B4D3E", usage: "CTAs, active states, brand surfaces" },
    { name: "Accent · Lime", hex: "#C9F158", usage: "Progress fill, highlights, avatar" },
    { name: "Background", hex: "#F3F6F0", usage: "Screen canvas — green-tinted, never pure white" },
    { name: "Surface", hex: "#FFFFFF", usage: "Cards and sheets" },
    { name: "Text · Ink", hex: "#1A2B22", usage: "Headlines and body (13.9:1 on canvas)" },
    { name: "Text · Sub", hex: "#4E5F55", usage: "Secondary labels (7:1)" },
    { name: "Success", hex: "#2E7D5B", usage: "Completed, positive deltas" },
    { name: "Warning / Danger", hex: "#C77E1D / #C4442A", usage: "Overdue · destructive or invalid" },
  ],
  typeScale: [
    { name: "Display", px: 24, weight: 800, lh: 1.15, sample: "Good morning, Maya" },
    { name: "Title", px: 17, weight: 800, lh: 1.2, sample: "Up next" },
    { name: "Label", px: 13, weight: 700, lh: 1.3, sample: "Deep work — wireframes" },
    { name: "Body", px: 12, weight: 500, lh: 1.5, sample: "3 tasks left · next one starts in 12 min" },
    { name: "Caption", px: 10, weight: 600, lh: 1.35, sample: "TUE · 14 MAR" },
  ],
  decisions: [
    { decision: "Bottom sheet instead of a full “new task” screen", rationale: "Keeps the day visible (orientation), shortens the path, and matches Material guidance for quick-create actions." },
    { decision: "One FAB, four tabs, no fifth “more” tab", rationale: "Every primary action must be reachable in ≤2 gestures; extra tabs dilute the mental model for a light-load user." },
    { decision: "Progress summary at the top, not a motivational quote", rationale: "The first question on open is “how is my day going?” — answer it with data the user generated, not decoration." },
    { decision: "Weekly stats compare you to your own last week only", rationale: "Social comparison is a known demotivator for habit apps; self-comparison supports the review stage of the journey." },
    { decision: "Empty state written as permission to rest", rationale: "A productivity app that shames empty days loses trust — tone is part of the UX." },
  ],
  prototype: [
    { trigger: "Tap FAB (+)", action: "Open New task", destination: "Today → sheet", motion: "Sheet slides up 250 ms, scrim fades" },
    { trigger: "Tap checkbox", action: "Complete task", destination: "Same screen", motion: "Check draws 150 ms; row strikes through, moves to “Done” after 1 s" },
    { trigger: "Tap task row", action: "Open detail", destination: "Task detail", motion: "Shared-element title, 200 ms ease-out" },
    { trigger: "Save with empty title", action: "Validate", destination: "Stays on sheet", motion: "Field shakes 1×, inline error appears, focus kept" },
    { trigger: "Swipe row right", action: "Quick-complete", destination: "Same screen", motion: "Green reveal + haptic tick (spec)" },
    { trigger: "Toggle routine", action: "Pause routine", destination: "Same screen", motion: "Instant, with undo snackbar 5 s" },
  ],
  accessibility: [
    "All interactive targets ≥ 48×48 dp, including list checkboxes (hit area padded beyond the visual circle).",
    "Body text 12 sp minimum; key labels scale with system font size up to 200% without truncation.",
    "Contrast: ink on canvas 13.9:1, sub 7:1, lime accent used only with ink text (on-accent 11:1).",
    "Status is never colour-only: completed tasks combine strikethrough + filled check + text label.",
    "TalkBack: progress card announces “5 of 8 tasks complete”; decorative illustration labelled null.",
    "Motion: sheet transition and shake-on-error respect the system “remove animations” setting.",
  ],
  testPlan: {
    intro: "Planned 45-minute moderated remote sessions with 5 participants matching the persona. Nothing below has been run yet — results will replace this section honestly, including failures.",
    tasks: [
      { task: "Add a task called “Call dentist” for tomorrow at 10:00 in the Personal list.", success: "Completed in ≤20 s without help; no field missed" },
      { task: "Find out how much of today's plan is done.", success: "Answer given within 5 s of opening the app (points at progress card)" },
      { task: "Complete the 10:30 task from the Today list.", success: "One tap, no hesitation or mis-tap on the row" },
      { task: "Pause the Morning kickoff routine.", success: "Found via Routines tab without prompting; understands undo snackbar" },
      { task: "Say what went well last week using Stats.", success: "Mentions at least one pattern (best day or % delta)" },
    ],
    criteria: [
      "≥4 of 5 complete task 1 unaided in ≤20 s",
      "0 participants miss the progress-card answer (task 2)",
      "≥80% correct first-tap on checkbox, not row (task 3)",
      "Subjective: ≥4/5 rate “I know what to do next” 4+ on a 5-point scale",
    ],
    notes: "Observation template: per task — time, errors, prompts needed, verbatim quotes, sentiment (1–5). Findings will be logged with participant codes (P1–P5), never names.",
  },
  challenges: [
    { challenge: "Routines vs. tasks: two mental models in one app", tradeoff: "Kept them in separate tabs instead of merging into one list — slight duplication accepted to keep each model simple." },
    { challenge: "Priority selection adds friction to capture", tradeoff: "Defaulted to Medium so priority never blocks saving; High is one tap, Low almost never needed." },
    { challenge: "Stats can feel judgmental", tradeoff: "Removed a planned “score”; kept self-comparison bars. Less flashy, better aligned with the calm-plan goal." },
  ],
  lessons: [
    "Designing the empty state early forced me to define the product's tone — it should have been the first screen, not the last.",
    "Naming the assumption before designing the solution made it obvious which parts of the app are bets (smart titles, routine share-rate).",
    "A token-based system (one theme object) made reskinning and dark-mode exploration almost free.",
  ],
  nextSteps: [
    "Run the 5-session usability test and replace the plan section with real findings — including what broke.",
    "Prototype offline queue + sync behaviour and test the “saved while offline” copy.",
    "Explore a homescreen widget for the progress ring (Android glanceability).",
    "Dark theme: tokens are ready; contrast needs a verification pass.",
  ],
};

/* ================================================================== */
/* 02 · DoseWise                                                       */
/* ================================================================== */

const doseWise: Project = {
  id: "dosewise",
  index: "02",
  name: "DoseWise",
  kind: "Health utility · Android",
  tagline: "A medication reminder designed for the person who can least afford a confusing interface.",
  summary:
    "DoseWise is a concept medication-reminder app where accessibility is the product, not a checklist item: a single “today” timeline, an unmissable confirm loop, plain-language copy, and settings that scale the whole interface for older eyes. It demonstrates design for constrained, high-stakes moments.",
  role: "Solo designer (concept project) — accessibility-led UX, flows, UI system, prototype spec",
  timeline: "2-week self-directed concept · ~30 hours",
  platform: "Android phone · 393×852 dp reference · tested against WCAG 2.2 AA targets",
  tools: "AI-assisted drafting (Arena.ai) · Figma for final production · contrast calculator",
  theme: dw,
  heroScreen: DWToday,
  cluster: [DWToday, DWConfirm, DWHistory],
  screens: [
    { key: "dw-today", name: "Today — dose timeline", purpose: "One chronological answer to “what do I take, and when?”", notes: ["Timeline, not list: time-of-day is the spine of medication", "Due-now card is lifted with border + shadow, never colour alone", "Refill warning is a dismissible banner, not a modal interruption", "Progress ring shows taken/total at a glance"] },
    { key: "dw-confirm", name: "Confirm dose — modal", purpose: "Make logging a dose possible in one big, unmistakable action.", notes: ["“I took it” is the largest target on screen (full-width, 56 dp)", "Skip is visible and logged — honesty beats perfect-looking records", "Instructions repeat *how* to take it at the moment of taking", "Modal blocks the timeline on purpose: this action matters"] },
    { key: "dw-add", name: "Add medicine — step 2 of 3", purpose: "Capture a prescription accurately without a paper form in hand.", notes: ["Three short steps beat one long form — progress bar shows position", "Strength chips from common values; “Other” always available", "Refill reminders on by default (opt-out, because they're the point)"] },
    { key: "dw-med", name: "Medicine detail", purpose: "Everything about one medicine: supply, guidance, recent history.", notes: ["Supply bar turns amber early (at ~7 left) so refill isn't a surprise", "Guidance card disclaims: general info, prescriber wins", "Recent doses show late/skipped truthfully — no silent cleanup"] },
    { key: "dw-history", name: "History — adherence", purpose: "See the real pattern, and one actionable nudge from it.", notes: ["28-day grid: missed days are marked, not hidden", "“Needs attention” card turns data into one suggestion (move evening dose)", "Streak celebrates consistency without punishing a single miss"] },
    { key: "dw-settings", name: "Settings — access first", purpose: "Let the whole app grow larger and higher-contrast in two toggles.", notes: ["“Larger text” scales the entire UI ~30% — not just body copy", "Caregiver sharing is opt-in, one contact, weekly summary", "Dark theme follows system — no extra decision to make"] },
  ],
  problem: {
    statement:
      "Missing or doubling doses is a real safety issue, and the people most affected — older adults and multi-medication patients — are the least served by small-type, gesture-heavy reminder apps. Existing apps often assume sharp vision, steady hands, and confidence with English UI copy.",
    audience: ["Adults 50+ on 1–5 daily medications (primary)", "Adults of any age managing a household's medications", "Optional: one trusted caregiver receiving summaries"],
    goal: "Zero ambiguous moments: at dose time, the right action must be the easiest action.",
    solution:
      "A timeline-based day view with a loud confirm loop, plain-language copy at an 8th-grade reading level, 30%-larger UI mode, and truthful adherence history that suggests one change instead of shaming.",
  },
  userNeeds: [
    "Never have to guess “did I already take it?”",
    "One unmistakable action at dose time — big, labelled, obvious",
    "Know about low supply before it becomes a missed dose",
    "Read everything comfortably at my own font size",
    "Share with a caregiver only if I choose to",
  ],
  persona: {
    name: "Elias T. — 68, retired teacher",
    meta: "Hypothetical persona · assumption-based, to be validated",
    quote: "“The boxes are so small, and I can never tell if I already took the morning one.”",
    goals: ["Never double-dose or miss the evening pills", "Keep his doctor's schedule without memorizing it", "Feel independent — not monitored"],
    pains: ["Tiny text and faint grey icons", "Apps that assume he remembers what a glyph means", "Fear of getting it wrong with no way to check"],
    tech: "Android phone, 2 years old · font size already set large · no gestures beyond tap & scroll",
  },
  assumptions: [
    "“Did I already take it?” is the single most frequent anxiety at dose time.",
    "A confirm loop with explicit Skip produces more honest records than silent auto-logging.",
    "Users over 60 will adopt an app if the first screen answers today's question with zero scrolling.",
    "Caregiver features must be opt-in or they will block adoption (independence concern).",
    "Plain-language copy matters more than clinical completeness for adherence.",
  ],
  researchQuestions: [
    "Can participants with low tech confidence complete ‘mark a dose as taken’ in one attempt?",
    "Do users understand the difference between Snooze and Skip without explanation?",
    "At what text-scale setting does the layout still hold together (no truncation)?",
    "Does the refill warning arrive early enough to be useful in real life?",
  ],
  researchMethod:
    "Plan: 5 in-person or video sessions with participants 55+, task-based with think-aloud, devices at the participant's own font-size setting. Plus an expert review against WCAG 2.2 AA (contrast, target size, reflow). No findings are presented as validated yet.",
  journey: {
    stages: ["Prescribed", "Set up", "Daily loop", "Refill & review"],
    rows: [
      { label: "Doing", cells: ["Gets a new prescription at the pharmacy", "Enters medicine with the label in hand", "Hears reminder → opens → taps “I took it”", "Checks supply; sees adherence monthly"] },
      { label: "Thinking", cells: ["“How am I supposed to remember all this?”", "“Is this the right strength? I hope so.”", "“Did I take the morning one?”", "“Am I running out? Is it working?”"] },
      { label: "Feeling", tone: "feeling", cells: ["− Overwhelmed by the new routine", "− Uncertain at the form", "+ Relief — one big button, done", "+ Calm — the app counted for him"] },
      { label: "Opportunity", cells: ["Photo-scan of the label (planned, unvalidated)", "Common-strength chips reduce typing to zero", "Confirm loop answers the “did I?” question for free", "One plain suggestion beats a dashboard of charts"] },
    ],
  },
  ia: [
    { label: "Today", note: "start destination", children: [{ label: "Confirm dose (modal)" }, { label: "Medicine detail" }] },
    { label: "Meds", children: [{ label: "Medicine detail" }, { label: "Add medicine (3 steps)" }] },
    { label: "History", children: [{ label: "Month picker" }] },
    { label: "Settings", children: [{ label: "Display (text size, contrast, theme)" }, { label: "Reminders" }, { label: "Caregiver sharing" }] },
  ],
  flow: [
    { label: "Reminder fires", kind: "start" },
    { label: "Confirm modal", kind: "screen" },
    { label: "Choose", kind: "decision", note: "Snooze → re-fires in 10 min · Skip → logged" },
    { label: "“I took it”", kind: "action" },
    { label: "Log entry written", kind: "screen" },
    { label: "Timeline updates", kind: "screen" },
    { label: "Ring progress +1", kind: "end" },
  ],
  flowNote:
    "No dead ends by design: dismissing the modal without choosing equals Snooze (safe default — never assumes a dose was taken). Ignored reminders re-fire twice, then log “missed” — visible in History, never deleted. Edge case handled: two medicines at the same time queue as separate modals.",
  wireframes: [
    {
      caption: "Today · lo-fi",
      body: (
        <>
          <div className="flex items-center justify-between"><WBar w="42%" h={12} tone="#AEB4A8" /><span className="h-9 w-9 rounded-full bg-[#D5D9D0]" /></div>
          <WBox h={34} tone="#EDEFEA" dashed><WBar w="60%" h={6} /></WBox>
          <div className="mt-3 space-y-2">
            {[72, 72, 88, 72, 72].map((h, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex w-8 flex-col items-center"><WBar w="80%" h={6} /><span className="mt-1 h-2.5 w-2.5 rounded-full border-2 border-[#AEB4A8]" /><span className="mt-1 w-px flex-1 bg-[#D5D9D0]" /></div>
                <WBox h={h} tone={i === 2 ? "#DCDFD6" : "#EDEFEA"} />
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      caption: "Confirm · lo-fi",
      body: (
        <>
          <WBox h={300} tone="#F1F2EE" dashed />
          <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2"><span className="h-10 w-10 rounded-xl bg-[#E4E6E0]" /><div className="flex-1 space-y-1"><WBar w="55%" h={9} /><WBar w="35%" h={6} /></div></div>
            <div className="mt-2"><WBox h={26} tone="#EDEFEA" /></div>
            <div className="mt-2.5"><WBox h={36} tone="#AEB4A8" /></div>
            <div className="mt-2 flex gap-2"><WBox h={30} tone="#E4E6E0" /><WBox h={30} tone="#E4E6E0" /></div>
          </div>
        </>
      ),
    },
    {
      caption: "Add med · lo-fi",
      body: (
        <>
          <div className="flex items-center justify-between"><span className="h-8 w-8 rounded-full bg-[#D5D9D0]" /><WBar w="35%" h={8} /><span className="w-8" /></div>
          <div className="mt-2 flex gap-1"><span className="h-1.5 flex-1 rounded-full bg-[#AEB4A8]" /><span className="h-1.5 flex-1 rounded-full bg-[#AEB4A8]" /><span className="h-1.5 flex-1 rounded-full bg-[#E4E6E0]" /></div>
          <div className="mt-3 space-y-3">
            <WBar w="25%" h={7} /><WBox h={32} tone="#E4E6E0" />
            <div className="flex gap-2">{[0, 1, 2, 3].map((i) => <span key={i} className="h-7 w-14 rounded-full bg-[#D5D9D0]" />)}</div>
            <div className="flex gap-2"><WBox h={34} tone="#E4E6E0" /><WBox h={34} tone="#E4E6E0" /><WBox h={34} tone="#E4E6E0" /></div>
            <WBox h={40} tone="#EDEFEA" dashed />
            <WBox h={38} tone="#AEB4A8" />
          </div>
        </>
      ),
    },
  ],
  colors: [
    { name: "Primary · Teal", hex: "#0B6E6B", usage: "CTAs, timeline done-state, brand" },
    { name: "Accent · Coral", hex: "#FF7A59", usage: "Due-now emphasis only — reserved, loud when needed" },
    { name: "Background", hex: "#F0F6F5", usage: "Canvas, easy on older eyes" },
    { name: "Surface", hex: "#FFFFFF", usage: "Cards, modals" },
    { name: "Text · Ink", hex: "#14312E", usage: "All primary text (13.5:1)" },
    { name: "Text · Sub", hex: "#48625E", usage: "Secondary (7.4:1)" },
    { name: "Warning", hex: "#B97D14", usage: "Refill soon, late doses (on #FDF3E3, 4.9:1)" },
    { name: "Danger", hex: "#C03B2D", usage: "Missed markers, destructive actions" },
  ],
  typeScale: [
    { name: "Display", px: 26, weight: 800, lh: 1.15, sample: "Your doses today" },
    { name: "Title", px: 19, weight: 800, lh: 1.2, sample: "Metformin 500 mg" },
    { name: "Label", px: 14, weight: 700, lh: 1.3, sample: "1 tablet · with lunch" },
    { name: "Body", px: 13, weight: 500, lh: 1.55, sample: "Take with food to reduce stomach upset." },
    { name: "Caption", px: 11, weight: 600, lh: 1.4, sample: "WED · 15 MAR" },
  ],
  decisions: [
    { decision: "Type scale starts ~15% larger than a typical app", rationale: "The primary audience already uses system font scaling; designing large-first keeps layouts honest at 200%." },
    { decision: "Confirm modal blocks the screen", rationale: "Usually modals are a UX smell — here the dose decision is high-stakes and deserves undivided attention." },
    { decision: "Coral reserved exclusively for due-now", rationale: "A loud colour loses loudness fast. One reserved accent makes “now” unmistakable." },
    { decision: "Skip logs truthfully instead of hiding", rationale: "Clinically useful records beat vanity metrics; users who see honest history trust the app more (assumption to test)." },
    { decision: "Caregiver sharing off by default", rationale: "Independence is a stated persona need; opt-in respects it and avoids a family-negotiation barrier at install." },
  ],
  prototype: [
    { trigger: "Reminder notification", action: "Open confirm", destination: "Modal over Today", motion: "Modal fades/scales 200 ms; high-priority notification channel" },
    { trigger: "“I took it”", action: "Log dose", destination: "Modal closes", motion: "Check burst 200 ms + single haptic; timeline row ticks" },
    { trigger: "Snooze", action: "Defer 10 min", destination: "Modal closes", motion: "Clock icon sweep; re-fires at +10 min" },
    { trigger: "Dismiss modal (back)", action: "Treated as Snooze", destination: "Same as Snooze", motion: "Safe default — never assumes taken" },
    { trigger: "Supply < 7 pills", action: "Show banner", destination: "Today (banner)", motion: "Banner slides down once per day until resolved" },
    { trigger: "Toggle Larger text", action: "Scale UI 130%", destination: "Whole app", motion: "Cross-fade 150 ms; no layout jump" },
  ],
  accessibility: [
    "WCAG 2.2 AA targets: contrast ≥ 4.5:1 body / 3:1 large; verified per token pair with a contrast calculator.",
    "Primary targets ≥ 56 dp (above the 48 dp minimum) — “I took it” is the biggest thing on screen.",
    "No icon-only controls: every icon pairs with a text label, everywhere in the app.",
    "Reflow: entire UI holds at 200% text scale — tested in Figma at 130% and 200% mockups.",
    "Colour is never the only signal: done = filled dot + “Taken” text; due-now = border + shadow + label.",
    "Reading level: copy written to ~8th-grade level; no Latin medical phrasing without plain explanation.",
  ],
  testPlan: {
    intro: "Planned: 5 task-based sessions with participants 55+ (recruited via community centres / family networks), each using their own phone at their own font size. Status: plan only.",
    tasks: [
      { task: "Mark the 13:00 dose as taken.", success: "One attempt, no prompting, ≤10 s" },
      { task: "Find out whether the morning dose was taken yesterday.", success: "Located via History or Medicine detail within 30 s" },
      { task: "Make the text larger.", success: "Found in Settings without help; confirms layout still works" },
      { task: "Add a new medicine: Ibuprofen 200 mg, once daily at 09:00.", success: "Completes 3 steps unaided; strength picked via chips" },
      { task: "Explain what the coral card means.", success: "Correct answer (“take it now”) without reading it aloud twice" },
    ],
    criteria: [
      "5/5 complete task 1 on first attempt (this one is non-negotiable — it's the core loop)",
      "0 cases of truncation/overlap at each participant's own font size",
      "≥4/5 correctly distinguish Snooze vs. Skip unprompted",
      "SUS ≥ 70 with the 55+ subgroup",
    ],
    notes: "Document per participant: font-size setting, errors, hesitations >3 s, verbatim phrasing of confusion. Any task-1 failure blocks “done” status for the concept.",
  },
  challenges: [
    { challenge: "One screen must serve a 25-year-old and a 75-year-old", tradeoff: "Chose larger baseline type + optional 130% mode over a separate “senior mode” — one app, no segregation." },
    { challenge: "Reminder reliability is engineering, not design", tradeoff: "Scoped the case to UX; wrote a spec for exact-alarm + re-fire behaviour and flagged it as the #1 engineering risk to raise in interview." },
    { challenge: "Medical copy liability", tradeoff: "All guidance cards carry an explicit “general information” disclaimer; the app never advises dose changes." },
  ],
  lessons: [
    "Designing for the least-served user first made every other decision easier — accessibility is a strategy, not a pass at the end.",
    "Reserving one loud colour taught me more about hierarchy than any layout exercise.",
    "Writing plain-language microcopy is design work — it took as long as the screens and was worth it.",
  ],
  nextSteps: [
    "Run sessions with the 55+ group and publish results, including SUS per age band.",
    "Prototype the notification flow on a real device (exact alarms, do-not-disturb behaviour).",
    "Explore label photo-scan for the Add medicine step with OCR (feasibility first).",
    "Localisation plan: medication names and plain-language copy in a second language.",
  ],
};

/* ================================================================== */
/* 03 · Spendwise                                                      */
/* ================================================================== */

const spendWise: Project = {
  id: "spendwise",
  index: "03",
  name: "Spendwise",
  kind: "Finance utility · Android",
  tagline: "A budget tracker you'll actually keep open — ten-second logging, budgets that pace themselves.",
  summary:
    "Spendwise is a concept manual expense tracker attacking the #1 killer of budgeting apps: entry friction. Amount-first capture, budgets that translate leftovers into “per day” language, and insights written as sentences instead of charts-only dashboards.",
  role: "Solo designer (concept project) — product framing, IA, flows, UI system, prototype spec",
  timeline: "2-week self-directed concept · ~30 hours",
  platform: "Android phone · 393×852 dp reference · local-first data model (privacy)",
  tools: "AI-assisted drafting (Arena.ai) · Figma for final production · spreadsheet for token math",
  theme: sw,
  heroScreen: SWOverview,
  cluster: [SWOverview, SWAddExpense, SWInsights],
  screens: [
    { key: "sw-home", name: "Month overview", purpose: "Answer “am I okay this month?” within three seconds of opening.", notes: ["Navy hero card states spent, budget, remaining and days — four facts, one card", "Category chips flag ≥75% usage in amber before it becomes red", "Recent transactions prove the data is current (trust builder)"] },
    { key: "sw-add", name: "Add expense — sheet", purpose: "Log an expense in ≤10 seconds, one hand, at the till.", notes: ["Amount is the hero: biggest type on screen, focused by default", "Categories are visual tiles — recognition beats typing", "Note & date are secondary and pre-filled (today) — nothing blocks Save"] },
    { key: "sw-list", name: "Transactions + search", purpose: "Find any past expense and trust the total you're shown.", notes: ["Search result footer shows the summed total — answers “how much in all?”", "Filter chips keep queries one-thumb", "Grouped by day with hairlines, not heavy cards — scanning beats clicking"] },
    { key: "sw-budget", name: "Budget detail", purpose: "Turn “82% used” into “€4.75 per day left” — a number you can act on.", notes: ["Ring goes amber at 75% — warning with runway, not panic", "“Pattern spotted” converts history into one concrete suggestion", "Edit budget is ghost-styled: changing the plan is a deliberate act"] },
    { key: "sw-insights", name: "Insights", purpose: "Five months of trend + top categories, explained in sentences.", notes: ["Current month highlighted in amber — the chart has a “you are here”", "Every visual pairs with a plain sentence (“12% less than February”)", "Behaviour wins are celebrated (“biking on Tuesdays”) — reinforcement"] },
    { key: "sw-empty", name: "No search results", purpose: "A dead end that isn't one: recover the query in one tap.", notes: ["Suggests the three most likely fixes (category, month, shorter term)", "Tip card teaches tagging — converts failure into feature discovery", "Clear button lives in the field, where the eye already is"] },
  ],
  problem: {
    statement:
      "Manual budgeting apps die at data entry: people forget to log for three days, the list no longer reflects reality, trust collapses, and the app is deleted. Bank-sync apps solve entry but raise privacy concerns and remove the awareness benefit of logging by hand.",
    audience: ["Students and young professionals, 20–32, fixed monthly income", "Privacy-conscious users wary of bank-account syncing", "People who tried one budgeting app before and quit"],
    goal: "Make logging so cheap that the record stays true — and make the record speak in plain language.",
    solution:
      "A local-first tracker with amount-first capture (≤10 s), budgets that compute daily allowances, amber-before-red warnings, and insights written as sentences. Data stays on-device — the privacy stance is a feature.",
  },
  userNeeds: [
    "Log an expense in under 10 seconds, one-handed at the till",
    "Trust that the record still reflects reality",
    "Know what I can still spend today — not just this month",
    "Hear where the money went in plain sentences, not charts alone",
    "Keep financial data on my own device",
  ],
  persona: {
    name: "Jonas R. — 26, junior developer",
    meta: "Hypothetical persona · assumption-based, to be validated",
    quote: "“I track for a week, miss two days, and then the numbers are fiction.”",
    goals: ["Stay under a simple monthly number", "See where food money actually goes", "Keep financial data off someone else's servers"],
    pains: ["Apps that need bank sync before showing anything", "Charts that say nothing actionable", "Quitting the app after one forgotten weekend"],
    tech: "Android flagship · comfortable with apps, impatient with setup · values privacy",
  },
  assumptions: [
    "Entry friction >10 seconds is the primary cause of abandoned tracking streaks.",
    "Users quit after data goes stale — freshness of the list is a trust feature.",
    "“€X per day left” changes behaviour more than “€Y left this month”.",
    "A visible local-first stance increases adoption among privacy-conscious 20–32s.",
    "Category recognition from 4–6 picture tiles is faster than typing or long lists.",
  ],
  researchQuestions: [
    "What is the measured time-to-log for the sheet flow, one-handed, on a real device?",
    "Do users notice and act on the daily-allowance number vs. the monthly remainder?",
    "Does the amber 75% warning feel helpful or nagging?",
    "Which insight sentence do users repeat back a week later (recall test)?",
  ],
  researchMethod:
    "Plan: 5 remote moderated sessions + an unmoderated 2-day diary study where participants log real expenses in the prototype and note moments of friction. Survey: 8 questions on privacy attitudes to validate the local-first assumption. All planned — nothing presented as done.",
  journey: {
    stages: ["Pay", "Log", "Check", "Adjust"],
    rows: [
      { label: "Doing", cells: ["Pays at the till / online", "Opens sheet, types amount, taps category", "Glances at the month card over coffee", "Reads monthly insight; nudges a budget"] },
      { label: "Thinking", cells: ["“That was more than I thought.”", "“I'll do it later — wait, no, now.”", "“Am I still okay for the month?”", "“So that's where it all goes.”"] },
      { label: "Feeling", tone: "feeling", cells: ["− Mild guilt at the price", "+ Quick win — done in seconds", "+ Calm — one honest number", "+ Smart — a concrete takeaway"] },
      { label: "Opportunity", cells: ["Notification shortcut “Log expense” (planned)", "Amount-first focus removes 2 of 4 steps", "Daily-allowance phrasing at the right moment", "One sentence > one dashboard"] },
    ],
  },
  ia: [
    { label: "Home", note: "start destination", children: [{ label: "Add expense (sheet)" }, { label: "Transactions + search" }, { label: "Budget detail" }] },
    { label: "Insights", children: [{ label: "Month range picker" }] },
    { label: "Budgets", children: [{ label: "Budget detail" }, { label: "Edit budget" }] },
    { label: "Settings", children: [{ label: "Currency & month start" }, { label: "Data & export (local-first)" }] },
  ],
  flow: [
    { label: "Pay for something", kind: "start" },
    { label: "Open Add expense", kind: "action" },
    { label: "Sheet opens, amount focused", kind: "screen" },
    { label: "Amount > 0?", kind: "decision", note: "No → Save disabled + hint, no error nag" },
    { label: "Pick category", kind: "action" },
    { label: "Save", kind: "action" },
    { label: "Sheet closes + row appears", kind: "screen" },
    { label: "Budgets recalc", kind: "end" },
  ],
  flowNote:
    "Validation is quiet by design: Save simply stays disabled with a hint until the amount is valid — no red error for a state the user controls entirely. Deleting a transaction offers Undo for 5 s instead of a confirm dialog (faster, safer-feeling). Export lives in Settings for the privacy story.",
  wireframes: [
    {
      caption: "Overview · lo-fi",
      body: (
        <>
          <div className="flex items-center justify-between"><WBar w="30%" h={12} tone="#AEB4A8" /><span className="h-6 w-16 rounded-full bg-[#D5D9D0]" /></div>
          <WBox h={92} tone="#C9CDC4" />
          <div className="mt-2 flex gap-2">{[0, 1, 2].map((i) => <WBox key={i} h={44} tone="#EDEFEA" />)}</div>
          <div className="mt-3"><WBar w="24%" h={8} /></div>
          <div className="mt-2"><WList n={3} /></div>
          <div className="mt-auto flex items-center justify-around border-t border-[#D5D9D0] pt-2 pb-1">{[0, 1, 2, 3].map((i) => <span key={i} className="h-5 w-5 rounded-md bg-[#C7CCC2]" />)}</div>
        </>
      ),
    },
    {
      caption: "Add expense · lo-fi",
      body: (
        <>
          <WBox h={280} tone="#F1F2EE" dashed />
          <div className="mt-3 space-y-3">
            <WBox h={64} tone="#E4E6E0" />
            <div className="grid grid-cols-4 gap-2">{[0, 1, 2, 3].map((i) => <WBox key={i} h={48} tone="#EDEFEA" />)}</div>
            <div className="flex gap-2"><WBox h={30} tone="#E4E6E0" /><WBox h={30} tone="#E4E6E0" /></div>
            <WBox h={36} tone="#AEB4A8" />
          </div>
        </>
      ),
    },
    {
      caption: "Insights · lo-fi",
      body: (
        <>
          <WBar w="32%" h={12} tone="#AEB4A8" />
          <WBox h={140} tone="#EDEFEA">
            <div className="flex h-24 items-end gap-2.5 px-6">{[55, 80, 65, 45, 38].map((h, i) => <span key={i} className="w-5 rounded-t bg-[#C7CCC2]" style={{ height: `${h}%` }} />)}</div>
          </WBox>
          <div className="mt-3 space-y-2.5">{[85, 65, 45].map((w, i) => <div key={i}><WBar w={`${w}%`} h={7} /><WBar w="100%" h={5} tone="#E4E6E0" /></div>)}</div>
          <WBox h={40} tone="#C9CDC4" />
        </>
      ),
    },
  ],
  colors: [
    { name: "Primary · Navy", hex: "#202E5C", usage: "Hero card, CTAs, active states" },
    { name: "Accent · Amber", hex: "#F0A81C", usage: "“You are here”, 75% warnings, highlights" },
    { name: "Background", hex: "#F4F4F0", usage: "Canvas — paper-neutral, not clinical white" },
    { name: "Surface", hex: "#FFFFFF", usage: "Cards, sheets, fields" },
    { name: "Text · Ink", hex: "#1C2233", usage: "Primary text (14.5:1)" },
    { name: "Text · Sub", hex: "#545C70", usage: "Secondary (6.4:1)" },
    { name: "Success", hex: "#2F7D55", usage: "Income, savings wins" },
    { name: "Danger", hex: "#C03B2D", usage: "Over budget (used sparingly after amber)" },
  ],
  typeScale: [
    { name: "Display", px: 26, weight: 800, lh: 1.1, sample: "€842.50" },
    { name: "Title", px: 17, weight: 800, lh: 1.2, sample: "Food & groceries" },
    { name: "Label", px: 13, weight: 700, lh: 1.3, sample: "Supermarket — fresh week" },
    { name: "Body", px: 12, weight: 500, lh: 1.5, sample: "€81 left for 17 days — about €4.75 per day." },
    { name: "Caption", px: 10, weight: 600, lh: 1.35, sample: "TODAY · 12:40" },
  ],
  decisions: [
    { decision: "Amount-first capture, category second", rationale: "The amount is the one fact users always know at the till; focus it by default and everything else becomes optional." },
    { decision: "Budgets speak in “per day left”", rationale: "Monthly remainders are abstract; a daily allowance maps onto the next decision the user actually makes." },
    { decision: "Amber at 75%, red only at 100%", rationale: "Early-warning with runway feels helpful; jumping straight to red trains people to ignore the app." },
    { decision: "Local-first, export instead of cloud sync", rationale: "Turns a technical constraint into a trust feature for the privacy-conscious persona; flagged sync as a future business decision." },
    { decision: "Insights as sentences paired with each chart", rationale: "Charts show, sentences tell — juniors often ship charts alone; pairing them is the actual design skill." },
  ],
  prototype: [
    { trigger: "Tap FAB", action: "Add expense", destination: "Sheet over Home", motion: "Slide up 250 ms; amount field auto-focused, keyboard numeric" },
    { trigger: "Save (valid)", action: "Persist + close", destination: "Home list", motion: "Sheet down; new row animates in at top; budgets recalc silently" },
    { trigger: "Tap category tile", action: "Select", destination: "Same sheet", motion: "Tile border fills navy 120 ms + tick; single-select" },
    { trigger: "Swipe transaction left", action: "Delete", destination: "Same list", motion: "Red reveal; undo snackbar 5 s (no confirm dialog)" },
    { trigger: "Tap budget card", action: "Open detail", destination: "Budget detail", motion: "Shared-element progress ring, 200 ms" },
    { trigger: "Search no results", action: "Show recovery", destination: "Empty state", motion: "Fade; suggestions tappable to rewrite query in place" },
  ],
  accessibility: [
    "Numeric keyboard only for amount (inputType=numberDecimal) — no keyboard switching mid-task.",
    "Money never conveyed by colour alone: amber warning pairs with “Getting close” text + daily figure.",
    "Contrast verified: navy on paper 11.9:1; amber used as fill behind ink text (on-accent 8.1:1).",
    "Chart bars have text equivalents beside them — every visual has a sentence twin.",
    "Targets: category tiles 64 dp, list rows full-width 56 dp; swipe-to-delete also available via long-press menu.",
    "Currency formatting follows system locale (€1.234,56 vs $1,234.56) — planned, spec written.",
  ],
  testPlan: {
    intro: "Planned: 5 moderated remote sessions + a 2-day diary study (participants log real expenses, noting friction moments). Status: plan — the diary study is the riskiest part and a great interview talking point.",
    tasks: [
      { task: "Log a €24.90 lunch under Food with the note “with Sam”.", success: "≤10 s on a real phone, one hand; no field re-visited" },
      { task: "Find out if the Food budget is healthy.", success: "States both % and daily allowance within 10 s of opening Budgets" },
      { task: "Find everything spent at supermarkets this month and the total.", success: "Uses search; reads total from result footer unprompted" },
      { task: "Delete yesterday's snack entry.", success: "Swipe or long-press; notices Undo; no accidental loss" },
      { task: "Repeat back one insight from last month.", success: "Recalls a sentence, not a chart shape, after 2 min of other tasks" },
    ],
    criteria: [
      "Median time-to-log ≤10 s across participants (the product's core promise)",
      "≥4/5 use the daily-allowance number when judging budget health",
      "0 participants lose data accidentally (undo works)",
      "Privacy: ≥4/5 mention local storage as a positive unprompted after touring Settings",
    ],
    notes: "Diary template: per entry — time to log (self-timed), context (where/one-handed?), annoyance (0–3). Friction ≥2 anywhere triggers a redesign ticket before the next round.",
  },
  challenges: [
    { challenge: "Manual entry is a feature *and* the risk", tradeoff: "Leaned into it (awareness benefit, privacy) and made speed the KPI — honest framing beats pretending sync isn't expected." },
    { challenge: "How many categories before the tile grid gets slow?", tradeoff: "Capped at 6 defaults + custom; tested recognition assumption in the plan. More is a settings-level power feature." },
    { challenge: "Charts tempt decoration", tradeoff: "Limited to two chart types (bars, rings) + sentence twins. Consistency beat novelty." },
  ],
  lessons: [
    "Writing a single measurable promise (≤10 s to log) made every screen decision arguable and therefore better.",
    "Empty and no-results states are retention features — the recovery chips came from thinking about the quitter persona, not the happy path.",
    "A privacy stance is a UX decision with UI consequences (export flow, on-device copy) — worth raising in any fintech interview.",
  ],
  nextSteps: [
    "Run moderated + diary study; publish measured time-to-log (median and worst case).",
    "Prototype the notification “Log expense” quick-action and measure its effect on diary-study gaps.",
    "Spec CSV export and a desktop-web read-only view (responsive extension of the same system).",
    "Investigate optional bank-import as a *merge* into the manual record — user-controlled, never automatic.",
  ],
};

export const projects: Project[] = [focusFlow, doseWise, spendWise];
export const projectById = (id: string) => projects.find((p) => p.id === id);
