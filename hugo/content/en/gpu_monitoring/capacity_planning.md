---
title: Plan GPU Capacity with GPU Monitoring
description: Track GPU quota usage across teams and queues, find oversubscribed GPU types, and understand why workloads are pending or evicted.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring/fleet"
  tag: "Documentation"
  text: "Explore your GPU fleet with the Fleet page"
- link: "/gpu_monitoring"
  tag: "Documentation"
  text: "Learn more about what GPU Monitoring offers"
---

{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
Capacity Planning in GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

## Overview

When many teams share pools of expensive GPUs, it is hard to see which teams are underusing their devices. It is also hard to spot resource contention and to tell why jobs are stuck pending. The Capacity Planning page in GPU Monitoring gives platform teams and workload owners one shared view of GPU provisioning across queues. No manual filtering or querying is required. Use it to run workloads reliably and get more out of your GPU fleet.

With the Capacity Planning page, you can answer questions such as:

- **Which teams or projects are over- or underusing their quota?** Find unused quota and reallocate compute fairly across your organization.
- **Which GPU types are oversubscribed?** Identify where demand exceeds quota so you can add capacity.
- **What is the current state of a workload?** See whether each workload is admitted, pending, or evicted, and how many GPUs it uses.
- **Why is a workload delayed or evicted?** Correlate pending and preempted workloads with quota and contention in their queue.

{{< img src="gpu_monitoring/capacity-planning-page.png" alt="Capacity Planning page in GPU Monitoring showing GPU quota, idle allocated GPU, preemption, and fleet coverage graphs above a list of workloads." style="width:100%;" >}}

## Explore the Capacity Planning page

### Filter by team and queue

Use the filters at the top of the page to scope the view. You can filter by {{< ui >}}Team{{< /ui >}}, {{< ui >}}Cluster Name{{< /ui >}}, {{< ui >}}Cluster Queue{{< /ui >}}, {{< ui >}}Resource Flavor{{< /ui >}}, {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Datacenter{{< /ui >}}, and {{< ui >}}Environment{{< /ui >}}. Save a filtered view to return to it later.

### Quota and utilization

The graphs at the top of the page show how GPU quota is used across your fleet:

| Graph | Description |
|-------|-------------|
| GPU Quota Unallocated - Count | Number of GPUs in quota that are not in use, grouped by ClusterQueue. |
| GPU Quota Unallocated - Percent | Percentage of GPU quota that is not in use, grouped by ClusterQueue. |
| Idle Allocated GPUs | Number of allocated GPUs that are not doing engine work, grouped by ClusterQueue. |
| Preemption Rate | Workloads evicted by preemption per admitted workload, grouped by ClusterQueue. |
| Fleet GPU Coverage | Allocated GPU quota split into active, idle, and unattributed devices across the fleet. |
| Saturation - GPUs Over Quota | ClusterQueue and ResourceFlavor pairs ranked by the number of GPUs used beyond their nominal quota. |

Queues with high unallocated quota or many idle allocated GPUs are candidates for reallocation. Queues that consistently run over quota, or that have a high preemption rate, may need more capacity.

### Queues and workloads

The table at the bottom of the page has two tabs:

- {{< ui >}}Queues{{< /ui >}}: Lists each queue with its quota and usage.
- {{< ui >}}Workloads{{< /ui >}}: Lists each workload with its team, cluster, ClusterQueue, GPU usage by resource flavor, and latest status, such as {{< ui >}}Admitted{{< /ui >}}.

Use the {{< ui >}}Workloads{{< /ui >}} tab to check the current state of a workload and to investigate workloads that are pending or were evicted.

## Setup

### Prerequisites

To use the Capacity Planning page, you must meet the following criteria:
- You are running Datadog Agent version 7.84.1 or later with [GPU Monitoring enabled][1]. To upgrade, see [Upgrade the Agent with Fleet Automation][2].
- Your GPU workloads run on Kubernetes.
- You have enabled the [Kueue integration][3] in Datadog. For details, see the [Kueue integration documentation][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/setup
[2]: /agent/guide/upgrade_agent_fleet_automation/
[3]: https://app.datadoghq.com/integrations?search=kueue
[4]: /integrations/kueue/
