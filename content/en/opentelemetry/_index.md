---
title: OpenTelemetry in Datadog
kind: Documentation
further_reading:
- link: "https://www.datadoghq.com/blog/opentelemetry-instrumentation/"
  tag: "Blog"
  text: "Datadog's partnership with OpenTelemetry"
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
  text: "Learn more about AWS’s managed Lambda Layer for OpenTelemetry"
---

## Overview

[OpenTelemetry][1] (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OTel provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

If your applications and services are instrumented with OpenTelemetry libraries, you can choose between two paths for getting the traces, metrics, and logs data to the Datadog backend:

1. [Send data to the OpenTelemetry collector, and use the Datadog exporter to forward it to Datadog][3], or

2. [Ingest data with the Datadog Agent, which collects it for Datadog][4] (metrics and traces only).

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating telemetry data and sending it to observability products.">}}

## Setup

For additional information about sending OpenTelemetry data to Datadog, configuring it, and using Datadog's observability platform to gain actionable insights into your service performance, see:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/otel_tracing/" >}}Trace collection through OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/otel_metrics/" >}}Metrics collection through OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/otel_logs/" >}}Logs collection through OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/otel_collector_datadog_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
