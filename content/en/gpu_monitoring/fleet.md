---
title: GPU Monitoring Fleet Page
description: "An inventory of all your GPU-accelerated hosts that helps you diagnose performance issues."
private: true
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
---

## Overview

The [GPU Fleet page][0] provides a detailed inventory of all of your GPU-accelerated hosts for a specified time frame. Use this view to uncover inefficiencies through resource telemetry, ranging from performance and usage metrics to costs. This page also surfaces any optimization recommendations for your devices, to help you maximize the value of your GPU spend. 

## Breakdown your infrastructure by cluster, host, or device

First select how you want to understand your GPU fleet using the toggle that groups your fleet by Kubernetes cluster (only available for Kubernetes users), Host (node), or GPU device:

{{< img src="gpu_monitoring/fleet_toggle-2.png" alt="Toggle for GPU fleet page that groups table results by Kubernetes Cluster, Host or Device." style="width:90%;" >}}

Your selection is used to populate the resulting table. If you select _Cluster_ or _Host_, you can click on the **`>`** button next to each table entry to view a cluster's hosts or a host's devices, respectively. 

{{< img src="gpu_monitoring/host_row_expansion.png" alt="A host entry in the table" style="width:90%;" >}}

**Note**: The Cluster table is only populated if you use Kubernetes.

### Explore your GPU fleet with filters and groupings

Use quick filter dropdowns at the top of the page to filter by a specific **Provider**, **Device Type**, **Cluster**, **Region**, **Service**, **Data Center**, **Environment** or **Team**.

You can also **Search** or **Group** by other tags in the fields shown below. For example, you can select the toggle for Host and then group by `Team` to view a table entry for each unique team. Click the **`>`** button next to any entry to see the hosts used by that team and the GPU devices accelerating those hosts. 

**Note**: You can only **Group by** one additional tag.

{{< img src="gpu_monitoring/filters_and_groupings-2.png" alt="The menu for filtering and grouping in the GPU Fleet page" style="width:90%;" >}}

## Use-case driven views
Datadog guides you through your provisioning and performance optimization workflows by providing two dedicated use-case driven views. 

### Provisioning
The Provisioning tab shows key recommendations and metrics insights for allocating and managing your capacity. 

{{< img src="gpu_monitoring/provisioning-tab.png" alt="The Provisioning use-case driven view" style="width:90%;" >}}

OOTB recommendations: 
- Datadog proactively detects thermal throttling or hardware defects and instantly recommends remediation based on hardware errors like ECC/XID errors.
- Datadog detects whether inactive devices should be provisioned to avoid having devices sit idle.

Metrics relevant for your provisioning workflow: 
- ECC and XID Error Count
- Graphics Activity
- SM Activity
- GPU Memory
- Allocated Devices
- Active Devices
- Idle Cost

### Performance
The Performance tab allows you to understand your workload's execution and helps you tune GPU utilization to more effectively use your devices.

{{< img src="gpu_monitoring/performance-tab.png" alt="The Performance use-case driven view" style="width:90%;" >}}

It provides several OOTB recommendations: 
- If your workloads are CPU-intensive, Datadog flags hosts with CPU saturation and provides recommended actions to alleviate that.
- If your workloads aren't effectively using their allocated GPU devices, Datadog provides recommendations on how to tune your workloads to get more value out of your capacity.

You'll also see a focused set of metrics relevant for your performance workflow: 
- ECC / XID Error Count
- Graphics Activity
- SM Activity
- GPU Memory
- Effective Devices
- Power
- Temperature
- PCIe RX
- PCIe Tx
- CPU Utilization

## Summary Graph

After toggling Cluster, Host, or Device, the **Summary Graph** displays key resource telemetry across your entire GPU infrastructure grouped by that toggle value. Expand the section below to see a table of the available metrics and what they represent. 

