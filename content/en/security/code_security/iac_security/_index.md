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
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
---

Datadog Infrastructure as Code (IaC) Security detects misconfigurations in Terraform code before deployment. It flags issues such as missing encryption or overly permissive access in files stored in your connected GitHub repositories. Supported file types include standalone Terraform files and local modules.

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="IaC misconfiguration side panel showing details for the high severity IMDSv1 Enabled issue, including a security summary, code snippet, detection timestamps, and remediation steps." width="100%">}}

## How it works

IaC Security integrates with your GitHub repositories to continuously scan for misconfigurations. It analyzes every commit across all branches and performs a daily full scan of each configured repository. Findings surface when violations are detected and are associated with the relevant repository, branch, and file path. This allows you to identify, prioritize, and fix misconfigurations directly at the source.

## Key capabilities

### Review and fix violations in pull requests

When a GitHub pull request includes infrastructure-as-code changes, Datadog adds inline comments to flag any violations. Where applicable, it also suggests code fixes that can be applied directly in the pull request. You can also open a new pull request from Datadog to remediate a finding. For more information, see [GitHub Pull Requests][5].

### View and filter findings

After setting up IaC Security, each commit to a scanned repository triggers a scan. Findings are summarized on the [Code Security Vulnerabilities][3] page and grouped per repository on the [Code Security Repositories][6] page.

Use filters to narrow results by:

- Severity
- Status (open, muted, fixed)
- Resource type
- Cloud provider
- File path
- Team
- Repository

Click any finding to open a side panel that shows:

- **Details**: A description and the relevant code that triggered the finding. (To view code snippets, [install the GitHub App][9].)
- **Remediation**: If available, suggested code fixes are provided for findings that support remediation.

### Create Jira tickets from findings

You can create a bidirectional Jira ticket directly from any finding to track and remediate issues in your existing workflows. Ticket status remains synced between Datadog and Jira. For more information, see [Bidirectional ticket syncing with Jira][4].

### Mute findings

To suppress a finding, click **Mute** in the finding details panel. This opens a muting workflow where you can choose how to mute the finding. Muting a finding hides it and excludes it from reports.

To restore a muted finding, click **Unmute** in the details panel. You can also use the **Status** filter on the [Code Security Vulnerabilities][3] page to review muted findings.

### Exclude specific rules, files, or resources

You can configure exclusions to prevent certain findings from appearing in scan results. Exclusions can be based on rule ID, file path, resource type, severity, or tag.

Exclusions are managed through a configuration file or inline comments in your IaC code. For supported formats and usage examples, see [Configure IaC Security Exclusions][7].

## Next steps

1. [Set up IaC Security][1] in your environment.
2. Configure [scanning exclusions][2] to reduce false positives or ignore expected results.
3. Review and triage findings on the [Code Security Vulnerabilities][3] page.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/iac_security/setup
[2]: /security/code_security/iac_security/exclusions
[3]: https://app.datadoghq.com/security/code-security/iac
[4]: /security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[5]: /security/code_security/dev_tool_int/github_pull_requests/
[6]: https://app.datadoghq.com/ci/code-analysis?
[7]: /security/code_security/iac_security/exclusions/?tab=yaml
[8]: /security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/