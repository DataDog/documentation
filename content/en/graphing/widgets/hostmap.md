---
title: Hostmap Widget
kind: documentation
description: Display the Datadog hostmap in your dashboards.
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
---

The host map graphs any metric for any subset of hosts on the same host map visualization available from the main [Infrastructure Host Map][1] menu:

{{< img src="graphing/widgets/hostmap/hostmap.png" alt="Host Map" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/hostmap/hostmap_setup.png" alt="Host Map Setup" responsive="true" >}}

### Configuration

Configuration of the Hostmap widget works as the main [Hostmap page][1]:

1. Choose to display `host` or `containers`
2. `Filter by` : Choose which hosts/containers to display
3. `Group by`: Aggregate your hosts/containers depending of one or several Tag.
4. Choose a metric to fill your hostmap elements.
5. Optional - Choose a metric to size your hostmap elements.
6. Optional - Define a color palette with a `min` and `max` color palette value.

### Options
#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API


The dedicated [widget JSON schema definition](/graphing/graphing_json/widgets_json) for the change widget is: 

```
  "definition": {
    "type": "hostmap",
    "requests": {
        "fill": <REQUEST_SCHEMA>,
        "size": <REQUEST_SCHEMA>
    },
    "node_type": "<NODE_TYPE>",
    "no_metric_hosts": <NO_METRIC_HOSTS>,
    "no_group_hosts": <NO_GROUP_HOSTS>,
    "group": ["<GROUP>"],
    "scope": ["<SCOPE>"],
    "style": {
        "palette": "<PALETTE>",
        "palette_flip": <PALETTE_FILP>,
        "fill_min": "<FILL_MIN>",
        "fill_max": "<FILL_MAX>"
    },
    "title": "<WIDGET_TITLE>"
  }
```

| Parameter            | Type             | Description                                                                                                                                                           |
| ------               | -----            | --------                                                                                                                                                              |
| `type`               | string           | Type of the widget, for the host map widget use `hostmap`                                                                                                             |
| `requests.fill`      | string           | Query used to fill the map. See the dedicated [Request JSON schema documentation](/graphing/graphing_json/request_json) to learn how to build the `<REQUEST_SCHEMA>`. |
| `requests.size`      | string           | Query used to size the map. See the dedicated [Request JSON schema documentation](/graphing/graphing_json/request_json) to learn how to build the `<REQUEST_SCHEMA>`. |
| `node_type`          | enum             | Which type of node to use in the map, available value are: `host` or `container`|
| `no_metric_hosts`    | boolean          | Whether to show the hosts with no metrics.                                                                                                                            |
| `no_group_hosts`     | boolean          | Whether to show the hosts that don't fit in a group.                                                                                                                  |
| `group`              | array of strings | List of tag prefixes to group by.                                                                                                                                     |
| `scope`              | array of strings | List of tags used to filter the map.                                                                                                                                  |
| `style.palette`      | string           | Color palette to apply to the widget.                                                                                                                                 |
| `style.palette_flip` | boolean          | Whether to flip the palette tones.                                                                                                                                    |
| `style.fill_min`     | string           | Min value to use to color the map.                                                                                                                                    |
| `style.fill_max`     | string           | Max value to use to color the map.                                                                                                                                    |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/infrastructure/hostmap
