---
title: Apache Spark Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Apache Spark Metrics
---

# Apache Spark Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/spark_metrics.530d0f8550d8342ab5cb0073967ff151.png?auto=format"
   alt="OpenTelemetry Apache Spark metrics in a Spark dashboard" /%}

The [Apache Spark receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver) allows for collection of Apache Spark metrics and access to the [Spark Overview](https://app.datadoghq.com/screen/integration/95/spark---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `apachesparkreceiver`.

For more information, see the OpenTelemetry project documentation for the [Apache Spark receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver).

## Setup{% #setup %}

To collect Apache Spark metrics with OpenTelemetry for use with Datadog:

1. Configure the [Apache Spark receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](http://localhost:1313/opentelemetry/setup/collector_exporter/).

See the [Apache Spark receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](http://localhost:1313/opentelemetry/setup/collector_exporter/)
