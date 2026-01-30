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
|Deployment | A single code deployment uniquely identified by env, service, and version tags.<br><br>Deployments can be [marked as failed][17] and are used to compute deployment frequency, change failure rate, and failed deployment recovery time.
|Commit | An event generated for each individual commit included in a deployment. Contains metadata and is automatically linked to the corresponding deployment.<br><br>Commits are used to compute change lead time.
|Incident | An incident declared in production.<br><br>Tracking incidents provides a side-by-side view of how failed deployments translate into real-world incidents, including their severity and frequency.

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

## Event-specific fields

### Deployment fields

| Field                      | Description                |
|----------------------------|----------------------------|
| `Duration` | Duration of the deployment. |
| `Avg Change Lead Time`      | The average duration of [change lead time](#commit-fields) of all commits.  |
| `Avg Time to PR Ready`          | The average duration of [time to PR ready](#commit-fields) of all commits. |
| `Avg Review Time`       | The average duration of [review time](#commit-fields) of all commits. |
| `Avg Merge Time`       | The average duration of [merge time](#commit-fields) of all commits. |
| `Avg Time to Deploy`       | The average duration of [time to deploy](#commit-fields) of all commits. |
| `Number of Commits`        | Count of all commits included in a deployment. |
| `Deployment Type` | Type of deployment (`standard`, `rollback`, or `rollforward`). |
| `Change Failure` | Boolean indicating whether a deployment is marked as a change failure. |
| `Recovery Time` | Duration in seconds between a failed deployment's `finished_at` and its remediation's `finished_at`. Only available for deployments marked as failures. |
| `Remediation Type` | The type of remediation applied (`rollback` or `rollforward`). Only available for deployments marked as failures. |



### Commit fields

| Field  | Description                |
|------------|----------------------------|
| `Change Lead Time`       | Duration it takes for a commit to get into production. |
| `Time to PR Ready`       | Duration from commit creation to when the PR is marked as ready for review. |
| `Review Time`       | Duration from PR being marked ready for review to approval. |
| `Merge Time`       | Duration from PR approval to merging. |
| `Time to Deploy`       | Duration from merging to start of deployment. |
| `Deploy Time`       | Duration from start of deployment to end of deployment. |



### Incident fields

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
[10]: /dora_metrics/setup/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /dora_metrics/deployments/#limitations
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[14]: https://app.datadoghq.com/incidents
[15]: /incident_response/incident_management/describe#attributes
[16]: /dora_metrics/
[17]: /dora_metrics/change_failure_detection/
