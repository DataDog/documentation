---
title: Infrastructure as Code (IaC) Security
aliases:
  - /security/cloud_security_management/iac_scanning/
further_reading:
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/exclusions"
    tag: "Documentation"
    text: "Configure IaC Security Exclusions"
---

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="IaC misconfiguration side panel showing details for the high severity IMDSv1 Enabled issue, including a security summary, code snippet, detection timestamps, and remediation steps." width="100%">}}

Datadog Infrastructure as Code (IaC) Security helps you detect misconfigurations in Terraform code before deployment. It scans your connected GitHub or GitLab repositories and flags risks such as missing encryption, overly permissive access, and insecure defaults.

IaC Security supports:

- Terraform
- Terraform local modules (remote modules not yet supported)

Scans run directly in Datadog using hosted scanning. GitHub and GitLab repositories are supported.

## How it works

IaC Security integrates directly with your GitHub or GitLab repositories. It scans every commit across all branches and performs a daily full scan of each configured repository. When a scan completes, findings are associated with the relevant repository, branch, and file path.

## Key capabilities

### Pull request integration

Datadog adds inline comments to GitHub and GitLab pull requests to flag any IaC violations. When applicable, it also provides suggested fixes that can be applied directly in the pull request. You can also open a new pull request from Datadog to remediate a vulnerability or quality issue. For more information, see [GitHub Pull Requests][5].

### Triage and filtering

After setting up IaC Security, each commit to a scanned repository triggers a scan. Findings are summarized on the [Code Security Vulnerabilities][3] page and grouped per repository on the [Code Security > Repositories][6] page.

You can filter findings by:

- Severity
- Status (open, muted, fixed)
- Resource type
- Cloud provider
- File path
- Team
- Repository

Click a finding to open a side panel that shows:

- **Details**: A description and the relevant code that triggered the finding. (Configure the GitHub App to see the exact code snippet.)
- **Remediation**: One or more code fixes you can apply to resolve the finding.

### Jira integration

You can create a bi-directional Jira ticket directly from any finding. This helps teams track and remediate issues using their existing workflows. Tickets remain synced as changes occur in Datadog or Jira. For more information, see [Bidirectional ticket syncing with Jira][4].

### False positives

If you determine that a finding is a false positive, click **Mark as false positive** in the finding details panel. This hides the finding and excludes it from reporting. You can review or restore false positives at any time using the Status filter on the [Code Security Vulnerabilities][3] page.

## Getting started

1. [Set up IaC Security][1] in your environment.
2. Configure [scanning exclusions][2] to reduce false positives or ignore expected results.
3. Review and triage findings in the [Code Security Vulnerabilities][3] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/iac_security/setup
[2]: /security/code_security/iac_security/exclusions
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?