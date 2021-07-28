---
title: Troubleshooting Database Monitoring
kind: documentation
description: Troubleshoot Database Monitoring setup

---
{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}


## Diagnosing common problems

### No data is showing after configuring Database Monitoring

If you do not see any data after following the [setup instructions][1] and configuring the Agent, there is most likely an issue with the Agent configuration or API key. Ensure you are receiving data from the Agent by following the [troubleshooting guide][2].

If you are receiving other data such as system metrics, but not Database Monitoring data (query metrics and query samples), there is probably an issue with the Agent or database configuration. Ensure your Agent configuration looks like the example in the [setup instructions][1], double-checking the location of the configuration files.

When you are confident the Agent configuration is correct, [check the Agent logs][3] for warnings or errors attempting to run the database integrations.

You can also explicitly execute a check by running the `check` CLI command on the Datadog Agent and inspecting the output for errors:

```bash
# For self-hosted installations of the Agent
datadog-agent check postgres -t 2
datadog-agent check mysql -t 2

# For container-based installations of the Agent
agent check postgres -t 2
agent check mysql -t 2
```

### Query metrics are missing

{{< tabs >}}
{{% tab "Postgres" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The `pg_stat_statements` extension is not installed or not loaded in the correct database | The extension must be installed via the `shared_preload_libraries` in your Postgres configuration (**Note**: A server restart is required to take effect after modifying this variable). You must then run `CREATE EXTENSION pg_stat_statements` in all databases the Agent connects to. By default, the Agent connects to the `postgres` database. For additional details on configuring this variable in your setup, check the [setup instructions][1]. |
| The `datadog` user does not have permission to collect query statistics | To grant the appropriate permissions to the database user, please see the [setup instructions][1] for your database version. |

To verify `pg_stat_statements` is installed and accessible to the `datadog` user, connect to the `postgres` database and attempt to query as the `datadog` user. There should be at least one row returned successfully. For example:

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

If you specified a `dbname` other than the default `postgres` in your Agent config, you must run `CREATE EXTENSION pg_stat_statements` in that database.


[1]: /database_monitoring/setup_postgres/
{{% /tab %}}
{{% tab "MySQL" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The `performance_schema` is not enabled. | The `performance_schema` option is enabled by default by MySQL but may be disabled in configuration or by your cloud provider. Follow the [setup instructions][1] for enabling `performance_schema`. |
| The host is managed by Google Cloud SQL and does not support `performance_schema`. | Due to limitations with Google Cloud SQL, Datadog Database Monitoring is [not supported on instances with less than 26GB of RAM][2]. | |


[1]: /database_monitoring/setup_mysql/
[2]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
{{% /tab %}}
{{< /tabs >}}

### Certain queries are missing

{{< tabs >}}
{{% tab "Postgres" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The query is not a "top query." | The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. In this case, it may be grouped into the "Other Queries" row. For more information on which queries are tracked, see see [Data Collected][1]. |
| If the query is not a SELECT, INSERT, UPDATE, or DELETE query. | Non-utility functions are not tracked by default. The Postgres parameter `pg_stat_statements.track_utility` must be set to `true`. See the [Postgres documentation][2] for more information. |
| If the query is executed in a function or stored procedure. | In order to track queries executed in functions or procedures, the configuration parameter `pg_stat_statements.track` should be set to `true`. See the [Postgres documentation][2] for more information. |
| The `pg_stat_statements.max` configuration parameter may be too low for your workload. | If a large number of normalized queries are executed in a short period of time (thousands of unique normalized queries in 10 seconds), then the buffer in `pg_stat_statements` may not be able to hold all of the normalized queries. Raising this value can improve the coverage of tracked normalized queries and reduce the impact of high churn from generated SQL. Note that queries with unordered column names or using ARRAYs of variable lengths can significantly increase the rate of normalized query churn. For instance `SELECT ARRAY[1,2]` and `SELECT ARRAY[1,2,3]` are tracked as separate queries in pg_stat_statements. For more information about tuning this setting, see [Advanced configuration][3]. |


[1]: /database_monitoring/data_collected/#which-queries-are-tracked
[2]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[3]: TODO
{{% /tab %}}
{{% tab "MySQL" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The query is not a "top query." | The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected timeframe. In this case, it may be grouped into the "Other Queries" row. For more information on which queries are tracked, see [Data Collected][1]. |
| The `events_statements_summary_by_digest` may be full. | The MySQL table `events_statements_summary_by_digest` in `performance_schema` has a maximum limit on the number of digests (normalized queries) it will store. Regular truncation of this table as a maintenance task will ensure all queries are tracked over time. See [Advanced configuration][2] for more information. |



[1]: /database_monitoring/data_collected/#which-queries-are-tracked
[2]: /database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}

### Query samples are missing

{{< tabs >}}
{{% tab "Postgres" %}}

TODO

{{% /tab %}}
{{% tab "MySQL" %}}

TODO

{{% /tab %}}
{{< /tabs >}}

### Query samples are truncated

Longer queries may not show their full SQL text due to database configuration. Some tuning is necessary to adjust for your workload.

{{< tabs >}}
{{% tab "Postgres" %}}

The Postgres setting `track_activity_query_size` indicates the maximum size of the SQL statement Postgres will store and make visible to the Agent. By default, this value is 1024 bytes. Raising this value to 4096 will capture most queries for most workloads. However, a higher value may be appropriate if your queries are highly complex or use very long arrays.

For example, a query with an array with many items such as:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, … , 9999, 10000 ]) LIMIT 5
```

will be truncated by the database.. The resulting normalized query will appear in the app as:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

To avoid this, raise the `track_activity_query_size` setting to a value large enough to accommodate the largest expected text size of your queries. For further information, see the [Postgres documentation on runtime statistics][1].


[1]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
{{% /tab %}}
{{% tab "MySQL" %}}

The MySQL SQL text length visible to the Datadog Agent is determined by the [system variables][1] below. Most workloads will be able to capture most queries by raising this value to 4096, but you may need to set a higher value for particularly long and complex queries.

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema=4096
```
<!-- TODO: add a custom query recipe for getting the max sql text length -->


[1]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
{{% /tab %}}
{{< /tabs >}}

### Queries are missing explain plans

There are several reasons the Agent may not be able to collect explain plans for a query execution:

{{< tabs >}}
{{% tab "Postgres" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| Queries are truncated | See the guide on [truncated query samples](#query-samples-are-truncated). |
| The query may not be able to be explained (such as BEGIN) | In these cases, the query cannot yield a valid Explain plan. |
| The application client used to connect to the database is using the Postgres [extended query protocol][1] or prepared statements. | Some client applications using the Postgres extended query protocol [extended query protocol][1] do not support the collection of Explain Plans due to the separation of the parsed query and raw bind parameters. For instance, clients such as the Go client [sqlx][2] and Python client [asyncpg][3] use the extended query protocol. To work around this limitation, you can modify your application to send the raw SQL queries including bind parameters. We are working towards other methods of collecting Explain Plans for clients using this protocol. |
| The query is relatively infrequent or executes very quickly. | If you are looking for the Explain Plan for a certain query, it may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. You can attempt to [raise the sampling rates][4] in order to capture the query. |




[1]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[2]: https://pkg.go.dev/github.com/jmoiron/sqlx
[3]: https://github.com/MagicStack/asyncpg
[4]: TODO
{{% /tab %}}
{{% tab "MySQL" %}}

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| Queries are truncated | See the section on [truncated query samples](#query-samples-are-truncated). |
| The query may not be able to be explained (such as BEGIN) | In these cases, the query cannot yield a valid explain plan. |
| The query is relatively infrequent or executes very quickly. | If you are looking for the Explain Plan for a certain query, it may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. You can attempt to [raise the sampling rates][1] in order to capture the query. |


[1]: /database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}

## Need more help?

If you are still experiencing problems, contact [Datadog Support][4] for help.




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /database_monitoring/#getting-started
[2]: /agent/troubleshooting/
[3]: /agent/guide/agent-log-files
[4]: /help/
