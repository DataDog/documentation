---
title: Setting Up Database Monitoring for self hosted SQL Server
kind: documentation
description: Install and configure Database Monitoring for self-hosted SQL Server.
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "Basic SQL Server Integration"

---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server is in private beta. Contact your Customer Success Manager to request access to the beta.</div>

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user.

Do the following setup steps to enable Database Monitoring with your database:

1. [Configure the database](#configure-sql-server-settings)
2. [Grant the Agent access to the database](#grant-the-agent-access)
3. [Install the Agent](#install-the-agent)

## Before you begin

Supported SQL Server versions
: 2019, 2017, 2016, 2014, 2012

Supported Agent versions
: 7.34.0+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying host and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: Read about how Database Management handles [sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure SQL Server settings

1. In the server properties for your SQL Server instance, navigate to **Server Properties** -> **Security** -> **SQL Server and Windows Authentication mode** and ensure that your SQL Server instance supports SQL Server authentication by enabling `SQL Server and Windows Authentication mode`.


2. Ensure that your SQL Server instance is listening on a specific fixed port. By default, named instances and SQL Server Express are configured for dynamic ports. Read Microsoft's documentation about [TCP/IP Properties][3] for more details.

### Linux installation

Extra configuration steps are required to monitor SQL Server running on a Linux host:

1. Install an ODBC SQL Server driver, for example the [Microsoft ODBC driver][4].
2. Copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

Create a read-only login to connect to your server:

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT on sys.dm_os_performance_counters to datadog;
GRANT VIEW SERVER STATE to datadog;
```

To collect file size metrics per database, ensure the user you created (`datadog`) has [connect permission][5] access to your databases by running:

```SQL
GRANT CONNECT ANY DATABASE to datadog;
```

To collect AlwaysOn and `sys.master_files` metrics, grant the following additional permission:

```SQL
GRANT VIEW ANY DEFINITION to datadog;
```

## Install the Agent

If you haven't already installed the Agent for your SQL Server database host, see the [Agent installation instructions][6].

1. Edit the Agent's `conf.d/sqlserver.d/conf.yaml` file to point to your `host` / `port` and set the hosts to monitor. See the [sample sqlserver.d/conf.yaml][7] for all available configuration options.

   **Windows:**

    ```yaml
    init_config:
    instances:
      - dbm: true
        host: '<SQL_HOST>,<SQL_PORT>'
        username: datadog
        password: '<PASSWORD>'
        connector: odbc  # Alternative is 'adodbapi'
        driver: SQL Server
        tags:  # optional
          - 'service:<CUSTOM_SERVICE>'
          - 'env:<CUSTOM_ENV>'
    ```

   **Linux**:

   For SQL Server installations running on Linux hosts, use the `odbc` connector and specify the proper driver as indicated in the `odbcinst.ini` file.

    ```yaml
    init_config:
    instances:
      - dbm: true
        host: '<SQL_HOST>,<SQL_PORT>'
        username: datadog
        password: '<PASSWORD>'
        connector: odbc
        driver: '<Driver from the `odbcinst.ini` file>'
        tags:  # optional
          - 'service:<CUSTOM_SERVICE>'
          - 'env:<CUSTOM_ENV>'
    ```



   The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][8].

   See the [example check configuration][7] for a comprehensive description of all options, including how to use custom SQL queries to create your own metrics.

   **Note**: The (default) provider `SQLOLEDB` is deprecated and no longer maintained. To use the newer `MSOLEDBSQL` provider, set the `adoprovider` variable to `MSOLEDBSQL` in your `sqlserver.d/conf.yaml` file after having downloaded the new provider from [Microsoft][9]. It is also possible to use the Windows Authentication and not specify the username and password with:

   ```yaml
   connection_string: "Trusted_Connection=yes"
   ```

2. [Restart the Agent][10].


### Collecting logs (optional)

1. Collecting logs is disabled by default in the Datadog Agent. To enable it, set `logs_enabled: true` in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. To start collecting your SQL Server logs, add this configuration block to your `sqlserver.d/conf.yaml` file:

    ```yaml
    logs:
      - type: file
        encoding: utf-16-le
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    Change the `path` parameter value to be the file path of your SQL Server log file. Ensure that the user account running the Datadog Agent can access this file.

    The `service` parameter allows you to tie your logs to other telemetry through a common `service` tag. To learn more about how `service` is used throughout Datadog, read the documentation on [unified service tagging][8].

3. [Restart the Agent][10].


### Validate

[Run the Agent's status subcommand][11] and look for `sqlserver` under the **Checks** section. Or navigate to the [Databases][12] page in Datadog to get started!

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, read about [Troubleshooting Database Monitoring][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/basic_agent_usage#agent-overhead
[2]: /database_monitoring/data_collected/#sensitive-information
[3]: https://docs.microsoft.com/en-us/sql/tools/configuration-manager/tcp-ip-properties-ip-addresses-tab
[4]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[5]: https://docs.microsoft.com/en-us/sql/t-sql/statements/grant-server-permissions-transact-sql?view=sql-server-ver15
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[8]: /getting_started/tagging/unified_service_tagging
[9]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[10]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: /agent/guide/agent-commands/#agent-status-and-information
[12]: https://app.datadoghq.com/databases
[13]: /database_monitoring/troubleshooting/?tab=sqlserver
