---
title: Set up DORA Metrics
description: "Configure deployment event data sources for DORA Metrics including APM Deployment Tracking, API, and CLI."
aliases:
- /continuous_integration/dora_metrics/setup/
- /continuous_integration/dora_metrics/setup/deployments
- /dora_metrics/setup/deployments
- /dora_metrics/deployments/apm
- /dora_metrics/deployments/deployment_api
- /dora_metrics/deployments
- /dora_metrics/setup/
further_reading:
- link: '/delivery_performance/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/delivery_performance/dora_metrics/calculation/'
  tag: 'Documentation'
  text: 'Learn how the DORA metrics are calculated'
- link: '/delivery_performance/dora_metrics/change_failure_detection/'
  tag: 'Documentation'
  text: 'Learn about Change Failure Detection'
- link: '/internal_developer_portal/catalog/'
  tag: 'Documentation'
  text: 'Learn about the Catalog'
- link: 'https://github.com/DataDog/datadog-ci'
  tag: 'Source Code'
  text: 'Learn about the datadog-ci CLI tool'
---

## Overview

DORA Metrics tracks and measures your software delivery performance using deployment events. These events power all four key DORA metrics: deployment frequency, change lead time, change failure rate, and time to restore.

To start using DORA Metrics, follow these steps:

1. **[Configure a deployment data source](#configure-a-deployment-data-source)**: Choose how you want to send deployment events to Datadog: through APM Deployment Tracking or the DORA Metrics API/CLI.

2. **[Enrich deployments with commit information](#enrich-deployments-with-commit-information)**: Add Git metadata (repository URL and commit SHA) to your deployment events and synchronize your repository to Datadog to enable change lead time calculations.

3. **[Customize Change Failure Detection](#customize-change-failure-detection)**: DORA Metrics automatically detects failed deployments through rollbacks (redeploying a previous version) and includes default rules for common rollforward patterns like revert PRs and hotfix labels. You can customize these rules to match your team's specific workflows and remediation patterns.

When configured, deployment events automatically populate your [DORA Metrics dashboard][1] with performance data filtered by team, service, environment, and [custom tags](#custom-tags).

### Limitations

- When you first select a data source option (such as APM Deployment Tracking), DORA Metrics begins populating data from that point forward. If you switch from source A to source B, then back to source A, the historical data from source A is only available from the time it was first selected.
- Deployments of the same service cannot occur at the same second.

## Configure a deployment data source

DORA Metrics supports the following data sources for deployment events:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

[APM Deployment Tracking][1] can be configured as a data source for deployments in DORA Metrics.

### Requirements

- {{< ui >}}APM Deployment Tracking{{< /ui >}} is enabled as a {{< ui >}}Deployments{{< /ui >}} event data source in [DORA settings][2].
- Your service has [metadata][3] defined in the Catalog.
- Your service has [unified service tagging][4] enabled. Deployments are identified using the `version` tag.

For more information about ensuring service deployments that are tracked by APM contribute to change lead time, see [Enrich deployments with commit information](#enrich-deployments-with-commit-information).

[1]: /tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /internal_developer_portal/catalog/entity_model/
[4]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API or CLI" %}}

To send your own deployment events, use the [DORA Metrics API][1] or the [`datadog-ci dora deployment`][2] command.

### Requirements

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} is enabled as a {{< ui >}}Deployments{{< /ui >}} event data source in [DORA settings][3].
- The following attributes are required:
  - `started_at`: The time the deployment started.
  - `finished_at`: The time the deployment finished.
  - `service`: The service that was deployed. If the provided service is registered in the [Catalog][4] with metadata set up (see [Adding Metadata][5]), the `team` of the service is automatically retrieved and associated with all metrics.

You can optionally add the following attributes to the deployment events:

- `repository_url`: The source code repository of the service. Required for calculating change lead time.
- `commit_sha`: The SHA of the HEAD commit associated with the deployment. Required for calculating change lead time.
- `team`: Associate a deployment with a different `team` than the one found automatically for the service.
- `env`: Filter your DORA metrics by environment on the [DORA Metrics][6] page.
- `id`: Identify a deployment. This attribute is user-generated; when not provided, the endpoint returns a Datadog-generated UUID.
- `version`: The deployment version.
- `custom_tags`: Tags in the form `key:value` that can be used to filter events on the [DORA Metrics][6] page.


### API (cURL) Example

See the [DORA Metrics API reference documentation][1] for the full spec and additional code samples.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}} and `${DD_API_KEY}` with your [Datadog API Key][7]:
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

The [`datadog-ci`][2] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][7]:
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

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /internal_developer_portal/catalog/
[5]: /internal_developer_portal/catalog/entity_model/
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### Custom tags

If the service associated with the deployment is registered in the [Catalog][2] with metadata set up (see [Adding Metadata][3]), the `languages` of the service and any `tags` are automatically retrieved and associated with the event.

## Enrich deployments with commit information

To enable change lead time calculation, configure Git information for your deployments and synchronize your repository metadata to Datadog. This allows DORA Metrics to track how long commits take from creation to deployment.

### Attach Git information to deployments

Datadog needs access to the Git information (repository URL and commit SHA) of your deployment's head commit SHA. The requirements differ based on your deployment data source:

{{< tabs >}}
{{% tab "APM Deployment Tracking" %}}

For deployments identified through APM Deployment Tracking, ensure your application telemetry, in the form of traces, is tagged with Git information:

- Enable Git tagging [in APM][1] or see the [Source Code Integration documentation][2]

**Note**: For APM-tracked deployments, change lead time is calculated from commit creation to when the commit is first observed in a new version. The `Deploy Time` metric is not available.

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API or CLI" %}}

For deployments tracked by the DORA Metrics API or the `datadog-ci dora deployment` command, ensure:

- The attributes `repository_url` and `commit_sha` are included in the deployment events payload

{{% /tab %}}
{{< /tabs >}}

### Synchronize repository metadata to Datadog

Datadog needs access to your repository metadata (commits, file paths) to retrieve all commits deployed between one deployment and the previous one. Choose the synchronization method based on your Git provider:

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
GitHub workflows running on <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> trigger </a> are not currently supported by the GitHub integration.
If you are using the <code>pull_request</code> trigger, use the alternative method.
</div>

If the [GitHub integration][1] is not already installed, install it on the [GitHub integration tile][2].

When configuring the GitHub application:
1. Select at least {{< ui >}}Read{{< /ui >}} repository permissions for {{< ui >}}Contents{{< /ui >}} and {{< ui >}}Pull Requests{{< /ui >}}.
2. Subscribe at least to {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} and {{< ui >}}PullRequestReview{{< /ui >}} events.

To confirm that the setup is valid, select your GitHub application in the [GitHub integration tile][2] and verify that the {{< ui >}}Datadog Features{{< /ui >}} table shows {{< ui >}}Pull Request Information{{< /ui >}} meets all requirements.

[1]: /integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
If the [GitLab Source Code integration][1] is not already installed, install it on the [GitLab Source Code integration tile][2].

**Note**: The scope of the service account's personal access token needs to be at least `read_api`.

### Handling GitLab groups and subgroups

If your repositories are organized under [**GitLab groups or subgroups**][3] (for example,
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

[1]: /integrations/gitlab-source-code/
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
[3]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Azure DevOps" %}}

<div class="alert alert-danger">
If the integration was installed before March 10, 2026, run the <a href="https://github.com/DataDog/azdevops-sci-hooks">webhook installation setup script</a> again to help ensure all DORA metrics are calculated correctly. If you encounter errors, rerun the script before contacting support.
</div>

If the [Azure DevOps Source Code integration][1] is not already installed, install it on the [Azure DevOps Source Code integration tile][2].

To set up the integration:

1. Open the [Azure DevOps Source Code integration tile][2] in Datadog.

2. Select the {{< ui >}}Configuration{{< /ui >}} tab and click {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.

3. Follow the setup instructions.

4. Click {{< ui >}}Add Organizations{{< /ui >}}.

5. Follow the repository installation steps and [**run the setup script**][3]. If the script is not run, commits made before a pull request is created will not be associated with that pull request.

6. After the script completes, verify the integration status on the tile. The connected repositories and projects appear in the list.

[1]: https://docs.datadoghq.com/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

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

To filter the commits measured to only the ones that affect the service, specify the source code glob file path patterns in the [service definition][4].

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
{{% tab "Azure DevOps" %}}
```yaml
links:
  - name: shopist
    type: repo
    provider: azure
    url: https://dev.azure.com/organization/project/_git/example-repository?path=/src/apps/shopist
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

## Customize Change Failure Detection

DORA Metrics automatically identifies failed deployments to calculate change failure rate and failed deployment recovery time.

### How it works

[Change Failure Detection][5] operates out-of-the-box by identifying remediation deployments and linking them back to the specific deployment they are remediating.

**Automatic detection (no configuration needed)**:
- **Rollbacks**: Automatically detected when a previously deployed version is redeployed.

**Custom rules (customizable)**:
- **Rollforwards**: Detected through default rules that match common patterns like revert PRs and hotfix labels. You can customize these rules in the [DORA settings][6] to match your team's specific workflows and remediation patterns.

For detailed information about how detection works and how to customize rules, see the [Change Failure Detection documentation][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /internal_developer_portal/catalog/
[3]: /internal_developer_portal/catalog/entity_model/
[4]: /internal_developer_portal/catalog/entity_model/
[5]: /delivery_performance/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora
