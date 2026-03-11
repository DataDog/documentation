---
title: Code Security MCP Server
description: Use the Datadog Code Security MCP server to run SAST, secrets detection, SCA, IaC scanning, and SBOM generation directly from your AI coding assistant.
is_beta: true
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-mcp-servers/"
  tag: "Blog"
  text: "Identify common security risks in MCP servers"
- link: "/bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server for cloud-based access to Datadog features"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
Datadog Code Security MCP Server is in Preview.
{{< /callout >}}

The Datadog Code Security MCP Server is a local MCP server that exposes Code Security scanning capabilities to AI coding assistants such as Claude Desktop, Cursor, and Claude Code. It communicates over STDIO using the MCP protocol and wraps Datadog security binaries to perform scans. It can also be used as a CLI tool.

<div class="alert alert-info">This MCP server is separate from the <a href="/bits_ai/mcp_server">Datadog MCP Server</a>, which provides cloud-based access to Datadog features and data. The Code Security MCP Server runs locally and focuses on code-level security scanning.</div>

## Available tools

The MCP server exposes the following tools that AI coding assistants can call to run security scans on your codebase:

| Tool                                                        | Description                                                 | Auth Required |
| ----------------------------------------------------------- | ----------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`][6] | Comprehensive scan (SAST + Secrets + SCA + IaC) in parallel |      Yes      |
| [`datadog_sast_scan`][7]                   | Static Application Security Testing                         |      Yes      |
| [`datadog_secrets_scan`][8]             | Hardcoded secrets detection                                 |      Yes      |
| [`datadog_sca_scan`][9]                     | Dependency vulnerability scanning (CVEs)                    |      Yes      |
| [`datadog_iac_scan`][10]                     | Infrastructure-as-Code security scanning                    |      Yes      |
| [`datadog_generate_sbom`][11]           | Software Bill of Materials generation                       |      No       |

For detailed parameters, required binaries, and output formats for each tool, see the [Tools Reference][12].

## Setup

### Prerequisites

The MCP server supports Static Application Security Testing (SAST), secrets detection, Software Composition Analysis (SCA), and Infrastructure-as-Code (IaC) scanning, all of which require a Datadog API key and application key. For instructions on creating them, see [API and Application Keys][3].

### Install the MCP server

The MCP server is available on the following platforms:

| Platform | Architectures    |
| -------- | ---------------- |
| macOS    | `amd64`, `arm64` |
| Linux    | `amd64`, `arm64` |
| Windows  | `amd64`          |

#### Homebrew (recommended)

```bash
brew update
brew install --cask datadog-labs/pack/datadog-code-security-mcp
```

#### GitHub releases

```bash
curl -L "https://github.com/datadog-labs/datadog-code-security-mcp/releases/latest/download/datadog-code-security-mcp-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m).tar.gz" | tar xz
sudo install -m 755 datadog-code-security-mcp /usr/local/bin/
```

#### Verify installation

```bash
datadog-code-security-mcp version
```

### Install security binaries

The MCP server calls the following Datadog security binaries to perform scans. Install the ones you need for the scan types you want to use:

| Binary                    | Used For      | Install Method                                         |
| ------------------------- | ------------- | ------------------------------------------------------ |
| `datadog-static-analyzer` | SAST, Secrets | `brew install datadog-static-analyzer`                 |
| `datadog-sbom-generator`  | SBOM, SCA     | [GitHub releases][4]                                   |
| `datadog-security-cli`    | SCA           | `brew install --cask datadog/tap/datadog-security-cli` |
| `datadog-iac-scanner`     | IaC           | [GitHub releases][5]                                   |

<div class="alert alert-info"><code>datadog-sbom-generator</code> and <code>datadog-security-cli</code> are not available on Windows. <code>datadog-iac-scanner</code> is not available on macOS <code>amd64</code>.</div>

### Configure your client

Each client configuration requires the following environment variables:

| Variable     | Required | Description                                |
| ------------ | :------: | ------------------------------------------ |
| `DD_API_KEY` |  Yes\*   | Your [Datadog API key][3]                  |
| `DD_APP_KEY` |  Yes\*   | Your [Datadog Application key][3]          |
| `DD_SITE`    |    No    | Your [Datadog site][13] (defaults to `datadoghq.com`) |

\*Required for SAST, Secrets, SCA, and IaC scanning. SBOM generation works without authentication.

{{< tabs >}}
{{% tab "Claude Code" %}}

Use the Claude CLI to add the MCP server:

```bash
claude mcp add datadog-code-security \
  -e DD_API_KEY=<your-api-key> \
  -e DD_APP_KEY=<your-app-key> \
  -e DD_SITE=datadoghq.com \
  -- datadog-code-security-mcp start
