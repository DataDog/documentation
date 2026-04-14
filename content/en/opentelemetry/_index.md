---
title: OpenTelemetry in Datadog
aliases:
- /tracing/setup_overview/open_standards/
- /opentelemetry/interoperability/
further_reading:
- link: "/opentelemetry/compatibility/"
  tag: "Documentation"
  text: "Feature Compatibility"
- link: "/opentelemetry/instrument/"
  tag: "Documentation"
  text: "Instrument Your Applications"
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send Data to Datadog"
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
- link: "https://www.datadoghq.com/blog/otel-deployments/"
  tag: "Blog"
  text: "How to select your OpenTelemetry deployment"
- link: "https://learn.datadoghq.com/courses/otel-with-datadog"
  tag: "Learning Center"
  text: "Introduction to OpenTelemetry with Datadog"

algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel']
cascade:
    algolia:
        rank: 70
---

{{< learning-center-callout hide_image="true" header="Try \"Introduction to OTel with Datadog\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/otel-with-datadog">}}
  Learn how to configure OpenTelemetry to export metrics, traces, and logs to Datadog, and explore the collected data in the platform.
{{< /learning-center-callout >}}

## Overview

[OpenTelemetry][1] (OTel) provides standardized protocols for collecting and routing telemetry data. Datadog supports multiple ways to collect and analyze telemetry data from OpenTelemetry-instrumented applications, whether you're using existing Datadog infrastructure or prefer a vendor-neutral setup.

### Why OpenTelemetry with Datadog?

Datadog provides advanced observability for all your application telemetry, regardless of its source. By supporting OpenTelemetry, Datadog offers:

- **Flexibility and choice**: Use standardized instrumentation while maintaining freedom to adapt as your technology needs evolve.
- **Comprehensive language support**: Consistently monitor applications across your entire tech stack.
- **Unified instrumentation**: Maintain a single approach to instrumentation across your systems.
- **Powerful analytics**: Combine OpenTelemetry's standardization with Datadog's robust analysis, visualization, and alerting capabilities.

Whether you're already using OpenTelemetry or considering adoption, Datadog provides flexible options to meet your needs.

### Key decisions

There are two key decisions to make when using OpenTelemetry with Datadog:

- [How to instrument your applications](#instrument-your-applications)
- [How to send your data to Datadog](#send-opentelemetry-data-to-datadog)

The features available to you depend on these choices. For example, using the OpenTelemetry API with the Datadog SDK provides access to more Datadog features than using the OpenTelemetry SDK alone.

For more information, read [Feature Compatibility][9].

## Instrument your applications

There are several ways to instrument your applications with OpenTelemetry and Datadog. Each approach provides different features and levels of vendor neutrality.

- **Full OpenTelemetry**: Use the OpenTelemetry SDK and API for a vendor-neutral setup.
- **OpenTelemetry API**: Use the OpenTelemetry API with Datadog's SDK implementation.
- **OpenTelemetry instrumentation libraries**: Extend Datadog's observability to additional frameworks and technologies.

For more information, see [Instrument Your Applications][8].

## Send OpenTelemetry data to Datadog

If your applications and services are instrumented with OpenTelemetry libraries, you can choose how to get traces, metrics, and logs data into Datadog.

<div class="alert alert-info"><strong>Not sure which setup is right for you?</strong><br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features are supported.</div>

### Option 1: Use the Datadog Agent with DDOT Collector (Recommended)

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." style="width:100%;" >}}

**Best for**: Users looking to gain both OTel vendor neutrality and Datadog ecosystem innovations, such as:

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog integrations

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/" >}}Learn more about using the Datadog Agent with DDOT Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Option 2: Use the OpenTelemetry Collector

{{< img src="/opentelemetry/setup/otel-collector.png" alt="Diagram: OpenTelemetry SDK in code sends data through OTLP to host running OpenTelemetry Collector with Datadog Exporter, which forwards to Datadog's Observability Platform." style="width:100%;" >}}

**Best for**: New or existing OTel users wanting a completely vendor-neutral setup.

- Complete vendor neutrality for sending OpenTelemetry data to Datadog
- Flexible configuration options like tail-based sampling and data transformations

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}Learn more about using the OTel Collector{{< /nextlink >}}
{{< /whatsnext >}}

### Additional setup options

For other setup options, including direct OTLP ingestion, see [Send Data to Datadog][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[7]: /opentelemetry/setup
[8]: /opentelemetry/instrument/
[9]: /opentelemetry/compatibility/
