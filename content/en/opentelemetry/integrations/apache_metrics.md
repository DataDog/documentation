---
title: Apache Web Server Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/apache_metrics.png" alt="OpenTelemetry Apache metrics in an Apache dashboard" style="width:100%;" >}}

The [Apache receiver][1] allows for collection of Apache Web Server metrics. Configure the receiver according to the specifications of the latest version of the `apachereceiver`.

For more information, see the OpenTelemetry project documentation for the [Apache receiver][1].

## Setup

To collect Apache Web Server metrics with OpenTelemetry for use with Datadog:

1. Configure the [Apache receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][4].

See the [Apache receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="apache.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: /opentelemetry/setup/collector_exporter/
