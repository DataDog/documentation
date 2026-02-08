---
title: Setting Up Database Monitoring for Supabase
description: Install and configure Database Monitoring for Supabase.
further_reading:
    - link: '/integrations/postgres/'
      tag: 'Documentation'
      text: 'Basic Postgres Integration'
---

Database Monitoring provides deep visibility into your Supabase databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Supabase database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

Supported Agent versions
: 7.69.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][2]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as Supabase’s Dedicated Pooler (pgbouncer) or Session Pooler (Supavisor). If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][3] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

The following SQL commands should be executed on the **primary** database server (the writer) in the cluster if Supabase is replicated. Choose a Supabase database on the database server for the Agent to connect to. The Agent can collect telemetry from all databases on the database server regardless of which one it connects to, so a good option is to use the default `postgres` database. Choose a different database only if you need the Agent to run [custom queries against data unique to that database][6].

Connect to the chosen database as a superuser (or another user with sufficient permissions). For example, if your chosen database is `postgres`, connect as the `postgres` user.

Navigate to the SQL Editor tab inside Supabase and run:

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
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

In addition, ensure that the `pg_stat_statements` extension is enabled for your project in Supabase.```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

In addition, ensure that the `pg_stat_statements` extension is enabled for your project in Supabase.```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">For data collection or custom metrics that require querying additional tables, you may need to grant the <code>SELECT</code> permission on those tables to the <code>datadog</code> user. Example: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. See <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL custom metric collection</a> for more information. </div>

Create the following function **in every database** to enable the Agent to collect explain plans.

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

Create the function **in every database** to enable the Agent to collect column statistics.

```SQL
CREATE OR REPLACE FUNCTION datadog.column_stats() RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real
) AS
$$
  SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac
  FROM pg_stats;
$$
LANGUAGE sql
SECURITY DEFINER;
```

### Securely store your password

{{% dbm-secret %}}

### Verify

To verify that the permissions are correct, connect to the database as the `datadog` user and run the following commands. For example, if your database is `postgres`, connect as the `datadog` user using [psql][7] and run:

```shell
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

When prompted for a password, use the password you created for the `datadog` user.

## Install the Agent

Installing the Datadog Agent also installs the Postgres check, which is required for Database Monitoring on Supabase.
If you haven't installed the Agent, see the [Agent installation instructions][8]. Then, return here to continue with the instructions for your installation method.

<div class="alert alert-info">Supabase’s default direct connection string is only valid on IPv6 networks.
To connect the Agent to a Supabase instance using this method, ensure that the machine running the Agent is IPv6 enabled. Reference your cloud provider’s documentation for more information.
Supabase instances on the Pro plan or above support IPv4 addresses as an add-on.</div>

Edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to the Supabase instance you want to monitor. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_INSTANCE_ENDPOINT>
      port: 5432
      username: datadog
      password: 'ENC[datadog_user_database_password]'

      ## Optional: Connect to a different database if needed for `custom_queries`
      # dbname: '<DB_NAME>'
```

**Note**: If your password includes special characters, wrap it in single quotes.

[Restart the Agent][16] to apply the changes.

### Validate

[Run the Agent's status subcommand][13] and look for `postgres` under the Checks section. Or visit the [Databases][14] page to get started!

## Example Agent Configurations

### With Supavisor's session pooler

Although we recommend having a direct connection to the database instead of connecting via proxy, you can still connect the Agent to your Supabase instance if the above options are not available to you. This will work best when you only have one instance in your Supabase project.

Get the session pooler connection string for your project via the Connect dialog, and copy it into your Agent configuration file:

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_POOLER_ENDPOINT>
      port: 5432
      username: datadog.some-project-id
      password: 'ENC[datadog_user_database_password]'
```

{{% dbm-postgres-agent-config-examples %}}

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][15]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
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
[16]: /agent/configuration/agent-commands/#restart-the-agent
[17]: https://supabase.com/docs/guides/platform/ipv4-address
