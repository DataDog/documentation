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

The configuration file must begin with `schema-version: v1.4`, followed by an `iac` key containing the analysis configuration.

The full structure is as follows:

{{< code-block lang="yaml" >}}
schema-version: v1.4
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
    # Do not run rules from these platforms.
    ignore-platforms:
      - Dockerfile
    # Only run rules from these platforms.
    only-platforms:
      - Terraform
      - Kubernetes
      - CICD
  # Per-rule configurations.
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      ignore-paths:
        - "test/"
      severity: low
    kubernetes-deployment-without-resource-limits:
      only-paths:
        - "k8s/production/"
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
{{< /code-block >}}

The `iac` key supports the following fields:

| **Property** | **Type** | **Description** |
| --- | --- | --- |
| `ignore-rules` | Array | A list of rule IDs to ignore. |
| `use-rules` | Array | A list of rule IDs to run. If specified, _only_ these rules run. `ignore-rules` takes precedence over `use-rules`: a rule in both arrays is ignored. |
| `global-config` | Object | Global settings for the IaC scanner. |
| `rule-configs` | Object | Per-rule configurations. Keys are rule IDs. |

## Rule configuration

To modify which rules run:

- **Run only specific rules**: List them under `use-rules`
- **Disable specific rules**: List them under `ignore-rules`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  ignore-rules:
    - A
    - B
{{< /code-block >}}

{{< code-block lang="yaml" >}}
schema-version: v1.4
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
| `only-severities` | Array | Severity levels to report. Findings with other severities are not reported. |
| `ignore-severities` | Array | Severity levels to ignore. |
| `only-categories` | Array | Categories to report. Findings in other categories are not reported. |
| `ignore-categories` | Array | Categories to ignore. |
| `ignore-platforms` | Array | Platforms to skip. Rules from these platforms are not applied. |
| `only-platforms` | Array | Platforms to scan. Rules from other platforms are not applied. |

### Severities

Use `ignore-severities` to ignore findings based on severity level. Use `only-severities` to report only specific severity levels.

**Possible values:**

- `critical`
- `high`
- `medium`
- `low`
- `info`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    ignore-severities:
      - info
      - low
{{< /code-block >}}

### Paths

Use `ignore-paths` to exclude specific files or directories from scanning. Use `only-paths` to scan only specific files or directories. These options support glob patterns.

{{< code-block lang="yaml" >}}
schema-version: v1.4
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
schema-version: v1.4
iac:
  global-config:
    ignore-categories:
      - "Access Control"
      - "Best Practices"
{{< /code-block >}}

### Platforms

Use `ignore-platforms` to skip specific platforms. Use `only-platforms` to restrict scanning to specific platforms.

**Possible values:**

- `Ansible`
- `CICD`
- `CloudFormation`
- `Dockerfile`
- `Kubernetes`
- `Terraform`

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  global-config:
    only-platforms:
      - Terraform
      - Kubernetes
{{< /code-block >}}

## Per-rule configuration

Use `rule-configs` to configure individual rules.

Each key under `rule-configs` is a rule ID. The following properties are supported per rule:

| **Property** | **Type** | **Description** |
| --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. The rule is applied only to files matching these patterns. |
| `ignore-paths` | Array | File paths or glob patterns to exclude. The rule is not applied to files matching these patterns. |
| `arguments` | Object | Rule-specific parameters that tune the rule's behavior. Supported argument names and value types depend on the rule. |
| `severity` | String | Overrides the severity of findings generated by this rule. Accepted values: `critical`, `high`, `medium`, `low`, `info`. |

### Per-rule path scoping

Exclude a rule from certain paths, or restrict it to specific paths:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      # Do not apply this rule in test directories.
      ignore-paths:
        - "test/"
        - "**/testdata/"
    kubernetes-deployment-without-resource-limits:
      # Apply this rule only in production manifests.
      only-paths:
        - "k8s/production/"
{{< /code-block >}}

Path patterns support glob syntax (`*`, `**`, `?`). Paths are relative to the repository root.

### Per-rule severity override

Change the severity of findings generated by a specific rule:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    terraform-aws-s3-bucket-without-encryption:
      severity: low
{{< /code-block >}}

This severity applies to all findings generated by that rule.

### Per-rule arguments

Use `arguments` to set parameters for a specific rule. Supported argument names and value types depend on the rule. Define arguments under the rule ID in `rule-configs`.

The following example configures the `cicd-github-unpinned-actions-full-length-commit-sha` rule and allows the `libbpf/ci/run-qemu` action:

{{< code-block lang="yaml" >}}
schema-version: v1.4
iac:
  rule-configs:
    cicd-github-unpinned-actions-full-length-commit-sha:
      arguments:
        allow:
          - libbpf/ci/run-qemu
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
