/**
 * Loads and validates Big Model Radar configuration from config.yml.
 * Falls back to built-in defaults if the file is missing or a section is absent.
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { RepoConfig } from "./github.ts";

// ---------------------------------------------------------------------------
// Schema types
// ---------------------------------------------------------------------------

interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

interface RawConfig {
  cli_repos?: RawRepoEntry[];
  skills_repo?: string;
  first_party_agents?: RawRepoEntry[];
  peer_agents?: RawRepoEntry[];
  openclaw?: RawRepoEntry;
  openclaw_peers?: RawRepoEntry[];
}

export interface RadarConfig {
  cliRepos: RepoConfig[];
  skillsRepo: string;
  firstPartyAgents: RepoConfig[];
  peerAgents: RepoConfig[];
}

// ---------------------------------------------------------------------------
// Defaults (mirrors the original hard-coded values)
// ---------------------------------------------------------------------------

const DEFAULT_CLI_REPOS: RepoConfig[] = [
  { id: "claude-code", repo: "anthropics/claude-code", name: "Claude Code" },
  { id: "codex", repo: "openai/codex", name: "OpenAI Codex" },
  { id: "gemini-cli", repo: "google-gemini/gemini-cli", name: "Gemini CLI" },
  { id: "copilot-cli", repo: "github/copilot-cli", name: "GitHub Copilot CLI" },
  { id: "kimi-cli", repo: "MoonshotAI/kimi-cli", name: "Kimi Code CLI" },
  { id: "opencode", repo: "anomalyco/opencode", name: "OpenCode" },
  { id: "qwen-code", repo: "QwenLM/qwen-code", name: "Qwen Code" },
];

const DEFAULT_SKILLS_REPO = "anthropics/skills";

const DEFAULT_FIRST_PARTY_AGENTS: RepoConfig[] = [
  { id: "openclaw", repo: "openclaw/openclaw", name: "OpenClaw", paginated: true },
  { id: "hermes-agent", repo: "NousResearch/hermes-agent", name: "Hermes Agent", paginated: true },
  { id: "zeroclaw", repo: "zeroclaw-labs/zeroclaw", name: "Zeroclaw" },
  { id: "moltis", repo: "moltis-org/moltis", name: "Moltis" },
];

const DEFAULT_PEER_AGENTS: RepoConfig[] = [
  { id: "picoclaw", repo: "sipeed/picoclaw", name: "PicoClaw", paginated: true },
  { id: "nanoclaw", repo: "qwibitai/nanoclaw", name: "NanoClaw" },
  { id: "copaw", repo: "agentscope-ai/CoPaw", name: "CoPaw" },
];

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

function toRepoConfig(e: RawRepoEntry): RepoConfig {
  return { id: e.id, repo: e.repo, name: e.name, ...(e.paginated ? { paginated: true } : {}) };
}

export function loadConfig(configPath = "config.yml"): RadarConfig {
  const resolved = path.resolve(configPath);

  let raw: RawConfig;
  try {
    raw = yaml.load(fs.readFileSync(resolved, "utf-8")) as RawConfig;
  } catch (err) {
    if ((err as { code?: string })?.code !== "ENOENT") {
      const detail = err instanceof Error ? err.message : String(err);
      throw new Error(`[config] Failed to load ${configPath}: ${detail}`);
    }
    console.log(`[config] ${configPath} not found — using built-in defaults.`);
    return {
      cliRepos: DEFAULT_CLI_REPOS,
      skillsRepo: DEFAULT_SKILLS_REPO,
      firstPartyAgents: DEFAULT_FIRST_PARTY_AGENTS,
      peerAgents: DEFAULT_PEER_AGENTS,
    };
  }

  const cliRepos =
    Array.isArray(raw?.cli_repos) && raw.cli_repos.length > 0
      ? raw.cli_repos.map(toRepoConfig)
      : DEFAULT_CLI_REPOS;

  const skillsRepo =
    typeof raw?.skills_repo === "string" && raw.skills_repo.trim()
      ? raw.skills_repo.trim()
      : DEFAULT_SKILLS_REPO;

  const firstPartyAgents =
    Array.isArray(raw?.first_party_agents) && raw.first_party_agents.length > 0
      ? raw.first_party_agents.map(toRepoConfig)
      : raw?.openclaw?.id && raw.openclaw.repo
        ? [
            toRepoConfig(raw.openclaw),
            ...DEFAULT_FIRST_PARTY_AGENTS.filter((cfg) => cfg.id !== raw.openclaw?.id),
          ]
        : DEFAULT_FIRST_PARTY_AGENTS;

  const peerAgents =
    Array.isArray(raw?.peer_agents) && raw.peer_agents.length > 0
      ? raw.peer_agents.map(toRepoConfig)
      : Array.isArray(raw?.openclaw_peers) && raw.openclaw_peers.length > 0
        ? raw.openclaw_peers.map(toRepoConfig)
        : DEFAULT_PEER_AGENTS;

  console.log(
    `[config] Loaded from ${configPath}: ` +
      `${cliRepos.length} CLI repos, ${firstPartyAgents.length} first-party agents, ${peerAgents.length} peer agents`,
  );

  return { cliRepos, skillsRepo, firstPartyAgents, peerAgents };
}
