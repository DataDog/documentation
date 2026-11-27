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

GPU Monitoring supports fleets deployed across the major cloud providers (AWS, GCP, Azure, Oracle Cloud), on-premises, or through GPU-as-a-Service platforms such as CoreWeave and Lambda Labs. You don't need to manually set up individual vendor tools such as NVIDIA's DCGM.

You can access insights into your GPU fleet by deploying the Datadog Agent on your GPU-accelerated hosts. For setup instructions, see [Set up GPU Monitoring][2].

## Key capabilities

### Capacity plan with confidence

{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
[Capacity Planning](/gpu_monitoring/capacity_planning) in GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

View your entire fleet's size and spend across hyperscalers, on-premises, and neocloud providers.

{{< img src="gpu_monitoring/funnel-3.png" alt="Funnel visualization titled 'Your GPU fleet at a glance.' Displays total, active, and effective devices. Highlights underutilized GPU cores and idle devices." style="width:100%;" >}}

- Attribute GPU usage and quotas by team, service, or any tag to allocate capacity more fairly across teams and distinguish capacity shortages from inefficiencies.
- Identify resource contention and forecast demand for each GPU type to shorten procurement cycles and make spend more predictable.
- Diagnose why workloads are delayed or evicted.

{{< img src="gpu_monitoring/device_allocation.png" alt="Charts to help visualize GPU allocation. A line graph titled 'Device Allocation Over Time', plotting counts of total/allocated/active devices, including a 4-week future forecast. A donut chart titled 'Cloud Provider Instance Breakdown', displaying prevalence of cloud provider instances across the fleet. A 'Device Type Breakdown' displaying allocated/total for various GPU devices." style="width:100%;" >}}

### Maximize AI workload throughput

{{< callout btn_hidden="true" >}}
[Training](/gpu_monitoring/training) and [Inference](/gpu_monitoring/inference) in GPU Monitoring are in Early Access Preview. To request access, complete the form on each page.
{{< /callout >}}

Analyze trends in GPU resources and metrics (including GPU utilization, power, and memory) by host, node, or pod over time to understand how your devices affect model and application performance.

- Troubleshoot stalled workloads with shared context for both platform and ML teams instead of switching between siloed tools.
- Identify whether workload slowdowns are caused by unhealthy hardware, communication bottlenecks, memory bandwidth limitations, or scheduling issues.
- Detect bottlenecks in your training and inference workloads with lightweight, continuous tracing.
- Discover recommendations on the optimizations that produce the largest throughput improvements.

{{< img src="gpu_monitoring/training-page.png" alt="GPU Monitoring Training page showing run insights, a bar graph of runs over time, and a list of training runs." style="width:100%;" >}}

{{< img src="gpu_monitoring/inference-page3.png" alt="GPU Monitoring Inference page showing key metrics for a model deployment, such as time-to-first-token and output tokens." style="width:100%;" >}}

### Benchmark your inference endpoints

{{< callout btn_hidden="true" >}}
[Benchmarks](/gpu_monitoring/benchmarks) in GPU Monitoring are in Preview. To request access, contact <a href="/help/">Datadog support</a> or your account team.
{{< /callout >}}

Send controlled load to an OpenAI-compatible inference endpoint, from Datadog or from inside your Kubernetes cluster, and measure what your users experience: time to first token, time per output token, and throughput.

- Compare each run with earlier ones to see whether a change to your model server, its settings, or its GPUs made things better or worse.
- Read each run next to the GPU and inference server metrics of the deployment that served it.
- Run load sweeps to find the highest concurrency that stays within your latency targets.

### Safeguard device reliability
GPUs are an expensive and scarce resource with higher failure rates than standard servers. GPU Monitoring provides out-of-the-box monitors and proactive recommendations to help you detect and remediate hardware issues before they impact your mission-critical workloads.

- Catch thermal throttling early with out-of-the-box alerts before failures spread across the cluster.
- Proactively detect and remediate ECC and XID errors with prescriptive next steps that help teams respond quickly.
- Isolate unhealthy GPUs before failures cascade.

### Reduce wasted spend
Identify total spend on GPU infrastructure and attribute those costs to specific workloads and instances. Directly correlate GPU usage to related pods or processes.

- Break down total and idle GPU spend by any tag and time frame to see where spend is concentrated.
- Identify the key drivers of wasted GPU spend and inefficiencies, such as teams with the highest GPU waste, to support internal chargebacks and data-driven quota management decisions.
- Give teams clear reporting on GPU usage and spend to make cost optimization part of their daily operations.

{{< img src="gpu_monitoring/cost-and-utilization2.jpg" alt="Cost & Utilization page showing GPU hours and estimated cost by cluster, and top clusters by idle hours and idle cost." style="width:100%;" >}}

## Ready to start?

See [Set up GPU Monitoring][2] for instructions on how to set up Datadog's GPU Monitoring.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /gpu_monitoring/setup
