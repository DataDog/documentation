---
title: DDSketch based Metrics in APM
kind: guide
aliases:
- /tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
- link: "https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/"
  tag: "Blog"
  text: "Computing Accurate Percentiles with DDSketch"
- link: "https://docs.datadoghq.com/metrics/distributions/"
  tag: "Documentation"
  text: "Learn more about Distributions"
- link: "https://docs.datadoghq.com/tracing/guide/metrics_namespace/"
  tag: "Documentation"
  text: "Learn more about Trace Metrics"
---

Trace metrics are collected automatically for your services and resources and retained for 15 months. The latency percentiles exist as individual time series and in beta as a DD Distribution Metric. This means that we now offer more data in easier formats. Instead of having a different metric for each percentile, separately for services, resources and second primary tags, we now offer a simple metric:

- `trace.<SPAN_NAME>`:
  - *Prerequisite:* This metric exists for any APM service in beta.
  - *Description:* Represents latency distributions for all services, resources and versions across different environments and second primary tags.
  - *Metric type:* [DISTRIBUTION][1]
  - *Tags:* `env`, `service`, `version`, `resource`, and [the second primary tag][2].

The APM Service and Resource pages now use this new metric for customers in the Beta automatically. This means you can use these metrics to power your dashboards and monitors.

**What does this metric mean for me?**
- Distribution metrics offer new capabilities compared with the existing gauge metric like precise aggregation in time (instead of a rollup) and open the door for better visualizations and functionality in the future.

**How am I seeing a full history of this new metric?**
- We stitch any existing query on the new metric to an equivalent query based on the long-existing latency metrics, so you never have to create multiple queries

**I’m seeing a change in the values of my latency, what is happening?**
- Datadog Distribution Metrics are powered by DDSketch. This includes a change from rank-error guarantees to relative error guarantees. As a result, all percentile estimate values are now guaranteed to be ∓1% from the actual percentile value.
- Specifically you might expect to see a reduction in p99 values where this difference is most noticeable. The new values are centered more closely on the precise p99 value.
- One thing to note is that the APM metric calculations are not exactly akin to a DD Distribution Custom Metric that would be calculated in-code. The calculation happens on the backend so some differences may occur

**What does this beta program entail?**
- New Distribution Metrics now power APM Service and Resource pages as we roll this out for more and more customers
- We will migrate all manual queries from dashboards and monitors to the new metrics automatically on your behalf while retaining the existing metrics to support historic views


[1]: /metrics/distributions/
[2]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
