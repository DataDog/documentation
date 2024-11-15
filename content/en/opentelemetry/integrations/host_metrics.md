---
title: Host Metrics
aliases:
- /opentelemetry/collector_exporter/host_metrics/
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/host_metrics.png" alt="OpenTelemetry host metrics dashboard" style="width:100%;" >}}

To collect system metrics such as CPU, disk, and memory usage, enable the [host metrics receiver][1] in your Collector. 

For more information, including supported operating systems, see the OpenTelemetry project documentation for the [host metrics receiver][1].


## Setup

{{< tabs >}}
{{% tab "Host" %}}

Add the following lines to your Collector configuration:

```yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Set up the host metrics receiver on each node from which metrics need to be collected. To collect host metrics from every node in your cluster, deploy the host metrics receiver as a DaemonSet collector. Add the following in the Collector configuration:

```yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:

```

{{% /tab %}}

{{< /tabs >}}

## Data collected

Host Metrics are collected by the [host metrics receiver][4]. For information about setting up the receiver, see [OpenTelemetry Collector Datadog Exporter][5].

The metrics, mapped to Datadog metrics, are used in the following views:
- [Infrastructure Host Map][6]
- [Infrastructure List][7]
- [Host default dashboards][8]
- [APM Trace view Host info][9]

**Note**: To correlate trace and host metrics, configure [Universal Service Monitoring attributes][10] for each service, and set the `host.name` resource attribute to the corresponding underlying host for both service and collector instances. 

The following table shows which Datadog host metric names are associated with corresponding OpenTelemetry host metric names, and, if applicable, what math is applied to the OTel host metric to transform it to Datadog units during the mapping.

| Datadog metric name   | OTel metric name      | Metric description         | Transform done on OTel metric      |
|-----------------------|-----------------------|----------------------------|--------------------------|
| `system.load.1`         | `system.cpu.load_average.1m`     | The average system load over one minute. (Linux only)       |         |
| `system.load.5`         | `system.cpu.load_average.5m`        | The average system load over five minutes. (Linux only)   | |
| `system.load.15`        | `system.cpu.load_average.15m`     | The average system load over 15 minutes. (Linux only)         |            |
| `system.cpu.idle`       | `system.cpu.utilization` <br>Attribute Filter state: `idle`    | Fraction of time the CPU spent in an idle state. Shown as percent.   | Multiplied by 100     |
| `system.cpu.user`       | `system.cpu.utilization` <br>Attribute Filter state: `user`    | Fraction of time the CPU spent running user space processes. Shown as percent.  | Multiplied by 100     |
| `system.cpu.system`     | `system.cpu.utilization` <br>Attribute Filter state: `system`  | Fraction of time the CPU spent running the kernel.    | Multiplied by 100    |
| `system.cpu.iowait`     | `system.cpu.utilization` <br>Attribute Filter state: `wait`    | The percent of time the CPU spent waiting for IO operations to complete.         | Multiplied by 100       |
| `system.cpu.stolen`     | `system.cpu.utilization` <br>Attribute Filter state: `steal`     | The percent of time the virtual CPU spent waiting for the hypervisor to service another virtual CPU. Only applies to virtual machines. Shown as percent.| Multiplied by 100   |
| `system.mem.total`      | `system.memory.usage`     | The total amount of physical RAM in bytes.   | Converted to MB (divided by 2^20) |
| `system.mem.usable`     | `system.memory.usage` <br>Attributes Filter state: `(free, cached, buffered)` | Value of `MemAvailable` from `/proc/meminfo` if present. If not present, falls back to adding `free + buffered + cached memory`. In bytes.    | Converted to MB (divided by 2^20) |
| `system.net.bytes_rcvd` | `system.network.io` <br>Attribute Filter direction: `receive`   | The number of bytes received on a device per second.       |         |
| `system.net.bytes_sent` | `system.network.io` <br>Attribute Filter direction: `transmit`   | The number of bytes sent from a device per second.           |       |
| `system.swap.free`      | `system.paging.usage` <br>Attribute Filter state: `free`    | The amount of free swap space, in bytes      | Converted to MB (divided by 2^20) |
| `system.swap.used`      | `system.paging.usage` <br>Attribute Filter state: `used`     | The amount of swap space in use, in bytes.  | Converted to MB (divided by 2^20) |
| `system.disk.in_use`    | `system.filesystem.utilization`    | The amount of disk space in use as a fraction of the total.      |        |

See [OpenTelemetry Metrics Mapping][2] for more information.


## Full example configuration

For a full working example configuration with the Datadog exporter, see [`host-metrics.yaml`][3].

## Example logging output

```
ResourceMetrics #1
Resource SchemaURL: https://opentelemetry.io/schemas/1.9.0
Resource attributes:
     -> k8s.pod.ip: Str(192.168.63.232)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-07e7d48cedbec9e86)
     -> host.image.id: Str(ami-0cbbb5a8c6f670bb6)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-49-157.ec2.internal)
     -> os.type: Str(linux)
     -> kube_app_instance: Str(opentelemetry-collector-gateway)
     -> k8s.pod.name: Str(opentelemetry-collector-gateway-688585b95-l2lds)
     -> k8s.pod.uid: Str(d8063a97-f48f-4e9e-b180-8c78a56d0a37)
     -> k8s.replicaset.uid: Str(9e2d5331-f763-43a3-b0be-9d89c0eaf0cd)
     -> k8s.replicaset.name: Str(opentelemetry-collector-gateway-688585b95)
     -> k8s.deployment.name: Str(opentelemetry-collector-gateway)
     -> kube_app_name: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-ds-gateway)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:08Z)
     -> k8s.node.name: Str(ip-192-168-49-157.ec2.internal)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/hostmetricsreceiver/memory 0.88.0-dev
Metric #0
Descriptor:
     -> Name: system.memory.usage
     -> Description: Bytes of memory in use.
     -> Unit: By
     -> DataType: Sum
     -> IsMonotonic: false
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> state: Str(used)
StartTimestamp: 2023-08-21 13:45:37 +0000 UTC
Timestamp: 2023-11-20 13:04:19.489045896 +0000 UTC
Value: 1153183744
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[2]: /opentelemetry/guide/metrics_mapping/#host-metrics
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/host-metrics.yaml
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[5]: /opentelemetry/otel_collector_datadog_exporter/
[6]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[7]: https://app.datadoghq.com/infrastructure
[8]: /opentelemetry/collector_exporter/#out-of-the-box-dashboards
[9]: /tracing/trace_explorer/trace_view/?tab=hostinfo
[10]: /universal_service_monitoring/setup/


