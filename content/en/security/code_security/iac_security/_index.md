---
title: Infrastructure as Code (IaC) Security
aliases:
  - /security/cloud_security_management/iac_scanning/
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-iac-security/"
    tag: "Blog"
    text: "Prevent cloud misconfigurations from reaching production with Datadog IaC Security"
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/exclusions"
    tag: "Documentation"
    text: "Configure IaC Security Exclusions"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
  - link: "/pr_gates/"
    tag: "Documentation"
    text: "PR Gates"
---

Datadog Infrastructure as Code (IaC) Security detects misconfigurations in Terraform and Kubernetes configurations before they're deployed. It flags issues such as missing encryption or overly permissive access in files stored in your connected GitHub, GitLab, or Azure DevOps repositories. Supported file types include standalone Terraform files, local modules, and Kubernetes manifests.

{{< img src="/security/infrastructure_as_code/iac_misconfiguration_side_panel.png" alt="IaC misconfiguration side panel showing details for the high severity IMDSv1 Enabled issue, including a security summary, code snippet, detection timestamps, and remediation steps." width="100%">}}

## How it works

IaC Security integrates with your repositories to continuously scan for misconfigurations. It analyzes every commit across all branches and performs a full daily scan of each configured repository. When violations are detected, findings are surfaced and linked to the relevant repository, branch, and file path. This helps you identify, prioritize, and fix misconfigurations directly at the source.

## Key capabilities

### Review and fix violations in pull requests

When a pull request includes infrastructure-as-code changes, Datadog adds inline comments to flag any violations. Where applicable, it also suggests code fixes that can be applied directly in the pull request. You can also open a new pull request from Datadog to remediate a finding. For more information, see [Pull Request Comments][5].

### Automatically block risky changes with PR Gates

Use [PR Gates][11] to enforce security standards on infrastructure-as-code changes before they're merged. Datadog scans the IaC changes in each pull request, identifies any vulnerabilities above your configured severity threshold, and reports a pass or fail status to GitHub or Azure DevOps.

By default, checks are informational, but you can make them blocking in GitHub or Azure DevOps to prevent merging when critical issues are detected. For setup instructions, see [Set up PR Gate Rules][12].

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

To suppress a finding, click **Mute** in the finding details panel. This opens a workflow where you can [create a Muting Rule][10] for context-aware filtering by tag values (for example, by `service` or `environment`). Muting a finding hides it and excludes it from reports.

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
[10]: /security/automation_pipelines/
[11]: /pr_gates/
[12]: /pr_gates/setup