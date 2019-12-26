---
title: Network Widget
kind: documentation
description: "Displays a timeseries of network data."
further_reading:
- link: "network_performance_monitoring/"
  tag: "Documentation"
  text: "Network Performance Monitoring"
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The network widget supplements the [Network Performance Monitoring][1] feature by allowing you to create timeseries of network data, including volume and TCP retransmit counts of traffic between services, hosts, containers, and any other Datadog tag. Timeseries created with this widget can be placed in dashboards alongside visualizations of logs, traces, and processes data. 


{{< img src="graphing/widgets/network/network_1.png" alt="Image" responsive="true" width="80%" >}}

**Note**: This widget only supports timeseries visualizations.

## Setup

1. Select "Network Traffic" from the dropdown menu. By default, this is set to "Metric".

    {{< img src="graphing/widgets/network/network_2.png" alt="Image"  responsive="true" width="80%" >}}

2. Select any source and destination entities you want to group by in the network page, such as service, host, container, and availability zone.

    {{< img src="graphing/widgets/network/network_3.png" alt="Image" responsive="true" width="80%" >}}

    You can also filter down to a specific service, host, etc., by adding tags to the source and destination search bars.

    {{< img src="graphing/widgets/network/network_4-2.png" alt="Image" responsive="true" width="80%" >}}

3. Select the type of data you want to view: bytes sent, bytes received, or retransmits.

    {{< img src="graphing/widgets/network/network_5-2.png" alt="Image" responsive="true" width="80%" >}}

4. Select your preferred visualization settings. You can choose to view the data in many colors and as lines, areas, or bars.

    {{< img src="graphing/widgets/network/network_6.png" alt="Image" responsive="false" style="width:60%;" >}}

## API

The dedicated [widget JSON schema definition][2] for the network widget is:

```
{
  "viz": "timeseries",
  "requests": [
    {
      "network_query": {
        "index": "netflow-search",
        "search": {
          "query": ""
        },
        "groupBy": [
          {
            "facet": {source_entity_type}
          },
          {
            "facet": {destination_entity_type}
          }
        ],
        "compute": {
          "aggregation": "sum",
          "facet": {type of data you’d like to display}
        }
      },
      "style": {
        "palette": {color},
        "type": "solid",
        "width": "normal"
      },
      "type": "area",
      "conditional_formats": [],
      "aggregator": "avg"
    }
  ],
  "autoscale": true
}
```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_performance_monitoring
[2]: /graphing/graphing_json/widget_json
