---
title: OpenTelemetry in Datadog
aliases:
- /tracing/setup_overview/open_standards/
- /opentelemetry/otel_terms
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
- link: "https://learn.datadoghq.com/courses/otel-with-datadog"
  tag: "Learning Center"
  text: "Introduction to OpenTelemetry with Datadog"

algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel']
cascade:
    algolia:
        rank: 70
---

## Overview

[OpenTelemetry][1] (OTel) provides standardized protocols for collecting and routing telemetry data. Datadog supports multiple ways to collect and analyze telemetry data from OpenTelemetry-instrumented applications, whether you're using existing Datadog infrastructure or prefer a vendor-neutral setup.

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating telemetry data and sending it to observability products." width="90%">}}

### Key decisions

There are two key decisions to make when using OpenTelemetry with Datadog:

- How to send your data to Datadog
- How to instrument your applications

The features available to you depend on these choices. For example, using the OpenTelemetry API with the Datadog SDK provides access to more Datadog features than using the OpenTelemetry SDK alone.

## Send OpenTelemetry data to Datadog

If your applications and services are instrumented with OpenTelemetry libraries, you can choose how to get traces, metrics, and logs data into Datadog.

<div class="alert alert-info"><strong>Not sure which setup is right for you?</strong></br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

### Option 1: Use OTLP ingest in the Datadog Agent

**Best for**: Existing Datadog users or teams requiring Agent-based features.

- Access to Agent-based features like Live Container Monitoring and Cloud Network Monitoring

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Learn more about using OTLP ingest in the Agent{{< /nextlink >}}
{{< /whatsnext >}}

### Option 2: Use the OpenTelemetry Collector

**Best for**: New or existing OTel users wanting a completely vendor-neutral setup.

- Complete vendor neutrality for sending OpenTelemetry data to Datadog
- Flexible configuration options like tail-based sampling and data transformations

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Learn more about using the OTel Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Additional setup options

For other setup options, including direct OTLP intake, see [Send Data to Datadog][7].

## Instrument your applications

There are several ways to instrument your applications with OpenTelemetry and Datadog. Each approach provides different features and levels of vendor neutrality.

- **OpenTelemetry API with Datadog SDK**: Use the OpenTelemetry API with Datadog's SDK implementation
- **Full OpenTelemetry**: Use the OpenTelemetry SDK and API for a vendor-neutral setup
- **OpenTelemetry Instrumentation with Datadog SDK**: Use OpenTelemetry instrumentation libraries alongside Datadog SDKs

For more information, see [Instrument Your Applications][8]. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/collector_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[7]: /opentelemetry/setup
[8]: /opentelemetry/instrument/