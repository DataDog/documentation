---
title: Setting up Postgres
description: Setting up Database Monitoring on a Postgres database
content_filters:
  - trait_id: postgres_version
    label: "Version"
    option_group_id: postgres_version_options
  - trait_id: host
    label: "Host"
    option_group_id: postgres_hosting_options
---

{% if equals($host, "self_hosted") %}
Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Prerequisites
: Postgres additional supplied modules must be installed. For most installations, this is included by default but less conventional installations might require an additional installation of your version of [the `postgresql-contrib` package][selfhosted-1].

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][selfhosted-2]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, use `127.0.0.1` or the socket. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][selfhosted-3] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure Postgres settings

Configure the following [parameters][selfhosted-4] in the `postgresql.conf` file and then **restart the server** for the settings to take effect. For more information about these parameters, see the [Postgres documentation][selfhosted-5].

**Required parameters**

| Parameter | Value | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Required for `postgresql.queries.*` metrics. Enables collection of query metrics using the [pg_stat_statements][selfhosted-5] extension. |
| `track_activity_query_size` | `4096` | Required for collection of larger queries. Increases the size of SQL text in `pg_stat_activity`. If left at the default value then queries longer than `1024` characters will not be collected. |

**Optional parameters**

| Parameter | Value | Description |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Enables tracking of statements within stored procedures and functions. |
| `pg_stat_statements.max` | `10000` | Increases the number of normalized queries tracked in `pg_stat_statements`. Recommended for high-volume databases that see many different types of queries from many different clients. |
| `pg_stat_statements.track_utility` | `off` | Disables utility commands like PREPARE and EXPLAIN. Setting this value to `off` means only queries like SELECT, UPDATE, and DELETE are tracked. |
| `track_io_timing` | `on` | Enables collection of block read and write times for queries. |

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

Run the following SQL commands on the **primary** database server (the writer) in the cluster if Postgres is replicated. The Agent can collect telemetry from all databases on the server regardless of which database it connects to. Use the default `postgres` database unless you need the Agent to run [custom queries against data unique to a different database][selfhosted-6].

Connect to your chosen database as a superuser (or another user with sufficient permissions). For example, to connect to the `postgres` database using [psql][selfhosted-7]:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Create the `datadog` user:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

<!-- 15 or later -->
{% if semverIsAtLeast($postgres_version, "15.0.0") %}
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

{% /if %}
<!-- Ends 15 or later -->

<!-- 10 through 14 -->
{% if includes($postgres_version, ["gte_10_0_0", "gte_11_0_0", "gte_12_0_0", "gte_13_0_0", "gte_14_0_0"]) %}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{% /if %}
<!-- Ends 10 through 14 -->

<!-- 9.6 only -->
{% if equals($postgres_version, "lt_10_0_0") %}

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

{% /if %}
<!-- Ends 9.6 only -->

{% alert %}
For data collection or custom metrics that require querying additional tables, you may need to grant the `SELECT` permission on those tables to the `datadog` user. Example: `grant SELECT on <TABLE_NAME> to datadog;`. See <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL custom metric collection</a> for more information.
{% /alert %}

### Create the explain plan function

Create the following function **in every database** to enable the Agent to collect explain plans:

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
   SET TRANSACTION READ ONLY;

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

### Create the column statistics function

Create the following function **in every database** to enable the Agent to collect column-level table statistics from `pg_stats`:

```SQL
CREATE OR REPLACE FUNCTION datadog.column_statistics()
RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real,
    inherited boolean, correlation real, most_common_freqs real[]
) AS
$$ SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac,
          inherited, correlation, most_common_freqs
          FROM pg_catalog.pg_stats
          WHERE schemaname NOT IN ('pg_catalog', 'information_schema'); $$
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp;
```

After the function exists, enable collection in your Postgres instance config:

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
```

For tuning options, see [Advanced Configuration][selfhosted-16].

### Securely store your password
{% partial file="database_monitoring/dbm-secret.mdoc.md" /%}

### Verify database permissions

To verify the permissions are correct, run the following commands to confirm the Agent user is able to connect to the database and read the core tables:

<!-- 10 or later -->
{% if semverIsAtLeast($postgres_version, "10.0.0") %}

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

{% /if %}
<!-- Ends 10 or later -->

<!-- 9.6 only -->
{% if equals($postgres_version, "lt_10_0_0") %}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_activity() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_statements() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{% /if %}
<!-- Ends 9.6 only -->

When it prompts for a password, use the password you entered when you created the `datadog` user.

## Install the Agent

Installing the Datadog Agent also installs the Postgres check, which is required for Database Monitoring on Postgres.
If you haven't installed the Agent, see the [Agent installation instructions][selfhosted-8]. Then, continue with the instructions for your installation method.

Edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to the Postgres instance you want to monitor. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][selfhosted-9].

```yaml
init_config:
instances:
 - dbm: true
   host: localhost
   port: 5432
   username: datadog
   password: 'ENC[datadog_user_database_password]'

  ## Optional: Connect to a different database if needed for `custom_queries`
  # dbname: '<DB_NAME>'
