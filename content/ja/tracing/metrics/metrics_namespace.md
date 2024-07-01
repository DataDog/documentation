---
title: Trace Metrics
kind: documentation
further_reading:
    - link: tracing/trace_collection/
      tag: Documentation
      text: Learn how to setup APM tracing with your application
    - link: tracing/service_catalog/
      tag: Documentation
      text: Discover and catalog the services reporting to Datadog
    - link: tracing/services/service_page
      tag: Documentation
      text: Learn more about services in Datadog
    - link: tracing/services/resource_page
      tag: Documentation
      text: Dive into your resource performance and traces
    - link: tracing/trace_explorer/trace_view/
      tag: Documentation
      text: Understand how to read a Datadog Trace
aliases:
    - /tracing/getting_further/metrics_namespace
    - /tracing/guide/metrics_namespace
algolia:
  tags: [trace metrics]
---

## Overview

Tracing application metrics are collected after you [enable trace collection and instrument your application][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Trace Metrics" >}}

These metrics capture request counts, error counts, and latency measures. They are calculated based on 100% of the application's traffic, regardless of any [trace ingestion sampling][2] configuration. Ensure that you have full visibility into your application's traffic by using these metrics to spot potential errors on a service or a resource, and by creating dashboards, monitors, and SLOs.

**Note**: If your applications and services are instrumented with OpenTelemetry libraries and you set up sampling at the SDK level and/or at the collector level, APM metrics are calculated based on the sampled set of data.

Trace metrics are generated for service entry spans and certain operations depending on integration language. For example, the Django integration produces trace metrics from spans that represent various operations (1 root span for the Django request, 1 for each middleware, and 1 for the view).

The [trace metrics][3] namespace is formatted as:

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

With the following definitions:

`<SPAN_NAME>`
: The name of the operation or `span.name` (examples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: The name of the metric (examples: `hits`, `errors`, `apdex`, `duration`). See the section below.

`<TAGS>`
: Trace metrics tags, possible tags are: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, and Datadog Agent tags (including the host and second primary tag). 
**Note:** Other tags set on spans are not available as tags on traces metrics.

## Metric suffix

### Hits

`trace.<SPAN_NAME>.hits`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of spans created with a specific name (for example, `redis.command`, `pylons.request`, `rails.request`, or `mysql.query`).<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Represent the count of hits for a given span break down by HTTP status code.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

### Latency distribution

`trace.<SPAN_NAME>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the latency distribution for all services, resources, and versions across different environments and second primary tags.<br>
**Metric type:** [DISTRIBUTION][6].<br>
**Tags:** `env`, `service`, `resource`, `resource_name`, `version`, `synthetics`, and [the second primary tag][4].

### Errors

`trace.<SPAN_NAME>.errors`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of errors for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of errors for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

### Apdex

`trace.<SPAN_NAME>.apdex`
: **Prerequisite:** This metric exists for any HTTP or web-based APM service.<br>
**Description:** Measures the [Apdex][10] score for each web service.<br>
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `resource` / `resource_name`, `version`, `synthetics`, and [the second primary tag][4].

### Duration

<div class="alert alert-warning">Datadog recommends <a href="/tracing/guide/ddsketch_trace_metrics/">tracing distribution metrics using DDSketch</a>.</div>

`trace.<SPAN_NAME>.duration`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time for a collection of spans within a time interval, including child spans seen in the collecting service. For most use cases, Datadog recommends using the [Latency Distribution](#latency-distribution) for calculation of average latency or percentiles. To calculate the average latency with host tag filters, you can use this metric with the following formula: <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}` <br>
This metric does not support percentile aggregations. Read the [Latency Distribution](#latency-distribution) section for more information.
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `resource`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

### Duration by

<div class="alert alert-warning">Datadog recommends <a href="/tracing/guide/ddsketch_trace_metrics/">tracing distribution metrics using DDSketch</a>.</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Measure the total time for a collection of spans for each HTTP status. Specifically, it is the relative share of time spent by all spans over an interval and a given HTTP status - including time spent waiting on child processes.<br>
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [the second primary tag][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_pipeline/ingestion_mechanisms
[3]: /tracing/glossary/#trace-metrics
[4]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[5]: /metrics/types/?tab=count#metric-types
[6]: /metrics/types/?tab=distribution#metric-types
[7]: /metrics/types/?tab=gauge#metric-types
[8]: /tracing/service_catalog/#services-types
[9]: /tracing/glossary/#services
[10]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
