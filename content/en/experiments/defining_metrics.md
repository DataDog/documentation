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
{{< jqmath-vanilla >}}

## Overview

Create the metrics you want to measure in your experiments. You can use data from Real User Monitoring (RUM), Product Analytics, or your own data warehouse to create Datadog Experiments metrics.

## Metrics from Product Analytics or RUM data

### Prerequisites
To create a metric from Product Analytics or RUM data, you must have Datadog's [client-side SDK][3] installed in your application and be actively capturing data. If you have not yet configured your SDK, select your application type to start collecting data:

- [Android and Android TV][4]
- [iOS and tvOS][5]
- [Browser (JavaScript)][6]
- [React Native][7]

Product Analytics uses the same SDKs and configuration as Real User Monitoring (RUM). After you have configured your SDK using RUM documentation, create your metric in the Product Analytics UI.

### Create a metric

To create a metric for your experiment:

1. Navigate to the [Metrics page][1] in Datadog Product Analytics.
1. Click **+ Create Metric** at the top right corner.
1. Click **Select an event** to open the event picker.
   1. Search for a specific event, or use the **By Type** filter to browse by event type. The chart on the right updates in real time as you configure your metric.
1. Select an [aggregation method](#aggregation-methods) from the dropdown. The default is **Count of events**.
1. Click the **Add filter** icon to [filter your metric](#add-filters) by additional properties.
1. (Optional) Set **Units** for your metric. Count of unique users metrics are typically reported as a percentage. For other metrics, units depend on your business context.
1. (Optional) Select **Mark as certified** to indicate this metric is approved for important decision-making. Requires the **Product Analytics Certified Metrics Write** permission.
1. Add a **Name** and **Description** (optional) to your metric.
1. Click **Save**.

{{< img src="/product_analytics/experiment/exp_create_metric_2.png" alt="The Create Metric page with the 'click on ADD TO CART' event selected, the aggregation method dropdown set to Count of events, the add filter icon, a Mark as certified toggle, Experiment settings and Units sections, a Name field, and a real-time bar chart on the right." style="width:90%;" >}}

### Add filters

You can filter your metric by:
- **Event properties**: Country, Browser, or Service.
- **Data type**: Numerical, String, or Boolean.
- **Custom property**: A property name you define.

{{< img src="/product_analytics/experiment/exp_filter_by.png" alt="The Add Filters panel showing event properties such as Application Id, Service, and Browser Name, with options to filter by data type or custom property, and a real-time bar chart on the right." style="width:90%;" >}}

## Metrics from warehouse data

To create a metric from your warehouse data, you must connect the warehouse to Datadog. Select your warehouse to get started:

- [BigQuery][8]
- [Databricks][9]
- [Redshift][10]
- [Snowflake][11]

After you have connected your warehouse, create a Metric SQL Model, map your data to Datadog, and then create a metric.

### Create a Metric SQL Model

1. Navigate to the **Metrics SQL Models** page within Datadog Product Analytics.
2. Click **+ Create Metric SQL Model**.
3. In the **Write SQL** section, enter a SQL query that returns your data of interest. This is often a `SELECT * FROM` statement but also supports more advanced SQL.
4. Name your new Metric SQL Model.

### Map your warehouse data to Datadog

1. Map the columns in your table to the following:
   - **Timestamp**: The timestamp associated with the metric event. Only rows after a subject is enrolled into the experiment are included in the analysis.
   - **Subject type attribute**: This is typically the `usr.id` associated with the event. You can define this attribute in the [Subject Types][12] page.
   - **Measures** (optional): Numeric columns to aggregate when creating metrics. Each Metric SQL Model includes an "each record" measure automatically, which counts the number of relevant rows for a specific experiment subject.
2. Click **Save**.



### Create a metric using your SQL model

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

<!-- ADD THE CALCULATION? -->


### Ratio metrics

You can also choose to normalize metrics by a different denominator. To do this, click **Create ratio**. This allows you to normalize your metric by another event, using any of the aggregation methods above.

{{< img src="/product_analytics/experiment/exp_create_ratio.png" alt="Button used to create a ratio from the metric." style="width:90%;" >}}

Datadog's statistical engine accounts for correlations between the numerator and denominator using the [delta method][2].

## Examples

### Conversion metric

Imagine measuring conversion through a basic, two-step funnel. When users visit the page, they are randomly assigned one of two variants: baseline or treatment. To measure add-to-cart conversion, create a **Count of unique users** metric on the "click Add to Cart" action and optionally filter to the page of interest.

[image]

Datadog calculates this metric as:


$$\text"Number of users that click Add to Cart" /{\text"Number of users enrolled into this variant"}$$


Since only users who visit the page are assigned to the experiment, this formula gives the per-user conversion rate.

### Down-funnel conversion rate

Now imagine running a similar experiment on your homepage. To measure conversion on a page later in the funnel, add a ratio to your metric:

[image]

Instead of dividing by the number of users enrolled (which includes all homepage visitors), Datadog divides by the number of users who viewed a product page:

$$\text"Number of users that click Add to Cart" /{\text"Number of users that visit the Product Page"}$$


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
[3]: /real_user_monitoring/#get-started
[4]: /real_user_monitoring/application_monitoring/android/setup/?tab=kotlin
[5]: /real_user_monitoring/application_monitoring/ios/setup/?tab=swift-package-manager--spm
[6]: /real_user_monitoring/application_monitoring/browser/setup/client/?tab=npm
[7]: /real_user_monitoring/application_monitoring/react_native/setup/?platform=react_native
[8]: experiments/guide/connecting_bigquery
[9]: experiments/guide/connecting_databricks
[10]: experiments/guide/connecting_redshift
[11]: experiments/guide/connecting_snowflake
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
