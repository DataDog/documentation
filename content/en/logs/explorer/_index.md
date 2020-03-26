---
title: Log Explorer
kind: documentation
description: 'Search through all of your logs and perform Log Analytics'
aliases:
    - /logs/explore
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/explorer/saved_views'
      tag: Documentation
      text: 'Automatically configure your Log Explorer'
    - link: 'logs/explorer/patterns'
      tag: Documentation
      text: 'Detect patterns inside your logs'
---

The Logs Explorer is your home base for troubleshooting and exploration:

{{< img src="logs/explorer/log_explorer.png" alt="Explore view with comments"  >}}


In this view you can:

- [Build a context to explore your logs](#context).
- [Visualize your logs as a filtered Logstream or Log Analytics](#visualization).
- [Setup your log explorer view by creating facets and measure from your logs](#setup).
- [Share the content of your explorer view to another page within or outside of Datadog](#share-views).

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

Export your current log visualization with the _share_ functionality:

{{< img src="logs/explorer/send_view_to.png" alt="Send view to"  style="width:60%;">}}

Use the _share_ button to send your current log explorer view to a CSV file or team member, or create a monitor:

{{< tabs >}}
{{% tab "Log Search" %}}

| Button            | Description                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Export to Monitor | Export the query applied to your logstream to create the query for a new [log monitor][1].                                                     |
| Export to CSV     | Export your current logstream view with its selected columns to a CSV file. You can export up to 5,000 logs at once.                           |
| Share View        | Share a link to the current view with your teammates through email, Slack, and more. See all [Datadog notification integrations][2] available. |


[1]: /monitors/monitor_types/log
[2]: /integrations/#cat-notification
{{% /tab %}}
{{% tab "Log Analytics" %}}

| Button              | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Export to Monitor   | Export the query applied to your log analytics to create the query for a new [log monitor][1]. |
| Export to Dashboard | Export the current analytic as a widget to an existing or new [dashboard][2].                  |
| Generate new Metric | [Generate a new metric][3] out of the current analytic query.                                  |


[1]: /monitors/monitor_types/log
[2]: /dashboards/
[3]: /logs/logs_to_metrics/
{{% /tab %}}
{{< /tabs >}}

## Different Pages for Different Perspectives

Switch between the Log Search and the Log Analytics modes by clicking on the _Log Mode_ button in the upper left corner of the page:

### Log Lists
* The Log Search is the list of logs that match the selected context. A context is defined by a [search bar][1] filter and a [time range](#time-range).


### Log Patterns

Investigating large volumes of log data can be time consuming: you can spend hours on them and still understand only a fraction of them. However, applicative logs often look the same with some fraction of them varying. Datadog calls these _patterns_.

In the Log Explorer, patterns can be surfaced automatically to bring structure to the problem and help you quickly see what matters—exclude what's irrelevant.

Find out more in the [Log Patterns section][3]

{{< img src="logs/explorer/log_patterns.png" alt="Log Patterns"  style="width:70%;">}}


### Log Analytics

* After having gone through [Datadog processing][4], log parsing, and having [facets](#setup) and [measures](#setup) over the important attributes, you can graph log queries and see maximums, averages, percentiles, unique counts, and more. Follow the [log graphing guide][5] to learn more about all the graphing options.

{{< img src="logs/explorer/log_analytics.png" alt="Log Analytics"  style="width:70%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/saved_views
[3]: /logs/explorer/patterns
[4]: /logs/processing
[5]: /logs/explorer/analytics
