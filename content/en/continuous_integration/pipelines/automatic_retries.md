---
title: Automatic Job Retries
further_reading:
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Explore Pipeline Execution Results and Performance"
  - link: "/continuous_integration/pipelines/github/"
    tag: "Documentation"
    text: "Set up CI Visibility for GitHub Actions"
  - link: "/continuous_integration/pipelines/gitlab/"
    tag: "Documentation"
    text: "Set up CI Visibility for GitLab"
  - link: "/continuous_integration/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
---

<div class="alert alert-info">Automatic job retries are in Preview. To request access, contact your Datadog account team.</div>

## Overview

Automatic job retries save developer time by re-running failures that are likely transient, such as network timeouts, infrastructure failures, or flaky tests. Genuine code defects are not retried. Datadog runs each failed job through an AI-powered error classifier. When the failure is identified as retriable, Datadog triggers a retry through the CI provider's API without manual intervention.

Automatic retries reduce the number of pipelines that developers re-run by hand, shorten feedback loops, and keep pipeline success metrics focused on non-transient failures.

<div class="alert alert-info">Automatic job retries are available for [GitHub Actions][1] and [GitLab][2].</div>
## How automatic job retries work

When a job in your CI pipeline fails:
1. Datadog's AI error classifier inspects the job's logs and error context to determine whether the failure is transient.
  - This is the same AI error classifier used by [CI jobs failure analysis][6], which reads indexed job logs to decide whether a failure is transient.
1. If the failure is classified as retriable, Datadog requests a retry through the provider's API.
1. Datadog retries each failing job up to a maximum number of attempts to prevent infinite retry loops. Retries are counted per job per commit—if the same job fails again on a new commit, the counter resets.
1. Datadog records the retry outcome on the original pipeline in CI Visibility.

## Prerequisites

To use automatic job retries:
- CI Visibility must be enabled for your [GitHub Actions][1] or [GitLab][2] integration.
- [Datadog Source Code Integration][3] must be configured for the repositories where you'd like to use automatic retries.
- Datadog must have indexed CI job logs for the repositories where you'd like to use automatic retries (see [Collect job logs for GitHub Actions][4] or [Collect job logs for GitLab][5]).

## Provider-specific behavior

{{< tabs >}}
{{% tab "GitLab" %}}

When a job fails in GitLab, Datadog only re-runs the specific job classified as retriable. Other failed jobs (that aren't classified as retriable) and passing jobs aren't affected.

- Retries are triggered per job, as soon as the job fails.
- Automatic job retries works for both SaaS (GitLab.com) and self-hosted GitLab instances.
- There is no additional CI cost beyond the retried job(s).

{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub Actions imposes two provider-level limitations that shape how retries work:

- **Retries happen after the workflow finishes.** The GitHub API does not allow retrying an individual job while the rest of the workflow is still running. Datadog waits for the workflow to reach a final state before issuing retries.
- **All failed jobs are retried together.** The GitHub API does not support retrying a single job when other jobs in the workflow have also failed. Datadog reruns every failed job in the workflow through a single GitHub API call. This may increase your GitHub Actions compute usage.

### Protected branches

The Datadog GitHub App's default permissions do not allow retries on protected branches. To enable automatic retries on a protected branch (for example, your default branch), grant the app org-wide Maintainer-level access. Review your organization's policies before expanding permissions.

{{% /tab %}}
{{< /tabs >}}

## Limitations

- Jobs classified as non-retriable (for example, compilation errors or asserted test failures) are never retried.
- If a job has already been retried manually or by provider-native retry rules, Datadog does not issue an additional retry.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/pipelines/github/
[2]: /continuous_integration/pipelines/gitlab/
[3]: /integrations/guide/source-code-integration/
[4]: /continuous_integration/pipelines/github/#collect-job-logs
[5]: /continuous_integration/pipelines/gitlab/#collect-job-logs
[6]: /continuous_integration/guides/use_ci_jobs_failure_analysis/
