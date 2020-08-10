---

title: APM & Distributed Tracing
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

Datadog APM & Distributed Tracing gives deep visibility into your applications with **out-of-the-box performance dashboards** for web services, queues and databases to monitor requests, errors, and latency. Distributed traces **seamlessly correlate** to browser sessions, logs, synthetic checks, network, processes and infrastructure metrics across hosts, containers, proxies, and serverless functions. Search **100% of ingested traces live with no sampling** during an outage, while Datadog intelligently retains traces that represent an error, high latency, or unique code paths for analysis.

## Getting Started

As you transition from monoliths to microservices, setting up Datadog APM across hosts, containers or serverless functions takes just minutes.

### 1. Configure the Datadog Agent

[Install and configure the Datadog Agent][1] in AWS, GCP, Azure, Kubernetes, ECS, Fargate, PCF, Heroku, on-prem and more.

### 2. Instrument Your Application

Add a tracing library to your application or proxy service to start sending traces to the Datadog Agent.

{{< partial name="apm/apm-languages.html" >}}
<br>
## Explore Datadog APM

Now that you've configured your application to send traces to Datadog, start getting insights into your application performance:

### Service Map

[Understand service dependencies][2] with an auto-generated service map from your traces alongside service performance metrics and monitor alert statuses.

{{< img src="tracing/index/ServiceMapInspect.gif" alt="Service Map"  style="width:100%;">}}

### Service Performance Dashboards

[Monitor Service metrics][3] for requests, errors and latency percentiles.  Drill down into database queries or endpoints correlated with infrastructure.

{{< img src="tracing/index/ServicePage.gif" alt="Service Pages"  style="width:100%;">}}

### Live Search

[Search on any span][4] by any tag on 100% of your ingested traces live with no sampling for 15 minutes.

{{< img src="tracing/live_search/livesearchmain.gif" alt="Live Search" >}}

### Connect Logs and Distributed Traces

[View your application logs][5] side-by-side with the trace for a single distributed request with automatic trace-id injection.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces"  style="width:100%;">}}

### Trace Serverless Functions

[Trace across AWS Lambda and hosts][6] to view complete traces across your hybrid infrastructure.

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions"  style="width:100%;">}}

### App Analytics

[Analyze performance][7] by application, infrastructure or custom tags such as datacenter, availability zone, deployment version, domain, user, checkout amount, customer and more.

{{< img src="tracing/index/SearchAppAnalytics.gif" alt="App Analytics"  style="width:100%;">}}

### Connect Synthetic Test Data and Traces

[Link simulated API tests][8] to traces to find the root cause of failures across frontend, network and backend requests.

{{< img src="tracing/index/Synthetics.gif" alt="Synthetic tests"  style="width:100%;">}}

### Continuous Profiling

[Improve code efficiency][9] with always on production profiling to pinpoint the lines of code consuming the most CPU, memory, or I/O.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}

### Customize your Instrumentation or add OpenTracing

[Seamlessly connect your instrumentation][10] between automatic instrumentation, dd-trace-api, OpenTracing and OpenTelemetry exporters.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/visualization/services_map/
[3]: /tracing/visualization/service/
[4]: /tracing/livesearch/
[5]: /tracing/connect_logs_and_traces/
[6]: /tracing/serverless_functions/
[7]: /tracing/app_analytics/
[8]: /synthetics/apm/
[9]: /tracing/profiling/
[10]: /tracing/manual_instrumentation/
