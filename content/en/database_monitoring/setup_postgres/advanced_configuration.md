---
title: Advanced Configuration for Postgres Database Monitoring
kind: documentation
description: Advanced Configuration for Postgres Database Monitoring

---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

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

## Monitoring relation metrics for multiple logical databases
For Agent versions < 7.48, in order to collect relation metrics (such as `postgresql.seq_scans`, `postgresql.dead_rows`, `postgresql.index_rows_read`, and `postgresql.table_size`), the Agent must be configured to connect to each logical database (by default, the Agent only connects to the `postgres` database). 
This configuration is also necessary in Agent 7.48 to specify only certain relations for each database.

Specify a single "DBM" instance to collect DBM telemetry from all databases. Additionally, specify all logical databases the Agent must connect to. It is important to only have `dbm: true` on one configuration instance per host in order to prevent duplication of metrics.
```yaml
init_config:
instances:
  # This instance is the "DBM" instance. It will connect to the
  # `postgres` database and send DBM telemetry from all databases
  - dbm: true
    host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
  # This instance only collects data from the `on_sale` database
  # and collects relation metrics from tables prefixed by "2022_"
  - host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: on_sale
    dbstrict: true
    relations:
      - relation_regex: 2022_.*
        relkind:
          - r
          - i
  # This instance only collects data from the `inventory` database
  # and collects relation metrics only from the specified tables
  - host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: inventory
    dbstrict: true
    relations:
      - relation_name: products
      - relation_name: external_seller_products
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
