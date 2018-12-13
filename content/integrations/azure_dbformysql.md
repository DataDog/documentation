---
title: Azure DB for MySQL
kind: documentation
---

## Overview

Azure Database for MySQL provides fully managed, enterprise-ready community MySQL database as a service.

Get metrics from Azure Database for MySQL to:

* Visualize your Azure MySQL database performance
* Correlate the performance of your Azure MySQL databases with the rest of your apps

## Setup
### Standard Integration

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

### Native Database Integration

You can also choose to turn on the Native Database Integration. This is an Agent level integration used to get detailed MySQL metrics and information from your databases.

In the [Azure portal][2], go to your Azure Database for MySQL server and click *Connection strings*.

{{< img src="integrations/azure/dbformysql.png" alt="RDS console" responsive="true">}}

Note the server URL, port, username, and password. 

Then edit `mysql.yaml` in your conf.d directory:

```yaml
init_config:

instances:
  - server: myurl.database.windows.net
    user: my_username
    pass: my_password
    port: # port number
```

Restart the Agent.

### Validation

To validate that the native database integration is working, run `sudo /etc/init.d/datadog-agent info`. You should see something like the following:

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

## Metrics

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| **azure.dbformysql_servers.active_connections** <br/> (count) | Total active connections |
| **azure.dbformysql_servers.compute_consumption_percent** <br/> (gauge) | Compute Unit percentage <br/> *shown as percent*|
| **azure.dbformysql_servers.compute_limit** <br/> (count) | Compute Unit limit |
| **azure.dbformysql_servers.connections_failed** <br/> (count) | Total failed connections |
| **azure.dbformysql_servers.cpu_percent** <br/> (gauge) | CPU percent <br/> *shown as percent* |
| **azure.dbformysql_servers.io_consumption_percent** <br/> (gauge) | IO percent <br/> *shown as percent* |
| **azure.dbformysql_servers.memory_percent** <br/> (gauge) | Memory percent <br/> *shown as percent* |
| **azure.dbformysql_servers.storage_limit** <br/> (gauge) | Storage limit <br/> *shown as byte* |
| **azure.dbformysql_servers.storage_percent** <br/> (gauge) | Storage percentage <br/> *shown as percent* |
| **azure.dbformysql_servers.storage_used** <br/> (gauge) |	Storage used <br/> *shown as byte* |


[1]: /integrations/azure
[2]: https://portal.azure.com
