---
title: Runtime Metrics
kind: documentation
disable_toc: true
aliases:
  - /tracing/advanced/runtime_metrics/
further_reading:
- link: "tracing/connect_logs_and_traces"
  tags: "Enrich Tracing"
  text: "Connect your Logs and Traces together"
- link: "tracing/manual_instrumentation"
  tags: "Enrich Tracing"
  text: "Manually instrument your application to create traces."
- link: "tracing/opentracing"
  tags: "Enrich Tracing"
  text: "Implement Opentracing across your applications."
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources, and traces"
---

Enable runtime metrics collection in the tracing client to gain additional insights into an application's performance. Runtime metrics can be viewed in the context of a [service][1], correlated in the Trace View at the time of a given request, and utilized anywhere in the platform.

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## Language setup

{{< partial name="apm/apm-runtime-metrics.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#services
