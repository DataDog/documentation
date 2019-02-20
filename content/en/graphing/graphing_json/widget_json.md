---
title: Datadog Widgets schemas
kind: documentation
---

All widgets follow the same object structure `WIDGET_SCHEMA`:

```
"widgets": {
  "definition": <WIDGET_DEFINITION>,
  "id": 123456
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

| Parameter | Type            | Description                             |
| ------    | -----           | --------                                |
| `type`    | enum            | Type of the widget.                     |
| `requests` | array of object | [Request(s) associated with your widget](/graphing/graphing_json/request_json). |
| `title`   | string          | Title of your widget.                   |


### Line Charts

{{< img src="graphing/graphing_json/multi-lines.png" alt="multi lines" responsive="true" >}}

If your `requests` parameter has multiple requests, the widget displays all of them.

```json
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

## Widget Options 

### Y-Axis schema

The Datadog y-axis controls allow you to:

*   Clip y-axis to specific ranges
*   Filter series either by specifying a percentage or an absolute value
*   Change y-axis scale from linear to log, sqrt or power scale

The schema is:

```
yaxis {
  "label": "<LABEL_NAME>",
  "scale": "linear",
  "min": "auto",         
  "max": "auto",
  "include_zero": "false"
}
```

| Parameter      | Type    | Description                                                                                          | Default  |  |
| ------         | -----   | --------                                                                                             | ----     |  |
| `label`        | string  |                                                                                                      |          |  |
| `scale`        | string  | Specifies the scale type. Possible values: `linear`, `log`, `sqrt`, `pow##` (eg. `pow2`, `pow0.5`..) | `linear` |  |
| `min`          | string  | Specifies minimum value to show on y-axis. It takes a number, or `auto` for default behavior.        | `auto`   |  |
| `max`          | string  | Specifies the maximum value to show on y-axis. It takes a number, or `auto` for default behavior.    | `auto`   |  |
| `include_zero` | boolean |                                                                                                      |          |  |

### Events schema

You can overlay any event from Datadog. The general format is:

```
"events": {
  [
    "q": "<EVENT_QUERY>""
  ]
}
```

See the [Event stream documentation](/graphing/event_stream) to learn more about the `<EVENT_QUERY>` syntax.

#### Examples

For instance, to indicate that you want events for host X and tag Y:

```json
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

or if you're looking to display all errors:

```json
"events": [
  {
    "q": "status:error"
  }
]
```

## Markers schema

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
        "additionalProperties": False
    }
}
```


## Conditional format schema


```
CONDITIONAL_FORMATS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "comparator":      {"enum": [">", ">=", "<", "<="]},
            "value":           {"type": "number"},
            "palette":         {"enum": [
                "blue",
                "custom_bg",
                "custom_image",
                "custom_text",
                "gray_on_white",
                "green",
                "green_on_white",
                "grey",
                "orange",
                "red",
                "red_on_white",
                "white_on_gray",
                "white_on_green",
                "white_on_red",
                "white_on_yellow",
                "yellow_on_white",
            ]},
            "custom_bg_color": {"type": "string"},
            "custom_fg_color": {"type": "string"},
            "image_url":       {"type": "string", "format": "uri"},
        },
        "required": ["comparator", "value", "palette"],
        "additionalProperties": False
    }
}
```


#### Filtering

Filter configuration allows you to automatically change y-axis bounds based on a threshold. Thresholds can be a percentage or an absolute value, and it can apply to both both ends of the graph (lower and upper).

For y-axis filtering, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage. All top values or all values that sit within the top `X%` are cut off.

Examples:

```json
"yaxis": {
  "filter": 30 // all top 30 values do not appear
}

"yaxis": {
  "filter": "5%" // the top 5% of that data do not appear
}
```

Advanced configuration works the same way as simple configuration, with the added flexibility of configuring the lower or the upper or both parts of the graph. For example, the following configuration limits the graph to data points that are not in the bottom 10% nor in the top 30%.

```json
"yaxis": {
  "filter": {
    "top": "30%",
    "bottom": "10%"
  }
}
```

The following shows all data except those with values higher than 15:

```json
"yaxis": {
  "filter": {
    "top": 15
  }
}
```

The following hides data points below 2:

```json
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
