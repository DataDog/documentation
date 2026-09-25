---
title: HAProxy Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/haproxy_metrics.png" alt="OpenTelemetry HAProxy metrics in an HAProxy dashboard" style="width:100%;" >}}

The [HAProxy receiver][1] collects HAProxy metrics that populate the [HAProxy Overview][4] dashboard.

For more information, see the OpenTelemetry project documentation for the [HAProxy receiver][1].

## Setup

This example uses component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports.

Add the following lines to your Collector configuration. The receiver has no default endpoint, so set `endpoint` to the URL of your HAProxy stats page or the path to its stats socket, such as `file:///var/run/haproxy.ipc`:

```yaml
receivers:
  haproxy:
    endpoint: http://127.0.0.1:8080/stats
```

Add `haproxy` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline. The Datadog OTLP metrics intake accepts only delta metrics, and this receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][5] includes it.

For all configuration options, see the [HAProxy receiver documentation][1].

## Data collected

{{< mapping-table resource="haproxy.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/28/haproxy---overview
[5]: /opentelemetry/setup/collector_exporter/
