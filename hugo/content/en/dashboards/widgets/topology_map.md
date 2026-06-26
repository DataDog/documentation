---
title: Topology Map Widget
description: "Displays a map of a service to all of the services that call it, and all of the services that it calls."
widget_type: "topology_map"
aliases:
- /dashboards/widgets/service_map
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/tracing/services/services_map/"
  tag: "Documentation"
  text: "Service Map"
---

The Topology Map widget displays a visualization of data sources and their relationships to help understand how data flows through your architecture. 

## Setup

### Configuration

1. Choose the data to graph:
    * Service Map: The node in the center of the widget represents the mapped service. Services that call the mapped service are shown with arrows from the caller to the service. To learn more about the Service Map, reference the [Service Map feature of APM][1].

2. Enter a title for your graph.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/services_map/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
