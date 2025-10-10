---
title: Podman Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Podman Metrics
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/integrations/podman_metrics/index.html
---

# Podman Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/podman_metrics.5f82e3ff16828462daa54f058b200ad7.png?auto=format"
   alt="The 'Containers - Overview' dashboard, showing metrics for CPU and Memory usage." /%}

The [Podman receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver) collects metrics that populate the [Containers - Overview](https://app.datadoghq.com/dash/integration/30657/containers---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `podmanreceiver`.

This dashboard displays metrics from all container runtimes. To view your Podman data, use the **runtime** template variable at the top of the dashboard to select `podman`.

For more information, see the OpenTelemetry project documentation for the [Podman receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver).

## Setup{% #setup %}

To collect Podman metrics with OpenTelemetry for use with Datadog:

1. Configure the [Podman receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

See the [Podman receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

| OTEL                                               | DATADOG                     | DESCRIPTION                                                |
| -------------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| container.blockio.io_service_bytes_recursive.read  | container.io.read           | Number of bytes transferred from the disk by the container |
| container.blockio.io_service_bytes_recursive.write | container.io.write          | Number of bytes transferred to the disk by the container   |
| container.cpu.usage.system                         | container.cpu.system        | System CPU usage.                                          |
| container.cpu.usage.total                          | container.cpu.usage         | Total CPU time consumed.                                   |
| container.memory.usage.limit                       | container.memory.soft_limit | Memory limit of the container.                             |
| container.memory.usage.total                       | container.memory.usage      | Memory usage of the container.                             |
| container.network.io.usage.rx_bytes                | container.net.rcvd          | Bytes received by the container.                           |
| container.network.io.usage.tx_bytes                | container.net.sent          | Bytes sent by the container.                               |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Send OpenTelemetry Data to Datadog](https://docs.datadoghq.com/opentelemetry/setup/)
