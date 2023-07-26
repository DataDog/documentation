---
title: Overview Page
kind: documentation
description: The Network Performance Monitoring Overview Page in the Datadog UI.
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
---

The NPM overview page provides a high-level overview of your network, from costly network traffic to DNS health to service top talkers. Use the overview page to filter network traffic by environment or team with tags, and adjust the time frame for your network data. 

{{< img src="/network_performance_monitoring/overview_page/overview_page.png" alt="The network overview page in Datadog" style="width:90%;">}}

## External network traffic

Use the **External Network Traffic** section to get an overview of expensive network traffic. Egress traffic that leaves your network is a common cost source, so determining which external endpoints have the most traffic reaching them is helpful to ensure that traffic volume is expected. For example, **Top AWS gateway users** shows top endpoints communicating to an AWS Internet Gateway or AWS NAT Gateway. **AWS private link eligible traffic** shows traffic that could leverage AWS Private Link to reduce the overall cost of traffic.  

To dig deeper into any of these areas, click the **View in Analytics** button at the bottom right of each section of the overview page. The analytics page opens with the query pre-populated, so you can continue your investigation.

## Application and dependency top talkers

**Application and Dependency Top Talkers** allows you to select a specific endpoint in your network and look at top traffic sources upstream and downstream of the endpoint. Select **See all Dependencies** to see top talking dependencies both upstream and downstream of your endpoint, and toggle between the graph view (timeseries) and list view (summation) over the selected time frame.

## DNS health

The **DNS Health** section provides a high level overview of the top DNS callers by the queried domain, by client, or by both. Get a quick view of the most queried-for domains, the top clients making DNS queries, or both, and check the change icons to see if there have been any unexpected changes in the selected time frame. 

You can also view the largest changes in DNS errors, such as NXDOMAIN, timeouts, and SERVFAIL. Find the top client-to-DNS query combinations resulting in any given error type, and see how that error rate has changed over the selected time frame. This helps to identify unusual DNS errors that may need investigation, especially while troubleshooting an incident.

## Identify top traffic sources

The **Identify Top Traffic Sources** section shows traffic across different sources, such as availability zone, team, cloud provider, or region, depending on how you tag your data. Seeing the top availability zone (AZ) traffic, for example, can help start an investigation into cloud cost reduction, as cross-AZ traffic is a common expense. Continue investigating through the **View in Analytics** button to discover which services make up most of the cross-AZ traffic. You can use this section for similar exploration of top cross-team, cross-cloud provider, or cross-region traffic.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}