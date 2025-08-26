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

Learn more about [Container Cost Allocation][1].

### BigQuery cost allocation

Allocate BigQuery costs to individual queries, users, and projects to understand your data warehouse spending at a granular level. Track query performance costs, storage costs, and slot utilization across your organization.

Learn more about [BigQuery Cost Allocation][2].

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