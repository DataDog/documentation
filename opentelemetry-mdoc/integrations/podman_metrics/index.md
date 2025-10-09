---
title: Podman Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Podman Metrics
---

# Podman Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/podman_metrics.5f82e3ff16828462daa54f058b200ad7.png?auto=format"
   alt="The 'Containers - Overview' dashboard, showing metrics for CPU and Memory usage." /%}

The [Podman receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver) collects metrics that populate the [Containers - Overview](https://app.datadoghq.com/dash/integration/30657/containers---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `podmanreceiver`.

This dashboard displays metrics from all container runtimes. To view your Podman data, use the **runtime** template variable at the top of the dashboard to select `podman`.

For more information, see the OpenTelemetry project documentation for the [Podman receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver).

## Setup{% #setup %}

To collect Podman metrics with OpenTelemetry for use with Datadog:

1. Configure the [Podman receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](http://localhost:1313/opentelemetry/setup/collector_exporter/).

See the [Podman receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Send OpenTelemetry Data to Datadog](http://localhost:1313/opentelemetry/setup/)
