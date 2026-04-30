# AI CLI Tools Community Digest 2026-04-30

> Generated: 2026-04-30 14:11 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# AI CLI Tools Cross‑Comparison Report — 2026-04-30

## 1. Ecosystem Overview
The AI CLI tools landscape is rapidly maturing, with seven major projects shipping fixes, new releases, or architectural overhauls on a single day. Communities are vocal and emotionally invested, driving demands for persistent context, granular security controls, and seamless multi‑provider support. Stability and user experience (especially around copy/paste, shortcuts, and long‑session reliability) remain top friction points, while ACP protocol integration is emerging as a baseline expectation for editor interoperability. The volume of pull requests—from massive refactors to specialised quality-of-life tweaks—demonstrates that teams are iterating aggressively to meet these demands.

## 2. Activity Comparison (2026‑04‑30)

| Tool                 | Issues with activity today | PRs updated today | Release status (last 24h)                              |
|----------------------|-----------------------------|-------------------|---------------------------------------------------------|
| Claude Code          | 10                          | 6                 | No new release                                          |
| OpenAI Codex         | 2                           | 18                | Rust SDK alpha increments only; no stable binary release |
| Gemini CLI           | 10                          | 10                | v0.42.0‑nightly (transient‑error handling, repo‑bot)     |
| GitHub Copilot CLI   | 10                          | 2                 | v1.0.40‑0 (agent switching, slash‑command ranking)      |
| Kimi Code CLI        | 9                           | 9                 | 1.41.0 (clipboard paste, .zip plugin install)            |
| OpenCode             | 10                          | 10                | v1.14.30 (Desktop session fix, DeepSeek/Mistral compat)  |
| Qwen Code            | 10                          | 10                | v0.15.6 + previews (SubAgent UI fixes, todo panel)       |

*“Issues with activity” counts the number of distinct issues highlighted in each digest as having comments, upvotes, or status changes today. PR counts reflect all pull requests reported as updated, including both open and merged work.*

## 3. Shared Feature Directions
Requirements appearing across multiple tool communities from today’s digests:

