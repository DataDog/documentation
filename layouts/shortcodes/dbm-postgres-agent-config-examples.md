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

Specify a single "DBM" instance to collect DBM telemetry from all databases. Additionally, specify all logical databases the Agent must connect to. It is important to only have `dbm: true` on one configuration instance per host in order to prevent duplication of metrics.
```yaml
init_config:
instances:
  # This instance is the "DBM" instance. It will connect to the
  # `postgres` database and send DBM telemetry from all databases
  - dbm: true
    host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
  # This instance only collects data from the `on_sale` database
  # and collects relation metrics from tables prefixed by "2022_"
  - host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: on_sale
    dbstrict: true
    relations:
      - relation_regex: 2022_.*
        relkind:
          - r
          - i
  # This instance only collects data from the `inventory` database
  # and collects relation metrics only from the specified tables
  - host: products-primary.123456789012.us-east-1.rds.amazonaws.com
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: inventory
    dbstrict: true
    relations:
      - relation_name: products
      - relation_name: external_seller_products
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
