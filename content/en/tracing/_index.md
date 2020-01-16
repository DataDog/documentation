---

title: APM & Distributed Tracing

kind: documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/connect_logs_and_traces/"
  tag: "Documentation"
  text: "Connect logs and traces"
- link: "/tracing/guide/adding_metadata_to_spans"
  tag: "Documentation"
  text: "Adding metadata to spans"
- link: "/tracing/runtime_metrics"
  tag: "Documentation"
  text: "Runtime metrics"
- link: "https://learn.datadoghq.com/enrol/index.php?id=17"
  tag: "Learning Center"
  text: "Introduction to Application Performance Monitoring"
aliases:
  - /tracing/faq/terminology
  - /tracing/guide/terminology
  - /tracing/guide/distributed_tracing/
disable_toc: true
---

{{< wistia 2kgmb9wbsr >}}
</br>

## What is Datadog APM?

Datadog Application Performance Monitoring (APM or tracing) provides you with deep insight into your application's performance - from automatically generated dashboards for monitoring key metrics, like request volume and latency, to detailed traces of individual requests - side by side with your logs and infrastructure monitoring. When a request is made to an application, Datadog can see the [traces][1] across a distributed system, and we can show you systematic data about precisely what is happening to this request.

## Overview

{{< whatsnext desc="This section includes the following topics:">}}
    {{< nextlink href="/tracing/send_traces/" >}}<u>Enable trace collection</u>: Install and configure the latest Datadog Agent to start sending traces. See an overview of all the possible settings for APM, including setting up APM in containerized environments such as Docker or Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/tracing/setup/" >}}<u>Instrument your application</u>: Add a tracing library to your application.{{< /nextlink >}}
    {{< nextlink href="/tracing/" >}}<u>Enrich Tracing</u>: Enrich tracing by automatically injecting a trace-id into your logs, adding metadata to your spans, and collecting Runtime metrics associated with your traces.{{< /nextlink >}}
    {{< nextlink href="/tracing/visualization/" >}}<u>Use the APM UI</u>: Visualize your APM Data with out of the box dashboards and monitor on key metrics. {{< /nextlink >}}
    {{< nextlink href="/tracing/app_analytics/" >}}<u>App Analytics</u>: Filter application performance metrics and Analyzed Spans by user-defined tags.{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/" >}}<u>Guides</u>: Additional helpful articles about APM & Distributed Tracing.{{< /nextlink >}}
    {{< nextlink href="/tracing/troubleshooting/?tab=java" >}}<u>Troubleshooting</u>: Solve common tracing issues.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace
