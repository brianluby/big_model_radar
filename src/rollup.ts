/**
 * Weekly and monthly rollup report generator.
 * Reads existing daily digest files — no GitHub API calls needed.
 */

import fs from "node:fs";
import path from "node:path";
import { callLlm, saveFile, autoGenFooter } from "./report.ts";
import { buildWeeklyPrompt, buildMonthlyPrompt } from "./prompts.ts";
import { createGitHubIssue } from "./github.ts";

const DIGESTS_DIR = "digests";
const MAX_CHARS_PER_REPORT = 2500;
type ReportLang = "zh" | "en";

// Source report types to read for rollups (in priority order)
const ROLLUP_SOURCES = ["ai-cli", "ai-agents", "ai-trending", "ai-hn", "ai-web"];
const LANG_SUFFIX: Record<ReportLang, string> = { zh: "-zh", en: "" };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getDateDirs(): string[] {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
}

/** Read and truncate a daily digest file. Returns null if not found. */
function readDailyDigest(date: string, lang: ReportLang): string | null {
  const marker = lang === "en" ? "\n...[truncated]" : "\n...[摘要截断]";
  for (const type of ROLLUP_SOURCES) {
    const candidates = lang === "en" ? [`${type}.md`, `${type}-en.md`] : [`${type}-zh.md`, `${type}.md`];
    for (const name of candidates) {
      const p = path.join(DIGESTS_DIR, date, name);
      try {
        const content = fs.readFileSync(p, "utf-8");
        const truncated = content.slice(0, MAX_CHARS_PER_REPORT);
        return truncated.length < content.length ? truncated + marker : truncated;
      } catch {
        continue;
      }
    }
  }
  return null;
}

/** Read a weekly report file. Returns null if not found. */
function readWeeklyDigest(date: string, lang: ReportLang): string | null {
  const candidates =
    lang === "en" ? ["ai-weekly.md", "ai-weekly-en.md"] : ["ai-weekly-zh.md", "ai-weekly.md"];
  const marker = lang === "en" ? "\n...[truncated]" : "\n...[摘要截断]";
  for (const name of candidates) {
    const p = path.join(DIGESTS_DIR, date, name);
    try {
      const content = fs.readFileSync(p, "utf-8");
      return content.slice(0, 3000) + (content.length > 3000 ? marker : "");
    } catch {
      continue;
    }
  }
  return null;
}

/** Format a date as ISO week string, e.g. "2026-W10". */
function toWeekStr(date: Date): string {
  // ISO week: week containing the first Thursday of the year
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Weekly rollup
// ---------------------------------------------------------------------------

export async function runWeeklyRollup(): Promise<void> {
  const now = new Date();
  // Use CST date (UTC+8)
  const cstDate = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const dateStr = cstDate.toISOString().slice(0, 10);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const weekStr = toWeekStr(cstDate);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const langs = (process.env["REPORT_LANGS"] ?? "en")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is ReportLang => s === "zh" || s === "en");
  const enabledLangs: ReportLang[] = langs.length > 0 ? langs : ["en"];
  const genZh = enabledLangs.includes("zh");
  const genEn = enabledLangs.includes("en");

  console.log(`[weekly] Generating rollup for ${weekStr} (date: ${dateStr})`);
  console.log(`[weekly] Languages: ${enabledLangs.join(", ")}`);

  // Collect last 7 days of daily digests
  const allDates = getDateDirs();
  const last7 = allDates.slice(0, 7);

  const dailyDigestsByLang: Record<ReportLang, Record<string, string>> = { zh: {}, en: {} };
  for (const lang of enabledLangs) {
    for (const date of last7) {
      const content = readDailyDigest(date, lang);
      if (content) dailyDigestsByLang[lang][date] = content;
    }
  }

  if (enabledLangs.every((lang) => Object.keys(dailyDigestsByLang[lang]).length === 0)) {
    console.log("[weekly] No daily digests found, skipping.");
    return;
  }

  console.log(
    `[weekly] Found daily digests: ${enabledLangs.map((lang) => `${lang}=${Object.keys(dailyDigestsByLang[lang]).length}`).join(", ")}`,
  );

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  if (genZh) {
    const dailyDigests = dailyDigestsByLang.zh;
    if (Object.keys(dailyDigests).length === 0) {
      console.log("[weekly] No ZH daily digests found, skipping ZH report.");
    } else {
      console.log("[weekly] Calling LLM for ZH weekly report...");
      const zhSummary = await callLlm(buildWeeklyPrompt(dailyDigests, weekStr, "zh"), 8192);
      const zhContent =
        `# AI 工具生态周报 ${weekStr}\n\n` +
        `> 覆盖日期: ${last7[last7.length - 1]} ~ ${last7[0]} | 生成时间: ${utcStr} UTC\n\n` +
        `---\n\n` +
        zhSummary +
        footer;
      console.log(`  Saved ${saveFile(zhContent, dateStr, "ai-weekly-zh.md")}`);
      if (digestRepo) {
        const url = await createGitHubIssue(`📅 AI 工具生态周报 ${weekStr}`, zhContent, "weekly");
        console.log(`  Created weekly issue: ${url}`);
      }
    }
  }

  if (genEn) {
    const dailyDigests = dailyDigestsByLang.en;
    if (Object.keys(dailyDigests).length === 0) {
      console.log("[weekly] No EN daily digests found, skipping EN report.");
    } else {
      console.log("[weekly] Calling LLM for EN weekly report...");
      const enSummary = await callLlm(buildWeeklyPrompt(dailyDigests, weekStr, "en"), 8192);
      const enContent =
        `# AI Tools Ecosystem Weekly Report ${weekStr}\n\n` +
        `> Coverage: ${last7[last7.length - 1]} ~ ${last7[0]} | Generated: ${utcStr} UTC\n\n` +
        `---\n\n` +
        enSummary +
        enFooter;
      console.log(`  Saved ${saveFile(enContent, dateStr, "ai-weekly.md")}`);
      if (digestRepo) {
        const url = await createGitHubIssue(
          `📅 AI Tools Ecosystem Weekly Report ${weekStr}`,
          enContent,
          "weekly-en",
        );
        console.log(`  Created weekly issue (en): ${url}`);
      }
    }
  }

  console.log("[weekly] Done!");
}

