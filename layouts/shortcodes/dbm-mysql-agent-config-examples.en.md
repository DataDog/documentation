### One agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the MySQL integration config.
In these cases, Datadog recommends limiting the number of instances per Agent to a maximum of 10 database instances to guarantee reliable performance.

```yaml
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: example-service-replica-1.example-host.com
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    options:
      replication: true
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: example-service-replica-2.example-host.com
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    options:
      replication: true
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
    [...]
```

### Running custom queries
To collect custom metrics, use the `custom_queries` option. See the sample [mysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example) for more details.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 3306
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
### Working with hosts through a proxy
If the Agent must connect through a proxy such as the [Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/mysql/connect-admin-proxy), all telemetry is tagged with the hostname of the proxy rather than the database instance. Use the `reported_hostname` option to set a custom override of the hostname detected by the Agent.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5000
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    reported_hostname: example-service-primary
  - dbm: true
    host: localhost
    port: 5001
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    reported_hostname: example-service-replica-1
```
