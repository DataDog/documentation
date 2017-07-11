---
title: Host Map Overview
kind: guide
listorder: 3
---
## Overview {#overview}

Host Maps let you see all of your hosts together on one screen, grouped however you want, filtered however you want, with metrics made instantly comprehensible via color and shape. This is a new and simple way to spot outliers, detect usage patterns, avoid resource problems, and make decisions about how to best manage your infrastructure. Host Maps work at any scale, whether you have 10, 100 or 10,000 hosts.

When you use Host Maps, we wanted the experience to be like waving a magic wand, and having every host leap to attention, telling you the high-level story instantly, ready to report further details on demand.

## Ways to use it

We built Host Maps for ultimate flexibility; with just a few clicks, you can ask innumerable infrastructure-level questions and get instant, visual answers. Below are some common uses, but we would also love to hear on twitter about the ways you use Host Maps at your company (@datadoghq).

### Resource Optimization

If you are an AWS user, you probably use a variety of instance types. Some instances are optimized for memory, some for compute, some are small, some are big. If you want to reduce your AWS spend, a great place to start is by figuring out what the expensive instances are used for. With Host Maps this is easy. First group by “instance-type” and then group by role or name. Take a look at your expensive instance types, such as c3.8xlarge. Are there any host roles whose CPU is underutilized? If so, you can zoom in to individual hosts and see whether all that computational horsepower has been needed in the last several months, or whether this group of hosts is a candidate for migrating to a cheaper instance type.

Below is a subset of Datadog’s infrastructure. As you can see, c3.2xlarge instances are pretty heavily loaded.

{{< img src="hostmappart1image2.png" >}}

As seen below, by clicking on the c3.2xlarge group and then sub-grouping by role, we found that only some of the roles are loaded, while others are nearly idling. If we downgraded those 7 green nodes to a c3.xlarge, we would save almost $13K per year. That’s worth investigating! ( $0.21 saved per hour per host x 24 hr/day * 365 days/year * 7 hosts = $12,877.20 / year )

{{< img src="hostmappart1image3.png" alt="Datadog Host Maps Instance-Role Groups">}}

### Availability Zone Placement

Host maps make it easy to see distributions of machines in each of your availability zones (AZ). Filter for the hosts you are interested in, group by AZ, and you can immediately see whether resources need rebalancing. As seen below, at Datadog we have an uneven distribution of hosts with role:daniels across availability zones. (Daniels is the name of one of our internal applications.)

{{< img src="hostmappart1image4.png" alt="Datadog Host Maps AZ Balance">}}

### Problem Investigation

Imagine you are having a problem in production. Maybe the CPUs on some of your hosts are pegged, which is causing long response times. Host Maps can help you quickly see whether there is anything different about the loaded and not-loaded hosts. You can rapidly group by any dimension you would like to investigate, and visually determine whether the problem servers belong to a certain group. For example, you can group by availability zone, region, instance type, image, or any tag that you use at your company. You will either find a problem very quickly, or rule out these explanations before spending time on deeper investigations.

Below is a screenshot from a recent issue we had a Datadog. As you can see, some hosts had much less usable memory than others, despite being part of the same cluster. Why? We grouped by machine image in Host Maps, and the problem was immediately clear: there were in fact two different images in use, and one of them had become overloaded.

{{< img src="hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands">}}

{{< img src="hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups">}}

## More Details

### Tags

Your hosts probably have a lot of tags. Some tags are applied automatically by Datadog integrations, and some tags were probably applied by members of your team. Regardless of how the tags were created, you can use any of them to slice and dice your Host Maps.

If some of your hosts are running on AWS, the following AWS-specific tags are available to you right now:

* availability-zone
* region
* image
* instance-type
* security-group
* and any EC2 tags you might use, such as ‘name’

### Filter by

‘Filter by’ limits the Host Maps to a specific subset of your infrastructure. Located in the top-left of Host Maps, the filter input bar lets you filter your map by any of your tags, plus the Datadog-provided attributes below. If your filter input bar is empty, then the map displays all hosts that are reporting metrics to Datadog. If you want to focus your attention on just a subset of your hosts, then add filters. Example: if you tag your hosts by the environment they are in, you can filter by ‘production’ to remove hosts in your staging and other environments from the map. If you want to eliminate all but one host role in production, then add that role to the filter, too—the filters will be ANDed together.

Filterable host attributes (automatically provided):

* up : the host is reporting a heartbeat
* down : the host is not reporting a heartbeat
* muted : Datadog alerts are muted for this host
* agent : the host is running the datadog agent
* agent_issue : often indicates an integration problem such failed access to a resource
* upgrade_required : the Datadog agent requires an upgrade

### Group hosts by tags

‘Group hosts by tags’ spatially arranges your hosts into clusters, or groups. Any host in a group shares the tag or tags you group by. A simple example is grouping your hosts by AWS availability zone. If you add a second grouping tag, such as instance type, then the hosts will be further subdivided into groups, first by availability zone and then by instance type, as seen below.

{{< img src="hostmappart2image2.png" alt="Datadog Host Maps AZ Instance Groups">}}

### Zoom in

When you’ve identified a host that you want to investigate, click it for details. You will zoom in and see up to six integrations reporting metrics from that host. (If there are more than six integrations, they will be listed under the “Apps” header in the host’s detail pane, as in the screenshot below.) Click the name of an integration, and you will get a condensed dashboard of metrics for that integration. In the screenshot below, we have clicked “system” to get system metrics such as CPU usage, memory usage, disk latency, etc.

{{< img src="blog-host-maps-01.png" alt="Datadog Host Maps Zoom In">}}

### Shapes and colors

By default the color of each host (hexagon) is set to represent the percentage of CPU usage on each host, where the color ranges from green (0% utilized) to red (100% utilized). You can select different metrics from the ‘Color by’ selector. The Host Maps can also communicate an additional, optional metric with the size of the hexagon; use the ‘Size by’ selector. In the screenshot below the size of the hexagons is the 15 minute average load, normalized so that machines’ workloads can be compared even if they have different numbers of cores.

{{< img src="hostmappart2image4.png" alt="Datadog Host Maps Using Color And Size">}}

Today the ‘Color by’ selector and ‘Size by’ selector contain only CPU-based metrics: load, idle, wait, etc. We will be adding additional metrics in the very near future.

Note that the “% CPU utilized” metric uses the most reliable and up-to-date measurement of CPU utilization, whether it is being reported by the Datadog agent, or directly by AWS, or vSphere.

### Data freshness and meaning

Data in the Host Maps is refreshed about once a minute—unless you are continuously interacting with the map. In that case it will not refresh because it can be disorienting to have colors and shapes spontaneously change while you are still investigating. The bottom right of your screen will tell you when data was last updated.
