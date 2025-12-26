---
title: OpenTelemetry in Datadog
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog
sourceUrl: https://docs.datadoghq.com/opentelemetry/index.html
---

# OpenTelemetry in Datadog

{% callout %}
##### Try "Introduction to OTel with Datadog" in the Learning Center

Learn how to configure OpenTelemetry to export metrics, traces, and logs to Datadog, and explore the collected data in the platform.

[ENROLL NOW](https://learn.datadoghq.com/courses/otel-with-datadog)
{% /callout %}

## Overview{% #overview %}

[OpenTelemetry](https://opentelemetry.io/) (OTel) provides standardized protocols for collecting and routing telemetry data. Datadog supports multiple ways to collect and analyze telemetry data from OpenTelemetry-instrumented applications, whether you're using existing Datadog infrastructure or prefer a vendor-neutral setup.

### Why OpenTelemetry with Datadog?{% #why-opentelemetry-with-datadog %}

Datadog provides advanced observability for all your application telemetry, regardless of its source. By supporting OpenTelemetry, Datadog offers:

- **Flexibility and choice**: Use standardized instrumentation while maintaining freedom to adapt as your technology needs evolve.
- **Comprehensive language support**: Consistently monitor applications across your entire tech stack.
- **Unified instrumentation**: Maintain a single approach to instrumentation across your systems.
- **Powerful analytics**: Combine OpenTelemetry's standardization with Datadog's robust analysis, visualization, and alerting capabilities.

Whether you're already using OpenTelemetry or considering adoption, Datadog provides flexible options to meet your needs.

### Key decisions{% #key-decisions %}

There are two key decisions to make when using OpenTelemetry with Datadog:

- How to instrument your applications
- How to send your data to Datadog

The features available to you depend on these choices. For example, using the OpenTelemetry API with the Datadog SDK provides access to more Datadog features than using the OpenTelemetry SDK alone.

For more information, read [Feature Compatibility](https://docs.datadoghq.com/opentelemetry/compatibility/).

## Instrument your applications{% #instrument-your-applications %}

There are several ways to instrument your applications with OpenTelemetry and Datadog. Each approach provides different features and levels of vendor neutrality.

- **Full OpenTelemetry**: Use the OpenTelemetry SDK and API for a vendor-neutral setup.
- **OpenTelemetry API**: Use the OpenTelemetry API with Datadog's SDK implementation.
- **OpenTelemetry instrumentation libraries**: Extend Datadog's observability to additional frameworks and technologies.

For more information, see [Instrument Your Applications](https://docs.datadoghq.com/opentelemetry/instrument/).

## Send OpenTelemetry data to Datadog{% #send-opentelemetry-data-to-datadog %}

If your applications and services are instrumented with OpenTelemetry libraries, you can choose how to get traces, metrics, and logs data into Datadog.

{% alert level="info" %}
**Not sure which setup is right for you?**See the [Feature Compatibility](https://docs.datadoghq.com/opentelemetry/compatibility/) table to understand which Datadog features are supported.
{% /alert %}

### Option 1: Use the Datadog Agent with DDOT Collector (Recommended){% #option-1-use-the-datadog-agent-with-ddot-collector-recommended %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/setup/ddot-collector-2.48e827fe0ea4d62cd26a81521e9fa584.png?auto=format"
   alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." /%}

**Best for**: Existing Datadog users or teams requiring Agent-based features such as:

- Fleet Automation
- Live Container Monitoring
- Kubernetes Explorer
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- 900+ Datadog integrations

{% alert level="info" %}
For a complete list of Agent-based features, see **OTel to Datadog Agent (OTLP)** in [Feature Compatibility](https://docs.datadoghq.com/opentelemetry/compatibility/).
{% /alert %}

- [Learn more about using the Datadog Agent with DDOT Collector](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/)

### Option 2: Use the OpenTelemetry Collector{% #option-2-use-the-opentelemetry-collector %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/setup/otel-collector.0480e3141dece4beac1203109a2cbf8a.png?auto=format"
   alt="Diagram: OpenTelemetry SDK in code sends data through OTLP to host running OpenTelemetry Collector with Datadog Exporter, which forwards to Datadog's Observability Platform." /%}

**Best for**: New or existing OTel users wanting a completely vendor-neutral setup.

- Complete vendor neutrality for sending OpenTelemetry data to Datadog
- Flexible configuration options like tail-based sampling and data transformations

- [Learn more about using the OTel Collector](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/)

### Additional setup options{% #additional-setup-options %}

For other setup options, including direct OTLP ingestion, see [Send Data to Datadog](https://docs.datadoghq.com/opentelemetry/setup).

## Further reading{% #further-reading %}

- [Feature Compatibility](https://docs.datadoghq.com/opentelemetry/compatibility/)
- [Instrument Your Applications](https://docs.datadoghq.com/opentelemetry/instrument/)
- [Send Data to Datadog](https://docs.datadoghq.com/opentelemetry/setup/)
- [Datadog's partnership with OpenTelemetry](https://www.datadoghq.com/blog/opentelemetry-instrumentation/)
- [Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context](https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/)
- [Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter](https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/)
- [Forward logs from the OpenTelemetry Collector with the Datadog Exporter](https://www.datadoghq.com/blog/opentelemetry-logs-datadog-exporter/)
- [OTLP ingestion in the Agent](https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/)
- [Learn more about AWS's managed Lambda Layer for OpenTelemetry](https://www.datadoghq.com/blog/aws-opentelemetry-lambda-layer-datadog/)
- [Correlate Datadog RUM events with traces from OpenTelemetry-instrumented applications](https://www.datadoghq.com/blog/correlate-traces-datadog-rum-otel/)
- [Monitor runtime metrics from OTel-instrumented apps with Datadog APM](https://www.datadoghq.com/blog/opentelemetry-runtime-metrics-datadog/)
- [How to select your OpenTelemetry deployment](https://www.datadoghq.com/blog/otel-deployments/)
- [Introduction to OpenTelemetry with Datadog](https://learn.datadoghq.com/courses/otel-with-datadog)
