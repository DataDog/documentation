---
title: DNS Monitoring
kind: documentation
description: Diagnose and debug DNS server and managed service issues  
aliases:
    - /network_performance_monitoring/network_table
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
    - link: '/integrations/snmp'
      tag: 'Documentation'
      text: 'SNMP integration'
    - link: '/network_performance_monitoring/installation'
      tag: 'Documentation'
      text: 'Collect your Network Data with the Datadog Agent.'
    - link: 'https://www.datadoghq.com/blog/dns-resolution-datadog/'
      tag: 'Blog'
      text: 'Use DNS resolution to monitor cloud and external endpoints'
---

{{< img src="network_performance_monitoring/network_page/main_page_npm.png" alt="Main page" >}}

DNS Monitoring provides an overview of DNS server performance to help you identify server-side and client-side DNS issues. By collecting and displaying flow-level DNS metrics, this page can be used to identify 
* Which pods or services are making DNS requests, and to which servers
* Which endpoints are making the most requests, or making requests at the highest rate 
* When a DNS server’s response time to requests has gradually or suddenly increased   
* Which DNS servers have a high error rate, and what kind of errors they they are emitting 

##Setup

DNS Monitoring metrics are collected automatically by the system probe. Once installed, a ‘DNS’ tab will be accessible in the Network Performance Monitoring product by default - no extra steps are necessary.

## Queries
Queries

You can use the source and destination search bars at the top of the page to query for dependencies between a client (_source_), which makes the DNS request, and a DNS server (_destination_), which responds to the DNS request. The destination port is automatically scoped to DNS port 53 so that all resulting dependencies match this (client → DNS server) format. 

To refine your search to a particular client, aggregate and filter DNS traffic using tags in the source search bar. In the default view, the source is aggregated by the `service` tag. Accordingly, each row in the table represents a service that is making DNS requests to some DNS server. 
{{< img src="network_performance_monitoring/network_page/flow_table_region_az.png" alt="Flow table filtered"  style="width:80%;">}}

You can set the timeframe over which traffic is aggregated using the time selector at the top right of the page:

{{< img src="network_performance_monitoring/network_page/dns_default.png" alt="DNS Monitoring default view"  style="width:30%;">}}

To refine your search to a particular DNS server, filter the destination search bar using tags. To configure your destination display, select one of the following options from the ‘Group by’ dropdown menu: 
* `dns_server`: The server receiving DNS requests. This tag has the same value as pod_name or task_name, or host_name if the former tags are not available.
* `host`: The host name of the DNS server.
* `service`: The service running on the DNS server.
* `IP`: The IP of the DNS server. 

This example shows all flows from pods in the production environment’s availability zone to hosts receiving DNS requests:

{{< img src="network_performance_monitoring/network_page/dns_query_screenshot.png" alt="Query between "  style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