// ---------------------------------------------------------------------------
// Monthly rollup
// ---------------------------------------------------------------------------

export async function runMonthlyRollup(): Promise<void> {
  const now = new Date();
  const cstDate = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  // Monthly report covers the PREVIOUS month
  const prevMonth = new Date(Date.UTC(cstDate.getUTCFullYear(), cstDate.getUTCMonth() - 1, 1));
  const monthStr = prevMonth.toISOString().slice(0, 7); // "2026-02"
  const dateStr = cstDate.toISOString().slice(0, 10);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const langs = (process.env["REPORT_LANGS"] ?? "en")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is ReportLang => s === "zh" || s === "en");
  const enabledLangs: ReportLang[] = langs.length > 0 ? langs : ["en"];
  const genZh = enabledLangs.includes("zh");
  const genEn = enabledLangs.includes("en");

  console.log(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);
  console.log(`[monthly] Languages: ${enabledLangs.join(", ")}`);

  const allDates = getDateDirs();

  // Prefer weekly reports from the target month
  const monthDates = allDates.filter((d) => d.startsWith(monthStr));
  const hasWeeklyForLang = (date: string, lang: ReportLang) =>
    fs.existsSync(path.join(DIGESTS_DIR, date, `ai-weekly${LANG_SUFFIX[lang]}.md`));

  const sourceByLang: Record<ReportLang, { digests: Record<string, string>; label: string }> = {
    zh: { digests: {}, label: "" },
    en: { digests: {}, label: "" },
  };

  for (const lang of enabledLangs) {
    const weeklyDates = monthDates.filter((date) => hasWeeklyForLang(date, lang));
    if (weeklyDates.length >= 2) {
      sourceByLang[lang].label =
        lang === "en" ? `${weeklyDates.length} weekly reports` : `${weeklyDates.length} 份周报`;
      for (const date of weeklyDates) {
        const content = readWeeklyDigest(date, lang);
        if (content) sourceByLang[lang].digests[date] = content;
      }
    } else {
      const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
      sourceByLang[lang].label =
        lang === "en"
          ? `${sampled.length} daily reports (sampled every 4 days)`
          : `${sampled.length} 份日报（每4日采样）`;
      for (const date of sampled) {
        const content = readDailyDigest(date, lang);
        if (content) sourceByLang[lang].digests[date] = content;
      }
    }
  }

  if (enabledLangs.every((lang) => Object.keys(sourceByLang[lang].digests).length === 0)) {
    console.log(`[monthly] No source digests found for ${monthStr}, skipping.`);
    return;
  }

  console.log(
    `[monthly] Sources: ${enabledLangs.map((lang) => `${lang}=${Object.keys(sourceByLang[lang].digests).length}`).join(", ")}`,
  );

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  if (genZh) {
    const { digests: sourceDigests, label } = sourceByLang.zh;
    if (Object.keys(sourceDigests).length === 0) {
      console.log("[monthly] No ZH source digests found, skipping ZH report.");
    } else {
      console.log("[monthly] Calling LLM for ZH monthly report...");
      const zhSummary = await callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "zh"), 8192);
      const zhContent =
        `# AI 工具生态月报 ${monthStr}\n\n` +
        `> 数据来源: ${label} | 生成时间: ${utcStr} UTC\n\n` +
        `---\n\n` +
        zhSummary +
        footer;
      console.log(`  Saved ${saveFile(zhContent, dateStr, "ai-monthly-zh.md")}`);
      if (digestRepo) {
        const url = await createGitHubIssue(`📆 AI 工具生态月报 ${monthStr}`, zhContent, "monthly");
        console.log(`  Created monthly issue: ${url}`);
      }
    }
  }

  if (genEn) {
    const { digests: sourceDigests, label } = sourceByLang.en;
    if (Object.keys(sourceDigests).length === 0) {
      console.log("[monthly] No EN source digests found, skipping EN report.");
    } else {
      console.log("[monthly] Calling LLM for EN monthly report...");
      const enSummary = await callLlm(buildMonthlyPrompt(sourceDigests, monthStr, "en"), 8192);
      const enContent =
        `# AI Tools Ecosystem Monthly Report ${monthStr}\n\n` +
        `> Sources: ${label} | Generated: ${utcStr} UTC\n\n` +
        `---\n\n` +
        enSummary +
        enFooter;
      console.log(`  Saved ${saveFile(enContent, dateStr, "ai-monthly.md")}`);
      if (digestRepo) {
        const url = await createGitHubIssue(
          `📆 AI Tools Ecosystem Monthly Report ${monthStr}`,
          enContent,
          "monthly-en",
        );
        console.log(`  Created monthly issue (en): ${url}`);
      }
    }
  }

  console.log("[monthly] Done!");
}
