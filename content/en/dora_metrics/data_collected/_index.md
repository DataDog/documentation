---
title: DORA Metrics Data Collected
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up data sources for DORA Metrics'
- link: '/metrics/'
  tag: 'Documentation'
  text: 'Learn about metrics'
- link: '/getting_started/tagging/'
  tag: 'Documentation'
  text: 'Getting started with Tags'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in Preview.</div>

## Overview

DORA Metrics generates events that have associated metrics and tags.

| Event Type | Description |
| :--- | :--- |
|Deployment | Represents a single code deployment. Each deployment is uniquely identified by a specific combination of env, service, and version tags.
|Commit | A commit event is generated for each individual commit included in a deployment. These events contain metadata and are automatically linked to the corresponding deployment.
|Failure | Captures a failure in production, such as an incident, rollback, or alert.

## DORA metrics

DORA Metrics provide the following event-based metrics:

| DORA Metric | Type | Description |
| :--- | :--- | :--- |
| `deployment.count` | count | The number of deployments detected by Datadog based on your selected [deployment data source][10].
| `commit.change_lead_time` | distribution | The age in `seconds` of associated Git commits at the time of deployment.
| `failure.count` | count | Used for change failure rate with the formula `failure.count/deployment.count`. A big time rollup of at least 1 week is recommended to account for the time difference between deployments and when the impact starts.
| `failure.time_to_restore` | distribution | The time in `seconds` between a failure's `started_at` and `finished_at` timestamps.

### Default tags

All default metrics contain the following tags if any are available:

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

**Note**: The `severity` tag is available for failure events when it is provided by the failure's data source.

For more information about using tags, see [Getting Started with Tags][6].

## Change lead time metrics

Datadog breaks down change lead time into the following metrics, which represent the different stages from commit creation to deployment.

| Metric | Type | Description |
|---|---|---|
| `commit.time_to_pr_ready` | duration | Time from when the commit is created until the PR is ready for review. This metric is only available for commits that were made before the PR was marked as ready for review. |
| `commit.review_time` | duration | Time from when the PR is marked ready for review until it receives the last approval. This metric is only available for commits that were made before the PR is approved. |
| `commit.merge_time` | duration | Time from the last approval until the PR is merged. |
| `commit.time_to_deploy` | duration | Time from PR merge to start of deployment. If a commit has no associated PR, this metric is calculated as the time from commit creation to start of deployment. |
| `commit.deploy_time` | duration | Time from start of deployment to end of deployment. This metric is not available if there is no deployment duration information. |

These metrics are only computed when the source of the repository metadata is GitHub, and there must be a pull request (PR) associated with a commit, if any. A commit is associated with a PR if the commit is first introduced to the target branch when merging that PR. If a commit has no associated PR, only `time_to_deploy` and `deploy_time` metrics are available.

**Recommendations :**

Querying at the commit level provides a more accurate view of engineering performance. At the deployment level, metrics are calculated as an average of averages, which can obscure key insights. This approach treats all deployments equally, even if one contains one commit and another contains ten, misrepresenting their impact.

**Notes:**

- These metrics are emitted for every commit and not per deployment.
- There are several edge cases depending on the way the commits were introduced to the deployment, view the [limitations][12].

## Event-specific metrics and attributes

### Deployment metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `deployment.count` | number | The number of deployments. |
| `deployment.duration` | number (s) | Duration of the deployment. |
| `deployment.number_of_commits`        | number      | Count of all commits included in a deployment. |
| `deployment.avg_change_lead_time`      | number (s)      | The average duration of [change lead time](#commit-metrics) of all commits.  |
| `deployment.avg_time_to_pr_ready`          | number (s)      | The average duration of [time to PR ready](#commit-metrics) of all commits. |
| `deployment.avg_review_time`       | number (s)      | The average duration of [review time](#commit-metrics) of all commits. |
| `deployment.avg_merge_time`       | number (s)      | The average duration of [merge time](#commit-metrics) of all commits. |
| `deployment.avg_time_to_deploy`       | number (s)      | The average duration of [time to deploy](#commit-metrics) of all commits. |

### Deployment attributes

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `deployment.git.commit_sha`     | string | The SHA of the HEAD commit for the deployment. |
| `deployment.id`                 | string | Unique ID of the deployment. If not provided, one will be randomly generated. |

### Commit metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `commit.count` | number | The number of commits. |
| `commit.change_lead_time` | number (s) | Duration from the first commit in a change to its deployment. |
| `commit.deploy_time` | number (s) | Duration from merging a change to its deployment. |
| `commit.time_to_pr_ready` | number (s) | Duration from commit creation to when the PR is marked as "ready for review." |
| `commit.review_time` | number (s) | Duration from PR being marked "ready for review" to approval. |
| `commit.merge_time` | number (s) | Duration from PR approval to merging. |
| `commit.time_to_deploy` | number (s) | Duration from commit creation to deployment. |

### Commit attributes

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `commit.sha`     | string | The SHA of the commit. |

### Failure metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `failure.count` | number | The number of failures. |
| `failure.time_to_restore` | number (s) | The time in between a failure's `started_at` and `finished_at` timestamps. |

### Failure attributes

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `failure.severity`            | string | The severity level of the failure (e.g., SEV-1). |

## Custom Dashboards
 
DORA metrics are highly flexible and can be used in custom dashboards to fit your team’s specific needs. You can also export the default dashboards available in the DORA UI and personalize them to match your workflows and visualization preferences.

{{< img src="dora_metrics/dashboard.png" alt="An example of a custom DORA Metrics Dashboard" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/events/explorer/
[2]: /api/latest/metrics/#query-timeseries-points
[3]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /getting_started/tagging/
[7]: /api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/metrics/
[10]: /dora_metrics/setup/deployments/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /dora_metrics/deployments/#limitations

