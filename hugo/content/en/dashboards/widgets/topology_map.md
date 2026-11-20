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

1. Choose the data source to graph:

    | Data source | What the node represents | What the lines represent |
    |---|---|---|
    | [Service Map][1] | The mapped service, which is the service selected in the widget's configuration | An upstream-to-downstream relationship, in either direction |
    | [Data Streams][4] | A component in a data pipeline, such as a service or queue | The flow of data between producers and consumers in the pipeline |
    | [Network Path][5] | A hop along a network path | The latency-annotated link between two hops, from source to destination |

    For Service Map, if another service calls the mapped service, a line points from that service to the mapped service. If the mapped service calls other services, a line points from the mapped service to each of those services.

2. Enter a title for your graph.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/services_map/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
[4]: /data_streams/
[5]: /network_monitoring/network_path/
