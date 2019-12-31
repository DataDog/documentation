---
title: Host Map Widget
kind: documentation
description: "Display the Datadog host map in your dashboards."
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The host map graphs any metric for any subset of hosts on the same host map visualization available from the main [Infrastructure Host Map][1] menu:

{{< img src="graphing/widgets/hostmap/hostmap.png" alt="Host Map" responsive="true" >}}

## Setup

{{< img src="graphing/widgets/hostmap/hostmap_setup.png" alt="Host Map Setup" responsive="true" >}}

### Configuration

Configuration of the host map widget works as the main [host map page][1]:

1. Choose to display `hosts` or `containers`
2. `Filter by` : Choose which hosts/containers to display
3. `Group by`: Aggregate your hosts/containers by one or several tags.
4. Choose a metric by which to fill your host map elements.
5. Optional: choose a metric by which to size your host map elements.
6. Optional: define a color palette with a `min` and `max` color palette value.

### Options

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="graphing/widgets/options/title.png" alt="Widget title" responsive="true" style="width:80%;">}}

Optionally define its size and alignment.

## API

The dedicated [widget JSON schema definition][2] for the host map widget is:

```
HOSTMAP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["hostmap"]},
        "requests":       {
            "type": "object",
            "properties": {
                'fill': REQUEST_SCHEMA,
                'size': REQUEST_SCHEMA
            },
            "anyOf": [
                {"required": ["fill"]},
                {"required": ["size"]}
            ],
            "additionalProperties": false
        },
        "node_type":       {"enum": ["host", "container"]},
        "no_metric_hosts": {"type": "boolean"},
        "no_group_hosts":  {"type": "boolean"},
        "group":           {"type": "array", "items": {"type": "string"}},
        "scope":           {"type": "array", "items": {"type": "string"}},
        "style":           {
            "type": "object",
            "properties": {
                "palette":      {"type": "string"},
                "palette_flip": {"type": "boolean"},
                "fill_min":     {"type": "string"},
                "fill_max":     {"type": "string"}
            },
            "additionalProperties": false
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Parameter            | Type             | Required | Description                                                                                                                      |
|----------------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| `type`               | string           | yes      | Type of widget; for the host map widget use `hostmap`.                                                                           |
| `requests.fill`      | string           | yes/no   | Query used to fill the map. See the dedicated [Request JSON schema documentation][3] to learn how to build the `REQUEST_SCHEMA`. |
| `requests.size`      | string           | yes/no   | Query used to size the map. See the dedicated [Request JSON schema documentation][3] to learn how to build the `REQUEST_SCHEMA`. |
| `node_type`          | string           | no       | Which type of node to use in the map; available values are: `host` or `container`                                                |
| `no_metric_hosts`    | Boolean          | no       | Whether to show the hosts with no metrics.                                                                                       |
| `no_group_hosts`     | Boolean          | no       | Whether to show the hosts that don't fit in a group.                                                                             |
| `group`              | array of strings | no       | List of tag prefixes to group by.                                                                                                |
| `scope`              | array of strings | no       | List of tags used to filter the map.                                                                                             |
| `style.palette`      | string           | no       | Color palette to apply to the widget.                                                                                            |
| `style.palette_flip` | Boolean          | no       | Whether to flip the palette tones.                                                                                               |
| `style.fill_min`     | string           | no       | Min value to use to color the map.                                                                                               |
| `style.fill_max`     | string           | no       | Max value to use to color the map.                                                                                               |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/infrastructure/hostmap
[2]: /graphing/graphing_json/widget_json
[3]: /graphing/graphing_json/request_json
