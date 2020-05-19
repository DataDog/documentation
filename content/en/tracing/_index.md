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
  text: "Customize your spans with additional tags to slice and dice performance"
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
<br>
## Explore Datadog APM

### App Analytics

[Slice & dice performance by tags][3] whether business or infrastructure tags such as merchant, customer, cart value, availability zone, datacenter, user or domain.

{{< img src="tracing/index/AppAnalytics.gif" alt="App Analytics"  style="width:50%;">}}

### Connect Logs and Traces

[View your application logs for a single request][4] across monoliths, microservices and serverless functions to visualize user data scoped to individual requests with automatic trace_id injection.

{{< img src="tracing/index/ConnectLogsAndTraces.png" alt="Connect Logs And Traces"  style="width:50%;">}}

### Continuous Profiling

[Improve code efficiency with always on production profiling][5] to pinpoint lines of code consuming the most CPU, memory, or I/O.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}

### Live Tail

Search by any tag on 100% of your traces live with no sampling

### Integrate with OpenTracing

[Integrate your instrumentation seamlessly between the Opentracing standard][6] and Datadog APM tracers for Java, .NET, Node, Python, PHP, Ruby, Go and C++


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/setup/
[3]: /tracing/app_analytics/
[4]: /tracing/connect_logs_and_traces/
[5]: /tracing/profiling/
[6]: /tracing/opentracing/
