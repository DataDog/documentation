---
title: Heat Map Widget
kind: documentation
description: "Build temporal heat map over a given metric."
widget_type: "heatmap"
aliases:
    - /graphing/widgets/heat_map/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The heat map visualization shows metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square is.

This visualization displays only a single metric query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="dashboards/widgets/heat_map/heat_map.png" alt="Heat Map" >}}

## Setup

{{< img src="dashboards/widgets/heat_map/heat_map_setup.png" alt="Heat Map setup" style="width:80%;">}}

### Configuration

Configure your metric query as usual. **Note**: This visualization type is useful only when metrics are aggregated across tag keys, such as for each `host`.

Make a selection in the "`avg`/`max`/`min`/`sum by`/etc." control to see your data across the associated tags.

### Options

#### Event overlays

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, events in the staging environment, or events from containers that match a prefix. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Explorer][1]. See the examples in the table below:

| Query                     | Description                                                      |
|---------------------------|------------------------------------------------------------------|
| `source:(github OR chef)` | Show events from GitHub or Chef.                                 |
| `env:staging`             | Show events with the tag `env:staging`.                          |
| `container_id:foo*`       | Show events from all containers with an ID beginning with `foo`. |

#### Y-axis controls

Y-axis controls are available through the UI and the JSON editor. 

They allow you to:

* Clip the y-axis to specific ranges.
* Automatically change y-axis bounds based on a percentage or an absolute value threshold. This threshold can be applied to one of both ends of the graph (lower and upper) in order to remove "outliers" series.
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

This widget can be used with the **Dashboards API**. See the [Dashboards API][2] for details.

See the table below for the [widget JSON schema definition][3] for the heat map widget:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/explorer/#search-syntax
[2]: /api/v1/dashboards/
[3]: /dashboards/graphing_json/widget_json/
