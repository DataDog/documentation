### One agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the Postgres integration config.
In these cases, it is recommended to limit to the number of instances per Agent to a maximum of 10 database instances.
```yaml
init_config:
instances:
  - dbm: true
    host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:product-recommendation'
  - dbm: true
    host: products–replica-1.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:product-recommendation'
  - dbm: true
    host: products–replica-2.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:product-recommendation'
    [...]
```

### Running custom queries
To collect custom metrics, use the `custom_queries` option. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    custom_queries:
    - metric_prefix: employee
      query: SELECT age, salary, hours_worked, name FROM hr.employees;
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

### Monitoring multiple databases with DBM and the default integration
To specify the name of the database to connect to, use `dbname`. If omitted, the default system `postgres` database is queried.

```yaml
init_config:
instances:
  - dbm: true
    host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
  - host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: on_sale
  - host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: inventory
```

### Working with hosts through a remote proxy
When connecting to a database host through a remote proxy, it can be useful to set a custom hostname. Utilize the `reported_hostname` option to override the hostname detected by the agent.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5000
    username: datadog
    password: '<PASSWORD>'
    reported_hostname: products-primary
  - dbm: true
    host: localhost
    port: 5001
    username: datadog
    password: '<PASSWORD>'
    reported_hostname: products-replica-1
```