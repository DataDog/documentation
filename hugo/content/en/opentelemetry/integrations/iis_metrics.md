---
title: IIS Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/iis_metrics.png" alt="OpenTelemetry IIS metrics in an IIS dashboard" style="width:100%;" >}}

The [IIS receiver][1] collects IIS (Internet Information Services) metrics that populate the [IIS Overview][4] dashboard.

For more information, see the OpenTelemetry project documentation for the [IIS receiver][1].

## Setup

This example uses component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports.

The IIS receiver reads Windows performance counters, so it runs only on Windows. Run the Collector on the IIS host.

The receiver has no required settings. Add the following lines to your Collector configuration:

```yaml
receivers:
  iis:
```

Add `iis` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline. The Datadog OTLP metrics intake accepts only delta metrics, and this receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][5] includes it.

For all configuration options, see the [IIS receiver documentation][1].

## Data collected

{{< mapping-table resource="iis.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/screen/integration/243/iis---overview
[5]: /opentelemetry/setup/collector_exporter/
