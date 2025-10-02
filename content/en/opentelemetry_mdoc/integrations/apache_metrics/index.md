---
title: Apache Web Server Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Apache Web Server Metrics
sourceUrl: >-
  https://docs.datadoghq.com/opentelemetry/integrations/apache_metrics/index.html
---

# Apache Web Server Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/apache_metrics.db7ea9fb7871a15a917bababd06bcd18.png?auto=format"
   alt="OpenTelemetry Apache metrics in an Apache dashboard" /%}

The [Apache receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver) allows for collection of Apache Web Server metrics. Configure the receiver according to the specifications of the latest version of the `apachereceiver`.

For more information, see the OpenTelemetry project documentation for the [Apache receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver).

## Setup{% #setup %}

To collect Apache Web Server metrics with OpenTelemetry for use with Datadog:

1. Configure the [Apache receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

See the [Apache receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

| OTEL                       | DATADOG                                  | DESCRIPTION                                                             | FILTER                  |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- | ----------------------- |
| apache.cpu.load            | apache.performance.cpu_load              | Current load of the CPU.                                                |
| apache.current_connections | apache.conns_total                       | The number of active connections currently attached to the HTTP server. |
| apache.requests            | apache.net.request_per_s                 | The number of requests serviced by the HTTP server per second.          |
| apache.scoreboard          | apache.scoreboard.sending_reply          | The number of workers in each state.                                    | `state`: `sending`      |
| apache.scoreboard          | apache.scoreboard.reading_request        | The number of workers in each state.                                    | `state`: `reading`      |
| apache.scoreboard          | apache.scoreboard.open_slot              | The number of workers in each state.                                    | `state`: `open`         |
| apache.scoreboard          | apache.scoreboard.logging                | The number of workers in each state.                                    | `state`: `logging`      |
| apache.scoreboard          | apache.scoreboard.keepalive              | The number of workers in each state.                                    | `state`: `keepalive`    |
| apache.scoreboard          | apache.scoreboard.idle_cleanup           | The number of workers in each state.                                    | `state`: `idle_cleanup` |
| apache.scoreboard          | apache.scoreboard.gracefully_finishing   | The number of workers in each state.                                    | `state`: `finishing`    |
| apache.scoreboard          | apache.scoreboard.dns_lookup             | The number of workers in each state.                                    | `state`: `dnslookup`    |
| apache.scoreboard          | apache.scoreboard.closing_connection     | The number of workers in each state.                                    | `state`: `closing`      |
| apache.scoreboard          | apache.scoreboard.starting_up            | The number of workers in each state.                                    | `state`: `starting`     |
| apache.scoreboard          | apache.scoreboard.waiting_for_connection | The number of workers in each state.                                    | `state`: `waiting`      |
| apache.uptime              | apache.performance.uptime                | The amount of time that the server has been running in seconds.         |
| apache.workers             | apache.performance.idle_workers          | The number of workers currently attached to the HTTP server.            | `workers_state`: `idle` |
| apache.workers             | apache.performance.busy_workers          | The number of workers currently attached to the HTTP server.            | `workers_state`: `busy` |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/collector_exporter/)
