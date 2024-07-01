---
title: Send Logs from OpenTelemetry to Datadog
aliases:
- /logs/log_collection/opentelemetry/
further_reading:
- link: "https://opentelemetry.io/docs/collector/"
  tag: External Site
  text: Collector documentation
- link: "https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/"
  tag: Blog
  text: Send metrics, traces, and logs from OpenTelemetry Collector to Datadog using Datadog Exporter
- link: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
  tag: Documentation
  text: Connect OpenTelemetry Traces and Logs
---

<div class="alert alert-warning"><a href="https://opentelemetry.io/docs/reference/specification/logs/">OpenTelemetry logging</a> and Datadog Exporter's feature for sending logs to Datadog are in alpha.</div>

## Overview

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

The OpenTelemetry Collector is a vendor-agnostic agent process for collecting and exporting telemetry data emitted by many processes. Datadog has an [Exporter][3] available for the OpenTelemetry Collector which allows you to forward traces, metrics, and logs data from OpenTelemetry to Datadog. 

For collecting logs, Datadog recommends using the Collector's [filelog receiver][4]. The filelog receiver tails the log files that you specify. Then the Datadog Exporter (set up in the Collector) sends the log data to Datadog. 

{{< img src="logs/log_collection/otel_collector_logs.png" alt="A diagram showing the host, container, or application sending data the filelog receiver in the collector and the Datadog Exporter in the collector sending the data to the Datadog backend" style="width:100%;">}}

## Setup

If your applications and services are instrumented with [OpenTelemetry][4] libraries, send the logs data to the Datadog backend by using the OpenTelemetry Collector with the Datadog Exporter.

[Send logs to the OpenTelemetry collector, and use the Datadog exporter to forward them to Datadog][5]

Read [OpenTelemetry][6] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[4]: https://opentelemetry.io/docs/reference/specification/logs/overview/#third-party-application-logs
[5]: /opentelemetry/otel_collector_datadog_exporter/?tab=onahost#step-4---configure-the-logger-for-your-application
[6]: /tracing/other_telemetry/connect_logs_and_traces/opentelemetry/?tab=python
