---
title: APM Monitor
kind: documentation
description: "Compare an APM metric to a user defined threshold"
aliases:
  - /monitors/monitor_types/app_analytics
  - /monitors/monitor_types/trace_search
further_reading:
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/monitor_status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

APM metric monitors work like regular [metric monitors][1], but with controls tailored specifically to APM. Use these monitors to receive alerts at the service level on hits, errors, and a variety of latency measures.

Analytics monitors allow you to visualize APM data over time and set up alerts based on Indexed Spans. For example, use an Analytics monitor to receive alerts on a spike in slow requests.

## Monitor creation

To create an [APM monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> APM*.

Choose between an **APM Metrics** or **Analytics** monitor:

{{< tabs >}}
{{% tab "APM Metrics" %}}

### Select monitor scope

Choose your [primary tags][1], [service][2], and [resource][3] from the drop-down menus.

### Set alert conditions

Choose a **Threshold** or **Anomaly** alert:

#### Threshold alert

An alert is triggered whenever a metric crosses a threshold.

* Alert when `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`,  `p75 latency`,  `p90 latency`, or  `p99 latency`
* is `above`, `above or equal to`, `below`, or `below or equal to`
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`
* over the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours.

#### Anomaly alert

An alert is triggered whenever a metric deviates from an expected pattern.

* For `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`,  `p75 latency`,  `p90 latency`, or  `p99 latency`
* Alert when `<ALERT_THRESHOLD>`%, `<WARNING_THRESHOLD>`%
* of values are `<NUMBER>` deviations `above or below`, `above`, or `below`
* the prediction during the past `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 1 minute and 48 hours.

[1]: /tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /tracing/visualization/service/
[3]: /tracing/visualization/resource/
{{% /tab %}}
{{% tab "Analytics" %}}

### Define the search query

* Construct a search query using the same logic as a [trace search][1].
* Choose to monitor over a trace count, [facet][2], or [measure][3]:
    * **Monitor over a trace count**: Use the search bar (optional) and do **not** select a facet or measure. Datadog evaluates the number of traces over a selected time frame and then compares it to the threshold conditions.
    * **Monitor over a facet or measure**: If a facet is selected, the monitor alerts over the `Unique value count` of the facet. If a measure is selected, then it's similar to a metric monitor, and aggregation needs to be selected (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99`, or `max`).

**Note:** Analytics monitors can only be created based on [Indexed Spans][4].

### Select alert conditions

* Trigger when the metric is `above` or `above or equal to`
* the threshold during the last `5 minutes`, `15 minutes`, `1 hour`, etc. or `custom` to set a value between 5 minutes and 24 hours.
* Alert threshold: `<NUMBER>`
* Warning threshold: `<NUMBER>`

[1]: /tracing/trace_search_and_analytics/query_syntax/#search-bar
[2]: /tracing/trace_search_and_analytics/query_syntax/#facet-search
[3]: /tracing/trace_search_and_analytics/query_syntax/#numerical-values
[4]: /tracing/visualization/#indexed-span
{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

**Note**: Find service level monitors on the [Services page][4] and on the [Service Map][5], and find resource level monitors on the individual resource pages (you can get there by clicking on the specific resource listed on the [Services page][4]).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/metric/
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /monitors/notifications/
[4]: https://app.datadoghq.com/apm/services
[5]: https://app.datadoghq.com/apm/map
