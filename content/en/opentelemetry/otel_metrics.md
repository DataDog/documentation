---
title: Send Metrics from OpenTelemetry to Datadog
kind: documentation
aliases:
- /metrics/open_telemetry/
further_reading:
    - link: '/opentelemetry/'
      tag: 'Documentation'
      text: 'Learn more about OpenTelemetry'
    - link: 'https://www.datadoghq.com/blog/ingest-opentelemetry-traces-metrics-with-datadog-exporter/'
      tag: 'Blog'
      text: 'Send metrics and traces from OpenTelemetry Collector to Datadog via Datadog Exporter'
---

## Overview

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OpenTelemetry provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

## Setup

To send OpenTelemetry metrics to Datadog, you have two options: the Datadog Agent, or the OpenTelemetry Collector. Using the Datadog Agent enables you to keep using all [Agent functionalities][3]. For a more vendor-agnostic setup, use the OpenTelemetry Collector.

If your applications and services are instrumented with [OpenTelemetry][4] libraries, you can choose between two paths for getting the metrics data to the Datadog backend:

1. [Send metrics to the OpenTelemetry collector, and use the Datadog exporter to forward them to Datadog][5], or

2. [Ingest metrics with the Datadog Agent, which collects them for Datadog][6].

Read [OpenTelemetry][7] for more information.

## Out-of-the-box dashboards

Datadog provides out-of-the-box dashboards that you can copy and customize. To use Datadog's out-of-the-box OpenTelemetry dashboards, go to **Dashboards** > **Dashboards list** and search for `opentelemetry`:

{{< img src="metrics/otel/dashboard.png" alt="The Dashboards list, showing two OpenTelemetry out-of-the-box dashboards: Host Metrics and Collector Metrics." style="width:80%;">}}

The **Host Metrics** dashboard is for data collected from the [host metrics receiver][8]. The **Collector Metrics** dashboard is for any other types of metrics collected, depending on which [metrics receiver][9] you choose to enable.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://www.datadoghq.com/pricing/?product=infrastructure#infrastructure
[4]: https://opentelemetry.io/docs/
[5]: /opentelemetry/otel_collector_datadog_exporter/
[6]: /opentelemetry/otlp_ingest_in_the_agent/
[7]: /opentelemetry/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver
