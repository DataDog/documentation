---
title: Notes and Links Widget
kind: documentation
description: "Display text in your Screenboards."
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The notes and links widget is similar to [free text widget][1], but allows for more formatting options:

## Setup

{{< img src="graphing/widgets/note/using_link_note_widget.gif" alt="Notes and links widget setup" responsive="true"  style="width:80%;">}}

1. Enter the text you want to display. Note that Markdown is supported.
2. Choose the text size and the note background color.
3. Select the pointer position.

## API

The dedicated [widget JSON schema definition][2] for the note widget is:

```
NOTE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["note"]},
        "content": {"type": "string"},
        "background_color": {"type": "string"},
        "font_size": {"type": "string"},
        "text_align": {"enum": ["center", "left", "right"]}
        "show_tick": {"type": "boolean"},
        "tick_pos": {"type": "string"},
        "tick_edge": {"enum": ["bottom", "left", "right", "top"]}
    },
    "required": ["type", "content"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | yes      | Type of the widget, for the note widget use `note`|
|`content`|string|yes|Content of the note|
|`background_color`|string|no|Background color of the note|
|`font_size`|string|no|Size of the text|
|`text_align`|string|no|How to align the text on the widget. Available values are: `center`, `left`, or `right`
|`show_tick`|Boolean|no|Whether to show a tick or not
|`tick_pos`|string|no|Where to position the tick on an edge
|`tick_edge`|string|no|Edge on which the tick will be displayed. Available values are: `bottom`, `left`, `right`, or `top`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/widgets/free_text
[2]: /graphing/graphing_json/widget_json
