---
title: GPU Monitoring Summary Page
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

The [GPU Monitoring Summary page][0] analyzes your entire GPU fleet and highlights unified insights across your on-prem and cloud devices under the selected time frame. This page answers key questions such as:
- How much of your fleet is being used effectively or sitting completely idle?
- Which teams, services or clusters are the most wasteful based on idle hours?
- How can you better provision these devices to match workload demand and quota usage efficiency?
- What optimization actions can you take to get more value out of your existing GPU fleet?

Click on the section titles below to access the corresponding section:
- [Usage Across Fleet](#usage-across-fleet)
- [Cost & Utilization](#cost--utilization)
- [Allocation and Provisioning](#allocation-and-provisioning)
- [Workload Optimization Opportunities](#workload-optimization-opportunities)

## Usage across Fleet

Operational efficiency is a key driver of overall cost. Understanding your GPU fleet utilization can help avoid overprovisioning and reduce idle GPU spend.

### GPU fleet funnel visualization

Datadog's GPU Monitoring product provides observability for both on-prem and cloud devices within a single, unified view.

This visualization provides a breakdown of your entire GPU fleet across any major cloud provider (AWS, GCP, Azure, Oracle Cloud), hosted on-premises, or GPUaaS provider like Coreweave and Lambda Labs -- showing all your Kubernetes clusters, hosts, and GPU devices.

The funnel also highlights any performance issues or provisioning inefficiencies in your teams' resource utilization efforts such as idle devices, underutilized GPU cores, or resource starvation that requires rebalancing.

{{< img src="gpu_monitoring/funnel-4.jpg" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, allocated, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:90%;" >}}

The steps of the funnel are defined as follows:
- {{< ui >}}Total Devices{{< /ui >}}: Count of GPU devices with Datadog's GPU monitoring correctly configured and reporting metrics
- {{< ui >}}Active Devices{{< /ui >}}: Count of GPU devices that are actively used for a workload and busy providing value
- {{< ui >}}Effective Devices{{< /ui >}}: Count of GPU devices that are actively working for more than 50% of the selected time frame

If you use Kubernetes and have enabled the Kubernetes integration, you'll see additional information around Kubernetes Allocation which allows you to determine how many of your GPU devices are {{< ui >}}Allocated{{< /ui >}} to Kubernetes workloads.

## Cost & Utilization

{{< img src="gpu_monitoring/cost-and-utilization.jpg" alt="Cost & Utilization page showing total GPU hours and estimated cost over time grouped by cluster, and an idle GPU breakdown with top clusters by idle hours and estimated idle cost." style="width:90%;" >}}

Use this section to help you track and attribute your total cloud GPU spend and utilization efficiency back to the most wasteful clusters, teams, or services.

**Note**: To see total cloud GPU spend, you must enable the [AWS][3], [Google Cloud][4], [Azure][5], or [Oracle][6] cloud integrations in your Datadog UI.

Click on either your total GPU hours or estimated GPU cloud spend to see how they trend over time. You can additionally break these down by key tags like service or cluster over the time frames of 1 week, 1 month, or 3 months. Under {{< ui >}}Idle GPU Breakdown{{< /ui >}}, you can pinpoint the most wasteful teams, services, or clusters that have devices sitting completely idle. Click on any entity to open it in the [Fleet Explorer][1] and make further optimizations. For example, if a particular cluster is expensive, you can view pod-level usage on the [Fleet Explorer][1] page to shut down pods or resize your cluster.

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

To understand if any device type pools need additional provisioning, check this data against the {{< ui >}}Unmet GPU requests{{< /ui >}} widget beneath it.

**Note**: If the number of devices available for any device type is less than 5% of the total number of devices, that device type is highlighted in red.

{{< img src="gpu_monitoring/device_type.png" alt="Availability by GPU device type" style="width:90%;" >}}

### Pinpoint areas with insufficient GPU resources to guide provisioning decisions (Kubernetes required) 

**Note**: This section is only available for Kubernetes users. 

Use this section to identify the number of unmet GPU requests for your Kubernetes clusters.

{{< img src="gpu_monitoring/unmet-requests-2.png" alt="Toplist of kubernetes clusters by number of unmet GPU requests." style="width:90%;" >}}

If you have Kubernetes clusters with a large number of unmet GPU requests, you can also look at their {{< ui >}}Device Type Breakdown{{< /ui >}} widget to understand which device type the particular service relies on, and the {{< ui >}}Device Allocation over time{{< /ui >}} widget to track historical demands. This helps you to confirm if these clusters and device types are consistently underprovisioned.

**Note**: If there are no services or clusters listed, and you are emitting the proper tags, this is indicative that all of your services and clusters have sufficient GPU resources during the selected time frame.

## Workload optimization opportunities

Cost optimization of your GPU workloads is crucial, as GPUs are often the most costly items in a team's infrastructure budget. This section uncovers workloads with inefficient GPU utilization, linking wasted costs to specific workloads and their resource usage.

### Ineffective pods (Kubernetes required)

**Note**: This section is only available for Kubernetes users. 

To maximize the value of your GPU infrastructure spend, it's important to keep your GPU devices consistently busy. This widget reveals which pods are ineffectively using their associated GPU devices. The table is sorted by {{< ui >}}SM activity{{< /ui >}} by default.

{{< img src="gpu_monitoring/inefficient_pods.png" alt="Table of inefficient pods sorted by SM Engine Activity level." style="width:90%;" >}}

Clicking on any ineffective pod opens a menu with an option to view it on the Kubernetes Explorer page. On the Kubernetes Explorer page, you can access the pod's detail view, and click the {{< ui >}}GPU{{< /ui >}} tab to see its related GPU devices.

For example, you may notice that the SM activity timeseries graph dips lower than 50%. You can then check whether your devices' {{< ui >}}Memory Utilization{{< /ui >}} and {{< ui >}}Graphics Activity{{< /ui >}} values have spiked during that particular time frame; if so, that is the reason for low SM Engine Activity (idle devices). To remediate this, you can contact the pod owner about consolidating the workload to a smaller number of devices, using a smaller GPU, or optimizing your code to get better throughput with the existing GPU.

This widget also helps you to identify "noisy neighbors" (where one or more pods consume a disproportionately large amount of shared resources on a host). For example, another pod can be using all of a given host's CPU, depriving other pods on the host.

### Zombie processes (Live Processes required)

**Note**: This section is only available for customers who have installed the [Live Processes][2] product. 

Zombie processes are often the primary source of wasted GPU spend, as they inappropriately reserve GPU capacity. This widget lists any zombie processes that should be terminated to free up this GPU capacity for other workloads.

{{< img src="gpu_monitoring/zombie_processes.png" alt="Table of zombie processes that is sorted by SM Engine Activity that need to be killed to free up GPU capacity." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[2]: /infrastructure/process/?tab=linuxwindows
[3]: /getting_started/integrations/aws/
[4]: /getting_started/integrations/google_cloud/?tab=orglevel
[5]: /getting_started/integrations/azure/?tab=createanappregistration
[6]: /getting_started/integrations/oci/
