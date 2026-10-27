---
title: GPU Monitoring
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "https://www.datadoghq.com/blog/datadog-gpu-monitoring/"
  tag: "Blog"
  text: "Optimize and troubleshoot AI infrastructure with Datadog GPU Monitoring"
- link: "https://www.datadoghq.com/blog/monitor-tas-and-gang-scheduling-for-ai-training-in-kubernetes/"
  tag: "Blog"
  text: "Monitor TAS and gang scheduling for AI training in Kubernetes"
- link: "https://www.datadoghq.com/blog/how-kubernetes-dra-can-improve-gpu-utilization-and-cut-costs/"
  tag: "Blog"
  text: "How Kubernetes DRA can improve GPU utilization and cut costs"
- link: "https://www.datadoghq.com/architecture/gpu-monitoring/"
  tag: "Architecture Center"
  text: "GPU Monitoring Reference Architecture"
---

## Overview
Datadog's [GPU Monitoring][1] helps you understand and optimize the performance, health, and cost of your GPU fleet and the AI workloads running on it, all in one place. With GPU Monitoring, you can:

- Get unified, fleet-wide GPU visibility across cloud, on-premises, and neocloud providers.
- Identify the key drivers of GPU inefficiencies and wasted spend by team, service, cluster, and more.
- Improve the throughput and performance of the AI training and inference workloads running on your GPUs.
- Pinpoint optimization opportunities, such as idle devices and zombie processes, to reclaim wasted spend.

GPU Monitoring supports fleets deployed across the major cloud providers (AWS, GCP, Azure, Oracle Cloud), hosted on-premises, or provisioned through GPU-as-a-Service platforms like CoreWeave and Lambda Labs. You don't need to manually set up individual vendor tools (like NVIDIA's DCGM).

You can access insights into your GPU fleet by deploying the Datadog Agent on your GPU-accelerated hosts. For setup instructions, see [Set up GPU Monitoring][2].

## Key capabilities

### Capacity plan with confidence
Understand your entire fleet's size and spend across hyperscalers, on-premises, and neocloud providers in one unified view.

{{< img src="gpu_monitoring/funnel-3.png" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:100%;" >}}

- Attribute GPU usage and quotas by team, service, or any tag to allocate capacity more fairly across teams, and to distinguish real capacity shortages from inefficiencies.
- Identify resource contention and forecast demand for each GPU type to shorten procurement cycles and make spend more predictable.
- Diagnose why workloads are delayed or evicted.

{{< img src="gpu_monitoring/device_allocation.png" alt="Charts to help visualize GPU allocation. A line graph titled 'Device Allocation Over Time', plotting counts of total/allocated/active devices, including a 4-week future forecast. A donut chart titled 'Cloud Provider Instance Breakdown', displaying prevalence of cloud provider instances across the fleet. A 'Device Type Breakdown' displaying allocated/total for various GPU devices." style="width:100%;" >}}

### Maximize AI workload throughput
Analyze trends in GPU resources and metrics (including GPU utilization, power, and memory) by host, node, or pod over time to understand how your devices affect model and application performance.

- Troubleshoot stalled workloads with shared context for both platform and ML teams, instead of switching between siloed tools.
- Pinpoint why workloads are slowing down, whether the issue resides in unhealthy hardware, communication, memory bandwidth, or scheduling.
- Detect bottlenecks in your training and inference workloads with lightweight, continuous tracing.
- Discover recommendations on the optimizations that produce the largest throughput improvements.

{{< img src="gpu_monitoring/device_metrics.png" alt="Detail view of a device, displaying configurable timeseries visualizations for SM activity, memory utilization, power, and engine activity." style="width:100%;" >}}

### Safeguard device reliability
GPUs are an expensive and scarce resource with higher failure rates than standard servers. GPU Monitoring provides out-of-the-box monitors and proactive recommendations to help you detect and remediate hardware issues before they impact your mission-critical workloads.

- Catch thermal throttling early with out-of-the-box alerts, before failures spread across the cluster.
- Detect and remediate ECC and XID errors proactively, with prescriptive next steps that help teams act fast.
- Isolate unhealthy GPUs before failures cascade.

### Reduce wasted spend
Identify total spend on GPU infrastructure and attribute those costs to specific workloads and instances. Directly correlate GPU usage to related pods or processes.

- Break down total and idle GPU spend by any tag over any time frame to see where spend is concentrated.
- Identify the key drivers of wasted GPU spend and inefficiencies (for example, the most wasteful teams) to support internal chargebacks and data-driven quota management decisions.
- Make cost optimization part of daily operations by giving teams clear reporting on GPU usage and spend.

{{< img src="gpu_monitoring/fleet_costs.png" alt="Detail view of a cluster, displaying funnel visualization of devices (total/allocated/active/effective), total cloud cost, idle cloud cost, and visualizations and details of various connected entitles (pods, processors, SLURM jobs)." style="width:100%;" >}}

## Preview capabilities
The following GPU Monitoring capabilities are in Preview. To request access, use the form linked on each page.

### Manage GPU quotas and capacity
The [Capacity Planning][3] page gives platform teams and workload owners one shared view of GPU provisioning across Kueue-managed queues.

- **Identify key inefficiency drivers**: Know which teams or projects are over- or underusing their quotas so you can reallocate compute.
- **Detect resource contention**: Understand which GPU types are oversubscribed so you can add capacity.
- **Diagnose workload evictions and delays**: Pinpoint preempted or evicted workloads and understand why they're delayed.

{{< img src="gpu_monitoring/capacity-planning-page-3.png" alt="Capacity Planning page in GPU Monitoring showing GPU quota, idle allocated GPU, preemption, fleet coverage, and saturation graphs above a list of workloads." style="width:100%;" >}}

### Debug and optimize training
The [Training][4] page ties each training run to the health of the GPU hardware and network interconnect it ran on.

- **Reduce the time it takes to train models**: Share context across platform, MLOps, and ML engineering teams instead of switching between siloed tools.
- **Troubleshoot stalled runs with agentic root cause analysis**: Pinpoint why workloads are slowing down, whether the cause is unhealthy hardware, communication bottlenecks, memory bandwidth, or scheduling.
- **Increase training throughput**: Discover recommendations on the optimizations that produce the largest throughput improvements, such as GPU kernel fusions.

{{< img src="gpu_monitoring/training-page.png" alt="Training page in GPU Monitoring showing training run insights, a bar graph of runs over time, and a list of training runs." style="width:100%;" >}}

### Optimize inference throughput
The [Inference][5] page shows the performance of each model deployment alongside the health of the GPUs it runs on.

- **Understand whether your models are healthy**: Use out-of-the-box alerts on the health of your model deployments.
- **Detect and remediate inference performance issues**: Investigate high time to first token (TTFT) or inter-token latency (ITL) and resolve the underlying issues.
- **Increase inference throughput**: Discover recommendations on the optimizations that produce the largest throughput improvements through updates to your inference configuration.

{{< img src="gpu_monitoring/inference-page3.png" alt="Inference page in GPU Monitoring showing for a given model deployment key metrics like time-to-first-token and output tokens." style="width:100%;" >}}

## Ready to start?

See [Set up GPU Monitoring][2] for instructions on how to set up Datadog's GPU Monitoring.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /gpu_monitoring/setup
[3]: /gpu_monitoring/capacity_planning
[4]: /gpu_monitoring/training
[5]: /gpu_monitoring/inference
