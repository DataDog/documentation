---
title: OpenTelemetry and OpenTracing
kind: documentation
description: 'Use open standards to generate your application traces'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
- link: "/tracing/connect_logs_and_traces/opentelemetry"
  tag: "Documentation"
  text: "Connect OpenTelemetry Traces and Logs"
- link: "https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/"
  tag: "Blog"
  text: "Learn more about AWS’s managed Lambda Layer for OpenTelemetry"
aliases:


---
Datadog supports a variety of open standards, including [OpenTelemetry][1] and [OpenTracing][2].

## Options for using OpenTelemetry with Datadog components

If your applications and services are instrumented with OpenTelemetry libraries, you can choose between two paths for getting the tracing data to the Datadog backend:

1. [Send traces to the OpenTelemetry collector, and use the Datadog exporter to send it to Datadog][3], or

2. [Ingest traces with the Datadog Agent, which sends it to Datadog][4].

{{< img src="tracing/setup/open_standards/dd-otel-options.png" alt="Map options for generating tracing data and sending it to observability products.">}}

## Connect OpenTelemetry traces and logs

To connect OpenTelemetry traces and logs so that your application logs monitoring and analysis has the additional context provided by the OpenTelemetry traces, see [Connect OpenTelemetry Traces and Logs][5] for language specific instructions and example code.

## Other alternatives

Datadog recommends you use the OpenTelemetry Collector Datadog exporter or the OTLP Ingest in the Datadog Agent in conjunction with OpenTelemetry tracing clients. However, if that doesn't work for you, each of the supported languages also has support for [sending OpenTracing data to Datadog][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: https://opentracing.io/docs/
[3]: /tracing/setup/open_standards/otel_collector_datadog_exporter/
[4]: /tracing/setup/open_standards/otlp_ingest_in_the_agent/
[5]: /tracing/connect_logs_and_traces/opentelemetry
[6]: /tracing/setup_overview/open_standards/java
