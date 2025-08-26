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

CCM displays costs for resources including query-level analysis, storage, and data transfer on the [BigQuery dashboard][1].

## BigQuery pricing options

BigQuery offers multiple pricing options, with CCM focusing on query-related processing costs.

### On-demand queries

With this price model, you pay per query based on the amount of data processed.
- Costs are directly attributed to individual queries based on bytes processed
- Includes query-level tags for detailed cost attribution

### Reservation-based queries
With reservation-based queries, you purchase dedicated processing capacity (slots) in advance at a fixed cost. Multiple queries can share this reserved capacity, making cost attribution more complex but potentially more cost-effective for consistent workloads.
- Costs of reserved slots are allocated proportionally to queries using those slots
- Allocation based on slot consumption (`total_slot_ms`) per query
- Includes idle cost calculation for unused reservation capacity

### Other BigQuery costs

BigQuery offers several additional services beyond query processing that contribute to your overall costs:

| Service | Description |
|---|---|
| **Storage** | Charges for data stored in BigQuery tables (active and long-term storage) |
| **Streaming** | Costs for real-time data ingestion through streaming inserts |
| **Data Transfer** | Charges for moving data between regions or exporting data |
| **BI Engine** | Costs for in-memory analytics acceleration |
| **Other services** | ML training, routine executions, and additional BigQuery features |

CCM allocates and enriches costs for both query-processing [pricing models][2], providing detailed cost attribution and tagging for your BigQuery analysis workloads.

Learn more about [optimizing BigQuery performance and costs][3].

## Prerequisites

The following table presents the list of collected features and the minimal requirements for unlocking different levels of BigQuery cost visibility and attribution in Datadog:

| Feature | Requirements |
|---|---|
| Retrieve tags from labels of a query | GCP CCM costs must be setup. Supported without monitoring or reservations. |
| Query-Level Cost Attribution | BigQuery monitoring enabled |
| Reservation Cost Allocation | BigQuery reservations configured |

1. Configure the Google Cloud Cost Management integration on the [Cloud Cost Setup page][4].
2. [Enable BigQuery monitoring][5] in your Google Cloud project. 
3. (Optional) For reservation cost allocation, [configure BigQuery reservations][6] in your project. This approach is typically more cost-efficient for predictable or high-volume workloads compared to on-demand pricing, as explained in this [Google Cloud Guide][7].

## Allocating costs

### Compute

Costs are allocated into the following spend types:

| Spend type | Description |
|---|---|
| `allocated_spend_type:usage` | Cost of query execution based on bytes processed (on-demand) or slot consumption (reservation) |
| `allocated_spend_type:borrowed_slot_usage` | Cost of queries that used borrowed idle slots from other reservations within the admin project |
| `allocated_spend_type:cluster_idle` | Cost of reserved slots within a project but not utilized by any queries|

### Query-level tag extraction

When the [Datadog Google BigQuery integration][5] is enabled, CCM extracts the following tags to add to your query costs:

| Tag | Description |
|---|---|
| `reservation_id` | The reservation pool that provided compute resources |
| `user_email` | The user or service account that executed the query |
| `query_signature` | The hash of the logical SQL text of a query. This signature lets you group and analyze similar queries.|
| `dts_config_id` | Identifier for scheduled queries and data transfers |

#### Identifying BigQuery schedules

You can identify BigQuery schedules to help connect costs to specific scheduled workloads, enabling better cost attribution and optimization of recurring data processing jobs.

To identify which BigQuery schedule a `DTS_CONFIG_ID` refers to:

1.  Go to **BigQuery** in the [**GCP Console**][8].
2.  Navigate to **Transfers > Schedules**.
3.  Use the **search bar** or **Ctrl+F** to locate the `DTS_CONFIG_ID`.
4.  Click the matched entry to view details about the query schedule, including source, frequency, and target dataset.

#### Additional cost analysis tags

CCM also adds the following tags for cost analysis:

| Tag | Description |
|---|---|
| `allocated_spend_type` | Categorizes costs as either `usage` (active query execution), `borrowed_slot_usage` (queries using idle slots from other reservations with extra slot capacity) or `cluster_idle` (unused reservation capacity) |
| `allocated_resource` | Indicates resource measurement type - `slots` for reservation-based queries or `bytes_processed` for on-demand queries |
| `orchestrator` | Set to `BigQuery` for all BigQuery query-related records |

The tags below are automatically tagged from the billing data CCM processes and can be especially useful in BigQuery cost analysis: 

