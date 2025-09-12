---
title: GPU Monitoring
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
  tag: "Blog"
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring/" >}}
GPU Monitoring is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}} 

## Overview
Datadog’s GPU Monitoring provides a centralized view into GPU fleet health, cost and performance, enabling teams to make better provisioning decisions, troubleshoot failed workloads and eliminate idle GPU costs without requiring you to manually set up each vendor tool (like NVIDIA's DCGM). Just by deploying the Datadog Agent, users instantly get advanced insights into their GPU fleet automatically.

### Confidently make GPU allocation and provisioning decisions
With visibility into GPU utilization by host, node or even pod, users can identify hotspots or underutilization of expensive GPU infrastructure.

{{< img src="gpu_monitoring/funnel.png" alt="Snapshot funnel that highlights underutilized GPU cores and idle devices." style="width:100%;" >}}

### Quickly troubleshoot failed workloads due to resource contention
Users can understand their current device availability and forecast how many devices are needed for certain teams or workloads to avoid failed workloads from resource contention.

{{< img src="gpu_monitoring/device_allocation.png" alt="Improve operational fleet efficiency by understanding device distribution and allocation over time." style="width:100%;" >}}

### Identify & eliminate wasted, idle GPU costs: 
Users can identify total and spend on GPU infrastructure and attribute those costs to specific workloads and instances. Directly correlted GPU usage to related pods or processes.

{{< img src="gpu_monitoring/fleet_costs.png" alt="Understand and attribute total or idle costs on GPU infrastructure." style="width:100%;" >}}


### Maximize model/application performance: 
With GPUM’s Resource Telemetry, users can analyze trends in GPU resources and metrics over time like GPU Utilization, Power, and Memory data throughput to understand their effects on your model/application performance.

{{< img src="gpu_monitoring/device_metrics.png" alt="Comprehensive GPU resource telemetry available OOTB with the Datadog Agent" style="width:100%;" >}}

## Ready to start?

See the [Setup documentation][1] for instructions on how to set up Datadog's GPU Monitoring product. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/quickstart
