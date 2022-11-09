## Example Agent Configurations

### One Agent connecting to multiple hosts
To connect to multiple hosts, create an entry for each host in the integration config.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost_A
    port: 5432
    username: datadog
    password: '<PASSWORD>'
  - dbm: true
    host: localhost_B
    port: 5432
    username: datadog
    password: '<PASSWORD>'
  - dbm: true
    host: localhost_C
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    [...]
```

### Running custom queries
To collect custom metrics, use the `custom_queries` option.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
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

### Monitoring multiple databases 
To specify the name of the database to connect to, use `dbname`. If omitted, the default system `postgres` database is queried. Additionally, configure `dbstrict` to `true` if you only want to gather metrics from the database provided in the `dbname` option.

```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: foo  # Default: `postgres`
    # dbstrict: true 
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    dbname: bar  # Default: `postgres`
    # dbstrict: true 
```