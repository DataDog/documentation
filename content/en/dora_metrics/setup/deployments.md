---
title: How to Set Up Deployment Data for DORA Metrics
description: Learn how to send deployment events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/deployments
- /dora_metrics/deployments/apm
- /dora_metrics/deployments/deployment_api
- /dora_metrics/deployments
is_beta: true
further_reading:
- link: "/dora_metrics/setup/failures"
  tag: "Documentation"
  text: "Learn about setting up failure data in DORA Metrics"
- link: "/tracing/software_catalog"
  tag: "Documentation"
  text: "Learn about the Software Catalog"
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

<div class="alert alert-warning">DORA Metrics is in Preview.</div>

## Overview

Deployment events are used to compute [deployment frequency](#calculating-deployment-frequency), [change lead time](#calculating-change-lead-time), and [change failure rate](#calculating-change-failure-rate).

## Selecting and configuring a deployment data source

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

[APM Deployment Tracking][15] can be configured as a data source for deployments in DORA Metrics.

To ensure your service deployments tracked by APM contribute to DORA Metrics, the following requirements must be met:

- Your service has [metadata][16] defined in the Software Catalog.
- Your service has [unified service tagging][17] enabled. Deployments are identified using the `version` tag.

For more information about ensuring service deployments that are tracked by APM contribute to change lead time, see [Deployment Data Sources][18].

[15]: /tracing/services/deployment_tracking
[16]: /software_catalog/adding_metadata
[17]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[18]: /dora_metrics/setup/deployments/?tab=apmdeploymenttracking#selecting-a-deployment-data-source

{{% /tab %}}
{{% tab "API or CLI" %}}

To send your own deployment events, use the [DORA Metrics API][21] or the [`datadog-ci dora deployment`][22] command.

The following attributes are required:
- `started_at`: The time the deployment started.
- `finished_at`: The time the deployment finished.
- `service`: The service that was deployed. If the provided service is registered in the [Software Catalog][23] with metadata set up (see [Adding Metadata][24]), the `team` of the service is automatically retrieved and associated with all metrics.

The `repository_url` and `commit_sha` attributes are also required for calculating the Change Lead Time metric. Optionally, you can specify a `team` attribute to associate a deployment with a different `team` than is found automatically for the service. You can also specify the `env` attribute to filter your DORA metrics by environment on the [**DORA Metrics** page][25].

### API (cURL) Example

See the [DORA Metrics API reference documentation][26] for the full spec and additional code samples.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}} and `${DD_API_KEY}` with your [Datadog API Key][27]:
```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "team": "backend"
      }
    }
  }
EOF
```

### CLI Example

The [`datadog-ci`][22] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][27]:
```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

The deployment finish time is automatically set to now if `--finished-at` is not provided.

If the deployment CI job is running on the exact same Git revision that is being deployed, `git-repository-url` and `git-commit-sha` can be omitted and are automatically inferred from the CI context.

The `--skip-git` option can be provided to disable sending the repository URL and commit SHA. When this option is added, the Change Lead Time metric becomes unavailable.

[21]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[22]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[23]: /tracing/software_catalog
[24]: /tracing/software_catalog/adding_metadata
[25]: https://app.datadoghq.com/ci/dora
[26]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[27]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

## Calculating deployment frequency

Deployment frequency is calculated based on the `dora.deployments.count` metric that is generated and increased with each deployment detected from your selected deployment data source. Frequency is calculated by dividing `dora.deployments.count` over a specific time frame.

## Calculating change lead time

For a single Git commit, change lead time (CLT) is calculated as time from the creation of the commit to when the deployment including that commit was executed.

To calculate change lead time for a deployment, Datadog runs [`git log`][6] between the deployment commit SHA and the previous deployment commit SHA to find all the commits being deployed. Then, it computes the average of the related change lead time values for all these commits. Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

For deployments identified through APM Deployment Tracking, the change lead time of a commit is computed from the time of commit creation to when that commit is first seen in a new version. It means that the `dora.deploy_time` metric is not available.

For service deployments tracked by APM to contribute to change lead time, ensure the following:

- Your application telemetry is tagged with Git information. You can enable this [in APM][101] or see the [Source Code Integration documentation][102].
- Your repository metadata is synchronized to Datadog through the [GitHub integration][103] or by the `datadog-ci git-metadata upload` command.

[101]: https://app.datadoghq.com/source-code/setup/apm
[102]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
[103]: /integrations/github/

{{% /tab %}}
{{% tab "API or CLI" %}}

For service deployments tracked by the DORA Metrics API or the `datadog-ci dora deployment` command to contribute to change lead time, ensure the following:

- Your repository metadata is synchronized to Datadog through the [GitHub integration][101] or by the `datadog-ci git-metadata upload` command.

[101]: /integrations/github/

{{% /tab %}}
{{< /tabs >}}

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

If the two metadata entries are defined for a service, only `extensions[datadoghq.com/dora-metrics]` is considered to filter the commits.

### Limitations

- Change lead time stage breakdown metrics are only available for GitHub.
- Change lead time is not available for the first deployment of a service that includes Git information.
- The Change Lead Time calculation includes a maximum of 5000 commits per deployment.
- For rebased branches, *change lead time* calculations consider the new commits created during the rebase, not the original commits.
- When using "Squash" to merge pull requests:
  - For GitHub: Metrics are emitted for the original commits.
  - For other git providers: Metrics are emitted for the new commit added to the target branch.

## Calculating change failure rate

Change failure rate is calculated by dividing `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an incident and a deployment event.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: /tracing/software_catalog
[4]: /tracing/software_catalog/setup
[5]: /tracing/software_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/data_collected
