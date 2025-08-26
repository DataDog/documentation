---
title: Install the Datadog Distribution of OTel Collector on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 2
further_reading:
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

{{< callout header="false" btn_hidden="true">}}
  Support for deploying the DDOT Collector on Linux-based bare-metal hosts and virtual machines is currently in Preview.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">FedRAMP customers should not enable or use the embedded OpenTelemetry Collector.</div>
{{< /site-region >}}

## Overview

Follow this guide to install the Datadog Distribution of OpenTelemetry (DDOT) Collector on Linux-based bare-metal hosts and virtual machines.

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].

## Install the Datadog Agent with OpenTelemetry Collector

### Installation

To install the DDOT Collector on a Linux host, use the following one-line installation command:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" DD_OTELCOLLECTOR_ENABLED=true DD_AGENT_MAJOR_VERSION=7 DD_AGENT_MINOR_VERSION=69.3-1 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

This command will install both the core Datadog Agent package and the DDOT Collector that will run alongside it.

### Validation

#### Terminal command

Run the Agent's [status command][3] to verify installation.

```shell
sudo datadog-agent status
```
A successful installation returns an Agent Status report that begins with Agent information like this:

```text
====================
Agent (v7.69.3)
====================
  Status date: 2025-08-22 18:35:17.449 UTC (1755887717449)
  Agent start: 2025-08-22 18:16:27.004 UTC (1755886587004)
  Pid: 2828211
  Go Version: go1.24.6
  Python Version: 3.12.11
  Build arch: amd64
  Agent flavor: agent
  FIPS Mode: not available
  Log Level: info
```

There will also be a DDOT status section that includes OpenTelemetry information:

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.69.3
  Collector Version: v0.129.0

  Receiver
  ==========================
    Spans Accepted: 0
    Metric Points Accepted: 1055
    Log Records Accepted: 0

  Exporter
  ==========================
    Spans Sent: 0
    Metric Points Sent: 1055
    Log Records Sent: 0
