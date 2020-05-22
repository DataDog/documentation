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

Datadog APM & Distributed Tracing gives deep visibility into your applications with **out-of-the-box performance dashboards** for web services, queues and databases to monitor requests, errors and latency. Distributed traces **seamlessly correlate** to Browser sessions, Logs, Network, Processes and Infrastructure metrics across hosts, containers, proxies and serverless functions. Search **100% of traces live with no sampling** during an outage, while Datadog intelligently retains traces that represent an error, high latency or unique code paths for analysis.

## Getting Started

As you transition from monoliths to microservices, setting up Datadog APM across hosts, containers or serverless functions takes just minutes.

### 1. Configure the Datadog Agent

[Install and configure the Datadog Agent][1] in AWS, GCP, Azure, Kubernetes, ECS, Fargate, PCF, Heroku, on-prem and more.

### 2. Instrument Your Application

Add a tracing library to your application or proxy service to start sending traces to the Datadog Agent.

{{< partial name="apm/apm-languages.html" >}}
<br>
## Explore Datadog APM

### App Analytics

[Analyze performance][2] by application, infrastructure or custom tags such as datacenter, availability zone, deployment version, domain, user, checkout amount, customer and more.

{{< img src="tracing/index/SearchAppAnalytics.gif" alt="App Analytics"  style="width:100%;">}}

### Connect Logs and Traces

[View your application logs][3] side-by-side with the trace for a single distributed request with automatic trace-id injection.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Connect Logs And Traces"  style="width:100%;">}}

### Continuous Profiling

[Improve code efficiency][4] with always on production profiling to pinpoint the lines of code consuming the most CPU, memory, or I/O.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}

### Live Tail

[Search by any tag][5] on 100% of your traces live with no sampling.

{{< img src="tracing/index/SearchLiveTail.gif" alt="LiveTail"  style="width:100%;">}}

### Integrate with OpenTracing

[Integrate your instrumentation][6] seamlessly between Opentracing and Datadog APM.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/app_analytics/
[3]: /tracing/connect_logs_and_traces/
[4]: /tracing/profiling/
[5]: /tracing/livetail/
[6]: /tracing/opentracing/
