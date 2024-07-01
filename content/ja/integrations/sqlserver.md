---
"app_id": "sql-server"
"app_uuid": "bfa2f276-da05-4153-b8d4-48d4e41f5e40"
"assets":
  "dashboards":
    "SQLServer-AlwaysOn": "assets/dashboards/SQLServer-AlwaysOn_dashboard.json"
    "SQLServer-Overview": "assets/dashboards/SQLServer-Overview_dashboard.json"
    "sqlserver": "assets/dashboards/sqlserver_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "sqlserver.stats.connections"
      "metadata_path": "metadata.csv"
      "prefix": "sqlserver."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "45"
    "source_type_name": "SQL Server"
  "monitors":
    "SQLServer ao not healthy": "assets/monitors/sqlserver_ao_not_healthy.json"
    "SQLServer db not in sync": "assets/monitors/sqlserver_db_not_sync.json"
    "SQLServer db not online": "assets/monitors/sqlserver_db_not_online.json"
    "SQLServer high failed auto param": "assets/monitors/sqlserver_high_number_failed_auto_param.json"
    "SQLServer high processes blocked": "assets/monitors/sqlserver_high_processes_blocked.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "data stores"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sqlserver"
"integration_id": "sql-server"
"integration_title": "SQL Server"
"integration_version": "17.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "sqlserver"
"public_title": "SQL Server"
"short_description": "Collect important SQL Server performance and health metrics."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Collect important SQL Server performance and health metrics."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "SQL Server"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![SQL server Graph][1]

## Overview

The SQL Server integration tracks the performance of your SQL Server instances. It collects metrics for number of user connections, rate of SQL compilations, and more.

Enable [Database Monitoring][2] (DBM) for enhanced insight into query performance and database health. In addition to the standard integration, Datadog DBM provides query-level metrics, live and historical query snapshots, wait event analysis, database load, query explain plans, and blocking query insights.

All editions of SQL Server 2012 and above are supported.

## Setup

<div class="alert alert-info">This page describes the SQL Server Agent standard integration. If you are looking for the Database Monitoring product for SQL Server, see <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog Database Monitoring</a>.</div>

### Installation

The SQL Server check is included in the [Datadog Agent][3] package. No additional installation is necessary on your SQL Server instances.

Make sure that your SQL Server instance supports SQL Server authentication by enabling "SQL Server and Windows Authentication mode" in the server properties:

_Server Properties_ -> _Security_ -> _SQL Server and Windows Authentication mode_

### Prerequisite

**Note**: To install Database Monitoring for SQL Server, select your hosting solution on the [documentation site][4] for instructions.

Supported versions of SQL Server for the SQL Server check are the same as for Database Monitoring. Visit the [Setting up SQL Server page][5] to see the currently supported versions under the **Self-hosted** heading.

Proceed with the following steps in this guide only if you are installing the standard integration alone.

1. Create a read-only login to connect to your server:

    ```SQL
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

   To collect file size metrics per database, ensure the user you created (`datadog`) has [connect permission access][6] to your databases by running:

   ```SQL
       GRANT CONNECT ANY DATABASE to datadog; 
   ```

2. (Required for AlwaysOn and `sys.master_files` metrics) To gather AlwaysOn and `sys.master_files` metrics, grant the following additional permission:

    ```SQL
        GRANT VIEW ANY DEFINITION to datadog;
    ```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `sqlserver.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample sqlserver.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     - host: "<SQL_HOST>,<SQL_PORT>"
       username: datadog
       password: "<YOUR_PASSWORD>"
       connector: odbc # alternative is 'adodbapi'
       driver: SQL Server
   ```

    If you use port autodiscovery, use `0` for `SQL_PORT`. See the [example check configuration][2] for a comprehensive description of all options, including how to use custom queries to create your own metrics.

    **Note**: The (default) provider `SQLOLEDB` is being deprecated. To use the newer `MSOLEDBSQL` provider, set the `adoprovider` variable to `MSOLEDBSQL19` in your `sqlserver.d/conf.yaml` file after having downloaded the new provider from [Microsoft][3]. If you're using `MSOLEDBSQL` version 18 or lower, set the `adoprovider` variable to `MSOLEDBSQL` instead. It is also possible to use the Windows Authentication and not specify the username/password with:

      ```yaml
      connection_string: "Trusted_Connection=yes"
      ```


2. [Restart the Agent][4].

##### Linux

Extra configuration steps are required to get the SQL Server integration running on a Linux host:

1. Install an ODBC SQL Server driver, for example the [Microsoft ODBC driver][5] or the [FreeTDS driver][6].
2. Copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.
3. Configure the `conf.yaml` file to use the `odbc` connector and specify the proper driver as indicated in the `odbcinst.ini` file.

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `sqlserver.d/conf.yaml` file to start collecting your SQL Server logs:

    ```yaml
    logs:
      - type: file
        encoding: utf-16-le
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    Change the `path` and `service` parameter values based on your environment. See the [sample sqlserver.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][4].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[6]: http://www.freetds.org/
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `sqlserver`                                                                                                                      |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%,%%port%%", "username": "datadog", "password": "<UNIQUEPASSWORD>", "connector": "odbc", "driver": "FreeTDS"}` |

See [Autodiscovery template variables][2] for details on passing `<UNIQUEPASSWORD>` as an environment variable instead of a label.

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][3].

| Parameter      | Value                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sqlserver", "service": "sqlserver"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][7] and look for `sqlserver` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "sqlserver" >}}


Most of these metrics come from your SQL Server's `sys.dm_os_performance_counters` table.

### Events

The SQL server check does not include any events.

### Service Checks
{{< get-service-checks-from-git "sqlserver" >}}


## Troubleshooting

Need help? Contact [Datadog support][8].

If you are running the Agent on an ARM aarch64 processor, there is a known issue starting in version 14.0.0 of this check, which is bundled with Agent version 7.48.0. A Python dependency fails to load, and you'll see the following message when running [the Agent's status subcommand][7]:

```
Loading Errors
  ==============
    sqlserver
    ---------
      Core Check Loader:
        Check sqlserver not found in Catalog
      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so
      Python Check Loader:
        unable to import module 'sqlserver': No module named 'sqlserver'
```

This is fixed in version 15.2.0 of the check and in Agent versions 7.49.1 and above.

## Further Reading

- [Monitor your Azure SQL Databases with Datadog][9]
- [Key metrics for SQL Server monitoring][10]
- [SQL Server monitoring tools][11]
- [Monitor SQL Server performance with Datadog][12]
- [Custom SQL Server metrics for detailed monitoring][13]
- [Strategize your Azure migration for SQL workloads with Datadog][14]
- [Optimize SQL Server performance with Datadog Database Monitoring][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard_02_2024.png
[2]: https://docs.datadoghq.com/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/database_monitoring/#sqlserver
[5]: https://docs.datadoghq.com/database_monitoring/setup_sql_server/
[6]: https://docs.microsoft.com/en-us/sql/t-sql/statements/grant-server-permissions-transact-sql?view=sql-server-ver15
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/help/
[9]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[10]: https://www.datadoghq.com/blog/sql-server-monitoring
[11]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[12]: https://www.datadoghq.com/blog/sql-server-performance
[13]: https://www.datadoghq.com/blog/sql-server-metrics
[14]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
[15]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/
