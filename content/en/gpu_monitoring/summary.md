---
title: GPU Monitoring Summary Page
private: true
description: "Real-time insights across your entire GPU fleet for better provisioning and cost optimization"
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
    - link: "/gpu_monitoring/fleet"
      tag: "Documentation"
      text: "GPU Monitoring Fleet Page"
---

## Overview

The [GPU Monitoring Summary page][0] provides a snapshot summary of your entire GPU fleet under a specified time frame. This page answers key questions such as:
- Am I using my existing GPU fleet effectively?
- How can I better provision these devices to match workload demand?
- How can I get more value from my existing GPU spend?

Click on the section titles below to access the corresponding section:
- [Usage Across Fleet](#usage-across-fleet)
- [Allocation and Provisioning](#allocation-and-provisioning)
- [Workload Optimization Opportunities](#workload-optimization-opportunities)

## Usage across Fleet

Operational efficiency is a key driver of overall cost. Understanding your GPU fleet utilization can help avoid overprovisioning and reduce idle GPU spend.

### GPU fleet funnel visualization

This visualization provides a breakdown of your entire GPU fleet across multiple cloud providers, showing all your Kubernetes clusters, hosts, and GPU devices.

The funnel also highlights any performance issues or provisioning inefficiencies in your teams' resource utilization efforts such as idle devices, underutilized GPU cores, or resource starvation that requires rebalancing.

{{< img src="gpu_monitoring/funnel-3-k8s.png" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, allocated, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:90%;" >}}

The steps of the funnel are defined as follows:
- **Total**: Any GPU device that is sending data during the selected time frame
- **Active**: How many of your GPU devices are actively used for a workload
- **Effective**: How many GPU devices are used and working more than 50% of their lifespan

If you use Kubernetes and have enabled the Kubernetes integration, you'll see additional information around Kubernetes Allocation which allows you to determine how many of your GPU devices are **Allocated** to Kubernetes workloads.

### Understand your GPU spend

See your total spend on GPU infrastructure, and identify the subset of those costs that are wasted on idle GPU devices.

**Note**: Total cloud costs from AWS and Google Cloud are calculated over the selected time frame. As this data is only available at a delay, the selected time frame must be greater than or equal to two days. Idle costs are the subset of the total cost attributed to idle GPUs.

## Allocation and Provisioning

Use this section to gain insights into GPU allocation and capacity. This helps you to troubleshoot failed workloads due to GPU constraints, and improve the operational efficiency of your fleet.

### Device allocation over time

AI workloads can experience unpredictable spikes in resource usage. As a result, it's important to align available GPUs with incoming workloads. This section helps you to identify if you're overallocating GPUs that end up sitting idle, or underprovisioning resources that stall critical jobs.

For example, if you see a spike in the forecasted values for the number of allocated devices, your future workloads may require additional GPU devices.

{{< img src="gpu_monitoring/allocation.png" alt="Total, Allocated and Active device counts over time" style="width:90%;" >}}

### Cloud provider instance breakdown

If you rely on GPUs deployed through major cloud providers, this widget breaks down the cloud instance type within your fleet.

{{< img src="gpu_monitoring/instance_breakdown.png" alt="The cloud provider instance breakdown widget" style="width:90%;" >}}

### Device type breakdown

When AI workloads fail, it may be due to the number of available GPU devices rather than code performance. This widget surfaces device availability across all of your GPU device types, and highlights any device type pools that are fully saturated (signaling that additional devices may be required).

To understand if any device type pools need additional provisioning, check this data against the **Unmet GPU requests** widget beneath it.

**Note**: If the number of devices available for any device type is less than 5% of the total number of devices, that device type is highlighted in red.

{{< img src="gpu_monitoring/device_type.png" alt="Availability by GPU device type" style="width:90%;" >}}

### Pinpoint areas with insufficient GPU resources to guide provisioning decisions (Kubernetes required) 

**Note**: This section is only available for Kubernetes users. 

Use this section to identify the number of unmet GPU requests for your Kubernetes clusters.

{{< img src="gpu_monitoring/unmet_requests-2.png" alt="Toplist of kubernetes clusters by number of unmet GPU requests." style="width:90%;" >}}

If you have Kubernetes clusters with a large number of unmet GPU requests, you can also look at their **Device Type Breakdown** widget to understand which device type the particular service relies on, and the **Device Allocation over time** widget to track historical demands. This helps you to confirm if these clusters and device types are consistently underprovisioned.

**Note**: If there are no services or clusters listed, and you are emitting the proper tags, this is indicative that all of your services and clusters have sufficient GPU resources during the selected time frame.

## Workload optimization opportunities

Cost optimization of your GPU workloads is crucial, as GPUs are often the most costly items in a team's infrastructure budget. This section uncovers workloads with inefficient GPU utilization, linking wasted costs to specific workloads and their resource usage.

### Most expensive clusters (Kubernetes required)

**Note**: This section is only available for Kubernetes users.

This table is sorted by **Total Cost**, helping you to identify your most expensive Kubernetes clusters and the amount spent on their idle resources. You can use this information to reach out to the teams responsible for those clusters, and find ways to decrease their costs, such as reducing the number of idle or inefficient GPU devices.

{{< img src="gpu_monitoring/expensive_clusters.png" alt="Table of the most expensive Kubernetes clusters." style="width:90%;" >}}

Click into any of these clusters to investigate the workloads contributing to its costs, by either pods or processes, on the [GPU Fleet page][1]. This opens a side panel with details of that specific cluster and its connected entities.

For example, if you see a related pod with low core utilization, that pod is ineffectively using its associated GPU device. You can then contact the pod owner to terminate the pod or move it to a smaller GPU.

{{< img src="gpu_monitoring/cluster_entities.png" alt="A details side panel for a particular cluster that displays the connected entities of that cluster such as pods and processes." style="width:90%;" >}}

### Ineffective pods (Kubernetes required)

**Note**: This section is only available for Kubernetes users. 

To maximize the value of your GPU infrastructure spend, it's important to keep your GPU devices consistently busy. This widget reveals which pods are ineffectively using their associated GPU devices. The table is sorted by **SM activity** by default.

{{< img src="gpu_monitoring/inefficient_pods.png" alt="Table of inefficient pods sorted by SM Engine Activity level." style="width:90%;" >}}

Clicking on any ineffective pod opens a menu with an option to view it on the Kubernetes Explorer page. On the Kubernetes Explorer page, you can access the pod's detail view, and click the **GPU** tab to see its related GPU devices.

For example, you may notice that the SM activity timeseries graph dips lower than 50%. You can then check whether your devices' `Memory Utilization` and `Graphics Activity` values have spiked during that particular time frame; if so, that is the reason for low SM Engine Activity (idle devices). To remediate this, you can contact the pod owner about consolidating the workload to a smaller number of devices, using a smaller GPU, or optimizing your code to get better throughput with the existing GPU.

This widget also helps you to identify "noisy neighbors" (where one or more pods consume a disproportionately large amount of shared resources on a host). For example, another pod can be using all of a given host's CPU, depriving other pods on the host.

### Zombie processes (Processes required)

**Note**: This section is only available for customers who have installed [Live Processes][2]. 

Zombie processes are often the primary source of wasted GPU spend, as they inappropriately reserve GPU capacity. This widget lists any zombie processes that should be terminated to free up this GPU capacity for other workloads.

{{< img src="gpu_monitoring/zombie_processes.png" alt="Table of zombie processes that is sorted by SM Engine Activity that need to be killed to free up GPU capacity." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[2]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows
