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

If you have queries that are relatively infrequent or execute quickly, raise the sampling rate by lowering the `collection_interval` value to collect samples more frequently.

Set the `collection_interval` in your database instance configuration of the Datadog Agent. The default value is 1 second and can be seen in the <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L332C9-L336" target="_blank">`postgres/conf.yaml.example`</a>.

Lower the value to a smaller interval:

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```
