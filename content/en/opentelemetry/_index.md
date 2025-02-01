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

[OpenTelemetry][1] (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

{{< img src="tracing/setup/open_standards/otel-flow.png" alt="Map options for generating telemetry data and sending it to observability products." width="90%">}}

## Send OpenTelemetry data to Datadog

If your applications and services are instrumented with OpenTelemetry libraries, you can choose how to get traces, metrics, and logs data to the Datadog backend.

<div class="alert alert-info"><strong>Not sure which setup is right for you?</strong></br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

### Use the OpenTelemetry Collector

**Best for**: New or existing OTel users that want a completely vendor-neutral setup.

The OpenTelemetry Collector with Datadog Exporter provides:
- Complete vendor neutrality for sending OpenTelemetry data to Datadog
- Flexible deployment options
- No need to install the Datadog Agent or tracing libraries

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Learn more about using the OTel Collector{{< /nextlink >}}
{{< /whatsnext >}}
    
### Use OTLP ingest in the Datadog Agent

**Best for**: Environments already using the Datadog Agent or requiring Agent-based features.

OTLP Ingest in the Datadog Agent provides:
- Native integration with Datadog Agent features
- Streamlined deployment with existing Agent infrastructure

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Learn more about using OTLP ingest in the Agent{{< /nextlink >}}
{{< /whatsnext >}}

### See additional setup options

For a complete list of ways to send OpenTelemetry data to Datadog, including using the OTLP intake endpoint and the OpenTelemetry API with Datadog's tracing library, see the [Send Data to Datadog][7] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: /opentelemetry/collector_exporter/
[4]: /opentelemetry/otlp_ingest_in_the_agent/
[7]: /opentelemetry/setup