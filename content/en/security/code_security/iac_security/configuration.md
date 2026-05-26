---
title: Infrastructure as Code (IaC) Security Configuration
aliases:
  - /security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
  - /security/code_security/iac_security/exclusions/
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-iac-security/"
    tag: "Blog"
    text: "Prevent cloud misconfigurations from reaching production with Datadog IaC Security"
  - link: "/security/code_security/iac_security"
    tag: "Documentation"
    text: "IaC Security"
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security for Code Security"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
---

Infrastructure as Code (IaC) Security detects IaC misconfigurations. By default, IaC Security scans repositories with [all supported rules][3]. You can customize which rules run and on which paths, as well as their severities and categories. Configure these settings under the `iac` key in the Code Security configuration, either in Datadog or in a `code-security.datadog.yaml` file.

For information on configuration locations, precedence, and merging, see [Code Security Configuration Reference][1].

## Configuration methods

You can configure IaC Security using:

- Datadog or a `code-security.datadog.yaml` file for repository-wide rule, severity, category, and path settings. Use this method when you want the same configuration to apply across a repository or organization.
- Inline comments for local, file-specific exclusions that should stay with the IaC file. Use this method when an exception applies to a specific line, block, or file.

## Configuration format

The following configuration format applies to all configuration locations: org-level, repository-level, and repository-level (file).

The configuration file must begin with `schema-version: v1.2`, followed by an `iac` key containing the analysis configuration. The full structure is as follows:

{{< code-block lang="yaml" >}}
schema-version: v1.2
iac:
  # Do not run these rules.
  ignore-rules:
    - A
    - B
  # Run only these rules. If this field is set, all other rules are ignored.
  use-rules:
    - A
  global-config:
    # Only analyze the following paths/files.
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files.
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    # Do not report findings with these severities.
    ignore-severities:
      - low
      - info
    # Report only findings with these severities.
    only-severities:
      - high
      - critical
    # Do not report findings in these categories.
    ignore-categories:
      - "Best Practices"
    # Report only findings in these categories.
    only-categories:
      - "Encryption"
{{< /code-block >}}

The `iac` key supports the following fields:

| **Property** | **Type** | **Description** |
| --- | --- | --- |
| `ignore-rules` | Array | A list of rule IDs to ignore. |
| `use-rules` | Array | A list of rule IDs to run. If this field is set, rules not listed are ignored. |
| `global-config` | Object | Global settings for the repository. |

## Rule configuration

To modify which rules run:

- **Run only specific rules**: List them under `use-rules`
- **Disable specific rules**: List them under `ignore-rules`

{{< code-block lang="yaml" >}}
schema-version: v1.2
iac:
  ignore-rules:
    - A
    - B
{{< /code-block >}}

{{< code-block lang="yaml" >}}
schema-version: v1.2
iac:
  use-rules:
    - A
{{< /code-block >}}

Replace placeholders such as `A` and `B` with Code Security rule IDs. Legacy rule IDs are also supported for backward compatibility.

## Global configuration

The `global-config` object controls repository-wide settings:

| **Property** | **Type** | **Description** |
| --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. Only matching files are analyzed. |
| `ignore-paths` | Array | File paths or glob patterns to exclude. Matching files are not analyzed. |
| `only-severities` | Array | Severity levels to report. Findings with other severities are ignored. |
| `ignore-severities` | Array | Severity levels to ignore. |
| `only-categories` | Array | Categories to report. Findings in other categories are ignored. |
| `ignore-categories` | Array | Categories to ignore. |

### Severities

Use `ignore-severities` to ignore findings based on severity level. Use `only-severities` to report only specific severity levels.

**Possible values:**

- `critical`
- `high`
- `medium`
- `low`
- `info`

{{< code-block lang="yaml" >}}
schema-version: v1.2
iac:
  global-config:
    ignore-severities:
      - info
      - low
{{< /code-block >}}

### Paths

Use `ignore-paths` to exclude specific files or directories from scanning. Use `only-paths` to scan only specific files or directories. These options support glob patterns.

{{< code-block lang="yaml" >}}
schema-version: v1.2
iac:
  global-config:
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
{{< /code-block >}}

### Categories

Use `ignore-categories` to ignore findings in specific categories. Use `only-categories` to report only specific categories.

**Possible values:**

- `Access Control`
- `Availability`
- `Backup`
- `Best Practices`
- `Bill Of Materials`
- `Build Process`
- `Encryption`
- `Insecure Configurations`
- `Insecure Defaults`
- `Networking and Firewall`
- `Observability`
- `Resource Management`
- `Secret Management`
- `Structure and Semantics`
- `Supply-Chain`

{{< code-block lang="yaml" >}}
schema-version: v1.2
iac:
  global-config:
    ignore-categories:
      - "Access Control"
      - "Best Practices"
{{< /code-block >}}

## Legacy configuration

IaC Security previously used a different configuration file (`dd-iac-scan.config`) and schema. This schema is deprecated and does not receive new updates, but it is [documented][2] in the `datadog-iac-scanner` repository.

A `code-security.datadog.yaml` file with an `iac` section takes precedence over `dd-iac-scan.config` if both are present.

## Configure exclusions with an inline comment

To control which parts of a file are scanned, add a comment that contains `dd-iac-scan`, followed by a command and any required values. Prefix `dd-iac-scan` with the comment syntax for the file format. Inline exclusions apply only within the file where they are used.

### Supported commands

| **Comment**                      | **Description**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | Ignores the entire file.        |
| `dd-iac-scan disable=<rule_id>`  | Ignores specific rules.         |
| `dd-iac-scan enable=<rule_id>`   | Includes only specific rules.   |
| `dd-iac-scan ignore-line`        | Ignores a single line.          |
| `dd-iac-scan ignore-block`       | Ignores an entire block.        |

#### dd-iac-scan ignore

Excludes the entire file from scanning. This comment must be placed at the beginning of the file to take effect.

{{< code-block lang="yaml" >}}
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

#### dd-iac-scan disable=rule_id

Excludes scan results for the specified rules in this file. This comment must be placed at the beginning of the file to take effect.

{{< code-block lang="yaml" >}}
# dd-iac-scan disable=A,B

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

Findings from the specified rules are ignored for this file. Legacy rule IDs are also supported for backward compatibility.

#### dd-iac-scan enable=rule_id

Limits scan results in this file to only the specified rules. This comment must be placed at the beginning of the file to take effect.

{{< code-block lang="yaml" >}}
# dd-iac-scan enable=A

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
{{< /code-block >}}

Only findings from the specified rules are included in scan results for this file. Legacy rule IDs are also supported for backward compatibility.

#### dd-iac-scan ignore-line

Prevents scan results from flagging the line immediately after this comment. This comment can be placed anywhere in the file.

{{< highlight yaml "hl_lines=3" >}}
resource "google_storage_bucket" "example" {
  # dd-iac-scan ignore-line
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

In the previous example, findings on the highlighted line are ignored.

#### dd-iac-scan ignore-block

Prevents scan results from flagging an entire resource block and all its key-value pairs. This comment can be placed anywhere in the file.

{{< highlight yaml "hl_lines=2-6" >}}
# dd-iac-scan ignore-block
resource "google_storage_bucket" "example" {
  name          = "image-store.com"
  location      = "EU"
  force_destroy = true
}
{{< / highlight >}}

In the previous example, findings on the highlighted block are ignored.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/guides/configuration/
[2]: https://github.com/DataDog/datadog-iac-scanner/blob/main/legacy_config.md
[3]: /security/code_security/iac_security/iac_rules/
