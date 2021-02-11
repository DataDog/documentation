---
title: Connection Issues with the SQL Server Integration
kind: faq
---

## Common SQL Server connection issues

You can configure the Datadog Agent to collect metrics from SQL Server by following the instructions in the [SQL Server integration tile][1] in your account. This integration offers a number of basic [SQL Server metrics][2], which you can expand to [your own liking][3].

But there is a common connection error that users run into while they're setting up this integration, one that can be especially frustrating to troubleshoot since there are many variables that can cause it. In full, the error looks like this:

```text
'Unable to connect to SQL Server for instance 127.0.0.1,1433 - None. \n Traceback (most recent call last):\n File "C:\\Program Files (x86)\\Datadog\\Datadog Agent\\files\\..\\checks.d\\sqlserver.py", line 219, in get_cursor\n File "adodbapi\\adodbapi.pyc", line 116, in connect\nOperationalError: (com_error(-2147352567, \'Exception occurred.\', (0, u\'Microsoft OLE DB Provider for SQL Server\', u\'[DBNETLIB][ConnectionOpen (Connect()).]SQL Server does not exist or access denied.\', None, 0, -2147467259), None), \'Error opening connection to "Provider=SQLOLEDB;Data Source=127.0.0.1,1433;Initial Catalog=master;User ID=datadog;Password=******;"\')\n'
```

As you'll gather from SQL Server does not exist or access denied, this error indicates that the Agent was unable to connect to your SQL Server to complete its data collection. This could be caused by any of the following:

* A typo in your sqlserver.yaml host, port, username, or password (it's all worth triple-checking)
* Your SQL Server's TCP/IP connection has not been enabled
* Your SQL Server's IPv4 address is incorrect or does not match what you've provided in your sqlserver.yaml
* Your SQL Server's TCP/IP port is incorrect or does not match what you've provided in your sqlserver.yaml
* The authentication mode of your SQL Server is not set to the appropriate option between "SQL Server and Windows Authentication mode" vs. "Windows Authentication mode"

If you are unsure of how to set up your server to listen on the correct TCP/IP address/port, [this page][4] from Microsoft should give you some direction (IPv4 and IPALL are the specifically relevant parts; there, you may set your port either as a "Dynamic" or as a "Static" port, but whichever you aren't using should be left blank). If the Agent is installed on the same host as your SQL Server, it may be appropriate to set your sqlserver.yaml's host option to "127.0.0.1", even if the host is not a localhost from your perspective as a user. The standard port for connections to SQL Server is 1433.

If you are unsure how to set your SQL Server's authentication mode, you may find [this page][5] from Microsoft useful.

Do note that any of the above changes that you make to your SQL Server will require that you restart your SQL Server before the changes take effect.

Here's an example of some SQL Server IP/TCP settings that have worked just fine on one of our testing environments (Windows 2012 R2, SQL Server 2014 Express):
{{< img src="integrations/faq/sql_server_test_1.png" alt="sql_server_test_1"  >}}

{{< img src="integrations/faq/sql_server_test_2.png" alt="sql_server_test_2"  >}}

## Empty connection string

Our SQL Server check relies on the adodbapi Python library, which has some limitations in the characters that it is able to use in making a connection string to a SQL Server. If your Agent experiences trouble connecting to your SQL Server, and if you find errors similar to the following in your Agent's collector.logs, your `sqlserver.yaml` probably includes some character that causes issues with adodbapi.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

At the moment, the only character we know of that causes this specific connectivity issue is the "%" character. If you want to use the "%" character in your `sqlserver.yaml` (e.g, if your Datadog SQL Server user password includes a "%"), you will have to escape that character by including a double "%%" in place of each single "%".

## Connecting to SQL Server on a Linux host

In order to connect to SQL Server (either hosted on Linux or Windows) from a Linux host, you first must install the Microsoft ODBC Driver for your Linux distribution by following the instructions on the following page:

https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux

Next, install the pyodbc module. This can be done by running pip install pyodbc within your Agent's python environment. For example:

```shell
$ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
```

Lastly, configure your `sqlserver.yaml` file to define the ODBC driver you installed and enable the ODBC connector.

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

If you are unsure of the driver name to use, you can find it enclosed in brackets at the top of `/etc/odbcinst.ini`.

```text
$ cat /etc/odbcinst.ini
[ODBC Driver 13 for SQL Server]
Description=Microsoft ODBC Driver 13 for SQL Server
Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
UsageCount=1
```

[1]: https://app.datadoghq.com/account/settings#integrations/sql_server
[2]: /integrations/sqlserver/#metrics
[3]: /integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/
[4]: https://msdn.microsoft.com/en-us/library/ms177440.aspx
[5]: https://msdn.microsoft.com/en-us/library/ms144284.aspx
