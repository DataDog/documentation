---
title: Logs Cost Attribution
kind: faq
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

Datadog has features to provide logs usage information, such as the [Log Estimated Usage dashboard][1], the [Plan and Usage][2] section in the app, and the available [logs usage metrics][3]. However, there might be situations where you want visibility into specific cost attribution data. For example, understanding the cost attribution to specific teams.

This guide uses that example to walk you through how to set up custom tags, generate custom metrics that use those tags, and create widgets for the custom metrics in a dashboard. The dashboard gives you an overview of your logs usage and costs broken down by teams.

{{< img src="logs/faq/logs_cost_attribution/cost_attribution_dashboard.png" alt="A dashboard showing table widgets for usage and cost broken down by teams for ingestion, Sensitive Data Scanner, seven days indexing, and 15 days indexing. " style="width:85%" >}}

## Configure custom tags

Use custom tags to break down custom log usage metrics into categories that are relevant to your use case.

The first tag can be any object to which you want to attribute costs, such as departments, teams, projects, products, regions, data centers, and so on. For the use case of attributing costs to teams, create a `team` tag.

Then, create the following tags:

- `retention_period` for indicating the number of days for which logs will be retained in Datadog indexes.
- `online_archives` for indicating whether logs have been routed to Online Archives or not.
- `sds` for indicating whether logs have been scanned by the Sensitive Data Scanner or not.

### Create a `team` tag

Datadog recommends that you use one of these [tagging methods][4] to configure the tag **before ingestion**.

However, if it is necessary to configure the tag during ingestion, use processors and remappers to create a new `team` attribute and then remap it to a tag, or directly remap it from another attribute that you are using for logs cost attribution. You can use this process to create any number of cost attribution dimensions to break down your log usage.

Create the processors and remappers in the pipelines that filter your logs by teams. If you don’t have these pipelines, create [new pipelines][5] to filter logs based on the different teams first. Position these new pipelines after the other pipelines that the logs go through to accommodate any tags or attributes that are created in those pipelines.

#### Create a new `team` attribute

Use a [String Builder Processor][6] to create a new `team` attribute for your logs.

1. Navigate to the pipeline, click **Add processor**.
2. Select **String Builder Processor** for the processor type.
3. Enter a name for the processor. For example, “Create team attribute”.
4. Enter **team** in the *Set the target attribute path* field. If you are breaking down your logs usage by a different attribute (for example, project, region, so on), then enter in the relevant attribute name.
5. Enter the team name in the *Set the target attribute value* field. For example, if you enter “service_a”, then `team:service_a` is added as an attribute.
6. Click **Create**.
7. Add a String Builder Processor to each pipeline that is filtering logs to a different team or the attribute that you are using for cost attribution

#### Create a remapper to convert the `team` attribute to a tag

1. Navigate to the pipeline, click **Add processor**.
2. Select **Remapper** for the processor type.
3. Enter a name for the processor. For example, “Convert team attribute to tag”.
4. In the *Set attribute(s) or tag key to remap* section, select **Attribute(s)** and enter `team`.
5. In the *Set target attribute or tag key* section, select **Tag key** and enter `team`.
6. Disable **Preserve source attribute** to make sure the attribute is removed and only the tag is kept.
7. Enable **Override on conflict**.
8. Click **Create**.
9. Add a remapper to the other pipelines filtering by teams.

{{< img src="logs/faq/logs_cost_attribution/team_remapper.png" alt="The create remapper form showing all the data filled in to create a team remapper" style="width:75%" >}}

### Create a `retention_period` tag

<div class="alert alert-warning">Datadog recommends that you set up the `retention_period` tag even if your indexes all have the same retention period currently. This makes sure that if you start using multiple retention periods, all logs are tagged with its retention period.</div>

The `retention_period`  tag is the number of days your logs are retained in Datadog indexes. Since indexing is charged based on the number of days that the logs are retained, use the `retention_period` tag to associate each log with its retention period.

Datadog recommends the following way to configure the `retention_period` tag:

1. [Create a new pipeline for adding custom tags](#create-a-new-pipeline-for-adding-custom-tags).
2. [Create a new `index_name` attribute](#create-a-new-indexname-attribute).
3. [Create a new `retention_period` attribute](#create-a-retentionperiod-tag).
4. [Create a Remapper to convert the `retention_period` attribute to a tag](#create-a-remapper-to-convert-the-retentionperiod-attribute-to-a-tag).

#### Create a new pipeline for adding custom tags

1. Go to [Logs Pipelines][7]. 
2. Click **Add a new pipeline**. 
3. Enter `*` for the **Filter** field to make sure all logs go through the pipeline.
4. Enter a name and description for the pipeline. 
5. Click **Create**.

Also use this pipeline when you create the category processors and remappers for the `online_archives` and `sds` tags later on.

{{< img src="logs/faq/logs_cost_attribution/pipeline_processors.png" alt="A pipeline showing the category processors, in order, for index name, retention period, and online archives, and then the remappers for retention period and online archives." >}}

#### Create a new `index_name` attribute

Use a [Category Processor][8] to create a new `index_name` attribute for identifying the index to which the logs are routed.

1. Navigate to the new pipeline, click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, “Create index_name attribute”.
4. Enter **index_name** in the *Set target category attribute* field. This creates an `index_name` attribute.
5. Add a category for each index. For example, if you have an index named `retention-7` for all logs tagged with `env:staging`:
    {{< img src="logs/faq/logs_cost_attribution/indexes_configuration.png" alt="The indexes list showing the filter query, retention period, and whether online archives is enabled for the retention-30, retention-15, retention-7, and demo indexes" >}} 
Then, in the *Populate category* section:  
      a. Enter `env:staging` in the *All events that match* field.  
      b. Enter `retention-7` in the *Appear under the value name* field.  
      c. Click **Add**
6. Add the other indexes as separate categories.
7.  Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/indexes_category_processor.png" alt="The category processor form fill in with data to create an index_name attribute" style="width:75%" >}} 

#### Create a new `retention_period` attribute

Use a [Category Processor][8] to create a new `retention_period` attribute to associate the index with its retention period.

1. Navigate to the pipeline again, click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, “Create retention_period attribute”.
4. Enter **retention_period** in the *Set target category attribute* field. This creates a `retention_period` attribute.
5. Add a category for each retention period. For example, if you have a 7-day retention index named `retention-7`, then in the *Populate category* section:  
      a. Enter `@index_name:(retention-7)` in the *All events that match* field.  
      b. Enter `7` in the *Appear under the value name* field.  
      c. Click **Add**
6. Add the other retention periods as separate categories.
7. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/retention_period_processor.png" alt="The category processor form fill in with data to create a retention_period attribute" style="width:75%" >}} 

#### Create a remapper to convert the `retention_period` attribute to a tag

1. Navigate to the pipeline again, click **Add processor**.
2. Select **Remapper** for the processor type.
3. Enter a name for the processor. For example, “Convert retention_period attribute to tag”.
4. In the *Set attribute(s) or tag key to remap* section, select **Attribute(s)** and enter **retention_period**.
5. In the *Set target attribute or tag key* section, select **Tag key** and enter `retention_period`.
6. Disable **Preserve source attribute** to make sure the attribute is removed and only the tag is kept.
7. Enable **Override on conflict**.
8. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/retention_period_remapper.png" alt="The create remapper form showing all the data filled in to create a retention_period remapper" style="width:75%" >}}

### Create an `online_archives` tag

<div class="alert alert-warning">Datadog recommends that you set up the `online_archives` tag even if none of your indexes have online archives enabled currently. This makes sure that if you start using Online Archives, all the relevant logs are tagged with `online_archives`.</div>

The `online_archives` tag indicates whether or not your logs have been routed to Online Archives. Since Online Archives are charged differently than standard indexing, use the `online_archives` tag to determine which logs have been routed to Online Archives.

Datadog recommends the following way to configure the `online_archive` tag:

**Note**: Use the same pipeline and the same index Category Processor you created for the `retention_period` tag.

#### Create an `online_archives` attribute

Use a [Category Processor][8] to create a new `online_archives` attribute to indicate whether or not the associated index has Online Archives enabled.

1. Navigate to the pipeline previously created, click **Add processor**.
2. Select **Category Processor** for the processor type.
3. Enter a name for the processor. For example, “Create online_archives attribute”. This creates an `online_archives` attribute.
4. In the **Populate category** section, add two categories:
      <br> In the *first category*, the value `true` is assigned to all indexes with Online Archives enabled. For example, if logs in the index named `retention-30` go into Online Archives:  
      a. Enter `@index_name:(retention-30)` in the *All events that match* field.  
      b. Enter **true** in the **Appear under the value name** field.  
      c. Click **Add**
      <br> In the *second category*, the value `false` is assigned to all other indexes.  
      a. Enter `*` in the **All events that match** field.  
      b. Enter **false** in the **Appear under the value name** field.   
      c. Click **Add**
5. Click **Create**.

{{< img src="logs/faq/logs_cost_attribution/online_archives_attribute.png" alt="The category processor form fill in with data to create a online_archives attribute" style="width:75%" >}}

#### Create a Remapper to convert the `online_archives` attribute to a tag

1. Navigate to the pipeline again, click **Add processor**.
2. Select **Remapper** for the processor type.
3. Enter a name for the processor. For example, “Convert online_archives attribute to tag”.
4. In the **Set attribute(s) or tag key to remap** section, select **Attribute(s)** and enter **online_archives**.
5. In the **Set target attribute or tag key** section, select **Tag key** and enter **online_archives**.
6. Disable **Preserve source attribute** to make sure the attribute is removed and only the tag is kept.
7. Enable **Override on conflict**.
8. Click **Create**.

<div class="alert alert-info"> The order of categories in a Category Processor is important. The attribute is assigned the value of the first category for which the log matches the matching query, with the same logic as the indexes. For this reason, make sure that the matching queries and the order of the index Category Processor are in the same as the actual order of the indexes, and that the category `true` is always checked before `false` in the Online Archives Category Processor.<br><br>
If the index configurations are changed, you need to update the processor configuration to reflect the change.</div>


Datadog highly recommends automating this process by using the [Datadog API endpoints][9] to automatically retrieve and update the configuration.

### Create a `sds` tag

<div class="alert alert-warning">Datadog recommends that you still set up the `sds` tag even if you are not using the Sensitive Data Scanner. This makes sure that if you start using Sensitive Data Scanner, all the relevant logs are tagged with `sds`.</div>

The `sds` tag indicates whether or not your logs have been scanned by the Sensitive Data Scanner. Use the `sds` tag to estimate the costs associated with the specific usage of Sensitive Data Scanner.

For the Sensitive Data Scanner, billed usage is based on the volume of logs scanned, so it matches a scanning group, not  a scanning rule. Therefore, you need to create a proxy scanning rule in each scanning group, with a regex to match all logs, to ensure that all scanned logs are tagged.

1. Go to the [Sensitive Data Scanner][10].
2. In each scanning group, click **Add Scanning Rule**.
3. Enter **.** in the *Define Regex to match* field to match all logs.
4. Select **Entire Event** in the *Scan the entire event or a portion of it* field.
5. Enter **sds:true** in the *Add tags* field.
6. Leave *Define action on match* on **No action**.
7. Enter a name for the scanning rule. For example, “Create sds tag”.
8. Click **Create**. 

## Generate custom logs metrics

Datadog provides a set of [logs usage metrics][3]. However, since these metrics cannot be modified, generate custom logs metrics for your specific log usage cases.

Since usage is measured either in gigabytes (GB) or in millions of events depending on the product, you need to generate two different metrics:

- A metric that counts the number of bytes ingested.
- A metric that counts the number of events ingested.

When setting up the custom metrics, the tags in the `group by` field are the dimensions of your metric. Use these fields to filter and aggregate the metrics once they are generated. Make sure to include the following tags in the `group by` field:

- `datadog_index`, if the log is routed, the tag contains the name of the index to which the log is routed.
- `datadog_is_excluded` indicates whether the log is rejected by an exclusion filter in the routed index.
- All the custom tags you have configured above (`team`, `retention_period`, `online_archives`, and `sds`).

See [Generate a log-based metric][11] for instructions on generating the metrics. 

<div class="alert alert-info">It is crucial that you ensure all relevant tags are included in the metric’s dimensions because updating a metric’s configuration (such as changing the query filters, dimensions, and so on) is not retroactively applied to logs that have already been ingested</div>

{{< img src="logs/faq/logs_cost_attribution/bytes_injected_metric.png" alt="The new metric form showing logs.estimated.usage.ingested_bytes as the metric name and the group by field with the tags mentioned" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/events_injected_metric.png" alt="The new metric form showing logs.estimated.usage.ingested_events as the metric name and the group by field with the tags mentioned" style="width:75%" >}}

## Using the custom logs metrics

There are several ways to use the generated custom log metrics in Datadog. The metrics can be displayed in dashboards, alerted on, used in Notebooks, queried in the Metrics Explorer, and more.

Datadog recommends that you [create a dashboard][12] with a [table widget][13] for each of the following products to track usage for:

- Log Ingestion
- Sensitive Data Scanner for logs
- Log Indexing by retention periods (3, 7, 15, 30 days, and so on)
- Online Archives


### Create a widget for Log Ingestion usage

Datadog recommends that you configure the table widget for Log Ingestion in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. In the *Metrics* field, select the **bytes** count metric that you generated earlier to count the number of bytes ingested.
4. Select the **sum by** field and add the `team` tag to show the usage in bytes by team. You can also add other tags for your different cost buckets, such as `host` to see usage by host.
5. Add the following formula to convert usage into costs: `Usage in gigabytes` * `Unit cost for Log Ingestion`. If your contractual price per gigabyte changes, you will need to update the formula manually.
6. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/logs_ingestion_metric_widget.png" alt="The widget edit form showing the data filled in for log ingestion usage" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/ingestion_widget.png" alt="The table widget showing the ingestion usage and costs broken down by team" style="width:60%" >}}

### Create a widget for Sensitive Data Scanner

Datadog recommends that you configure the table widget for the Sensitive Data Scanner in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. In the *Metrics* field, select the **bytes** count metric that you generated earlier to count the number of bytes ingested.
4. In the *from* field, enter **sds:true** to filter for only logs that have been scanned by the Sensitive Data Scanner.
5. Select the **sum by** field and add the `team` tag  to show the usage in bytes by team. You can also add other tags for your different cost buckets.
6. Add the following formula to convert usage into costs: `Usage in gigabytes` * `Unit cost for the Sensitive Data Scanner`. If your contractual price per gigabyte changes, you will need to update the formula manually.
7. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/sds_metric_widget.png" alt="The widget edit form showing the data filled in for Sensitive Data Scanner logs usage" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/sds_widget.png" alt="The table widget showing Sensitive Data Scanner usage broken down by team" style="width:60%" >}}


### Create a widget for Log Indexing usage

Since indexing is charged based on the number of days the logs are retained, create one widget for each retention period.

Datadog recommends that you configure the table widget for Log Indexing in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. Select the **events** count metric that you generated earlier to count the number of events ingested.
4. In the *from* field, add the following:  
      a. `datadog_index:*` to filter to only logs that have been routed to indexes. 
      b. `datadog_is_excluded:false` to filter to only logs that have not matched any exclusion filter.  
      c. `retention_period:7` to filter to only logs that are retained for 7 days. This value will be different for each widget. You don’t need to add this tag if you have the same retention period for all your indexes and therefore did not set up this tag.
5. Select the **sum by** field, and add the `team` tag to show the usage in events, by team. You can also add other tags for your different cost buckets.
6. Add the following formula to convert usage into costs: `Usage in millions of events` * `Unit cost for 7 days of retention`. If your contractual price per million of events changes, you will need to update the formula manually.
7. Click **Save**.

{{< img src="logs/faq/logs_cost_attribution/indexing_metric_widget.png" alt="The widget edit form showing the data filled in for log indexing usage" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/7_day_indexing_widget.png" alt="The table widget showing 7-day indexing usage broken down by team" style="width:60%" >}}

### Create a widget for Online Archives usage

When Online Archives is enabled for an index, logs are duplicated and go into both:

1. Exclusion filters, they are indexed only if they pass through exclusion filters.
2. Online Archives directly.

Therefore, exclusion filters do not apply to logs that go into the Online Archives. 

{{< img src="logs/faq/logs_cost_attribution/exclusion_filters_online_archives.png" alt="The Online Archive index showing a pipeline for exclusion filters and a pipeline for Online Archives" style="width:75%" >}}

Based on that information, Datadog recommends that you configure the table widget for Online Archives in the following way:

1. In the dashboard, click **Add Widgets**. 
2. Select the **Table** widget.
3. In the *Metrics* field, select the **events** count metric you generated earlier that counts the number of events ingested.
4. In the *from* field, add the following:
`datadog_index:*` to filter to only logs that have been routed to indexes.
`online_archives:true` to filter to only logs that have also been routed to Online Archives.
5. Select the **sum by** field and add the `team` tag to show the usage in events, by team. You can also add other tags for your different cost buckets.
6. Add the following formula to convert usage into cost: `Usage in millions of events` * `Unit cost for Online Archives`. If your contractual price per million of events changes, you will need to update the formula manually.
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
[4]: /getting_started/tagging/#tagging-methods
[5]: /logs/log_configuration/pipelines/?tab=source#create-a-pipeline
[6]: /logs/log_configuration/processors/?tab=ui#string-builder-processor
[7]: https://app.datadoghq.com/logs/pipelines
[8]: /logs/log_configuration/processors/?tab=ui#category-processor
[9]: /logs/log_configuration/processors/?tab=api#category-processor
[10]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[11]: /logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric
[12]: /dashboards/#new-dashboard
[13]: /dashboards/widgets/table/
