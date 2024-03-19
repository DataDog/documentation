---
title: Sending Deployment Events for DORA Metrics
kind: documentation
description: Learn how to send deployment events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/deployments
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
DORA Metrics private beta is closed. Fill out the form below to be added to the waitlist.
{{< /callout >}}

## Overview

Deployment events are used to compute Deployment Frequency, Change Lead Time, and Change Failure Rate.
To send deployment events, use the [DORA Metrics API][1] or the [`datadog-ci dora deployment`][2] command. The following attributes are required:
- `started_at`: The time the deployment started.
- `finished_at`: The time the deployment finished.
- `service`: The service that was deployed. The provided service must be registered in the [Service Catalog][3] (for more information, see [Adding Entries to Service Catalog][4]).
The `team` ownership of the service is automatically inferred from the Service Catalog and associated with all metrics.

The `repository_url` and `commit_sha` attributes are required for calculating the Change Lead Time metric. For more information, see [Calculating Change Lead Time](#calculating-change-lead-time).

You can optionally specify the `env` attribute to accurately filter your DORA metrics by environment.

### Example
{{< tabs >}}
{{% tab "API - cURL" %}}

See the [DORA Metrics API reference documentation][1] for the full spec and more examples with the API SDKs.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}} and `${DD_API_KEY}` with your [Datadog API Key][2]:
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
        "env": "prod"
      }
    }
  }
EOF
```

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "datadog-ci CLI" %}}

The [`datadog-ci`][1] CLI tool provides a shortcut to send deployment events within your Continuous Integration environment.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}} and set the `DD_API_KEY` environment variable to your [Datadog API Key][2]:
```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

The deployment finish time is automatically set to now if `--finished-at` is not provided.

If the deployment CI job is running on the exact same Git revision that is being deployed, `git-repository-url` and `git-commit-sha` can be omitted and will be automatically inferred from the CI context.
The `--skip-git` option can be provided to disable sending the repository URL and commit SHA. When this option is added, the Change Lead Time metric will not be available.

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## Calculating Change Lead Time

For a single Git commit, the Change Lead Time (CLT) is calculated as time from the creation of the commit to when the deployment including that commit was executed.
To calculate the Change Lead Time for a deployment, Datadog automatically finds all the commits done since the previous deployment, and computes the average of the related Change Lead Time values.
Change Lead Time is not available for the first deployment of a service that includes Git information. Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.

There are two requirements for calculating Change Lead Time:
1. Both Git repository URL and commit SHA are provided when sending deployment events.
2. Your repository metadata is being [synchronized to Datadog](#synchronize-repository-metadata-to-datadog).

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
1. Select at least **Read** repository permissions for **Contents**.
2. Subscribe at least to **Push** events.

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
When that option is included, the commit information is not sent to Datadog and the Change Lead Time metric is not calculated.
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

DORA Metrics for the `shopist` service only consider the git commits that include changes within `src/apps/shopist/**`. You can configure more granular control of the filtering with `extensions[datadoghq.com/dora-metrics]`.

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

- The retention of Git metadata is 1 month. Commits older than 1 month might not be taken into account when computing Change Lead Time.
Change Lead Time is not available for the first deployment of a service that includes Git information.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
