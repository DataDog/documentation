---
title: Install the Datadog Distribution of OTel Collector on Linux
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > OpenTelemetry in Datadog > Send OpenTelemetry Data to Datadog > Datadog
  Distribution of OpenTelemetry Collector > Install > Install the Datadog
  Distribution of OTel Collector on Linux
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/install/linux/index.html
---

# Install the Datadog Distribution of OTel Collector on Linux

{% callout %}
Support for deploying the DDOT Collector on Linux-based bare-metal hosts and virtual machines is currently in Preview.
{% /callout %}

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com



{% alert level="danger" %}
FedRAMP customers should not enable or use the embedded OpenTelemetry Collector.
{% /alert %}


{% /callout %}

## Overview{% #overview %}

Follow this guide to install the Datadog Distribution of OpenTelemetry (DDOT) Collector on Linux-based bare-metal hosts and virtual machines.

## Requirements{% #requirements %}

To complete this guide, you need the following:

**Datadog account**:

1. [Create a Datadog account](https://www.datadoghq.com/free-datadog-trial/) if you don't have one.
1. Find or create your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys/).

**Software**:

- A supported Linux distribution (for example, Debian, Ubuntu, CentOS, RHEL, Fedora, SUSE).
- `curl` must be installed to use the one-line installation script.

## Install the Datadog Agent with OpenTelemetry Collector{% #install-the-datadog-agent-with-opentelemetry-collector %}

### Installation{% #installation %}

To install the DDOT Collector on a Linux host, use the following one-line installation command:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="" DD_OTELCOLLECTOR_ENABLED=true DD_AGENT_MAJOR_VERSION=7 DD_AGENT_MINOR_VERSION=70.0-1 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

This command installs both the core Datadog Agent package and the DDOT Collector that runs alongside it.

### Validation{% #validation %}

Run the Agent's [status command](https://docs.datadoghq.com/agent/configuration/agent-commands/#agent-status-and-information) to verify installation.

```shell
sudo datadog-agent status
```

A successful installation returns an Agent Status report that begins with Agent information like this:

```text
====================
Agent (v7.x.x)
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

There will also be an **OTel Agent** status section that includes OpenTelemetry information:

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.x.x
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

## Configure the Datadog Agent{% #configure-the-datadog-agent %}

### Enable the DDOT Collector{% #enable-the-ddot-collector %}

The configuration file for the Datadog Agent is automatically installed at `/etc/datadog-agent/datadog.yaml`. The installation script adds the following configuration settings to `/etc/datadog-agent/datadog.yaml` to enable the DDOT Collector:

In the `datadog-agent.yaml` file:

```yaml
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
```

DDOT automatically binds the OpenTelemetry Collector to ports 4317 (grpc) and 4318 (http) by default.

### (Optional) Enable additional Datadog features{% #optional-enable-additional-datadog-features %}

{% alert level="danger" %}
Enabling these features may incur additional charges. Review the [pricing page](https://www.datadoghq.com/pricing/) and talk to your Customer Success Manager before proceeding.
{% /alert %}

For a complete list of available options, refer to the fully commented reference file at `/etc/datadog-agent/datadog.yaml.example` or the sample [`config_template.yaml`](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml) file.

When enabling additional Datadog features, always use the Datadog or OpenTelemetry Collector configuration files instead of relying on Datadog environment variables.

## Configure the OpenTelemetry Collector{% #configure-the-opentelemetry-collector %}

The installation script provides a sample OpenTelemetry Collector configuration at `/etc/datadog-agent/otel-config.yaml` that you can use as a starting point.

{% collapsible-section %}
Sample otel-config.yaml file from installation
Sample `otel-config.yaml` from installation will look something like this:

In the `otel-config.yaml` file:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
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
```

{% /collapsible-section %}

#### Key components{% #key-components %}

To send telemetry data to Datadog, the following components are defined in the configuration:

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/components-2.74385f27545b6fc024ea25bc6cd7353f.png?auto=format"
   alt="Diagram depicting the Agent deployment pattern" /%}

##### Datadog connector{% #datadog-connector %}

The [Datadog connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector) computes Datadog APM trace metrics.

In the `otel-config.yaml` file:

```yaml
connectors:
  datadog/connector:
    traces:
```

##### Datadog exporter{% #datadog-exporter %}