| Tag | Description |
|---|---|
| `project_id` | GCP project ID where the BigQuery resource or job is located |
| `google_location` | The specific Google Cloud region or zone where BigQuery resources are deployed (for example, `us-central1`, `europe-west1`, `asia-southeast1`) |
| `resource_name` | Full Google Cloud resource identifier |

### Using BigQuery labels for cost attribution

BigQuery labels are key-value pairs that you can attach to BigQuery resources. When you add labels to queries or jobs, they automatically become available as tags in CCM, allowing you to filter and group costs by these custom dimensions. 

Use labels to categorize your BigQuery workloads by team, project, application, or any custom dimension you define, enabling granular cost attribution and better cost management.

#### Adding labels to queries

You can add labels to BigQuery queries so that they appear in CCM using the `--label` flag with the `bq` command-line tool:

```bash
bq query --label department:engineering --label environment:production 'SELECT * FROM dataset.table'
```
#### Adding labels in SQL sessions

If you are running multiple related queries in a single session and want to apply consistent cost attribution across all of them, you can apply session-level labeling. This approach saves time compared to adding labels to each individual query and ensures consistent tagging for related workloads.

Common use cases include:

- **Team attribution**: Tag queries with team names to track departmental BigQuery spending
- **Environment tracking**: Separate development, staging, and production costs
- **Application mapping**: Associate costs with specific applications or services
- **Project categorization**: Group costs by business initiatives or customer projects

For queries within a session, you can set labels that apply to all subsequent queries. Labels added to BigQuery resources automatically appear as tags in CCM, enabling powerful cost analysis and chargeback capabilities.

To set labels that apply to all subsequent queries:

```sql
SET @@query_label = "team:data_science,cost_center:analytics";
```

Learn more about [adding BigQuery labels][9].

### Query-level allocation

Cost allocation divides BigQuery costs from GCP into individual queries and workloads associated with them. These divided costs are enriched with tags from queries, projects, and reservations so you can break down costs by any associated dimensions. 

For reservation-based BigQuery costs, CCM allocates costs proportionally based on slot usage. Each query's cost is determined by its share of the total slot usage within the project's reservations. For example, if a query uses 25% of the total consumed slots in a project's reservation during a given period, it is allocated 25% of that project's total reservation cost for that period. The cost per-query is calculated using the following formula:

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

#### Idle slot sharing

BigQuery idle slot sharing is a cost allocation feature that redistributes unused reservation capacity to projects that need additional slots. For example, if Reservation A has extra idle slots, queries under Project B could use Project A's slots in addition to Project B's slots.

If your organization has enabled idle slot sharing between reservations, the idle cost calculation reflects how unused capacity is distributed across projects. With idle slot sharing enabled:
- Contributing projects: Projects whose unused reservation capacity is shared will be tagged as `borrowed_slot_usage` costs, representing the value they provided to other projects' queries.
- Cost attribution: The total cost is preserved across the organization - costs are redistributed from idle capacity to borrowed usage, but no costs are lost or double-counted.
- The original project still pays full reservation costs as per Google Cloud billing.
- Shared idle slot costs help organizations understand the true value and utilization of their BigQuery reservations.

Learn how to [enable idle slot sharing for your reservations][10].

### Storage

Storage costs are categorized as:

| Spend type | Description |
|---|---|
| `google_usage_type: Active Logical Storage` | Includes any table or table partition that has been modified in the last 90 days |
| `google_usage_type: Long Term Logical Storage` | Includes any table or table partition that has not been modified for 90 consecutive days. The price of storage for that table automatically drops by approximately 50%. There is no difference in performance, durability, or availability between active and long-term storage |

Learn more about [BigQuery storage and best practices][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/32017/bigquery-allocation?fromUser=false&refresh_mode=sliding&from_ts=1751740562723&to_ts=1754418962723&live=true
[2]: https://cloud.google.com/bigquery/pricing
[3]: https://cloud.google.com/bigquery/docs/best-practices-performance-overview
[4]: /cloud_cost_management/setup/google_cloud/
[5]: /integrations/google-cloud-bigquery/
[6]: https://cloud.google.com/bigquery/docs/reservations-get-started
[7]: https://cloud.google.com/bigquery/docs/reservations-intro
[8]: https://console.cloud.google.com
[9]: https://cloud.google.com/bigquery/docs/adding-labels
[10]: https://cloud.google.com/bigquery/docs/reservations-tasks
[11]: https://cloud.google.com/bigquery/docs/best-practices-storage
