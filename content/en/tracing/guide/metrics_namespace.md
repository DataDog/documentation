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

Trace metric names are formatted as `trace.<SPAN_NAME>.<METRIC_SUFFIX>{<TAGS>}` or `trace.<SPAN_NAME>.<METRIC_2ND_PRIM_TAG>{<TAGS>}`.

| Parameter               | Description                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<SPAN_NAME>`                | The name of the operation or `span.name` (examples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).                                                                                            |
| `<METRIC_SUFFIX>`       | The name of the metric (examples: `duration`, `hits`, `span_count`).                                                                                                                                               |
| `<METRIC_2ND_PRIM_TAG>` | If the metric name accounts for the second primary tag, this tag is part of the metric name.                                                                                                                       |
| `<TAGS>`                | Trace metrics tags, possible tags are: `env`, `service`, `resource`, `sublayer_type`, `sublayer_service`, `http.status_code`, `http.status_class`, Datadog Agent tags (including the host and second primary tag). |

## Metric Suffix

The following metrics have all the second primary tag and Datadog Agent tags attached to it.

### Duration

- `trace.<SPAN_NAME>.duration`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:* Measure the total time for a collection of spans. Specifically, it is the total time spent by all spans over an interval - including time spent waiting on child processes.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, and `http.status_code`.

- `trace.<SPAN_NAME>.duration.by_http_status`:
  - *Pre-requisit:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Measure the total time for a collection of spans for each HTTP status. Specifically, it is the relative share of time spent by all spans over an interval and a given HTTP status - including time spent waiting on child processes.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `http.status_class` and `http.status_code`.

- `trace.<SPAN_NAME>.duration.by_service`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:* Measures the total time spent actually processing for each service (i.e. it excludes time spent waiting on child processes).
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_service`, and `http.status_code`.

- `trace.<SPAN_NAME>.duration.by_type`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:* Measures the total time spent actually processing for each [Service type][5].
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_type`, and `http.status_code`.

- `trace.<SPAN_NAME>.duration.by_type.by_http_status`:
  - *Pre-requisit:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Measures the total time spent actually processing for each [Service type][5] and HTTP status.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_type`, `http.status_class`, and `http.status_code`.

- `trace.<SPAN_NAME>.duration.by_service.by_http_status`:
  - *Pre-requisit:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:* Measures the total time spent actually processing for each [Service][6] and HTTP status.
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`, `sublayer_service`, `http.status_class`, and `http.status_code`.

#### Duration.by

- `trace.<SPAN_NAME>.duration.by.<resource_2ND_PRIM_TAG_service>.<PERCENTILE_AGGREGATION>`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env`, `service` and `resource`.

- `trace.<SPAN_NAME>.duration.by.resource_service.<PERCENTILE_AGGREGATION>`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env`, `service`, and `resource`.

- `trace.<SPAN_NAME>.duration.by.<2ND_PRIM_TAG_service>.<PERCENTILE_AGGREGATION>`
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env` and `service`.

- `trace.<SPAN_NAME>.duration.by.service.<PERCENTILE_AGGREGATION>`
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:* Represents the duration for an individual span. It's used to track latency and answer questions like, "what's the median wait time a user experienced?" or "how long do the slowest 1% of users have to wait?".
  - *Metric type:* [GAUGE][4]
  - *Percentile Aggregations:* `100p`, `50p`, `75p`, `90p`, `95p`, `99p`
  - *Tags:* `env` and `service`.

### Hits

- `trace.<SPAN_NAME>.hits`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:*
  - *Metric type:* [COUNT][7]
  - *Tags:* `env`, `service`, `resource`, and `http.status_code`.

- `trace.<SPAN_NAME>.hits.by_http_status`
  - *Pre-requisit:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:*
  - *Metric type:* [COUNT][7]
  - *Tags:* `env`, `service`, `resource`, `http.status_class`, and `http.status_code`.

### Span_count

- `trace.<SPAN_NAME>.span_count`:
  - *Pre-requisit:* This metric exists for any APM service.
  - *Description:*
  - *Metric type:* [COUNT][7]
  - *Tags:* `env`, `service`, `resource`, and `http.status_code`.

- `trace.<SPAN_NAME>.span_count.by_http_status`:
  - *Pre-requisit:* This metric exists for HTTP/WEB APM services if http metadata exists.
  - *Description:*
  - *Metric type:* [COUNT][7]
  - *Tags:* `env`, `service`, `resource`, `http.status_class`, and `http.status_code`.

### Apdex

- `trace.<SPAN_NAME>.apdex.by.<resource_2ND_PRIM_TAG_service>`:
  - *Pre-requisit:* This metric exists for any HTTP/WEB APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, `resource`

- `trace.<SPAN_NAME>.apdex.by.resource_service`:
  - *Pre-requisit:* This metric exists for any HTTP/WEB APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env`, `service`, and `resource`.

- `trace.<SPAN_NAME>.apdex.by.<2ND_PRIM_TAG_service>`:
  - *Pre-requisit:* This metric exists for any HTTP/WEB APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env` and `service`.

- `trace.<SPAN_NAME>.apdex.by.service`:
  - *Pre-requisit:* This metric exists for any HTTP/WEB APM service.
  - *Description:*
  - *Metric type:* [GAUGE][4]
  - *Tags:* `env` and `service`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization/#trace-metrics
[2]: /tracing/send_traces
[3]: /tracing/setup
[4]: /developers/metrics/types/?tab=gauge#metric-types
[5]: /tracing/visualization/services_list/#services-types
[6]: /tracing/visualization/#services
[7]: /developers/metrics/types/?tab=count#metric-types
