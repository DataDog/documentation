---
title: Exploring Database Schemas
description: Explore and analyze database schemas, including tables, columns, and indexes.
---

The [Schemas][1] page allows you to explore and analyze database structures directly in Datadog, removing the need to manually access a database to view table details.

<div class="alert alert-info">The Schemas feature is available for PostgreSQL and SQL Server.</div>

{{< img src="database_monitoring/dbm_schemas_page.png" alt="The Schemas page in Datadog" style="width:100%;" >}}

## Configuration

To enable the schemas feature, ensure that your Database Monitoring configuration includes the following parameter:

```yaml
collect_schemas: true
```

## Exploring schemas

On the [Schemas][1] page, select a table to open the table details panel.

### Definition

The Definition tab provides structural details about the table, including its schema, indexing, and constraints. It includes the following sections:

- **Table Overview**: Displays key metrics such as table size, row counts, index size, and recent vacuum activity.
- **Columns**: Lists the table's columns along with their data types, default values, and whether they allow null values.
- **Indexes**: Displays the table's indexes, including their definitions, performance statistics such as scans per second, and the total storage used by the index.
- **Foreign Keys**: Lists foreign key constraints that define relationships between this table and others.

### Metrics

The **Metrics** tab displays performance and usage statistics for the table over time. It includes the following metrics:

- **Table Size**: The total size of the table in megabytes.
- **Sequential Scans**: The number of sequential scans performed on the table.
- **Live Rows**: The number of active (non-deleted) rows in the table.
- **Dead Rows**: The number of rows that have been marked for deletion but not yet removed.
- **Index Size**: The total size of the table's indexes in kilobytes.
- **Access Exclusive Locks**: The number of times an exclusive lock was placed on the table.
- **Last Vacuum**: 
- **Last Auto Vacuum**: 

### Recommendations

The **Recommendations** tab...

### Queries

The **Queries** tab displays SQL queries executed on the table in the last two hours. It provides the following details for each query:

- **Count**: The number of times the query was executed.
- **Total duration**: The cumulative execution time for all instances of the query.
- **Avg duration**: The average execution time per query.

[1]: https://app.datadoghq.com/databases/schemas
[2]: https://app.datadoghq.com/databases/list