### One agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the Postgres integration config.
In these cases, Datadog recommends limiting the number of instances per Agent to a maximum of 10 database instances to guarantee reliable performance.
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

### Storing passwords securely
While it is possible to declare passwords directly in the Agent configuration files, it is a more secure practice to encrypt and store database credentials elsewhere using secret management software such as [Vault](https://www.vaultproject.io/). The Agent is able to read these credentials using the `ENC[]` syntax. Review the [secrets management documentation](/agent/guide/secrets-management/) for the required setup to store these credentials. The following example shows how to declare and use those credentials:
```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
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

### Monitoring relation metrics for multiple logical databases
In order to collect relation metrics (such as `postgresql.seq_scans`, `postgresql.dead_rows`, `postgresql.index_rows_read`, and `postgresql.table_size`), the Agent must be configured to connect to each logical database (by default, the Agent only connects to the `postgres` database). 

For version 7.47, specify a single "DBM" instance to collect DBM telemetry from all databases. 
In that instance, define a `database-autodiscovery` block. Set enabled to `True`. Then, specify the logical databases to monitor under the `include` list. Use a regular expression to match the names of the databases: for example, if `inventory` should be monitored, but not `inventory_1`, then specify `inventory$` in the include list. Databases can also be excluded from monitoring under `exclude`. 
If `include` is empty, the Agent will monitor all logical databases on the host. 

The Agent will rediscover databases every 10 minutes by default. This parameter can be changed under the `refresh` configuration option.

By default, the Agent is limited to finding and monitoring 100 databases on the host. This limit can be increased with the `max_databases` parameter, but note that the Agent will have to connect to each database at every collection. This means for hosts with many databases, the time to collect metrics may exceed the default collection interval, and thus the collection interval should also be increased.

When using database autodiscovery, metrics on all tables will be collected for each database specified. For more granular relation monitoring per database, databases must be specified as distinct instances. This is described in [`Advanced Configuration`](/database_monitoring/setup_postgres/advanced_configuration#monitoring-relation-metrics-for-multiple-logical-databases). For Agent versions < 7.47, databases also must be specified as distinct instances.
```yaml
init_config:
instances:
  # This instance is the "DBM" instance. It will connect to the
  # `inventory` and `product` databases, and all databases prefixed by `user`
  # except for `users_deprecated`. It will send DBM telemetry from all databases,
  # but collect relation metrics on only the databases specified by `database_autodiscovery`.
  - dbm: true
    host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    database_autodiscovery:
      enabled: True
      include: 
        - inventory$
        - products$
        - user*
      exclude:
        - users_deprecated$
      refresh:
        - 1000
    dbstrict: true
    relations:
      - relation_regex: .*
        relkind:
          - r
          - i
```

### Working with hosts through a proxy
If the Agent must connect through a proxy such as the [Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/mysql/connect-admin-proxy), all telemetry is tagged with the hostname of the proxy rather than the database instance. Use the `reported_hostname` option to set a custom override of the hostname detected by the Agent.
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
