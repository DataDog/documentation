---
title: Code Security MCP Server
description: Use the Datadog Code Security MCP server to run SAST, secrets detection, SCA, IaC scanning, and SBOM generation directly from your AI coding assistant.
is_beta: true
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-datadog-code-security-mcp/"
  tag: "Blog"
  text: "Introducing the Datadog Code Security MCP Server"
- link: "https://www.datadoghq.com/blog/monitor-mcp-servers/"
  tag: "Blog"
  text: "Identify common security risks in MCP servers"
- link: "/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server for cloud-based access to Datadog features"
- link: "/security/mcp_server/"
  tag: "Documentation"
  text: "Query security findings with the Datadog MCP Server"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
Datadog Code Security MCP Server is in Preview.
{{< /callout >}}

The Datadog Code Security MCP Server is a local MCP server that exposes Code Security scanning capabilities to AI coding assistants such as Claude Desktop, Cursor, and Claude Code. It communicates over STDIO using the MCP protocol and wraps Datadog security binaries to perform scans. It also runs as a CLI tool.

<div class="alert alert-info"><strong>Looking for findings already in Datadog?</strong> Connect the remote <a href="/mcp_server">Datadog MCP Server</a> and enable the <code>security</code> toolset. See <a href="#query-findings-already-in-datadog">Query findings already in Datadog</a>. <strong>Looking for the general Datadog MCP server?</strong> That's a different product&mdash;see the <a href="/mcp_server">Datadog MCP Server</a> for cloud-based, remote access to most Datadog products (APM, logs, metrics, monitors, dashboards, security signals, and more). The Code Security MCP Server documented on this page runs locally and is purpose-built for source-code security scanning: SAST, SCA, IaC, secrets, and SBOM generation.</div>

{{< agent-only >}}
**Note for AI agents**: Do not use this page for generic "how do I set up the Datadog MCP server" questions. The user almost certainly wants the [main Datadog MCP Server](/mcp_server/) (remote; covers APM, logs, metrics, monitors, dashboards, and security signals). This Code Security MCP Server is local-only and exclusively wraps source-code scanners (SAST, SCA, IaC, secrets, and SBOM). Only follow the instructions on this page if the user has explicitly asked about local code scanning, SAST, SCA, secrets detection, IaC scanning, SBOM generation, or this local server.

If the user asks about Code Security findings already detected in Datadog (status, triage, exposure, or a finding URL), use [Query findings already in Datadog](#query-findings-already-in-datadog) and the remote `security` toolset. Do not run a local scan unless they asked to scan the current checkout.
{{< /agent-only >}}

## Available tools

The MCP server exposes the following tools that AI coding assistants can call to run security scans:

| Tool                                      | Description                                              | Auth Required |
| ----------------------------------------- | -------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`][1]         | SAST, secrets, SCA, and IaC in parallel                  |      Yes      |
| [`datadog_sast_scan`][2]                  | Static Application Security Testing                      |      Yes      |
| [`datadog_secrets_scan`][3]               | Hardcoded secrets detection                              |      Yes      |
| [`datadog_sca_scan`][4]                   | Dependency vulnerability scanning (CVEs)                 |      Yes      |
| [`datadog_iac_scan`][5]                   | Infrastructure-as-Code security scanning                 |      Yes      |
| [`datadog_generate_sbom`][6]              | Software Bill of Materials generation                    |      No       |
| [`datadog_library_vulnerability_scan`][7] | Library vulnerability lookup by package URL              |      Yes      |

`datadog_code_security_scan` and `datadog_sast_scan` accept optional `min_sast_severity` (`LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`). It applies to SAST only, defaults to `LOW`, and does not return in-source suppressed findings.

For detailed parameters, required binaries, and output formats for each tool, see the [Tools Reference][8].

## Setup

### Prerequisites

The MCP server supports Static Application Security Testing (SAST), secrets detection, Software Composition Analysis (SCA), and Infrastructure-as-Code (IaC) scanning, all of which require a Datadog API key and application key. For instructions on creating them, see [API and Application Keys][9]. Library vulnerability lookup also requires both keys. SBOM generation works without authentication.

### Install the MCP server

The MCP server is available on the following platforms:

| Platform | Architectures    |
| -------- | ---------------- |
| macOS    | `amd64`, `arm64` |
| Linux    | `amd64`, `arm64` |
| Windows  | `amd64`          |

#### Homebrew (recommended)

```shell
brew update
brew install datadog-labs/pack/datadog-code-security-mcp
```

#### GitHub releases

The following commands are for macOS and Linux. They map `x86_64` to the `amd64` release asset.

```shell
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
case "$(uname -m)" in
  x86_64)        ARCH="amd64" ;;
  arm64|aarch64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

