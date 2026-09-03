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

<div class="alert alert-danger">The host metrics receiver is only required for the standalone OpenTelemetry Collector. If you are using the <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a>, the Datadog Agent already collects host metrics.</div>

To collect system metrics such as CPU, disk, and memory usage, enable the [host metrics receiver][1] in your Collector. 

For more information, including supported operating systems, see the OpenTelemetry project documentation for the [host metrics receiver][1].


## Setup

These examples use component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports.

{{< tabs >}}
{{% tab "Host" %}}

Add the following lines to your Collector configuration:

```yaml
processors:
  resource_detection:
    detectors: [system]
    system:
      hostname_sources: [os]

receivers:
  host_metrics:
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
  host_metrics:
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

Add `host_metrics` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline: the Datadog OTLP metrics intake accepts delta metrics only, and the host metrics receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][5] includes it.


## Data collected

Host metrics are collected by the [host metrics receiver][4]. For information about setting up the receiver, see [Set Up the OpenTelemetry Collector][5].

The metrics, mapped to Datadog metrics, are used in the following views:
- [Infrastructure Host Map][6]
- [Infrastructure List][7]
- [Host default dashboards][8]
- [APM Trace view Host info][9]

**Note**: To correlate trace and host metrics, configure [Unified Service Tagging attributes][10] for each service, and set the `host.name` resource attribute to the corresponding underlying host for both service and collector instances. 

The following table lists the OpenTelemetry host metrics collected for Datadog's out-of-the-box in-app experiences.

{{< mapping-table resource="host.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].


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
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[5]: /opentelemetry/setup/collector_exporter/
[6]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[7]: https://app.datadoghq.com/infrastructure
[8]: /opentelemetry/reference/otel_metrics/#out-of-the-box-dashboards
[9]: /tracing/trace_explorer/trace_view/?tab=hostinfo
[10]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
