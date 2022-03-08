---
title: Troubleshooting DBM Setup for Postgres
kind: documentation
description: Troubleshoot Database Monitoring setup for Postgres
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

This page details common issues with setting up and using Database Monitoring with Postgres, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Diagnosing common problems

### No data is showing after configuring Database Monitoring

If you do not see any data after following the [setup instructions][1] and configuring the Agent, there is most likely an issue with the Agent configuration or API key. Ensure you are receiving data from the Agent by following the [troubleshooting guide][2].

If you are receiving other data such as system metrics, but not Database Monitoring data (such as query metrics and query samples), there is probably an issue with the Agent or database configuration. Ensure your Agent configuration looks like the example in the [setup instructions][1], double-checking the location of the configuration files.

To debug, start by running the [Agent status command][1] to collect debugging information about data collected and sent to Datadog.

Check the `Config Errors` section to ensure the configuration file is valid. For instance, the following indicates a missing instance configuration or invalid file:

```
  Config Errors
  ==============
    postgres
    -----
      Configuration file contains no valid instances
```

If the configuration is valid, the output looks like this:

```
=========
Collector
=========
  Running Checks
  ==============
    postgres (8.0.5)
    ----------------
      Instance ID: postgres:d3dceb9fd36fd57e [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 16,538
      Metric Samples: Last Run: 186, Total: 2,844,362
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
      Database Monitoring Query Samples: Last Run: 1, Total: 17,921
      Service Checks: Last Run: 1, Total: 16,538
      Average Execution Time : 1.765s
      Last Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      Last Successful Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      metadata:
        version.major: 10
        version.minor: 17
        version.patch: 0
        version.raw: 10.17
        version.scheme: semver
```

Ensure that these lines are in the output and have values greater than zero:

```
Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
Database Monitoring Query Samples: Last Run: 1, Total: 17,921
```
When you are confident the Agent configuration is correct, [check the Agent logs][3] for warnings or errors attempting to run the database integrations.

You can also explicitly execute a check by running the `check` CLI command on the Datadog Agent and inspecting the output for errors:

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```

### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup.

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The Agent is running an unsupported version. | Ensure that the Agent is running version 7.32.0 or greater. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates. |
| The Agent is not able to execute a required function in the `datadog` schema of the database. | The Agent requires the function `datadog.explain_statement(...)` to exist in **all databases** the Agent can collect queries from. Ensure this function was created by the root user according to the [setup instructions][1] and that the `datadog` user has permission to execute it. |
| Queries are truncated. | See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text. |
| The application client used to execute the query is using the Postgres extended query protocol or prepared statements. | Some client applications using the Postgres [extended query protocol][2] do not support the collection of explain plans due to the separation of the parsed query and raw bind parameters. For instance, the Python client [asyncpg][3] and the Go client [pgx][4] use the extended query protocol by default. To work around this limitation, you can configure your database client to use the simple query protocol. For example: set `preferQueryMode = simple` for the [Postgres JDBC Client][5] or set `PreferSimpleProtocol` on the [pgx][4] connection config. |
| The query is in a database ignored by the Agent instance config `ignore_databases`. | Default databases such as the `postgres` database are ignored in the `ignore_databases` setting. Queries in these databases will not have samples or explain plans. Check the the value of this setting in your instance config and the default values in the [example config file][6]. |
| The query cannot be explained. | Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans. |
| The query is relatively infrequent or executes quickly. | The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][7] to capture the query. |


[1]: /database_monitoring/setup_postgres/
[2]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[3]: https://github.com/MagicStack/asyncpg
[4]: https://github.com/jackc/pgx
[5]: https://jdbc.postgresql.org/documentation/head/connect.html
[6]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[7]: /database_monitoring/setup_postgres/advanced_configuration

### Query metrics are missing

Before following these steps to diagnose missing query metric data, ensure the Agent is running successfully and you have followed [the steps to diagnose missing agent data](#no-data-is-showing-after-configuring-database-monitoring).

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The `pg_stat_statements` extension is not installed or not loaded in the correct database. | The extension must be installed through `shared_preload_libraries` in your Postgres configuration (**Note**: A server restart is required to take effect after modifying this variable). You must then run `CREATE EXTENSION pg_stat_statements` in all databases the Agent connects to. By default, the Agent connects to the `postgres` database. For additional details on configuring this variable in your setup, see the [setup instructions][1]. |
| The `datadog` user does not have permission to collect query statistics. | To grant the appropriate permissions to the `datadog` user, see the [setup instructions][1] for your database version. |

To verify `pg_stat_statements` is installed and accessible to the `datadog` user, connect to the `postgres` database and attempt to query as the `datadog` user. There should be at least one row returned successfully. For example:

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

If you specified a `dbname` other than the default `postgres` in your Agent config, you must run `CREATE EXTENSION pg_stat_statements` in that database.


[1]: /database_monitoring/setup_postgres/

### Certain queries are missing

If you have data from some queries, but are expecting to see a particular query or set of queries in Database Monitoring, follow this guide.
| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| For Postgres 9.6, if you only see queries executed by the datadog user, then the instance configuration is likely missing some settings. | For monitoring instances on Postgres 9.6, the Datadog Agent instance config must use the settings `pg_stat_statements_view: datadog.pg_stat_statements()` and `pg_stat_activity_view: datadog.pg_stat_activity()` based on the functions created in the initial setup guide. These functions must be created in all databases. |
| The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. | The query may be grouped into the "Other Queries" row. For more information on which queries are tracked, see see [Data Collected][1]. The number of top queries tracked can be raised by contacting Datadog Support. |
| The query is not a SELECT, INSERT, UPDATE, or DELETE query. | Non-utility functions are not tracked by default. To collect them, set the Postgres parameter `pg_stat_statements.track_utility` to `true`. See the [Postgres documentation][2] for more information. |
| The query is executed in a function or stored procedure. | To track queries executed in functions or procedures, set the configuration parameter `pg_stat_statements.track` to `true`. See the [Postgres documentation][2] for more information. |
| The `pg_stat_statements.max` Postgres configuration parameter may be too low for your workload. | If a large number of normalized queries are executed in a short period of time (thousands of unique normalized queries in 10 seconds), then the buffer in `pg_stat_statements` may not be able to hold all of the normalized queries. Increasing this value can improve the coverage of tracked normalized queries and reduce the impact of high churn from generated SQL. **Note**: Queries with unordered column names or using ARRAYs of variable lengths can significantly increase the rate of normalized query churn. For instance `SELECT ARRAY[1,2]` and `SELECT ARRAY[1,2,3]` are tracked as separate queries in `pg_stat_statements`. For more information about tuning this setting, see [Advanced configuration][3]. |
| The query has been executed only once since the agent last restarted. | Query metrics are only emitted after having been executed at least once over two separate ten second intervals since the Agent was restarted. |



[1]: /database_monitoring/data_collected/#which-queries-are-tracked
[2]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[3]: /database_monitoring/setup_postgres/advanced_configuration/

### Query samples are truncated

Longer queries may not show their full SQL text due to database configuration. Some tuning is necessary to adjust for your workload.

The Postgres setting `track_activity_query_size` indicates the maximum size of the SQL statement Postgres stores and makes visible to the Agent. By default, this value is 1024 bytes. Raising this value to 4096 captures most queries for most workloads. However, a higher value may be appropriate if your queries are complex or use long arrays.

For example, the database will truncate a query with an array with many items such as:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, … , 9999, 10000 ]) LIMIT 5
```

