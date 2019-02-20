---
title: Group Widget
kind: documentation
description: Group your widgets together in a Timeboard.
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
---

The groups widget allows you to keep similar graphs together on your [Timeboard][1]. Each group has a custom header, can hold one to many graphs, and is collapsible:

{{< img src="graphing/widgets/group/group.gif" alt="Group Widget" responsive="true">}}

## Setup

Choose a name for your Group by using the cog icon in the upper right corner of your group.

## API
The dedicated [widget JSON schema definition](/graphing/graphing_json/widgets_json) for the change widget is: 

```
  "definition": {
    "type": "group",
    "layout_type": "<LAYOUT_TYPE>"
    "widgets": ["<WIDGET_SCHEMA>"]
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter     | Type             | Description                                                                                                                                                                      |
| ------        | -----            | --------                                                                                                                                                                         |
| `type`        | string           | Type of the widget, for the group widget use `group`                                                                                                                             |
| `widgets`     | array of objects | List of widgets that belong to the group widget. See the dedicated [Widget JSON schema documentation](/graphing/graphing_json/widget_json) to learn how to build the `<WIDGET_SCHEMA>`. |
| `layout_type` | string           | Layout type of the group, value available is `ordered`                                                                                                                           |
| `title`       | string           | Title of your widget.                                                                                                                                                            |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/dashboards/timeboard
