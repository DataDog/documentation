---
title: Create Experiment Metrics
description: Create the metrics you want to measure in your experiments.
aliases:
  - /product_analytics/experimentation/defining_metrics/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
---

## Overview

Create the metrics you want to measure in your experiments. You can use data from Real User Monitoring (RUM), Product Analytics, or your own warehouse to create Datadog Experiments metrics.

<div class="alert alert-info">If your organization uses custom roles, you must have the appropriate <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics permissions</a> to create experiment metrics.</div>

## Create a metric

Select your data source:

{{< tabs >}}
{{% tab "Product Analytics or RUM" %}}

### Prerequisites

To create a metric from Product Analytics or RUM data, you must have Datadog's [client-side SDK][3] installed in your application and be actively capturing data. If you have not yet configured your SDK, select your application type to get started:

- [Android and Android TV][4]
- [iOS and tvOS][5]
- [Browser (JavaScript)][6]
- [React Native][7]

Product Analytics uses the same SDKs and configuration as Real User Monitoring (RUM). After you configure your SDK using the RUM setup documentation, create your metric in the Product Analytics UI.

### Create a metric using Product Analytics or RUM data

To create a metric for your experiment:

1. Navigate to the [Metrics page][1] in Datadog Product Analytics.
1. Select the **Metrics** tab and click **Create Metric** at the top right corner.
1. Add a **Metric name** and, optionally, a **Description**.
1. Under the **Metric definition** section, click **Select an event** to open the event picker. The chart on the right updates in real time as you configure your metric.
   1. Search for a specific event, or use the **By Type** filter to browse by event type.
