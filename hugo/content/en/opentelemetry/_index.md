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
- link: "/opentelemetry/setup/otlp_ingest_in_the_agent/"
  tag: "Documentation"
  text: "OTLP ingestion by the Datadog Agent"
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

- link: "https://learn.datadoghq.com/courses/understanding-opentelemetry"
  tag: "Learning Center"
  text: "Understanding OpenTelemetry"
- link: "https://www.datadoghq.com/blog/control-trace-volume-with-opentelemetry-tail-based-sampling/"
  tag: "Blog"
  text: "Control trace volume with OpenTelemetry tail-based sampling"
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

[OpenTelemetry][1] (OTel) provides standardized protocols for collecting and routing telemetry data. Datadog accepts OpenTelemetry traces, metrics, and logs, and connects them to the rest of your observability data. For an introduction to OpenTelemetry concepts, see the [OpenTelemetry documentation][2].

## How Datadog works with OpenTelemetry

You can send standard OpenTelemetry data to Datadog without re-instrumenting your applications.

- **Consistent tagging**: Datadog maps the `service.name`, `service.version`, and `deployment.environment.name` resource attributes to [unified service tags][3], so your OpenTelemetry services use the same tags as the rest of your infrastructure.
- **Metrics that work with Datadog products**: Datadog maps incoming OpenTelemetry metrics to Datadog metric formats automatically. For details, see [Metrics Mapping][4].
- **Connected telemetry**: Datadog correlates traces, metrics, and logs in every supported setup. For details, see [Correlate Data][5].
- **Your choice of components**: Use Datadog-supported components, such as the DDOT Collector, or upstream OpenTelemetry components. Both receive standard OTLP data from your applications.
- **Feature differences by setup**: Some Datadog features, such as Continuous Profiler and Real User Monitoring, require the Datadog SDK. For details, see [Feature Compatibility][6].

## Choose a setup

<!-- TODO: Update this section and its diagrams after the recommended setups and component names are finalized. -->

Each option lists the steps to follow, in order.

<div class="alert alert-info"><strong>Not sure which setup is right for you?</strong><br> See the <a href="/opentelemetry/compatibility/">Feature Compatibility</a> table to understand which Datadog features each setup supports.</div>

### Option 1: DDOT Collector (Recommended)

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Architecture overview for DDOT Collector, which is embedded in the Datadog Agent." style="width:100%;" >}}

**Best for**: Teams that want Datadog to support the Collector in their pipeline.

1. Instrument your applications with the [OpenTelemetry SDK][7] or the [Datadog SDK][8].
1. Install the [DDOT Collector][9]. Running the DDOT Collector in the Datadog Agent also gives you Agent features, such as Fleet Automation, Live Processes, Cloud Network Monitoring, Universal Service Monitoring, and {{< translate key="integration_count" >}}+ Datadog integrations.
1. Confirm that your services appear in Datadog APM. If they don't, see [Troubleshooting][10].

### Option 2: Upstream OpenTelemetry Collector

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Diagram: OpenTelemetry SDK in code sends data through OTLP to a host running the OpenTelemetry Collector, which forwards data to Datadog over OTLP." style="width:100%;" >}}

**Best for**: Teams that want a pipeline built only from upstream OpenTelemetry components.

1. Instrument your applications with the [OpenTelemetry SDK][7].
1. Configure the [OpenTelemetry Collector][11] with the recommended OTLP HTTP exporter and `span_metrics` connector.
1. Confirm that your services appear in Datadog APM. If they don't, see [Troubleshooting][10].

### Option 3: Direct OTLP ingest

<!-- TODO: Add a diagram for direct OTLP ingest. -->

**Best for**: Platforms that already send OTLP, serverless functions, managed platforms, and other environments where you can't run a Collector.

1. Instrument your applications with the [OpenTelemetry SDK][7], or use your platform's built-in OTLP export.
1. Send your data to the [Datadog OTLP intake endpoints][12].
1. Confirm that your services appear in Datadog APM. If they don't, see [Troubleshooting][10].

### Other setups

- **[OTLP Ingest in the Agent][13]**: Use this if you run the Datadog Agent and want it to receive OTLP data from your applications without managing Collector pipelines.
- **[Datadog Exporter][14]**: Use this if your OpenTelemetry Collector already sends data with the Datadog Exporter and Datadog Connector.

For all available methods, see [Send OpenTelemetry Data to Datadog][15].

## Already using Datadog?

If you already use the Datadog Agent or Datadog SDKs, you can adopt OpenTelemetry in steps:

- Instrument your code with the OpenTelemetry API while keeping the Datadog SDK. See [OpenTelemetry API Support][16].
- Export traces from the Datadog SDK in OTLP format. See [OTLP Export][17].
- Move an existing OpenTelemetry Collector setup to the DDOT Collector. See [Migrate to the DDOT Collector][18].

For more guides, see [OpenTelemetry Migration Guides][19].

<!-- TODO: Add guidance for running Datadog SDKs and OpenTelemetry instrumentation side by side. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/concepts/
[3]: /getting_started/tagging/unified_service_tagging/
[4]: /opentelemetry/mapping/metrics_mapping/
[5]: /opentelemetry/correlate/
[6]: /opentelemetry/compatibility/
[7]: /opentelemetry/instrument/otel_sdks/
[8]: /opentelemetry/instrument/dd_sdks/
[9]: /opentelemetry/setup/ddot_collector/
[10]: /opentelemetry/troubleshooting/#services-or-trace-metrics-are-missing-in-apm
[11]: /opentelemetry/setup/collector_exporter/
[12]: /opentelemetry/setup/otlp_ingest/
[13]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[14]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[15]: /opentelemetry/setup/
[16]: /opentelemetry/instrument/dd_sdks/api_support/
[17]: /opentelemetry/instrument/dd_sdks/otlp_trace_export/
[18]: /opentelemetry/migrate/ddot_collector/
[19]: /opentelemetry/migrate/
