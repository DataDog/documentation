---
title: Event Timeline Widget
kind: documentation
description: "Display your Event Stream Timeline in a widget."
aliases:
    - /graphing/widgets/event_timeline/
further_reading:
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The event timeline is a widget version of the timeline that appears at the top of the [Event Stream view][1]:

{{< img src="graphing/widgets/event_timeline/event_timeline.png" alt="Event timeline example"  >}}

## Setup

{{< img src="graphing/widgets/event_timeline/event_timeline_setup.png" alt="Event timeline example"  style="width:80%;">}}

### Configuration

1. Enter a [search query][1] to filter the event stream.
2. On screenboards only, choose whether your widget has a custom timeframe or the screenboard's global timeframe.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][2] for the event timeline widget is:

```text
EVENT_TIMELINE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["event_timeline"]},
        "query": {"type": "string"},
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
| `type`        | string | yes      | Type of the widget, for the event timeline widget use `event_timeline`                                                     |
| `query`       | string | yes      | Query to filter the event timeline with                                                                                    |
| `title`       | string | no       | Title of the widget                                                                                                        |
| `title_size`  | string | no       | Size of the title                                                                                                          |
| `title_align` | string | no       | How to align the title. Available values are: `center`, `left`, or `right`                                                 |
| `time`        | object | no       | Time setting for the widget. See the dedicated [Time JSON schema documentation][3] to learn how to build the `TIME_SCHEMA` |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events
[2]: /dashboards/graphing_json/widget_json
[3]: /dashboards/graphing_json/widget_json/#time-schema
