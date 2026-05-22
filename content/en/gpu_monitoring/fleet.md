---
title: GPU Monitoring Fleet Page
description: "An inventory of all your GPU-accelerated hosts that helps you diagnose performance issues."
further_reading:
    - link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
      tag: "Blog"
      text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
---

## Overview

The [GPU Fleet page][0] provides a detailed inventory of all of your GPU-accelerated hosts for a specified time frame. Use this view to uncover inefficiencies through resource telemetry, ranging from performance and usage metrics to costs. This page also surfaces Datadog's built-in provisioning and performance optimization recommendations for your devices, to help you maximize the value of your GPU spend. 

## Break down your fleet by any tag

Use quick filter dropdowns at the top of the page to filter by a specific {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Device Type{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Region{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Data Center{{< /ui >}}, {{< ui >}}Environment{{< /ui >}}, or {{< ui >}}Team{{< /ui >}}.

You can also {{< ui >}}Search{{< /ui >}} or {{< ui >}}Group{{< /ui >}} by other tags using the search and group-by fields. For example, with {{< ui >}}Host{{< /ui >}} selected, group by `Team` to view a table entry for each unique team. Click the {{< ui >}}>{{< /ui >}} button next to any entry to see the hosts used by that team and the GPU devices accelerating those hosts.

**Note**: You can only {{< ui >}}Group by{{< /ui >}} one additional tag.

If you select {{< ui >}}Cluster{{< /ui >}} or {{< ui >}}Host{{< /ui >}}, you can click on the {{< ui >}}>{{< /ui >}} button next to each table entry to view a cluster's hosts or a host's devices, respectively. 

{{< img src="gpu_monitoring/host_row_expansion-2.png" alt="GPU Fleet table showing services with their device types, with the row expand button highlighted" style="width:90%;" >}}

**Note**: The Cluster table is only populated if you use Kubernetes.

{{< img src="gpu_monitoring/filters_and_groupings-3.png" alt="Filter dropdowns and Group by selector at the top of the GPU Fleet page" style="width:90%;" >}}

## Use-case driven views
Datadog guides you through your provisioning and performance optimization workflows by providing two dedicated use-case driven views. 

### Provisioning
The {{< ui >}}Provisioning{{< /ui >}} tab shows key recommendations and metrics insights for allocating and managing your capacity. 

{{< img src="gpu_monitoring/provisioning-tab-2.png" alt="The Provisioning use-case driven view" style="width:90%;" >}}

Built-in recommendations: 
- Datadog proactively detects thermal throttling or hardware defects and instantly recommends remediation based on hardware errors like ECC/XID errors.
- Datadog detects whether inactive devices should be provisioned to avoid having devices sit idle.

Metrics relevant for your provisioning workflow: 
- ECC Errors
- XID Errors
- Graphics Engine Activity
- GPU Utilization
- GPU Memory
- Allocated Devices (Only available for Kubernetes users) 
- Active Devices
- Idle Cost

### Performance
The {{< ui >}}Performance{{< /ui >}} tab helps you understand workload execution and tune GPU utilization to use your devices more effectively.

{{< img src="gpu_monitoring/performance-tab-2.png" alt="The Performance use-case driven view" style="width:90%;" >}}

Built-in recommendations: 
- If your workloads are CPU-intensive, Datadog flags hosts with CPU saturation and recommends solutions.
- If your workloads aren't effectively using their allocated GPU devices, Datadog provides recommendations for tuning workloads to get more value out of their capacity.

Metrics relevant for your performance workflow: 
- ECC Errors
- XID Errors
- Graphics Engine Activity
- GPU Utilization
- GPU Memory
- Effective Devices
- Power
- Temperature
- PCIe RX Throughput
- PCIe TX Throughput
- CPU Utilization

## Summary Graph

After selecting {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Host{{< /ui >}}, or {{< ui >}}Device{{< /ui >}}, the {{< ui >}}Summary Graph{{< /ui >}} displays key resource telemetry across your entire GPU infrastructure grouped by that selection. Expand the section below to see a table of the available metrics and what they represent. 

{{% collapse-content title="See the full list of GPU metrics" level="h4" expanded=false id="gpu-metrics-table" %}}
| Metric                   | Definition                                                                                                                                                                                                              | Metric Name                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Provisioned Devices      | Breakdown of provisioned devices by active and effective devices.                                                                                                                                                       | `gpu.device.total`                                 |
| Allocated Devices        | (Only available if using Kubernetes) Count of devices that have been allocated to a workload.                                                                                                                           | `gpu.device.total`                                 |
| Active Devices           | Count of devices that are actively used for a workload or are busy. If using Kubernetes: count of allocated devices that are actively used for a workload.                                                                   | `gpu.gr_engine_active`                             |
| Effective Devices        | Count of devices that are used and working for more than 50% of the selected time frame.                                                                                                                                         | `gpu.sm_active`                                    |
| Core Utilization         | (Only available if System Probe enabled) `Cores Used/Cores Limit` for GPU processes. Measure of Temporal Core Utilization.                                                                                              | `gpu_core_utilization`                             |
| GPU Memory               | Ratio (%) of GPU memory used to total GPU memory limit.                                                                                                                                                                 | `100 - (gpu.memory.free / gpu.memory.limit * 100)` |
| PCIe RX Throughput       | Bytes received through PCI from the GPU device per second.                                                                                                                                                              | `gpu.pci.throughput.rx`                            |
| PCIe TX Throughput       | Bytes transmitted through PCI to the GPU device per second.                                                                                                                                                             | `gpu.pci.throughput.tx`                            |
| Graphics Engine Activity | Fraction of time the GPU was performing any compute work during the interval. A coarse signal of whether the GPU is busy or idle.                                                                                       | `gpu.gr_engine_active`                             |
| GPU Utilization          | Average % of time each streaming multiprocessor was active (lower values indicate idle time).                                                                                                                           | `gpu.sm_active`                                    |
| Power                    | Power usage for the GPU device.<br>**Note**: On GA100 and previous architectures, this represents the instantaneous power at that moment.<br>For newer architectures, it represents the average power draw (Watts) over one second. | `gpu.power.usage`                                  |
| Temperature              | Temperature of a GPU device.                                                                                                                                                                                            | `gpu.temperature`                                  |
| SM Clock                 | SM clock frequency in MHz.                                                                                                                                                                                              | `gpu.clock_speed.sm`                               |
| Memory Free              | Amount of available / free memory.                                                                                                                                                                                      | `gpu.memory.free`                                  |
| GPU Saturation           | Measures how fully the GPU's parallel execution capacity is being used during the time frame (average ratio of active warps to the maximum warps supported per streaming multiprocessor across all SMs).                 | `gpu.sm_occupancy`                                 |
| NVLink RX                | Total RX of all NVLINK links.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.rx`                     |
| NVLink TX                | Total TX of all NVLINK links.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.tx`                     |
| NVLink Active Links      | Number of active NVLINK links for the device.                                                                                                                                                                           | `gpu.nvlink.count.active`                          |
| ECC Errors               | Total count of uncorrected ECC errors.                                                                                                                                                                                  | `gpu.errors.ecc.uncorrected.total`                 |
| XID Errors               | Count of NVIDIA XID errors, indicating hardware or driver-level issues.                                                                                                                                                 | `gpu.errors.xid.total`                             |
| CPU Utilization          | % of time the CPU spent running user space processes.                                                                                                                                       | `system.cpu.user`                                  |
| Host Uptime              | Time since the host was last started                                                                                                                                                                                    | `system.uptime`                                    |
| Host I/O Utilization      | % of CPU time during which I/O requests were issued to the GPU device.                                                                                                                                                  | `system.io.util`                                   |
| Host Memory              | % of usable memory in use.                                                                                                                                                                                    | `system.mem.pct_usable`                            |
{{% /collapse-content %}} 

If you've selected an additional tag to group by—for example, _team_—every unique timeseries in the Summary Graph corresponds to a team's value for the selected metric.

## Inventory of your GPU-powered infrastructure

This table breaks down your GPU-powered infrastructure by any tag of your choosing. If you haven't specified an additional tag in the {{< ui >}}Group by{{< /ui >}} field, results are grouped by your selected view: {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Host{{< /ui >}}, or {{< ui >}}Device{{< /ui >}}.

By default, the table of results displays the following columns: 

- Device Name
- Graphics Engine Activity 
- GPU Utilization (Only if System Probe is enabled) 
- Core Utilization 
- GPU Memory
- Idle Cost
- Recommendation

You can click on the gear icon to customize which metrics are displayed within the table. Expand the section below to see a full list of the available metrics. 

{{% collapse-content title="See the full list of available metrics" level="h4" expanded=false id="metric-full-list" %}}
| Category         | Metric                   | Definition                                                                                                                                                                                                              | Metric Name                                        |
| ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| —                | Device Name              | Type of GPU device.                                                                                                                                                                                                     | `gpu_device`                                       |
| Hardware Health  | Total Errors             | Total count of errors for the resource.                                                                                                                                                                                 | `gpu.errors.total`                                 |
| Hardware Health  | ECC Errors               | Total count of uncorrected ECC errors.                                                                                                                                                                                  | `gpu.errors.ecc.uncorrected.total`                 |
| Hardware Health  | XID Errors               | Count of NVIDIA XID errors, indicating hardware or driver-level issues.                                                                                                                                                 | `gpu.errors.xid.total`                             |
| Utilization      | Graphics Engine Activity | Fraction of time the GPU was performing any compute work during the interval. A coarse signal of whether the GPU is busy or idle.                                                                                       | `gpu.gr_engine_active`                             |
| Utilization      | GPU Saturation           | Measures how fully the GPU's parallel execution capacity is being used during the time frame (average ratio of active warps to the maximum warps supported per streaming multiprocessor across all SMs).                 | `gpu.sm_occupancy`                                 |
| Utilization      | Core Utilization         | (Only available if System Probe enabled) `Cores Used/Cores Limit` for GPU processes. Measure of Temporal Core Utilization.                                                                                              | `gpu_core_utilization`                             |
| Utilization      | GPU Idle                 | % of time the GPU device is idle.                                                                                                                                                                              | `100-gpu.gr_engine_active`                         |
| Provisioning     | Idle Cost                | (Only nonzero for time frames longer than 2 days) The cost of GPU resources that are reserved and allocated, but not used.                                                                                              |                                                    |
| Provisioning     | Allocated Devices        | (Only available if using Kubernetes) Count of devices that have been allocated to a workload.                                                                                                                           | `gpu.device.total`                                 |
| Provisioning     | Unallocated Devices      | Count of devices not allocated and available for use during time frame.                                                                                                                                                 |                                                    |
| Provisioning     | Active Devices           | Count of devices that are actively used for a workload or are busy. If using Kubernetes: count of allocated devices that are actively used for a workload.                                                                   | `gpu.gr_engine_active`                             |
| Provisioning     | Effective Devices        | Count of devices that are used and working for more than 50% of the selected time frame.                                                                                                                                         | `gpu.sm_active`                                    |
| Performance      | CPU Utilization          | % of time the CPU spent running user space processes.                                                                                                                                       | `system.cpu.user`                                  |
| Performance      | Host Uptime              | Time since the host was last started                                                                                                                                                                                    | `system.uptime`                                    |
| Performance      | Host I/O Utilization      | % of CPU time during which I/O requests were issued to the GPU device.                                                                                                                                                  | `system.io.util`                                   |
| Performance      | Host Memory              | % of usable memory in use.                                                                                                                                                                                    | `system.mem.pct_usable`                            |
| Performance      | GPU Utilization          | Average % of time each streaming multiprocessor was active (lower values indicate idle time).                                                                                                                           | `gpu.sm_active`                                    |
| Performance      | GPU Memory               | Ratio (%) of GPU memory used to total GPU memory limit.                                                                                                                                                                 | `100 - (gpu.memory.free / gpu.memory.limit * 100)` |
| Performance      | Power                    | Power usage for the GPU device.<br>**Note**: On GA100 and previous architectures, this represents the instantaneous power at that moment.<br>For newer architectures, it represents the average power draw (Watts) over one second. | `gpu.power.usage`                                  |
| Performance      | Temperature              | Temperature of a GPU device.                                                                                                                                                                                            | `gpu.temperature`                                  |
| Performance      | SM Clock                 | SM clock frequency in MHz.                                                                                                                                                                                              | `gpu.clock_speed.sm`                               |
| Performance      | PCIe RX Throughput       | Bytes received through PCI from the GPU device per second.                                                                                                                                                              | `gpu.pci.throughput.rx`                            |
| Performance      | PCIe TX Throughput       | Bytes transmitted through PCI to the GPU device per second.                                                                                                                                                             | `gpu.pci.throughput.tx`                            |
| Performance      | NVLink RX                | Total RX of all NVLINK links.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.rx`                     |
| Performance      | NVLink TX                | Total TX of all NVLINK links.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.tx`                     |
| Performance      | NVLink Active Links      | Number of active NVLINK links for the device.                                                                                                                                                                           | `gpu.nvlink.count.active`                          |
{{% /collapse-content %}} 

## Details side panel 

Clicking any row in the Fleet table opens a side panel with more details for the selected cluster, host, or device.

### Connected Entities 

Datadog's GPU Monitoring doesn't need to rely on NVIDIA'S DCGM Exporter. It uses the Datadog Agent to observe GPUs directly, providing insight into GPU usage and costs for pods and processes. Under the {{< ui >}}Connected Entities{{< /ui >}} section in any detail view, you can see SM activity, GPU core utilization (only if System Probe is enabled), and the memory usage of pods, processes, and Slurm jobs. This helps you identify which workloads to cut or optimize to decrease total spend. 

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

- Host-related metadata such as provider, instance type, CPU utilization, system memory used, system memory total, system IO util, SM activity, and temperature
- (only available for Kubernetes users) The specific GPU devices allocated to that host sorted by Graphics Engine Activity
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
[3]: /infrastructure/process/
[4]: /integrations/slurm/
