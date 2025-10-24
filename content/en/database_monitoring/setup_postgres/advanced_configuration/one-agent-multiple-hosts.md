## Example Agent Configurations

{{< tabs >}}
{{% tab "AWS Managed Database" %}}
### One agent connecting to multiple hosts

It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the Postgres integration config.

<div class="alert alert-info">Datadog recommends using one Agent to monitor no more than 30 database instances.<br /><br />Benchmarks show that one Agent running on a t4g.medium EC2 instance (2 CPUs and 4GB of RAM) can successfully monitor 30 RDS db.t3.medium instances (2 CPUs and 4GB of RAM).</div>

{{< highlight yaml "hl_lines=15-39" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: example-service–replica-1.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service–replica-1.example-host.com
      region: us-east-1
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: example-service–replica-2.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service–replica-2.example-host.com
      region: us-east-1
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
    [...]
{{< /highlight >}}

### Monitoring multiple logical databases on a database host
Use the `database_autodiscovery` option to permit the Agent to discover all logical databases on your database instance. You can specify `include` or `exclude` fields to narrow the scope of logical databases discovered. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.

{{< highlight yaml "hl_lines=8-14" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    database_autodiscovery:
      enabled: true
      # Optionally, set the include field to specify
      # a set of databases you are interested in discovering
      include:
        - mydb.*
        - example.*
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
{{< /highlight >}}

### Running custom queries
To collect custom metrics, use the `custom_queries` option. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.
The example below will submit three different metrics: `employee.custom.employee_age`,  `employee.custom.employee_salary` and  `employee.custom.employee_hours` with the additional tag `name`.

{{< highlight yaml "hl_lines=11-22" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
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
{{< /highlight >}}

### Monitoring relation metrics for multiple logical databases
In order to collect relation metrics (such as `postgresql.seq_scans`, `postgresql.dead_rows`, `postgresql.index_rows_read`, and `postgresql.table_size`), the Agent must be configured to connect to each logical database (by default, the Agent only connects to the `postgres` database).

Specify a single "DBM" instance to collect DBM telemetry from all logical databases. Use the [database_autodiscovery](#monitoring-multiple-logical-databases-on-a-database-host) option to avoid specifying each database name.

{{< highlight yaml "hl_lines=18-19 29-35 45-49" >}}
init_config:
instances:
  # This instance is the "DBM" instance. It will connect to the
  # all logical databases, and send DBM telemetry from all databases
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    database_autodiscovery:
      enabled: true
      exclude:
        - ^users$
        - ^inventory$
    relations:
      - relation_regex: .*
  # This instance only collects data from the `users` database
  # and collects relation metrics from tables prefixed by "2022_"
  - host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    dbname: users
    dbstrict: true
    relations:
      - relation_regex: 2022_.*
        relkind:
          - r
          - i
  # This instance only collects data from the `inventory` database
  # and collects relation metrics only from the specified tables
  - host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    dbname: inventory
    dbstrict: true
    relations:
      - relation_name: products
      - relation_name: external_seller_products
{{< /highlight >}}

### Collecting schemas
To enable this feature, use the `collect_schemas` option. You must also [configure the Agent to connect to each logical database](#monitoring-relation-metrics-for-multiple-databases).

Use the `database_autodiscovery` option to avoid specifying each logical database. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.

{{< highlight yaml "hl_lines=15-16 32-33" >}}
init_config:
# This instance only collects data from the `users` database
# and collects relation metrics only from the specified tables
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    dbname: users
    dbstrict: true
    collect_schemas:
      enabled: true
    relations:
      - products
      - external_seller_products
  # This instance detects every logical database automatically
  # and collects relation metrics from every table
  - dbm: true
    host: example-service–replica-1.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    database_autodiscovery:
      enabled: true
    collect_schemas:
      enabled: true
    relations:
      - relation_regex: .*
{{< /highlight >}}

### Working with hosts through a proxy
If the Agent must connect through a proxy such as the [Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/mysql/connect-admin-proxy), all telemetry is tagged with the hostname of the proxy rather than the database instance. Use the `reported_hostname` option to set a custom override of the hostname detected by the Agent.

{{< highlight yaml "hl_lines=11 20" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.proxy
    port: 5000
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    reported_hostname: example-service-primary
  - dbm: true
    host: example-service-replica-1.proxy
    port: 5001
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-replica-1.example-host.com
      region: us-east-1
    reported_hostname: example-service-replica-1
{{< /highlight >}}
{{% /tab %}}

{{% tab "Google Cloud SQL / AlloyDB Managed Database" %}}
### One agent connecting to multiple hosts

It is common to configure a single Agent host to connect to multiple remote database instances (see [Agent installation architectures](/database_monitoring/architecture/) for DBM). To connect to multiple hosts, create an entry for each host in the Postgres integration config.

{{< highlight yaml "hl_lines=15-39" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: example-service–replica-1.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
  - dbm: true
    host: example-service–replica-2.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
    [...]
{{< /highlight >}}

### Monitoring multiple logical databases on a database host
Use the `database_autodiscovery` option to permit the Agent to discover all logical databases on your database instance. You can specify `include` or `exclude` fields to narrow the scope of logical databases discovered. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.

{{< highlight yaml "hl_lines=8-14" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    database_autodiscovery:
      enabled: true
      # Optionally, set the include field to specify
      # a set of databases you are interested in discovering
      include:
        - mydb.*
        - example.*
    gcp:
      project_id: foo-project
      instance_id: foo-database
    tags:
      - 'env:prod'
      - 'team:team-discovery'
      - 'service:example-service'
{{< /highlight >}}

### Running custom queries
To collect custom metrics, use the `custom_queries` option. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.
The example below will submit three different metrics: `employee.custom.employee_age`,  `employee.custom.employee_salary` and  `employee.custom.employee_hours` with the additional tag `name`.

{{< highlight yaml "hl_lines=11-22" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
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
{{< /highlight >}}

### Monitoring relation metrics for multiple logical databases
In order to collect relation metrics (such as `postgresql.seq_scans`, `postgresql.dead_rows`, `postgresql.index_rows_read`, and `postgresql.table_size`), the Agent must be configured to connect to each logical database (by default, the Agent only connects to the `postgres` database).

Specify a single "DBM" instance to collect DBM telemetry from all logical databases. Use the [database_autodiscovery](#monitoring-multiple-logical-databases-on-a-database-host) option to avoid specifying each database name.

{{< highlight yaml "hl_lines=18-19 29-35 45-49" >}}
init_config:
instances:
  # This instance is the "DBM" instance. It will connect to the
  # all logical databases, and send DBM telemetry from all databases
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: example-service-primary.example-host.com
      region: us-east-1
    database_autodiscovery:
      enabled: true
      exclude:
        - ^users$
        - ^inventory$
    relations:
      - relation_regex: .*
  # This instance only collects data from the `users` database
  # and collects relation metrics from tables prefixed by "2022_"
  - host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    dbname: users
    dbstrict: true
    relations:
      - relation_regex: 2022_.*
        relkind:
          - r
          - i
  # This instance only collects data from the `inventory` database
  # and collects relation metrics only from the specified tables
  - host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    dbname: inventory
    dbstrict: true
    relations:
      - relation_name: products
      - relation_name: external_seller_products
{{< /highlight >}}

### Collecting schemas
To enable this feature, use the `collect_schemas` option. You must also [configure the Agent to connect to each logical database](#monitoring-relation-metrics-for-multiple-databases).

Use the `database_autodiscovery` option to avoid specifying each logical database. See the sample [postgres.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example) for more details.

{{< highlight yaml "hl_lines=15-16 32-33" >}}
init_config:
# This instance only collects data from the `users` database
# and collects relation metrics only from the specified tables
instances:
  - dbm: true
    host: example-service-primary.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    dbname: users
    dbstrict: true
    collect_schemas:
      enabled: true
    relations:
      - products
      - external_seller_products
  # This instance detects every logical database automatically
  # and collects relation metrics from every table
  - dbm: true
    host: example-service–replica-1.example-host.com
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    database_autodiscovery:
      enabled: true
    collect_schemas:
      enabled: true
    relations:
      - relation_regex: .*
{{< /highlight >}}

### Working with hosts through a proxy
If the Agent must connect through a proxy such as the [Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/mysql/connect-admin-proxy), all telemetry is tagged with the hostname of the proxy rather than the database instance. Use the `reported_hostname` option to set a custom override of the hostname detected by the Agent.

{{< highlight yaml "hl_lines=11 20" >}}
init_config:
instances:
  - dbm: true
    host: example-service-primary.proxy
    port: 5000
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    reported_hostname: example-service-primary
  - dbm: true
    host: example-service-replica-1.proxy
    port: 5001
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: foo-project
      instance_id: foo-database
    reported_hostname: example-service-replica-1
{{< /highlight >}}
{{% /tab %}}

{{% tab "Azure Managed Database" %}}
### Azure Managed Database

If you are monitoring a Azure Managed Database you should add the addition `azure` key to the [base configuration](#base-configuration), this ensures that we can correlation the [Azure Integration](/integrations/azure/) data to your Database instance.

{{% /tab %}}
{{< /tabs >}}

