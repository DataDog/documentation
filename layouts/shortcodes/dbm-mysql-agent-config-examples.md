### One agent connecting to multiple hosts
To connect to multiple hosts, create an entry for each host in the MySQL integration config.
```yaml
init_config:
instances:
  - dbm: true
    host: localhost_A
    port: 3306
    username: datadog
    password: '<PASSWORD>'
  - dbm: true
    host: localhost_B
    port: 3306
    username: datadog
    password: '<PASSWORD>'
  - dbm: true
    host: localhost_C
    port: 3306
    username: datadog
    password: '<PASSWORD>'
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
    password: '<PASSWORD>'
    custom_queries:
    - query: SELECT age, salary, name FROM foo;
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