---
title: GPU Monitoring Fleet Page
description: "An inventory of all your GPU accelerated hosts that helps you diagnose performance issues."
---

## Overview

The [GPU Monitoring Fleet page][0] provides a detailed inventory of all of your GPU accelerated hosts under a specified time frame, like the past hour, day, week or month. With this fleet view of your high compute infrastructure, you can uncover inefficiencies by connecting a rich set of resource telemetry ranging from performance & usage metrics directly to costs. This page also surfaces any optimization recommendations for your devices to help you maximize the value of your GPU spend. 

## Breakdown your infrastructure by Cluster, Host or Device
First select how you want to understand your GPU fleet using the toggle that groups your fleet by Kubernetes Cluster, Host/Node or GPU device:

{{< img src="gpu_monitoring/fleet_toggle.png" alt="Toggle for GPU fleet page that groups table results by Kubernetes Cluster, Host or Device." style="width:100%;" >}}

For example, if you selected _Host_, the resulting table below returns all your GPU accelerated hosts. You can click on the **>** button in the Hosts table to expand any host's row view its associated GPU devices. 

{{< img src="gpu_monitoring/host_fleet.gif" alt="GIF of expanding a particular host's row to view its associated GPU devices." style="width:100%;" >}}

**Note:** The Cluster table is only populated if you use Kubernetes.

### Explore your GPU fleet with filters and groupings
Use our quick filter dropdowns to filter to a specific Provider, Device Type, Cluster, Region, Service, Data Center, Environment or team using the dropdowns at the top of the page.

Additionally, you can **Search** or **Group** by tags other than `cluster`, `host` or `device` in the fields shown below. For example, you can select the toggle for Host and then group by `Team` to view a table that first lists by each unique team. By clicking the **>** buttons, you can expand to see the hosts used by each team and the GPU devices accelerating those hosts. Note, the **Group By** field only supports one additional tag at this time.

{{< img src="gpu_monitoring/host_team.png" alt="Toggle for GPU fleet page that groups table results by Kubernetes Cluster, Host or Device." style="width:100%;" >}}

Below the search and filter fields, this page provides preset filters that allow you to instantly identify optimization opportunities for Clusters/Hosts/Devices with: 
- CPU saturation
- Ineffective devices: Streaming multiprocessor on the device is active <50% of the time.
- Inefficient devices: GPU core utilization is <50%. This is only available if you've enabled System Probe for more advanced GPU metrics and insights.
- Inactive (Idle) devices: Both streaming multiprocessor and graphics engine are active <1% of the time.

## Summary Graph
After toggling Cluster, Host, or Device, the **Summary Graph** displays key resource telemetry across your entire GPU infrastructure grouped by that toggle value. Here is a table of the available metrics and what they represent. 

| Metric                | Definition                                                              | Metric Name                                    |
| ----------------------| ------------------------------------------------------------------------| --------------------------------------------- |
| Core Utilization      | (Only available if System Probe enabled) `Cores Used/Cores Limit` for GPU processes. Measure of Temporal Core Utilization| `gpu_core_utilization`  
| Memory Utilization    | GPU Memory used / GPU Memory limit for GPU processes | `gpu_memory_utilization`
| PCIe Throughput       | (TO BE FILLED)| TO BE FILLED
| Graphics Activity     | Percentage of time that the graphics engine was active | `gpu.gr_engine_active`
| SM Activity           | Percentage of time the streaming multiprocessor was active | `gpu.sm_active`
| Power                 | Power usage for the GPU device. Note that on GA100 and older architectures, this represents the instantaneous power at that moment. For newer architectures, it represents the average power draw (Watts) over one second | `gpu.power.usage`
| Temperature           | Temperature of a GPU device | `gpu.temperature`
| Cores Used            | (Only emitted if processes are active) Average number of GPU cores that a process was using in the interval.  | `gpu.core.usage`
| Memory Used           | (Only emitted if processes are active) The memory used by this process at the point the metric was queried. | `gpu.memory.usage`
| Device Total          | Count of all devices sending data during this timeframe | `gpu.device.total`

