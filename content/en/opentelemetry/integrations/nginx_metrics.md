---
title: NGINX Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/nginx_metrics.png" alt="OpenTelemetry NGINX metrics in a NGINX dashboard" style="width:100%;" >}}

The [NGINX receiver][1] allows for collection of NGINX metrics and access to the [NGINX Overview][4] dashboard. Configure the receiver according to the specifications of the latest version of the `nginxreceiver`.

For more information, see the OpenTelemetry project documentation for the [NGINX receiver][1].

## Setup

To collect NGINX metrics with OpenTelemetry for use with Datadog:

1. Configure the [NGINX receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][5].

See the [NGINX receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="nginx.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/21/nginx---overview
[5]: /opentelemetry/setup/collector_exporter/
