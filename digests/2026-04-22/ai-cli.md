# AI CI Tool Community Dynamic Daily 2026-04-22

> Generated at: 2026-04-22 01:13 UTC | cover tool: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Horizontal comparison

# AICLI tool ecosystem horizontal comparative analysis report (2026-04-22)

---

## 1. ecosystem Panorama

The current AI CLI tool ecosystem presents ** "Function convergence, experience fragmentation"**: mainstream tools generally focus on MCP integration, sub-agent collaboration and subject-management, but there are significant gaps between platforms in terms of status, cross-platform compatibility and interprise-grade capabilities. Model transitions to logical defects, resource leakages and the failure of missions are frequent at the bottom, reflecting the general challenge of the quality of the works in a rapid iterative manner. At the same time, the growing demand from users for model consistency of behaviour, transparency in accounting and end-of-term interactive experience has facilitated the evolution of the CLI tool from a “prototype available” to a “production credible”.

---

## 2. Comparison of tool activity

| Tools | Issues (new/hot spots today) | PR (former 24h) | Release |
|------|--------------------------|---------------|---------------------|
| **Claude Code** | 10+ High heat (#16157 expense abnormal, etc.) | 4 (document/security is predominant) | v2.117 (functional enhancement) |
| **OpenAI Codex** | 10+ (#14593 token consumption abnormal, etc.) | 10+ (including reconstruction) | 5 Alpha Versions (Rust Achieved) |
| **Gemini CLI** | 10+ (#24916 requests repeat etc.) | 10+ (reconstruction of memory system) | v0.39.0-preview.1/2 (hotfix) |
| **GitHub Copilot CLI** | 10+ (#265 Render Cardon, #2873 Opus abnormal) | 2 (Adaptation/development environment) | v1.0.35-0 / v1.0.35-2 |
| **Kimi Code CLI** | 10+ (# 1925 K2.6 experience down, #1984 terminal hanging) | 10+ (including architecture optimization) | None |
| **OpenCode** | 10+ (#13768 Opus 4.6 compatible, #22135 expense abnormal) | 10+ (with interactive tool enhancement) | v1.14.20 (stabilityfix) |
| **Qwen Code** | 10+ (#3501 401 error, #3496 domestic Chinese API support) | 10+ (including Python SDK) | v0.14.5-preview.0 / v0.15.0-preview.1 |

> Note: All tools report 10 active Issues, PR numbers reflect core team response speed, and Qwen Code and Gemini CLI are in high frequency iterative status.

---

## 3. Functional directions of common concern

| Function Direction | Tools involved | Specific claims |
|--------|--------|--------|
| **Model switch and compatibility** | Full platform | Opus 4.6/4.7 Inconsistent behaviour (Claude Code), K2.6 Experience degradation (Kimi), GLM/Qwen third-party model support (Qwen Code) |
| ** Terminal and resource management** | Full platform | Windows/macOS resource leakage (#51760, #18881), terminal hang (#1984), CPU over-occupancy (#18463) |
| **missions and sustainability** | Claude Code、Gemini CLI、Kimi | Allowing all sessions to expire, failure of sub-agents, loss due to shallow consolidation |
| **MCP and expansion | Full platform | Unrecognized head (#33817), uninjected skills (#2753), HTTP Hook support (Copilot CLI, Qwen Code) |
| **Enterprise-glade integration** | OpenAI Codex、OpenCode、Copilot CLI | Organisation |

---

## 4. Discrepancies position analysis

| Tools | Functional focus | Target users | Technical route characteristics |
|------|--------|--------|-------------|
| **Claude Code** | Sub-Agent + MCP Depth Integration | Advanced Developer / Enterprise User | "Agent collaboration" |
| **OpenAI Codex** | Reconstruct identity structure | Enterprise DevOps / security sensitive scene | Rust Reconstruct, Unified AuthProvider, emphasises relativity |
| **Gemini CLI** | Memory system + terminal interactive optimization | Google ecosystem developer | Level four memory.`/note`Command, emphasise context retention. |
| **GitHub Copilot CLI** | IDE Consistency + Automodel Switch | GitHub Developer/ Pro User | Depth binding GitHub ecosystem with emphasis on "unsensable switching" |
| **Kimi Code CLI** | Multiplatform terminal status + hook extension | Domestic Developer / Jetbrains User | RalphFlow Prevent, PreToolUse, emphasis on controllability |
| **OpenCode** | Multimodel Compatible + TUI Experience | Open source community / multimodel user | In support of Ollama/OpenRouter, emphasises that “model is irrelevant” |
| **Qwen Code** | +Python SDK | Domestic enterprise / third party model user | Active integration of GLM, calorie, emphasis on local adaptation |

---

## 5. Community heat and maturity

- **High activity + fast iterative**:
  ** Gemini CLI** (daily average of 10+ PR),** Qwen Code** (continuous preview),** OpenAI Codex** (Rust Alpha intensive release) is in a technically radical phase and suitable for front-line developers.
  
- **High problem density + maturity pressure**:
  **Claude Code** (#16157) is unusually long-standing,** GitHub Copilot CLI** (Carton, Opus anomaly) reflects the challenges of stability under large-scale users and needs to be alert to risks in the production environment.

- **ecosystem extension**:
  ** OpenCode** and ** Qwen Code** actively introduced third party model and SDK and the community was active, but the core status (e.g. 401 errors) constraint.

---

## 6. Trends of concern

| Trends | Data Support | Reference value to developers |
|------|--------|------------------|
| **Model behaviour crisis** | K2.6 “Lossing personality”, Opus 4.7 Default change, GLM “mention” | Model updates need to be accompanied by UX-based policies to avoid regression |
| ** Terminal bottlenecks** | 7 tools to report resource leakage/ hanging up/rendering Carton. | It is recommended that priority be given to testing long-session and cross-platform scenarios to avoid disruption of production |
| **Enterprise-gladeauthentization standardization** | Agent Identity (Codex), Entra/SigV4 demand outbreak | Advance planning of cloud-based identity integration with a unified AuthProvider structure |
| ** Localization and community drive** | Qwen Code domestic Chinese API, Kimi Jetbrains support | Domestic developers should focus on local model access and data access programmes |
| ** the rising demand for ** | Token Consumed Abnormal and Automation Failed without Log | Integrated OpenTelemetry or custom audit hook to enhance debugging |

> ** Proposal **: Developer selection should give priority to assessing ** terminal compatibility** and **model** and business users should focus on ** transparency of the structure and ** accounting**; participation in open source project could focus ** high value directions such as ** multimodel approximation**.

---

## Detailed reports on tools

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Community Hotspot

> Data source:[anthropics/skills](https://github.com/anthropics/skills)

**Claude Code Skills Community Hotspot Report (as at 2026-04-22)**

---

### Skills Line (by community focus)

| Rank | Skill Name | Brief description of functions | Community discussion hot spots | Status |
|------|-----------|--------|------------|------|
| 1 | [document-typography](https://github.com/anthropics/skills/pull/514) | Autofix AI to generate layout problems in documents (single, oligarch, misnumber) | The base layout defect of the user-wide feedback Claude generated documents is widely recognized as a "basic capability" for Skill hits. | Open |
| 2 | [ODT skill](https://github.com/anthropics/skills/pull/486) | Support the creation, filling and HTML conversion of OpenDocument format (.odt/.ods) | There is a strong demand for integration of open source office ecosystem, particularly by LibreOffice users; discussion focused on cross-platform compatibility | Open |
| 3 | [testing-patterns](https://github.com/anthropics/skills/pull/723) | Provide in-house test guidance (module test, React component test, Testing Trophy model) | Developer calls for enhanced code quality assurance, which Skill covers modern front-end testing best practices and is highly practical | Open |
| 4 | [shodh-memory](https://github.com/anthropics/skills/pull/154) | Provision of memory mechanisms for cross-dialogue sustainability for AI agents | Addressing the loss of Context is seen as a key capacity for “long-term memory”; communities are enthusiastic about how it is achieved and how it borders on privacy | Open |
| 5 | [codebase-inventory-audit](https://github.com/anthropics/skills/pull/147) | Automation code library audit (recognizing redundant documents, documentation gaps, technical liabilities) | Business Users Focus on Coding Efficiency, which Skill provides a standardized cleanup process to output CODEBASE-STATUS.md | Open |
| 6 | [frontend-design](https://github.com/anthropics/skills/pull/210) | Increased clarity and operability of front-end design guidance | Original Skill is considered "too theoretical" and this PR optimized emphasis on enforcing commands within a single-cycle dialogue | Open |
| 7 | [sensory (macOS AppleScript)](https://github.com/anthropics/skills/pull/806) | Automation of primary macOS through AppleScript | Advanced users admire their precision control capabilities; hierarchical design of missions triggers security and facilitation discussions | Open |
| 8 | [hads-convert](https://github.com/anthropics/skills/pull/622) | Convert any technical document to a HADS standard format (human-AI Document Standard) | Promotion of the AI readability one-time conversion programme and community endorsement of its “one-time input, long-term benefit” concept | Open |

---

### 2. Trends in community demand (from Issues extraction)

- ** Organizational-level skills sharing**: a strong call for a team-based skill-sharing (#228) in Claude.ai to replace the current inefficient process of manually uploading.skill files.
- ** Skills trigger reliability**: The core pain point is`claude -p`The order could not trigger Skill (#556) which would render the assessment tool ineffective and affect the skills development closed loop.
- **security and the boundary of trust**: communities are concerned about the use of community skills`anthropic/`Namespace (#492), which requires a clear distinction between official and third-party skills.
- ** Skills to be re-classified and classified**:`document-skills`and`example-skills`Plugin is duplicated (#189) and a clear division of responsibilities is required.
- ** Enterprise integration barriers**: SSO/business users are unable to use dependency`ANTHROPIC_API_KEY`Tool chains (#532), hindering the spread of skills development tools.
- **Bedrock Compatibility**: AWS users keep asking about the support of skills on Bedrock (#29), reflecting the need for cloudy decompoyment.

---

### 3. High potential to be merged Skills

The following comments are dynamic, functional and up-to-date and are likely to be consolidated in the near future:

- **[testing-patterns](https://github.com/anthropics/skills/pull/723)**: Covers the complete test warehouse to address the urgent needs of developers for quality assurance.
- **[document-typography](https://github.com/anthropics/skills/pull/514)**: fix base document defects, high user voice, clear technology.
- **[shodh-memory](https://github.com/anthropics/skills/pull/154)**: Enduring context is key to Agent ' s ability to leapfrog and community discussions are intensive.
- **[sensory (AppleScript)](https://github.com/anthropics/skills/pull/806)**: Provision of a more efficient MacOS automation programme than Computer Use, with high level of support from senior users.
- **[hads-convert](https://github.com/anthropics/skills/pull/622)**: Standardized document format to enhance AI understanding efficiency, novelty and lightweight.

---

### 4. Skills insight

** The most focused demands of the current community are to improve the reliability of skills, their sharing and the availability of enterprise-grade — from being “able to be” to “good” and “maximizing to be”. **

> The core paradox has shifted from “lack of skills” to “stabilization, teamwork, security integration”.

---

** Claude Code Community Dynamic Daily (2026-04-22)**

---

### 1. Today's Summary
Anthropic release v2.117, focused on enhancing sub-agents' integration with MCP servers and optimizing model selections for sustainability; key issues such as community-based constant focus metering anomalies, context window expansion, and Bash tool behaviour review, with developers providing focused feedback on the default behaviour change of Opus 4.7.

---

### 2. Version
**v2.117** Releasing, mainly updated:
- Supporting the adoption of environmental variables`CLAUDE_CODE_FORK_SUBAGENT=1`Enable fork agency in external build
- `--agent`Mode-based main thread proxy`mcpServers`Frontend Metadata
- `/model`Model selection in the command can now be used for multi-renewal durability while locking the item.
👉 [Release v2.1.117](https://github.com/anthropics/claude-code/releases/tag/v2.1.117)

---

### Community hotspots Issues

| ID | Title | Why it matters | Community response |
|------|------|-----------|---------|
| [#16157](https://github.com/anthropics/claude-code/issues/16157) | Max subscriber instant trigger limit | High-priority billing abnormally affects the user experience and may involve API quota logical errors | 1452 comments, 681 long outstanding |
| [#49593](https://github.com/anthropics/claude-code/issues/49593) | v2.1.111 Enrolled context window at startup of session 14% | Core performance degraded, directly affecting the effectiveness of long context scenarios | 15 comments, 3 👍, marked as regresion question |
| [#49689](https://github.com/anthropics/claude-code/issues/49689) | Opus 4.6 removed from Model Selector after Opus 4.7 release | Model availability regressed, users lost the downgrade option | 14 comments, 66 👍, closed but highly controversial |
| [#51760](https://github.com/anthropics/claude-code/issues/51760) | Windows backstage Bash subprocesses are not closed with session, task-output files grow indefinitely (up to 4.86 TB) | Serious leakage of resources, which could lead to a system collapse | 2 Comments, 0 👍, newly reported but extremely risky |
| [#51788](https://github.com/anthropics/claude-code/issues/51788) | Opus 4.7 ignored on Windows`CLAUDE_CODE_USE_POWERSHELL_TOOL=1`Still default on Bash | Behaviour destroy user Shell preference | 1 Comment, 0 👍, new issue |
| [#44657](https://github.com/anthropics/claude-code/issues/44657) | Sub-agents are forbidden to write to specific naming mode`.md`Documentation (e.g. report/summary) | Excessive restrictions hindering automated reporting | 4 Comment, 8 The developers strongly object |
| [#50513](https://github.com/anthropics/claude-code/issues/50513) | Complex engineering behavior is inconsistent with session, requesting RCA and audit security | Reflects the replicability crisis of model behaviour, affecting production level use | 8 Commentary, 10 |
| [#41034](https://github.com/anthropics/claude-code/issues/41034) | Chome Cowork Mode resulted in all websites being blocked | The browser set failed successfully and affected the collaborative scene | 13 comments, 5 |
| [#33817](https://github.com/anthropics/claude-code/issues/33817) | MCP Server Autoration Header unrecognized, forced back to Oouth | The degradation of the regime undermines existing integration | 10 comments, 2 👍, closed but unresolved |
| [#51766](https://github.com/anthropics/claude-code/issues/51766) | Repeating output (e.g. Finding 2/3) | Output consistency bug, influence credibility of results | 4 Commentary, 1 |

---

### 4. Significant PR progress

| ID | Title | Summary |
|------|------|--------|
| [#51452](https://github.com/anthropics/claude-code/pull/51452) | Update README.md | Rewrite document to increase clarity, fix npm Budge, remove AI writing style |
| [#51451](https://github.com/anthropics/claude-code/pull/51451) | Revision of security policy | Compulsion to report security issues through HackerOne, clarifying the boundaries |
| [#41611](https://github.com/anthropics/claude-code/pull/41611) | Add Missing Source | Complement internal module source code (non-consolidated for long) |
| [#51395](https://github.com/anthropics/claude-code/pull/51395) | Experimental integration of GPS log functions | Experimental function involving locational sensory ability (unofficial author) |

> Note: The current number of PRs is small, mostly document and security policy updates, and core function PR has not yet emerged.

---

### 5. Trends in functional needs

- **MCP expansion**: multiple issues call for more MCP servers (e.g., Cachly, Gmail) and fix headers/headerHelper issue[#51455](https://github.com/anthropics/claude-code/issues/51455)、[#48514](https://github.com/anthropics/claude-code/issues/48514)）  
- **session management enhancements**: users strongly request support for the session renaming ([#51791](https://github.com/anthropics/claude-code/issues/51791)) and customised initiation greeting ([#51787](https://github.com/anthropics/claude-code/issues/51787)）  
- **Shell Tool Consistency**: Windows users express dissatisfaction with PowerShell/Bash default confusion and expect clear control mechanisms
- ** billing and quota transparency**: multiple loss of promotion credits, use of volume-restriction anomalies to boost demand for the capacity of the billing system audit

---

### 6. Developer focus

- **stabilityregression**: v2.1.111+ introduction of context expansion, Bash tool misuse, MCP connection interruption, etc.
- **Resource Leak Risk**: Windows platform[#51760](https://github.com/anthropics/claude-code/issues/51760)) Exposure process management deficiencies
- **Model's behaviour is uncontrollable**: Opus 4.7 Unnotified default behaviour change, resulting in the interruption of user workflow
- ** Documents and observability are insufficient**: lack of detailed descriptions of MCP processes, cache mechanisms, sub-agent strategies to increase debugging costs

---  
*Source: GitHub.com/antropics/claude-code * Generating: 2026-04-22*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Dynamic Daily (2026-04-22)

---

## 1. Today's Summary

Today, the Cordex community has an intensive discussion around ** status upgrade** and ** desktop endpoint question**. The core development team advanced the bottom-up re-engineering of the Agent Education Association model, while several high-impact Bug reports pointed to the leakage of resources on the MacOS and Windows platforms, supermissions anomalies, and the failure of the management of the subject, causing widespread community attention.

---

## 2. Version

In the last 24 hours, Codex Rust has achieved five consecutive alpha versions (in English)`v0.123.0-alpha.3`to`v0.123.0-alpha.7`) is mainly an internal construction iterative, without disclosing specific functional changes, presumably to support the validation of tests for the re-engineering of the system and the sandbox policyfix.

---

## Community hotspots Issues

| ID | Title | Why it matters | Community response |
|------|------|-----------|---------|
| [#14593](https://github.com/openai/codex/issues/14593) | Burning tokens very fast | Users report abnormal acceleration of token consumption at high loads, which may involve expense or restricted flow logic deficiencies, affecting commercial user trust | 555 comments, 234 👍, long outstanding |
| [#10450](https://github.com/openai/codex/issues/10450) | Remote Development in Codex Desktop App | Request to add remote development support for desktop applications (e. g. SSH/WSL) as the current functionality shortboard | 148 comments, 581 comments, strong demand |
| [#18463](https://github.com/openai/codex/issues/18463) | xhigh cpu usage forever by just open/reopen app | Desktop application has a serious CPU occupancy leak that affects user experience | 8 comments, 2 recent additions but salient issues |
| [#18755](https://github.com/openai/codex/issues/18755) | macOS packaging error: SkyComputerUseClient built for macOS 15.0 crashes on macOS 14.x | Version compatibility issues led to the collapse of the old system, affecting user coverage | 8 comments, 15 |
| [#14346](https://github.com/openai/codex/issues/14346) | Context Compaction Hanging | Context compression card is dead, blocking long-term access | 21 comments, 19 |
| [#11678](https://github.com/openai/codex/issues/11678) | Typing on the CLI since 0.100 is very slow | Windows platform CLI input is seriously delayed and is of a sexual nature | 17 comments, 4 |
| [#10823](https://github.com/openai/codex/issues/10823) | Unable to compact the context in a VERY long running session | Long-session context compression failed, prompting "high load", suspected service-end limit | 14 comments, 2 |
| [#18507](https://github.com/openai/codex/issues/18507) | macOS CLI: bundled Computer Use helper requests microphone permission without audio-input entitlement | Improper requests lead to functional failure, involving privacy risk | 6 comments, 3 |
| [#18881](https://github.com/openai/codex/issues/18881) | MCP child processes leak when McpConnectionManager is replaced | Sub-process leaks, long-term run-down of system resources | 3 comments, 0 technical sensitivity |
| [#16994](https://github.com/openai/codex/issues/16994) | Desktop automations on Windows/WSL create automation runs but no rollout materializes | Windows/WSL automated process interrupted, affecting CI/CD integration | 5 comments, 3 |

---

## 4. Significant PR progress

| PR Number | Feature/fix content | Technical implications |
|--------|----------------|--------|
| [#18904](https://github.com/openai/codex/pull/18904) | Support loading of AgentIdentity from JWT environment variable | Simplified process of identity integration, enhanced automated integration |
| [#18811](https://github.com/openai/codex/pull/18811) | Harmonize Codex access to AuthProvider | Structure decoupling, laying the foundation for a multi-authentication model (e.g. Entra, SigV4) |
| [#18785](https://github.com/openai/codex/pull/18785) | Add Visibility Mode | Clear separation of identity logic to enhance security and relativity |
| [#18897](https://github.com/openai/codex/pull/18897) | Add sticky environmental selection and linear sustainability | Support user preference for cross-session retention to enhance interactive consistency |
| [#18391](https://github.com/openai/codex/pull/18391) | Six application pact does not trigger the problem of a Hook event | Completing the Audit and Strategy Implementation Chain.[#16732](https://github.com/openai/codex/issues/16732) |
| [#18910](https://github.com/openai/codex/pull/18910) | Independency installation package with checksum | Upgrade installation security and reliability to support offline |
| [#18901](https://github.com/openai/codex/pull/18901) | Installer to standalone archive file with validation | Avoid dependency npm internal structure and enhance buildability |
| [#18030](https://github.com/openai/codex/pull/18030) | Launch Responses API Call Analytic Events in Core Process | Providing a data base for performance monitoring and costing optimization |
| [#17897](https://github.com/openai/codex/pull/17897) | Add Git metadata to turn analysis | Enhances context perception to support code library-based analysis |
| [#18893](https://github.com/openai/codex/pull/18893) | Support in config.toml and references.toml | Reducing the complexity of enterprise strategic management and promoting standardization |

---

## 5. Trends in functional needs

- ** Identity and missions management**: a centralized outbreak of needs such as Agentity, Entra education, SigV4 support, reflecting the urgent need for corporate users to integrate security into a multi-causal system.
- ** Remote and cross-platform development**: Remote Development (SSH/WSL), MacOS Intel support, Windows Native Experience Optimization becomes the desktop core.
- **sandbox and automation**: fine grain sizesandbox strategy (e.g., individualization per automation), separation of missions, hoook audit mechanism received high attention from developers.
- **Context and memory management**: long-session context compression failures, memory leaks, CPU over-exploitation problems are frequent, highlighting the fact that resource management remains a stability bottleneck.

---

## 6. Developer focus

- **Stability deficiencies**: bottom-up problems such as the CPU/memory leak, process residues, input delays, etc. seriously affect confidence in the use of the production environment.
- ** Platform compatibility**: macOS version split (14.x vs 15.0), Windows/WSL support imperfection hinders the process.
- ** configuration complexity**: sandbox rules, hook strategy, lack of unified access in the system, increasing transportation costs.
- **observability is insufficient**: token consumption abnormality, failure of automated implementation etc. lack clear error logs and diagnostic tools.

> It is recommended that developers focus on the imminent landing of the **Agent Administration System** and **Independency Installer Package** updating, while being alert to the known status of the MacOS/Windows platform.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Daily Community Dynamic (2026-04-22)

---

## 1. Today's Summary

Today Gemini CLI released two preview versions (v0.39.0-preview.1 and v0.39.0-preview.2), focusing mainly on the initialization and re-allocation of the fix core agent; community in-depth discussion on key issues such as **permissions **, ** sub-agent behaviour anomalies** and ** terminal compatibility**, with several high-priority Issue marked as requiring urgent treatment.

---

## 2. Version

### v0.39.0-preview.2 (latest)
- **Fix**: chery-pick submit d6f88f8 to address calls from proxy refreshing`initialize()`The resulting performance and state anomalies.
- Associated PR:[#25776](https://github.com/google-gemini/gemini-cli/pull/25776)

### v0.39.0-preview.1
- ** Prefix**: based on preview.0 patches, fix is the same initialized logical defect.
- Associated PR:[#25766](https://github.com/google-gemini/gemini-cli/pull/25766)

> On both occasions, releases are thermal fixes, reflecting the importance the team attaches to the proxy life cycle of stability.

---

## Community hotspots Issues

| Issue | Why it matters | Community response |
|------|-----------|---------|
| [#24916](https://github.com/google-gemini/gemini-cli/issues/24916)** Mandates repeat requests** | User feedback CLI repeatedly enquires about the same file, even if it chooses "All access allowed" to seriously affect workflow continuity. | 3 Comment, 0 👍. Developer confirms that there is a problem with strategy cache failure |
| [#22323](P1)** Sub-agent misreported success** | `codebase_investigator`When the maximum rotation is reached, it is marked as "GOAL access", concealing the interruption of execution and misleading the user's judgement. | 2 👍 Maintainer is marked with high priority and requires fix status logic |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)**Shell command hangs** | CLI displays "waiting input" after simple command execution has been completed, blocking the interactive process. | 3 👍, suspected output streaming not correctly terminated |
| [#25592](CLOSED)** Significant data loss incidents** | The user music library (238GB) was accidentally deleted as a serious security incident due to the loss of proxy context and the failure to synthesize the command. | Although closed, exposure to high-risk behaviour of agents in resource management |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)**AST Access Assessment of Perceptions** | Explores enhanced code reading accuracy through AST, reduced token noise and error alignment, and optimizes proxy understanding over time. | 5 Comments, 1 👍, discussion of technical routes Medium |
| [#23571](P2)** Provisional script distribution problem** | Model still produces multi-catalogue temporary scripts in restricted shell environments, increasing clean-up costs. | Developer calls for the introduction of centralized interim document management mechanisms |
| [#22267](P2)**Browser Agent ignores settings.json** | Configuration overwhelms, resulting in`maxTurns`Key parameters, for example, are not effective and affect debugging and control. | Maintainer confirms the need forixconfiguration merge logic |
| [#25218](https://github.com/google-gemini/gemini-cli/issues/25218)** Fluid Tables Rendering Disable Access** | The table-by-part rendering in the screen reader mode leads to a disordered layout and violates accessibility standards. | Newly discovered UI defects, need to optimize current output policy |
| [#24202](https://github.com/google-gemini/gemini-cli/issues/24202)**SSH session text code** | Windows users display anomalies through the SSH connection gLinux time terminal, which hinders remote development experience. | Suspected code or TTY to detect logical defects |
| [#22819](https://github.com/google-gemini/gemini-cli/issues/22819)**Memory route: global vs project level** | It is proposed that user preferences (global) be separated from project-specific memory (local) to enhance the precision of the context management. | 2 Structure-level improvement proposals with core team attention |

---

## 4. Significant PR progress

| PR | Feature/fix content | Status |
|----|----------------|------|
| [#25716](https://github.com/google-gemini/gemini-cli/pull/25716) | ** Reconstruct memory system**: discarded`MemoryManagerAgent`, change to a four-tier layer of prempt to drive memory editing to increase response speed and controlability | OPEN |
| [#25775](https://github.com/google-gemini/gemini-cli/pull/25775) | ** New`/note`Command**: Support the rapid recording of time stamp notes in the workspace`/note <text>` / `/note view`) to enhance user retention capabilities | OPEN |
| [#25670](CLOSED) | **fix agent repeated initialization**: Remove`onAgentsRefreshed`Redundancy`initialize()`Call, resolve the situation when reload | CLOSED |
| [#25461](https://github.com/google-gemini/gemini-cli/pull/25461) | **Student Shell Output UI Update **: Avoiding all-line output triggers frequent React heavy rendering, significantly increasing flow of long command execution degrees | OPEN |
| [#25712](https://github.com/google-gemini/gemini-cli/pull/25712) | ** Supports shellToolRcFile conversion**: allow custom shell start scripts and enforce settings`PAGER=cat`Prevent page breakers from blocking | OPEN |
| [#25758](https://github.com/google-gemini/gemini-cli/pull/25758) | ** Optimization of start-up performance**: conversion of experimental features and quota checks to anisoload and reduction of cold start-up delays | OPEN |
| [#25409](https://github.com/google-gemini/gemini-cli/pull/25409) | **Access to the new ContextManager**: Unified chat history and subject management, laying the foundation for coherence in multiple rounds of dialogue | OPEN |
| [#25769](https://github.com/google-gemini/gemini-cli/pull/25769) | **Windows Shell Compatibility Enhancement**: Support `&&`, `||`, and `/dev/null`-equivalent redirection to improve cross-platform command compatibility | OPEN |
| [#25770](https://github.com/google-gemini/gemini-cli/pull/25770) | **fix A2A sets a shallow consolidation problem* *: shift to deep consolidation to ensure embedded configuration (e.g.`fileFiltering`) Right inheritance | OPEN |
| [#25426](https://github.com/google-gemini/gemini-cli/pull/25426) | **CI performance upgrade**: introduction of pre-constructed bookle parallel tests with 16 nuclear, significantly reducing the time for PR inspections | OPEN |

---

## 5. Trends in functional needs

- ** Agent behavioural reliability**: HF sub-agent status misreporting, permissions lapses, suspension of orders, etc. The community strongly calls for enhanced proxy enforcement monitoring and error recovery mechanisms.
- **Memory and subject management**: from`/note`Commands to the fourth level of memory show the urgent need for a more sophisticated, durable and audit-friendly retention capability.
- ** Cross-platform terminal compatibility**: SSH spun code, Windows shell operator support, screen reader fit, etc. Issue concentrated outbreak, reflecting multi-environmental adaptation still short panel.
- **configation system robust**:`settings.json`Neglected, issues such as shallow consolidation leading to loss of configuration highlight the need for the configuration engine to be re-constructed into a deep consolidation + certification mechanism.
- **security and risk control**: Data loss incidents (#2592) promote the prohibition of destructive operations (#22672) as a high priority need to introduce operational validation and rollback mechanisms.

---

## 6. Developer focus

- **permissions system is unreliable**: multiple feedbacks “allowing all sessions” are invalid, suspecting that the mission's cache is not sustainable or that the strategic engine is not correctly read.
- ** Agent lacks operational boundary awareness**: Model prefers to use especially in Git operations, file deletion etc.`--force`Wait for high-risk orders, lack of security cover.
- ** The quality and compatibility of terminal renderings**: Long output Cardon, SSH sprawl, lack of accessibility support, affecting the daily use experience of professional developers.
- ** Provisional document contaminated working area**: MOdel produces scattered scripts without automatic clean-up mechanism, contrary to the “clean submission” principle.
- **configuration coverage mechanism weak**: project level`settings.json`Frequently covered by global configuration, or embedded fields are lost, leading to the loss of the modicum.

> It is recommended that priority be given to the issue of **permissions sustainability** and ** proxy security**, both of which have a direct impact on user trust and the availability of the production environment.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Dynamic Daily (2026-04-22)

---

## 1. Today's Summary

GitHub Copilot CLI has produced two new versions (v1.0.35-0 and v1.0.35-2) over the past 24 hours, focusing on the automatic model switch logic and HTTP Hook support; community enthusiasm around issues such as **Opus Moder access anomalies**,**Agent name showing loss** and ** terminal rendering decline** reflects the high interest of users in modelstability and interactive experience.

---

## 2. Version

### v1.0.35-2 (latest)
- ** New **:`continueOnAutoMode`configuration, automatically switch to auto Model when speed limits
- **fix**: auto mode switch to do no more error reporting when not supporting current researching strength
- **fix**: Mode-specific command file (`.github/in...`) Relevant logical optimization

🔗 [Release v1.0.35-2](https://github.com/github/copilot-cli/releases/tag/v1.0.35-2)

### v1.0.35-0
- **New**: support HTTP Hook, allow the JSON load POST to specify URL (replace local command execution)
- Improved**:`grep`and`glob`Tools now support multi-path search
- **fix**: hidden sub-agent (subagent) reflection in timeline; custom proxy name restored to visibility in status bar

🔗 [Release v1.0.35-0](https://github.com/github/copilot-cli/releases/tag/v1.0.35-0)

---

## Community hot spots Issues (10 selected)

| # | Title | Why it matters | Community response |
|---|------|-----------|--------|
| [#222](https://github.com/github/copilot-cli/issues/222) | [ACP] Support | Promote standardized IDE/editor integration, analogue LSP for AI proxy | High heat (146), closed but triggered extensive discussion |
| [#223](https://github.com/github/copilot-cli/issues/223) | Organisation | Impact enterprise automation | 👍65, strong corporate interest |
| [#2625](https://github.com/github/copilot-cli/issues/2625) | The end rendering performance is severely reduced. | Carton is 30-45 seconds in long conversations, seriously affecting usability | User feedback is concentrated and needs to be optimized |
| [#2873](https://github.com/github/copilot-cli/issues/2873) | Copilot Pro subscriber suddenly unable to use Opus Model | Involving the failure of the payment function, triggering a crisis of confidence | New issues, urgent clearance. |
| [#2867](https://github.com/github/copilot-cli/issues/2867) | Claude Opus 4.6 (high) quota reset to "model not reported" | Model toggle logical defects, affecting the use of advanced users | Technical details are clear. Re-emergence path clear. |
| [#2777](https://github.com/github/copilot-cli/issues/2777) | Custom Agent name no longer appears | v1.0.27 → v1.0.31 reduction problem | Confirmed, part fix of v1.0.35 |
| [#1276](https://github.com/github/copilot-cli/issues/1276) | Supports pasting pictures from the system clipboard to CLI tips | Raise multimodal interactive experience | 👍7, mobile end/intercept scene required |
| [#2753](https://github.com/github/copilot-cli/issues/2753) | Plugin skills are not injected into the main Agent`<available_skills>` | Pluginecosystem is broken, marktplace skills cannot be called | Developer 's tool chain critical flaws |
| [#2792](https://github.com/github/copilot-cli/issues/2792) | Automatically switching between planning and implementation | Significant features of efficiency and cost optimization | 👍1, senior users present reasonable structure requirements |
| [#2888](https://github.com/github/copilot-cli/issues/2888) | Backstage job terminated but main Agent is still waiting | Caused the session to die, no response. | Today's new paper, which affects the continuity of user experience. |

---

## 4. PR Progress (selected 2 and no updates)

> Note: Only 2 PR updates in the last 24 hours are of practical value

| # | Title | Summary |
|---|------|--------|
| [#2887](https://github.com/github/copilot-cli/pull/2887) | Add security cleanup to the old version to install a binary file directly | Solve`install.sh`Backup of old binary after multiple installation, support opt-out |    
| [#2800](https://github.com/github/copilot-cli/pull/2800) | Add Initial | Improved development environment coherence to facilitate rapid local adaptation by contributors |

---

## 5. Trends in functional needs

From Issues analysis, the current focus of the community is as follows:

- **Modelstability and access controls**: Opus series model anomalies (#2873, #2867, #2878), auto model reassoning intensity compatibility (#2870) concentrated outbreaks, reflecting high user expectations of high-end model reliability.
- ** Terminal interactive experience optimization**: rendering performance (#2625), Agent name display (#2777), theme self-defined (#2830), diff readability (#2884), etc. UI/UX problems are frequent.
- ** Corporate integration and management of missions**: organizational-level Token missions visibility (#223), Windows sleep strategy interference (#2763) reflects the pain of the enterprise.
- **multimedial and input enhancement**: Photo pasting (#1276), Slash command path compatibility (#1068) drives CLI interactive evolution to wealth.
- **plugin and extended ecosystem**: skills injection failure (#2753) and MCP non-interactive mode missions (#2882) expose the lack of maturity of the extended mechanism.

---

## 6. Developer focus

- **High frequency pain points**:
  - Model toggle logical instability (particularly regarding researching effort and quotas)
  - Long-ssession down terminal Cardon is severe, affecting productivity.
  - Plugin function " Visible but not available " (skills not injected into system hints)

- ** Strong plea**
  - Modelconfigation (e.g., phased-in model)
  - Improve MCP and missions under non-interactive scenes (e. g. CI/CD)
  - Enhancement of observability (Agent status, mission life cycle management)

> It is recommended that the development team prioritize the fix **Opus Moder access anomaly** and ** terminal rendering performance**, both of which directly affect core user experience and the credibility of the pay function.

---  
*Source: GitHub.com/github/copilot-cli * Generating: 2026-04-22*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Daily Community Dynamic (2026-04-22)

---

## 1. Today's Summary

Today's community focus is on ** terminal compatibilityfix** and ** multiplatforms are optimized** and several key bugs are submitted and responded quickly. The developer's concerns about the K2.6 model experience continue to ferment, while the issues of terminal hanging in Windows and WSL2 settings, and anomalies in the system are the focus of discussion.

---

## 2. Version

No new version is available.

---

## Community hotspots Issues

| ID | Title | Why it matters | Community response |
|------|------|-----------|----------|
| [#1925](https://github.com/MoonshotAI/kimi-cli/issues/1925) | Kimi K2.5 vs K2.6 model toggle demand | Strong user feedback K2.6 Model "lost personality" and increased hallucinations calling for K2.5 support to be restored | 6 Comments, negative moods, reflecting model-overtime influence of user experience |
| [#1984](https://github.com/MoonshotAI/kimi-cli/issues/1984) | Hang up and MCP connection leak on terminal exit | After long session`/exit`Resulting in terminal non-response and risk of resource leakage | 1 Comment, linked PR #1985 Quickfix |
| [#1961](https://github.com/MoonshotAI/kimi-cli/issues/1961) | Windows Down`/login`Error Reporting "No Support Windows" | Cross-platform compatibility issues that hinder Windows users | 3 Comments on installation breaking with the process |
| [#1971](https://github.com/MoonshotAI/kimi-cli/issues/1971) | An error occurred while TUN mode was enabled | Could not close temporary folder:%s | Comment, but critical network adaptation |
| [#1969](https://github.com/MoonshotAI/kimi-cli/issues/1969) | WinError 17 unusual at Windows installation | Atom file writing incompatible on Windows | Comment, influence basic installation process |
| [#1967](https://github.com/MoonshotAI/kimi-cli/issues/1967) | JetBrains cannot initialize the ACP process | IDE integration failed, affecting the use of mainstream development environment | Comment, but in relation to Jetbrains ecosystem support |
| [#1973](https://github.com/MoonshotAI/kimi-cli/issues/1973) | Frequent insertion of empty message tips | Interference experience, suspected state machine logic error | Comment, but the question is clear and recurring |
| [#1977](https://github.com/MoonshotAI/kimi-cli/issues/1977) | Tool Call Message Structure violates Anthropic API norms | Technical debt group Bug, influence bottom agreement compliance | Comment, developer reports, structured |
| [#1962](https://github.com/MoonshotAI/kimi-cli/issues/1962) | Cannot index vendor directory file | Impact analysis capacity for projects such as Go/PHP | 1 Comment, functional limitation category needs |
| [#1560](https://github.com/MoonshotAI/kimi-cli/issues/1560) | Skyll Interactive Optimization for VSCode Plugin | Current Skill directly initiate request after selection, lack input continuity | 2 comments, 3 👍, UX improve voice |

---

## 4. Significant PR progress

| ID | Title | Feature/fix content |
|------|------|---------------|
| [#1985](https://github.com/MoonshotAI/kimi-cli/pull/1985) | Fix terminal exits to hang up leak with MCP | Solve resource leakage through non-stop TTY reading and visible closing MCP connections |
| [#1978](https://github.com/MoonshotAI/kimi-cli/pull/1978) | fix Anthropic provider parallel tool result split problem | Merge more than one tool result as a single user message that meets the API standard |
| [#1979](https://github.com/MoonshotAI/kimi-cli/pull/1979) | Send approval cancellation feedback to ApprovalResult | Improve misleading tips for "denied by users" in the time-out scene |
| [#1960](https://github.com/MoonshotAI/kimi-cli/pull/1960) | Introduction of the RalphFlow architecture to support interim context and containment testing | Prevent infinity loops and enhance multistep workflowstability |
| [#1972](https://github.com/MoonshotAI/kimi-cli/pull/1972) | Add a colour progress bar to display current status | Raise terminal visualization experience to mark claude-hud style |
| [#1957](https://github.com/MoonshotAI/kimi-cli/pull/1957) | list sessions | Solve the loss of the history of the session in the Zed editor |
| [#1935](https://github.com/MoonshotAI/kimi-cli/pull/1935) | Support PreTooluse hooks to rewrite commands by updatingInput | Rewrite transparent commands to provide extension capabilities for proxy tools (e.g., rtk) |
| [#1963](https://github.com/MoonshotAI/kimi-cli/pull/1963) | Allow PreToolUSe to modify tool input | Supplement #1935, increase the flexibility of the hook system |
| [#1832](https://github.com/MoonshotAI/kimi-cli/pull/1832) | Fix UserPromptSubmit Lost hook | Solve the problem that third party plugin cannot capture real user input |
| [#1784](https://github.com/MoonshotAI/kimi-cli/pull/1784) | Add AWS Bedrock Mantle Platform Support | Extension`/login`Process to AWS ecology, enhance cloud compatibility |

---

## 5. Trends in functional needs

- **Model opposability**: Users are dissatisfied with K2.6 Model and strongly request a retreat or switch to K2.5 (# 1925), reflecting high expectations of model behaviour consistency and “personalization” output.
- ** Cross-platform status**: Windows, WSL2, installation in Jetbrains environment, installation, terminal control problem clustering (#1961, #1969, #1967, #1965), highlighting that cross-platform adaptation remains short.
- ** IDE Integrated Experience Optimization**: VSCode and Jetbrains plugin ' s interactive logic (#1560, #1968), session management (#1957) is the focus, and developers expect more fluid context perception and input control.
- ** Terminal UX Enhancement **: Colour themes (#1981,#1982), progress bars (#1972), voice input (#1934) etc.
- ** Automation and agency capacity**: topics such as the RalphFlow architecture (#1960), the refinement of the YOLO model (#1966) and sub-agentancies (#1983) show the evolution of communities towards more autonomous and stable agent.

---

## 6. Developer focus

- ** Terminal status**: Quit hanging, TTY blockage, MCP connection leaks, etc. are frequent, affecting confidence in the use of the production environment.
- **Authentity and Web Compatibility**: OAuth Sub-agent Failed, TUN Mode 401, Windows Installation Discrepancies, etc., expose the vulnerability of processes and webcades.
- **Rink system extension**: multiple PRs (#1935, #1963, #1832) have been improved around the hook mechanism, showing that developers are actively building plugin ecosystem, requiring official provision of more stable extended interfaces.
- **Model Behavior Consistency**: K2.6 has triggered negative feedback signals that Model updates need to be balanced with performance and user experience and avoid the paradox of “the more functional, the less usable”.

---  
*Source: GitHub.com/MoonshotAI/kimi-cli * Generating: 2026-04-22*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Dynamic Daily (2026-04-22)

---

## 1. Today's Summary

OpenCode today releasing v1.14.20, fixes on key issues such as TUI thematic retreats, Windows Dynamic Imports and personalizations responses; community focus on compatibility (e.g. Opus 4.6, Qwen3-Coder), tool calling reliability and multi-platform stability, multiple high-heat Issue reflection tools to implement “sham success” and subscription billing anomalies.

---

## 2. Version

**v1.14.20** Released, mainly updated:
- **Core**: fix TUI system theme retreat; new experimental HTTP API interface`GET /config`;fix Windows local dynamic import failure in the Node environment, enhance plugin and tools to load status.
- ** TUI**: fix remote workspace files reply to the wrong target.

> [Release v1.14.20](https://github.com/anomalyco/opencode/releases/tag/v1.14.20)

---

## Community hotspots Issues

| Issue | Why it matters | Community response |
|------|-----------|--------|
| [#13768](https://github.com/anomalyco/opencode/issues/13768)Opus 4.6 does not support | Impact Claude Opus 4.6 Normal, frequent interruption of dialogue process | 60 comments, 23 👍, strong user feedback |
| [#6918](https://github.com/anomalyco/opencode/issues/6918)qwen3-coder cannot call edit tool | Failed to verify parameter type leading to a tool calling crash | 45 comments, 24 👍, long outstanding |
| [#7030](https://github.com/anomalyco/opencode/issues/7030)Ollama + qwen2.5-coder tool calling no actual document change | The tool "fake execution" seriously undermines the development of trust | 19 comments, 18 |
| [#22135](https://github.com/anomalyco/opencode/issues/22135)Claude Max subscribe to incorrect deductions | The user is misdirected with “additional usage”, which involves costing logic | 5 Commentary, 2 |
| [#23079](https://github.com/anomalyco/opencode/issues/23079)Under Windows Claude Max Subscription "out of extra usage" | Billing issues with subscriptions, reproduced across platforms | 3 Comments |
| [#23658](https://github.com/anomalyco/opencode/issues/23658)Upgrade to 1.14.19 Post Terminal Background White | Theme rendering anomalies affect the user experience of dark patterns | 5 Comments, 7 |
| [#17516](https://github.com/anomalyco/opencode/issues/17516) `opencode run`Process does not exit after the tool calling | It's leaking resources. It's manual. | 13 comments, 6 |
| [#14194](https://github.com/anomalyco/opencode/issues/14194)Local sharing with Docker caused database damage | SQLite and write risks to influence the structure | 16 comments, 8 |
| [#23704](https://github.com/anomalyco/opencode/issues/23704)OpenRouter xAI/Grok tool`additionalProperties: false`Failed | Specific Model compatibility issues that impede the Glock integration | 4 Comments |
| [#22292](https://github.com/anomalyco/opencode/issues/22292)Environment variable bypasses hosting settings | The security strategy bypasses the loophole and affects the enterprise | 4 Comments |

---

## 4. Significant PR progress

| PR | Feature/fix content |
|----|---------------|
| [#23770](https://github.com/anomalyco/opencode/pull/23770) | Supports configuration tool output cut-off thresholds (lines/ByteDance) to enhance controlability of large output scenarios |
| [#23760](https://github.com/anomalyco/opencode/pull/23760) | Add an interactive terminal tool to support durability PTY session, breaking a single command limit |
| [#23766](https://github.com/anomalyco/opencode/pull/23766) | Disable`@ai-sdk/anthropic`. ToolStreaming, avoid proxygate parsing error |
| [#23768](https://github.com/anomalyco/opencode/pull/23768) | Optimizing icon overwrite logic in the item edit dialog, fix default pink hard encoding |
| [#18767](https://github.com/anomalyco/opencode/pull/18767) | Optimizing mobile end-to-end touch and increasing the operating experience of the touch screen device |
| [#13854](https://github.com/anomalyco/opencode/pull/13854) | fix finished messages are still marked as " current " resulting in incomplete table rendering |
| [#21349](https://github.com/anomalyco/opencode/pull/21349) | Allow cross-reference from AI message to enhance interactive flexibility |
| [#21343](https://github.com/anomalyco/opencode/pull/21343) | fix LLM automatically bounces back when rolling history messages during streaming response |
| [#21347](https://github.com/anomalyco/opencode/pull/21347) | Ensure that the macOS bash tool contains standard PATH (e. g.)`/opt/homebrew/bin`） |
| [#12042](https://github.com/anomalyco/opencode/pull/12042) | Provide plugin SDK v2 to support gradual migration and avoid disruptive changes |

---

## 5. Trends in functional needs

- **Model Compatibility Extension**: Community strongly calls for support for more reasoning Mode (e.g. the Mistral Small model, Kimi K2.6) and optimization of existing models (Opus 4.6, Qwen series) tool calling status.
- **Interactive tool enhancement**: the increased demand for advanced interactive capabilities such as end-to-end, voice input, image trigger analysis reflects the development community's desire to be closer to the “agent development” experience.
- ** The high frequency of conflicts between the multiplatforms and the disaster situation**: Windows/WSL2 collapse, old CPU compatibility (AVX2), and Docker reconciliation highlight the urgent need to strengthen the cross-platform.
- **Enterprise-glade control**: the need for hosting settings bypassed, Fratpak packs, personalizationsaudit, etc., indicates an increase in the number of business users and increased attention to security community and standardization.

---

## 6. Developer focus

- **tool calling reliability**: multiple Issue reflection tools "show success but no real effect" (e.g. uncreated file, error of edit parameters) seriously hamper automated processes.
- ** Subscriptions and bill integration deficiencies**: Claude Max users are generally subject to miscalculation, suggesting a gap in OpenCode 's synchronization mechanism with the Anthropic billing system.
- ** TUI Rendering and Interactive Experiences**: Thematic anomalies, rollbacks, failure of buttons, etc.
- **plugin and extension capacity is inadequate**: advanced functions such as voice input, custom LSP, dynamic tool registration are difficult to achieve due to SDK or structural limitations, and developers call for more open extension mechanisms.

--- 

*Source:[anomalyco/opencode](https://github.com/anomalyco/opencode)• Generated at: 2026-04-22*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Daily Community Dynamic (2026-04-22)

---

## 1. Today's Summary

Today, several preview versions of Qwen Code review (v0.14.5-preview.0, v0.15.0-preview) focus on enhancing the ACP integrated hooks support and compact mode UX optimization; community-based feedback on authentation errors (401), while promoting compatibility support for third-party models (e.g. GLM) and domestic Chinese searches for API.

---

## 2. Version

**v0.14.5-preview.0 / v0.14.5-nightly.20260422 / v0.15.0-preview.1**  
- ✅ Add full ACP integrated hook support (`complete hooks`Improved automated process extension
- Optimizing compact mode user experience: shortcut response, setting up synchronization and security strategy improvements
- 🔗 Introduction of initial HTTP Hook support to pave the way for follow-up Webbook and event-driven architecture
> Related PR:[#3248](https://github.com/QwenLM/qwen-code/pull/3248)、[#3100](https://github.com/QwenLM/qwen-code/pull/3100)

---

## Community hotspots Issues

| ID | Title | Importance | Community response |
|------|------|--------|----------|
| [#3496](https://github.com/QwenLM/qwen-code/issues/3496) | Do webSearch support domestic searches for API (e.g. Alibaba Bailian, GLM)? | ⭐⭐⭐⭐ | Users are strongly calling for compatibility of domestic Chinese API to avoid restrictions on overseas services |
| [#3501](https://github.com/QwenLM/qwen-code/issues/3501) | Continuous 401 error, invalid login | ⭐⭐⭐⭐⭐ | Multi-user reporting on the same issues affecting the use of core functions |
| [#2409](https://github.com/QwenLM/qwen-code/issues/2409) | Request alignment of subagent system to Claude Code capability | ⭐⭐⭐⭐ | Developer wants to increase mutri-agent collaboration maturity |
| [#3464](https://github.com/QwenLM/qwen-code/issues/3464) | Third-party model (e.g., GLM-5) displaying “mention”, tool calling failed | ⭐⭐⭐⭐ | Reflects uneven model suitability and influences the ecosystem extension |
| [#3447](https://github.com/QwenLM/qwen-code/issues/3447) | No automatic compression after context bursting, resulting in Carton | ⭐⭐⭐⭐ | There are significant performance bottlenecks in the long mission scenario. |
| [#3274](https://github.com/QwenLM/qwen-code/issues/3274) | `/auth`Missing command, unable to easily conformation API Key | ⭐⭐⭐ | CLI Easy Sufferer, OpenCode lags behind |
| [#3010](https://github.com/QwenLM/qwen-code/issues/3010) | Is there Python SDK? | ⭐⭐⭐ | Developer ecosystem construction critical needs |
| [#2487](https://github.com/QwenLM/qwen-code/issues/2487) | Missing embedded command to clear chat history | ⭐⭐⭐ | Inadequate management of session |
| [#3110](https://github.com/QwenLM/qwen-code/issues/3110) | Strongly advised CLI to support voice input`/voice` | ⭐⭐ | Improved interactivity, especially for high frequency users |
| [#3503](https://github.com/QwenLM/qwen-code/issues/3503) | Inconsistent key value for translation files in Chinese and English | ⭐⭐ | i18n Maintenance issues affecting internationalization experience |

---

## 4. Significant PR progress

| PR Number | Feature/fix content | Status |
|--------|----------------|------|
| [#3502](https://github.com/QwenLM/qwen-code/pull/3502) | Add GLM (Zhipu AI AI) Web Search program support | 🟢 Open |
| [#3494](https://github.com/QwenLM/qwen-code/pull/3494) | Achieve Python SDK, responding to #3010 needs | 🟢 Open |
| [#3508](https://github.com/QwenLM/qwen-code/pull/3508) | Limit Inline Shell Output Lines, Avoid Terminal Screening | 🟢 Open |
| [#3455](https://github.com/QwenLM/qwen-code/pull/3455) | Will`@`File Search Index to Worker Thread to address main thread blocking | 🟢 Open |
| [#3471](https://github.com/QwenLM/qwen-code/pull/3471) | Support parent Agent Time Control Sub-Agent | 🟢 Open |
| [#3505](https://github.com/QwenLM/qwen-code/pull/3505) | Refusing token cut-in write file call | 🟢 Open |
| [#3377](https://github.com/QwenLM/qwen-code/pull/3377) | Slash command multi-modal extension (support non-interactive/ACP mode) | 🟢 Open |
| [#3093](https://github.com/QwenLM/qwen-code/pull/3093) | Session Rename, Delete and Automatic Title Generation | 🟢 Open |
| [#3318](https://github.com/QwenLM/qwen-code/pull/3318) | Preconnect API at startup, lower first call delay | 🟢 Open |
| [#3214](https://github.com/QwenLM/qwen-code/pull/3214) | Use`git ls-files` + `ripgrep`Replace fdir, enhance file search compatibility with.gitignore | 🟢 Open |

---

## 5. Trends in functional needs

- ** Third party model and tool integration**: GLM, ByteDance and so on, domestic Chineselarge model supports high-profile calls, and Web Search multiprovider adapts to priority directions.
- ** IDE Consistency with CLI**: VS Code Plugin in order to provide support for command (e. g.`/auth`、`/export`There is an urgent need to align CLI capabilities.
- **session and task management**: Auto-context compression, protracted re-testing, session naming/cleaning functions become high frequency requirements, reflecting user-to-process automation of dependency.
- ** Developer experience optimization**: functions such as Python SDK, voice input, output folding, token consumption visualization, etc. to improve development efficiency continue to be proposed.
- **stability and error processing**: 401 error, lack of tool calling parameters, process crashes need to be given priority fix.

---

## 6. Developer focus

- **Authorization process unstable**: large number of users encountered`401 invalid access token`, even if reloading or restarting could not be resolved, the suspected token refreshing mechanism deficiencies.
- **CLI compilation is cumbersome**: API Key needs manual editing`settings.json`, lack of interactive setting orders (e. g.`/auth`The experience is far behind the competition.
- ** Long mission poor performance**:context piles are not automatically compressed,`/compress`Could not close temporary folder:%s
- ** There is insufficient third-party model compatibility**: non-Qwen official model (e.g. GLM) has a “mentional” phenomenon and a high failure rate of tool calling.
- ** Document lags with i18n maintenance**: OpenTelemetry integration is vague and the key value of the translated document is not synchronized.

> It is recommended that priority be given to the issues of financialization and subject management, while accelerating the integration of Python SDK and statistical Chinese API to enhance the attractiveness of ecosystem.

</details>

---
* The present daily report is issued without formal editing.[Big Model Radar](https://github.com/gsscsd/big_model_radar)Auto-generated.*
