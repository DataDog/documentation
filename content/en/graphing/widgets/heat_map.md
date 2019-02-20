---
title: Heat Map Widget
kind: documentation
description: Build temporal heat map over a given metric.
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

The heat map visualization is great for showing metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square is.

This visualization displays only a single metric query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="graphing/widgets/heat_map/heat_map.png" alt="Heat Map" responsive="true">}}

## Setup

{{< img src="graphing/widgets/heat_map/heat_map_setup.png" alt="Heat Map setup" responsive="true" style="width:80%;">}}

### Configuration

Configure your metric query as usual. Note that this visualization type is useful only when metrics are aggregated across Tag Keys , e.g. for each `host`.

Make a selection in the "`avg`/`max`/`min`/`sum by`…" control to see your data across the associated tags.

### Options
#### Event Overlay

Add events from related systems to add more context to your graph. For example, you can add GitHub commits, Jenkins deploys, or Docker creation events. Expand the **Event Overlays** section and enter a query to display those events. Use the same query format as for the [Event Stream][1], for example:

| Query                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Shows all events from the Jenkins source.                  |
| `tag:role:web`              | Shows all events with the tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Shows all events from the selected [Template Variable][2]. |

#### Y-axis controls

Y-axis controls are available via the UI and the JSON editor. They allow you to:

* Clip the y-axis to specific ranges.
* Remove outliers either by specifying a percentage or an absolute value to remove outliers.
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

The dedicated [widget JSON schema definition](/graphing/graphing_json/widgets_json) for the change widget is: 

```
  "definition": {
    "type": "heatmap",
    "requests": ["<REQUEST_SCHEMA>"],
    "yaxis":  <AXIS_SCHEMA>,
    "events": <EVENTS_SCHEMA>,
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter  | Type             | Description                                                                                                                                                                         |
| ------     | -----            | --------                                                                                                                                                                            |
| `type`     | string           | Type of the widget, for the group widget use `heatmap`                                                                                                                              |
| `requests` | array of strings | List of request to display in the widget. See the dedicated [Request JSON schema documentation](/graphing/graphing_json/request_json) to learn how to build the `<REQUEST_SCHEMA>`. |
| `yaxis`    | object           | Y-axis control options. See the dedicated [Y-axis JSON schema documentation](/graphing/graphing_json/widget_json/#y-axis-schema) to learn how to build the `<AXIS_SCHEMA>`.       |
| `events`   | object           | Event overlay control options. See the dedicated [Events JSON schema documentation](/grpahing/graphing_json/widget_json/#events-schema) to learn how to build the `<EVENTS_SCHEMA>` |
| `title`    | string           | Title of your widget.                                                                                                                                                               |

Additional properties allowed in a request:

```
{
    "style": {
        "palette": "<PALETTE_STYLE>"
    }
}
```

| Parameter       | Type   | Description                           |
| ------          | -----  | --------                              |
| `style.palette` | string | Color palette to apply to the widget. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/event_stream
[2]: /graphing/dashboards/template_variables
