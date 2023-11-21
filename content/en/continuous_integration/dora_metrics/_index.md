---
title: DORA Metrics
kind: documentation
description: Learn how to use DORA metrics to improve and measure software development.
is_beta: true
further_reading:
- link: "/continuous_integration/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
- link: "/continuous_integration/pipelines"
  tag: "Documentation"
  text: "Learn about Pipeline Visibility"
- link: "/continuous_integration/static_analysis"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "/tracing/service_catalog"
  tag: "Documentation"
  text: "Learn about the Service Catalog"
- link: "https://github.com/DataDog/datadog-ci"
  tag: "Source Code"
  text: "Learn about the datadog-ci CLI tool"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://forms.gle/Eqq6uXfGjYxmqpjDA" header="false" >}}
DORA Metrics are in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

DevOps Research and Assessment (DORA) metrics are [four key metrics][1] used to indicate the velocity and stability of software development.

Deployment Frequency
: How often an organization successfully releases to production.

Lead Time for Changes
: The amount of time it takes a commit to get into production.

Change Failure Rate
: The percentage of deployments causing a failure in production.

Time to Restore Service
: How long it takes an organization to recover from a failure in production.

Defining and tracking DORA metrics can help you identify areas of improvement for your team or organization's speed and quality of software delivery.

## Set up DORA Metrics

Services tracked for DORA Metrics must be registered in the [Service Catalog][2]. For more information, see [Adding Entries to Service Catalog][3]. The `team` ownership from the Service Catalog is automatically associated with all metrics.

### Deployment frequency

Submit a deployment with the [DORA Metrics API][5] or with the `datadog-ci dora deployment` command using the [`datadog-ci`][4] CLI tool.

You are required to provide the following deployment attributes:

- `service`
- `started_at`
- `finished_at`

You can optionally add the following deployment attributes:

- `repository_url` and `commit_sha` must both be present if you would like your deployment to be factored into [change lead time](#lead-time-for-changes).
- `env` to accurately filter your DORA metrics by environment.

#### Example

{{< tabs >}}
{{% tab "API - cURL" %}}

See the [DORA Metrics API reference documentation][1] for the full spec and more examples with the API SDKs.

For the following example, replace `<DD_SITE>` in the URL with {{< region-param key="dd_site" code="true" >}}:
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
{{% /tab %}}

{{% tab "datadog-ci CLI" %}}

The [`datadog-ci`][1] CLI tool provides a shortcut to send the deployments within CI.

For the following example, set the `DD_SITE` environment variable to {{< region-param key="dd_site" code="true" >}}:
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

You can optionally add the following parameters:
  - `finished-at` is automatically set to now if not provided.
  - `env`
  - `git-repository-url` and `git-commit-sha` can be omitted if the deployment CI job is running on the exact same Git checkout that has been deployed.
  - `skip-git` disables the Git details ([change lead time](#lead-time-for-changes) is not available).

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
{{% /tab %}}
{{< /tabs >}}

### Lead time for changes

Lead time for changes, or change lead time, is calculated as the time from creation of the first commit to when that commit's deployment is finished.

For change lead time to be available, you must [send deployment events](#deployment-frequency) while your repository metadata is being synchronized to Datadog.

The deployment events must include the `repository_url` and `commit_sha` fields.

Change lead time automatically finds new commits included since the previous deployment. Change lead time is not available for the first deployment of a service.

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

<div class="alert alert-info">
Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.
</div>

{{< tabs >}}
{{% tab "GitHub" %}}

Install Datadog's [GitHub integration][1] on the [GitHub integration tile][2] to allow Datadog to synchronize your repository metadata automatically. When specifying permissions on the integration tile, select at least **Read** permissions for **Contents**.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "Other Git Providers" %}}

You can upload your repository metadata with the [`datadog-ci git-metadata upload`][1] command.

When you run `datadog-ci git-metadata upload` within a Git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command in CI for every new commit.

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

#### Filter Git commits in monorepos

If you are using a monorepo (building several services from the same Git repository), not every Git commit affects the lead time of all services.

To filter the commits measured to only the ones that affect the service, specify the source code glob file path patterns in the [Service definition][6].

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

### Change failure rate

Change failure rate is calculated as the percentage of incident events out of the total number of deployments.

Submit deployment events as described in [deployment frequency](#deployment-frequency). Additionally, submit an incident with the [DORA Metrics API][7].

You are required to provide the following incident attributes:

- `service`
- `started_at`

You can optionally add the following incident attributes:

- `finished_at` for *resolved incidents*. Required for [time to restore service](#time-to-restore-service).
- `name` to describe the incident.
- `severity`
- `env` to accurately filter your DORA metrics by environment.
- `repository_url`
- `commit_sha`

See the [DORA Metrics API reference documentation][7] for the full spec and more examples with the API SDKs.

#### Example

```shell
curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/dora/incident" \
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
        "name": "Web server is down failing all requests",
        "severity": "High"
      }
    }
  }
EOF
```

### Time to restore service

Mean time to restore (MTTR) is calculated as the duration distribution for *resolved incident* events.

*Resolved incidents* are incidents that include `finished_at`.

Follow the steps described in [change failure rate](#change-failure-rate) to send incident events.

Events can be sent both at the start of and after incident resolution. Incident events are matched by the `env`, `service`, and `started_at` attributes.

## Use DORA Metrics

You can access and visualize your DORA metrics and filter them by team, service, repository, environment, and time period on the [DORA Metrics page][8].

Use the information on this page to identify improvements or regressions for each metric, visualize changes, and compare trends over time. DORA metrics can be exported to dashboards and alerted on using [metric monitors][9].

### Limitations

- Deployment and incident events must be sent as soon as possible. Events for which the `started_at` timestamp is 1 hour older than the current time are not accepted.
- Deployments or incidents of the same service cannot occur at the same second.
- For [change lead time](#lead-time-for-changes), the retention of Git metadata is 1 month. Commits older that 1 month are not accounted for.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance
[2]: /tracing/service_catalog
[3]: /tracing/service_catalog/setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[6]: /tracing/service_catalog/adding_metadata
[7]: /api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/monitors/types/metric/?tab=threshold
