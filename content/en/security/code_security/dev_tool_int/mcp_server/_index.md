---
title: Code Security MCP Server
description: Use the Datadog Code Security MCP server to run SAST, secrets detection, SCA, IaC scanning, and SBOM generation directly from your AI coding assistant.
is_beta: true
disable_toc: false
---

<div class="alert alert-warning">The Datadog Code Security MCP server is in Preview.</div>

## Overview

{{< callout url="#" btn_hidden="true" header="Preview Feature">}}
Datadog Code Security MCP Server is in Preview.
{{< /callout >}}

Datadog Code Security MCP provides all Code Security scan tools to AI coding assistants like Claude Desktop, Cursor, etc - Can also be used as a CLI tool.

**How it works:**

- Communicates with AI assistants over STDIO using the MCP protocol.
- Runs Datadog security binaries (datadog-static-analyzer, datadog-sbom-generator, datadog-security-cli, datadog-iac-scanner) under the hood.

**Difference with Datadog Remote MCP:** This is a _local_ MCP server that wraps Datadog security binaries for code-level scanning. It is separate from the [Datadog MCP Server][2], which provides cloud-based access to Datadog features and data.

## Available tools

| Tool                                                        | Description                                                 | Auth Required |
| ----------------------------------------------------------- | ----------------------------------------------------------- | :-----------: |
| [`datadog_code_security_scan`](#datadog_code_security_scan) | Comprehensive scan (SAST + Secrets + SCA + IaC) in parallel |      Yes      |
| [`datadog_sast_scan`](#datadog_sast_scan)                   | Static Application Security Testing                         |      Yes      |
| [`datadog_secrets_scan`](#datadog_secrets_scan)             | Hardcoded secrets detection                                 |      Yes      |
| [`datadog_sca_scan`](#datadog_sca_scan)                     | Dependency vulnerability scanning (CVEs)                    |      Yes      |
| [`datadog_iac_scan`](#datadog_iac_scan)                     | Infrastructure-as-Code security scanning                    |      Yes      |
| [`datadog_generate_sbom`](#datadog_generate_sbom)           | Software Bill of Materials generation                       |      No       |

### `datadog_code_security_scan`

Run a comprehensive security scan combining SAST, Secrets detection, SCA, and IaC scanning. All scan types execute **in parallel** for maximum performance.

**Parameters:**

| Parameter     | Type            | Required | Description                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | File paths or directories to scan (relative to `working_dir`)               |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths (defaults to current directory) |

**Requires binaries:** `datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-security-cli`, `datadog-iac-scanner`

**Note**: If any binary is missing, the server returns results from the available scanners along with installation instructions for the missing ones.

### `datadog_sast_scan`

Run Static Application Security Testing (SAST) to detect security vulnerabilities in source code, such as SQL injection, XSS, path traversal, and insecure cryptography.

**Parameters:**

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | File paths or directories to scan           |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

**Requires binary:** `datadog-static-analyzer`

### `datadog_secrets_scan`

Detect hardcoded credentials, API keys, passwords, and tokens in source code and configuration files.

**Parameters:**

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | File paths or directories to scan           |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

**Requires binary:** `datadog-static-analyzer`

### `datadog_sca_scan`

Run Software Composition Analysis to detect known vulnerabilities (CVEs) in your project's dependencies. This tool performs a two-step process:

1. Generates an SBOM from the specified directories.
2. Scans the SBOM for known vulnerabilities using Datadog's vulnerability database.

**Parameters:**

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | Directories to scan for dependencies        |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

**Output:** Vulnerabilities with CVE ID, severity, affected component, version, and description.

**Requires binaries:** `datadog-sbom-generator`, `datadog-security-cli`

### `datadog_iac_scan`

Detect misconfigurations, compliance issues, and security vulnerabilities in Infrastructure-as-Code files.

**Supported IaC formats:**

- Terraform
- CloudFormation
- Kubernetes manifests
- Dockerfiles
- GitHub Actions

**Parameters:**

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | Directories containing IaC files to scan    |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

**Output:** Security findings with severity, rule, file location, and remediation guidance.

**Requires binary:** `datadog-iac-scanner`

### `datadog_generate_sbom`

Generate a comprehensive Software Bill of Materials (SBOM) listing all software components, dependencies, versions, and licenses in a repository. **No authentication required.**

**Parameters:**

| Parameter     | Type     | Required | Description                                                                |
| ------------- | -------- | :------: | -------------------------------------------------------------------------- |
| `path`        | `string` |    No    | Path to repository or directory to analyze (defaults to current directory) |
| `working_dir` | `string` |    No    | Base directory for the scan (defaults to current directory)                |

**Output:** JSON containing a summary (total components, breakdown by language/package manager, license statistics) and a detailed component list (name, version, type, license, package URL).

**Supported package managers:**

| Language   | Package Managers                          |
| ---------- | ----------------------------------------- |
| .NET       | NuGet                                     |
| C++        | Conan                                     |
| Go         | Go modules                                |
| Java       | Gradle, Maven                             |
| JavaScript | NPM, PNPM, Yarn                           |
| PHP        | Composer                                  |
| Python     | pdm, pipenv, poetry, requirements.txt, uv |
| Ruby       | Bundler                                   |
| Rust       | Cargo                                     |

<div class="alert alert-info">If the repository uses a package manager not listed above, or if the tool returns 0 components, the AI assistant can perform manual SBOM generation by reading lock files (<code>package.json</code>, <code>requirements.txt</code>, <code>go.mod</code>, <code>pom.xml</code>, <code>Gemfile.lock</code>, <code>Cargo.lock</code>, <code>composer.lock</code>, etc.) and extracting dependencies directly.</div>

**Requires binary:** `datadog-sbom-generator`

## Setup

### Prerequisites

1. **Datadog API and Application keys** — Required for SAST, Secrets, SCA, and IaC scanning. Read [API and Application Keys][3] to create them.
2. **External security binaries** — The MCP server orchestrates the following Datadog binaries. If a binary is missing when a scan runs, the server provides platform-specific installation instructions.

| Binary                    | Used For      | Install Method                                         |
| ------------------------- | ------------- | ------------------------------------------------------ |
| `datadog-static-analyzer` | SAST, Secrets | `brew install datadog-static-analyzer`                 |
| `datadog-sbom-generator`  | SBOM, SCA     | [GitHub Releases][4]                                   |
| `datadog-security-cli`    | SCA           | `brew install --cask datadog/tap/datadog-security-cli` |
| `datadog-iac-scanner`     | IaC           | [GitHub Releases][5]                                   |

### Supported platforms

| Platform | Architectures    |
| -------- | ---------------- |
| macOS    | `amd64`, `arm64` |
| Linux    | `amd64`, `arm64` |
| Windows  | `amd64`          |

**Note**: `datadog-sbom-generator` and `datadog-security-cli` are not available on Windows. `datadog-iac-scanner` is not available on macOS `amd64`.

### Installation

#### Homebrew (recommended)

```bash
brew update
brew install --cask datadog-labs/pack/datadog-code-security-mcp
```

#### GitHub Releases

```bash
curl -L "https://github.com/datadog-labs/datadog-code-security-mcp/releases/latest/download/datadog-code-security-mcp-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m).tar.gz" | tar xz
sudo install -m 755 datadog-code-security-mcp /usr/local/bin/
```

#### Verify installation

```bash
datadog-code-security-mcp version
```

### Environment variables

| Variable     | Required | Description                                |
| ------------ | :------: | ------------------------------------------ |
| `DD_API_KEY` |  Yes\*   | Your [Datadog API key][3]                  |
| `DD_APP_KEY` |  Yes\*   | Your [Datadog Application key][3]          |
| `DD_SITE`    |    No    | Datadog site (defaults to `datadoghq.com`) |

\*Required for SAST, Secrets, SCA, and IaC scanning. SBOM generation works without authentication.

**Valid `DD_SITE` values:**

| Site               | Value               |
| ------------------ | ------------------- |
| US1 (default)      | `datadoghq.com`     |
| US3                | `us3.datadoghq.com` |
| US5                | `us5.datadoghq.com` |
| EU                 | `datadoghq.eu`      |
| US1-FED (GovCloud) | `ddog-gov.com`      |
| AP1                | `ap1.datadoghq.com` |

### Client configuration

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
{{% tab "Windsurf" %}}

Add the following to your Windsurf MCP configuration (`~/.windsurf/mcp.json`):

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
{{< /tabs >}}

For any other MCP-compatible client, use the following configuration pattern:

- **Command:** `datadog-code-security-mcp`
- **Arguments:** `["start"]`
- **Transport:** STDIO
- **Environment variables:** `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE`

## Usage examples

### AI assistant prompts

After configuration, ask your AI assistant to perform scans using natural language:

**Comprehensive scanning:**

- "Run a full security scan on this project"
- "Check this directory for all security issues"

**SAST:**

- "Scan `src/` for security vulnerabilities"
- "Are there any SQL injection or XSS issues in this code?"

**Secrets detection:**

- "Check if there are any hardcoded secrets in `config/`"
- "Find all API keys and passwords in this repository"

**SCA / Dependency vulnerabilities:**

- "Scan for vulnerable dependencies"
- "Check if my dependencies have any known CVEs"

**IaC scanning:**

- "Check my Terraform files for misconfigurations"
- "Scan the Kubernetes manifests for security issues"

**SBOM generation:**

- "Generate an SBOM for this project"
- "What dependencies does this project have?"
- "List all components and their licenses"

### CLI commands

The MCP server can also be used directly as a CLI tool:

```bash
datadog-code-security-mcp scan all ./src

datadog-code-security-mcp scan sast ./src
datadog-code-security-mcp scan secrets ./config
datadog-code-security-mcp scan sca ./
datadog-code-security-mcp scan iac ./terraform

datadog-code-security-mcp generate-sbom .

datadog-code-security-mcp scan all ./src --json
datadog-code-security-mcp generate-sbom . --json
```

## Troubleshooting

### Binary not found

If a scan returns an error about a missing binary, install the required binary using the instructions in [Prerequisites](#prerequisites). The server automatically detects missing binaries and provides platform-specific installation commands.

### Authentication errors

Verify your API and Application keys are set correctly:

```bash
echo $DD_API_KEY
echo $DD_APP_KEY
echo $DD_SITE
```

Verify your keys have the correct permissions. Read [API and Application Keys][3] for details.

### MCP server not responding

1. Check that the binary is installed and accessible:

    ```bash
    datadog-code-security-mcp version
    ```

2. Check MCP server logs:

    ```bash
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. Verify your client configuration points to the correct binary path. If installed through Homebrew, the binary should be on your `PATH`. Otherwise, use an absolute path in your configuration.

### Partial results

When running a comprehensive scan (`datadog_code_security_scan`), some scan types may succeed while others fail (for example, if only some binaries are installed). The server returns:

- Results from all successful scanners.
- Error messages with installation instructions for any scanners that failed.

This is expected behavior — install the missing binaries and re-run to get complete results.

[1]: https://modelcontextprotocol.io/
[2]: /bits_ai/mcp_server
[3]: /account_management/api-app-keys/
[4]: https://github.com/DataDog/datadog-sbom-generator/releases
[5]: https://github.com/DataDog/datadog-iac-scanner/releases