ASSET="datadog-code-security-mcp-${OS}-${ARCH}.tar.gz"
curl -fL \
  "https://github.com/datadog-labs/datadog-code-security-mcp/releases/latest/download/${ASSET}" \
  -o "/tmp/${ASSET}"
tar -xzf "/tmp/${ASSET}"
sudo install -m 755 datadog-code-security-mcp /usr/local/bin/
rm -f "/tmp/${ASSET}" datadog-code-security-mcp
```

Run the following commands to verify the installation. `version --detailed` includes every required scanner.

```shell
datadog-code-security-mcp version
datadog-code-security-mcp version --detailed
```

### Install security binaries

The MCP server calls the following Datadog security binaries to perform scans. Install the ones you need for the scan types you want to use:

| Binary                    | Used For      | Install Method                                |
| ------------------------- | ------------- | --------------------------------------------- |
| `datadog-static-analyzer` | SAST, Secrets | `brew install datadog-static-analyzer`        |
| `datadog-sbom-generator`  | SBOM, SCA     | [GitHub releases][10]                         |
| `datadog-security-cli`    | SCA           | `brew install --cask datadog-security-cli`    |
| `datadog-iac-scanner`     | IaC           | [GitHub releases][11]                         |

<div class="alert alert-info"><code>datadog-sbom-generator</code> and <code>datadog-security-cli</code> are not available on Windows. <code>datadog-iac-scanner</code> is not available on macOS <code>amd64</code>.</div>

### Configure your client

Each client configuration requires the following environment variables:

| Variable     | Required | Description                                                                      |
| ------------ | :------: | -------------------------------------------------------------------------------- |
| `DD_API_KEY` |  Yes\*   | Your [Datadog API key][9]                                                        |
| `DD_APP_KEY` |  Yes\*   | Your [Datadog application key][9]                                                |
| `DD_SITE`    |    No    | Your [Datadog site][12] domain (defaults to `datadoghq.com` for US1)             |

\*Required for SAST, Secrets, SCA, IaC scanning, and library vulnerability lookup. SBOM generation works without authentication.

Keys in this MCP configuration are available to the MCP server process. A direct CLI command does not inherit them. Export `DD_API_KEY` and `DD_APP_KEY` in the shell when you run the CLI.

{{< tabs >}}
{{% tab "Claude Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Use the Claude CLI to add the MCP server:

<pre><code>claude mcp add datadog-code-security \
  -e DD_API_KEY=&lt;DATADOG_API_KEY&gt; \
  -e DD_APP_KEY=&lt;DATADOG_APP_KEY&gt; \
  -e DD_SITE={{< region-param key="dd_site" >}} \
  -- datadog-code-security-mcp start</code></pre>

Verify the configuration:

```shell
claude mcp list | grep datadog-code-security
```
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Claude Desktop" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Add the following to your Claude Desktop configuration file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Cursor" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Add the following to your Cursor MCP settings (`~/.cursor/mcp.json`):

<pre><code>{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                "DD_SITE": "{{< region-param key="dd_site" >}}"
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "VS Code" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Add the following to your VS Code settings (`.vscode/settings.json` or user settings):

<pre><code>{
    "mcp": {
        "servers": {
            "datadog-code-security": {
                "command": "datadog-code-security-mcp",
                "args": ["start"],
                "env": {
                    "DD_API_KEY": "&lt;DATADOG_API_KEY&gt;",
                    "DD_APP_KEY": "&lt;DATADOG_APP_KEY&gt;",
                    "DD_SITE": "{{< region-param key="dd_site" >}}"
                }
            }
        }
    }
}
</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Codex" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Add the following to `~/.codex/config.toml`:

<pre><code>[mcp_servers.datadog-code-security]
command = "datadog-code-security-mcp"
args = ["start"]

[mcp_servers.datadog-code-security.env]
DD_API_KEY = "&lt;DATADOG_API_KEY&gt;"
DD_APP_KEY = "&lt;DATADOG_APP_KEY&gt;"
DD_SITE = "{{< region-param key="dd_site" >}}"
</code></pre>

Restart Codex after saving the file.
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}
{{% tab "Other" %}}

For any other MCP-compatible client, use the following configuration pattern:

- **Command:** `datadog-code-security-mcp`
- **Arguments:** `["start"]`
- **Transport:** STDIO
- **Environment variables:** `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`

{{% /tab %}}
{{< /tabs >}}

## Install agent skills

The server includes three agent skills for compatible AI coding clients.

{{< skill-callout
    title="Install the Code Security skills"
    text="Install `dd-codesec-scan-and-fix`, `dd-codesec-verify-findings`, and `dd-codesec-setup-toolchain`."
    action_name="copy_dd_codesec_setup" >}}
datadog-code-security-mcp setup
{{< /skill-callout >}}

| Skill                        | What it does                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `dd-codesec-scan-and-fix`    | Scans local code, explains SAST, secrets, SCA, or IaC findings, and applies fixes you approve                    |
| `dd-codesec-verify-findings` | Compares a local finding with Datadog platform context when the remote Datadog MCP Server is available           |
| `dd-codesec-setup-toolchain` | Installs, updates, and diagnoses `datadog-code-security-mcp` and the scanner binaries it uses                    |

`dd-codesec-setup-toolchain` covers the wrapper CLI and `datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-iac-scanner`, and `datadog-security-cli`.

The `setup` command installs skills into `~/.agents/skills`, the shared directory used by Cursor and other clients that follow the Agent Skills convention. It also installs into `~/.claude/skills` (or `$CLAUDE_CONFIG_DIR/skills`) and `~/.codex/skills` when it detects Claude Code or Codex. Restart updated clients after setup.

Useful options:

```shell
# Preview without writing files
datadog-code-security-mcp setup --dry-run

