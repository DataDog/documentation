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

On the [Schemas][1] page, select a table to open the table details panel. This panel allows you to examine:

- **Columns**: Review each column's name, data type, and default values, including constraints such as **NOT NULL**.
- **Indexes**: View details about index types and their usage metrics.
- **Foreign Keys**: If applicable, explore existing foreign key associations for the table.

### Metrics

### Queries

[1]: https://app.datadoghq.com/databases/schemas
[2]: https://app.datadoghq.com/databases/list