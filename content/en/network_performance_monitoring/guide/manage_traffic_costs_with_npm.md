---
title: Manage Traffic Costs with NPM
kind: guide
---
Traffic is expensive, especially in the cloud. Cloud providers charge differently for traffic within an availability zone, traffic between availability zones (AZs), and traffic between regions (this pricing may differ by region). Cross-regional traffic is not only the most expensive, but also the most vulnerable to errors, latency, and security threats. 

Network Performance Monitoring allows you to track all of the traffic patterns described above by mapping dependencies between any tags in Datadog, including service, container, availability zone, region, datacenter, etc… This insight into your dependencies and the amount of traffic volume they produce (which is ultimately what you are billed on) can be used to monitor and optimize on your traffic-related costs. 

## Datadog’s story

When we began our Kubernetes migration, migrating stateless services was (expectedly) much faster and easier than migrating our stateful services (e.g. Kafka), so we migrated our stateless services first. The outcome was terabytes of cross-AZ traffic between the stateful services (all in one AZ) and stateless services (spread across the other AZs), but then our cloud bill exploded. We used our own Network Product to identify the root cause - a suboptimal migration strategy - to optimize our network (by sharding our stateful services) and ultimately saw significant reductions in our cloud provider costs.

## Steps for managing traffic costs 

1. To find similar issues in your own environment, you can start by grouping your traffic flows by regions, 
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region.png" alt="Group flows by region">}}
    availability zones,
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/availability_zone.png" alt="Group flows by availability">}}
    and datacenters:
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/datacenter.png" alt="Group flows by datacenter">}}
    An increase in your traffic bill is almost always tied to an increase in one of these types of traffic. In many cases you may want to group traffic by asymmetric search terms - meaning, you want to see the source of the traffic in terms of one tag, but want to see the destination in terms of another. This kind of asymmetric query can be used to identify costly dependencies between your on-prem datacenters and cloud regions, 
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/aws_account.png" alt="Identify dependencies between datacenters and cloud regions">}}
    as well as between clouds. One particularly helpful view is to group the source of the traffic by service, and the destination across availability zones. This will help you identify particularly noisy and expensive services that are communicating across multiple availability zones, like what we found during our migration.

2. From here, isolate services that have the most traffic volume across multiple AZs. You can use filters inside the search bars to narrow down your query - so, for example, you can show only services that originate inside of one availability zone, and are sending traffic to any availability zone other than that one.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/service_availability_zone.png" alt="Highlight any services that communicated across AZs">}}
    The query above highlights any services that communicate across AZs, from us-east4-a to anywhere else. The chattiest services surfaced by this query may contribute heavily to overall cross-AZ traffic volume, and we can narrow it down even further by searching for one particular service, grouping the traffic by availability zone.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/single_service.png" alt="Search for a single service.">}}

3. Similarly, you can use the team tag to identify engineering teams that generate the most, for instance, cross-regional traffic 
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/team_region.png" alt="Use the team tag.">}}
or monitor your own team’s output specifically.
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region_region.png" alt="Use the region tag.">}}

4. To monitor costs from external traffic, scope your destination endpoints to public IPs using the IP Type facet.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/scope_destination_points.png" alt="Use the type facet.">}}
    Then group your destination by `dns` to break down external traffic volume by where it’s going. Although you cannot install an agent on public servers, we are able to resolve external endpoints to human-readable domain names using DNS resolution. 
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/dns_resolution.png" alt="Group by DNS.">}}
    The example query above filters for traffic to AWS S3, elastic load balancers, APIs, and external ‘.com’ domains using substring wildcard entries (e.g. dns:*s3*).  
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/wildcard.png" alt="Search with wildcards">}}

## Visualizing Traffic Costs 

You can visualize cross-AZ or inter-AZ traffic using the Network Map to quickly pinpoint bottlenecks. At Datadog, we also use this view to validate that our EU and US availability zones are not communicating, for compliance reasons. 
(Cross-AZ traffic)
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/cross-az-traffic.png" alt="Cross-AZ traffic">}}
(Inter-AZ service-to-service traffic) 
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/inter-az-service-to-service-traffic.png" alt="Inter-AZ service-to-service traffic">}}
By default, the thickness of the gray lines between the availability zones indicates the volume of traffic flowing between them, which is what contributes to your costs.

You can edit your preferences using the ‘Filter traffic’ button. In larger environments, we recommend scoping to just the most significant traffic sources by moving the sliders to include just the highest-volume dependencies.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/filter-traffic.png" alt="Scope your traffic">}}

## Graphing Traffic Costs 

We recommend tracking traffic volume metrics over time in dashboards and notebooks. You can graph traffic between any two endpoints using the same queries you would make in the network page. Just create a Timeseries Widget and select the ‘Network Traffic’ source from the dropdown menu.  

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/timeseries.png" alt="Create a Timeseries">}}

You can also use this data as the source of a monitor - so you can get a notification if traffic volume increases unexpectedly. This can give you a heads up that there’s something unusual happening before you get your cloud bill at the end of the month.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/network-traffic.png" alt="View your network traffic">}}

