---
title: OpenTelemetry in Datadog
kind: Documentation
aliases:
- /tracing/setup_overview/open_standards/
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
- link: "https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/"
  tag: "Blog"
  text: "Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter 
- link: "https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/"
  tag: "Blog"
  text: "Forward logs from the OpenTelemetry Collector with the Datadog Exporter"
- link: "https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/"
  tag: "Blog"
  text: "OTLP ingestion in the Agent"
- link: "https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/"
  tag: "Blog"
  text: "Learn more about AWS's managed Lambda Layer for OpenTelemetry"
- link: "https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/"
  tag: "Blog"
  text: "Correlate Datadog RUM events with traces from OpenTelemetry-instrumented applications"
- link: "https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/"
  tag: "Blog"
  text: "Monitor runtime metrics from OTel-instrumented apps with Datadog APM"
algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel']
cascade:
    algolia:
        rank: 70
---

<div class="alert alert-danger">
  <strong>Important:</strong> OpenTelemetry Collector Contrib v0.95.0 introduces a breaking change that disables Trace Metrics computation in the Datadog Exporter. Follow Datadog's <a href="/opentelemetry/guide/migration/">migration guide</a> when upgrading.
</div>

## Overview

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

If your applications and services are instrumented with OpenTelemetry libraries, you can choose how to get traces, metrics, and logs data to the Datadog backend:

1. [Send data to the OpenTelemetry collector, and use the Datadog exporter to forward it to Datadog][3], or

2. [Ingest data with the Datadog Agent, which collects it for Datadog][4].

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating telemetry data and sending it to observability products.">}}

<div class="alert alert-info"><strong>Beta: Custom Instrumentation with the OpenTelemetry API</strong></br>For some supported languages, you can configure OpenTelemetry instrumented applications to use the Datadog tracing library to process spans and traces. For more information, read <a href="/tracing/trace_collection/otel_instrumentation/">Custom Instrumentation with the OpenTelemetry API</a>.</div>

Datadog supports the [W3C Trace Context standard][6], ensuring complete traces are captured even when a request travels between services that have been instrumented with different tools. Services need only be instrumented with any system, such as an OpenTelemetry library or Datadog tracing library, that follows the W3C Trace Context standard. Read [Propagating Trace Context][5] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/collector_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[5]: /tracing/trace_collection/trace_context_propagation/
[6]: https://www.w3.org/TR/trace-context/
