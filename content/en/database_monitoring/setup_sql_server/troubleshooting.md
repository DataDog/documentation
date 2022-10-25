---
title: Troubleshooting DBM Setup for SQL Server
kind: documentation
description: Troubleshoot Database Monitoring setup for SQL Server
---

This page details common issues with setting up and using Database Monitoring with SQL Server, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with Agent version releases.

## Diagnosing common connection issues

### SQL Server unable to connect 'Login Failed for user'

There are two ways that the agent can connect to a SQL Server instance:

1. [Windows Authentication][2] (only available on Windows hosts)

2. [SQL Server Authentication][3]

Windows authentication is the default authentication mode, and is more secure than SQL Server Auth. By using Windows Authentication, Windows groups can be created at the domain level, and a login can be created on SQL Server for the entire group. In order to use windows authentication you should:

1. Use the service account created at time of [agent install][4], and make sure this account has the proper access to SQL Server.

2. Set `connection_string: "Trusted_Connection=yes"` and omit the `username` and `password` fields. The `Trusted_Connection=yes` connection attribute instructs the OLE DB Driver for SQL Server to use Windows Authentication for login validation.

SQL Server authentication is not based on Windows user accounts, and are instead created in the instance and stored in SQL Server itself. SQL auth requires setting the `username` and `password` in the SQL Server instance config to connect.

If you are getting a login error connecting, it is important to verify you can log into the instance as the datadog agent user first. An easy way to do this is via a cmd line utility such as `sqlcmd`.

For example:

```bash
# this example uses SQL Authentication
sqlcmd -S <INSTANCE_ENDPOINT> -U datadog -P <DATADOG_PASSWORD> -d master

# this example uses Windows Authentication
# Run this command in powershell via selecting the `run as user...` option to run as the ddagentuser
sqlcmd -S <INSTANCE_ENDPOINT> -d master -E
```

If the `datadog` user is unable to log into the SQL Server instance, please ensure the user has been created and given the proper permissions according the [setup documentation][1].

Microsoft also provides a helpful doc on troubleshooting these types of errors, which can be [followed here][5].

### SQL Server Unable to connect due to “Invalid connection string attribute”

The following ADO Providers are supported on Windows: `SQLOLEDB`, `MSOLEDBSQL`, `MSOLEDBSQL19`, `SQLNCLI11`.

The `SQLOLEDB` and `SQLNCLI11` providers produce a particularly uninformative error message, `Invalid connection string attribute`. For example:

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

This same error is produced regardless of failure reason (unknown hostname, could not establish TCP connection, invalid login credentials, unknown database).

Look in the error message for HResult error codes. Here are some known codes:

`-2147217843` — **“login failed for user”**: this means the agent succeeded in establishing a connection to the host but the login was rejected for some reason.

To troubleshoot:

1. Check the agent’s login credentials

2. Try to login with those credentials manually using sqlcmd. For example: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

`-2147467259` — **“could not open database requested for login”**: this error appears either due to network issues or due to an unknown database. To troubleshoot:

To troubleshoot:

1. Check the TCP connection from the agent to the host by running `telnet {host} {port}` to make sure there is network connectivity from the Agent to the database.

2. Try to login manually using sqlcmd and see if there’s an issue with the configured database. For example: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

If neither step produces meaningful help, or the error code you are seeing is not listed, Datadog recommends to use the `MSOLEDBSQL` driver or the `Microsoft ODBC Driver for SQL Server`. Either of these options will produce more meaningful error messages, which should help troubleshooting why the connection is failing.

### SSL Provider: The certificate chain was issued by an authority that is not trusted

This error is common after upgrading to the latest [MSOLEDBSQL][6] driver due to [breaking changes][7] that were introduced. In the latest version of the driver, all connections to the SQL instance are encrypted by default.

If you are using the latest version of the Microsoft OLE DB Driver for SQL Server, and trying to connect to a SQL Server instance which requires encrypted connections, you can use the following workarounds:

1. If you are using a self-signed certificate and the Force Encryption setting on the server (`rds.force_ssl=1` on AWS) to ensure clients connect with encryption:

   - Change to a certificate that is trusted as part of the client's trust chain
   - Add the self-signed certificate as a trusted certificate on the client
   - Add `TrustServerCertificate=yes;` to the connection string

