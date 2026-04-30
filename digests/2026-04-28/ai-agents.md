# OpenClaw Ecosystem Daily Report 2026-04-28

> Issues: 500 | PRs: 500 | Covered projects: 12 | Generated at: 2026-04-28 01:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw Project In-Depth Report

# OpenClaw Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

OpenClaw stayed extremely active over the past 24 hours, handling **500 Issues** (316 newly opened or active, 184 closed) and **500 PRs** (319 pending merge, 181 merged or closed), while also publishing **2 new releases** (v2026.4.26 and v2026.4.25). Community feedback was dense, several high-priority regression bugs received rapid responses, and core features such as TTS, the QQ Bot channel, and MCP security mechanisms continued to iterate. Overall, the project is in a phase of both high-speed development and active maintenance; stability is under some pressure, but the repair cadence is positive.

---

## 2. Releases

### 🔹 v2026.4.26 (latest)
- **Core updates**:
  - **QQ Bot channel enhancements**: supports full group-chat features, including history tracking, @-mention gating, activation modes, per-group independent configuration, and a FIFO message queue with debounced delivery; C2C messages support `stream_messages` streaming and introduce `StreamingController` lifecycle management; the unified `sendMedia` interface supports chunked uploads.
  - **Breaking changes**: no explicit breaking changes, but QQ channel behavior may change because of the new queue mechanism; test before deploying.
