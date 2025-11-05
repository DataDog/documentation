---
title: DNS Monitoring
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
    - link: '/network_monitoring/performance/network_analytics'
      tag: 'Documentation'
      text: 'Explore network data between each source and destination.'
    - link: 'https://www.datadoghq.com/blog/dns-resolution-datadog/'
      tag: 'Blog'
      text: 'Use DNS resolution to monitor cloud and external endpoints'
    - link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
      tag: "Blog"
      text: "Monitor DNS logs for network and security analysis"
---

## Overview

DNS Monitoring provides an overview of DNS server performance to help you identify server-side and client-side DNS issues. By collecting and displaying flow-level DNS metrics, this page can be used to identify:

* Which pods or services are making DNS requests and which servers are handling them.
* Top requesters and their query rates.
* DNS servers experiencing gradual or sudden response time spikes.
* High error rates and specific error types from DNS servers.
* Domain resolution patterns across your infrastructure.

{{< img src="network_performance_monitoring/dns_monitoring/dns_overview_2.png" alt="The CNM Analytics page with the DNS toggle enabled." >}}

## Prerequisites

- Agent version 7.33 or later
- Enable [Cloud Network Monitoring][1] (CNM)

<div class="alert alert-info"> This documentation applies to DNS Monitoring in CNM. For information on Network Device Monitroring (NDM), see the <a href="/network_monitoring/devices/setup/">NDM setup instructions</a>.
</div>

## Queries

On the **DNS** toggle in [**CNM > Analytics**][5], use the search bar to query for dependencies between a client (which makes the DNS request) and a DNS server (which responds to the DNS request). The destination port is automatically scoped to DNS port `53` so that all resulting dependencies match this **client → DNS server** format.

To narrow your search to a specific client, use client tags in the search bar to filter DNS traffic. By default, clients are grouped by the most common tags, with each row representing a service making DNS requests to a DNS server.

   {{< img src="network_performance_monitoring/dns_monitoring/dns_client_search_2.png" alt="The DNS monitoring page with client_service:web-store entered into the search bar and `network.dns_query` entered for View servers as" style="width:100%;">}}

To refine your search to a particular DNS server, filter the search bar by using server tags. Configure your server display with one of the following options from the **Group by** dropdown menu:

   * `dns_server`: The server receiving DNS requests. This tag has the same value as `pod_name` or `task_name`. If those tags are not available, `host_name` is used.
   * `host`: The host name of the DNS server.
   * `service`: The service running on the DNS server.
   * `IP`: The IP of the DNS server.
   * `dns_query`: The domain that was queried.

### Recommended queries

{{< img src="network_performance_monitoring/dns_monitoring/recommended_queries_dns_2.png" alt="Recommended queries in the DNS monitoring page displaying the description of a query for DNS timeouts." style="width:100%;">}}

There are three recommended queries at the top of the DNS page, similar to the [Network Analytics][4] page. These are static queries commonly used to investigate DNS health and view high-level DNS metrics. Use the recommended queries as a starting point to gain further insights into your DNS configuration and troubleshoot DNS issues. 

You can hover over a recommended query to see a short description of what the results of the query mean. Click on the query to run the query, and click **Clear query** to remove the query. Each recommended query has its own set of recommended graphs as well; clearing the recommended query resets the graphs to their default settings. 

## Metrics

The following DNS metrics are available:

**Note**: Data is collected every 30 seconds, aggregated in five minute buckets, and retained for 14 days.

| Metric                   | Description                                                                                                             |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **DNS requests**         | The number of DNS requests made from the client.                                                                         |
| **DNS requests / second** | The rate of DNS requests made by the client.                                                                             |
| **DNS response time**    | The average response time of the DNS server to a request from the client.                                                |
| **Timeouts**             | The number of timed out DNS requests from the client (displayed as a percentage of all DNS responses). <br  /><br />**Note**: These timeouts are a metric computed by NPM internally, and may not align with DNS timeouts reported from outside of NPM. They are not the same as the DNS timeouts reported by DNS clients or servers.                |
| **Errors**               | The number of requests from the client that generated DNS error codes (displayed as a percentage of all DNS responses).   |
| **SERVFAIL**             | The number of requests from the client that generated SERVFAIL (DNS server failed to respond) codes (displayed as a percentage of all DNS responses).   |
| **NXDOMAIN**             | The number of requests from the client that generated NXDOMAIN (domain name does not exist) codes (displayed as a percentage of all DNS responses).   |
| **OTHER**                | The number of requests from the client that generated error codes that are not NXDOMAIN or SERVFAIL (displayed as a percentage of all DNS responses).   |
| **Failures**             | The total number of timeouts and errors in DNS requests from the client (displayed as a percentage of all DNS responses). |

## Sidepanel

The sidepanel provides contextual telemetry to help you quickly debug DNS server dependencies. Use the Flows, Logs, Traces, and Processes tabs to determine whether a DNS server's high number of incoming requests, response time, or failure rate is due to:

* Heavy processes consuming the resources of the underlying infrastructure
* Application errors in the code on the client side
* A high number of requests originating from a particular port or IP

{{< img src="network_performance_monitoring/dns_monitoring/dns_sidepanel_2.png" alt="DNS Monitoring sidepanel" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /network_monitoring/cloud_network_monitoring/setup
[2]: /network_monitoring/devices/snmp_metrics/?tab=snmpv2
[4]: /network_monitoring/cloud_network_monitoring/network_analytics/#recommended-queries
[5]: https://app.datadoghq.com/network/
