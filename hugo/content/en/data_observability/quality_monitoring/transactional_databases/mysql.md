---
title: MySQL
description: "Connect MySQL to Datadog Data Observability to monitor schemas, table dimensions, and row volumes."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
  - link: '/database_monitoring/setup_mysql/'
    tag: 'Documentation'
    text: 'Database Monitoring for MySQL'
  - link: '/remote_configuration/'
    tag: 'Documentation'
    text: 'Remote Configuration'
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability for MySQL is in Preview. Contact your Datadog representative to enable it for your organization.
{{< /callout >}}

## Overview

The MySQL integration for Datadog Data Observability tracks table metadata, providing visibility into schemas, table dimensions, and row volumes across your environment. You can then create data quality monitors on your MySQL tables.

MySQL is collected through the [Datadog Agent][1] rather than through a direct cloud connection like the [data warehouse integrations][2]. This page covers only the configuration needed for Data Observability. To set up the full suite of Database Monitoring features, see the [DBM setup guide for MySQL][3].

## Prerequisites

Before you begin, make sure you have:

- Datadog Agent `7.84.0` or later installed on a host that can reach your MySQL instances. See [Agent installation][1] for your platform.
- [Remote Configuration][4] enabled for your organization, on the API key the Agent uses, and on the Agent itself. Data quality monitors are delivered to the Agent over Remote Configuration, so without it your tables sync but your monitors never run. See [Enable Remote Configuration](#enable-remote-configuration).
- Permission to create MySQL users and grant privileges.
- Preview access enabled for your organization by a Datadog representative.

## Enable Remote Configuration

Data Observability uses [Remote Configuration][4] to deliver monitor queries to the Agent. When you create a data quality monitor in Datadog, Datadog sends its query to the Agent that owns the instance. The Agent's MySQL check runs the query against your database on the monitor's schedule.

Table metadata collection does not depend on Remote Configuration. If Remote Configuration is unavailable, your tables still appear in the catalog, but monitors you create on them stay empty. The Agent never receives the queries to run.

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

## Set up the Datadog database user

1. Create the `datadog` user and grant its base permissions. Follow [Grant the Agent access][11] for self-hosted MySQL, or the equivalent step in the [setup guide for your hosting type][3]. If Database Monitoring already runs against this instance, the user exists, so skip this step.

2. Grant `SELECT` on each database you want to track. Data Observability needs it to compute row counts, column-level metrics, and custom SQL results:

   ```sql
   GRANT SELECT ON <DATABASE_NAME>.* TO datadog@'%';
   ```

   `SELECT` also makes the tables visible to schema collection, which only collects tables the user holds a privilege on. The `REFERENCES` privilege that Database Monitoring recommends for schema collection is not enough for Data Observability, because it does not allow reading table data.

3. If the `datadog` user also runs Database Monitoring, increase its connection limit by one. Data Observability uses one additional connection, so the limit of `5` from the Database Monitoring setup becomes `6`:

   ```sql
   ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 6;
   ```

### Restrict to specific tables (optional)

To limit Data Observability to a subset of tables, grant `SELECT` on each table instead of on the whole database:

```sql
GRANT SELECT ON <DATABASE_NAME>.orders TO datadog@'%';
GRANT SELECT ON <DATABASE_NAME>.users TO datadog@'%';
```

If the `datadog` user also holds the `REFERENCES` privilege on other tables for Database Monitoring schema collection, those tables still appear in Data Observability. Monitors on them fail, because the user can't read their data.

## Configure the MySQL integration

Edit the Agent's `conf.d/mysql.d/conf.yaml` file and add `collect_schemas` and `data_observability` to each MySQL instance you want to track. For a complete list of configuration options, see the [sample mysql.d/conf.yaml][12].

```yaml
init_config:
instances:
  - host: <MYSQL_HOST>
    port: 3306
    username: datadog
    password: '<PASSWORD>'

    ## Populates your tables in Data Observability
    collect_schemas:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

**Note**: If your password includes special characters, wrap it in single quotes.

Schema collection (`collect_schemas`) populates your tables in Data Observability and is disabled by default on MySQL, so set `collect_schemas.enabled: true`. `dbm: true` is **not** required for Data Observability; set it only if you also use [Database Monitoring][3].

[Restart the Agent][9] to apply the changes.

### Validate the configuration

Run the Agent [status command][13] and confirm that the `mysql` check shows a `Total Runs` count greater than zero and a recent `Last Successful Execution` timestamp. On Linux:

```shell
sudo datadog-agent status | grep -A 20 'mysql'
```

Then confirm the Agent is receiving Remote Configuration. The `Remote Configuration` section of the Agent status reports the organization and API key checks directly:

```shell
sudo datadog-agent status | grep -A 10 'Remote Configuration'
```

A healthy Agent reports:

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

The Agent collects schema metadata every 600 seconds by default (`collect_schemas.collection_interval`). After the first collection, you can [view your MySQL tables][14] in the Data Observability catalog.

If your tables do not appear, verify that:

1. The Agent status shows the `mysql` check reporting successfully.
2. `collect_schemas.enabled: true` is set on the instance.
3. The `datadog` user has `SELECT` privileges on the target tables. Test with:

   ```shell
   mysql -h <MYSQL_HOST> -u datadog -p -e 'SELECT 1 FROM <DATABASE_NAME>.orders LIMIT 1'
   ```

4. A Datadog representative has enabled Preview access for your organization.

## Create data quality monitors

After your tables appear in the catalog, you can [create Data Observability monitors][15] on them. On MySQL, you can create:

- **Row count**: Alert on volume fluctuations, such as sudden drops or plateauing trends.
- **Column-level metrics**: Monitor column attributes such as null ratios, cardinalities, or distribution shifts.
- **Custom SQL**: Alert on any `SELECT` query. The query must return exactly one numeric value aliased as `dd_value`.

Table freshness monitors are not available for MySQL tables. To track freshness, create a freshness monitor on a datetime column.

Monitors run on the schedule you set in [Monitor schedule][16]. Monitors set to {{< ui >}}Manual{{< /ui >}} don't run on MySQL, so select {{< ui >}}Scheduled{{< /ui >}}. Keep `SELECT` privileges in place for the `datadog` user on all referenced tables. Monitors fail if access is revoked.

A monitor that has not received a result yet shows {{< ui >}}No data yet{{< /ui >}}. Monitor queries run only while the Agent is running, so if the Agent stops, your monitors record no values until it restarts. If a monitor reports no data, check that:

- The Agent is running and the `mysql` check reports successfully.
- `data_observability.enabled: true` is set on the instance that connects to the monitored database.
- [Remote Configuration](#enable-remote-configuration) is enabled for your organization, for the Agent's API key, and on the Agent itself.

## Known limitations

Data Observability lists MySQL tables from instances where `dbm` and `collect_schemas` are enabled, including instances that do not have `data_observability.enabled: true`. Monitors on tables from those instances have no data. To fix this, add `data_observability.enabled: true` to the instance and grant the `SELECT` privileges in [Set up the Datadog database user](#set-up-the-datadog-database-user).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /data_observability/quality_monitoring/data_warehouses/
[3]: /database_monitoring/setup_mysql/
[4]: /remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /account_management/rbac/permissions/#permissions-list
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /agent/configuration/agent-configuration-files/#main-configuration-file
[9]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /agent/guide/setup_remote_config/#agent-remote-configuration-status
[11]: /database_monitoring/setup_mysql/selfhosted/#grant-the-agent-access
[12]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[13]: /agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/data-obs/catalog
[15]: /monitors/types/data_observability/
[16]: /monitors/types/data_observability/#monitor-schedule
