---

title: APM & Continuous Profiler
kind: documentation
description: Instrument your code to improve performance
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=APM"
    tag: "Release Notes"
    text: "Check out the latest Datadog APM releases! (App login required)."
  - link: "/tracing/guide/setting_primary_tags_to_scope/"
    tag: "Documentation"
    text: "Add primary and secondary tags to your traces"
  - link: "/tracing/guide/add_span_md_and_graph_it/"
    tag: "Documentation"
    text: "Add custom tags to your spans to filter and group performance"
  - link: "/tracing/guide/security/"
    tag: "Documentation"
    text: "Automatically scrub PII from your traces"
  - link: "/tracing/guide/metrics_namespace/"
    tag: "Documentation"
    text: "Learn about trace metrics and their tags"
  - link: "/tracing/visualization/"
    tag: "Documentation"
    text: "Learn APM terminology and concepts"
  - link: "https://www.datadoghq.com/blog/span-based-metrics/"
    tag: "Blog"
    text: "Generate span-based metrics to track historical trends in application performance"
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

Datadog APM & Continuous Profiler gives deep visibility into your applications with **out-of-the-box performance dashboards** for web services, queues, and databases to monitor requests, errors, and latency. Distributed traces **seamlessly correlate** to browser sessions, logs, profiles, synthetic checks, network, processes, and infrastructure metrics across hosts, containers, proxies, and serverless functions. Navigate directly from investigating a slow trace to **identifying the specific line of code** causing performance bottlenecks with code hotspots.

## Send traces to Datadog

As you transition from monoliths to microservices, setting up Datadog APM across hosts, containers or serverless functions takes just minutes.

[Add the Datadog Tracing Library][1] for your environment and language, whether you are [tracing a proxy][2] or tracing across [AWS Lambda functions][3] and hosts, using automatic instrumentation, dd-trace-api, or [OpenTelemetry][4].

{{< partial name="apm/apm-compatibility.html" >}}

<br>

## Control and manage data flowing into and being kept by Datadog

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Journey" >}}

Traces start in your instrumented applications and flow into Datadog. For high-throughput services, you can view and control ingestion using [Ingestion Controls][5]. All ingested traces are available for live search and analytics for 15 minutes. You can use custom tag-based [retention filters][6] to keep exactly the traces that matter for your business for 15 days for search and analytics.

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="Trace Retention and Ingestion"  style="width:100%;">}}

## Generate custom metrics from spans

[Generate metrics][7] with 15-month retention from all ingested spans to create and monitor key business and performance indicators over time.

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="Generate Custom Metrics from ingested spans"  style="width:100%;">}}

## Connect traces with other telemetry 

[View your application logs][8] side-by-side with the trace for a single distributed request with automatic trace-id injection. [Link between real user sessions][9] and traces to see the exact traces that correspond to user experiences and reported issues. [Link simulated tests][10] to traces to find the root cause of failures across frontend, network and backend requests.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces"  style="width:100%;">}}

## Explore live and indexed traces

[Search your ingested traces][11] by any tag, live for 15 minutes. Analyze performance by any tag on any span during an outage to identify impacted users or transactions. View maps showing request flows and other visualizations to help you understand what your code is doing and where its performance can be improved.

{{< img src="tracing/live_search/live-search.mp4" alt="Live Search List view" video="true" >}}

## Gain deep insight into your services

[Understand service dependencies][12] with an auto-generated service map from your traces alongside service performance metrics and monitor alert statuses.

{{< img src="tracing/index/ServiceMapInspect.mp4" alt="Service Map" video=true style="width:100%;">}}

[Monitor Service metrics][13] for requests, errors and latency percentiles. Analyze individual database queries or endpoints correlated with infrastructure.

{{< img src="tracing/index/ServicePage.png" alt="Service Page" style="width:100%;">}}

[Monitor service performance][14] and compare between versions for rolling, blue/green, shadow, or canary deployments.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions on the Service Page"  style="width:100%;">}}

## Profile your production code

[Improve application latency][15] and optimize compute resources with always-on production profiling to pinpoint the lines of code consuming the most CPU, memory, or I/O.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/setup/java
[2]: /tracing/setup_overview/proxy_setup/
[3]: /tracing/setup_overview/serverless_functions/
[4]: /tracing/setup_overview/open_standards/
[5]: /tracing/trace_ingestion/ingestion_controls/
[6]: /tracing/trace_retention/#retention-filters
[7]: /tracing/generate_metrics/
[8]: /tracing/connect_logs_and_traces/
[9]: /real_user_monitoring/connect_rum_and_traces
[10]: /synthetics/apm/
[11]: /tracing/trace_explorer/#live-search-for-15-minutes
[12]: /tracing/visualization/services_map/
[13]: /tracing/visualization/service/
[14]: /tracing/deployment_tracking/
[15]: /tracing/profiler/
