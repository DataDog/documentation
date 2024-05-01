---
title: Debug the slowest trace on the slowest endpoint of a web service
kind: guide
further_reading:
- link: "/tracing/guide/alert_anomalies_p99_database/"
  tag: "3 mins"
  text: "Alert on anomalous p99 latency of a database service"
- link: "/tracing/guide/week_over_week_p50_comparison/"
  tag: "2 mins"
  text: "Compare a service's latency to the previous week"
- link: "/tracing/guide/apm_dashboard/"
  tag: "4 mins"
  text: "Create a Dashboard to track and correlate APM metrics"
- link: "/tracing/guide/"
  tag: ""
  text: "All guides"
---

_3 minutes to complete_

{{< img src="tracing/guide/slowest_request_daily/slowest_trace_1_cropped.mp4" video="true" alt="Identifying the slowest trace and finding the Host metrics for it" style="width:90%;">}}

With Datadog APM, you can investigate the performance of your endpoints, identify slow requests, and investigate the root cause of latency issues. This example shows the slowest [trace][1] of the day for an e-commerce checkout endpoint and how it slows down because of high CPU usage.

1. **Open the [Service Catalog][2]**.

    This page contains a list of all services sending data to Datadog. Note you can search for keywords, filter by `env-tag`, and set the time frame.

2. **Search for a relevant and active web service and open the Service Page**.

    The `web-store` service is used in this example because it is the primary server in the tech stack and it controls most calls to third party services.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_2_cropped.png" alt="Identifying the slowest trace and finding the bottleneck causing it" style="width:90%;">}}

    In addition to throughput, latency, and error rate information, the service details page contains a list of Resources (major operations like API endpoints, SQL queries, and web requests) identified for the service.

3. **Sort the Resource table by p99 latency** and click into the slowest resource.
    **Note**: If you cannot see a p99 latency column, you can click on the cog icon `Change Columns` and flip the switch for `p99`.

    The [Resource][4] page contains high-level metrics about this resource like throughput, latency, error rate, and a breakdown of the time spent on each downstream service from the resource. In addition, it contains the specific [traces][1] that pass through the resource and an aggregate view of the [spans][5] that make up these traces.

     {{< img src="tracing/guide/slowest_request_daily/slowest_trace_3_cropped.png" alt="Identifying the slowest trace and finding the bottleneck causing it" style="width:90%;">}}

4. Set the time filter to `1d One Day`. Scroll down to the Traces table and **sort it by duration**, hover over the top trace in the table and **click View Trace**

    This is the flame graph and associated information. Here you can see the duration of each step in the trace and whether it is erroneous. This is useful in identifying slow components and error-prone ones. The flame graph can be zoomed, scrolled, and explored naturally. Under the flame graph you can see associated metadata, Logs, and Host information.

    The flame graph is a great way of identifying the precise piece of your stack that is erroneous or latent. Errors are marked with red highlights and duration is represented by the horizontal length of the span, meaning long spans are the slowest ones. Learn more about using the flame graph in the [Trace View guide][6].

    Under the flame graph you can see all of the tags (including [custom ones][7]). From here you can also see associated logs (if you [connected Logs to your Traces][8]), see host-level information such as CPU and memory usage.

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_4_cropped.png" alt="Identifying the slowest trace and finding the bottleneck causing it" style="width:90%;">}}

5. **Click into the Host tab**, observe the CPU and memory performance of the underlying host while the request was hitting it.
6. **Click Open Host Dashboard** to view all relevant data about the host

Datadog APM seamlessly integrates with the other Datadog metrics and information - like infrastructure metrics and Logs. Using the flame graph, this information is available to you as well as any [custom metadata][7] you are sending with your traces.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: https://app.datadoghq.com/services
[3]: /tracing/glossary/#services
[4]: /tracing/glossary/#resources
[5]: /tracing/glossary/#spans
[6]: /tracing/trace_explorer/trace_view/?tab=spanmetadata
[7]: /tracing/guide/adding_metadata_to_spans/
[8]: /tracing/other_telemetry/connect_logs_and_traces/
