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

CCM displays costs for resources including query-level analysis, storage, and data transfer on the [**BigQuery dashboard**][1].

## BigQuery pricing models

BigQuery offers two primary pricing models for query processing:

**On-demand queries**: You pay per query based on the amount of data processed. Costs are directly attributed to individual queries with no upfront commitment.

**Reservation-based queries**: You purchase dedicated processing capacity (slots) in advance at a fixed cost. Multiple queries can share this reserved capacity, making cost attribution more complex but potentially more cost-effective for consistent workloads.

CCM allocates and enriches costs for both pricing models, providing detailed cost attribution and tagging regardless of which model you use.

Learn more about BigQuery services and pricing models [**here**][3].

## Prerequisites

The following table presents the list of collected features and the minimal requirements:

| Feature | Requirements |
|---|---|
| Retrieve tags from labels of a query | GCP CCM costs must be setup. Supported without monitoring or reservations. |
| Query-Level Cost Attribution | BigQuery monitoring enabled |
| Reservation Cost Allocation | BigQuery reservations configured |

1. Configure the Google Cloud Cost Management integration on the [Cloud Cost Setup page][2].
2. Enable BigQuery monitoring in your Google Cloud project. 
[**Enable BigQuery monitoring here**][4]
3. For reservation cost allocation, configure BigQuery reservations in your project. [**Learn about BigQuery reservations**][7]

## Allocating costs

### Compute allocation

For BigQuery compute allocation, CCM handles two [**pricing models**][3]:

**On-demand pricing**:
- Costs are directly attributed to individual queries based on bytes processed
- Includes query-level tags for detailed cost attribution

**Reservation-based pricing**:
- Costs of reserved slots are allocated proportionally to queries using those slots
- Allocation based on slot consumption (`total_slot_ms`) per query
- Includes idle cost calculation for unused reservation capacity

[**Learn more about optimizing BigQuery performance and costs**][8]

### Compute

Costs are allocated into the following spend types:

| Spend type | Description |
|---|---|
| `allocated_spend_type`: Usage | Cost of query execution based on bytes processed (on-demand) or slot consumption (reservation) |
| `allocated_spend_type`: Cluster_idle | Cost of reserved slots allocated within a project but not utilized by queries|

### Query-level tag extraction

When the [Datadog Google BigQuery integration][4] is enabled, CCM extracts the following tags to add to your query costs:

| Tag | Description |
|---|---|
| `reservation_id` | The reservation pool that provided compute resources |
| `user_email` | The user or service account that executed the query |
| `dts_config_id` | Identifier for scheduled queries and data transfers |

To identify which BigQuery schedule a `DTS_CONFIG_ID` refers to:

1.  Go to **BigQuery** in the [**GCP Console**][6].
2.  Navigate to **Transfers > Schedules**.
3.  Use the **search bar** or **Ctrl+F** to locate the `DTS_CONFIG_ID`.
4.  Click the matched entry to view details about the query schedule, including source, frequency, and target dataset.

Additionally, CCM adds the following tags for cost analysis:

| Tag | Description |
|---|---|
| `allocated_spend_type` | Categorizes costs as either `usage` (active query execution) or `cluster_idle` (unused reservation capacity) |
| `allocated_resource` | Indicates resource measurement type - `slots` for reservation-based queries or `bytes_processed` for on-demand queries |
| `orchestrator` | Set to `BigQuery` for all BigQuery query-related records |

The tags below are automatically tagged from the billing data CCM processes and can be especially useful in BigQuery cost analysis: 
| `project_id` | GCP project ID where the BigQuery resource or job is located |
| `google_location` | The specific Google Cloud region or zone where BigQuery resources are deployed (e.g., us-central1, europe-west1, asia-southeast1) |
| `resource_name` | Full Google Cloud resource identifier |

#### Using BigQuery labels for cost attribution

BigQuery labels provide a powerful way to add custom metadata to your queries, jobs, datasets, and tables that automatically appear as tags in CCM. This enables highly granular cost attribution across teams, projects, applications, or any custom dimension you define.

