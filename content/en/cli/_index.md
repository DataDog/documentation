---
title: Pup CLI
description: "Use the Pup command-line interface to interact with Datadog APIs from the terminal or AI agent workflows."
further_reading:
    - link: "https://github.com/DataDog/pup"
      tag: "GitHub"
      text: "Pup CLI repository"
    - link: "https://github.com/DataDog/pup/blob/main/README.md"
      tag: "GitHub"
      text: "Full Pup CLI documentation"
    - link: "https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md"
      tag: "GitHub"
      text: "Command reference"
    - link: "bits_ai/mcp_server/"
      tag: "Documentation"
      text: "Datadog MCP Server"
---

## Overview

[Pup CLI][6] is a comprehensive, AI-agent-ready command-line interface that gives AI agents access to Datadog's observability platform. It exposes Datadog's API surface for use in AI agent workflows and automated pipelines.

Key features:

- **Self-discoverable commands**: Commands are structured so agents can navigate them without external documentation.
- **Structured output**: Responses are available in JSON and YAML for reliable parsing.
- **Scoped authentication**: OAuth2 + PKCE for scoped access without long-lived API keys.
- **Broad product coverage**: Supports monitors, logs, metrics, RUM, security, and more.

<div class="alert alert-info">This page covers the Pup's core features. See the <a href="https://github.com/DataDog/pup/blob/main/README.md">Pup repository documentation</a> for the full list of features and commands.</div>

## Installation

### Homebrew (macOS/Linux)

