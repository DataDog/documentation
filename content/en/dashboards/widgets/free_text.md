---
title: Free Text Widget
kind: documentation
description: "Display text in your Screenboards."
aliases:
    - /graphing/widgets/free_text/
further_reading:
- link: "/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

Free text is a widget that allows you to add headings to your [screenboard][1].

This is commonly used to state the overall purpose of the dashboard.

{{< img src="graphing/widgets/free_text/free_text.png" alt="Free Text" >}}

## Setup

{{< img src="graphing/widgets/free_text/free_text_setup.png" alt="Free Text Setup"  style="width:80%;">}}

### Configuration

1. Enter text to display.
2. Choose your text formating.

## API

The dedicated [widget JSON schema definition][2] for the free text widget is:

```text
FREE_TEXT_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["free_text"]},
        "text": {"type": "string"},
        "color": {"type": "string"},
        "font_size": {"type": "string"},
        "text_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "text"],
    "additionalProperties": false
}
```

| Parameter    | Type   | Required | Description                                                                             |
|--------------|--------|----------|-----------------------------------------------------------------------------------------|
| `type`       | string | yes      | Type of the widget, for the free text widget use `free_text`                            |
| `text`       | string | yes      | Text to display                                                                         |
| `color`      | string | no       | Color of the text                                                                       |
| `font_size`  | string | no       | Size of the text                                                                        |
| `text_align` | string | no       | How to align the text on the widget. Available values are: `center`, `left`, or `right` |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/screenboard
[2]: /dashboards/graphing_json/widget_json
