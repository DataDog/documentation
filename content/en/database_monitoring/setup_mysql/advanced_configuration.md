---
title: Advanced Configuration for MySQL Database Monitoring
kind: documentation
description: Advanced Configuration for MySQL Database Monitoring

---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}


## Truncating `events_statements_summary_by_digest`

Certain workloads require some maintenance on tables in `performance_schema`. Query statistics are aggregated in the `performance_schema.events_statements_summary_by_digest` table, which has a limit on the number of rows. This limit is specified by the [`performance_schema_digests_size` system variable][1]. If the table is full, new query digests are tracked in a catch-all row with null schema and null query digest, preventing the Agent from distinguishing between queries that make up that row.

To prevent this loss of accurate per-query metrics, this table should be periodically truncated as a maintenance step so that all new queries can be collected:

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

To determine the frequency of truncation, run the query below to determine the number of statements sent to this catch-all row per second. A value greater than zero means the table is full and should be truncated.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## Handling many identical tables

Partitioning your database across tables, such that table definitions are identical except for the name, can result in a large number or normalized queries:

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
init_config:

instances:
  - dbm: true
    ...
    quantize_sql_tables: true
```


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size
