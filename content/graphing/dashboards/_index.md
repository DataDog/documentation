---
title: Dashboards
kind: documentation
aliases:
    - /guides/templating/
further_reading:
- link: "graphing/dashboards/template_variables"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "graphing/dashboards/shared_graph"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "graphing/dashboards/widgets"
  tag: "Documentation"
  text: "Discover all available widget for your Dashboard"
---

## Dashboard List

The [Dashboard List][1] page lets you sort your Dashboards into different lists.

{{< img src="graphing/dashboards/dashboard_list.png" alt="Dashboard list" responsive="true" >}}

Search across your Dashboard with the search bar at the top of the page. Dashboards in the Dashboard list can be sorted with the column headers:

* `Favorite`: Sort the Dashboard list with your favorite Dashboards first.
* `Name`: Sort the Dashboard list alphabetically.
* `Modified`: Sort the Dashboard list by last modification date.
* `Popularity`: Sort the Dashboard list by [Dashboard popularity](#popularity).

### Popularity

A Dashboard's popularity is relative. An organization's most popular Dashboard appears as 5 bars; all other Dashboards are relative to that. Popularity is based upon the amount of traffic a Dashboard is getting and is updated daily, so new Dashboards have 0 popularity bars for up to the first 24 hours.

If you are using uBlock or a similar browser plugin to block web beacons, your traffic won't impact a Dashboard's popularity.

**Note**: Traffic to the public URLs of public Dashboards is ignored.

## Create a Dashboard list

Click on the *New List +* icon in the upper right corner of the page to create a new Dashboard list.

Change its title by selecting it:

{{< img src="graphing/dashboards/new_list_title.png" alt="New list" responsive="true" style="width:70%;">}}

To add Dashboards to your Dashboard List, select their corresponding check boxes in the main Dashboard list. Then click on the *Add to List* button in the upper right corner of the Dashboard list:

{{< img src="graphing/dashboards/dash_to_list.png" alt="Add Dashboard to list" responsive="true" style="width:70%;">}}

## Create a Dashboard

To create a Dashboard, click on the *New Dashboard* button in the upper right corner of the page. Datadog will then ask you to choose between creating a [Timeboard][2] or a [Screenboard][3] Select which of these you would prefer to create after clicking 'New Dashboard' in the 'Dashboards' dropdown.

{{< img src="graphing/dashboards/board_selection.jpg" alt="Dashboard selection" responsive="true" style="width:70%;">}}

### What is the difference between a Screenboard and a Timeboard?

You have the capability to create and customize two types of Dashboards: [Screenboards][3] and [Timeboards][4]. To more clearly understand the differences between the two, consider the following:

|                                | Timeboards                       | Screenboards                                      |
| ---                            | ------------                     | -------------                                     |
| Time Scope                     | All graphs share same time scope | All graphs can have individual time scope         |
| Layout                         | Graphs appear in a fixed grid    | Graphs are placed anywhere you like on the canvas |
| Can Share Graphs Individually  | Yes                              | No                                                |
| Can Share the Entire Dashboard | No                               | Yes                                               |
| Sharing can be Read-Only       | Yes                              | Yes                                               |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /graphing/dashboards/timeboard
[3]: /graphing/dashboards/screenboard
[4]: /graphing/dashboards/timeboard