**What are BigQuery labels?**
Labels are key-value pairs that you can attach to BigQuery resources. When you add labels to queries or jobs, they automatically become available as tags in CCM, allowing you to filter and group costs by these custom dimensions.

**Adding labels to queries:**
You can add labels to BigQuery queries using the `--label` flag with the `bq` command-line tool:

```bash
bq query --label department:engineering --label environment:production 'SELECT * FROM dataset.table'
```

**Adding labels in SQL sessions:**
For queries within a session, you can set labels that apply to all subsequent queries:

```sql
SET @@query_label = "team:data_science,cost_center:analytics";
```

**Benefits for cost management:**
- **Team attribution**: Tag queries with team names to track departmental BigQuery spending
- **Environment tracking**: Separate development, staging, and production costs
- **Application mapping**: Associate costs with specific applications or services
- **Project categorization**: Group costs by business initiatives or customer projects

Labels added to BigQuery resources automatically appear as tags in CCM, enabling powerful cost analysis and chargeback capabilities. [**Learn more about adding BigQuery labels**][10].

### Query-level allocation

Cost allocation divides BigQuery costs from GCP into individual queries and workloads associated with them. These divided costs are enriched with tags from queries, projects, and reservations so you can break down costs by any associated dimensions. 

For reservation-based BigQuery costs, CCM allocates costs proportionally based on slot usage. Each query's cost is determined by its share of the total slot usage within the project's reservations. For example, if a query uses 25% of the total consumed slots in a project's reservation during a given period, it will be allocated 25% of that project's total reservation cost for that period. The cost per-query is calculated using the following formula:

```
cost_per_query = (query_slot_usage / total_slot_usage) * total_project_reservation_cost
```

Where:
- `query_slot_usage`: The number of slot-seconds consumed by an individual query
- `total_slot_usage`: The total slot-seconds used across all queries in the project's reservations
- `total_project_reservation_cost`: The total cost of the reservations in a given project for the time period

Any difference between the total billed reservation cost and the sum of allocated query costs is categorized as a project's idle cost, representing unused reservation capacity. These costs are tagged with `allocated_spend_type:cluster_idle`, while actual query execution costs (both reservation and on-demand) are tagged with `allocated_spend_type:usage`. 

### Understanding idle costs

Idle costs represent the portion of reservation capacity that was paid for but not utilized by queries. These costs arise when the reserved slot capacity exceeds actual usage during a billing period.

**Idle slot sharing considerations**: If your organization has enabled idle slot sharing between reservations, the idle cost calculation may appear different than expected. When queries from one project use idle slots from another project's reservation, those slot costs are attributed as "free" rather than to the consuming project. This means:

- A project's reservation may show higher idle costs if other projects are using its unused capacity
- The original project pays full reservation costs regardless of cross-project usage
- No automatic cost-transfer: Sharing projects don't pay the reservation owner for consumed idle slots

[**Learn how to enable idle slot sharing for your reservations**][5]

### Storage

Storage costs are categorized as:

| Spend type | Description |
|---|---|
| `google_usage_type`: Active Logical Storage | Includes any table or table partition that has been modified in the last 90 days |
| `google_usage_type`: Long Term Logical Storage | Includes any table or table partition that has not been modified for 90 consecutive days. The price of storage for that table automatically drops by approximately 50%. There is no difference in performance, durability, or availability between active and long-term storage |

[**Learn about BigQuery storage best practices**][9]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboard/ecm-es8-agw/bigquery-allocation
[2]: /cost/setup 
[3]: https://cloud.google.com/bigquery/pricing?hl=en
[4]: https://docs.datadoghq.com/integrations/google-cloud-bigquery/
[5]: https://cloud.google.com/bigquery/docs/reservations-tasks
[6]: https://console.cloud.google.com
[7]: https://cloud.google.com/bigquery/docs/reservations-intro
[8]: https://cloud.google.com/bigquery/docs/best-practices-performance-overview
[9]: https://cloud.google.com/bigquery/docs/best-practices-storage
[10]: https://cloud.google.com/bigquery/docs/adding-labels