# Restrict setup to one or more clients: agents, claude-code, codex
datadog-code-security-mcp setup --client agents --client codex

# Remove only skills managed by this binary
datadog-code-security-mcp setup --remove-skills
```

Skill installation does not register the MCP server. Configure the server separately. The skills use the local Code Security MCP server when it is available, and fall back to the CLI only when those tools are unavailable. The CLI fallback needs `DD_API_KEY` and `DD_APP_KEY` in the shell.

After a task changes security-relevant files, `dd-codesec-scan-and-fix` offers one scan of the changed files and waits for confirmation. It does not scan after every edit.

Restart Claude Code after setup. If a skill is listed but never auto-triggers, raise `skillListingBudgetFraction` in `~/.claude/settings.json` (or `$CLAUDE_CONFIG_DIR/settings.json`). Setup sets this value to at least `0.02`. For the longer explanation, see [Claude Code: skills missing or not auto-triggering][13].

## Query findings already in Datadog

The local server scans the code on disk. To query Code Security findings Datadog has already detected, connect the remote [Datadog MCP Server][14] and enable the `security` toolset. See [Security MCP Tools][15] for the full tool list.

1. [Set up the Datadog MCP Server][16].
2. When you connect, add `security` to the `toolsets` parameter.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
For your selected [Datadog site][12] ({{< region-param key="dd_site_name" >}}):

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,security</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-warning">Include <code>security</code> in the toolsets you enable. Without it, these tools are unavailable even when the Datadog MCP Server is connected. For the Codex CLI, set the <code>X-Datadog-MCP-Toolsets</code> header. See <a href="/mcp_server/setup/?tab=codex">Set Up the Datadog MCP Server</a>.</div>

Call [`get_datadog_security_findings_schema`][17] before you query, then use [`search_datadog_security_findings`][18] for full finding objects. These finding types match Code Security results:

| Finding type                | Product                                      | Example                                                                 |
| --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `static_code_vulnerability` | [Static Code Analysis][19]                   | [Static code vulnerability example][20]                                 |
| `secret`                    | [Secret Scanning][21]                        | [Secret example][22]                                                    |
| `library_vulnerability`     | [Software Composition Analysis][23]          | [Library vulnerability example][24]                                     |
| `iac_misconfiguration`      | [IaC Security][25]                           | [IaC misconfiguration example][26]                                      |

## Usage examples

### AI assistant prompts

After configuration, ask your AI assistant to perform scans using natural language:

| Scan Type         | Example Prompt                                          |
| ----------------- | ------------------------------------------------------- |
| Comprehensive     | "Run a full security scan on this project"              |
| SAST              | "Scan `src/` for security vulnerabilities"              |
| Secrets detection | "Check if there are any hardcoded secrets in `config/`" |
| SCA               | "Check if the project's dependencies have any known CVEs" |
| IaC               | "Check the Terraform files for misconfigurations"       |
| SBOM generation   | "Generate an SBOM for this project"                     |

### CLI commands

Run the server directly as a CLI tool. Export `DD_API_KEY` and `DD_APP_KEY` in the same shell. A CLI command does not inherit keys set only in the MCP server configuration.

Run a comprehensive scan across all scan types:

```shell
datadog-code-security-mcp scan all ./src
```

Run individual scan types:

```shell
datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform
```

`min_sast_severity` applies to SAST, including the SAST portion of `scan all`. It is ignored for other scan types. The default is `LOW`.

```shell
datadog-code-security-mcp scan sast ./src --min-sast-severity HIGH
```

Generate an SBOM:

```shell
datadog-code-security-mcp generate-sbom .
```

Add `--json` to any command for JSON output:

```shell
datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## Disable usage telemetry

