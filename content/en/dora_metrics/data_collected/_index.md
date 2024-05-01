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

DORA Metrics generates [metrics][9] for each of the four core DORA metrics, as well as events with associated tags and attributes that are available in the [Events Explorer][1].

## Default metrics

DORA Metrics provides the following default metrics:

| Metric | Type | Description |
| :--- | :--- | :--- |
| `dora.deployments.count` | count | The number of deployments detected by Datadog based on your selected [deployment data source][10].
| `dora.change_lead_time` | distribution | The age in `seconds` of associated Git commits at the time of deployment.
| `dora.incidents_impact` | count | Tracks the services or teams impacted by incidents. Used for change failure rate with the formula `dora.incidents_impact / dora.deployments.count`. A big time rollup of at least 1 week is recommended to account for the time difference between deployments and when the impact starts.
| `dora.time_to_restore` | distribution | The time in `seconds` between an incident's `started_at` and `finished_at` timestamps.

### Default tags

All default metrics contain the following tags if any are available:

- `service`
- `team`
- `env`
- `repository_id`

**Note**: The `severity` tag is available for `dora.incidents_impact` and `dora.time_to_restore` metrics, if it is provided through the [DORA Metrics API][7].

For more information about using `env`, `service`, and `version` tags, see [Getting Started with Tags][6].

## Examine metrics in Event Management

DORA default metrics are available in the [Events Explorer][4] under the `Software Delivery Insights` source in [Event Management][1]. To search and filter on DORA Metrics events in the explorer, navigate to [**Service Management** > **Event Management** > **Explorer**][11] and enter `source:software_delivery_insights` in the search query to filter on DORA Metrics events.

{{< img src="dora_metrics/events.png" alt="Events collected from DORA Metrics in the Events Explorer" style="width:100%;" >}}

These metrics can be queried programmatically by using the [Query timeseries points][5] and [Query timeseries data across multiple products][6] API endpoints with the source `software_delivery_insights`.

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
[9]: https://docs.datadoghq.com/metrics/
[10]: /dora_metrics/deployments/_index.md
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true