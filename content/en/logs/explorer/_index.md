---
title: Log Explorer
kind: documentation
description: "Search through all of your logs and perform Log Analytics"
aliases:
    - /logs/explore
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: Documentation
  text: "Automatically configure your Log Explorer"
- link: "logs/explorer/patterns"
  tag: Documentation
  text: "Detect patterns inside your logs"
---

The Logs Explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Explore view with comments"  >}}

In this view you can:

* [Build a context to explore your logs](#context).
* [Visualize your logs as a filtered Logstream or Log Analytics](#visualization).
* [Setup your log explorer view by creating facets and measure from your logs](#setup).
* [Share the content of your explorer view to another page within or outside of Datadog.](#share-views)

## Context

Build up a context to explore your logs in your log explorer view first by selecting the proper time range then by using the search bar to filter your Logstream and Log Analytics.

### Time Range

The time range feature allows you to display logs in the Logstream or Log Analytics within a given time period.
It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show timeline** check box in the Logstream option panel.

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Timerange"  >}}

### Search

Use facets, measures, tags, or even [free text search][1] to filter your Logstream and Log Analytics with dedicated context. The search bar and url automatically reflect your selections.

Follow the [guide to search your logs][1] for a detailed explanation of all the Log Explorer search features, including use of wildcards and queries of numerical values.

{{< img src="logs/explorer/search_your_logs.mp4" alt="Search your logs" video="true"  >}}

### Saved views

Use saved views to automatically configure your log explorer with a preselected set of facets, measures, searches, time ranges, and visualizations. Check the dedicated [saved views documentation][2] to learn more.

### Share views

Export your current log visualization with the *share* functionality:

{{< img src="logs/explorer/send_view_to.png" alt="Send view to"  style="width:60%;">}}

Use the *share* button to send your current log explorer view to a CSV file, team member, or create a monitor:

{{< tabs >}}
{{% tab "Log Search" %}}

| Button            | Description                                                                                                          |
|-------------------|----------------------------------------------------------------------------------------------------------------------|
| Export to Monitor | Export the query applied to your logstream to create the query for a new [log monitor][1].       |
| Export to CSV     | Export your current logstream view with its selected columns to a CSV file. You can export up to 5,000 logs at once. |
| Share View     | Share a link to the current view with your teammates through Email, Slack, and more. See all [Datadog notification integrations][2] available. |

[1]: /monitors/monitor_types/log
[2]: /integrations/#cat-notification
{{% /tab %}}
{{% tab "Log Analytics" %}}

| Button              | Description                                                                                                                                                   |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Export to Monitor   | Export the query applied to your log analytics to create the query for a new [log monitor][1]. |
| Export to Dashboard | Export the current analytic as a widget to an existing or new [dashboard][2]. |
| Generate new Metric | [Generate a new metric][3] out of the current analytic query.  |


[1]: /monitors/monitor_types/log
[2]: /dashboards/
[3]: /logs/logs_to_metrics/
{{% /tab %}}
{{< /tabs >}}

## Visualization

Switch between the Log Search and the Log Analytics modes by clicking on the *Log Mode* button in the upper left corner of the page:

{{< tabs >}}
{{% tab "Log Search" %}}

The Log Search is the list of logs that match the selected context. A context is defined by a [search bar][1] filter and a [time range](#time-range).

### Logs Table

The Log Search is displayed in the logs table.

Configure the logs table content according to your needs and preferences with the "Options" button. Among your custom attributes, only faceted or measures attributes are available for columns.

Log results are sorted by date—the most recent on top by default. You can also inverse-sort by date, with the least recent (within the limits of the time range) on top.

{{< img src="logs/explorer/logtable_config.png" alt="configure display table"  style="width:50%;">}}

### Log Panel

Click on any log line to open the log panel and see more details about it: raw message, extracted attributes, and tags (with host, service, and source tags on top).

Some standard attributes—for instance, `error.stack`, `http.method`, or `duration`—have specific highlighted displays in the Log Panel for better readability. Make sure you extract corresponding information from your logs and remap your attributes with [standard attribute remappers][2].

Interact with the attributes names and values in the lower JSON section to:

* Build or edit a facet or measure from an attribute. This action does not apply to anterior logs.
* Add or remove a column from the logs table.
* Append the search request with specific values (include or exclude)

{{< img src="logs/explorer/attribute_actions.png" alt="configure display table"  style="width:20%;">}}

Interact with the upper reserved attributes section:

* with **Host**, to access the host dashboard or append the search request with the `host` of the log.
* with **Service**, to see the trace in APM, append the search request with the trace ID (both require a `trace_id` attribute in the log: refer to [trace injection in logs][3]) or append search request with the `service` of the log.
* with **Source**, to append the search request with the `source` of the log.

The **View in context** button updates the search request in order to show you the log lines dated just before and after a selected log—even if they don't match your filter. This context is different according to the situation, as Datadog uses the `Hostname`, `Service`, `filename`, and `container_id` attributes, along with tags, in order find the appropriate context for your logs.

Use the **Share** button to share the log opened in side panel to other contexts.

* **Copy to clipboard** or `Ctrl+C` / `Cmd+C` copies the log JSON to your clipboard.
* **Share Event** shares the log (along with the underlying view) with teammates through Email, Slack, and more. See all [Datadog notification integrations][4] available.

{{< img src="logs/explorer/upper_log_panel.png" alt="configure display table"  style="width:50%;">}}

[1]: /logs/explorer/search
[2]: /logs/processing/attributes_naming_convention
[3]: /tracing/connect_logs_and_traces
{{% /tab %}}
{{% tab "Log Analytics" %}}

After having gone through [Datadog processing][1], log parsing, and having [facets](#setup) and [measures](#setup) over the important attributes, you can graph log queries and see maximums, averages, percentiles, unique counts, and more.

Follow the [log graphing guide][2] to learn more about all the graphing options.

{{< img src="logs/explorer/log_analytics.png" alt="Log Analytics"  style="width:70%;">}}

[1]: /logs/processing
[2]: /logs/explorer/analytics
{{% /tab %}}
{{% tab "Log Patterns" %}}

Investigating large volumes of log data can be time consuming: you can spend hours on them and still understand only a fraction of them. However, applicative logs often look the same with some fraction of them varying. These what we call *patterns*.

In the Log Explorer, patterns can be surfaced automatically to bring structure to the problem and help you quickly see what matters—exclude what's irrelevant.

Find out more in the [Log Patterns section][1]

{{< img src="logs/explorer/log_patterns.png" alt="Log Patterns"  style="width:70%;">}}

[1]: /logs/explorer/patterns
{{% /tab %}}
{{< /tabs >}}

## Setup

After being processed with the help of pipelines and processors, your logs attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [Log Analytics][3].

Note: To leverage the most out of your Log explorer view, make sure your logs attributes follow [Datadog attribute naming convention][4].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag and provides some basic analytics, such as the number of logs represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="logs/explorer/facets_demo.png" alt="Facets demo"  style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a facet or in the search, click on it and add it as a facet:

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], the Facet Panel, and in the [Log Analytics query][2].

[1]: /logs/explorer/search
[2]: /logs/explorer/analytics
{{% /tab %}}

{{% tab "Measures" %}}

A measure is a attribute with a numerical value contained in your logs.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your log:

{{< img src="logs/explorer/create_a_mesure.png" alt="Create a measure"  style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], the Facet Panel, and in the [Log Analytics query][2].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the Log Explorer columns, Log stream widgets in dashboards, and Log Analytics.

{{< img src="logs/explorer/edit_a_measure.png" alt="Edit a measure"  style="width:50%;">}}

[1]: /logs/explorer/search
[2]: /logs/explorer/analytics
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/saved_views
[3]: /logs/explorer/analytics
[4]: /logs/processing/attributes_naming_convention
