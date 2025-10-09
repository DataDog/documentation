---
title: Host Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Host Metrics
---

# Host Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/host_metrics.5bdacef6580156ca03c655b79b88c340.png?auto=format"
   alt="OpenTelemetry host metrics dashboard" /%}

To collect system metrics such as CPU, disk, and memory usage, enable the [host metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md) in your Collector.

For more information, including supported operating systems, see the OpenTelemetry project documentation for the [host metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md).

## Setup{% #setup %}

{% tab title="Host" %}
Add the following lines to your Collector configuration:

```yaml
processors:
  resourcedetection:
    detectors: [system]
    system:
      hostname_sources: [os]

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

service:
  pipelines:
    metrics:
      receivers: [hostmetrics]
      processors: [resourcedetection]
      exporters: [datadog]
```

{% /tab %}

{% tab title="Kubernetes" %}
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

{% /tab %}

## Data collected{% #data-collected %}

Host Metrics are collected by the [host metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver). For information about setting up the receiver, see [OpenTelemetry Collector Datadog Exporter](http://localhost:1313/opentelemetry/otel_collector_datadog_exporter/).

The metrics, mapped to Datadog metrics, are used in the following views:

- [Infrastructure Host Map](https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone)
- [Infrastructure List](https://app.datadoghq.com/infrastructure)
- [Host default dashboards](http://localhost:1313/opentelemetry/collector_exporter/#out-of-the-box-dashboards)
- [APM Trace view Host info](http://localhost:1313/tracing/trace_explorer/trace_view/?tab=hostinfo)

**Note**: To correlate trace and host metrics, configure [Unified Service Tagging attributes](http://localhost:1313/opentelemetry/correlate/#prerequisite-unified-service-tagging) for each service, and set the `host.name` resource attribute to the corresponding underlying host for both service and collector instances.

The following table shows which Datadog host metric names are associated with corresponding OpenTelemetry host metric names, and, if applicable, what math is applied to the OTel host metric to transform it to Datadog units during the mapping.

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/#host-metrics) for more information.

## Full example configuration{% #full-example-configuration %}

For a full working example configuration with the Datadog exporter, see [`host-metrics.yaml`](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/host-metrics.yaml).

## Example logging output{% #example-logging-output %}

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
