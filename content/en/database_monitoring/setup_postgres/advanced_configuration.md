---
title: Advanced Configuration for Postgres Database Monitoring
description: Advanced Configuration for Postgres Database Monitoring

---

## Handling many relations

If your Postgres database has a large number of relations (in the thousands), Datadog recommends adding `collect_database_size_metrics: false` to your instance configuration for that database. When this setting is disabled, the Agent will not run the function `pg_database_size()` to collect database size statistics, which has worse performance on instances with a large number of tables.

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

In these cases, track these queries as a single normalized query using the `replace_digits` option, so all metrics for those queries are rolled up into a single query:

```sql
SELECT * FROM daily_aggregates_?
```

Add the `replace_digits` option to your database instance configuration in the Datadog Agent:

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## Raising the sampling rate

If you have queries that are relatively infrequent or execute quickly, raise the sampling rate by lowering the `collection_interval` value to collect explain plans more frequently.

Set the `collection_interval` in your database instance configuration of the Datadog Agent. The default value is 1 second and can be seen in the <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example" target="_blank">`postgres/conf.yaml.example`</a>.

Lower the value to a smaller interval:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

## Configuring column statistics collection

Column statistics collection reads per-column statistics from `pg_stats` (`n_distinct`, `null_frac`, `avg_width`, `correlation`, `most_common_freqs`) on a periodic schedule. This requires the `datadog.column_statistics()` function to exist in every monitored database — see [Setting Up Database Monitoring for Self-Hosted Postgres][1] for the function definition.

Once the function exists, enable and tune collection in your Postgres instance config:

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
      collection_interval: 3600   # seconds between collection runs; default 3600 (hourly)
      max_tables: 500              # maximum tables to collect per run; default 500
```

| Option | Default | When to change it |
| --- | --- | --- |
| `enabled` | `false` | Set to `true` to enable column statistics collection. |
| `collection_interval` | `3600` | Lower for more responsive statistics (at the cost of more queries against `pg_stats`); raise on very large or busy clusters to reduce query load. |
| `max_tables` | `500` | Raise if you monitor a database with more than 500 tables and want full coverage; lower to cap collection cost. |

For column statistics to populate, the underlying tables must have had `ANALYZE` (or autoanalyze) run against them at least once — `pg_stats` is empty for tables with no collected statistics.

[1]: /database_monitoring/setup_postgres/selfhosted/#create-the-column-statistics-function
