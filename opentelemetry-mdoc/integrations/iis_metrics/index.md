---
title: IIS Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > IIS Metrics
---

# IIS Metrics

## Overview{% #overview %}

{% image
   source="http://localhost:1313/images/opentelemetry/collector_exporter/iis_metrics.d8732538a3b969024afa3b90834abcd4.png?auto=format"
   alt="OpenTelemetry IIS metrics in an IIS dashboard" /%}

The [IIS receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver) allows for collection of IIS (Internet Information Services) metrics and access to the [IIS Overview](https://app.datadoghq.com/screen/integration/243/iis---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `iisreceiver`.

For more information, see the OpenTelemetry project documentation for the [IIS receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver).

## Setup{% #setup %}

To collect IIS metrics with OpenTelemetry for use with Datadog:

1. Configure the [IIS receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](http://localhost:1313/opentelemetry/setup/collector_exporter/).

See the [IIS receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

See [OpenTelemetry Metrics Mapping](http://localhost:1313/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](http://localhost:1313/opentelemetry/collector_exporter/)
