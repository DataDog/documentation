---
title: Event Stream Widget
kind: documentation
description: "Display filtered events from the Even Stream."
aliases:
    - /graphing/widgets/event_stream/
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The event stream is a widget version of the stream of events on the [Event Stream view][1].

Note: **this widget displays only the 100 most recent events**.

{{< img src="graphing/widgets/event_stream/event_stream.png" alt="event stream" >}}

## Setup

{{< img src="graphing/widgets/event_stream/event_stream_setup.png" alt="event stream setup"  style="width:80%;">}}

### Configuration

1. Enter a [search query][1] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.
3. Use the size parameter to choose to display either only the events title or the full event body.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][2] for the event stream widget is:

```text
EVENT_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["event_stream"]},
        "query": {"type": "string"},
        "event_size": {"enum": ["s", "l"]},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
        "time": TIME_SCHEMA
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| Parameter     | Type   | Required | Description                                                                                                                |
|---------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`        | string | yes      | Type of the widget, for the event stream widget use `event_stream`                                                         |
| `query`       | string | yes      | Query to filter the event stream with                                                                                      |
| `event_size`  | string | no       | Size to use to display an event (small or large). Available values are: `s` or `l`                                         |
| `title`       | string | no       | Title of the widget                                                                                                        |
| `title_size`  | string | no       | Size of the title                                                                                                          |
| `title_align` | string | no       | How to align the title. Available values are: `center`, `left`, or `right`                                                 |
| `time`        | object | no       | Time setting for the widget. See the dedicated [Time JSON schema documentation][3] to learn how to build the `TIME_SCHEMA` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/event_stream
[2]: /graphing/graphing_json/widget_json
[3]: /graphing/graphing_json/widget_json/#time-schema
