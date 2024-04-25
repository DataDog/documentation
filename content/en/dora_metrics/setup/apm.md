---
title: Configuring APM Deployment Tracking for DORA Metrics
kind: documentation
description: Learn how to configure APM Deployment Tracking as a data source for DORA Metrics deployments.
aliases:
- /continuous_integration/dora_metrics/setup/apm
is_beta: true
further_reading:
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: "Release Notes"
  text: "Check out the latest Software Delivery releases! (App login required)"
- link: "/continuous_integration/dora_metrics/setup/incidents"
  tag: "Documentation"
  text: "Learn about sending incident events"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
The DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview
APM [Deployment Tracking][2] can be configured as a data source for deployments in DORA Metrics.

For service deployments tracked by APM to contribute to DORA Metrics, the following requirements must be met:
- Your service has [metadata][1] defined in the Service Catalog.
- Your service has [unified service tagging][3] enabled. Deployments are identified via the `version` tag.

## Change lead time
For service deployments tracked by APM to contribute to Change Lead Time, the following requirement must be met:
- Your application telemetry is tagged with git information. You can enable this [in APM][4] or see [documentation][5].
- Your repository metadata is synchronized to Datadog via the GitHub integration. APM Deployment Tracking is not available to customers 

For deployments identified via Deployment Tracking, change lead time is computed from time of first commit creation to when that commit is first seen in a new version.

### Breakdown metrics
Datadog breaks down change lead time into the following metrics, which represent the different stages from commit creation to deployment.

To compute these metrics, there must be a PR associated with a commit, if any. A commit is associated with a PR if the commit is first introduced to the target branch when merging that PR.

If a commit does not have an associated PR, only Time to Deploy and Deploy Time are available.

- `dora.time_to_pr_ready`: Time from when the commit is created until the PR is ready for review. This metric is only available for commits that were made before the PR is ready for review.
- `dora.review_time`: Time from when the PR is marked ready for review until it receives the last approval. This metric is only available for commits that were made before the PR is approved.
- `dora.merge_time`: Time from the last approval until the PR is merged.
- `dora.time_to_deploy`: Time from PR merge to start of deployment. If a commit does not have an associated PR, this metric is calculated as the time from commit creation to start of deployment.

### Synchronize repository metadata to Datadog

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-warning">
GitHub workflows running on <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> trigger </a> are not currently supported by the GitHub integration.
If you are using the <code>pull_request</code> trigger, use the alternative method.
</div>

If the [GitHub integration][1] is not already installed, install it on the [GitHub integration tile][2].

When configuring the GitHub application:
1. Select at least **Read** repository permissions for **Contents** and **Pull Requests**.
2. Subscribe at least to **Push**, **PullRequest** and **PullRequestReview** events.

To confirm that the setup is valid, select your GitHub application in the [GitHub integration tile][2] and verify that, under the **Features** tab, the **DORA Metrics: Collect Change Lead Time metric** feature is enabled.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

### Handling multiple services in the same repository

If the source code of multiple services is present in the same repository, further actions are needed to ensure that the Change Lead Time is calculated by taking into account only the commits affecting the specific service being deployed.
To filter the commits measured to only the ones that affect the service, specify the source code glob file path patterns in the [service definition][5].

If the service definition contains a **full** GitHub URL to the application folder, a single path pattern is automatically used.

**Example (schema version v2.2):**

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

DORA Metrics for the `shopist` service only consider the Git commits that include changes within `src/apps/shopist/**`. You can configure more granular control of the filtering with `extensions[datadoghq.com/dora-metrics]`.

**Example (schema version v2.2):** 

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

DORA Metrics for the service `shopist` only consider the Git commits that include changes within `src/apps/shopist/**` or `src/libs/utils/**`.

### Limitations

- Change Lead Time for deployments identified via APM Deployment Tracking is only available for GitHub repositories.
- The retention of Git metadata is 1 month. Commits older than 1 month might not be taken into account when computing Change Lead Time.
- Change Lead Time is not available for the first deployment of a service that includes Git information.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_catalog/add_metadata
[2]: /tracing/services/deployment_tracking
[3]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[4]: https://app.datadoghq.com/source-code/setup/apm
[5]: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information