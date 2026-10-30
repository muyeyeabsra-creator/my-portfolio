/**
 * ─────────────────────────────────────────────────────────────────
 * EDIT THIS FILE to update personal details across the whole site.
 * Everything else reads from here — no need to hunt through pages.
 * ─────────────────────────────────────────────────────────────────
 */
export const IDENTITY = {
  name: "Yeabsira",
  title: "Junior Mobile UI/UX Designer",
  email: "muyeyeabsra@gmail.com",

  /** Resume now lives inside the site (route #/resume) — printable to PDF. */
  resumeUrl: "#/resume",

  linkedinUrl: "https://www.linkedin.com/in/yeabsira-munye-9a0706446",

  location: "Bahir Dar, Ethiopia · UTC+3",
  availableFrom: "Immediately",

  /** Your education & work history for the resume page. Add real entries, e.g.
   *  { period: "2021–2024", title: "BSc — …", org: "Bahir Dar University", note: "…" }
   *  Until you add some, the section shows an edit hint (hidden when printing). */
  resumeEntries: [] as { period: string; title: string; org: string; note?: string }[],

  /** Path to your portrait (e.g. "/portrait.jpg" after adding the file
   *  to /public). While empty, the About section renders text-only. */
  photoUrl: "",
};

/** Additional web project — separate from the mobile case studies. */
export const CODE_TEBIB = {
  name: "Code Tebib",
  amharic: "ኮድ ጠቢብ",
  tagline: "ሙሉ ዌብሳይት እጽፋለሁ", // "I will write complete websites"
  /** EXACT live URL — do not change. */
  url: "https://code-tebib-webapp.vercel.app/",
};
