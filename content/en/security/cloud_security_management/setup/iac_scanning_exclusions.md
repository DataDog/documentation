---
title: Setting up IaC Scanning Exclusions
further_reading:
    - link: "/security/cloud_security_management/setup"
      tag: "Documentation"
      text: "Setting up Cloud Security Management"
    - link: "/security/cloud_security_management/misconfigurations"
      tag: "Documentation"
      text: "CSM Misconfigurations"
    - link: "/security/cloud_security_management/identity_risks"
      tag: "Guide"
      text: "CSM Identity Risks"
---

Infrastructure as Code (IaC) Scanning detects security misconfigurations in Terraform, Kubernetes, and CloudFormation files. Exclusions allow you to control which findings appear in scan results by ignoring specific rules, files, or issue categories.

## Exclusion methods

You can configure exclusions using:

- A configuration file (`dd-iac-scan.config`) to define exclusions for severity levels, file paths, query IDs, and categories.
- Inline comments to ignore specific findings within Terraform, Kubernetes, or CloudFormation files.

## Configure exclusions with a configuration file

1. Create a file named `dd-iac-scan.config` in the root directory of your project repository.
1. Add the necessary exclusions in YAML, JSON, TOML, or HCL format.
1. Commit the `dd-iac-scan.config` file to your repository.

### Supported exclusions

#### Exclude severities

`exclude-severities`

#### Exclude paths

`exclude-paths`

#### Exclude queries

`exclude-queries`

#### Exclude categories

`exclude-categories`

## Configure exclusions with inline comments

To exclude specific findings, add a comment that starts with `# dd-iac-scan`, followed by a command and any required values. Inline exclusions apply only within the file where they are used.

### Supported commands

| **Command**                        | **Description**                 |
|------------------------------------|---------------------------------|
| `# dd-iac-scan ignore`             | Ignores the entire file.        |
| `# dd-iac-scan disable=<query_id>` | Ignores specific queries.       |
| `# dd-iac-scan enable=<query_id>`  | Includes only specific queries. |
| `# dd-iac-scan ignore-line`        | Ignores a single line.          |
| `# dd-iac-scan ignore-block`       | Ignores a block of code.        |

