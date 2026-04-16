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

The [Datadog Code Security MCP Server][1] exposes the following tools for AI coding assistants and CLI usage. Each tool wraps one or more Datadog security binaries and accepts file paths or directories to scan.

<div class="alert alert-info">This MCP server is separate from the <a href="/bits_ai/mcp_server">Datadog MCP Server</a>, which provides cloud-based access to Datadog features and data. The Code Security MCP Server runs locally and focuses on code-level security scanning.</div>

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

<div class="alert alert-info">If the repository uses a package manager not listed above, or if the tool returns 0 components, the AI assistant can perform manual SBOM generation by reading lock files (<code>package.json</code>, <code>requirements.txt</code>, <code>go.mod</code>, <code>pom.xml</code>, <code>Gemfile.lock</code>, <code>Cargo.lock</code>, <code>composer.lock</code>, etc.) and extracting dependencies directly.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/
