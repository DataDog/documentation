---
title: Apache Web Server Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/apache_metrics.png" alt="OpenTelemetry Apache metrics in an Apache dashboard" style="width:100%;" >}}

The [Apache receiver][1] collects Apache Web Server metrics.

For more information, see the OpenTelemetry project documentation for the [Apache receiver][1].

## Setup

This example uses component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports.

The Apache receiver reads your server's `server-status?auto` page. Before you start, [enable `mod_status`][5] on your Apache server.

Add the following lines to your Collector configuration, and set `endpoint` to the address of your status page:

```yaml
receivers:
  apache:
    endpoint: http://localhost:8080/server-status?auto
```

Add `apache` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline. The Datadog OTLP metrics intake accepts only delta metrics, and this receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][4] includes it.

For all configuration options, see the [Apache receiver documentation][1].

## Data collected

{{< mapping-table resource="apache.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: /opentelemetry/setup/collector_exporter/
[5]: https://httpd.apache.org/docs/2.4/mod/mod_status.html
