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
  text: Learn how to process your logs
- link: "logs/explorer/saved_views"
  tag: Documentation
  text: Automatically configure your Log Explorer
---

The Logs Explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explorer/explore_view_with_comments.png" alt="Explore view with comments" responsive="true" >}}

In this view you can: 

* [Build a context to explore your logs](#context).
* [Visualize your logs as a filtered logstream or a log analytic](#visualization).
* [Setup your log explorer view by creating facets and measure from your logs](#setup).
* [Export the content of your Log explorer view to a monitor, a dashboard, or into a CSV file.](#export)

## Context

Build up a context to explore your logs in your log explorer view first by selecting the proper Timerange then by using the search bar to filter your logstream and log analytic.

### Time Range

The Time Range allows you to display logs in the logstream or a log analytic within a given time period. 
It appears directly under the search bar as a timeline. The timeline can be displayed or wrapped up with the **Show timeline** check box in the logstream option panel.

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="logs/explorer/timerange.png" style="width:50%;" alt="Timerange" responsive="true" >}}

### Search 

Use facets, measures, tags, or even [free text search][1] to filter your log stream and log analytics with a dedicated context. The search bar and url automatically reflect your selections.

Follow the [guide to search your logs][1] for a detailed explanation of all the Log Explorer search features including use of wildcards and queries of numerical values.

{{< img src="logs/explorer/search_your_logs.gif" alt="Search your logs" responsive="true" >}}

### Saved views

Use Saved Views to automatically configure your Log Explorer with a preselected set of facets, measures, search, Timerange, and visualization.

Check the dedicated [saved views documentation][4] to learn more.

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

Click on `View in context` to see log lines dated just before and after a selected log - even if they don't match your filter.

{{< img src="logs/explorer/view-in-context.gif" alt="View in context" responsive="true" >}}

The context is different according to the situation as we use the `Hostname`, `Service`, `filename` or `container_id` attributes, along with tags to make sure we find the perfect context for your logs.


Click the **Columns** button and select any facets you want to see to add more log details to your logstream: 

{{< img src="logs/explorer/log_list_with_columns.png" alt="Logstream with columns" responsive="true" style="width:80%;">}}

Choose to display one, three, or ten lines from your logs `message` attributes in your logstream:

{{< img src="logs/explorer/multi_line_display.png" alt="Multi-line display" responsive="true" style="width:30%;">}}

**Note**:  If present, `error.stack` attribute is displayed in priority as it should be used for stack traces.
Remap any stack-trace attribute to this specific attribute with [the attribute remapper Processor][1].

[1]: /logs/explorer/search
[2]: /logs/processing/processors/#remapper

{{% /tab %}}
{{% tab "Log Analytics" %}}

After having gone through [Datadog processing][3] your logs are parsed and you have [facets](#facets) and [Measure](#measures) over the important attributes, you can graph log queries and see maximums, averages, percentiles, unique counts, and more.

Follow the [log graphing guide][5] to learn more about all the graphing option.

{{< img src="logs/explorer/log_analytics.png" alt="Log Analytics" responsive="true" style="width:70%;">}}

[3]: /logs/processing
[5]: /logs/explorer/analytics

{{% /tab %}}
{{< /tabs >}}

## Setup

After being processed with the help of pipelines and processors, your logs attributes can be indexed as a Facet or a Measure in order to be accessible for your [context](#context) creation and [log analytics][2].

Note: To leverage the most out of your Log explorer view make sure your logs attribute follow [Datadog attribute naming convention][5].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag as well as provides some basic analytics such as the amount of logs represented. This is also a switch to easily filter your data.

Facets allow you to pivot or filter your datasets based on a given attribute. Examples facets may include users, services, etc...

{{< img src="logs/explorer/facets_demo.png" alt="Facets demo" responsive="true" style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a Facet or in the search, click on it and add it as a Facet:

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], [the Facet Panel](#facet-panel), and in the [Log Analytics query][2].

{{% /tab %}}


{{% tab "Measures" %}}

A Measure is a attribute with numerical value contained in your logs. Think of it as a "log metric".

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your log:

{{< img src="logs/explorer/create_a_mesure.png" alt="Create a measure" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], the Facet Panel, and in the [Log Analytics query][2].

**Select the Measure Unit**:

All measure have their own unit that is then used for display in the Log Explorer columns, Log stream widgets in dashboards, and in the Log Analytics.

{{< img src="logs/explorer/edit_a_measure.png" alt="Edit a measure" responsive="true" style="width:50%;">}}

{{% /tab %}}
{{< /tabs >}}

## Export

Export your current Log Visualization with the *Export* functionality: 

{{< tabs >}}
{{% tab "Logstream" %}}

{{< img src="logs/explorer/export.png" alt="view logs button" responsive="true" style="width:30%;">}}

| Button                | Description                                                                                                          |
| ----                  | -----                                                                                                                |
| Export to Monitor     | Export the query applied to your Logstream in order to create the log monitor query for a new [log monitor][7]       |
| Export to Screenboard | Export your logstream as a widget to a [Screenboard][9]. *This functionality is not available yet.*                  |
| Export to CSV         | Export your current logstream view with its selected column into a CSV file. You can export up to 5000 logs at once. |

[7]: /monitors/monitor_types/log
[8]: https://app.datadoghq.com/logs
[9]: /graphing/dashboards/screenboard/

{{% /tab %}}
{{% tab "Log Analytics" %}}

{{< img src="logs/explorer/export_log_analytics.png" alt="view logs button" responsive="true" style="width:30%;">}}

| Button              | Description                                                                                                                                                                  |
| ----                | -----                                                                                                                                                                        |
| Export to Monitor   | Export the query applied to your Log Analytics in order to create the log monitor query for a new [log monitor][7] *This functionality is not available yet.*                |
| Export to Timeboard | Export your logstream as a widget to a [Timeboard][9]. **This functionality is still in beta, [contact the Datadog support team][10] to activate it for your organization.** |

[7]: /monitors/monitor_types/log
[9]: /graphing/dashboards/timeboard/
[10]: /help
[11]: /logs/explorer/analytics

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/analytics
[3]: /logs/processing
[4]: /logs/explorer/saved_views
[5]: /logs/processing/attributes_naming_convention
[10]: /help