This is described in more detail [in the Microsoft documentation][7]

2. If your SQL Server instance does not require encryption to connect (`rds.force_ssl=0` on AWS), then update the connection string to include `Use Encryption for Data=False;`. For example:

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. Install the [2018 version of the MSOLEDBSQL driver][8], which does not use encryption by default. After installing the driver, update the `adoprovider` to `MSOLEDBSQL`. For example:

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

If you are using a driver **other than `MSOLEDBSQL` 2019**, this error can be resolved by setting `TrustServerCertificate=yes` in the connection string. For example, for the 2017 `ODBC` driver:

  ```yaml
  # this example uses SQL Server authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      username: datadog
      password: <DD_AGENT_PASSWORD>
      connection_string: "TrustServerCertificate=yes;"
      connector: odbc
      driver: '{ODBC Driver 17 for SQL Server}'
  ```

### SQL Server unable to connect 'SSL Security error (18)'

This is a known issue for older versions of the SQL Server ODBC driver. You can check which version of the driver is being used by the agent by looking at the connection string in the error message.

For example, if you see `Provider=SQL Server` in the connection string of the error message, upgrading to a newer version of the ODBC driver will fix the error.

This issue is described in more detail in this [Microsoft blog post][9]


### SQL Server 'Unable to connect: Adaptive Server is unavailable or does not exist'

This error can sometimes just be the result of not properly setting the `host` field. For the integration, you should the `host` field with the following syntax: `host:server,port`.

For example:

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
Should be set as:
```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### Empty connection string

Datadog's SQL Server check relies on the adodbapi Python library, which has some limitations in the characters that it is able to use in making a connection string to a SQL Server. If your Agent experiences trouble connecting to your SQL Server, and if you find errors similar to the following in your Agent's collector.logs, your `sqlserver.yaml` probably includes some character that causes issues with adodbapi.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

At the moment, the only character known to cause this specific connectivity issue is the `%` character. If you want to use the "%" character in your `sqlserver.yaml`, that is if your Datadog SQL Server user password includes a `%`), you need to escape that character by including a double `%%` in place of each single `%`.

### Connecting to SQL Server on a Linux host

To connect SQL Server (either hosted on Linux or Windows) to a Linux host:

1. Install the [Microsoft ODBC Driver][10] for your Linux distribution.
   If you are unsure of the driver name to use, you can find it enclosed in brackets at the top of `/etc/odbcinst.ini`.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. Copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.
3. If needed, install the pyodbc module. This can be done by running pip install pyodbc within your Agent's python environment. For example:

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. Configure your SQL Server `conf.yaml` to use the odbc connector and specify the proper driver as indicated in the `odbcinst.ini` file.

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: ODBC Driver 13 for SQL Server
        username: <USERNAME>
        password: <PASSWORD>
    ```

## Other common questions

### SQL Server user tag is missing on the Query Metrics page

The `user` tag has been removed from all SQL Server metric telemetry.

The `user` tag was previously incorrect and did not reflect the user who executed the query in the Query Metrics UI. This is due to a technical limitation in the tables that we are querying in SQL Server for this data.

### Why are there so many “CREATE PROCEDURE” queries?

In versions of the agent older than 7.40.0, there exists a bug where `PROCEDURE` statistics are over counted. This leads to seeing many executions of `CREATE PROCEDURE...` in the database-monitoring Query Metrics UI. In order to fix this issue, please upgrade to the latest version of the Datadog agent.

[1]: /database_monitoring/setup_sql_server/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-windows-authentication
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-sql-server-authentication
[4]: https://docs.datadoghq.com/agent/guide/windows-agent-ddagent-user/#installation
[5]: https://learn.microsoft.com/en-us/troubleshoot/sql/connect/login-failed-for-user
[6]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16#3-microsoft-ole-db-driver-for-sql-server-msoledbsql
[7]: https://techcommunity.microsoft.com/t5/sql-server-blog/ole-db-driver-19-0-for-sql-server-released/ba-p/3170362
[8]: https://learn.microsoft.com/en-us/sql/connect/oledb/release-notes-for-oledb-driver-for-sql-server?view=sql-server-ver16#1863
[9]: https://community.hostek.com/t/ssl-security-error-for-microsoft-sql-driver/348
[10]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
