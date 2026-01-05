---
title: Filter Processor
disable_toc: false
further_reading:
- link: "/getting_started/search/"
  tag: "Documentation"
  text: "Getting Started with Search in Datadog"
- link: /logs/explorer/search_syntax/
  tag: "Documentation"
  text: Log Management Search Syntax
products:
- name: Logs
  icon: logs
- name: Metrics
  icon: metrics
---

{{< product-availability >}}

## Overview

This processor drops all logs or metrics ({{< tooltip glossary="preview" case="title" >}}) that do not match the specified filter query. If a log or metric is dropped, the data isn't sent to any subsequent processors or destinations.

## Setup

To set up the filter processor:

- Define a **filter query**.
  - Logs or metrics that match the [query](#filter-query-syntax) are sent to the next component.
  - Logs or metrics that don't match the query are dropped.

## Filter query syntax

Each processor has a corresponding filter query in their fields. Processors only process logs or metrics that match their filter query.

The following are filter query examples:

{{< tabs >}}
{{% tab "Logs" %}}

- `NOT (status:debug)`: This filters for logs that do not have the status `DEBUG`.
- `status:ok service:flask-web-app`: This filters for all logs with the status `OK` from your `flask-web-app` service.
    - This query can also be written as: `status:ok AND service:flask-web-app`.
- `host:COMP-A9JNGYK OR host:COMP-J58KAS`: This filter query only matches logs from the labeled hosts.
- `user.status:inactive`: This filters for logs with the status `inactive` nested under the `user` attribute.
- `http.status:[200 TO 299]` or `http.status:{300 TO 399}`: These two filters represent the syntax to query a range for `http.status`. Ranges can be used across any attribute.

Learn more about writing log filter queries in [Log Search Syntax][1].

[1]: /observability_pipelines/search_syntax/logs/

{{% /tab %}}

{{% tab "Metrics" %}}

- `NOT system.cpu.user`: This filters for metrics that do not have the field `name:system.cpu.user`.
- `system.cpu.user OR system.cpu.user.total`: This filter query only matches metrics that have either `name:system.cpu.user` or `name:system.cpu.user.total`.
- `tags:(env\:prod OR env\:test)`: This filters for metrics with `env:prod` or `env:test` in `tags`.

Learn more about writing metrics filter queries in [Metrics Search Syntax][1].

[1]: /observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
