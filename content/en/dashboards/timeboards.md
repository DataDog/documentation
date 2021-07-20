---
title: Timeboard Layout
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

To switch from the [Dashboard layout][1] to the Timeboard layout, use `Pick Layout` in the cog menu and select `Automatic`.

{{< img src="dashboards/auto-layout.png" alt="Auto layout option for a dashboard"  style="width:70%;">}}

## Search

### Events

Set up an overlay of events by clicking the **Search...** link in the upper left, select **Events**, and enter a [query][2] in the search box. This replaces event overlays added at design time, and applies to all graphs on the timeboard. The overlay shows the occurrence of events on your timeseries graphs with a list of events on the right.

{{< img src="dashboards/timeboard/events_overlay.png" alt="Events overlay"  style="width:75%;">}}

### Logs

Set up an overlay of logs by clicking the **Search...** link in the upper left, select **Logs**, and enter a [query][3] in the search box. The overlay shows the frequency of logs on your timeseries graphs with a list of logs on the right.

## Graph menu

Click on any dashboard timeseries graph to open an options menu:

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| Send snapshot          | Create and send a snapshot of your graph.                     |
| Find correlated metrics| Find correlations from APM services, integrations, and dashboards. |
| View in full screen    | View the graph in [full screen mode][4].                     |
| Lock cursor            | Lock the cursor in place on the page.                         |
| View related processes | Jump to the [Live Processes][5] page scoped to your graph.   |
| View related hosts     | Jump to the [Host Map][6] page scoped to your graph.         |
| View related logs      | Jump to the [Log Explorer][7] page scoped to your graph.     |
| View related traces    | Populate a [Traces][8] panel scoped to your graph.           |
| View related profiles  | Jump to the [Profiling][9] page scoped to your graph.        |
### Logs search query

The search query for **View related logs** is defined using the following parameters:

* **Timeframe**: Focused on the selected data point, and uses the graph time bucket size to display data before and after the selected point.
* **Integration prefix**: If the metric is coming from an integration, Datadog filters on the `source` attribute with the same integration name.
* **Tags**: All tags used in the graph (*template variable*, *split by*, *filter by*) are automatically added to the search query.

## Tips and tricks

- Click on a widget icon to add it to the dashboard without dragging (keyboard shortcuts `N` and `shift+N` also do this)
- Double click the bottom left or bottom right resize handle on a widget to instantly fill any empty, adjacent space
- Click and drag from any empty space to use the lasso tool
- When multiple widgets are selected, an action menu appears with bulk-actions
- Press `cmd+G` or `ctrl+G` to group selected widgets
- Use the dashboard header cog menu to open or collapse all groups on a dashboard

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/dashboard
[2]: /events/#event-query-language
[3]: /logs/search_syntax/
[4]: /dashboards/widgets/#full-screen
[5]: https://app.datadoghq.com/process
[6]: https://app.datadoghq.com/infrastructure/map
[7]: https://app.datadoghq.com/logs
[8]: /tracing/
[9]: /tracing/profiler/
