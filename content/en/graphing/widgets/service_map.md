---
title: Service Map Widget
kind: documentation
description: "Displays the graphs of a chosen service in your screenboard."
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

This widget displays a map of a service to all of the services that call it, and all of the services that it calls. The node in the center of the widget represents the mapped service. Services that call the mapped service are shown to the left with arrows from the caller to the service. Services that the service calls are displayed to the right, with arrows in the direction of calls.

The service map widget does not respond to time scoping and always shows services that made calls in the preceding two weeks.

{{< img src="graphing/widgets/service_map/test_service_map.png" alt="service map setup" responsive="true" style="width:80%;">}}

## Setup

{{< img src="graphing/widgets/service_map/service_map.png" alt="service map setup" responsive="true" style="width:80%;">}}

### Configuration

1. Select an [environment][1], primary tag (or `*` if enabled for your account), and a [service][2].
2. Enter a title for your graph.

### Results

Nodes are sized relative to one another based on the request. The circumference of a node is heavier and colored green for OK, yellow for warn, red for alert, and grey if there's no data.

Services connected to the mapped service are sorted outwards from the middle by requests. The five services with the highest requests are shown with labels by default. Additionally, any service with a monitor in alert state always has a label.

## API

The dedicated [widget JSON schema definition][3] for the service map widget is:

```
{
  "viz": "servicemap",
  "service": "metric-query",
  "filters": [
    "env:datad0g.com",
    "datacenter:*"
  ]
}
```

| Parameter | Type   | Required | Description                                                       |
|-----------|--------|----------|-------------------------------------------------------------------|
| viz       | string | yes      | The type of widget, for the service map widget, use `servicemap`. |
| service   | string | yes      | The ID of the service you want to map.                            |
| filters   | object | yes      | Your env and primary tag (or `*` if enabled for your account).      |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/apm/#environment
[2]: /tracing/visualization/service
[3]: /graphing/graphing_json/widget_json
