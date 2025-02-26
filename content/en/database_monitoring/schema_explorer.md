---
title: Exploring Database Schemas
description: Explore and analyze database schemas, including tables, columns, and indexes.
---

The [Schemas][1] page allows you to explore and analyze database structures directly in Datadog, removing the need to manually access a database to view table details.

The **Schemas** page in Datadog Database Monitoring allows you to efficiently explore and analyze database structures. It replaces the need to manually access a database for schema exploration and provides detailed visibility into your databases.

The Schemas feature allows you to:

- View all databases within an instance.
- Explore available schemas within each database.
- Examine a complete list of tables within a schema.
- Analyze table columns, including **data types, default values, null constraints, indexes, and index usage**.

## Data Type and Index Insights

Within the **Schemas** tab, users can inspect:

- Table structures, including **column names and data types**.
- Index details, such as **index types and index usage statistics**.
- Metadata directly from the Datadog interface for enhanced analysis.

<div class="alert alert-info">The Schemas feature is available for PostgreSQL and SQL Server.</div>

PLACEHOLDER FOR IMAGE

## Configuration

To enable the schemas feature, ensure that your Database Monitoring configuration includes the following parameter:

```yaml
collect_schemas: true
```

## Exploring schemas

You can view the schemas for a database from the Schemas page or the database host side panel.

### Schemas page

On the Schemas page, select a table to open the table details panel. This panel allows you to examine:

- **Columns**: Review each column's name, data type, and default values, including constraints such as **NOT NULL**.
- **Indexes**: View details about index types and their usage metrics.
- **Foreign Keys**: If applicable, explore existing foreign key associations for the table.

### Database host side panel

On the **Schema** tab, select a database to view its associated schemas.

From the **Schemas** tab, select a database to view its associated schemas. The interface organizes schemas hierarchically, displaying:

- **Schemas within the database**
- **Tables within each schema**
- **Column-level details for each table**

[1]: https://app.datadoghq.com/databases/schemas