```

Verify the configuration:

```bash
claude mcp list | grep datadog-code-security
```

{{% /tab %}}
{{% tab "Claude Desktop" %}}

Add the following to your Claude Desktop configuration file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "<your-api-key>",
                "DD_APP_KEY": "<your-app-key>",
                "DD_SITE": "datadoghq.com"
            }
        }
    }
}
```

{{% /tab %}}
{{% tab "Cursor" %}}

Add the following to your Cursor MCP settings (`~/.cursor/mcp.json`):

```json
{
    "mcpServers": {
        "datadog-code-security": {
            "command": "datadog-code-security-mcp",
            "args": ["start"],
            "env": {
                "DD_API_KEY": "<your-api-key>",
                "DD_APP_KEY": "<your-app-key>",
                "DD_SITE": "datadoghq.com"
            }
        }
    }
}
```

{{% /tab %}}
{{% tab "VS Code" %}}

Add the following to your VS Code settings (`.vscode/settings.json` or user settings):

```json
{
    "mcp": {
        "servers": {
            "datadog-code-security": {
                "command": "datadog-code-security-mcp",
                "args": ["start"],
                "env": {
                    "DD_API_KEY": "<your-api-key>",
                    "DD_APP_KEY": "<your-app-key>",
                    "DD_SITE": "datadoghq.com"
                }
            }
        }
    }
}
```

{{% /tab %}}
{{% tab "Other" %}}

For any other MCP-compatible client, use the following configuration pattern:

- **Command:** `datadog-code-security-mcp`
- **Arguments:** `["start"]`
- **Transport:** STDIO
- **Environment variables:** `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`

{{% /tab %}}
{{< /tabs >}}

## Usage examples

### AI assistant prompts

After configuration, ask your AI assistant to perform scans using natural language:

| Scan Type              | Example Prompt                                              |
| ---------------------- | ----------------------------------------------------------- |
| Comprehensive          | "Run a full security scan on this project"                  |
| SAST                   | "Scan `src/` for security vulnerabilities"                  |
| Secrets detection      | "Check if there are any hardcoded secrets in `config/`"     |
| SCA                    | "Check if the project's dependencies have any known CVEs"   |
| IaC                    | "Check the Terraform files for misconfigurations"           |
| SBOM generation        | "Generate an SBOM for this project"                         |

### CLI commands

The MCP server can also be used directly as a CLI tool.

Run a comprehensive scan across all scan types:

```bash
datadog-code-security-mcp scan all ./src
```

Run individual scan types:

```bash
datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform
```

Generate an SBOM:

```bash
datadog-code-security-mcp generate-sbom .
```

Add `--json` to any command for JSON output:

```bash
datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /account_management/api-app-keys/
[4]: https://github.com/DataDog/datadog-sbom-generator/releases
[5]: https://github.com/DataDog/datadog-iac-scanner/releases
[6]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_code_security_scan
[7]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sast_scan
[8]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_secrets_scan
[9]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_sca_scan
[10]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_iac_scan
[11]: /security/code_security/dev_tool_int/mcp_server/tools_reference/#datadog_generate_sbom
[12]: /security/code_security/dev_tool_int/mcp_server/tools_reference/
[13]: /getting_started/site/
