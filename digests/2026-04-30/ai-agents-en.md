# OpenClaw Ecosystem Digest 2026-04-30

> Issues: 317 | PRs: 500 | Projects covered: 12 | Generated: 2026-04-30 14:11 UTC

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

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-04-30

## 1. Today’s Overview
The OpenClaw repository remains in a **very active daily development phase**. In the last 24 hours there were **317 issues updated** (283 open, 34 closed) and **500 pull requests updated** (449 open, 51 merged or closed). Two fresh releases were cut, both containing significant new capabilities and provider expansions. The churn is high, with a mix of regressions, feature requests, and multiple active fix-pull requests—indicating a project under sustained, rapid iteration.

## 2. Releases
### v2026.4.29-beta.1 — *OpenClaw 2026.4.29-beta.1*
- **Active-run steering by default** for messaging and automation, with visible-reply enforcement.
- **Subagent routing metadata** for spawned tasks.
- **Opt-in follow-up commitments** for heartbeat-delivered reminders.
- Memory subsystem growth (full details truncated in log).

### v2026.4.27 — *openclaw 2026.4.27*
- **Codex Computer Use** now ships with `status`/`install` commands, marketplace discovery, and fail-closed MCP checks for Codex-mode desktop control.
- **DeepInfra** added as a bundled provider, enabling model discovery, media generation/editing, TTS, and embeddings (details truncated).

*No breaking changes or migration notes were provided in the available release notes.*

