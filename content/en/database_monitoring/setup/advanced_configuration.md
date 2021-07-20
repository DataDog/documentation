---
title: Database Monitoring Advanced Configuration
kind: documentation
description: Database Monitoring Advanced Configuration
further_reading:
- link: "/tk/tk/"
  tag: "Documentation"
  text: "tktk"
  
---
{{< site-region region="us3,gov" >}} 

Database Monitoring is not supported in this region.

{{< /site-region >}}

### Custom queries

TODO


### Adjust the query sampling rate

TODO

### Adjust query metric resolution

TODO


## Postgres
<p></p>

## MySQL

### Truncating events_statements_summary_by_digest

Certain workloads require some maintenance on tables in `performance_schema`. Query statistics are aggregated in the `performance_schema.events_statements_summary_by_digest` table, which has a limit on the number of rows. This limit is specified 
by the [`performance_schema_digests_size` system variable][1]. If the table is full, new query digests will be tracked in a catch-all row with null schema and null query digest, preventing the agent from distinguishing between queries that make up that row.

To prevent this loss of accurate per-query metrics, this table should be periodically truncated as a maintenance step so that all new queries can be collected. This can be done with command:

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

To determine the frequency of truncation, you can run the query below to determine the number of statements sent to this catch-all row per second. A value greater than 0 means the table is full and should be truncated.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```


## Further reading

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size
