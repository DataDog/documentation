---
title: Service Map Widget
kind: documentation
description: "Displays a map of a service to all of the services that call it, and all of the services that it calls."
widget_type: "servicemap"
aliases:
    - /graphing/widgets/service_map/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

This widget displays a map of a service to all of the services that call it, and all of the services that it calls. The node in the center of the widget represents the mapped service. Services that call the mapped service are shown to the left with arrows from the caller to the service. Services that the service calls are displayed to the right, with arrows in the direction of calls.

The service map widget does not respond to time scoping and always shows services that made calls in the preceding two weeks. Metrics are calculated for each services in real time for the previous hour.

{{< img src="dashboards/widgets/service_map/test_service_map.png" alt="service map setup" style="width:80%;">}}

## Setup

{{< img src="dashboards/widgets/service_map/service_map.png" alt="service map setup" style="width:80%;">}}

### Configuration

1. Choose your [environment][1] scope, [primary tag][2] (or `*`) if it is set up for your account, and [service][3] name.
2. Enter a title for your graph.

### Results

Nodes are sized relative to one another based on the request rate. The circumference of a node is colored based on monitor status - green for OK, yellow for warn, red for alert, and grey if there's no data.

Services connected to the mapped service are sorted outwards from the middle by request rate. The five services with the highest requests are shown with labels by default. Additionally, any service with a monitor in alert state always has a label.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][4] for additional reference.

The dedicated [widget JSON schema definition][5] for the service map widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: /tracing/guide/setting_primary_tags_to_scope/
[3]: /tracing/visualization/service/
[4]: /api/v1/dashboards/
[5]: /dashboards/graphing_json/widget_json/
