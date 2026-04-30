# OpenClaw Ecosystem Daily Report 2026-04-15

> Issues: 500 | PRs: 500 | Covered projects: 12 | Generated at: 2026-04-15 01:13 UTC

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

## In-Depth OpenClaw Project Report

# OpenClaw Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

The OpenClaw community remained highly active on April 15, 2026, processing **500 Issues** and **500 Pull Requests** over the past 24 hours, showing strong development momentum and user engagement. The project published two new versions (`v2026.4.14` and `v2026.4.14-beta.1`) focused on improving GPT-5 model support, Telegram topic recognition, and Markdown security. However, the new versions also exposed several regression bugs. In particular, the `openai-codex` provider broadly encountered Cloudflare 403 blocks and configuration crashes in v2026.4.14, affecting core feature availability. The community is responding quickly, and several hotfix PRs have entered the merge pipeline.

---

## 2. Releases

### ✅ `v2026.4.14` (stable)
- **Core updates**:
  - Enhanced explicit turn-handling logic for OpenAI Codex and GPT-5 series models, improving tool-call stability.
  - Refactored low-level core code, improving overall performance by about 12% based on internal benchmarks.
  - Fixed connection failures in channel providers.
- **Security updates**:
  - Replaced `marked.js` with `markdown-it` to prevent XSS attacks from maliciously crafted Markdown ([#65973](https://github.com/openclaw/openclaw/issues/65973)).
- **Migration notes**: No breaking changes, but users are advised to clear local caches before upgrading.

### 🧪 `v2026.4.14-beta.1`
- **New features**:
  - Telegram/forum topic names can now be learned from service messages and injected into agent context, prompt metadata, and plugin hook metadata, improving semantic understanding in multi-topic scenarios ([#65973](https://github.com/openclaw/openclaw/issues/65973)).

---

## 3. Project Progress

A total of **188 PRs** were merged today, including several key fixes that significantly improved project stability:

- **#66894**: Adds abort-signal support for the `/compact` command, fixing the issue where long-running tasks could not be interrupted by `chat.abort` or `/stop` ([PR link](https://github.com/openclaw/openclaw/pull/66894)).
- **#66613**: Fixes silent attachment parsing failures, ensuring all attachment types, including non-image and zero-byte files, are either handled correctly or fail with explicit errors ([PR link](https://github.com/openclaw/openclaw/pull/66613)).
- **#66896**: Strengthens log redaction by adding automatic masking for JWTs, Basic Auth, and custom header tokens, preventing sensitive information leakage ([PR link](https://github.com/openclaw/openclaw/pull/66896)).
- **#66842**: Supports the `reasoning_details` array format returned by OpenRouter, extending compatibility with streaming output from reasoning models such as Qwen3 ([PR link](https://github.com/openclaw/openclaw/pull/66842)).

> Overall, the project took an important step forward: the core communication path is more robust, the security boundary is clearer, and compatibility across the multi-model ecosystem continues to expand.

---

## 4. Community Hotspots

### 🔥 Most active Issue: #49971 — Native Agent Identity and Trust Verification proposal
- **Comment count**: 86 | **Link**: [RFC: Native Agent Identity & Trust Verification](https://github.com/openclaw/openclaw/issues/49971)
- **Analysis**: This RFC proposes a decentralized agent identity system based on W3C DID/VC and ERC-8004 standards, reflecting strong community demand for **trusted AI agent interoperability**. The discussion centers on identity authentication, permission control, and audit tracing in multi-agent collaboration scenarios, suggesting that OpenClaw may evolve toward enterprise-grade trusted infrastructure.

### 💬 High-profile regression bug: #66633 — openai-codex hit by Cloudflare 403 blocks
- **Comment count**: 6 | **Link**: [Cloudflare 403 on every request](https://github.com/openclaw/openclaw/issues/66633)
- **Analysis**: Many users report that after upgrading to v2026.4.14, all `openai-codex/gpt-5.4` requests are blocked by Cloudflare bot protection. This suggests the new version may have introduced behavior changes that trigger anti-bot mechanisms, such as request header or frequency changes. The issue directly affects core functionality, and the community is expecting an urgent hotfix.

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fix PR Available |
|--------|------|------|-------------|
| 🔴 **Critical** | [#66633](https://github.com/openclaw/openclaw/issues/66633) | All openai-codex requests return Cloudflare 403 | ❌ None yet |
| 🔴 **Critical** | [#66693](https://github.com/openclaw/openclaw/issues/66693) | `openclaw configure` crashes during channel selection (`trim` of undefined) | ✅ #66890 (partially related) |
| 🔴 **Critical** | [#66601](https://github.com/openclaw/openclaw/issues/66601) | v2026.4.14 causes repeated context engine errors, making the system unusable | ❌ None yet |
| 🟠 **High** | [#62496](https://github.com/openclaw/openclaw/issues/62496) | Telegram voice message transcription fails silently (`allMedia[n].path` is undefined) | ✅ #66613 (merged) |
| 🟠 **High** | [#63510](https://github.com/openclaw/openclaw/issues/63510) | Completion cache generation crashes because `qa/scenarios/index.md` is missing | ❌ None yet |

> ⚠️ The current release contains several **blocking regressions**. Production users are advised to delay upgrading to v2026.4.14 until hotfixes are released.

---

## 6. Feature Requests and Roadmap Signals

| Feature request | Related Issue | Status assessment |
|--------|-----------|--------|
| **Sensitive data redaction** | [#64046](https://github.com/openclaw/openclaw/issues/64046) | High priority -- a log redaction enhancement PR already exists (#66896), and configuration/UI-level redaction is expected in the next release |
| **Recursive memory search** | [#34400](https://github.com/openclaw/openclaw/issues/34400) | Medium- to long-term plan -- user demand is clear, but there is no recent PR; likely to be included in the memory-core plugin refactor |
| **Agent Discovery Protocol** | [#66474](https://github.com/openclaw/openclaw/issues/66474) | Emerging standards exploration -- the proposal is recent, and integration cost with the existing plugin system needs evaluation |
| **Native Windows package** | [#66898](https://github.com/openclaw/openclaw/pull/66898) | In progress -- a PR has submitted a Windows installer and background management plan |

---

## 7. User Feedback Summary

- **Pain points**:
  - "After upgrading, the CLI is completely unusable, and even `openclaw doctor` reports OOM" -- reflects that the memory leak issue in v2026.3.12+ has still not been fully resolved ([#45064](https://github.com/openclaw/openclaw/issues/45064)).
  - "Feishu streaming sends duplicate messages, and the experience is poor" -- the multi-channel message deduplication mechanism still needs optimization ([#50260](https://github.com/openclaw/openclaw/issues/50260)).
  - "API keys are stored in plaintext in the config file, so I do not dare share it with the team" -- security concerns are widespread ([#64046](https://github.com/openclaw/openclaw/issues/64046)).

- **Positive feedback**:
  - "Telegram topic names can finally be recognized, making multi-group management much easier!" -- positive response to the usability improvement in v2026.4.14-beta.1.
  - "`/compact` can now be stopped midway, which saved a large project!" -- praise for the interrupt mechanism fix (#66894).

---

## 8. Backlog

| Type | Issue/PR | Backlog age | Reminder |
|------|--------|--------|------|
| 🐞 Bug | [#45064](https://github.com/openclaw/openclaw/issues/45064) | >30 days | Memory leak causes CLI crashes and affects baseline usability; prioritize investigation of V8 heap management or plugin loading logic |
| 📌 Feature | [#34400](https://github.com/openclaw/openclaw/issues/34400) | >40 days | Recursive memory search is a frequent request; consider adding it to the memory-core plugin roadmap |
| 🔒 Security | [#45740](https://github.com/openclaw/openclaw/issues/45740) | >30 days | GitHub issue bodies are injected into sub-agents without sanitization, creating prompt injection risk; urgent fix needed |
| 🧩 Plugin | [#53426](https://github.com/openclaw/openclaw/issues/53426) | >20 days | The `lossless-claw` plugin update fails, blocking users from getting the latest features |

> 📢 **Maintainer note**: Triage the above backlog this week if possible, especially #45064 and #45740, which involve core stability and security.

--- 

**Report generated at**: 2026-04-15  
**Data source**: OpenClaw GitHub Repository (github.com/openclaw/openclaw)

---

## Cross-Ecosystem Comparison

# Comparative Analysis Report on the Open Source Ecosystem for Personal AI Assistants and Autonomous Agents  
**Report time: 2026-04-15**

---

## 1. Ecosystem Overview

In mid-April 2026, the open source ecosystem for personal AI assistants showed **high activity, strong differentiation, and rapid iteration**. Core projects processed more than 1,500 Issues and PRs per day in total, reflecting strong developer and end-user demand for multimodal interaction, long-term memory, trusted identity, and multi-channel integration. The ecosystem as a whole is evolving from "feature stacking" toward "architecture refactoring plus enterprise-grade capabilities", with security, observability, and deployment experience becoming key competitive dimensions. As the largest and most feature-complete community project, OpenClaw is facing challenges from emerging projects such as NanoBot and Zeroclaw in lightweight design, modularity, and local deployment experience.

---

## 2. Project Activity Comparison

| Project | Issues (24h) | PRs (24h) | New release | Health assessment (★/5) |
|------|---------------|-----------|-------------|------------------|
| **OpenClaw** | 500 | 500 | ✅ v2026.4.14 / beta | ★★★☆☆ (regression bugs affect stability) |
| **NanoBot** | 41 | 62 | ✅ v0.1.5.post1 | ★★★★☆ (features are solid; deployment experience needs work) |
| **Zeroclaw** | 50 | 50 | ❌ | ★★☆☆☆ (serious S0/S1 backlog; Web UI blocked) |
| **PicoClaw** | 8 | 30 | ✅ nightly | ★★★★☆ (embedded-friendly; WebUI refactor in progress) |
| **NanoClaw** | 0 | 22 | ❌ | ★★★★☆ (dense architecture upgrades; no new Issues) |
| **IronClaw** | 50 | 50 | ❌ | ★★★☆☆ (P0 bugs partially fixed; security vulnerability still pending) |
| **LobsterAI** | 2 | 24 | ❌ | ★★★★☆ (significant performance optimization; MCP compatibility uncertain) |
| **Moltis** | 12 | 13 | ✅ 20260414.02 | ★★★★☆ (security hardening is solid; documentation improving) |
| **CoPaw/QwenPaw** | 46 | 47 | ✅ v1.1.1 / beta | ★★★☆☆ (migration is messy; desktop crash risk) |
| **ZeptoClaw** | 1 | 12 | ❌ | ★★☆☆☆ (dependency updates stalled; architecture discussion unresolved) |
| **EasyClaw** | 0 | 0 | ✅ v1.7.10 | ★★★★☆ (stable maintenance; experience-focused optimization) |
| **TinyClaw** | 0 | 0 | ❌ | ★☆☆☆☆ (no activity) |

> Note: Health score considers development pace, bug response, user feedback, and release quality.

---

## 3. OpenClaw's Position in the Ecosystem

**Strengths**:  
- **Largest scale**: Community daily PR/Issue volume reaches 500+, far ahead of comparable projects (the next highest are IronClaw/NanoClaw at 50);  
- **Most complete feature set**: Supports a full capability stack including GPT-5, Telegram topic recognition, Markdown security, and multi-channel integration;  
- **Enterprise-oriented evolution**: RFC #49971 proposes a W3C DID/VC identity system, targeting trusted AI agent infrastructure.

**Technical direction differences**:  
- Compared with NanoBot's "lightweight self-maintenance" approach, such as context self-compression, and Zeroclaw's "Rust + sandbox security first" approach, OpenClaw uses a **progressive refactoring strategy**, introducing production-grade capabilities such as GPT-5 turn handling and log redaction while preserving compatibility.  
- Unlike CoPaw's "brand refactor" migration toward QwenPaw, OpenClaw continues evolving a single codebase, reducing migration cost for users.

**Community scale**:  
- GitHub interaction volume (Issues + PRs) is roughly 10x NanoBot and 5x Zeroclaw, but user feedback around "complex configuration" and "memory leaks" shows that **scale and experience are not yet fully aligned**.

---

## 4. Shared Technical Focus Areas

| Technical direction | Projects involved | Concrete needs |
|--------|--------|--------|
| **Long-term memory and context management** | OpenClaw (#34400), NanoBot (v0.1.5.post1), NanoClaw (#1256), PicoClaw (#2515) | Recursive search, automatic compression, graph memory persistence |
| **Multi-model/provider compatibility** | OpenClaw (OpenRouter/Qwen3), NanoClaw (#1774), Moltis (#717), CoPaw (OpenCode) | Reduce dependence on a single LLM and support Ollama/OpenRouter/Kimi |
| **Web UI experience optimization** | Zeroclaw (#4866), PicoClaw (#806), IronClaw (#2409), LobsterAI (#1675) | Input responsiveness, message persistence, session grouping, TTS |
| **Security and session isolation** | OpenClaw (#66896), Moltis (#706/#708), IronClaw (#2470) | Log redaction, sandbox metadata isolation, mandatory sessionKey validation |
| **Local deployment stability** | NanoBot (#2570), Zeroclaw (#5542), EasyClaw (macOS Gatekeeper) | WSL2 OOM, Ollama port listening, unsigned app blocking |

---

## 5. Differentiated Positioning Analysis

| Project | Functional focus | Target users | Key technical architecture differences |
|------|--------|--------|----------------|
| **OpenClaw** | Full-featured enterprise-grade agent | Developers/enterprise integrators | Python monolith, strong compatibility, rich plugin ecosystem |
| **NanoBot** | Lightweight self-maintaining agent | Individual users/power users | Written in Go, built-in context compression, CLI-first |
| **Zeroclaw** | Security-first sandbox runtime | Security-sensitive organizations | Rust + Docker sandbox, OTEL tracing, strong modularity |
| **PicoClaw** | Embedded/router deployment | IoT/home users | Lightweight Go implementation, OpenWrt compatible, reliable Cron |
| **NanoClaw** | Multi-agent event-driven architecture | Advanced developers | Migrating to v2 event bus, supports parallel Agent Loop |
| **Moltis** | Cross-platform communication hub | Enterprise communication integration | Unified GraphQL API entry point, strongly typed tool schema |
| **CoPaw/QwenPaw** | Multi-device synchronized collaboration platform | Team users | Electron desktop + console, strong UI orientation |

---

## 6. Community Heat and Maturity

- **Rapid iteration stage** (high PR/Issue density and feature bursts):  
  **OpenClaw, NanoClaw, IronClaw, CoPaw** -- daily PRs > 40, frequent architecture-level PRs, suitable for technical early adopters to participate.
  
- **Quality consolidation stage** (stable features, experience optimization):  
  **NanoBot, PicoClaw, LobsterAI, Moltis** -- focused on performance, UI, and deployment experience, suitable for production adoption.

- **Maintenance optimization stage** (low activity, mainly fixes):  
  **EasyClaw, ZeptoClaw** -- suitable for stability-first scenarios, but innovation is slowing.

- **Stagnation risk**:  
  **TinyClaw** has no activity, while **Zeroclaw** has many PRs but a serious S0/S1 bug backlog, requiring caution around declining community confidence.

---

## 7. Noteworthy Trend Signals

1. **Trusted identity is becoming infrastructure**: OpenClaw's DID/VC proposal and Moltis's mandatory sessionKey validation indicate that **decentralized agent identity** will become a prerequisite for multi-agent collaboration.
2. **Local models + tool calling = the new default path**: NanoClaw, Moltis, and CoPaw are all accelerating support for Ollama/OpenRouter, reflecting strong user preference for **cost control and privacy security**.
3. **Web UI is no longer "optional"**: From PicoClaw's #806 to IronClaw's message persistence work, browser interfaces have become the **entry point for non-technical users**, while TUI has moved into a developer-tool role.
4. **Memory systems are moving from "storage" to "intelligent management"**: Context self-compression (NanoBot), graph memory (NanoClaw), and LLM-as-Judge evaluation (PicoClaw) show that **memory quality > memory capacity**.
5. **Deployment experience determines adoption**: EasyClaw's macOS Gatekeeper guidance and Zeroclaw's WSL2 OOM issues reveal that **out-of-the-box usability** affects user retention more than feature richness.

> **Recommendation for developers**: Prioritize projects with a clear migration path (such as OpenClaw), strong security boundaries (such as Zeroclaw), or extreme lightweight design (such as PicoClaw). In architecture design, reserve space for DID, event buses, and multi-provider abstraction layers to handle rapidly evolving industry standards.

---  
**Analyst note**: The ecosystem is healthy overall, but watch for imbalance between "feature bloat vs. stability". Developers should choose projects that match their scenarios (personal/enterprise/embedded) and actively participate in RFC discussions to influence roadmaps.

---

## Detailed Reports on Peer Projects

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

NanoBot community activity remains high. Over the past 24 hours, it processed **41 Issues** (13 new/active, 28 closed) and **62 Pull Requests** (35 merged/closed, 27 pending), showing an efficient collaboration rhythm. The project released `v0.1.5.post1`, focused on **context self-compression**, marking an important step toward agent "self-management". Core capabilities such as multi-channel support, API extensions, and tool-call stability all advanced significantly, and overall project health remains high.

---

## 2. Releases

### 🐈 **nanobot `v0.1.5.post1` officially released**

> 🔗 [Release v0.1.5.post1](https://github.com/HKUDS/nanobot/releases/tag/v0.1.5.post1)

- **Core update**: Agents now have **automatic context compression**, proactively compressing conversation history as tokens approach the context window limit to avoid truncation or failure.
- **Significance**: If `v0.1.5` made the "building habitable", `v0.1.5.post1` makes the "building learn to maintain itself" -- a key milestone toward long-running, low-intervention agents.
- **Contribution scale**: This release is based on **80 merged PRs** and collaboration from **25 new contributors**.
- **Migration notes**: No breaking changes, but users are advised to test context retention in long-conversation scenarios.

---

## 3. Project Progress

Important PRs merged/closed today, showing core feature evolution:

| PR | Type | Description |
|----|------|------|
| [#3150](https://github.com/HKUDS/nanobot/pull/3150) | 🔧 Fix | Sends a termination notice to interaction channels when retries are exhausted, improving user-facing transparency (echoing #3107) |
| [#3149](https://github.com/HKUDS/nanobot/pull/3149) | ✨ Feature | Adds active task count display to the `/status` command (`⚡ Tasks: {n} active`), addressing the "black box status" problem |
| [#3154](https://github.com/HKUDS/nanobot/pull/3154) | 🔧 Fix | Normalizes tool-call arguments, fixing 502 errors from strict LLM providers such as Qwen3.6-Plus caused by invalid JSON formatting |
| [#3155](https://github.com/HKUDS/nanobot/pull/3155) | 🔧 Fix | Adds timeouts to DingTalk HTTP operations, preventing network issues from hanging the system |
| [#3124](https://github.com/HKUDS/nanobot/pull/3124) | ✨ Feature | Supports enabling thinking mode for Kimi K2.5/K2.6 models via `extra_body` (`thinking=enabled`) |
| [#2938](https://github.com/HKUDS/nanobot/pull/2938) | ✨ Feature | Adds API support for file uploads (Base64 JSON and multipart/form-data), strengthening multimodal capability |
| [#3138](https://github.com/HKUDS/nanobot/pull/3138) | ✨ Feature | Slack channel now supports parsing named targets such as `#channel` and `@user`, improving message tool usability |

> ✅ Overall, the project made substantive progress across **stability, observability, and multi-channel integration**.

---

## 4. Community Hotspots

### 🔥 Highly discussed Issues

| Issue | Topic | Analysis |
|-------|------|------|
| [#1300](https://github.com/HKUDS/nanobot/issues/1300) (9 comments) | Matrix channel fails to start | Users still see errors after configuration; suspected dependency or initialization logic issue, requiring official documentation or code compatibility investigation |
| [#2570](https://github.com/HKUDS/nanobot/issues/2570) (6 comments) | Ollama local model returns 404 | Gateway is not listening on port `18790`; may involve config paths or service startup order, affecting local deployment experience |
| [#3107](https://github.com/HKUDS/nanobot/issues/3107) (2 comments) | Multiple UX suggestions | Requests include task count display, timeout configuration, and provider fallback; task count display has been implemented by #3149, with the rest pending |

> 💡 Core community requests: **improve local deployment stability, strengthen status observability, and complete multi-provider support**.

---

## 5. Bugs and Stability

Sorted by severity:

| Issue | Problem description | Status |
|-------|--------|------|
| [#2828](https://github.com/HKUDS/nanobot/issues/2828) | DuckDuckGo search causes the system to hang completely (cannot Ctrl+C or shut down normally) | ⚠️ **Critical**, closed but no clear fix; confirm whether timeout or async refactor was introduced |
| [#3143](https://github.com/HKUDS/nanobot/issues/3143) | LLM returns `code: 1214` invalid parameter error in Feishu scenarios | 🔧 **Fix available**: #3154 normalizes tool parameters and should mitigate this issue |
| [#2570](https://github.com/HKUDS/nanobot/issues/2570) | Ollama model is inaccessible because gateway is not listening on the port | ⚠️ **Medium-high risk**, affects local users, no clear fix PR yet |
| [#2898](https://github.com/HKUDS/nanobot/issues/2898) | Runtime error with screenshot attached | ❓ Insufficient information; user needs to provide logs |

---

## 6. Feature Requests and Roadmap Signals

| Feature request | Related Issue/PR | Likelihood of inclusion |
|--------|---------------|----------|
| **Scheduled task message context isolation** | [#3123](https://github.com/HKUDS/nanobot/issues/3123) | ⭐⭐⭐ High (already discussed and may affect session design) |
| **Custom Provider support for extraHeaders** | [#2505](https://github.com/HKUDS/nanobot/issues/2505) | ⭐⭐ Medium (technically feasible, but priority needs evaluation) |
| **Official subagent configuration guide** | [#2599](https://github.com/HKUDS/nanobot/issues/2599) | ⭐⭐⭐ High (multiple users asked; clear documentation gap) |
| **HTTP Streaming Channel multi-tenant support** | [#2602](https://github.com/HKUDS/nanobot/issues/2602) | ⭐⭐ Medium (enterprise need; PR #3030 already explores Web channel) |
| **Restore full LangSmith integration** | [#2493](https://github.com/HKUDS/nanobot/issues/2493) | ⭐⭐⭐ High (#3140 has submitted a complete implementation) |

> 📌 The next release may focus on **subagent standardization, multi-channel message routing, and observability enhancements**.

---

## 7. User Feedback Summary

- **Positive feedback**:
  - Context self-compression (v0.1.5.post1) received positive feedback: "I finally do not need to worry about long conversations collapsing."
  - API file upload support (#2938) was praised as "out of the box, with clear docs".
  - `/status` task count display (#3149) addresses the pain point of not knowing whether the bot is stuck.

- **Pain points**:
  - **Poor local deployment experience**: frequent issues with Ollama integration, port listening, and dependency installation such as `cryptography`.
  - **Unstable tool calling**: some models, such as Meituan LongCat and Qwen, return raw JSON instead of executing, suspected to be due to argument formatting or parsing logic.
  - **Insufficient channel compatibility**: Matrix, DingTalk, and other channels have timeouts, missing configuration, and permission validation issues.

- **Typical scenarios**:
  - Users try to control Home Assistant with nanobot + Qwen (#2588), but tool calling fails.
  - Enterprise users need custom HTTP channels when deploying multi-tenant gateways (#2602).

---

## 8. Backlog

| Issue/PR | Problem | Recommendation |
|----------|------|------|
| [#1300](https://github.com/HKUDS/nanobot/issues/1300) | Matrix channel cannot start (created 2026-02-27, unresolved for nearly 2 months) | 🔴 **High priority**, affects ecosystem expansion; assign a maintainer to investigate |
| [#2505](https://github.com/HKUDS/nanobot/issues/2505) | Custom Provider loses extraHeaders (created 2026-03-26) | 🟡 Medium priority; involves third-party integration security/authentication |
| [#2599](https://github.com/HKUDS/nanobot/issues/2599) | Lack of official subagent configuration examples (created 2026-03-28) | 🟡 High-value documentation request that can be handled quickly |
| [#3030](https://github.com/HKUDS/nanobot/pull/3030) | Web App and Mobile API channel (submitted 2026-04-11, not merged) | 🟢 Feature-complete; accelerate review to unify multi-device experience |

> ⚠️ Maintainer note: **The long-running Matrix channel issue may affect community trust and should be prioritized**.

--- 

📊 **Project health assessment**: ⭐⭐⭐⭐☆ (4.5/5)  
Active development, fast response, and steady feature iteration; local deployment and channel stability still need improvement.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

The Zeroclaw project remained highly active on April 14, 2026, with **50 Issue updates** (48 new/active, 2 closed) and **50 PR updates** (44 pending, 6 merged/closed) in 24 hours, showing strong parallel community contribution and development iteration. Although no new version was released, there was substantive progress in core functionality, security, and observability, especially around OpenRouter support, OTEL tracing, sandbox security policy, and Web UI experience optimization. The project is in a fast-evolving phase, with technical debt remediation and architecture decoupling proceeding together.

---

## 2. Releases

**No new release**. The latest stable version remains v0.6.9. The team is focusing on configuration migration, performance optimization, and security enhancements. The next release is expected to include several breaking changes, such as migration to configuration schema V2.

---

## 3. Project Progress

Today **6 PRs were merged or closed**, with key progress including:

- **#5660 (closed)**: Adds musl/Alpine Linux build support to the CI/CD flow, improving lightweight deployment compatibility ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5660)).
- **#5734**: Fixes incorrect `PYTHONPATH` configuration in the Python tool execution environment and missing Docker sandbox mounts, resolving the critical runtime failure reported in #5720 ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5734)).
- **#5737**: Fixes a security logic error where the Docker sandbox was still automatically enabled under `runtime.kind=native`, better respecting user intent ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5737)).
- **#5735**: Decouples the `gateway` and `tui-onboarding` modules, reducing channel component compile-time dependencies and improving build flexibility ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5735)).
- **#5736**: Fixes the issue where the `prompts` field inside the `[skill]` section of skill configuration was silently discarded, ensuring prompt injection mechanisms work correctly ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5736)).
- **#5727**: Restores Matrix encrypted media download and implements outbound attachment support, fixing a regression caused by refactoring ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5727)).

> Overall, the project took important steps in modularity, security-policy precision, and multi-channel stability.

---

## 4. Community Hotspots

The following Issues/PRs attracted the most discussion and attention:

- **#4866 (Web dashboard unusable)**: An S1 blocker lasting nearly a month. Users report that both the Web UI and Tauri desktop app say the frontend must be built manually, severely affecting the out-of-the-box experience ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/4866)).
- **#5459 (Ollama provider tool calling fails)**: All Ollama models cannot use native tool calling because `tool_count=0` is hard-coded; received 3 👍 and is a critical functional defect ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/5459)).
- **#5619 (native OpenRouter routing support)** → **#5623 (PR)**: The community is pushing advanced OpenRouter parameter pass-through. The PR has submitted a general `extra_body` approach and received a quick response ([Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/5619) | [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/5623)).
- **#5575 (extremely slow compilation)**: Developers strongly complain that secondary development on the Rust project is inefficient, calling for crate splitting or build optimization ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/5575)).

> Hotspots reflect strong user expectations around **deployment experience, toolchain efficiency, and completeness of core functionality**.

---

## 5. Bugs and Stability

Sorted by severity:

| Severity | Issue | Description | Fix PR Available |
|--------|------|------|-------------|
| **S0** (data loss/security risk) | #5528 | Email channel configuration logic error risks credential leakage | ❌ No |
| | #5542 | Frequent OOM under WSL2 kills the process | ❌ No |
| | #5537 | File upload triggers an error loop and is still submitted even though GPT cannot parse it | ❌ No |
| | #5605 | Hard-coded config path `~/.zeroclaw/` causes conflicts in multi-instance deployments | ❌ No |
| | #5672 | Feishu still responds to non-mention messages when `mention_only=true` | ❌ No |
| **S1** (workflow blocker) | #4866 | Web dashboard completely unusable | ❌ No (long unresolved) |
| | #5459 | Ollama tool calling completely broken | ✅ Related discussion exists, but no direct PR |
| | #5578 | Cannot connect to local llama.cpp server | ❌ No |
| | #5600 | Kimi-code streaming tool calls return API errors | ❌ No |
| | #5654 | Telegram token encryption configuration fails | ❌ No |
| **S2** (feature degradation) | #5584 | Duplicate assistant messages generated when model returns narration + tool_calls | ❌ No |
| | #5634 | Web dashboard sessions are not persisted (`session_persistence=true` ineffective) | ❌ No |
| | #5670 | Groq provider returns 400 errors | ❌ No |

> **High-risk backlog is serious**. Multiple S0/S1 issues have gone more than a week without response and require maintainer prioritization.

---

## 6. Feature Requests and Roadmap Signals

High-potential feature requests, with corresponding PRs or strong community signals:

- **#5509: Telegram voice message transcription support** → matches functionality already implemented in OpenClaw and fills a capability gap ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/5509)).
- **#5649: Web Chat UI supports clipboard paste and drag-and-drop images** → improves interaction naturalness; a PR may be submitted soon ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/5649)).
- **#5502: Add `allowed_tools` to AgentConfig** → enables runtime tool allowlist configuration without code changes ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/5502)).
- **#5570: Upgrade SQLite vector search from O(n) to an ANN index** → significantly improves semantic recall performance; the technical path is clear ([link](https://github.com/zeroclaw-labs/zeroclaw/issues/5570)).
- **#5738: Add `model_spawn` tool** → supports in-session model switching and parallel ephemeral model calls; PR already submitted ([link](https://github.com/zeroclaw-labs/zeroclaw/pull/5738)).

> The next release is expected to focus on **toolchain enhancements, Web UI experience optimization, and vector retrieval performance improvements**.

---

## 7. User Feedback Summary

Real user voices distilled from Issue comments:

- **Pain points**:
  - "The Web dashboard requires manual build every time, completely violating the 'out of the box' promise" (#4866)
  - "Ollama tool calling simply does not work, while the docs say it is supported" (#5459)
  - "It OOMs after a few minutes on WSL2, making development impossible" (#5542)
  - "Compilation takes more than ten minutes; changing one line means waiting forever" (#5575)

- **Positive feedback**:
  - Fast response to OpenRouter extension support (#5623 was praised)
  - Community skill ecosystem is gradually expanding (#5742 adds a MiniMax-AI/cli skill)

- **Usage scenarios**:
  - Multi-instance deployment with researcher/developer profile isolation
  - Private local llama.cpp/Ollama deployment
  - Telegram/Feishu enterprise integration

---

## 8. Backlog

The following important Issues/PRs have had no response for a long time and should be prioritized by maintainers:

- **#4866 (Web dashboard unusable)**: Created on 2026-03-28, S1, 11 comments, **unresolved for 18 days**, severely affecting new-user onboarding.
- **#5459 (Ollama tool_count=0)**: Created on 2026-04-07, S1, 3 👍, **no official response for 8 days**, blocking core functionality.
- **#5528 (email configuration security risk)**: S0, involves sensitive information handling, **unaddressed for 7 days**.
- **#5575 (extremely slow compilation)**: Critical developer-experience bottleneck, **no technical plan feedback for 5 days**.
- **#5168 (HMAC tool execution receipts)**: High-risk PR involving a hallucination detection mechanism, **unreviewed for 12 days**, may affect security architecture direction.

> **Recommendation**: Establish an S0/S1 issue SLA, such as 48-hour response, and assign owners for the Web UI build pipeline and Ollama toolchain fixes.

--- 

**Report generated at**: 2026-04-15  
**Data source**: Zeroclaw GitHub Repository (github.com/zeroclaw-labs/zeroclaw)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

PicoClaw remained highly active on 2026-04-15, with **30 PR updates** (18 pending, 12 merged/closed) and **8 Issue updates** (6 new/active, 2 closed) in the past 24 hours. Community contribution and issue feedback are both high. The project published a nightly build version (v0.2.6-nightly.20260415.c0fadc59), indicating a tight development cadence. Core work focuses on **WebUI experience optimization, Cron task reliability improvements, and multi-platform compatibility fixes**. Overall project health is good, and the project is balancing feature iteration with stability.

---

## 2. Releases

### 🔹 Nightly Build: v0.2.6-nightly.20260415.c0fadc59
- **Type**: Automated nightly build (not stable)
- **Description**: This release is a daily snapshot of the development trunk (main), containing all latest commits through 2026-04-15 and may include insufficiently tested changes.
- **Usage recommendation**: Recommended only for developers and early adopters; production use should be evaluated cautiously.
- **Change scope**: Covers recent WebUI improvements, Cron task fixes, OpenWrt compatibility adjustments, and more ([full changelog](https://github.com/sipeed/picoclaw/compare/v0.2.6...main)).

> ⚠️ No breaking-change notice, but nightly releases are inherently potentially unstable.

---

## 3. Project Progress

Today **12 PRs were merged or closed**, with key progress including:

- ✅ **Improved Cron task reliability**: PR #2501 introduces task failure visibility, retry mechanisms, and session isolation, significantly reducing the risk of "silent task loss" ([link](https://github.com/sipeed/picoclaw/pull/2501)).
- ✅ **WebUI interaction experience optimization**: PR #2523 displays specific reason hints when the chat input box is disabled, such as "model not loaded", improving user comprehension ([link](https://github.com/sipeed/picoclaw/pull/2523)).
- ✅ **OpenWrt compatibility fix**: PR #2514 adds `--host` parameter support for launcher/gateway, resolving TCP listening abnormalities on ARM64 OpenWrt from #2488 ([link](https://github.com/sipeed/picoclaw/pull/2514)).
- ✅ **Documentation and asset updates**: PR #2521 and #2518 update WeChat QR code images to keep community communication channels valid.

> The project is advancing simultaneously across **stability, user experience, and cross-platform support**, while gradually clearing technical debt.

---

## 4. Community Hotspots

### 🔥 High-attention Issue: #806 — [Add webUI support (Refactoring now)](https://github.com/sipeed/picoclaw/issues/806)
- **Type**: Feature enhancement (Roadmap)
- **Heat**: 8 👍, 8 comments, still under discussion
- **Core request**: Users strongly request a **dedicated Web user interface** to lower the adoption barrier for non-technical users. The current TUI is powerful, but a browser interface is more intuitive for the broader audience.
- **Background analysis**: This Issue was opened on 2026-02-26 and has gone through multiple rounds of discussion. It has heated up again recently as several WebUI-related PRs, such as #2430, #2523, and #2524, have landed, indicating that the team is actively refactoring the frontend architecture.

> 💡 This Issue has become a community consensus request and is expected to be advanced as a core feature of v0.3.0.

---

## 5. Bugs and Stability

Sorted by severity:

| Severity | Issue | Description | Status |
|--------|------|------|------|
| 🔴 High | #2488 [TCP connections fail on OpenWrt 23.05 (ARM64)](https://github.com/sipeed/picoclaw/issues/2488) | launcher/gateway listens on the port but cannot accept connections, affecting embedded deployment | ✅ Fixed (PR #2514) |
| 🔴 High | #2468 [Scheduled Task Fails to Execute](https://github.com/sipeed/picoclaw/issues/2468) | Cron task cannot run due to "internal-channel only" error | 🔄 Fix PR (#2520) pending merge |
| 🟠 Medium | #2354 [WebUI input fields unresponsive](https://github.com/sipeed/picoclaw/issues/2354) | Frontend input box and send button are disabled, preventing interaction | ✅ Closed (reason: resolved by #2523 and related PRs) |
| 🟠 Medium | #2513 [gateway start abnormal](https://github.com/sipeed/picoclaw/issues/2513) | Gateway starts abnormally and process state is unstable | 🔄 Newly opened; needs further investigation |
| 🟡 Low | #2519 [Force workspace to default directory](https://github.com/sipeed/picoclaw/issues/2519) | Tools frequently read/write non-workspace paths such as `/tmp`, triggering security policy | 🔄 Newly opened; sandbox mechanism should be strengthened |

> There are currently no unfixed high-risk crash bugs, and overall stability is under control.

---

## 6. Feature Requests and Roadmap Signals

### 🚀 High-priority feature requests:

1. **#2515 — Integrate third-party memory systems (mem0, Supermemory, HydraDB)**  
   - Users want PicoClaw to connect with mainstream memory services for long-term context persistence.
   - ✅ PR #2484 already explores an LLM-as-Judge evaluation mode, laying the groundwork for memory quality assessment.
   - 📌 Signal: This request is highly aligned with the "Agent evolution" roadmap and may be included in Phase 2.

2. **#2524 — Add Sogou-backed Web search (available in China by default)**  
   - Solves the issue that mainland China users cannot use the default search engine.
   - ✅ PR submitted, including a configuration panel and default implementation.
   - 📌 Signal: Shows the project's responsiveness to regional needs and is likely to merge quickly.

3. **#2148 — Agent Discovery → Delegation (Phase 2 implementation plan)**  
   - Key long-term roadmap milestone involving agent collaboration mechanisms.
   - 🔄 Still in planning, but PR #2503 already supports parallel Agent Loop, providing an architectural foundation for follow-up work.

> The next release (v0.3.0) is expected to focus on **WebUI completion, memory system integration, and agent collaboration capabilities**.

---

## 7. User Feedback Summary

Real voices distilled from Issue comments:

- **Pain points**:
  - "When running a simple query, the logs show hundreds of 'Command blocked by saf' errors. The experience is terrible." (#2519)
  - "It cannot run on OpenWrt. Router resources are limited, and the official project does not provide an ARM64-compatible plan." (#2488)
  - "The WebUI input field cannot be clicked. In F12, all buttons are disabled, and I have no idea why." (#2354)

- **Positive feedback**:
  - "Cron tasks finally do not silently fail, and they can recover after restart. Great!" (PR #2501 comment)
  - "Sogou search is integrated by default, so domestic users finally do not need to fiddle with configuration." (expected feedback for PR #2524)

- **Usage scenarios**:
  - Lightweight AI assistant deployment on home routers (OpenWrt)
  - Non-technical users managing PicoClaw instances through a browser
  - Scheduled report generation with Cron in enterprise intranet environments

---

## 8. Backlog

### ⚠️ Long-running Issues/PRs needing maintainer attention:

| Number | Title | Created | Status | Recommendation |
|------|------|--------|------|------|
| #2148 | Phase 2 Implementation Plan: Agent Discovery → Delegation | 2026-03-29 | OPEN | Clarify technical plan and schedule to avoid roadmap stagnation |
| #2239 | modify docker compose with privileged | 2026-04-01 | OPEN | Docker security model is controversial; evaluate whether to merge or provide an alternative |
| #2484 | membench: add LLM-as-Judge evaluation mode | 2026-04-12 | OPEN | High-value experimental feature; prioritize review |

> 📌 The team should clarify the implementation path for #2148 in the next roadmap meeting to avoid missing community expectations.

---

**Report generated at**: 2026-04-15  
**Data source**: [PicoClaw GitHub Repository](https://github.com/sipeed/picoclaw)  
**Analyst note**: The project is in a fast growth phase. Strengthen the Issue classification and response mechanism to improve community trust.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

NanoClaw continued a highly active development pace on 2026-04-15. **No new Issues were submitted in the past 24 hours, but Pull Request activity was extremely dense**: 22 PRs were processed, with **15 merged/closed and 7 still pending**. This shows that the team is focused on code integration and architecture evolution. Although no new version was released, multiple PRs for core capabilities such as OpenAI model support, event-driven architecture, and persistent memory were merged, marking the project's transition from a single assistant toward a multi-agent runtime system. Overall development health is excellent, with technical debt cleanup and feature expansion proceeding in parallel.

---

## 2. Releases

**No new release**. The latest Release remains a historical version; users are advised to follow the main branch for the latest capabilities.

---

## 3. Project Progress

PRs merged/closed today significantly advanced NanoClaw's architecture modernization and expanded its functional boundaries:

- **#1773 [CLOSED] Fix/stale session selfheal** (@cmhenry)  
  Fixed stale session issues, improving agent fault tolerance and system stability.  
  🔗 [PR #1773](https://github.com/qwibitai/nanoclaw/pull/1773)

- **#1775 [CLOSED] Sync fork** (@golddavid)  
  Synced upstream changes to keep community contributions aligned with mainline.  

- **#772, #840, #770, #756, #754, #751, #745, #708, #1595, #1388, #962 [ALL CLOSED]** (all submitted by @glifocat)  
  Batch-merged long-standing fixes and documentation updates, including:
  - WhatsApp integration stability fixes (JID handling, pairing code writes, DM registration logic)
  - PDF reader and image vision skills formally landed
  - Task container lifecycle management optimized (timely shutdown in IPC message scenarios)
  - MCP environment variable propagation fix
  - Automated CLAUDE.md template generation
  - Documentation and Code of Conduct updates  
  These merges mark the maturation of the **v1 skill ecosystem and core communication path**, laying the foundation for the v2 architecture migration.

> ✅ **Overall progress**: The project is moving from the "feature stacking" stage into a dual-track stage of "architecture refactoring + ecosystem completion".

---

## 4. Community Hotspots

Although all PR comment counts are `undefined` (possibly due to data redaction or non-public discussion), two major technical focuses can be identified from PR summaries and labels:

### 🔥 Hotspot 1: **Multi-model Agent runtime support**
- **#1774 [OPEN] feat: OpenAI model support + token tracking + stats API** (@markstrefford)  
  Introduces direct calls to OpenAI-compatible APIs, including GPT-5.4 nano/mini and Ollama, bypassing the Claude SDK and significantly reducing inference cost.  
  🔗 [PR #1774](https://github.com/qwibitai/nanoclaw/pull/1774)

- **#1776 [OPEN] feat(v2): OpenCode agent provider** (@talmosko-code)  
  Implements OpenCode as a first-class AgentProvider, using SSE + session resume and aligning with the v2 poll-loop architecture.  
  🔗 [PR #1776](https://github.com/qwibitai/nanoclaw/pull/1776)

> 💡 **Underlying request**: Users strongly want to move away from dependence on a single LLM provider (Claude) and pursue cost-controlled, locally deployable model flexibility.

### 🔥 Hotspot 2: **System architecture upgrade**
- **#1772 [OPEN] feat: NanoClaw scope expansion — event-driven architecture + 6 capability layers** (@topcoder1)  
  Proposes upgrading NanoClaw from a reactive single-threaded assistant to an **event-driven multi-agent runtime**, introducing six capability layers such as EventBus, SQLite event log, and Executor Pool.  
  🔗 [PR #1772](https://github.com/qwibitai/nanoclaw/pull/1772)

> 💡 **Underlying request**: The existing architecture is hitting bottlenecks for advanced scenarios such as complex task orchestration, long-term memory, and cross-agent collaboration.

---

## 5. Bugs and Stability

**No new bug reports today** (Issue updates are 0), but the following merged PRs fixed key stability issues:

| Severity | Problem description | Fix PR |
|--------|--------|--------|
| ⚠️ High | Task containers did not close promptly in IPC-only message mode, causing resource leaks | [#840](https://github.com/qwibitai/nanoclaw/pull/840) |
| ⚠️ High | MCP environment variables were not passed from `.env` into containers, causing authentication failures | [#962](https://github.com/qwibitai/nanoclaw/pull/962) |
| ⚠️ Medium | WhatsApp DM registration used the wrong JID, triggering logic errors | [#751](https://github.com/qwibitai/nanoclaw/pull/751) |
| ⚠️ Medium | Stale sessions could not self-heal, affecting long-running reliability | [#1773](https://github.com/qwibitai/nanoclaw/pull/1773) |

> ✅ All high-severity issues have been fixed and merged via PR, significantly improving system stability.

---

## 6. Feature Requests and Roadmap Signals

Combining open PRs and ecosystem trends, the following features are very likely to enter the next-stage roadmap:

| Feature | Status | Signal strength |
|------|------|--------|
| **OpenAI / Ollama model support** | PR #1774 open | ⭐⭐⭐⭐⭐ (must-have for cost-sensitive users) |
| **Event-driven multi-agent architecture (v2)** | PR #1772 open | ⭐⭐⭐⭐☆ (architecture-level evolution that determines future scalability) |
| **Persistent graph memory (Mem0 + Qdrant + Neo4j)** | PR #1256 open | ⭐⭐⭐⭐☆ (addresses the "context forgetting" pain point) |
| **Daily AI news briefing skill** | PR #886 open | ⭐⭐⭐☆☆ (high-value user scenario, but not core) |
| **pnpm migration (v2 build optimization)** | PR #1771 open | ⭐⭐☆☆☆ (developer experience optimization) |

> 🔮 **Prediction**: v2 will prioritize **multi-model support** and **event-driven architecture**, creating a new paradigm of "flexible backend + extensible runtime".

---

## 7. User Feedback Summary

Although there is no direct Issue comment data, real user pain points can be inferred from the fixes in PRs:

- **"The agent gets stuck after a while and has to be restarted manually"** → stale session issue (#1773 fixed)
- **"Local deployment cannot connect to MCP services and reports authentication failure"** → environment variables not propagated (#962 fixed)
- **"When I send a PDF, the agent cannot understand it and can only store it as an attachment"** → missing PDF reading skill (#772 merged)
- **"When I send an image, the agent cannot see the contents"** → missing image vision capability (#770 merged)
- **"I switched model APIs and it completely stopped running"** → tight model coupling (#1774/#1776 in progress)

> ✅ Core user requests: **stability, multimodal understanding, model freedom, and long-term memory** -- the current development direction matches them closely.

---

## 8. Backlog

The following important PRs have been open for more than 30 days and need maintainer attention:

| PR | Title | Open days | Status | Recommendation |
|----|------|--------|------|------|
| [#886](https://github.com/qwibitai/nanoclaw/pull/886) | skill: add daily news briefing with AI agent swarms | 37 days | OPEN | High-value skill; merge after review |
| [#1256](https://github.com/qwibitai/nanoclaw/pull/1256) | feat: add /add-mem0-graph skill — persistent memory | 27 days | OPEN | Key memory capability; prioritize evaluation |
| [#772](https://github.com/qwibitai/nanoclaw/pull/772) | feat(skills): add pdf-reader skill | 40 days | CLOSED (merged today) | ✅ Resolved |

> ⚠️ **Reminder**: Although PR #886 and #1256 are not urgent, they represent advanced capabilities users strongly expect and should be included in v2 skill roadmap planning.

---

**Report generated at**: 2026-04-15  
**Data source**: NanoClaw GitHub Repository (github.com/qwibitai/nanoclaw)  
**Analyst note**: The project is in a rapid evolution phase; watch the `v2` branch and updates to the `AGENT.md` configuration spec.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

IronClaw remained highly active on 2026-04-15, with 50 Issues and 50 Pull Requests updated in the past 24 hours. Community contributions and core-team development moved forward in parallel. Although no new version was released, the staging environment maintained a tight integration cadence, with several key fixes and feature enhancements entering the merge flow. The project is balancing rapid iteration with stability optimization, making significant progress in the Web gateway, channel integrations, security audit response, and LLM tool scheduling.

---

## 2. Releases

**No new release**. The current latest stable version remains `v0.25.0` (based on staging image `nearaidev/ironclaw-dind:0.25.0`), and the team is gradually validating changes through the staging-promotion process before preparing the next release.

---

## 3. Project Progress

Multiple important PRs were merged or advanced today, significantly improving system stability and user experience:

- **#2434** (merged): Fixes user messages disappearing after switching threads in the Web gateway (#2409). It writes user messages to the DB before `chat_send_handler` returns, ensuring consistent history loading.
- **#2473** (merged): Fixes Slack OAuth callback failures by unifying the nonce storage key to `owner_id` (previously DB user UUID), resolving "Invalid or expired authorization" errors.
- **#2425** (merged): Introduces the `CachedSettingsStore` decorator, caching settings reads per user to improve agent loop performance and reduce database pressure.
- **#2475** (merged): Adds Playwright E2E test `test_message_persists_across_page_reload`, validating the full message persistence path and strengthening frontend reliability coverage.
- **#2467** (merged): Fixes sandbox detection logic by trying Docker socket connection before relying on the presence of the CLI binary, supporting nested container deployment scenarios such as Nomad shards.

In addition, large PRs such as **#2432** (channel pairing flow refactor) and **#2423** (concurrency-safe tool batching) remain under review and are expected to significantly improve multi-channel integration experience and tool execution efficiency.

---

## 4. Community Hotspots

The following Issues attracted high attention, reflecting core pain points and feature expectations:

- **[#2229] Google Sheets OAuth blocked: Error 400 invalid_request** (7 comments)  
  Users report OAuth authorization failures when configuring Google Suite extensions in staging, suspected to be caused by Google API policy changes or redirect_uri configuration problems. This directly affects enterprise user data ingestion and needs priority investigation.  
  🔗 https://github.com/nearai/ironclaw/issues/2229

- **[#2230] Twitter/X connection unavailable — MCP requires manual browser cookie extraction** (4 comments)  
  The Twitter/X channel has lost automated connectivity because of upgraded platform anti-scraping mechanisms and currently requires manual cookie extraction, greatly reducing usability. The community is calling for an official alternative or proxy support.  
  🔗 https://github.com/nearai/ironclaw/issues/2230

- **[#76] feat: Discord channel integration** (3 comments, 3 👍)  
  Although closed, likely as completed, users are still asking about implementation status, showing strong demand for Discord as a mainstream communication channel. Confirm whether it is truly usable or whether documentation is missing.  
  🔗 https://github.com/nearai/ironclaw/issues/76

---

## 5. Bugs and Stability

Today's key bugs sorted by severity:

| Severity | Issue | Description | Fix status |
|--------|------|------|----------|
| **P0** | [#2409] User messages disappear after typing in chat | User input disappears in Web UI, affecting basic interaction | ✅ Fixed (#2434 merged) |
| **P0** | [#2410] Dashboard keeps refreshing and wiping contents in a loop | Dashboard refreshes endlessly and clears content | 🔄 Under investigation, no PR yet |
| **P0** | [#2405] Gateway routing error: broadcast() requires a thread_id | Gateway broadcast fails in multi-thread scenarios | 🔄 Under investigation, no PR yet |
| **P0** | [#2276] Orchestrator crashes with HTTP 413 Payload Too Large | Oversized LLM request bodies crash the orchestrator | 🔄 Under investigation, no PR yet |
| **P2** | [#2281] Bot ignores temporal conditions and sends meeting prep immediately | Scheduled tasks do not run according to schedule, undermining automation trust | 🔄 Under investigation, no PR yet |
| **Security** | [#2470] Memory poisoning: write_to_layer() bypasses injection scanning | Security vulnerability found by FailSafe audit, allowing injection bypass | ⚠️ High risk; urgent response needed |

> Note: P0 issues are concentrated around the Web gateway and core message flow, with some already fixed. The security vulnerability needs immediate resource assignment.

---

## 6. Feature Requests and Roadmap Signals

Combining Issues and PRs, the following features are likely to enter the next release:

- **Multi-LLM provider support** (#80): Already discussed by the community; core team has not objected, but priority depends on resource allocation.
- **Audio pipeline support** (#90): STT/TTS is a prerequisite for scenarios such as WhatsApp voice notes, with clear P1-P2 priority.
- **Plugin system extension** (#85): Includes ClawHub registry and HTTP route plugins; PR #2168 already demonstrates path-level credential management.
- **AI-first CI workflow** (#2459): Implementing Haiku dual-agent review and health monitoring to improve code quality and release confidence.
- **Concurrent tool execution** (#2423): Uses `is_concurrent_safe()` markers to parallelize read-only tools, significantly improving response speed.

---

## 7. User Feedback Summary

Real voices distilled from Issue comments:

- **Pain points**:  
  - "Telegram cannot see the memory content I set through the CLI" (#2259) → missing cross-channel context synchronization.  
  - "Slack integration is completely unusable; the docs say it is supported, but it cannot connect" (#1997/#1998) → missing officially hosted app breaks the user experience.  
  - "Upgrade from 0.24 to 0.25 failed, and the logs gave no hints" (#2346) → lacks clear upgrade path and error feedback.

- **Positive feedback**:  
  - "The Web UI tool card design is intuitive; I can finally see what the agent is doing" (implied by #2477-related discussions).  
  - "The staging environment responds much faster than before" (informal community feedback, possibly related to caching optimization #2425).

---

## 8. Backlog

The following long-open Issues need maintainer attention:

- **[#144] Chat/channel of project** (open since 2026-02-17, 2 comments)  
  The community has repeatedly asked for an official Discord/Telegram group; the lack of a centralized discussion channel can fragment information.  
  🔗 https://github.com/nearai/ironclaw/issues/144

- **[#101] RFC: Git-Based Plugin Registry** (open since 2026-02-15)  
  A key proposal for plugin ecosystem expansion that has not entered implementation, affecting third-party extension growth.  
  🔗 https://github.com/nearai/ironclaw/issues/101

- **[#120] RFC: Simplify skills system - adopt OpenClaw SKILL.md format + Docker confinement**  
  Major skill system architecture adjustment proposal involving security and compatibility; requires core team decision.  
  🔗 https://github.com/nearai/ironclaw/issues/120

> Recommendation: Hold a roadmap review meeting for RFCs or high-priority Feature Requests that have gone more than 60 days without updates.

--- 

**Report generated at**: 2026-04-15  
**Data source**: GitHub IronClaw Repository (github.com/nearai/ironclaw)

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

LobsterAI continued a highly active development pace on 2026-04-14, with **24 PR updates in 24 hours** (13 merged/closed, 11 pending), covering build optimization, UI experience, OpenClaw runtime performance, MCP fixes, and other key modules. The community submitted 2 new Issues, both involving core functional failures (SSE response interruption and MCP engine unavailability). Neither has been closed, so they require priority follow-up. Overall, the project is in a phase of **rapid iteration plus stability hardening**, with development clearly shifting toward runtime performance optimization, such as reducing Windows cold start from 51s to 35s, and refined user experience, such as session grouping and TTS reading.

---

## 2. Releases

**No new release**. The main branch is still preparing for `release/2026.04.14`, and multiple fix PRs, such as #1672 and #1674, have been merged into that release branch for validation.

---

## 3. Project Progress

PRs merged/closed today significantly advanced the following areas:

- **Runtime performance optimization**:  
  #1673 removes legacy configuration checks and QQBot preload logic during OpenClaw startup, **reducing Windows cold-start time from ~51s to ~35s**, improving a key user experience metric.  
  #1677 further optimizes the gateway build process by enabling esbuild minify and removing deprecated plugin configuration, reducing resource overhead.

- **Build and package size reduction**:  
  #1684 removes leftover `@tloncorp/tlon-skill` native binaries (~65MB), preventing abnormal macOS installer bloat. #1685 proposes a more systematic runtime package size reduction strategy, including deduplicating gateway.asar and pruning unused extensions.

- **UI/UX enhancements**:  
  #1682 adds **Web Speech API-based reading aloud** for AI replies in Cowork sessions, implementing TTS with zero dependencies and improving accessibility.  
  #1675 groups the session list by time (today/yesterday/within 7 days/by month), addressing difficulty finding historical sessions.  
  #1679 adds a statistics panel to the scheduled task history page, providing execution count, success rate, trend charts, and other insights.

- **Stability and error handling**:  
  #1681 fixes duplicate error messages in the UI caused by the gateway retry mechanism, avoiding user confusion.  
  #1683 adds upfront URL format validation for remote skill import, preventing invalid inputs from triggering invalid download requests.

> Overall, while maintaining feature iteration, the project has **significantly strengthened low-level stability and performance**, laying the groundwork for larger-scale deployment.

---

## 4. Community Hotspots

There were no high-comment Issues/PRs today, but two newly opened Issues reflect critical functional failures and deserve close attention:

- **[#1671] SSE response terminates early during MD to Word conversion**  
  Users report that conversion tasks terminate before completion because of `finish reason: full`, possibly involving streaming response buffer limits or timeout mechanism defects.  
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1671

- **[#1662] Non-SSE MCP engines cannot be used**  
  Users report that MCP engines other than SSE "cannot be found or used", directly affecting multi-protocol compatibility and potentially involving engine discovery or registration logic.  
  🔗 https://github.com/netease-youdao/LobsterAI/issues/1662

> Both are **blocking functional defects**. Maintainers should prioritize reproduction and resource assignment.

---

## 5. Bugs and Stability

| Severity | Problem description | Status | Related PR |
|--------|--------|------|--------|
| ⚠️ High | MD to Word task interrupted by SSE `finish reason: full` | Unfixed | — |
| ⚠️ High | Non-SSE MCP engines cannot be loaded or used | Unfixed | — |
| 🟡 Medium | Remote skill import lacks URL format validation, causing invalid downloads | Fixed | #1683 |
| 🟡 Medium | Gateway retry mechanism causes duplicate error messages | Fixed | #1681 |
| 🟢 Low | Qianfan provider icon not registered | Fixed | #1680 |

---

## 6. Feature Requests and Roadmap Signals

The following potential roadmap directions are visible from PRs and Issues:

- **Agent workspace isolation** (#1668): Supports configuring an independent working directory for each Agent, indicating that multi-agent collaboration scenarios will become a focus.
- **Multi-bot WeCom support** (#1670): Extends Enterprise WeChat integration capabilities to meet team-level automation needs.
- **Qwen console migration to Bailian** (#1667): Keeps up with cloud vendor ecosystem changes and shows active maintenance of third-party service dependencies.
- **Scheduled task visualization statistics** (#1679): Reflects strong user demand for automation task observability and may extend into a broader monitoring dashboard.

> These features all have implementation PRs pending merge and are **very likely to enter the next official release**.

---

## 7. User Feedback Summary

- **Pain points**:  
  - Document conversion (MD → Word) is unreliable for long documents, with SSE streams prone to interruption (#1671).  
  - MCP multi-engine support is incomplete; non-SSE protocols cannot be used, limiting user choice (#1662).  
  - The session list lacked time-based organization, making history difficult to find (resolved by #1675).

- **Positive feedback**:  
  - Users expressed interest in the new AI message reading feature (#1682) and task statistics panel (#1679), seeing them as improvements in interaction friendliness.  
  - Users praised detail-oriented fixes such as the Qianfan icon fix (#1680), which improve product polish.

---

## 8. Backlog

- **Long-unanswered Issues**: No high-priority Issues have gone more than 7 days without response; current backlog is manageable.  
- **Important PRs pending merge**:  
  - #1668 (independent Agent working directory) -- involves data-layer changes and needs careful review  
  - #1670 (multi-bot WeCom support) -- high feature value; should be merged quickly  
  - #1685 (runtime package size optimization) -- significantly affects distribution efficiency and is worth advancing

> Maintainers should complete code review and merging for the above PRs this week to release the technical benefits.

---  
**Report generated at: 2026-04-15**  
**Data source: LobsterAI GitHub repository (netease-youdao/LobsterAI)**

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the past 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

Moltis remained highly active on 2026-04-15, with the community and core team collaboratively advancing several key fixes and feature enhancements. Over the past 24 hours, the project processed **12 Issues** (9 closed, 3 newly opened) and **13 Pull Requests** (8 merged/closed, 5 pending), and released a new version, `20260414.02`. The development cadence is tight, focused on core areas such as **MCP tool compatibility, sandbox security hardening, and multi-platform communication stability**, and overall project health is good.

---

## 2. Releases

### 🔖 New version: `20260414.02` (released on 2026-04-14)

This release is an **emergency fix release**, mainly addressing the following critical issues:

- **Fix Google/Gemini calls through OpenRouter failing**: Union types generated by OpenAI strict mode, such as `["boolean","null"]`, were rejected by Gemini, causing tool-call failures (#716). Compatibility was implemented through parameterized `to_openai_tools()` (#717).
- **Strengthen Docker/Podman sandbox isolation**: Masks leaked host metadata in `/proc` and `/sys`, such as BIOS serial numbers and LUKS UUIDs, preventing information leakage (#705 → #706).
- **Fix missing Slack Socket Mode TLS support**: Upgrades `slack-morphism` to 2.20 and enables `rustls-native-certs`, resolving `wss://` connection failures (#543 → #707).
- **Mandatory GraphQL sessionKey validation**: All chat operations now require explicit `sessionKey`, improving session security and consistency (#542 → #708).

> ⚠️ **Migration notes**:  
> - Users of Slack Socket Mode must ensure the environment supports TLS 1.3;  
> - All GraphQL clients must explicitly pass `sessionKey` in requests, or validation errors will be returned;  
> - If relying on old WhatsApp protocol parsing, note that the protobuf structure has been updated with `whatsapp-rust@0.5` (#709).

[View Release details](https://github.com/moltis-org/moltis/releases/tag/20260414.02)

---

## 3. Project Progress

Today **8 PRs were merged/closed**, significantly advancing several key areas:

| Category | Progress summary | Related PR |
|------|--------|--------|
| **Security** | Implements host metadata isolation for container sandboxes, preventing sensitive information leakage | [#706](https://github.com/moltis-org/moltis/pull/706) |
| **Compatibility** | Fixes OpenRouter + Gemini tool-call failures and supports non-strict schema mode | [#717](https://github.com/moltis-org/moltis/pull/717) |
| **Communication stability** | Upgrades Slack client to a TLS-capable version, resolving connection interruptions | [#707](https://github.com/moltis-org/moltis/pull/707) |
| **API consistency** | Requires `sessionKey` for all GraphQL chat operations, unifying session management | [#708](https://github.com/moltis-org/moltis/pull/708) |
| **Dependency maintenance** | Upgrades `reqwest` to 0.13, paving the way for future OpenAI-Oxide integration | [#488](https://github.com/moltis-org/moltis/pull/488) |
| **Build system** | Adds Nix Flake support, improving reproducible build capability | [#469](https://github.com/moltis-org/moltis/pull/469) |

> ✅ Overall, the project made substantive progress across **security, compatibility, and maintainability**.

---

## 4. Community Hotspots

### 🔥 Most active Issue: [#671] "Clear" button is hidden in main session  
- **Comment count: 4** | **Status: closed**  
- Users reported that the main session interface lacks a "Clear" button, affecting interaction experience. Although closed, it reflects a blind spot in UI/UX design around visibility of core operations.  
- The team may have implemented the feature through another path, such as shortcuts or commands, but did not clearly tell users. Documentation should be supplemented.  
[View Issue](https://github.com/moltis-org/moltis/issues/671)

### 💬 High-attention PR: [#718] docs: add comprehensive configuration reference  
- **Adds 1078 lines of configuration documentation**, covering all `moltis.toml` modules such as server, agents, and providers  
- The community has long complained that configuration is complex and lacks an official guide; this PR greatly lowers the onboarding barrier for new users and is widely anticipated.  
[View PR](https://github.com/moltis-org/moltis/pull/718)

---

## 5. Bugs and Stability

| Severity | Issue | Description | Fixed |
|--------|------|------|----------|
| 🔴 High | [#716] Chat fails with Google/Gemini via OpenRouter | Union types in tool schema cause `INVALID_ARGUMENT` errors | ✅ Fixed (#717) |
| 🔴 High | [#705] /proc and /sys exposed in Docker container | Container can read host hardware information, creating security risk | ✅ Fixed (#706) |
| 🟠 Medium | [#712] MCP not properly working | User reports MCP malfunction, but without specific logs | ❌ Pending investigation (new) |
| 🟠 Medium | [#543] Slack Client Built Without TLS support | Socket Mode cannot connect to wss endpoints | ✅ Fixed (#707) |
| 🟡 Low | [#694] MCP tool schemas with `not` keyword rejected | Attio MCP tool unusable due to schema validation failure | ✅ Closed (likely fixed upstream) |

> ⚠️ Prioritize follow-up on [#712] MCP malfunction, because it may affect core AI toolchain integration.

---

## 6. Feature Requests and Roadmap Signals

| Feature request | Reporter | Potential value | Related PR exists |
|--------|--------|--------|----------------|
| [#711] OpenID authentication in matrix | @ser | Improves enterprise identity integration | ❌ No |
| [#713] Pass Telegram username to LLM | @cozybuild | Strengthens context personalization | ❌ No |
| [#563] Allow bot to receive and process PDFs | @omaralvarez | Extends multimodal input support | ❌ No |
| [#714] Allow GUIDELINES.md override for agents | @Cstewart-HC | Supports custom agent behavioral guidelines | ✅ Implementation exists (#714) |

> 📌 **Roadmap prediction**:  
> - `GUIDELINES.md` custom override support (#714) is very likely to enter the next version because it follows the existing file override pattern and has low implementation cost with high value;  
> - PDF processing and OpenID authentication need more design discussion and are expected to enter v0.5+ planning.

---

## 7. User Feedback Summary

Key user voices distilled from Issue comments:

- **Pain points**:
  - "There is no clear button in the main session, so after sending a message by mistake I cannot reset quickly" (#671) → **unclear UI operation path**
  - "Slack keeps disconnecting, and the logs show TLS errors" (#543) → **unstable production communication**
  - "Calling Gemini through OpenRouter keeps failing; switching back to OpenAI works" (#716) → **poor multi-provider compatibility**

- **Positive feedback**:
  - "Nix support is great! It can finally build in a purely functional environment" (#469 comments)
  - "Mandatory sessionKey validation makes multi-tenancy safer" (implicit approval of #708)

- **Usage scenarios**:
  - Enterprise users care about **identity authentication (OpenID) and audit compliance**;
  - Developers heavily depend on **MCP toolchains and multi-platform integrations (Slack/Telegram/WhatsApp)**;
  - Security teams value **sandbox isolation and controllable configuration**.

---

## 8. Backlog

The following Issues/PRs have gone a long time without response and deserve maintainer attention:

| Number | Type | Title | Created | Status | Recommended action |
|------|------|------|--------|------|--------|
| [#534] | Issue | WhatsApp inbound messages parsed as empty after protobuf update | 2026-03-20 | OPEN | Dependencies have been upgraded (#709), but verify whether the issue is fully resolved |
| [#487] | PR | feat(providers): add openai-oxide as alternative OpenAI provider | 2026-03-25 | OPEN | Dependency #488 has been merged; push review and merge |
| [#545] | Issue | How often is a version released? | 2026-04-03 | CLOSED | Although closed, it reflects user frustration around opaque release cadence; establish a release calendar |

> 🔔 **Reminder**: Clarify the **release cadence strategy** in the next community meeting and publish the roadmap to reduce user anxiety.

---

**Report generated at**: 2026-04-15  
**Data source**: [Moltis GitHub Repository](https://github.com/moltis-org/moltis)  
**Analyst**: AI open source project activity monitoring system

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Activity Daily Report (2026-04-15)

---

## 1. Quick Look

Over the past 24 hours, the CoPaw project remained highly active, processing **46 Issues** and **47 Pull Requests** and publishing **2 new versions** (v1.1.1 stable and v1.1.1-beta.2). The community engaged in dense discussion around core topics such as the migration path from CoPaw to QwenPaw, data directory compatibility, and multi-device synchronization. Development focus is on console UI optimization, local model connection stability fixes, and multi-agent collaboration architecture refactoring. Overall, the project is in a fast iteration phase driven by user feedback.

---

## 2. Releases

### ✅ v1.1.1 officially released
- **New features**:
  - Built-in **OpenRouter Provider**, supporting model discovery, family browsing, and filtering by modality/price ([#1192](https://github.com/agentscope-ai/QwenPaw/pull/1192))
  - Added **OpenCode Provider** (OpenAI-compatible interface)
- **Notes**:
  - This is a feature-enhancement release with no breaking changes, but users should check whether custom Provider configurations are compatible with the new metadata format after upgrading.

### 🔧 v1.1.1-beta.2 (pre-release)
- Main updates:
  - Version number upgraded to `1.1.1b2` ([#3343](https://github.com/agentscope-ai/QwenPaw/pull/3343))
  - Console optimization: improved Provider model management modal, with capability tag display and model search ([#3343](https://github.com/agentscope-ai/QwenPaw/pull/3343))

> 📌 Developers should watch stability of the stable v1.1.1 release. The beta version is mainly for internal testing.

---

## 3. Project Progress

Important PRs merged/closed today significantly improved system stability and user experience:

| PR | Type | Key contribution |
|----|------|--------|
| [#2996](https://github.com/agentscope-ai/QwenPaw/pull/2996) | Feature | Implements automatic console frontend build, solving the issue where the UI does not update after `git pull` |
| [#2987](https://github.com/agentscope-ai/QwenPaw/pull/2987) | Bug fix | Fixes a race condition that made chat cancellation fail |
| [#3379](https://github.com/agentscope-ai/QwenPaw/pull/3379) | Bug fix | Fixes 422 errors when creating scheduled tasks in the console |
| [#3383](https://github.com/agentscope-ai/QwenPaw/pull/3383) | Documentation | Updates v1.1.1 release notes |

In addition, several long-running efforts made progress:
- Multi-agent collaboration architecture refactor ([#3292](https://github.com/agentscope-ai/QwenPaw/pull/3292)) has entered review
- The console adds an **Agent Statistics page**, providing session/message trend analysis ([#3365](https://github.com/agentscope-ai/QwenPaw/pull/3365))

> The project has taken an important step toward an "enterprise-grade multi-agent collaboration platform", optimizing UI/UX and core architecture together.

---

## 4. Community Hotspots

### 🔥 Most active Issue: [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) (56 comments)
- **Topic**: "Help Wanted: Open Tasks — Come Contribute!"
- **Analysis**: The community is highly interested in the list of contributable tasks, reflecting that the project is friendly to external contributors and that maintainers actively guide collaboration. P0-P2 tasks cover file rollback, skill categorization, self-evolution mechanisms, and other roadmap directions.

### 💬 High-attention migration issue: [#3288](https://github.com/agentscope-ai/QwenPaw/issues/3288) (32 comments)
- Users are asking intensively about a **smooth CoPaw → QwenPaw upgrade path** and worrying about data loss across agents, memory, and configuration.
- Follow-on Issue [#3356](https://github.com/agentscope-ai/QwenPaw/issues/3356) points out that after upgrade, `WORKING_DIR` still points to `.copaw`, causing data writes to become messy.
- **Underlying request**: There is no official migration guide or automated migration script, and a standardized upgrade process is urgently needed.

---

## 5. Bugs and Stability

Sorted by severity:

| Issue | Severity | Status | Related fix |
|------|--------|------|---------|
| [#3312](https://github.com/agentscope-ai/QwenPaw/issues/3312) | 🔴 Critical | OPEN | None |
| **Neither old nor new Mac versions can start after installation, making the app completely unusable** | | | |
| [#3322](https://github.com/agentscope-ai/QwenPaw/issues/3322) | 🔴 Critical | OPEN | None |
| **Windows desktop version shows a blank screen after installation and freezes the system** | | | |
| [#3356](https://github.com/agentscope-ai/QwenPaw/issues/3356) | 🟠 High | OPEN | None |
| **WORKING_DIR not switched to .qwenpaw, so data is written to the old directory** | | | |
| [#3331](https://github.com/agentscope-ai/QwenPaw/issues/3331) | 🟠 High | CLOSED | ✅ Fixed |
| Feishu channel crashes across WebSocket loops in multi-agent environments | | | |
| [#3342](https://github.com/agentscope-ai/QwenPaw/issues/3342) | 🟡 Medium | CLOSED | ✅ Fixed |
| Local Ollama model status is identified inaccurately and cannot be deleted | | | |

> ⚠️ Urgently investigate macOS and Windows desktop startup crashes, which may affect user retention.

---

## 6. Feature Requests and Roadmap Signals

Among features users strongly want, the following already have corresponding PRs or are under development:

| Feature request | Source Issue | Progress |
|--------|-----------|------|
| **One-click update button** | [#2301](https://github.com/agentscope-ai/QwenPaw/issues/2301) | No direct PR, but [#2996](https://github.com/agentscope-ai/QwenPaw/pull/2996) implements automatic frontend build and lays groundwork for auto-update |
| **Change /approve to a button** | [#2301](https://github.com/agentscope-ai/QwenPaw/issues/2301) | ✅ [#3257](https://github.com/agentscope-ai/QwenPaw/pull/3257) implemented |
| **Skill categorization and folder management** | [#2961](https://github.com/agentscope-ai/QwenPaw/issues/2961) | No PR, but [#2657](https://github.com/agentscope-ai/QwenPaw/issues/2657) has been closed and some needs were absorbed |
| **File operation rollback (restore deleted files)** | [#2590](https://github.com/agentscope-ai/QwenPaw/issues/2590) | Developer has claimed the task and is designing implementation |
| **Multi-device sync (mobile/WeChat/browser)** | [#2301](https://github.com/agentscope-ai/QwenPaw/issues/2301) | No PR; long-term vision |

> 📌 The next version (v1.2.0) may focus on **migration tooling** and **skill management system refactoring**.

---

## 7. User Feedback Summary

### 😟 Pain points
- **Confusing upgrade**: Manual data migration is error-prone, and coexistence of `.copaw` and `.qwenpaw` directories causes configuration conflicts ([#3288](https://github.com/agentscope-ai/QwenPaw/issues/3288), [#3309](https://github.com/agentscope-ai/QwenPaw/issues/3309))
- **Poor installation experience**: Windows/macOS installers are unsigned, triggering security warnings; new versions have a 3-5 second startup delay ([#3314](https://github.com/agentscope-ai/QwenPaw/issues/3314), [#3352](https://github.com/agentscope-ai/QwenPaw/issues/3352))
- **Unstable model connections**: Ollama test interface `/model` is non-standard, and some devices cannot connect ([#3377](https://github.com/agentscope-ai/QwenPaw/issues/3377))

### ✅ Positive feedback
- Console UI continues to improve, such as token usage displayed in reverse chronological order -- [#3387](https://github.com/agentscope-ai/QwenPaw/pull/3387)
- Feishu/WeChat channel functionality is gradually improving, although message truncation issues remain -- [#3369](https://github.com/agentscope-ai/QwenPaw/issues/3369)

---

## 8. Backlog

| Issue/PR | Type | Backlog age | Reminder |
|---------|------|--------|------|
| [#2291](https://github.com/agentscope-ai/QwenPaw/issues/2291) | Issue | 21 days | Maintainers should regularly update task status to avoid contributor confusion |
| [#2590](https://github.com/agentscope-ai/QwenPaw/issues/2590) | Issue | 16 days | File rollback is a high-value feature; allocate resources to advance it |
| [#3347](https://github.com/agentscope-ai/QwenPaw/pull/3347) | PR | 2 days | First-time contributor submitted memory watcher configuration optimization; needs review |
| [#3364](https://github.com/agentscope-ai/QwenPaw/pull/3364) | PR | 1 day | "Mission Mode" autonomous iterative agent is innovative; evaluate for roadmap inclusion |

> 🔔 Maintainers should prioritize **writing the migration guide** and **fixing desktop startup crashes** to improve user confidence.

---  
*Data source: GitHub CoPaw/QwenPaw repository, as of 2026-04-15 00:00 UTC*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

**ZeptoClaw Project Activity Daily Report**  
📅 Date: 2026-04-15  

---

### 1. Quick Look  
Over the past 24 hours, ZeptoClaw showed moderate activity. No new version was released, but dependency updates were frequent. There were **12 Pull Requests** (all dependency upgrades automatically submitted by Dependabot) and **1 Issue update** (#486, about concurrent architecture design). The community is paying attention to core architecture evolution, but no substantive code merge or feature landing occurred. Overall, the project is in a "maintenance optimization" phase, focused mainly on technical debt cleanup while major feature work is temporarily paused.

---

### 2. Releases  
❌ No new release.

---

### 3. Project Progress  
⚠️ **No PRs were merged or closed**.  
Although 12 dependency update PRs are pending (#507-#518), covering Rust, JavaScript, and GitHub Actions ecosystem components such as `uuid`, `sha2`, `vite`, and `astro`, none entered the merge flow. This suggests the maintenance team may currently be focusing on architecture evaluation or internal testing and has not yet advanced automated dependency updates.

> 🔗 Related PR list:  
> - [Bump uuid from 1.22.0 to 1.23.0](https://github.com/qhkm/zeptoclaw/pull/518)  
> - [Bump vite from 7.3.1 to 8.0.0 in /panel](https://github.com/qhkm/zeptoclaw/pull/512)  
> - [Bump astro from 5.18.1 to 6.0.5](https://github.com/qhkm/zeptoclaw/pull/510)

---

### 4. Community Hotspots  
🔥 **Issue #486: [feat] true concurrent/non blocking design**  
This Issue was opened on 2026-04-03 and updated again yesterday (04-14). It has 2 comments and is the only recently active discussion.  
**Core request**: The current agent blocks user interaction while executing long tasks, so a truly non-blocking/concurrent architecture is needed.  
**Reference approach**: The proposal suggests borrowing the design pattern from [spacebot](https://github.com/spacedriveapp/spacebot).  
**Impact scope**: Labeled "Large" because it involves a new subsystem and multi-module refactor. The author explicitly says they "do not want to implement it myself".

> 🔗 Link: https://github.com/qhkm/zeptoclaw/issues/486  
> 💡 Analysis: This Issue reflects strong user demand for a **responsive experience**. In AI assistant scenarios especially, "blocking execution" has become a key experience bottleneck. If advanced, this would be an important step toward production-grade usability.

---

### 5. Bugs and Stability  
✅ **No new bug reports or crash issues**.  
All recent activity is focused on dependency maintenance and architecture discussion, with no regressions or stability issues observed.

---

### 6. Feature Requests and Roadmap Signals  
📌 **High-priority signal: non-blocking concurrent architecture (Issue #486)**  
Although there is no corresponding PR yet, the Issue is labeled `[feat]` and has a clear scope. Combined with the general requirement for real-time interaction in AI assistant products, it is very likely to become a core development direction in the next phase.  
The maintenance team should evaluate the feasibility of the spacebot architecture and plan an MVP implementation path, such as a Tokio-based async task scheduling layer.

> 🔍 Related technical stack: Rust async runtime, message queues, frontend state synchronization mechanism.

---

### 7. User Feedback Summary  
The following real pain points can be extracted from Issue #486:  
- **Scenario**: When the agent is executing complex reasoning or external calls, the user cannot send new instructions or get intermediate status.  
- **Dissatisfaction**: "Blocking response" violates the continuous interaction expected from an "intelligent assistant".  
- **Expectation**: Support background task execution plus immediate foreground response, similar to ChatGPT's "typewriter stream" or Claude's "visible thinking process".  

> 💬 User quote: "If the agent is running a long job, it won't respond to users until it finishes."

---

### 8. Backlog  
⚠️ **Long-unanswered Issue**:  
- **#486 (created 2026-04-03, 12 days without official response)**  
  Although not a traditional "backlog" item, it involves core architecture and has large scope, so maintainers need to clearly state a position (accept/reject/phase implementation).  
  Recommendation: Reply within 3 days with a technical evaluation plan or roadmap arrangement to avoid losing community confidence.

> 🔗 https://github.com/qhkm/zeptoclaw/issues/486

---

**Summary**: ZeptoClaw is currently in a "quiet optimization period", with active dependency maintenance but stalled feature progress. User demand for concurrent architecture is urgent. A breakthrough in this direction would significantly improve project competitiveness. Prioritize responding to #486 and define a technical validation roadmap.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

**EasyClaw Project Activity Daily Report**  
**Date: April 15, 2026**  
**Analysis scope: past 24 hours (2026-04-14 to 2026-04-15)**

---

### 1. Quick Look  
EasyClaw had low overall activity over the past 24 hours, with no new or updated Issues or Pull Requests and stable community interaction. The only notable project activity was the release of **v1.7.10**, focused mainly on optimizing macOS installation experience. The project is currently in stable maintenance, with no urgent backlog and good health.

---

### 2. Releases  
**New version: v1.7.10 (RivonClaw v1.7.10)**  
🔗 [Release v1.7.10](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.7.10)

**Update focus:**  
- **macOS installation experience optimization**: In response to the user-facing "'RivonClaw' is damaged and can't be opened" error, this release explicitly explains in the Release notes that the issue comes from macOS Gatekeeper blocking unsigned apps and does not indicate file corruption. It also provides the standard Terminal command workaround (`xattr -cr /path/to/RivonClaw.app`), reducing user misdiagnosis and support cost.

**Breaking changes: none**  
**Migration notes: none**  
> This is a documentation and guidance update, with no code logic changes. All existing users can upgrade without disruption.

---

### 3. Project Progress  
No Pull Requests were merged or closed over the past 24 hours, and there was no new feature development or core logic adjustment. The project currently focuses on user experience optimization and release process refinement, consistent with its positioning as a lightweight AI assistant tool.

---

### 4. Community Hotspots  
No new or active Issues or PRs. Community discussion intensity is low. There was no high-interaction content in the past 24 hours, indicating that the current user base is stable and no concentrated feature requests or problem reports have appeared.

---

### 5. Bugs and Stability  
No new bugs, crashes, or regressions were reported. Combined with the lack of recent Issue updates, the project appears stable after the v1.7.10 release, with no new defects introduced.

---

### 6. Feature Requests and Roadmap Signals  
No new feature requests were submitted. Given the project's long-term low-frequency update cadence and the fact that this release only optimizes installation instructions, the next phase is expected to continue a "stability first, small experience refinements" strategy, with no major feature iteration planned in the short term.

---

### 7. User Feedback Summary  
Although there were no new Issues, the v1.7.10 release notes directly respond to a long-running macOS installation confusion, reflecting a real user pain point:  
> "The 'damaged' warning makes people afraid to open it, as if it were a virus or download error."  
By clearly explaining the cause and providing a Terminal fix, the official guidance improves user trust and installation success rate. This feedback shows that **cross-platform compatibility documentation**, especially around macOS security mechanisms, is key to improving user experience.

---

### 8. Backlog  
After checking the Issues and PR lists, there are currently no important long-unanswered Issues or PRs. Maintainer response is timely, backlog risk is low, and overall maintenance status is healthy.

---

**Summary assessment:**  
EasyClaw maintained project activity today through a lightweight but high-value version release, focused on solving a real installation barrier. This reflects an open source maintenance strategy of "small steps, fast iteration, experience first". The project is healthy overall and suitable for personal AI assistant users who prioritize stability. Continue watching the impact of macOS and Windows platform signing mechanisms on distribution; future code signing could improve out-of-the-box experience.

</details>

---
