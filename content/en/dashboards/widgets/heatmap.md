---
title: Heatmap Widget
description: "Build temporal heat map over a given metric."
widget_type: "heatmap"
aliases:
    - /graphing/widgets/heat_map/
    - /dashboards/widgets/heat_map/
further_reading:
- link: "/real_user_monitoring/product_analytics/heatmaps/"
  tag: "Documentation"
  text: "Learn more about heatmaps"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "https://www.datadoghq.com/blog/visualize-behavior-datadog-heatmaps/"
  tag: "Blog"
  text: "Visualize user behavior with Datadog Heatmaps"
---

{{< img src="dashboards/widgets/heatmap/heatmap.png" alt="Example heatmap graph visualization" style="width:100%;">}}

The heatmap widget shows metrics aggregated across multiple tags. Use heatmap widgets to visualize OpenTelemetry histograms, distribution metrics, high resolution and data display.

## Setup

### Configuration

Configure your metric query as usual. Graph OpenTelemetry histograms by using the 'counters' histogram mode.

Make a selection in the "`avg`/`max`/`min`/`sum by`/etc." control to see your data across the associated tags.

### Options

#### Y-axis controls

Y-axis controls are available through the UI and the JSON editor.

They allow you to:

* Clip the y-axis to specific ranges.
* Automatically change y-axis bounds based on an absolute value threshold. This threshold can be applied to one or both ends of the graph (lower and upper) to remove the "outlier" series.
* Change the y-axis scale from linear to log, pow, or sqrt.

Change the Y-axis scale by expanding the *Y-Axis Controls* button.

The following configuration options are available:

| Option                | Required | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | No       | Specify the minimum and / or maximum value to show on y-axis. It takes a number or `Auto` as the default value.                                                                                                   |
| `Scale`               | No       | Specifies the scale type. Possible values:<br>- *linear*: A linear scale (default)<br>- *log*: A logarithmic scale<br>- *pow*: A Power of 2 scale (2 is default, modify in JSON)<br>- *sqrt*: A square root scale |
| `Always include zero` | No       | Always include zero or fit the axis to the data range. The default is to always include zero.                                                                                                                     |

**Note**: Because the mathematical log function doesn't accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/explorer/#search-syntax
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
