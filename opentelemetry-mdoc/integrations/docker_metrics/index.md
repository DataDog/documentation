---
title: Docker Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Docker Metrics
---

# Docker Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/docker_metrics.8dd22fdd0cea9ad4d525b98b61f9c646.png?auto=format"
   alt="OpenTelemetry Docker metrics in a Containers dashboard" /%}

To collect container metrics, configure the [Docker stats receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver) in your OpenTelemetry Collector and send the data using the Datadog Exporter.

For more information, see the OpenTelemetry project documentation for [the Docker stats receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver).

## Setup{% #setup %}

{% tab title="Host" %}
The Docker stats receiver needs access to the Docker socket. By default, the receiver looks for the Docker socket at `unix:///var/run/docker.sock`. If this is not the Docker socket path, specify the path in the `endpoint` configuration line.

Add the following lines to your Collector configuration:

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # (default)
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

**Note**: If you are using the collector image, you may need to [configure additional permissions for the collector to have access to the Docker socket](https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/11791).
{% /tab %}

{% tab title="Kubernetes" %}
The Docker stats receiver needs access to the Docker socket. In Kubernetes, if you are running Docker as a runtime, mount the Docker socket:

Add the following lines to `values.yaml`:

```yaml
extraVolumes:
 - name: docker-sock
   hostPath:
     path: /var/run/docker.sock
extraVolumeMounts:
 - name: docker-sock
   mountPath: /var/run/docker.sock
```

Add the following in the Collector configuration:

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # default
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

{% /tab %}

## Correlate traces with container metrics{% #correlate-traces-with-container-metrics %}

To correlate traces with container metrics, both telemetry types must share common resource attributes. These attributes provide the necessary context for correlation.

1. Configure [Unified Service Tagging](http://localhost:1313/opentelemetry/mapping/semantic_mapping#unified-service-tagging) attributes.
1. Configure the following attributes on both your traces and metrics:

| Attribute                                | Value                                                          | Description                                                                                                                                                               |
| ---------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container.id` (**Required**)            | The Docker container ID.                                       | Uniquely identifies the container. Essential for correlating spans with container metrics. Without this attribute on traces, container metric views are not shown in APM. |
| `container.name` or `k8s.container.name` | The human‑readable container name (for example, `redis-otel`). | Used as the display name in Datadog.                                                                                                                                      |
| `k8s.pod.name`                           | The pod name (for example, `redis-otel-59c9b5c9d5-s9t2r`).     | Enables navigation between pod and container context views in Kubernetes environments.                                                                                    |

### Traces{% #traces %}

To populate these resource attributes on **traces**:

- You can use a `resourcedetectionprocessor` in your Collector config:

  ```yaml
  processors:
     resourcedetection:
        detectors: ["env", "container", "k8s"]
  service:
     pipelines:
        traces:
           processors: [resourcedetection]
  ```

- You can add a container resource detector in your application code.For example, using Go:

  ```go
  // resource.WithContainer() adds container.id attribute to the trace's resource
  res, err := resource.New(
      ctx,
      resource.WithContainer(),                    
      resource.WithFromEnv(),
      semconv.ServiceNameKey.String("calendar"),   
  )
  ```

See the complete example in [opentelemetry-examples](https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/golang/calendar/main.go).

### Metrics{% #metrics %}

To populate these resource attributes on **metrics**, the `docker_stats` receiver automatically detects and adds these attributes on container metrics it emits.

## Data collected{% #data-collected %}

The Docker Stats receiver generates container metrics for the OpenTelemetry Collector. The Datadog Exporter translates container metrics to their Datadog counterparts for use in the following views:

- [Containers Overview default dashboard](http://localhost:1313/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard)
- [APM Trace view](http://localhost:1313/tracing/trace_explorer/trace_view/) with container metrics

Learn more about [mapping between OpenTelemetry and Datadog semantic conventions for resource attributes](http://localhost:1313/opentelemetry/guide/semantic_mapping/).

The following table shows the Datadog container metric names that correspond to OpenTelemetry container metric names:

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Full example configuration{% #full-example-configuration %}

For a full working example configuration with the Datadog exporter, see [`docker-stats.yaml`](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/docker-stats.yaml).

## Example logging output{% #example-logging-output %}

```
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> container.runtime: Str(docker)
     -> container.hostname: Str(be51776e036e)
     -> container.id: Str(be51776e036e04461169fce2847d4e77be3d83856b474ad544143afc3d48e9e5)
     -> container.image.name: Str(sha256:9bdff337981de15f8cdf9e73b24af64a03e2e6dd1f156a274a15c1d8db98ab79)
     -> container.name: Str(redis-otel)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/dockerstatsreceiver 0.89.0-dev
Metric #6
Descriptor:
     -> Name: container.cpu.utilization
     -> Description: Percent of CPU used by the container.
     -> Unit: 1
     -> DataType: Gauge
NumberDataPoints #0
StartTimestamp: 2023-11-20 14:58:17.522765 +0000 UTC
Timestamp: 2023-11-20 14:58:19.550208 +0000 UTC
Value: 0.170933
```
