---
title: Cost Allocation
description: Allocate cloud costs across your organization with Datadog Cloud Cost Management.
aliases:
  - /cloud_cost_management/cost_allocation/
further_reading:
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Learn about Cloud Cost Management"
---

## Overview

The Allocation section of Cloud Cost Management helps you understand and optimize your cloud spending by breaking down costs across different resources and organizational dimensions. Use these tools to allocate costs to specific teams, projects, or business units, track resource-level spending, and identify optimization opportunities.

## Key features

{{< whatsnext desc="This section includes the following topics:" >}}
    {{< nextlink href="/cloud_cost_management/allocation/tag_pipelines" >}}<u>Tag Pipelines</u>: Standardize and enrich your cost data with consistent tagging. Create rules to fix missing or incorrect tags, alias tag keys, and map multiple tags using reference tables. Proper tagging is essential for accurate cost allocation and enables you to break down spending by team, service, or business unit across all allocation methods.{{< /nextlink >}}
    {{< nextlink href="/cloud_cost_management/allocation/container_cost_allocation" >}}<u>Container Cost Allocation</u>: Automatically allocate the costs of your cloud clusters to individual services and workloads. Use cost metrics enriched with tags from pods, nodes, containers, and tasks to visualize container workload cost in the context of your entire cloud bill.{{< /nextlink >}}
    {{< nextlink href="/cloud_cost_management/allocation/bigquery" >}}<u>BigQuery Cost Allocation</u>: Allocate BigQuery costs to individual queries, users, and projects to understand your data warehouse spending at a granular level. Track query performance costs, storage costs, and slot utilization across your organization.{{< /nextlink >}}
    {{< nextlink href="/cloud_cost_management/allocation/custom_allocation_rules" >}}<u>Custom Allocation Rules</u>: Split and assign shared costs to any available tags using custom rules. Choose from even split, custom percentage, proportional by spend, or dynamic by metric allocation methods to support accurate showback and chargeback across teams, projects, or environments.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}} 