{{% collapse-content title="See the full list of GPU metrics" level="h4" expanded=false id="gpu-metrics-table" %}}
| Metric                | Definition                                                              | Metric Name                                    |
| ----------------------| ------------------------------------------------------------------------| --------------------------------------------- |
| Core Utilization      | (Only available with System Probe enabled for advanced eBPF metrics) `Cores Used/Cores Limit` for GPU processes. Measure of Temporal Core Utilization.| `gpu_core_utilization`  
| Memory Utilization    | GPU Memory used / GPU Memory limit for GPU processes. | `gpu_memory_utilization`
| PCIe Throughput       | Bytes received and bytes transmitted through PCI from the GPU device per second. | `gpu.pci.throughput.rx`,`gpu.pci.throughput.tx` 
| Graphics Activity     | Percentage of time that the graphics engine was active. | `gpu.gr_engine_active`
| SM Activity           | Percentage of time the streaming multiprocessor was active. | `gpu.sm_active`
| Power                 | Power usage for the GPU device.<br>**Note**: On GA100 and previous architectures, this represents the instantaneous power at that moment.<br>For newer architectures, it represents the average power draw (Watts) over one second. | `gpu.power.usage`
| Temperature           | Temperature of a GPU device. | `gpu.temperature`
| Cores Used            | (Only emitted if processes are active) Average number of GPU cores that a process was using in the interval.  | `gpu.core.usage`
| Memory Used           | (Only emitted if processes are active) The memory used by this process at the point the metric was queried. | `gpu.memory.usage`
| Device Total          | Count of all devices sending data during this time frame. | `gpu.device.total`
{{% /collapse-content %}} 

If you've selected an additional tag to group by---for example, _team_---every unique timeseries in the Summary Graph corresponds to a team's value for the selected metric.

## Inventory of your GPU-powered infrastructure

This table breaks down your GPU-powered infrastructure by any tag of your choosing. If you haven't specified an additional tag in the **Group by** field, results are grouped by your toggle-selected view: Cluster, Host, or Device.

By default, the table of results displays the following columns: 

- Device Type 
- Graphics Engine Activity 
- SM Activity (Only if System Probe is enabled) 
- Core Utilization 
- Memory Utilization 
- Idle Cost
- Recommendation

You can click on the gear icon to customize which metrics are displayed within the table. Expand the section below to see a full list of the available metrics. 

{{% collapse-content title="See the full list of available metrics" level="h4" expanded=false id="metric-full-list" %}}
| Metric                | Definition                                                              | Metric Name                                    |
| ----------------------| ------------------------------------------------------------------------| ---------------------------------------------  |
| CPU Utilization       | The percent of time the CPU spent running user space processes. Shown as percent. | `system.cpu.user`
| Device Type           | Type of GPU device. | `gpu_device`
| Total Devices         | Count of all devices sending data during this time frame. | `gpu.device.total`
| Allocated Devices     | Count of devices that have been allocated to a workload. | `gpu.device.total`
| Active Devices        | Count of allocated devices that are actively used for a workload. | `gpu.gr_engine_active`
| Effective Devices     | Count of devices that are used and working for more than 50% of their lifespan. | `gpu.sm_active`
| Graphics Engine Activity| Percentage of time that the graphics engine was active. | `gpu.gr_engine_active`
| SM Activity           | Percentage of time the streaming multiprocessor was active. | `gpu.sm_active`
| SM Clock              | SM clock frequency in MHz. | `gpu.clock_speed.sm`
| PCIe RX Throughput    | Bytes received through PCI from the GPU device per second. | `gpu.pci.throughput.rx`
| PCIe TX Throughput    | Bytes transmitted through PCI to the GPU device per second. | `gpu.pci.throughput.tx`
| Power                 | Power usage for the GPU device.<br>**Note**: On GA100 and previous architectures, this represents the instantaneous power at that moment.<br>For newer architectures, it represents the average power draw (Watts) over one second. | `gpu.power.usage`
| Temperature           | Temperature of a GPU device. | `gpu.temperature`
| Cores Used            | (Only emitted if processes are active) Average number of GPU cores that a process was using in the interval.  | `gpu.core.usage`
| Cores Limit           | Number of GPU cores that the process, container, or device has available. | `gpu.core.limit`
| Memory Used           | (Only emitted if processes are active) The memory used by this process at the point the metric was submitted. | `gpu.memory.usage`
| Memory Limit          | The maximum amount of memory a process, container, or device could allocate. | `gpu.memory.limit`
| Metric Tons CO2       | Metric tons of carbon dioxide equivalent (MTCO2e) is a unit of measurement that compares the emissions of greenhouse gases based on their global warming potential (GWP). It's calculated by multiplying the amount of a gas by its GWP. For example, if methane has a GWP of 21, then 1 million metric tons of methane is equivalent to 21 million metric tons of carbon dioxide. | Formula based on `gpu.power.usage`
| Core Utilization      | (Only available if System Probe enabled) `Cores Used/Cores Limit` for GPU processes. Measure of Temporal Core Utilization. | `gpu_core_utilization`  
| Memory Utilization    | GPU Memory used / GPU Memory limit for GPU processes. | `gpu_memory_utilization`
| Idle Cost             | (Only nonzero for time frames longer than 2 days) The cost of GPU resources that are reserved and allocated, but not used.
{{% /collapse-content %}} 

