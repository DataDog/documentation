---
title: Screenboard
kind: documentation
---

## Change Screenboard name 

1. Click on Edit Board at the top of the Screenboard
    {{< img src="graphing/dashboards/screenboard/screenboard_name.png" alt="Screenboard name" responsive="true" popup="true" style="width:75%;">}}
2. Change the name to whatever you like
3. Click Save Changes

## Read Only

[An Administrator](/account_management/team/#datadog-user-roles) or Screenboard creator can make a Screenboard read-only by clicking the gear icon (upper right corner of a Screenboard) and clicking the **Permissions** link:

{{< img src="graphing/dashboards/screenboard/read_only.png" alt="Read Only" responsive="true" popup="true" style="width:30%;">}}

**Click "Yes" on the confirmation window to make the Screenboard read-only**

Only [account Administrators](/account_management/team/#datadog-user-roles) and the Screenboard creator can activate read-only mode for a Screenboard.  
Any user in the organization, regardless of administrator privileges, can sign up to receive change notifications for a particular Screenboard.

If a user decides to track changes for a Screenboard, the following Screenboard changes are reported to the user through an event in the [event stream](/graphing/event_stream/):

1. Text changes (title, description)

2. Widget changes
    - iframe, free_text, image, and note widget changes are reported in the [event stream](/graphing/event_stream/) if a new widget is added or it is removed. There are no specifics about the widget specifying content. It says "a text_widget was added to the Screenboard" in the event.
    - All other widget changes are reported in the [event stream](/graphing/event_stream/) if a new widget is added, edited, or removed. The event specifies the title of the widget in question and say something like "the widget titled 'xyz' was edited"
3. Screenboard cloning

4. Screenboard deletion

In order to prevent the above listed changes, an administrator (account admins + Screenboard creator) can activate read-only view disabling all non-administrators user edits to any tiles or text in the Screenboard, as well as Screenboard deletion.  
Even in read-only mode, non-administrator users can still clone the Screenboard, rearrange the tiles, snapshot each tile, and view the tile in full-screen. Any tile rearrangement by a non-administrator user do not persist if the Screenboard is set to read-only.

## Tracking Changes
A user can find all events related to Screenboard changes to the Screenboard they are following by searching `tags:audit, <Screenboard_name>` in the main [event stream](/graphing/event_stream/), as each notification event is tagged with those two tags.

## Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any changes made creates an event in the [event stream](/graphing/event_stream/) that explains the change and displays the user that made the actual change.

If any changes are made to your dashboards, see them with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these simple steps:

1. At the top right corner of a dashboard, click on the gear icon:
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" popup="true" style="width:30%;">}}

2. Select **Notifications** option and enable the notifications:
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" popup="true" style="width:40%;">}}

## Back up my Screenboard

Using our [APIs](/api) it's possible to write a script to backup your Screenboard definitions as code. See the following projects as examples of how these backups can be accomplished:

* https://github.com/brightcove/dog-watcher
* https://github.com/Shopify/doggy
* https://github.com/grosser/kennel

Special thanks to [Brightcove](https://www.brightcove.com/), [Shopify](https://www.shopify.com/), and [Zendesk](https://www.zendesk.com/) for sharing these projects!