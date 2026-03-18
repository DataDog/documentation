---
title: Secret Scanning
description: Use Datadog Secret Scanning to find secrets exposed in source code.
is_beta: true
algolia:
  tags: ['secrets scanning', 'secret scanning', 'datadog static analysis', 'SAST']

further_reading:
  - link: https://www.datadoghq.com/blog/code-security-secret-scanning
    tag: Blog
    text: Detect and block exposed credentials with Datadog Secret Scanning

---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Secret Scanning is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Secret Scanning scans code to find exposed secrets. Datadog also attempts to validate secrets and surface their status (valid, invalid) to help you prioritize secrets remediation.

## Set up Secret Scanning

Scans can run in your CI/CD pipelines or directly in Datadog with hosted scanning (supported for GitHub, Azure DevOps, and GitLab). To get started, go to the [**Code Security Setup**][1] and click **Activate scanning for your repositories** or learn how to set up Secret Scanning using [GitHub actions][5] or with [other CI providers][6].

## Secret Scanning rules

Datadog Secret Scanning is powered by [Sensitive Data Scanner (SDS)][3] and includes all of the rules in the
[Secrets and credentials category of SDS][4].

## How it works

Secret Scanning integrates directly with your repositories to continuously detect leaked secrets before they become a threat. Built on Datadog's static analyzer, it scans every commit across all branches of each configured repository. Findings are surfaced with repository, branch, and file path context so your team can identify, prioritize, and remediate exposed secrets at the source.

## Key capabilities

### Review exposed secrets in pull requests

When a pull request introduces a leaked secret, Datadog automatically adds inline comments to flag the exposure. You can also open a new pull request from Datadog to remediate the finding directly. For more information, see [Pull Request Comments][7]. 

### Automatically block leaks with PR Gates

Use [PR Gates][11] to prevent leaked secrets from being merged into your main branch. Datadog scans each pull request for exposed secrets and reports a pass or fail status directly to GitHub, Azure DevOps, or GitLab (in preview).

By default, checks are informational, but you can make them blocking to prevent merging when secrets are detected. For setup instructions, see [Set up PR Gate Rules][12].

### Inline exclusions

You can add inline exclusions to prevent certain findings from appearing in scan results. Comment `dd-no-secrets` to ignore secrets detected on the next line.

### View and filter findings

After setting up Secret Scanning, each commit to a scanned repository triggers a scan. Findings are summarized on the [Code Security Vulnerabilities][15] page and grouped per repository on the [Code Security Repositories][14] page.

Use filters to narrow results by facets such as:

- Severity
- Status (open, muted, fixed)
- Validation Status
- Team
- Repository visibility

### Create Jira tickets from findings

You can create a bidirectional Jira ticket directly from any finding to track and remediate issues in your existing workflows. Ticket status remains synced between Datadog and Jira. For more information, see [Bidirectional ticket syncing with Jira][16].

### Declare an incident from a leaked secret
[Declare an incident][13] from a finding by clicking **Declare incident** in the Secret Scanning side panel. The incident is pre-filled with all detection metadata.

### Mute findings

To suppress a finding, click **Mute** in the finding details panel. This opens a workflow where you can [create a Muting Rule][10] for context-aware filtering by tag values (for example, by `repository`). Muting a finding hides it and excludes it from reports.

To restore a muted finding, click **Unmute** in the details panel. You can also use the **Status** filter on the [Code Security Vulnerabilities][15] page to review muted findings.

## Next steps

1. [Set up Secret Scanning][1] in your environment.
2. Set up [Automation Pipelines][10] to automate initial triage.
3. Review findings on the [Code Security Vulnerabilities][15] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /security/code_security/static_analysis/setup
[3]: /security/sensitive_data_scanner/
[4]: /security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[5]: /security/code_security/secret_scanning/github_actions
[6]: /security/code_security/secret_scanning/generic_ci_providers
[7]: /security/code_security/dev_tool_int/pull_request_comments/
[8]: /security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /security/automation_pipelines/
[11]: /pr_gates/
[12]: /pr_gates/setup
[13]: /incident_response/incident_management/investigate/declare/#from-a-leaked-secret
[14]: https://app.datadoghq.com/ci/code-analysis?
[15]: https://app.datadoghq.com/security/code-security/secrets
[16]: /security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
