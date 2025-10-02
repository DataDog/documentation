---
title: IIS Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > IIS Metrics
sourceUrl: https://docs.datadoghq.com/opentelemetry/integrations/iis_metrics/index.html
---

# IIS Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/iis_metrics.d8732538a3b969024afa3b90834abcd4.png?auto=format"
   alt="OpenTelemetry IIS metrics in an IIS dashboard" /%}

The [IIS receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver) allows for collection of IIS (Internet Information Services) metrics and access to the [IIS Overview](https://app.datadoghq.com/screen/integration/243/iis---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `iisreceiver`.

For more information, see the OpenTelemetry project documentation for the [IIS receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver).

## Setup{% #setup %}

To collect IIS metrics with OpenTelemetry for use with Datadog:

1. Configure the [IIS receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

See the [IIS receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/iisreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

| OTEL                     | DATADOG                          | DESCRIPTION                                    | FILTER                  |
| ------------------------ | -------------------------------- | ---------------------------------------------- | ----------------------- |
| iis.connection.active    | iis.net.num_connections          | Number of active connections.                  |
| iis.connection.anonymous | iis.users.anon                   | Number of connections established anonymously. |
| iis.network.file.count   | iis.net.files_rcvd               | Number of transmitted files.                   | `direction`: `received` |
| iis.network.file.count   | iis.net.files_sent               | Number of transmitted files.                   | `direction`: `sent`     |
| iis.network.io           | iis.net.bytes_rcvd               | Total amount of bytes sent and received.       | `direction`: `received` |
| iis.network.io           | iis.net.bytes_sent               | Total amount of bytes sent and received.       | `direction`: `sent`     |
| iis.request.count        | iis.httpd_request_method.delete  | Total number of requests of a given type.      | `request`: `delete`     |
| iis.request.count        | iis.httpd_request_method.get     | Total number of requests of a given type.      | `request`: `get`        |
| iis.request.count        | iis.httpd_request_method.head    | Total number of requests of a given type.      | `request`: `head`       |
| iis.request.count        | iis.httpd_request_method.options | Total number of requests of a given type.      | `request`: `options`    |
| iis.request.count        | iis.httpd_request_method.post    | Total number of requests of a given type.      | `request`: `post`       |
| iis.request.count        | iis.httpd_request_method.put     | Total number of requests of a given type.      | `request`: `put`        |
| iis.request.count        | iis.httpd_request_method.trace   | Total number of requests of a given type.      | `request`: `trace`      |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/)
