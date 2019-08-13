---
title: Investigate Infrastructure Latency
kind: guide
disable_toc: true
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

{{< img src="tracing/guide/slowest_request_daily/slowest_trace_1.gif" alt="Identifying the slowest trace and finding the Host metrics for it" responsive="true" style="width:90%;">}}

With Datadog APM, you can easily investigate the performance of your endpoints, identify slow requests, and investigate the root cause of latency issues. This example shows the slowest trace of the day for an e-commerce checkout endpoint and how it slows down because of high CPU usage.

1. **Open the [Services page][1]**.

    This page contains a list of all instrumented services available in Datadog APM. Note you can search for keywords, filter by `env-tag`, and set the timeline.

2. **Search for a relevant and active service and open the Service Page**.

    The web-store service is used in this example because it is the primary server in the techstack and controls most calls to third party services. 

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_2.png" alt="Identifying the slowest trace and finding the Host metrics for it" responsive="true" style="width:90%;">}}

    In addition to throughput, latency and error rate information, the Service Page contains a list of Resources (major operations like API endpoints, SQL queries and web requests) identified for the Service.

3. **Find the Resource** you’d like to investigate from the table and click into the Resource Page.

    The Resource page contains high-level metrics about this resource like throughput, latency, error rate and breakdown of the time spent on each downstream service from the resource. In addition, it contains the specific traces that pass through the resource and an aggregate view of the spans that make up these traces.

     {{< img src="tracing/guide/slowest_request_daily/slowest_trace_3.png" alt="Identifying the slowest trace and finding the Host metrics for it" responsive="true" style="width:90%;">}}

4. Set the time filter to `1d One Day`. Scroll down to the Traces table and **sort it by duration**, hover over over the top trace in the table and **click View Trace**

    This is the Flamegraph and associated information. Here you can see the duration of each step in the trace and whether it is erroneous. This is useful in identifying slow components and error prone ones. The Flamegraph can be zoomed, scrolled and explored naturally. Under the Flamegraph you can see associated metadata, Logs and Host information.

5. **Click into the Host tab**, observe the CPU and memory performance of the underlying host while the request was hitting it.
6. **Click Open Host Dashboard** to view all relevant data about the host

    {{< img src="tracing/guide/slowest_request_daily/slowest_trace_4.png" alt="Identifying the slowest trace and finding the Host metrics for it" responsive="true" style="width:90%;">}}

Datadog APM seamlessly integrates with any other Datadog information such as infrastructure metrics and Logs, from the Flamegraph, all of this information is available to you as well as any [custom metadata][2] you are sending with your traces.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: https://docs.datadoghq.com/tracing/advanced/adding_metadata_to_spans