{{< code-block lang="bash" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
{{< /code-block >}}

### Build from source

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/pup.git && cd pup
cargo build --release
cp target/release/pup /usr/local/bin/pup
{{< /code-block >}}

### Manual download

Download pre-built binaries from the [latest release][1].

## Usage examples

{{< code-block lang="bash" >}}
# Log in to Datadog
pup auth login

# List monitors filtered by tag
pup monitors list --tags="team:api-platform"

# Search logs for errors in the last hour
pup logs search --query="status:error" --from="1h"

# Query CPU metrics
pup metrics query --query="avg:system.cpu.user{*}" --from="1h"

# Get dashboard details
pup dashboards get <DASHBOARD_ID>
{{< /code-block >}}

## Supported product areas

Pup covers most major Datadog product surfaces. See the [command reference][2] for the canonical command list, or run `pup --help` (or `pup agent schema` for machine-readable output) for the live list of commands as built.

| Category | Examples |
|----------|----------|
| Core Observability | Metrics, logs, events, RUM, APM, traces |
| Monitoring and Alerting | Monitors, dashboards, SLOs, synthetics, downtimes, workflows |
| Security and Compliance | Security rules, signals, findings, audit logs, CSM threats |
| Infrastructure and Cloud | Hosts, tags, containers, network, AWS/GCP/Azure integrations |
| Incident and Operations | Incidents, on-call, case management, error tracking, service catalog |
| CI/CD and Development | CI visibility, test optimization, DORA metrics, deployment gates |
| Organization and Access | Users, API keys, application keys, organizations |
| Platform and Configuration | Usage metering, cost management, feature flags, observability pipelines |

## Agent mode

When Pup is invoked by an AI coding agent, it automatically switches to agent mode, which returns structured JSON responses optimized for machine consumption (including metadata, error details, and hints). Agent mode also auto-approves confirmation prompts.

Agent mode is auto-detected when any of these environment variables are set to `1` or `true`:

{{% collapse-content title="Agent mode variables" level="h5" expanded=false id="id-for-anchoring" %}}
| Variable | Agent |
|----------|-------|
| `CLAUDE_CODE` or `CLAUDECODE` | Claude Code |
| `CURSOR_AGENT` | Cursor |
| `CODEX` or `OPENAI_CODEX` | OpenAI Codex |
| `GITHUB_COPILOT` | GitHub Copilot |
| `WINDSURF_AGENT` | Windsurf |
| `AIDER` | Aider |
| `CLINE` | Cline |
| `AMAZON_Q` or `AWS_Q_DEVELOPER` | Amazon Q |
| `GEMINI_CODE_ASSIST` | Gemini Code Assist |
| `SRC_CODY` | Sourcegraph Cody |
| `PI_CODING_AGENT` | pi.dev |
| `FORCE_AGENT_MODE` | Any agent (manual override) |
{{% /collapse-content %}}

You can also enable agent mode explicitly with the `--agent` flag or by setting `FORCE_AGENT_MODE=1`.

If you are integrating Pup into an AI agent workflow, make sure the appropriate environment variable is set so responses are optimized for your agent. Without it, Pup defaults to human-friendly output.

## Additional features

Pup includes additional features that can be used in AI agent workflows—follow the links below for more information:

- [**Runbooks**][3]: `pup runbooks` is a local execution engine for YAML-defined operational procedures, encoding multi-step tasks using `pup`, shell, HTTP, and Datadog Workflow steps.
- [**Agent skills**][4]: Pup ships skills and domain agents embedded in the binary, installable to any AI coding assistant with `pup skills install`.
- [**ACP server**][5]: `pup acp serve` runs a local AI agent server that connects coding tools to Datadog Bits AI through ACP and OpenAI-compatible protocols.

## Authentication

Pup supports OAuth2 and API key authentication methods. OAuth2 is preferred and is used automatically if you've logged in.

### OAuth2 authentication (preferred)

OAuth2 provides secure, browser-based authentication with automatic token refresh.

```bash
# Set your Datadog site (optional, defaults to datadoghq.com for US1)
export DD_SITE="{{< region-param key="dd_site" >}}"

# Login through browser
pup auth login

# Use any command - OAuth tokens are used automatically
pup monitors list

# Check status
pup auth status

# Logout
pup auth logout
```

Tokens are stored securely in your system's keychain (macOS Keychain, Windows Credential Manager, Linux Secret Service). Set `DD_TOKEN_STORAGE=file` to use file-based storage instead.

<div class="alert alert-info">OAuth2 requires Dynamic Client Registration (DCR) to be enabled on your Datadog site. If DCR is not available, use API key authentication.</div>

### API key authentication (fallback)

If OAuth2 tokens are not available, Pup automatically falls back to API key authentication.

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"  # Optional, defaults to datadoghq.com for US1
```

### Authentication priority

Pup checks for authentication in this order:
1. `DD_ACCESS_TOKEN` — Stateless bearer token (highest priority)
2. OAuth2 tokens (from `pup auth login`) — Used if valid tokens exist
3. API keys (from `DD_API_KEY` and `DD_APP_KEY`) — Used if OAuth tokens are not available


## Global flags

| Flag | Description |
|------|-------------|
| `-o, --output` | Output format (`json`, `table`, `yaml`). Default: `json` |
| `-y, --yes` | Skip confirmation prompts for destructive operations |

## Environment variables

| Variable | Description |
|----------|-------------|
| `DD_ACCESS_TOKEN` | Bearer token for stateless auth (highest priority) |
| `DD_API_KEY` | Datadog API key (optional if using OAuth2 or `DD_ACCESS_TOKEN`) |
| `DD_APP_KEY` | Datadog application key (optional if using OAuth2 or `DD_ACCESS_TOKEN`) |
| `DD_SITE` | Datadog site (default: `datadoghq.com`) |
| `DD_AUTO_APPROVE` | Auto-approve destructive operations (`true`/`false`) |
| `DD_TOKEN_STORAGE` | Token storage backend (`keychain` or `file`, default: auto-detect) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://github.com/DataDog/pup
[1]: https://github.com/DataDog/pup/releases/latest
[2]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
[3]: https://github.com/DataDog/pup/blob/main/README.md#runbooks
[4]: https://github.com/DataDog/pup/blob/main/README.md#agent-skills
[5]: https://github.com/DataDog/pup/blob/main/docs/EXAMPLES.md#acp-server-ai-agent-integration
