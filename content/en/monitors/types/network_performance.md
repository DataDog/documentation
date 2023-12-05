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

<div class="alert alert-warning">The Network Performance monitor is in beta. </div>

## Overview

Datadog [Network Performance Monitoring][1] (NPM) gives you visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog. After you enable NPM, you can create an NPM monitor and get alerted if a TCP network metric crosses a threshold that you've set. For example, you can monitor network throughput between a specific client/server and get alerted if that throughput crosses a threshold. 

## Monitor creation

To create an NPM monitor in Datadog, use the main navigation: [**Monitors** --> **New Monitor** --> **Network Performance**][2]. 

## Define the search query

{{< img src="monitors/monitor_types/network_performance/example_dns_failures.png" alt="Example configuration with auto-grouped  client and server, hidden N/A values, measures the sum of DNS failures metric with limit of 100" style="width:100%;" >}}

1. Construct a search query using the same logic as the [NPM analytics][3] search bar. 
1. Select the tags you want to group your client and server by.
1. Choose if you want to show or hide N/A traffic.
1. Select a metric you want to measure from the dropdown list. The NPM monitor only measures the sum of the metric values. See which metrics are available for NPM monitors in the [metric definitions](#metric-definitions).
1. Set the limit on how many results you want to be included in the query.

### Using formulas and functions

You can create NPM monitors using formulas and functions. This can be used, for example, to create monitors on throughput between a client and server. 

The following example shows using a formula to calculate percent retransmits from a client to server. 

{{< img src="monitors/monitor_types/network_performance/npm_formulas_functions.png" alt="Example NPM monitor configuration showing percent of retransmits from a client to server" style="width:100%;" >}}

For more information, see the [Functions][4] documentation.

## Metric definitions

The following tables list the different NPM metrics you can create monitors on. 

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
For detailed instructions on the Notify your team section, see the [Notifications][6] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance/
[2]: https://app.datadoghq.com/monitors/create/network-performance
[3]: /network_monitoring/performance/network_analytics/
[4]: /dashboards/functions/
[5]: /monitors/configuration/
[6]: /monitors/notify/
