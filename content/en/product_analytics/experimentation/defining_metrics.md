---
title: Defining Metrics
description: Define the metrics you want to measure during your experimentation.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/analytics_explorer/"
  tag: "Documentation"
  text: "Analytics Explorer"
---

## Overview

Define the metrics you want to measure during your experimentation. Metrics can be built using Real User Monitoring (RUM) and Product Analytics data.

**Note**: In order to create a metric, you must have Datadog’s client SDK installed in your application and be actively capturing data.


## Creating your first metric

To begin, navigate to the [Metrics page][1]  within Datadog Product Analytics and click **“Create Metric”** at the top right corner. Click **“Select an Event”** to see a list of all of the actions and views collected from the RUM SDK. 

### Metric aggregation
After you’ve selected your event of interest, you can specify an aggregation method. Metrics default to a count of unique subjects (often users) that had at least one event, but you can also choose to count the total number of events, or sum a property of that event:

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}

All metrics are normalized by the number of enrolled subjects. That is, a **“count of unique users”** metric will be computed as: `Number of users with specified event / Number of users enrolled into this variant`

Similarly, a **“Sum of”** metric is computed as: `Sum of property over users enrolled in this variant / Number of users enrolled into this variant`

You can also choose to normalize metrics by a different denominator. To do this, click “Create ratio”. This lets you normalize your metric by another event, again counting either the number of subjects with that event, the total number of events, or the sum of an event property. 

For example, an ecommerce company that wants to measure Average Order Value would create a ratio metric with the sum of purchase revenue as the numerator, and the count of purchase events as the denominator. Datadog’s statistical engine will account for correlations between the numerator and denominator using the[ delta method][2]. 


### Adding filters
You can also add filters, similar to other Product Analytics dashboards. For instance, you might want to filter page views based on referring URL or UTM parameters. Similarly, you might want to filter actions to a specific page or value of a custom attribute.

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


As you add filters, you can check metric values in real time using the chart on the right.

### Advanced options
Datadog supports several advanced options specific to experimentation:

Timeframe filters
: By default, Datadog will include all events between a user's first exposure and the end of the experiment. If you want to measure a time-boxed value such as “sessions within 7 days”, you can add a timeframe filter. If selected, the metric will only include events from the specified time window, starting at the moment the user was first enrolled.

Desired metric change
: Datadog highlights statistically significant results. Use this setting to specify whether an increase or decrease in this metric is desired.

Guardrail cutoffs
: Use this to specify a “do no harm” threshold. Metrics will be yellow until the confidence interval is small enough to rule out a downside risk larger than this threshold.

Outlier handling
: Real world data often includes extreme outliers that can impact experiment results. Use this setting to set a threshold at which data is truncated. For instance, set a 99% upper bound to truncate all results at the metric’s 99th percentile.

Congratulations! You have now created your first metric.







## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[2]: https://en.wikipedia.org/wiki/Delta_method
[3]: ADD-LINK
[4]: /getting_started/feature_flags/