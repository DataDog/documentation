---
title: APM Monitor
kind: documentation
description: "Compare an APM metric to a user defined threshold"
aliases:
  - /monitors/monitor_types/trace_analytics
  - /monitors/monitor_types/trace_search/
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

APM monitors work like [metric monitors][1] - but with controls tailored specifically to APM. They allow you to alert at the service level on hits, errors, and a variety of latency measures.

## Monitor creation

To create an [APM monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> APM*.

### Select monitor scope

{{< tabs >}}
{{% tab "APM Metrics" %}}

Choose your [Primary tags][1], [Service][2], and [Resource][3] from the drop-down menus.

### Set alert conditions

Choose a **Threshold** or **Anomaly** alert:

#### Threshold Alert

An alert is triggered whenever a metric crosses a threshold.

* Alert when `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`,  `p75 latency`,  `p90 latency`, or  `p99 latency`
* Alert when `<ALERT_THRESHOLD>`%, `<WARNING_THRESHOLD>`%
* of values are `<NUMBER>` deviations `above or below`, `above`, or `below`
* over the last `5 minutes`, `15 minutes`, `1 hour`, etc.

#### Anomaly Alert

An alert is triggered whenever a metric deviates from an expected pattern.

* For `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`,  `p75 latency`,  `p90 latency`, or  `p99 latency`
* Alert threshold `<NUMBER>`
* Warning threshold `<NUMBER>`
* is `above`, `above or equal to`, `below`, or `below or equal to`

* over the last `5 minutes`, `15 minutes`, `1 hour`, etc.

[1]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[2]: /tracing/visualization/service
[3]: /tracing/visualization/resource
{{% /tab %}}
{{% tab "Trace Analytics" %}}

Trace Search & Analytics enables you to search, filter, and aggregate APM data based on the APM events running through your system and based on tags that you create. Trace Analytics monitoring allows you to set up custom monitors based on this data. Use these monitors to visualize the data over time and to set up alerts based on APM events - for example, if there is a spike in slow requests or anything else you can use APM events to track.


Define your [trace search query][1].

[1]: /tracing/trace_search_and_analytics/search
{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

**Note**: Find service level monitors on the [Services page][4] and on the [Service Map][5], and find resource level monitors on the individual Resource pages (you can get there by clicking on the specific Resource listed on the [Services page][4]).

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/metric
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /monitors/notifications
[4]: https://app.datadoghq.com/apm/services
[5]: https://app.datadoghq.com/apm/map
