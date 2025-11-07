---
title: Trace Metrics
description: Comprehensive guide to APM trace metrics including namespace, types (hits, errors, latency, Apdex), and how they're calculated from application traffic.
further_reading:
    - link: 'tracing/trace_collection/'
      tag: 'Documentation'
      text: 'Learn how to setup APM tracing with your application'
    - link: 'tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Discover and catalog the services reporting to Datadog'
    - link: 'tracing/services/service_page'
      tag: 'Documentation'
      text: 'Learn more about services in Datadog'
    - link: 'tracing/services/resource_page'
      tag: 'Documentation'
      text: 'Dive into your resource performance and traces'
    - link: 'tracing/trace_explorer/trace_view/'
      tag: 'Documentation'
      text: 'Understand how to read a Datadog Trace'
aliases:
    - /tracing/getting_further/metrics_namespace
    - /tracing/guide/metrics_namespace
algolia:
  tags: ['trace metrics']
---

## Overview

Tracing application metrics are collected after you [enable trace collection and instrument your application][1].

{{< img src="tracing/apm_lifecycle/trace_metrics.png" style="width:70%; background:none; border:none; box-shadow:none;" alt="Trace Metrics" >}}

These metrics capture request counts, error counts, and latency measures. They are calculated based on 100% of the application's traffic, regardless of any [trace ingestion sampling][2] configuration. Ensure that you have full visibility into your application's traffic by using these metrics to spot potential errors on a service or a resource, and by creating dashboards, monitors, and SLOs.

**Note**: If your applications are instrumented with OpenTelemetry libraries, and sampling is set up at the SDK level, APM metrics are calculated based on the sampled set of data. However, if sampling is set up at the OpenTelemetry Collector level and the sampler processor is upstream of the Datadog connector, APM metrics are calculated based on 100% of application traffic.

Trace metrics are generated for service entry spans and certain operations depending on integration language. For example, the Django integration produces trace metrics from spans that represent various operations (1 root span for the Django request, 1 for each middleware, and 1 for the view).

The [trace metrics][3] namespace is formatted as:

- `trace.<SPAN_NAME>.<METRIC_SUFFIX>`

With the following definitions:

`<SPAN_NAME>`
: The name of the operation or `span.name` (examples: `redis.command`, `pylons.request`, `rails.request`, `mysql.query`).

`<METRIC_SUFFIX>`
: The name of the metric (examples: `hits`, `errors`, `apdex`, `duration`). See the section below.

`<TAGS>`
: Trace metrics tags, possible tags are: `env`, `service`, `version`, `resource`, `http.status_code`, `http.status_class`, `rpc.grpc.status_code`(requires Datadog Agent v7.65.0+) , and Datadog Agent tags (including the host and [additional primary tags][4]). 
: **Note:** Other tags set on spans are not available as tags on traces metrics.

## Metric suffix

### Hits

`trace.<SPAN_NAME>.hits`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of spans created with a specific name (for example, `redis.command`, `pylons.request`, `rails.request`, or `mysql.query`).<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, all host tags from the Datadog Host Agent, and [additional primary tags][4].

`trace.<SPAN_NAME>.hits.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Represent the count of hits for a given span break down by HTTP status code.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [additional primary tags][4].

### Latency distribution

`trace.<SPAN_NAME>`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the latency distribution for all services, resources, and versions across different environments and additional primary tags. **Recommended for all latency measurement use cases.**<br>
**Metric type:** [DISTRIBUTION][6].<br>
**Tags:** `env`, `service`,`version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, `synthetics`, and [additional primary tags][4].

### Errors

`trace.<SPAN_NAME>.errors`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of errors for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `resource_name`, `http.status_code`, `rpc.grpc.status_code`, all host tags from the Datadog Host Agent, and [additional primary tags][4].

`trace.<SPAN_NAME>.errors.by_http_status`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Represent the count of errors for a given span.<br>
**Metric type:** [COUNT][5].<br>
**Tags:** `env`, `service`, `version`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [additional primary tags][4].

