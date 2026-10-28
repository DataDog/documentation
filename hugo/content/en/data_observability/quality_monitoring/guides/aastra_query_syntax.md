---
title: Aastra Query Syntax
description: "Write Aastra queries to choose which tables and columns a Data Observability monitor covers, filtering by name, location, tags, lineage, freshness, and row count."
further_reading:
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitor'
  - link: '/data_observability/quality_monitoring/'
    tag: 'Documentation'
    text: 'Quality Monitoring'
  - link: '/api/latest/monitors/'
    tag: 'API'
    text: 'Monitors API'
---

## Overview

Aastra is the query language that Data Observability uses to select data assets, such as the tables and columns that a monitor covers. When you [choose data to monitor][1] in the {{< ui >}}Edit{{< /ui >}} tab, Datadog builds an Aastra query from your filters. The same query is stored in the `filter` field of the monitor's [API definition][2].

Use this page to write a query directly, for example when you create monitors through the API, or to read the query of an existing monitor.

## Query structure

An Aastra query has up to three parts:

{{< code-block lang="text" >}}
search for <entity_type> where `<filter>` { that <relationship> <entity_type> where `<filter>` }
{{< /code-block >}}

| Part | Required | Description |
|---|---|---|
| `search for <entity_type>` | Yes | The type of asset to return. |
| ``where `<filter>` `` | No | The conditions that returned assets must match, wrapped in backticks. See [Filters](#filters). |
| `{ that ... }` | No | Conditions on assets that are connected to the returned assets in your lineage graph or hierarchy. See [Relationship clauses](#relationship-clauses). |

For example, the following query returns every table in the `PROD` schema of the `ANALYTICS_DB` database:

{{< code-block lang="text" >}}
search for table where `database:ANALYTICS_DB AND schema:PROD`
{{< /code-block >}}

### Entity types

Data Observability monitors cover tables or columns. A monitor's query selects exactly one entity type:

| Entity type | Description |
|---|---|
| `table` | Tables and views. Queries that Datadog saves may use the full name, `database_table`. |
| `column` | Columns. Queries that Datadog saves may use the full name, `database_column`. |

Relationship clauses can use other entity types in your catalog, such as `schema`, `database`, `dbt_model`, `dbt_job`, or `tableau_dashboard`. In a relationship clause, use `*` to match any entity type.

## Filters

A filter is made of `key:value` terms that you combine with operators.

### Attributes

| Key | Applies to | Example | Description |
|---|---|---|---|
| `name` | Any asset | `name:USERS*` | The asset's name. |
| `account` | Tables and columns | `account:my_account` | The account that contains the asset. |
| `database` | Tables and columns | `database:ANALYTICS_DB` | The database that contains the asset. |
| `schema` | Tables and columns | `schema:PROD` | The schema that contains the asset. |
| `table` | Columns | `table:ORDERS` | The table that contains the column. |
| `platform` | Any asset | `platform:snowflake` | The data platform, such as `snowflake`, `bigquery`, or `databricks`. |
| `table_type` | Tables | `table_type:view` | The table type, such as `"base table"`, `view`, `materialized_view`, or `external`. The available types depend on your data platform. |
| `lineage_score` | Any asset | `lineage_score:1.00` | How many downstream assets depend on the asset, compared to other assets of the same type. Takes one of the values `0.00`, `0.10`, `0.30`, `0.50`, `0.70`, `0.90`, or `1.00`. |
| Any tag key | Any asset | `owner:data-platform-team` | A tag applied to the asset, using the tag key as the filter key. |
| `freshness_days`, `freshness_hours`, `freshness_minutes` | Tables | `freshness_days:<14` | The time since the table was last modified. In Preview. See [Freshness and row count](#freshness-and-row-count). |
| `row_count` | Tables | `row_count:>0` | The table's most recently reported row count. In Preview. See [Freshness and row count](#freshness-and-row-count). |

### Values

| Syntax | Example | Matches |
|---|---|---|
| Exact value | `schema:PROD` | Assets whose value is `PROD`. |
| Wildcard | `name:*_RAW` | Assets whose value matches the pattern. `*` matches any sequence of characters and can appear anywhere in the value, for example `stg_*`, `*_raw`, or `fct_*_monthly`. |
| Quoted value | `table_type:"base table"` | Values that contain spaces or special characters. |
| Several values | `schema:(PROD OR STAGING)` | Assets whose value is any of the listed values. |
| Any value | `owner:*` | Assets that have the attribute or tag, with any value. |
| Comparison | `row_count:>1000` | For freshness and row count, assets whose value is `<`, `<=`, `>`, or `>=` the number. |
| Range | `row_count:[100 TO 1000]` | For freshness and row count, assets whose value is between the two numbers, inclusive. |

### Operators

| Operator | Example | Description |
|---|---|---|
| `AND` | `schema:PROD AND owner:finance` | Match both conditions. |
| `OR` | `schema:PROD OR schema:STAGING` | Match either condition. |
| `-` | `-name:TEMP*` | Exclude assets that match the condition. |
| `( )` | `database:ANALYTICS_DB AND (schema:PROD OR schema:STAGING)` | Group conditions. |

### Free text and selected assets

When you read the query of an existing monitor, you may see two filters that the {{< ui >}}Edit{{< /ui >}} tab writes for you:

- When you type a term without a key, Datadog searches asset names and attribute values for it and saves the term as `all_text:"<term>"`.
- When you select specific assets, Datadog saves them as `entity_id:(...)`, with an internal identifier for each asset. To change which assets are selected, use the {{< ui >}}Edit{{< /ui >}} tab instead of editing these identifiers by hand.

## Freshness and row count

<div class="alert alert-info">Filtering on freshness and row count is in Preview. Contact your Datadog representative to request access.</div>

The `freshness_days`, `freshness_hours`, `freshness_minutes`, and `row_count` filters select tables by their latest freshness and row count. They follow these rules:

- Use them with `search for table`. A monitor query that uses these filters with `search for column` or `search for *` is rejected.
- Use them in the top-level `where` clause only, not inside a [relationship clause](#relationship-clauses).
- Use whole, non-negative numbers with `<`, `<=`, `>`, or `>=`, or an inclusive range such as `freshness_days:[1 TO 7]`. Exclusive ranges with braces, such as `{1 TO 7}`, are not supported.
- For a fraction of a unit, use the next smaller unit, for example `freshness_hours:<36` instead of a day and a half.
- `row_count` also accepts an exact value, such as `row_count:0`. The freshness filters do not.
- A table with no value reported in the last 48 hours never matches a comparison or range, even a negated one. It matches only `-freshness_days:*` or `-row_count:*`. To keep those tables, write `(freshness_days:<14 OR -freshness_days:*)`.

For how Datadog collects these values and how they change the tables a monitor covers over time, see [Choose data to monitor][1].

## Relationship clauses

A relationship clause selects assets by how they connect to other assets. It goes after the `where` part, inside braces:

{{< code-block lang="text" >}}
search for table where `schema:PROD` { that is_upstream_of tableau_dashboard where `name:"Revenue Overview"` }
{{< /code-block >}}

| Relationship | In the {{< ui >}}Edit{{< /ui >}} tab | Returns assets that are |
|---|---|---|
| `is_upstream_of` | {{< ui >}}Upstream of{{< /ui >}} | Upstream of a matching asset in your lineage graph. |
| `is_downstream_of` | {{< ui >}}Downstream of{{< /ui >}} | Downstream of a matching asset in your lineage graph. |
| `is_parent_of` | {{< ui >}}Parent of{{< /ui >}} | Parents of a matching asset, such as a table that contains a matching column. |
| `is_child_of` | {{< ui >}}Child of{{< /ui >}} | Children of a matching asset, such as a table in a matching schema. |

The `where` part of a relationship clause is optional. For example, `{ that is_upstream_of tableau_dashboard }` matches assets upstream of any Tableau dashboard.

To add more than one relationship, join them with `AND` inside the same braces. Returned assets must match every relationship:

{{< code-block lang="text" >}}
search for table { that is_upstream_of tableau_dashboard AND that is_downstream_of dbt_job }
{{< /code-block >}}

## Examples

Tables in the `PROD` schema, excluding temporary tables and views:

{{< code-block lang="text" >}}
search for table where `schema:PROD AND -name:TEMP* AND -table_type:(view OR materialized_view)`
{{< /code-block >}}

Timestamp columns in the `ORDERS` table:

{{< code-block lang="text" >}}
search for column where `table:ORDERS AND (name:*_AT OR name:*_TIMESTAMP)`
{{< /code-block >}}

Tables owned by a team, in either of two databases:

{{< code-block lang="text" >}}
search for table where `owner:data-platform-team AND database:(ANALYTICS_DB OR FINANCE_DB)`
{{< /code-block >}}

The most depended-on tables in a database:

{{< code-block lang="text" >}}
search for table where `database:ANALYTICS_DB AND lineage_score:(0.90 OR 1.00)`
{{< /code-block >}}

Snowflake tables that were updated in the last two weeks and contain rows (Preview):

{{< code-block lang="text" >}}
search for table where `platform:snowflake AND freshness_days:<14 AND row_count:>0`
{{< /code-block >}}

Tables that contain a `revenue` column:

{{< code-block lang="text" >}}
search for table { that is_parent_of column where `name:revenue` }
{{< /code-block >}}

Tables in a schema named `FINANCE` that feed a Tableau dashboard:

{{< code-block lang="text" >}}
search for table { that is_child_of schema where `name:FINANCE` AND that is_upstream_of tableau_dashboard }
{{< /code-block >}}

## Use Aastra queries in the API

In the [Monitors API][2], a Data Observability monitor defines its data in `options.variables`. Set the `filter` field of a `data_quality_metrics` query to an Aastra query. The backticks are part of the string and need no escaping in JSON:

{{< code-block lang="json" >}}
"variables": [
  {
    "name": "query1",
    "data_source": "data_quality_metrics",
    "measure": "row_count",
    "filter": "search for table where `database:ANALYTICS_DB AND schema:PROD`"
  }
]
{{< /code-block >}}

To check a query before you save the monitor, use the [Validate a monitor][3] endpoint.

## Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| A freshness or row count filter is rejected as not enabled. | Freshness and row count filters are in Preview. | Contact your Datadog representative to request access. |
| A freshness or row count filter is rejected because it does not apply to the entity type. | The query searches for columns or for `*`. | Use `search for table`. |
| A freshness or row count filter is rejected inside a relationship clause. | These filters work only in the top-level `where` clause. | Move the condition to the top-level `where` clause. |
| A range such as `freshness_days:{1 TO 7}` is rejected. | Exclusive ranges with braces are not supported. | Use an inclusive range, such as `freshness_days:[1 TO 6]`, or two comparisons. |
| A value such as `freshness_days:<1.5` is rejected. | These filters take whole numbers only. | Use the next smaller unit, such as `freshness_hours:<36`. |
| A value such as `freshness_days:3` is rejected. | The freshness filters do not accept an exact value. | Use a comparison or a range, such as `freshness_days:[3 TO 4]`. |
| A table is missing from the results of a freshness or row count filter. | The table has no value reported in the last 48 hours. | Add `OR -freshness_days:*` (or `OR -row_count:*`) to keep tables without a value. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/data_observability/#choose-data-to-monitor
[2]: /api/latest/monitors/
[3]: /api/latest/monitors/#validate-a-monitor
