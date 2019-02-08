---
title: Timeseries Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
---

{{< img src="graphing/widgets/references-graphing-timeseries-example.png" alt="Timeseries" responsive="true" style="width:80%;">}}

## Overview

The Timeseries visualization allows you to show one or more metrics, Log events, or APM events evolution over time. The time window depends on what is selected on the [Timeboard][1] or in the graph on a [Screenboard][2].

**Note**: Define the Log Analytics query exactly as in the [Log Explorer][3].

## Options

### Line graphs

Line graphs include two additional parameters:

| Parameter | Options               |
|-----------|-----------------------|
| Style     | Solid, Dashed, Dotted |
| Stroke    | Normal, Thin, Thick   |

### Appearance

Graphs can be displayed as Areas, Bars, or Lines. For all graph types, Datadog offers various color options to differentiate multiple metrics displayed on the same graph:

| Palette | Description                                                                                              |
|---------|----------------------------------------------------------------------------------------------------------|
| Classic | The simple colors light blue, dark blue, light purple, purple, light yellow, and yellow (colors repeat). |
| Cool    | A gradient color scheme made from green and blue.                                                        |
| Warm    | A gradient color scheme made from yellow and orange.                                                     |
| Purple  | A gradient color scheme made from purple.                                                                |
| Orange  | A gradient color scheme made from orange.                                                                |
| Gray    | A gradient color scheme made from gray.                                                                  |

For line graphs, different metrics can be assigned specific palettes by separating the queries in JSON.

### Metric aliasing

Each query or formula can be aliased. The alias overrides the display on the graph and legend, which is useful for long metric names. At the end of the query/formula click on **as...**, then enter your metric alias:

{{< img src="graphing/index/metric_alias.png" alt="metric alias" responsive="true" style="width:75%;" >}}

### Overlay events

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, Jenkins deploys, or Docker creation events. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Stream][4], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [Template Variable][5]. |

{{< img src="graphing/index/overlay_events.png" alt="Overlay Events" responsive="true" style="width:75%;" >}}

### Set Y-axis scale

The Datadog y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip the y-axis to specific ranges.
* Remove outliers either by specifying a percentage or an absolute value to remove outliers.
* Change the y-axis scale from linear to log, pow, or sqrt.

Change the Y-axis scale by expanding the **Y-Axis Controls**:

{{< img src="graphing/index/y_axis_control.png" alt="y axis control" responsive="true" style="width:75%;" >}}

The following configuration options are available:

| Option                | Required | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | No       | Specify the minimum and / or maximum value to show on y-axis. It takes a number or `Auto` as the default value.                                                                                                   |
| `Scale`               | No       | Specifies the scale type. Possible values:<br>- *linear*: A linear scale (default)<br>- *log*: A logarithmic scale<br>- *pow*: A Power of 2 scale (2 is default, modify in JSON)<br>- *sqrt*: A square root scale |
| `Always include zero` | No       | Always include zero or fit the axis to the data range. The default is to always include zero.                                                                                                                     |

**Note**: Because the mathematical log function doesn't accept negative values, the Datadog log scale only works if values are of the same sign (everything > 0 or everything < 0). Otherwise an empty graph is returned.

## API


[1]: 
[2]: 
[3]: 
[4]: /graphing/event_stream
[5]: /graphing/dashboards/template_variables
