---
title: Log Stream Widget
kind: documentation
description: "Display a filtered log stream in your Datadog dashboards."
aliases:
    - /graphing/widgets/log_stream/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The Log Stream displays a log flow matching the defined query:

{{< img src="graphing/widgets/log_stream/log_stream.png" alt="Log stream" >}}

## Setup

### Configuration

{{< img src="graphing/widgets/log_stream/log_stream_setup.png" alt="Log stream setup"  style="width:80%;">}}

Enter a [log query][1] to filter the log stream.

### Options

#### Columns

Display values of your [facets][2] and [measures][3] with columns.

#### Global time

On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][4] for the log stream widget is:

```text
LOG_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["log_stream"]},
        "logset": {"type": "string"},
        "query": {"type": "string"},
        "columns": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type", "logset"],
    "additionalProperties": false
}
```

| Parameter     | Type   | Required | Description                                                                                                                |
|---------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`        | string | yes      | Type of the widget, for the log stream widget use `log_stream`                                                             |
| `logset`      | string | yes      | Which logset to use for the stream                                                                                         |
| `query`       | string | no       | Query to filter the log stream with                                                                                        |
| `columns`     | array  | no       | Which columns to display on the widget                                                                                     |
| `title`       | string | no       | Title of the widget                                                                                                        |
| `title_size`  | string | no       | Size of the title                                                                                                          |
| `title_align` | string | no       | How to align the title. Available values are: `center`, `left`, or `right`                                                 |
| `time`        | object | no       | Time setting for the widget. See the dedicated [Time JSON schema documentation][5] to learn how to build the `TIME_SCHEMA` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/search
[2]: /logs/explorer/?tab=facets#setup
[3]: /logs/explorer/?tab=measures#setup
[4]: /dashboards/graphing_json/widget_json
[5]: /dashboards/graphing_json/widget_json/#time-schema
