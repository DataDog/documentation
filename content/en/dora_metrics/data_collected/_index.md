---
title: DORA Metrics Data Collected
description: "Learn about DORA Metrics events, fields, tags, and change lead time stages for deployment frequency, change lead time, and failure analysis."
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

## Overview

DORA Metrics generates events that have associated fields and tags.

| Event Type | Description |
| :--- | :--- |
|Deployment | A single code deployment. Each deployment is uniquely identified by a specific combination of env, service, and version tags.
|Commit | A commit event is generated for each individual commit included in a deployment. These events contain metadata and are automatically linked to the corresponding deployment.
|Failure | A failure in production, such as an incident, rollback, or alert.

**Note**: DORA Metrics events have a 2-year retention period.

### Default tags

All events contain the following tags if any are available:

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

**Note**: The `severity` tag is available for failure events when it is provided by the failure's data source.

For more information about using tags, see [Getting Started with Tags][6].

### Custom tags

In addition to the tags above, deployment and failure events can be enriched with custom tags to filter DORA Metrics. There are three potential sources for these tags:

- Software Catalog: If a deployment or failure event is associated with services in Software Catalog, it is automatically enriched with the `language` tag and the [custom tags defined in the Service Definitions][13].
- Incident Management: Failure events created from [Datadog Incident Management][14] are enriched with custom tags for any user-defined [Single Select or Multi Select property fields][15].
- DORA Metrics API: Up to 100 user-provided custom tags can be added to both deployment and failure events in the [API][7].

For more information about using custom tags in DORA Metrics, see [DORA Metrics Overview][16].

## DORA metrics

DORA Metrics provide the following fields:


| Metric                        | Description                |
|-------------------------------|----------------------------|
| `Deployment Frequency`          | The number of deployments detected by Datadog based on your selected [deployment data source][10].|
| `Change Lead Time`          | The age in seconds of all associated Git commits at the time of deployment.|
| `Change Failure Rate`          | Calculated with the formula `Count of Failures/Count of Deployments`. A long time rollup of at least 1 week is recommended to account for the time difference between deployments and when the failure starts.|
| `Time to Restore`          | The time in seconds between a failure's `started_at` and `finished_at` timestamps.|


## Change lead time stages

Datadog breaks down change lead time into the following fields, which represent the different stages from commit creation to deployment.

| Metric                     | Description                |
|----------------------------|----------------------------|
| `Time to PR Ready`          | Time from when the commit is created until the PR is ready for review. This metric is only available for commits made before the PR is marked as ready for review. |
| `Review Time`          | Time from when the PR is marked ready for review until it receives the last approval. This metric is only available for commits made before the PR is approved. |
| `Merge Time`          | Time from the last approval until the PR is merged. |
| `Time to Deploy` | Time from PR merge to start of deployment. If a commit has no associated PR, this metric is calculated as the time from commit creation to start of deployment. |
| `Deploy Time`          | Time from start of deployment to end of deployment. This metric is not available if there is no deployment duration information. |

These stages are only computed when the source of the repository metadata is GitHub or GitLab, and for most stages, there must be a pull request (PR) associated with a commit. A commit is associated with a PR if the commit is first introduced to the target branch when merging that PR. If a commit has no associated PR, only `Time to Deploy` and `Deploy Time` fields are available.

### Recommendations

Using commit-level granularity provides a more accurate view of engineering performance. At the deployment level, metrics are calculated as an average of averages, which can obscure key insights. This approach treats all deployments equally, even if one contains one commit and another contains ten, misrepresenting their impact.

### Notes

- These fields are measured for every commit and not per deployment.
- There are several edge cases depending on the way the commits were introduced to the deployment, view the [limitations][12].

## Event-specific fields

### Deployment fields

| Field     | Description                |
|------------|----------------------------|
| `Duration` | Duration of the deployment. |
| `Avg Change Lead Time`      | The average duration of [change lead time](#commit-fields) of all commits.  |
| `Avg Time to PR Ready`          | The average duration of [time to PR ready](#commit-fields) of all commits. |
| `Avg Review Time`       | The average duration of [review time](#commit-fields) of all commits. |
| `Avg Merge Time`       | The average duration of [merge time](#commit-fields) of all commits. |
| `Avg Time to Deploy`       | The average duration of [time to deploy](#commit-fields) of all commits. |
| `Number of Commits`        | Count of all commits included in a deployment. |



### Commit fields

| Field  | Description                |
|------------|----------------------------|
| `Change Lead Time`       | Duration it takes for a commit to get into production. |
| `Time to PR Ready`       | Duration from commit creation to when the PR is marked as ready for review. |
| `Review Time`       | Duration from PR being marked ready for review to approval. |
| `Merge Time`       | Duration from PR approval to merging. |
| `Time to Deploy`       | Duration from merging to start of deployment. |
| `Deploy Time`       | Duration from start of deployment to end of deployment. |



### Failure fields

| Field  | Description                |
|------------|----------------------------|
| `Time to Restore`       | The time in between a failure's `started_at` and `finished_at` timestamps. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/explorer/
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
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[14]: https://app.datadoghq.com/incidents
[15]: /incident_response/incident_management/describe#attributes
[16]: /dora_metrics/