```

## Configure the Datadog Agent

### Enabling the DDOT Collector
The configuration file for the Datadog Agent will be automatically installed at `/etc/datadog-agent/datadog.yaml`. The installation script above adds the following configuration settings to `/etc/datadog-agent/datadog.yaml` in order to enable the DDOT Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
{{< /code-block >}}

DDOT automatically binds the OpenTelemetry Collector to ports 4317 (grpc) and 4318 (http) by default.


## Configure the OpenTelemetry Collector

The installation script provides a sample OpenTelemetry Collector configuration at `/etc/datadog-agent/otel-config.yaml` that you can use as a starting point.

{{% collapse-content title="Sample otel-config.yaml file from installation" level="p" %}}
Sample `otel-config.yaml` from installation will look something like this:
{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
extensions:
  health_check:
    endpoint: localhost:13133
  pprof:
    endpoint: localhost:1777
  zpages:
    endpoint: localhost:55679
  ddflare:
    endpoint: localhost:7777


receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
    # Collect own metrics
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otel-collector'
        fallback_scrape_protocol: PrometheusText0.0.4
        metric_name_validation_scheme: legacy
        metric_name_escaping_scheme: underscores
        scrape_interval: 60s
        scrape_protocols:
          - PrometheusText0.0.4
        static_configs:
        - targets: ['0.0.0.0:8888']
        metric_relabel_configs:
        - source_labels: [__name__]
          regex: ".*grpc_io.*"
          action: drop
exporters:
  datadog:
    hostname: "otelcol-docker"
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
processors:
  infraattributes:
  batch:
  # using the sampler
  probabilistic_sampler:
    sampling_percentage: 30
connectors:
  # Use datadog connector to compute stats for pre-sampled traces
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
service:
  extensions: [health_check, pprof, zpages, ddflare]
  pipelines:
    traces: # this pipeline computes APM stats
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog/connector]
    traces/sampling: # this pipeline uses sampling and sends traces
      receivers: [otlp]
      processors: [probabilistic_sampler, infraattributes,batch]
      exporters: [datadog]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes,batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
{{< /code-block >}}

Note: this configuration includes a sampling pipeline by default. If you do not wish to sample traces, you can modify the pipelines as follows:
{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
service:
  extensions: [health_check, pprof, zpages, ddflare]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### Key components

To send telemetry data to Datadog, the following components are defined in the configuration:

{{< img src="/opentelemetry/embedded_collector/components-2.png" alt="Diagram depicting the Agent deployment pattern" style="width:100%;" >}}

##### Datadog connector

The [Datadog connector][4] computes Datadog APM trace metrics.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog exporter

The [Datadog exporter][5] exports traces, metrics, and logs to Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
{{< /code-block >}}

**Note**: If `key` is not specified or set to a secret, or if `site` is not specified, the system uses values from the core Agent configuration. By default, the core Agent sets site to `datadoghq.com` (US1).

##### Prometheus receiver

The [Prometheus receiver][6] collects health metrics from the OpenTelemetry Collector for the metrics pipeline.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otel-collector"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

For more information, see the [Collector Health Metrics][6] documentation.

## Send your telemetry to Datadog

To send your telemetry data to Datadog:

1. [Instrument your application](#instrument-the-application)
2. [Configure the application](#configure-the-application)
3. [Correlate observability data](#correlate-observability-data)
4. [Run your application](#run-the-application)

### Instrument the application

Instrument your application [using the OpenTelemetry API][7].

{{% collapse-content title="Example application instrumented with the OpenTelemetry API" level="p" %}}
As an example, you can use the [Calendar sample application][8] that's already instrumented for you. The following code instruments the [CalendarService.getDate()][9] method using the OpenTelemetry annotations and API:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configure the application

Your application container must send data to the DDOT Collector on the same host. Since the Collector runs as a DaemonSet, you need to specify the local host as the OTLP endpoint.

If the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is not already set, add it to your application's Deployment manifest file:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   {{< /code-block >}}

### Correlate observability data

[Unified service tagging][10] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

Unified service tagging ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In containerized environments, `env`, `service`, and `version` are set through the OpenTelemetry Resource Attributes environment variables or Kubernetes labels on your deployments and pods. The DDOT detects this tagging configuration and applies it to the data it collects from containers.

To get the full range of unified service tagging, add **both** the environment variables and the deployment/pod labels:

{{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>"
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
  containers:
  -  ...
     env:
      - name: OTEL_SERVICE_NAME
        value: "<SERVICE>"
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: >-
          service.name=$(OTEL_SERVICE_NAME),
          service.version=<VERSION>,
          deployment.environment.name=<ENV>
{{< /code-block >}}

### Run the application

Redeploy your application to apply the changes made in the deployment manifest. Once the updated configuration is active, Unified Service Tagging will be fully enabled for your metrics, traces, and logs.

## Explore observability data in Datadog

Use Datadog to explore the observability data for your application.

### Fleet automation

Explore your Datadog Agent and Collector configuration.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Review your Agent and Collector configuration from the Fleet Automation page." style="width:100%;" >}}

### Live container monitoring

Monitor your container health using Live Container Monitoring capabilities.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Monitor your container health from the Containers page." style="width:100%;" >}}

### Infrastructure node health

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your nodes.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="View runtime and infrastructure metrics from the Host List." style="width:100%;" >}}

### Logs

View logs to monitor and troubleshoot application and system operations.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="View logs from the Log Explorer." style="width:100%;" >}}

### Traces

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="View traces from the Trace Explorer." style="width:100%;" >}}

### Runtime metrics

Monitor your runtime (JVM) metrics for your applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="View JVM metrics from the JVM Metrics dashboard" style="width:100%;" >}}

### Collector health metrics

View metrics from the DDOT Collector to monitor the Collector health.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="View Collector health metrics from the OTel dashboard." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: /agent/configuration/agent-commands/#agent-status-and-information
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[7]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[8]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[9]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[10]: /getting_started/tagging/unified_service_tagging
