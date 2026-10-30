# Yeabsira — Portfolio · የDeploy መመሪያ (Vercel)

ይህ ZIP ሙሉ የportfolio ምንጭ-ኮድ ነው። እንደ ኮድ ጠቢብ በVercel ለማሰራጨት የሚከተለውን ተከተል።

## ደረጃ 0 — Node.js ይጫን
Node.js 18+ ያስፈልጋል → https://nodejs.org (LTS ቅሪት ምረጥ)።

---

## Option A — ቀላሉ መንገድ (GitHub ሳያስፈልግ)

1. ZIP-unpack አድርግ
2. በfolder ውስጥ Terminal ክፈት እና፦
   ```bash
   npm install
   npm run build
   ```
   → `dist/` የሚባል folder ይፈጠራል (ሙሉ site በአንድ index.html ውስጥ)
3. ወደ **vercel.com** ግባ (በGitHub/Google account)
4. **"Add New… → Project"** → የ`dist/` folderን ወደ ገጹ **ጎትተህ ጣል** (drag & drop)
5. ተጠናቀቀ! Vercel እንደ `yeabsira-portfolio.vercel.app` ያለ URL ይሰጥሃል — domain ስሙን መቀየር ትችላለህ።

## Option B — GitHub + Vercel (ለውጥ ሲያደርግ በራሱ deploy ይሆናል)

1. በGitHub አዲስ repository ፍጠር፤ ፋይሎቹን push አድርግ
2. vercel.com → **Import** repository → Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy ጫን። ከዚያ በኋላ `git push` ስታደርግ Vercel በራሱ ያዘምናል።

---

## ነገር ለመቀየር ስትፈልግ

| ምን | የት |
|----|-----|
| ስም / email / LinkedIn / ከተማ / resume | `src/config.ts` |
| ሪዙሜ ትምህርት & ስራ ታሪክ | `src/config.ts` → `resumeEntries` |
| የእንግሊዝኛ ደረጃ (ሪዙሜ ላይ) | `src/pages/Resume.tsx` |
| ፕሮጀክት መረጃ / ጽሑፎች | `src/data/projects.tsx` |
| Code Tebib መረጃ | `src/config.ts` → `CODE_TEBIB` |

ከቀየርክ በኋላ፦ `npm run build` እንደገና አሂድ → Option A ከሆነ `dist/`ን እንደገና ጎትተህ ጣል፤ Option B ከሆነ `git push` ብቻ — በራሱ ይዘምናል።

## ማስታወሻ
- ሪዙሜ PDF ለማግኘት፦ site ላይ Resume ክፈት → **Print / Save as PDF** ጫን።
- `node_modules/` በZIP ውስጥ የለም — `npm install` ይፈጥረዋል (ይሄ የተለመደ ነው)።
