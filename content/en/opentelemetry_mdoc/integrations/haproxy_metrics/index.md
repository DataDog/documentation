---
title: HAProxy Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > HAProxy Metrics
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/integrations/haproxy_metrics/index.html
---

# HAProxy Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/haproxy_metrics.25ddb1705d2eb0ad0d935071577d3cf4.png?auto=format"
   alt="OpenTelemetry HAProxy metrics in an HAProxy dashboard" /%}

The [HAProxy receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver) allows for collection of HAProxy metrics and access to the [HAProxy Overview](https://app.datadoghq.com/dash/integration/28/haproxy---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `haproxyreceiver`.

For more information, see the OpenTelemetry project documentation for the [HAProxy receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver).

## Setup{% #setup %}

To collect HAProxy metrics with OpenTelemetry for use with Datadog:

1. Configure the [HAProxy receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

See the [HAProxy receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

| OTEL                          | DATADOG                                        | DESCRIPTION                                                                                                                                                      | FILTER                             |
| ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| haproxy.bytes.input           | haproxy.backend.bytes.in.count                 | Bytes in. Corresponds to HAProxy's `bin` metric.                                                                                                                 | `haproxy.service_name`: `BACKEND`  |
| haproxy.bytes.input           | haproxy.frontend.bytes.in.count                | Bytes in. Corresponds to HAProxy's `bin` metric.                                                                                                                 | `haproxy.service_name`: `FRONTEND` |
| haproxy.bytes.output          | haproxy.backend.bytes.out.count                | Bytes out. Corresponds to HAProxy's `bout` metric.                                                                                                               | `haproxy.service_name`: `BACKEND`  |
| haproxy.bytes.output          | haproxy.frontend.bytes.out.count               | Bytes out. Corresponds to HAProxy's `bout` metric.                                                                                                               | `haproxy.service_name`: `FRONTEND` |
| haproxy.clients.canceled      | haproxy.backend.client.aborts.count            | Number of data transfers aborted by the client. Corresponds to HAProxy's `cli_abrt` metric                                                                       |
| haproxy.compression.bypass    | haproxy.backend.http.comp.bytes.bypassed.count | Number of bytes that bypassed the HTTP compressor (CPU/BW limit). Corresponds to HAProxy's `comp_byp` metric.                                                    |
| haproxy.compression.count     | haproxy.backend.http.comp.responses.count      | Number of HTTP responses that were compressed. Corresponds to HAProxy's `comp_rsp` metric.                                                                       |
| haproxy.compression.input     | haproxy.backend.http.comp.bytes.in.count       | Number of HTTP response bytes fed to the compressor. Corresponds to HAProxy's `comp_in` metric.                                                                  |
| haproxy.compression.output    | haproxy.backend.http.comp.bytes.out.count      | Number of HTTP response bytes emitted by the compressor. Corresponds to HAProxy's `comp_out` metric.                                                             |
| haproxy.connections.total     | haproxy.frontend.connections.count             | Cumulative number of connections (frontend). Corresponds to HAProxy's `conn_tot` metric.                                                                         |
| haproxy.failed_checks         | haproxy.server.check.failures.count            | Number of failed checks. (Only counts checks failed when the server is up). Corresponds to HAProxy's `chkfail` metric.                                           |
| haproxy.requests.denied       | haproxy.backend.requests.denied.count          | Requests denied because of security concerns. Corresponds to HAProxy's `dreq` metric                                                                             | `haproxy.service_name`: `BACKEND`  |
| haproxy.requests.denied       | haproxy.frontend.requests.denied.count         | Requests denied because of security concerns. Corresponds to HAProxy's `dreq` metric                                                                             | `haproxy.service_name`: `FRONTEND` |
| haproxy.requests.errors       | haproxy.frontend.request.errors.count          | Cumulative number of request errors. Corresponds to HAProxy's `ereq` metric.                                                                                     | `haproxy.service_name`: `FRONTEND` |
| haproxy.requests.total        | haproxy.backend.http.requests.count            | Total number of HTTP requests received. Corresponds to HAProxy's `req_tot`, `hrsp_1xx`, `hrsp_2xx`, `hrsp_3xx`, `hrsp_4xx`, `hrsp_5xx` and `hrsp_other` metrics. | `haproxy.service_name`: `BACKEND`  |
| haproxy.requests.total        | haproxy.frontend.http.requests.count           | Total number of HTTP requests received. Corresponds to HAProxy's `req_tot`, `hrsp_1xx`, `hrsp_2xx`, `hrsp_3xx`, `hrsp_4xx`, `hrsp_5xx` and `hrsp_other` metrics. | `haproxy.service_name`: `FRONTEND` |
| haproxy.responses.denied      | haproxy.frontend.responses.denied.count        | Responses denied because of security concerns. Corresponds to HAProxy's `dresp` metric                                                                           | `haproxy.service_name`: `FRONTEND` |
| haproxy.responses.denied      | haproxy.backend.responses.denied.count         | Responses denied because of security concerns. Corresponds to HAProxy's `dresp` metric                                                                           | `haproxy.service_name`: `BACKEND`  |
| haproxy.responses.errors      | haproxy.backend.response.errors.count          | Cumulative number of response errors. Corresponds to HAProxy's `eresp` metric, `srv_abrt` will be counted here also.                                             | `haproxy.service_name`: `BACKEND`  |
| haproxy.server_selected.total | haproxy.server.loadbalanced.count              | Number of times a server was selected, either for new sessions or when re-dispatching. Corresponds to HAProxy's `lbtot` metric.                                  |
| haproxy.sessions.count        | haproxy.server.sessions.count                  | Current sessions. Corresponds to HAProxy's `scur` metric.                                                                                                        |
| haproxy.sessions.total        | haproxy.frontend.sessions.count                | Cumulative number of sessions. Corresponds to HAProxy's `stot` metric.                                                                                           | `haproxy.service_name`: `FRONTEND` |
| haproxy.sessions.total        | haproxy.backend.sessions.count                 | Cumulative number of sessions. Corresponds to HAProxy's `stot` metric.                                                                                           | `haproxy.service_name`: `BACKEND`  |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/)
