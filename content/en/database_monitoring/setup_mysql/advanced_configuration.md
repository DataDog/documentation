---
title: Advanced Configuration for MySQL Database Monitoring
kind: documentation
description: Advanced Configuration for MySQL Database Monitoring

---

## Truncating `events_statements_summary_by_digest`

Certain workloads require some maintenance on tables in `performance_schema`. Query statistics are aggregated in the `performance_schema.events_statements_summary_by_digest` table, which has a limit on the number of rows. This limit is specified by the [`performance_schema_digests_size` system variable][1]. If the table is full, new query digests are tracked in a catch-all row with null schema and null query digest, preventing the Agent from distinguishing between queries that make up that row.

To prevent this loss of accurate per-query metrics, periodically truncate this table as a maintenance step so that all new queries can be collected:

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

In these cases, track these queries as a single normalized query using the `replace_digits` option, so all metrics for those queries are rolled up into a single query:

```sql
SELECT * FROM daily_aggregates_?
```

Add the `replace_digits` option to your database instance configuration in the Datadog Agent:

```yaml
init_config:

instances:
  - dbm: true
    ...
    replace_digits: true
```

## Raising the sampling rate

If you have queries that are relatively infrequent or execute quickly, raise the sampling rate by lowering the `collection_interval` value to collect samples more frequently.

Set the `collection_interval` in your database instance configuration of the Datadog Agent. The default value is 1. Lower the value to a smaller interval:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size
