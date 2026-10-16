---
title: Podman Metrics
further_reading:
- link: "/opentelemetry/setup/"
  tag: "Documentation"
  text: "Send OpenTelemetry Data to Datadog"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/podman_metrics.png" alt="The 'Containers - Overview' dashboard, showing metrics for CPU and Memory usage." style="width:100%;" >}}

The [Podman receiver][1] collects metrics that populate the [Containers - Overview][5] dashboard.

This dashboard displays metrics from all container runtimes. To view your Podman data, use the {{< ui >}}runtime{{< /ui >}} template variable at the top of the dashboard to select `podman`.

For more information, see the OpenTelemetry project documentation for the [Podman receiver][1].

## Setup

This example uses component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports.

Add the following lines to your Collector configuration:

```yaml
receivers:
  podman_stats:
    endpoint: unix:///run/podman/podman.sock
```

This endpoint is the socket for rootful Podman. Podman runs rootless by default. For rootless Podman, set `endpoint` to `unix:///run/user/<UID>/podman/podman.sock`, and replace `<UID>` with the ID of the user that runs Podman.

Add `podman_stats` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline. The Datadog OTLP metrics intake accepts only delta metrics, and this receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][4] includes it.

For all configuration options, see the [Podman receiver documentation][1].

## Data collected

{{< mapping-table resource="podman.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/podmanreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: /opentelemetry/setup/collector_exporter/
[5]: https://app.datadoghq.com/dash/integration/30657/containers---overview
