---
title: Trace Collection Through OpenTelemetry
kind: documentation
description: 'Use open standards to generate your application traces'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "/tracing/other_telemetry/connect_logs_and_traces/opentelemetry"
  tag: "Documentation"
  text: "Connect OpenTelemetry Traces and Logs"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: "Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter"
aliases:
- /tracing/setup_overview/open_standards/
- /tracing/trace_collection/open_standards/
---

## Overview

If your applications and services are instrumented with [OpenTelemetry][1] libraries, you can choose how to get the tracing data to the Datadog backend:

1. [Send traces to the OpenTelemetry collector, and use the Datadog exporter to forward them to Datadog][2], or

2. [Ingest traces with the Datadog Agent, which collects them for Datadog][3].

Read [OpenTelemetry][4] for more information.

<div class="alert alert-info"><strong>Beta: Custom Instrumentation for Datadog Libraries</strong></br>For some supported languages, you can configure OpenTelemetry instrumented applications to use the Datadog tracing library to process spans and traces. For more information, read <a href="/tracing/trace_collection/otel_instrumentation/">Custom Instrumentation with the OpenTelemetry API</a>.</div>

## Connect OpenTelemetry traces and logs

You can correlate OpenTelemetry traces and logs so that your application logs monitoring and analysis has the additional context provided by the OpenTelemetry traces. See [Connect OpenTelemetry Traces and Logs][5] for language specific instructions and example code.

## OpenTracing

Datadog recommends you use the OpenTelemetry Collector Datadog exporter or the OTLP Ingest in the Datadog Agent in conjunction with OpenTelemetry tracing clients. However, if that doesn't work for you, each of the supported languages also has support for sending [OpenTracing][6] data to Datadog. Read more about [setting up OpenTracing for each supported language][7]. 

{{< whatsnext desc="Set up your application to send traces using OpenTracing." >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/nodejs" >}}NodeJS{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/dotnet" >}}.NET{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/
[2]: /opentelemetry/otel_collector_datadog_exporter/
[3]: /opentelemetry/otlp_ingest_in_the_agent/
[4]: /opentelemetry/
[5]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/
[6]: https://opentracing.io/docs/
[7]: /tracing/trace_collection/opentracing/java
