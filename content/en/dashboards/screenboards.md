---
title: Screenboards
kind: documentation
aliases:
    - /graphing/dashboards/screenboard/
further_reading:
- link: "/dashboards/template_variables"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/sharing"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "/dashboards/widgets"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

Screenboards are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past.

## Global time selector

To use the screenboard global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in a widget's editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same timeframe for all widgets using the `Global Time` option on the same screenboard. You can select a moving window in the past (`The Past Hour`, `The Past Day`, etc.) or a fixed period with the `Select Range` option. If a moving window is chosen, the widgets are updated every few milliseconds to move along with the time window.

Widgets not linked to global time show the data for their local timeframe as applied to the global window. For example, if the global time selector is set to January 1, 2019 through January 2, 2019, a widget set with the local timeframe for `The Past Minute` shows the last minute of January 2, 2019 from 11:59pm.

## TV mode

Screenboards are useful for displaying key performance metrics on large screens or TVs. To enable TV mode, use the keyboard shortcut `K` or click the TV icon on the screenboard.

## Settings

### Generate public URL

Share a screenboard with external users by generating a public URL. For more details, see [sharing screenboards][1].

### Display UTC time

Toggle between UTC time and your default time zone.

### Notifications

If notifications are activated for a screenboard, an event is created in the [event stream][2]. This event provides information on text changes, widget changes, screenboard cloning, and screenboard deletion along with the name of the user performing the action.

Additionally, individual users who activate the notification receive an email alert. Any user in the organization, regardless of administrative privileges, can sign up to receive change notifications for a screenboard.

Change events for dashboards with notifications enabled can be seen in the event stream by searching:

```text
tags:audit,dash
```

To limit the search to a specific dashboard, include the dashboard's name in the search.

### Permissions

For a screenboard, the creator or any [administrator][3] can activate read-only mode, which disables all non-admin edits to the screenboard.

In read-only mode, non-administrative users can clone the screenboard, rearrange tiles, snapshot a tile, and view a tile in full-screen. Any tile rearrangement by a non-administrative user does not persist.

### Clone dashboard

Use this option to copy the entire screenboard to a new screenboard. You are prompted to name the clone.

### Copy, import, or export dashboard JSON

Refer to the [main dashboard documentation][4] for details on copying, importing, or exporting dashboard JSON.

### Delete dashboard

Use this option to permanently delete your screenboard. You are prompted to confirm deletion.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/sharing/#screenboards
[2]: /events
[3]: /account_management/team/#datadog-user-roles
[4]: /dashboards/#copy-import-export
