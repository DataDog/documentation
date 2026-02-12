---
title: HAProxy Metrics
further_reading:
- link: "/opentelemetry/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
---

## Overview

{{< img src="/opentelemetry/collector_exporter/haproxy_metrics.png" alt="OpenTelemetry HAProxy metrics in an HAProxy dashboard" style="width:100%;" >}}

The [HAProxy receiver][1] allows for collection of HAProxy metrics and access to the [HAProxy Overview][4] dashboard. Configure the receiver according to the specifications of the latest version of the `haproxyreceiver`.

For more information, see the OpenTelemetry project documentation for the [HAProxy receiver][1].

## Setup

To collect HAProxy metrics with OpenTelemetry for use with Datadog:

1. Configure the [HAProxy receiver][1] in your OpenTelemetry Collector configuration.
2. Ensure the OpenTelemetry Collector is [configured to export to Datadog][5].

See the [HAProxy receiver documentation][1] for detailed configuration options and requirements.

## Data collected

{{< mapping-table resource="haproxy.csv">}}

See [OpenTelemetry Metrics Mapping][2] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver
[2]: /opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/28/haproxy---overview
[5]: /opentelemetry/setup/collector_exporter/