If you've selected an additional tag to group by, like _team_, every unique timeseries in the Summary Graph selection will correspond to a unique team's value for the selected metric.

## Inventory of your GPU powered infrastructure
This table breaks down your GPU powered infrastructure by any tag of your choosing. If you haven't specified an additional tag in the **Group By** field, you will see results grouped by your toggle selected view: Cluster, Host, or Device.

By default, the table of results will display the following columns: Device Type, Graphics Engine Activity, SM Activity, (Only if System Probe is enabled) Core Utilization, Memory Utilization, Idle Cost, and Recommendations. 

You can click on the gear box icon to customize which metrics are displayed within the table. See list of available metrics below. 

### List of Available Metrics
| Metric                | Definition                                                              | Metric Name                                    |
| ----------------------| ------------------------------------------------------------------------| ---------------------------------------------  |
| CPU Utilization       | The percent of time the CPU spent running user space processes. Shown as percent | `system.cpu.user`
| Device Type           | Type of GPU device | `gpu_device`
| Total Devices         | Count of all devices sending data during this timeframe | `gpu.device.total`
| Allocated Devices     | Count of devices that have been allocated to a workload | `gpu.device.total` (NEEDS TO BE CHECKED) 
| Active Devices        | Count of allocated devices that are actively used for a workload | `gpu.gr_engine_active`
| Effective Devices     | Count of devices that are used and working for more than 50% of their lifespan | `gpu.sm_active`
| Graphics Engine Activity| Percentage of time that the graphics engine was active | `gpu.gr_engine_active`
| SM Activity           | Percentage of time the streaming multiprocessor was active | `gpu.sm_active`
| SM Clock              | SM clock frequency in MHz | `gpu.clock_speed.sm`
| PCIe RX Throughput    | Bytes received through PCI from the GPU device per second | `gpu.pci.throughput.rx`
| PCIe TX Throughput    | Bytes transmitted through PCI to the GPU device per second | `gpu.pci.throughput.tx`
| Power                 | Power usage for the GPU device. Note that on GA100 and older architectures, this represents the instantaneous power at that moment. For newer architectures, it represents the average power draw (Watts) over one second | `gpu.power.usage`
| Temperature           | Temperature of a GPU device | `gpu.temperature`
| Cores Used            | (Only emitted if processes are active) Average number of GPU cores that a process was using in the interval.  | `gpu.core.usage`
| Cores Limit           | Number of GPU cores that the process/container/device has available | `gpu.core.limit`
| Memory Used           | (Only emitted if processes are active) The memory used by this process at the point the metric was queried. | `gpu.memory.usage`
| Memory Limit          | The maximum amount of memory a process/container/device could allocate | `gpu.memory.limit`
| Metric Tons CO2       | Metric tons of carbon dioxide equivalent (MTCO2e) is a unit of measurement that compares the emissions of greenhouse gases based on their global warming potential (GWP).
It's calculated by multiplying the amount of a gas by its GWP.
For example, if methane has a GWP of 21, then 1 million metric tons of methane is equivalent to 21 million metric tons of carbon dioxide. | Formula based on `gpu.power.usage`
| Core Utilization      | (Only available if System Probe enabled) `Cores Used/Cores Limit` for GPU processes. Measure of Temporal Core Utilization | `gpu_core_utilization`  
| Memory Utilization    | GPU Memory used / GPU Memory limit for GPU processes | `gpu_memory_utilization`
| Idle Cost             | (Only nonzero for timeframes >2 days) The cost of GPU resources that are reserved and allocated but not used.

## Installation Recommendations
(ADD SP enabled or not dependencies here) 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mEnd=1758119939640&mPage=fleet&mStart=1758105539640&mView=nvidia
[1]: 