### Apdex

`trace.<SPAN_NAME>.apdex`
: **Prerequisite:** This metric exists for any HTTP or web-based APM service.<br>
**Description:** Measures the [Apdex][10] score for each web service.<br>
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `version`, `resource` / `resource_name`, `synthetics`, and [additional primary tags][4].

## Legacy metrics

The following metrics are maintained for backward compatibility. For all latency measurement use cases, Datadog strongly recommends using [Latency Distribution metrics](#latency-distribution) instead.

### Duration (Legacy)

<div class="alert alert-danger">
<strong>Important:</strong> Duration metrics are maintained for backward compatibility only. For all latency measurement use cases, Datadog strongly recommends using <a href="#latency-distribution">Latency Distribution metrics</a> instead, as they provide better accuracy for percentile calculations and overall performance analysis.
</div>

`trace.<SPAN_NAME>.duration`
: **Prerequisite:** This metric exists for any APM service.<br>
**Description:** Measure the total time for a collection of spans within a time interval, including child spans seen in the collecting service. For most use cases, Datadog recommends using the [Latency Distribution](#latency-distribution) for calculation of average latency or percentiles. To calculate the average latency with host tag filters, you can use this metric with the following formula: <br>
`sum:trace.<SPAN_NAME>.duration{<FILTER>}.rollup(sum).fill(zero) / sum:trace.<SPAN_NAME>.hits{<FILTER>}.rollup(sum).fill(zero)` <br>
This metric does not support percentile aggregations. Read the [Latency Distribution](#latency-distribution) section for more information. <br>
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `resource`, `http.status_code`, all host tags from the Datadog Host Agent, and [additional primary tags][4].

### Duration by (Legacy)

<div class="alert alert-danger">
<strong>Important:</strong> Duration metrics are maintained for backward compatibility only. For all latency measurement use cases, Datadog strongly recommends using <a href="#latency-distribution">Latency Distribution metrics</a> instead, as they provide better accuracy for percentile calculations and overall performance analysis.
</div>

`trace.<SPAN_NAME>.duration.by_http_status`
: **Prerequisite:** This metric exists for HTTP/WEB APM services if http metadata exists.<br>
**Description:** Measure the total time for a collection of spans for each HTTP status. Specifically, it is the relative share of time spent by all spans over an interval and a given HTTP status - including time spent waiting on child processes.<br>
**Metric type:** [GAUGE][7].<br>
**Tags:** `env`, `service`, `resource`, `http.status_class`, `http.status_code`, all host tags from the Datadog Host Agent, and [additional primary tags][4].

## Sampling impact on trace metrics

In most cases, trace metrics are calculated based on all application traffic. However, with certain trace ingestion sampling configurations, the metrics represent only a subset of all requests.

### Application-side sampling 

Some tracing libraries support application-side sampling, which reduces the number of spans before they are sent to the Datadog Agent. For example, the Ruby tracing library offers application-side sampling to lower performance overhead. However, this can affect trace metrics, as the Datadog Agent needs all spans to calculate accurate metrics. 

Very few tracing libraries support this setting, and using it is generally not recommended.

### OpenTelemetry sampling

The OpenTelemetry SDK's native sampling mechanisms lower the number of spans sent to the Datadog collector, resulting in sampled and potentially inaccurate trace metrics.

### X-Ray sampling

X-Ray spans are sampled before they are sent to Datadog, which means trace metrics might not reflect all traffic.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /tracing/trace_pipeline/ingestion_mechanisms
[3]: /tracing/glossary/#trace-metrics
[4]: /tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[5]: /metrics/types/?tab=count#metric-types
[6]: /metrics/types/?tab=distribution#metric-types
[7]: /metrics/types/?tab=gauge#metric-types
[8]: /tracing/software_catalog/#services-types
[9]: /tracing/glossary/#services
[10]: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
