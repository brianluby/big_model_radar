# Big Model Radar Roadmap

Big Model Radar should evolve from an automated digest generator into an AI ecosystem intelligence console: a reliable place to understand what changed, why it matters, and which projects, companies, and topics deserve attention.

## Product Goals

- Make daily AI ecosystem changes easy to scan and trust.
- Turn the historical archive into a useful research surface.
- Expose the same intelligence through the Web UI, RSS, Telegram, GitHub Issues, and MCP.
- Keep the project simple to self-host and configure.

## User Segments

Primary focus:

- The project maintainer and operators who need a reliable daily intelligence pipeline.
- Regular readers who use the Web UI, RSS, Telegram, GitHub Issues, or MCP to follow AI ecosystem changes.

Secondary focus:

- AI tool builders, developers, researchers, and analysts who benefit from source-backed historical reports.

Explicitly deprioritized for now:

- Team workflows, collaborative annotations, private workspaces, and hosted multi-tenant product features.
- Deep personalization for many different user profiles.

## Roadmap Themes

### 1. Reliability and Trust

Users need to know whether a report is complete, which sources succeeded, and whether generated content is grounded in source data.

| Priority | Initiative | User Value | Implementation Notes |
| --- | --- | --- | --- |
| P0 | Normalize report identifiers | Prevent broken links and inconsistent labels across surfaces | Align `ai-cli`, `ai-cli-en`, and `ai-cli-zh` handling in generated files, `manifest.json`, Web UI, RSS, and MCP |
| P0 | Source health dashboard | Make each run's completeness visible | Store GitHub, Hacker News, sitemap, LLM, RSS, Telegram, and MCP status in run metadata |
| P0 | Report quality guardrails | Reduce low-signal or unsupported summaries | Add checks for empty sections, duplicate claims, missing source references, and failed LLM output |
| P1 | Source freshness indicators | Help readers understand data recency | Display generated time, source windows, and last successful fetch per report |

### 2. Reader Experience

The Web UI should help users identify the important signals before opening full reports.

| Priority | Initiative | User Value | Implementation Notes |
| --- | --- | --- | --- |
| P0 | Better archive search | Make historical reports genuinely useful | Return matching reports, snippets, dates, and direct links instead of only highlighting matching days |
| P1 | Today dashboard | Give users an immediate summary of the latest run | Show top signals, hot repos, key vendors, source counts, and report shortcuts |
| P1 | Topic and report filters | Help users narrow the archive quickly | Add filters for report type, topic, language, source, and date range |
| P1 | Shareable report sections | Improve distribution and collaboration | Add stable heading anchors, copy-link controls, and richer page metadata |
| P2 | Trend visualizations | Reveal momentum over time | Chart stars, repo rank, topic frequency, company mentions, and source volume |

### 3. Alerts and Lightweight Customization

Big Model Radar should prioritize broad distribution and simple configuration before deep personalization.

| Priority | Initiative | User Value | Implementation Notes |
| --- | --- | --- | --- |
| P1 | Expanded notification channels | Reach users where they already work | Add Slack, Discord, email, and generic webhook notifications alongside Telegram |
| P2 | Maintainer watchlists | Let the operator emphasize specific repos, companies, topics, or keywords | Extend `config.yml` with watched entities and alert thresholds |
| P3 | Custom alert summaries | Reduce noise from full daily digests | Generate focused alerts for configured watchlist matches |

### 4. Intelligence Layer

The product should move beyond daily summaries toward structured, queryable intelligence.

| Priority | Initiative | User Value | Implementation Notes |
| --- | --- | --- | --- |
| P1 | Entity extraction | Enable better search, filtering, and MCP queries | Extract products, companies, repositories, models, frameworks, and topics during generation |
| P2 | Trend history store | Make longitudinal analysis possible | Persist structured daily metrics in JSON sidecars or a lightweight data directory |
| P2 | Signal scoring | Help users prioritize what matters | Score items by novelty, source credibility, engagement, and relevance to configured topics |
| P2 | Cross-report synthesis | Connect related events across sources | Link GitHub activity, official announcements, HN discussion, and trending repos when they reference the same entity |
| P3 | Competitive intelligence views | Support product and strategy decisions | Add comparison pages for tools, vendors, categories, and ecosystem momentum |

### 5. API and MCP Surface

MCP should expose structured access to the intelligence layer, not only raw Markdown reports.

| Priority | Initiative | User Value | Implementation Notes |
| --- | --- | --- | --- |
| P1 | MCP data contract cleanup | Make MCP responses predictable for clients | Use the same report identifiers and labels as the manifest and Web UI |
| P2 | Structured MCP responses | Make agent queries easier to consume | Add JSON output for reports, search results, entities, topics, and source metadata |
| P2 | Topic and entity search tools | Let agents ask targeted questions | Add MCP tools such as `search_topics`, `get_entity_timeline`, and `get_top_signals` |
| P3 | Pagination and result ranking | Support larger archives | Add cursors, date ranges, relevance scoring, and report-type filters |

### 6. Self-Hosting and Configuration

The project should stay easy to fork, configure, and operate.

| Priority | Initiative | User Value | Implementation Notes |
| --- | --- | --- | --- |
| P1 | Config validation | Catch setup errors before scheduled runs fail | Validate `config.yml`, environment variables, and report language settings in CI |
| P1 | Setup diagnostics | Make first-run troubleshooting easier | Add a dry-run command that checks secrets, API access, source reachability, and output paths |
| P2 | Source plugin structure | Make new sources easier to add | Move source-specific fetchers behind a typed source interface |

## Suggested Sequence

### Phase 1: Foundation

Target: next 2 weeks.

- Normalize report naming across generated files, `manifest.json`, Web UI, RSS, and MCP.
- Add source and run health metadata.
- Upgrade Web UI search to return snippets and report links.
- Add basic report validation before publishing.

### Phase 2: Better Reader Experience

Target: weeks 3-6.

- Build the Today dashboard.
- Add report-type, topic, and source filters.
- Add stable section links and copy-link controls.
- Add Slack, Discord, email, and webhook notification options.

### Phase 3: Intelligence Layer

Target: weeks 7-12.

- Persist topic, entity, and trend history.
- Add entity extraction for companies, products, repositories, models, and frameworks.
- Introduce signal scoring.
- Expand MCP tools around topic and entity queries.

### Phase 4: Productization

Target: later.

- Add maintainer-managed watchlists and custom alert summaries.
- Add source plugins and setup diagnostics.

## Deprioritized Ideas

These ideas may become useful later, but they should not compete with the near-term work on reliability, search, reader experience, structured intelligence, and MCP.

- Team annotations, shared workspaces, and saved collaborative briefs.
- Hosted or multi-tenant self-service setup.
- Role-specific onboarding for many user personas.
- Deep per-user personalization, accounts, preferences, and private feeds.
- Enterprise-style administration, permissions, billing, or organization management.

## Success Metrics

- Successful scheduled run rate.
- Percentage of reports with complete source metadata.
- Weekly active Web UI readers.
- RSS, Telegram, and notification subscribers.
- MCP tool calls per week.
- Search usage and search result click-through rate.
- Source link click-through rate from reports.
- Number of configured custom sources or maintainer watchlist entries per deployment.

## Immediate Next Bets

1. Fix the data contract between digest files, `manifest.json`, Web UI, RSS, and MCP.
2. Add source health metadata so users can trust each run.
3. Improve archive search because it compounds the value of every historical digest.
4. Build a Today dashboard once the metadata contract is stable.
