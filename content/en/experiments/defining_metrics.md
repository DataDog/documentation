---
title: Create Experiment Metrics
description: Create the metrics you want to measure in your experiments.
aliases:
  - /product_analytics/experimentation/defining_metrics/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/experiments/reading_results"
  tag: "Documentation"
  text: "Reading Experiment Results"
---

## Overview

<!-- SME NOTE: Experiment metrics are different from Datadog metrics (ingested time-series data points). Consider adding a sentence here clarifying that experiment metrics are aggregations computed over event data to measure user behavior — not the same as Datadog metrics. -->

Create the metrics you want to measure in your experiments. Datadog Experiments metrics can use data from Product Analytics, Real User Monitoring (RUM), or your own data warehouse.

## Metrics from Product Analytics or RUM data

To create a metric from Product Analytics or RUM data, you must have Datadog's client-side SDK installed in your application and be actively capturing data. If you have not yet installed the SDK, follow [these steps][X].

### Create a metric

To create a metric for your experiment:

1. Navigate to the [Metrics page][1] within Datadog Product Analytics.
2. Click **+ Create Metric** at the top right corner.
3. Click **Select an Event** to see a list of all events collected from the Datadog SDK.
4. Select one of the [aggregation methods](#aggregation-methods) described below.

{{< img src="/product_analytics/experiment/exp_create_metric1.png" alt="UI page to create a metric." style="width:90%;" >}}

### Add filters

You can add filters to your metrics to filter page views based on referring URL or UTM parameters, or to filter actions to a specific page or value of a custom attribute. As you add filters, you can check metric values in real time using the chart on the right.

{{< img src="/product_analytics/experiment/exp_filter_by.png" alt="Filter flow to scope your metric by specific properties." style="width:90%;" >}}

## Create metrics from data in your data warehouse

You can also connect a data warehouse and create experiment metrics using your own data. Datadog runs the experiment analysis pipeline locally in your warehouse, keeping metrics up to date and giving you full visibility into the underlying logic.

To get started, you need a connected data warehouse. If you have not already done so, see the appropriate guide below:

[link to 4 warehouse connection guides]

Once you've connected a warehouse, creating a metric consists of two stages:

1. Creating a Metric SQL Model to annotate the warehouse table underlying your metrics
2. Specifying how data in that table should be aggregated by experiment subject (typically user)

### Create a Metric SQL Model

1. Navigate to the **Metrics SQL Models** page within Datadog Product Analytics.
2. Click **+ Create Metric SQL Model**.
3. In the **Write SQL** section, enter a SQL query that returns your data of interest. This is often a `SELECT * FROM` statement but also supports more advanced SQL.
4. Name your new Metric SQL Model.
5. Map the columns in your table to the following:
   - **Timestamp**: The timestamp associated with the metric event. Only rows after a subject is enrolled into the experiment are included in the analysis.
   - **Subject types**: The subject type (typically user) associated with the event.
   - **Measures** (optional): Numeric columns to aggregate when creating metrics. Each Metric SQL Model includes an "each record" measure automatically, which counts the number of relevant rows for a specific experiment subject.
6. Click **Save**.

### Create a metric from SQL models

1. Navigate to the [Metrics page][1] within Datadog Product Analytics.
2. Click **+ Create Metric** at the top right corner.
3. Click **Select an Event** to see a list of Metric SQL Models and select the relevant model.
4. Select one of the [aggregation methods](#aggregation-methods) described below.

## Aggregation methods

After you've selected your event of interest, you can specify an aggregation method. Aggregation methods specify how Datadog aggregates data to the experiment subject (often user) level.

Supported aggregation types include:

- **Count of events** (default)
- **Count of unique users with the event** (useful for conversion metrics)
- **Sum of an event property** (useful for revenue metrics)
- **Distinct values of an event property** (useful for distinct pages viewed metrics)
- **Percentile of an event property** (useful for latency metrics)
- **Average of an event property**

{{< img src="/product_analytics/experiment/exp_default_metric_agg.png" alt="Dropdown menu to select the aggregation method for metrics." style="width:90%;" >}}

Metrics are computed per experiment subject (typically user). For instance, a **count of events** metric computes the total number of events for all users in the variant divided by the number of users in that variant.

## Ratio metrics

You can also choose to normalize metrics by a different denominator. To do this, click **Create ratio**. This allows you to normalize your metric by another event, using any of the aggregation methods above.

{{< img src="/product_analytics/experiment/exp_create_ratio.png" alt="Button used to create a ratio from the metric." style="width:90%;" >}}

Datadog's statistical engine accounts for correlations between the numerator and denominator using the [delta method][2].

## Examples

### Conversion metric

Imagine measuring conversion through a basic, two-step funnel. When users visit the page, they are randomly assigned one of two variants: baseline or treatment. To measure add-to-cart conversion, create a **Count of unique users** metric on the "click Add to Cart" action and optionally filter to the page of interest.

[image]

Datadog calculates this metric as:

```
   Number of users that click Add to Cart
-----------------------------------------------
  Number of users enrolled into this variant
```

Since only users who visit the page are assigned to the experiment, this formula gives the per-user conversion rate.

### Down-funnel conversion rate

Now imagine running a similar experiment on your homepage. To measure conversion on a page later in the funnel, add a ratio to your metric:

[image]

Instead of dividing by the number of users enrolled (which includes all homepage visitors), Datadog divides by the number of users who viewed a product page:

```
   Number of users that click Add to Cart
-----------------------------------------------
  Number of users that visit the Product Page
```

<div class="alert alert-info">While it can be informative to understand down-funnel metrics, we recommend making decisions based on per-assigned-user metrics. Down-funnel conversion metrics may not reflect decreases to top-of-funnel performance.</div>

### Revenue

If you want to attribute business-level impact, create success metrics based on your own data warehouse. For instance, you might have a revenue table that accounts for failed payments and returns. This table is likely more consistent with internal reporting than frontend purchase events.

You can add a revenue table from your warehouse as a [Metric SQL Model](#create-a-metric-sql-model). For instance, create a SQL model such as:

```sql
SELECT * FROM data_mart.purchase_revenue
```

After you've mapped the purchase timestamp and amount in Datadog, you can create a per-subject (user) revenue metric:

[image]

For a user-randomized test, Datadog computes revenue as follows:

```
   Total revenue for users in this variant
-----------------------------------------------
   Number of users assigned to this variant
```

### Page load time

Datadog recommends measuring performance metrics for every experiment to understand impacts to end user experience. For instance, you can measure p90 Largest Contentful Paint using a percentile metric:

[image]

## Advanced options

Datadog supports several advanced options specific to experimentation:

`Timeframe filters`
: - By default, Datadog includes all events between a user's first exposure and the end of the experiment. If you want to measure a time-boxed value such as "sessions within 7 days", you can add a timeframe filter.
  - If selected, the metric only includes events from the specified time window, starting at the moment the user was first enrolled.

`Desired metric change`
: - Datadog highlights statistically significant results.
  - Use this setting to specify whether an increase or decrease in this metric is desired.

`Outlier handling`
: - Real world data often includes extreme outliers that can impact experiment results.
  - Use this setting to set a threshold at which data is truncated. For instance, set a 99% upper bound to truncate all results at the metric's 99th percentile.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[2]: https://en.wikipedia.org/wiki/Delta_method
[X]: LINK_TO_RUM_GETTING_STARTED
