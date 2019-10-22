---
title: Network Widget
kind: documentation
description: "Displays a timeseries of network data."
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The network widget supplements the network performance monitoring product by allowing you to create timeseries of network data, including volume and TCP retransmit counts of traffic between endpoints. Timeseries created with this widget can be placed in dashboards alongside visualizations of logs, traces, and processes data. 


{{< img src="graphing/widgets/network/network_1.png" alt="Image" video="true" responsive="true" width="80%" >}}

**Note**: This widget only supports timeseries visualizations.

## Setup

1. Select "Network Traffic" from the dropdown menu. By default, this is set to "Metric".

    {{< img src="graphing/widgets/network/network_2.png" alt="Image" video="true" responsive="true" width="80%" >}}

2. Select any source and destination entities you want to group by in the network page, such as service, host, container, and availability zone.

    {{< img src="graphing/widgets/network/network_3.png" alt="Image" video="true" responsive="true" width="80%" >}}

    You can also filter down to a specific service, host, etc., by adding tags to the source and destination search bars.

    {{< img src="graphing/widgets/network/network_4.png" alt="Image" video="true" responsive="true" width="80%" >}}

3. Select the type of data you want to view: bytes sent, bytes received, or retransmits.

    {{< img src="graphing/widgets/network/network_5.png" alt="Image" video="true" responsive="true" width="80%" >}}

4. Select your preferred visualization settings. You can choose to view the data in many colors and as lines, areas, or bars.

    {{< img src="graphing/widgets/network/network_6.png" alt="Image" video="true" responsive="true" width="80%" >}}

## API



## API

The dedicated [widget JSON schema definition][1] for the image widget is:

```
IMAGE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["image"]},
        "url": {"type": "string"},
        "sizing": {"enum": ["zoom", "fit", "center"]},
        "margin": {"enum": ["small", "large"]}
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|yes|Type of the widget, for the image widget use `image`|
|`url`|string|yes|URL of the image|
|`sizing`|string|no|How to size the image on the widget. Available values are: `zoom`, `fit` or `center`
|`margin`|string|no|Size of the margins around the image. Available values are: `small` or `large`


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/widget_json