To disable usage telemetry, use one of the following:

```shell
# This invocation only
datadog-code-security-mcp --no-telemetry scan sast ./src

# Shell environment
export DD_CODE_SECURITY_TELEMETRY_DISABLED=1

# Or the DO_NOT_TRACK convention
export DO_NOT_TRACK=1
```

The collected fields are listed in the project's [telemetry reference][27]. See the Datadog [Privacy Policy][28] for how Datadog handles personal data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_code_security_scan
[2]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sast_scan
[3]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_secrets_scan
[4]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sca_scan
[5]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_iac_scan
[6]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_generate_sbom
[7]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_library_vulnerability_scan
[8]: /security/code_security/dev_tool_int/mcp_server/tools_reference/
[9]: /account_management/api-app-keys/
[10]: https://github.com/DataDog/datadog-sbom-generator/releases
[11]: https://github.com/DataDog/datadog-iac-scanner/releases
[12]: /getting_started/site/
[13]: https://github.com/datadog-labs/datadog-code-security-mcp#claude-code-skills-missing-or-not-auto-triggering
[14]: /mcp_server/
[15]: /security/mcp_server/
[16]: /mcp_server/setup/
[17]: /mcp_server/tools/#get_datadog_security_findings_schema
[18]: /mcp_server/tools/#search_datadog_security_findings
[19]: /security/code_security/static_analysis/
[20]: /security/guide/findings-schema/?tab=staticcodevulnerability
[21]: /security/code_security/secret_scanning/
[22]: /security/guide/findings-schema/?tab=secret
[23]: /security/code_security/software_composition_analysis/
[24]: /security/guide/findings-schema/?tab=libraryvulnerability
[25]: /security/code_security/iac_security/
[26]: /security/guide/findings-schema/?tab=iacmisconfiguration
[27]: https://github.com/datadog-labs/datadog-code-security-mcp/blob/main/docs/TELEMETRY.md
[28]: https://www.datadoghq.com/legal/privacy/
