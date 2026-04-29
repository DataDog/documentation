---
title: LLM Observability Monitor
description: "Monitor LLM application performance, errors, token usage, and evaluation scores using LLM Observability data."
aliases:
- /monitors/create/types/llm_observability/
further_reading:
- link: "/llm_observability/"
  tag: "Documentation"
  text: "Learn about LLM Observability"
- link: "/llm_observability/monitoring/metrics/"
  tag: "Documentation"
  text: "LLM Observability Metrics"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

With [LLM Observability][1], you can monitor the performance, cost, and quality of your LLM-powered applications. After you enable LLM Observability for your organization, you can create an LLM Observability monitor to alert you when a specific LLM Observability event type exceeds a predefined threshold over a given period of time.

For example, you can create monitors to alert on:
- Error rate spikes in your LLM application
- High token usage or cost anomalies
- Latency degradation for LLM spans
- Low evaluation scores

## Create an LLM Observability monitor

To create an LLM Observability monitor in Datadog, navigate to [**Monitors** > **New Monitor** > **LLM Observability**][2].

<div class="alert alert-info">There is a default limit of 1000 LLM Observability monitors per account. If you are encountering this limit, consider using <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">multi alerts</a>, or <a href="/help/">Contact Support</a>.</div>

### Define the search query

As you expand your search filters, the graph above the search bar updates.

1. Construct a search query using the same logic as an [LLM Observability Explorer search][3].
2. Choose to monitor over an LLM Observability event count, [facet][4], or [measure][5].
    * **Monitor over an event count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of LLM Observability events over a selected time frame, then compares it to the threshold conditions.
    * **Monitor over a facet**: If you select a [facet][4], the monitor alerts over the `Unique value count` of the facet.
    * **Monitor over a measure**: If you select a [measure][5], the monitor alerts over the numerical value of the LLM Observability facet (similar to a metric monitor). Select an aggregation type (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).
3. Group LLM Observability events by multiple dimensions (optional). All events matching the query are aggregated into groups based on the value of up to four facets.
4. Configure the alerting grouping strategy (optional):
    * **Simple Alert**: Aggregates over all reporting sources. You receive one alert when the aggregated value meets the set conditions.
    * **Multi Alert**: Applies the alert to each source according to your group parameters. You receive an alert for each group that meets the set conditions.

### Set alert conditions

An alert is triggered whenever a metric crosses a threshold.

* Triggers when the metric is `above`, `above or equal to`, `below`, or `below or equal to`.
* The threshold during the last `5 minutes`, `15 minutes`, `1 hour`, or `custom` to set a value between 5 minutes and 48 hours.
* Alert threshold `<NUMBER>`.
* Warning threshold `<NUMBER>`.

#### No data and below alerts

To receive a notification when an LLM application has stopped sending events, set the condition to `below 1`. This alert triggers when no LLM Observability events match the monitor query in a given time frame across all aggregate groups.

#### Advanced alert conditions

For more information about advanced alert options such as evaluation delay, see [Configure Monitors][6].

### Notifications

For more information about the **Configure notifications and automations** section, see [Notifications][7].

### Permissions and audit notifications

For more information about the **Define permissions and audit notifications** section, see [Permissions][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/
[2]: https://app.datadoghq.com/monitors/create/llm-observability
[3]: /llm_observability/monitoring/querying/
[4]: /llm_observability/monitoring/querying/
[5]: /llm_observability/monitoring/querying/
[6]: /monitors/configuration/#advanced-alert-conditions
[7]: /monitors/notify/
[8]: /monitors/configuration/?tab=evaluateddata#permissions
