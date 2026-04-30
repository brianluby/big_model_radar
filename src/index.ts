/**
 * Big Model Radar: daily digest for AI CLI tools and personal AI agents.
 *
 * Env vars:
 *   OPENAI_API_KEY      - API key for an OpenAI-compatible endpoint
 *   OPENAI_BASE_URL     - Endpoint override (default: https://api.openai.com/v1)
 *   OPENAI_MODEL        - Model name (default: gpt-4.1-mini)
 *   ANTHROPIC_API_KEY   - Backward-compatible alias for OPENAI_API_KEY
 *   ANTHROPIC_BASE_URL  - Backward-compatible alias for OPENAI_BASE_URL
 *   ANTHROPIC_MODEL     - Backward-compatible alias for OPENAI_MODEL
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 */

import {
  type RepoConfig,
  type GitHubItem,
  type GitHubRelease,
  fetchRecentItems,
  fetchRecentReleases,
  fetchSkillsData,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildCliPrompt,
  buildPeerPrompt,
  buildComparisonPrompt,
  buildPeersComparisonPrompt,
  buildSkillsPrompt,
  buildWebReportPrompt,
  buildTrendingPrompt,
  buildHnPrompt,
  buildResearchPriorityPrompt,
} from "./prompts.ts";
import { callLlm, saveFile, autoGenFooter, getLlmBaseUrl, hasLlmCredentials } from "./report.ts";
import { loadWebState, saveWebState, fetchSiteContent, type WebFetchResult, type WebState } from "./web.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { fetchHnData, type HnData } from "./hn.ts";
import { loadConfig } from "./config.ts";

type ReportLang = "zh" | "en";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

