---
title: Widget Configuration
description: Learn how to configure widgets in Datadog dashboards, including options for full screen, custom links, metrics info, and unit overrides.
further_reading:
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Widget Overview"
- link: "/dashboards/widgets/types"
  tag: "Documentation"
  text: "Widget Types"
---

## Overview

Widget configuration is essential for creating effective dashboards that provide meaningful insights into your infrastructure and applications. This guide covers the key configuration options and considerations you should understand when setting up widgets.


## Full screen

Full screen mode provides enhanced viewing and analysis capabilities for your widgets. You can view most widgets in full screen mode and do the following:

* Change time frames
* Move backward or forward by the time frame selected
* Pause the graph at the current time or view the live graph
* Reset the time frame
* Export the graph to a dashboard, notebook, or copy the query
* Download the data producing the graph in a CSV format

To access the widget overview directly, click the full-screen button on the top right-hand corner of the widget.

Additional options are available for [timeseries widgets][1].

## Data preview

You can join multiple data sources together in the graph editor to enrich your visualizations with additional context and metadata. With Data Preview, you can see what data you're joining or whether the query is working as expected. This feature helps you:

- Confirm data structure and column names
- Identify matching keys
- Validate results before running the full query

{{% collapse-content title="Example" level="h4" expanded=false %}}
You could join your payment logs with a reference table (lookup table) containing product details to display sale price or release date alongside transaction data. Or, you could enrich RUM session data by joining it with customer information from an external source, such as Salesforce or Snowflake, to segment users by customer tier.

Supported data sources for joins include (but are not limited to):

- Logs
- Metrics
- RUM
- Cloud Cost Recommendations
- Netflow
- APM Spans
- APM Traces
- Profiles
- Synthetics CI Batches
- Synthetics Run
- Static Analysis
- CI Tests
- Compliance Findings
- Product Analytics
- Reference Tables

Using joins and data previews makes it easier to select the right fields and enrich your graphs with relevant details, improving the quality and usefulness of your dashboards.


{{% /collapse-content %}}

## Custom links

Custom links enhance data interaction by connecting widget data values to relevant URLs such as Datadog pages or your AWS console.

To customize interactions with data inline your generic widgets, see [Context Links][2].

## Metrics info

On a metric graph, click the context menu (three vertical dots) to find the **Metrics Info** option. This opens a panel with a description of the metric. Clicking on the metric name in this panel opens the metric in the metric summary page for further analysis or edits.

## Unit override

Unit overrides are a key display option that allows you to customize how data values are presented on widgets, adding meaningful context to your data. For more use cases and information, see the [Customize your visualizations with unit overrides][3].
- **Unit override**: choose to display units in the family of 'memory', and have Datadog take care of displaying the appropriate scale depending on data (such as megabytes or gigabytes).
- **Unit and scale override**: fix units to a single scale (display data in megabytes regardless of value).
- **Define custom units**: define completely custom units (like 'tests' instead of a generic count).

This is not an alternative for assigning units to your data.
{{< whatsnext desc="Set units at the organization level: ">}}
    {{< nextlink href="/metrics/units/">}} Set Metrics Units{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Set units for Event-based queries{{< /nextlink >}}
{{< /whatsnext >}}

## Global time selector

The global time selector is a fundamental time configuration option that synchronizes all widgets on a dashboard to use the same time frame. To use the global time selector, at least one time-based widget must be set to use `Global Time`. Make the selection in the widget editor under **Set display preferences**, or add a widget (global time is the default time setting).

The global time selector sets the same time frame for all widgets using the `Global Time` option on the same dashboard. Select a moving window in the past (for example, `Past 1 Hour` or `Past 1 Day`) or a fixed period with the `Select from calendar…` option or [enter a custom time frame][8]. If a moving window is chosen, the widgets are updated to move along with the time window.

Widgets not linked to global time show the data for their local time frame as applied to the global window. For example, if the global time selector is set to January 1, 2019 through January 2, 2019, a widget set with the local time frame for `Past 1 Minute` shows the last minute of January 2, 2019 from 11:59 pm.

## Copy and paste widgets

Copy and paste functionality is a key sharing and collaboration feature that allows you to reuse widgets across different Datadog contexts and external tools.

<div class="alert alert-danger">Enable <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>Static Public Data Sharing</strong></a> in your Organization Settings to use this feature.</div>

Widgets can be copied on [Dashboards][4], [Notebooks][5], [APM Service][6], and the [APM resource][7] page by using <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>, or by selecting the share icon and choosing "Copy".

The copied widgets can be pasted within Datadog by using <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>:

* **Dashboards**: Adds a new widget positioned under your mouse cursor.
* **Notebooks**: Adds a new cell at the end of the notebook.

You can also paste the widget into your favorite chat program that displays link previews (like Slack or Microsoft Teams). This displays a snapshot image of your graph along with a direct link to your widget.

For more information, see [Datadog Clipboard][9].

## Groups of widgets

Copy Timeboard group widgets by hovering over the group widget area and using <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd> or by selecting the share icon and choosing "Copy".

**Note**: When you paste graphs to a screenboard or notebook, Datadog pastes each widget in the group individually.

To copy multiple screenboard widgets (edit mode only), <kbd>Shift</kbd> + click on the widgets and use <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>C</kbd>.

**Note**: This only works when sharing within Datadog. It does not generate a preview image.

## Widget graph menus

Widget graph menus provide essential data interaction options. Hover your cursor over a graph to access the following menu options.

### View in full screen

View the graph in [full screen mode](#full-screen).

### Export

Click on the export icon of any dashboard graph to open an options menu:

| Option                 | Description                                                        |
|------------------------|--------------------------------------------------------------------|
| Copy                   | Create a copy of the dashboard graph.                              |
| Share snapshot         | Create and send a snapshot of your graph.                          |

#### Use within Datadog

| Option                 | Description                                                        |
|------------------------|--------------------------------------------------------------------|
| Declare incident       | Declare an incident from the graph.                                |
| Add to incident        | Add the graph to an existing incident.                             |
| Create case            | Create a case from the graph.                                      |
| Save to notebook       | Save the graph to a notebook.                                      |
| Link to widget         | Get a link to the widget copied to your clipboard.                 |

#### Share externally

| Format | Description            |
| -----  | ----------------------- |
| Download as PNG    | Download the widget in PNG format. |
| Download as SVG    | Download the widget in SVG format. |
| Download as CSV    | Download the widget in CSV format. |

### Edit

Click on the pencil icon of any dashboard graph to make edits.

### Additional options

Click on the context menu (three vertical dots) of any dashboard graph to open an options menu:

| Option                 | Description                                                        |
|------------------------|--------------------------------------------------------------------|
| Edit                              | Edit the graph.                                         |
| Clone                             | Create an adjacent copy of the graph.                   |
| Split graph                       | Create a [split graph][10].                             |
| Create custom links               | Create [custom links](#custom-links).                   |
| Create monitor                    | Create a monitor preconfigured with the graph's query.  |
| Metrics info (metric graphs only) | Get a description of the metrics in this graph. You can click on the metric names to open them in the Metric Summary page.            |
| Delete                            | Delete the graph.                                       |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/timeseries/#full-screen
[2]: /dashboards/guide/context-links/
[3]: /dashboards/guide/unit-override
[4]: /dashboards/
[5]: /notebooks/
[6]: /tracing/services/service_page/
[7]: /tracing/services/resource_page/
[8]: /dashboards/guide/custom_time_frames/
[9]: /incident_response/incident_management/datadog_clipboard/
[10]: /dashboards/widgets/split_graph/