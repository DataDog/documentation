### One agent connecting to multiple hosts
It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the MySQL integration config.

<div class="alert alert-info">Datadog recommends using one Agent to monitor no more than 30 database instances.<br /><br />Benchmarks show that one Agent running on a t4g.medium EC2 instance (2 CPUs and 4GB of RAM) can successfully monitor 30 RDS db.t3.medium instances (2 CPUs and 4GB of RAM).</div>

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

<div class="alert alert-danger">Datadog Agent v7.65+ is required for MySQL schema collection.</div>

To enable this feature, use the `collect_schemas` option. See the sample [mysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example) for more details.

```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    collect_schemas:
      enabled: true
```
**Note**: For Agent v7.68 and below, use `schemas_collection` instead of `collect_schemas`.

**Note**: To collect schemas for a table, MySQL requires that the Datadog Agent holds a privilege on that table. This is a [MySQL-enforced restriction](https://dev.mysql.com/doc/refman/8.4/en/information-schema-introduction.html#information-schema-privileges): a table that the Agent has no privilege on does not appear in metadata queries at all.

Datadog recommends granting the `REFERENCES` privilege. It satisfies MySQL's metadata visibility requirement without granting any ability to read the contents of your tables. The Agent never reads your table data; it only needs your tables to be visible in `INFORMATION_SCHEMA`.

Use one or a combination of the following commands:
- **All databases** (recommended, since databases and tables created later are picked up automatically):
    ```sql
    GRANT REFERENCES ON *.* TO datadog@'%';
    ```
- **Per database basis**:
    ```sql
    GRANT REFERENCES ON [database name].* TO datadog@'%';
    ```
- **Per table basis**:
    ```sql
    GRANT REFERENCES ON [database name].[table name] TO datadog@'%';
    ```

**Note**: Explain plan collection relies on the `explain_statement` procedure being present in each schema you collect from, as described in the setup instructions for your hosting type. With `REFERENCES` in place of `SELECT`, the Agent can no longer run `EXPLAIN` directly as a fallback, so create the procedure in every schema you want explain plans from.

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
