---
title: PostgreSQL
description: "Connect PostgreSQL to Datadog Data Observability to monitor schemas, table dimensions, and row volumes."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
  - link: '/database_monitoring/setup_postgres/'
    tag: 'Documentation'
    text: 'Database Monitoring for PostgreSQL'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability for PostgreSQL is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The PostgreSQL integration for Datadog Data Observability tracks table metadata, providing visibility into schemas, table dimensions, and row volumes across your environment.

PostgreSQL is collected through the [Datadog Agent][1] rather than through a direct cloud connection like the [data warehouse integrations][7]. This page covers only the configuration needed for Data Observability. To set up the full suite of Database Monitoring features, see the [DBM setup guide for PostgreSQL][2].

## Prerequisites

Before you begin, make sure you have:

- Datadog Agent `7.81.0` or later installed on a host that can reach your PostgreSQL instances. See [Agent installation][1] for your platform.
- Superuser access to your PostgreSQL instance, to create the Datadog user and grant privileges.
- Preview access enabled for your organization by a Datadog representative.

## Already using Database Monitoring?

If [Database Monitoring][2] is already running against this database, most of the setup is done: the `datadog` user exists and has `pg_monitor`. Three things are still needed.

1. **Check your Agent version.** Run `datadog-agent status` and read the version from the header and from the Postgres check line in the Collector section:

   ```text
   Agent (v7.81.0)
   ...
     postgres (23.9.1)
   ```

   If the Agent is older than `7.81.0`, [upgrade the Agent][6]. Upgrading only the Postgres check with `datadog-agent integration install` is not sufficient: the Remote Configuration handler that delivers monitor queries ships with the Agent itself, not with the check.

2. **Grant `SELECT` on your data.** Database Monitoring grants `pg_monitor` and `USAGE` on the `public` schema, but it does not grant `SELECT` on your tables. Data Observability needs it to compute row counts, column-level metrics, and custom SQL results. Run the grants in [Set up the Datadog database user](#set-up-the-datadog-database-user) for each schema in each database you want to track, skipping the `CREATE USER` step.

3. **Enable the Data Observability job.** Add the following to each existing instance in `conf.d/postgres.d/conf.yaml`, keeping `dbm: true` in place:

   ```yaml
   data_observability:
     enabled: true
   ```

   If your instance already uses `database_autodiscovery`, Data Observability picks up every discovered database, so make sure the `SELECT` grants cover all of them.

[Restart the Agent][5] to apply the changes, then continue from [Explore your table metadata](#explore-your-table-metadata).

## Set up the Datadog database user

1. Connect to your database as a superuser and create a dedicated user:

   ```sql
   CREATE USER datadog WITH PASSWORD '<SECURE_PASSWORD>';
   GRANT pg_monitor TO datadog;
   GRANT SELECT ON pg_stat_database TO datadog;
   ```

2. Connect to each database you want to monitor (using `\c my_database` in `psql`) and grant read access to your schemas:

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
   GRANT SELECT ON ALL TABLES IN SCHEMA "<YOUR_SCHEMA>" TO datadog;

   -- Automatically apply read access to tables created later by <TABLE_OWNER_ROLE>
   ALTER DEFAULT PRIVILEGES FOR ROLE <TABLE_OWNER_ROLE> IN SCHEMA "<YOUR_SCHEMA>"
     GRANT SELECT ON TABLES TO datadog;
   ```

   `ALTER DEFAULT PRIVILEGES` only affects tables created by the role named in `FOR ROLE`. Run it once for **each role that creates tables** in the schema; otherwise Data Observability loses access to new tables as your application creates them. To list the roles that own tables in a schema:

   ```sql
   SELECT DISTINCT tableowner FROM pg_tables WHERE schemaname = '<YOUR_SCHEMA>';
   ```

   Schema and table permissions are database-specific. Re-run these commands for **every database** and every schema you intend to track.

### Restrict to specific tables (optional)

To limit collection to a subset of tables, use targeted grants instead of `ALL TABLES IN SCHEMA`:

```sql
GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."orders" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."users" TO datadog;
```

Data Observability only displays tables where the `datadog` user has explicit `SELECT` privileges.

## Configure the PostgreSQL integration

Edit the Agent's `conf.d/postgres.d/conf.yaml` file and add an instance for each PostgreSQL host you want to monitor. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][4].

{{< tabs >}}
{{% tab "All databases on the host" %}}

Enable `database_autodiscovery` to collect metadata from every user database on the host:

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'

    database_autodiscovery:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{% tab "A single database" %}}

Set `dbname` to collect metadata from one database only:

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'
    dbname: <DATABASE_NAME>

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

**Note**: If your password includes special characters, wrap it in single quotes.

Schema collection (`collect_schemas`) is enabled by default and is what populates your tables in Data Observability. `dbm: true` is **not** required for Data Observability; set it only if you also use [Database Monitoring][2].

[Restart the Agent][5] to apply the changes:

```shell
sudo systemctl restart datadog-agent
```

### Validate the configuration

Confirm the check is running:

```shell
sudo datadog-agent status | grep -A 20 'postgres'
```

The output should show the `postgres` check with a `Total Runs` count greater than zero and a recent `Last Successful Execution` timestamp.

## Explore your table metadata

Allow approximately one hour for the initial metadata collection to complete. You can then [view your PostgreSQL tables][3] in the Data Observability catalog.

If your tables do not appear, verify that:

1. `sudo datadog-agent status` shows the `postgres` check reporting successfully.
2. The `datadog` user has `SELECT` privileges on the target tables. Test with:

   ```shell
   psql -U datadog -d <DATABASE_NAME> -c 'SELECT 1 FROM <YOUR_SCHEMA>.orders LIMIT 1'
   ```

3. A Datadog representative has enabled Preview access for your organization.

## Create data quality monitors

After your tables appear in the catalog, you can alert on their health.

Navigate to a table in the [Data Observability catalog][3], select the {{< ui >}}Monitors{{< /ui >}} tab, and click {{< ui >}}Add Monitor{{< /ui >}}. In Preview, you can create:

- **Row count**: Alert on volume fluctuations, such as sudden drops or plateauing trends.
- **Column-level metrics**: Monitor column attributes such as null ratios, cardinalities, or distribution shifts.
- **Custom SQL**: Alert on any `SELECT` query. The query must return exactly one numeric value aliased as `dd_value`.

Monitors run on the collection schedule. Keep `SELECT` privileges in place for the `datadog` user on all referenced tables; monitors fail if access is revoked.

## Known limitations

Data Observability lists all PostgreSQL tables from instances where `dbm` and `collect_schemas` are enabled, including instances that do not have `data_observability.enabled: true`. Scheduling a monitor against one of those databases produces a monitor with no data. If your tables are listed but your monitors stay empty, follow [Already using Database Monitoring?](#already-using-database-monitoring) to enable the job and grant the required `SELECT` privileges.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /database_monitoring/setup_postgres/
[3]: https://app.datadoghq.com/datasets/catalog?integration=postgres
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[5]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[6]: /agent/guide/upgrade_agent_fleet_automation/
[7]: /data_observability/quality_monitoring/data_warehouses/
