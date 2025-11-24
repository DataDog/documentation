---
title: Defining Metrics
description: Define the metrics you want to measure during your experimentation.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/product_analytics/experimentation/reading_results.md"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

Define the metrics you want to measure during your experimentation. Metrics can be built using Product Analytics and Real User Monitoring (RUM) data.

<div class="alert alert-info"> In order to create a metric, you must have Datadog’s client SDK installed in your application and be actively capturing data.
</div>

## Create your first metric

To create a metric for your experiment: 

1. Navigate to the [Metrics page][1] within Datadog Product Analytics.
2. Click **+ Create Metric** at the top right corner. 
3. Click **Select an Event** to see a list of all of the actions and views collected from the Datadog SDK.
4. Add a metric name and optionally a description. Then, click **Save**.

{{< img src="/product_analytics/experiment/exp_create_metric1.png" alt="create an experiment and add a hypothesis for the experiment." style="width:80%;" >}}

## Specify metric aggregation

### Default metric aggregation 
After you’ve selected your event of interest, you can specify an aggregation method. Metrics default to a **count of unique** subjects (often users) that had at least one event. However, you can also choose to _count the total number_ of events, or _sum a property_ of that event:

{{< img src="dd-logo.png" alt="A view of the User profiles page." style="width:10%;" >}}


### Default metric normalization 

All metrics are normalized by the number of enrolled subjects. For example, a **count of unique users** metric is computed as: 

```

                      Number of users with specified event
                  -----------------------------------------------           
                      Number of users enrolled into this variant
```

<!-- {{< img src="/product_analytics/experiment/pana_exp_equation1.png" alt="A view of the User profiles page." style="width:50%;border:none" >}} -->

Similarly, a **Sum of** metric is computed as: 

<!-- {{< img src="/product_analytics/experiment/pana_exp_equation2.png" alt="A view of the User profiles page." style="width:60%;border:none" >}} -->

```

                  Sum of property over users enrolled in this variant
              --------------------------------------------------------           
                      Number of users enrolled into this variant
```

### Custom metric normalization

You can also choose to normalize metrics by a different denominator. To do this, click on a metric
then on **Create ratio**. This allows you to normalize your metric by another event, counting either the number of subjects with that event, the total number of events, or the sum of an event property. 

{{< img src="/product_analytics/experiment/exp_create_ratio.png" alt="Click on this button to create a ratio." style="width:100%;" >}}

For example, an e-commerce company that wants to measure the _Average Order Value_ can create a ratio metric with the sum of purchase revenue as the numerator, and the count of purchase events as the denominator. 

Datadog’s statistical engine accounts for correlations between the numerator and denominator using the [delta method][2]. 


## Add filters
You can also add filters to your metrics, similar to other Product Analytics dashboards. For instance, you might want to filter page views based on referring URL or UTM parameters. Similarly, you might want to filter actions to a specific page or value of a custom attribute. As you add filters, you can check metric values in real time using the chart on the right.


{{< img src="/product_analytics/experiment/exp_filter_by.png" alt="Filter your metric my specific properties." style="width:100%;" >}}



## Advanced options
Datadog supports several advanced options specific to experimentation:

`Timeframe filters`
: - By default, Datadog will include all events between a user's first exposure and the end of the experiment. If you want to measure a time-boxed value such as “sessions within 7 days”, you can add a timeframe filter.
  - If selected, the metric will only include events from the specified time window, starting at the moment the user was first enrolled.

`Desired metric change`
: - Datadog highlights statistically significant results. 
  - Use this setting to specify whether an increase or decrease in this metric is desired.

`Guardrail cutoffs`
: - Use this to specify a `do no harm` threshold. 
  - Metrics will be yellow(`REPRESENTING WHAT?`) until the confidence interval is small enough to rule out a downside risk larger than this threshold.

`Outlier handling`
: - Real world data often includes extreme outliers that can impact experiment results. 
  - Use this setting to set a threshold at which data is truncated. For instance, set a 99% upper bound to truncate all results at the metric’s 99th percentile.





## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[2]: https://en.wikipedia.org/wiki/Delta_method
