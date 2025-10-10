---
title: Manage Cloud Traffic Costs with CNM
further_reading:
    - link: 'https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/'
      tag: 'Blog'
      text: 'Monitor your cloud architecture and app dependencies with Datadog CNM'
aliases:
    - /network_performance_monitoring/guide/manage_traffic_costs_with_npm/
    - /network_monitoring/performance/guide/manage_traffic_costs_with_npm/
---
Network traffic can be costly, especially in cloud environments. Cloud providers apply different rates depending on whether traffic stays within an availability zone (AZ), moves between AZs, crosses regions, or goes out to the public internet. Cross-regional and egress traffic tend to be the most expensive, prone to errors, latency, and security risks.

Cloud Network Monitoring (CNM) allows you to track all of the traffic patterns described above by mapping dependencies between any tags in Datadog, including service, container, availability zone, region, datacenter, etc. This insight into your dependencies and the traffic volume they produce (which is ultimately what cloud providers charge for) can be used to monitor and optimize your traffic-related costs. 

## Datadog's story

When Datadog migrated to Kubernetes, the process of moving stateless services was, as expected, more efficient than migrating stateful services like Kafka, so stateless services were migrated first. This resulted in terabytes of new cross-AZ traffic between stateful services (all located in one AZ) and stateless services (distributed across other AZs), causing a significant and unexpected increase in the cloud bill. Leveraging Datadog's own CNM product, Datadog identified the root cause: an inefficient migration strategy that led to costly and suboptimal network communication. Ultimately, sharding the stateful services helped greatly reduce cloud provider traffic costs.

## Steps for managing traffic costs 

1. To find similar issues in your own environment, you can start by scoping traffic between regions, availability zones, and data centers using your [`client` and `server` tags][1]:
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/availability_zone_2.png" alt="Group traffic flows by availability zone and datacenter">}}
   
    An increase in your traffic bill is almost always tied to an increase in one of these types of traffic. In many cases you may want to group traffic by asymmetric search terms. That is, you want to see the source of the traffic in terms of one tag, and also see the destination in terms of another tag. You can use this kind of asymmetric query to identify costly dependencies between your on-prem datacenters and cloud regions, as well as between clouds. One particularly helpful view is to group the source of the traffic by service, and the destination across availability zones.

     {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/search_by_service_az.png" alt="Identify dependencies between datacenters and cloud regions">}}

2. From here, isolate services that have the most traffic volume across multiple AZs. You can use filters on the facet panel, as well as the search bar, to narrow down your query. For example, you can show only services that originate inside of one availability zone, and are sending traffic to another availability zone.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/service_availability_zone2.png" alt="Highlight any services that communicated across AZs">}}

    The query above highlights any services that communicate from `us-east-1a` to `us-east-1c`. Since the table is already sorted by volume, the first few rows surface the chattiest services contributing to the most cross-AZ traffic. If you want to inspect the cross-infrastructure effects of one of these culprits, sort by the service name across availability zones.

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/single_service_2.png" alt="Search for a single service, sorted by availability zone.">}}

3. Similarly, you can use the team tag to identify engineering teams that generate the most cross-regional traffic, for instance.

   {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/team_region_2.png" alt="Use the team tag to isolate traffic.">}}

4. To monitor costs from external traffic, scope your destination endpoints to public IPs using the **IP Type** facet.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/scope_destination_points_2.png" alt="Use the IP type facet." style="width: 40%;">}}

    Then group your destination by `domain` to break down external traffic volume by where it is going. Although you cannot install a Datadog Agent on public servers, Datadog can resolve IPs representing external and cloud endpoints to human-readable domain names. 

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/server_traffic_by_domain.png" alt="Filtering traffic by service and domain.">}}

## Visualizing traffic costs 

You can visualize cross-AZ or inter-AZ traffic using the [Network Map][2] to pinpoint bottlenecks. This view illustrates how to validate that the EU and US availability zones are not communicating, to ensure compliance with GDPR and protection of data. 
Cross-AZ traffic:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/cross-az-traffic_2.png" alt="Cross-AZ traffic in Network Map">}}
Inter-AZ service-to-service traffic:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/inter-az-service-to-service-traffic.png" alt="Inter-AZ service-to-service traffic">}}

You can edit your preferences using the **Filter traffic** button. In larger environments, Datadog recommends scoping to just the most significant traffic sources by moving the sliders to include only the highest-volume dependencies.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/filter-traffic_2.png" alt="Filter your traffic" style="width: 50%;">}}

## Graphing traffic costs 

Datadog recommends tracking traffic volume metrics over time in dashboards and notebooks. You can graph traffic between any two endpoints using the same queries you would make on the [Cloud Network][3] page. To do this, create a **Timeseries Widget** and select the **Network** source from the dropdown menu.  

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/timeseries_2.png" alt="Create a Timeseries Widget with Network metrics">}}

**Note**: When trying to find the hostname for network hosts, the `datadog.npm.host_instance` metric can be used. If the last metrics from this host are more than 14 days old, the metric will need to be manually updated with this query: `avg:datadog.npm.host_instance{*} by {host}`.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#queries
[2]: /network_monitoring/cloud_network_monitoring/network_map
[3]: https://app.datadoghq.com/network