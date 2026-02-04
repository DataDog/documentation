---
title: GPU Monitoring
private: true
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
  tag: "Blog"
  text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    GPU Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring/" >}}
GPU Monitoring is in Preview. To join the preview, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

## Overview
Datadog's [GPU Monitoring][1] provides a centralized view into your GPU fleet's health, cost, and performance, regardless of if it's deployed across one of the major cloud providers (AWS, GCP, Azure, Oracle Cloud), hosted on-premises, or provisioned through GPU-as-a-Service platforms like Coreweave and Lambda Labs. 

GPU Monitoring helps teams improve provisioning decisions, optimize and troubleshoot AI workload performance, and eliminate idle GPU costs without having to manually set up individual vendor tools (like NVIDIA's DCGM). You can access insights into your GPU fleet by deploying the Datadog Agent.

For setup instructions, see [Set up GPU Monitoring][2].

### Make data-driven GPU allocation and provisioning decisions
With visibility into GPU utilization by host, node, or pod, you can identify hotspots or underutilization of expensive GPU infrastructure.

{{< img src="gpu_monitoring/funnel-3.png" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, allocated, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:100%;" >}}

### Troubleshoot failed workloads due to resource contention
Understand your current device availability and forecast how many devices are needed for certain teams or workloads to avoid failed workloads from resource contention.

{{< img src="gpu_monitoring/device_allocation.png" alt="Charts to help visualize GPU allocation. A line graph titled 'Device Allocation Over Time', plotting counts of total/allocated/active devices, including a 4-week future forecast. A donut chart titled 'Cloud Provider Instance Breakdown', displaying prevalence of cloud provider instances across the fleet. A 'Device Type Breakdown' displaying allocated/total for various GPU devices." style="width:100%;" >}}

### Maximize model and application performance
With GPU Monitoring's resource telemetry, you can analyze trends in GPU resources and metrics (including GPU utilization, power, and memory) over time, helping you understand their effects on your model and application performance.

{{< img src="gpu_monitoring/device_metrics.png" alt="Detail view of a device, displaying configurable timeseries visualizations for SM activity, memory utilization, power, and engine activity." style="width:100%;" >}}

### Identify and eliminate wasted, idle GPU costs
Identify total spend on GPU infrastructure and attribute those costs to specific workloads and instances. Directly correlate GPU usage to related pods or processes.

{{< img src="gpu_monitoring/fleet_costs.png" alt="Detail view of a cluster, displaying funnel visualization of devices (total/allocated/active/effective), total cloud cost, idle cloud cost, and visualizations and details of various connected entitles (pods, processors, SLURM jobs)." style="width:100%;" >}}


## Ready to start?

See [Set up GPU Monitoring][2] for instructions on how to set up Datadog's GPU Monitoring.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /gpu_monitoring/setup