1. Select an [aggregation method](#aggregation-methods) from the dropdown. The default is **Count of events**.
1. Click **Add Filter** to [filter your metric](#add-filters) by additional properties.
1. (Optional) Under the **Additional settings** section:
   1. Toggle on **Mark as certified** to indicate that this metric is approved for important decision-making. This requires the **Product Analytics Certified Metrics Write** permission.
   1. Adjust the [**Experiment settings**](#advanced-options) and **Units** as needed. The defaults work for most use cases.
1. Click **Save**.

{{< img src="/product_analytics/experiment/exp_create_new_metric.png" alt="The Create Metric page with the Metric name set to 'Example metric', the 'click on ADD TO CART' event selected, the aggregation method dropdown set to Count of events, the Additional settings section, a bar chart preview on the right, and the Save button highlighted." style="width:90%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[3]: /real_user_monitoring/#get-started
[4]: /real_user_monitoring/application_monitoring/android/setup/?tab=kotlin
[5]: /real_user_monitoring/application_monitoring/ios/setup/?tab=swift-package-manager--spm
[6]: /real_user_monitoring/application_monitoring/browser/setup/client/?tab=npm
[7]: /real_user_monitoring/application_monitoring/react_native/setup/?platform=react_native

### Add filters

You can filter your metric by selecting an **Event properties** filter, such as Service, Country, or Device Type. Use the **By Data Type** filter to narrow the list of available properties by type (for example, String or Boolean).

If you do not see the property you need, type the property name in the **Custom property** field (for example, `@context.tracking`) and click **Add**.

{{< img src="/product_analytics/experiment/exp_filter_by_2.png" alt="The Filter by panel open within the Metric definition section, showing All Properties selected, Event properties such as Application Id, Service, Browser Name, and Country in the center, a By Data Type filter with Numerical, String, and Boolean options on the left, and a Custom property section at the bottom with a text field showing the placeholder 'e.g. @context.tracking' and an Add button." style="width:90%;" >}}

{{% /tab %}}
{{% tab "Warehouse" %}}

### Prerequisites

To create a metric from your warehouse data, you must connect the warehouse to Datadog. Select your warehouse to get started:

- [BigQuery][8]
- [Databricks][9]
- [Redshift][10]
- [Snowflake][11]

After you connect your warehouse, create a SQL Model to map your data to Datadog, then use the model to create a metric.

### Create a SQL Model

Write your SQL query to define and preview your data, then configure your model to map the data to Datadog.

#### Write your SQL

Start by writing a query to retrieve your data:

1. Navigate to the [Metrics page][1] in Datadog Product Analytics.
1. Select the **Metric SQL Models** tab and click **Create SQL Model**.
1. In the **Write SQL** section, enter a SQL query that returns your data of interest. The SQL editor supports `SELECT * FROM` and more advanced SQL statements.
1. Click **Run** to preview your data.

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_writesql_1.png" alt="The Write SQL section of the Create Metric SQL Model page showing a SELECT query for user_id, revenue_timestamp, and amount from a revenue orders table, with a successful query preview below displaying USER_ID, REVENUE_TIMESTAMP, and AMOUNT columns." style="width:80%;" >}}

#### Map your warehouse data to Datadog

After previewing your data, map it to Datadog. In the **Structure your model** section:

1. Add a **Metric SQL Model Name** (for example, **Revenue Orders**).
1. (Optional) Toggle on **Mark as certified** to indicate that this SQL model is approved for important decision-making. This requires the **Product Analytics Certified Metrics Write** permission.
1. Map the columns in your warehouse table to the following:
   - **Timestamp column**
     - The column that lists the timestamp associated with the metric event.
     - The analysis only includes rows created after the subject enrolls in the experiment.
   - **Subject Type**
     - The attribute that Datadog uses to randomly assign experiment groups.
     - You can define the subject type and its default warehouse column on the [Subject Types][12] page. For example, you can use `user_id` for an individual user or `org_id` for an organization account.
   - **Measures** (optional)
     - The numeric columns from your warehouse table that Datadog can aggregate into metrics (for example, a `revenue` or `amount` column).
     - Each SQL model automatically includes an **each record** measure. Use this measure to count the number of relevant rows in the table for a specific experiment subject.
1. Click **Create Metric SQL Model** to save your SQL model.

{{< img src="/product_analytics/experiment/exp_create_metrics_sql_model_structure4.png" alt="The Structure your model panel with the Metric SQL Model Name field set to 'Revenue Orders' and highlighted, a Mark as certified toggle, Timestamp column set to REVENUE_TIMESTAMP, Subject Type set to User (@usr.id) with USER_ID selected in the column selector, a Measures dropdown showing 'Revenue Orders (each record)', and the Create Metric SQL Model button highlighted." style="width:80%;" >}}

### Create a metric using your SQL model

After you create your SQL model, use it to create a metric:

1. Navigate to the [Metrics page][1] in Datadog Product Analytics.
1. Select the **Metrics** tab and click **Create Metric** at the top right corner.
1. Add a **Metric name** and, optionally, a **Description**.
1. Under the **Metric definition** section, click **Select an event** to open the event picker. The chart on the right updates in real time as you configure your metric.
   1. Select the relevant SQL model. Your SQL models appear under their data source (for example, **Revenue Orders** under **Snowflake**).
1. Select an [aggregation method](#aggregation-methods) from the dropdown.
1. (Optional) Under the **Additional settings** section:
   1. Toggle on **Mark as certified** to indicate this metric is approved for important decision-making. This requires the **Product Analytics Certified Metrics Write** permission.
   1. Adjust the [**Experiment settings**](#advanced-options) and **Units** as needed. The defaults work for most use cases.
1. Click **Save**.

{{< img src="/product_analytics/experiment/exp_create_metric_from_sqlmodel_2.png" alt="The Create Metric event picker showing All Events selected, with event types including Snowflake, Actions, Views, Sessions, Errors, and Long Tasks on the left, and the Revenue Orders SQL model highlighted under Snowflake on the right, showing Measures: amount and Filterable dimensions: N/A." style="width:80%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[8]: /experiments/guide/connecting_bigquery
[9]: /experiments/guide/connecting_databricks
[10]: /experiments/guide/connecting_redshift
[11]: /experiments/guide/connecting_snowflake
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types

{{% /tab %}}
{{< /tabs >}}

## Aggregation methods

Aggregation methods determine how Datadog summarizes data for each experiment subject. An experiment subject is the unit that Datadog randomizes for the experiment. This is typically a user, but can also be an organization, cookie, or device, depending on how you set up your experiment.

Datadog Experiments supports the following aggregation methods:

- **Count of events** (default)
- **Count of unique users** (useful for conversion metrics)
- **Sum of** an event property (useful for revenue metrics)
- **Distinct values of** an event property (useful for unique pages viewed metrics)
- **Percentile** of an event property (useful for latency metrics)
- **Average of** an event property (useful for satisfaction metrics)

{{< img src="/product_analytics/experiment/exp_default_metric_agg_1.png" alt="The aggregation method dropdown showing Count of unique users (selected) and Count of events at the top, followed by a SELECT A MEASURE section with Sum of, Distinct values of, Percentile, and Average of options, with a description reading 'The number of users who performed the event' on the right." style="width:90%;" >}}

Datadog computes metrics for each experiment subject. For example, a **Count of events** metric on an experiment randomized by user calculates the total number of events for all users in the variant (experiment group) divided by the number of users in that variant.

### Ratio metrics

Click **Create Ratio** to divide your metric by a value other than the default number of experiment subjects. The denominator can use any of the [aggregation methods](#aggregation-methods). For example, divide purchases by product page views to measure conversion at a specific step in the funnel, rather than across all enrolled users.

Datadog accounts for correlations between the numerator and denominator using the [delta method][2].

{{< img src="/product_analytics/experiment/exp_create_ratio_new_ui.png" alt="The Metric definition section showing the 'click on ADD TO CART' event with Count of events aggregation and an Add Filter option, the Create Ratio button highlighted below, and the Additional settings section with Mark as certified toggle, Experiment settings, and Units." style="width:90%;" >}}

## Advanced options

Datadog Experiments supports the following advanced options. These can be modified under **Additional settings > Experiment settings** when creating a metric.

Time frame filters
: By default, Datadog includes all events between a user's first exposure and the end of the experiment. Use this setting to measure a time-boxed value such as "sessions within 7 days". If you add a time frame filter, the metric only includes events from the specified time window, starting at the moment the experiment first enrolls the user.

Desired metric direction
: Datadog highlights statistically significant results. Use this setting to specify whether you want this metric to increase or decrease.

Outlier handling
: Real-world data often includes extreme outliers that can impact experiment results. Use this setting to set a threshold at which Datadog truncates data. For example, set a 99% upper bound to truncate all results at the metric's 99th percentile.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[2]: https://en.wikipedia.org/wiki/Delta_method
