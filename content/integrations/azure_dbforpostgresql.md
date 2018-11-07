---
title: Azure DB for PostgreSQL
kind: documentation
---

## Overview

Azure App Service is a platform-as-a-service that runs web, mobile, API and business logic applications and automatically manages the resources required by those apps.

Get metrics from Azure App Service to:

* Visualize your app performance
* Correlate the performance of your Azure Apps with the rest of your apps

## Setup
### Installation

If you haven't already, set up the [Microsoft Azure integration first][1]. There are no other installation steps that need to be performed.

## Native Database Integration

You can also choose to turn on the Native Database Integration. This is an Agent level integration used to get detailed Postgres metrics and information from your databases.

In the [Azure portal][2], go to your Azure Database for PostgreSQL server and click *Connection strings*.

{{< img src="integrations/azure/dbformysql.png" alt="RDS console" responsive="true">}}

Note the server URL, port, database name, username, and password. 

Then edit `postgres.yaml` in your conf.d directory:

```yaml
init_config:

instances:
  - host: myurl.database.windows.net
    user: my_username
    pass: my_password
    port: 5432
    dbname: db_name
```

Restart the Agent.

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| **azure.dbforpostgresql_servers.active_connections** <br/> (count) | Total active connections |
| **azure.dbforpostgresql_servers.compute_consumption_percent** <br/> (gauge) | Compute Unit percentage <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.compute_limit** <br/> (count) | Compute Unit limit |
| **azure.dbforpostgresql_servers.connections_failed** <br/> (count) | Total failed connections |
| **azure.dbforpostgresql_servers.cpu_percent** <br/> (gauge) | CPU percent <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.io_consumption_percent** <br/> (gauge) | IO percent <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.memory_percent** <br/> (gauge) | Memory percent <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.storage_limit** <br/> (gauge) | Storage limit <br/> *shown as byte* |
| **azure.dbforpostgresql_servers.storage_percent** <br/> (gauge) | Storage percentage <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.storage_used** <br/> (gauge) | Storage used <br/> *shown as byte* |

[1]: /integrations/azure
[2]: https://portal.azure.com/
