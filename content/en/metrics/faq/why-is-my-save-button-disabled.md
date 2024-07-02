---
title: Why is my "Save" button disabled when configuring metrics tags?
is_beta: false
---
It is possible for a proposed configuration to result in an indexed custom metrics volume that is larger than the original ingested volume. The "Save" button is intentionally disabled in infrequent scenarios where it is more cost effective to leave a metric entirely unconfigured without using Metrics without Limits™. 

Using [Metrics without Limits™][1], you can continue sending Datadog your originally submitted volume of metrics with no code-level changes, and define a tag configuration to keep only a smaller subset of custom metrics to index. 

By using Metrics without Limits™, your original raw metrics data must be recombined and re-aggregated, and stored against that smaller volume of indexed custom metrics in order to preserve mathematically accurate query results. Therefore, for each of the remaining indexed custom metrics, Datadog stores your specified number of time/space aggregations. 

The resulting number of indexed custom metrics for your Metrics without Limits™ configuration is (`the number of remaining tag value combinations`—specified by your tag configuration) x (`the number of time/space aggregations`—specified by the Customize Aggregations section)

**Example**
Suppose you want to use Metrics without Limits™ to reduce the cardinality of the `shopist.basket.size` metric. 

{{< img src="metrics/faq/all-tags.jpg" alt="All Tags Configuration">}}

Assuming `shopist.basket.size` reports values against four tag value combinations, such as {host: a, region: us, env: prod}—that is, `shopist.basket.size` originally emits **four custom metrics** as shown in the following diagram:

{{< img src="metrics/faq/all-tags-diagram.jpg" alt="Custom Metric Breakdown of All Tags Configuration">}}

Using Metrics without Limits™ to tag configure only the `{region, env}` tags, only three tag value combinations remain:
* `{region:us, env:prod}`
* `{region:eu, env:prod}`
* `{region:us, env:dev}`

{{< img src="metrics/faq/disabled-save.png" alt="Disabled Save Configuration">}}

The resulting number of custom metrics from this proposed configuration is as follows: (`the number of remaining tag value combinations`) x (`the number of time/space aggregations`) = `(3) x (2)` = **6 custom metrics**.

{{< img src="metrics/faq/mwl-diagram.jpg" alt="Custom Metric Breakdown of MWL Configuration">}}

Therefore, it is possible for a proposed configuration to result in an indexed custom metrics volume (6 custom metrics) that is larger than the original ingested volume (4 custom metrics). **In these cases, it is better to leave this metric unconfigured with the "All Tags" toggle option for the most cost-optimized configuration of this metric.**

[1]: /metrics/metrics-without-limits/
