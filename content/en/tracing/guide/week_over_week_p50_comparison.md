---
title: Compare a Service’s latency to the previous week
kind: guide
disable_toc: true
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "/tracing/guide/slowest_request_daily/"
  tag: "3 mins"
  text: "Debug the slowest trace on the slowest endpoint of a web service"
- link: "tracing/guide/add_span_md_and_graph_it/"
  tag: "7 mins"
  text: "Add span tags and slice and dice your application performance"
- link: "tracing/guide/"
  tag: ""
  text: "All guides"
---

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_3.mp4" alt="comparaison video" video="true" responsive="true" style="width:90%;">}}

Datadog can show you the latency of your application over time and how it compares to similar moments in previous time frames such as week, month, etc. This example shows a web server for an e-commerce platform and monitors the latency performance for the server has  seen over the past month.

1. **Open the [Service List page][1]**.

    This page contains a list of all instrumented services available in Datadog APM. You can search over your services by keywords, filter them by `env` tag, and set the timeline.
2. **Search and open a relevant and active service**.

    The web-store service is used in this example because it’s a stable service that we want to double check that there hasn’t been any issues over the last month.

    {{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_2.png" alt="comparaison 2" responsive="true" style="width:90%;">}}

    The Service page comes out of the box for every service in your stack that’s available in Datadog APM. See in-depth analyses of throughput, latency (including percentile distribution) and errors as well as a summary of the active Datadog monitors for the service and breakdown of the resources made available by the service.

3. **Find the Latency graph** on the top of the Service Dashboard and deselect all the percentiles from the legend leaving only the p50 option, then **Expand the Latency graph** to view the full screen mode where you can conduct a more comprehensive analysis.

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_s3.png" alt="Full view of latency chart with week-over-week display enabled" responsive="true" style="width:90%;">}}

    Datadog APM allows you to compare the different percentiles of latency for the service over time but also to view the full distribution of latencies in the Latency Distribution graph below.

4. **Add the previous weeks p50 performance** by checking the `Week` option in the *Compare to Last* section on the right

{{< img src="tracing/guide/week_over_week_p50_comparison/wow_p50_comp_1.png" alt="Full view of latency chart with week-over-week display enabled" responsive="true" style="width:90%;">}}

**Note**: As you conduct your analysis you can also export this graph to any dashboard from the Service view and display this data alongside any other chart generated in Datadog, including your custom metrics, host-level information and logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
