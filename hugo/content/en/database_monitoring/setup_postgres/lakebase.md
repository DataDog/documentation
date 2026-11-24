---
title: Setting Up Database Monitoring for Databricks Lakebase
description: Install and configure Database Monitoring for Postgres on Databricks Lakebase.
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
- link: "/database_monitoring/setup_postgres/selfhosted/"
  tag: "Documentation"
  text: "Setting Up Database Monitoring for Self-Hosted Postgres"
- link: "https://docs.databricks.com/aws/en/oltp/projects/compatibility"
  tag: "External Site"
  text: "Databricks Lakebase Postgres compatibility"
---

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your [Databricks Lakebase][1] database:

1. [Review the Lakebase limitations](#limitations-on-lakebase)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install and configure the Agent](#install-the-agent)

## Before you begin

Supported PostgreSQL versions
: 18

Supported Agent versions
: 7.85.0+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than 1% of query execution time on the database and less than 1% of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][2]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. Point the Agent at the Lakebase compute endpoint, not a connection pooler endpoint. If the Agent connects to different hosts while it is running, the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][3] for information about what data the Agent collects from your databases and how to help keep it secure.

## Limitations on Lakebase

Lakebase doesn't allow `superuser` connections, instance-level parameter changes, host access, or access to Postgres logs. For details, see the Databricks [Lakebase compatibility][4] documentation. As a result, the following Postgres settings and features that Database Monitoring uses can't be changed or enabled, and the related data is limited or unavailable:

