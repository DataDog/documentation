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

The Distribution visualization is another way of showing metrics aggregated across one or several tags, such as *hosts*. Unlike the [heat map][1], a distribution graph's x-axis is quantity rather than time.

This visualization displays only a single metric query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="dashboards/widgets/distribution/distribution.png" alt="Distribution"  >}}

## Setup

{{< img src="dashboards/widgets/distribution/distribution_setup.png" alt="Distribution"  style="width:80%;">}}

### Configuration

Configure your metric query as usual. Note that this visualization type is useful only when metrics are aggregated across tag keys, e.g. for each `host`.
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

## API

The dedicated [widget JSON schema definition][2] for the distribution widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/heat_map/
[2]: /dashboards/graphing_json/widget_json/
