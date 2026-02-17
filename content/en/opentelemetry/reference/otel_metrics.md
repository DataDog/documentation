---
title: Send Metrics from OpenTelemetry to Datadog
aliases: 
  - /opentelemetry/otel_metrics
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

To send OpenTelemetry metrics to Datadog, you have three main options:

- [OpenTelemetry Collector][11]
- [Datadog Agent][12]
- [Direct OTLP Ingest][13]

For more information about which setup is right for you, see [Send OpenTelemetry Data to Datadog][10].

## Query across Datadog and OpenTelemetry metrics 

Because OTel and Datadog metrics often use different naming conventions and semantic definitions, creating a unified view of your infrastructure in these environments can be challenging.

Datadog helps you bridge this gap by enabling you to:

- Query OTel and Datadog metrics together.
- Understand how OTel and Datadog metrics map to each other.

For more information, read [Query Across Datadog and OpenTelemetry Metrics][14]

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
[10]: /opentelemetry/setup/
[11]: /opentelemetry/setup/collector_exporter/
[12]: /opentelemetry/setup/agent
[13]: /opentelemetry/setup/agentless
[14]: /metrics/open_telemetry/query_metrics