The resulting normalized query will appear in the app as:

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

To avoid this, raise the `track_activity_query_size` setting to a value large enough to accommodate the largest expected text size of your queries. For further information, see the [Postgres documentation on runtime statistics][1].


[1]: https://www.postgresql.org/docs/current/runtime-config-statistics.html

### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup.

| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| The Agent is running an unsupported version. | Ensure that the Agent is running version 7.32.0 or greater. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates. |
| The Agent is not able to execute a required function in the `datadog` schema of the database. | The Agent requires the function `datadog.explain_statement(...)` to exist in **all databases** the Agent can collect queries from. Ensure this function was created by the root user according to the [setup instructions][1] and that the `datadog` user has permission to execute it. |
| Queries are truncated. | See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text. |
| The application client used to execute the query is using the Postgres extended query protocol or prepared statements. | Some client applications using the Postgres [extended query protocol][2] do not support the collection of explain plans due to the separation of the parsed query and raw bind parameters. For instance, the Python client [asyncpg][3] and the Go client [pgx][4] use the extended query protocol by default. To work around this limitation, you can configure your database client to use the simple query protocol. For example: set `preferQueryMode = simple` for the [Postgres JDBC Client][5] or set `PreferSimpleProtocol` on the [pgx][4] connection config. |
| The query is in a database ignored by the Agent instance config `ignore_databases`. | Default databases such as the `postgres` database are ignored in the `ignore_databases` setting. Queries in these databases will not have samples or explain plans. Check the the value of this setting in your instance config and the default values in the [example config file][6]. |
| The query cannot be explained. | Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans. |
| The query is relatively infrequent or executes quickly. | The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][7] to capture the query. |


[1]: /database_monitoring/setup_postgres/
[2]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[3]: https://github.com/MagicStack/asyncpg
[4]: https://github.com/jackc/pgx
[5]: https://jdbc.postgresql.org/documentation/head/connect.html
[6]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[7]: /database_monitoring/setup_postgres/advanced_configuration

### Setup fails on `create extension pg_stat_statements`

Example error output from `create extension pg_stat_statements`:
```
create extension pg_stat_statements;
ERROR:  could not open extension control file "<path>/share/postgresql/extension/pg_stat_statements.control": No such file or directory
SQL State: 58P01
```

This error happens when you are missing the `postgresql-contrib` package that includes the `pg_stat_statements` extension. How to install the missing package varies depending on the host's distribution and your Postgres version. As an example, to install the `contrib` package on Ubuntu for Postgres 10, run:

```
sudo apt-get install postgresql-contrib-10
```

See the appropriate version of the [Postgres `contrib` documentation][1] for more information.


[1]: https://www.postgresql.org/docs/12/contrib.html

[1]: /agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[2]: /agent/troubleshooting/
[3]: /agent/guide/agent-log-files