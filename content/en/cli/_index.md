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
    - link: "mcp_server/"
      tag: "Documentation"
      text: "Datadog MCP Server"
---

## Overview

[Pup CLI][1] is a comprehensive, AI-agent-ready command-line interface that gives AI agents access to Datadog's observability platform. It exposes [Datadog's API surface][9] for use in AI agent workflows and automated pipelines.

Key features:

- **Self-discoverable commands**: Commands are structured so agents can navigate them without external documentation.
- **Structured output**: Responses are available in JSON and YAML for reliable parsing.
- **Scoped authentication**: OAuth2 and PKCE provide scoped access without long-lived API keys.
- **Broad product coverage**: Pup supports monitors, logs, metrics, RUM, security, and more.

<div class="alert alert-info">This page covers the Pup's core features. See the <a href="https://github.com/DataDog/pup/blob/main/README.md" target="_blank">Pup repository documentation</a> for the full list of features and commands.</div>

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

Download prebuilt binaries from the [latest release][2].

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

# Delete a dashboard
pup dashboards delete <DASHBOARD_ID> --yes
{{< /code-block >}}

## Supported product areas

Pup covers most major Datadog product surfaces. See the [command reference][3] for the canonical product-specific command list. You can also run `pup --help` (or `pup agent schema` for machine-readable output) for the live list of commands as built.

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

When Pup is invoked by an AI coding agent, it automatically switches to agent mode, which returns structured JSON responses optimized for machine consumption. Responses include metadata, error details, and hints. Agent mode also auto-approves confirmation prompts.

Agent mode is auto-detected for [supported coding agents][4] when their environment variable is set. You can also enable it explicitly with the `--agent` flag or by setting `FORCE_AGENT_MODE=1`.

## Additional features

Pup includes additional features that can be used in AI agent workflows—follow the links below for more information:

- [**Runbooks**][5]: `pup runbooks` is a local execution engine for YAML-defined operational procedures, encoding multi-step tasks using `pup`, shell, HTTP, and Datadog Workflow steps.
- [**Agent skills**][6]: Pup ships skills and domain agents embedded in the binary, installable to any AI coding assistant with `pup skills install`.
- [**ACP server**][7]: `pup acp serve` runs a local AI agent server that connects coding tools to Datadog Bits AI through ACP and OpenAI-compatible protocols.

## Authentication

Pup supports OAuth2 and API key authentication methods. OAuth2 is preferred; run `pup auth login` to authenticate through your browser. If OAuth2 is not available, Pup falls back to API keys (`DD_API_KEY` and `DD_APP_KEY`). See the [authentication documentation][8] for details.

## Global flags

| Flag | Description |
|------|-------------|
| `-o, --output` | Output format (`json`, `table`, `yaml`). Default: `json` |
| `-y, --yes` | Skip confirmation prompts for destructive operations |
| `--agent` | Enable agent mode |
| `--no-agent` | Disable agent mode |
| `--read-only` | Block all write operations (create, update, delete) |
| `--org <org>` | Use a named org profile for multi-account workflows (run `pup auth login --org` to set up) |
| `-h, --help` | Print help |

## Environment variables

| Variable | Description |
|----------|-------------|
| `DD_ACCESS_TOKEN` | Bearer token for [stateless authentication][10] |
| `DD_API_KEY` | Datadog API key (optional if using OAuth2 or `DD_ACCESS_TOKEN`) |
| `DD_APP_KEY` | Datadog application key (optional if using OAuth2 or `DD_ACCESS_TOKEN`) |
| `DD_SITE` | Datadog site (default: `datadoghq.com`) |
| `DD_AUTO_APPROVE` | Auto-approve destructive operations (`true`/`false`) |
| `DD_TOKEN_STORAGE` | Token storage backend (`keychain` or `file`, default: auto-detect) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/pup
[2]: https://github.com/DataDog/pup/releases/latest
[3]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
[4]: https://github.com/DataDog/pup/blob/main/README.md#agent-mode
[5]: https://github.com/DataDog/pup/blob/main/README.md#runbooks
[6]: https://github.com/DataDog/pup/blob/main/README.md#agent-skills
[7]: https://github.com/DataDog/pup/blob/main/docs/EXAMPLES.md#acp-server-ai-agent-integration
[8]: https://github.com/DataDog/pup/blob/main/README.md#authentication
[9]: /api/latest/
[10]: https://github.com/DataDog/pup#bearer-token-authentication-wasm--headless
