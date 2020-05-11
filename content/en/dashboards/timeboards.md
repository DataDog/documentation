---
title: Timeboards
kind: documentation
aliases:
    - /graphing/dashboards/timeboard/
    - /dashboards/timeboard/
further_reading:
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

Timeboards have automatic layouts, and represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

**Note**: All graphs on a timeboard are controlled with the same time selector. To control the time frame of an individual graph, use a [screenboard][1].

## TV mode

Use TV mode to display your timeboard on large screens or TVs by clicking the TV icon on the timeboard or use the keyboard shortcut `F`.

## Settings

Timeboard settings are the same as screenboards with the exception of generating public URLs:

* [Display UTC time][2]
* [Notifications][3]
* [Permissions][4]
* [Clone dashboard][5]
* [Copy, import, or export dashboard JSON][6]
* [Delete dashboard][7]

## Adding graphs

After [creating your timeboard][8], add graphs using the **Edit widgets** button or **Add graph** link, then drag the appropriate [widget][9] onto the timeboard.

## Search

### Events

Set up an overlay of events by clicking the **Search...** link in the upper left, select **Events**, and enter a [query][10] in the search box. This replaces event overlays added at design time, and applies to all graphs on the timeboard. The overlay shows the occurrence of events on your timeseries graphs with a list of events on the right.

{{< img src="dashboards/timeboard/events_overlay.png" alt="Events overlay"  style="width:75%;">}}

### Logs

Set up an overlay of logs by clicking the **Search...** link in the upper left, select **Logs**, and enter a [query][11] in the search box. The overlay shows the frequency of logs on your timeseries graphs with a list of logs on the right.

## Graph menu

Left click on any dashboard timeseries graph to open an options menu:

{{< img src="dashboards/timeboard/metric_to_logs.png" alt="Related logs"  style="width:80%;">}}

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| Annotate this graph    | Write a comment that enters the event feed or notify members of your team about a graph. |
| View in full screen    | View the graph in [full screen mode][12].                     |
| Copy tags to clipboard | Copy the tags to your clipboard that display on hover.        |
| View related processes | Jump to the [Live Processes][13] page scoped to your graph.   |
| View related hosts     | Jump to the [Host Map][14] page scoped to your graph.         |
| View related logs      | Jump to the [Log Explorer][15] page scoped to your graph.     |

### Logs search query

The search query for **View related logs** is defined using the following parameters:

* **Timeframe**: Focused on the selected data point, and uses the graph time bucket size to display data before and after the selected point.
* **Integration prefix**: If the metric is coming from an integration, Datadog filters on the `source` attribute with the same integration name.
* **Tags**: All tags used in the graph (*template variable*, *split by*, *filter by*) are automatically added to the search query.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/screenboard/
[2]: /dashboards/screenboards/#display-utc-time
[3]: /dashboards/screenboards/#notifications
[4]: /dashboards/screenboards/#permissions
[5]: /dashboards/screenboards/#clone-dashboard
[6]: /dashboards/screenboards/#copy-import-or-export-dashboard-json
[7]: /dashboards/screenboards/#delete-dashboard
[8]: /dashboards/#new-dashboard
[9]: /dashboards/widgets/
[10]: /events/#event-query-language
[11]: /logs/search_syntax/
[12]: /dashboards/widgets/#full-screen
[13]: https://app.datadoghq.com/process
[14]: https://app.datadoghq.com/infrastructure/map
[15]: https://app.datadoghq.com/logs
