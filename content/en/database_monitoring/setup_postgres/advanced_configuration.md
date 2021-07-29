---
title: Advanced Configuration for Postgres Database Monitoring
kind: documentation
description: Advanced Configuration for Postgres Database Monitoring

---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

## Handling many identical tables

<!-- NOTE TO EDITORS: Please edit this section across all databases -->

If your database is partitioned across tables in such a way that table definitions are identical except for the name, this can result in a large number or normalized queries, such as:

* `SELECT * FROM daily_aggregates_001`
* `SELECT * FROM daily_aggregates_002`
* `SELECT * FROM daily_aggregates_003`

In these cases, it is often preferable to track these queries as a single normalized query using the `quantize_sql_tables` option, so all metrics for those queries will be rolled up into a single query:

* `SELECT * FROM daily_aggregates_?`

Add this option to your database instance config in the datadog agent:

```yaml
init_config:

instances:
  - dbm: true
    ...
    quantize_sql_tables: true
```
