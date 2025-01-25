---
title: Set Up the OTel Collector
aliases:
- /tracing/setup_overview/open_standards/otel_collector_datadog_exporter/
- /tracing/trace_collection/open_standards/otel_collector_datadog_exporter/
- /opentelemetry/otel_collector_datadog_exporter/
- /opentelemetry/collector_exporter/
description: 'Send OpenTelemetry data to the OpenTelemetry Collector and Datadog Exporter'
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: "External Site"
  text: "Collector documentation"
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: "Blog"
  text: "Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter"
---

## Overview

The OpenTelemetry Collector enables you to collect, process, and export telemetry data from your applications in a vendor-neutral way. When configured with the [Datadog Exporter][1] and [Datadog Connector][29], you can send your traces, logs, and metrics to Datadog without the Datadog Agent.

- **Datadog Exporter**: Forwards trace, metric, and logs data from OpenTelemetry SDKs to Datadog (without the Datadog Agent)
- **Datadog Connector**: Calculates Trace Metrics from collected span data

{{< img src="metrics/otel/datadog_exporter.png" alt="Application Instrumented Library, Cloud Integrations, and Other Monitoring Solutions (for example Prometheus) -> Datadog Exporter inside OpenTelemetry Collector -> Datadog" style="width:100%;">}}

**Note**: To see which Datadog features are supported with this setup, see the [feature compatibility table][32] under **Full OTel**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[32]: /opentelemetry/compatibility/