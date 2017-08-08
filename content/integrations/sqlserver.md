---
title: Datadog-SQL Server Integration
integration_title: SQL Server
git_integration_title: sql_server
kind: integration
doclevel: basic
---

{{< img src="integrations/sql_server/sql_server_graph.png" alt="sql server graph" >}}

## Overview

Connect SQL Server to Datadog in order to:

  * Visualize your database performance.
  * Correlate the performance of SQL Server with the rest of your applications.

## Configuration
This integration requires a Datadog Agent version >= 3.2.3

### Prepare SQL Server
1. Make sure that your SQL Server instance supports SQL Server authentication by enabling "SQL Server and Windows Authentication mode" in the server properties. 
**Server Properties** -> **Security** -> **SQL Server and Windows Authentication mode**
{{< img src="integrations/sql_server/setup_auth.png" alt="setup auth" >}}

2. Create a read-only user to connect to your server:
```
CREATE LOGIN datadog WITH PASSWORD = 'YOUR_PASSWORD';
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT on sys.dm_os_performance_counters to datadog;
GRANT VIEW SERVER STATE to datadog;
```

### Connect the Agent
3. Configure the Agent to connect to SQL Server
Edit the "sqlserver" configuration in the Agent Manager and add this server to instances:
{{< highlight yaml >}}
instances:
  -   host: MY_HOST,MY_PORT
      username: datadog
      password: YOUR_PASSWORD
{{< /highlight >}}
Make sure to change the MY_HOST and MY_PORT to your host and port. The default host and port is 127.0.0.1,1433.

4. Restart the Agent using the Agent Manager (or restart the service)

## Validation

Check the info page in the Agent Manager and verify that the integration check has passed. It should display a section similar to the following:
{{< highlight yaml >}}
Checks
======

  [...]

  sqlserver
  ---------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

## Compatibility 

<div class="alert alert-warning">
SQL Server check can only be run from a Windows environment
</div>

## Metrics

{{< get-metrics-from-git >}}


