### One agent connecting to multiple hosts
To connect to multiple hosts, create an entry for each host in the Postgres integration config.
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
    reported_hostname: foo
  - dbm: true
    host: localhost
    port: 5001
    username: datadog
    password: '<PASSWORD>'
    reported_hostname: bar
```