## Details side panel 

Clicking any row in the Fleet table opens a side panel with more details for the selected cluster, host, or device.

### Connected Entities 

Datadog's GPU Monitoring doesn't need to rely on NVIDIA'S DCGM Exporter. It uses the Datadog Agent to observe GPUs directly, providing insight into GPU usage and costs for pods and processes. Under the **Connected Entities** section in any detail view, you can see SM activity, GPU core utilization (only if System Probe is enabled), and the memory usage of pods, processes, and Slurm jobs. This helps you identify which workloads to cut or optimize to decrease total spend. 

**Note**: The **Pods** tab is only available if you're using Kubernetes.

{{< tabs >}}
{{% tab "Cluster side panel" %}}

Within this side panel, you have a cluster-specific funnel that identifies:

- Number of Total, Allocated, Active, and Effective devices within that particular cluster
- Estimated total and idle cost of that cluster
- Connected entities of that cluster: pods, processes, and Slurm jobs
- Four key metrics (customizable) for that cluster: Core Utilization (only if System probe is enabled), Memory Utilization, PCIe Throughput, and Graphics Activity
- Table of hosts associated with that cluster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Cluster specific side panel that breaks down idle devices, costs and connected entities" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Host side panel" %}}

Within this side panel, you have a host-specific view that identifies:

- Host-related metadata such as provider, instance type, CPU utilization, system memory used, system memory total, system IO util, SM activity, and temperature
- The specific GPU devices allocated to that host sorted by Graphics Engine Activity
- Connected Entities of that host: pods, processes, and Slurm jobs

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Host specific side panel that displays the GPU devices tied to that host and Connected Entities" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Device side panel" %}}

Within this side panel, you have a device-specific view that identifies:

- Recommendations (if any) for how to use this device more effectively 
- Device-related details: device type, SM activity, and temperature
- Four key metrics tied to GPUs: SM Activity, Memory Utilization, Power, and Graphics Engine Activity 
- Connected Entities of that cluster: pods and processes

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Device specific side panel that displays recommendations for how to use the device more effectively and other key telemetry." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Installation recommendations

Datadog actively surveys your infrastructure and detects installation gaps that may diminish the value you get out of GPU Monitoring. In this modal, you can find installation update recommendations to get the optimal value of GPU Monitoring. For example, making sure your hosts have the [latest version][1] of the Datadog Agent installed, installing the latest version of the NVIDIA driver, and checking for misconfigured hosts.

To view advanced GPU Monitoring features such as attribution of GPU resources by related processes or SLURM jobs, you must enable [Live Processes][3] and the [Slurm][4] integration, respectively.

{{< img src="gpu_monitoring/installation.png" alt="Modal containing installation guidance for smoother GPU Monitoring user experience." style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[2]: https://www.nvidia.com/drivers/
[3]: /infrastructure/process/
[4]: /integrations/slurm/
