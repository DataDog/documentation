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

Product Analytics uses the same SDKs and configuration as Real User Monitoring (RUM). After you configure your SDK using the RUM setup documentation, create your metric in the Product Analytics UI.

### Create a metric

To create a metric for your experiment:

1. Navigate to the [Metrics page][1] in Datadog Product Analytics.
1. Click **+ Create Metric** at the top right corner.
1. Click **Select an event** to open the event picker.
   1. Search for a specific event, or use the **By Type** filter to browse by event type. The chart on the right updates in real time as you configure your metric.
1. Select an [aggregation method](#aggregation-methods) from the dropdown. The default is **Count of events**.
1. Click the **Add filter** icon to [filter your metric](#add-filters) by additional properties.
1. (Optional) Set **Units** for your metric. Count of unique users metrics are typically reported as a percentage. For other metrics, units depend on your business context.
1. (Optional) Toggle on **Mark as certified** to indicate this metric is approved for important decision-making. This requires the **Product Analytics Certified Metrics Write** permission.
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

### Prerequisites

To create a metric from your warehouse data, you must connect the warehouse to Datadog. Follow the [Snowflake][11] guide to connect your Snowflake data to Datadog.

After you connect your warehouse, create a Metric SQL Model to map your data to Datadog, and create a metric.

### Create a Metric SQL Model

On the **Create Metric SQL Model** page, write your SQL query to define and preview your data, and configure your model to map your data to Datadog.

#### Write your SQL
1. Navigate to the [Metrics page][1] in Datadog Product Analytics.
1. Select the **Metric SQL Models** tab.
1. Click **Create Metric SQL Model**.
1. In the **Write SQL** section, enter a SQL query that returns your data of interest. This is often a `SELECT * FROM` statement but also supports more advanced SQL.
1. Click **Run** to see a preview of your data.

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_writesql.png" alt="The Write SQL section of the Create Metric SQL Model page showing a SELECT query against a logs usage table, with a successful query preview below displaying ORG_ID, USAGE_HOUR, and USAGE_HOUR_END columns." style="width:80%;" >}}

#### Structure your model
1. Name your new **Metric SQL Model** (for example, **Logs Usage**).
1. (Optional) Toggle on **Mark as certified** to indicate this metric is approved for important decision-making. This requires the **Product Analytics Certified Metrics Write** permission.
1. Map the columns in your table to the following:
   - **Timestamp**: The timestamp associated with the metric event. Only the rows created after a subject is enrolled into the experiment are included in the analysis.
   - **Subject Type**: The attribute that is used to randomly populate the experiment groups. This is typically the `usr.id` (for an individual user) or `usr.org_id` (for an organization account). You can define this attribute on the [Subject Types][12] page.
   - **Measures** (optional): The numeric columns to aggregate when creating metrics. Each Metric SQL Model automatically includes an **each record** measure, which counts the number of relevant rows for a specific experiment subject.
1. Click **Create Metric SQL Model**.

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_structure_1.png" alt="The Structure your model panel with the Metric SQL Model Name field set to 'Logs Usage' and highlighted, a Mark as certified toggle, Timestamp column set to USAGE_HOUR, Subject Type set to Organization with ORG_ID selected, a Measures dropdown showing 'Logs Usage (each record)', and the Create Metric SQL Model button highlighted." style="width:80%;" >}}

### Create a metric using your SQL model

After you create your SQL model, use it to create a metric:

1. Navigate to the [Metrics page][1] within Datadog Product Analytics.
1. Select the **Metrics** tab.
1. Click **Create Metric** at the top right corner.
1. Click **Select an event** to see a list of Metric SQL Models under their data source and select the relevant model (for example, **Logs Usage** under **Snowflake**).
1. Select an [aggregation method](#aggregation-methods) from the dropdown.

{{< img src="/product_analytics/experiment/exp_create_metric_from_sqlmodel1.png" alt="The Create Metric event picker showing All Events selected, with event types including Snowflake, Actions, Views, Sessions, Errors, and Long Tasks on the left, and the Logs Usage SQL model highlighted under Snowflake on the right." style="width:80%;" >}}

## Aggregation methods

Aggregation methods determine how Datadog summarizes data for each experiment subject. An experiment subject is the unit that is randomized for the experiment. This is typically a user, but can also be an organization, session, or device, depending on how you set up your experiment.

Datadog Experiments supports the following aggregation types:

- **Count of events** (default)
- **Count of unique users with the event** (useful for conversion metrics)
- **Sum of an event property** (useful for revenue metrics)
- **Distinct values of an event property** (useful for page view metrics)
- **Percentile of an event property** (useful for latency metrics)
- **Average of an event property** (useful for performance or satisfaction metrics)

{{< img src="/product_analytics/experiment/exp_default_metric_agg.png" alt="The aggregation method dropdown in the Define the metric panel showing Count of unique users, Count of events (selected), and Sum of... as options, with a description reading 'The number of events performed' on the right." style="width:90%;" >}}

Datadog computes metrics for each experiment subject. For example, a **Count of events** metric on users calculates the total number of events for all users in the variant (experiment group) divided by the number of users in that variant.

### Ratio metrics

By default, Datadog divides your metric by the number of experiment subjects. Click **Create ratio** to divide by a different event instead. This lets you measure conversion within a specific subset of users, giving you a more accurate picture of behavior at a specific step in the funnel.

Datadog accounts for correlations between the numerator and denominator using the [delta method][2].

{{< img src="/product_analytics/experiment/exp_create_ratio.png" alt="The Edit Metric page showing the '/metric/explorer' event with Count of events aggregation, the Create Ratio button highlighted, a Mark as certified toggle, Experiment settings and Units sections, and the metric named 'Visits to Metric Explorer'." style="width:90%;" >}}

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
[11]: /experiments/guide/connecting_snowflake
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
