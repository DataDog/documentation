```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle DB service name
    username: 'datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle DB service name
    username: 'datadog'
    password: '<PASSWORD>'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```