const {
  cliRepos: CLI_REPOS,
  skillsRepo: CLAUDE_SKILLS_REPO,
  firstPartyAgents: FIRST_PARTY_AGENTS,
  peerAgents: PEER_AGENTS,
} = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function reportFile(base: string, lang: ReportLang): string {
  return lang === "en" ? `${base}.md` : `${base}-zh.md`;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RepoFetch {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch
// ---------------------------------------------------------------------------

async function fetchAllData(
  since: Date,
  webState: WebState,
): Promise<{
  fetched: RepoFetch[];
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
}> {
  const allConfigs = [...CLI_REPOS, ...FIRST_PARTY_AGENTS, ...PEER_AGENTS];
  console.log(`  Tracking: ${allConfigs.map((r) => r.id).join(", ")}, claude-code-skills, web, hn`);

  const [fetched, skillsData, webResults, trendingData, hnData] = await Promise.all([
    Promise.all(
      allConfigs.map(async (cfg) => {
        const [issuesRaw, prs, releases] = await Promise.all([
          fetchRecentItems(cfg, "issues", since),
          fetchRecentItems(cfg, "pulls", since),
          fetchRecentReleases(cfg.repo, since),
        ]);
        const issues = issuesRaw.filter((i) => !i.pull_request);
        console.log(
          `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}`,
        );
        return { cfg, issues, prs, releases };
      }),
    ),
    fetchSkillsData(CLAUDE_SKILLS_REPO).then((d) => {
      console.log(`  [claude-code-skills] prs: ${d.prs.length}, issues: ${d.issues.length}`);
      return d;
    }),
    Promise.all([
      fetchSiteContent("anthropic", webState).catch((err): WebFetchResult => {
        console.error(`  [web/anthropic] fetch failed: ${err}`);
        return {
          site: "anthropic",
          siteName: "Anthropic (Claude)",
          isFirstRun: false,
          newItems: [],
          totalDiscovered: 0,
        };
      }),
      fetchSiteContent("openai", webState).catch((err): WebFetchResult => {
        console.error(`  [web/openai] fetch failed: ${err}`);
        return { site: "openai", siteName: "OpenAI", isFirstRun: false, newItems: [], totalDiscovered: 0 };
      }),
    ]),
    fetchTrendingData().catch(
      (): TrendingData => ({
        trendingRepos: [],
        searchRepos: [],
        trendingFetchSuccess: false,
      }),
    ),
    fetchHnData().catch((): HnData => ({ stories: [], fetchSuccess: false })),
  ]);

  return { fetched, skillsData, webResults, trendingData, hnData };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

async function generateSummaries(
  fetchedCli: RepoFetch[],
  fetchedFirstPartyAgents: RepoFetch[],
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  fetchedPeers: RepoFetch[],
  trendingData: TrendingData,
  dateStr: string,
  lang: "zh" | "en" = "zh",
): Promise<{
  cliDigests: RepoDigest[];
  firstPartyDigests: RepoDigest[];
  skillsSummary: string;
  peerDigests: RepoDigest[];
  trendingSummary: string;
}> {
  const noActivity = lang === "en" ? "No activity in the last 24 hours." : "过去24小时无活动。";
  const summaryFailed = lang === "en" ? "⚠️ Summary generation failed." : "⚠️ 摘要生成失败。";
  const skillsFailed = lang === "en" ? "⚠️ Skills summary generation failed." : "⚠️ Skills 摘要生成失败。";
  const trendingNoData =
    lang === "en"
      ? "⚠️ Trending data unavailable, unable to generate report."
      : "⚠️ 今日趋势数据获取失败，无法生成报告。";
  const trendingFailed = lang === "en" ? "⚠️ Trending report generation failed." : "⚠️ 趋势报告生成失败。";

  const summarizeRepos = (repos: RepoFetch[], buildPrompt: (f: RepoFetch) => string) =>
    Promise.all(
      repos.map(async ({ cfg, issues, prs, releases }): Promise<RepoDigest> => {
        if (!issues.length && !prs.length && !releases.length) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: noActivity };
        }
        console.log(`  [${cfg.id}] Calling LLM for summary...`);
        try {
          const summary = await callLlm(buildPrompt({ cfg, issues, prs, releases }));
          return { config: cfg, issues, prs, releases, summary };
        } catch (err) {
          console.error(`  [${cfg.id}] LLM call failed: ${err}`);
          return { config: cfg, issues, prs, releases, summary: summaryFailed };
        }
      }),
    );

  const [cliDigests, firstPartyDigests, skillsSummary, peerDigests, trendingSummary] = await Promise.all([
    summarizeRepos(fetchedCli, (f) => buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, lang)),
    summarizeRepos(fetchedFirstPartyAgents, (f) =>
      buildPeerPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, 50, 30, lang),
    ),
    (async () => {
      console.log("  [claude-code-skills] Calling LLM for skills report...");
      try {
        return await callLlm(buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, lang));
      } catch (err) {
        console.error(`  [claude-code-skills] LLM call failed: ${err}`);
        return skillsFailed;
      }
    })(),
    summarizeRepos(fetchedPeers, (f) =>
      buildPeerPrompt(f.cfg, f.issues, f.prs, f.releases, dateStr, undefined, undefined, lang),
    ),
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) return trendingNoData;
      console.log("  [trending] Calling LLM for trending report...");
      try {
        return await callLlm(buildTrendingPrompt(trendingData, dateStr, lang), 6144);
      } catch (err) {
        console.error(`  [trending] LLM call failed: ${err}`);
        return trendingFailed;
      }
    })(),
  ]);

  return { cliDigests, firstPartyDigests, skillsSummary, peerDigests, trendingSummary };
}

// ---------------------------------------------------------------------------
// Report content builders
// ---------------------------------------------------------------------------

