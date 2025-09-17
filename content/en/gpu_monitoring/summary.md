---
title: GPU Monitoring Summary Page
description: "Real-time insights across your entire GPU fleet for better provisioning and cost optimization"

further_reading:
  - link: "/gpu-monitoring/fleet"
    tag: "Documentation"
    text: "GPU Fleet Details Page"
---

## Overview

The [GPU Monitoring Summary page][0] provides a snapshot summary of your entire GPU fleet under a specified time frame, like the past hour, day, week or month. This page answers key questions like:  

## Your GPU fleet at a glance
Your operational efficiency is a key driver to overall costs. Understanding your GPU fleet utilization can help avoid overprovisioning and reduce idle GPU spend.

### GPU Fleet Funnel Visualization 
This funnel visualization provides a breakdown of your entire GPU fleet across multiple cloud providers like AWS or Google Cloud. You can instantly breakdown your fleet by number of Kubernetes clusters, hosts or GPU devices. 
The funnel also highlights any performance issues or provisioning inefficiencies in your teams' resource utilization efforts such as idle devices, underutilized GPU cores or if there's resource starvation that requires rebalancing.

{{< img src="gpu_monitoring/funnel.png" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, allocated, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:100%;" >}}

The steps of the funnel are defined as follows: 
- **Total**: Any GPU device that is sending data during the selected timeframe.
- **Allocated** : How many of your GPUs have been allocated to a requesting workload?
- **Active**: How many of your allocated GPUs are actively used for a workload?
- **Effective** How many GPU devices are used and working more than 50% of their lifespan? 

### Understand your GPU spend
Quickly identify your total spend on GPU infrastructure and attribute the subset of those costs that are wasted spend from idle GPU devices that can be cost optimized. 

{{< img src="gpu_monitoring/cost_tiles.png" alt="Tiles that represent the total GPU spend over any timeframe and the subset of that total cost attributed to GPUs being idle." style="width:100%;" >}}

Note: Total cloud costs are calculated from AWS and Google Cloud costs over the selected timeframe. As cloud cost bills are available at a delay, the selected timeframe must be >= 2 days. And idle costs are the subset of that cost attributed to idle GPUs.

## Device distribution across your fleet 
This section provides insights around GPU allocation and capacity planning. You can troubleshoot failed workloads due to GPU constraints and improve the operational efficiency of your fleet with insights into device usage and allocation over time.

### Device Allocation Over Time
As AI workloads can spike resource usage unpredictably, it's important to align available GPUs with incoming workloads. Understand your operational efficiency by tracking your device allocation over time which identifies if you're overallocating GPUs that end up sitting idle or underprovisioning resources that stall critical jobs. 

{{< img src="gpu_monitoring/allocation.png" alt="Total, Allocated and Active device counts over time" style="width:100%;" >}}

For example, if you see a spike in the forecasted values for the number of allocated devices, your future workloads may be starved -- requiring you to add more GPU devices. 

### Cloud Provider Instance Breakdown 
If you rely on GPUs deployed through major cloud providers, this widget breaks down the cloud instance type within your fleet.

{{< img src="gpu_monitoring/instance_breakdown.png" alt="Total, Allocated and Active device counts over time" style="width:100%;" >}}

### Device Type Breakdown
In cases where your AI workloads fail, code performance may not be the issue but rather number of available GPU devices. This widget surfaces the availability across all of your GPU device types and highlights which device type pool is fully saturated (signalling that additional devices may be required). You can further combine this widget with the Unmet GPU requests by Service or Cluster widgets to understand for a given workload, which device type pool is already saturated and needs additional provisioning.

{{< img src="gpu_monitoring/device_type.png" alt="Availability by GPU device type" style="width:100%;" >}}

** Note:** For any device type, if the number of devices available is <5%, the device type will be highlighted in red.

### Pinpoint areas with insufficient GPU resources to guide provisioning decisions
Quickly identify the Kubernetes clusters with the most number of unmet GPU requests. 

{{< img src="gpu_monitoring/unmet_requests.png" alt="Toplist of kubernetes clusters by number of unmet GPU requests." style="width:100%;" >}}

For example, for any of these Kubernetes clusters with a large number of GPU requests, you can also look at their _Device Type Breakdown_ widget to understand which device type the particular service relies on and the _Device Allocation over time_ widget to track historical demands to confirm if these clusters and device types are constantly underprovisioned.

** Note:** If there are no services or clusters listed and you are emitting the proper tags, this is indicative that all of your services and clusters have sufficient GPU resources during the selected timeframe. 

## Workload Optimization Opportunities 
GPUs are often the highest cost item within a team's infrastructure budget, so cost optimization of your setup is crucial. This section uncovers suboptimal workloads with inefficient GPU utilization -- linking wasted costs to specific workloads and their resource usage.

### Most Expensive Clusters
This widget uncovers your most expensive Kubernetes clusters and identifies their idle spend so you can reach out to the teams who are responsible for these clusters and find ways to decrease spend, such as reducing the number of idle or inefficient GPU devices. This table is sorted by _Total Cost_ to identify the most expensive clusters. 

{{< img src="gpu_monitoring/expensive_clusters.png" alt="Table of the most expensive Kubernetes clusters." style="width:100%;" >}}

You can click into any one of these clusters to investigate its connected workloads by pods or processes that contribute to its costs on the [GPU Fleet page][1].

{{< img src="gpu_monitoring/cluster_entities.png" alt="A details sidepanel for a particular cluster that displays the connected entities of that cluster such as pods and processes." style="width:100%;" >}}

This opens a sidepanel that's tailored to that specific cluster and reveals its connected entities. For example, if you see a related pod with high core utilization and "bad status", that pod is ineffectively using its associated GPU device. So the pod owner should be contacted to terminate the pod or move it to a smaller GPU.

### Inefficient Pods
**Note:** This section is only available for Kubernetes users.
To maximize value on your GPU infrastructure spend, it's important to keep your GPU devices consistently busy. This widget reveals which pods are ineffectively using their associated GPU devices. The table is sorted by SM engine activity by default. 

{{< img src="gpu_monitoring/inefficient_pods.png" alt="Table of inefficient pods sorted by SM Engine Activity level." style="width:100%;" >}}

You can click into any inefficient pod to view more details about the pod and its related GPU devices within the Kubernetes Explorer page (navigate to the GPU tab within a particular pod). For example, you may notice that the SM activity timeseries graph dips lower than 50%. You can then check whether your devices' `Memory Utilization` and `Graphics Activity` values have spiked during that particular timeframe; if so, that is the reason for low SM Engine Activity (aka idle devices). To remediate, you can contact the pod owner to consolidate to a smaller number of devices, use a smaller GPU. Or you can optimize your code to continue using the large GPU for better throughput.

Additionally, given pods can share hosts, you can identify noisy neighbors. For example, another pod can be using all of a given host's CPU so your pod is starved.

### Zombie Process
Zombie processes are often a main source of wasted GPU spend as they often reserve GPU capacity that they shouldn't be. This widget lists the zombie processes that should be killed in order to free up GPUs for other workloads.

{{< img src="gpu_monitoring/zombie_processes.png" alt="Table of zombie processes that is sorted by SM Engine Activity that need to be killed to free up GPU capacity." style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mEnd=1758119954290&mPage=summary&mStart=1757947154290&mView=nvidia
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mEnd=1758119939640&mPage=fleet&mStart=1758105539640&mView=nvidia
