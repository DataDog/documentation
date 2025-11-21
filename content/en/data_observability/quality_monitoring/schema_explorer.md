---
title: Exploring Database Schemas
description: Explore and analyze database schemas, including tables, columns, and indexes.
aliases:
- /database_monitoring/schema_explorer/
---

Schemas help you monitor performance, usage, and changes in your data models, enabling quicker issue identification and remediation.

<div class="alert alert-info">Schema Tracking is available for PostgreSQL, SQL Server, and MySQL.</div>

{{< img src="database_monitoring/dbm-schemas-page.png" alt="Schemas page displaying tracked database tables and schema-level metrics in Datadog" style="width:100%;" >}}

## Configuration

To enable the schemas feature, add the `collect_schemas` parameter to your Database Monitoring configuration:

```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    collect_schemas:
      enabled: true
    ## Optional: Connect to a different database if needed for `custom_queries`
    # dbname: '<DB_NAME>'
```

## Tables overview

The Tables overview lists all tracked tables across your databases, grouped by table name, with the following columns:

| Column         | Description                                                                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \# Variants    | Number of distinct versions of the table across all hosts.                                                                                                                                           |
| \# Instances   | Total number of table instances across all hosts. For example, if a table has two variants with seven and eight instances respectively, the total number of instances is 15.                         |
| \# Columns     | Count of unique columns across all variants of the table on all hosts. For example, if one variant has columns A, B, C and another has A, B, D, the total unique columns would be four (A, B, C, D). |
| Databases      | Names of all databases containing this table across all hosts.                                                                                                                                       |
| Schemas        | Schemas in which this table appears across all hosts.                                                                                                                                                |
| Database Hosts | Hosts where this table is present.                                                                                                                                                                   |

Each table row can be expanded to view its table variants and the following columns:

| Column         | Description                                                            |
|----------------|------------------------------------------------------------------------|
| Variant ID     | Unique identifier for a variant (version) of this table.               |
| \# Instances   | Number of instances of this table for this variant.                    |
| \# Columns     | Number of unique columns in this table variant.                        |
| Databases      | Alphabetically sorted list of databases containing this table variant. |
| Schemas        | Alphabetically sorted list of schemas containing this table variant.   |
| Database Hosts | Alphabetically sorted list of hosts where this table variant appears.  |

### Viewing table variant details

To view more details about a table variant, click its row to open the table variant panel.

{{< img src="database_monitoring/table-variant-panel.png" alt="Table variant panel showing column definitions and an index for the inventory table" style="width:100%;" >}}

This panel shows you information about the variant (version), such as:

- **Definition**: Includes columns, indexes, and foreign keys for this table variant.
- **Table Instances**: All instances associated with this table variant.
- **Metrics**: Table size, sequential scans, and other related metrics (last 7 days by default).
- **Queries**: Queries involving this table variant (last 7 days by default).
- **Changes**: Schema changes affecting this table variant (last 7 days by default).

### Viewing table instance details

To view details for a specific table instance, go to the **Table Instances** tab in the table variant panel and click on a row.

{{< img src="database_monitoring/table-instance-details.png" alt="Table instance panel displaying column and index details for the inventory table." style="width:100%;" >}}

This opens a view similar to the table variant panel, showing the following information for the selected table instance:

- **Definition**: Includes columns, indexes, and foreign keys for this table instance.
- **Metrics**: Table size, sequential scans, and other related metrics (last 7 days by default).
- **Queries**: Queries involving this table instance (last 7 days by default).
- **Changes**: Schema changes affecting this table instance (last 7 days by default).

## Recommendations

Recommendations highlight potential opportunities for schema optimization across your tables.

Each recommendation includes:

- A detected issue, such as a missing primary key or an inefficient index.
- An explanation of why the issue matters and how it impacts database performance or integrity.
- A suggested fix, often an SQL statement that can be executed on the affected database.

Recommendations are available in aggregate (at the top of the page) and per table, with each applicable table showing its corresponding recommendations. For more information, see [Recommendations][1].

## Metrics overview

The Metrics overview displays dashboards for metrics associated with tracked tables across each DBMS.

{{< img src="database_monitoring/metrics-overview.png" alt="Metrics overview showing total table instance count and key activity metrics across tracked database instances" style="width:100%;" >}}

Each dashboard includes the following metrics:

- Total Table Instance Count  
- Fastest Changing Instances (%)  
- Fastest Changes Instances (bytes)  
- Most Accessed Instances
- Largest Instances  
- Instances with Most Live Rows  
- Instances with the Largest Index Sizes  
- Instances with Access Exclusive Locks  
- Instances with Most Dead Rows  
- Instances with the Longest Last Vacuum Age  
- Instances with the Longest Last Auto Vacuum Age

[1]: /database_monitoring/recommendations
[2]: https://app.datadoghq.com/databases/list