---
title: Apache Web Server Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Apache Web Server Metrics
---

# Apache Web Server Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/apache_metrics.db7ea9fb7871a15a917bababd06bcd18.png?auto=format"
   alt="OpenTelemetry Apache metrics in an Apache dashboard" /%}

The [Apache receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver) allows for collection of Apache Web Server metrics. Configure the receiver according to the specifications of the latest version of the `apachereceiver`.

For more information, see the OpenTelemetry project documentation for the [Apache receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver).

## Setup{% #setup %}

To collect Apache Web Server metrics with OpenTelemetry for use with Datadog:

1. Configure the [Apache receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](http://localhost:1313/opentelemetry/setup/collector_exporter/).

See the [Apache receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](http://localhost:1313/opentelemetry/collector_exporter/)
