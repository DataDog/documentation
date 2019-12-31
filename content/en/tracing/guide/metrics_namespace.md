---
title: Tracing Application Metrics
kind: guide
disable_toc: true
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
aliases:
  - /tracing/getting_further/metrics_namespace
---

## Overview

The [trace metrics][1] namespace is `trace.<name>.<metrics>{<tags>}`.

Tracing application metrics are collected after [enabling trace collection][2] and [instrumenting your application][3]. These metrics are available for dashboards and monitors.

### Metric names

Trace metric names are formatted as `trace.<NAME>.<METRIC>` or `trace.<NAME>.<METRIC_2ND_PRIM_TAG>`.

| Parameter               | Description                                                                                                             |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `<NAME>`                | The name of the operation or `span.name` (examples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`). |
| `<METRIC>`              | The name of the metric (examples: `duration`, `hits`, `span_count`).                                                    |
| `<METRIC_2ND_PRIM_TAG>` | If the metric name accounts for the second primary tag, this tag is part of the metric name.                            |

### Tags

Trace metrics come with a variety of tags. The possible tags are:

* `env`
* `service`
* `resource`
* `sublayer_type`
* `sublayer_service`
* `http.status_code`
* `http.status_class`
* Datadog Agent tags (including the host and second primary tag)

**Note**: Tags are attached based on the specific metric. See the metrics table below.

## Data collected

### Metrics

{{< get-metrics-from-git "tracing" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace-metrics
[2]: /tracing/send_traces
[3]: /tracing/setup
