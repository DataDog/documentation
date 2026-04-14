---
title: Podman Metrics
further_reading:
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send OpenTelemetry Data to Datadog"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/podman_metrics.png" alt="The 'Containers - Overview' dashboard, showing metrics for CPU and Memory usage." style="width:100%;" >}}

The [Podman receiver][1] collects metrics that populate the [Containers - Overview][5] dashboard. Configure the receiver according to the specifications of the latest version of the `podmanreceiver`.

This dashboard displays metrics from all container runtimes. To view your Podman data, use the **runtime** template variable at the top of the dashboard to select `podman`.

For more information, see the OpenTelemetry project documentation for the [Podman receiver][1].

## Setup

To collect Podman metrics with OpenTelemetry for use with Datadog:

1. Configure the [Podman receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][4].

See the [Podman receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="podman.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: /opentelemetry/setup/collector_exporter/
[5]: https://app.datadoghq.com/dash/integration/30657/containers---overview
