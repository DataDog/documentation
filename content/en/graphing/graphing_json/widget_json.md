---
title: Widget JSON schema
kind: documentation
further_reading:
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
- link: "graphing/graphing_json/request_json"
  tag: "Documentation"
  text: "Request JSON schema"
---

This page covers how to use JSON to build a widget in a Datadog dashboard, as you would see in the *JSON* tab of a widget. To learn more about the GUI editor, visit the main [Graphing documentation Page][1]

{{< img src="graphing/graphing_json/references-graphing-jsoneditor.png" alt="references graphing jsoneditor" responsive="true" style="width:80%;">}}

All widgets follow the same object `WIDGET_SCHEMA` structure:

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
| `definition` | object  | [Definition of the widget](#widget-definition). |
| `id`         | integer | Unique ID of the widget.                      |

## Widget Definition 

A widget definition follows the following object structure:

```
"definition": {
  "type": "<WIDGET_TYPE>",
  "requests": <REQUEST_SCHEMA>,
  "title": "<WIDGET_TITLE>",
  "yaxis": "<AXIS_SCHEMA>",
  "events": "<EVENTS_SCHEMA>",
  "markers": "<MARKERS_SCHEMA>",
  "conditional_formats": "<CONDITIONAL_FORMATS_SCHEMA>"
}
```

The 3 first parameters are mandatory and present on all widgets:

| Parameter  | Type            | Required | Description                                  |
| ------     | -----           | -----    | --------                                     |
| `type`     | enum            | yes      | Type of widget.                          |
| `requests` | array of object | yes      | [Request(s) associated with the widget][1]. |
| `title`    | string          | yes      | Title of the widget.                        |

The others are optional parameters that enhance your widgets, but are only available depending on the `type` of widget.

| Parameter             | Type   | Required | Description                                                                                                                                                                              |
| ------                | -----  | -------- | ----                                                                                                                                                                                     |
| `yaxis`               | object | no       | Y-axis control options. See the dedicated [Y-axis JSON schema documentation](#y-axis-schema) to learn how to build the `AXIS_SCHEMA`.                                                    |
| `events`              | object | no       | Event overlay control options. See the dedicated [Events JSON schema documentation](#events-schema) to learn how to build the `EVENTS_SCHEMA`                                            |
| `markers`             | object | no       | Markers overlay control options. See the dedicated [Markers JSON schema documentation](#markers-schema) to learn how to build the `MARKERS_SCHEMA`                                       |
| `conditional_formats` | object | no       | Conditional format control options. See the dedicated [Conditional format JSON schema documentation](#conditional-format-schema) to learn how to build the `CONDITIONAL_FORMATS_SCHEMA`. |

{{< whatsnext desc="Refer to each widget dedicated documentation to learn how to build a specific widget:">}}
    {{< nextlink href="/graphing/widgets/change/#api" >}}Change{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/distribution/#api" >}}Distribution{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/group/#api" >}}Group{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/heat_map/#api" >}}Heat Map{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/hostmap/#api" >}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/query_value/#api" >}}Query Value{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/scatter_plot/#api" >}}Scatter Plot{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/timeseries/#api" >}}Timeseries{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/top_list/#api" >}}Top List{{< /nextlink >}}
{{< /whatsnext >}}

## Y-Axis schema

The Datadog y-axis controls allow you to:

*   Clip the y-axis to specific ranges
*   Filter series either by specifying a percentage or an absolute value
*   Change the y-axis scale from linear to log, sqrt, or power scale

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
| `min`          | string  | Specifies minimum value to show on the y-axis. It takes a number, or `auto` for default behavior.        | `auto`   |
| `max`          | string  | Specifies the maximum value to show on the y-axis. It takes a number, or `auto` for default behavior.    | `auto`   |
| `include_zero` | Boolean |                                                                                                      |          |

## Events schema

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

### Examples

For instance, to indicate that you want events for host X and tag Y:

```
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

or, if you're looking to display all errors:

```
"events": [
  {
    "q": "status:error"
  }
]
```

## Markers schema

Markers allow you to add visual conditional formatting for your graphs. The `markers` format is:

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

| Parameter      | Type   | Description                                                                                                                |
| ------         | -----  | --------                                                                                                                   |
| `value`        | string | Value to apply. Can be a single value `y = 15` or a range of values `0 < y < 10`                                            |
| `display_type` | string | Combination of: <br>- A severity `error`, `warning`, `ok`, or `info` <br> - A line type: `dashed`, `solid`, or `bold` |
| `label`        | string | Label to display over the marker.                                                                                          |


### Example:

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

## Conditional format schema

Conditional formats allow you to set the color of your widget content or background, depending on a rule applied to your data.

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

| Parameter         | Type   | Description                                                                                                                                                                                                                                                                      |
| ------            | -----  | --------                                                                                                                                                                                                                                                                         |
| `comparator`      | enum   | Comparator to apply from: `>`, `>=`, `<`, or `<=`                                                                                                                                                                                                                             |
| `value`           | double | Value for the comparator.                                                                                                                                                                                                                                                        |
| `palette`         | string | Color palette to apply; choose from `blue`, `custom_bg`, `custom_image`, `custom_text`, `gray_on_white`, `green`, `green_on_white`, `grey`, `orange`, `red`, `red_on_white`, `white_on_gray`, `white_on_green`, `white_on_red`, `white_on_yellow`, or `yellow_on_white` |
| `custom_bg_color` | string | Color palette to apply to the background, same values available as palette.                                                                                                                                                                                                  |
| `custom_fg_color` | string | Color palette to apply to the foreground, same values available as palette.                                                                                                                                                                                                  |
| `image_url`       | string | Displays an image as the background.                                                                                                                                                                                                                                             |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing
[2]: /graphing/event_stream
