---
title: Get Started with the OpenTelemetry Collector
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "OpenTelemetry Collector Setup"
- link: "/opentelemetry/setup/collector_exporter/deploy"
  tag: "Documentation"
  text: "Deploy the OpenTelemetry Collector"
- link: "/opentelemetry/config/hostname_tagging"
  tag: "Documentation"
  text: "Configure Hostname and Tagging"
algolia:
  tags: ['opentelemetry', 'open telemetry', 'otel', 'otel collector']
---

## Overview

This guide walks you through sending traces, metrics, and logs to Datadog using the OpenTelemetry Collector with standard open source components. After completing these steps, you can explore your telemetry data in the Datadog Service Catalog and Trace Explorer.

This setup uses the OTLP HTTP exporter and span metrics connector. No Datadog Exporter or Datadog Connector required.

## Prerequisites

- A [Datadog account][1] and [API key][2]
- [OpenTelemetry Collector Contrib][3] v0.150.1 or later
- An application instrumented with an [OpenTelemetry SDK][4]

## Step 1: Configure the collector

Create a file named `collector.yaml`. This minimal configuration receives OTLP data from your application, collects host metrics, generates APM trace metrics, and exports everything to Datadog:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  hostmetrics:
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      memory: {}
      disk: {}
      filesystem: {}
      load: {}
      network: {}
      processes: {}

processors:
  resourcedetection:
    detectors: [env, system]
    timeout: 2s
    override: true
  cumulativetodelta: {}

connectors:
  forward: {}
  spanmetrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      - name: host.name
      - name: http.request.method
      - name: db.system
      - name: rpc.system
      - name: rpc.service
      - name: server.address

exporters:
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    metrics_endpoint: https://otlp.${env:DD_SITE}/api/v2/otlpmetrics
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3
    sending_queue:
      batch: {}

service:
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resourcedetection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, hostmetrics]
      processors: [resourcedetection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resourcedetection]
      exporters: [forward, spanmetrics]
    traces/sampling:
      receivers: [forward]
      exporters: [otlp_http]
    metrics/spanmetrics:
      receivers: [spanmetrics]
      exporters: [otlp_http]
  telemetry:
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

<div class="alert alert-info">This is a simplified configuration for getting started. For production deployments with the full span metrics dimensions list (required for all core APM features), see <a href="/opentelemetry/setup/collector_exporter/install/">Set Up the OpenTelemetry Collector</a>.</div>

## Step 2: Run the collector

Set your Datadog API key and [site][5], then start the Collector:

```shell
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE="{{< region-param key="dd_site" >}}"

otelcol-contrib --config collector.yaml \
  --feature-gates connector.spanmetrics.includeCollectorInstanceID
```

## Step 3: Point your application to the collector

Configure your OpenTelemetry-instrumented application to export data to the Collector by setting the `OTEL_EXPORTER_OTLP_ENDPOINT` environment variable:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
```

Set [Unified Service Tagging][6] resource attributes so your service appears correctly in Datadog:

```shell
export OTEL_SERVICE_NAME="my-service"
export OTEL_RESOURCE_ATTRIBUTES="deployment.environment.name=staging,service.version=1.0.0"
```

Start your application. It sends traces, metrics, and logs to the Collector, which forwards them to Datadog.

## Step 4: Explore your data in Datadog

After your application generates some traffic, your telemetry data appears in Datadog within a few seconds.

### Service catalog

Go to [**APM** > **Service Catalog**][7] to see your service listed with performance metrics computed from your trace data.

### Trace Explorer

Go to [**APM** > **Traces**][8] to view individual traces. Select a trace to inspect the flame graph and span details.

### Host metrics

Go to [**Infrastructure** > **Host Map**][9] to see the host running your Collector, populated by the `hostmetrics` receiver data.

## Next steps

- **Production configuration**: The configuration in this guide uses an abbreviated span metrics dimensions list. For production deployments, use the [full recommended configuration][10] which includes all dimensions required for core APM features like peer service inference, container tags, and operation name resolution.
- **Deploy to other environments**: See [Deploy the OpenTelemetry Collector][11] for Docker, Kubernetes, and Helm deployment guides.
- **Configure hostname and tagging**: See [Hostname and Tagging][12] for cloud-specific resource detection and Kubernetes attributes setup.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[4]: https://opentelemetry.io/docs/instrumentation/
[5]: /getting_started/site/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: https://app.datadoghq.com/services
[8]: https://app.datadoghq.com/apm/traces
[9]: https://app.datadoghq.com/infrastructure/map
[10]: /opentelemetry/setup/collector_exporter/install/
[11]: /opentelemetry/setup/collector_exporter/deploy/
[12]: /opentelemetry/config/hostname_tagging/
