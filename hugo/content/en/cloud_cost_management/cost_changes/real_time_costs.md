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

Real-Time Costs provide near real-time estimates of your compute costs on AWS, Azure, and Google Cloud, including Kubernetes cost allocation, so that you can react to cost changes in minutes and hours, instead of days. Estimates are generated from real-time usage data collected by the Datadog Agent, priced with your recent average hourly costs from Cloud Cost Management billing data.

<div class="alert alert-info">Real-time costs for Azure and Google Cloud are in Preview.</div>

Use real-time costs to:
- Detect anomalies early and alert on them with [real-time anomaly monitors][3]
- Observe the impact of recent changes
- Monitor hourly or sub-hourly spend trends
- Gain deeper visibility into rapidly changing Kubernetes clusters

Real-time costs are available for:

| Provider | Covered spend | Real-time metric | Priced from |
|---|---|---|---|
| AWS | Amazon EC2 instances, and Kubernetes running on EC2 | `aws.cost.net.amortized.realtime.estimated` | Recent average hourly net amortized EC2 prices by instance type, region, and AWS account |
| Azure (Preview) | Azure Virtual Machines compute, and Kubernetes running on Azure VMs | `azure.cost.amortized.realtime.estimated` | Recent average hourly amortized VM prices by instance type, region, and Azure subscription |
| Google Cloud (Preview) | Compute Engine vCPU and memory, and Kubernetes running on Compute Engine | `gcp.cost.amortized.realtime.estimated` | Recent average hourly amortized vCPU and memory prices by machine type, region, and Google Cloud project |

Real-time costs cover compute only. The following charges are excluded:
- **AWS**: EBS, networking, and similar services.
- **Azure**: Everything other than Virtual Machines compute usage (`chargetype:Usage`), such as managed disks, storage, bandwidth, and networking. Unused Azure capacity reservations are also excluded.
- **Google Cloud**: Everything other than the vCPU (Core) and memory (RAM) SKUs of Compute Engine instances, such as Persistent Disk, GPUs, networking, OS licenses, and external IP addresses. Credits and reservation charges are also excluded.

## Requirements

Real-Time Costs is available for Cloud Cost Management Enterprise customers.

- Cloud Cost Management is enabled for the AWS account, Azure subscription, or Google Cloud project
- The Datadog Agent is installed on each EC2 instance, Azure VM, or Compute Engine instance
- (Optional) To see Kubernetes costs in real time, enable Datadog Container Monitoring for your clusters by following the setup guide in [Container Cost Allocation][2]

## How to query real-time costs

Real-time costs can be found under the standard {{< ui >}}Metrics{{< /ui >}} source in Metrics Explorer and dashboards. Use the metric for your provider:

| Provider | Query |
|---|---|
| AWS | `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Azure | `sum:azure.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Google Cloud | `sum:gcp.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |

Query real-time costs with:
- the `sum` or `sum by` aggregation
- as `count` (learn more about [rate vs count metrics][1])
- rollup `sum`, minimum of 5 minutes (or 300 seconds in the queries above, since real-time costs are updated every 5 minutes)

Rollups can be longer, such as 1 hour, to see costs on an hourly basis. Hourly costs can be helpful to better understand usage patterns before buying Savings Plans and reservations.

## Real-time Kubernetes allocation

Similar to the existing container cost allocation, EC2 instance, Azure VM, and Compute Engine instance costs are broken down into the Kubernetes pods that ran on them. All tags used on your pod are available in real time, including **custom tags on your pods**, such as team, service, or env, and **out-of-the-box Kubernetes tags**:
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

Tags for real-time costs are similar to those on other Cloud Cost Management metrics, but not identical.
- All tag values are lowercase, normalized like Metrics data
- Tag Pipelines and Custom Allocation Rules are not applied
- Some billing-specific tags (from the AWS Cost and Usage Report, Azure cost exports, or Google Cloud billing exports) and FOCUS tags may not exist on real-time cost metrics, since real-time costs are derived primarily using usage data collected by the Datadog Agent, not billing data

## Accuracy

Real-time costs aim to be within 10% accuracy of the daily compute costs from your billing data, for hosts monitored by the Datadog Agent:
- **AWS**: daily EC2 costs from your Cost and Usage Report (CUR)
- **Azure**: daily amortized Virtual Machines usage costs from your Azure cost export
- **Google Cloud**: daily amortized Compute Engine vCPU and memory costs from your Google Cloud billing export

Because real-time costs prioritize low-latency delivery, temporary drops or gaps in data may occasionally occur, especially for Azure and Google Cloud while in Preview. For long-term cost trend analysis, Datadog recommends using Cloud Cost metrics based on direct billing data, which include final credits.

You can use the `estimated_hourly_cost` and `estimated_daily_cost` tags to understand the estimated unit cost of an instance type per hour and per day.

- Sources of variance include:
  - Hourly averages that shift with your recent mix of on-demand (pay-as-you-go), commitment (Savings Plans, reservations, committed use discounts), and spot spending
  - Minor differences between true instance start and end times versus what the Agent reports
- Underestimation can occur when:
  - Instances are not monitored by the Datadog Agent
  - Newly used instance types or regions have not yet appeared in CCM billing data
  - Estimates cover compute only (see [Overview][4])
- Overestimation can occur when:
  - Instances are monitored by the Datadog Agent but are not included in CCM billing data

To reduce variance, filter to an account, subscription, or project that is both included in Cloud Cost Management and has the Datadog Agent on all its instances.

[1]: /metrics/types/?tab=rate#metric-types
[2]: /cloud_cost_management/allocation/container_cost_allocation/
[3]: /cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
[4]: #overview
