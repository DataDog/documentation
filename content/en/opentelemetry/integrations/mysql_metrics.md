---
title: MySQL Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/mysql_metrics.png" alt="OpenTelemetry MySQL metrics in a MySQL dashboard" style="width:100%;" >}}

The [MySQL receiver][1] allows for collection of MySQL metrics and access to the out of the box MySQL Dashboard, [MySQL Overview][4]. Please configure the receiver according to the specifications of the latest version of the `mysqlreceiver`.

For more information, see the OpenTelemetry project documentation for the [MySQL receiver][1].

## Setup

To collect MySQL metrics with OpenTelemetry for use with Datadog:

1. Configure the [MySQL receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][5].

Refer to the [MySQL receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="mysql.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/12/mysql---overview
[5]: /opentelemetry/setup/collector_exporter/
