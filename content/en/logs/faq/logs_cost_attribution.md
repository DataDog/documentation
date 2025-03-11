---
title: Logs Cost Attribution

further_reading:
- link: "/logs/log_configuration/logs_to_metrics/"
  tag: "Documentation"
  text: "Generate metrics from ingested logs"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Learn more about tagging"
- link: "/dashboards/widgets/table/"
  tag: "Documentation"
  text: "Learn more about the table widget"
---

## Overview

Datadog provides log usage information through the [Log Estimated Usage dashboard][1], the [Plan and Usage][2] section in the app, and the available [logs usage metrics][3]. However, there might be situations where you want visibility into more granular cost attribution data, such as for specific teams.

This guide walks you through the steps on how to create custom metrics and a dashboard to see your log cost attribution for different teams. You can also use this process for other attributes, such as departments, projects, products, regions, and so on.

1. [Configure custom tags](#configure-custom-tags).
2. [Generate custom log metrics](#generate-custom-logs-metrics) with those tags. 
3. [Create widgets in a dashboard](#create-a-dashboard-using-the-custom-logs-metrics) for the custom log metrics. 

{{< img src="logs/faq/logs_cost_attribution/cost_attribution_dashboard.png" alt="A dashboard showing table widgets for usage and cost broken down by teams for ingestion, Sensitive Data Scanner, seven days indexing, and 15 days indexing. " style="width:85%" >}}

## Create a new log pipeline

Create a new log pipeline that filters to logs for which you want to attribute costs. For this example, filter to the subset of logs that you want to breakdown by team.

1. Navigate to [Logs Pipelines][4].
2. Click **Add a new pipeline**.
3. Enter the filter for logs you want to attribute costs.
4. Enter a name for the pipeline. For example, `Cost attribution by team`.
5. Optionally, add tags and a description.
6. Click **Create**.

Leave the new pipeline at the end of the list of pipelines. This lets the logs go through the other pipelines so that those tags and attributes are created first.

Add all processors you create for this cost attribution example to the new pipeline.

### Add a `team` tag

Datadog recommends that you use one of these [tagging methods][5] to add the `team` tag to logs **before ingestion**.

However, if you need to configure the tag during ingestion, follow these steps to create and add a `team` tag.

1. [Create a new `team` attribute](#create-a-new-team-attribute).
2. [Create a remapper to convert the `team` attribute to a tag](#create-a-remapper-to-convert-the-team-attribute-to-a-tag).

You can use this process to create the attributes you want for breaking down your log usage (for example, by departments, products, regions, and so forth). 

#### Create a new `team` attribute

Use a [Category Processor][6] to create a new `team` attribute for your logs.

1. Navigate to the new pipeline and click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, "Create team attribute".
4. Enter `team` in the **Set target category attribute** field. This creates a `team` attribute.
5. In the **Populate category** section, add a category for each team. For example, to add the tag `team:service_a` to log events that match `service:a` and `env:prod`:
      a. Enter `service:a` and `env:prod` in the **All events that match** field.  
      b. Enter `service_a` in the **Appear under the value name** field.  
      c. Click **Add**.
6. Add the other teams as separate categories.
7. Click **Create**.

#### Create a remapper to convert the `team` attribute to a tag

1. Navigate to the pipeline and click **Add processor**.
2. Select **Remapper** for the processor type.
3. Enter a name for the processor. For example, "Convert team attribute to tag".
4. In the **Set attribute(s) or tag key to remap** section, select **Attribute(s)** and enter `team`.
5. In the **Set target attribute or tag key** section, select **Tag key** and enter `team`.
6. Disable **Preserve source attribute** to make sure the attribute is removed and only the tag is kept.
7. Enable **Override on conflict**.
8. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/team_remapper.png" alt="The create remapper form showing all the data filled in to create a team remapper" style="width:75%" >}}

## Configure custom tags

Create custom tags so you can organize custom log usage metrics into categories that are relevant to your use case. For this example, create the following tags:

- `retention_period` for indicating the number of days for which logs are retained in Datadog indexes.
- `online_archives` for indicating whether logs have been routed to Online Archives.
- `sds` for indicating whether logs have been scanned by the Sensitive Data Scanner.

### Create a `retention_period` tag

<div class="alert alert-warning">Datadog recommends that you set up the <code>retention_period</code> tag even if your indexes all have the same retention period. This makes sure that if you start using multiple retention periods, all logs are tagged with its retention period.</div>

`retention_period` is the number of days your logs are retained in Datadog indexes. Since indexing billing costs are incurred based on the number of days that the logs are retained, use the `retention_period` tag to associate each log with its retention period to see cost attribution.

Datadog recommends using the following method to configure the `retention_period` tag:

1. [Create a new `index_name` attribute](#create-a-new-index_name-attribute).
2. [Create a new `retention_period` attribute](#create-a-new-retention_period-attribute).
3. [Create a Remapper to convert the `retention_period` attribute to a tag](#create-a-remapper-to-convert-the-retention_period-attribute-to-a-tag).

#### Create a new `index_name` attribute

Use a [Category Processor][6] to create a new `index_name` attribute for identifying the index to which the logs are routed.

1. Navigate to the pipeline previously created and click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, "Create index_name attribute".
4. Enter **index_name** in the **Set target category attribute** field. This creates an `index_name` attribute.
5. Add a category for each index. For example, if you have an index named `retention-7` for all logs tagged with `env:staging`:
    {{< img src="logs/faq/logs_cost_attribution/indexes_configuration.png" alt="The indexes list showing the filter query, retention period, and whether online archives is enabled for the retention-30, retention-15, retention-7, and demo indexes" >}} 
Then, in the **Populate category** section:  
      a. Enter `env:staging` in the **All events that match** field.  
      b. Enter `retention-7` in the **Appear under the value name** field.  
      c. Click **Add**
6. Add the other indexes as separate categories.
7. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/indexes_category_processor.png" alt="The category processor form fill in with data to create an index_name attribute" style="width:75%" >}} 

#### Create a new `retention_period` attribute

Use a [Category Processor][6] to create a new `retention_period` attribute to associate the index with its retention period.

1. Navigate to the pipeline and click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, "Create retention_period attribute".
4. Enter `retention_period` in the **Set target category attribute** field. This creates a `retention_period` attribute.
5. Add a category for each retention period. For example, if you have a 7-day retention index named `retention-7`, then in the **Populate category** section:  
      a. Enter `@index_name:(retention-7)` in the **All events that match** field.  
      b. Enter `7` in the **Appear under the value name** field.  
      c. Click **Add**
6. Add the other retention periods as separate categories.
7. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/retention_period_processor.png" alt="The category processor form fill in with data to create a retention_period attribute" style="width:75%" >}} 

#### Create a remapper to convert the `retention_period` attribute to a tag

1. Navigate to the pipeline and click **Add processor**.
2. Select **Remapper** for the processor type.
3. Enter a name for the processor. For example, "Convert retention_period attribute to tag".
4. In the **Set attribute(s) or tag key to remap** section, select **Attribute(s)** and enter `retention_period`.
5. In the **Set target attribute or tag key** section, select **Tag key** and enter `retention_period`.
6. Disable **Preserve source attribute** to make sure the attribute is removed and only the tag is kept.
7. Enable **Override on conflict**.
8. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/retention_period_remapper.png" alt="The create remapper form showing all the data filled in to create a retention_period remapper" style="width:75%" >}}

### Create an `online_archives` tag

<div class="alert alert-warning">Datadog recommends that you set up the <code>online_archives</code> tag even if none of your indexes have online archives enabled. This ensures that if you start using Online Archives, the relevant logs are tagged with <code>online_archives</code>.</div>

The `online_archives` tag indicates whether or not your logs have been routed to Online Archives. Since Online Archives are charged differently than standard indexing, use the `online_archives` tag to determine which logs have been routed to Online Archives and see cost attribution.

Datadog recommends using the following method to configure the `online_archive` tag:

#### Create an `online_archives` attribute

Use a [Category Processor][6] to create a new `online_archives` attribute to indicate whether or not the associated index has Online Archives enabled.

1. Navigate to the pipeline previously created and click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, "Create online_archives attribute". This creates an `online_archives` attribute.
4. In the **Populate category** section, add two categories:
      <br> In the **first category**, the value `true` is assigned to all indexes with Online Archives enabled. For example, if logs in the index named `retention-30` go into Online Archives:  
      a. Enter `@index_name:(retention-30)` in the **All events that match** field.  
      b. Enter `true` in the **Appear under the value name** field.  
      c. Click **Add**
      <br> In the **second category**, the value `false` is assigned to all other indexes.  
      a. Enter `*` in the **All events that match** field.  
      b. Enter `false` in the **Appear under the value name** field.   
      c. Click **Add**
5. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/online_archives_attribute.png" alt="The category processor form fill in with data to create a online_archives attribute" style="width:75%" >}}

#### Create a Remapper to convert the `online_archives` attribute to a tag

1. Navigate to the pipeline and click **Add processor**.
2. Select **Remapper** for the processor type.
3. Enter a name for the processor. For example, "Convert online_archives attribute to tag".
4. In the **Set attribute(s) or tag key to remap** section, select **Attribute(s)** and enter `online_archives`.
5. In the **Set target attribute or tag key** section, select **Tag key** and enter `online_archives`.
6. Disable **Preserve source attribute** to make sure the attribute is removed and only the tag is kept.
7. Enable **Override on conflict**.
8. Click **Create**.

<div class="alert alert-info"> The order of categories in a Category Processor is important. The attribute is assigned the value of the first category for which the log matches the matching query, with the same logic as the indexes. For this reason, be sure that the matching queries and the order of the index Category Processor are the same as the actual order of the indexes, and that the category `true` is always checked before `false` in the Online Archives Category Processor.<br><br>
If the index configurations are changed, you need to update the processor configuration to reflect the change.</div>


Datadog highly recommends automating this process by using the [Datadog API endpoints][7] to automatically retrieve and update the configuration.

### Create a `sds` tag

<div class="alert alert-warning">Datadog recommends that you still set up the <code>sds</code> tag even if you are not using the Sensitive Data Scanner. This makes sure that if you start using Sensitive Data Scanner, all the relevant logs are tagged with <code>sds</code>.</div>

The `sds` tag indicates whether or not your logs have been scanned by the Sensitive Data Scanner. Use the `sds` tag to estimate the costs associated with the specific usage of Sensitive Data Scanner.

For the Sensitive Data Scanner, billed usage is based on the volume of logs scanned, so it matches a scanning group, not a scanning rule. Therefore, you need to create a proxy scanning rule in each scanning group with a regex to match all logs. This ensures that all scanned logs are tagged.

1. Go to the [Sensitive Data Scanner][8].
2. In each scanning group:  
      a. Click **Add Scanning Rule**.  
      b. Enter `.` in the **Define Regex to match** field to match all logs.  
      c. Select **Entire Event** in the **Scan the entire event or a portion of it** field.  
      d. Enter `sds:true` in the **Add tags** field.  
      e. Leave **Define action on match** on **No action**.  
      f. Enter a name for the scanning rule. For example, "Create sds tag".  
      g. Click **Create**.  

## Generate custom logs metrics

Datadog provides a set of [logs usage metrics][3] so that you can see estimated usage. However, since these metrics cannot be modified, you can generate custom logs metrics for your specific log usage cases instead.

Since usage is measured either in gigabytes (GB) or in millions of events depending on the product, you need to generate two different metrics:

- A metric that counts the number of bytes ingested.
- A metric that counts the number of events ingested.

When setting up custom metrics, the tags in the `group by` field are the dimensions of your metric. Use these fields to filter and aggregate the metrics once they are generated. Make sure to include the following tags in the `group by` field:

- `datadog_index`, if the log is routed, the tag contains the name of the index to which the log is routed.
- `datadog_is_excluded` indicates whether the log is rejected by an exclusion filter in the routed index.
- All the custom tags you have configured above (`team`, `retention_period`, `online_archives`, and `sds`).

See [Generate a log-based metric][9] for instructions on generating the metrics. 

<div class="alert alert-info">It is crucial that you ensure all relevant tags are included in the metric's dimensions because updating a metric's configuration (such as changing the query filters, dimensions, and so on) is not retroactively applied to logs that have already been ingested.</div>

{{< img src="logs/faq/logs_cost_attribution/bytes_injected_metric.png" alt="The new metric form showing logs.estimated.usage.ingested_bytes as the metric name and the group by field with the tags mentioned" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/events_injected_metric.png" alt="The new metric form showing logs.estimated.usage.ingested_events as the metric name and the group by field with the tags mentioned" style="width:75%" >}}

## Create a dashboard using the custom logs metrics

There are several ways to use the generated custom log metrics in Datadog. The metrics can be displayed in dashboards, alerted on, used in Notebooks, queried in the Metrics Explorer, and more.

Datadog recommends that you [create a dashboard][10] with a [table widget][11] for each of the following products to track their usage:

- Log Ingestion
- Sensitive Data Scanner for logs
- Log Indexing by retention periods (3, 7, 15, 30 days, and so on)
- Online Archives

To create a new dashboard:

1. Navigate to the [Dashboards list][12].
2. Click **New Dashboard** in the upper right.
3. Enter a dashboard name.
4. Click **New Dashboard**.

### Create a widget for Log Ingestion usage

Datadog recommends that you configure the table widget for Log Ingestion in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. In the **Metrics** field, select the **bytes** count metric that you generated earlier to count the number of bytes ingested.
4. Select the **sum by** field and add the `team` tag to show the usage in bytes by team. You can also add other tags for your different cost buckets, for example, the `host` tag to see usage by host.
5. Add the following formula to convert usage into costs: `Usage in gigabytes` * `Unit cost for Log Ingestion`.  
      **Note**: If your contractual price per gigabyte changes, you need to update the formula manually.
6. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/logs_ingestion_metric_widget.png" alt="The widget edit form showing the data filled in for log ingestion usage" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/ingestion_widget.png" alt="The table widget showing the ingestion usage and costs broken down by team" style="width:60%" >}}

### Create a widget for Sensitive Data Scanner

Datadog recommends that you configure the table widget for the Sensitive Data Scanner in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. In the **Metrics** field, select the **bytes** count metric that you generated earlier to count the number of bytes ingested.
4. In the **from** field, enter `sds:true` to filter only for logs that have been scanned by the Sensitive Data Scanner.
5. Select the **sum by** field and add the `team` tag to show the usage in bytes by team. You can also add other tags for your different cost buckets.
6. Add the following formula to convert usage into costs: `Usage in gigabytes` * `Unit cost for the Sensitive Data Scanner`.  
      **Note**: If your contractual price per gigabyte changes, you need to update the formula manually. 
7. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/sds_metric_widget.png" alt="The widget edit form showing the data filled in for Sensitive Data Scanner logs usage" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/sds_widget.png" alt="The table widget showing Sensitive Data Scanner usage broken down by team" style="width:60%" >}}


### Create a widget for Log Indexing usage

Since indexing is charged based on the number of days the logs are retained, create one widget for each retention period.

Datadog recommends that you configure the table widget for Log Indexing in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. Select the **events** count metric that you generated earlier to count the number of events ingested.
4. In the **from** field, add the following:  
      a. `datadog_index:*` to filter to only logs that have been routed to indexes.  
      b. `datadog_is_excluded:false` to filter to only logs that have not matched any exclusion filter.  
      c. `retention_period:7` to filter to only logs that are retained for 7 days. You don't need to add this tag if you have the same retention period for all your indexes and therefore did not set up this tag earlier. If you have additional `retention_period` tags, create a separate widget for each one.
5. Select the **sum by** field, and add the `team` tag to show the usage in events, by team. You can also add other tags for your different cost buckets.
6. Add the following formula to convert usage into costs: `Usage in millions of events` * `Unit cost for 7 days of retention`. If your contractual price per million of events changes, you need to update the formula manually.
7. Click **Save**.

Create widgets for each `retention_period` tag.

{{< img src="logs/faq/logs_cost_attribution/indexing_metric_widget.png" alt="The widget edit form showing the data filled in for log indexing usage" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/7_day_indexing_widget.png" alt="The table widget showing 7-day indexing usage broken down by team" style="width:60%" >}}

### Create a widget for Online Archives usage

When Online Archives is enabled for an index, logs are duplicated and go into both:

1. Exclusion filters, logs are indexed only if they pass through exclusion filters.
2. Online Archives directly.

Therefore, exclusion filters do not apply to logs that go into the Online Archives. 

{{< img src="logs/faq/logs_cost_attribution/exclusion_filters_online_archives.png" alt="The Online Archive index showing a pipeline for exclusion filters and a pipeline for Online Archives" style="width:75%" >}}

Based on that information, Datadog recommends that you configure the table widget for Online Archives in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. In the **Metrics** field, select the **events** count metric you generated earlier that counts the number of events ingested.
4. In the **from** field, add the following:  
      - `datadog_index:*` to filter to only logs that have been routed to indexes.  
      - `online_archives:true` to filter to only logs that have also been routed to Online Archives.  
5. Select the **sum by** field and add the `team` tag to show the usage in events by team. You can also add tags for different cost buckets.
6. Add the following formula to convert usage into cost: `Usage in millions of events` * `Unit cost for Online Archives`.  
      **Note**: If your contractual price per million of events changes, you need to update the formula manually.  
7. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/online_archives_metric_widget.png" alt="The widget edit form showing the data filled in for online archives usage" style="width:75%" >}}

### Create a widget for total usage and costs

You can aggregate all products into a single widget to get visibility into the total usage and costs. Datadog recommends that you configure the table widget in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. Add all queries and formulas created in the other widgets to this widget:
    - [Log Ingestion](#create-a-widget-for-log-ingestion-usage)
    - [Sensitive Data Scanner for logs](#create-a-widget-for-sensitive-data-scanner)
    - [Log Indexing](#create-a-widget-for-log-indexing-usage)
    - [Online Archives](#create-a-widget-for-online-archives-usage)
4. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/all_metrics_widget.png" alt="The graph your data section of the table widget showing six different metrics" style="width:75%" >}}

### Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30602/log-management---estimated-usage
[2]: https://app.datadoghq.com/billing/usage
[3]: /logs/log_configuration/logs_to_metrics/#logs-usage-metrics
[4]: https://app.datadoghq.com/logs/pipelines
[5]: /getting_started/tagging/#tagging-methods
[6]: /logs/log_configuration/processors/?tab=ui#category-processor
[7]: /logs/log_configuration/processors/?tab=api#category-processor
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[9]: /logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric
[10]: /dashboards/#new-dashboard
[11]: /dashboards/widgets/table/
[12]: https://app.datadoghq.com/dashboard/lists
