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

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" >}}

In this view you can:

* [Build a context to explore your logs](#context).
* [Visualize your logs as a filtered Logstream or Log Analytics](#visualization).
* [Setup your log explorer view by creating facets and measure from your logs](#setup).
* [Export the content of your Log explorer view to a monitor, a dashboard, or into a CSV file.](#export)

## Context

Build up a context to explore your logs in your log explorer view first by selecting the proper time range then by using the search bar to filter your Logstream and Log Analytics.

### Time Range

The time range feature allows you to display logs in the Logstream or Log Analytics within a given time period.
It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show timeline** check box in the Logstream option panel.

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Timerange" responsive="true" >}}

### Search

Use facets, measures, tags, or even [free text search][1] to filter your Logstream and Log Analytics with dedicated context. The search bar and url automatically reflect your selections.

Follow the [guide to search your logs][1] for a detailed explanation of all the Log Explorer search features, including use of wildcards and queries of numerical values.

{{< img src="logs/explorer/search_your_logs.mp4" alt="Search your logs" video="true" responsive="true" >}}

### Saved views

Use Saved Views to automatically configure your Log Explorer with a preselected set of facets, measures, searches, time ranges, and visualizations.

Check the dedicated [saved views documentation][2] to learn more.

## Visualization

Switch between the Logstream and the Log Analytics modes by clicking on the *Log Mode* button in the upper left corner of the page:

{{< tabs >}}
{{% tab "Logstream" %}}

The Logstream is the list of logs that match the selected context. A context is defined by a [search bar][1] filter and a [time range](#time-range).


### Logs Table

The logstream is displayed in the logs table.

Configure the logs table content according to your needs and preferences with the "Options" button. Among your custom attributes, only faceted or measures attributes are available for columns.

Log results are sorted by date—the most recent on top by default. You can also inverse-sort by date, with the least recent (within the limits of the time range) on top.

{{< img src="logs/explorer/logtable_config.png" alt="configure display table" responsive="true" style="width:50%;">}}



### Log Panel

Click on any log line to open the log panel and see more details about it: raw message, extracted attributes, and tags (with host, service, and source tags on top).

Some standard attributes—for instance, `error.stack`, `http.method`, or `duration`—have specific highlighted displays in the Log Panel for better readability. Make sure you extract corresponding information from your logs and remap your attributes with [standard attribute remappers][2].


Interact with the attributes names and values in the lower JSON section to:

* Build or edit a facet or measure from an attribute. This action does not apply to anterior logs.
* Add or remove a column from the logs table.
* Append the search request with specific values (include or exclude)

{{< img src="logs/explorer/attribute_actions.png" alt="configure display table" responsive="true" style="width:20%;">}}


Interact with the upper reserved attributes section:

* with **Host**, to access the host dashboard or append the search request with the `host` of the log.
* with **Service**, to see the trace in APM, append the search request with the trace ID (both require a `trace_id` attribute in the log: refer to [trace injection in logs][3]) or append search request with the `service` of the log.
* with **Source**, to append the search request with the `source` of the log.


The **View in context** button updates the search request in order to show you the log lines dated just before and after a selected log—even if they don't match your filter. This context is different according to the situation, as Datadog uses the `Hostname`, `Service`, `filename`, and `container_id` attributes, along with tags, in order find the appropriate context for your logs.

Copy the JSON log content to the clipboard through the **Export** button or keyboard interaction (Ctrl+C/Cmd+C).

{{< img src="logs/explorer/upper_log_panel.png" alt="configure display table" responsive="true" style="width:50%;">}}


[1]: /logs/explorer/search
[2]: /logs/processing/attributes_naming_convention
[3]: /tracing/advanced/connect_logs_and_traces
{{% /tab %}}
{{% tab "Log Analytics" %}}

After having gone through [Datadog processing][1], log parsing, and having [facets](#facets) and [measures](#measures) over the important attributes, you can graph log queries and see maximums, averages, percentiles, unique counts, and more.

Follow the [log graphing guide][2] to learn more about all the graphing options.

{{< img src="logs/explorer/log_analytics.png" alt="Log Analytics" responsive="true" style="width:70%;">}}


[1]: /logs/processing
[2]: /logs/explorer/analytics
{{% /tab %}}
{{% tab "Log Patterns" %}}

Investigating large volumes of log data can be time consuming: you can spend hours on them and still understand only a fraction of them. However, applicative logs often look the same with some fraction of them varying. These what we call *patterns*.

In the Log Explorer, patterns can be surfaced automatically to bring structure to the problem and help you quickly see what matters—exclude what's irrelevant.

Find out more in the [Log Patterns section][1]

{{< img src="logs/explorer/log_patterns.png" alt="Log Patterns" responsive="true" style="width:70%;">}}


[1]: /logs/explorer/patterns
{{% /tab %}}
{{< /tabs >}}

## Setup

After being processed with the help of pipelines and processors, your logs attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [Log Analytics][3].

Note: To leverage the most out of your Log explorer view, make sure your logs attributes follow [Datadog attribute naming convention][4].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics, such as the number of logs represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples facets may include users, services, etc...

{{< img src="logs/explorer/facets_demo.png" alt="Facets demo" responsive="true" style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a facet or in the search, click on it and add it as a facet:

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], [the Facet Panel](#facet-panel), and in the [Log Analytics query][2].


[1]: /logs/explorer/search
[2]: /logs/explorer/analytics
{{% /tab %}}


{{% tab "Measures" %}}

A measure is a attribute with a numerical value contained in your logs.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your log:

{{< img src="logs/explorer/create_a_mesure.png" alt="Create a measure" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], the Facet Panel, and in the [Log Analytics query][2].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the Log Explorer columns, Log stream widgets in dashboards, and Log Analytics.

{{< img src="logs/explorer/edit_a_measure.png" alt="Edit a measure" responsive="true" style="width:50%;">}}


[1]: /logs/explorer/search
[2]: /logs/explorer/analytics
{{% /tab %}}
{{< /tabs >}}

## Export

Export your current Log Visualization with the *Export* functionality:

{{< tabs >}}
{{% tab "Logstream" %}}

{{< img src="logs/explorer/export.png" alt="view logs button" responsive="true" style="width:30%;">}}

| Button                | Description                                                                                                          |
| ----                  | -----                                                                                                                |
| Export to Monitor     | Export the query applied to your Logstream in order to create the log monitor query for a new [log monitor][1]       |
| Export to CSV         | Export your current Logstream view with its selected column into a CSV file. You can export up to 5000 logs at once. |


[1]: /monitors/monitor_types/log
{{% /tab %}}
{{% tab "Log Analytics" %}}

{{< img src="logs/explorer/export_log_analytics.png" alt="view logs button" responsive="true" style="width:30%;">}}

| Button              | Description                                                                                                                                                                  |
| ----                | -----                                                                                                                                                                        |
| Export to Monitor   | Export the query applied to your Log Analytics in order to create the log monitor query for a new [log monitor][1] *This functionality is not available yet.*                |
| Export to Timeboard | Export your Log Analytics as a widget to a [Timeboard][2]. |


[1]: /monitors/monitor_types/log
[2]: /graphing/dashboards/timeboard
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/saved_views
[3]: /logs/explorer/analytics
[4]: /logs/processing/attributes_naming_convention
