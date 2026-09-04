---
title: Heatgrid Widget
description: "Compare timeseries data across many tag groups, with each group displayed as its own color-coded row."
widget_type: "heatgrid"
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

{{< img src="dashboards/widgets/heatgrid/heatgrid.png" alt="Example heatgrid widget visualization" style="width:100%;">}}

The heatgrid widget displays timeseries data grouped by tag, with each group shown as its own row and values encoded by color. This makes it easier to spot changes and compare groups directly, even when the number of groups is high.

## Setup

### Configuration

1. Configure your query, grouping by the tag you want to compare across rows. Each group in the query's results appears as its own row in the grid.
1. {{< ui >}}Sort rows by{{< /ui >}}: Order rows by **average value**, **max value**, **min value**, **sum of values**, or **label**, in ascending or descending order.
1. {{< ui >}}Colors{{< /ui >}}: Configure how query values map to row colors.
   {{< img src="dashboards/widgets/heatgrid/heatgrid_colors.png" alt="Heatgrid color configuration panel showing a custom continuous gradient with three color stops." style="width:90%;">}}
   - {{< ui >}}Scheme{{< /ui >}}: Select a preset color scheme, or choose **Custom** to define your own colors.
   - {{< ui >}}Apply as{{< /ui >}}: Choose **Continuous Gradient** to map values along a smooth color scale, or **Discrete Conditions** to map value ranges to specific colors.
   - For a custom gradient, add stops along the scale and set a color and position (0-100%) for each.
   - For custom discrete conditions, define a color and a value range (lower and upper bound) for each condition. The first condition has no lower bound and the last has no upper bound, so together the conditions cover the full range of values.
   - Each gradient or set of discrete conditions supports 2-6 stops or conditions.

### Options

#### Unit override

Configure units as they display in the grid and tooltips.

#### Context links

[Context links][1] are enabled by default; you can toggle them on or off. Context links connect dashboard widgets with other pages (in Datadog or third-party).

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/context-links/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
