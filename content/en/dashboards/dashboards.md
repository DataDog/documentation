---
title: Dashboards
kind: documentation
aliases:
    - /graphing/dashboards/dashboard/
    - /graphing/dashboards/dashboard/
    - /dashboards/dashboard/
    - /dashboards/
    - /dashboard/
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

Dashboards are the next-gen grid based layout which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past. They also work well for debugging dashboards.

## Global time selector

To use the global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in a widget’s editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same time frame for all widgets using the `Global Time` option on the same dashboard. You can select a moving window in the past (`Past 1 Hour`, `Past 1 Day`, etc.) or a fixed period with the `Select from calendar…` option or by [entering a custom time frame][1]. If a moving window is chosen, the widgets are updated to move along with the time window.

Widgets not linked to global time show the data for their local time frame as applied to the global window. For example, if the global time selector is set to January 1, 2019, through January 2, 2019, a widget set with the local time frame for `Past 1 Minute` shows the last minute of January 2, 2019 from 11:59 pm.

## TV mode

Dashboards are useful for displaying key performance metrics on large screens or TVs. To enable TV mode, use the keyboard shortcut `F` or click the TV icon on the dashboard.

## Settings

### Generate public URL

Share a dashboard with external users by generating a public URL. For more details, see [sharing dashboards][2].

### Display UTC time

Toggle between UTC time and your default time zone.

### Notifications

If notifications are activated for a dashboard, an event is created in the [event stream][3]. This event provides information on text changes, widget changes, dashboard cloning, and dashboard deletion along with the name of the user performing the action.

Additionally, individual users who activate the notification receive an email alert. Any user in the organization, regardless of administrative privileges, can sign up to receive change notifications for a dashboard.

Change events for dashboards with notifications enabled can be seen in the event stream by searching:

```text
tags:audit,dash
```

To limit the search to a specific dashboard, include the dashboard's name in the search.

### Permissions

For a dashboard, the creator or any [administrator][4] can activate read-only mode, which disables all non-admin edits to the dashboard.

In read-only mode, non-administrative users can clone the dashboard, rearrange tiles, snapshot a tile, and view a tile in full-screen. Any tile rearrangement by a non-administrative user does not persist.

### Clone dashboard

Use this option to copy the entire dashboard to a new dashboard. You are prompted to name the clone.

### Copy, import, or export dashboard JSON

Refer to the [main dashboard documentation][5] for details on copying, importing, or exporting dashboard JSON.

### Delete dashboard

Use this option to permanently delete your dashboard. You are prompted to confirm deletion.

## Graph menu

Click on any dashboard graph to open an options menu:

| Option                 | Description                                                   |
|------------------------|---------------------------------------------------------------|
| View in full screen    | View the graph in [full screen mode][6].                     |
| View related processes | Jump to the [Live Processes][7] page scoped to your graph.   |
| View related hosts     | Jump to the [Host Map][8] page scoped to your graph.         |
| View related logs      | Populate a [Logs][9] panel scoped to your graph.             |
| View related traces    | Populate a [Traces][10] panel scoped to your graph.          |
| View related profiles  | Jump to the [Profiling][11] page scoped to your graph.       |

## Tips and Tricks

- Click on a widget icon to add it to the dashboard without dragging (keyboard shortcuts `N` and `shift+N` also do this)
- Double click the bottom left or bottom right resize handle on a widget to instantly fill any empty, adjacent space
- Click and drag from any empty space to use the lasso tool
- When multiple widgets are selected, an action menu appears with bulk-actions
- Press `cmd+G` or `ctrl+G` to group selected widgets
- Use the dashboard header cog menu to open or collapse all groups on a dashboard


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/custom_time_frames/
[2]: /dashboards/sharing/#dashboards
[3]: /events/
[4]: /account_management/users/default_roles/
[5]: /dashboards/#copy-import-export
[6]: /dashboards/widgets/#full-screen
[7]: https://app.datadoghq.com/process
[8]: https://app.datadoghq.com/infrastructure/map
[9]: /logs/
[10]: /tracing/
[11]: /tracing/profiler/
