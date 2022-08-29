---
title: Why is my "Save" button disabled?
kind: faq
is_beta: false
---
This is not a bug but intentional. The "Save" button is disabled in infrequent scenarios where it is more cost-effective to leave this metric entirely unconfigured without using Metrics without Limits 

As a quick refresher on Metrics without Limits (more details [here](https://docs.datadoghq.com/metrics/metrics-without-limits/)), you can continue sending us their originally submitted volume of metrics with no code-level changes and define a tag configuration to keep only a smaller subset of custom metrics to index. 

By using MWL, your original raw metric’s data must now be recombined/re-aggregated and stored against that smaller volume of indexed custom metrics in order to preserve mathematically accurate query results. Therefore for each of the remaining indexed custom metrics, we store your specified number of time/space aggregations. 

The resulting number of indexed custom metrics for your MWL configuration is (`the # of remaining tag value combinations` - specified by your tag configuration) x ( `the # of time/space aggregations` - specified by the Customize Aggregations section)

**Example**

Suppose we want to use Metrics without Limits to reduce the cardinality of the `shopist.basket.size` metric. 

{{< img src="metrics/faq/all-tags.jpg" alt="All Tags Configuration">}}

Let’s assume `shopist.basket.size` reports values against 4 tag value combinations,like {host:a, region:us, env:prod} – that is, `shopist.basket.size` originally emits **4 custom metrics** as shown in the diagram below.

{{< img src="metrics/faq/all-tags-diagram.jpg" alt="Custom Metric Breakdown of All Tags Configuration">}}

If we use MWL to tag configure only the {region, env} tags, only three tag value combinations remain:
1. {region:us, env:prod}
2. {region:eu, env:prod}
3. {region:us, env:staging}

{{< img src="metrics/faq/disabled-save.png" alt="Disabled Save Configuration">}}

The resulting number of custom metrics from this proposed configuration is as follows: (`the # of remaining tag value combinations`) x (`the # of time/space aggregations`) = (3) x (2) = **6 custom metrics**.` 

{{< img src="metrics/faq/mwl-diagram.jpg" alt="Custom Metric Breakdown of MWL Configuration">}}

Consequently, it’s possible for a proposed configuration to result in an indexed custom metrics volume (6 custom metrics) that is larger than the original ingested volume (4 custom metrics). **In these cases, it is better to leave this metric unconfigured on the “All Tags” toggle option for the most cost-optimized configuration of this metric.**