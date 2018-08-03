---
title: Dashboards
kind: documentation
aliases:
    - /guides/templating/
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

To create a [Timeboard][3] or a [Screenboard][4] Select which of these you would prefer to create after clicking 'New Dashboard' in the 'Dashboards' dropdown.

{{< img src="graphing/dashboards/board_selection.jpg" alt="Dashboard selection" responsive="true" >}}

## What is the difference between a Screenboard and a Timeboard?

At Datadog we give you the capability to create and customize two types of dashboards; [Screenboards][5] and [Timeboards][6]. To more clearly understand the differences between the two, consider the following:

|                                | Timeboards                       | Screenboards                                      |
| ---                            | ------------                     | -------------                                     |
| Time Scope                     | All graphs share same time scope | All graphs can have individual time scope         |
| Layout                         | Graphs appear in a fixed grid    | Graphs are placed anywhere you like on the canvas |
| Can Share Graphs Individually  | Yes                              | No                                                |
| Can Share the Entire Dashboard | No                               | Yes                                               |
| Sharing can be Read-Only       | Yes                              | Yes                                               |

## Editing template variables

Dashboard templating allows you to create dashboards that use variables like `$scope` or `$redis` in place of specific tags or hosts. You can then dynamically explore the metrics across different sets of tags. Select a new variable value in the dropdown menu, and that value applies across the dashboard.

To create, edit, and delete template variables click the gear icon at the upper right-hand side of the screen, then select 'Edit Template Variables' from the actions menu.

{{< img src="graphing/dashboards/edit-template-variables.png" alt="edit template variable" responsive="true" style="width:30%;">}}

This open the template variable editing panel.

{{< img src="graphing/dashboards/redis-template-var.png" alt="Redis template var" responsive="true" style="width:50%;">}}

A template variable is defined by a name and optional parameters for 'Tag Group' and 'Default Tag.' A tag group is a prefix shared among several tags, like `redis_port` for the tags `redis_port:6379` and `redis_port:6380`. Setting a tag group eliminates irrelevant tags from the variable's scope selector, and removes the prefix from the listed values for clarity - so you'll see `6379` and `6380` in the 'Default Tag' dropdown instead. The 'Default Tag' option determines the initial value for the variable on dashboard load.

## Using template variables in graph editors/widgets

{{< img src="graphing/dashboards/redis-tpl-graph-editor.png" alt="Redis-tpl graph editor" responsive="true" style="width:70%;" >}}

Once defined, template variables appear alongside normal tag and host options in graph editors. If you set `6379` as the value of `$redis`, all graphs defined with `$redis` is scoped to `redis_port:6379`.

{{< img src="graphing/dashboards/redis-tpl-selected.png" alt="Redis tpl selected" responsive="true" style="width:70%;">}}

You can also use them explicitly in widgets such as Event Stream, with a query of the form `tags:$redis`.


## Event Correlation at Design Time
Event Correlation refers to overlaying events on top of a dashboard graph and is an important feature of the Datadog platform. You can setup correlation at two different times: either when you setup the dashboard or adhoc at the time you view the dashboard.

{{< img src="graphing/dashboards/guides-eventcorrelation-screenboard.png" alt="guides-eventcorrelation-screenboard" responsive="true" style="width:90%;">}}

Setup event correlation at design time by editing any graph on both Timeboards and Screenboards and adding events to the graph. To learn more about this, visit the [Graphing Primer][1]. You can find details about adding events [using the UI][2] or via the JSON interface further down the page.

## Event Correlation at View Time

{{< img src="graphing/dashboards/guides-eventcorrelation-searchbox.png" alt="guides event correlation" responsive="true" style="width:90%;">}}

Setup event correlation at view time by adding a query in the Search box at the top left of any Timeboard dashboard window. This replaces any events added at design time, but applies the events to all graphs on that particular dashboard.

## Correlation between Logs and Metrics

### Jump from a metric to its logs

Fast and easy correlation is key when troubleshooting an issue. Use the following shortcut from any dashboard timeseries graphs to open a contextual menu with the most related logs.

{{< img src="graphing/dashboards/related_logs.png" alt="Related logs" responsive="true" style="width:80%;">}}

Select `View related logs` to jump to the log explorer page zoomed on the selected timeframe with all the current context of your graph.

### How do we define the search query ?

To define the most related logs, we use the following parameters:

* *Timeframe*: Focused on the selected data point and uses the graph bucket size to display data before and after the selected point.
* *Integration prefix*: If the metric is coming from an integration, Datadog filters on the `source` attribute with the same integration name.
* *Tags*: All tags used in the graph (*template variable*, *split by*, *filter by*) are automatically added to the search query.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/
[2]: /graphing/event_stream/
[3]: /graphing/dashboards/timeboard/
[4]: /graphing/dashboards/screenboard/
[5]: /graphing/dashboards/screenboard
[6]: /graphing/dashboards/timeboard