| Setting or feature | Value on Lakebase | Effect in Datadog |
| --- | --- | --- |
| `track_activity_query_size` | `1024` | Query text longer than 1,024 bytes is truncated in query samples and active sessions, and the Agent can't collect explain plans for truncated queries. |
| `track_io_timing` | `off` | I/O timing metrics, such as `postgresql.blk_read_time`, `postgresql.blk_write_time`, and `postgresql.io.*_time`, are always `0`. Query metrics don't include per-query block read and write times. |
| `track_functions` | `none` | Function metrics (`postgresql.function.*`) are not collected. |
| `pg_stat_statements.track` | `top` | Statements that run inside functions and stored procedures aren't tracked separately in query metrics. |
| `pg_stat_statements.max` | `5000` | Fewer distinct normalized queries are tracked before the least-used queries are evicted. |
| `pg_stat_statements.track_utility` | `on` | Utility commands, such as `SHOW`, appear in query metrics. See [Clear the Agent's password from query statistics](#clear-the-agents-password-from-query-statistics). |
| `pg_buffercache` extension | Can't be installed | Buffer cache metrics (`postgresql.buffercache.*`) are not collected. |
| `data_checksums` | `off` | `postgresql.checksums.checksum_failures` is not collected. `postgresql.checksums.enabled` is reported. |
| `pg_stat_replication` on the primary | No rows | Primary-side replication metrics (`postgresql.replication.*`) are not collected. Replica-side metrics, such as `postgresql.replication_delay`, `postgresql.replication_delay_bytes`, and `postgresql.wal_receiver.*`, are collected. |
| Postgres logs | Not accessible | [Log collection][5] and [`auto_explain` plan collection][6] aren't available. |

`shared_preload_libraries` already includes `pg_stat_statements` on Lakebase, so no server parameter changes or restarts are required.

**Note**: Lakebase doesn't preserve query statistics when a compute scales to zero or restarts.

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

Run the following SQL commands on the **primary** (read-write) compute. Connect to the `databricks_postgres` database as the Lakebase project owner, using your Databricks identity. The project owner isn't a Postgres `superuser`, but it has the permissions required for these commands.

Create the `datadog` user with a native Postgres password:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
ALTER ROLE datadog INHERIT;
```

**Note**: The Agent can't authenticate with Databricks OAuth tokens, which expire after about an hour. The `datadog` user must use a native Postgres password. Lakebase accepts passwords only in plaintext, not as pre-hashed SCRAM-SHA-256 verifiers.

Create the following schema **in every database** that you want to monitor:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Lakebase manages the `postgres` database, so you can't create objects in it. Skip the `postgres` database and exclude it in the [Agent configuration](#install-the-agent).

<div class="alert alert-info">For data collection or custom metrics that require querying additional tables, you may need to grant the <code>SELECT</code> permission on those tables to the <code>datadog</code> user. Example: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. See <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL custom metric collection</a> for more information. </div>

### Clear the Agent's password from query statistics

Because `pg_stat_statements.track_utility` is always `on` in Lakebase, `pg_stat_statements` stores the text of the `CREATE USER` statement, including the plaintext password. Any role with `pg_read_all_stats`, including roles granted `pg_monitor`, can read it.

After you create the `datadog` user, and after any later password change, run the following command as the project owner to remove those entries:

```SQL
SELECT pg_stat_statements_reset(0, 0, queryid)
FROM pg_stat_statements
WHERE query ~* '^\s*(CREATE|ALTER)\s+(ROLE|USER)\s+"?datadog"?\s.*PASSWORD';
```

This removes the statistics for those statements only.

<div class="alert alert-warning">If you enable <code>collect_raw_query_statement</code>, the Agent can capture the raw text of a password change statement if it samples the statement while the statement runs. Clearing <code>pg_stat_statements</code> doesn't prevent this.</div>

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

For tuning options, see [Advanced Configuration][7].

### Securely store your password
{{% dbm-secret %}}

### Verify database permissions

To verify the permissions are correct, run the following commands to confirm the Agent user is able to connect to the database and read the core tables:

```shell
psql "host=<LAKEBASE_HOST> dbname=databricks_postgres user=datadog sslmode=require" -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql "host=<LAKEBASE_HOST> dbname=databricks_postgres user=datadog sslmode=require" -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql "host=<LAKEBASE_HOST> dbname=databricks_postgres user=datadog sslmode=require" -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

When it prompts for a password, use the password you entered when you created the `datadog` user.

## Install the Agent

Installing the Datadog Agent also installs the Postgres check, which is required for Database Monitoring on Postgres. Install the Agent on a host that can reach your Lakebase compute endpoint. If you haven't installed the Agent, see the [Agent installation instructions][8].

Edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to your Lakebase compute. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
  - dbm: true
    host: '<LAKEBASE_HOST>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    dbname: databricks_postgres
    ## Lakebase requires TLS.
    ssl: require
    ## Exclude the Databricks-managed `postgres` database.
    collect_default_database: false
    ignore_databases:
      - template%
      - postgres
    database_autodiscovery:
      enabled: true
      exclude:
        - '^postgres$'
    collect_column_statistics:
      enabled: true
```

Replace `<LAKEBASE_HOST>` with the hostname of your Lakebase compute endpoint, which you can find in the connection details for your Lakebase project.

The configuration requires the following Lakebase-specific settings:

`ssl: require`
: Lakebase requires TLS connections.

`collect_default_database`, `ignore_databases`, and `database_autodiscovery.exclude`
: Lakebase manages the `postgres` database. You can't create the `datadog` schema or functions in it, so explain plans fail there. Set all three options to exclude it. `collect_default_database` must be `false`, because when it is `true`, the Agent removes `postgres` from `ignore_databases`.

**Note**: If your password includes special characters, wrap it in single quotes.

[Restart the Agent][10] to apply the changes.

### Monitor read replicas

To monitor a Lakebase read replica, add a separate instance to `conf.yaml` with the replica's compute endpoint as the `host`, using the same settings as the primary. You don't need to run the setup SQL commands on the replica.

### Verify Agent setup

[Run the Agent's status subcommand][11] and look for `postgres` under the Checks section. You can also see the [Databases][12] page to get started.

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.databricks.com/aws/en/oltp/
[2]: /database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /database_monitoring/data_collected/#sensitive-information
[4]: https://docs.databricks.com/aws/en/oltp/projects/compatibility
[5]: /database_monitoring/setup_postgres/selfhosted/#collecting-logs-optional
[6]: /database_monitoring/setup_postgres/selfhosted/#collecting-plans-with-auto_explain-optional
[7]: /database_monitoring/setup_postgres/advanced_configuration/#configuring-column-statistics-collection
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: /agent/configuration/agent-commands/#agent-status-and-information
[12]: https://app.datadoghq.com/databases
[13]: /database_monitoring/troubleshooting/?tab=postgres
