---
title: Setting Up the Datadog Agent for Postgres Database Monitoring
description: Configure the Datadog Agent for Postgres Database Monitoring 
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
---

Your Postgres database should now be ready for monitoring. If you haven't set it up yet, go to the [Postgres Setup Page](/database_monitoring/setup_postgres/) and follow the steps for your hosting type.

1. [Base Configuration](#base-configuration)
1. [AWS Managed Database](#aws-managed-database)
1. [Google Cloud SQL / AlloyDB Managed Database](#google-cloud-sql--alloydb-managed-database)
1. [Azure Managed Database](#azure-managed-database)

## Host Agent

This will help you setup the Standard Host Agent to collection DBM Data from your Postgres Database instance. If you are using a containerized agent, follow our Docker or Kubernetes Setup instructions.

### Base Configuration

Edit the Agent's `conf.d/postgres.d/conf.yaml` file to point to the Postgres instance you want to monitor. For a complete list of configuration options, see the [sample postgres.d/conf.yaml][100]. 

The location of the `postgres.d` directory depends on your operating system. For more information, see [Agent configuration directory][101].

```yaml
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
```

**Note**: If your password includes special characters, wrap it in single quotes.

This would the configuration to start with and should be enough if you are self hosting, if you are using a Cloud Managed Database go through our additional steps below for your Cloud Managed Database.

{{< tabs >}}
{{% tab "AWS Managed Database" %}}
### AWS Managed Database

If you are using AWS RDS or AWS Aurora you should add the addition `aws` key to the [base configuration](#base-configuration), this ensures that we can correlation the [AWS Integration](/integrations/amazon-web-services/) data to your Database instance.

{{< highlight yaml "hl_lines=8-10" >}}
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <INSTANCE_ENDPOINT>
      region: <AWS_REGION>
{{< /highlight >}}

<div class="alert alert-warning"><strong>Important</strong>: For Aurora, please use the individual database instance endpoints, not the cluster endpoint.</div>
{{% /tab %}}

{{% tab "Google Cloud SQL / AlloyDB Managed Database" %}}
### Google Cloud SQL / AlloyDB Managed Database

If you are using Google Cloud SQL you should add the addition `gcp` key to the [base configuration](#base-configuration), this ensures that we can correlation the [GCP Integration](/integrations/google-cloudsql/) and [GCP AlloyDB](/integrations/google-cloud-alloydb/) data to your Database instance.

{{< highlight yaml "hl_lines=8-10" >}}
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: <PROJECT_ID>
      instance_id: <INSTANCE_ID>
{{< /highlight >}}
{{% /tab %}}

{{% tab "Azure Managed Database" %}}
### Azure Managed Database

If you are monitoring a Azure Managed Database you should add the addition `azure` key to the [base configuration](#base-configuration), this ensures that we can correlation the [Azure Integration](/integrations/azure/) data to your Database instance.

{{< highlight yaml "hl_lines=8-11" >}}
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <DATABASE_PORT>
    username: <DATADOG_USER>
    password: 'ENC[datadog_user_database_password]'
    ssl: 'require'
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
{{< /highlight >}}
{{% /tab %}}
{{< /tabs >}}

[100]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[101]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory


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

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][15]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.postgresql.org/docs/12/contrib.html

[2]: /database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /database_monitoring/troubleshooting/?tab=postgres