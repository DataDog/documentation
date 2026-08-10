---
title: GPU Monitoring Fleet Page
description: "An inventory of all your GPU-accelerated hosts that helps you diagnose performance issues."
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
---

## Overview

[GPU Fleet Explorer][0] provides a detailed breakdown across AI infrastructure (like GPU devices, hosts, or Ray clusters) and AI workloads (Pods, Kube Containers, or Training Runs) for a specified time frame. Use this page to uncover provisioning inefficiencies and workload performance optimizations through rich resource telemetry covering GPU utilization, host-level metrics, and costs. This page also surfaces Datadog's proactive real-time detection of any issues impacting your fleet and workloads, alongside guidance on how to remediate those issues, to help you maximize the value of your GPU spend.

## Detect issues with out-of-the-box monitors

Datadog provides several out-of-the-box (OOTB) monitor templates that detect common GPU issues in real time, including temperature spikes, power cap throttling, unmet GPU requests, XID errors, ECC errors, bursty workloads, and idle devices. You can customize any monitor's thresholds to fit your organization's needs.

To access these templates, click the {{< ui >}}Monitors{{< /ui >}} dropdown in the top-right corner of the page.

{{< img src="gpu_monitoring/fleet-ootb-monitors.jpg" alt="Monitors dropdown in the top-right corner of the GPU Fleet page, showing OOTB monitor templates for Temperature, Power Cap Throttling, Unmet GPU Requests, Critical XID Errors, General XID Errors, ECC Errors, Bursty Workloads, and Idle Devices" style="width:40%;" >}}

## Break down your fleet by any tag

GPU Fleet Explorer gives you visibility from your AI workloads down to the AI infrastructure they rely on, letting you pivot between workload entities like pods and training runs, and infrastructure entities like devices, hosts, and clusters.

{{< img src="gpu_monitoring/gpu-fleet-sidenav.jpg" alt="Side navigation bar showing AI Infrastructure entities (Devices, Hosts, Kube Clusters, Ray Clusters) and AI Workloads entities (Pods, Kube Containers, Training Runs)" style="width:30%;" >}}

