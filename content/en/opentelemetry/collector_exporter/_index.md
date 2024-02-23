---
title: OpenTelemetry Collector and Datadog Exporter
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /opentelemetry/otel_collector_datadog_exporter/
description: 'Send OpenTelemetry data to the OpenTelemetry Collector and Datadog Exporter'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "OpenTelemetry"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: "Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter"
- link: "https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/"
  tag: "Blog"
  text: "Use HiveMQ and OpenTelemetry to monitor IoT applications in Datadog"
- link: "/metrics/open_telemetry/otlp_metric_types"
  tag: "Documentation"
  text: "OTLP Metrics Types"
---

## Overview

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. The [Datadog Exporter][1] for the OpenTelemetry Collector allows you to forward trace, metric, and logs data from OpenTelemetry SDKs to Datadog (without the Datadog Agent). It works with all supported languages, and you can [connect OpenTelemetry trace data with application logs][2].

{{< img src="metrics/otel/datadog_exporter.png" alt="Application Instrumented Library, Cloud Integrations, and Other Monitoring Solutions (for example Prometheus) -> Datadog Exporter inside OpenTelemetry Collector -> Datadog" style="width:100%;">}}

## Using the Collector

The following documentation describes how to deploy, configure, and manage the Collector:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/deployment/" >}}Deployment{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/configuration/" >}}Configuration{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/management/" >}}Management{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/integrations/" >}}Integrations{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[2]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry