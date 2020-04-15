---
title: Tracing Application Metrics
kind: guide
further_reading:
    - link: 'tracing/setup/'
      tag: 'Documentation'
      text: 'Learn how to setup APM tracing with your application'
    - link: 'tracing/visualization/services_list/'
      tag: 'Documentation'
      text: 'Discover the list of services reporting to Datadog'
    - link: 'tracing/visualization/service'
      tag: 'Documentation'
      text: 'Learn more about services in Datadog'
    - link: 'tracing/visualization/resource'
      tag: 'Documentation'
      text: 'Dive into your resource performance and traces'
    - link: 'tracing/visualization/trace'
      tag: 'Documentation'
      text: 'Understand how to read a Datadog Trace'
aliases:
    - /tracing/getting_further/metrics_namespace
---

## Overview

The [trace metrics][1] namespace is `trace.<SPAN_NAME>.<METRICS_suffix>{<TAGS>}`. Tracing application metrics are collected after [enabling trace collection][2] and [instrumenting your application][3]. These metrics are available for dashboards and monitors.

Trace metric names are formatted as `trace.<SPAN_NAME>.<METRIC_SUFFIX>{<TAGS>}` or `trace.<SPAN_NAME>.<2ND_PRIM_TAG>{<TAGS>}`.

| Parameter               | Description                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<SPAN_NAME>`                | The name of the operation or `span.name` (examples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).                                                                                            |
| `<METRIC_SUFFIX>`       | The name of the metric (examples: `duration`, `hits`, `span_count`).                                                                                                                                               |
| `<2ND_PRIM_TAG>` | If the metric name accounts for the second primary tag, this tag is part of the metric name.                                                                                                                       |
| `<TAGS>`                | Trace metrics tags, possible tags are: `env`, `service`, `resource`, `sublayer_type`, `sublayer_service`, `http.status_code`, `http.status_class`, Datadog Agent tags (including the host and second primary tag). |

## Metric Suffix

### Duration

- `trace.<SPAN_NAME>.duration`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Measure the total time for a collection of spans. Specifically, it is the total time spent by all spans over an interval - including time spent waiting on child processes.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by_http_status`:
  - *Prerequisite:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Measure the total time for a collection of spans for each HTTP status. Specifically, it is the relative share of time spent by all spans over an interval and a given HTTP status - including time spent waiting on child processes.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by_service`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Measures the total time spent actually processing for each service (i.e. it excludes time spent waiting on child processes).
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_service`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by_type`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Measures the total time spent actually processing for each [Service type][6].
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_type`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by_type.by_http_status`:
  - *Prerequisite:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Measures the total time spent actually processing for each [Service type][6] and HTTP status.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_type`, `http.status_class`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by_service.by_http_status`:
  - *Prerequisite:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Measures the total time spent actually processing for each [Service][7] and HTTP status.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_service`, `http.status_class`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

#### Duration.by

- `trace.<SPAN_NAME>.duration.by.resource_<2ND_PRIM_TAG>_service.<PERCENTILE_AGGREGATION>`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Measure the total time spent processing by resource, service, and [2nd primary tag][5].
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by.resource_service.<PERCENTILE_AGGREGATION>`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Measure the total time spent processing for each resource and service combination.
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by.<2ND_PRIM_TAG>_service.<PERCENTILE_AGGREGATION>`
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Measure the total time spent processing for each [2nd primary tag][5] and service combination.
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env`, `service`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.duration.by.service.<PERCENTILE_AGGREGATION>`
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Represents the duration for an individual span. It's used to track latency and answer questions like, "what's the median wait time a user experienced?" or "how long do the slowest 1% of users have to wait?".
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env`, `service`, all Datadog Agent tags, and [the second primary tag][5].

### Errors

- `trace.<SPAN_NAME>.errors`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Represent the count of errors for a given span.
  - *Metric type:* [COUNT][8]
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.errors.by_http_status`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Represent the count of errors for a given span.
  - *Metric type:* [COUNT][8]
  - *Tags:* `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

### Hits

- `trace.<SPAN_NAME>.hits`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Represent the count of hits for a given span.
  - *Metric type:* [COUNT][8]
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.hits.by_http_status`
  - *Prerequisite:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Represent the count of hits for a given span break down by HTTP status code.
  - *Metric type:* [COUNT][8]
  - *Tags:* `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

### Span_count

- `trace.<SPAN_NAME>.span_count`:
  - *Prerequisite:* This metric exists for any APM service.
  - *Description:* Represent the amount of spans collected on a given interval.
  - *Metric type:* [COUNT][8]
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.span_count.by_http_status`:
  - *Prerequisite:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Represent the amount of spans collected on a given interval break down by HTTP status.
  - *Metric type:* [COUNT][8]
  - *Tags:* `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all Datadog Agent tags, and [the second primary tag][5].

### Apdex

- `trace.<SPAN_NAME>.apdex.by.resource_<2ND_PRIM_TAG>_service`:
  - *Prerequisite:* This metric exists for any HTTP/WEB APM service.
  - *Description:* Represent the [Apdex][9] score for all combination of resources, [2nd primary tag][5]s and services.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.apdex.by.resource_service`:
  - *Prerequisite:* This metric exists for any HTTP/WEB APM service.
  - *Description:* Mesure the [Apdex][9] score for each combination of resources and web services.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.apdex.by.<2ND_PRIM_TAG>_service`:
  - *Prerequisite:* This metric exists for any HTTP/WEB APM service.
  - *Description:* Mesure the [Apdex][9] score for each combination of [2nd primary tag][5] and web services.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, all Datadog Agent tags, and [the second primary tag][5].

- `trace.<SPAN_NAME>.apdex.by.service`:
  - *Prerequisite:* This metric exists for any HTTP/WEB APM service.
  - *Description:* Mesure the [Apdex][9] score for each web services.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, all Datadog Agent tags, and [the second primary tag][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace-metrics
[2]: /tracing/send_traces
[3]: /tracing/setup
[4]: /developers/metrics/types/?tab=gauge#metric-types
[5]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[6]: /tracing/visualization/services_list/#services-types
[7]: /tracing/visualization/#services
[8]: /developers/metrics/types/?tab=count#metric-types
[9]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
