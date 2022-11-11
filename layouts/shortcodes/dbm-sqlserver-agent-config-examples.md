### Connecting with DSN using the ODBC driver
1. Configure the `odbc.ini` file based on your DSN settings.
- Example:
  ```text
  [DATADOG]
  Driver=/opt/microsoft/msodbcsql18/lib64/libmsodbcsql-18.1.so.1.1
  Server=127.0.0.1
  Port=1433
  User=datadog
  Password=Password
  ```
2. Copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.
3. Configure the SQL Server integration config to include the DSN.
- Example:
  ```yaml
  instances:
    - dbm: true
      host: 'localhost,1433'
      username: datadog
      password: '<PASSWORD>'
      connector: 'odbc'
      driver: 'ODBC Driver 18 for SQL Server'
      dsn: 'DATADOG'
  ```
4. Restart the agent.

### Using AlwaysOn
The Agent must be installed on a separate server and connected to the cluster through the listener endpoint, as information about Availability Group (AG) secondary replicas is collected from the primary replica. Additionally, installing the Agent in this way helps keep it up and running in the event of a failover.
```yaml
instances:
  - dbm: true
    host: 'localhost,1433'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    include_ao_metrics: true  # If Availability Groups is enabled
    include_fci_metrics: true   # If Failover Clustering is enabled
```

### One agent connecting to multiple hosts
To connect to multiple hosts, create an entry for each host in the SQL Server integration config.
```yaml
init_config:
instances:
  - dbm: true
    host: 'localhost_A,1433'
    username: datadog
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    password: '<PASSWORD>'
  - dbm: true
    host: 'localhost_B,1434'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
  - dbm: true
    host: 'localhost_C,1435'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
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
    password: '<PASSWORD>'
    custom_queries:
    - metric_prefix: ddprefix
      query: SELECT age, salary, name FROM foo;
      columns:
        - name: foo_age
          type: gauge
        - name: foo_salary
          type: count
        - name: foo_name
          type: tag
      tags:
        - query:custom
```
### Working with hosts through a remote proxy
When connecting to a database host through a remote proxy, it can be useful to set a custom hostname. Utilize the `reported_hostname` option to override the hostname detected by the agent.
```yaml
init_config:
instances:
  - dbm: true
    host: 'localhost,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
    reported_hostname: foo
  - dbm: true
    host: 'localhost,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
    reported_hostname: bar
```