---
title: Apache Spark Metrics
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/spark_metrics.png" alt="OpenTelemetry Apache Spark metrics in a Spark dashboard" style="width:100%;" >}}

The [Apache Spark receiver][1] allows for collection of Apache Spark metrics and access to the [Spark Overview][4] dashboard. Configure the receiver according to the specifications of the latest version of the `apachesparkreceiver`.

For more information, see the OpenTelemetry project documentation for the [Apache Spark receiver][1].

## Setup

To collect Apache Spark metrics with OpenTelemetry for use with Datadog:

1. Configure the [Apache Spark receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][3].

See the [Apache Spark receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="apachespark.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[3]: /opentelemetry/setup/collector_exporter/
[4]: https://app.datadoghq.com/screen/integration/95/spark---overview