---
title: DNS Monitoring
kind: documentation
description: Diagnose and debug DNS server issues  
aliases:
    - /network_performance_monitoring/network_table
    - /network_performance_monitoring/dns_monitoring
further_reading:
    - link: 'https://www.datadoghq.com/blog/monitor-dns-with-datadog/'
      tag: 'Blog'
      text: 'Monitor DNS with Datadog'
    - link: 'https://www.datadoghq.com/blog/monitor-coredns-with-datadog/'
      tag: 'Blog'
      text: 'Monitor CoreDNS with Datadog'
    - link: '/network_monitoring/performance/network_page'
      tag: 'Documentation'
      text: 'Explore network data between each source and destination.'
    - link: 'https://www.datadoghq.com/blog/dns-resolution-datadog/'
      tag: 'Blog'
      text: 'Use DNS resolution to monitor cloud and external endpoints'
---

{{< img src="network_performance_monitoring/dns_default.png" alt="DNS Monitoring" >}}

DNS Monitoring provides an overview of DNS server performance to help you identify server-side and client-side DNS issues. By collecting and displaying flow-level DNS metrics, this page can be used to identify:

* The pods or services making DNS requests and the servers receiving those requests.
* The endpoints making the most requests or making requests at the highest rate.
* If a DNS server’s response time to requests has gradually or suddenly increased.
* The DNS servers with a high error rate and the type of errors being emitted. 

## Setup

If you are using the most recent version of the Agent, including on a host, DNS Monitoring metrics are collected automatically by the system probe with agent v7.23+. Once installed, a ‘DNS’ tab is accessible in the Network Performance Monitoring product by default - no extra steps are necessary.

If you are using [Kubernetes on Helm][3], to enable DNS monitoring, you need to set `collectDNSStats:` to `true` in the [values.yaml][4].

Are you looking for Network Performance Monitoring instead? See the [NPM setup instructions][2].

## Queries

Use the source and destination search bars at the top of the page to query for dependencies between a client (_source_), which makes the DNS request, and a DNS server (_destination_), which responds to the DNS request. The destination port is automatically scoped to DNS port 53 so that all resulting dependencies match this (client → DNS server) format. 

To refine your search to a particular client, aggregate and filter DNS traffic using tags in the source search bar. In the default view, the source is aggregated by the `service` tag. Accordingly, each row in the table represents a service that is making DNS requests to some DNS server. 

{{< img src="network_performance_monitoring/dns_default.png" alt="DNS Monitoring default view"  style="width:100%;">}}

To refine your search to a particular DNS server, filter the destination search bar using tags. To configure your destination display, select one of the following options from the **Group by** dropdown menu:

* `dns_server`: The server receiving DNS requests. This tag has the same value as `pod_name` or `task_name`. If those tags are not available, `host_name` is used.
* `host`: The host name of the DNS server.
* `service`: The service running on the DNS server.
* `IP`: The IP of the DNS server.

This example shows all flows from pods in the production environment’s availability zone to hosts receiving DNS requests:

{{< img src="network_performance_monitoring/dns_query_screenshot.png" alt="Query of pods making requests to multiple DNS servers"  style="width:100%;">}}

## Metrics

Your DNS metrics are displayed through the graphs and the associated table. 

**Note:** The default collection interval is five minutes and retention is seven days.

The following DNS metrics are available:

| Metric                   | Description                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **DNS requests**         | The number of DNS requests made from the client.                                                                         |
| **DNS requests / second** | The rate of DNS requests made by the client.                                                                             |
| **DNS response time**    | The average response time of the DNS server to a request from the client.                                                |
| **Timeouts**             | The number of timed out DNS requests from the client (displayed as a percentage of all DNS responses).                    |
| **Errors**               | The number of requests from the client that generated DNS error codes (displayed as a percentage of all DNS responses).   |
| **SERVFAIL**             | The number of requests from the client that generated SERVFAIL (DNS server failed to respond) codes (displayed as a percentage of all DNS responses).   |
| **NXDOMAIN**             | The number of requests from the client that generated NXDOMAIN (domain name does not exist) codes (displayed as a percentage of all DNS responses).   |
| **OTHER**                | The number of requests from the client that generated error codes that are not NXDOMAIN or SERVFAIL (displayed as a percentage of all DNS responses).   |
| **Failures**             | The total number of timeouts and errors in DNS requests from the client (displayed as a percentage of all DNS responses). |

## Table

The network table breaks down the above metrics by each _source_ and _destination_ dependency defined by your query.

Configure the columns in your table using the **Customize** button at the top right of the table.

Narrow down the traffic in your view with the **Filter Traffic** [options][1].

## Sidepanel

The sidepanel provides contextual telemetry to help you quickly debug DNS server dependencies. Use the Flows, Logs, Traces, and Processes tabs to determine whether a DNS server’s high number of incoming requests, response time, or failure rate is due to:

* Heavy processes consuming the resources of the underlying infrastructure
* Application errors in the code on the client side
* A high number of requests originating from a particular port or IP

{{< img src="network_performance_monitoring/dns_sidepanel.png" alt="DNS Monitoring sidepanel"  style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/performance/network_page#table
[2]: /network_monitoring/devices/setup?tab=snmpv2
[3]: /agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml#L299-L300
