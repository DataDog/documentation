### Connecting with DSN using the ODBC driver
1. Configure the `odbc.ini` file based on your DSN settings.

    Example: 
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
  
    Example:
    ```yaml
    instances:
      - dbm: true
        host: 'localhost,1433'
        username: datadog
        password: '<PASSWORD>'
        connector: 'odbc'
        driver: '{ODBC Driver 18 for SQL Server}'
        dsn: 'DATADOG'
    ```
4. Restart the agent.

### Using AlwaysOn
The Agent must be installed on a separate server and connected to the cluster through the listener endpoint.
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
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the SQL Server integration config.
In these cases, it is recommended to limit to the number of instances per Agent to a maximum of 10 database instances.
```yaml
init_config:
instances:
  - dbm: true
    host: 'products-primary.123456789012.us-east-1.rds.amazonaws.com,1433'
    username: datadog
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    password: '<PASSWORD>'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:product-recommendation'
  - dbm: true
    host: 'products–replica-1.us-east-1.rds.amazonaws.com,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:product-recommendation'
  - dbm: true
    host: 'products–replica-2.us-east-1.rds.amazonaws.com,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:product-recommendation'
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
    - query: SELECT age, salary, hours_worked, name FROM hr.employees;
      columns:
        - name: age
          type: gauge
        - name: salary
           type: gauge
        - name: hours
           type: count
        - name: name
           type: tag
      tags:
        - 'table:employees'
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
    reported_hostname: products-primary
  - dbm: true
    host: 'localhost,1433'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    username: datadog
    password: '<PASSWORD>'
    reported_hostname: products-replica-1
```