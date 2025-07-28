---
title: BigQuery Cost Allocation
description: Learn how to allocate Cloud Cost Management spending across your organization with BigQuery Cost Allocation.
further_reading:
  - link: "/cloud_cost_management/"
    tag: "Documentation"
    text: "Learn about Cloud Cost Management"
---

## Overview

Datadog Cloud Cost Management (CCM) automatically allocates the costs of your Google BigQuery resources to individual queries and workloads. Use cost metrics enriched with tags from queries, projects, and reservations to visualize BigQuery workload costs in the context of your entire cloud bill.

## Resources
CCM allocates costs for BigQuery resources for both types of Analysis costs (on-demand and reservation-based). CCM displays costs for resources including query-level analysis, storage, and data transfer on the [**BigQuery** dashboard][1].

## Prerequisites

The following table presents the list of collected features and the minimal requirements:

| Feature | Requirements |
|---|---|
| BigQuery Cost Allocation | Google Cloud Cost Management integration configured |
| Query-Level Cost Attribution | BigQuery monitoring enabled |
| Reservation Cost Allocation | BigQuery reservations configured |

1. Configure the Google Cloud Cost Management integration on the [Cloud Cost Setup page][2].
2. Enable BigQuery monitoring in your Google Cloud project.
3. For reservation cost allocation, configure BigQuery reservations in your project.

## Allocating costs

Cost allocation divides BigQuery costs from GCP into individual queries and workloads associated with them. These divided costs are enriched with tags from queries, projects, and reservations so you can break down costs by any associated dimensions. 

For reservation-based BigQuery costs, CCM allocates costs proportionally based on slot usage. Each query's cost is determined by its share of the total slot usage within the project's reservations. For example, if a query uses 25% of the total consumed slots in a project's reservation during a given period, it will be allocated 25% of that project's total reservation cost for that period. The cost per-query is calculated using the following formula:

```
cost_per_query = (query_slot_usage / total_slot_usage) * total_project_reservation_cost
```

Where:
- `query_slot_usage`: The number of slot-seconds consumed by an individual query
- `total_slot_usage`: The total slot-seconds used across all queries in the project's reservations
- `total_project_reservation_cost`: The total cost of the reservations in a given project for the time period

Any difference between the total billed reservation cost and the sum of allocated query costs is categorized as a project's `cluster_idle` cost, representing unused reservation capacity.


### Query-level tag extraction

CCM extracts the following tags from BigQuery query logs via the Data Observability platform:

| Tag | Description |
|---|---|
| `reservation_id` | The reservation pool that provided compute resources |
| `user_email` | The user or service account that executed the query |
| `dts_config_id` | Identifier for scheduled queries and data transfers |

Additionally, CCM adds the following tags for cost analysis:

| Tag | Description |
|---|---|
| `allocated_spend_type` | Categorizes costs as either `usage` (active query execution) or `cluster_idle` (unused reservation capacity) |
| `allocated_resource` | Indicates resource measurement type - `slots` for reservation-based queries or `bytes_processed` for on-demand queries |
| `orchestrator` | Set to `BigQuery` for all BigQuery query-related records |

### Compute allocation

For BigQuery compute allocation, CCM handles two pricing models:

**On-demand pricing**:
- Costs are directly attributed to individual queries based on bytes processed
- Includes query-level tags for detailed cost attribution

**Reservation-based pricing**:
- Costs of reserved slots are allocated proportionally to queries using those slots
- Allocation based on slot consumption (total_slot_ms) per query
- Includes idle cost calculation for unused reservation capacity

### Compute

Costs are allocated into the following spend types:

| Spend type | Description |
|---|---|
| Usage | Cost of query execution based on bytes processed (on-demand) or slot consumption (reservation) |
| Cluster idle | Cost of reserved slots allocated but not utilized by queries |

### Storage

Storage costs are categorized as:

| Spend type | Description |
|---|---|
| Active | Cost of actively used storage |
| Long-term | Cost of infrequently accessed storage |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/ecm-es8-agw/bigquery-allocation
[2]: https://app.datadoghq.com/cost/setup 
