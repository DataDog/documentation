---
title: Send Metrics from OpenTelemetry to Datadog
kind: documentation
further_reading:
    - link: 'tracing/trace_collection/open_standards/'
      tag: 'Documentation'
      text: 'Learn more about OpenTelemetry'
---

## Overview

[OpenTelemetry][1] (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OTel provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

## Choose a workflow

There are three available workflows for sending OTel metrics to Datadog. Choose the workflow that best fits your use case.

- If you are collecting telemetry data from only OTel SDKs and the Datadog Agent, and you do not plan on routing data to vendors other than Datadog:
  - Use the [OTLP ingestion](#otlp-ingest) workflow.
- Otherwise, if you are collecting telemetry data from a variety of sources (for example: Prometheus metrics) or you are routing data to multiple vendors:
  - If you require a full range of Datadog capabilities (for example: Datadog Agent capabilities, infrastructure monitoring, container monitoring, integrations):
    - Use the [OTLP Exporter](#otlp-exporter) workflow.
  - Otherwise, if you do not require these capabilities:
    - Use the [Datadog Exporter](#datadog-exporter) workflow.

## Setup

### OTLP ingestion in the Datadog Agent {#otlp-ingest}

{{< img src="metrics/otel/oltp_ingest.jpeg" alt="A flow chart showing a path from OTel SDKs/Libraries to the Datadog Agent to the Datadog backend." >}}

**OTel SDKs/Libraries** -> **Datadog Agent** -> **Datadog**

#### Use case
- You want a full range of Datadog capabilities (Datadog Agent capabilities, infrastructure monitoring, container monitoring, integrations).
- You are collecting telemetry data from OTel SDKs and the Datadog Agent. You do not plan on collecting data from other sources.
- You are routing telemetry data to Datadog. You do not plan on routing data to other vendors.

#### Configuration

1. [Instrument your system with OpenTelemetry][3].
2. [Enable OTLP ingestion][4] on the Datadog Agent.
3. [Send OTLP telemetry][5] from your system to Datadog.

### OTLP Exporter {#otlp-exporter}
**OTel SDKs/Libraries** -> **OTel Collector** with the OTLP Exporter -> **Datadog Agent** -> **Datadog**

#### Use case
- You want a full range of Datadog capabilities (Datadog Agent capabilities, infrastructure monitoring, container monitoring, integrations).
- You are collecting telemetry data from sources besides OTel SDKs and the Datadog Agent. For example: Prometheus metrics.
- You are routing telemetry data to multiple vendors.
- You are deploying the OTel Collector and Datadog Agent on the same host.

#### Configuration

1. [Instrument your system with OpenTelemetry][3].
2. [Enable OTLP ingestion through gRPC][4] on the Datadog Agent.
3. Add an OTLP exporter to your [OTel configuration YAML file][6]. Point the exporter to the Datadog Agent endpoint. For example, if your Datadog Agent is listening on port 4317 and you are running the OTel Collector on the same host, you may define the exporter as:
   ```yaml
   receivers:
     otlp:
         protocols:
             grpc:
               # Set to different port from Datadog Agent OTLP ingest 
               # Point your instrumented application to port '5317' if using gRPC.
               endpoint: "0.0.0.0:5317" 
             http:
               # Set to different port from Datadog Agent OTLP ingest 
               # Point your instrumented application to port '5318' if using HTTP.
               endpoint: "0.0.0.0:5318"

     hostmetrics:
       scrapers:
         load:
         cpu:
         disk:
         filesystem:
         memory:
         network:
         paging:
         process:

   processors:
     batch:
       timeout: 10s

   exporters:
     otlp:
       endpoint:
         key: "0.0.0.0:4317"
         tls:
           insecure: true
        
   service:
     pipelines:
       metrics:
         receivers: [hostmetrics]
         processors: [batch]
         exporters: [otlp]
   ```
   If you are using a containerized environment, ensure the `endpoint` setting is configured to use the approprate hostname for the Datadog Agent

### Datadog Exporter {#datadog-exporter}

{{< img src="metrics/otel/datadog_exporter.jpeg" alt="A flow chart showing a path from numerous sources (application instrumented library, cloud integrations, and other monitoring solutions like Prometheus) to the OTel Collector with the Datadog Exporter to the Datadog backend." >}}

**OTel SDKs/Libraries** and other sources -> **OTel Collector** with the Datadog Exporter -> **Datadog**

#### Use case
- You are collecting telemetry data from sources besides OTel SDKs and the Datadog Agent. For example: Prometheus metrics.
- You are routing telemetry data to multiple vendors.

#### Configuration

1. [Instrument your system with OpenTelemetry][3].
2. Follow the [OTel Collector documentation][7] to install the `opentelemetry-collector-contrib` distribution, or any other distribution that includes the Datadog Exporter.
3. Add a `datadog` exporter to your [OTel configuration YAML file][6]. The following is a minimum configuration file to retrieve system metrics:
   ```yaml
   receivers:
     hostmetrics:
       scrapers:
         load:
         cpu:
         disk:
         filesystem:
         memory:
         network:
         paging:
         process:

   processors:
     batch:
       timeout: 10s

   exporters:
     datadog:
       api:
         key: "<API key>"
         site: "<Datadog site>"
        
   service:
     pipelines:
       metrics:
         receivers: [hostmetrics]
         processors: [batch]
         exporters: [datadog]
   ```
   Add your [Datadog API key][8] and [site][9] (defaults to `datadoghq.com`).
   See the [sample configuration file][10] for other available options.

#### 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: /tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent
[5]: /tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/?tab=host#sending-otlp-traces-from-the-application-to-datadog-agent
[6]: https://opentelemetry.io/docs/collector/configuration/
[7]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /getting_started/site/
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
