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

For additional information about sending OpenTelemetry data to Datadog, configuring it, and using Datadog's observability platform to gain actionable insights into your service performance, see:

- [Trace collection through open standards][5]
- [Metrics collection through OpenTelemetry][6]
- [Logs collection through OpenTelemetry][7]



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/otel_collector_datadog_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[5]: /tracing/trace_collection/open_standards/
[6]: /metrics/open_telemetry/
[7]: /logs/log_collection/opentelemetry/
