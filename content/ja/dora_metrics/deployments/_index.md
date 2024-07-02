---
title: How to Set Up Deployment Data for DORA Metrics
kind: ドキュメント
description: Learn how to send deployment events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/deployments
- /dora_metrics/setup/deployments
is_beta: true
further_reading:
- link: /dora_metrics/failures
  tag: ドキュメント
  text: Learn about setting up failure data in DORA Metrics
- link: /tracing/service_catalog
  tag: ドキュメント
  text: サービスカタログについて
- link: "https://github.com/DataDog/datadog-ci"
  tag: ソースコード
  text: datadog-ci CLI ツールについて
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## 概要

Deployment events are used to compute [deployment frequency](#calculating-deployment-frequency), [change lead time](#calculating-change-lead-time), and [change failure rate](#calculating-change-failure-rate). 

## Selecting a deployment data source

{{< whatsnext desc="DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up the data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/deployments/apm" >}}APM Deployment Tracking{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/deployments/deployment_api" >}}Deployment Event API or datadog-ci CLI{{< /nextlink >}}
{{< /whatsnext >}}

## Calculating deployment frequency

Deployment frequency is calculated based on the `dora.deployments.count` metric that is generated and increased with each deployment detected from your selected deployment data source. Frequency is calculated by dividing `dora.deployments.count` over a specific time frame.

## Calculating change lead time

For a single Git commit, change lead time (CLT) is calculated as time from the creation of the commit to when the deployment including that commit was executed.

To calculate change lead time for a deployment, Datadog runs [`git log`][6] between the deployment commit SHA and the previous deployment commit SHA to find all the commits being deployed. Then, it computes the average of the related change lead time values. Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.

For more information about the breakdown of change lead time metrics, see [Data Collected][7].

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

{{% tab "Other Git Providers" %}}

You can upload your Git repository metadata with the [`datadog-ci git-metadata upload`][1] command.
When this command is executed, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command in CI for every new commit. If a deployment is executed for a specific commit SHA, ensure that the `datadog-ci git-metadata upload` command is run for that commit **before** the deployment event is sent.

<div class="alert alert-warning">
Do not provide the <code>--no-gitsync</code> option to the <code>datadog-ci git-metadata upload</code> command.
When that option is included, the commit information is not sent to Datadog and the change lead time metric is not calculated.
</div>

You can validate the correct setup of the command by checking the command output. An example of a correct output is:
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}


### Handling multiple services in the same repository

If the source code of multiple services is present in the same repository, further actions are needed to ensure that the change lead time is calculated by taking into account only the commits affecting the specific service being deployed.

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

### 制限

- Change lead time stage breakdown metrics are only available for GitHub.
- Change lead time is not available for the first deployment of a service that includes Git information.
- If commits on a feature branch are squashed into a single commit prior to being merged into the default branch, the commit history for that pull request is not included in the change lead time calculation. The first commit included in the calculation is the newly created single commit. 

## Calculating change failure rate

Change failure rate is calculated by dividing `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an incident and a deployment event. 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/data_collected