---
title: Dashboards
kind: documentation
autotocdepth: 3
customnav: graphingnav
---

To create a [TimeBoard](/graphing/dashboards/timeboard/) or a [ScreenBoard](/graphing/dashboards/screenboard/) Select which of these you would prefer to create after clicking 'New Dashboard' in the 'Dashboards' dropdown.

{{< img src="graphing/dashboards/board_selection.jpg" alt="Board selection" responsive="true" >}}

## What is the difference between a ScreenBoard and a TimeBoard?

At Datadog we give you the capability to create and customize two types of dashboards; [ScreenBoards](/graphing/dashboards/screenboard) and [TimeBoards](/graphing/dashboards/timeboard). To more clearly understand the differences between the two, please consider the following:

|  | Timeboards | Screenboards|
|---|------------|-------------|
|Time Scope | All graphs share same time scope | All graphs can have individual time scope|
| Layout  | Graphs appear in a fixed grid  | Graphs are placed anywhere you like on the canvas |
| Can Share Graphs Individually | Yes | No |
| Can Share the Entire Dashboard | No | Yes |
| Sharing can be Read-Only | Yes | Yes |


## Editing template variables

Dashboard templating allows you to create dashboards that use variables like `$scope` or `$redis` in place of specific tags or hosts. You can then dynamically explore the metrics across different sets of tags. Simply select a new variable value in the dropdown menu, and that value will apply across the dashboard.

To create, edit, and delete template variables click the gear icon at the upper right-hand side of the screen, then select 'Edit Template Variables' from the actions menu.

{{< img src="graphing/dashboards/edit-template-variables.png" alt="edit template variable" responsive="true" >}}

This will open the template variable editing panel.

{{< img src="graphing/dashboards/redis-template-var.png" alt="redis template var" responsive="true" >}}

A template variable is defined by a name and optional parameters for 'Tag Group' and 'Default Tag.' A tag group is a prefix shared among several tags, like `redis_port` for the tags `redis_port:6379` and `redis_port:6380`. Setting a tag group eliminates irrelevant tags from the variable's scope selector, and removes the prefix from the listed values for clarity - so you'll see `6379` and `6380` in the 'Default Tag' dropdown instead. The 'Default Tag' option determines the initial value for the variable on dashboard load.

## Using template variables in graph editors

{{< img src="graphing/dashboards/redis-tpl-graph-editor.png" alt="redis-tpl graph editor" responsive="true"  >}}

Once defined, template variables appear alongside normal tag and host options in graph editors. If you set `6379` as the value of `$redis`, all graphs defined with `$redis` will be scoped to `redis_port:6379`.

{{< img src="graphing/dashboards/redis-tpl-selected.png" alt="redis tpl selected" responsive="true" >}}

## Event Correlation at Design Time
Event Correlation refers to overlaying events on top of a dashboard graph and is an important feature of the Datadog platform. You can setup correlation at two different times: either when you setup the dashboard or adhoc at the time you view the dashboard.


{{< img src="graphing/dashboards/guides-eventcorrelation-screenboard.png" alt="guides-eventcorrelation-screenboard" responsive="true" >}}

Setup event correlation at design time by editing any graph on both Time Boards and Screen Boards and adding events to the graph. To learn more about this, visit the [Graphing Primer][1]. You can find details about adding events [using the UI][2] or via the JSON interface further down the page.

## Event Correlation at View Time

{{< img src="graphing/dashboards/guides-eventcorrelation-searchbox.png" alt="guides event correlation" responsive="true">}}

Setup event correlation at view time by adding a query in the Search box at the top left of any Time Board dashboard window. This will replace any events added at design time, but will apply the events to all graphs on that particular dashboard.


[1]: /graphing/
[2]: /graphing/events_stream/