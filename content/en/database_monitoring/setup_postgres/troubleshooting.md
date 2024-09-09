---
title: Troubleshooting DBM Setup for Postgres
description: Troubleshoot Database Monitoring setup for Postgres
---

This page details common issues with setting up and using Database Monitoring with Postgres, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Diagnosing common problems

### No data is showing after configuring Database Monitoring

If you do not see any data after following the [setup instructions][1] and configuring the Agent, there is most likely an issue with the Agent configuration or API key. Ensure you are receiving data from the Agent by following the [troubleshooting guide][2].

If you are receiving other data such as system metrics, but not Database Monitoring data (such as query metrics and query samples), there is probably an issue with the Agent or database configuration. Ensure your Agent configuration looks like the example in the [setup instructions][1], double-checking the location of the configuration files.

To debug, start by running the [Agent status command][3] to collect debugging information about data collected and sent to Datadog.

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
When you are confident the Agent configuration is correct, [check the Agent logs][4] for warnings or errors attempting to run the database integrations.

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
### Query metrics are missing

Before following these steps to diagnose missing query metric data, ensure the Agent is running successfully and you have followed [the steps to diagnose missing agent data](#no-data-is-showing-after-configuring-database-monitoring). Below are possible causes for missing query metrics.

#### pg_stat_statements extension not loaded {#pg-stat-statements-not-loaded}
The `pg_stat_statements` extension is not loaded. The extension must be loaded through `shared_preload_libraries` in your Postgres configuration (**Note**: A server restart is required to take effect after modifying this variable). For additional details on how to load the extension, see the [setup instructions][1].

#### pg_stat_statements extension not created in database {#pg-stat-statements-not-created}
The `pg_stat_statements` extension is not installed in the correct database. You must run `CREATE EXTENSION pg_stat_statements` in all databases the Agent connects to. By default, the Agent connects to the `postgres` database. For additional details on configuring this variable in your setup, see the [setup instructions][1].

To verify `pg_stat_statements` is installed and accessible to the `datadog` user, connect to the `postgres` database and attempt to query as the `datadog` user. There should be at least one row returned successfully. For example:

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

If you specified a `dbname` other than the default `postgres` in your Agent config, you must run `CREATE EXTENSION pg_stat_statements` in that database.

If you created the extension in your target database and you still see this warning, the extension may have been created in a schema that is not accessible to the `datadog` user. To verify this, run this command to check which schema `pg_stat_statements` was created in:

```bash
psql -h localhost -U datadog -d postgres -c "select nspname from pg_extension, pg_namespace where extname = 'pg_stat_statements' and pg_extension.extnamespace = pg_namespace.oid;"
```

Then, run this command to check which schemas are visible to the `datadog` user:

```bash
psql -h localhost -U datadog -d <your_database> -c "show search_path;"
```

If you do not see the `pg_stat_statements` schema in the `datadog` user's `search_path`, you need to add it to the `datadog` user. For example:

```sql
ALTER ROLE datadog SET search_path = "$user",public,schema_with_pg_stat_statements;
```

### Certain queries are missing

If you have data from some queries, but do not see a particular query or set of queries in Database Monitoring that you're expecting to see, follow this guide.
| Possible cause                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| For Postgres 9.6, if you only see queries executed by the datadog user, then the instance configuration is likely missing some settings. | For monitoring instances on Postgres 9.6, the Datadog Agent instance config must use the settings `pg_stat_statements_view: datadog.pg_stat_statements()` and `pg_stat_activity_view: datadog.pg_stat_activity()` based on the functions created in the initial setup guide. These functions must be created in all databases. |
| The Datadog user does not have sufficient access to view queries by other users. | The Datadog user must have the [`pg_monitor` role][25] to access tables such as `pg_stat_activity`. Ensure that the Datadog user has this role: `GRANT pg_monitor TO datadog`. |
| The query is not a "top query," meaning the sum of its total execution time is not in the top 200 normalized queries at any point in the selected time frame. | The query may be grouped into the "Other Queries" row. For more information on which queries are tracked, see see [Data Collected][5]. The number of top queries tracked can be raised by contacting Datadog Support. |
| The query is not a SELECT, INSERT, UPDATE, or DELETE query. | Non-utility functions are not tracked by default. To collect them, set the Postgres parameter `pg_stat_statements.track_utility` to `on`. See the [Postgres documentation][6] for more information. |
| The query is executed in a function or stored procedure. | To track queries executed in functions or procedures, set the configuration parameter `pg_stat_statements.track` to `on`. See the [Postgres documentation][6] for more information. |
| The `pg_stat_statements.max` Postgres configuration parameter may be too low for your workload. | If a large number of normalized queries are executed in a short period of time (thousands of unique normalized queries in 10 seconds), then the buffer in `pg_stat_statements` may not be able to hold all of the normalized queries. Increasing this value can improve the coverage of tracked normalized queries and reduce the impact of high churn from generated SQL. **Note**: Queries with unordered column names or using ARRAYs of variable lengths can significantly increase the rate of normalized query churn. For instance `SELECT ARRAY[1,2]` and `SELECT ARRAY[1,2,3]` are tracked as separate queries in `pg_stat_statements`. For more information about tuning this setting, see [Advanced configuration][7]. |
| The query has been executed only once since the agent last restarted. | Query metrics are only emitted after having been executed at least once over two separate ten second intervals since the Agent was restarted. |

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

To avoid this, raise the `track_activity_query_size` setting to a value large enough to accommodate the largest expected text size of your queries. For further information, see the Postgres documentation on [runtime statistics][8].

### Queries are missing explain plans

Some or all queries may not have plans available. This can be due to unsupported query commands, queries made by unsupported client applications, an outdated Agent, or incomplete database setup. Below are possible causes for missing explain plans.

#### Missing explain function {#undefined-explain-function}

Problem: The Agent is unable to execute a required function in the `datadog` schema of the database.

Solution: The Agent requires the `datadog.explain_statement(...)` function to exist in **all databases** the Agent can collect queries from.

Create the function **in every database** to enable the Agent to collect explain plans.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```
#### Agent is running an unsupported version
Ensure that the Agent is running version 7.36.1 or newer. Datadog recommends regular updates of the Agent to take advantage of new features, performance improvements, and security updates.

#### Queries are truncated
See the section on [truncated query samples](#query-samples-are-truncated) for instructions on how to increase the size of sample query text.

#### Postgres extended query protocol

If a client is using the Postgres [extended query protocol][9] or prepared statements, the Datadog Agent is unable to collect explain plans due to the separation of the parsed query and raw bind parameters. Below are a few options for addressing the problem.

For Postgres version 12 or newer, enable the following beta feature in the [Postgres integration config][19].
```
query_samples:
  explain_parameterized_queries: true
  ...
```

For versions prior to Postgres 12, this feature is not supported. However, if your client provides an option to force using the simple query protocol, the Datadog Agent is enabled to collect execution plans.

| Language | Client | Configuration for simple query protocol|
|----------|--------|----------------------------------------|
| Go       | [pgx][10] | Set `PreferSimpleProtocol` to switch to the simple query protocol (See the [ConnConfig documentation][11]).Alternatively, you can apply this per query or call by using the [QuerySimpleProtocol][24] flag as the first argument on `Query` or `Exec` calls.
| Java     | [Postgres JDBC Client][12] | Set `preferQueryMode = simple` to switch to the simple query protocol (See the [PreferQueryMode documentation][13]). |
| Python   | [asyncpg][14]              | Uses the extended query protocol, which cannot be disabled. Disabling prepared statements does not solve the problem. To enable the collection of execution plans, format SQL Queries using [psycopg sql][15] (or some other comparable SQL formatter that does proper escaping of SQL values) before passing them to the DB client.                                                  |
| Python   | [psycopg][16]             | `psycopg2` does not use the extended query protocol so execution plans should be collected without issue. <br/> `psycopg3` uses the extended query protocol by default and cannot be disabled. Disabling prepared statements does not solve the problem. To enable the collection of execution plans, format SQL Queries using [psycopg sql][15] before passing them to the DB client. |
| Node     | [node-postgres][17]       | Uses the extended query protocol and cannot be disabled. To enable the Datadog Agent to collect execution plans, use [pg-format][18] to format SQL Queries before passing them to [node-postgres][17].|

#### Query is in a database ignored by the Agent instance config
The query is in a database ignored by the Agent instance config `ignore_databases`. Default databases such as the `rdsadmin` and the `azure_maintenance` databases are ignored in the `ignore_databases` setting. Queries in these databases do not have samples or explain plans. Check the value of this setting in your instance config and the default values in the [example config file][19].

**Note:** The `postgres` database is also ignored by default in Agent versions <7.41.0.

#### Query cannot be explained
Some queries such as BEGIN, COMMIT, SHOW, USE, and ALTER queries cannot yield a valid explain plan from the database. Only SELECT, UPDATE, INSERT, DELETE, and REPLACE queries have support for explain plans.

#### Query is relatively infrequent or executes quickly
The query may not have been sampled for selection because it does not represent a significant proportion of the database's total execution time. Try [raising the sampling rates][23] to capture the query.


#### Application is relying on search paths for specifying which schema to query
Because Postgres does not expose the current [search path][20] in [`pg_stat_activity`][21], the Datadog Agent cannot find out which search path is being used for any active Postgres processes. The workaround for this limitation is to alter the search path for the user defined in the Postgres integration config to include the schema.
```sql
ALTER ROLE datadog SET search_path = "$user",public,schema1,schema2,etc;
```

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

For more information, see the appropriate version of the [Postgres `contrib` documentation][22].

### Queries from Agent are slow and/or have a high impact on the database

The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. Below are possible reasons for Agent queries to require more resources.

#### High value for `pg_stat_statements.max` {#high-pg-stat-statements-max-configuration}
The recommended value for `pg_stat_statements.max` is `10000`. Setting this configuration to a higher value
may cause the collection query to take longer to run which can lead to query timeouts and gaps in query metric collection. If the Agent reports this warning, make sure that `pg_stat_statements.max` is set to `10000` on the database. 


[1]: /database_monitoring/setup_postgres/
[2]: /agent/troubleshooting/
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /agent/configuration/agent-log-files
[5]: /database_monitoring/data_collected/#which-queries-are-tracked
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[7]: /database_monitoring/setup_postgres/advanced_configuration
[8]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
[9]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[10]: https://github.com/jackc/pgx
[11]: https://pkg.go.dev/github.com/jackc/pgx#ConnConfig
[12]: https://jdbc.postgresql.org/documentation/head/connect.html
[13]: https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/jdbc/PreferQueryMode.html
[14]: https://github.com/MagicStack/asyncpg
[15]: https://www.psycopg.org/docs/sql.html
[16]: https://www.psycopg.org/
[17]: https://node-postgres.com/
[18]: https://www.npmjs.com/package/pg-format
[19]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[20]: https://www.postgresql.org/docs/14/ddl-schemas.html#DDL-SCHEMAS-PATH
[21]: https://www.postgresql.org/docs/14/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW
[22]: https://www.postgresql.org/docs/12/contrib.html
[23]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L281
[24]: https://pkg.go.dev/github.com/jackc/pgx/v4#QuerySimpleProtocol
[25]: https://www.postgresql.org/docs/current/predefined-roles.html#:~:text=a%20long%20time.-,pg_monitor,-Read/execute%20various
