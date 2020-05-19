---

title: APM & Distributed Tracing
kind: documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/manual_instrumentation/"
  tag: "Documentation"
  text: "Instrument and configure your application to send custom traces to Datadog"
- link: "/tracing/runtime_metrics"
  tag: "Documentation"
  text: "Gain additional insights into an application's performance with the runtime metrics associated to your traces."
- link: "/tracing/troubleshooting"
  tag: "Documentation"
  text: "Solve common tracing issues"
- link: "https://learn.datadoghq.com/enrol/index.php?id=17"
  tag: "Learning Center"
  text: "Introduction to Application Performance Monitoring"
aliases:
  - /tracing/faq/terminology
  - /tracing/guide/terminology
  - /tracing/guide/distributed_tracing/
  - /tracing/advanced/
  - /tracing/api
---

{{< wistia 2kgmb9wbsr >}}

</br>

## What is Datadog APM?

Datadog Application Performance Monitoring (APM or tracing) provides you with deep insight into your application’s performance - from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests - side by side with your logs and infrastructure monitoring via Datadog’s single pane of glass approach to monitoring.

Datadog collects traces across applications, browser sessions, mobile pageviews, logs, network, application code, databases, proxies, hosts & containers, and offers **live search on 100% of distributed traces** while intelligently retaining traces mapping to bad user experiences like errors and high latency.
## Getting Started

Whether your apps are built as a monolith, microservices, or serverless functions, getting started takes just minutes. To quickly get started with Datadog APM, follow these steps:

### 1. Configure the Datadog Agent

[Enable Trace Collection][1]:  Install and configure Datadog APM for AWS, GCP, Azure, Kubernetes, ECS, PCF, Azure, Heroku, on-prem and more.

### 2. Instrument Your Application

[Instrument Your Application][2]: Add a tracing library to your application to start sending traces to Datadog for monitoring.

{{< partial name="apm/apm-languages.html" >}}

### 3. View your data in the APM UI

[Use the APM UI][3]: Once you’re sending traces to Datadog, you can begin to visualize your APM Data with out of the box dashboards, service pages, and [Live Tail][4]. Monitor on key metrics with end-to-end service views to follow individual user requests from browser to proxies, microservices, queues, caches, serverless functions and databases. Use [Live Tail][4] to search by any tag on 100% of your traces live with no sampling.

{{< img src="tracing/index/apm-metric-query-loop.mp4" video="true" alt="Use the APM UI"  style="width:50%;">}}

## Additional APM functionality

Once you are sending traces to Datadog, you can optionally enable other APM functionality:

### Set up App Analytics

[App Analytics][5]: Query and monitor your data with business or infrastructure tags such as merchant, customer, cart value, availability zone, datacenter, user or domain.

{{< img src="tracing/index/AppAnalytics.gif" alt="App Analytics"  style="width:50%;">}}

### Connect Logs and Traces

[Connect Logs and Traces][6]: Connect your application logs across monoliths, microservices and serverless functions to visualize user data scoped to individual requests with automatic trace_id injection.

{{< img src="tracing/index/ConnectLogsAndTraces.png" alt="Connect Logs And Traces"  style="width:50%;">}}

### Add Profiling

[Profiling][7]: Datadog's lightweight, always-on in production profiling reveals which lines of code are consuming the most resources such as CPU, memory, or I/O.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:50%;">}}

### Integrate with OpenTracing

[OpenTracing][8]: Integrate your instrumentation seamlessly between the Opentracing standard and Datadog APM tracers for Java, .NET, Node, Python, PHP, Ruby, Go and C++

{{< img src="tracing/index/OpenTracing.png" alt="Open Tracing"  style="width:8%;">}}

##  Next Steps

Consider these useful resources & guides for more information or common advanced usecases with Datadog APM & Distributed Tracing.

[Set Primary Tags to Scope][9]

[Add span tags and slice and dice your application performance][10]

[Automatically scrub PII from your traces][11]

[Trace Metrics][12]


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/setup/
[3]: /tracing/visualization/
[4]: /tracing/livetail/
[5]: /tracing/app_analytics/
[6]: /tracing/connect_logs_and_traces/
[7]: /tracing/profiling/
[8]: /tracing/opentracing/
[9]: /tracing/guide/setting_primary_tags_to_scope/
[10]: /tracing/guide/add_span_md_and_graph_it/?tab=java
[11]: /tracing/guide/security/
[12]: /tracing/guide/metrics_namespace/