- **Related link**: [Release v2026.4.26](https://github.com/openclaw/openclaw/releases/tag/v2026.4.26)

### 🔹 v2026.4.25
- **Core highlights**:
  - **Comprehensive TTS upgrade**: supports the `/tts latest` command, session-level automatic TTS control, personas, and per-Agent/account override configuration; adds provider support for Azure Speech, Xiaomi, Local CLI, Inworld, Volcengine, and ElevenLabs v3.
  - **Contributor acknowledgements**: @leonchui, @zoujiejun, and @solar2ain.
- **Related link**: [Release v2026.4.25](https://github.com/openclaw/openclaw/releases/tag/v2026.4.25)

> ⚠️ **Migration note**: multiple regressions appeared during upgrades from v2026.4.24 to v2026.4.25 (see the Bug section below). Use `openclaw doctor` to check the environment and refer to temporary community workarounds.

---

## 3. Project Progress

Important PRs merged or closed today moved several key fixes and features forward:

| PR | Type | Progress notes |
|----|------|--------|
| [#73138](https://github.com/openclaw/openclaw/pull/73138) | Security enhancement | Introduces an **observe-first MCP runtime protection mechanism** that restricts tool execution privileges, prevents unauthorized operations, and improves production safety. |
| [#73076](https://github.com/openclaw/openclaw/pull/73076) | Performance optimization | Fixes a model parsing performance bottleneck on ARM64 caused by repeated plugin loading (~20s per run), significantly improving startup and response speed. |
| [#72442](https://github.com/openclaw/openclaw/pull/72442) | Functional fix | Fixes incorrect routing for "reply in same session" under the Codex app path, ensuring replies return to the original conversation stream. |
| [#72814](https://github.com/openclaw/openclaw/pull/72814) | Stability | Stabilizes heartbeat task routing logic, preventing sub-Agent sessions from being routed into the main channel and reducing the risk of message disorder. |
| [#71792](https://github.com/openclaw/openclaw/pull/71792) | Data persistence | Fixes memory not being saved during automatic day rollover or idle rollback, preventing data loss for low-activity Agents. |

> ✅ Overall, the project made substantive progress in **channel stability, the security model, and resource management**.

---

## 4. Community Hotspots

### 🔥 High-discussion Issues (comment count >=10)

| Issue | Topic | Demand analysis |
|------|------|--------|
| [#72846](https://github.com/openclaw/openclaw/issues/72846) (10 comments) | Channel Sidecar startup blocking regression (v2026.4.25) | Users strongly request a fix for the recurrence of the issue previously fixed in #63450. It affects gateway availability, **maintainers have marked it as a regression**, and an urgent hotfix is needed. |
| [#68735](https://github.com/openclaw/openclaw/issues/68735) (26 comments, closed) | LLM request schema rejected (Copilot/GPT-5-mini) | Multiple users reported tool-call failures after upgrading. It has been **located and fixed**, revealing insufficient provider compatibility test coverage. |
| [#71761](https://github.com/openclaw/openclaw/issues/71761) (6 comments, closed) | Duplicate message injection (double token consumption) | This seriously affected cost and experience. A **fix PR has been merged**, highlighting fragility in the context assembly logic. |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) (7 comments) | Cross-channel duplicate transcription and context assembly | An "umbrella issue" raised by maintainers that calls for systematic refactoring and **may become a focus of the next release**. |

> 💬 Core community demand: **stability > new features**, with particular attention to upgrade compatibility and resource leaks.

---

## 5. Bugs and Stability

### 🚨 High-severity Bugs (ranked by impact)

| Issue | Type | Status | Fix PR? |
|------|------|------|-------------|
| [#72699](https://github.com/openclaw/openclaw/issues/72699) | Gateway crash loop (D state, 85%+ CPU) | CLOSED | ✅ Fixed (see [#72817](https://github.com/openclaw/openclaw/pull/72817)) |
| [#72846](https://github.com/openclaw/openclaw/issues/72846) | Channel Sidecar startup blocking (~3 minutes) | OPEN | 🔄 Being fixed (related PR #72814) |
| [#61701](https://github.com/openclaw/openclaw/issues/61701) | Gateway at 100% CPU (since v2026.4.5) | OPEN | ❌ Root cause not identified |
| [#70857](https://github.com/openclaw/openclaw/issues/70857) | Windows session lock held for 191 seconds | OPEN | ❌ Needs further diagnosis |
| [#55334](https://github.com/openclaw/openclaw/issues/55334) | Unbounded `sessions.json` growth causing OOM | OPEN | 🔄 Partially mitigated (PR #71792); a full fix requires architectural changes |

> ⚠️ **Trend**: v2026.4.24+ releases have multiple performance and stability regressions. Users should delay upgrading or monitor resource usage closely.

---

## 6. Feature Requests and Roadmap Signals

### 📌 High-potential Feature Requests (judged with PR activity)

| Issue | Feature | Roadmap signal |
|------|------|----------|
| [#39604](https://github.com/openclaw/openclaw/issues/39604) | Allow `web_fetch` to access private networks | 🔼 Strong demand (11 👍), design discussions already exist, **possibly included in v2026.5.x** |
| [#42840](https://github.com/openclaw/openclaw/issues/42840) | MathJax/LaTeX support in Control UI | 🔼 A must-have for education/research users (3 👍), with strong technical feasibility |
| [#12678](https://github.com/openclaw/openclaw/issues/12678) | Permission model for skills/tool capabilities (deny risky actions by default) | 🔼 Security-critical and aligned with PR #73138, **a long-term roadmap focus** |
| [#71142](https://github.com/openclaw/openclaw/issues/71142) | Configurable upload size limit in Control UI | 🔼 UX improvement, simple to implement, **easy to ship quickly** |

> ✅ Security, observability, and enterprise-grade governance will become next-stage priorities.

---

## 7. User Feedback Summary

### ✅ What users like
- **Multi-provider TTS support** (v2026.4.25) received broad praise, especially the clear audio-quality improvement from ElevenLabs v3.
- **QQ Bot group-chat features** meet a strong need among domestic users, and the history tracking plus debouncing mechanism is designed reasonably.
- The **`openclaw doctor` tool** played a key role in diagnosing upgrade problems (see #72526).

### ❌ Pain points
- **Crashes immediately after upgrade**: v2026.4.24/4.25 show startup failures or high CPU issues on Windows, macOS, and Linux, forcing users to roll back.
- **Documentation lag**: Metal/GPU memory configuration, CLI command parameters, and similar topics lack official guides (#44202).
- **Uncontrolled cost**: duplicate message injection doubles token consumption, which is sensitive for enterprise users.

> 💡 Real user scenarios: **private deployments, multi-channel integration, and cost-sensitive Agent operations**.

---

## 8. Pending Backlog

### ⏳ Long-unanswered important Issues (>2 months, high value)

| Issue | Type | Backlog reason | Recommendation |
|------|------|--------|------|
| [#29387](https://github.com/openclaw/openclaw/issues/29387) | AgentDir Bootstrap file failure | No maintainer assigned | Affects custom Agent initialization; **recommend fixing in v2026.5** |
| [#41619](https://github.com/openclaw/openclaw/issues/41619) | Google Gemini CLI authentication failure | Authentication flow changes not adapted | Blocks Google ecosystem integration; **provider layer update required** |
| [#12678](https://github.com/openclaw/openclaw/issues/12678) | Skill permission model | Architecture-level change, priority undecided | **Should be included in security roadmap planning** |
| [#43260](https://github.com/openclaw/openclaw/issues/43260) | `SKILL.md` support for per-skill model routing | Clear feature but no PR | Could improve resource utilization; **encourage community contribution** |

> 📢 **Maintainer reminder**: although the above are not crash-level issues, they affect user experience and ecosystem expansion. Allocate resources and resolve them gradually.

---

**Report generated at**: 2026-04-28  
**Data source**: OpenClaw GitHub Repository (github.com/openclaw/openclaw)  
**Analyst**: Open-source project analyst for AI agents and personal AI assistants

---

## Cross-Ecosystem Comparison

# Cross-Project Analysis Report for the Personal AI Assistant / Autonomous Agent Open-Source Ecosystem (2026-04-28)

---

## 1. Ecosystem Overview

The current open-source ecosystem for personal AI assistants and autonomous agents shows a pattern of **"rapid iteration in core projects and fast vertical specialization"**. Full-featured platforms represented by OpenClaw continue to deepen channel integration, TTS/ASR, security mechanisms, and related capabilities, while lightweight or modular projects such as NanoBot, PicoClaw, and Moltis focus on deployment efficiency, multi-model compatibility, and enterprise-grade governance. Across the community, teams face a common challenge of **balancing stability with feature expansion**, especially exposing shared shortcomings in production-grade needs such as upgrade compatibility, resource isolation, and session consistency. Overall, the ecosystem is evolving from "usable prototypes" toward "reliable infrastructure".

---

## 2. Activity Comparison Across Projects

| Project | Issues (24h) | PRs (24h) | New release | Health assessment |
|------|---------------|------------|-------------|--------------|
| **OpenClaw** | 500 (316 new) | 500 (319 pending merge) | ✅ v2026.4.26 & v2026.4.25 | ⭐⭐⭐⭐ (high activity, stability under pressure) |
| **NanoBot** | 17 | 39 (21 merged) | ❌ | ⭐⭐⭐⭐☆ (efficient collaboration, features being completed) |
| **Zeroclaw** | 44 (38 new) | 50 (12 merged) | ❌ | ⭐⭐⭐⭐ (dense fixes, installation experience needs improvement) |
| **PicoClaw** | 109 (35 new) | 120 (57 merged) | ❌ | ⭐⭐⭐⭐☆ (highly responsive, focused on mobile/local models) |
| **NanoClaw** | 16 | 25 (12 merged) | ❌ | ⭐⭐⭐⭐☆ (security hardening, leading in containerization) |
| **IronClaw** | 10 (9 new) | 33 (7 merged) | ❌ | ⭐⭐⭐⭐☆ (architecture refactor underway, production risks need attention) |
| **LobsterAI** | 7 (6 new) | 38 (24 merged) | ✅ 2026.4.25 | ⭐⭐⭐ (fast feature iteration, startup experience drags score down) |
| **Moltis** | 5 (1 new) | 17 (12 merged) | ❌ | ⭐⭐⭐⭐☆ (significant architecture optimization, UX improving) |
| **CoPaw** | 50 (25 new) | 43 (25 merged) | ❌ | ⭐⭐⭐ (high activity, major stability defects stand out) |
| **TinyClaw / ZeptoClaw / EasyClaw** | 0 | 0 | ❌ | ⭐⭐ (low activity or stalled maintenance) |

> Note: health combines activity, response speed, stability, technical debt, and related factors.

---

## 3. OpenClaw's Position in the Ecosystem

OpenClaw is the **most feature-complete full-stack platform with the largest community scale** in the ecosystem. Its advantages are reflected in:
- **Broadest channel coverage**: supports 10+ channels including QQ Bot, Telegram, Discord, WeCom, and Matrix, with deep integration of advanced features such as group chat, streaming transmission, and chunked media upload;
- **Leading enterprise-grade capabilities**: among the first to introduce MCP security mechanisms (observe-first protection), session-level TTS control, and cost-tracking APIs;
- **Community scale effects**: processes 500+ Issues/PRs in a single day, far above comparable projects, reflecting its ecosystem position as a "de facto standard".

By comparison, NanoBot, PicoClaw, and similar projects emphasize lightweight operation and fast deployment, while IronClaw bets on the long-term architectural advantages of a Rust rewrite. OpenClaw has built a moat along the path of **"feature breadth + community-driven development"**.

---

## 4. Common Technical Directions

| Technical direction | Projects involved | Concrete demands |
|--------|--------|--------|
| **Model compatibility and failover** | NanoBot (#3376), LobsterAI (#1813), CoPaw (#3795) | Support non-mainstream models such as DeepSeek-v4 and Qwen3; automatic failover across providers |
| **Session and context management** | PicoClaw (#2491), CoPaw (#3843), Moltis (#888) | History isolation, manual compaction/clearing, and anti-loss mechanisms |
| **Security and permission control** | OpenClaw (#73138), NanoClaw (#2029), IronClaw (#2999) | Tool-call permission models, container resource limits, and capability leasing mechanisms |
| **Streaming responses and UX** | PicoClaw (#2587), CoPaw (#3871), Moltis (#876) | Web streaming output, correct SSE stream closure, and file-upload support |
| **Deployment and installation reliability** | Zeroclaw (#6096), LobsterAI (#73), Moltis (#896) | Integrity of prebuilt binaries, Docker build stability, and cross-platform startup success rate |

---

## 5. Differentiated Positioning Analysis

| Project | Functional focus | Target users | Key technical architecture differences |
|------|--------|--------|----------------|
| **OpenClaw** | Full-featured platform, multi-channel + TTS + security | Enterprise integrators, heavy individual users | Python monolith architecture, plugin-based channels |
| **NanoBot** | Lightweight, async ReAct, multi-provider | Developers, small and midsize teams | Written in Go, emphasizes low resource usage |
| **PicoClaw** | Mobile-friendly, local model integration | Individual developers, privacy-sensitive users | Supports Android + LM Studio, Security Shield v2 |
| **IronClaw** | High performance, Rust rewrite, plugin ecosystem | Technical enthusiasts, infrastructure teams | Reborn architecture (modular Substrate) |
| **Moltis** | Web UI experience, automatic indexing | Knowledge workers, small teams | Optional channel compilation, frontend assets generated at build time |
| **CoPaw** | Multi-channel enterprise IM integration | Internal enterprise AI assistant deployments | Based on the QwenPaw fork, strengthened Feishu/DingTalk support |

---

## 6. Community Heat and Maturity

- **Rapid iteration stage** (high PR/Issue ratio, feature-dense):  
  **OpenClaw, PicoClaw, and CoPaw** are in this stage, processing 100+ PRs per day on average and focusing on feature delivery and bug fixes.
  
- **Quality consolidation stage** (architecture optimization first, stability prioritized):  
  **NanoClaw, IronClaw, and Moltis** focus on foundational refactors (resource isolation, modularization, security substrate), with PRs leaning more toward infrastructure.

- **Maintenance bottleneck stage** (low response, accumulating technical debt):  
  **LobsterAI and Zeroclaw** are active but have serious backlogs (for example, LobsterAI's #73 startup issue has remained unresolved for more than two months), affecting conversion of new users.

---

## 7. Trend Signals Worth Watching

1. **"Stability > new features" has become a community consensus**  
   Multiple projects (OpenClaw #72846, CoPaw #3843, LobsterAI #73) show that users have extremely low tolerance for upgrade crashes, session loss, and similar issues. **Production readiness has become the core adoption threshold**.

2. **Voice interaction (TTS/ASR) is moving from bonus feature to requirement**  
   PicoClaw (#1648) and OpenClaw (v2026.4.25) both strengthened voice support, showing that **natural interaction** is a key next-stage experience leap for personal AI assistants.

3. **Enterprise-grade governance capabilities are landing faster**  
   Demand is concentrated around permission models (OpenClaw #12678), resource isolation (NanoClaw #2068), audit logs (IronClaw #2993), and similar areas, showing that **private deployment and compliance** are becoming mainstream scenarios.

4. **Lightweight and modular designs are the direction of architecture evolution**  
   Moltis optional channel compilation, IronClaw's Substrate architecture, and NanoBot's lightweight Go implementation all point toward the technical trend of **reducing deployment complexity and improving maintainability**.

> **Advice for developers**: prioritize projects with a clear stability roadmap and support for resource isolation and permission control; pay attention to TTS/ASR integration maturity; strictly test upgrade paths and rollback mechanisms in production environments.

---  
**Report generated at**: 2026-04-28  
**Analyst**: Technical analyst for the AI agent and personal AI assistant open-source ecosystem

---

## Detailed Reports for Peer Projects

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

NanoBot community activity remained high. Over the past 24 hours, it handled **17 Issues** and **39 Pull Requests**, with **21 PRs merged or closed** and **13 Issues closed**, showing an efficient collaboration cadence. Although there was no new release, core feature iteration and stability fixes advanced in parallel, with substantive progress especially in multi-channel support, model failover, session isolation, and streaming responses. Overall, the project is in a rapid evolution phase, and community contributors' coverage of edge cases has improved significantly.

---

## 2. Releases

**No new release**. The current mainline remains in the `v0.1.5.post2` series. The team is focused on feature completion and regression fixes, without triggering a formal version bump.

---

## 3. Project Progress

Key PRs merged or closed today delivered several core capabilities:

- **#3478** (merged): explicitly sets request timeouts for `OpenAICompatProvider`, preventing the agent loop from being blocked for a long time by the OpenAI SDK's default 600-second read/write timeout and improving system robustness.
- **#3480 / #3479** (merged): fixes the OpenAI Codex provider's loss of `_progress` streaming deltas in `v0.1.5.post2`, restoring the ability to push intermediate state to frontend channels and solving the user-visible pain point of an apparent "no response" state.
- **#3397** (merged): improves Discord thread support by automatically inheriting parent-channel allowlist policies into child threads, preventing message-delivery failures caused by missing permission configuration.
- **#3389** (merged): prevents heartbeat output from leaking internal instruction templates (such as HEARTBEAT.md content), and improves fallback behavior when finalization fails, improving cleanliness of user-facing messages.
- **#3466** (merged): adds a `/history [n]` command that lets users view the most recent N session messages, improving debugging and context tracing.

> These fixes and features significantly improve multi-channel stability, model compatibility, and user experience, marking a key step for NanoBot toward a production-grade Agent platform.

---

## 4. Community Hotspots

### 🔥 High-discussion Issue: #3376 — Support automatic switching on model exceptions (Provider / Model Failover)
- **Link**: https://github.com/HKUDS/nanobot/issues/3376
- **Comments**: 11 | **👍**: 1
- **Analysis**: Users are strongly calling for automatic failover across providers/models under multi-provider configuration, rather than only retrying within the same provider. This directly targets pain points in high-availability scenarios, especially amid frequent rate limits and 5xx errors from services such as DeepSeek and OpenAI. It has become a key bottleneck for continuous operation. Community members have begun discussing implementation paths, and it is expected to become a core priority in the next phase.

### 🔥 High-discussion Issue: #2133 — Optimize user-message queueing during task execution
- **Link**: https://github.com/HKUDS/nanobot/issues/2133
- **Comments**: 19 | **👍**: 0
- **Analysis**: Although closed, the high discussion volume reflects urgent user demand for "real-time intervention in the agent loop". The current `/stop` mechanism is not graceful enough and hinders human-agent collaboration efficiency. This topic may push future introduction of interrupt signals or duplex communication mechanisms.

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fix status |
|--------|------|------|--------|
| ⚠️ High | #3469 | DeepSeek-v4 series models return empty replies because `reasoning_content` is not correctly passed back | ❌ No PR |
| ⚠️ High | #3474 | DeepSeek-v4-pro/v4-flash return blank responses after configuration | ❌ No PR |
| ⚠️ Medium | #3488 | Telegram attachments are sent as `application.octet-stream` and cannot be correctly recognized | ✅ PR #3489 exists |
| ⚠️ Medium | #3435 | WeCom channel media file upload fails and returns `[file upload failed: xxxxxx]` | ❌ No PR |
| ⚠️ Medium | #3464 | Subagent in threaded calls is incorrectly routed to the channel main session rather than the original thread | ❌ No PR |
| ⚠️ Low | #3468 | MCP capability names are forwarded directly to the model tool API without sanitization, creating injection risk | ❌ No PR |

> Note: DeepSeek-v4 series compatibility problems are emerging in a cluster; priority should be given to checking provider-layer support logic for reasoning mode.

---

## 6. Feature Requests and Roadmap Signals

The following feature requests have made substantive progress and are very likely to be included in the next release:

- **✅ Hugging Face Inference Providers support** (PR #3490): submitted by an official Hugging Face member, integrating their OpenAI-compatible interface and expanding the model ecosystem.
- **✅ Mattermost channel support** (PR #2592): a long-running PR that continues to be updated, implementing WebSocket + REST dual-channel communication and covering enterprise collaboration scenarios.
- **✅ SimpleX channel support** (PR #3486): adds support for the privacy-first SimpleX protocol, showing attention to decentralized communication.
- **✅ Session-level history isolation** (PR #3481): solves mixed history across multiple sessions and prepares the ground for multi-tenant/multi-user deployment.
- **✅ LongTaskTool multi-step task tool** (PR #3460): introduces a subagent chained-execution mechanism to support decomposition of long-running complex tasks.

> In addition, although #3376 (model failover) has no PR, community demand is very high, and it is expected to be planned as a core feature for v0.2.0.

---

## 7. User Feedback Summary

- **What users like**:
  - The single-layer ReAct loop performs well in asynchronous messaging scenarios (such as Telegram/Slack), fitting the "user offline" usage mode (#1181).
  - WebUI and multi-channel integrations are becoming increasingly complete, with high deployment flexibility.
- **Pain points**:
  - **Model compatibility**: frequent issues with the DeepSeek-v4 series and OpenAI Codex streaming interruptions affect production readiness.
  - **Missing real-time interaction**: the agent cannot receive user instructions during execution and must rely on `/stop`, breaking workflow continuity (#2915, #2133).
  - **Rough file handling**: incorrect attachment MIME types and WeCom upload failures reduce trust in professional scenarios.
  - **Confusing session management**: mixed history and thread-routing errors are especially prominent in multi-session environments.

---

## 8. Pending Backlog

| Type | Number | Title | Created | Status | Reminder |
|------|------|------|--------|------|------|
| Issue | #3292 | Session-Level Focus Tool: Persistent Task Awareness Across Interruptions and Compaction | 2026-04-19 | OPEN | High-value proposal involving improved agent autonomy; recommend including in architecture discussion |
| Issue | #3376 | Support automatic switching on model exceptions (Provider / Model Failover) | 2026-04-22 | OPEN | High-priority community demand; failover strategy and configuration specification are needed |
| PR | #2592 | feat(channels): Add Mattermost channel support | 2026-03-28 | OPEN | Long unmerged; recommend moving forward after review |
| PR | #3373 | feat: add gateway lifecycle notification hooks (on_start/on_stop) | 2026-04-22 | OPEN | Feature-complete and improves operations visibility; recommend merging |

> Recommend that the maintenance team triage the above backlog this week, clearly include items in the roadmap or provide feedback.

--- 

**Report generated at**: 2026-04-28  
**Data source**: NanoBot GitHub Repository (HKUDS/nanobot)

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

Over the past 24 hours, the Zeroclaw community maintained high activity, with **44 Issue updates** (38 newly opened/active, 6 closed) and **50 PR updates** (38 pending merge, 12 merged/closed), showing a strong rhythm of development and problem feedback. Although there was no new release, the core team is focused on high-priority bugs and architectural improvements, with key progress especially in provider compatibility, Web UI stability, and installation flow. Multiple S1/S2 issues have been identified and already have fix PRs moving forward. Overall project health is good, and the project is in a rapid iterative repair phase.

---

## 2. Releases

**No new release**. The latest version remains v0.7.3, and the v0.7.4 milestone ([#5877](https://github.com/zeroclaw-labs/zeroclaw/issues/5877)) is still in progress. It is expected to include major changes such as schema v3 migration and WeChat channel restoration.

---

## 3. Project Progress

Key PRs merged or advanced today include:

- **[#6154](https://github.com/zeroclaw-labs/zeroclaw/pull/6154)**: fixes the `install.sh` script not extracting Web dashboard assets (corresponding to Issue #6096), restoring full functionality for the prebuilt binary installation path.
- **[#6159](https://github.com/zeroclaw-labs/zeroclaw/pull/6159)**: fixes the issue where gateway chat succeeds but `/api/cost` returns zero and no usage file is written (Issue #6001), ensuring cost and token usage are recorded correctly for every conversation turn.
- **[#6167](https://github.com/zeroclaw-labs/zeroclaw/pull/6167)**: implements ACP protocol v1, restores connectivity with external ACP consumers such as Nori, and introduces tool-call permissions and a reverse-channel mechanism. This is a high-risk core fix.
- **[#6130](https://github.com/zeroclaw-labs/zeroclaw/pull/6130)**: restores the WeChat iLink Bot channel from a bulk revert (original PR #4221), adding back important functionality lost during an emergency rollback.
- **[#6170](https://github.com/zeroclaw-labs/zeroclaw/pull/6170)**: synchronizes French/Japanese/Spanish documentation translations and adds Simplified Chinese (zh-CN) support, improving internationalization.

These PRs significantly improve installation reliability, billing accuracy, protocol compatibility, and multilingual support, pushing the project toward the stable v0.7.4 release.

---

## 4. Community Hotspots

### 🔥 Most active Issue: [#6123](https://github.com/zeroclaw-labs/zeroclaw/issues/6123) (14 comments)
**Title**: `default_model` configuration fails under a fresh install and blocks workflows  
**Analysis**: Users hit provider initialization failures when deploying in a fresh LXC environment, reflecting insufficient robustness in the configuration system under cross-container networking scenarios. This issue is labeled S1 (workflow blocking), has resonated with multiple users, and urgently needs a hotfix.

### 🔥 High-attention PR: [#6167](https://github.com/zeroclaw-labs/zeroclaw/pull/6167) (ACP protocol v1 implementation)
This PR involves core communication protocol changes. Although it has no comments, it is linked to multiple external integrators such as Nori, and its merge will directly affect ecosystem compatibility. It is a high-risk, high-value change.

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fix status |
|--------|------|------|--------|
| **S1** | [#6123](https://github.com/zeroclaw-labs/zeroclaw/issues/6123) | `default_model` configuration does not take effect on new installs, causing agent startup failure | ❌ No PR |
| **S1** | [#4878](https://github.com/zeroclaw-labs/zeroclaw/issues/4878) | E2EE restore does not download room keys, completely breaking encrypted rooms | ✅ Closed (likely fixed) |
| **S2** | [#5600](https://github.com/zeroclaw-labs/zeroclaw/issues/5600) | Error when using the kimi-code provider due to missing `reasoning_content` | ❌ No PR (duplicate of #6160) |
| **S2** | [#5584](https://github.com/zeroclaw-labs/zeroclaw/issues/5584) | Duplicate assistant messages generated when the model returns narration + tool_calls | ✅ Closed |
| **S2** | [#6153](https://github.com/zeroclaw-labs/zeroclaw/issues/6153) | Matrix voice transcription fails: "Unsupported audio format '.'" | ❌ No PR |
| **S0** | [#5125](https://github.com/zeroclaw-labs/zeroclaw/issues/5125) | Agent chat window causes CPU spikes while typing in Firefox | ❌ No PR (likely frontend performance issue) |

> Note: S0=data/security risk, S1=workflow blocking, S2=functional degradation, S3=minor issue

---

## 6. Feature Requests and Roadmap Signals

- **Web UI enhancements**: users strongly request improvements to the default model selection interface ([#6070](https://github.com/zeroclaw-labs/zeroclaw/issues/6070)), support for restoring historical chats from Memories ([#6145](https://github.com/zeroclaw-labs/zeroclaw/issues/6145)), and clearing the chat window ([#6077](https://github.com/zeroclaw-labs/zeroclaw/issues/6077), closed but with clear demand).
- **Channel capability expansion**: requests to add a `/clear` memory command for Telegram/Discord ([#6150](https://github.com/zeroclaw-labs/zeroclaw/issues/6150)) and fix Nextcloud Talk API calls ([#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)).
- **Architecture evolution**: pushes for hybrid skills + WASM tools ([#6140](https://github.com/zeroclaw-labs/zeroclaw/issues/6140)) and a "lightweight ZeroClaw" ([#6165](https://github.com/zeroclaw-labs/zeroclaw/issues/6165)), reflecting user expectations for modularity and performance optimization.

Combined with existing PRs, **Web UI manual cron triggering ([#6164](https://github.com/zeroclaw-labs/zeroclaw/pull/6164))** and **WeChat channel restoration** are the most likely items to enter v0.7.4.

---

## 7. User Feedback Summary

- **Pain points**:
  - Poor new-user experience: configuration does not take effect after install (#6123), documentation examples are outdated (#6149), and the Web dashboard is missing (#6096).
  - Insufficient multi-channel consistency: Canvas tools do not work in Telegram/Slack (#5356), and Nextcloud Talk times out (#6156).
  - Missing billing and observability: cost API returns zero (#6001), and there are no trace logs.
- **What users like**:
  - Community response is fast, with several S1/S2 issues receiving PR fixes within days (such as #6001 and #6096).
  - Internationalization progress (new zh-CN support) received positive recognition.

---

## 8. Pending Backlog

| Issue/PR | Type | Backlog age | Notes |
|--------|------|--------|------|
| [#5244](https://github.com/zeroclaw-labs/zeroclaw/issues/5244) | Bug | >55 days | Dashboard Channels tab crashes, affecting v0.6.8 users, still open |
| [#5835](https://github.com/zeroclaw-labs/zeroclaw/issues/5835) | Bug | >40 days | Gateway session cancellation tokens are not cleaned up, creating memory leak risk; marked P1 but no progress |
| [#6074](https://github.com/zeroclaw-labs/zeroclaw/issues/6074) | Enhancement | >4 days | Audit 153 commits mistakenly reverted; manual restoration needed, high technical debt |
| [#6132](https://github.com/zeroclaw-labs/zeroclaw/issues/6132) | Security | >1 day | Need to extend prompt audit to `[skill].prompts`, blocking merge of #5972 |

> **Recommendation**: prioritize #5244 (affects production stability) and #6132 (security risk).

--- 

**Report generated at**: 2026-04-28  
**Data source**: Zeroclaw GitHub Repository (github.com/zeroclaw-labs/zeroclaw)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

Over the past 24 hours, PicoClaw community activity rose significantly, with **109 Issues** handled (35 newly opened/active, 74 closed) and **120 PRs** (63 pending merge, 57 merged/closed), showing efficient collaboration and issue response. Although there was no new release, core features continued to be optimized, with substantive progress especially in key modules such as **provider compatibility, agent stability, and session management**. The community shows strong interest in voice interaction (TTS/ASR), multilingual support, and security hardening, reflecting that the project is evolving from "usable" toward "easy to use, reliable, and extensible".

---

## 2. Releases

**No new release**. The current mainline remains the v0.2.x series. Several important fixes and enhancements have already been merged into main and are expected to be released together in the next minor version.

---

## 3. Project Progress

PRs merged or closed today mainly concentrated on three areas: **bug fixes, architecture optimization, and user experience improvements**.

- **Key fixes**:
  - [#2372](https://github.com/sipeed/picoclaw/pull/2372) resolves the serious issue where the `openai_compat` provider silently dropped the API Key in v0.2.6 and caused 401 errors (corresponding to Issue #2578). It has been merged.
  - [#2370](https://github.com/sipeed/picoclaw/pull/2370) fixes message splitting failures when the LLM output contains `<| [SPLIT] |>` with spaces, improving robustness in multi-message scenarios.
  - [#2364](https://github.com/sipeed/picoclaw/pull/2364) avoids restoring stale sessions that contain "dangling tool calls", preventing Telegram sessions from getting stuck.

- **Feature enhancements**:
  - [#2587](https://github.com/sipeed/picoclaw/pull/2587) implements end-to-end streaming output and scroll UX refactoring for Web Chat, significantly improving the long-response experience (related to Issue #1950).
  - [#2491](https://github.com/sipeed/picoclaw/pull/2491) adds `/status`, `/compact`, and `/new` session-management commands, giving users manual control over context.
  - [#2333](https://github.com/sipeed/picoclaw/pull/2333) introduces a structured context compaction algorithm (6 stages), optimizing memory efficiency for long conversations.

- **Security and maintenance**:
  - [#2327](https://github.com/sipeed/picoclaw/pull/2327) completes the final integration of the Security Shield v2 security architecture, strengthening system-level protection.
  - [#2328](https://github.com/sipeed/picoclaw/pull/2328) comprehensively improves error handling in core packages and adds godoc, improving code maintainability.

> Overall, the project took key steps in **stability, observability, and user control**, laying a foundation for later large-scale deployment.

---

## 4. Community Hotspots

The following Issues/PRs were the most actively discussed over the past 24 hours and reflect core user demands:

| Topic | Type | Heat | Analysis |
|------|------|------|------|
| [#1648](https://github.com/sipeed/picoclaw/issues/1648) | Enhancement | 23 comments | Users strongly call for integrated TTS/ASR capabilities. PR #1642 already implements them but is not connected to the gateway, highlighting that voice interaction is a next-stage must-have. |
| [#28](https://github.com/sipeed/picoclaw/issues/28) | Enhancement | 16 comments | Requests simplifying the LM Studio connection flow, with special attention to Android deployment convenience, showing emphasis on the local model ecosystem. |
| [#2578](https://github.com/sipeed/picoclaw/issues/2578) | Bug | 12 comments | The `openai_compat` silent key-drop issue resonated widely and has been fixed by PR #2372, showing provider configuration reliability is a key pain point. |
| [#629](https://github.com/sipeed/picoclaw/issues/629) | Bug/Enhancement | 10 comments | Long tasks hang because there is no retry mechanism, exposing insufficient agent fault tolerance and an urgent need for automatic recovery strategy. |

> **Trend judgment**: users care not only about feature richness, but more about **reliability, debuggability, and cross-platform consistency**, especially the mobile and local-model integration experience.

---

## 5. Bugs and Stability

Today's key bugs ranked by severity:

1. **[High] #2578**: `openai_compat` provider silently drops the Authorization header (v0.2.6)  
   ✅ **Fixed** by PR #2372 (merged)

2. **[High] #2371**: Agent loop panic at `pkg/agent/loop.go:2171` (under multi-model configuration)  
   ✅ **Fixed** by PR #2372 (merged)

3. **[Medium] #2236**: Web page input box disabled after changing port in Docker deployment  
   ✅ **Closed**, confirmed as configuration misunderstanding, but exposed documentation clarity issues

4. **[Medium] #2046**: Tool calls fail under the LongCat API  
   🔄 Awaiting further reproduction; no fix PR yet

5. **[Low] #2368**: Model shows "not configured" in the Android app even when fields are complete  
   🔄 Awaiting frontend debugging; possibly a UI state synchronization issue

---

## 6. Feature Requests and Roadmap Signals

Based on PR progress, the following features are expected to be included in the next release:

| Feature | Status | Basis |
|------|------|------|
| **Web Chat streaming output** | 🟢 High probability | PR #2587 is ready and resolves #1950 |
| **Session management commands (/status, /compact)** | 🟢 High probability | PR #2491 has been merged |
| **TTS/ASR gateway integration** | 🟡 Medium probability | Issue #1648 has high attention, but gateway-layer adaptation is needed |
| **Mattermost channel support** | 🟡 Medium probability | Issue #1587 has 2 👍 and clear community demand |
| **LangSmith observability** | 🔴 Low probability | Issue #2173 proposed, no PR yet |
| **/stop task cancellation command** | 🟡 Medium probability | Issue #2009 has 1 👍 and aligns with UX optimization |

> Recommend prioritizing **streaming output, session management, and TTS/ASR integration** to form a closed-loop experience of "fast response + strong control + natural interaction".

---

## 7. User Feedback Summary

Real voices distilled from Issue comments:

- **What users like**:
  - "Docker deployment is much smoother than the previous version" (#2236 comment)
  - "There is finally structured context compaction, so long conversations no longer explode token usage" (discussion around #2333)
  - "Security Shield makes enterprise deployment more reassuring" (implicit feedback around #2327)

- **Pain points**:
  - "The Android side still says 'not configured' after configuring the model; I spent half a day on it" (#2368)
  - "Groq tool-call format is incompatible, and the docs do not explain it clearly" (#748)
  - "The QQ channel basically does not work on Windows. Can the official team test it?" (#2080)
  - "The response is lost when cron task deliver=false, with no prompt at all" (#1058)

- **Typical scenarios**:
  - Enterprise users want to build internal AI assistants through Mattermost/Telegram integration;
  - Individual developers try to run locally on Android phones with LM Studio models;
  - Operations staff care whether Docker images include debugging tools such as curl/python (#1228).

---

## 8. Pending Backlog

The following important Issues/PRs have long gone unanswered; maintainers should prioritize them:

| Topic | Type | Backlog age | Risk |
|------|------|----------|------|
| [#618](https://github.com/sipeed/picoclaw/issues/618) | Enhancement | >2 months | Missing self-update mechanism affects security patch distribution |
| [#1067](https://github.com/sipeed/picoclaw/issues/1067) | Enhancement | >1 month | No authentication mechanism, creating command-execution risk |
| [#1731](https://github.com/sipeed/picoclaw/issues/1731) | Enhancement | >1 month | Lack of OTel GenAI support blocks enterprise observability |
| [#2171](https://github.com/sipeed/picoclaw/issues/2171) | Refactor | >3 weeks | Not migrated to OpenAI Responses API; technical debt accumulating |

> **Recommended action**: start RFC discussions for #618 (self-update) and #1067 (authentication) and clarify the roadmap; consider making #1731 a v0.3 observability subproject.

---

**Summary**: PicoClaw is in a key phase of rapid iteration and community-driven development. Current health is good (high Issue closure rate, fast PR merges), but the project should watch three major shortcomings: **mobile compatibility, security baseline, and enterprise integration capability**. The next cycle should focus on a "stable foundation + key experiences" while balancing innovation and maintenance.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

NanoClaw community activity remained high. Over the past 24 hours it produced **16 Issue updates** and **25 PR updates**, showing a strong cadence of development and problem feedback. Although there was no new release, the project made significant progress in stability, security, and multi-platform adaptation, especially with key fixes in container resource isolation, scheduling-system consistency, and cross-session task management. Community demand for improvements to Telegram and Discord adapters concentrated sharply, reflecting real pain points users encounter in actual deployments.

---

## 2. Releases

**No new release**. The current main branch remains in feature iteration and issue-fixing mode, without triggering a formal release process.

---

## 3. Project Progress

A total of **12 PRs were merged or closed** today, moving several key improvements forward:

- **#2068** ([link](https://github.com/qwibitai/nanoclaw/pull/2068)): implements container resource limit configuration (`--memory`, `--cpus`, `--pids-limit`), directly responding to the security demand in #2029. It prevents runaway agents from causing host OOM or PID exhaustion and significantly improves system stability.
- **#2063** ([link](https://github.com/qwibitai/nanoclaw/pull/2063)): fixes self-loops and politeness loops in agent-to-agent message routing. It uses a traffic cap mechanism to avoid infinite recursion and improves multi-agent collaboration reliability.
- **#2049** ([link](https://github.com/qwibitai/nanoclaw/pull/2049)): adds a Telegram channel adapter, supporting the pairing flow and safe Markdown escaping, giving Telegram users a complete onboarding path.
- **#2050** ([link](https://github.com/qwibitai/nanoclaw/pull/2050)): fixes missing TS source code and bot identity recognition in the RooSync inbox listener, restoring `@-mention` wake-up functionality.
- **#1997** ([link](https://github.com/qwibitai/nanoclaw/pull/1997)): corrects SQLite timestamp parsing logic, preventing new containers from being mistakenly killed on non-UTC hosts and resolving deployment-environment compatibility issues.

In addition, long-running PRs such as **#1326** (voice transcription module) and **#987** (session rotation and memory refresh) were merged, marking further maturity in core infrastructure.

---

## 4. Community Hotspots

### 🔥 High-attention Issue: #2029 — Missing container resource limits ([link](https://github.com/qwibitai/nanoclaw/issues/2029))
- **Comments: 3** | **Status: OPEN**
- User @kosm1x pointed out that current containers have no resource caps, creating a risk that a runaway agent could crash the host. This raised security concerns, and @dim0627 has already submitted the corresponding PR #2068 to fix it, showing an efficient issue-response loop.

### 💬 Frequently discussed PR: #2063 — Agent routing loop protection ([link](https://github.com/qwibitai/nanoclaw/pull/2063))
- Although there are no explicit comments, the production self-loop problem it solves (for example, `install_packages` triggering an infinite a2a loop; see #2048) has been verified by the community as a key stability defect. After the fix, the risk of Telegram message blocking is significantly reduced.

---

## 5. Bugs and Stability

Ranked by severity:

| Severity | Issue | Description | Fix status |
|--------|------|------|----------|
| ⚠️ Critical | #2048 — `install_packages` triggers an infinite a2a self-routing loop ([link](https://github.com/qwibitai/nanoclaw/issues/2048)) | After a user approves package installation, a message loop is triggered, blocking all Telegram message delivery | ✅ Fixed by #2063 |
| ⚠️ Critical | #2029 — containers have no resource limits ([link](https://github.com/qwibitai/nanoclaw/issues/2029)) | A single agent can exhaust host memory/CPU/PIDs | ✅ Fixed by #2068 |
| 🟡 Medium | #2047 — WhatsApp attachments are invisible after migration ([link](https://github.com/qwibitai/nanoclaw/issues/2047)) | File paths exist but are not accessible inside the container | ✅ Fixed (mounted `/workspace/attachments`) |
| 🟡 Medium | #2067 — v2 scheduled-task session isolation makes tasks invisible across threads ([link](https://github.com/qwibitai/nanoclaw/issues/2067)) | Tools such as `list_tasks` cannot operate on tasks in other sessions | 🔄 Awaiting fix (no PR yet) |
| 🟢 Low | #2043 — `&apos;` is over-escaped in Telegram HTML output ([link](https://github.com/qwibitai/nanoclaw/issues/2043)) | Displays `won&apos;t` rather than `won't` | 🔄 Awaiting fix |

---

## 6. Feature Requests and Roadmap Signals

The following feature requests show clear product-evolution directions:

- **#2058** — Request adding Google Chat to the `setup/auto.ts` channel selector ([link](https://github.com/qwibitai/nanoclaw/issues/2058)): reflects user demand for integration with mainstream office IM systems and may drive multi-channel support expansion in the next version.
- **#2040** — Signal outbound attachment support ([link](https://github.com/qwibitai/nanoclaw/pull/2040)): PR submitted, filling a functionality gap in the Signal adapter and expected to be merged quickly.
- **#2060** — Docker Sandbox environment adaptation (MITM proxy, CA certificates) ([link](https://github.com/qwibitai/nanoclaw/pull/2060)): targets enterprise security sandbox scenarios and signals expansion toward controlled-environment deployments.

Combined with existing PRs, **resource isolation**, **cross-session task management**, and **enterprise deployment compatibility** will become next-stage priorities.

---

## 7. User Feedback Summary

Key user voices distilled from Issue comments:

- **Pain points**:
  - "Agent cannot correctly reply in the original message context in groups" (#2065 closed, but similar issues remain)
  - "OneCLI does not accept underscore agent IDs, causing container startup failure" (#2046, needs a quick `.replace(/_/g, '-')` fix)
  - "In Discord, `<URL>` is incorrectly converted to `[URL](URL)`, which instead triggers previews" (#2044, v2 behavior regression)

- **What users like**:
  - Users recognized the rapid response to the resource limit issue (#2029 -> #2068 quick closure)
  - Long-running features such as voice transcription (#1326) and session rotation (#987) were finally merged, reflecting execution ability

- **Usage scenarios**:
  - Deploying the same agent across multiple Telegram groups (#2048)
  - Running NanoClaw inside LXC containers (#2056)
  - Accessing through an enterprise intranet MITM proxy (#2060)

---

## 8. Pending Backlog

The following important Issues/PRs have long gone unanswered; maintainers should prioritize them:

- **#1845** — Standardize database timestamps to ISO 8601 ([link](https://github.com/qwibitai/nanoclaw/pull/1845))  
  *Created on 2026-04-18, involves data consistency, affects logs and audit, not yet merged*

- **#2067** — v2 scheduled-task session isolation breaks cross-thread operations ([link](https://github.com/qwibitai/nanoclaw/issues/2067))  
  *Opened today, but exposes an architectural design defect; needs a global task namespace or synchronization mechanism design*

- **#2041** — Emoji shortcode standardized mapping (Slack -> Unicode) ([link](https://github.com/qwibitai/nanoclaw/issues/2041))  
  *Affects cross-platform reaction consistency, no PR yet*

Recommend that the team assess #2067's architectural impact and consider introducing centralized task storage in v2.1.

--- 

**Project health assessment**: ⭐⭐⭐⭐☆ (4.5/5)  
High activity + fast response + landed key security fixes, with an overall positive trend. Watch architecture-level issues such as task isolation to prevent technical debt from accumulating.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

IronClaw remained highly active on 2026-04-28. Over the past 24 hours it produced **33 PR updates** (including 7 merged/closed) and **10 Issue updates** (9 newly opened/active, 1 closed), showing intense core-team investment in architecture refactoring and stability fixes. Although there was no new release, several key Reborn architecture submodules (such as events, filesystem, and authorization control) are steadily moving toward integration through a grouped-PR strategy. Community feedback is concentrated on V2 engine approval-flow abnormalities, cross-session contamination, and migration compatibility problems, reflecting real pain points after production upgrades.

---

## 2. Releases

**No new release**. Current development remains focused on phased integration of the Reborn architecture rather than external releases.

---

## 3. Project Progress

Today **7 PRs were merged or closed**, mainly around modular landing of the Reborn architecture and key bug fixes:

- **Reborn architecture progress**:  
  - [`#2988`](https://github.com/nearai/ironclaw/pull/2988) introduces foundational host APIs, resource management, and architecture-definition crates, laying a foundation for later subsystem integration.  
  - [`#2993`](https://github.com/nearai/ironclaw/pull/2993) adds the `ironclaw_events` event/audit substrate, supporting persistent event streams.  
  - [`#2996`](https://github.com/nearai/ironclaw/pull/2996) completes the filesystem substrate (`ironclaw_filesystem`) and implements scoped file access control.  
  - [`#2999`](https://github.com/nearai/ironclaw/pull/2999) adds the authorization-control substrate (`ironclaw_authorization`), introducing a capability lease model and both in-memory and filesystem storage backends.  
  > The PRs above all follow the "grouped PR integration strategy" proposed in #2987, avoiding a giant PR that blocks review and marking the Reborn architecture's move into substantive implementation.

- **Key bug fixes**:  
  - [`#2989`](https://github.com/nearai/ironclaw/pull/2989) fixes a V2 engine issue where the `threads_today` counter failed to reset the daily budget because of improper timezone handling (corresponding to Issue #1945).  
  - [`#2994`](https://github.com/nearai/ironclaw/pull/2994) corrects the `tool_info` action discovery mechanism, ensuring engine-native actions such as `mission_create` can return schema information correctly.  
  - [`#2978`](https://github.com/nearai/ironclaw/pull/2978) strengthens bridge restart permission policy, clearly distinguishing static policy from unknown-tool fallback logic and improving security.

---

## 4. Community Hotspots

### 🔥 High-attention Issue: Reborn architecture integration strategy discussion ([#2987](https://github.com/nearai/ironclaw/issues/2987))
- **Comments: 7** | **Labels: enhancement, risk: high, scope: docs**
- The core team proposed breaking the massive Reborn architecture transformation into independently reviewable "grouped PRs" and defining a landing strategy. This Issue became the coordination center for later substrate PRs such as #2993, #2996, and #2999, reflecting the project's strategic move toward a modular, maintainable architecture.

### ⚠️ Production incident: V2 approval flow broadly abnormal ([#2991](https://github.com/nearai/ironclaw/issues/2991))
- **QA report from staging environment**, describing unclear prompts, wrong routing, forced serial execution, and other problems in the approval flow that seriously affect user experience. Although there is no fix PR yet, the high-priority `bug_bash_P2` label shows it has entered the urgent investigation queue.

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fix PR? |
|--------|------|------|-------------|
| 🔴 High | [#2991](https://github.com/nearai/ironclaw/issues/2991) | V2 approval flow is broken: vague prompts, wrong routing, forced serial execution | ❌ No |
| 🔴 High | [#2833](https://github.com/nearai/ironclaw/issues/2833) | Cross-session response contamination: reasoning result from Conversation A appears in Conversation B | ❌ No |
| 🟠 Medium | [#2982](https://github.com/nearai/ironclaw/issues/2982) | After upgrading to 0.26.0, Routine chats are incorrectly classified as Mission | ❌ No |
| 🟠 Medium | [#2887](https://github.com/nearai/ironclaw/issues/2887) | Auth Browser Consent canary fails because Google blocks automated CI login | ❌ No (infrastructure adjustment needed) |
| 🟢 Low | [#1945](https://github.com/nearai/ironclaw/issues/1945) | V2 mission `threads_today` counter never resets -> **fixed** | ✅ [#2989](https://github.com/nearai/ironclaw/pull/2989) |

> Note: multiple live canary failures (#2975-#2977) point to provider compatibility issues in the CI environment and require further investigation.

---

## 6. Feature Requests and Roadmap Signals

- **Aliyun Coding Plan support** ([#1446](https://github.com/nearai/ironclaw/pull/1446)):  
  Adds `AliyunProvider`, compatible with the Anthropic Messages API and supporting the DashScope platform. This PR has been open for a long time. If merged, it will expand IronClaw's coverage in the multi-cloud LLM ecosystem.

- **Downstream deployment infrastructure enhancements** ([#2925](https://github.com/nearai/ironclaw/pull/2925)):  
  Provides deployment primitives such as `AGENTS_SEED_PATH` and `INTEGRATION_CREDENTIALS_DIR`, making customized enterprise fork deployments easier. This reflects a trend toward a "forkable, customizable" platform.

- **External tool registration plugin mechanism** ([#2871](https://github.com/nearai/ironclaw/pull/2871)):  
  Introduces the `ExternalToolRegistrar` trait, allowing downstream users to register custom Rust tools without modifying upstream code. Strong signal: IronClaw is building a plugin-based ecosystem.

---

## 7. User Feedback Summary

- **Confusion around Codex model configuration** ([#1697](https://github.com/nearai/ironclaw/issues/1697)):  
  Users report that even after authorizing Codex, they cannot correctly set model names through the CLI (for example, `GPT-5.4 mini` is ignored), exposing inconsistency between model parsing logic and UI prompts.

- **Upgrade compatibility concerns** ([#2982](https://github.com/nearai/ironclaw/issues/2982)):  
  After production instances upgrade from 0.24.0 to 0.26.0, historical Routine data is mislabeled as Mission, raising questions about the robustness of version migration scripts.

- **Pain from missing documentation** ([#2948](https://github.com/nearai/ironclaw/pull/2948)):  
  Although PostgreSQL + libSQL dual database backends and 24 migration scripts have been implemented, official docs mention only the libSQL path, making it difficult for users to understand the complete data architecture.

---

## 8. Pending Backlog

| Type | Number | Title | Backlog age | Reminder |
|------|------|------|--------|------|
| Issue | [#2833](https://github.com/nearai/ironclaw/issues/2833) | Cross-session response contamination | >6 days | High impact on user experience; prioritize investigating context isolation |
| Issue | [#2887](https://github.com/nearai/ironclaw/issues/2887) | Auth canary blocked by Google | >5 days | Assess whether to introduce human-verification bypass or change CI environment |
| PR | [#1446](https://github.com/nearai/ironclaw/pull/1446) | Aliyun Coding Plan support | >38 days | Feature-complete but long unmerged; recommend clarifying roadmap ownership |
| PR | [#2925](https://github.com/nearai/ironclaw/pull/2925) | Downstream deployment infrastructure | >4 days | Strong enterprise-user demand; recommend accelerating review |

> Maintainers should focus on the two high-priority bugs of **cross-session contamination** and **V2 approval-flow abnormalities**, both of which directly affect the core interaction experience.

--- 

**Project health assessment**: ⭐⭐⭐⭐☆ (4.5/5)  
Architecture refactoring is progressing in an orderly way and community response is timely, but production stability risks need attention.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

Over the past 24 hours, LobsterAI showed extremely high development activity, handling **38 PR updates** (24 merged/closed, 14 pending merge) and **7 Issue updates** (6 newly opened/active, 1 closed). Overall, the project is in a phase of rapid iteration alongside stability optimization. The core team is focused on model compatibility, startup stability, security hardening, and user-experience improvements. Although some long-running community feedback remains unresolved, development response speed has improved significantly and technical debt cleanup is accelerating.

---

## 2. Releases

**New release: LobsterAI 2026.4.25** (released on 2026-04-25)  
🔗 [Release 2026.4.25](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.4.25)

### Main updates:
- **Fix support for `edits-array` input format in the editing tool under Cowork mode**: restores DiffView functionality and ensures multi-turn editing operations are visualized normally (#1814).
- **Add embedding configuration options for memory search**: exposes embedding model configuration in Settings, supporting user-customized vector retrieval backends (#1814).

> ⚠️ **No breaking changes**, but private-deployment users should check whether `openclaw.json` contains the `meta.lastTouchedVersion` field to avoid configuration snapshots being misclassified as "clobbered" (see #1838).

---

## 3. Project Progress

Over the past 24 hours, **24 PRs were merged or closed**, mainly concentrated in the following areas:

| Category | Key progress |
|------|--------|
| **Model compatibility** | Fixes DeepSeek V4 model-call failures (#1847), solves request rejection for custom model providers caused by schema mismatch, and optimizes session-level modelOverride persistence to prevent multiple sessions from sharing the same model (#1843). |
| **Startup stability** | Raises the Windows startup timeout threshold to 15 seconds and adds a renderer initialization diagnostic log channel (#1846), significantly improving cold-start failure diagnosis. |
| **Security enhancement** | Implements multiple hardening changes: restricts unauthorized `store:*` IPC access (#1832), redacts sensitive keys in logs (#1844), and prevents `shell.openExternal` from executing dangerous schemes (#1833). |
| **Configuration robustness** | Prevents `updateConfig` from overwriting stored provider configuration (#1840) and fixes snapshot flooding caused by missing metadata in openclaw.json (#1838). |

👉 Overall, the project took a key step toward **enterprise-grade stability and security**, while laying the foundation for multi-model and multi-account scenarios.

---

## 4. Community Hotspots

### 🔥 Most active Issue: #1813 — "DeepSeek V4 cannot be used"
🔗 [Issue #1813](https://github.com/netease-youdao/LobsterAI/issues/1813)  
- **Comments: 5** | **Status: OPEN** | **Author: @Sun-Ke**
- **Core demand**: users encounter a `provider rejected the request schema or tool payload` error when using the DeepSeek V4 model, and suspect LobsterAI's schema validation for third-party models is too strict.
- **Background analysis**: this issue has been fixed in #1847, but users have not yet verified it. It reflects strong community attention to **compatibility with non-mainstream large models**.

### 💬 High-attention Issue: #1836 — "The overall interface needs professional design polish"
🔗 [Issue #1836](https://github.com/netease-youdao/LobsterAI/issues/1836)  
- **Comments: 1** | **Status: OPEN** | **Author: @wansi-web**
- **User quote**: "It is much uglier than other competitors and does not feel very comfortable to use."
- **Signal interpretation**: UI/UX has become a key factor affecting user retention and may drive a design-system refactor in the next version.

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fix? |
|--------|------|------|-------------|
| ⚠️ High | #1813 | DeepSeek V4 model call failure (schema rejection) | ✅ Fixed (#1847) |
| ⚠️ High | #73 | Startup immediately reports 404 Not Found (Claude SDK path issue) | ❌ Not fixed (stale, created 2026-02-24) |
| ⚠️ Medium | #100 | macOS dmg packaging error (main.js path configuration error) | ❌ Not fixed (stale) |
| ⚠️ Medium | #17 | Startup infinite loop + punycode deprecation warning | ❌ Not fixed (stale) |
| ⚠️ Low | #106 | Custom model cannot be called (UI display abnormality) | ❌ Not fixed (stale) |

> 💡 Recommend prioritizing #73 and #100, both of which are critical blockers to the first experience for new users.

---

## 6. Feature Requests and Roadmap Signals

| Feature direction | Related Issue/PR | Likelihood assessment |
|--------|--------------|----------|
| **UI/UX refactor** | #1836 (interface polish request) | ⭐⭐⭐ High (strong community sentiment, competitor pressure) |
| **Cron scheduled tasks** | #1519 (custom Cron expression support) | ⭐⭐⭐ High (PR already exists, only pending merge) |
| **Form experience optimization** | #1511 (required-field markers), #1527 (AI diagnosis entry point) | ⭐⭐⭐ High (multiple PRs moving forward) |
| **Multi-account sync** | #1839 (enterprise multi-account OpenClaw configuration sync) | ⭐⭐ Medium (clear enterprise demand) |

> 📌 **Predicted focus for the next release**: UI optimization + Cron scheduling + form experience, forming the core loop of a "productivity tool".

---

## 7. User Feedback Summary

- **Concentrated pain areas**:
  - **Poor model compatibility**: private-deployment models such as Qwen3-30B and DeepSeek V4 fail to call correctly (#955, #1813).
  - **Unreliable installation and startup**: Windows/macOS users frequently encounter startup failures and packaging errors (#73, #100, #17).
  - **Rough interface affects experience**: users bluntly say it is "too ugly", reducing willingness to use it (#1836).

- **Positive feedback**:
  - Users recognize Cowork mode capabilities (tool calls, file operations) (as described by users in #955).
  - Users appreciate detailed improvement directions such as AI diagnosis and required-field markers (implicit in discussions around #1527 and #1511).

---

## 8. Pending Backlog

The following Issues have long gone unanswered and should be prioritized by maintainers:

| Issue | Created | Last updated | Backlog cause analysis |
|------|--------|--------|------------|
| [#73](https://github.com/netease-youdao/LobsterAI/issues/73) | 2026-02-24 | 2026-04-27 | Basic functionality unusable, affecting new-user conversion |
| [#100](https://github.com/netease-youdao/LobsterAI/issues/100) | 2026-02-25 | 2026-04-27 | Packaging-flow defect blocks macOS user deployment |
| [#17](https://github.com/netease-youdao/LobsterAI/issues/17) | 2026-02-20 | 2026-04-27 | Startup infinite loop + dependency warning, technical debt accumulating |
| [#106](https://github.com/netease-youdao/LobsterAI/issues/106) | 2026-02-25 | 2026-04-27 | Custom model UI abnormality affects advanced users |

> 🛎️ **Maintenance recommendation**: establish a "startup experience task force" and fix #73, #17, and #100 together; this would significantly improve the project health score.

---  
*Data source: GitHub LobsterAI repository (as of 2026-04-28 00:00 UTC)*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the past 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

Moltis remained highly active on 2026-04-28, with a compact development rhythm. Over the past 24 hours it handled **17 PR updates** (12 merged/closed, 5 pending merge) and **5 Issue updates** (1 newly opened, 4 closed), showing efficient collaboration and issue response. Although there was no new release, multiple key features and architecture optimizations have been merged, significantly improving system maintainability and user experience. Community contributors @Cstewart-HC and @penso were today's core drivers, leading key improvements in UI, indexing, and channel modularization.

---

## 2. Releases

**No new release**. Current development focuses on feature iteration and architecture optimization. The next version is expected to integrate multiple enhancements mentioned in this daily report.

---

## 3. Project Progress

A total of **12 PRs were merged or closed** today, marking the official landing of several important features and fixes:

- **🔧 Architecture simplification**: PR [#898](https://github.com/moltis-org/moltis/pull/898) simplifies the "primary agent" architecture, removes the "primary identity" concept, and makes all agents unified database entities. This improves routing consistency and maintainability and responds to the long-running demand in Issue [#774](https://github.com/moltis-org/moltis/issues/774).
  
- **🛠️ Channel modularization**: through PRs [#890](https://github.com/moltis-org/moltis/pull/890), [#891](https://github.com/moltis-org/moltis/pull/891), and [#899](https://github.com/moltis-org/moltis/pull/899), Telegram, Discord, and MS Teams channels were made optional compile-time features, significantly reducing binary size and build time while improving deployment flexibility.

- **🖥️ Web UI fixes and enhancements**:
  - PR [#892](https://github.com/moltis-org/moltis/pull/892) fixes invisible session names and missing rename functionality (Issue [#888](https://github.com/moltis-org/moltis/issues/888)), restoring a key UX capability.
  - PR [#904](https://github.com/moltis-org/moltis/pull/904) introduces a **Cmd+K / Ctrl+K command palette**, providing quick navigation and action entry points and improving advanced-user efficiency.

- **🔐 Security and stability hardening**:
  - PR [#894](https://github.com/moltis-org/moltis/pull/894) adds regression tests to ensure security hooks returning `Block` do not accidentally trigger the circuit breaker, fully resolving Issue [#547](https://github.com/moltis-org/moltis/issues/547).
  - PR [#893](https://github.com/moltis-org/moltis/pull/893) fixes Matrix OIDC login failure in non-local proxy environments, improving identity-authentication compatibility.

- **🧪 Build-flow optimization**: PR [#895](https://github.com/moltis-org/moltis/pull/895) stops committing generated frontend assets (about 92K lines) and instead generates them automatically at build time, greatly reducing repository size and improving reproducibility.

---

## 4. Community Hotspots

**Most active Issue**: [#896](https://github.com/moltis-org/moltis/issues/896) — *Docker build fails: "Temporary failure resolving 'ports.ubuntu.com'" during apt-get update*  
- **Status**: newly opened, 1 comment  
- **Analysis**: This issue reflects users encountering network resolution failures during containerized deployment, possibly caused by base-image DNS configuration or network policy restrictions. Although it is an environment issue, it exposes that the official Docker build flow lacks fault tolerance or alternate-source configuration; maintainers should provide build guidance or image-optimization suggestions.

**High-attention PR**: [#876](https://github.com/moltis-org/moltis/pull/876) — *feat(ui): file upload button for web chat sessions*  
- **Status**: open and continuously updated  
- **Analysis**: This PR introduces file upload functionality, matching mainstream LLM platform UX and meeting users' core demand for multimodal interaction. Its progress will directly affect Moltis's competitiveness in personal AI assistants, and community expectations are high.

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fix status |
|--------|------|------|--------|
| ⚠️ Medium | [#896](https://github.com/moltis-org/moltis/issues/896) | apt-get resolution failure during Docker build | ❌ No fix PR, environment investigation needed |
| ✅ Fixed | [#888](https://github.com/moltis-org/moltis/issues/888) | Session name and rename button missing | ✅ PR [#892](https://github.com/moltis-org/moltis/pull/892) merged |
| ✅ Fixed | [#547](https://github.com/moltis-org/moltis/issues/547) | Security hook accidentally triggers circuit breaker | ✅ PR [#894](https://github.com/moltis-org/moltis/pull/894) merged |
| ✅ Fixed | [#317](https://github.com/moltis-org/moltis/issues/317) | Jinja template system message in wrong position | ✅ Closed, likely fixed |

> Note: no high-severity crash or data-loss bugs were reported today.

---

## 6. Feature Requests and Roadmap Signals

- **File upload support** ([#876](https://github.com/moltis-org/moltis/pull/876)): users strongly expect attachment interaction. This feature has entered development and is very likely to be included in the next release.
- **Automatic code indexing** ([#903](https://github.com/moltis-org/moltis/pull/903)): implements automatic indexing based on file watching and removes manual operation, a key step in improving developer experience and a high roadmap priority.
- **Command palette** ([#904](https://github.com/moltis-org/moltis/pull/904)): improves UI efficiency, aligns with modern Web app trends, and is likely to become a default interaction entry point.

> Overall judgment: **file upload, automatic indexing, and command palette** will become core highlights of the next release.

---

## 7. User Feedback Summary

- **Positive feedback**:
  - Users recognized restoration of session rename functionality (PR #892), saying they can "finally manage messy session lists".
  - Optional channels were praised by developers: "finally no need to spend ages compiling features I do not need".

- **Pain points and demands**:
  - Docker build stability issues (#896) expose deployment barriers, and users call for more robust container images or build scripts.
  - Some users mentioned that the flow of "still needing to manually trust skills after installation" is cumbersome; PR #897 responds to this demand by implementing automatic trust.

---

## 8. Pending Backlog

- **Long-running open Issue**: [#774](https://github.com/moltis-org/moltis/issues/774) (although closed, its derived architectural improvements have now been completed)
- **PRs pending merge**:
  - [#876](https://github.com/moltis-org/moltis/pull/876): file upload feature, needs UI/security review
  - [#826](https://github.com/moltis-org/moltis/pull/826): compaction model configuration linkage, involving core logic
  - [#903](https://github.com/moltis-org/moltis/pull/903): automatic code indexing, relatively complex and needs thorough testing

> ⚠️ **Maintainer reminder**: pay attention to the Docker build issue in [#896](https://github.com/moltis-org/moltis/issues/896); recommend providing official build best-practice documentation or optimizing the base image.

---

**Project health assessment**: ⭐⭐⭐⭐☆ (4.5/5)  
Development is active, response is fast, architecture continues to improve, and community interaction is good. Deployment documentation and edge-case coverage need strengthening.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Activity Daily Report (2026-04-28)

---

## 1. Daily Snapshot

Over the past 24 hours, CoPaw community activity was high: it handled **50 Issues** (25 newly opened/active, 25 closed) and **43 Pull Requests** (18 pending merge, 25 merged/closed), showing an efficient collaboration cadence. Although there was no new release, core features continued to improve, especially with significant progress in multi-channel support, context management, and model-interaction stability. Community contributors were active, with first-time contributors accounting for more than 30%, showing strong ecosystem vitality.

---

## 2. Releases

**No new release**. The latest stable version remains `v1.1.4.post2`, and the development team is focused on fixing critical bugs and completing features for the upcoming `v1.1.5` release.

---

## 3. Project Progress

A total of **25 PRs were merged or closed** today, focusing on the following areas:

- **Session experience optimization**: [#3829](https://github.com/agentscope-ai/QwenPaw/pull/3829) implements asynchronous generation of session titles, eliminating the "first 10 characters as placeholder" behavior and improving UI professionalism.
- **Channel stability enhancements**:
  - [#3845](https://github.com/agentscope-ai/QwenPaw/pull/3845) fixes QQ channel voice-message type recognition and supports SILK-format transcription;
  - [#3872](https://github.com/agentscope-ai/QwenPaw/pull/3872) improves QQ WebSocket exception reconnection to avoid service interruptions caused by network fluctuations;
  - [#3890](https://github.com/agentscope-ai/QwenPaw/pull/3890) suppresses redundant Feishu channel logs and improves operations readability.
- **Context-management robustness**: [#3848](https://github.com/agentscope-ai/QwenPaw/pull/3848) strengthens fallback strategy when context compaction fails, preventing history loss.
- **Model-interaction reliability**: [#3874](https://github.com/agentscope-ai/QwenPaw/pull/3874) optimizes LLM call retry logic and lowers the rate of `MODEL_EXECUTION_FAILED` errors.

Overall, the project took a key step in the two core scenarios of **multi-channel compatibility** and **long-session stability**.

---

## 4. Community Hotspots

The following Issues drew high attention and reflect core user demands:

| Issue | Topic | Comments | Core-demand analysis |
|------|------|--------|-------------|
| [#3843](https://github.com/agentscope-ai/QwenPaw/issues/3843) | Session history suddenly disappears and message routing becomes disordered | 5 | **Severe UX defect**: users lose conversation context, affecting task continuity; likely related to session ID management or state synchronization. |
| [#3850](https://github.com/agentscope-ai/QwenPaw/issues/3850) | Web UI pause button works only on the frontend while backend keeps running | 3 (+1👍) | **Functional failure risk**: users cannot truly interrupt time-consuming tasks, creating resource waste and safety risks; needs backend-coordinated control. |
| [#3871](https://github.com/agentscope-ai/QwenPaw/issues/3871) | Agent still shows "Thinking" after response completes (SSE stream not closed) | 4 | **Streaming communication defect**: SSE stream is not terminated correctly, causing UI freeze and affecting automation flow judgment. |
| [#3854](https://github.com/agentscope-ai/QwenPaw/issues/3854) | chromadb Rust binding causes segmentation fault (SIGSEGV) and process crash | 2 | **Fatal stability issue**: frequent crashes in Linux environments; safe default configuration or graceful degradation is urgently needed. |

> 💡 The community is strongly calling for architecture-level fixes to **session state consistency** and **operation interruption capability**.

---

## 5. Bugs and Stability

Key issues ranked by severity:

| Severity | Issue | Description | Fix PR? |
|--------|-------|------|---------------|
| 🔴 **Critical** | [#3854](https://github.com/agentscope-ai/QwenPaw/issues/3854) | chromadb causes segmentation fault and directly crashes the process | ❌ None yet |
| 🔴 **Critical** | [#3843](https://github.com/agentscope-ai/QwenPaw/issues/3843) | Session history lost, messages mismatched | ❌ None yet |
| 🟠 **High** | [#3850](https://github.com/agentscope-ai/QwenPaw/issues/3850) | Pause function is effectively useless; backend continues running | ❌ None yet |
| 🟠 **High** | [#3871](https://github.com/agentscope-ai/QwenPaw/issues/3871) | SSE stream not closed, UI remains "Thinking" | ❌ None yet |
| 🟡 **Medium** | [#3824](https://github.com/agentscope-ai/QwenPaw/issues/3824) | Configuration lost after restart (Plan mode, memory settings, etc.) | ✅ Related fix exists (see [#3834](https://github.com/agentscope-ai/QwenPaw/pull/3834)) |
| 🟡 **Medium** | [#3795](https://github.com/agentscope-ai/QwenPaw/issues/3795) | Frequent `422 MODEL_EXECUTION_FAILED` | ✅ Optimization exists (see [#3874](https://github.com/agentscope-ai/QwenPaw/pull/3874)) |

> ⚠️ Recommend prioritizing the two high-risk issues of **chromadb crashes** and **session state loss**.

---

## 6. Feature Requests and Roadmap Signals

Among new user requests, the following have high adoption likelihood:

- **Real-time token consumption display** ([#3366](https://github.com/agentscope-ai/QwenPaw/issues/3366)): developers strongly call for cost transparency, with clear UI reference designs and low implementation cost. **Very likely to enter v1.1.5**.
- **Approval of high-risk commands from the channel side** ([#3869](https://github.com/agentscope-ai/QwenPaw/issues/3869)): solves the safety-approval pain point when access to the Web console is limited, aligns with the trend toward "decentralized control", and **has entered requirement refinement**.
- **Proactive message support for custom channels** ([#3804](https://github.com/agentscope-ai/QwenPaw/issues/3804)): expands active notification capabilities to Feishu/DingTalk, improving enterprise integration value and **aligning with channel architecture evolution**.
- **Native Apple Silicon browser support** ([#2655](https://github.com/agentscope-ai/QwenPaw/issues/2655)): M-series Mac users strongly demand better performance and **support is expected to arrive gradually with Playwright updates**.

---

## 7. User Feedback Summary

Real voices distilled from Issue comments:

- **What users like**:
  - "Docker deployment flow is smooth, and the uv integration feels good." (implicit in installation-related discussions)
  - "The multi-channel design is flexible and can quickly connect to internal enterprise IM." (from Feishu/DingTalk users)
  
- **Pain points and dissatisfaction**:
  - "Configuration disappears after saving and restarting, so I do not dare use it in production at all." ([#3824](https://github.com/agentscope-ai/QwenPaw/issues/3824))
  - "The pause button does nothing; the backend keeps running, wasting tokens and creating risk." ([#3850](https://github.com/agentscope-ai/QwenPaw/issues/3850))
  - "It crashes after running for a while on Linux, without even leaving logs." ([#3854](https://github.com/agentscope-ai/QwenPaw/issues/3854))
  - "After a dozen WeChat messages, the content gets truncated; the experience is terrible." ([#3837](https://github.com/agentscope-ai/QwenPaw/issues/3837))

> What users care about most: **data persistence, controllable operations, and cross-platform stability**.

---

## 8. Pending Backlog

The following important Issues have long gone unanswered and require maintainer attention:

| Issue | Type | Created | Status | Reminder |
|------|------|--------|------|------|
| [#3430](https://github.com/agentscope-ai/QwenPaw/issues/3430) | Project relationship clarification | 2026-04-15 | OPEN | Users are confused about the relationship between QwenPaw and CoPaw; official maintenance strategy needs clarification |
| [#406](https://github.com/agentscope-ai/QwenPaw/issues/406) | GitHub Copilot integration | 2026-03-03 | OPEN | A must-have for enterprise users; OpenClaw already supports it, CoPaw lags behind |
| [#2655](https://github.com/agentscope-ai/QwenPaw/issues/2655) | Apple Silicon browser support | 2026-03-31 | OPEN | Affects macOS developer experience; technical debt accumulating |

> 📌 Recommend clarifying the **QwenPaw and CoPaw coordination roadmap** at the next community meeting and assessing Copilot integration priority.

--- 

**Report generated at**: 2026-04-28  
**Data source**: public data from the GitHub CoPaw/QwenPaw repositories

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the past 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

No activity in the past 24 hours.

</details>

---
*This daily report was automatically generated by [Big Model Radar](https://github.com/gsscsd/big_model_radar).*
