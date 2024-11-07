---
title: Overview Page
description: The Network Performance Monitoring Overview Page in the Datadog UI.
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
---

## Overview

The [NPM overview page][3] provides a high-level overview of your network, from costly network traffic to DNS health to service top talkers. Use the Overview page to filter network traffic by environment or team with tags, and adjust the time frame for your network data. 

{{< img src="/network_performance_monitoring/overview_page/overview_page_2.png" alt="The network overview page in Datadog" style="width:100%;">}}

## External network traffic

Use the **External Network Traffic** section to get an overview of costly network traffic. Egress traffic that leaves your network is a common cost source, so determining which external endpoints have the most traffic reaching them is helpful to ensure that traffic volume remains within an expected range. For example, **Top AWS gateway users** shows top endpoints communicating to an AWS Internet Gateway or AWS NAT Gateway. **AWS PrivateLink eligible traffic** shows traffic that could leverage AWS PrivateLink to reduce the overall cost of traffic.  

To dig deeper into any of these areas, click the **View in Analytics** button at the bottom right of each section of the overview page. The Analytics page opens with the query pre-populated so you can continue your investigation.

{{< img src="/network_performance_monitoring/overview_page/external_network_traffic.png" alt="The external network traffic section of the overview page with the option to View in Analytics highlighted" style="width:90%;">}}

## Application and dependency top talkers

**Application and Dependency Top Talkers** allow you to select a specific endpoint in your network and look at top traffic sources upstream and downstream of the endpoint. Select **See all Dependencies** to see the highest traffic dependencies both upstream and downstream of the endpoint, and toggle between the graph ([timeseries][1]) view and [top list][2] view for the selected time frame.

{{< img src="/network_performance_monitoring/overview_page/application_dependency_top_talkers.png" alt="The Application and Dependency Top Talkers section of the overview page" style="width:90%;">}}

## DNS health

The **DNS Health** section provides a high-level overview of the top DNS callers by queried domain, client, or both. See the most queried domains, the top clients making DNS queries, or a combination of the two, and check the change icons to see if there have been any unexpected changes in the selected time frame. 

You can also view the top callers for common DNS errors, such as NXDOMAIN, timeouts, and SERVFAIL. Find the top client-to-DNS query combinations resulting in any given error type, and see how that error rate has changed over the selected time frame. This helps to identify unusual DNS errors that may need investigation, especially while troubleshooting an incident.

{{< img src="/network_performance_monitoring/overview_page/dns_health.png" alt="The DNS Health section of the overview page" style="width:90%;">}}

## Identify top traffic sources

The **Identify Top Traffic Sources** section shows traffic across different sources such as availability zone, team, cloud provider, or region, depending on how you tag your data. Seeing the top availability zone (AZ) traffic, for example, can help start an investigation into cloud cost reduction, as cross-AZ traffic is a common expense. Continue investigating by clicking the **View in Analytics** button to discover which services make up most of the cross-AZ traffic. You can use this section for similar exploration of top cross-team, cross-cloud provider, or cross-region traffic.

{{< img src="/network_performance_monitoring/overview_page/top_traffic_sources.png" alt="The Identify Top Traffic Sources section of the overview page" style="width:90%;">}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}


[1]: /dashboards/widgets/timeseries/
[2]: /dashboards/widgets/top_list/
[3]: https://app.datadoghq.com/network/overview