```

**Note**: If your password includes special characters, wrap it in single quotes.

[Restart the Agent][selfhosted-10] to apply the changes.

### Collecting logs (optional)

PostgreSQL default logging is to `stderr`, and logs do not include detailed information. Log into a file with additional details specified in the log line prefix. See the PostgreSQL [documentation][selfhosted-11] for details.

1. Logging is configured within the file `/etc/postgresql/<VERSION>/main/postgresql.conf`. For regular log results, including statement outputs, set the following parameters in the log section:
   ```ini
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. To gather detailed duration metrics and make them searchable in the Datadog interface, configure them inline with the statement. The recommended configuration below logs all statements and their durations. To reduce output to statements above a certain duration, set `log_min_duration_statement` to the desired minimum in milliseconds. Check that logging the full SQL statement complies with your organization's privacy requirements.

   **Note**: Both `log_statement` and `log_duration` options are commented out. See discussion on this topic [here][selfhosted-12].

   ```ini
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. Collecting logs is disabled by default in the Datadog Agent. Enable it in your `datadog.yaml` file:
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
   Change the `service` and `path` parameter values to configure for your environment. See the [sample postgres.d/conf.yaml][selfhosted-9] for all available configuration options.
5. [Restart the Agent][selfhosted-10].

### Collecting plans with `auto_explain` (optional)

By default, the agent only gathers [`EXPLAIN`][selfhosted-17] plans for a sampling of in-flight queries. These plans are of a more general nature, especially when application code uses prepared statements.

To collect full `EXPLAIN ANALYZE` plans taken from all queries, you need to use [`auto_explain`][selfhosted-18], a first-party extension bundled with PostgreSQL available in all major providers. _Logging collection is a prerequisite to `auto_explain` collection_, so enable it before continuing.

{% alert level="danger" %}
**Important:** `auto_explain` produces logs lines that may contain sensitive information from your application, similar to the raw values that appear in non-obfuscated SQL. You can use the <a href="/account_management/rbac/permissions/#database-monitoring">`dbm_parameterized_queries_read`</a> permission to control who can see the resulting plans, but the log lines themselves _are_ visible to all users within your Datadog org. Using <a href="/logs/guide/logs-rbac">RBAC for Logs</a> helps ensure these logs are only visible to the right users.
{% /alert %}

After you enable logging collection:

1. Add `auto_explain` to your list of `shared_preload_libraries` in `postgresql.conf`. For instance, if `shared_preload_libraries` is set to `pg_stat_statements`, change it to `pg_stat_statements,auto_explain`

2. Change the `log_line_prefix` to enable richer event correlation. This pattern is required to ingest auto_explain plans.
   ```ini
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. Configure `auto_explain` settings. The log format _must_ be `json`, but other settings can vary depending on your application. This example logs an `EXPLAIN ANALYZE` plan for all queries over one second, including buffer information but omitting timing (which can have overhead).

   ```ini
    auto_explain.log_format = 'json'
    auto_explain.log_min_duration = 1000
    auto_explain.log_analyze = 'on'
    auto_explain.log_buffers = 'on'
    auto_explain.log_timing = 'off'
    auto_explain.log_triggers = 'on'
    auto_explain.log_verbose = 'on'
    auto_explain.log_nested_statements = 'on'
    auto_explain.sample_rate = 1
   ```

4. [Restart the Agent][selfhosted-10].

### Verify Agent setup

[Run the Agent's status subcommand][selfhosted-13] and look for `postgres` under the Checks section. Or visit the [Databases][selfhosted-14] page to get started!

## Example Agent Configurations
{% partial file="database_monitoring/dbm-postgres-agent-config-examples.mdoc.md" /%}

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][selfhosted-15].
{% /if %}

{% if equals($host, "rds") %}
RDS Content!!

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure the AWS integration](#configure-the-aws-integration)
1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install and configure the Agent](#install-and-configure-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

<div class="alert alert-info">
<a href="/database_monitoring/setup_postgres/rds/quick_install">RDS Quick Install</a> is our recommended installation method for smaller environments (for example 20 database hosts) or those new to DBM and want to try it out quickly. For those managing large fleets of databases where deploying the agent via UI doesn't scale as well we recommend the standard installation, to manually manage the agent yourself or integrate with your automation practices.
</div>

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, use `127.0.0.1` or the socket. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure the AWS integration

Enable {{< ui >}}Resource Collection{{< /ui >}} in the {{< ui >}}Resource Collection{{< /ui >}} section of your [Amazon Web Services integration tile][3].
{% /if %}


[selfhosted-1]: https://www.postgresql.org/docs/current/contrib.html
[selfhosted-2]: /database_monitoring/agent_integration_overhead/?tab=postgres
[selfhosted-3]: /database_monitoring/data_collected/#sensitive-information
[selfhosted-4]: https://www.postgresql.org/docs/current/config-setting.html
[selfhosted-5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[selfhosted-6]: /integrations/faq/postgres-custom-metric-collection-explained/
[selfhosted-7]: https://www.postgresql.org/docs/current/app-psql.html
[selfhosted-8]: https://app.datadoghq.com/account/settings/agent/latest
[selfhosted-9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[selfhosted-10]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[selfhosted-11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[selfhosted-12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[selfhosted-13]: /agent/configuration/agent-commands/#agent-status-and-information
[selfhosted-14]: https://app.datadoghq.com/databases
[selfhosted-15]: /database_monitoring/troubleshooting/?tab=postgres
[selfhosted-16]: /database_monitoring/setup_postgres/advanced_configuration/#configuring-column-statistics-collection
[selfhosted-17]: https://www.postgresql.org/docs/current/sql-explain.html
[selfhosted-18]: https://www.postgresql.org/docs/current/auto-explain.html