The [Datadog exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter) exports traces, metrics, and logs to Datadog.

In the `otel-config.yaml` file:

```yaml
exporters:
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
```

**Note**: If `key` is not specified or set to a secret, or if `site` is not specified, the system uses values from the core Agent configuration. By default, the core Agent sets site to `datadoghq.com` (US1).

##### Prometheus receiver{% #prometheus-receiver %}

The [Prometheus receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver) collects health metrics from the OpenTelemetry Collector for the metrics pipeline.

In the `otel-config.yaml` file:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
```

For more information, see the [Collector Health Metrics](https://docs.datadoghq.com/opentelemetry/integrations/collector_health_metrics/) documentation.

## Send your telemetry to Datadog{% #send-your-telemetry-to-datadog %}

To send your telemetry data to Datadog:

1. Instrument your application
1. Configure the application
1. Correlate observability data
1. Run your application

### Instrument the application{% #instrument-the-application %}

Instrument your application [using the OpenTelemetry API](https://docs.datadoghq.com/opentelemetry/instrument/api_support).

{% collapsible-section %}
Example application instrumented with the OpenTelemetry API
As an example, you can use the [Calendar sample application](https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar) that's already instrumented for you. The following code instruments the [CalendarService.getDate()](https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48) method using the OpenTelemetry annotations and API:

In the `CalendarService.java` file:

```java
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
```

{% /collapsible-section %}

### Configure the application{% #configure-the-application %}

Your application must send data to the DDOT Collector on the same host. Ensure that the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable is set on your application.

If using the example application, [`run-otel-local.sh`](https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/run-otel-local.sh) sets up the required environment variables and runs the application:

In the `run-otel-local.sh` file:

```bash
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```



### Correlate observability data{% #correlate-observability-data %}

[Unified service tagging](https://docs.datadoghq.com/opentelemetry/correlate/) ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

In bare-metal environments, `env`, `service`, and `version` are set through the OpenTelemetry Resource Attributes environment variables. The DDOT Collector detects this tagging configuration and applies it to the data it collects from applications.

In the example application, this is done in `run-otel-local.sh`:

In the `run-otel-local.sh` file:

```bash
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-calendar-service,service.version=1.0,deployment.environment.name=otel-test,host.name=calendar-host"
```



### Run the application{% #run-the-application %}

Redeploy your application to apply the changes made in your environment variables. After the updated configuration is active, unified service tagging is fully enabled for your metrics, traces, and logs.

## Explore observability data in Datadog{% #explore-observability-data-in-datadog %}

Use Datadog to explore the observability data for your application.

### Fleet automation{% #fleet-automation %}

Explore your Datadog Agent and Collector configuration.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/fleet_automation.baf78a14f2401833d04f1b19c38ddcf4.png?auto=format"
   alt="Review your Agent and Collector configuration from the Fleet Automation page." /%}

### Infrastructure monitoring{% #infrastructure-monitoring %}

View runtime and infrastructure metrics to visualize, monitor, and measure the performance of your hosts.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/infrastructure.c8fe3b51603bf26daef58b0c3fbdbb6d.png?auto=format"
   alt="View runtime and infrastructure metrics from the Host List." /%}

### Logs{% #logs %}

View logs to monitor and troubleshoot application and system operations.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/logs.3399501b14c5a2c7bf9ab8dd4aa8bf52.png?auto=format"
   alt="View logs from the Log Explorer." /%}

### Traces{% #traces %}

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/traces.0dfe8b50575dbfcea5b0d06131826db9.png?auto=format"
   alt="View traces from the Trace Explorer." /%}

### Runtime metrics{% #runtime-metrics %}

Monitor your runtime (JVM) metrics for your applications.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/metrics.1f91a119276f91ecfb2976f16eed58ef.png?auto=format"
   alt="View JVM metrics from the JVM Metrics dashboard" /%}

### Collector health metrics{% #collector-health-metrics %}

View metrics from the DDOT Collector to monitor the Collector health.

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/embedded_collector/dashboard.f6e65b6b9a8708b1a7e172da215947af.png?auto=format"
   alt="View Collector health metrics from the OTel dashboard." /%}

## Further reading{% #further-reading %}

- [Use Custom OpenTelemetry Components with Datadog Agent](https://docs.datadoghq.com/opentelemetry/setup/ddot_collector/custom_components)
