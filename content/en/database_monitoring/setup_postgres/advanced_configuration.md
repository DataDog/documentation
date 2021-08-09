---
title: Advanced Configuration for Postgres Database Monitoring
kind: documentation
description: Advanced Configuration for Postgres Database Monitoring

---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Handling many relations

If your Postgres database has a large number of relations (in the thousands), we recommend adding the setting `collect_database_size_metrics: false` to your instance configuration for that database. When this setting is disabled, the Agent will not run the function `pg_database_size()` to collect database size statistics which has worse performance on instances with a large number of tables.

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

Additionally, if you partition your data across tables, such that table definitions are identical except for the name, this can result in a large number or normalized queries:

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

In these cases, track these queries as a single normalized query using the `quantize_sql_tables` option, so all metrics for those queries are rolled up into a single query:

```sql
SELECT * FROM daily_aggregates_?
```

Add the `quantize_sql_tables` option to your database instance configuration in the Datadog Agent:

```yaml
instances:
  - dbm: true
    ...
    quantize_sql_tables: true
```

