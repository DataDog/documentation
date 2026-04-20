---
title: Automatic Job Retries
further_reading:
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Explore Pipeline Execution Results and Performance"
  - link: "/continuous_integration/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
---

<div class="alert alert-info">Automatic job retries are in Preview. To request access, contact your Datadog account team.</div>

## Overview

Automatic job retries save developer time by re-running only the failures that are likely transient—such as network timeouts, infrastructure hiccups, or flaky tests—while leaving genuine code defects untouched. Datadog classifies each failed job with an AI-powered error model and, when the failure is determined retriable, triggers a retry through the CI provider's API without manual intervention.

This reduces the number of pipelines developers manually re-run, shortens feedback loops, and keeps pipeline success metrics focused on real problems.

## How it works

1. A CI job fails in your pipeline.
2. Datadog's AI error classifier inspects the job's logs and error context to determine whether the failure is transient.
3. If the failure is classified as retriable, Datadog requests a retry through the provider's API.
4. Datadog retries each job up to a configurable maximum to prevent infinite retry loops.
5. The retry outcome is reflected on the original pipeline in CI Visibility.

## Requirements

- CI Visibility enabled for your [GitHub Actions][1] or [GitLab][2] integration.
- [Datadog Source Code Integration][3] configured for the repositories where you want automatic retries.
- Automatic job retries enabled for your organization. Because this feature is in Preview, access is gated—contact your Datadog account team to request enablement.

## Provider support

{{< tabs >}}
{{% tab "GitLab" %}}

Datadog performs **smart retries** on GitLab: only the specific job classified as retriable is re-run. Other failed jobs that aren't classified retriable, and passing jobs, aren't affected.

- Retries are triggered per job as soon as the job finishes failing.
- Works with GitLab.com (SaaS) and self-hosted GitLab instances reachable by the Datadog Source Code Integration.
- No additional CI cost beyond the retried job itself.

{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub Actions imposes two provider-level limitations that shape how retries work:

- **Retries happen after the workflow finishes.** The GitHub API does not allow retrying an individual job while the rest of the workflow is still running. Datadog waits for the workflow to reach a final state before issuing retries.
- **All failed jobs are retried together.** The GitHub API does not support retrying a single job when other jobs in the workflow have also failed. Datadog uses the "rerun failed jobs" endpoint, which re-runs every failed job in the workflow. This may increase the GitHub Actions compute minutes consumed by your pipelines.

### Protected branches

The Datadog GitHub App's default permissions do not allow retries on protected branches. To enable automatic retries on a protected branch (for example, your default branch), grant the app Maintainer-level access. Review your organization's policies before expanding permissions.

{{% /tab %}}
{{< /tabs >}}

## Limitations

- Each logical job is retried at most one time.
- Jobs classified as non-retriable (for example, compilation errors or asserted test failures) are never retried.
- If a job has already been retried manually or by provider-native retry rules, Datadog does not issue an additional retry.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/pipelines/github/
[2]: /continuous_integration/pipelines/gitlab/
[3]: /integrations/guide/source-code-integration/
