---
title: Manage Traffic Costs with NPM
kind: documentation
---

Datadog can help you reduce your traffic costs by identifying the sources of traffic that are contributing the most to your cloud provider bill. Cloud providers charge differently for traffic within an availability zone, traffic between availability zones (AZs), and traffic between regions (this pricing may differ by region). Cross-regional traffic is not only the most expensive, but also the most vulnerable to errors, latency, and security threats.

Network Performance Monitoring allows you to track all of these traffic patterns by mapping dependencies between any tags in Datadog, including service, container, availability zone, region, datacenter, and more. This insight into your dependencies and the amount of traffic volume they produce (which is ultimately what you are billed on) can be used to monitor and optimize on your traffic-related costs.

1. First, open the NPM Network Page and group the traffic volume between regions, 

availability zones,

 and datacenters, 

to pinpoint dependencies that are the most costly. An increase in your traffic bill will almost always be tied to an increase in one of these types of traffic. Asymmetric queries can also be made to identify costly dependencies between your on-prem datacenters and cloud regions, 

as well as between clouds.

2. From here, isolate services that are especially noisy across, for instance, AZs. 


The query above will highlight any services that communicated across AZs, from us-east4-a to anywhere else. The chattiest services surfaced by this query may contribute heavily to overall cross-AZ traffic volume, and we can check for that using the query below:



???
???
???


=======================================

Managing Traffic Costs with Network Performance Monitoring

Traffic is expensive, especially in the cloud. Cloud providers charge differently for traffic within an availability zone, traffic between availability zones (AZs), and traffic between regions (this pricing may differ by region). Cross-regional traffic is not only the most expensive, but also the most vulnerable to errors, latency, and security threats. 

Network Performance Monitoring allows you to track all of the traffic patterns described above by mapping dependencies between any tags in Datadog, including service, container, availability zone, region, datacenter, etc… This insight into your dependencies and the amount of traffic volume they produce (which is ultimately what you are billed on) can be used to monitor and optimize on your traffic-related costs. 

Datadog’s story: When we began our Kubernetes migration, migrating stateless services was (expectedly) much faster and easier than migrating our stateful services (e.g. Kafka), so we migrated our stateless services first. The outcome was terabytes of cross-AZ traffic between the stateful services (all in one AZ) and stateless services (spread across the other AZs). Oh, and our cloud bill exploded. We used our own Network Product to identify the root cause - a suboptimal migration strategy - to optimize our network (by sharding our stateful services) and ultimately saw significant reductions in our cloud provider costs.. 

Datadog’s Tips for Managing Traffic Costs 

1. To find similar issues in your own environment, you can start by grouping your traffic flows by regions, 

availability zones,

and/or datacenters:

An increase in your traffic bill will almost always be tied to an increase in one of these types of traffic. In many cases you may want to group traffic by asymmetric search terms - meaning, you want to see the source of the traffic in terms of one tag, but want to see the destination in terms of another. This kind of asymmetric query can be used to identify costly dependencies between your on-prem datacenters and cloud regions, as well as between clouds. One particularly helpful view is to group the source of the traffic by service, and the destination across availability zones. This will help you identify particularly noisy and expensive services that are communicating across multiple availability zones, like what we found during our migration.

2. From here, isolate services that have the most traffic volume across multiple AZs. You can use filters inside the search bars to narrow down your query - so, for example, you can show only services that originate inside of one availability zone, and are sending traffic to any availability zone other than that one.
The query above will highlight any services that communicated across AZs, from us-east4-a to anywhere else. The chattiest services surfaced by this query may contribute heavily to overall cross-AZ traffic volume, and we can narrow it down even further by searching for one particular service, grouping the traffic by availability zone.

3. Similarly, you can use the team tag to identify engineering teams that generate the most, for instance, cross-regional traffic or monitor your own team’s output specifically.


4. To monitor costs from external traffic, scope your destination endpoints to public IPs using the IP Type facet.

Then group your destination by `dns` to break down external traffic volume by where it’s going. Although you cannot install an agent on public servers, we are able to resolve external endpoints to human-readable domain names using DNS resolution. 

The example query above filters for traffic to AWS S3, elastic load balancers, APIs, and external ‘.com’ domains using substring wildcard entries (e.g. dns:*s3*).  


Visualizing Traffic Costs 

You can visualize cross-AZ or inter-AZ traffic using the Network Map to quickly pinpoint bottlenecks. At Datadog, we also use this view to validate that our EU and US availability zones are not communicating, for compliance reasons. 
(Cross-AZ traffic)

(Inter-AZ service-to-service traffic)
By default, the thickness of the gray lines between the availability zones indicates the volume of traffic flowing between them, which is what contributes to your costs.

You can edit your preferences using the ‘Filter traffic’ button. In larger environments, we recommend scoping to just the most significant traffic sources by moving the sliders to include just the highest-volume dependencies.


Graphing Traffic Costs 

We recommend tracking traffic volume metrics over time in dashboards and notebooks. You can graph traffic between any two endpoints using the same queries you would make in the network page. Just create a Timeseries Widget and select the ‘Network Traffic’ source from the dropdown menu.  


You can also use this data as the source of a monitor - so you can get a notification if traffic volume increases unexpectedly. This can give you a heads up that there’s something unusual happening before you get your cloud bill at the end of the month.

