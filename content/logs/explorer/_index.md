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

{{< img src="logs/explorer/search_your_logs.gif" alt="Search your logs" responsive="true" >}}

### Saved views

Use Saved Views to automatically configure your Log Explorer with a preselected set of facets, measures, searches, time ranges, and visualizations.

Check the dedicated [saved views documentation][2] to learn more.

## Visualization

Switch between the Logstream and the Log Analytics modes by clicking on the *Log Mode* button:

{{< img src="logs/explorer/log_graph_switch.png" alt="Log Analytics switch" responsive="true" style="width:40%;">}}

{{< tabs >}}
{{% tab "Logstream" %}}

The Logstream is the list of logs that match the selected context. A context is defined by a [search bar][1] filter and a [time range](#time-range).

{{< img src="logs/explorer/logstream.png" alt="Logstream" responsive="true" style="width:80%;">}}

If you enter a valid query into the [search bar](#search-bar), words that match your query are highlighted, and the logs displayed match your facet criteria.

Sort the list by clicking the **date** column header.

Click on any log line to see more details about it:

{{< img src="logs/explorer/log_in_log_list.png" alt="Log in Logstream" responsive="true" style="width:80%;">}}

Click on `View in context` to see log lines dated just before and after a selected log—even if they don't match your filter.

{{< img src="logs/explorer/view-in-context.gif" alt="View in context" responsive="true" >}}

The context is different according to the situation as we use the `Hostname`, `Service`, `filename`, or `container_id` attributes, along with tags, to make sure we find the perfect context for your logs.

Click the **Columns** button and select any facets you want to see to add more log details to your Logstream:

{{< img src="logs/explorer/log_list_with_columns.png" alt="Logstream with columns" responsive="true" style="width:80%;">}}

Choose to display one, three, or ten lines from your logs `message` attributes in your Logstream:

{{< img src="logs/explorer/multi_line_display.png" alt="Multi-line display" responsive="true" style="width:30%;">}}

**Note**:  If present, the `error.stack` attribute is displayed in priority as it should be used for stack traces.
Remap any stack trace attribute to this specific attribute with [the attribute remapper Processor][2].


[1]: /logs/explorer/search
[2]: /logs/processing/processors/#remapper
{{% /tab %}}
{{% tab "Log Analytics" %}}

After having gone through [Datadog processing][1], log parsing, having [facets](#facets) and [measures](#measures) over the important attributes, you can graph log queries and see maximums, averages, percentiles, unique counts, and more.

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

A measure is a attribute with a numerical value contained in your logs. Think of it as a "log metric".

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
| Export to Timeboard | Export your Logstream as a widget to a [Timeboard][2]. **This functionality is still in beta, [contact the Datadog support team][3] to activate it for your organization.** |


[1]: /monitors/monitor_types/log
[2]: /graphing/dashboards/timeboard
[3]: /help
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/saved_views
[3]: /logs/explorer/analytics
[4]: /logs/processing/attributes_naming_convention
