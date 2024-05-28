---
title: Setting Up Database Monitoring for self hosted Postgres
kind: documentation
description: Install and configure Database Monitoring for self-hosted Postgres.
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"

---

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16

Prerequisites
: Postgres additional supplied modules must be installed. For most installations, this is included by default but less conventional installations might require an additional installation of your version of [the `postgresql-contrib` package][1].

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][2]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][3] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure Postgres settings

Configure the following [parameters][4] in the `postgresql.conf` file and then **restart the server** for the settings to take effect. For more information about these parameters, see the [Postgres documentation][5].

| Parameter | Value | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Required for `postgresql.queries.*` metrics. Enables collection of query metrics using the [pg_stat_statements][5] extension. |
| `track_activity_query_size` | `4096` | Required for collection of larger queries. Increases the size of SQL text in `pg_stat_activity`. If left at the default value then queries longer than `1024` characters will not be collected. |
| `pg_stat_statements.track` | `ALL` | Optional. Enables tracking of statements within stored procedures and functions. |
| `pg_stat_statements.max` | `10000` | Optional. Increases the number of normalized queries tracked in `pg_stat_statements`. This setting is recommended for high-volume databases that see many different types of queries from many different clients. |
| `pg_stat_statements.track_utility` | `off` | Optional. Disables utility commands like PREPARE and EXPLAIN. Setting this value to `off` means only queries like SELECT, UPDATE, and DELETE are tracked. |
| `track_io_timing` | `on` | Optional. Enables collection of block read and write times for queries. |

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

The following SQL commands should be executed on the **primary** database server (the writer) in the cluster if Postgres is replicated. Choose a PostgreSQL database on the database server for the Agent to connect to. The Agent can collect telemetry from all databases on the database server regardless of which one it connects to, so a good option is to use the default `postgres` database. Choose a different database only if you need the Agent to run [custom queries against data unique to that database][6].

Connect to the chosen database as a superuser (or another user with sufficient permissions). For example, if your chosen database is `postgres`, connect as the `postgres` user using [psql][7] by running:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Create the `datadog` user:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Give the `datadog` user permission to relevant tables:

```SQL
ALTER ROLE datadog INHERIT;
```

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Create functions **in every database** to enable the Agent to read the full contents of `pg_stat_activity` and `pg_stat_statements`:

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">For data collection or custom metrics that require querying additional tables, you may need to grant the <code>SELECT</code> permission on those tables to the <code>datadog</code> user. Example: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. See <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL custom metric collection</a> for more information. </div>

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

### Verify

To verify the permissions are correct, run the following commands to confirm the Agent user is able to connect to the database and read the core tables:

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

When it prompts for a password, use the password you entered when you created the `datadog` user.

## Install the Agent

Installing the Datadog Agent also installs the Postgres check which is required for Database Monitoring on Postgres. If you haven't already installed the Agent for your Postgres database host, see the [Agent installation instructions][8].

1. Edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to your `host` / `port` and set the hosts to monitor. See the [sample postgres.d/conf.yaml][9] for all available configuration options.

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       pg_stat_statements_view: datadog.pg_stat_statements()
       pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

{{% /tab %}}
{{< /tabs >}}

2. [Restart the Agent][10].

### Collecting logs (optional)

PostgreSQL default logging is to `stderr`, and logs do not include detailed information. It is recommended to log into a file with additional details specified in the log line prefix. Refer to the PostgreSQL [documentation][11] on this topic for additional details.

1. Logging is configured within the file `/etc/postgresql/<VERSION>/main/postgresql.conf`. For regular log results, including statement outputs, uncomment the following parameters in the log section:
   ```conf
     logging_collector = on
     log_directory = 'pg_log'  # directory where log files are written,
                               # can be absolute or relative to PGDATA
     log_filename = 'pg.log'   # log file name, can include pattern
     log_statement = 'all'     # log all queries
     #log_duration = on
     log_line_prefix= '%m [%p] %d %a %u %h %c '
     log_file_mode = 0644
     ## For Windows
     #log_destination = 'eventlog'
   ```
2. To gather detailed duration metrics and make them searchable in the Datadog interface, they should be configured inline with the statement themselves. See below for the recommended configuration differences from above and note that both `log_statement` and `log_duration` options are commented out. See discussion on this topic [here][12].

   This config logs all statements, but to reduce the output to those which have a certain duration, set the `log_min_duration_statement` value to the desired minimum duration in milliseconds (check that logging the full SQL statement complies with your organization's privacy requirements):
   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:
   ```yaml
   logs_enabled: true
   ```
4. Add and edit this configuration block to your `conf.d/postgres.d/conf.yaml` file to start collecting your PostgreSQL logs:
   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```
   Change the `service` and `path` parameter values to configure for your environment. See the [sample postgres.d/conf.yaml][9] for all available configuration options.
5. [Restart the Agent][10].

### Validate

[Run the Agent's status subcommand][13] and look for `postgres` under the Checks section. Or visit the [Databases][14] page to get started!

## Example Agent Configurations
{{% dbm-postgres-agent-config-examples %}}

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][15]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.postgresql.org/docs/12/contrib.html
[2]: /database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /database_monitoring/troubleshooting/?tab=postgres
