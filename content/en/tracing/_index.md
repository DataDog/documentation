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
---

{{< wistia 2kgmb9wbsr >}}

</br>

## What is Datadog APM?

* **Correlation with Datadog Platform**: Distributed Traces tied to browser sessions, mobile pageviews, logs, network, application code, databases, proxies, hosts & containers.
* **Out-of-the box Dashboards**: Automatically generated service and database pages to monitor requests, errors and latency.
* **Live search on 100% of your traces**: Search all traces live during na outage and intelligently retain important traces for bad user experiences like errors and high latency.

## Getting Started

Whether your apps are built as a monolith, microservices, or serverless functions, getting started takes just minutes.

### 1. Configure the Datadog Agent

[Install and configure the Datadog Agent][1] in AWS, GCP, Azure, Kubernetes, ECS, PCF, Azure, Heroku, on-prem and more.

### 2. Instrument Your Application

Add a tracing library to your application to start sending traces to the Datadog Agent for monitoring.

{{< partial name="apm/apm-languages.html" >}}
<br>
## Explore Datadog APM
### App Analytics

[Slice & dice performance by tags][2] whether business or infrastructure tags such as merchant, customer, cart value, availability zone, datacenter, user or domain.

{{< img src="tracing/guide/add_span_md_and_graph_it/span_md_6.mp4" alt=" span md 6"  video="true" style="width:100%;">}}
### Connect Logs and Traces

[View your application logs for a single request][3] across monoliths, microservices and serverless functions to visualize user data scoped to individual requests with automatic trace_id injection.

{{< img src="tracing/index/ConnectLogsToTraces.png" alt="Connect Logs And Traces"  style="width:100%;">}}

### Continuous Profiling

[Improve code efficiency with always on production profiling][4] to pinpoint lines of code consuming the most CPU, memory, or I/O.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}
### Live Tail

[Search by any tag][5] on 100% of your traces live with no sampling.

{{< img src="tracing/index/LiveSearch.gif" alt="LiveTail"  style="width:100%;">}}

### Integrate with OpenTracing

[Integrate your instrumentation seamlessly between Opentracing][6] and Datadog APM tracers for Java, .NET, Node, Python, PHP, Ruby, Go and C++


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/app_analytics/
[3]: /tracing/connect_logs_and_traces/
[4]: /tracing/profiling/
[5]: /tracing/livetail/
[6]: /tracing/opentracing/
