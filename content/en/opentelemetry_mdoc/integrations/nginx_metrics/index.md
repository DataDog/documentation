---
title: NGINX Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > NGINX Metrics
sourceUrl: https://docs.datadoghq.com/opentelemetry/integrations/nginx_metrics/index.html
---

# NGINX Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/nginx_metrics.e1b54fb86a275e25a45e1ad7d912282c.png?auto=format"
   alt="OpenTelemetry NGINX metrics in a NGINX dashboard" /%}

The [NGINX receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver) allows for collection of NGINX metrics and access to the [NGINX Overview](https://app.datadoghq.com/dash/integration/21/nginx---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `nginxreceiver`.

For more information, see the OpenTelemetry project documentation for the [NGINX receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver).

## Setup{% #setup %}

To collect NGINX metrics with OpenTelemetry for use with Datadog:

1. Configure the [NGINX receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

See the [NGINX receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

| OTEL                       | DATADOG                          | DESCRIPTION                                                  | FILTER             |
| -------------------------- | -------------------------------- | ------------------------------------------------------------ | ------------------ |
| nginx.connections_accepted | nginx.connections.accepted_count | The total number of accepted client connections              |
| nginx.connections_current  | nginx.connections.idle           | The current number of nginx connections by state             | `state`: `waiting` |
| nginx.connections_current  | nginx.net.connections            | The current number of nginx connections by state             | `state`: `active`  |
| nginx.connections_current  | nginx.net.waiting                | The current number of nginx connections by state             | `state`: `waiting` |
| nginx.requests             | nginx.requests.total_count       | Total number of requests made to the server since it started |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/)
