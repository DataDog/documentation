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
- link: "graphing/widgets"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
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

**Note**: Traffic to the public URLs of public Dashboards is ignored.

## Create a Dashboard list

Click on the *New List +* icon in the upper right corner of the page to create a new Dashboard list.

Change its title by selecting it:

{{< img src="graphing/dashboards/new_list_title.png" alt="New list" responsive="true" style="width:70%;">}}

To add Dashboards to your Dashboard List, select their corresponding check boxes in the main Dashboard list. Then click on the *Add to List* button in the upper right corner of the Dashboard list:

{{< img src="graphing/dashboards/dash_to_list.png" alt="Add Dashboard to list" responsive="true" style="width:70%;">}}

## Create a Dashboard

To create a Dashboard, click on the *New Dashboard* button in the upper right corner of the page. Datadog will then ask you to choose between creating a [Timeboard][2] or a [Screenboard][3] Select which of these you would prefer to create after clicking 'New Dashboard' in the 'Dashboards' dropdown.

### What is the difference between a Screenboard and a Timeboard?

You have the capability to create and customize two types of Dashboards: [Screenboards][3] and [Timeboards][2]. To more clearly understand the differences between the two, consider the following:

|                                | Timeboards                       | Screenboards                                      |
|--------------------------------|----------------------------------|---------------------------------------------------|
| Time Scope                     | All graphs share same time scope | All graphs can have individual time scope         |
| Layout                         | Graphs appear in a fixed grid    | Graphs are placed anywhere you like on the canvas |
| Can Share Graphs Individually  | Yes                              | No                                                |
| Can Share the Entire Dashboard | No                               | Yes                                               |
| Sharing can be Read-Only       | Yes                              | Yes                                               |

### Copy / import / export

You can copy, import, or export a dashboard's JSON using the settings cog (upper right) with the following options:

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Copy&nbsp;dashboard&nbsp;JSON   | Copy the dashboard's JSON to your clipboard.                                                                                                                               |
| Import&nbsp;dashboard&nbsp;JSON | Paste or import your JSON to the dashboard. This option overwrites all content on the dashboard. If the JSON is already on your clipboard, use `Ctrl V` (`Cmd V` for Mac). |
| Export&nbsp;dashboard&nbsp;JSON | Download a JSON file containing the JSON of your dashboard.                                                                                                                |

{{< img src="graphing/dashboards/copy_dashboard.png" alt="Copy dashboard" responsive="true" style="width:30%;">}}

### Suggested dashboards and active users

If you’re not sure where to look next, Datadog offers suggestions for viewing related dashboards. To view suggested dashboards and active users, click on the caret icon next to the dashboard title. These dashboards are recommended based on the user activity in your organization and how often users go from this dashboard to other existing dashboards. You can also add or update Markdown-supported dashboard descriptions in this view by clicking `edit`.

{{< img src="graphing/dashboards/suggested_dashboards.png" alt="Suggested dashboards" responsive="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /graphing/dashboards/timeboard
[3]: /graphing/dashboards/screenboard
