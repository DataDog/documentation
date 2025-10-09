---
title: HAProxy Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > HAProxy Metrics
---

# HAProxy Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/haproxy_metrics.25ddb1705d2eb0ad0d935071577d3cf4.png?auto=format"
   alt="OpenTelemetry HAProxy metrics in an HAProxy dashboard" /%}

The [HAProxy receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver) allows for collection of HAProxy metrics and access to the [HAProxy Overview](https://app.datadoghq.com/dash/integration/28/haproxy---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `haproxyreceiver`.

For more information, see the OpenTelemetry project documentation for the [HAProxy receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver).

## Setup{% #setup %}

To collect HAProxy metrics with OpenTelemetry for use with Datadog:

1. Configure the [HAProxy receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](http://localhost:1313/opentelemetry/setup/collector_exporter/).

See the [HAProxy receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](http://localhost:1313/opentelemetry/collector_exporter/)
