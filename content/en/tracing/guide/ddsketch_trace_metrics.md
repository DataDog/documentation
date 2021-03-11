---
title: DDSketch-based Metrics in APM
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

Trace metrics are collected automatically for your services and resources and are retained for 15 months. The latency percentiles exist as individual timeseries. These percentiles are also available as a [Datadog Distribution Metric][1] (in beta). Instead of having a different metric for each percentile; and separate metrics for services, resources, or second primary tags; Datadog offers a simple metric:

- `trace.<SPAN_NAME>`:
  - *Prerequisite:* This metric exists for any APM service in beta.
  - *Description:* Represents latency distributions for all services, resources and versions across different environments and second primary tags.
  - *Metric type:* [DISTRIBUTION][3]
  - *Tags:* `env`, `service`, `version`, `resource`, and [the second primary tag][2].

The APM Service and Resource pages use this metric type for customers in the Beta automatically. This means you can use these metrics to power your dashboards and monitors.

**What does this metric mean for me?**
- [Distribution metrics][1] offer new capabilities like precise percentile calculation over time periods (instead of a rollup function) and open the door for better visualizations and functionality in the future.

**How am I seeing a full history of this new metric?**
- Datadog stitches any existing query on the new metric to an equivalent query based on the long-existing latency metrics, so you do not have to create multiple queries.

**I’m seeing a change in the values of my latency, what is happening?**
- Datadog Distribution Metrics are powered by [DDSketch][4]. This includes a change from rank-error guarantees to relative error guarantees. As a result, all percentile estimate values are now guaranteed to be closer to the true percentile value.
- Specifically, you might expect to see a reduction in p99 values, where this difference is most noticeable. The new values are centered more closely on the precise p99 value.
- One thing to note is that the APM metric calculations are not exactly akin to a Datadog Distribution Custom Metric that would be calculated in-code. The calculation happens on the backend, so some differences may occur.

**What does this beta program entail?**
- Distribution Metrics now power APM Service and Resource pages as Datadog rolls this out for more customers.
- Datadog will migrate all manual queries from dashboards and monitors to the new metrics automatically on your behalf, while retaining the existing metrics to support historical views.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/distributions/
[2]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[3]: /developers/metrics/types/?tab=distribution#metric-types
[4]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/
