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

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Secret Scanning is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Secret Scanning scans code to find exposed secrets. Datadog also attempts to validate secrets and surface their status (valid, invalid) to help you prioritize secrets remediation.

## Set up Secret Scanning

Scans can run in your CI/CD pipelines or directly in Datadog with hosted scanning (supported for GitHub, Azure DevOps, and GitLab). To get started, go to the [{{< ui >}}Code Security Setup{{< /ui >}}][1] and click {{< ui >}}Activate scanning for your repositories{{< /ui >}} or learn how to set up Secret Scanning using [GitHub actions][5] or with [other CI providers][6].

## Secret Scanning rules

Datadog Secret Scanning is powered by [Sensitive Data Scanner (SDS)][3] and includes all of the rules in the
[Secrets and credentials category of SDS][4]. For a subset of detections, Secret Scanning automatically checks if detected keys are live with [third-party active validation][17]. 

## How it works

Secret Scanning integrates directly with your repositories to continuously detect leaked secrets before they become a threat. Built on Datadog's static analyzer, it scans every commit across all branches of each configured repository. Findings are surfaced with repository, branch, and file path context so your team can identify, prioritize, and remediate exposed secrets at the source.

Each scan analyzes the full contents of every file in scope at the scanned commit, not only the lines or files that the commit changed. Diff-aware scanning, which is available for [Static Code Analysis][18], is not supported for Secret Scanning.

When Datadog scans a repository for the first time with hosted scanning, it also scans the full Git history of the repository. See [Detect secrets in Git history](#detect-secrets-in-git-history).

## Key capabilities

### Detect secrets in Git history

Deleting a secret from a file does not remove it from the repository. The secret remains in earlier commits, where anyone with access to the repository can recover it.

When a repository is first scanned with hosted scanning, Datadog scans its full Git history across all branches, in addition to the latest commit. Secrets that are no longer present at the latest commit of the default branch are reported as history-only findings.

History-only findings are labeled {{< ui >}}Detected in Git History{{< /ui >}} in the findings list. To review them:

- **Across all repositories**: Go to [{{< ui >}}Vulnerabilities{{< /ui >}} > {{< ui >}}Secret Scanning (Secrets){{< /ui >}}][15] and filter on the {{< ui >}}Is Git History{{< /ui >}} facet.
- **For a single repository**: Go to [{{< ui >}}Repositories{{< /ui >}}][14], select the repository, and open the {{< ui >}}Leaked Secrets{{< /ui >}} tab.

The finding details panel shows where the secret is in the repository history:

- {{< ui >}}Introduced in{{< /ui >}}: The commit that added the secret, and the author of that commit.
- {{< ui >}}Removed in{{< /ui >}}: The commit that removed the secret. If the secret is still present on an unmerged branch or tag, this shows {{< ui >}}Not removed{{< /ui >}}.

<div class="alert alert-info">Git history is scanned once, when a repository is first scanned with hosted scanning. A secret that is still present on an unmerged branch or tag, but not on the default branch, is reported as a history-only finding. Scans that run in your CI pipelines analyze the scanned commit only.</div>

<div class="alert alert-warning">History-only findings are not closed automatically by later scans, and rewriting Git history does not close them. Rotate or revoke the exposed credential, then <a href="#mute-findings">mute the finding</a>.</div>

### Review exposed secrets in pull requests

When a pull request introduces a leaked secret, Datadog automatically adds inline comments to flag the exposure. You can also open a new pull request from Datadog to remediate the finding directly. For more information, see [Pull Request Comments][7]. 

### Automatically block leaks with PR Gates

Use [PR Gates][11] to prevent leaked secrets from being merged into your main branch. Datadog scans each pull request for exposed secrets and reports a pass or fail status directly to GitHub, Azure DevOps, or GitLab (in preview).

By default, checks are informational, but you can make them blocking to prevent merging when secrets are detected. For setup instructions, see [Set up PR Gate Rules][12].

### Inline exclusions

You can add inline exclusions to prevent certain findings from appearing in scan results. Comment `no-dd-secrets` to ignore secrets detected on the next line.

### View and filter findings

After setting up Secret Scanning, each commit to a scanned repository triggers a scan. Findings are summarized on the [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] page and grouped per repository on the [{{< ui >}}Code Security Repositories{{< /ui >}}][14] page.

On the {{< ui >}}Secret Scanning (Secrets){{< /ui >}} tab, use filters to narrow results by facets such as:

- Severity
- Status (open, muted, fixed)
- {{< ui >}}Validation Status{{< /ui >}}
- Team
- Repository visibility
- {{< ui >}}Is Git History{{< /ui >}}

### Create Jira tickets from findings

You can create a bidirectional Jira ticket directly from any finding to track and remediate issues in your existing workflows. Ticket status remains synced between Datadog and Jira. For more information, see [Bidirectional ticket syncing with Jira][16].

### Declare an incident from a leaked secret
[Declare an incident][13] from a finding by clicking {{< ui >}}Declare incident{{< /ui >}} in the Secret Scanning side panel. The incident is pre-filled with all detection metadata.

### Mute findings

To suppress a finding, click {{< ui >}}Mute{{< /ui >}} in the finding details panel. This opens a workflow where you can [create a Muting Rule][10] for context-aware filtering by tag values (for example, by `repository`). Muting a finding hides it and excludes it from reports.

To restore a muted finding, click {{< ui >}}Unmute{{< /ui >}} in the details panel. You can also use the {{< ui >}}Status{{< /ui >}} filter on the [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] page to review muted findings.

## Next steps

1. [Set up Secret Scanning][1] in your environment.
2. Set up [Automation Pipelines][10] to automate initial triage.
3. Review findings on the [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] page.

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
[17]: /security/code_security/secret_scanning/secret_validation/
[18]: /security/code_security/static_analysis/setup/#diff-aware-scanning
