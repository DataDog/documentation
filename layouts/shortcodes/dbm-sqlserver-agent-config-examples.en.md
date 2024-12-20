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
        driver: '{ODBC Driver 18 for SQL Server}' # This is the section header of odbcinst.ini
        dsn: 'datadog' # This is the section header of odbc.ini
    ```
5. Restart the Agent.

### Using AlwaysOn

**Note: For AlwaysOn users, the Agent must be installed on a separate server and connected to the cluster through the listener endpoint**. This is because information about Availability Group (AG) secondary replicas is collected from the primary replica. Additionally, installing the Agent in this way helps to keep it up and running in the event of a failover.

```yaml
instances:
  - dbm: true
    host: 'shopist-prod,1433'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    include_ao_metrics: true  # If Availability Groups is enabled
    include_fci_metrics: true   # If Failover Clustering is enabled
```

### Monitoring SQL Server Agent Jobs

**Note: For monitoring SQL Server Agent jobs, the Datadog Agent must have access to the [msdb] database**. Monitoring of SQL Server Agent jobs is supported on SQL Server versions 2016 and newer.
Starting from Agent v7.57, the Datadog Agent can collect SQL Server Agent job metrics and histories. To enable this feature, set `enabled` to `true` in the `agent_jobs` section of the SQL Server integration configuration file. The `collection_interval` and `history_row_limit` fields are optional.

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
Starting from Agent v7.56, the Datadog Agent can collect schema information from SQLServer databases running SQLServer 2017 or higher. To enable this feature, use the `schemas_collection` option. Schemas are collected on databases for which the Agent has `CONNECT` access.

**Note: For schema collection on RDS instances, it is necessary to grant explicit `CONNECT` access to the `datadog` user for each database on the instance. See [Grant the Agent access](https://docs.datadoghq.com/database_monitoring/setup_sql_server/rds/?tab=windowshost#grant-the-agent-access) for more details.**

Use the `database_autodiscovery` option to avoid specifying each logical database. See the sample [sqlserver.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example) for more details.

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
    schemas_collection:
      enabled: true
    # Optional: enable metric collection for indexes
    database_metrics:
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
    schemas_collection:
      enabled: true
    database_metrics:
      index_usage_metrics:
        enabled: true
```

### One Agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the SQL Server integration config.
In these cases, Datadog recommends limiting the number of instances per Agent to a maximum of 10 database instances to guarantee reliable performance.
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
To collect custom metrics, use the `custom_queries` option. See the sample [sqlserver.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example) for more details.
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
