### Connecting with DSN using the ODBC driver on Linux
1. Locate the `odbc.ini` and `odbcinst.ini` files. By default, these are placed in the `/etc` directory when installing ODBC.
2. Copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.
3. Configure your DSN settings as follows:

    `odbcinst.ini` must provide at least one section header and ODBC driver location.

    Example:
    ```text
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql18/lib64/libmsodbcsql-18.3.so.2.1
    UsageCount=1
    ```

    `odbc.ini` must provide a section header and a `Driver` path that matches `odbcinst.ini`.

    Example:
    ```text
    [datadog]
    Driver=/opt/microsoft/msodbcsql18/lib64/libmsodbcsql-18.3.so.2.1
    ```

4. Update the `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml` file with your DSN information.

    Example:
    ```yaml
    instances:
      - dbm: true
        host: 'localhost,1433'
        username: datadog
        password: 'ENC[datadog_user_database_password]'
        connector: 'odbc'
        driver: 'ODBC Driver 18 for SQL Server' # This is the section header of odbcinst.ini
        dsn: 'datadog' # This is the section header of odbc.ini
    ```
5. Restart the Agent.

### Using AlwaysOn

For AlwaysOn users, the Agent should be installed on each replica server and connected directly to each replica. The full set of AlwaysOn telemetry is collected from each individual replica, in addition to host-based telemetry (CPU, disk, memory, and so on) for each server.

```yaml
instances:
  - dbm: true
    host: 'shopist-prod,1433'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    database_metrics:
      # If Availability Groups is enabled
      ao_metrics:
        enabled: true
      # If Failover Clustering is enabled
      fci_metrics:
        enabled: true
```

### Monitoring SQL Server Agent Jobs

<div class="alert alert-info">To enable monitoring of SQL Server Agent jobs, the Datadog Agent must have access to the [msdb] database.</div>

<div class="alert alert-danger">SQL Server Agent Jobs monitoring is not available for Azure SQL Database.</div>

Monitoring of SQL Server Agent jobs is supported on SQL Server versions 2016 and newer. Starting from Agent v7.57, the Datadog Agent can collect SQL Server Agent job metrics and histories. To enable this feature, set `enabled` to `true` in the `agent_jobs` section of the SQL Server integration configuration file. The `collection_interval` and `history_row_limit` fields are optional.

```yaml
instances:
  - dbm: true
    host: 'shopist-prod,1433'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    agent_jobs:
      enabled: true
      collection_interval: 15
      history_row_limit: 10000
```

### Collecting schemas
<div class="alert alert-danger">Datadog Agent v7.56+ and SQL Server 2017 or higher are required for SQL Server schema collection.</div>

To enable this feature, use the `collect_schemas` option. Schemas are collected on databases for which the Agent has `CONNECT` access.

<div class="alert alert-info">To collect schema information from RDS instances, you must grant the <code>datadog</code> user explicit <code>CONNECT</code> access to each database on the instance. For more information, see <a href="/database_monitoring/setup_sql_server/rds/?tab=windowshost#grant-the-agent-access">Grant the Agent access</a>.</div>

Use the `database_autodiscovery` option to avoid specifying each logical database. See the sample [sqlserver.d/conf.yaml][1005] for more details.

```yaml
init_config:
instances:
 # This instance detects every logical database automatically
  - dbm: true
        host: 'shopist-prod,1433'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    database_autodiscovery: true
    collect_schemas:
      enabled: true
    database_metrics:
      # Optional: enable metric collection for indexes
      index_usage_metrics:
        enabled: true
# This instance only collects schemas and index metrics from the `users` database
  - dbm: true
        host: 'shopist-prod,1433'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    database: users
    collect_schemas:
      enabled: true
    database_metrics:
      # Optional: enable metric collection for indexes
      index_usage_metrics:
        enabled: true
```
**Note**: For Agent v7.68 and below, use `schemas_collection` instead of `collect_schemas`.

### One Agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures][1006] for DBM). To connect to multiple hosts, create an entry for each host in the SQL Server integration config.

<div class="alert alert-info">Datadog recommends using one Agent to monitor no more than 30 database instances.<br /><br />Benchmarks show that one Agent running on a t4g.medium EC2 instance (2 CPUs and 4GB of RAM) can successfully monitor 30 RDS db.t3.medium instances (2 CPUs and 4GB of RAM).</div>

```yaml
init_config:
instances:
  - dbm: true
    host: 'example-service-primary.example-host.com,1433'
    username: datadog
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    password: 'ENC[datadog_user_database_password]'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: 'example-service–replica-1.example-host.com,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: 'example-service–replica-2.example-host.com,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
    [...]
```

### Running custom queries
To collect custom metrics, use the `custom_queries` option. See the sample [sqlserver.d/conf.yaml][1005] for more details.
```yaml
init_config:
instances:
  - dbm: true
    host: 'localhost,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    custom_queries:
    - query: SELECT age, salary, hours_worked, name FROM hr.employees;
      columns:
        - name: custom.employee_age
          type: gauge
        - name: custom.employee_salary
           type: gauge
        - name: custom.employee_hours
           type: count
        - name: name
           type: tag
      tags:
        - 'table:employees'
```
### Working with hosts through a remote proxy
If the Agent must connect to a database host through a remote proxy, all telemetry is tagged with the hostname of the proxy rather than the database instance. Use the `reported_hostname` option to set a custom override of the hostname detected by the Agent.
```yaml
init_config:
instances:
  - dbm: true
    host: 'localhost,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    reported_hostname: products-primary
  - dbm: true
    host: 'localhost,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    reported_hostname: products-replica-1
```

### Discovering ports automatically

SQL Server Browser Service, Named Instances, and other services can automatically detect port numbers. You can use this instead of hardcoding port numbers in connection strings. To use the Agent with one of these services, set the `port` field to `0`.

For example, a Named Instance config:

```yaml
init_config:
instances:
  - host: <hostname\instance name>
    port: 0
```

[1005]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[1006]: /database_monitoring/architecture/
