---
title: Network Performance Monitor
kind: Documentation
further_reading:
- link: "/network_monitoring/performance/"
  tag: "Documentation"
  text: "Learn more about Network Performance Monitoring"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/manage/status/"
  tag: "Documentation"
  text: "Check your monitor status"
---

{{< callout btn_hidden="true">}}
The Network Performance monitor is in beta.
{{< /callout >}}

## Overview

Datadog [Network Performance Monitoring][1] (NPM) gives you visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog. After you enable NPM, you can create an NPM monitor and get alerted if a TCP network metric crosses a threshold that you've set. For example, you can monitor network throughput between a specific client/server and get alerted if that throughput crosses a threshold. 

## Monitor creation

To create an NPM monitor in Datadog, use the main navigation: **Monitors** --> **New Monitor** --> **Network Performance**. 

## Define the search query

1. Construct a search query using the same logic as the [NPM analytics][2] search bar. 
1. Select the tags you want to group your client and server by.
1. Choose if you want to show or hide N/A traffic.
1. Select a metric you want to measure from the dropdown list. The NPM monitor only measures the sum of the metric values. See which metrics are available for NPM monitors in the [metric definitions](#metric-definitions).
1. Set the limit on how many results you want to be included in the query.

### Using formulas and functions

You can create NPM monitors using formulas and functions. This can be used, for example, to create monitors on throughput between a client and server. 

The following example shows using a formula to calculate percent retransmits from a client to server. 

{{< img src="monitors/monitor_types/network_performance/npm_formulas_functions.png" alt="Example NPM monitor configuration showing percent of retransmits from a client to server" style="width:100%;" >}}

For more information, see the [Functions][3] documentation.

## Metric definitions

The table below lists the different NPM metrics that you can create monitors on. 

### Volume
| Metric name    | Definition                 | 
| -------------- | -------------------------  | 
| Bytes Received | Bytes received from client |
| Bytes Sent     | Bytes sent from client     |
| Packets Sent   | Packets sent from client   |

### TCP
| Metric name             | Definition                                    | 
| ----------------------  | --------------------------------------------- | 
| Retransmits             |Retransmits between client/server              |
| Established Connections | Establishes connections between client/server |
| Closed Connections      | Closed connections between client/server      |

### DNS
| Metric name              | Definition                               |
| -----------------------  | ---------------------------------------  |
| DNS Requests             | Total number of DNS requests             |
| DNS Timeouts             | Total number of DNS failures             |
| DNS Failed Responses     | Total number of DNS timeouts             |
| DNS Successful Responses | Total number of DNS failed responses     |
| DNS Failure Latency      | Total number of DNS successful responses |
| DNS Success Latency      | Average DNS failure latency              |
| NXDOMAIN Errors          | Average DNS success latency              |
| SERVFAIL Errors          | Total number of NXDOMAIN errors          |
| Other Errors             | Total number of SERVAIL errors           |

## Set alert conditions

Configure monitors to trigger if the query value crosses a threshold and customize advanced alert options for recovery thresholds and evaluations delays. For more information, see [Configure Monitors][5].

## Notifications
For detailed instructions on the Notify your team section, see the [Notifications][4] page.

## Recommended monitors

You can start creating monitors on NPM data with the following recommended monitors.

### Throughput monitor
A throughput monitor alerts you if the throughput between two endpoints specified in the query surpasses a threshold. 

{{< img src="path/to/your/image-name-here.png" alt="Your image description" style="width:100%;" >}}

### Percent retransmit
A percent retransmits monitor alerts you if the percentage of total sent packages resulting in retransmits passes a threshold. 

{{< img src="monitors/monitor_types/network_performance/npm_formulas_functions.png" alt="Example NPM monitor configuration showing percent of retransmits from a client to server" style="width:100%;" >}}

### DNS failures
DNS failure monitor alerts you if the sum of DNS failures passes a threshold. 

{{< img src="static/images/monitors/monitor_types/network_performance/example_dns_failures.png" alt="Your image description" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance/
[2]: /network_monitoring/performance/network_analytics/
[3]: /dashboards/functions/
[4]: /monitors/notify/
[5]: /monitors/configuration/