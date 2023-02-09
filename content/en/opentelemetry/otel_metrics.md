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

[OpenTelemetry][1] (OTel) is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data. Created as an incubator project by the [Cloud Native Computing Foundation][2] (CNCF), OTel provides a consistent format for instrumenting, generating, gathering, and exporting application telemetry data—namely metrics, logs, and traces—to monitoring platforms for analysis and insight.

## Setup

To send OTel metrics to Datadog, you have two options: the Datadog Agent, or the OTel Collector. Using the Datadog Agent enables you to keep using all [Agent functionalities][3]. For a more vendor-agnostic setup, use the OTel Collector.

### Datadog Agent setup

{{< img src="metrics/otel/otlp_ingestion_update.png" alt="OTel SDKs/Libraries, Datadog Trace Library, Datadog Integrations -> Datadog Agent -> Datadog" style="width:100%;">}}



#### Configuration

1. [Instrument your applications with OpenTelemetry SDKs][4].
2. [Enable OTLP ingestion][5] on the Datadog Agent.
3. [Send OTLP telemetry][6] from your system to Datadog.

### OTel Collector setup

{{< img src="metrics/otel/datadog_exporter.png" alt="Application Instrumented Library, Cloud Integrations, and Other Monitoring Solutions (e.g. Prometheus) -> Datadog Exporter inside OTel Collector -> Datadog" style="width:100%;">}}

Using this setup facilitates collecting telemetry data from sources besides OTel SDKs (for example, other libraries, Prometheus, etc.), as well as routing data to multiple vendors. 

#### Configuration

1. [Instrument your system with OpenTelemetry][4].
2. Follow the [OTel Collector documentation][7] to install the `opentelemetry-collector-contrib` distribution, or any other distribution that includes the Datadog Exporter.
3. Add a `datadog` exporter to your [OTel configuration YAML file][8]. The following is a minimum configuration file to retrieve system metrics:
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
   Add your [Datadog API key][9] and [site][10] (defaults to `datadoghq.com`).
   See the [sample configuration file][11] for other available options.

##### Using the OTel Collector with the Datadog Agent

If you want to use the OTel Collector, but you also want to keep a full range of Datadog capabilities, use the following setup:

**OTel SDKs/Libraries** -> **OTel Collector** with the OTLP Exporter -> **Datadog Agent** -> **Datadog**

#### Configuration

1. [Instrument your system with OpenTelemetry][4].
2. [Enable OTLP ingestion through gRPC][5] on the Datadog Agent.
3. Add an OTLP exporter to your [OTel configuration YAML file][8]. Point the exporter to the Datadog Agent endpoint. For example, if your Datadog Agent is listening on port 4317 and you are running the OTel Collector on the same host, you may define the exporter as:
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
   If you are using a containerized environment, ensure the `endpoint` setting is configured to use the approprate hostname for the Datadog Agent.

## Out-of-the-box dashboards

Datadog provides out-of-the-box dashboards that you can copy and customize. To use Datadog's out-of-the-box OpenTelemetry dashboards, go to **Dashboards** > **Dashboards list** and search for `opentelemetry`:

{{< img src="metrics/otel/dashboard.png" alt="The Dashboards list, showing two OpenTelemetry out-of-the-box dashboards: Host Metrics and Collector Metrics." style="width:80%;">}}

The **Host Metrics** dashboard is for data collected from the [host metrics receiver][12]. The **Collector Metrics** dashboard is for any other types of metrics collected, depending on which [metrics receiver][13] you choose to enable.




## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://www.cncf.io/
[3]: https://www.datadoghq.com/pricing/?product=infrastructure#infrastructure
[4]: https://opentelemetry.io/docs/instrumentation/
[5]: /opentelemetry/otlp_ingest_in_the_agent/?tab=host#enabling-otlp-ingestion-on-the-datadog-agent
[6]: /opentelemetry/otlp_ingest_in_the_agent/?tab=host#sending-otlp-traces-from-the-application-to-datadog-agent
[7]: https://opentelemetry.io/docs/collector/getting-started/#deployment
[8]: https://opentelemetry.io/docs/collector/configuration/
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /getting_started/site/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter/examples
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver

