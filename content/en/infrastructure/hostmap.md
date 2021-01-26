---
title: Host Map
kind: documentation
aliases:
  - /graphing/infrastructure/hostmap/
  - /guides/hostmap
further_reading:
- link: "/infrastructure/livecontainers/"
  tag: "Graphing"
  text: "Get real-time visibility of all of the containers across your environment"
- link: "/infrastructure/process/"
  tag: "Graphing"
  text: "Understand what is going on at any level of your system"
---

## Overview

Host Maps visualize hosts together on one screen, with metrics made comprehensible via color and shape.    

## Usage

### Filter by

`Filter by` limits the Host Map to a specific subset of an infrastructure. The filter input bar in the top left enables filtering of the Host Map by tags as well as Datadog-provided attributes.

If the filter input bar is empty, the map displays all hosts that are reporting the selected metric to Datadog.

Example: if you tag your hosts by the environment they are in, you can filter by 'production' to remove hosts in your staging and other environments from the map. If you want to eliminate all but one host role in production, then add that role to the filter, too—the filters are `AND`ed together.

**Note**: there is a distinction between filtering for `tag:value` and `"tag:value"`—filtering for `tag:value` strictly matches the tag, while filtering for `"tag:value"` performs a search on that text.

### Group hosts by tags

`Group hosts by tags` spatially arranges your hosts into clusters. Any host in a group shares the tag or tags you group by.  

A simple example is grouping your hosts by AWS availability zone. If you add a second grouping tag, such as instance type, then the hosts are further subdivided into groups, first by availability zone and then by instance type, as seen below.

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="Datadog Host Maps AZ Instance Groups"  >}}

### Tags

[Tags][1] may be applied automatically by [Datadog integrations][2] or manually applied. You can use these to filter your hosts.

For example, if some of your hosts are running on AWS, the following AWS-specific tags are available to you right now:

* `availability-zone`
* `region`
* `image`
* `instance-type`
* `security-group`
* any EC2 tags you might use, such as `name`

The Datadog Agent also collects host metadata and application information, some of which can be used as a filter or for grouping terms. Those fields include:

- `field:metadata_agent_version`
- `field:metadata_platform`
- `field:metadata_processor`
- `field:metadata_machine`
- `field:apps`

### Zoom in

When you've identified a host that you want to investigate, click it for details. It zooms in and displays up to six integrations reporting metrics from that host. If there are more than six integrations, they are listed under the "Apps" header in the host's detail pane, as in the screenshot below.

Click the name of an integration for a condensed dashboard of metrics for that integration. In the screenshot below, "system" has been clicked to get system metrics such as CPU usage, memory usage, disk latency, etc.

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="Datadog Host Maps Zoom In"  style="width:75%;" >}}

### Shapes and colors

By default the color of each host is set to represent the percentage of CPU usage on that host, where the color ranges from green (0% utilized) to orange (100% utilized). You can select different metrics from the `Color by` selector.  

Host Maps can also communicate an additional, optional metric with the size of the hexagon: use the `Size by` selector. 

In the screenshot below, the size of the hexagons is the 15 minute average load, normalized so that machines' workloads can be compared even if they have different numbers of cores.

{{< img src="infrastructure/hostmap/hostmappart2image4.png" alt="Datadog Host Maps Using Color And Size"  style="width:80%;">}}

**Note**: The "% CPU utilized" metric uses the most reliable and up-to-date measurement of CPU utilization, whether it is being reported by the Datadog Agent, or directly by AWS or vSphere.

### Display hosts on the Host Map that don't have an Agent installed

By default, the Host Map only shows hosts that are reporting the selected metric, which can then be used to set a color or size for the individual hexagon within the grid.

If a host is not reporting the selected metric, it can still appear within the Host Map by selecting the "gear" icon on the top-right of the map and enabling "Show hosts with no metrics" in the Host Map settings:

{{< img src="infrastructure/hostmap/host_no_metrics.png" alt="host No Agent"  style="width:50%;">}}

### Data freshness and meaning

Data in the Host Map is refreshed about once a minute—unless you are continuously interacting with the map. The bottom right of the screen tells you when data was last updated.

## Use cases

### Resource optimization

If you are an AWS user, you probably use a variety of instance types. Some instances are optimized for memory, some for compute, some are small, some are big.  
If you want to reduce your AWS spend, you might start by figuring out what the expensive instances are used for. First group by `instance-type` and then group by `role` or `name`. Take a look at your expensive instance types, such as **c3.8xlarge**. Are there any host roles whose CPU is underutilized? If so, zoom in to individual hosts and see whether all that computational horsepower has been needed in the last several months, or whether this group of hosts is a candidate for migrating to a cheaper instance type.  

Below is a subset of Datadog's infrastructure. As you can see, **c3.2xlarge** instances are heavily loaded.

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="host map part 1"  style="width:80%;">}}

As seen below, by clicking on the c3.2xlarge group and then sub-grouping by role, you can find that only some of the roles are loaded, while others are nearly idling. If you downgraded those 7 green nodes to a c3.xlarge, you would save almost $13K per year. ($0.21 saved per hour per host x 24 hr/day * 365 days/year * 7 hosts = $12,877.20 / year)

{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="Datadog Host Maps Instance-Role Groups"  style="width:80%;">}}

### Availability zone placement

Host maps enable you to see distributions of machines in each of your availability zones (AZ). Filter for the hosts you are interested in, group by AZ, and you can immediately see whether resources need rebalancing. 

In the example seen below, there is an uneven distribution of hosts with `role:daniels` across availability zones. (Daniels is the name of an internal application.)

{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="Datadog Host Maps AZ Balance"  style="width:80%;" >}}

### Problem investigation

Imagine you are having a problem in production. Maybe the CPUs on some of your hosts are pegged, which is causing long response times. Host Maps can help you quickly see whether there is anything different about the loaded and not-loaded hosts. You can rapidly group by dimensions you would like to investigate, and visually determine whether the problem servers belong to a certain group.  
For example, you can group by availability zone, region, instance type, image, or any tags that you use within your system. 

Below is a screenshot from a recent issue at Datadog. Some hosts have much less usable memory than others, despite being part of the same cluster. Grouping by machine image reveals that there were two different images in use, and one of them is overloaded.

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands"  style="width:80%;" >}}

{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups"  style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/
[2]: /integrations/
