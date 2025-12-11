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

## Overview

Deployment events are used to compute [deployment frequency](#calculating-deployment-frequency), [change lead time](#calculating-change-lead-time), and [change failure rate](#calculating-change-failure-rate).

## Selecting and configuring a deployment data source

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

[APM Deployment Tracking][15] can be configured as a data source for deployments in DORA Metrics.

### Requirements

- **APM Deployment Tracking** is enabled as a **Deployments** event data source in [DORA settings][19].
- Your service has [metadata][16] defined in the Software Catalog.
- Your service has [unified service tagging][17] enabled. Deployments are identified using the `version` tag.

For more information about ensuring service deployments that are tracked by APM contribute to change lead time, see [change lead time requirements](#requirements-for-calculating-change-lead-time).

[15]: /tracing/services/deployment_tracking
[16]: /software_catalog/adding_metadata
[17]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[18]: /dora_metrics/setup/deployments/?tab=apmdeploymenttracking#selecting-a-deployment-data-source
[19]: https://app.datadoghq.com/ci/settings/dora


{{% /tab %}}
{{% tab "API or CLI" %}}

To send your own deployment events, use the [DORA Metrics API][21] or the [`datadog-ci dora deployment`][22] command.

### Requirements

- **datadog-ci CLI / API** is enabled as a **Deployments** event data source in [DORA settings][28].
- The following attributes are required:
  - `started_at`: The time the deployment started.
  - `finished_at`: The time the deployment finished.
  - `service`: The service that was deployed. If the provided service is registered in the [Software Catalog][23] with metadata set up (see [Adding Metadata][24]), the `team` of the service is automatically retrieved and associated with all metrics.

You can optionally add the following attributes to the deployment events:

- `repository_url`: The source code repository of the service. Required for calculating change lead time.
- `commit_sha`: The SHA of the HEAD commit associated with the deployment. Required for calculating change lead time.
- `team`: Associate a deployment with a different `team` than the one found automatically for the service.
- `env`: Filter your DORA metrics by environment on the [DORA Metrics][25] page.
- `id`: Identify a deployment. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `version`: The deployment version.
- `custom_tags`: Tags in the form `key:value` that can be used to filter events on the [DORA Metrics][25] page.


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
        "team": "backend",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

### CLI Example

The [`datadog-ci`][22] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][27]:
```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --version v1.12.07 --custom-tags department:engineering \
    --custom-tags app_type:backend \
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
[28]: https://app.datadoghq.com/ci/settings/dora


{{% /tab %}}
{{< /tabs >}}

## Calculating deployment frequency

Deployment frequency is calculated based on the count of deployment events. Frequency is calculated by dividing this count over a specific time frame.

## Calculating change lead time

For a single Git commit, change lead time (CLT) is calculated as time from the creation of the commit to when the deployment including that commit was executed.

To calculate change lead time for a deployment, Datadog runs [`git log`][6] between the deployment commit SHA and the previous deployment commit SHA to find all the commits being deployed. Then, it computes the average of the related change lead time values for all these commits. Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

For deployments identified through APM Deployment Tracking, the change lead time of a commit is computed from the time of commit creation to when that commit is first seen in a new version. It means that the `Deploy Time` metric is not available.

For service deployments tracked by APM to contribute to change lead time, ensure the following:

### Requirements for calculating change lead time
- Your application telemetry is tagged with Git information. You can enable this [in APM][101] or see the [Source Code Integration documentation][102].
- Your repository metadata is [synchronized](#synchronize-repository-metadata-to-datadog) to Datadog.


[101]: https://app.datadoghq.com/source-code/setup/apm
[102]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information
[103]: /integrations/github/

{{% /tab %}}
{{% tab "API or CLI" %}}

For service deployments tracked by the DORA Metrics API or the `datadog-ci dora deployment` command to contribute to change lead time, ensure the following:

### Requirements for calculating change lead time

- The attributes `repository_url` and `commit_sha` are included in the deployment events payload.
- Your repository metadata is [synchronized](#synchronize-repository-metadata-to-datadog) to Datadog.

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

<div class="alert alert-danger">
GitHub workflows running on <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> trigger </a> are not currently supported by the GitHub integration.
If you are using the <code>pull_request</code> trigger, use the alternative method.
</div>

If the [GitHub integration][1] is not already installed, install it on the [GitHub integration tile][2].

When configuring the GitHub application:
1. Select at least **Read** repository permissions for **Contents** and **Pull Requests**.
2. Subscribe at least to **Push**, **PullRequest** and **PullRequestReview** events.

To confirm that the setup is valid, select your GitHub application in the [GitHub integration tile][2] and verify that the **Datadog Features** table shows **Pull Request Information** meets all requirements.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
If the [GitLab integration][1] is not already installed, install it on the [GitHub integration tile][2].

[1]: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=gitlabsaasonprem#source-code-management-providers
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration

**Note**: The scope of the service account's personal access token needs to be at least `read_api`.

#### Handling GitLab groups and subgroups

If your repositories are organized under [**GitLab groups or subgroups**][1] (for example,
`https://gitlab.com/my-org/group(/subgroup)/repo`),
the automatic service path detection may not resolve correctly due to GitLab's nested group structure.

To ensure that DORA metrics handle your service's source code paths correctly,
you can use the following configuration in your service definition:

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      # All paths relative to the repository URL provided with the deployment
      - **
      # or specific paths related to this service (for monorepos)
      - src/apps/shopist/**
      - src/libs/utils/**
```
[1]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Other Git Providers" %}}

You can upload your Git repository metadata with the [`datadog-ci git-metadata upload`][1] command.
When this command is executed, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command in CI for every new commit. If a deployment is executed for a specific commit SHA, ensure that the `datadog-ci git-metadata upload` command is run for that commit **before** the deployment event is sent.

<div class="alert alert-danger">
Do not provide the <code>--no-gitsync</code> option to the <code>datadog-ci git-metadata upload</code> command.
When that option is included, the commit information is not sent to Datadog and the change lead time metric is not calculated.
</div>

You can validate the correct setup of the command by checking the command output. An example of a correct output is:
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}


### Handling multiple services in the same repository

If the source code of multiple services is present in the same repository, further actions are needed to ensure that the change lead time is calculated by taking into account only the commits affecting the specific service being deployed.

To filter the commits measured to only the ones that affect the service, specify the source code glob file path patterns in the [service definition][5].

If the service definition contains a **full** GitHub or GitLab URL to the application folder, a single path pattern is automatically used. The link type must be **repo** and the link name must be either "Source" or the name of the service (`shopist` in the examples below).

**Example (schema version v2.2):**
{{< tabs >}}
{{% tab "GitHub" %}}
```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```
{{% /tab %}}
{{% tab "GitLab" %}}
```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```
{{% /tab %}}
{{< /tabs >}}

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

- Change lead time stage breakdown metrics are only available for GitHub and GitLab.
- Change lead time is not available for the first deployment of a service that includes Git information.
- Change lead time is not available if the most recent deployment of a service was more than 60 days ago.
- The Change Lead Time calculation includes a maximum of 5000 commits per deployment.
- When using "Squash" to merge pull requests:
  - For GitHub and GitLab: Metrics are emitted for the original commits.
  - For other Git providers: Metrics are emitted for the new commit added to the target branch.
- When using "Rebase", either manually or to merge pull requests:
  - For all Git providers: Metrics are emitted based on the original commit timestamps, while the displayed SHA corresponds to the newly created rebased commit.

## Calculating change failure rate

Change failure rate is calculated by dividing the number of failure events over the number of deployment events for the same services and/or teams associated to both a failure and a deployment event.

## Custom tags

If the service associated with the deployment is registered in the [Software Catalog][1] with metadata set up (see [Adding Metadata][2]), the `languages` of the service and any `tags` are automatically retrieved and associated with the deployment event.

[1]: /tracing/software_catalog
[2]: /tracing/software_catalog/adding_metadata

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: /tracing/software_catalog
[4]: /tracing/software_catalog/setup
[5]: /tracing/software_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/data_collected
[8]: https://www.datadoghq.com/support/
