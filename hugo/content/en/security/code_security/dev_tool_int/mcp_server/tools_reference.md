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
| `working_dir` | `string`        |    No    | Working directory for Git context detection (defaults to the current directory) |

Each entry in `libraries`:

| Field             | Type      | Required | Description                                                      |
| ----------------- | --------- | :------: | ---------------------------------------------------------------- |
| `purl`            | `string`  |   Yes    | Package URL, for example `pkg:maven/com.cronutils/cron-utils@9.1.2` |
| `is_direct`       | `boolean` |    No    | Whether this is a direct dependency                              |
| `is_dev`          | `boolean` |    No    | Whether this is a development-only dependency                    |
| `package_manager` | `string`  |    No    | Package manager, for example `MAVEN`, `NPM`, or `GOLANG`         |

### Output

Vulnerabilities with CVE ID, GHSA ID, severity, CVSS score, affected library, remediation, fix versions, and exploit availability.

## `datadog_ephemeral_sast_scan`

Run one local, unpublished SAST rule against a repository. The caller supplies the rule JavaScript and the tree-sitter query. The tool does not require `DD_API_KEY` or `DD_APP_KEY`.

The scan runs only the supplied rule, but still follows the repository's [Static Code Analysis configuration][4]: `ignore-paths`, `only-paths`, `max-file-size-kb`, and `use-gitignore`.

### Parameters

| Parameter           | Type            | Required | Description                                                                                      |
| ------------------- | --------------- | :------: | ------------------------------------------------------------------------------------------------ |
| `rule_code`         | `string`        |   Yes    | Rule JavaScript source, not base64-encoded                                                       |
| `tree_sitter_query` | `string`        |   Yes    | Tree-sitter query source, not base64-encoded                                                     |
| `language`          | `string`        |   Yes    | Language of the rule, for example `TYPESCRIPT`, `JAVASCRIPT`, `PYTHON`, `GO`, or `JAVA`          |
| `directory`         | `string`        |    No    | Repository directory to scan (defaults to the current directory)                                 |
| `rule_name`         | `string`        |    No    | Rule name inside the temporary ruleset                                                           |
| `paths`             | `array[string]` |    No    | Subdirectories of `directory` to scan. Omit to scan the whole directory.                         |

### Output

Violations reported by the rule, grouped by file.

### Required binary

`datadog-static-analyzer` version 0.9.10 or later. See [Troubleshooting][2].

## `datadog_promote_sast_rule`

Save an approved SAST rule as a [custom rule][3] in Datadog. The tool uploads the rule exactly as it receives it, and only after the user approves it. If a rule with the same name exists, the tool does not replace it unless `overwrite` is `true`.

Scans use the saved rule only after the repository configuration lists its ruleset under `sast.use-rulesets`. See [Static Code Analysis configuration][4].

Requires `DD_API_KEY` and `DD_APP_KEY`.

### Parameters

| Parameter           | Type            | Required | Description                                                                                                   |
| ------------------- | --------------- | :------: | ------------------------------------------------------------------------------------------------------------- |
| `user_confirmed`    | `boolean`       |   Yes    | Must be `true`. Set it only after the user approves the rule.                                                 |
| `overwrite`         | `boolean`       |    No    | Replace a rule that already exists. Default: `false`.                                                         |
| `rule_code`         | `string`        |   Yes    | Rule JavaScript source, not base64-encoded                                                                    |
| `tree_sitter_query` | `string`        |   Yes    | Tree-sitter query source, not base64-encoded                                                                  |
| `language`          | `string`        |   Yes    | Language of the rule, for example `TYPESCRIPT`                                                                |
| `rule_name`         | `string`        |   Yes    | Lowercase rule name, 5 to 32 characters                                                                       |
| `ruleset_name`      | `string`        |    No    | Lowercase ruleset name, 5 to 32 characters. Default: `security-variants`.                                     |
| `short_description` | `string`        |    No    | One-line summary, at most 60 characters                                                                       |
| `description`       | `string`        |    No    | Description stored on the rule                                                                                |
| `tests`             | `array[object]` |    No    | Up to two examples saved as rule tests. Each object uses the fields in the table below.                       |

Rule and ruleset names can contain lowercase letters, digits, and single hyphens. They cannot start or end with a hyphen.

Each entry in `tests`:

| Field              | Type      | Required | Description                                                                      |
| ------------------ | --------- | :------: | -------------------------------------------------------------------------------- |
| `filename`         | `string`  |   Yes    | Example filename, a single path segment                                          |
| `code`             | `string`  |   Yes    | Example source, not base64-encoded                                               |
| `annotation_count` | `integer` |   Yes    | Number of findings the rule reports on this example: `0` for the fixed code, `1` for the code before the fix |

### Output

The ruleset name, rule name, and revision ID of the saved rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/
[2]: /security/code_security/dev_tool_int/mcp_server/troubleshooting/#scanner-upgrade-required
[3]: /security/code_security/static_analysis/custom_rules/
[4]: /security/code_security/static_analysis/configuration/
