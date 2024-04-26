---
title: DORA Metrics Data Collected
kind: documentation
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/getting_started/tagging/'
  tag: 'Documentation'
  text: 'Getting Started with Tags'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Send deployment and incident events to Datadog'
---

## Overview

DORA Metrics generates events that have associated tags and attributes. These events are available in the [Events Explorer][1].

## Default metrics

DORA Metrics provides the following default metrics:

| Metric | Type | Description |
| :--- | :--- | :--- |
| `dora.deployments.count` | count | Used to calculate Deployment Frequency.
| `dora.change_lead_time` | distribution | Contains the age in `seconds` of the Git commits at the time of deployment.
| `dora.incidents_impact` | count | Tracks the services or teams impacted by incidents. Used for Change Failure Rate with the formula `dora.incidents_impact / dora.deployments.count`. A big time rollup of at least 1 week is recommended to account for the time difference between deployments and when the impact starts.
| `dora.time_to_restore` | distribution | Contains the time in `seconds` between the incident's `started_at` and `finished_at`.

### Default tags

All default metrics contain the following tags if any are available:

- `service`
- `team`
- `env`
- `repository_id`

**Note**: The `severity` tag is available for `dora.incidents_impact` and `dora.time_to_restore` metrics, if it is provided through the [DORA Metrics API][7].

For more information about using `env`, `service`, and `version` tags, see [Getting Started with Tags][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/events/explorer/
[2]: /api/latest/metrics/#query-timeseries-points
[3]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[4]: /service_management/events/
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /getting_started/tagging/
[7]: /api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora