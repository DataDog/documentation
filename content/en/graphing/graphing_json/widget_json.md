---
title: Widget JSON schema
kind: documentation
further_reading:
- link: "graphing/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
- link: "graphing/dashboards/graphing_json/request_json"
  tag: "Documentation"
  text: "Request JSON schema"
---

This page covers how to use JSON to build a widget in a Datadog dashboard as you would see in the *JSON* tab of a widget. To learn more about the GUI editor, visit the main [Graphing Primer Page][1]

{{< img src="graphing/graphing_json/references-graphing-jsoneditor.png" alt="references graphing jsoneditor" responsive="true" style="width:80%;">}}

All widgets follow the same object structure `WIDGET_SCHEMA`:

```
WIDGET_SCHEMA = {
    "type": "object",
    "properties": {
        "definition": {"type": "object"},
        "id": {"type": "integer"}
    },
    "required": ["definition"],
    "additionalProperties": false
}
```

| Parameter    | Type    | Description                                     |
| ------       | -----   | --------                                        |
| `definition` | Object  | [Definition of the widget](#widget-definition). |
| `id`         | integer | Unique ID for your widget.                      |

## Widget Definition 

A widget definition follow the following object structure:

```
"definition": {
  "type": "<WIDGET_TYPE>",
  "requests": <REQUEST_SCHEMA>,
  "title": "<WIDGET_TITLE>"
}
```

| Parameter  | Type            | Description                                  |
| ------     | -----           | --------                                     |
| `type`     | enum            | Type of the widget.                          |
| `requests` | array of object | [Request(s) associated with your widget][1]. |
| `title`    | string          | Title of your widget.                        |


### Line Charts

{{< img src="graphing/graphing_json/multi-lines.png" alt="multi lines" responsive="true" >}}

If your `requests` parameter has multiple requests, the widget displays all of them.

```
"requests": [
  {
    "q": "<METRIC_1>{<SCOPE_1>}"
  },
  {
    "apm_query": "<METRIC_2>{<SCOPE_2>}"
  },
  {
    "log_query": "<METRIC_3>{<SCOPE_3>}"
  }
]
```

## Widget definition options 

### Y-Axis schema

The Datadog y-axis controls allow you to:

*   Clip y-axis to specific ranges
*   Filter series either by specifying a percentage or an absolute value
*   Change y-axis scale from linear to log, sqrt or power scale

The schema is:

```
AXIS_SCHEMA = {
    "type": "object",
    "properties": {
        "label":        {"type": "string"},
        "scale":        {"type": "string"},
        "min":          {"type": "string"},
        "max":          {"type": "string"},
        "include_zero": {"type": "boolean"}
    },
    "additionalProperties": false
}
```

| Parameter      | Type    | Description                                                                                          | Default  |
| ------         | -----   | --------                                                                                             | ----     |
| `label`        | string  | Label to display on the Y-scale.                                                                     |          |
| `scale`        | string  | Specifies the scale type. Possible values: `linear`, `log`, `sqrt`, `pow##` (eg. `pow2`, `pow0.5`..) | `linear` |
| `min`          | string  | Specifies minimum value to show on y-axis. It takes a number, or `auto` for default behavior.        | `auto`   |
| `max`          | string  | Specifies the maximum value to show on y-axis. It takes a number, or `auto` for default behavior.    | `auto`   |
| `include_zero` | boolean |                                                                                                      |          |

### Events schema

You can overlay any event from Datadog. The general `events` format is:

```
EVENTS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "q": {"type": "string"},
        },
        "required": ["q"],
        "additionalProperties": false
    }
}
```

See the [Event stream documentation][2] to learn more about the `<EVENT_QUERY>` syntax.

#### Examples

For instance, to indicate that you want events for host X and tag Y:

```
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

or if you're looking to display all errors:

```
"events": [
  {
    "q": "status:error"
  }
]
```

### Markers schema

Markers allow you to add a visual conditional formating for your graphs, the `markers` format is:

```
MARKERS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "value":        {"type": "string"},
            "display_type": {"type": "string"},
            "label":        {"type": "string"}
        },
        "required": ["value"],
        "additionalProperties": false
    }
}
```

| Parameter      | Type   | Description                                                                                                                | Default |
| ------         | -----  | --------                                                                                                                   | ----    |
| `value`        | string | Value to apply. Can be a single value `y = 15` or a range of value `0 < y < 10`                                                                                                              |         |
| `display_type` | string | Combination between: <br>- A severity `error`, `warning`, `ok`, or `info` <br> - A line type: `dashed`, `solid`, or `bold` |         |
| `label`        | string | Label to display over the marker.                                                                                          |         |

#### Example:

The following markers:

{{< img src="graphing/graphing_json/markers.png" alt="Markers" responsive="true" style="width:80%;">}}

Are applied with the following configuration:
```
{ (...)
  "widgets": [
    {
      "definition": {
        "markers": [
          {
            "display_type": "ok dashed",
            "label": "OK",
            "value": "0 < y < 50"
          },
          {
            "display_type": "error dashed",
            "label": "ALERT",
            "value": "y > 80"
          },
          {
            "display_type": "warning dashed",
            "label": "WARNING",
            "value": "50 < y < 80"
          }
        ],
        "requests": [(...)],
        "title": "CPU with markers",
        "type": "timeseries"
      },
(...)
},
```

### Conditional format schema

```
CONDITIONAL_FORMATS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "comparator":      {"enum": [">", ">=", "<", "<="]},
            "value":           {"type": "number"},
            "palette":         {"enum": ["blue","custom_bg","custom_image","custom_text","gray_on_white","green","green_on_white","grey","orange","red","red_on_white","white_on_gray","white_on_green","white_on_red","white_on_yellow","yellow_on_white",
            ]},
            "custom_bg_color": {"type": "string"},
            "custom_fg_color": {"type": "string"},
            "image_url":       {"type": "string", "format": "uri"},
        },
        "required": ["comparator", "value", "palette"],
        "additionalProperties": false
    }
}
```

| Parameter         | Type   | Description                                                                                                                                                                                                                                                                      | Default |
| ------            | -----  | --------                                                                                                                                                                                                                                                                         | ----    |
| `comparator`      | enum   | Comparator to apply between: `>`, `>=`, `<`, or `<=`                                                                                                                                                                                                                             |         |
| `value`           | double | Value for the comparator.                                                                                                                                                                                                                                                        |         |
| `palette`         | string | Palette of color to apply, to choose between `blue`, `custom_bg`, `custom_image`, `custom_text`, `gray_on_white`, `green`, `green_on_white`, `grey`, `orange`, `red`, `red_on_white`, `white_on_gray`, `white_on_green`, `white_on_red`, `white_on_yellow`, or `yellow_on_white` |         |
| `custom_bg_color` | string | Palette of colors to apply to the background, same values available as palette.                                                                                                                                                                                                  |         |
| `custom_fg_color` | string | Palette of colors to apply to the background, same values available as palette.                                                                                                                                                                                                  |         |
| `image_url`       | string | Displays an image as the background.                                                                                                                                                                                                                                             |         |

#### Filtering

Filter configuration allows you to automatically change y-axis bounds based on a threshold. Thresholds can be a percentage or an absolute value, and it can apply to both both ends of the graph (lower and upper).

For y-axis filtering, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage. All top values or all values that sit within the top `X%` are cut off.

Examples:

```
"yaxis": {
  "filter": 30 // all top 30 values do not appear
}

"yaxis": {
  "filter": "5%" // the top 5% of that data do not appear
}
```

Advanced configuration works the same way as simple configuration, with the added flexibility of configuring the lower or the upper or both parts of the graph. For example, the following configuration limits the graph to data points that are not in the bottom 10% nor in the top 30%.

```
"yaxis": {
  "filter": {
    "top": "30%",
    "bottom": "10%"
  }
}
```

The following shows all data except those with values higher than 15:

```
"yaxis": {
  "filter": {
    "top": 15
  }
}
```

The following hides data points below 2:

```
"yaxis": {
  "filter": {
    "bottom": 2
  }
}
```

Here is a full JSON example:

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "system.cpu.idle{host:hostname}",
      "stacked": false
    }
  ],
  "events": [],
  "yaxis": {
    "scale": "log"
    "filter": {
      "top": "5%",
      "bottom": 15
    }
  },
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/request_json
[2]: /graphing/event_stream
