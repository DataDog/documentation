### One agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the MySQL integration config.
An agent with 4 CPUs and 16GB of RAM can monitor up to 30 databases with the same resources each.

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

### Collecting schemas

Starting from Agent v7.65, the Datadog Agent can collect schema information from MySQL databases. To enable this feature, use the `schemas_collection` option.

**Note**: To collect schemas for a table, MySQL requires that the Datadog Agent has SELECT access for it. This is a [MySQL-enforced restriction](https://dev.mysql.com/doc/refman/8.4/en/information-schema-introduction.html#information-schema-privileges). Without SELECT access, the table will not appear in metadata queries.

The Agent does not use SELECT to access or read your table data. This permission is needed solely to retrieve schema details, due to how MySQL handles metadata visibility.

To grant SELECT permissions to a Datadog user, use one or a combination of the following commands:
- **All databases**:
    ```sql
    GRANT SELECT ON *.* TO datadog@'%';
    ```
- **Per database basis**:
    ```sql
    GRANT SELECT ON [database name].* TO datadog@'%';
    ```
- **Per table basis**:
    ```sql
    GRANT SELECT ON [database name].[table name] TO datadog@'%';
    ```
- **Per column basis**:
    ```sql
    GRANT SELECT ([column name1], [column name 2]) ON [database name].[table name] TO datadog@'%';
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
