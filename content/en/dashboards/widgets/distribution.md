---
title: Distribution Widget
kind: documentation
description: "Graph a metric distribution aggregated across one or several tags."
aliases:
    - /graphing/widgets/distribution/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The Distribution visualization shows data aggregated across one or several tags, such as *hosts*. Unlike the [heat map][1], a distribution graph's x-axis is quantity rather than time.

This visualization displays only a single query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="dashboards/widgets/distribution/distribution.png" alt="Distribution graph">}}

## Setup

{{< img src="dashboards/widgets/distribution/distribution_setup.png" alt="Distribution graph editor view"  style="width:100%;">}}

### Configuration

Configure your query as usual. The Distribution visualization supports metrics, live processes, APM request latency, log events, and RUM events. Note that this visualization type is useful only when data is aggregated across tag keys, e.g. for each `host`.
Make a selection in the "`avg`/`max`/`min`/`sum by`/etc." control to see your data across the associated tags.

### Options

#### Display preference

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Display preferences"  style="width:80%;">}}

##### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

##### Legend

Use *Show legend on graph* to toggle the legend display on your widget. Optionally, select the number of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## Full screen

In addition to the [standard full screen options][2], you can use x-axis controls to zoom in to a specific percentile.

{{< img src="dashboards/widgets/distribution/distribution_fullscreen.png" alt="Distribution full screen graph"  style="width:80%;">}}


## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][3] documentation for additional reference.

The dedicated [widget JSON schema definition][4] for the distribution widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/heat_map/
[2]: /dashboards/widgets/#full-screen
[3]: /api/v1/dashboards/
[4]: /dashboards/graphing_json/widget_json/
