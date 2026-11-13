---
title: Real-Time Costs
description: View and analyze cloud spend in real time.
aliases:
- /cloud_cost_management/real_time_costs
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Learn about Cloud Cost Management"
- link: "/cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor"
  tag: "Documentation"
  text: "Create a real-time anomaly monitor"
---

## Overview

Real-Time Costs estimates your AWS, Azure, and Google Cloud compute costs in near real time, so that you can react to cost changes in minutes or hours instead of days. Datadog generates estimates from real-time usage data that the Datadog Agent collects, and prices that usage with your recent average hourly costs from Cloud Cost Management billing data.

<div class="alert alert-info">Real-time costs for Azure and Google Cloud are in Preview.</div>

Use real-time costs to:
- Detect anomalies early and alert on them with [real-time anomaly monitors][3]
- Observe the impact of recent changes
- Monitor hourly or sub-hourly spend trends
- Gain deeper visibility into rapidly changing Kubernetes clusters

Real-time costs are available for:

| Provider | Covered spend | Real-time metric | Priced from |
|---|---|---|---|
| AWS | Amazon EC2 instances and Kubernetes running on EC2 | `aws.cost.net.amortized.realtime.estimated` | Recent average hourly net amortized EC2 prices by instance type, region, and AWS account |
| Azure (Preview) | Azure Virtual Machines compute and Kubernetes running on Azure VMs | `azure.cost.amortized.realtime.estimated` | Recent average hourly amortized VM prices by instance type, region, and Azure subscription |
| Google Cloud (Preview) | Compute Engine instances (vCPU and memory) and Kubernetes running on Compute Engine | `gcp.cost.amortized.realtime.estimated` | Recent average hourly amortized vCPU and memory prices by machine type, region, and Google Cloud project |

Real-time costs cover compute only. The following charges are excluded:
- **AWS**: EBS, networking, and other charges outside Amazon EC2 instance compute.
- **Azure**: Managed disks, storage, bandwidth, networking, and other charges outside Virtual Machines compute usage (`chargetype:Usage`). Unused Azure capacity reservations are also excluded.
- **Google Cloud**: Persistent Disk, GPUs, networking, OS licenses, external IP addresses, and other charges outside the vCPU (Core) and memory (RAM) SKUs of Compute Engine instances. Credits and reservation charges are also excluded.

## Requirements

Real-Time Costs is available for Cloud Cost Management Enterprise customers.

- Cloud Cost Management is enabled for the AWS account, Azure subscription, or Google Cloud project.
- The Datadog Agent is installed on each EC2 instance, Azure VM, or Compute Engine instance.
- (Optional) To see Kubernetes costs in real time, enable Datadog Container Monitoring for your clusters by following the setup guide in [Container Cost Allocation][2].

## How to query real-time costs

Find real-time costs under the standard {{< ui >}}Metrics{{< /ui >}} source in Metrics Explorer and dashboards. Use the query for your provider:

| Provider | Query |
|---|---|
| AWS | `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Azure | `sum:azure.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Google Cloud | `sum:gcp.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |

Query real-time costs with:
- The `sum` or `sum by` aggregation
- The `.as_count()` modifier (learn more about [rate vs count metrics][1])
- A `sum` rollup of at least 5 minutes (300 seconds in the preceding queries, because real-time costs update every 5 minutes)

Rollups can be longer, such as 1 hour, to see costs on an hourly basis. Hourly costs help you understand usage patterns before you buy Savings Plans and reservations.

## Real-time Kubernetes allocation

As with container cost allocation, Datadog breaks down EC2 instance, Azure VM, and Compute Engine instance costs into the Kubernetes pods that ran on them. All tags used on your pod are available in real time, including **custom tags on your pods**, such as team, service, or env, and **out-of-the-box Kubernetes tags**:
- `allocated_spend_type`, which splits compute costs into CPU and memory used by a workload (`usage`), requested by a workload but not used (`workload_idle`), and not reserved by any workload (`cluster_idle`)
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `kube_daemon_set`
- `pod_name`
- `pod_phase`
- `pod_status`

Nodes that are idle or running no pods keep their Kubernetes tags, such as `kube_cluster_name` and `orchestrator:kubernetes`, so that you can group and view the cost of clusters that are completely idle.

## Tags

Tags for real-time costs differ from tags on other Cloud Cost Management metrics in the following ways:
- All tag values are lowercase, normalized like Metrics data.
- Tag Pipelines and Custom Allocation Rules are not applied.
- Some billing-specific tags (from the AWS Cost and Usage Report, Azure cost exports, or Google Cloud billing exports) and FOCUS tags may not exist on real-time cost metrics. Real-time costs come primarily from usage data that the Datadog Agent collects, not from billing data.

## Accuracy

For instances monitored by the Agent, Datadog targets real-time cost estimates within 10% of the daily compute costs in your billing data. The billing data used for the comparison depends on the provider:
- **AWS**: EC2 costs from your AWS Cost and Usage Report
- **Azure**: Amortized Virtual Machines usage costs from your Azure cost export
- **Google Cloud**: Amortized Compute Engine vCPU and memory costs from your Google Cloud billing export

Real-time costs are optimized for low-latency delivery, so temporary drops or gaps in data can occur, especially for Azure and Google Cloud while in Preview. For long-term cost trend analysis, Datadog recommends Cloud Cost Management metrics based on billing data. These metrics include final credits.

- Sources of variance include:
  - Hourly averages that shift with your recent mix of on-demand (pay-as-you-go), commitment (Savings Plans, reservations, committed use discounts), and spot spending
  - Minor differences between true instance start and end times versus what the Agent reports
- Underestimation can occur when:
  - Instances are not monitored by the Datadog Agent
  - Newly used instance types or regions have not yet appeared in CCM billing data
  - You compare estimates to total spend, which includes charges beyond compute (see the [Overview][4] section)
- Overestimation can occur when:
  - Instances are monitored by the Datadog Agent but are not included in CCM billing data

To reduce variance, filter to an account, subscription, or project that Cloud Cost Management covers and where the Datadog Agent runs on every instance.

Use the `estimated_hourly_cost` and `estimated_daily_cost` tags to see the estimated cost of an instance type per hour and per day.

[1]: /metrics/types/?tab=rate#metric-types
[2]: /cloud_cost_management/allocation/container_cost_allocation/
[3]: /cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
[4]: #overview
