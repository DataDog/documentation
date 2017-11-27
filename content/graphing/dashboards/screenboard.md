---
title: Screenboard
kind: documentation
autotocdepth: 3
customnav: graphingnav
---

## Change Screenboard name 

1. Click on Edit Board at the top of the Screenboard
    {{< img src="graphing/dashboards/screenboard/screenboard_name.png" alt="Screenboard name" responsive="true" popup="true">}}
2. Change the name to whatever you like
3. Click Save Changes


## Read Only

[An Administrator](/account_management/team/#datadog-user-roles) or Screenboard creator can make a Screenboard read-only by clicking the gear icon (upper right corner of a Screenboard) and clicking the **Permissions** link:
{{< img src="graphing/dashboards/screenbaord/read_only.png" alt="Read Only" responsive="true" popup="true">}}

**Click "Yes" on the confirmation window to make the Screenboard read-only**

Only [account Administrators](/account_management/team/#datadog-user-roles) and the Screenboard creator can activate read-only mode for a Screenboard.  
Any user in the organization, regardless of administrator privileges, can sign up to receive change notifications for a particular Screenboard.

If a user decides to track changes for a Screenboard, the following Screenboard changes will be reported to the user through an event in the [event stream](/graphing/event_stream/):

1. Text changes (title, description)

2. Widget changes
    - iframe, free_text, image, and note widget changes will be reported in the [event stream](/graphing/event_stream/) if a new widget is added or it is removed. There will be no specifics about the widget specifying content. It will simply say "a text_widget was added to the Screenboard" in the event.
    - All other widget changes will be reported in the [event stream](/graphing/event_stream/) if a new widget is added, edited, or removed. The event will specify the title of the widget in question and say something like "the widget titled 'xyz' was edited"
3. Screenboard cloning

4. Screenboard deletion

In order to prevent the above listed changes, an administrator (account admins + Screenboard creator) can activate read-only view disabling all non-administrators user edits to any tiles or text in the Screenboard, as well as Screenboard deletion.  
Even in read-only mode, non-administrator users can still clone the Screenboard, rearrange the tiles, snapshot each tile, and view the tile in full-screen. Any tile rearrangement by a non-administrator user will not persist if the Screenboard is set to read-only.

## Tracking Changes
A user can find all events related to Screenboard changes to the Screenboard they are following by searching `tags:audit, <Screenboard_name>` in the main [event stream](/graphing/event_stream/), as each notification event is tagged with those two tags.

## Auditing Dashboards

In dashboards, notifications provide the ability to track changes for audit purposes. Any changes made will create an event in the [event stream](/graphing/event_stream/) that explains the change and displays the user that made the actual change.

If any changes are made to your dashboards, you can see them with the following event search:

https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all

This feature can be enabled by following these simple steps:

1. At the top right corner of a dashboard, click on the gear icon:
    {{< img src="graphing/dashboards/faq/enable_notifications.png" alt="enable notifications" responsive="true" popup="true">}}

2. Select **Notifications** option and enable the notifications:
    {{< img src="graphing/dashboards/faq/notifications_pop_up.png" alt=" notifications pop up" responsive="true" popup="true">}}

## Change colors

### Deluminate (Chrome)

This Chrome plug-in will help you change the Color Scheme for your browser (Contrast, Reverse Colors, Image colors, Luminance) [Deluminate](https://chrome.google.com/webstore/detail/deluminate/iebboopaeangfpceklajfohhbpkkfiaa?hl=en-US).

Simple to setup and easily activated/unactivated, Deluminate is a good fit for Datadog Screenboards.
{{< img src="developers/faq/deluminate.png" alt="deluminate" responsive="true" popup="true">}}

### Stylebot (Chrome)

Stylish offers more possibilities to customize the css of any web page.

You can use the library created by adamjt for Datadog Screenboards: `http://stylebot.me/styles/4320`

{{< img src="developers/faq/style_bot.jpg" alt="style_bot" responsive="true" popup="true">}}

Here is how to proceed to enjoy this css style on Chrome using Stylebot:

1. Install the Stylebot extension for Chrome: `https://chrome.google.com/webstore/detail/stylebot/oiaejidbmkiecgbjeifoejpgmdaleoha?hl=en`
2. On the css page, `http://stylebot.me/styles/4320`, click the scissors "CSS" icon and copy all the css
3. Click the Stylebot icon to open the menu, choose "Options"
4. In the left column choose 'Styles', then click "Add a new Style"
5. URL: p.datadoghq.com
6. In the text zone, paste the whole css code previously copied from our css page
7. Save
8. Next time you will visit a shared dashboard, this new css style will be enabled.

If you have any custom css style sheet that you would like to share, [reach out to us](/help)!

## Backup my Screenboard

Using our [APIs](/api) it's possible to write a script to backup your Screenboard definitions as code. See the following projects as examples of how these backups can be accomplished:

* https://github.com/brightcove/dog-watcher
* https://github.com/Shopify/doggy

Special thanks to [Brightcove](https://www.brightcove.com/) and [Shopify](https://www.shopify.com/) for sharing these projects!