---
title: OpenTelemetry and OpenTracing
kind: documentation
description: 'Use open standards to generate your application traces'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "/tracing/other_telemetry/connect_logs_and_traces/opentelemetry"
  tag: "Documentation"
  text: "Connect OpenTelemetry Traces and Logs"
aliases:
- /tracing/setup_overview/open_standards/
---

Datadog supports a variety of open standards, including [OpenTelemetry][1] and [OpenTracing][2].

## Options for using OpenTelemetry with Datadog components

If your applications and services are instrumented with OpenTelemetry libraries, you can choose between two paths for getting the tracing data to the Datadog backend:

1. [Send traces to the OpenTelemetry collector, and use the Datadog exporter to forward them to Datadog][3], or

2. [Ingest traces with the Datadog Agent, which collects them for Datadog][4].

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating tracing data and sending it to observability products.">}}

## Connect OpenTelemetry traces and logs

You can correlate OpenTelemetry traces and logs so that your application logs monitoring and analysis has the additional context provided by the OpenTelemetry traces. See [Connect OpenTelemetry Traces and Logs][5] for language specific instructions and example code.

## Other alternatives

Datadog recommends you use the OpenTelemetry Collector Datadog exporter or the OTLP Ingest in the Datadog Agent in conjunction with OpenTelemetry tracing clients. However, if that doesn't work for you, each of the supported languages also has support for [sending OpenTracing data to Datadog][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: https://opentracing.io/docs/
[3]: /opentelemetry/otel_collector_datadog_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[5]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/
[6]: /tracing/trace_collection/open_standards/java
