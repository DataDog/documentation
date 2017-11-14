---
title: Timeboard
kind: documentation
autotocdepth: 3
customnav: graphingnav
---
## Change timeboard name

1. Click on the info icon on the top right corner of the Timeboard:
    {{< img src="graphing/dashboards/timeboard/timeboard_name.png" alt="Timebaord name" responsive="true" >}}
2. Click on the pencil icon to edit the title and description
3. Click the checkmark to save changes

## Read Only

An Administrator or Timeboard creator can make a Timeboard read-only by clicking the gear icon (upper right corner of a Timeboard) and clicking the "Permissions" link:

{{< img src="graphing/dashboards/timeboard/read_only.png" alt="Read Only" responsive="true" >}}

**Click "Yes" on the confirmation window to make the Timeboard read-only**

Only account Administrators and the Timeboard creator can activate read-only mode for a Timeboard.  Any user in the organization, regardless of admin privileges, can sign up to receive change notifications for a particular Timeboard.

If a user decides to track changes for a Timeboard, the following Timeboard changes will be reported to the user through an event in the event stream:

1. Text changes (title, description)
2. Tile changes
3. Timeboard cloning
4. Timeboard deletion

In order to prevent the above listed changes, an admin (account admins + Timeboard creator) can activate read-only view disabling all non-admin user edits to any tiles or text in the Timeboard, as well as Timeboard deletion. Even in read-only mode, non-admin users can still clone the Timeboard, rearrange the tiles, snapshot each tile, and view the tile in fullscreen. Any tile rearrangement by a non-admin user will not persist if the Timeboard is set to read-only.

## Tracking Changes
A user can find all events related to Timeboard changes to the Timeboard they are following by searching "tags:audit, Timeboard_name" in the main event stream, as each notification event is tagged with those two tags.

## Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any changes made will create an event in the event stream that explains the change and displays the user that made the actual change.

If any changes are made to your dashboards, you can see them with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these simple steps:

At the top right corner of a dashboard, click on the gear icon

{{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" >}}

    2. Select 'Notifications' option and enable the notifications

{{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" >}}