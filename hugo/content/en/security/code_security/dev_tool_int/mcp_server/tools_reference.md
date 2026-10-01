---
title: Tools Reference
description: Detailed reference for all tools available in the Datadog Code Security MCP Server, including parameters, required binaries, and output formats.
is_beta: true
further_reading:
- link: "/security/code_security/dev_tool_int/mcp_server/"
  tag: "Documentation"
  text: "Code Security MCP Server overview and setup"
- link: "/security/code_security/dev_tool_int/mcp_server/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Code Security MCP Server"
---

The [Datadog Code Security MCP Server][1] exposes the following tools for AI coding assistants and CLI usage. Scan tools wrap one or more Datadog security binaries and accept file paths or directories to scan. `datadog_library_vulnerability_scan` queries Datadog by package URL and does not scan a local tree.

<div class="alert alert-info">This MCP server is separate from the <a href="/mcp_server">Datadog MCP Server</a>, which provides cloud-based access to Datadog features and data. The Code Security MCP Server runs locally and focuses on code-level security scanning. To query findings already stored in Datadog, see <a href="/security/code_security/dev_tool_int/mcp_server/#query-findings-already-in-datadog">Query findings already in Datadog</a>.</div>

## `datadog_code_security_scan`

Run SAST, secrets detection, SCA, and IaC scanning in parallel.

`min_sast_severity` applies only to the SAST portion of the scan. It defaults to `LOW`. In-source suppressed findings are excluded. When some scanners are not installed, the tool returns results from the scanners that succeeded and an error for each scanner that failed.

### Parameters

| Parameter            | Type            | Required | Description                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   Yes    | File paths or directories to scan                                                                    |
| `working_dir`        | `string`        |    No    | Base directory for resolving relative paths (defaults to the current directory)                      |
| `min_sast_severity`  | `string`        |    No    | Minimum SAST severity to return: `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`. Default: `LOW`. SAST only. |

### Required binaries

`datadog-static-analyzer`, `datadog-sbom-generator`, `datadog-security-cli`, `datadog-iac-scanner`

## `datadog_sast_scan`

Run Static Application Security Testing (SAST) to detect security vulnerabilities in first-party code.

`min_sast_severity` defaults to `LOW`. In-source suppressed findings are excluded.

### Parameters

| Parameter            | Type            | Required | Description                                                                                          |
| -------------------- | --------------- | :------: | ---------------------------------------------------------------------------------------------------- |
| `file_paths`         | `array[string]` |   Yes    | File paths or directories to scan                                                                    |
| `working_dir`        | `string`        |    No    | Base directory for resolving relative paths                                                          |
| `min_sast_severity`  | `string`        |    No    | Minimum SAST severity to return: `LOW`, `MEDIUM`, `HIGH`, or `CRITICAL`. Default: `LOW`.             |

### Required binary

`datadog-static-analyzer`

## `datadog_secrets_scan`

Detect hardcoded credentials, API keys, passwords, and tokens in source code and configuration files.

### Parameters

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | File paths or directories to scan           |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

### Required binary

`datadog-static-analyzer`

## `datadog_sca_scan`

Run SCA to detect known vulnerabilities (CVEs) in your project's dependencies. This tool performs a two-step process:

1. Generates a Software Bill of Materials (SBOM) from the specified directories.
2. Scans the SBOM for known vulnerabilities using Datadog's vulnerability database.

### Parameters

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | Directories to scan for dependencies        |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

### Output

Vulnerabilities with CVE ID, severity, affected component, version, and description.

### Required binaries

`datadog-sbom-generator`, `datadog-security-cli`

## `datadog_iac_scan`

Detect misconfigurations, compliance issues, and security vulnerabilities in IaC files.

### Parameters

| Parameter     | Type            | Required | Description                                 |
| ------------- | --------------- | :------: | ------------------------------------------- |
| `file_paths`  | `array[string]` |   Yes    | Directories containing IaC files to scan    |
| `working_dir` | `string`        |    No    | Base directory for resolving relative paths |

### Output

Security findings with severity, rule, file location, and remediation guidance.

### Required binary

`datadog-iac-scanner`

### Supported IaC formats

- Terraform
- CloudFormation
- Kubernetes manifests
- Dockerfiles
- GitHub Actions

## `datadog_generate_sbom`

Generate a comprehensive SBOM listing all software components, dependencies, versions, and licenses in a repository.

### Parameters

| Parameter     | Type     | Required | Description                                                                |
| ------------- | -------- | :------: | -------------------------------------------------------------------------- |
| `path`        | `string` |    No    | Path to repository or directory to analyze (defaults to current directory) |
| `working_dir` | `string` |    No    | Base directory for the scan (defaults to current directory)                |

### Output

JSON containing a summary (total components, breakdown by language/package manager, license statistics) and a detailed component list (name, version, type, license, package URL).

### Supported package managers

| Language   | Package managers                          |
| ---------- | ----------------------------------------- |
| .NET       | NuGet                                     |
| C++        | Conan                                     |
| Go         | Go modules                                |
| Java       | Gradle, Maven                             |
| JavaScript | npm, pnpm, Yarn                            |
| PHP        | Composer                                  |
| Python     | pdm, pipenv, poetry, requirements.txt, uv |
| Ruby       | Bundler                                   |
| Rust       | Cargo                                     |

<div class="alert alert-info">If the repository uses a package manager not listed above, or if the tool returns zero components, the AI assistant can generate an SBOM by reading lock files (<code>package.json</code>, <code>requirements.txt</code>, <code>go.mod</code>, <code>pom.xml</code>, <code>Gemfile.lock</code>, <code>Cargo.lock</code>, <code>composer.lock</code>, and similar files) and extracting dependencies directly.</div>

## `datadog_library_vulnerability_scan`

Look up known vulnerabilities for specific libraries by package URL (PURL). This tool calls the Datadog API and does not scan a local codebase. Use [`datadog_sca_scan`](#datadog_sca_scan) when you want to scan a project tree.

Requires `DD_API_KEY` and `DD_APP_KEY`.

### Parameters

| Parameter     | Type            | Required | Description                                                                 |
| ------------- | --------------- | :------: | --------------------------------------------------------------------------- |
| `libraries`   | `array[object]` |   Yes    | Libraries to scan. Each object uses the fields in the table below.         |
| `working_dir` | `string`        |    No    | Working directory for git context detection (defaults to the current directory) |

Each entry in `libraries`:

| Field             | Type      | Required | Description                                                      |
| ----------------- | --------- | :------: | ---------------------------------------------------------------- |
| `purl`            | `string`  |   Yes    | Package URL, for example `pkg:maven/com.cronutils/cron-utils@9.1.2` |
| `is_direct`       | `boolean` |    No    | Whether this is a direct dependency                              |
| `is_dev`          | `boolean` |    No    | Whether this is a development-only dependency                    |
| `package_manager` | `string`  |    No    | Package manager, for example `MAVEN`, `NPM`, or `GOLANG`         |

### Output

Vulnerabilities with CVE ID, GHSA ID, severity, CVSS score, affected library, remediation, fix versions, and exploit availability.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/
