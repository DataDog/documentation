---
title: Cost Allocation
description: Learn how to allocate cloud costs across your organization with Datadog Cloud Cost Management
further_reading:
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Learn about Cloud Cost Management"
  - link: "/cloud_cost_management/cost_allocation/container_cost_allocation"
    tag: "Documentation"
    text: "Container Cost Allocation"
  - link: "/cloud_cost_management/cost_allocation/bigquery"
    tag: "Documentation"
    text: "BigQuery Cost Allocation"
---

## Overview

Datadog Cloud Cost Management (CCM) provides comprehensive cost allocation capabilities that help you understand and optimize your cloud spending by breaking down costs across different resources and organizational dimensions. Cost allocation enables you to:

- **Track resource-level spending**: Allocate costs down to individual containers, pods, tasks, and data warehouse queries
- **Optimize resource utilization**: Identify idle resources and underutilized capacity
- **Chargeback and showback**: Attribute costs to specific teams, projects, or business units
- **Make informed decisions**: Understand the true cost of your applications and services

## Cost allocation methods

CCM offers multiple cost allocation methods to help you understand your cloud spending at different levels of granularity:

### Container cost allocation

Automatically allocate the costs of your cloud clusters to individual services and workloads running in those clusters. Use cost metrics enriched with tags from pods, nodes, containers, and tasks to visualize container workload cost in the context of your entire cloud bill.

**Supported platforms:**
- **AWS**: ECS clusters, EKS clusters, and all Kubernetes clusters
- **Azure**: AKS clusters and all Kubernetes clusters  
- **Google Cloud**: GKE clusters and all Kubernetes clusters

Learn more about [Container Cost Allocation][1].

### BigQuery cost allocation

Allocate BigQuery costs to individual queries, users, and projects to understand your data warehouse spending at a granular level. Track query performance costs, storage costs, and slot utilization across your organization.

Learn more about [BigQuery Cost Allocation][2].

## How cost allocation works

Cost allocation divides host compute and other resource costs from your cloud provider into individual workloads associated with them. These divided costs are then enriched with tags from related resources so you can break down costs by any associated dimensions.

### Resource allocation methods

CCM uses different allocation methods depending on the resource type:

| Resource Type | Allocation Method | Description |
|---------------|-------------------|-------------|
| **Compute** | Resource-based | Allocates costs based on CPU, memory, and GPU usage with configurable splits (for example, `60:40` for `CPU:memory`) |
| **Storage** | Usage-based | Allocates costs based on actual storage usage, IOPS, and throughput |
| **Data Transfer** | Traffic-based | Allocates costs based on network traffic volume and bandwidth usage |
| **Managed Services** | Attribution-based | Allocates costs based on service usage and API calls |

### Tag enrichment

All allocated costs are enriched with tags from various sources:

- **Kubernetes tags**: Pod labels, node labels, namespace information
- **Cloud provider tags**: AWS tags, Azure tags, Google Cloud labels
- **Custom tags**: Business-specific tags for team, project, environment
- **Out-of-the-box tags**: Automatically applied tags for orchestration platform, cluster name, etc.

## Understanding spend types

CCM categorizes costs into different spend types to help you understand resource utilization:

| Spend Type | Description |
|------------|-------------|
| **Usage** | Cost of resources actually used by workloads |
| **Workload Idle** | Cost of resources reserved but not used by workloads |
| **Cluster Idle** | Cost of resources not reserved by any workloads |
| **Not Monitored** | Cost of resources not monitored by Datadog |

## Cost metrics

When cost allocation is enabled, the following metrics become available:

- `aws.cost.amortized.shared.resources.allocated` (AWS)
- `azure.cost.amortized.shared.resources.allocated` (Azure)  
- `gcp.cost.amortized.shared.resources.allocated` (Google Cloud)

These metrics include all your cloud costs and allow you to visualize spending across different dimensions and resources.

## Getting started

To get started with cost allocation:

1. **Set up Cloud Cost Management** by configuring your cloud provider integration on the [Cloud Cost Setup page][3].
2. **Enable container monitoring** by installing the Datadog Agent in your containerized environments.
3. **Configure tag extraction** for detailed cost breakdown.
4. **Set up BigQuery integration** for data warehouse insights.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/cost_allocation/container_cost_allocation
[2]: /cloud_cost_management/cost_allocation/bigquery
[3]: https://app.datadoghq.com/cost/setup 