function buildCliReportContent(
  cliDigests: RepoDigest[],
  skillsSummary: string,
  comparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  lang: "zh" | "en" = "zh",
): string {
  const repoLinks =
    cliDigests.map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`).join("\n") +
    `\n- [Claude Code Skills](https://github.com/${CLAUDE_SKILLS_REPO})`;

  const t =
    lang === "en"
      ? {
          title: `# AI CLI Tools Community Digest ${dateStr}\n\n`,
          meta: `> Generated: ${utcStr} UTC | Tools covered: ${cliDigests.length}\n\n`,
          skillsHeading: `## Claude Code Skills Highlights`,
          skillsSource: `Source`,
          comparison: `## Cross-Tool Comparison\n\n`,
          detail: `## Per-Tool Reports\n\n`,
        }
      : {
          title: `# AI CLI 工具社区动态日报 ${dateStr}\n\n`,
          meta: `> 生成时间: ${utcStr} UTC | 覆盖工具: ${cliDigests.length} 个\n\n`,
          skillsHeading: `## Claude Code Skills 社区热点`,
          skillsSource: `数据来源`,
          comparison: `## 横向对比\n\n`,
          detail: `## 各工具详细报告\n\n`,
        };

  const skillsSection =
    `${t.skillsHeading}\n\n` +
    `> ${t.skillsSource}: [anthropics/skills](https://github.com/${CLAUDE_SKILLS_REPO})\n\n` +
    `${skillsSummary}\n\n---\n\n`;

  const toolSections = cliDigests
    .map((d) => {
      const skills = d.config.id === "claude-code" ? skillsSection : "";
      return [
        `<details>`,
        `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
        ``,
        skills + d.summary,
        ``,
        `</details>`,
      ].join("\n");
    })
    .join("\n\n");

  return (
    t.title +
    t.meta +
    `${repoLinks}\n\n` +
    `---\n\n` +
    t.comparison +
    comparison +
    `\n\n---\n\n` +
    t.detail +
    toolSections +
    footer
  );
}

function buildAgentReportContent(
  firstPartyDigests: RepoDigest[],
  peerDigests: RepoDigest[],
  peersComparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  lang: "zh" | "en" = "zh",
): string {
  const allDigests = [...firstPartyDigests, ...peerDigests];
  const totalIssues = allDigests.reduce((sum, d) => sum + d.issues.length, 0);
  const totalPrs = allDigests.reduce((sum, d) => sum + d.prs.length, 0);

  const repoLinks = allDigests
    .map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`)
    .join("\n");

  const detailSections = (digests: RepoDigest[]) =>
    digests
      .map((d) =>
        [
          `<details>`,
          `<summary><strong>${d.config.name}</strong> — <a href="https://github.com/${d.config.repo}">${d.config.repo}</a></summary>`,
          ``,
          d.summary,
          ``,
          `</details>`,
        ].join("\n"),
      )
      .join("\n\n");

  const t =
    lang === "en"
      ? {
          title: `# AI Agent Ecosystem Digest ${dateStr}\n\n`,
          meta: `> Issues: ${totalIssues} | PRs: ${totalPrs} | Projects covered: ${allDigests.length} | Generated: ${utcStr} UTC\n\n`,
          deepDive: `## First-Party Agent Deep Dives\n\n`,
          comparison: `## Cross-Ecosystem Comparison\n\n`,
          peers: `## Peer Project Reports\n\n`,
        }
      : {
          title: `# AI 智能体生态日报 ${dateStr}\n\n`,
          meta: `> Issues: ${totalIssues} | PRs: ${totalPrs} | 覆盖项目: ${allDigests.length} 个 | 生成时间: ${utcStr} UTC\n\n`,
          deepDive: `## 第一方重点项目深度报告\n\n`,
          comparison: `## 横向生态对比\n\n`,
          peers: `## 同赛道项目详细报告\n\n`,
        };

  return (
    t.title +
    t.meta +
    `${repoLinks}\n\n` +
    `---\n\n` +
    t.deepDive +
    detailSections(firstPartyDigests) +
    `\n\n---\n\n` +
    t.comparison +
    peersComparison +
    `\n\n---\n\n` +
    t.peers +
    detailSections(peerDigests) +
    footer
  );
}

// ---------------------------------------------------------------------------
// Report savers (LLM call + file save + optional GitHub issue)
// ---------------------------------------------------------------------------

async function saveWebReport(
  webResults: WebFetchResult[],
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: "zh" | "en" = "zh",
): Promise<boolean> {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);

  if (hasNewContent) {
    console.log(`  [web/${lang}] Calling LLM for web content report...`);
    try {
      const webSummary = await callLlm(buildWebReportPrompt(webResults, dateStr, lang), 8192);
      const isFirstRun = webResults.some((r) => r.isFirstRun);
      const totalNew = webResults.reduce((sum, r) => sum + r.newItems.length, 0);

      const anthropicNew = webResults.find((r) => r.site === "anthropic")?.newItems.length ?? 0;
      const anthropicTotal = webResults.find((r) => r.site === "anthropic")?.totalDiscovered ?? 0;
      const openaiNew = webResults.find((r) => r.site === "openai")?.newItems.length ?? 0;
      const openaiTotal = webResults.find((r) => r.site === "openai")?.totalDiscovered ?? 0;

      const fileName = reportFile("ai-web", lang);

      const t =
        lang === "en"
          ? {
              mode: isFirstRun ? "First full crawl" : "Today's update",
              title: `# Official AI Content Report ${dateStr}\n\n`,
              meta: `> ${isFirstRun ? "First full crawl" : "Today's update"} | New content: ${totalNew} articles | Generated: ${utcStr} UTC\n\n`,
              sources:
                `Sources:\n` +
                `- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicNew} new articles (sitemap total: ${anthropicTotal})\n` +
                `- OpenAI: [openai.com](https://openai.com) — ${openaiNew} new articles (sitemap total: ${openaiTotal})\n\n`,
            }
          : {
              mode: isFirstRun ? "首次全量" : "今日更新",
              title: `# AI 官方内容追踪报告 ${dateStr}\n\n`,
              meta: `> ${isFirstRun ? "首次全量" : "今日更新"} | 新增内容: ${totalNew} 篇 | 生成时间: ${utcStr} UTC\n\n`,
              sources:
                `数据来源:\n` +
                `- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 ${anthropicNew} 篇（sitemap 共 ${anthropicTotal} 条）\n` +
                `- OpenAI: [openai.com](https://openai.com) — 新增 ${openaiNew} 篇（sitemap 共 ${openaiTotal} 条）\n\n`,
            };

      const webContent = t.title + t.meta + t.sources + `---\n\n` + webSummary + footer;

      console.log(`  Saved ${saveFile(webContent, dateStr, fileName)}`);

      if (digestRepo) {
        try {
          const webTitle =
            lang === "en"
              ? `🌐 Official AI Content Report ${dateStr}${isFirstRun ? " (First Crawl)" : ""}`
              : `🌐 AI 官方内容追踪报告 ${dateStr}${isFirstRun ? "（首次全量）" : ""}`;
          const webLabel = lang === "en" ? "web-en" : "web";
          const webUrl = await createGitHubIssue(webTitle, webContent, webLabel);
          console.log(`  Created web issue (${lang}): ${webUrl}`);
        } catch (err) {
          console.error(`  [web/${lang}] Issue creation failed: ${err}`);
        }
      }
      return true;
    } catch (err) {
      console.error(`  [web/${lang}] Report generation failed: ${err}`);
      return false;
    }
  } else {
    console.log(`  [web/${lang}] No new content detected, skipping report.`);
    return true;
  }
}

async function saveTrendingReport(
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: "zh" | "en" = "zh",
): Promise<void> {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.log(`  [trending/${lang}] No data available, skipping report.`);
    return;
  }

  const fileName = reportFile("ai-trending", lang);
  const header =
    lang === "en"
      ? `# AI Open Source Trends ${dateStr}\n\n> Sources: GitHub Trending + GitHub Search API | Generated: ${utcStr} UTC\n\n---\n\n`
      : `# AI 开源趋势日报 ${dateStr}\n\n> 数据来源: GitHub Trending + GitHub Search API | 生成时间: ${utcStr} UTC\n\n---\n\n`;

  const trendingContent = header + trendingSummary + footer;

  console.log(`  Saved ${saveFile(trendingContent, dateStr, fileName)}`);

  if (digestRepo) {
    const trendingTitle =
      lang === "en" ? `📈 AI Open Source Trends ${dateStr}` : `📈 AI 开源趋势日报 ${dateStr}`;
    const trendingLabel = lang === "en" ? "trending-en" : "trending";
    const trendingUrl = await createGitHubIssue(trendingTitle, trendingContent, trendingLabel);
    console.log(`  Created trending issue (${lang}): ${trendingUrl}`);
  }
}

async function saveHnReport(
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: "zh" | "en" = "zh",
): Promise<void> {
  if (!hnData.fetchSuccess) {
    console.log(`  [hn/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [hn/${lang}] Calling LLM for HN report...`);
  try {
    const hnSummary = await callLlm(buildHnPrompt(hnData, dateStr, lang));
    const fileName = reportFile("ai-hn", lang);
    const header =
      lang === "en"
        ? `# Hacker News AI Community Digest ${dateStr}\n\n` +
          `> Source: [Hacker News](https://news.ycombinator.com/) | ` +
          `${hnData.stories.length} stories | Generated: ${utcStr} UTC\n\n` +
          `---\n\n`
        : `# Hacker News AI 社区动态日报 ${dateStr}\n\n` +
          `> 数据来源: [Hacker News](https://news.ycombinator.com/) | ` +
          `共 ${hnData.stories.length} 条 | 生成时间: ${utcStr} UTC\n\n` +
          `---\n\n`;

    const hnContent = header + hnSummary + footer;

    console.log(`  Saved ${saveFile(hnContent, dateStr, fileName)}`);

    if (digestRepo) {
      const hnTitle =
        lang === "en" ? `📰 Hacker News AI Digest ${dateStr}` : `📰 Hacker News AI 社区动态日报 ${dateStr}`;
      const hnLabel = lang === "en" ? "hn-en" : "hn";
      const hnUrl = await createGitHubIssue(hnTitle, hnContent, hnLabel);
      console.log(`  Created HN issue (${lang}): ${hnUrl}`);
    }
  } catch (err) {
    console.error(`  [hn/${lang}] Report generation failed: ${err}`);
  }
}

async function saveResearchReport(
  cliDigests: RepoDigest[],
  firstPartyDigests: RepoDigest[],
  peerDigests: RepoDigest[],
  skillsSummary: string,
  comparison: string,
  peersComparison: string,
  webResults: WebFetchResult[],
  trendingData: TrendingData,
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: "zh" | "en" = "zh",
): Promise<void> {
  console.log(`  [research/${lang}] Calling LLM for research priorities...`);
  const fileName = reportFile("ai-research", lang);
  const header =
    lang === "en"
      ? `# Research Priorities Digest ${dateStr}\n\n> Derived from the daily radar | Generated: ${utcStr} UTC\n\n---\n\n`
      : `# 研究优先级简报 ${dateStr}\n\n> 基于当日雷达综合生成 | 生成时间: ${utcStr} UTC\n\n---\n\n`;
  let researchSummary: string;

  try {
    researchSummary = await callLlm(
      buildResearchPriorityPrompt(
        cliDigests,
        firstPartyDigests,
        peerDigests,
        skillsSummary,
        comparison,
        peersComparison,
        webResults,
        trendingData,
        hnData,
        dateStr,
        lang,
      ),
      8192,
    );
  } catch (err) {
    console.error(`  [research/${lang}] Report generation failed, writing fallback report: ${err}`);
    researchSummary =
      lang === "en"
        ? "⚠️ Research-priority generation failed. The source daily radar reports were generated successfully, but the synthesis step did not complete. Re-run the workflow or inspect the daily reports directly."
        : "⚠️ 研究优先级生成失败。当日雷达源报告已成功生成，但综合分析步骤未完成。请重新运行 workflow，或直接查看当日各项日报。";
  }

  const content = header + researchSummary + footer;
  console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);
  if (digestRepo) {
    try {
      const title = lang === "en" ? `🧭 Research Priorities ${dateStr}` : `🧭 研究优先级简报 ${dateStr}`;
      const label = lang === "en" ? "research-en" : "research";
      const url = await createGitHubIssue(title, content, label);
      console.log(`  Created research issue (${lang}): ${url}`);
    } catch (err) {
      console.error(`  [research/${lang}] Issue creation failed: ${err}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");
  if (!hasLlmCredentials()) {
    throw new Error("Missing required environment variable: OPENAI_API_KEY");
  }

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  console.log(`[${now.toISOString()}] Starting digest | endpoint: ${getLlmBaseUrl()}`);

  const langs = (process.env["REPORT_LANGS"] ?? "en")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is ReportLang => s === "zh" || s === "en");
  const enabledLangs = langs.length > 0 ? langs : ["en"];
  const genZh = enabledLangs.includes("zh");
  const genEn = enabledLangs.includes("en");
  console.log(`  Languages: ${enabledLangs.join(", ")}`);

  // 1. Fetch all data in parallel
  const webState = loadWebState();
  const { fetched, skillsData, webResults, trendingData, hnData } = await fetchAllData(since, webState);

  const firstPartyIds = new Set(FIRST_PARTY_AGENTS.map((p) => p.id));
  const peerIds = new Set(PEER_AGENTS.map((p) => p.id));
  const fetchedCli = fetched.filter((f) => !firstPartyIds.has(f.cfg.id) && !peerIds.has(f.cfg.id));
  const fetchedFirstPartyAgents = fetched.filter((f) => firstPartyIds.has(f.cfg.id));
  const fetchedPeers = fetched.filter((f) => peerIds.has(f.cfg.id));

  // 2. Generate per-repo LLM summaries per language
  let zhSummaries: Awaited<ReturnType<typeof generateSummaries>> | undefined;
  let enSummaries: Awaited<ReturnType<typeof generateSummaries>> | undefined;
  await Promise.all([
    genZh
      ? generateSummaries(
          fetchedCli,
          fetchedFirstPartyAgents,
          skillsData,
          fetchedPeers,
          trendingData,
          dateStr,
          "zh",
        ).then((r) => (zhSummaries = r))
      : Promise.resolve(),
    genEn
      ? generateSummaries(
          fetchedCli,
          fetchedFirstPartyAgents,
          skillsData,
          fetchedPeers,
          trendingData,
          dateStr,
          "en",
        ).then((r) => (enSummaries = r))
      : Promise.resolve(),
  ]);

  // 3. Generate cross-repo comparisons per language
  let comparison = "";
  let peersComparison = "";
  let enComparison = "";
  let enPeersComparison = "";
  {
    const comparisonCalls: Promise<void>[] = [];
    if (genZh && zhSummaries) {
      comparisonCalls.push(
        Promise.all([
          callLlm(buildComparisonPrompt(zhSummaries.cliDigests, dateStr, "zh")),
          callLlm(
            buildPeersComparisonPrompt(zhSummaries.firstPartyDigests, zhSummaries.peerDigests, dateStr, "zh"),
          ),
        ]).then(([c, p]) => {
          comparison = c;
          peersComparison = p;
        }),
      );
    }
    if (genEn && enSummaries) {
      comparisonCalls.push(
        Promise.all([
          callLlm(buildComparisonPrompt(enSummaries.cliDigests, dateStr, "en")),
          callLlm(
            buildPeersComparisonPrompt(enSummaries.firstPartyDigests, enSummaries.peerDigests, dateStr, "en"),
          ),
        ]).then(([c, p]) => {
          enComparison = c;
          enPeersComparison = p;
        }),
      );
    }
    await Promise.all(comparisonCalls);
  }

  const footer = autoGenFooter("zh");
  const enFooter = autoGenFooter("en");

  // 4. Build + save all reports
  if (genZh && zhSummaries) {
    const digestContent = buildCliReportContent(
      zhSummaries.cliDigests,
      zhSummaries.skillsSummary,
      comparison,
      utcStr,
      dateStr,
      footer,
      "zh",
    );
    const agentDigestContent = buildAgentReportContent(
      zhSummaries.firstPartyDigests,
      zhSummaries.peerDigests,
      peersComparison,
      utcStr,
      dateStr,
      footer,
      "zh",
    );
    console.log(`  Saved ${saveFile(digestContent, dateStr, reportFile("ai-cli", "zh"))}`);
    console.log(`  Saved ${saveFile(agentDigestContent, dateStr, reportFile("ai-agents", "zh"))}`);
    if (digestRepo) {
      const cliUrl = await createGitHubIssue(
        `📊 AI CLI 工具社区动态日报 ${dateStr}`,
        digestContent,
        "digest",
      );
      console.log(`  Created CLI issue (zh): ${cliUrl}`);
      const agentDigestUrl = await createGitHubIssue(
        `🦾 AI 智能体生态日报 ${dateStr}`,
        agentDigestContent,
        "openclaw",
      );
      console.log(`  Created agent ecosystem issue (zh): ${agentDigestUrl}`);
    }
  }
  if (genEn && enSummaries) {
    const enDigestContent = buildCliReportContent(
      enSummaries.cliDigests,
      enSummaries.skillsSummary,
      enComparison,
      utcStr,
      dateStr,
      enFooter,
      "en",
    );
    const enAgentDigestContent = buildAgentReportContent(
      enSummaries.firstPartyDigests,
      enSummaries.peerDigests,
      enPeersComparison,
      utcStr,
      dateStr,
      enFooter,
      "en",
    );
    console.log(`  Saved ${saveFile(enDigestContent, dateStr, reportFile("ai-cli", "en"))}`);
    console.log(`  Saved ${saveFile(enAgentDigestContent, dateStr, reportFile("ai-agents", "en"))}`);
    if (digestRepo) {
      const cliEnUrl = await createGitHubIssue(
        `📊 AI CLI Tools Digest ${dateStr}`,
        enDigestContent,
        "digest-en",
      );
      console.log(`  Created CLI issue (en): ${cliEnUrl}`);
      const agentDigestEnUrl = await createGitHubIssue(
        `🦾 AI Agent Ecosystem Digest ${dateStr}`,
        enAgentDigestContent,
        "openclaw-en",
      );
      console.log(`  Created agent ecosystem issue (en): ${agentDigestEnUrl}`);
    }
  }

  // Save web reports, then persist web state exactly once
  const webStateSafeToPersist = await Promise.all([
    genZh ? saveWebReport(webResults, utcStr, dateStr, digestRepo, footer, "zh") : Promise.resolve(true),
    genEn ? saveWebReport(webResults, utcStr, dateStr, digestRepo, enFooter, "en") : Promise.resolve(true),
  ]);
  if (webStateSafeToPersist.every(Boolean)) {
    saveWebState(webState);
    console.log("  [web] State saved.");
  } else {
    console.log("  [web] State not saved because at least one requested web report failed.");
  }

  await Promise.all([
    genZh && zhSummaries
      ? saveTrendingReport(
          trendingData,
          zhSummaries.trendingSummary,
          utcStr,
          dateStr,
          digestRepo,
          footer,
          "zh",
        )
      : Promise.resolve(),
    genEn && enSummaries
      ? saveTrendingReport(
          trendingData,
          enSummaries.trendingSummary,
          utcStr,
          dateStr,
          digestRepo,
          enFooter,
          "en",
        )
      : Promise.resolve(),
    genZh ? saveHnReport(hnData, utcStr, dateStr, digestRepo, footer, "zh") : Promise.resolve(),
    genEn ? saveHnReport(hnData, utcStr, dateStr, digestRepo, enFooter, "en") : Promise.resolve(),
    genZh && zhSummaries
      ? saveResearchReport(
          zhSummaries.cliDigests,
          zhSummaries.firstPartyDigests,
          zhSummaries.peerDigests,
          zhSummaries.skillsSummary,
          comparison,
          peersComparison,
          webResults,
          trendingData,
          hnData,
          utcStr,
          dateStr,
          digestRepo,
          footer,
          "zh",
        )
      : Promise.resolve(),
    genEn && enSummaries
      ? saveResearchReport(
          enSummaries.cliDigests,
          enSummaries.firstPartyDigests,
          enSummaries.peerDigests,
          enSummaries.skillsSummary,
          enComparison,
          enPeersComparison,
          webResults,
          trendingData,
          hnData,
          utcStr,
          dateStr,
          digestRepo,
          enFooter,
          "en",
        )
      : Promise.resolve(),
  ]);

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
