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

Tracing application metrics are collected after [enabling trace collection][1] and [instrumenting your application][2]. These metrics are available for dashboards and monitors. The [trace metrics][3] namespace is formatted as:

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`
- `trace.<SPAN_NAME>.<METRIC_SUFFIX>.<2ND_PRIM_TAG>_service`

With the following definitions:

`<SPAN_NAME>`
: The name of the operation or `span.name` (examples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: The name of the metric (examples: `duration`, `hits`, `span_count`). See the section below.

`<2ND_PRIM_TAG>` 
: If the metric name accounts for the [second primary tag][4], this tag is part of the metric name.

`<TAGS>`
: Trace metrics tags, possible tags are: `env`, `service`, `version`, `resource`, `sublayer_type`, `sublayer_service`, `http.status_code`, `http.status_class`, Datadog Agent tags (including the host and second primary tag). **Note:** Tags set on spans do not count and will not be available as tags for your traces metrics.

## Metric Suffix

### Hits

`trace.<SPAN_NAME>.hits`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of hits for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Represent the count of hits for a given span break down by HTTP status code.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

### Percentile aggregation

`trace.<SPAN_NAME>.duration.by.resource_<2ND_PRIM_TAG>_service.<PERCENTILE_AGGREGATION>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time spent processing by resource, service, and [2nd primary tag][4].<br>
**Metric type:** [GAUGE][6].<br>
**Percentile Aggregations:** `100p`, `50p`, `75p`, `90p`, `95p`, `99p`<br>
**Tags:** `env`, `service`, `resource`, and [the second primary tag][4].

`trace.<SPAN_NAME>.duration.by.resource_service.<PERCENTILE_AGGREGATION>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time spent processing for each resource and service combination.<br>
**Metric type:** [GAUGE][6].<br>
**Percentile Aggregations:** `100p`, `50p`, `75p`, `90p`, `95p`, `99p`<br>
**Tags:** `env`, `service`, and `resource`.

`trace.<SPAN_NAME>.duration.by.<2ND_PRIM_TAG>_service.<PERCENTILE_AGGREGATION>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time spent processing for each [2nd primary tag][4] and service combination.<br>
**Metric type:** [GAUGE][6].<br>
**Percentile Aggregations:** `100p`, `50p`, `75p`, `90p`, `95p`, `99p`<br>
**Tags:** `env`, `service`, and [the second primary tag][4].

`trace.<SPAN_NAME>.duration.by.service.<PERCENTILE_AGGREGATION>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represents the duration for an individual span. It's used to track latency and answer questions like, "what's the median wait time a user experienced?" or "how long do the slowest 1% of users have to wait?".<br>
**Metric type:** [GAUGE][6].<br>
**Percentile Aggregations:** `100p`, `50p`, `75p`, `90p`, `95p`, `99p`<br>
**Tags:** `env` and `service`.

### Errors

`trace.<SPAN_NAME>.errors`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of errors for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of errors for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].


### Span count

**Note**: This is a deprecated namespace.

`trace.<SPAN_NAME>.span_count`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the amount of spans collected on a given interval.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `resource`, all host tags on from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.span_count.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Represent the amount of spans collected on a given interval break down by HTTP status.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].


### Duration

`trace.<SPAN_NAME>.duration`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time for a collection of spans. Specifically, it is the total time spent by all spans over an interval - including time spent waiting on child processes.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

### Duration by

`trace.<SPAN_NAME>.duration.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Measure the total time for a collection of spans for each HTTP status. Specifically, it is the relative share of time spent by all spans over an interval and a given HTTP status - including time spent waiting on child processes.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.duration.by_service`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time spent actually processing for each service (i.e. it excludes time spent waiting on child processes).<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, `sublayer_service`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.duration.by_type`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time spent actually processing for each [Service type][7].<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, `sublayer_type`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.duration.by_type.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Measure the total time spent actually processing for each [Service type][7] and HTTP status.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, `sublayer_type`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.duration.by_service.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Measure the total time spent actually processing for each [Service][8] and HTTP status.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, `sublayer_service`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

### Apdex

`trace.<SPAN_NAME>.apdex.by.resource_<2ND_PRIM_TAG>_service`
: **Prerequisite:** This metric exists for any HTTP/WEB APM service.<br>
**Description:** Represent the [Apdex][9] score for all combination of resources, [2nd primary tag][4]s and services.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, `resource`, and [the second primary tag][4].

`trace.<SPAN_NAME>.apdex.by.resource_service`
: **Prerequisite:** This metric exists for any HTTP/WEB APM service.<br>
**Description:** Measure the [Apdex][9] score for each combination of resources and web services.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, and `resource`

`trace.<SPAN_NAME>.apdex.by.<2ND_PRIM_TAG>_service`
: **Prerequisite:** This metric exists for any HTTP/WEB APM service.<br>
**Description:** Measure the [Apdex][9] score for each combination of [2nd primary tag][4] and web services.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env`, `service`, and [the second primary tag][4].

`trace.<SPAN_NAME>.apdex.by.service`
: **Prerequisite:** This metric exists for any HTTP/WEB APM service.<br>
**Description:** Measure the [Apdex][9] score for each web services.<br>
**Metric type:** [GAUGE][6].<br>
**Tags:** `env` and `service`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/setup/
[3]: /tracing/visualization/#trace-metrics
[4]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /developers/metrics/types/?tab=count#metric-types
[6]: /developers/metrics/types/?tab=gauge#metric-types
[7]: /tracing/visualization/services_list/#services-types
[8]: /tracing/visualization/#services
[9]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
