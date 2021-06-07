---
title: Getting Started with Metrics without Limits™
kind: guide
is_beta: true
---

<div class="alert alert-warning">This functionality is in private beta. To request access, contact your CSM or the <a href="url">Datadog Support team</a>.</div>

## Overview

This guide covers how to get started with Metrics without Limits™ and quickly gain the most value from the feature. 

Review the [Metrics Without Limits™ FAQ][1].


1. Begin by configuring your Top 20 metrics on the Usage page.
   You can configure metrics both in the Metrics Summary UI and with the API.

   **NOTE:** If you're using the Create Tag Configuration API, use the [tag configuration cardinality estimator API][2] first to validate the potential impact of your tag configurations prior to using the API above to create tag configurations. 

   If the UI or the estimator API returns a resulting number of indexed that is larger than ingested, do not save your tag configuration. There are more cost savings from doing nothing to that metric than using Metrics Without Limits™.

2. Use Bulk Metric Configuration to quickly configure tags on multiple metrics.

   Datadog notifies you when the bulk configuration job is completed.

   {{< img src="metrics/guide/bulk-tag-configuration.gif" alt="Applying bulk tag configuration"  style="width:80%;" >}}s

## Other tips

You can set up alerts on your real-time estimated custom metrics usage metric so that you can correlate spikes in custom metrics with configurations.


[Role based access control][3] for Metrics Without Limits™ is also available to control which users have permissions to use this feature that has billing implications.


Audit events allow you to trace any tag configurations or percentile aggregations that have been made that may correlate with custom metrics spikes (search for “queryable tag configuration” or “percentile aggregations”) 

#### Why is my indexed CM volume greater than ingested CM volume? 

This is not a bug -- your current proposed tag configuration doesn't reduce the metric's cardinality enough to offset the effects of how Metrics Without Limits™ is designed.

* When a count, gauge, or rate metric isn't configured with Metrics without Limits™:

  Datadog can slice, dice, and aggregate the appropriate raw data at query time to provide you mathematically accurate results. 


* When a count, gauge, or rate metric has been configured with Metrics without Limits™ given a specified tag configuration:

  The original raw data must be recombined and aggregated prior to query time to preserve the accuracy of your query results and values. Because of this, Datadog stores 6 different time/space aggregations (shown below in green) for each remaining tag value combination defined by your tag configuration. Refer to the docs on [the anatomy of a metric][4] to review what time/space aggregations are, and how they work. 

  {{< img src="metrics/guide/mwl-table.jpg" alt="Table displaying time and space metrics in green and red"  style="width:80%;" >}}

  If a combination is in red, it is best to send that metric without using Metrics Without Limits (keep full cardinality).

Therefore, you can have a resulting indexed custom metric volume greater than an ingested custom metric volume if the tag combination specified does not reduce the number of remaining tag value combinations enough to offset the 6x factor.

Here is a simplified example of how indexed greater than ingested can occur when you start with four tag value combinations on a gauge metric (in other words, four custom metrics):




[1]: /metrics/faq/metrics-without-limits/
[2]: /metrics/guide/tag-configuration-cardinality-estimation-tool/
[3]: /account_management/rbac/permissions/?tab=ui#metrics
[4]: /metrics/#time-and-space-aggregation
