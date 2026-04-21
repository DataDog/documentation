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

Automatic job retries save developer time by re-running failures that are likely transient, such as network timeouts, infrastructure failures, or flaky tests. Genuine code defects are left alone. Datadog runs each failed job through an AI-powered error classifier. When the failure is identified as retriable, Datadog triggers a retry through the CI provider's API without manual intervention.

This reduces the number of pipelines developers manually re-run, shortens feedback loops, and keeps pipeline success metrics focused on non-transient failures.

## How it works

1. A CI job fails in your pipeline.
2. Datadog's AI error classifier inspects the job's logs and error context to determine whether the failure is transient.
3. If the failure is classified as retriable, Datadog requests a retry through the provider's API.
4. Datadog retries each job up to a maximum number of attempts to prevent infinite retry loops.
5. Datadog records the retry outcome on the original pipeline in CI Visibility.

## Requirements

- CI Visibility enabled for your [GitHub Actions][1] or [GitLab][2] integration.
- [Datadog Source Code Integration][3] configured for the repositories where you want automatic retries.
- Automatic job retries enabled for your organization. Because this feature is in Preview, access is gated. Contact your Datadog account team to request enablement.

## Provider-specific behavior

{{< tabs >}}
{{% tab "GitLab" %}}

Datadog performs **smart retries** on GitLab: only the specific job classified as retriable is re-run. Other failed jobs (that aren't classified as retriable) and passing jobs aren't affected.

- Retries are triggered per job as soon as the job finishes failing.
- Smart retries work with GitLab.com (SaaS) and with self-hosted GitLab instances reachable by the Datadog Source Code Integration.
- There is no additional CI cost beyond the retried job.

{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub Actions imposes two provider-level limitations that shape how retries work:

- **Retries happen after the workflow finishes.** The GitHub API does not allow retrying an individual job while the rest of the workflow is still running. Datadog waits for the workflow to reach a final state before issuing retries.
- **All failed jobs are retried together.** The GitHub API does not support retrying a single job when other jobs in the workflow have also failed. Datadog reruns every failed job in the workflow through a single GitHub API call. This may increase your GitHub Actions compute usage.

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
