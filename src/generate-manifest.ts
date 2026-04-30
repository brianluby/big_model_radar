import fs from "fs";
import path from "path";

const DIGESTS_DIR = "digests";
const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REPORT_FILES = [
  "ai-cli",
  "ai-cli-zh",
  "ai-agents",
  "ai-agents-zh",
  "ai-web",
  "ai-web-zh",
  "ai-trending",
  "ai-trending-zh",
  "ai-hn",
  "ai-hn-zh",
  "ai-weekly",
  "ai-weekly-zh",
  "ai-monthly",
  "ai-monthly-zh",
  "ai-research",
  "ai-research-zh",
] as const;
const MAX_FEED_ITEMS = 30;
type ReportFile = (typeof REPORT_FILES)[number];
type ReportLang = "zh" | "en";

const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "AI CLI Tools Digest",
  "ai-cli-zh": "AI CLI 工具社区动态日报",
  "ai-agents": "AI Agent Ecosystem Digest",
  "ai-agents-zh": "AI 智能体生态日报",
  "ai-web": "Official AI Content Report",
  "ai-web-zh": "AI 官方内容追踪报告",
  "ai-trending": "AI Open Source Trends",
  "ai-trending-zh": "AI 开源趋势日报",
  "ai-hn": "Hacker News AI Community Digest",
  "ai-hn-zh": "Hacker News AI 社区动态日报",
  "ai-weekly": "AI Tools Weekly Digest",
  "ai-weekly-zh": "AI 工具生态周报",
  "ai-monthly": "AI Tools Monthly Digest",
  "ai-monthly-zh": "AI 工具生态月报",
  "ai-research": "Research Priorities Digest",
  "ai-research-zh": "研究优先级简报",
};

function enabledLangs(): ReportLang[] {
  const langs = (process.env["REPORT_LANGS"] ?? "en")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is ReportLang => s === "zh" || s === "en");
  return langs.length > 0 ? langs : ["en"];
}

function reportLang(report: ReportFile): ReportLang {
  return report.endsWith("-zh") ? "zh" : "en";
}

function feedLanguage(langs: ReportLang[]): string {
  if (langs.length === 1) return langs[0] === "en" ? "en-US" : "zh-CN";
  return "en-US";
}

interface DateEntry {
  date: string;
  reports: string[];
}

interface Manifest {
  generated: string;
  dates: DateEntry[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function resolveSiteUrl(): string {
  const explicit = process.env["PAGES_URL"] ?? process.env["SITE_URL"];
  if (explicit) return explicit.replace(/\/$/, "");

  const repo = process.env["DIGEST_REPO"] ?? process.env["GITHUB_REPOSITORY"];
  if (repo) {
    const [owner, name] = repo.split("/");
    if (owner && name) return `https://${owner}.github.io/${name}`;
  }

  throw new Error("Missing site URL. Set PAGES_URL, SITE_URL, DIGEST_REPO, or GITHUB_REPOSITORY.");
}

function toRfc822(date: Date): string {
  return (
    `${DAYS[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, "0")} ` +
    `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()} ` +
    `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")} +0000`
  );
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const SITE_URL = resolveSiteUrl();
const ENABLED_LANGS = enabledLangs();
const ENABLED_LANG_SET = new Set<ReportLang>(ENABLED_LANGS);
const ACTIVE_REPORT_FILES = REPORT_FILES.filter((report) => ENABLED_LANG_SET.has(reportLang(report)));

const entries = fs
  .readdirSync(DIGESTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && DATE_RE.test(d.name))
  .map((d) => d.name)
  .sort()
  .reverse()
  .map((date) => {
    const files = new Set(fs.readdirSync(path.join(DIGESTS_DIR, date)));
    const reports = ACTIVE_REPORT_FILES.filter((r) => files.has(`${r}.md`));
    return { date, reports };
  })
  .filter((e) => e.reports.length > 0);

const manifest: Manifest = {
  generated: new Date().toISOString(),
  dates: entries,
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest.json updated: ${entries.length} dates`);

// ── RSS Feed ──────────────────────────────────────────────────────────────────

const feedItems: Array<{ date: string; report: string }> = [];
outer: for (const entry of entries) {
  for (const report of entry.reports) {
    feedItems.push({ date: entry.date, report });
    if (feedItems.length >= MAX_FEED_ITEMS) break outer;
  }
}

const buildDate = toRfc822(new Date());

const itemsXml = feedItems
  .map(({ date, report }) => {
    const label = REPORT_LABELS[report] ?? report;
    const title = `${label} ${date}`;
    const link = `${SITE_URL}/#${date}/${report}`;
    const parts = date.split("-").map(Number);
    const pubDate = toRfc822(new Date(Date.UTC(parts[0]!, parts[1]! - 1, parts[2]!)));
    return [
      "    <item>",
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <pubDate>${pubDate}</pubDate>`,
      `      <description>${escapeXml(title)}</description>`,
      "    </item>",
    ].join("\n");
  })
  .join("\n");

const feedXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>Big Model Radar</title>\n` +
  `    <link>${SITE_URL}</link>\n` +
  `    <description>Daily AI ecosystem digest</description>\n` +
  `    <language>${feedLanguage(ENABLED_LANGS)}</language>\n` +
  `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
  `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
  itemsXml +
  `\n  </channel>\n` +
  `</rss>\n`;

fs.writeFileSync(FEED_PATH, feedXml);
console.log(`feed.xml updated: ${feedItems.length} items`);
