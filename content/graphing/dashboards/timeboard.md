---
title: Timeboard
kind: documentation
further_reading:
- link: "graphing/dashboards/template_variables"
  tag: "Documentation"
  text: Enhance your Dashboards with Template Variables
- link: "graphing/dashboards/shared_graph"
  tag: "Documentation"
  text: Share your Graphs outside of Datadog
- link: "graphing/dashboards/widgets"
  tag: "Documentation"
  text: Discover all available widget for your Dashboard
---

## Change Timeboard name

1. Click on the info icon on the top right corner of the Timeboard:
    {{< img src="graphing/dashboards/timeboard/timeboard_name.png" alt="Timeboard name" responsive="true" style="width:75%;">}}
2. Click on the pencil icon to edit the title and description
3. Click the checkmark to save changes

## Read Only

[An Administrator][1] or Timeboard creator can make a Timeboard read-only by clicking the gear icon (upper right corner of a Timeboard) and clicking the **Permissions** link:

{{< img src="graphing/dashboards/timeboard/read_only.png" alt="Read Only" responsive="true" style="width:30%;">}}

**Click "Yes" on the confirmation window to make the Timeboard read-only**

Only account [administrator][1] and the Timeboard creator can activate read-only mode for a Timeboard.  Any user in the organization, regardless of administrator privileges, can sign up to receive change notifications for a particular Timeboard.

If a user decides to track changes for a Timeboard, the following Timeboard changes are reported to the user through an event in the [event stream][2]:

1. Text changes (title, description)
2. Tile changes
3. Timeboard cloning
4. Timeboard deletion

In order to prevent the above listed changes, an administrator (account administrators + Timeboard creator) can activate read-only view disabling all non-administrator user edits to any tiles or text in the Timeboard, as well as Timeboard deletion.  

Even in read-only mode, non-administrator users can still clone the Timeboard, rearrange the tiles, snapshot each tile, and view the tile in full screen. Any tile rearrangement by a non-administrator user does not persist if the Timeboard is set to read-only.

## Tracking Changes

A user can find all events related to Timeboard changes to the Timeboard they are following by searching `tags:audit, <Timeboard_name>` in the main event stream, as each notification event is tagged with those two tags.

## Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any changes made creates an event in the event stream that explains the change and displays the user that made the actual change.

If any changes are made to your dashboards, see them with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these simple steps:

1. At the top right corner of a dashboard, click on the gear icon:
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" style="width:30%;">}}

2. Select **Notifications** option and enable the notifications:
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" style="width:30%;">}}

## Backup my Timeboard

Using our [APIs][3] it's possible to write a script to backup your Timeboard definitions as code. See the following projects as examples of how these backups can be accomplished:

* https://github.com/brightcove/dog-watcher
* https://github.com/Shopify/doggy
* https://github.com/grosser/kennel

Special thanks to [Brightcove][4], [Shopify][5], and [Zendesk][6] for sharing these projects!

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/team/#datadog-user-roles
[2]: /graphing/event_stream
[3]: /api
[4]: https://www.brightcove.com/
[5]: https://www.shopify.com/
[6]: https://www.zendesk.com/
