---

title: APM & Continuous Profiler
kind: documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/guide/setting_primary_tags_to_scope/"
  tag: "Documentation"
  text: "Add primary and secondary tags to your traces"
- link: "/tracing/guide/add_span_md_and_graph_it/"
  tag: "Documentation"
  text: "Add custom tags to your spans to slice and dice performance"
- link: "/tracing/guide/security/"
  tag: "Documentation"
  text: "Automatically scrub PII from your traces"
- link: "/tracing/guide/metrics_namespace/"
  tag: "Documentation"
  text: "Learn about trace metrics and their tags"
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Learn to use the APM UI"
aliases:
  - /tracing/faq/terminology
  - /tracing/guide/terminology
  - /tracing/guide/distributed_tracing/
  - /tracing/advanced/
  - /tracing/api
  - /tracing/faq/distributed-tracing/
---

{{< vimeo 381554158 >}}

</br>

Datadog APM & Continuous Profiler gives deep visibility into your applications with **out-of-the-box performance dashboards** for web services, queues, and databases to monitor requests, errors, and latency. Distributed traces **seamlessly correlate** to browser sessions, logs, profiles, synthetic checks, network, processes, and infrastructure metrics across hosts, containers, proxies, and serverless functions. Navigate directly from investigating a slow trace to **indentifying the specific line of code** causing performance bottlenecks with code hotspots.

#### Tracing Without Limits: journey of a trace

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Traces start in your instrumented applications and flow into Datadog where we ingest 100% of traces up to 50 traces per second (per APM Host). If needed for high-throughput services, you can view and control the experience using [Ingestion Controls][1].  All ingested traces are available for live search and analytics for 15 minutes and you can use custom tag-based [retention filters][2] to keep exactly the traces that matter for your business for 15 days search and analytics.

## Send traces to Datadog

As you transition from monoliths to microservices, setting up Datadog APM across hosts, containers or serverless functions takes just minutes.

[Add the Datadog Tracing Library][3] to find instructions for your environment and language, whether you are [tracing a proxy][4] or tracing across [AWS Lambda functions][5] and hosts, using automatic instrumentation, dd-trace-api, [OpenTracing, or OpenTelemetry][6].

{{< partial name="apm/apm-compatibility.html" >}}

<br>

## Explore Datadog APM

Now that you've configured your application to send traces to Datadog, start getting insights into your application performance:

### Service map

[Understand service dependencies][7] with an auto-generated service map from your traces alongside service performance metrics and monitor alert statuses.

{{< img src="tracing/index/ServiceMapInspect.gif" alt="Service Map"  style="width:100%;">}}

### Service performance dashboards

[Monitor Service metrics][8] for requests, errors and latency percentiles.  Drill down into database queries or endpoints correlated with infrastructure.

{{< img src="tracing/index/ServicePage.gif" alt="Service Pages"  style="width:100%;">}}

### Continuous Profiler

[Improve application latency][9] and optimize compute resources with always on production profiling to pinpoint the lines of code consuming the most CPU, memory, or I/O.

{{< vimeo 441865141 >}}

### Live search

[Search 100% of your traces][10] by any tag, live with no sampling, for 15 minutes.

{{< img src="tracing/live_search/LiveSearch.mp4" alt="Live Search" video="true" >}}

### Live analytics

[Analyze performance by any tag on any span][11] live for 15 minutes during an outage to identify impacted users or transactions.

{{< img src="tracing/live_search/LiveAnalytics.mp4" alt="Live Analytics" video="true" >}}

### Deployment tracking

[Monitor service performance][12] and compare between versions for rolling, blue/green, shadow, or canary deployments.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions on the Service Page"  style="width:100%;">}}

### Trace retention and ingestion

[Retain the traces that matter most to you][13] with tag-based retention filters and perform analytics on all indexed spans for 15 days.

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="Trace Retention and Ingestion"  style="width:100%;">}}

### Generate custom metrics from all spans

[Generate metrics][14] with 15-month retention from all ingested spans to create and monitor key business and performance indicators.

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="Generate Custom Metrics from ingested spans"  style="width:100%;">}}

### Connect logs and distributed traces

[View your application logs][15] side-by-side with the trace for a single distributed request with automatic trace-id injection.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces"  style="width:100%;">}}

### Connect Real User Monitoring and traces

[Link between real user sessions][16] and traces to see the exact traces that correspond to user experiences and reported issues.

{{< img src="tracing/index/RumTraces.gif" alt="Connect RUM sessions and traces"  style="width:100%;">}}

### Connect synthetic test data and traces

[Link simulated API tests][17] to traces to find the root cause of failures across frontend, network and backend requests.

{{< img src="tracing/index/Synthetics.gif" alt="Synthetic tests"  style="width:100%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_retention_and_ingestion/#ingestion-controls
[2]: /tracing/trace_retention_and_ingestion/#retention-filters
[3]: /tracing/setup_overview/setup/java
[4]: /tracing/setup_overview/proxy_setup/
[5]: /tracing/setup_overview/serverless_functions/
[6]: /tracing/setup_overview/open_standards/
[7]: /tracing/visualization/services_map/
[8]: /tracing/visualization/service/
[9]: /tracing/profiler/
[10]: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
[11]: /tracing/trace_search_and_analytics/#live-analytics-for-15-minutes
[12]: /tracing/deployment_tracking/
[13]: /tracing/trace_retention_and_ingestion/
[14]: /tracing/generate_metrics/
[15]: /tracing/connect_logs_and_traces/
[16]: /real_user_monitoring/connect_rum_and_traces
[17]: /synthetics/apm/
