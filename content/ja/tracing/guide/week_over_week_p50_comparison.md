---
title: Compare a Service's latency to the previous week
kind: guide
further_reading:
- link: /tracing/guide/alert_anomalies_p99_database/
  tag: 3 mins
  text: Alert on anomalous p99 latency of a database service
- link: /tracing/guide/apm_dashboard/
  tag: 4 mins
  text: Create a Dashboard to track and correlate APM metrics
- link: /tracing/guide/slowest_request_daily/
  tag: 3 mins
  text: Debug the slowest trace on the slowest endpoint of a web service
- link: /tracing/guide/
  tag: ""
  text: All guides
---

_2 minutes to complete_

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3_cropped_small.mp4" alt="comparison video" video="true" style="width:90%;">}}

Datadog can show you the latency of your application over time and how it compares to similar moments in previous time frames such as last week or month. This example shows a web server for an e-commerce platform and monitors the latency performance for the server has seen over the past month.

1. **Open the [Service Catalog][1]**.

    This page contains a list of all [services][2] providing data to Datadog. You can search over your services by keywords, filter them by `env` tag, and set the time frame.

2. **Search and open a relevant and active service**.

    This example uses the `web-store` service because it is stable. Double-check that issues have not appeared over the last month.

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2_cropped.png" alt="comparison 2" style="width:90%;">}}

    Click the service to see its Service page, which shows analyses of throughput, latency (including percentile distribution), and errors, a summary of the active Datadog monitors for the service, and a breakdown of the [resources][3] made available by the service.

3. **Find the Latency graph** on the top of the Service page and deselect all the percentiles from the legend leaving only the p50 option, then **Expand the Latency graph** to view the full screen mode where you can conduct a more comprehensive analysis.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3_cropped.png" alt="Full view of latency chart with week-over-week display enabled" style="width:90%;">}}

    Datadog APM allows you to compare the different percentiles of latency for the service over time but also to view the full distribution of latencies in the Latency Distribution graph below.

4. **Add the previous week's p50 performance** by checking the `Week` option in the *Compare to Last* section on the right.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="Full view of latency chart with week-over-week display enabled" style="width:90%;">}}

**Note**: As you conduct your analysis you can export this graph to any dashboard from the Service view, and display this data alongside any other chart generated in Datadog, including your custom metrics, host-level information, and logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /tracing/glossary/#services
[3]: /tracing/glossary/#resources
