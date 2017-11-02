---
title: Screenboard
kind: documentation
autotocdepth: 3
customnav: graphingnav
---

## Change Screenboard name 

1. Click on Edit Board at the top of the Screenboard
    {{< img src="graphing/dashboards/screenboard/screenboard_name.png" alt="Screenboard name" responsive="true" >}}
2. Change the name to whatever you like
3. Click Save Changes


## Read Only

An Administrator or Screenboard creator can make a Screenboard read-only by clicking the gear icon (upper right corner of a Screenboard) and clicking the "Permissions" link:
{{< img src="graphing/dashboards/screenbaord/read_only.png" alt="Read Only" responsive="true" >}}

**Click "Yes" on the confirmation window to make the Screenboard read-only**

Only account Administrators and the Screenboard creator can activate read-only mode for a Screenboard.  Any user in the organization, regardless of admin privileges, can sign up to receive change notifications for a particular Screenboard.

If a user decides to track changes for a screenboard, the following Screenboard changes will be reported to the user through an event in the event stream:

1. Text changes (title, description)

2. Widget changes
    - iframe, free_text, image, and note widget changes will be reported in the event stream if a new widget is added or it is removed. There will be no specifics about the widget specifying content. It will simply say "a text_widget was added to the Screenboard" in the event.
    - 2ll other widget changes will be reported in the event stream if a new widget is added, edited, or removed. The event will specify the title of the widget in question and say something like "the widget titled 'xyz' was edited"
3. Screenboard cloning

4. Screenboard deletion

In order to prevent the above listed changes, an admin (account admins + Screenboard creator) can activate read-only view disabling all non-admin user edits to any tiles or text in the Screenboard, as well as Screenboard deletion. Even in read-only mode, non-admin users can still clone the Screenboard, rearrange the tiles, snapshot each tile, and view the tile in fullscreen. Any tile rearrangement by a non-admin user will not persist if the Screenboard is set to read-only.

### Tracking Changes
A user can find all events related to Screenboard changes to the Screenboard they are following by searching "tags:audit, Screenboard_name" in the main event stream, as each notification event is tagged with those two tags.
