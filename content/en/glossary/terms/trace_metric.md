---
title: trace metric
core_product:
  - apm
---
Trace metrics are automatically collected and kept with a 15-month retention policy similar to any other [Datadog metric][1]. They can be used to identify and alert on hits, errors, or latency. Statistics and metrics are always calculated based on all traces, and are not impacted by ingestion controls.

Trace metrics are tagged by the host receiving traces along with the service or resource. For example, after instrumenting a web service trace metrics are collected for the entry-point span `web.request` in [**Metrics** > **Summary**][2].

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="trace metrics" >}}

Trace metrics can be exported to a dashboard from the **Service** or **Resource** page. Additionally, trace metrics can be queried from an existing dashboard.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="trace metrics dashboard" >}}

Trace metrics are useful for monitoring. APM monitors can be set up on the [New Monitors][3], [Service][4], or [Resource][5] page. A set of suggested monitors is available on the [Service][4] or [Resource][5] page.

{{< img src="tracing/visualization/trace_metric_monitor.mp4" video="true" alt="trace metrics monitor" >}}

[1]: /developers/guide/data-collection-resolution-retention/
[2]: https://app.datadoghq.com/metric/summary
[3]: https://app.datadoghq.com/monitors
[4]: /tracing/services/service_page/
[5]: /tracing/services/resource_page/