- **Persistent memory and cross‑session context**  
  *Kimi Code* (#1283 Memory System), *Qwen Code* (auto‑memory recall, async decoupling), *Gemini CLI* (compression summary persistence in #21345). Users want AI to remember long‑term project knowledge without blocking turns.

- **Granular permission and auto‑approval controls**  
  *GitHub Copilot CLI* (directory allow‑lists #3050, double‑confirmation problem #2643, per‑tool policies #1971), *Gemini CLI* (permission fatigue #24916), *Kimi Code* (tool‑call whitelisting #2120). Coarse‑grained all‑or‑nothing approvals are no longer sufficient.

- **Reliable non‑interactive and headless modes**  
  *Copilot CLI* (slash commands in ACP #1044, `‑‑agent` + plugin dir #2795, MCP sampling in `‑p` #2882), *Claude Code* (missing `‑‑remote‑control` docs #54943), *Qwen Code* (non‑interactive error formatting #3749). Scripting and CI/CD workflows demand consistent behaviour when no human is present.

- **Cross‑platform robustness and standard UX**  
  *OpenCode* (Ctrl+C exit conflict #7957, paste broken #10780, Windows path mismatches #21340), *Kimi Code* (Shift+Enter newline #2121, default shell /bin/sh #2122), *Claude Code* (CJK Enter‑as‑send #2054), *Gemini CLI* (PowerShell compatibility #25900, SSH terminal corruption). Users expect OS‑native shortcuts and reliable behaviour on Windows/Linux/macOS.

- **Long‑session stability and context‑window management**  
  *OpenAI Codex* (crash on >500 MB session #20269), *Qwen Code* (input length 400 error #3652, VS Code ignores compression settings #3426), *Claude Code* (stream idle timeout #46987, hangs for minutes #26224). Extended agent tasks must not degrade into data loss or silent truncation.

- **Third‑party provider and multi‑model compatibility**  
  *OpenCode* (DeepSeek reasoning round‑trip #25110, Mistral reasoning, GLM JSON parse failure #23442), *Qwen Code* (DeepSeek v4 API 400 #3772), *Claude Code* (dynamic context window for MiniMax #46416), *Copilot CLI* (custom provider via ACP #3048). Lock‑in to a single model family is being actively rejected by developers.

## 4. Differentiation Analysis
Each tool carves a distinct niche:

- **Claude Code** emphasises **conversational companion experience** (the `/buddy` fervour) and a **plugin/hook ecosystem** (`hookify`, global rules). Its community is emotionally attached, treating the tool as a personal assistant rather than just a utility.

- **OpenAI Codex** focuses on **deep permission‑model correctness** (the sweeping `SandboxPolicy` → `PermissionProfile` migration) and supporting long‑running agent sessions on desktop. The heavy internal refactor signals an enterprise‑grade stability push.

- **Gemini CLI** is tightly integrated with **Google Cloud / Vertex AI**, delivering nightly releases with features like transient‑error recovery and a codebase‑investigator subagent. Its target user is the Google ecosystem developer who values frequent iteration and cloud‑native tooling.

- **GitHub Copilot CLI** builds on the **ACP protocol** to enable agent switching, slash commands, and editor integrations (Zed, VS Code). It prioritises non‑interactive workflows, CI pipelines, and org‑wide configuration for GitHub‑centric teams.

- **Kimi Code CLI** is the **Moonshot AI partner**, with a rising focus on **persistent memory**, ACP session replay, and compatibility with Chinese desktop environments (headless Linux clipboard, Windows Terminal paste). Its user base seems aligned with the Kimi model ecosystem.

- **OpenCode** is a **hacker‑friendly, multi‑provider hub** that exposes low‑level controls like skills serialisation (XML/JSON/Markdown) and supports a wide range of LLMs (OpenAI, DeepSeek, Mistral, GLM). Its heavy community involvement and TUI/Desktop flexibility make it a favourite for those who want to self‑configure everything.

- **Qwen Code** targets **Qwen model power users** with advanced context management (auto‑compression, enforce‑read‑before‑write), memory extraction, and subagent UI polish. It’s rapidly evolving to handle marathon coding sessions and IDE extension parity.

## 5. Community Momentum & Maturity
- **Most emotionally engaged:** Claude Code — a single feature‑restoration request (#45596) drew over 1,000 upvotes and 225 comments, showing an intensely loyal user base that treats the CLI as a primary workspace. However, only 6 PRs were merged today and no release was shipped, suggesting a slower development cadence compared to peers.
- **Most internally active:** OpenAI Codex landed 18 PRs in a single day for a major architecture cleanup. While community‑driven issues are sparse (only 2 active today), the internal refactor momentum indicates a strong push toward production hardening.
- **Fastest iteration loops with community responsiveness:** OpenCode, Gemini CLI, and Qwen Code each balanced 10 issues and 10 PRs today, and all shipped releases. OpenCode in particular has a high upvote count on usability issues (30 on Ctrl+C), reflecting a large, vocal user base that directly influences priorities.
- **Steady, integration‑focused momentum:** Copilot CLI and Kimi Code maintain moderate but consistent community interaction, with Copilot delivering significant feature updates (agent switching, slash command ranking) and Kimi steadily closing gaps in ACP support and headless use.
- **Maturity signals:** The presence of nightly release channels (Gemini, Qwen), SDK alpha tags (OpenAI Codex), and structured community‑sourced feature requests (OpenCode’s `skills.format`, Copilot’s shell completions) shows that several projects have established DevOps‑mature rhythms and are ready for integration into professional pipelines.

## 6. Trend Signals
Key industry signals extracted from today’s community feedback:

- **Persistent, async memory is becoming non‑negotiable.** Developers expect agents to remember context across sessions without blocking every turn. Tools that lag on this will face churn.
- **Granular trust boundaries are a prerequisite for enterprise adoption.** Directory‑level allowlists, per‑tool policies, and non‑interactive safe‑mode are shifting from “nice‑to‑have” to “must‑have” as agents gain more filesystem and execution power.
- **The ACP protocol is consolidating as the standard for editor integration.** Multiple communities are building around ACP for session replay, slash commands, and agent switching; tools that do not fully implement ACP risk being isolated from the IDE ecosystem.
- **Cross‑provider compatibility is a competitive differentiator.** Users want to mix models (DeepSeek, GLM, Mistral, MiniMax) without breaking tooling. First‑class support for third‑party providers and non‑OpenAI/Google APIs is now a baseline expectation.
- **Long‑session reliability (10+ hours) is a critical benchmark.** Crashes, context‑window overflows, and silent truncations destroy trust. The industry is moving toward bullet‑proof state management, automatic compression, and graceful degradation for heavy‑use scenarios.
- **Standard OS interaction patterns (copy/paste/newline) must work flawlessly.** The vehement reaction to Ctrl+C‑as‑exit (OpenCode) and Enter‑as‑send (Claude Code) shows that violating platform conventions is a major adoption blocker. Tools that fail here will be abandoned, no matter how sophisticated the AI.

*For decision‑makers, these signals suggest favouring tools that demonstrate mature cross‑platform handling, robust session management, and open integration protocols, while watching which communities succeed in delivering memory, multi‑provider, and trust‑control features in the coming months.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
**Period ending: 2026-04-30 | Source: [anthropics/skills](https://github.com/anthropics/skills)**

*Note: PR comment counts were unavailable in the source data; ranking prioritizes update recency, skill ambition, and cross-referenced community activity as proxy signals for attention.*

---

## 1. Top Skills Ranking

| # | PR | Skill | Status | Last Activity | Signal |
|---|----|-------|--------|---------------|--------|
| 1 | [#568](https://github.com/anthropics/skills/pull/568) | **ServiceNow Platform** | OPEN | 2026-04-23 | Most ambitious pending skill |
| 2 | [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | OPEN | 2026-04-21 | Matches top community demand |
| 3 | [#538](https://github.com/anthropics/skills/pull/538) | **fix(pdf): case-sensitivity** | OPEN | 2026-04-29 | Most recently touched PR |
| 4 | [#486](https://github.com/anthropics/skills/pull/486) | **ODT skill** | OPEN | 2026-04-14 | ISO-standard document support |
| 5 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | OPEN | 2026-03-13 | Unique quality-control niche |
| 6 | [#806](https://github.com/anthropics/skills/pull/806) | **sensory (macOS AppleScript)** | OPEN | 2026-04-02 | Native OS automation |
| 7 | [#616](https://github.com/anthropics/skills/pull/616) | **HADS document standard** | OPEN | 2026-03-31 | Human-AI dual-reader docs |
| 8 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design clarity** | OPEN | 2026-03-07 | Improves existing official skill |

### Skill Details

**1. [#568 ServiceNow Platform](https://github.com/anthropics/skills/pull/568)** — @Vanka07
Broadest pending skill submission. Covers ITSM, ITOM, ITAM/SAM Pro, FSM, HRSD/CSM, SPM/PPM, Vulnerability Response, Security Incident Response, and IntegrationHub. Positioned as a platform-wide assistant rather than a narrow scripting helper. Continues to receive updates 6+ weeks after submission, suggesting active iteration based on reviewer feedback.

**2. [#723 testing-patterns](https://github.com/anthropics/skills/pull/723)** — @4444J99
Comprehensive testing skill spanning the Testing Trophy model, unit testing (AAA pattern), React component testing via Testing Library, integration/E2E testing, test data factories, and explicit guidance on what *not* to test. Directly addresses a gap frequently mentioned in community discussions — AI-generated code lacks systematic test coverage instincts.

**3. [#538 fix(pdf): case-sensitive references](https://github.com/anthropics/skills/pull/538)** — @Lubrsy706
Targeted bugfix correcting 8 case-sensitivity mismatches in `skills/pdf/SKILL.md` where uppercase references (`REFERENCE.md`, `FORMS.md`) break on case-sensitive filesystems. The most recently updated PR in the entire repository (April 29), indicating active maintainer engagement. @Lubrsy706 also authored two related quality-focused PRs (#539, #541).

**4. [#486 ODT skill](https://github.com/anthropics/skills/pull/486)** — @GitHubNewbie0
Brings OpenDocument Format (.odt, .ods) creation, template filling, reading, and ODT→HTML conversion to Claude. Fills the ISO-standard document gap alongside existing DOCX/PDF skills. Triggers on mentions of "ODT", "ODS", "ODF", "OpenDocument", or "LibreOffice document."

**5. [#514 document-typography](https://github.com/anthropics/skills/pull/514)** — @PGTBoos
A quality-control skill preventing three common AI-generated document defects: orphan word wrap (1–6 words spilling onto next line), widow paragraphs (headers stranded at page bottom), and numbering misalignment. The author notes these issues "affect every document Claude generates" and users rarely think to ask for fixes explicitly. A rare *proactive quality* skill rather than a generative one.

**6. [#806 sensory — macOS AppleScript automation](https://github.com/anthropics/skills/pull/806)** — @AdelElo13
Teaches Claude to use `osascript` for native macOS automation as an alternative to screenshot-based computer use. Two-tier permission model: Tier 1 works out-of-box (direct app scripting), Tier 2 requires Accessibility permissions for System Events UI automation. Represents a growing interest in OS-native agent capabilities.

**7. [#616 HADS — Human-AI Document Standard](https://github.com/anthropics/skills/pull/616)** — @catcam
A lightweight Markdown convention for writing technical documentation that serves both human and AI readers from a single file. Addresses the emerging reality that AI models increasingly read documentation before humans do, eliminating the need for dual documentation maintenance.

**8. [#210 frontend-design improvements](https://github.com/anthropics/skills/pull/210)** — @justinwetch
Revises the existing frontend-design skill for clarity and actionability, ensuring every instruction is executable within a single conversation. Focuses on specific, steerable guidance rather than abstract principles.

---

## 2. Community Demand Trends

Distilled from the 13 Issues (88 total comments across all discussions):

| Trend | Key Issues | Comments | 👍 |
|-------|-----------|----------|-----|
| **Org-wide collaboration & sharing** | [#228](https://github.com/anthropics/skills/issues/228) | 9 | 6 |
| **Ecosystem integrity & deduplication** | [#189](https://github.com/anthropics/skills/issues/189), [#492](https://github.com/anthropics/skills/issues/492) | 9 | 9 |
| **skill-creator tooling gaps** | [#202](https://github.com/anthropics/skills/issues/202), [#556](https://github.com/anthropics/skills/issues/556), [#532](https://github.com/anthropics/skills/issues/532) | 16 | 8 |
| **Cross-platform compatibility** | [#29](https://github.com/anthropics/skills/issues/29) (Bedrock), [#16](https://github.com/anthropics/skills/issues/16) (MCP) | 8 | 0 |
| **Operational reliability** | [#62](https://github.com/anthropics/skills/issues/62) (skills disappearing), [#61](https://github.com/anthropics/skills/issues/61) (404 errors) | 13 | 1 |

**Key takeaways:**
- **Enterprise sharing is the #1 demand** — users want org-level skill libraries, not manual .skill file transfers via Slack/Teams.
- **Trust boundary concerns are growing** — community skills distributed under the `anthropic/` namespace create impersonation risks ([#492](https://github.com/anthropics/skills/issues/492)).
- **skill-creator needs substantial rework** — the eval pipeline has a 0% trigger rate ([#556](https://github.com/anthropics/skills/issues/556)), the description optimizer requires unavailable API keys for SSO users ([#532](https://github.com/anthropics/skills/issues/532)), and the skill itself reads as documentation rather than executable instruction ([#202](https://github.com/anthropics/skills/issues/202)).
- **MCP exposure** ([#16](https://github.com/anthropics/skills/issues/16)) and **Bedrock compatibility** ([#29](https://github.com/anthropics/skills/issues/29)) signal demand for skills to transcend the Claude Code/Claude.ai boundary.

---

## 3. High-Potential Pending Skills

These open PRs show sustained activity and address clear community gaps — strong candidates for near-term merge:

| PR | Skill | Potential Impact |
|----|-------|-----------------|
| [#568](https://github.com/anthropics/skills/pull/568) | ServiceNow Platform | Enterprise workflow automation; covers the entire ServiceNow suite |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | Directly addresses AI code quality; full-stack testing guidance |
| [#486](https://github.com/anthropics/skills/pull/486) | ODT creation & parsing | ISO-standard document format; complements existing DOCX/PDF skills |
| [#806](https://github.com/anthropics/skills/pull/806) | macOS AppleScript automation | OS-native agent capability; reduces reliance on screenshot-based approaches |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | Proactive quality control; catches issues users don't know to ask about |
| [#616](https://github.com/anthropics/skills/pull/616) | HADS document standard | Forward-looking: optimizes docs for AI-first consumption |
| [#664](https://github.com/anthropics/skills/pull/664) | claude-obsidian-reporter | Bridges Git history → Obsidian knowledge management; daily/weekly/monthly auto-reports |
| [#147](https://github.com/anthropics/skills/pull/147) | codebase-inventory-audit | Systematic orphaned code detection, documentation gap analysis, infrastructure bloat identification |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is for skills that operate as *infrastructure* rather than *tools* — organization-wide sharing, namespace trust guarantees, cross-platform compatibility, and skill-authoring pipelines that actually work — because the current ecosystem has outgrown its single-player origins and users are now building production workflows on top of it.**

---

# Claude Code Community Digest — 2026-04-30

## Today’s Highlights
The community’s overwhelming call to restore the `/buddy` feature dominates discussion, amassing over 1,000 thumbs-up and 225 comments in just three weeks. Alongside that, multiple critical stability and billing issues are lighting up the tracker, while recent pull requests focus on fixing silent bugs in the `hookify` system and delivering new community plugins.

---

## Hot Issues

1. **#45596 — Bring Back Buddy – A Consolidated Plea from the Community**  
   [🔗 #45596](https://github.com/anthropics/claude-code/issues/45596)  
   *225 comments · 👍 1,003*  
   The sudden removal of `/buddy` in v2.1.97 without a changelog entry sparked a massive emotional response. Thousands of users found their status-line companion missing with no explanation. This is the top-voted issue in the repository and shows a deep attachment to the feature.

2. **#46987 — API Error: Stream idle timeout – partial response received**  
   [🔗 #46987](https://github.com/anthropics/claude-code/issues/46987)  
   *165 comments · 👍 155*  
   A widespread `Stream idle timeout` error is causing partial responses and interrupted workflows, hitting users repeatedly across multiple days. The high comment count reflects severe day-to-day friction for many developers.

3. **#26224 — Claude Code hanging / freezing for 5–20+ minutes**  
   [🔗 #26224](https://github.com/anthropics/claude-code/issues/26224)  
   *93 comments · 👍 117*  
   An urgent, long‑standing bug where prompts lock up for tens of minutes. Despite being open since February, it continues to draw frustrated reports, indicating a persistent and serious reliability problem.

4. **#36151 — Multi‑account switching in Claude Mobile without shared email**  
   [🔗 #36151](https://github.com/anthropics/claude-code/issues/36151)  
   *51 comments · 👍 164*  
   A highly‑requested feature for seamless account switching on mobile. With 164 thumbs‑up, it’s one of the strongest enhancement signals, especially from users juggling work and personal accounts.

5. **#37747 — MCP OAuth regression: client metadata `redirect_uris` missing port**  
   [🔗 #37747](https://github.com/anthropics/claude-code/issues/37747)  
   *13 comments · 👍 41*  
   A critical breakage for all MCP OAuth providers that advertise `client_id_metadata_document_supported`. Starting in v2.1.80, the portless `redirect_uri` causes authentication failures, blocking any MCP server that relies on the metadata document.

6. **#2054 — Insert new line with Enter instead of sending (CJK input)**  
   [🔗 #2054](https://github.com/anthropics/claude-code/issues/2054)  
   *17 comments · 👍 73*  
   A longstanding pain point for CJK users, where the Enter key inadvertently sends incomplete messages. The high vote count shows a clear demand for an optional newline‑on‑Enter behaviour.

7. **#52472 — Weekly usage limit reset occurring before scheduled reset time**  
   [🔗 #52472](https://github.com/anthropics/claude-code/issues/52472)  
   *15 comments · 👍 2*  
   Users report their weekly limit resetting days early, shifting the end‑of‑week unexpectedly. This undermines usage planning and correlates with a cluster of billing‑related complaints surfacing this week.

8. **#45390 — 1M context requires ‘Extra usage’ on Max plan**  
   [🔗 #45390](https://github.com/anthropics/claude-code/issues/45390)  
   *11 comments · 👍 15*  
   Max plan subscribers are told they need extra usage for the 1M‑context model, even though it should be included. This misleading prompt causes confusion and forces needless workarounds.

9. **#53940 — Cowork Edit/Write tools silently truncate files**  
   [🔗 #53940](https://github.com/anthropics/claude-code/issues/53940)  
   *3 comments · 👍 0*  
   A newly reported deterministic bug where the Cowork editing tools impose an invisible buffer cap, silently truncating file content. Even with low immediate comments, the data‑loss potential makes it critical.

10. **#49849 — `settings.json` stale‑write clobber disables installed plugins**  
    [🔗 #49849](https://github.com/anthropics/claude-code/issues/49849)  
    *4 comments · 👍 0*  
    Follow‑up to an earlier stale‑write issue; the config file is silently overwritten, deactivating installed plugins without warning. This breaks local setups and erodes trust in configuration persistence.

---

## Key PR Progress
*Only 6 pull requests were updated in the last 24 hours; all are open and noteworthy:*

1. **#54873 — fix(hookify): replace hand‑rolled YAML parser + fix `new_text` field on Write**  
   [🔗 #54873](https://github.com/anthropics/claude-code/pull/54873)  
   Fixes two silent hookify bugs: a custom YAML parser that double‑escaped backslashes, and a missing `new_text` field in the Write tool’s output. Validated against 39 regression test cases.

2. **#54749 — feat(hookify): load rules from `~/.claude` global location**  
   [🔗 #54749](https://github.com/anthropics/claude-code/pull/54749)  
   Allows developers to define hookify rules once in `~/.claude` and share them across all projects, with project‑local rules taking precedence.

3. **#54777 — feat(plugins): add export‑session plugin (md/json/txt/docx/pdf)**  
   [🔗 #54777](https://github.com/anthropics/claude-code/pull/54777)  
   Introduces a new plugin that reads the session transcript directly (no extra model tokens) and exports to multiple formats, including selective export with `--last N`.

4. **#20448 — Add web4‑governance plugin for AI governance with R6 workflow**  
   [🔗 #20448](https://github.com/anthropics/claude-code/pull/20448)  
   A community contribution for trust‑native infrastructure, adding T3 trust tensors, entity witnessing, and R6 audit trails for AI governance.

5. **#54741 — docs: clarify `claude` command purpose in README**  
   [🔗 #54741](https://github.com/anthropics/claude-code/pull/54741)  
   Small documentation improvement that reduces ambiguity for first‑time users by explicitly stating that running `claude` opens Claude Code.

6. **#41611 — add the missing source to Claude Code**  
   [🔗 #41611](https://github.com/anthropics/claude-code/pull/41611)  
   A contributor adds a previously missing source file; details are sparse but likely a maintenance fix.

---

## Feature Request Trends
- **Restore /buddy** – The overwhelming vote on #45596 demonstrates that a conversational companion/agent is a “must‑have” for many power users, not a niche toy.  
- **Multi‑account and workspace switching** (#36151) – Users want seamless account switching on mobile and desktop without shared email, reflecting real‑world usage across personal and work contexts.  
- **Input ergonomics** (#2054) – The ability to bind Enter to newline (rather than send) is a long‑standing demand, especially from CJK developers and those accustomed to multi‑line chat UIs.  
- **Smarter background agents and notifications** (#54994) – “Notify me” from routines would allow scheduled agent tasks to deliver results without constant monitoring.  
- **Third‑party provider compatibility** (#46416) – Developers using Anthropic‑compatible APIs (e.g., MiniMax) request dynamic context‑window detection, not a hardcoded fallback.  
- **Model‑based issue triage** (#55006, closed) – A proposal to replace the text‑similarity duplicate‑detection bot with semantic triage, hinting at a desire for more intelligent repository management.

---

## Developer Pain Points
1. **Stability and responsiveness** – Stream idle timeouts (#46987) and multi‑minute hangs (#26224) remain the most frustrating day‑to‑day issues, blocking work and eroding trust.  
2. **Billing and usage‑limit confusion** – A cluster of reports (#52472, #54714, #54755, #54974, #45390) shows weekly resets shifting unpredictably, daily caps tightening silently, and the Max plan mis‑reporting extra usage for 1M context. Developers feel they can’t reliably plan their usage.  
3. **Plugin and hook fragility** – Settings files are silently overwritten, disabling plugins (#49849); hook scripts aren’t reloaded by `/reload-plugins` (#55008); and plugin skill frontmatter (`context: fork + agent:`) is ignored (#49559).  
4. **Silent data corruption** – Cowork Edit/Write tools can truncate files without warning (#53940), a critical integrity risk.  
5. **MCP OAuth regressions** – Multiple OAuth providers are broken due to a missing port in the redirect URI (#37747, #55002), making it impossible to connect essential MCP servers.  
6. **Documentation gaps** – The `--remote-control` flag doesn’t appear in `--help` (#54943), causing confusion for automation users.  

---

*No new releases were published in the last 24 hours.*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest – 2026-04-30

## 1. Today’s Highlights
The repository saw the largest single-author refactor push in weeks, with **18 PRs from @bolinfest** systematically eliminating the legacy `SandboxPolicy` in favour of the modern `PermissionProfile` across CLI, MCP, TUI, telemetry, and test harnesses. Meanwhile, two platform‑stability bugs drew attention: a macOS Git‑trash regression (closed) and a Windows crash on large session rollouts (open), both directly impacting power users running long‑lived agent tasks.

## 2. Releases
- **Rust SDK `v0.128.0-alpha.1`** – tagged as `rust-v0.128.0-alpha.1`; no release notes published.
- **Rust SDK `v0.126.0-alpha.17`** and **`v0.126.0-alpha.16`** – additional alpha increments, presumably routine fixes and API adjustments.

The main Codex Desktop & CLI binaries did not ship new stable builds today; the Rust SDK increments suggest ongoing preparation for upstream consumer support.

## 3. Hot Issues
Because only two issues were active in the last 24 hours, both are listed below.

1. **[#16820] [CLOSED] Codex Desktop spawns Git on launch and leaves massive `tmp_pack_`/`tmp_obj_` garbage in `.git/objects` on macOS**  
   *Author:* @ukeich | *5 comments*  
   **Why it matters:** macOS Tahoe users running `Codex Version 26.325.31654` found that simply starting the desktop app triggered a read‑only Git process that dumped hundreds of temporary pack/object files into `.git/objects`, bloating repositories. The bug made git operations on those repos extremely slow and risked pushing garbage to remotes. Community reaction was focused on workarounds (`.gitignore` tweaks) and a fix that appears to have landed and closed the issue today.

2. **[#20269] [OPEN] Codex Desktop becomes unrecoverable on launch when the most recent session rollout exceeds ~500 MB**  
   *Author:* @raederhans | *2 comments*  
   **Why it matters:** A long‑running agent task (~20 hours, ~3,300 turns) produced a session rollout file >500 MB. On subsequent launches, Codex Desktop (Windows 11 Pro, `26.422.8496.0_x64`) fails to load and enters an unrecoverable state, forcing users to manually delete session data. This blocks experienced users who rely on extended, context‑heavy conversations. The issue is newly reported and has already drawn attention from maintainers.

## 4. Key PR Progress
The following ten pull requests represent the most significant pieces of the sweeping `SandboxPolicy` → `PermissionProfile` migration. All were opened today by @bolinfest and are part of a coordinated stack.

| PR | Title | Significance |
|----|-------|--------------|
| [#20430](https://github.com/openai/codex/pull/20430) | `turn-context: stop writing legacy sandbox policy` | Stops new turn‑context entries from writing `sandbox_policy` when `permission_profile` is present, marking the legacy field as deprecated. |
| [#20422](https://github.com/openai/codex/pull/20422) | `mcp: send sandbox metadata as permission profile only` | Removes the legacy `sandboxPolicy` field from MCP sandbox‑state metadata, trusting servers to use the canonical `permissionProfile`. |
| [#20412](https://github.com/openai/codex/pull/20412) | `windows setup: derive sandbox from permission profile` | Moves legacy‑to‑profile conversion inside Windows sandbox APIs, isolating old abstractions to the platform boundary. |
| [#20410](https://github.com/openai/codex/pull/20410) | `windows read grants: accept permission profiles` | Removes the need for callers to materialize a `SandboxPolicy` when refreshing Windows read‑root grants. |
| [#20407](https://github.com/openai/codex/pull/20407) | `approval tests: configure scenarios with permission profiles` | Shifts the large integration‑test matrix from `SandboxPolicy`-based scenarios directly to `PermissionProfile`, making tests more representative of the new runtime path. |
| [#20406](https://github.com/openai/codex/pull/20406) | `tui: hydrate thread permissions from profiles` | The TUI now hydrates session state from `permissionProfile` payloads, removing the last remote‑mode fallback that reconstructed a profile from the legacy policy. |
| [#20404](https://github.com/openai/codex/pull/20404) | `rollout tests: seed turn contexts from permission profiles` | Eliminates the last test‑only dependency on `SandboxPolicy::new_read_only_policy()` in rollout recorder tests. |
| [#20403](https://github.com/openai/codex/pull/20403) | `state: extract rollout permissions from profiles` | State extraction now uses `permission_profile` to summarise thread metadata, preventing stale sandbox summaries from newer rollouts. |
| [#20400](https://github.com/openai/codex/pull/20400) | `otel: report conversation permissions from profiles` | Telemetry no longer forces callers to compute a `SandboxPolicy` projection; it consumes `PermissionProfile` directly. |
| [#20398](https://github.com/openai/codex/pull/20398) | `protocol: drop cwd-less legacy profile constructor` | Removes the unsafe constructor `PermissionProfile::from_legacy_sandbox_policy()` that omitted `cwd`, closing a common migration trap. |

These PRs collectively remove hundreds of references to the legacy sandbox, hardening the permission model and reducing maintenance burden across the entire codebase.

## 5. Feature Request Trends
No explicit feature requests appeared in the last 24 hours. However, the two active issues implicitly push for:
- **Better large‑session handling:** Users expect Codex Desktop to gracefully handle session rollouts of any size, with clear warnings, fallback loading, or automatic archiving rather than an unrecoverable crash.
- **Less intrusive Git interaction:** The macOS bug exposed a desire for the app to avoid touching repository internals unless explicitly authorised, and to clean up any temporary objects it creates.

## 6. Developer Pain Points
- **macOS Git bloat (#16820):** Codex Desktop’s read‑only Git spawn left behind undeleted `tmp_pack_*`/`tmp_obj_*` files, which bloated repositories and interfered with everyday Git operations. Although closed, the episode highlighted a fragility in how the app inspects working copies.
- **Windows large‑session crash (#20269):** Power users who run multi‑hour agent sessions find the app completely unusable after a restart. Manually clearing session data is the only current workaround—an unacceptable experience for a production tool.
- **Legacy sandbox abstraction overhead:** The sheer volume of PRs today underscores that `SandboxPolicy` had metastasised across the codebase, creating tight coupling and making it difficult to introduce the newer, more expressive `PermissionProfile`. The ongoing migration is a direct response to this technical debt, and its rapid pace suggests it has been a long‑standing frustration for the team.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-04-30

## Today’s Highlights
A productive day for the CLI with a new nightly release shipping smarter transient-error handling and an automated repo-analysis bot. Community discussion peaked on the 429/capacity tracking issue (63 comments), while several high-impact PRs landed fixes for shell output limits, Windows PowerShell compatibility, and security-hardened temp file permissions.

## Releases
**v0.42.0-nightly.20260429.g6d9911393**  
- **Transient errors no longer terminal** – Policy update so non-permanent failures are not incorrectly marked as terminal, improving recovery during long sessions.  
- **New repo-management bot** – Internal tooling that performs time-series metric analysis and suggests repository improvements, helping maintainers spot trends.  
[Compare changes](https://github.com/google-gemini/gemini-cli/releases/tag/v0.42.0-nightly.20260429.g6d9911393)

## Hot Issues (10 noteworthy)
1. **#24937 – Tracking: 429 / Capacity Issues** (63 comments)  
   Centralised tracking for widespread “Too Many Requests” errors. Many users hitting rate limits; high frustration and demand for better retry/backoff logic.  
   [Issue #24937](https://github.com/google-gemini/gemini-cli/issues/24937)

2. **#25099 – Defense techniques** (9 comments)  
   User-submitted agent defence scripts (`rag_defense_sandbox.py`, `vdp_macrodroid.py`). While lacking clear expected outcome, the thread is attracting interest from security-conscious developers.  
   [Issue #25099](https://github.com/google-gemini/gemini-cli/issues/25099)

3. **#22745 – Assess impact of AST-aware file reads, search, and mapping** (5 comments, 👍1)  
   Epic tracking investigation into AST-aware tooling for more precise code reads and navigation. Important for reducing token usage and improving agent accuracy.  
   [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

4. **#22323 – Subagent recovery after MAX_TURNS reports GOAL success, hiding interruption** (4 comments, 👍2)  
   `codebase_investigator` subagent falsely claims success when it hit the turn limit before analysis. Undermines trust; developers are asking for transparent failure reporting.  
   [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

5. **#24916 – Gemini CLI keeps asking for permissions on the same file** (3 comments)  
   Permission “allow for all future sessions” sometimes not respected. Repetitive prompts break workflow, especially in loop-heavy editing tasks.  
   [Issue #24916](https://github.com/google-gemini/gemini-cli/issues/24916)

6. **#24353 – Robust component-level evaluations** (3 comments)  
   Follow-up to behavioural evals epic; aims to expand testing beyond 76 existing tests to cover 6 Gemini models. Critical for release quality.  
   [Issue #24353](https://github.com/google-gemini/gemini-cli/issues/24353)

7. **#25166 – Shell command execution gets stuck with “Waiting input” after command completes** (2 comments, 👍3)  
   Simple shell commands hang with a “Awaiting user input” prompt even after finishing. Several upvotes indicate a recurrent pain point for power users.  
   [Issue #25166](https://github.com/google-gemini/gemini-cli/issues/25166)

8. **#22267 – Browser Agent ignores settings.json overrides (e.g., maxTurns)** (2 comments)  
   Subagent disregards project-level configuration, making it hard to control turn limits and other browser-specific behaviours.  
   [Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

9. **#23571 – Model frequently creates tmp scripts in random spots** (2 comments)  
   Model spreads edit scripts across directories, complicating clean commits and workspace hygiene. Developers want more predictable temporary file placement.  
   [Issue #23571](https://github.com/google-gemini/gemini-cli/issues/23571)

10. **#22672 – Agent should stop/discourage destructive behaviour** (1 comment, 👍1)  
    Request for guardrails against dangerous Git operations (`git reset --hard`, `--force`). Safety-minded users want the agent to prefer safer alternatives.  
    [Issue #22672](https://github.com/google-gemini/gemini-cli/issues/22672)

## Key PR Progress (10 important)
1. **#25900 – fix(core): prefer pwsh.exe over Windows PowerShell 5.1**  
   Fixes embedded double-quote handling on Windows by preferring PowerShell Core. Merging this prevents common `run_shell_command` failures.  
   [PR #25900](https://github.com/google-gemini/gemini-cli/pull/25900)

2. **#26217 – test(cleanup): fix temporary directory leaks in test suites**  
   Removes leftover temp directories from several test files, reducing CI disk bloat and local developer clutter.  
   [PR #26217](https://github.com/google-gemini/gemini-cli/pull/26217)

3. **#26229 – fix(ui): made shell tool header wrap on Ctrl+O**  
   Truncation replaced with word wrap for shell headers, improving readability when terminal width is narrow.  
   [PR #26229](https://github.com/google-gemini/gemini-cli/pull/26229)

4. **#26259 – fix(cli): continue task after skill slash activation**  
   After `/skill`, the agent now continues the active task instead of issuing a weak default prompt – a major UX improvement for skill users.  
   [PR #26259](https://github.com/google-gemini/gemini-cli/pull/26259)

5. **#26256 – fix(shell): stop foreground commands after excessive output**  
   Introduces a 10 MiB foreground output guard and an `outputLimitExceeded` result, steering long-running streams toward background mode. Addresses shell hang issues.  
   [PR #26256](https://github.com/google-gemini/gemini-cli/pull/26256)

6. **#24913 – feat(core): add AGENTS.md to default context filenames**  
   Adds support for `AGENTS.md` alongside `GEMINI.md`, improving interoperability with other coding agents and documentation tools.  
   [PR #24913](https://github.com/google-gemini/gemini-cli/pull/24913)

7. **#25362 – feat(vertex): add vertexLocation config setting for Vertex AI region override**  
   Enables Vertex AI users to target regions like `global` for preview models, solving the 404 errors when using cutting-edge models not available in `us-central1`.  
   [PR #25362](https://github.com/google-gemini/gemini-cli/pull/25362)

8. **#21495 – feat(ui): refine focus highlight for selection lists and settings items**  
   Polishes focus gutters, border overlap, and description legibility across lists and settings dialogs – a subtle but welcome visual update.  
   [PR #21495](https://github.com/google-gemini/gemini-cli/pull/21495)

9. **#21345 – fix(core): ensure chat compression summary persists across session resumes**  
   Fixes a bug where `/compress` summaries were lost after restarting a session, preserving context across restarts.  
   [PR #21345](https://github.com/google-gemini/gemini-cli/pull/21345)

10. **#26063 – fix(security): restrict permissions on project temp dir tree**  
   Hardens access to sensitive state (conversations, activity logs, memory) under `~/.gemini/`, limiting exposure to other local processes.  
   [PR #26063](https://github.com/google-gemini/gemini-cli/pull/26063)

## Feature Request Trends
- **Resilience & capacity** – Better retries, backoff, and transparent error handling for 429 and transient failures.  
- **Smarter subagents** – Awareness of approval modes, memory routing (global vs. project), proactive memory writes, and correct failure reporting.  
- **Guardrails & safety** – Discouraging destructive Git/DB commands, tool-call rejection handling, and safe fallbacks.  
- **Streaming & UI improvements** – Correct rendering of tables during streaming, stable scroll in long chats, SSH terminal compatibility, and clearer parallel tool layouts.  
- **Tool management** – Intelligent pruning when >128 tools are available to avoid 400 errors, and better cleanup of generated temporary scripts.

## Developer Pain Points
- **Capacity / rate limiting** – Frequent 429 errors disrupt automated workflows; top complaint this month.  
- **Subagent transparency** – MAX_TURNS masked as success leads to wasted turns and misleading outcomes.  
- **Shell interaction bugs** – Commands hang with “Waiting input”, and foreground output can flood the session; the new output guard is a direct response.  
- **Permission fatigue** – “Allow always” not sticking forces repeated manual approvals.  
- **SSH / terminal corruption** – Text scrambling, scroll issues, and missing SSH detection degrade the experience for remote users.  
- **Uncontrolled temp files** – Model scattering scripts across directories makes clean commits difficult.  
- **Configuration inconsistency** – Browser agent ignoring settings.json erodes trust in configuration-based control.  
- **Large tool-set errors** – 400 error when tool count exceeds a threshold limits extensibility.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest – 2026-04-30

## 1. Today’s Highlights
The latest release **v1.0.40-0** lands with agent‑switching support for ACP clients, smarter slash‑command ranking, and refined cancellation behavior. Meanwhile, the community is actively debating how to bring slash commands into non‑interactive mode and is pushing for better credential handling on headless servers — two areas that continue to draw high engagement.

## 2. Releases
**v1.0.40-0** (shipped in the last 24h)
- **Added:** ACP clients can now list and switch custom agents via the agent config option.
- **Improved:**
  - Ctrl+C / double‑Esc now cancel pending queued messages one at a time instead of all at once.
  - Slash command suggestions rank prefix matches above fuzzy matches.
  - Prompt mode (`-p`) now gates `repo` hoisting.

## 3. Hot Issues
1. **[#1044](https://github.com/github/copilot-cli/issues/1044) – Add support for slash commands in `copilot --acp`**  
   *12 comments, open*  
   ACP frontends (e.g., Zed) cannot use slash commands because Copilot doesn’t emit `available_commands_update`. This is a blocker for editor integrations that rely on the ACP protocol.

2. **[#1082](https://github.com/github/copilot-cli/issues/1082) – Copilot CLI hangs on `sudo` commands**  
   *2 comments, 10 👍, open*  
   When a task requires `sudo`, the CLI never prompts for a password and hangs indefinitely. Developers working with system packages hit this daily.

3. **[#2071](https://github.com/github/copilot-cli/issues/2071) – Support `pass` (GPG‑based password store) as a credential backend**  
   *1 comment, 8 👍, open*  
   On headless Linux servers without a desktop keyring, Copilot falls back to plaintext OAuth tokens. The community wants `pass` integration to avoid storing secrets in the clear.

4. **[#2795](https://github.com/github/copilot-cli/issues/2795) – `--agent <name>` does not work with `--plugin-dir <dir> -p <prompt>`**  
   *3 comments, 7 👍, open*  
   When passing a plugin directory and a prompt non‑interactively, the agent search ignores the plugin dir and looks only in `.copilot`/`.github`, effectively breaking scripted usage.

5. **[#334](https://github.com/github/copilot-cli/issues/334) – Add shell completions**  
   *6 comments, 11 👍, closed (recently completed)*  
   A long‑standing top‑voted request was finally addressed — shell completions for bash, zsh, fish, and PowerShell are now supported (likely via the new release).

6. **[#2828](https://github.com/github/copilot-cli/issues/2828) – Weekly rate limiting lacks guidance**  
   *3 comments, 3 👍, open*  
   Users hitting the weekly cap see a bare message without tips on checking usage, switching plans, or what resets when. Clearer in‑app guidance is requested.

7. **[#2643](https://github.com/github/copilot-cli/issues/2643) – `preToolUse` with `permissionDecision: allow` still shows a confirmation dialog**  
   *5 comments, 0 👍, open*  
   A hook that silently rewrites a command using `updatedInput` and `allow` still triggers an interactive prompt, forcing double confirmation and breaking the intent of “allow”.

8. **[#975](https://github.com/github/copilot-cli/issues/975) – Git commit attribution for AI‑assisted changes**  
   *5 comments, 3 👍, closed*  
   The desire to mark commits as AI‑assisted (e.g., `Co-authored-by: Copilot`) has been satisfied, likely via a new configuration or hook that mirrors what other tools do.

9. **[#1455](https://github.com/github/copilot-cli/issues/1455) – Auto‑inject `Co-authored-by: Copilot` in commits**  
   *10 comments, 2 👍, closed*  
   Similar to #975, this request for automatic attribution was closed recently, indicating that commit metadata injection is now available.

10. **[#839](https://github.com/github/copilot-cli/issues/839) – Subagents should be able to use skills**  
    *7 comments, 0 👍, closed*  
    A limitation where subagents spawned by the main agent couldn’t access repository‑level skills has been lifted, enabling more modular agent workflows.

## 4. Key PR Progress
Only two PRs were updated in the last 24 hours:

- **[#1968](https://github.com/github/copilot-cli/pull/1968) – install: retry without token when authenticated requests fail**  
  *Open* – Improves the installation script to handle SAML‑enforced SSO errors. If a `GITHUB_TOKEN` is present but rejected, the download retries unauthenticated, preventing install failures on public repos.

- **[#3036](https://github.com/github/copilot-cli/pull/3036) – Create CI workflow with GitHub Actions for main branch**  
  *Closed (merged)* – Introduces a CI pipeline that runs on pushes and PRs to `main`, establishing automated testing for the CLI’s own repository.

## 5. Feature Request Trends
- **Headless & non‑interactive ergonomics** across the board: slash commands in ACP (#1044), `--agent` + `--plugin-dir` fixes (#2795), MCP sampling in `-p` mode (#2882), and credential stores for server environments (#2071).
- **Granular permission controls**: organizational policy per tool (#1971), MCP tool allow‑listing (#3028), persistent directory allowlists (#3050), and the double‑confirmation problem for `preToolUse` (#2643).
- **Agent steering & control**: a “run now” command to force execution (#3025), and recursive discovery of `AGENTS.md` in subfolders similar to VS Code’s nested context (#3051).
- **Cross‑platform quality of life**: custom provider support via ACP (#3048), Windows WSL2 session store (#3046), IME flickering (#3045), and better rate limit messaging (#2828).

## 6. Developer Pain Points
- **Permission prompt fatigue**: Even with `--allow-all` or `permissionDecision: allow`, multiple confirmation dialogs appear (e.g., #2643, #3042). Directory permissions don’t persist across sessions (#3050), forcing repeated approvals.
- **Non‑interactive mode inconsistencies**: Slash commands aren’t available (#1044), `--agent` + plugin paths fail (#2795), and MCP sampling is declined even with allow‑all (#2882). Scripted workflows remain fragile.
- **Platform‑specific breakage**: Copilot hangs on `sudo` on Linux (#1082), fails to create session databases on WSL2 (#3046), and IME composition shakes the terminal window on Windows (#3045). Remote session URLs are unclickable in containers (#3031).
- **Credential and rate‑limit friction**: Headless servers lack a secure token store (#2071), and hitting the weekly limit gives no actionable guidance (#2828). Network‑blocked OAuth flows time out without a browser (#3039).

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest – 2026-04-30

## Today’s Highlights
The 1.41.0 release landed with two high-impact fixes: clipboard paste now works on headless Linux over SSH, and plugins can be installed directly from `.zip` URLs. Meanwhile, momentum is building around long-awaited features like a persistent memory system and proper ACP session history, while a token‑billing confusion issue is drawing community upvotes.

## Releases
**1.41.0** (2026-04-30)  
- `fix(clipboard)`: Enable clipboard paste on headless Linux over SSH ([#2115](https://github.com/MoonshotAI/kimi-cli/pull/2115))  
- `fix(plugin)`: Support installing plugins from a `.zip` URL ([#2126](https://github.com/MoonshotAI/kimi-cli/pull/2126))

## Hot Issues
1. **#1283 – Feature Request: Memory System** – Persistent context across sessions (auto & manual memory). Long‑standing request with 5 comments, essential for complex workflows.  
2. **#1617 – Bug: Ctrl‑V can’t paste images in Windows Terminal** – Regression on Windows reported by multiple users; 3 comments.  
3. **#1956 – ACP integration: Session history not replayed to clients** – Breaks history in Zed/JetBrains; remains blank even with old sessions.  
4. **#2127 – ACP protocol: `session/list`, `session/get` not implemented** – Direct consequence of #1956; Zed cannot retrieve history at all.  
5. **#1994 – kimiCode usage calculation problem** – Users report exhausting 2‑hour quota in just two requests due to token counting; 4 👍, subscription trust at risk.  
6. **#2122 – Shell mode uses `/bin/sh` instead of user’s default shell** – Breaks zsh/fish users; commands executed in wrong shell.  
7. **#2121 – Enhancement: Support Shift+Enter for line breaks** – Frequent friction for users accustomed to other CLIs.  
8. **#2120 – Enhancement: Tool call safety configuration** – Ability to whitelist commands and restrict file access beyond a directory; important for enterprise adoption.  
9. **#2119 – Enhancement: VS Code plugin multiple active sessions** – Want concurrent, independent chat sessions like other tools.

## Key PR Progress
1. **#2114 (Open) – Add Granular Auto-Approval Rules** – Implements per‑command/directory auto‑approval in config, similar to Claude Code. Highly demanded for trust management.  
2. **#884 (Open) – Bump ruff from 0.14.14 to 0.15.0** – Dependency update; keeps linting toolchain current.  
3. **#2130 (Closed) – chore(release): bump kimi-cli to 1.41.0** – Release management.  
4. **#2129 (Open) – fix(plan): respect `KIMI_SHARE_DIR` for plan files** – Corrects hardcoded plan directory; supersedes closed #2064.  
5. **#2064 (Closed) – Original `KIMI_SHARE_DIR` plan fix** – Replaced by #2129 with better test isolation.  
6. **#1972 (Open) – feat(shell): visual context progress bar** – Replaces plain text with color‑coded Unicode blocks, improving at‑a‑glance status.  
7. **#2126 (Closed) – fix(plugin): support installing from .zip URL** – Streams any `.zip` URL via httpx; already merged for 1.41.0.  
8. **#2115 (Closed) – fix(clipboard): enable paste on headless Linux over SSH** – Overcomes `pyperclip` failure when no display; merged.  
9. **#1933 (Open) – feat(subagents): add `work_dir` override** – Lets subagents operate in a different directory, fixing directory inheritance bug.

## Feature Request Trends
- **Persistent memory & session continuity**: #1283 (Memory System), #1956 / #2127 (ACP history replay). The community wants AI to remember context between sessions and for integrations to show full history.  
- **Multi‑session & parallel work**: #2119 requests multiple active sessions in VS Code; a signal that developers want to juggle independent tasks simultaneously.  
- **UX polish (shortcuts & shell behaviour)**: #2121 (Shift+Enter line break) and #2122 (respect default shell) reflect a desire for more intuitive interaction and OS‑convention compatibility.  
- **Safety & access control**: #2120 calls for granular command/file whitelisting, moving beyond all‑or‑nothing auto‑approval – a critical need for enterprise and security‑conscious users.

## Developer Pain Points
- **Cross‑platform clipboard fragility**: Windows paste (#1617) and headless Linux (#2115 fixed in 1.41.0) show that clipboard handling remains brittle.  
- **ACP protocol shortcomings**: Missing `session/list` and `session/get` (#1956, #2127) make IDE integrations (Zed, JetBrains) feel like a fresh agent every session, frustrating users who rely on history.  
- **Billing / token‑usage transparency**: Issue #1994 with 4 👍 highlights confusion when K2.6’s long reasoning chains consume quota far faster than expected by “request count” – eroding subscription confidence.  
- **Shell assumption hardcoding**: Forcing `/bin/sh` (#2122) alienates zsh/fish users and breaks custom aliases.  
- **Ergonomic shortcuts**: Lack of Shift+Enter for newline (#2121) creates friction for developers switching from other CLI tools.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — April 30, 2026

## 1. Today’s Highlights
The OpenCode ecosystem ships **v1.14.30** with critical fixes for missing Desktop sessions caused by path mismatches, along with improved DeepSeek compatibility and initial reasoning support for Mistral Medium 3.5. The community’s attention remains sharply focused on Windows session reliability and the long-standing `Ctrl+C` exit conflict that disrupts copy-paste workflows.

---

## 2. Releases
- **v1.14.30**  
  - Fixed missing sessions in Desktop due to backslash/forward-slash path mismatches, including automatic recovery of existing stored data.  
  - Adjusted Azure Responses defaults to prevent reasoning item ordering errors.  
  - Improved DeepSeek compatibility for providers with non‑standard model naming.  
  - Added Mistral Medium 3.5 with reasoning capabilities.

---

## 3. Hot Issues

| # | Issue | Reaction | Why It Matters |
|---|-------|----------|----------------|
| [`#7957`](https://github.com/anomalyco/opencode/issues/7957) | **Ctrl+C should not exit OpenCode** – conflicts with universal copy shortcut | 👍30 · 💬11 | The most‑upvoted open issue. Users habitually press Ctrl+C to copy text and accidentally terminate the entire session, causing data loss. |
| [`#10119`](https://github.com/anomalyco/opencode/issues/10119) | **VSCode extension shows “No data provider registered”** | 👍12 · 💬15 | Many users who installed the new VSCode extension hit this blank view. A blocker for adoption of the IDE plugin. |
| [`#14462`](https://github.com/anomalyco/opencode/issues/14462) | **Add roslyn-language-server as opt‑in C# LSP** (closed) | 👍8 · 💬15 | Requests the official Microsoft Roslyn LSP for modern C# tooling. The closure signals the feature has been accepted/implemented. |
| [`#21340`](https://github.com/anomalyco/opencode/issues/21340) | **Web UI not showing sessions on Windows** – path separator mismatch | 👍2 · 💬5 | Highlights a persistent backslash vs. forward slash mismatch in session storage, affecting all Windows web‑UI users. |
| [`#24751`](https://github.com/anomalyco/opencode/issues/24751) | **GPT‑5.5 context limits not respected** (closed) | 👍4 · 💬7 | A regression that hard‑coded context windows broke custom plans. Fixed quickly, showing responsiveness to provider issues. |
| [`#19651`](https://github.com/anomalyco/opencode/issues/19651) | **Server exits unexpectedly inside tmux** | 👍5 · 💬4 | Critical for developers who rely on persistent remote sessions. The crash under tmux is a blocking issue for headless workflows. |
| [`#10780`](https://github.com/anomalyco/opencode/issues/10780) | **Can’t paste** – right‑click and shortcuts fail | 👍2 · 💬4 | Basic clipboard interaction is broken for some users, severely hampering productivity. |
| [`#23442`](https://github.com/anomalyco/opencode/issues/23442) | **SSE JSON parse failure with GLM‑5.1** – malformed content kills the stream | 💬3 | Compatibility with Z.AI’s GLM model is unstable, causing stream crashes. Important for users of Chinese LLM providers. |
| [`#24598`](https://github.com/anomalyco/opencode/issues/24598) | **Message Index / Conversation Navigator disappeared in 1.14.x** | 💬2 | A regression that removed a crucial navigation tool for multi‑turn conversations, frustrating power users. |
| [`#24824`](https://github.com/anomalyco/opencode/issues/24824) | **Skills serialization format config** | 💬2 | Large Claude Code skill sets bloat the system prompt with XML. A community PR now offers JSON/Markdown alternatives. |

---

## 4. Key PR Progress

- **[`#25018`](https://github.com/anomalyco/opencode/pull/25018)** – **refactor(core): convert control‑plane workspace to Effect**  
  Major architectural shift to Effect services for workspace lifecycle, with new HTTP‑based tests. Improves type safety and testability.

- **[`#25110`](https://github.com/anomalyco/opencode/pull/25110)** – **fix: DeepSeek reasoning_content round‑trip**  
  Ensures `reasoning_content` is preserved across all multi‑turn interleaved variants, fixing broken conversations with DeepSeek models.

- **[`#25112`](https://github.com/anomalyco/opencode/pull/25112)** – **feat: TUI custom provider setup**  
  Adds an interactive provider configuration flow in the terminal UI, letting users directly set up OpenAI‑compatible endpoints.

- **[`#24149`](https://github.com/anomalyco/opencode/pull/24149)** – **feat: scout agent for repo research**  
  Introduces a built‑in `scout` subagent with `repo_clone`/`repo_overview` tools for exploring external documentation and dependencies.

- **[`#24471`](https://github.com/anomalyco/opencode/pull/24471)** – **feat: queued message editing, cancellation, and wrap‑up**  
  Long‑requested queue management: users can now edit, cancel, or force‑stop queued agent messages, addressing issues #6942, #21906, #4821, #24298.

- **[`#24852`](https://github.com/anomalyco/opencode/pull/24852)** – **feat: skills.format config option**  
  Allows choosing XML, JSON, or Markdown for skill serialization, preventing prompt bloat and model confusion with local Ollama models.

- **[`#18005`](https://github.com/anomalyco/opencode/pull/18005)** – **feat: native video/audio file reading support**  
  Implements community‑requested media file handling (issue #10531 with 7 👍), enabling OpenCode to directly process video and audio inputs.

- **[`#23557`](https://github.com/anomalyco/opencode/pull/23557)** – **feat: interactive split‑footer mode**  
  Adds a split‑footer view for the `run` command, enhancing real‑time interaction and feedback during command execution.

- **[`#14955`](https://github.com/anomalyco/opencode/pull/14955)** – **feat: working indicator on project sidebar** (closed)  
  Puts a subtle spinner on the project icon when an agent is working, giving immediate visual feedback in the Desktop sidebar.

- **[`#16425`](https://github.com/anomalyco/opencode/pull/16425)** – **fix: oxlint --lsp detection regression**  
  Restores proper detection of `oxlint` LSP support after a Bun→Node migration, fixing language server integration for oxc users.

---

## 5. Feature Request Trends

- **Clipboard & Shortcut Overhaul** – Users consistently demand that `Ctrl+C` should copy, not exit. Paste and right‑click failures also feed into a broader need for standard OS interaction patterns.
- **Cross‑Platform Path Handling** – Windows users report session losses and UI glitches due to backslash vs. forward slash mismatches; a unified path normalization is repeatedly requested.
- **Flexible Serialization for Skills/Prompts** – Large skill collections inflate system prompts; the community wants JSON/Markdown alternatives to the current XML format to improve model behaviour.
- **Provider‑Agnostic Compatibility** – Requests to better handle OpenAI‑format tool translations for Anthropic models, fix GLM/DeepSeek SSE parsing, and expose reasoning content reflect a push for broader LLM interoperability.
- **Agent & Subagent Usability** – Clearer documentation on direct vs. implicit subagent invocation, persistent model selections per agent, and better visibility of agent output in CLI mode.

---

## 6. Developer Pain Points

- **Accidental Session Termination** – `Ctrl+C` as exit is the dominant frustration, causing loss of work and hesitation to use the TUI for serious tasks.
- **Windows Path Fragility** – Session history disappearing, Web UI blanks, and Desktop errors all trace back to inconsistent path separators, making Windows feel like a second‑class platform.
- **Broken Basic Interactions** – Paste not working, missing conversation navigator, and random language switching erode trust in everyday use.
- **SSE & Streaming Instability** – Unescaped JSON in streams from providers like Z.AI crash the client, requiring defensive parsing or better provider‑side escaping.
- **Installation & Setup Hurdles** – VSCode extension “no data provider” errors and Desktop beta “can’t reach local server” issues create a rough first‑run experience that discourages adoption.

---

*Digest generated from real‑time GitHub activity on 2026‑04‑30. All links lead to the relevant issues, feature requests, and pull requests.*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest – 2026-04-30

## Today’s Highlights
Release v0.15.6 landed with fixes for SubAgent display flicker and sticky todo panels, while a wave of PRs addressed broken Ctrl+E/Ctrl+F shortcuts and side-query model configuration leaks. Community reports of auto-memory recall delays and API 400 errors on long conversations signal increased demand for more robust context management and predictable side-model behavior.

## Releases
- **v0.15.6** (stable) – Fixes: use project transcript path for dream memory, bound SubAgent display by visual height to prevent flicker, keep sticky todo panel.
- **v0.15.6-preview.0** – Preview of the same changes.
- **v0.15.3-nightly.20260430.da2936336** – Nightly build with identical fixes.

## Hot Issues
1. [#3652](https://github.com/QwenLM/qwen-code/issues/3652) **Internal error 400 on long conversations** – API returns `Range of input length should be [1, 983616]` during extended sessions. 8 comments. Matters because it blocks long-running workflows where users can’t start fresh without losing context.
2. [#3730](https://github.com/QwenLM/qwen-code/issues/3730) **Auto-stop after update** – After upgrading, Qwen Code spontaneously instructs users to stop tasks, even without ESC press. High priority `P1`. Breaks marathon sessions.
3. [#3759](https://github.com/QwenLM/qwen-code/issues/3759) **Auto-memory recall blocks user turns for 5s** – Every turn delayed by a timeout-prone recall selector, directly impacting responsiveness. Related to feature request #3761 for decoupling.
4. [#3765](https://github.com/QwenLM/qwen-code/issues/3765) **Side queries ignore fast model settings** – Side queries on fast model apply main model’s per-model options (e.g., thinking), defeating the purpose of separate configuration.
5. [#3763](https://github.com/QwenLM/qwen-code/issues/3763) **Ctrl+E/Ctrl+F shortcuts broken for running subagents** – The compact tool-call hint cannot be expanded, paralysing subagent monitoring. Fix underway in PR #3771.
6. [#3426](https://github.com/QwenLM/qwen-code/issues/3426) **VSCode plugin ignores context compression settings** – `contextPercentageThreshold` and `contextWindowSize` not honored, leading to context overflow and failures.
7. [#3772](https://github.com/QwenLM/qwen-code/issues/3772) **DeepSeek v4 pro API error 400** – `reasoning_content must be passed back` error in multi-turn conversations, likely from mishandling of thinking mode.
8. [#3773](https://github.com/QwenLM/qwen-code/issues/3773) **Generic bug report** – Insufficient detail, but indicates a failure with `qwen3-coder-flash` on Windows, API Key auth.
9. [#3760](https://github.com/QwenLM/qwen-code/issues/3760) **Disable reasoning on all fastModel side queries** – Feature request to consistently avoid reasoning latency on small, bounded tasks.
10. [#3742](https://github.com/QwenLM/qwen-code/issues/3742) **Honor documented `proxy` key in settings.json** – Users expect top-level proxy configuration to work; closed via PR #3753.

## Key PR Progress
1. [#3771](https://github.com/QwenLM/qwen-code/pull/3771) **fix(cli): restore SubAgent shortcut focus** – Re-enables Ctrl+E/Ctrl+F for running agents by assigning ownership to the first running SubAgent when no pending confirmation has focus.
2. [#3775](https://github.com/QwenLM/qwen-code/pull/3775) **refactor(core): route side-query LLM calls through runSideQuery chokepoint** – Unifies all side queries (title, recap, web fetch, etc.) to enforce fast model settings and disable reasoning by default.
3. [#3698](https://github.com/QwenLM/qwen-code/pull/3698) **fix(acp): run auto compression before model sends** – Addresses #3652 by running chat compression prior to ACP model sends, re-reading active chat after potential swap.
4. [#3774](https://github.com/QwenLM/qwen-code/pull/3774) **feat(core): enforce prior read before file mutation** – Forbids Edit/WriteFile unless the model has actually read current bytes in the conversation, building on FileReadCache.
5. [#3673](https://github.com/QwenLM/qwen-code/pull/3673) **feat(memory): add autoSkill background project skill extraction** – After sessions, automatically extracts reusable workflows into project-level skills (disabled by default).
6. [#3604](https://github.com/QwenLM/qwen-code/pull/3604) **feat(skills): parallelize loading + path-conditional activation** – Drastically improves skill cold-start performance and enables activation based on file paths.
7. [#3749](https://github.com/QwenLM/qwen-code/pull/3749) **fix(cli): stop double-wrapping API errors in non-interactive mode** – Cleans up error output so a 4xx prints a single line to stderr and exits non-zero.
8. [#3768](https://github.com/QwenLM/qwen-code/pull/3768) **feat(cli): route foreground subagents through pill+dialog while running** – Suppresses inline subagent display during execution and uses the existing footer pill for cleaner UX.
9. [#3736](https://github.com/QwenLM/qwen-code/pull/3736) **feat(cli): improve slash command discovery** – Enhances completion to show available commands and arguments, reducing discoverability pain.
10. [#3776](https://github.com/QwenLM/qwen-code/pull/3776) **feat(installer): add standalone archive installation** – Introduces code-server-style archives, making the one-line installer work without npm.

## Feature Request Trends
- **Memory & context decoupling** – Users want auto-memory recall and side queries to run non-blocking, with fast models properly isolated from main model settings (#3759, #3761, #3765, #3760).
- **VSCode extension parity** – Demands for slash command preview (not immediate send) and respecting compression/config settings persist (#3426, #1990 closed, #2394 closed).
- **Better long-session resilience** – As sessions span days/weeks, accurate context window enforcement, prompt caching across tasks, and reliable compression are critical (#3652, #2986).
- **CLI usability** – Sticky panels, stable shortcuts, clear error messages, and discoverable slash commands (#3749, #3763, #3736).
- **Configuration fidelity** – Proxy settings, directory persistence, and per-model options must behave as documented (#3742, #3746 closed, #3765).

## Developer Pain Points
- **Unpredictable context overflow** – API 400 errors from input length or compression not triggering, especially in VSCode.
- **Model configuration leaks** – Fast-model side queries accidentally inherit main model’s reasoning/thinking settings, causing errors and latency.
- **Auto-memory recall latency** – Every user turn stalled by nearly 5 seconds; developers ask for async or cached recall.
- **Broken keyboard shortcuts** – Recent release inadvertently disabled essential subagent expansion shortcuts.
- **Non-persistent workspace settings** – Adding directories via slash commands doesn’t survive restart, leading to repetitive setup.
- **Update regressions** – v0.15.6 changed auto-stop behaviour, interrupting long-running tasks without user input.
- **Poor error formatting** – Non-interactive mode produced triple-wrapped errors and stack traces, making scripted use painful (fixed in PR #3749).

</details>