## 3. Project Progress
The 51 merged/closed PRs today include at least three items visible in the top activity list:
- **[#75104](https://github.com/openclaw/openclaw/pull/75104)** *(closed)* – **fix(tui): skip eager context warmup during startup** → improves TUI startup responsiveness.
- **[#45626](https://github.com/openclaw/openclaw/pull/45626)** *(closed)* – **fix: add `fileId` to message tool schema for Slack download-file** → fixes a parameter gap preventing the Slack download-file action from working.
- **[#45876](https://github.com/openclaw/openclaw/pull/45876)** *(closed)* – **Auth: recognize `GOOGLE_CLOUD_API_KEY` for google-vertex provider** → extends credential scrubbing for Vertex AI setups.

These represent small but concrete forward steps in tooling fixes, authentication hardening, and developer experience.

## 4. Community Hot Topics
*Issues with the most comments/reactions this period:*

- **[#12602](https://github.com/openclaw/openclaw/issues/12602) – Slack Block Kit support** (13 comments)  
  Users want agents to craft **rich, interactive Slack messages** (CRM summaries, database query results, action buttons) instead of plain-text. This is a strong UX demand from professional users.

- **[#44993](https://github.com/openclaw/openclaw/issues/44993) – Heartbeat/Cron stale timestamp** (10 comments, regression)  
  The “Current time” timestamp injected into agent prompts does not refresh between runs, leading to **wrong time awareness**. Critical for scheduling accuracy.

- **[#13583](https://github.com/openclaw/openclaw/issues/13583) – Pre-response enforcement hooks (hard gates)** (10 comments, 2 👍)  
  Request for **mechanical hard gates** that prevent the agent from answering until required tool calls are made. Requested by users in high-stakes finance/security/operations domains.

- **[#74328](https://github.com/openclaw/openclaw/issues/74328) – Gateway CPU 100% regression** (7 comments, 3 👍)  
  A `v2026.4.26` regression that causes the gateway main thread to spin at 100% CPU, making it completely unresponsive. **Highest-impact regression of the day.**

- **[#42840](https://github.com/openclaw/openclaw/issues/42840) – MathJax/LaTeX in Control UI** (6 comments, 4 👍)  
  A frequently requested quality-of-life addition for scientific and mathematical users.

- **[#17925](https://github.com/openclaw/openclaw/issues/17925) – Native web_search passthrough for ZAI/GLM and Google Gemini** (5 comments, 5 👍)  
  Extending provider-native search tool support, mirroring what already exists for xAI Grok. Strong signal from users of Chinese and Google models.

- **[#42026](https://github.com/openclaw/openclaw/pull/42026) – Distributed Agent Runtime RFC** (4 comments, 3 👍)  
  A forward-looking design proposal to split the monolithic gateway into a **control plane and per-agent runtime** for scalability and isolation.

**Underlying needs**: richer channel interaction, provable safety/control guarantees, consistent time & scheduling, stable infrastructure, and better UI/UX for specialised audiences.

## 5. Bugs & Stability
Ranked by user impact and activity:

| Severity | Issue | Description | Open Fix? |
|----------|-------|-------------|-----------|
| 🔴 Critical | [#74328](https://github.com/openclaw/openclaw/issues/74328) | **Gateway main thread 100% CPU** on v2026.4.26+; completely unresponsive. Regression. | No fix PR yet |
| 🔴 Critical | [#44925](https://github.com/openclaw/openclaw/issues/44925) | **Subagent completion silently lost** — no retry, no notification, no auto-restart. Affects Telegram forum bots. | No |
| 🔴 Critical | [#44993](https://github.com/openclaw/openclaw/issues/44993) | **Heartbeat/Cron “Current time” stale** — agent sees wrong time across multiple runs. | No |
| 🟠 High | [#73306](https://github.com/openclaw/openclaw/issues/73306) | **Active Memory plugin times out on every run** (15s timeout, 0 chars) since v2026.4.26. | No |
| 🟠 High | [#72808](https://github.com/openclaw/openclaw/issues/72808) | **Silently lost Slack connection** — user messages not answered, no error feedback. | No |
| 🟠 High | [#40540](https://github.com/openclaw/openclaw/issues/40540) | **`openclaw update` fails with EBUSY on Windows** — self‑update broken for many Windows users. | No |
| 🟡 Medium | [#41581](https://github.com/openclaw/openclaw/issues/41581) | **Telegram streaming regression** — choppy updates since v2026.3.8. | No |
| 🟡 Medium | [#72861](https://github.com/openclaw/openclaw/issues/72861) | **Control UI message duplication** + metadata leak; regression. | No |
| 🟡 Medium | [#45494](https://github.com/openclaw/openclaw/issues/45494) | **Cron jobs time out silently during sustained API outages** instead of fast‑failing. | No |

**Observation**: Multiple regressions introduced in recent `v2026.4.x` releases are affecting core reliability (gateway, memory, Slack, Telegram). Community members are actively reporting, but corresponding fix PRs are not visible for the most critical items yet.

## 6. Feature Requests & Roadmap Signals
Based on comment volume and positive reactions, the following features appear most likely to influence upcoming releases or receive attention:

- **Slack Block Kit (#12602)** – High demand; aligns with the focus on channel-native rich messaging seen in `v2026.4.29-beta.1`.
- **Pre-response hard gates (#13583)** – Requested for security/critical workflows; fits the existing `strict-agentic` direction.
- **Native web_search for ZAI/Gemini (#17925)** – 5 👍; provider expansion pattern already established with Grok.
- **Denylist for exec-approvals (#6615)** – 6 👍; a natural complement to the existing allowlist.
- **MathJax/LaTeX in Control UI (#42840)** – 4 👍; UI polish that would benefit scientific users.
- **Distributed Agent Runtime RFC (#42026)** – Long‑term architectural direction; likely to be debated further before implementation.

The **next beta** may already include some of the leak‑fixes, timeout improvements, and UI cleanups that are currently under review in open PRs.

## 7. User Feedback Summary
**Pain points** are concentrated around reliability and observability:
- Users are frustrated by **silent failures** (subagent results lost, Slack connections dying with no alert).
- **Regressions in recent releases** (gateway CPU, Active Memory timeouts, Telegram streaming) are eroding trust in updates.
- **Windows support** is fragile—self‑update breaks, and native performance is poor on Windows Server 2022 (#72922).
- **State management** is weak: no official backup/restore (#13616), session snapshots (#13700), or proper stale‑state detection (#43549).
- **Plugin and model parity** is requested (Feishu streaming, Chinese API rate‑limit patterns, Google Chat group‑message handling).

**Satisfaction** is evident from the rapid community contributions and the mature features being shipped (Codex Computer Use, DeepInfra). However, the ratio of open to closed issues (283:34) and the large number of regressions suggest that **stabilisation and hardening are becoming urgent**.

## 8. Backlog Watch
*Items that have aged without resolution and deserve maintainer attention:*

- **[#12602](https://github.com/openclaw/openclaw/issues/12602) – Slack Block Kit** (open since **2026‑02‑09**, 13 comments, no visible progress). A highly‑requested UX enhancement.
- **[#44925](https://github.com/openclaw/openclaw/issues/44925) – Subagent silent loss** (since **2026‑03‑13**, 9 comments). A core orchestration reliability gap.
- **[#44993](https://github.com/openclaw/openclaw/issues/44993) – Heartbeat stale timestamp** (since **2026‑03‑13**, 10 comments). Undermines scheduling accuracy.
- **[#6615](https://github.com/openclaw/openclaw/issues/6615) – exec-approvals denylist** (since **2026‑02‑01**, 7 comments, 6 👍). Simple security feature with strong votes.
- **[#13700](https://github.com/openclaw/openclaw/issues/13700) – Session snapshots** (since **2026‑02‑10**, 6 comments). High demand for experimentation & recovery.
- **[#67509](https://github.com/openclaw/openclaw/pull/67509) – root guard for CLI** (PR open since **2026‑04‑16**, awaiting merge). Prevents system corruption on DigitalOcean droplets; important for entry‑level safety.

---

## Cross-Ecosystem Comparison

# Cross-Project Ecosystem Report – 2026-04-30

## 1. Ecosystem Overview
The open-source personal AI agent landscape remains highly active and competitive. Most projects are releasing daily or near-daily, with intense focus on channel integrations, provider compatibility, and multi-agent orchestration. At the same time, the rapid pace is producing regressions in core reliability (gateway CPU, silent failures, context corruption), highlighting a growing tension between feature velocity and production hardening. The community is global, with strong Chinese-language participation on projects like CoPaw and LobsterAI, while others like IronClaw and Moltis target enterprise and developer-centric use cases.

## 2. Activity Comparison

| Project | Issues Updated (today) | PRs Updated (today) | Releases (latest) | Health Score |
|-------------------|------------------------|---------------------|-------------------|--------------|
| **OpenClaw** | 317 (283 open/34 closed) | 500 (449 open/51 merged) | v2026.4.29-beta.1 & v2026.4.27 | High velocity, regressions accumulating |
| **NanoBot** | 13 (7 open/6 closed) | 27 (11 merged) | None today | Active, addressing bugs, long-standing debates |
| **Zeroclaw** | 24 (22 open/2 closed) | 38 (15 merged) | None today | High activity, critical bugs open (cron, onboarding) |
| **PicoClaw** | 10 opened/updated | 16 (5 merged) | Nightly v0.2.8-nightly | Rapid iteration, new crash bugs reported |
| **NanoClaw** | Not fully tracked (2 high-sev security closed) | 23 merged | None today | Burst development, providers branch unstable |
| **IronClaw** | 23 updated | 32 (20 merged) | None today | Major architecture shift, canary failures present |
| **LobsterAI** | 2 new bugs | 12 stale (0 merged) | None today | Stalled – no maintainer response, backlog rotting |
| **Moltis** | 4 (all closed) | 12 (9 merged) | 3 snapshot releases | High velocity, stable, fast bug resolutions |
| **CoPaw** | 38 (23 closed) | 18 (15 merged) | v1.1.5.post1 (patch) | Very high velocity, stable – most fixes merged |
| **TinyClaw** | 0 | 0 | None | No activity |
| **ZeptoClaw** | 0 | 0 | None | No activity |
| **EasyClaw** | 0 | 0 | v1.8.10 (macOS patch) | Minimal activity, stable but low community |

*High open-to-closed ratios on OpenClaw (283/34) and Zeroclaw (22/2) signal an accumulation of unresolved issues, while CoPaw’s 23 closed out of 38 shows effective triage.*

## 3. OpenClaw’s Position
**Advantages vs. peers:** OpenClaw is the most active project by issue volume (317 issues/day) and PR churn (500 PRs/day), indicating the largest contributor community. It leads in breadth—bundled providers (DeepInfra, Codex Computer Use), Slack/Telegram/Google channels, and advanced routing (subagent metadata, heartbeat commitments). Its recent releases deliver features that others are only discussing (e.g., active-run steering).

**Technical approach differences:** OpenClaw maintains a monolithic gateway with extensive plugin and provider scaffolding. This contrasts with PicoClaw’s edge/embedded focus, IronClaw’s WIT-based capability host and WASM runtime, and Moltis’s voice-centric workflow integration. Projects like Zeroclaw attempt drop-in compatibility with OpenClaw’s surface (CLI, providers) but suffer from deeper stability gaps.

**Community size:** The 4:1 ratio of open issues to closed, plus the 449 open PRs, suggests a massive but somewhat under-triaged community. In contrast, CoPaw and Moltis show smaller but tighter feedback cycles.

## 4. Shared Technical Focus Areas
Multiple projects are converging on these capabilities, indicating ecosystem-wide requirements:

**Rich channel interactions:**  
- Slack Block Kit (OpenClaw #12602), Feishu interactive cards (CoPaw #3941, NanoBot #3547), WeChat QR verification (LobsterAI #1878)

**Provider compatibility and reasoning support:**  
- DeepSeek thinking/reasoning_content (Zeroclaw #6059, PicoClaw #2707, #2718; NanoBot #3554)  
- Local model loop-breaking and timeouts (NanoBot #2298, NanoClaw #2149)

**Security and tool safety:**  
- Exec approval denylist (OpenClaw #6615)  
- Sandbox escape prevention (Moltis #924, NanoBot #979)  
- Path traversal protection (LobsterAI #828, CoPaw #3973)  
- HMAC receipts and session ownership (Zeroclaw #6182, #5833)

**Observability and silent-failure handling:**  
- Heartbeat stale timestamp (OpenClaw #44993), subagent completion silently lost (OpenClaw #44925), orphan processing_ack locks (NanoClaw #2147)  
- Cron job silent failures (Zeroclaw #5991)  
- Agent identity confusion on channel messages (CoPaw #3957)

**Multi-agent orchestration:**  
- File-system mailboxes (NanoBot #3461), delegate tasks (PicoClaw #2531), ACP session cancellation (Zeroclaw #5837), subagent routing metadata (OpenClaw)

**Memory and context management:**  
- Memory subsystem (OpenClaw), reasoning_content persistence (PicoClaw), memory search fixes (CoPaw #3977), memory substrate (IronClaw #3078–3114)

## 5. Differentiation Analysis

| Project | Primary focus & differentiator | Target users |
|---------|-------------------------------|--------------|
| **OpenClaw** | All-in-one gateway, broad provider & channel support, active-run steering | Power users, professional multi-channel deployments |
| **Zeroclaw** | OpenClaw-compatible alternative; skill developer ecosystem (SkillForge) | Users seeking drop-in replacement with skill market |
| **PicoClaw** | Edge/embedded devices (Raspberry Pi), self-evolution runtime | DIY and edge-deployment enthusiasts |
| **IronClaw** | Enterprise platform with WASM runtime, capability-based security, reborn architecture | Enterprises needing strong isolation and multi-tenant runtimes |
| **NanoBot** | Lightweight (debated), Feishu/Matrix focus, mailbox multi-agent | Hobbyists, Feishu/Matrix-centered teams |
| **Moltis** | Voice personas, telephony (Twilio), code indexing, slash commands | Developer-centric assistant with voice and phone integration |
| **CoPaw** | WeCom/Feishu enterprise channels, rapid frontend iteration | Chinese enterprise users, WeCom/Feishu shops |
| **LobsterAI** | Chinese desktop client with IM bots (WeChat); currently stalled | Chinese individual users |
| **EasyClaw** | Minimal macOS binary with Gatekeeper workaround | macOS casual users |

## 6. Community Momentum & Maturity

**Tier 1 – Rapidly iterating, large community:** OpenClaw, CoPaw  
- OpenClaw sees massive daily throughput but struggles with triage. CoPaw closes more issues than it opens, indicating mature maintenance despite high velocity.

**Tier 2 – High activity, balancing features and stability:** NanoBot, Zeroclaw, PicoClaw, NanoClaw, Moltis  
- These projects ship meaningful features daily (self-evolution, mailbox, voice personas) while dealing with real-time bug reports. Response times are generally good, except where architectural redesign (NanoClaw providers branch) introduces regressions.

**Tier 3 – Stabilizing or in transition:** IronClaw, EasyClaw  
- IronClaw is in a deep architectural refactor (“Reborn”) with canary failures; the community is focused on landing the new substrate. EasyClaw shows minimal pulse.

**Tier 4 – Stalled or inactive:** LobsterAI, TinyClaw, ZeptoClaw  
- LobsterAI has no maintainer engagement and stale PRs piling up; the other two had zero activity.

## 7. Trend Signals for AI Agent Developers

From aggregated community feedback, several industry trends are evident:

- **Silent failures are the #1 trust killer.** Users from nearly every project report lost subagent results, stale timestamps, orphan locks, and dead channel connections that provide no alert. Future frameworks must build explicit failure observability, retry loops, and state checks.

- **Rich, interactive channel surfaces are now a baseline requirement.** Plain-text replies are not enough. Projects must support structured messages like Slack Block Kit, Feishu interactive cards, and one‑click approval flows. This demand appears uniformly across OpenClaw, NanoBot, CoPaw, and Zeroclaw.

- **Provider compatibility is a moving target.** DeepSeek thinking modes, Gemini tool calls, and open‑source local LLMs all introduce subtle protocol mismatches. Agent platforms that abstract these without losing model‑specific capabilities will have a competitive edge.

- **Security is moving from admonitions to mechanical enforcement.** Requests for hard pre‑response gates, exec denylists, sandbox escapes, and tool approval bypass fixes are proliferating. Developers want “safe by design” tool loops, not just warnings.

- **Multi-agent patterns are solidifying.** Common patterns include file‑system mailboxes, delegation of tasks with cancellation, and shared memory substrates. Projects that define clear contracts (e.g., IronClaw’s capability host, PicoClaw’s delegate tool) are shaping the emerging standard.

- **Self-evolution and long-running task loops are gaining traction.** PicoClaw’s merged self‑evolution runtime and CoPaw’s `/ralph-loop` request show that users want agents that improve from experience and can run autonomously across many iterations without manual “continue” prompts.

- **Edge and headless deployment is not optional.** Multiple projects report issues specific to Raspberry Pi, Windows Server, and headless setups. Builders should expect that a significant portion of production deployments will run without a GUI and on resource‑constrained devices.

*These signals suggest the next wave of adoption will be determined by reliability, rich channel UX, strong security, and seamless multi-agent collaboration—not merely the number of supported models or platforms.*

---

## Peer Project Reports

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot Project Digest — 2026-04-30

## 1. Today’s Overview
Activity remained high on the NanoBot repository with 13 issues updated (7 open, 6 closed) and 27 pull requests progressed (11 merged/closed). No new release was published. Discussions were dominated by channel‑specific bugs (Feishu, Matrix), streaming reliability, and a long‑standing debate over the project’s “ultra‑lightweight” claim. Several PRs addressed critical fixes, while new feature threads around multi‑agent mailboxes, observability, and sender‑aware prompts gained traction.

## 2. Releases
None today.

## 3. Project Progress
Merged/closed PRs advanced a number of fixes and quality‑of‑life improvements:

- **Feishu group thread reply** – [#3547](https://github.com/HKUDS/nanobot/pull/3547) makes group replies honour the `reply_to_message` setting, fixing [#3533](https://github.com/HKUDS/nanobot/issues/3533). A subsequent revert of a contradictory fix ([#3548](https://github.com/HKUDS/nanobot/pull/3548) reverts [#3543](https://github.com/HKUDS/nanobot/pull/3543)) indicates the team is settling on a consistent behaviour.
- **Subagent iteration limit** – [#3532](https://github.com/HKUDS/nanobot/pull/3532) removes the hardcoded `max_iterations = 15` for subagents, instead respecting the parent agent’s configured limit (related to [#970](https://github.com/HKUDS/nanobot/issues/970)).
- **Cross‑platform hygiene** – [#3556](https://github.com/HKUDS/nanobot/pull/3556) added `.gitattributes` for LF line endings to prevent Windows CRLF noise.
- **Documentation** – [#3550](https://github.com/HKUDS/nanobot/pull/3550) replaced POSIX‑only temp paths in examples with portable equivalents.

The issue [#970](https://github.com/HKUDS/nanobot/issues/970) (subagent timeout) and [#3506](https://github.com/HKUDS/nanobot/issues/3506) (Matrix file path on Windows) were also closed, signalling that their fixes were delivered (likely via [#3532](https://github.com/HKUDS/nanobot/pull/3532) and an unlisted PR respectively).

## 4. Community Hot Topics
The most actively discussed items reveal user concerns about resource claims, channel behaviour, and tool‑loop safety.

- **[#660] “ultra‑lightweight” but includes Node.js** ([link](https://github.com/HKUDS/nanobot/issues/660))  
  11 comments, 5 👍. Users question the Dockerfile’s requirement for Node.js alongside Python, feeling it contradicts the project’s “ultra‑lightweight” tagline. This remains open and unresolved.
- **[#3546] Feishu forced thread reply causes “amnesia”** ([link](https://github.com/HKUDS/nanobot/issues/3546))  
  6 comments. Forced `reply_in_thread` in group chats confuses users; when disabled, the bot appears to lose conversation context. It points to a need for configurable thread behaviour and better group‑chat memory.
- **[#3559] WebSocket cannot replace webhooks** ([link](https://github.com/HKUDS/nanobot/issues/3559))  
  Freshly opened, argues that WebSocket alone is insufficient for proactive message delivery (cron, heartbeat, agent‑initiated sends) in multi‑tenant setups. The community is looking for a robust webhook‑like mechanism.
- **[#3553] Matrix channel re‑reads old messages on restart** ([link](https://github.com/HKUDS/nanobot/issues/3553))  
  Start‑up/restart re‑ingests old Matrix messages, causing loops. Users work around it with `/new`, but a proper deduplication mechanism is desired.
- **[#2298] Endless tool calling loops** ([link](https://github.com/HKUDS/nanobot/issues/2298))  
  4 comments. Smaller/local models can enter infinite loops repeating the same tool call; users request loop‑breaking logic.

## 5. Bugs & Stability
Several newly reported bugs threaten stability, especially for streaming APIs and specific providers. Two already have PRs opened.

- **High severity**  
  - **[#3551] OpenAI‑compatible streaming closes too early** when tools are invoked ([link](https://github.com/HKUDS/nanobot/issues/3551)). SSE streams terminate prematurely for tool‑backed requests, breaking clients that rely on the OpenAI API. **Fix PR**: [#3555](https://github.com/HKUDS/nanobot/pull/3555).  
  - **[#3554] DeepSeek‑V4 reasoning_content error on Windows with exec tool** ([link](https://github.com/HKUDS/nanobot/issues/3554)). Reproducible on v0.1.5.post3; similar to [#3469](https://github.com/HKUDS/nanobot/issues/3469) but triggered via WebUI + exec. **Fix PR**: [#3560](https://github.com/HKUDS/nanobot/pull/3560).

- **Medium severity**  
  - **[#3553] Matrix reads old messages on startup** ([link](https://github.com/HKUDS/nanobot/issues/3553)). Can create duplicate processing and restart loops; no fix PR yet.  
  - **[#3546] Feishu “amnesia” and forced threading** ([link](https://github.com/HKUDS/nanobot/issues/3546)). While partially addressed by [#3547](https://github.com/HKUDS/nanobot/pull/3547), memory/context issues in group chats persist.  
  - **Tool call loops [#2298](https://github.com/HKUDS/nanobot/issues/2298) still open** with no mitigation.

- **Resolved today**  
  - **Matrix Windows file path bug [#3506](https://github.com/HKUDS/nanobot/issues/3506) (closed)** – a colon in the nio store path caused `OSError [WinError 123]`. A fix was merged (via an unlisted PR).  
  - **Subagent hardcoded max_iterations [#970](https://github.com/HKUDS/nanobot/issues/970) (closed)** – fixed by [#3532](https://github.com/HKUDS/nanobot/pull/3532).

## 6. Feature Requests & Roadmap Signals
Several PRs and issues point to features likely to land in upcoming versions:

- **Multi‑agent communication** – [#3461](https://github.com/HKUDS/nanobot/pull/3461) adds a file‑system‑based mailbox channel plugin for inter‑agent messaging, with anti‑loop protection.
- **Observability** – [#3173](https://github.com/HKUDS/nanobot/pull/3173) introduces OpenTelemetry tracing for LLM calls and tools, with Langfuse/LangSmith exporters.
- **Gateway lifecycle hooks** – [#3373](https://github.com/HKUDS/nanobot/pull/3373) sends notifications on gateway start/stop, addressing [#3279](https://github.com/HKUDS/nanobot/issues/3279).
- **Model presets** – [#3358](https://github.com/HKUDS/nanobot/pull/3358) allows defining named bundles of model + generation parameters for quick switching.
- **Sender‑aware prompts** – [#3552](https://github.com/HKUDS/nanobot/pull/3552) (Feishu) and [#3549](https://github.com/HKUDS/nanobot/pull/3549) (general context) inject sender identity so the model can personalise responses in group chats.
- **WebSocket/webhook parity** – [#3559](https://github.com/HKUDS/nanobot/issues/3559) requests proactive message delivery capabilities that go beyond the current WebSocket channel; may evolve into a new channel or a webhook supplement.
- **Feishu reactEmoji allowlist** – [#3558](https://github.com/HKUDS/nanobot/pull/3558) adds granular control over emoji reactions.

The multi‑agent mailbox and lifecycle hooks appear closest to merge, while sender awareness could reshape group interactions.

## 7. User Feedback Summary
- **Dependency weight** – Users feel the Node.js requirement undermines the “ultra‑lightweight” branding ([#660](https://github.com/HKUDS/nanobot/issues/660)). This perception damages the project’s promise.
- **Channel quirks** – Feishu’s forced threading frustrates users who manage multiple groups; they want per‑group configuration, not a global hard‑override ([#3546](https://github.com/HKUDS/nanobot/issues/3546)). Matrix users on Windows hit path issues and message re‑reading ([#3553](https://github.com/HKUDS/nanobot/issues/3553), [#3506](https://github.com/HKUDS/nanobot/issues/3506)).
- **Tool safety** – The community notes that even with safeguards, an agent can be tricked into destructive commands (like `rm -rf`) ([#979](https://github.com/HKUDS/nanobot/issues/979)). There is appetite for better sandboxing or loop‑breaking.
- **Streaming reliability** – OpenAI‑compatible streaming is fragile when tools are involved, breaking integrations that rely on the standard SSE flow ([#3551](https://github.com/HKUDS/nanobot/issues/3551)). Quick-response PRs show maintainers are attentive.
- **Multi‑user awareness** – Several requests (sender ID in context, Feishu identity fetch) indicate a real need for the bot to know *who* is talking in shared chats.

## 8. Backlog Watch
These items have been open for a while without resolution and could benefit from maintainer attention:

- **[#660] Node.js dependency debate** (since 2026-02-14, 5 👍, 11 comments) – The project’s identity versus its tech stack remains a sore point.
- **[#2298] Tool calling loop breaking** (since 2026-03-20) – No fix proposed despite clear impact on local‑model users.
- **[#1385] Preserve `reasoning_details` for multi‑turn tool calls** (PR since 2026-03-01) – Important for OpenRouter reasoning models; open and unmerged.
- **[#979] Creative rm‑rf bypass** (since 2026-02-22) – While humorous, it underscores the need for stronger tool‑use guardrails.
- **[#3534] AI contributor guides** (PR) and **[#3517] WeChat token refresh** (PR) – Both pending review/merge, offering improved developer onboarding and WeChat reliability.

The maintainers’ rapid response to today’s streaming and Feishu bugs is encouraging, but long‑standing architectural and safety discussions need a roadmap to retain community trust.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## Zeroclaw Project Digest — 2026-04-30

### Today’s Overview
The repository saw **high activity** with 24 issues updated (22 open, 2 closed) and 38 pull requests updated (23 open, 15 merged/closed) in the last 24 hours. No new release was published. The community shipped several impactful fixes—resolving a desktop crash, skill prompt injection, and multiple Telegram/Slack improvements—while surfacing critical stability gaps around web dashboard approvals, onboarding, and default context budgets. Engagement remains strong, particularly around DeepSeek compatibility and cancellation support.

### Releases
No new releases today.

### Project Progress
The following PRs were merged/closed in the last 24 hours, advancing the codebase substantially:

- **Desktop crash fixed**  
  - [#5997](https://github.com/zeroclaw-labs/zeroclaw/pull/5997) – `fix(tauri): install rustls crypto provider to prevent desktop crash`  
  - [#5964](https://github.com/zeroclaw-labs/zeroclaw/pull/5964) – `fix(desktop): initialize rustls provider before reqwest`  
  → Resolved [#5984](https://github.com/zeroclaw-labs/zeroclaw/issues/5984) (S1 workflow blocked)

- **Skill prompt injection restored**  
  - [#5972](https://github.com/zeroclaw-labs/zeroclaw/pull/5972) – `fix(#5721): allow prompts inside [skill] TOML section`  
  → Closed [#5721](https://github.com/zeroclaw-labs/zeroclaw/issues/5721) (S1 bug)

- **Provider compatibility improved**  
  - [#5975](https://github.com/zeroclaw-labs/zeroclaw/pull/5975) – `fix: Gemini/OpenRouter tool-call compatibility + google_workspace schema clarity`

- **Telegram channel reliability**  
  - [#5970](https://github.com/zeroclaw-labs/zeroclaw/pull/5970) – `fix(telegram): forward message_thread_id in request_approval`  
  - [#5969](https://github.com/zeroclaw-labs/zeroclaw/pull/5969) – `fix(telegram): skip auto-injected topic-root reply context in forum topics`

- **Security hardening**  
  - [#5468](https://github.com/zeroclaw-labs/zeroclaw/pull/5468) – `fix: git -C (chdir) blocked by -c (config injection) security check`

- **Tooling/DevOps**  
  - [#5772](https://github.com/zeroclaw-labs/zeroclaw/pull/5772) – `refactor(tools): delegate rate-limiting to wrappers for glob_search and content_search`  
  - [#6025](https://github.com/zeroclaw-labs/zeroclaw/pull/6025), [#5983](https://github.com/zeroclaw-labs/zeroclaw/pull/5983) – Docker/web dashboard fixes for Debian image  
  - [#5992](https://github.com/zeroclaw-labs/zeroclaw/pull/5992) – `feat(slack): add strict_mention_in_thread option`

### Community Hot Topics
The most actively discussed threads reflect urgent user needs:

- **[#6059](https://github.com/zeroclaw-labs/zeroclaw/issues/6059)** – DeepSeek-V4 API incompatibility (8 comments, 1 👍)  
  Users cannot use DeepSeek-V4-Pro/Flash models due to a format error in thinking mode. This is the top pain point, signaling demand for broader provider support.

- **[#5837](https://github.com/zeroclaw-labs/zeroclaw/issues/5837)** – ACP-protocol session cancellation (4 comments)  
  Requests parity with the gateway `POST /api/sessions/{id}/abort` endpoint for ACP clients, important for long-lived agent sessions.

- **[#6210](https://github.com/zeroclaw-labs/zeroclaw/issues/6210)** – SkillForge auto-integrator emits non-schema fields (2 comments, p1)  
  Affects reliability of generated skill manifests; follow-up to a previous fix, highlighting the need for stricter schema enforcement.

### Bugs & Stability
Several high‑severity issues remain open without a fix in sight:

| Severity | Issue | Description | Fix PR? |
|----------|-------|-------------|---------|
| **S0** | [#5991](https://github.com/zeroclaw-labs/zeroclaw/issues/5991) | Cron jobs fail silently; data loss risk | Not directly (enhancement #6164 adds manual trigger) |
| **S1** | [#6207](https://github.com/zeroclaw-labs/zeroclaw/issues/6207) | Web dashboard/WebSocket bypasses supervisor tool approvals | None |
| **S1** | [#6206](https://github.com/zeroclaw-labs/zeroclaw/issues/6206) | Onboarding fails for custom OpenAI‑compatible providers | None |
| **S1** | [#6237](https://github.com/zeroclaw-labs/zeroclaw/issues/6237) | Slack `bot_token` must be in config file, crashes otherwise | None |
| **S1** | [#5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808) | Default 32k context budget exceeded immediately, perpetual trimming | None |
| **S2** | [#6059](https://github.com/zeroclaw-labs/zeroclaw/issues/6059) | DeepSeek-V4 incompatible (thinking mode) | Investigation ongoing |
| **S2** | [#6229](https://github.com/zeroclaw-labs/zeroclaw/issues/6229) | Telegram `mention_only=true` still responds to media | None |
| **S2** | [#6233](https://github.com/zeroclaw-labs/zeroclaw/issues/6233) | `reasoning_content` dropped for plain-text assistant messages | None |

Two previously critical bugs were closed today: desktop crash [#5984](https://github.com/zeroclaw-labs/zeroclaw/issues/5984) and skill prompt injection [#5721](https://github.com/zeroclaw-labs/zeroclaw/issues/5721).

### Feature Requests & Roadmap Signals
User‑requested enhancements that may shape the next release:

- **Operational capabilities**  
  - [#6164](https://github.com/zeroclaw-labs/zeroclaw/pull/6164) (PR open) – Manually trigger cron jobs from Web UI (linked to cron reliability needs).  
  - [#5837](https://github.com/zeroclaw-labs/zeroclaw/issues/5837) – ACP session cancellation (high demand).

- **Provider and tooling expansion**  
  - [#6014](https://github.com/zeroclaw-labs/zeroclaw/issues/6014) – OpenClaw CLI compatibility layer for drop‑in replacement.  
  - [#5944](https://github.com/zeroclaw-labs/zeroclaw/pull/5944) (PR open) – Gemini SSE streaming; #5943 – Inworld TTS/STT providers.  
  - [#6241](https://github.com/zeroclaw-labs/zeroclaw/issues/6241) – Browser headed/headless config for agent_browser backend.

- **Security and governance**  
  - [#6182](https://github.com/zeroclaw-labs/zeroclaw/issues/6182) – Reactivate HMAC tool receipts (docs already describe them).  
  - [#5833](https://github.com/zeroclaw-labs/zeroclaw/issues/5833) – Session ownership model for destructive operations.

Several of these have active PRs and could land in the next version once reviewed.

### User Feedback Summary
- **Pain points:** New users struggle with onboarding (onboarding UX broken for custom providers), default configuration leads to immediate context trimming, and web dashboard misses critical approval prompts in supervised mode. The DeepSeek incompatibility is a recurring, widely felt blocker.  
- **Positive signals:** The community responded quickly to the desktop crash (#5984) with multiple fixes merged the same day. Skill prompt injection was restored within a week. The project’s pace of bugfix merges and contributor involvement indicates healthy momentum.  
- **Use cases:** Several issues come from users building specialized skills (InvestorClaw, Paperclip/Multica AI) and running production‑like setups with Telegram/Slack channels, demanding robustness in session handling and provider support.

### Backlog Watch
Issues and PRs that have been open for more than a week without resolution and deserve maintainer attention:

- **[#5808](https://github.com/zeroclaw-labs/zeroclaw/issues/5808)** – Default 32k context budget overwhelmed on first iteration (opened 2026-04-16, S1, no progress).  
- **[#5810](https://github.com/zeroclaw-labs/zeroclaw/issues/5810)** – OTP `gated_actions` silently accepts unknown names (security-visible, opened 2026-04-16, p1, no fix).  
- **[#5991](https://github.com/zeroclaw-labs/zeroclaw/issues/5991)** – Cron job failure (S0, opened 2026-04-22, no fix yet; only an enhancement PR exists).  
- **[#5837](https://github.com/zeroclaw-labs/zeroclaw/issues/5837)** – ACP cancellation support (opened 2026-04-17, enhancement, 4 comments, no PR).  
- **[#6074](https://github.com/zeroclaw-labs/zeroclaw/issues/6074)** – Audit/recovery of 153 commits lost in bulk revert (opened 2026-04-24, no owner).

These items pose risk to stability, security, and user experience, and would benefit from triage and assignment.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

**PicoClaw Project Digest — 2026-04-30**

---

### 1. Today's Overview
PicoClaw remains under very active development with 16 pull requests updated and 10 issues opened/updated in the last 24 hours. The team merged 5 PRs, including a foundational agent self‑evolution runtime and several critical bugfixes (DeepSeek reasoning, Feishu images, tool feedback animations). However, two new high‑priority crash/stability bugs were reported today, indicating that the project is advancing rapidly but still faces edge‑case stability challenges. A new nightly build `v0.2.8-nightly.20260430.4ffbe7a2` was published, containing the latest merged changes.

---

### 2. Releases
- **v0.2.8-nightly.20260430.4ffbe7a2**  
  Automated nightly build from the `main` branch. This is the bleeding‑edge snapshot and may be unstable; use with caution.  
  **Full changelog**: [`v0.2.8...main`](https://github.com/sipeed/picoclaw/compare/v0.2.8...main)  
  *No official stable release this period.*

---

### 3. Project Progress – Merged / Closed Today
5 pull requests were merged/closed:

- **#2723** [`fix(ci): isolate rcodesign setup for macOS launcher signing`](https://github.com/sipeed/picoclaw/pull/2723) – Fixes signing and notarization in the CI pipeline by using an isolated Python venv.
- **#2707** [`fix(seahorse): persist reasoning_content in sqlite history`](https://github.com/sipeed/picoclaw/pull/2707) – Ensures DeepSeek’s `reasoning_content` survives round‑trips, directly fixing the 400 error described in closed issue #2686.
- **#2722** [`Feature agent self evolution foundation hot path`](https://github.com/sipeed/picoclaw/pull/2722) – Integrates a self‑evolution runtime that records task outcomes on the hot path, aggregates them in the background, and drafts new skills. This is a major new capability.
- **#2713** [`fix(channels): dismiss tool feedback animation when turn ends via ResponseHandled`](https://github.com/sipeed/picoclaw/pull/2713) – Prevents the “thinking” animation from hanging indefinitely after a tool returns `ResponseHandled=true`.
- **#2708** [`fix(feishu): fix image download with API fallback and post image support`](https://github.com/sipeed/picoclaw/pull/2708) – Adds fallback API for image retrieval and supports images from Feishu post/card messages.

One issue was also closed:
- **#2686** [DeepSeek reasoning_content incorrectly stripped on non‑tool turns] – Resolved by PR #2707.

---

### 4. Community Hot Topics
The most active discussions (by comment count / recent engagement):

- **#2171** [`[Refactor] Consider moving all OpenAI based endpoints supported to use OpenAI Responses API`](https://github.com/sipeed/picoclaw/issues/2171)  
  9 comments, last updated today. Community wants a future‑proofed provider layer aligned with OpenAI’s recommended Responses API, but the refactor is non‑trivial and needs a thorough provider support matrix.

- **#2548** [`[Error] Multiple authentication credentials received`](https://github.com/sipeed/picoclaw/issues/2548)  
  5 comments, stale. Users are hitting a confusing authentication clash when multiple providers are configured, especially when using Gemini with custom model names. The underlying need is clearer documentation and possibly smarter credential resolution.

- **#2721** [`Session history race still reproducing in v0.2.5`](https://github.com/sipeed/picoclaw/issues/2721) (opened today, high priority) and **#2720** [`Singleton PID check doesn't verify process identity`](https://github.com/sipeed/picoclaw/issues/2720) (opened today, high priority) have drawn immediate attention because they cause hard crashes or prevent the gateway from starting. These are not yet commented on by maintainers but are likely to become the next focal points.

- **PR #2313** [`Multi-User Support, Security Hardening, Skills whitelisting`](https://github.com/sipeed/picoclaw/pull/2313) – large, long‑running PR (stale) that integrates multi‑user and Agent Shield security features. It is a major architectural change that needs significant review.

---

### 5. Bugs & Stability
Critical and newly reported issues:

| Severity | Issue | Status |
|----------|-------|--------|
| 🔴 **Critical** | [#2721 Session history race → tool_use_id 400 from Anthropic](https://github.com/sipeed/picoclaw/issues/2721) | **No fix PR yet.** Race condition persists in v0.2.5, causing Anthropic tools to fail. Re‑opened from #704 which was closed without a visible fix. |
| 🔴 **Critical** | [#2720 Singleton PID check does not verify process identity – stale PID causes crash loop](https://github.com/sipeed/picoclaw/issues/2720) | **No fix PR yet.** Gateway cannot restart if PID file contains a reused PID from an unrelated process (e.g. systemd‑resolved). |
| 🟠 **High** | [#2718 DeepSeek 400 ‘unknown variant image_url’ when image persists in history](https://github.com/sipeed/picoclaw/issues/2718) | **Fix PR #2717 open.** Non‑multimodal providers are returned an image history block and reject it at the JSON schema level. |
| 🟡 **Medium** | [#2716 SVG files fail to send on Telegram](https://github.com/sipeed/picoclaw/issues/2716) – inferMediaType mis‑maps `image/svg+xml` to `SendPhoto` which rejects it. | No fix PR yet. |
| 🟡 **On‑going** | [#2621 Session context lost after API timeout – duplicate default session](https://github.com/sipeed/picoclaw/issues/2621) | Stale, still open. |
| 🟡 **On‑going** | [#2548 Multiple authentication credentials received](https://github.com/sipeed/picoclaw/issues/2548) | Stale, configuration confusion. |

**Fixed today:**
- [#2686 DeepSeek reasoning_content stripped → 400 error] – resolved by PR #2707.
- Tool feedback animation hang → fixed in PR #2713.
- Feishu image download failures → fixed in PR #2708.

---

### 6. Feature Requests & Roadmap Signals
Enhancement requests and forward-looking PRs that may shape upcoming releases:

- **Agent self‑evolution** has landed in PR #2722 (merged). This is a game‑changer for autonomous improvement.
- **Streaming web chat UX** – [#2587](https://github.com/sipeed/picoclaw/pull/2587) adds end‑to‑end streaming to the Pico web interface with new frontend scroll behaviour. Likely to be merged soon.
- **Delegate tool for cross‑agent task handoff** – [#2531](https://github.com/sipeed/picoclaw/pull/2531) (PR C from Phase 2 plan) enables `delegate(agent_id, task)`, a powerful multi‑agent capability.
- **WhatsApp support in compiled builds** – [#2625](https://github.com/sipeed/picoclaw/issues/2625) requested by Raspberry Pi Zero 2 users who need pre‑compiled ARM64 binaries with WhatsApp enabled.
- **.env file support for custom skills** – [#2623](https://github.com/sipeed/picoclaw/issues/2623) would allow environment variables to be passed to skills without manual injection.
- **Provider/Web UI improvements** – [#2701](https://github.com/sipeed/picoclaw/pull/2701) adds explicit provider metadata and canonical catalog for better model management in the Web UI.
- **MCP per‑request dynamic headers** – [#2696](https://github.com/sipeed/picoclaw/pull/2696) enables channels to forward HTTP headers to MCP servers.
- **Bedrock streaming provider** – [#2645](https://github.com/sipeed/picoclaw/pull/2645) implements real‑time token streaming for AWS Bedrock.
- **OpenAI‑compatible embeddings** – [#2624](https://github.com/sipeed/picoclaw/pull/2624) adds support for vLLM‑style embedding endpoints.

**Prediction:** The delegate tool and streaming web chat are strong candidates for inclusion in the next feature release. The provider metadata refactor may follow shortly after, as it touches the UI and configuration layer deeply.

---

### 7. User Feedback Summary
- **Reliability pain points:** The session history race (#2721) and PID collision (#2720) are blocking production deployments. Users are frustrated that a known race (#704) was closed without a fix, only to reappear.
- **Edge‑case handling:** DeepSeek/Anthropic restrictions on image history (#2718) and SVG Telegram delivery (#2716) highlight gaps in the media‑handling pipeline. Users using WeChat/DingTalk are hitting 400 errors when images enter the conversation.
- **Configuration friction:** The “multiple authentication credentials” issue (#2548) suggests that the config merging logic is difficult to understand, especially with custom model names.
- **New use cases:** Self‑hosted WhatsApp on a Pi Zero is a popular but currently unsupported deployment path due to missing WhatsApp compilation flags in the default ARM64 binary (#2625). The growing demand for MCP and multi‑agent delegation indicates a maturing power‑user community.
- **Positive signals:** The fast merge of agent self‑evolution (#2722) and immediate follow‑up fixes (like Feishu image support) are appreciated. The community is actively contributing meaningful features.

---

### 8. Backlog Watch
Issues and pull requests that have been open for some time without resolution – they need maintainer attention to prevent user frustration:

- **#2171** – *OpenAI Responses API refactor* (30 days old, 9 comments). A major provider architecture shift that risks falling behind API deprecation timelines.
- **#2548** – *Multiple authentication credentials* (14 days, 5 comments). A blocker for users trying to use multi‑provider setups; no concrete solution yet.
- **#2621** – *Session context lost after API timeout* (8 days, stale). Caused by missing session re‑attachment; may affect many users of MiniMax via OmniRoute.
- **PR #2313** – *Multi‑User Support & Security Hardening* (27 days open). A very large and important PR that will be increasingly difficult to merge as other changes land.
- **PR #2192** – *Anthropic system prompt caching fix* (31 days open). Critical for cost/performance of Anthropic models, but appears stalled.

---

**Overall Assessment:** PicoClaw is in a high‑velocity development phase. Critical bugs were reported today that must be resolved before a stable release, but the pipeline of enhancements (self‑evolution, delegate tool, streaming chat, provider metadata) is very promising. The maintainers’ ability to triage the newly opened crash issues will determine the stability of the upcoming v0.2.8 milestone.

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw Project Digest – 2026-04-30

## 1. Today’s Overview
NanoClaw saw a burst of development activity today with **23 PRs merged/closed** and two high-severity security issues closed. The community is actively testing the new `providers` branch, which has surfaced several critical bugs related to container lifecycle and LLM context handling. Meanwhile, stacked setup-flow enhancements are being polished to improve the headless device experience, and new channel integrations (Slack, iMessage, Signal) advanced toward stability. The project appears healthy but needs immediate attention to the stability regressions in the experimental provider code.

## 2. Releases
No new releases were published in the last 24 hours.

## 3. Project Progress – Merged & Closed PRs
Key fixes and features that landed today (closed/merged PRs):

- **Container restart recovery** – [#1941](https://github.com/qwibitai/nanoclaw/pull/1941) fixes a silent message drop caused by stale heartbeat and an orphan claim loop after container restart.
- **Telegram 64‑byte callback_data cap** – [#1942](https://github.com/qwibitai/nanoclaw/pull/1942) encodes option indices so inline‑keyboard cards work on Telegram.
- **Idempotent pending messages** – [#1943](https://github.com/qwibitai/nanoclaw/pull/1943) prevents duplicate key errors when delivery retries, making pending questions/approvals robust.
- **Agent provider DB columns** – [#1958](https://github.com/qwibitai/nanoclaw/pull/1958) now honours `agent_provider` fields from the database and session, fixing broken provider resolution for `/add-opencode` etc.
- **Advanced settings + remote OneCLI** – [#2035](https://github.com/qwibitai/nanoclaw/pull/2035) introduces a config registry and an interactive settings screen, with full remote OneCLI wiring.
- **Signal channel in auto‑setup** – [#1954](https://github.com/qwibitai/nanoclaw/pull/1954) and the earlier Slack/iMessage flows ([#1929](https://github.com/qwibitai/nanoclaw/pull/1929)) add end‑to‑end channel registration.
- **Re‑run setup credential reuse** – [#2094](https://github.com/qwibitai/nanoclaw/pull/2094) detects existing `.env` and credentials, skipping manual re‑entry.
- **First channel fixed to “main” folder** – [#390](https://github.com/qwibitai/nanoclaw/pull/390) resolves a long‑standing issue where the agent’s group folder could be misnamed.
- **Setup UX polish** – [#2108](https://github.com/qwibitai/nanoclaw/pull/2108) (elapsed‑time suffix), plus README updates [#2100](https://github.com/qwibitai/nanoclaw/pull/2100) & [#2099](https://github.com/qwibitai/nanoclaw/pull/2099).

Two critical security issues were also closed today:
- **Network restrictions for agent containers** ([#458](https://github.com/qwibitai/nanoclaw/issues/458))
- **Container command injection via shell interpolation** ([#457](https://github.com/qwibitai/nanoclaw/issues/457))  
The patches likely shipped with the container‑runtime improvements, closing these long‑standing vulnerabilities.

## 4. Community Hot Topics
While most items lack high reaction counts, the most active discussions revolve around the **headless/device‑agnostic setup flow** and the **new `providers` branch instability**.

- **Headless UX stack** – @alipgoldberg’s stacked PRs ([#2145](https://github.com/qwibitai/nanoclaw/pull/2145), [#2154](https://github.com/qwibitai/nanoclaw/pull/2154), [#2146](https://github.com/qwibitai/nanoclaw/pull/2146), [#2158](https://github.com/qwibitai/nanoclaw/pull/2158)) are refining browser‑open prompts, URL fallback labelling, and even adding a “lobster splash” for delight. These appeal to users running NanoClaw on servers without a GUI.
- **Webchat skill** – [#2069](https://github.com/qwibitai/nanoclaw/pull/2069) introduces a native webchat channel, a long‑desired feature for many self‑hosters.
- **Richer channel approval** – [#2105](https://github.com/qwibitai/nanoclaw/pull/2105) and [#2107](https://github.com/qwibitai/nanoclaw/pull/2107) promise contextual agent selection and human‑readable channel names, giving power users more control.

## 5. Bugs & Stability
Today’s newly opened bugs are concentrated in the `providers` branch, seriously affecting reliability for local/OpenCode users.

| Severity | Issue | Summary | Fix Available |
|----------|-------|---------|---------------|
| **High** | [#2150](https://github.com/qwibitai/nanoclaw/issues/2150) | OpenCode provider sends literal `@./...md` lines instead of file contents; agent operates **without any instructions** (silent context loss). | No |
| **High** | [#2148](https://github.com/qwibitai/nanoclaw/issues/2148) | `proc.kill('SIGKILL')` leaks the underlying binary; every timeout leaves a process holding port 4096, rendering containers unusable. | No |
| **High** | [#2147](https://github.com/qwibitai/nanoclaw/issues/2147) | Orphan `processing_ack` rows survive container kill and instantly SIGKILL the next spawn, permanently locking a session out of message processing. | No |
| **Medium** | [#2149](https://github.com/qwibitai/nanoclaw/issues/2149) | Hardcoded 90 s idle timeout breaks local-model setups with slow inference; user needs to bypass or patch manually. | No |
| **Open** | [#2139](https://github.com/qwibitai/nanoclaw/issues/2139) | API 400 error when uploading a second image; bot stops processing all further messages. | No |

The earlier critical security bugs ([#458](https://github.com/qwibitai/nanoclaw/issues/458), [#457](https://github.com/qwibitai/nanoclaw/issues/457)) are now closed, so no action needed there. The `providers` regressions, however, require immediate maintainer attention.

## 6. Feature Requests & Roadmap Signals
User contributions and open PRs give a clear picture of what’s next:

- **Headless‑first setup** – [#2145](https://github.com/qwibitai/nanoclaw/pull/2145), [#2154](https://github.com/qwibitai/nanoclaw/pull/2154), [#2146](https://github.com/qwibitai/nanoclaw/pull/2146) are nearly ready; expect them to land soon.
- **Webchat channel** – [#2069](https://github.com/qwibitai/nanoclaw/pull/2069) will provide a browser‑based fallback, heavily requested for fast‑iteration testing.
- **Contextual channel approval** – [#2105](https://github.com/qwibitai/nanoclaw/pull/2105) + channel name resolution ([#2107](https://github.com/qwibitai/nanoclaw/pull/2107)) aim to replace the rigid Approve/Ignore flow.
- **Image processing improvements** – implied by [#2139](https://github.com/qwibitai/nanoclaw/issues/2139); the user’s accounting workflow demands reliable multi‑image handling.

The next release will likely bundle the headless UX polish and at least one major stability fix for the `providers` branch, together with the webchat skill.

## 7. User Feedback Summary
**Pain points**  
- **Image processing breaks entire bot**: @omniscient reports that after one successful image upload, the second image causes a persistent 400 error and the agent becomes entirely unresponsive ([#2139](https://github.com/qwibitai/nanoclaw/issues/2139)). This is a hard blocker for real‑world document workflows.  
- **Provider instability frustrates local users**: The combination of leaked processes, hardcoded timeouts, and context loss makes the `providers` branch unusable for those running on‑premise LLMs ([#2148](https://github.com/qwibitai/nanoclaw/issues/2148), [#2149](https://github.com/qwibitai/nanoclaw/issues/2149), [#2150](https://github.com/qwibitai/nanoclaw/issues/2150)).  
- **Silent session lock**: [#2147](https://github.com/qwibitai/nanoclaw/issues/2147) permanently blocks message processing after a crash, requiring manual DB intervention—a critical dataloss‑like experience.

**Satisfaction & adoption**  
- Users are excited about the addition of **Signal, Slack, and iMessage** channels; setup is becoming more seamless.  
- The **headless setup improvements** are actively being tuned based on real server‑deployment feedback.  
- The “lobster splash” PR ([#2158](https://github.com/qwibitai/nanoclaw/pull/2158)) suggests a fun, engaged community.

## 8. Backlog Watch
Given the flood of activity, some items risk being overlooked:

- [#2139](https://github.com/qwibitai/nanoclaw/issues/2139) (image 400 error) is a user‑facing bug without a fix, currently with low engagement but blocking production use.  
- Although [#2150](https://github.com/qwibitai/nanoclaw/issues/2150) and [#2147](https://github.com/qwibitai/nanoclaw/issues/2147) are brand‑new, they are high‑severity and should be triaged immediately to avoid compounding failures on the `providers` branch.  

No older unattended issues appeared in today’s data, but maintainers should ensure that the provider stability issues don’t slip into the next release without resolution.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

**IronClaw Project Digest — 2026-04-30**

---

### 1. Today’s Overview
The IronClaw repository is in the midst of a massive architectural shift (“Reborn”), with **23 issue updates** and **32 pull request updates** in the last 24 hours. 20 PRs were merged or closed, advancing the new memory, capability host, WASM runtime, and integration testing substrates. Three automated live‑canary failures on `main` suggest a regression that may be tied to the active rebase/landing work. Overall project health is high‑velocity but bears watching for user‑facing regressions.

---

### 2. Releases
*No new releases were cut today.*

---

### 3. Project Progress – Merged/Closed PRs
Today’s merged work pushed the **Reborn architecture forward on multiple fronts**:

**Memory Substrate**
- [#3078](https://github.com/nearai/ironclaw/pull/3078) – Added the memory document storage boundary (`ironclaw_memory`).
- [#3079](https://github.com/nearai/ironclaw/pull/3079) – Added memory search contracts and plugin seams.
- [#3114](https://github.com/nearai/ironclaw/pull/3114) – Memory vertical‑integration tests now pass.

**Capability Host**
- [#3071](https://github.com/nearai/ironclaw/pull/3071) – Landed the base `CapabilityHost` workflow and `RunState` store.
- [#3111](https://github.com/nearai/ironclaw/pull/3111) – Hardened capability approval lifecycle and lease persistence.
- [#3110](https://github.com/nearai/ironclaw/pull/3110) – Added caller‑level CapabilityHost integration tests.

**WASM Runtime**
- [#3097](https://github.com/nearai/ironclaw/pull/3097) – Introduced a WIT‑compatible WASM tool runtime (replaces the old JSON‑ABI path).
- [#3117](https://github.com/nearai/ironclaw/pull/3117) – Closed remaining WASM runtime failure‑edge test gaps.

**Host Contract & Dispatch**
- [#3095](https://github.com/nearai/ironclaw/pull/3095) – Added a contract‑first `ironclaw_host_runtime` facade.
- [#3109](https://github.com/nearai/ironclaw/pull/3109) – Runtime lane dispatch smoke tests for Script/MCP and WIT WASM.

**Other**
- [#3106](https://github.com/nearai/ironclaw/pull/3106) – Demo/Abound copy change merged.

---

### 4. Community Hot Topics

| Item | Comments | What it signals |
|------|----------|-----------------|
| [#2987](https://github.com/nearai/ironclaw/issues/2987) – [EPIC] Reborn architecture landing strategy & grouped PR plan | **43** | Intensive coordination among core contributors; the thread serves as the central war‑room for the entire Reborn rollout. |
| [#3067](https://github.com/nearai/ironclaw/issues/3067) – Vertical‑slice integration test suite for Reborn | **10** | High interest in proving the new stack works end‑to‑end, not just in unit tests. |
| [#3103](https://github.com/nearai/ironclaw/issues/3103) – High ASCII TUI broken in new build | **4** | A user‑facing regression that drew quick triage attention. Users want a flag to restore the old behaviour. |

**Underlying needs:** contributors are laser‑focused on landing the Reborn architecture safely; QA and canary signals are being closely watched because they are the first line of defence against regressions that could affect production deployments.

---

### 5. Bugs & Stability

**Critical – Live Canary Failures**  
All three failures occurred on the **same commit** (`2a65da7`), pointing to a common regression:
- [#3113](https://github.com/nearai/ironclaw/issues/3113) – `provider-matrix anthropic` canary failed.
- [#3115](https://github.com/nearai/ironclaw/issues/3115) – `persona-rotating` canary failed.
- [#3116](https://github.com/nearai/ironclaw/issues/3116) – `public-smoke` canary failed.
*No fix PR is open yet; the root cause may be the active Reborn merging on `main`.*

**High – Web IDE API Keys 401**  
- [#3108](https://github.com/nearai/ironclaw/issues/3108) – Keys generated via the Web IDE are rejected by `private.near.ai` with `"Session not found"`. Instance‑provisioned keys work fine, so the gateway is healthy; the issue is in the IDE key‑issuance path. *No fix PR yet.*

**Medium – TUI Regression**  
- [#3103](https://github.com/nearai/ironclaw/issues/3103) – High ASCII TUI does not display correctly, causing rendering artifacts on `TTY`. User explicitly asks for a flag to revert to the previous behaviour. *No resolution yet.*

---

### 6. Feature Requests & Roadmap Signals
Almost all new issue activity is Reborn‑centric, indicating that the **next version (or releases) will be heavily shaped by the Reborn migration**:

- **Configuration as Code** [#3036](https://github.com/nearai/ironclaw/issues/3036) – Declarative, version‑controlled tenant blueprints and use‑case harnesses.
- **Separate `ironclaw-reborn` binary** [#3069](https://github.com/nearai/ironclaw/issues/3069) – A distinct executable for the new architecture, side‑by‑side with the existing binary.
- **AgentLoopDriver & run‑class profiles** [#3107](https://github.com/nearai/ironclaw/issues/3107) – Support for different agent‑loop execution models without a kernel switch statement.

User‑visible feature requests are sparse; the only direct signal is the TUI issue’s ask for backwards‑compatible flags. Expect the near‑term release to prioritise **completing the Reborn substrate** (memory, capability host, runtime, transport adapter) and delivering the standalone Reborn binary.

---

### 7. User Feedback Summary
- **Pain point 1 – TUI breakage:** `@fmotta` reports that the new build’s High ASCII interface is unusable, explicitly requesting a flag to restore the previous behaviour [#3103](https://github.com/nearai/ironclaw/issues/3103).
- **Pain point 2 – IDE API keys:** `@ALuhning` discovered that API keys created through the Web IDE’s NEAR AI configuration are rejected by the private gateway, blocking development workflows [#3108](https://github.com/nearai/ironclaw/issues/3108).
- **Community contribution:** A new contributor (`@ek775`) opened [#3105](https://github.com/nearai/ironclaw/pull/3105) to fix a Telegram polling issue on headless servers, adding a WASM‑channel fallback in `ironclaw onboard`.

Overall mood appears constructive but watchful; the rapid Reborn landing is clearly the priority, but early‑stage user‑visible bugs are being noted and triaged quickly.

---

### 8. Backlog Watch
These open PRs have been waiting for maintainer attention and address real functionality gaps:

- [#2457](https://github.com/nearai/ironclaw/pull/2457) – Make OIDC `aud` claim optional for proxying load‑balancers (open 16 days).
- [#2066](https://github.com/nearai/ironclaw/pull/2066) – Fetch Slack thread history when bot is @mentioned (open 24 days).
- [#2817](https://github.com/nearai/ironclaw/pull/2817) – Enforce correct `mission_id` UUID extraction (open 9 days).
- [#1764](https://github.com/nearai/ironclaw/pull/1764) – Large Abound demo feat with Responses API, credential injection, etc. (open 31 days).

Additionally, the **#2987 Reborn EPIC** and its many child issues are the central roadmap tracker; every open child issue with few comments (e.g. #3094, #3091, #3090) could benefit from clear ownership to avoid stalling the overall migration.

---

**Overall Health:** 🟡 *High activity, successful Reborn feature advancement, but watch for regressions indicated by the live canary failures and user‑reported API/TUI bugs.*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI Project Digest – 2026-04-30

## 1. Today’s Overview
Activity on April 30 remained muted: only two new bug reports were opened, and twelve pull requests received a stale-bot update (all became `[stale]`) but none were reviewed or merged. No releases were published, and maintainer interaction was absent across issues and PRs. The project appears to be in a low‑maintenance phase, with an accumulating backlog of community contributions that have not been integrated.

## 2. Releases
No new releases were made. The latest stable version remains unchanged.

## 3. Project Progress
No pull requests were merged or closed today, meaning the codebase did not advance. The 12 updated stale PRs – all opened over a month ago – remain open and unmerged, blocking progress on multiple fronts.

## 4. Community Hot Topics
**Most discussed items** – both are recently filed bug reports that received one comment each (likely automated or from the reporter).

- [#1878 – IM机器人 微信接口 配置扫码后无法输入验证码](https://github.com/netease-youdao/LobsterAI/issues/1878)  
  The WeChat IM robot configuration requires entering a 6‑digit verification code after scanning a QR code, but LobsterAI shows no input field, rendering the setup impossible. The underlying need is a complete WeChat onboarding flow within the client.

- [#1877 – openAI 认证不成功,本地的codex是可以正常使用的](https://github.com/netease-youdao/LobsterAI/issues/1877)  
  ChatGPT sign‑in fails with `HTTP 403 unsupported_country_region_territory`, though a local `codex` works. Users need a way to handle region‑restricted OpenAI authentication, or at least clearer guidance.

The 12 stale PRs did not receive any new comments, so they did not spark discussion today.

## 5. Bugs & Stability
Both reported bugs are unresolved and have no associated fix PRs.

| Severity | Issue | Description |
|----------|-------|-------------|
| 🔴 High | [#1878](https://github.com/netease-youdao/LobsterAI/issues/1878) | WeChat IM bot configuration broken – verification code input missing, prevents full setup. |
| 🔴 High | [#1877](https://github.com/netease-youdao/LobsterAI/issues/1877) | OpenAI sign‑in blocked by region restriction, making ChatGPT features inaccessible for some users. |

Additionally, several stale PRs address critical stability/security bugs that remain unmerged:
- Window destruction crash (`event.sender` called after window close) – #852
- Path traversal in `localfile://` handler – #828
- Overlapping polling cycles causing runtime issues – #841

These represent significant risks if not addressed soon.

## 6. Feature Requests & Roadmap Signals
No new feature requests appeared in today’s issues. However, the backlog of 12 open PRs (all now stale) carries strong signals of desired enhancements:

- Duplicate skill detection / prevention – #827, #836
- JSON paste for batch MCP server creation – #835
- Per‑channel model override for IM bots – #838
- Security environment scanning with permission management – #842
- SQLite performance tuning – #830
- URL protocol validation – #826

If maintainers resume review, a future release could bundle several of these quality‑of‑life and security improvements. Given no recent release cadence, it’s unclear when any of these will land.

## 7. User Feedback Summary
Recent user reports reveal concrete pain points:
- **WeChat IM integration is broken** – users cannot complete the QR‑code flow because the verification code prompt is missing.
- **Region‑locked OpenAI authentication** – users in unsupported territories cannot log in, even though local tools like Codex work, causing frustration.

Both issues block core functionality and reflect a need for better error handling and user guidance.

## 8. Backlog Watch
Several items have been open without maintainer response for over a month and risk being auto‑closed by the stale bot.

- **Security‑critical PRs**  
  [#826](https://github.com/netease-youdao/LobsterAI/pull/826) (URL protocol validation)  
  [#828](https://github.com/netease-youdao/LobsterAI/pull/828) (path traversal fix)  
  These address potential vulnerabilities and deserve immediate attention.

- **Stability fix**  
  [#852](https://github.com/netease-youdao/LobsterAI/pull/852) (crash on window close) – prevents crashes during asynchronous IPC, a high‑impact bug.

- **Performance optimization**  
  [#830](https://github.com/netease-youdao/LobsterAI/pull/830) (SQLite tuning) – addresses frequent disk syncs and poor query performance.

- **Important bug reports**  
  [#1877](https://github.com/netease-youdao/LobsterAI/issues/1877) – OpenAI sign‑in failure (unsupported region) needs a maintainer response or workaround documentation.  
  [#1878](https://github.com/netease-youdao/LobsterAI/issues/1878) – WeChat IM verification input missing, blocking IM bot setup.

Without a maintainer triage pass, these contributions and issues will continue to stall, eroding community confidence and delaying fixes.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis Project Digest – 2026-04-30
*A snapshot of the open-source AI agent and personal assistant project.*

## 1. Today’s Overview
Moltis experienced a high-velocity development day with 12 pull requests (9 merged/closed, 3 open) and 3 new releases. All four user-reported issues were closed within 24 hours, including a critical sandbox escape and a chat scroll regression. The team is actively merging large feature branches (voice personas, code indexing, new slash commands) while also reacting to immediate bug reports. The pipeline shows continuous integration maturity, with fresh experimental capabilities like telephony and message action bars already on deck.

## 2. Releases
Three snapshot releases were published:
- `20260430.01`
- `20260429.02`
- `20260429.01`

No release notes were provided for these versions. They appear to be rolling daily builds from the active `main` branch, incorporating the merged pull requests listed below. Users upgrading to `20260430.01` will get the sandbox fix, MCP re-auth button, scrolling fix, voice personas, Claude/Hermes import, code-index auto-trigger, and new slash commands all in one update.

## 3. Project Progress – Merged & Closed PRs
Today’s merged/closed PRs advanced the project in several key areas:

**Bug Fixes & Security**
- **[#925](https://github.com/moltis-org/moltis/pull/925)** – Fixed chat scrolling regression from PR #846 by replacing an aggressive `ResizeObserver` with a simpler scroll detection (closes [#922](https://github.com/moltis-org/moltis/issues/922)).
- **[#924](https://github.com/moltis-org/moltis/pull/924)** – Sandbox escape vulnerability patched: `RestrictedHostSandbox` now correctly reports isolation, preventing host filesystem access (closes [#923](https://github.com/moltis-org/moltis/issues/923)).
- **[#930](https://github.com/moltis-org/moltis/pull/930)** – MCP settings page now shows a “Re-authenticate” button when OAuth tokens expire (closes [#927](https://github.com/moltis-org/moltis/issues/927)).

**New Features**
- **[#916](https://github.com/moltis-org/moltis/pull/916)** – Voice personas: named, reusable TTS identities linked to agents, replacing ad-hoc tone improvisation.
- **[#917](https://github.com/moltis-org/moltis/pull/917)** – UI integration for importing Claude Code and Hermes sessions, alongside the existing OpenClaw import.
- **[#921](https://github.com/moltis-org/moltis/pull/921)** – Code-index auto-trigger (Spec 007): projects are re-indexed automatically when files change, including an `IndexJobManager` plus multiple review rounds.
- **[#926](https://github.com/moltis-org/moltis/pull/926)** – Five new slash commands: `/btw`, `/fast`, `/insights`, `/steer`, `/queue`, plus auxiliary model configuration scaffolding.
- **[#928](https://github.com/moltis-org/moltis/pull/928)** – Dependency bump: `marked` 18.0.0 → 18.0.2 in the web UI.
- **[#259](https://github.com/moltis-org/moltis/pull/259)** – CI migration to Blacksmith runners (automated bot PR, closed today).

**Still Open (In Progress)**
- **[#931](https://github.com/moltis-org/moltis/pull/931)** – Lightweight model discovery fix for large local LLMs.
- **[#932](https://github.com/moltis-org/moltis/pull/932)** – Message action bar (Copy/Retry/Fork) in the web UI.
- **[#920](https://github.com/moltis-org/moltis/pull/920)** – Telephony (phone call) support via Twilio.

## 4. Community Hot Topics
The most active discussion today was on the **chat scrolling bug**:
- **[#922 – Chat scrolling isn’t working](https://github.com/moltis-org/moltis/issues/922)** (3 comments, closed by @bsarkisov)  
  Users described being unable to manually scroll up during streaming replies, a regression from the “smart auto-scroll” feature. The fix (#925) was merged the same day, showing strong community–maintainer feedback loop.

Another long-standing topic closed today:
- **[#266 – Native 9router support](https://github.com/moltis-org/moltis/issues/266)** (2 comments, closed)  
  A feature request from February to integrate the 9router universal AI proxy. It was closed without a linked PR, suggesting the team may have decided not to pursue native integration at this time.

Underlying need across both topics: seamless multi-model and multi-provider usage, and a distraction-free chat experience during extended agent sessions.

## 5. Bugs & Stability
Three bugs were reported and fixed today, ranked by severity:

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **Critical** | [#923](https://github.com/moltis-org/moltis/issues/923) | Sandboxed commands could execute on the host filesystem due to a misreported sandbox state. | [#924](https://github.com/moltis-org/moltis/pull/924) (merged) |
| **High** | [#922](https://github.com/moltis-org/moltis/issues/922) | Chat scroll was hijacked by a `ResizeObserver`, preventing manual scroll during streaming. | [#925](https://github.com/moltis-org/moltis/pull/925) (merged) |
| **Medium** | [#927](https://github.com/moltis-org/moltis/issues/927) | MCP servers with expired OAuth tokens lacked a re-authentication button. | [#930](https://github.com/moltis-org/moltis/pull/930) (merged) |

All three issues are resolved in the latest release (`20260430.01`). No new regression or crash reports remain open.

## 6. Feature Requests & Roadmap Signals
- **Closed without implementation**: [#266](https://github.com/moltis-org/moltis/issues/266) – Native 9router proxy support. Closed after two months with no PR; may indicate a deliberate scope decision.
- **Direction from merged PRs**: The wave of new importers (Claude Code, Hermes) and slash commands suggests a focus on interoperability and agent usability. Voice personas and code-index auto-trigger point toward richer context and personalisation.
- **Likely next version additions**:  
  - Telephony support via Twilio ([PR #920](https://github.com/moltis-org/moltis/pull/920) open)  
  - Message action bar (Copy/Retry/Fork) ([PR #932](https://github.com/moltis-org/moltis/pull/932) open)  
  - Lightweight model probe for local LLMs ([PR #931](https://github.com/moltis-org/moltis/pull/931) open)
- The rapid closure of feature-request issues and the presence of multiple open enhancement PRs indicate an aggressively iterative roadmap.

## 7. User Feedback Summary
- **Pain points**: Users are sensitive to UI regressions in the chat workspace (scrolling, authentication buttons). The sandbox escape raised legitimate security concern, showing that some users operate in untrusted environments.
- **Desired workflows**: Multi-provider/agent interop (9router request, Claude/Hermes import), and fine-grained control over agent interactions (message retry/fork, ephemeral side questions via `/btw`).
- **Satisfaction**: All reported bugs were acknowledged and fixed within hours. The community rewarded the quick turnaround with closing votes and no new escalations. The addition of slash commands and voice personas seems to be well-received, based on the PR descriptions.
- **Use case diversity**: MCP server operators, developers using local LLMs, and users wanting telephone integration showcase Moltis’s expanding reach.

## 8. Backlog Watch
- **[#266 – Native 9router support](https://github.com/moltis-org/moltis/issues/266)**: Opened 2026-02-28, closed today with no resolution or comment. If this capability is still desired by the community, a fresh discussion or a design proposal might prompt re-evaluation.
- **Automated CI PRs**: [#259](https://github.com/moltis-org/moltis/pull/259) (Blacksmith migration) lingered since February and was closed today – possibly a rejected bot suggestion.

No other long-standing, unanswered issues or PRs require immediate maintainer attention. The backlog appears well-groomed, with most items being actively triaged within a day.

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw Project Digest — 2026-04-30

## 1. Today’s Overview
CoPaw continues to show very high development velocity: 38 issues updated (23 closed) and 18 PRs processed (15 merged/closed) in the last 24 hours. A new patch release **v1.1.5.post1** was published, delivering channel enhancements and a critical security fix. The majority of today’s activity focused on stabilising WeCom and Feishu channels, tackling UI/UX regressions, and closing long‑standing bugs. The community remains highly engaged, primarily through Chinese‑language reports, and maintainers are responding rapidly – many issues raised yesterday already have fixes merged.

## 2. Releases
**v1.1.5.post1** (patch release)
- **Security fix** – path traversal prevention for static files ([PR #3973](https://github.com/agentscope-ai/QwenPaw/pull/3973), related to issue #3955)
- **Feature** – Feishu channel: `FeishuCardHandler` introduction and upgrade of `tool_guard` approval to interactive one‑click buttons ([PR #3941](https://github.com/agentscope-ai/QwenPaw/pull/3941))
- Version bump chores ([PR #3970](https://github.com/agentscope-ai/QwenPaw/pull/3970))

*The release is a post‑fix to 1.1.5; no breaking changes or special migration are noted.*

## 3. Project Progress
Today’s merged/closed PRs brought major improvements across channels, UI, and core:

- **WeCom channel reliability** – Cross‑loop runtime error fix ([#3978](https://github.com/agentscope-ai/QwenPaw/pull/3978)), asyncio event loop conflict resolution ([#3300](https://github.com/agentscope-ai/QwenPaw/pull/3300)), double‑reconnect race elimination ([#3963](https://github.com/agentscope-ai/QwenPaw/pull/3963)), and stuck “Thinking…” fix ([#3950](https://github.com/agentscope-ai/QwenPaw/pull/3950))
- **Feishu channel** – Interactive approval cards ([#3941](https://github.com/agentscope-ai/QwenPaw/pull/3941)) and documentation hint on card action subscription ([#3982](https://github.com/agentscope-ai/QwenPaw/pull/3982))
- **Console UI** – Chat session restored when switching agents ([#3958](https://github.com/agentscope-ai/QwenPaw/pull/3958)), Chat component kept mounted across page navigation ([#3959](https://github.com/agentscope-ai/QwenPaw/pull/3959)), antd v5 deprecation warnings cleaned ([#3981](https://github.com/agentscope-ai/QwenPaw/pull/3981)), and CodeMirror line‑wrapping fix for tool call blocks ([#3960](https://github.com/agentscope-ai/QwenPaw/pull/3960))
- **Security** – Absolute static file path rejection to prevent directory traversal ([#3973](https://github.com/agentscope-ai/QwenPaw/pull/3973))
- **Multimodal support** – Images and files now accepted in messages ([#3509](https://github.com/agentscope-ai/QwenPaw/pull/3509))
- **WeCom group chat** – New `share_session_in_group` toggle ([#3948](https://github.com/agentscope-ai/QwenPaw/pull/3948))
- **Workspace initialisation** – Skip re‑generation of BOOTSTRAP.md on already‑initialised workspaces ([#3954](https://github.com/agentscope-ai/QwenPaw/pull/3954))

These collectively improve stability and user experience on the most used channels and the web console.

## 4. Community Hot Topics
The following issues drew the most discussion (top by comment count) and reveal underlying user needs:

1. **[Windows server arbitrary file traversal vulnerability](https://github.com/agentscope-ai/QwenPaw/issues/3955)** (12 comments, closed)  
   *Need*: Strong path safety guarantees – fixed by PR #3973.

2. **[Page freezes when saving model settings on Debian 12](https://github.com/agentscope-ai/QwenPaw/issues/3853)** (10 comments, closed)  
   *Need*: Robust configuration persistence across Linux environments; workaround suggested, now closed.

3. **[WeCom channel frequent disconnection](https://github.com/agentscope-ai/QwenPaw/issues/2757)** (7 comments, closed)  
   *Need*: Reliable long‑lived channel connections – addressed by today’s WeCom stability PRs.

4. **[Page becomes extremely laggy after 200+ conversation turns](https://github.com/agentscope-ai/QwenPaw/issues/3350)** (6 comments, open)  
   *Need*: Frontend performance optimisation for heavy history; remains a live concern.

5. **[Agent workspace switches incorrectly when receiving channel messages from other agents](https://github.com/agentscope-ai/QwenPaw/issues/3957)** (5 comments, open)  
   *Need*: Correct agent identity/workspace isolation in multi‑agent setups; still unresolved.

6. **[MCP creation bug (Alibaba Cloud DevOps)](https://github.com/agentscope-ai/QwenPaw/issues/3951)** (5 comments, closed)  
   *Need*: Seamless third‑party MCP integration; closed after investigation.

7. **[/ralph-loop magic command request](https://github.com/agentscope-ai/QwenPaw/issues/3972)** (4 comments, closed)  
   *Need*: Autonomous loop execution without manual “continue” prompts; closed quickly (implementation status unclear).

8. **[Future Hermes integration for agent self‑evolution](https://github.com/agentscope-ai/QwenPaw/issues/3516)** (4 comments, open)  
   *Need*: Roadmap alignment with Hermes concepts; community eager for long‑term direction.

## 5. Bugs & Stability
Several critical and high‑severity bugs surfaced today. Where fix PRs exist, they are noted.

| Severity | Issue | Status | Fix PR |
|----------|-------|--------|--------|
| **Critical** | Path traversal vulnerability – arbitrary file read on Windows ([#3955](https://github.com/agentscope-ai/QwenPaw/issues/3955)) | **Closed** | [#3973](https://github.com/agentscope-ai/QwenPaw/pull/3973) merged |
| **Critical** | Agent workspace identity confusion on channel message ([#3957](https://github.com/agentscope-ai/QwenPaw/issues/3957)) | Open (5 💬) | – |
| **High** | `FunctionCallOutput` validation error + `loop_config.json` corruption ([#3969](https://github.com/agentscope-ai/QwenPaw/issues/3969)) | Open (2 💬) | – |
| **High** | Idle‑session cleanup cancels running tasks ([#3976](https://github.com/agentscope-ai/QwenPaw/issues/3976)) | Open (2 💬) | – |
| **High** | `memory_search` crashes with `AttributeError` ([#3977](https://github.com/agentscope-ai/QwenPaw/issues/3977)) | Open (3 💬) | – |
| **Medium** | “Running Config” settings page returns 404 Not Found ([#3980](https://github.com/agentscope-ai/QwenPaw/issues/3980)) | Open (2 💬) | – |
| **Medium** | Console conversation interruptions ([#3861](https://github.com/agentscope-ai/QwenPaw/issues/3861)) | Open (3 💬) | – |
| **Low/UX** | History shows raw system instructions ([#3975](https://github.com/agentscope-ai/QwenPaw/issues/3975)) | Open (2 💬) | – |
| **Resolved** | WeCom channel unresponsive ([#3937](https://github.com/agentscope-ai/QwenPaw/issues/3937)) – closed after WeCom stability fixes | Closed | Multiple PRs |
| **Resolved** | Windows EXE white screen on first run ([#3971](https://github.com/agentscope-ai/QwenPaw/issues/3971)) – likely addressed in 1.1.5.post1 | Closed | – |

The open identity‑confusion bug (#3957) and the memory‑search crash (#3977) should get immediate attention as they break core agent functionality.

## 6. Feature Requests & Roadmap Signals
User‑requested enhancements hint at the next iteration priorities:

- **Long‑conversation scrolling performance** (#3350) – very likely to be in the next version, given user impact.
- **Windows desktop tray minimise** (instead of killing service on close) – [#3979](https://github.com/agentscope-ai/QwenPaw/issues/3979) (open) – strong desktop UX demand.
- **Self‑referential loop** (`/ralph-loop`) – [#3972](https://github.com/agentscope-ai/QwenPaw/issues/3972) – closed quickly, might have been accepted but not yet implemented.
- **Hermes integration** – [#3516](https://github.com/agentscope-ai/QwenPaw/issues/3516) – community anticipates long‑term integration.
- **File preview expansion** (docx, pdf, etc.) – [#3966](https://github.com/agentscope-ai/QwenPaw/issues/3966) – closed but indicates strong demand.
- **Wide chat layout / timeline timestamps** – [#3146](https://github.com/agentscope-ai/QwenPaw/issues/3146), [#3038](https://github.com/agentscope-ai/QwenPaw/issues/3038) – closed; might reappear as consolidated UI overhaul.
- **GitHub Copilot model provider** – open PR [#3846](https://github.com/agentscope-ai/QwenPaw/pull/3846) (under review) – highly probable in next release.
- **Live inter‑agent task progress** – open PR [#3889](https://github.com/agentscope-ai/QwenPaw/pull/3889) – likely to land soon.

Given the merged multimodal support, a **v1.1.6** or **v1.2.0** could include Copilot provider, progress tracking, console performance fixes, and the desktop tray feature.

## 7. User Feedback Summary
- **Common pain points**  
  - Windows EXE packaging: white screen, high resource usage, no tray minimise.
  - Frontend lag after many interactions; browser crashes on complex tool‑call flows.
  - Channel flakiness (WeCom disconnect, Feishu card actions, identity mix‑ups).
  - Workspace clutter – users want separation between core config and user files.
- **Positive signals**  
  - Rapid fixes praised (WeCom, path traversal closed within hours).
  - Multimodal message support welcomed.
  - Chinese‑speaking community is large and highly interactive; many feature requests reflect real enterprise usage.
- **Unsatisfied needs**  
  - Documentation on file management and safe workspace practices.
  - Agent identity and session management in multi‑agent setups still confusing.

## 8. Backlog Watch
These items have been open without resolution and need maintainer attention:

- **Issues**  
  - [#3350](https://github.com/agentscope-ai/QwenPaw/issues/3350) – Scroll lag (open 16 days, 6 comments)  
  - [#3957](https://github.com/agentscope-ai/QwenPaw/issues/3957) – Agent workspace confusion (open 1 day, but critical)  
  - [#3861](https://github.com/agentscope-ai/QwenPaw/issues/3861) – Console interruptions (open 3 days)  
  - [#3516](https://github.com/agentscope-ai/QwenPaw/issues/3516) – Hermes integration inquiry (open 13 days)

- **Pull Requests**  
  - [#3846](https://github.com/agentscope-ai/QwenPaw/pull/3846) – GitHub Copilot provider (open 4 days, first‑time contributor)  
  - [#3889](https://github.com/agentscope-ai/QwenPaw/pull/3889) – Live inter‑agent progress (open 3 days)  
  - [#3605](https://github.com/agentscope-ai/QwenPaw/pull/3605) – Unify WeChat/Weixin identifier (open 10 days, review pending)

---

*Digest generated from GitHub data for `agentscope-ai/CoPaw` on 2026-04-30. Links point to the QwenPaw repository as used in the original data.*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

No activity in the last 24 hours.

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw Project Digest – 2026-04-30

## 1. Today’s Overview
The EasyClaw repository is in a near-silent state with no open issues, no open pull requests, and zero discussion activity in the past 24 hours. The sole signal of maintainer attention is a new patch release **v1.8.10** targeting a common macOS installation friction. The project appears stable and currently free of reported defects or pending feature work.

## 2. Releases
**RivonClaw v1.8.10** ([release link](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.10))  
- **Type:** Minor patch / usability fix  
- **Focus:** Resolve macOS Gatekeeper false-positive blocking for users who see *“’RivonClaw’ is damaged and can’t be opened”*.  
- **Provided workaround (incomplete in release notes):**  
  > 1. Open **Terminal** (pr… [text truncated])  
  The instructions likely recommend using `xattr -cr` or allowing the app via System Settings.  
- **Breaking changes:** None  
- **Migration notes:** No upgrade steps required; simply re-download the new binary and apply Gatekeeper bypass if needed.

## 3. Project Progress
- **Merged/closed PRs today:** 0  
- **Features advanced or fixed:** The v1.8.10 release directly addresses a macOS installation pain point; however, no corresponding PR is linked, suggesting the fix may have been applied directly to the release branch without a public pull request.

## 4. Community Hot Topics
There are no active issues or pull requests, and no items with comments or reactions. The project’s issue tracker is empty.  
→ No community hot topics this period.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported today. The only stability-related signal is the maintainer proactively shipping a workaround for the macOS “damaged app” error, which indicates residual friction for macOS users.  
Severity: Low (cosmetic/bypass, not a functional crash) – no fix PR is open, as the solution is baked into the release.

## 6. Feature Requests & Roadmap Signals
No feature requests were observed in the past 24 hours, and the issue tracker is devoid of any entries. The release focuses solely on an existing usability hurdle, giving no indication of upcoming enhancements. The next version’s contents cannot be predicted from current public signals.

## 7. User Feedback Summary
No user-facing feedback (comments, reactions, or discussions) was recorded. The existence of the macOS Gatekeeper fix implies that users have encountered the error, but their direct feedback is not captured in the repository. Satisfaction/dissatisfaction levels cannot be assessed from the available data.

## 8. Backlog Watch
- **All open issues:** 0  
- **All open pull requests:** 0  
There are no lingering, unanswered items requiring maintainer attention. The lack of a backlog could indicate a healthy, well‑triaged project or extremely low user engagement.

---

**Overall health statement:** The project remains maintained (new release) but shows no signs of community interaction or ongoing development conversations. The macOS fix is a positive signal, but the complete absence of issues, PRs, and discussions suggests a small or passive user base at this time.

</details>