---
title: SQL Server
description: "Connect SQL Server to Datadog Data Observability to monitor schemas, table dimensions, and row volumes."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
  - link: '/database_monitoring/setup_sql_server/'
    tag: 'Documentation'
    text: 'Database Monitoring for SQL Server'
  - link: '/remote_configuration/'
    tag: 'Documentation'
    text: 'Remote Configuration'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability for SQL Server is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The SQL Server integration for Datadog Data Observability tracks table metadata, providing visibility into schemas, table dimensions, and row volumes across your environment. You can then create data quality monitors on your SQL Server tables.

SQL Server is collected through the [Datadog Agent][1] rather than through a direct cloud connection like the [data warehouse integrations][2]. Table metadata comes from the schema collection that runs as part of [Database Monitoring][3], so Database Monitoring must be enabled on each SQL Server instance you want to track. This page covers only the configuration Data Observability adds on top of Database Monitoring.

## Prerequisites

Before you begin, make sure you have:

- [Database Monitoring for SQL Server][3] set up on the instance, with the `datadog` login created as described in the setup guide for your hosting type.
- Datadog Agent `7.84.0` or later installed on a host that can reach your SQL Server instances. See [Agent installation][1] for your platform.
- [Remote Configuration][4] enabled for your organization, on the API key the Agent uses, and on the Agent itself. Data quality monitors are delivered to the Agent over Remote Configuration, so without it your tables sync but your monitors never run. See [Enable Remote Configuration](#enable-remote-configuration).
- Permission to create database users and grant privileges in each database you want to track.
- Preview access enabled for your organization by a Datadog representative.

## Enable Remote Configuration

Data Observability uses [Remote Configuration][4] to deliver monitor queries to the Agent. When you create a data quality monitor in Datadog, its query is pushed to the Agent that owns the instance, and the Agent's SQL Server check runs it against your database on the monitor's schedule.

Table metadata collection does not depend on Remote Configuration. If Remote Configuration is unavailable, your tables still appear in the catalog, but any monitor you create against them stays empty because the Agent never receives the query to run.

Remote Configuration is on by default in most environments, but it has to be enabled in all three of the following places. Confirm each one:

 - **Your organization.** On the [Remote Configuration][5] settings page, confirm Remote Configuration is enabled. Enabling it requires the [`org_management`][6] permission.
 - **The Agent's API key.** The API key the Agent uses must have the Remote Configuration capability. Check it on the [API Keys][7] page. This requires the [`api_keys_write`][6] permission. An Agent using a key without this capability reports an `UNAUTHORIZED` status.
 - **The Agent.** `remote_configuration.enabled` defaults to `true` in Agent `7.47.0` and later, so usually there is nothing to change. Set it explicitly in [`datadog.yaml`][8] (or through `DD_REMOTE_CONFIGURATION_ENABLED`) in two cases:

   - It was previously set to `false`.
   - The Agent reports to GovCloud (`ddog-gov.com`) or runs in FIPS mode. Remote Configuration is **disabled by default** in those environments and does not turn on unless you set it.

   ```yaml
   remote_configuration:
     enabled: true
   ```

   [Restart the Agent][9] after changing this setting.

Each Agent's Remote Configuration status is also listed on the [Remote Configuration][5] settings page. For status descriptions and network requirements, see [Agent Remote Configuration status][10].

## Grant read access to your data

The Database Monitoring setup lets the `datadog` login read server state and object definitions, but not the data in your tables. Data Observability needs `SELECT` on the tables you monitor to compute row counts, column-level metrics, and custom SQL results.

Run the following in each database you want to track, and repeat the `GRANT` statement for each schema:

```sql
USE [<DATABASE_NAME>];
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT ON SCHEMA::[<SCHEMA_NAME>] TO datadog;
```

If the `datadog` user already exists in the database, skip the `CREATE USER` statement. A schema-level grant also applies to tables created in the schema later.

To limit access to specific tables, grant `SELECT` on each table instead of on the schema:

```sql
USE [<DATABASE_NAME>];
GRANT SELECT ON [<SCHEMA_NAME>].[orders] TO datadog;
```

## Configure the SQL Server integration

Edit the Agent's `conf.d/sqlserver.d/conf.yaml` file. On each instance you want to track, keep `dbm: true` and the connection settings from your Database Monitoring setup (such as `connector` and `driver`) in place, and add `collect_schemas` and `data_observability`. For a complete list of configuration options, see the [sample sqlserver.d/conf.yaml][11].

{{< tabs >}}
{{% tab "All databases on the instance" %}}

Enable `database_autodiscovery` to collect metadata from every database on the instance:

```yaml
init_config:
instances:
  - host: '<SQL_SERVER_HOST>,1433'
    username: datadog
    password: '<PASSWORD>'
    ## Keep your existing connector and driver settings
    dbm: true
    database_autodiscovery: true

    ## Populates your tables in Data Observability
    collect_schemas:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{% tab "A single database" %}}

Set `database` to collect metadata from one database only:

```yaml
init_config:
instances:
  - host: '<SQL_SERVER_HOST>,1433'
    username: datadog
    password: '<PASSWORD>'
    ## Keep your existing connector and driver settings
    dbm: true
    database: <DATABASE_NAME>

    ## Populates your tables in Data Observability
    collect_schemas:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

Schema collection (`collect_schemas`) is disabled by default on SQL Server and requires `dbm: true`. It populates your tables in Data Observability. By default, it collects up to 300 tables from each database. To track more tables, raise `collect_schemas.max_tables`. For the SQL Server versions that schema collection supports, see [Collecting schemas][12].

[Restart the Agent][9] to apply the changes.

### Validate the configuration

Run the Agent [status command][13] and confirm that the `sqlserver` check shows a `Total Runs` count greater than zero and a recent `Last Successful Execution` timestamp.

Then confirm the Agent is receiving Remote Configuration. The `Remote Configuration` section of the Agent status reports the organization and API key checks directly. A healthy Agent reports:

```text
====================
Remote Configuration
====================
  Organization enabled: True
  API Key: Authorized
  Last error: None
```

Anything else maps back to one of the three checks in [Enable Remote Configuration](#enable-remote-configuration):

- `Organization enabled: False`: enable Remote Configuration for your organization.
- `API Key: Not authorized`: add the Remote Configuration capability to the API key this Agent uses.
- `Remote Configuration is disabled because ...`: it is turned off on the Agent itself.

Until this section is healthy, your tables still sync but your monitors cannot run.

## Explore your table metadata

The Agent collects schema metadata every 600 seconds by default (`collect_schemas.collection_interval`). After the first collection, you can [view your SQL Server tables][14] in the Data Observability catalog.

If your tables do not appear, verify that:

1. The Agent status shows the `sqlserver` check reporting successfully.
2. `dbm: true` and `collect_schemas.enabled: true` are set on the instance.
3. The `datadog` login can connect to each database you want to track.
4. A Datadog representative has enabled Preview access for your organization.

## Create data quality monitors

After your tables appear in the catalog, you can [create Data Observability monitors][15] on them. On SQL Server, you can create:

- **Row count**: Alert on volume fluctuations, such as sudden drops or plateauing trends.
- **Column-level metrics**: Monitor column attributes such as null ratios, cardinalities, or distribution shifts.
- **Custom SQL**: Alert on any `SELECT` query written in T-SQL. The query must return exactly one numeric value aliased as `dd_value`.

Table freshness monitors are not available for SQL Server tables. To track freshness, create a freshness monitor on a datetime column.

Monitors run on the schedule you set in [Monitor schedule][16]. Monitors set to {{< ui >}}Manual{{< /ui >}} don't run on SQL Server, so select {{< ui >}}Scheduled{{< /ui >}}. Keep `SELECT` privileges in place for the `datadog` user on all referenced tables; monitors fail if access is revoked.

A monitor that has not received a result yet shows {{< ui >}}No data yet{{< /ui >}}. Monitor queries run only while the Agent is running, so if the Agent stops, your monitors record no values until it restarts. If a monitor reports no data, check that:

- The Agent is running and the `sqlserver` check reports successfully.
- `data_observability.enabled: true` is set on the instance that connects to the monitored database.
- [Remote Configuration](#enable-remote-configuration) is enabled for your organization, for the Agent's API key, and on the Agent itself.

## Known limitations

- Data Observability lists SQL Server tables from instances where `dbm` and `collect_schemas` are enabled, including instances that do not have `data_observability.enabled: true`. Monitors on tables from those instances have no data. To fix this, add `data_observability.enabled: true` to the instance and grant the `SELECT` privileges in [Grant read access to your data](#grant-read-access-to-your-data).
- If more than one SQL Server instance in an Agent's configuration has `data_observability.enabled: true` and the same `host` value, the Agent runs no monitor queries for that host. Enable `data_observability` on one instance for each host, such as an instance that uses `database_autodiscovery`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /data_observability/quality_monitoring/data_warehouses/
[3]: /database_monitoring/setup_sql_server/
[4]: /remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /account_management/rbac/permissions/#permissions-list
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /agent/configuration/agent-configuration-files/#main-configuration-file
[9]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /agent/guide/setup_remote_config/#agent-remote-configuration-status
[11]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[12]: /database_monitoring/setup_sql_server/selfhosted/#collecting-schemas
[13]: /agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/data-obs/catalog
[15]: /monitors/types/data_observability/
[16]: /monitors/types/data_observability/#monitor-schedule
