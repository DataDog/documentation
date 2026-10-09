---
title: Apache Spark Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/spark_metrics.png" alt="OpenTelemetry Apache Spark metrics in a Spark dashboard" style="width:100%;" >}}

The [Apache Spark receiver][1] collects Apache Spark metrics that populate the [Spark Overview][4] dashboard.

For more information, see the OpenTelemetry project documentation for the [Apache Spark receiver][1].

## Setup

This example uses component identifiers from OpenTelemetry Collector Contrib v0.154.0. For other versions or distributions, use the identifiers that distribution supports. Earlier versions name this receiver `apachespark`.

The Apache Spark receiver reads the REST API that a running Spark application serves on its web UI port.

Add the following lines to your Collector configuration, and set `endpoint` to the address of your Spark application's web UI:

```yaml
receivers:
  apache_spark:
    endpoint: http://localhost:4040
```

Add `apache_spark` to the `receivers` list of the metrics pipeline in your configuration. Keep the processors already in that pipeline. The Datadog OTLP metrics intake accepts only delta metrics, and this receiver produces cumulative sums, so the pipeline needs `cumulativetodelta`. The [recommended Collector setup][3] includes it.

For all configuration options, see the [Apache Spark receiver documentation][1].

## Data collected

{{< mapping-table resource="apachespark.csv">}}

For the full mapping between OpenTelemetry and Datadog metric names, see [OpenTelemetry Metrics Mapping][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[3]: /opentelemetry/setup/collector_exporter/
[4]: https://app.datadoghq.com/screen/integration/95/spark---overview