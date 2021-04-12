---
title: Correlate Logs with Metrics
kind: guide
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without Limits*"
- link: "/logs/live_tail/"
  tag: "Documentation"
  text: "Datadog live tail functionality"
---

## Overview

Within the Datadog app there are several ways to correlate logs with metrics. Views like [Log Explorer][1], [Dashboards][2], and [Metrics Explorer][3] offer detailed panels and instant view switching to help you quickly gain context of an issue and map it throughout your service.

This guide shows you how to correlate logs and metrics throughout these views.

## Log Explorer

To correlate logs and metrics in the [Log Explorer][4]:

1. Click on any log under the **Content** column. This expands a panel with detailed information about the log.
2. Click on the **Metrics** tab within the panel.

{{< img src="logs/guide/correlate-logs-with-metrics/log-explorer-metrics-tab.png" alt="Log Explorer Metrics"  >}}

## Dashboards

To correlate logs and metrics in a [Dashboard][5]:

1. Navigate to your dashboard.
2. Click on any data point within any widget to populate the [graph menu][6].
3. If your widget contains **logs events that you wish to correlate with metrics**:
    1. Select **View related logs** to populate a panel with detailed information about related logs.
    2. Select a specific log event.
    3. Click on the **Metrics** tab.
4. If your widget contains **metrics that you wish to correlate with logs**:
    1. Select **View related logs**.

{{< img src="logs/guide/correlate-logs-with-metrics/dashboards.gif" alt="Correlate logs with metrics in a dashboard"  >}}

## Metrics Explorer

To correlate logs and metrics on the [Metrics Explorer][7] page:

1. Select a metric to graph.
2. Click on any point within the graph to populate the graph menu.
3. Select **View related logs**.

{{< img src="logs/guide/correlate-logs-with-metrics/metrics-explorer.png" alt="Metrics Explorer - View Related Logs"  >}}


## Further reading
{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/explorer/
[2]: /dashboards/
[3]: /metrics/explorer/
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/dashboard/lists
[6]: /dashboards/timeboards/#graph-menu
[7]: https://app.datadoghq.com/metric/explorer