Use the filter dropdowns at the top of the page to filter by a specific {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Device Type{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Region{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Data Center{{< /ui >}}, {{< ui >}}Environment{{< /ui >}}, or {{< ui >}}Team{{< /ui >}}.

You can also {{< ui >}}Search{{< /ui >}} or {{< ui >}}Group{{< /ui >}} by other tags using the search and group-by fields. For example, you can group by {{< ui >}}Service{{< /ui >}} to view a row in the table for each unique team. Click the {{< ui >}}>{{< /ui >}} button next to any entry to see the devices by that service.

You can click on the {{< ui >}}>{{< /ui >}} button next to each table row entry to view the group's respective devices.

{{< img src="gpu_monitoring/host_row_expansion-2.png" alt="GPU Fleet table showing services with their device types, with the row expand button highlighted" style="width:90%;" >}}

**Note**: Kube Clusters, Pods, and Containers options in the side navigation are only available if you use Kubernetes.

{{< img src="gpu_monitoring/filters_and_groupings-3.png" alt="Filter dropdowns and Group by selector at the top of the GPU Fleet page" style="width:90%;" >}}

## Use case-driven views and recommendations
GPU Monitoring's Fleet Explorer page provides two dedicated use case-driven views:

- **Provisioning**: Allocate capacity and manage quotas.
- **Performance**: Optimize workload efficiency and throughput.

### Provisioning
The {{< ui >}}Provisioning{{< /ui >}} tab detects any hardware health issues impacting the allocation of your devices to workloads and provides guidance to all users, regardless of their hardware familiarity, on how to remediate those issues.

{{< img src="gpu_monitoring/provisioning-tab-3.jpg" alt="The Provisioning use case-driven view" style="width:90%;" >}}

For each detected issue, Datadog recommends step-by-step remediation actions to help you resolve it.

{{< img src="gpu_monitoring/critical-xid-recommendation.jpg" alt="Recommended remediation actions for a critical XID error" style="width:60%;" >}}

#### Summary graph

The summary graph provides out-of-the-box (OOTB) visualizations for key telemetry tied to your selected use case-driven view. For the Provisioning use case, this breaks down your Provisioned, Allocated, and Active devices so you can reclaim wasted idle spend and rediscover available devices that can be allocated to workloads.

{{< img src="gpu_monitoring/summary-graph.jpg" alt="Summary graph showing Provisioned Devices, Allocated Devices, and Active Devices breakdowns" style="width:90%;" >}}

Expand this section below to see a table of the available options and what they represent.

{{% collapse-content title="See full list of Provisioning summary graph options" level="h4" expanded=false id="provisioning-summary-graph-table" %}}
| Option              | Definition                                                |
| -------------------- | ---------------------------------------------------------- |
| Provisioned Devices  | Breakdown of provisioned devices and active devices.       |
| Allocated Devices    | Breakdown of available devices by allocated vs. unallocated. |
| Active Devices       | Breakdown of allocated devices by active vs. idle.          |
{{% /collapse-content %}}

### Performance
The {{< ui >}}Performance{{< /ui >}} tab detects any hardware health or workload issues that are stalling the workloads running on your GPU devices and provides a single source of truth and guidance to platform engineers and AI/ML teams on how to remediate those issues.

{{< img src="gpu_monitoring/performance-tab-3.jpg" alt="The Performance use case-driven view" style="width:90%;" >}}

For each detected issue, Datadog recommends step-by-step remediation actions to help you resolve it.

{{< img src="gpu_monitoring/power-cap-recommendation.jpg" alt="Recommended remediation actions for a GPU power cap throttling issue" style="width:60%;" >}}

#### Summary graph

The summary graph provides out-of-the-box (OOTB) visualizations for key telemetry tied to your selected use case-driven view. For the Performance use case, this breaks down key resource utilization metrics like GPU Utilization or GPU Saturation alongside network fabric metrics, power, temperature, and more.

{{< img src="gpu_monitoring/summary-graph-performance.jpg" alt="Summary graph showing GPU Util, GPU Saturation, and GPU Memory breakdowns" style="width:90%;" >}}

Expand the section below to see a table of the available options and what they represent.

{{% collapse-content title="See full list of Performance summary graph options" level="h4" expanded=false id="performance-summary-graph-table" %}}
| Option              | Definition                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU Util            | % of time the CPU spent running user space processes.                                                                                                                                                                 |
| Host Memory         | % of usable memory in use.                                                                                                                                                                                             |
| GPU Util            | Average % of time each streaming multiprocessor was active (lower values indicate idle time).                                                                                                                         |
| GPU Saturation      | Measures how fully the GPU's parallel execution capacity is being used during the time frame (average ratio of active warps to the maximum warps supported per streaming multiprocessor across all SMs).            |
| GPU Memory          | Ratio (%) of GPU memory used to total GPU memory limit.                                                                                                                                                                |
| PCIe RX             | Bytes received through PCI from the GPU device per second.                                                                                                                                                             |
| PCIe TX             | Bytes transmitted through PCI to the GPU device per second.                                                                                                                                                            |
| NVLink RX           | Total RX of all NVLINK links.                                                                                                                                                                                          |
| NVLink TX           | Total TX of all NVLINK links.                                                                                                                                                                                          |
| Graphics Activity   | Fraction of time the GPU was performing any compute work during the interval. A coarse signal of whether the GPU is busy or idle.                                                                                     |
| Power               | Power usage for the GPU device. On GA100 and previous architectures, this represents the instantaneous power at that moment. For newer architectures, it represents the average power draw (Watts) over one second. |
| Temperature         | Temperature of a GPU device.                                                                                                                                                                                            |
| SM Clock            | SM clock frequency in MHz.                                                                                                                                                                                             |
| NVLink Active Links | Number of active NVLINK links for the device.                                                                                                                                                                          |
| ECC Errors          | Total count of uncorrected ECC errors.                                                                                                                                                                                 |
| XID Errors          | Count of NVIDIA XID errors, indicating hardware or driver-level issues.                                                                                                                                                |
{{% /collapse-content %}}

## Inventory of your GPU-powered infrastructure

This table breaks down your GPU-powered infrastructure by any tag of your choosing. If you haven't specified an additional tag in the {{< ui >}}Group by{{< /ui >}} field, results are grouped by your selected view: {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Host{{< /ui >}}, or {{< ui >}}Device{{< /ui >}}.

You can click on the gear icon to customize which metrics are displayed within the table. Expand the section below to see a full list of the available metrics. 

{{% collapse-content title="See the full list of available metrics" level="h4" expanded=false id="metric-full-list" %}}
| Metric                   | Definition                                                                                                                                                                                                              | Metric Name                                        | Provisioning Tab | Performance Tab |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | --------------- |
| Idle Cost                | (Only nonzero for time frames longer than 2 days) The cost of GPU resources that are reserved and allocated, but not used.                                                                                              | `gpu_monitoring.estimated_idle_cost`               | ✓                 | ✓               |
| Total Devices            | GPU devices with Datadog's GPU monitoring correctly configured and reporting metrics.                                                                                                                                    | `kubernetes_state.node.gpu_capacity`               | ✓                 |                 |
| Kubernetes Available     | Healthy GPU devices that are powered on and available for allocation, according to the Kubernetes orchestrator.                                                                                                          | `kubernetes_state.node.gpu_allocatable`            | ✓                 |                 |
| Allocated Devices        | (Only available if using Kubernetes) Count of devices that have been allocated to a workload.                                                                                                                           | `gpu.device.total`                                 | ✓                 |                 |
| Unallocated Devices      | Count of devices not allocated and available for use during time frame.                                                                                                                                                 |                                                    | ✓                 |                 |
| Active Devices           | Count of devices that are actively used for a workload or are busy. If using Kubernetes: count of allocated devices that are actively used for a workload.                                                                   | `gpu.gr_engine_active`                             | ✓                 |                 |
| Idle Devices             | GPU devices allocated to workloads but not doing any work during the time frame. A device is considered idle if `gpu.gr_engine_active` equals 0.                                                                        | `gpu.gr_engine_active`                             | ✓                 |                 |
| CPU Utilization          | % of time the CPU spent running user space processes.                                                                                                                                       | `system.cpu.user`                                  |                   | ✓               |
| Host Memory              | % of usable memory in use.                                                                                                                                                                                    | `system.mem.pct_usable`                            |                   | ✓               |
| GPU Utilization          | Average % of time each streaming multiprocessor was active (lower values indicate idle time).                                                                                                                           | `gpu.sm_active`                                    |                   | ✓               |
| GPU Saturation           | Measures how fully the GPU's parallel execution capacity is being used during the time frame (average ratio of active warps to the maximum warps supported per streaming multiprocessor across all SMs).                 | `gpu.sm_occupancy`                                 |                   | ✓               |
| GPU Memory               | Ratio (%) of GPU memory used to total GPU memory limit.                                                                                                                                                                 | `100 - (gpu.memory.free / gpu.memory.limit * 100)` |                   | ✓               |
| PCIe RX Throughput       | Bytes received through PCI from the GPU device per second.                                                                                                                                                              | `gpu.pci.throughput.rx`                            |                   | ✓               |
| PCIe TX Throughput       | Bytes transmitted through PCI to the GPU device per second.                                                                                                                                                             | `gpu.pci.throughput.tx`                            |                   | ✓               |
| NVLink RX                | Total RX of all NVLINK links.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.rx`                     |                   | ✓               |
| NVLink TX                | Total TX of all NVLINK links.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.tx`                     |                   | ✓               |
| Power                    | Power usage for the GPU device.<br>**Note**: On GA100 and previous architectures, this represents the instantaneous power at that moment.<br>For newer architectures, it represents the average power draw (Watts) over one second. | `gpu.power.usage`                                  |                   | ✓               |
| Temperature              | Temperature of a GPU device.                                                                                                                                                                                            | `gpu.temperature`                                  |                   | ✓               |
{{% /collapse-content %}} 

## Details side panel 

Clicking any row in the Fleet table opens a side panel with more details for the selected cluster, host, or device.

### Connected entities 

Datadog's GPU Monitoring doesn't need to rely on NVIDIA'S DCGM Exporter. It uses the Datadog Agent to observe GPUs directly, providing insight into GPU usage and costs for pods and processes. Under the {{< ui >}}connected entities{{< /ui >}} section in any detail view, you can see SM activity, GPU core utilization (only if System Probe is enabled), and the memory usage of pods, processes, and Slurm jobs. This helps you identify which workloads to cut or optimize to decrease total spend. 

**Note**: The {{< ui >}}Pods{{< /ui >}} tab is only available if you're using Kubernetes.

{{< tabs >}}
{{% tab "Cluster side panel" %}}

Within this side panel, you have a cluster-specific funnel that identifies:

- Number of Total, Allocated (Kubernetes users only) , Active, and Effective devices within that particular cluster
- Estimated total and idle cost of that cluster
- Connected entities of that cluster: pods, processes, and Slurm jobs
- Four key metrics (customizable) for that cluster: Core Utilization (only if System probe is enabled), Memory Utilization, PCIe Throughput, and Graphics Activity
- Table of hosts associated with that cluster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Cluster specific side panel that breaks down idle devices, costs and connected entities" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Host side panel" %}}

Within this side panel, you have a host-specific view that identifies:

- Host-related metadata such as provider, instance type, CPU utilization, system memory used, system memory total, system I/O util, SM activity, and temperature
- (only available for Kubernetes users) The specific GPU devices allocated to that host sorted by Graphics Engine Activity
- Connected entities of that host: pods, processes, and Slurm jobs

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Host specific side panel that displays the GPU devices tied to that host and connected entities" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Device side panel" %}}

Within this side panel, you have a device-specific view that identifies:

- Recommendations (if any) for how to use this device more effectively 
- Device-related details: device type, SM activity, and temperature
- Four key metrics tied to GPUs: SM Activity, Memory Utilization, Power, and Graphics Engine Activity 
- Connected entities of that cluster: pods and processes

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Device specific side panel that displays recommendations for how to use the device more effectively and other key telemetry." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Installation recommendations

Datadog actively surveys your infrastructure and detects installation gaps that may diminish the value you get out of GPU Monitoring. In this modal, you can find installation update recommendations to get the optimal value of GPU Monitoring. For example, making sure your hosts have the [latest version][1] of the Datadog Agent installed, installing the latest version of the NVIDIA driver, and checking for misconfigured hosts. Datadog advises against using v7.82.0 to avoid a bug that causes unexpected kernel panics.

To view advanced GPU Monitoring features such as attribution of GPU resources by related processes or SLURM jobs, you must enable [Live Processes][3] and the [Slurm][4] integration, respectively.

{{< img src="gpu_monitoring/installation.png" alt="Modal containing installation guidance for smoother GPU Monitoring user experience." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[3]: /infrastructure/process/
[4]: /integrations/slurm/
