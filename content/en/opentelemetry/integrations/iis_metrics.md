---
title: IIS Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/iis_metrics.png" alt="OpenTelemetry IIS metrics in an IIS dashboard" style="width:100%;" >}}

The [IIS receiver][1] allows for collection of IIS (Internet Information Services) metrics and access to the [IIS Overview][4] dashboard. Configure the receiver according to the specifications of the latest version of the `iisreceiver`.

For more information, see the OpenTelemetry project documentation for the [IIS receiver][1].

## Setup

To collect IIS metrics with OpenTelemetry for use with Datadog:

1. Configure the [IIS receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][5].

See the [IIS receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="iis.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/screen/integration/243/iis---overview
[5]: /opentelemetry/setup/collector_exporter/
