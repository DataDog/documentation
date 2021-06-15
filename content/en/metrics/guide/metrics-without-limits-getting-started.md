---
title: Getting Started with Metrics without Limits™
kind: guide
is_beta: true
---

<div class="alert alert-warning">This functionality is in private beta.</div>

## Overview

This guide covers how to get started with Metrics without Limits™ and quickly gain the most value from the feature. 

1. Review the [Metrics without Limits™ FAQ][1].

2. If you're using the Create Tag Configuration API, use the [tag configuration cardinality estimator API][2] first to validate the potential impact of your tag configurations prior to using the API above to create tag configurations. 

   If the UI or the estimator API returns a resulting number of indexed that is [larger than ingested](#why-is-my-indexed-volume-greater-than-ingested-volume), do not save your tag configuration. 

3. Configure your Top 20 metrics on the Usage page, or [with the API][3].

   You can use bulk metric configuration (`*` syntax) to quickly configure tags on multiple metrics.

   {{< img src="metrics/guide/bulk-tag-configuration.gif" alt="Applying bulk tag configuration"  style="width:80%;" >}}

   Datadog notifies you when the bulk configuration job is completed.

### Other tips

You can set up alerts on your real-time [estimated custom metrics usage][4] metric so that you can correlate spikes in custom metrics with configurations.


[Role based access control][5] for Metrics without Limits™ is also available to control which users have permissions to use this feature that has billing implications.


Audit events allow you to track any tag configurations or percentile aggregations that have been made that may correlate with custom metrics spikes. Search for “queryable tag configuration” or “percentile aggregations”.

### Why is my indexed volume greater than ingested volume? 

This is not a bug -- your current proposed tag configuration doesn't reduce the metric's cardinality enough to offset the effects of how Metrics without Limits™ is designed.

* When a count, gauge, or rate metric **is not configured** with Metrics without Limits™, Datadog can slice, dice, and aggregate the appropriate raw data at query time to provide you mathematically accurate results. 


* When a count, gauge, or rate metric **is configured** with Metrics without Limits™, given a specified tag configuration, the original raw data must be recombined and aggregated prior to query time to preserve the accuracy of your query results and values. 

Because of this, Datadog stores six different time/space aggregations (shown below with check marks) for each remaining tag value combination defined by your tag configuration. Refer to the docs on [the anatomy of a metric][6] to review what time/space aggregations are, and how they work. 
  |           | Time AVG  | Time SUM  | Time MIN  | Time MAX  |
  |-----------|-----------|-----------|-----------|-----------|
  | Space AVG | {{< X >}} | {{< X >}} |           |           |
  | Space SUM | {{< X >}} | {{< X >}} |           |           |
  | Space MIN | {{< X >}} |           |           |           |
  | Space MAX | {{< X >}} |           |           |           |
  
  If a combination you need for query does not have a check mark, it is best to not configure this particular metric with Metrics without Limits™ 

Therefore, you can have a resulting indexed custom metric volume greater than an ingested custom metric volume if the tag combination specified does not reduce the number of remaining tag value combinations enough to offset the 6x factor.

Here is a simplified example of how indexed greater than ingested can occur when you start with four tag value combinations on a gauge metric, or in other words, **four custom metrics**:

{{< img src="metrics/guide/before-mwl.jpg" alt="Flow chart with four custom metrics from two hosts"  style="width:80%;" >}}

If you use Metrics without Limits™ and configure on `{endpoint, status}`: 

{{< img src="metrics/guide/after-mwl.jpg" alt="Flow chart with the hosts marked out with x"  style="width:80%;" >}}

Without the host, this leaves three remaining tag combinations:

1. `{endpoint:x, status:200}`
2. `{endpoint:x, status:400}`
3. `{endpoint:y, status:200}`

However, for each of these three combinations, Metrics without Limits™ stores six pre-aggregated values, so this results in **18 custom metrics total**. Therefore, the metric count is smaller when left unconfigured.


[1]: /metrics/faq/metrics-without-limits/
[2]: /metrics/guide/tag-configuration-cardinality-estimation-tool/
[3]: /api/latest/metrics/#create-a-tag-configuration
[4]: /account_management/billing/usage_metrics/
[5]: /account_management/rbac/permissions/?tab=ui#metrics
[6]: /metrics/#time-and-space-aggregation
