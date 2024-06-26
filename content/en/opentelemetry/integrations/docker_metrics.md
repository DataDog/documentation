---
title: Docker Metrics
aliases:
- /opentelemetry/collector_exporter/docker_metrics/
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/docker_metrics.png" alt="OpenTelemetry Docker metrics in a Containers dashboard" style="width:100%;" >}}

To collect container metrics, configure the [Docker stats receiver][1] in your Datadog Exporter.

For more information, see the OpenTelemetry project documentation for [the Docker stats receiver][1].


## Setup

{{< tabs >}}
{{% tab "Host" %}}

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
**Note**: If you are using the collector image, you may need to [configure additional permissions for the collector to have access to the Docker socket][1]. 

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/11791

{{% /tab %}}

{{% tab "Kubernetes" %}}

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

{{% /tab %}}

{{< /tabs >}}

## Data collected

See [OpenTelemetry Metrics Mapping][2] for information about collected container metrics.


## Full example configuration

For a full working example configuration with the Datadog exporter, see [`docker-stats.yaml`][3].

## Example logging output

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


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[2]: /opentelemetry/guide/metrics_mapping/#container-metrics
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/docker-stats.yaml