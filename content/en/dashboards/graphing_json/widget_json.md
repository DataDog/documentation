---
title: Widget JSON Schema
kind: documentation
aliases:
  - /graphing/graphing_json/widget_json/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/graphing_json/request_json/"
  tag: "Documentation"
  text: "Request JSON schema"
---

To learn more about the GUI editor, see the documentation [graphing editor][1].

## Y-Axis schema

The Datadog y-axis controls allow you to:

*   Clip the y-axis to specific ranges
*   Filter series either by specifying a percentage or an absolute value
*   Change the y-axis scale from linear to log, sqrt, or power scale

The schema is:

```text
AXIS_SCHEMA = {
    "type": "object",
    "properties": {
        "scale":        {"type": "string"},
        "min":          {"type": "string"},
        "max":          {"type": "string"},
        "include_zero": {"type": "boolean"}
    },
    "additionalProperties": false
}
```

| Parameter      | Type    | Description                                                                                           | Default  |
|----------------|---------|-------------------------------------------------------------------------------------------------------|----------|
| `scale`        | string  | Specifies the scale type. Possible values: `linear`, `log`, `sqrt`, `pow##` (eg. `pow2`, `pow0.5`..)  | `linear` |
| `min`          | string  | Specifies minimum value to show on the y-axis. It takes a number, or `auto` for default behavior.     | `auto`   |
| `max`          | string  | Specifies the maximum value to show on the y-axis. It takes a number, or `auto` for default behavior. | `auto`   |
| `include_zero` | Boolean |                                                                                                       |          |

## Events schema

You can overlay any event from Datadog. The general `events` format is:

```text
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

See the [Event stream documentation][2] for more details about the query syntax.

### Examples

For instance, to indicate that you want events for host X and tag Y:

```text
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

or, if you're looking to display all errors:

```text
"events": [
  {
    "q": "status:error"
  }
]
```

## Markers schema

Markers allow you to add visual conditional formatting for your graphs. The `markers` format is:

```text
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

| Parameter      | Type   | Description                                                                                                           |
|----------------|--------|-----------------------------------------------------------------------------------------------------------------------|
| `value`        | string | Value to apply. Can be a single value `y = 15` or a range of values `0 < y < 10`                                      |
| `display_type` | string | Combination of: <br>- A severity `error`, `warning`, `ok`, or `info` <br> - A line type: `dashed`, `solid`, or `bold` |
| `label`        | string | Label to display over the marker.                                                                                     |

### Example:

The following markers:

{{< img src="dashboards/graphing_json/markers.png" alt="Markers" style="width:80%;">}}

Are applied with the following configuration:

```text
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

```text
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

| Parameter         | Type   | Description                                                                                                                                                                                                                                                             |
|-------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `comparator`      | enum   | Comparator to apply from: `>`, `>=`, `<`, or `<=`                                                                                                                                                                                                                       |
| `value`           | double | Value for the comparator.                                                                                                                                                                                                                                               |
| `palette`         | string | Color palette to apply; choose from `blue`, `custom_bg`, `custom_image`, `custom_text`, `gray_on_white`, `green`, `green_on_white`, `grey`, `orange`, `red`, `red_on_white`, `white_on_gray`, `white_on_green`, `white_on_red`, `white_on_yellow`, or `yellow_on_white` |
| `custom_bg_color` | string | Color palette to apply to the background, same values available as palette.                                                                                                                                                                                             |
| `custom_fg_color` | string | Color palette to apply to the foreground, same values available as palette.                                                                                                                                                                                             |
| `image_url`       | string | Displays an image as the background.                                                                                                                                                                                                                                    |
## Time schema

The available time frames depend on the widget you are using, but the general format for `time` is:

```text
TIME_SCHEMA = {
    "type": "object",
    "properties": {
        "live_span": {"enum": [
            '1m',
            '5m',
            '10m',
            '15m',
            '30m',
            '1h',
            '4h',
            '1d',
            '2d',
            '1w',
            '1mo',
            '3mo',
            '6mo',
            '1y',
            'alert'
        ]}
    },
    "additionalProperties": false
}
```

| Parameter   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
|-------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `live_span` | string | A short name to represent a timeframe value. Available values are:<br> -`1m`: 1 minute<br> -`5m`: 5 minutes<br> -`10m`: 10 minutes<br> -`15m`: 15 minutes<br> -`30m`: 30 minutes<br> -`1h`: 1 hour<br> -`4h`: 4 hours<br> -`1d`: 1 day<br> -`2d`: 2 days<br> -`1w`: 1 week<br> -`1mo`: 1 month<br> -`3mo`: 3 months<br> -`6mo`: 6 months<br> -`1y`: 1 year<br> -`alert`: used in the `alert_graph` widget only |

### Example

For instance, to indicate that you want a 10-minute timeframe, use the following:

```text
"time": {
  "live_span": "10m"
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/#graphing-editor
[2]: /events/
