---
title: OpenTelemetry in Datadog
kind: Documentation
aliases:
  - /tracing/trace_collection/open_standards/
further_reading:
  - link: //
    tag: Documentation
    text:  
  - link: 
    tag: Blog
    text: 
---

## Overview

[OpenTelemetry][1] (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OTel provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

If your applications and services are instrumented with OpenTelemetry libraries, you can choose between two paths for getting the traces, metrics, and logs data to the Datadog backend:

1. [Send data to the OpenTelemetry collector, and use the Datadog exporter to forward it to Datadog][3], or

2. [Ingest data with the Datadog Agent, which collects it for Datadog][4] (metrics and traces only).

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating telemetry data and sending it to observability products.">}}

## Setup



## Connect OpenTelemetry traces and Datadog logs

If you are using OpenTelemetry for your traces, but Datadog Logs collection for your logs data, you can correlate them by connecting OpenTelemetry traces and Datadog logs so that your application logs monitoring and analysis has the additional context provided by the OpenTelemetry traces. See [Connect OpenTelemetry Traces and Logs][5] for language specific instructions and example code.

## Other alternatives

Datadog recommends you use the OpenTelemetry Collector Datadog exporter or the OTLP Ingest in the Datadog Agent in conjunction with OpenTelemetry tracing clients. However, if that doesn't work for you, each of the supported languages also has support for [sending OpenTracing data to Datadog][6].
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/otel_collector_datadog_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[5]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry
[6]: /tracing/trace_collection/open_standards/java
