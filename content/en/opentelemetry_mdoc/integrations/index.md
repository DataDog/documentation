---
title: Integrations
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations
sourceUrl: https://docs.datadoghq.com/opentelemetry/integrations/index.html
---

# Integrations

This page covers Datadog-supported OpenTelemetry (OTel) integrations. These integrations allow you to collect and monitor your observability data using OpenTelemetry in Datadog.

## Overview{% #overview %}

OpenTelemetry (OTel) integrations are components that enable the collection of observability data (metrics, traces, and logs) from various sources using the OpenTelemetry standard. These integrations are designed to work with the OpenTelemetry Collector, which receives, processes, and exports telemetry data to observability backends like Datadog.

For a comprehensive list of all OpenTelemetry integrations, see the [OpenTelemetry Registry](https://opentelemetry.io/ecosystem/registry/). This registry provides information on receivers, exporters, and other components in the OpenTelemetry ecosystem.

## Metric pricing{% #metric-pricing %}

Datadog collects metrics from supported OpenTelemetry receivers at no extra cost. These no-cost metrics are:

- Defined in the `metadata.yaml` file for each receiver.
- Listed in the [Metrics Mappings](https://docs.datadoghq.com/opentelemetry/mapping/metrics_mapping/#metrics-mappings) table.

For example, the [`dockerstatsreceiver`](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/metadata.yaml) `metadata.yaml` file lists metrics that you can collect at no extra cost.

{% alert level="warning" %}
Ensure that you configure receivers according to OpenTelemetry receiver documentation. Incorrectly configured receivers may cause metrics to be classified as custom, resulting in additional charges.
{% /alert %}

## Datadog-supported OpenTelemetry integrations{% #datadog-supported-opentelemetry-integrations %}

Datadog supports the following OpenTelemetry integrations:

### APM (Application Performance Monitoring){% #apm-application-performance-monitoring %}

Monitor and optimize your application's performance:

- [Trace Metrics](https://docs.datadoghq.com/opentelemetry/integrations/trace_metrics) - Generate APM stats such as hits, errors, and duration
- [Runtime Metrics](https://docs.datadoghq.com/opentelemetry/integrations/runtime_metrics/) - Collect runtime metrics for Java, .NET, and Go applications

### Collector{% #collector %}

Monitor the health and performance of your OpenTelemetry Collector:

- [Collector Health Metrics](https://docs.datadoghq.com/opentelemetry/integrations/collector_health_metrics/) - Track the performance of your OpenTelemetry Collector
- [Datadog Extension](https://docs.datadoghq.com/opentelemetry/integrations/datadog_extension/) - View Collector configuration and build information in Datadog Infrastructure Monitoring

### Containers and hosts{% #containers-and-hosts %}

Gain insights into your containerized environments and host systems:

- [Docker Metrics](https://docs.datadoghq.com/opentelemetry/integrations/docker_metrics/) - Monitor Docker container performance
- [Host Metrics](https://docs.datadoghq.com/opentelemetry/integrations/host_metrics/) - Track system metrics such as CPU, disk, and memory usage
- [Kubernetes Metrics](https://docs.datadoghq.com/opentelemetry/integrations/kubernetes_metrics/) - Monitor Kubernetes cluster health and performance
- [Podman Metrics](https://docs.datadoghq.com/opentelemetry/integrations/podman_metrics/) - Monitor Podman container performance

### Web servers and proxies{% #web-servers-and-proxies %}

Monitor web servers and proxy technologies:

- [Apache Web Server Metrics](https://docs.datadoghq.com/opentelemetry/integrations/apache_metrics/) - Collect metrics from Apache HTTP Server
- [NGINX Metrics](https://docs.datadoghq.com/opentelemetry/integrations/nginx_metrics/) - Monitor NGINX web server performance
- [IIS Metrics](https://docs.datadoghq.com/opentelemetry/integrations/iis_metrics/) - Track Internet Information Services (IIS) metrics
- [HAProxy Metrics](https://docs.datadoghq.com/opentelemetry/integrations/haproxy_metrics/) - Monitor HAProxy load balancer performance

### Databases and messaging{% #databases-and-messaging %}

Monitor database and messaging systems:

- [MySQL Metrics](https://docs.datadoghq.com/opentelemetry/integrations/mysql_metrics/) - Track MySQL database performance
- [Kafka Metrics](https://docs.datadoghq.com/opentelemetry/integrations/kafka_metrics/) - Monitor Apache Kafka messaging platform

### Big data and processing{% #big-data-and-processing %}

Monitor big data processing frameworks:

- [Apache Spark Metrics](https://docs.datadoghq.com/opentelemetry/integrations/spark_metrics/) - Track Apache Spark performance metrics

## Further reading{% #further-reading %}

- [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/schema_semantics/metrics_mapping/)
