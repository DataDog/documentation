---
title: Distribution Widget
kind: documentation
description: "Graph a metric distribution aggregated across one or several tags."
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
---

The Distribution visualization is another way of showing metrics aggregated across one or several tags, such as *hosts*. Unlike the [heat map][1], distribution's x-axis is the quantity rather than time.

This visualization displays only a single metric query; additional queries are disregarded.

**Note**: Outlier detection cannot be performed for this visualization.

{{< img src="graphing/widgets/distribution/distribution.png" alt="Distribution" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/distribution/distribution_setup.png" alt="Distribution" responsive="true" style="width:80%;">}}

### Configuration

Configure your metric query as usual. Note that this visualization type is useful only when metrics are aggregated across Tag Keys , e.g. for each `host`. 
Make a selection in the "`avg`/`max`/`min`/`sum by`…" control to see your data across the associated tags.

### Options
#### Display preference 

{{< img src="graphing/widgets/options/display_preferences.png" alt="Display preferences" responsive="true" style="width:80%;">}}

##### Global time

On Screenboard only, choose whether your widget has a custom timeframe or the global timeframe of the Screenboard.

##### Legend

Enable legend display on your widget by selecting the *Show legend on graph* toggle. Optionally, select the amount of entries to display.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition](/graphing/graphing_json/widgets_json) for the change widget is: 

```
  "definition": {
    "type": "distribution",
    "requests": ["<REQUEST_SCHEMA>"],
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter  | Type             | Description                                                                                                                                                                  |
| ------     | -----            | --------                                                                                                                                                                     |
| `type`     | string           | Type of the widget, for the group widget use `distribution`                                                                                                                  |
| `requests` | array of strings | List of request to display in the widget. See the dedicated [Request JSON schema documentation](/graphing/graphing_json/request_json) to learn how to build the `<REQUEST_SCHEMA>`. |
| `title`       | string           | Title of your widget.                                                                                                                                                            |

Additional properties allowed in a request:

```
{
    "style": {
        "palette": "<PALETTE_STYLE>"
    }
}
```

| Parameter       | Type   | Description                           |
| ------          | -----  | --------                              |
| `style.palette` | string | Color palette to apply to the widget. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/widgets/heat_map
