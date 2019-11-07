---
title: Screenboard
kind: documentation
further_reading:
- link: "graphing/dashboards/template_variables"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "graphing/dashboards/shared_graph"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "graphing/widgets"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

Screenboards are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past.

## Global time selector

To use the screenboard global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in a widget's editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same timeframe for all widgets using the `Global Time` option on the same screenboard. You can select a moving window in the past (`The Past Hour`, `The Past Day`, etc.) or a fixed period with the `Select Range` option. If a moving window is chosen, the widgets are updated every few milliseconds to move along with the time window.

When the global time selector is used, widgets that are linked to global time show data for that period. Widgets that are not linked to global time show the data for their local timeframe as applied to the global window. For instance, if the global time selector is set to the fixed period January 1, 2019 through January 2, 2019, a widget set to the local timeframe `The Past Minute` shows the last minute of January 2, 2019 from 11:59pm.

## TV mode

Screenboards are useful for displaying key performance metrics on large screens or TVs. To enable TV mode, use the keyboard shortcut `K` or the TV icon.

## Settings

### Generate public URL

Share a screenboard with external users by generating a public URL. For more details, see [Screenboard sharing][1].

### Display UTC time

Toggle between UTC time and your default time zone.

### Notifications

If notifications are activated for a specific screenboard, an event is created in the [event stream][2]. This event provides information about the change including the user who made the change. Additionally, individual users who activate a screenboard notification receive an email alert.

Change events for dashboards with notifications enabled can be seen in the event stream by searching:

```
tags:audit,dash
```

To limit the search to a specific dashboard, include the dashboard's name in the search.

### Permissions

As the Dashboard creator (or an [Administrator][3]), you can activate Read-Only mode, disabling all non-admin edits to this dashboard. You can change these preferences at any time.

Only [account Administrators][3] and the Screenboard creator can activate read-only mode for a Screenboard.
Any user in the organization, regardless of administrator privileges, can sign up to receive change notifications for a particular Screenboard.

If a user decides to track changes for a Screenboard, the following Screenboard changes are reported to the user through an event in the [event stream][2]:

1. Text changes (title, description)

2. Widget changes
    - iframe, free_text, image, and note widget changes are reported in the [event stream][2] if a new widget is added or it is removed. There are no specifics about the widget specifying content. It says "a text_widget was added to the Screenboard" in the event.
    - All other widget changes are reported in the [event stream][2] if a new widget is added, edited, or removed. The event specifies the title of the widget in question and say something like "the widget titled 'xyz' was edited"
3. Screenboard cloning

4. Screenboard deletion

In order to prevent the above listed changes, an administrator (account admins + Screenboard creator) can activate read-only view disabling all non-administrators user edits to any tiles or text in the Screenboard, as well as Screenboard deletion.
Even in read-only mode, non-administrator users can still clone the Screenboard, rearrange the tiles, snapshot each tile, and view the tile in full-screen. Any tile rearrangement by a non-administrator user do not persist if the Screenboard is set to read-only.

### Clone dashboard

x

### Copy, Import, or Export dashboard JSON

Refer to the [main dashboard documentation][4] for details on copying, importing, or exporting dashboard JSON.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/shared_graph/#screenboard-sharing
[2]: /graphing/event_stream
[3]: /account_management/team/#datadog-user-roles
[4]: /graphing/dashboards/#copy-import-export
