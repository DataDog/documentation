---
title: Timeboard
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

Timeboards have automatic layouts, and represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

## Event correlation

Event Correlation refers to overlaying events on top of a dashboard graph. You can set up correlation at two different times: when you set up the dashboard, or ad-hoc when you view the dashboard.

### Individual graphs

{{< img src="graphing/dashboards/guides-eventcorrelation-screenboard.png" alt="guides-eventcorrelation-screenboard" responsive="true" style="width:90%;">}}

Set up event correlation at design time by editing any graph on both Timeboards and Screenboards and adding events to the graph. You can find details about adding events [using the UI][1] or via the JSON interface further down the page.

### Entire dashboard

{{< img src="graphing/dashboards/event-search.png" alt="guides event correlation" responsive="true" style="width:75%;">}}

Set up event correlation at view time by clicking the *Search Events or Logs* link in the upper left, then select **Events**. Next, type a query in the search box. This replaces any events added at design time, but applies the events to all graphs on that particular dashboard as an overlay. 

## Correlation between logs and metrics

### Search for logs in timeboards

Click on the *Search Events or Logs* link in the upper left, then select **Logs**. Next, type a query in the search box. This overlays the frequency of logs on your timeseries widgets. Click on an individual log line to view its full content.

{{< img src="graphing/dashboards/log-search.png" alt="Open Search Logs" responsive="true" style="width:75%;">}}
 

### Jump from a metric to its logs

Fast and easy correlation is key when troubleshooting an issue. Use the following shortcut from any dashboard timeseries graph to open a contextual menu with the most related logs.

{{< img src="graphing/dashboards/related_logs.png" alt="Related logs" responsive="true" style="width:80%;">}}

Select `View related logs` to jump to the Log Explorer page zoomed on the selected timeframe with the current context of your graph.

### How do we define the search query?

To define the most related logs, the following parameters are used:

* *Timeframe*: Focuses on the selected data point and uses the graph bucket size to display data before and after the selected point.
* *Integration prefix*: If the metric is coming from an integration, Datadog filters on the `source` attribute with the same integration name.
* *Tags*: All tags used in the graph (*template variable*, *split by*, *filter by*) are automatically added to the search query.

## Read Only

[An Administrator][2] or Timeboard creator can make a Timeboard read-only by clicking the gear icon (upper right corner of a Timeboard) and clicking the **Permissions** link:

{{< img src="graphing/dashboards/timeboard/read_only.png" alt="Read Only" responsive="true" style="width:30%;">}}

**Click "Yes" on the confirmation window to make the Timeboard read-only**

Only account [administrators][2] and the Timeboard creator can activate read-only mode for a Timeboard. Any user in the organization, regardless of administrator privileges, can sign up to receive change notifications for a particular Timeboard.

If a user decides to track changes for a Timeboard, the following Timeboard changes are reported to the user through an event in the [event stream][1]:

1. Text changes (title, description)
2. Tile changes
3. Timeboard cloning
4. Timeboard deletion

In order to prevent the above listed changes, an administrator (account administrators or Timeboard creator) can activate read-only view disabling all non-administrator user edits to any tiles or text in the Timeboard, as well as Timeboard deletion.

Even in read-only mode, non-administrator users can still clone the Timeboard, rearrange the tiles, snapshot each tile, and view the tile in full screen. Any tile rearrangement by a non-administrator user does not persist if the Timeboard is set to read-only.

## Tracking Changes

A user can find all events related to changes to the Timeboard they are following by searching `tags:audit, <Timeboard_name>` in the main event stream, as each notification event is tagged with those two tags.

## Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any changes made creates an event in the event stream that explains the change and displays the user that made the actual change.

See changes with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these steps:

1. At the top right corner of a dashboard, click on the gear icon:
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" style="width:30%;">}}

2. Select **Notifications** option and enable the notifications:
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/event_stream
[2]: /account_management/team/#datadog-user-roles
