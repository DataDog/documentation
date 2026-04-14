---
title: Integrations
further_reading:
- link: "/opentelemetry/schema_semantics/metrics_mapping/"
  tag: "Documentation"
  text: "OpenTelemetry Metrics Mapping"
---

This page covers Datadog-supported OpenTelemetry (OTel) integrations. These integrations allow you to collect and monitor your observability data using OpenTelemetry in Datadog.

## Overview

OpenTelemetry (OTel) integrations are components that enable the collection of observability data (metrics, traces, and logs) from various sources using the OpenTelemetry standard. These integrations are designed to work with the OpenTelemetry Collector, which receives, processes, and exports telemetry data to observability backends like Datadog.

For a comprehensive list of all OpenTelemetry integrations, see the [OpenTelemetry Registry][1]. This registry provides information on receivers, exporters, and other components in the OpenTelemetry ecosystem.

## Metric pricing

Datadog collects metrics from supported OpenTelemetry receivers at no extra cost. These no-cost metrics are:
- Defined in the `metadata.yaml` file for each receiver.
- Listed in the [Metrics Mappings][14] table.

For example, the [`dockerstatsreceiver`][15] `metadata.yaml` file lists metrics that you can collect at no extra cost.

<div class="alert alert-danger">Ensure that you configure receivers according to OpenTelemetry receiver documentation. Incorrectly configured receivers may cause metrics to be classified as custom, resulting in additional charges.</div>

## Datadog-supported OpenTelemetry integrations

Datadog supports the following OpenTelemetry integrations:

### APM (Application Performance Monitoring)

Monitor and optimize your application's performance:

- [Trace Metrics][2] - Generate APM stats such as hits, errors, and duration
- [Runtime Metrics][3] - Collect runtime metrics for Java, .NET, and Go applications

### Collector

Monitor the health and performance of your OpenTelemetry Collector:

- [Collector Health Metrics][4] - Track the performance of your OpenTelemetry Collector
- [Datadog Extension][17] - View Collector configuration and build information in Datadog Infrastructure Monitoring

### Containers and hosts

Gain insights into your containerized environments and host systems:

- [Docker Metrics][5] - Monitor Docker container performance
- [Host Metrics][6] - Track system metrics such as CPU, disk, and memory usage
- [Kubernetes Metrics][18] - Monitor Kubernetes cluster health and performance
- [Podman Metrics][16] - Monitor Podman container performance

### Web servers and proxies

Monitor web servers and proxy technologies:

- [Apache Web Server Metrics][7] - Collect metrics from Apache HTTP Server
- [NGINX Metrics][8] - Monitor NGINX web server performance
- [IIS Metrics][9] - Track Internet Information Services (IIS) metrics
- [HAProxy Metrics][10] - Monitor HAProxy load balancer performance

### Databases and messaging

Monitor database and messaging systems:

- [MySQL Metrics][11] - Track MySQL database performance
- [Kafka Metrics][12] - Monitor Apache Kafka messaging platform

### Big data and processing

Monitor big data processing frameworks:

- [Apache Spark Metrics][13] - Track Apache Spark performance metrics

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /opentelemetry/integrations/trace_metrics
[3]: /opentelemetry/integrations/runtime_metrics/
[4]: /opentelemetry/integrations/collector_health_metrics/
[5]: /opentelemetry/integrations/docker_metrics/
[6]: /opentelemetry/integrations/host_metrics/
[7]: /opentelemetry/integrations/apache_metrics/
[8]: /opentelemetry/integrations/nginx_metrics/
[9]: /opentelemetry/integrations/iis_metrics/
[10]: /opentelemetry/integrations/haproxy_metrics/
[11]: /opentelemetry/integrations/mysql_metrics/
[12]: /opentelemetry/integrations/kafka_metrics/
[13]: /opentelemetry/integrations/spark_metrics/
[14]: /opentelemetry/mapping/metrics_mapping/#metrics-mappings
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/metadata.yaml
[16]: /opentelemetry/integrations/podman_metrics/
[17]: /opentelemetry/integrations/datadog_extension/
[18]: /opentelemetry/integrations/kubernetes_metrics/

