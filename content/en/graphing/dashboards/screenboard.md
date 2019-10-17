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

Screenboards are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views, and can either update in real-time, or represent one or more fixed points in the past.

## Read Only

[An Administrator][1] or Screenboard creator can make a Screenboard read-only by clicking the gear icon (upper right corner of a Screenboard) and clicking the **Permissions** link:

{{< img src="graphing/dashboards/screenboard/read_only.png" alt="Read Only" responsive="true" style="width:30%;">}}

**Click "Yes" on the confirmation window to make the Screenboard read-only**

Only [account Administrators][1] and the Screenboard creator can activate read-only mode for a Screenboard.
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

## Global Time Selector

Screenboards feature a global time option, which sets the same timeframe for all time-based widgets on the same screenboard. The global time selector can be set to a moving window in the past ("The Past Hour," "The Past 3 Months," etc.) or to a fixed period between two dates. If a moving window is chosen, all widgets update their timeframes every few milliseconds to move along with that window.

{{< img src="graphing/dashboards/screenboard/global_time_screenboard.png" alt="Global Time Selector" responsive="true" style="width:50%;">}}

In order to use the global time selector, the screenboard must have at least one time-based widget that is linked to "Global Time." When creating or editing a time-based widget, go to **Set display preferences** and select "Global Time" in the *Show* drop-down menu. Note: "Global Time" is the default setting.

{{< img src="graphing/dashboards/screenboard/widget_selector.png" alt="Widget time selector" responsive="true" style="width:70%;">}}

When the global time selector is in use, widgets that are linked to global time show data for that period. Widgets that are not linked to global time show the data for their local timeframe as applied to the global window. For instance, if the global time selector is set to the fixed period January 1st 2018 through January 2nd 2018, a widget set to the local timeframe "The Last Minute" shows the last minute of January 2nd, from 11:59pm.

## Public Dashboards
Configure public screenboards by clicking on the upper right side cog icon and selecting `Configure sharing....`

{{< img src="graphing/dashboards/screenboard/public_sharing.png" alt="Public Dashboard Configuration" responsive="true" style="width:70%;">}}

Options allow users to change the default time range and select different template variable combinations.
Note: The template variable option is only available if template variables have been set up on the dashboard.

## Tracking Changes
A user can find all events related to Screenboard changes to the Screenboard they are following by searching `tags:audit, <Screenboard_name>` in the main [event stream][2], as each notification event is tagged with those two tags.

## Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any change creates an event in the [event stream][2] that explains the change and displays the user that made the actual change.

If any changes are made to your dashboards, they can be seen with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these simple steps:

1. At the top right corner of a dashboard, click on the gear icon:
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" style="width:30%;">}}

2. Select **Notifications** option and enable the notifications:
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" style="width:40%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/team/#datadog-user-roles
[2]: /graphing/event_stream
