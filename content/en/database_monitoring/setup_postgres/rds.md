---
title: Setting Up Database Monitoring for Amazon RDS managed Postgres
kind: documentation
description: Install and configure Database Monitoring for Postgres on Amazon RDS.
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
---

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure the AWS integration](#configure-the-aws-integration)
1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14, 15, 16

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure the AWS integration

Enable **Standard Collection** in the **Resource Collection** section of your [Amazon Web Services integration tile][3].

## Configure Postgres settings

Configure the following [parameters][4] in the [DB parameter group][5] and then **restart the server** for the settings to take effect. For more information about these parameters, see the [Postgres documentation][6].

| Parameter | Value | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Required for `postgresql.queries.*` metrics. Enables collection of query metrics using the [pg_stat_statements][6] extension. |
| `track_activity_query_size` | `4096` | Required for collection of larger queries. Increases the size of SQL text in `pg_stat_activity`. If left at the default value then queries longer than `1024` characters will not be collected. |
| `pg_stat_statements.track` | `ALL` | Optional. Enables tracking of statements within stored procedures and functions. |
| `pg_stat_statements.max` | `10000` | Optional. Increases the number of normalized queries tracked in `pg_stat_statements`. This setting is recommended for high-volume databases that see many different types of queries from many different clients. |
| `pg_stat_statements.track_utility` | `off` | Optional. Disables utility commands like PREPARE and EXPLAIN. Setting this value to `off` means only queries like SELECT, UPDATE, and DELETE are tracked. |
| `track_io_timing` | `on` | Optional. Enables collection of block read and write times for queries. |


## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

The following SQL commands should be executed on the **primary** database server (the writer) in the cluster if Postgres is replicated. Choose a PostgreSQL database on the server for the Agent to connect to. The Agent can collect telemetry from all databases on the database server regardless of which one it connects to, so a good option is to use the default `postgres` database. Choose a different database only if you need the Agent to run [custom queries against data unique to that database][7].

Connect to the chosen database as a superuser (or another user with sufficient permissions). For example, if your chosen database is `postgres`, connect as the `postgres` user using [psql][8] by running:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Create the `datadog` user:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Note:** IAM authentication is also supported. Please see [the guide][9] on how to configure this for your RDS instance.

{{< tabs >}}
{{% tab "Postgres ≥ 15" %}}

Give the `datadog` user permission to relevant tables:

```SQL
ALTER ROLE datadog INHERIT;
```

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```
{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Create functions **in every database** to enable the Agent to read the full contents of `pg_stat_activity` and `pg_stat_statements`:

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">For data collection or custom metrics that require querying additional tables, you may need to grant the <code>SELECT</code> permission on those tables to the <code>datadog</code> user. Example: <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. See <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">PostgreSQL custom metric collection</a> for more information. </div>

Create the function **in every database** to enable the Agent to collect explain plans.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```

### Verify

To verify the permissions are correct, run the following commands to confirm the Agent user is able to connect to the database and read the core tables:
{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

When it prompts for a password, use the password you entered when you created the `datadog` user.

## Install the Agent

To monitor RDS hosts, install the Datadog Agent in your infrastructure and configure it to connect to each instance endpoint remotely. The Agent does not need to run on the database, it only needs to connect to it. For additional Agent installation methods not mentioned here, see the [Agent installation instructions][10].

{{< tabs >}}
{{% tab "Host" %}}

To configure collecting Database Monitoring metrics for an Agent running on a host, for example when you provision a small EC2 instance for the Agent to collect from an RDS database:

1. Edit the `postgres.d/conf.yaml` file to point to your `host` / `port` and set the masters to monitor. See the [sample postgres.d/conf.yaml][1] for all available configuration options.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   For Agent versions `≤ 7.49`, add the following setting to the instance config where `host` and `port` are specified:

   ```yaml
   ssl: allow
   ```

   If you want to authenticate with IAM, set the `region` and `instance_endpoint` parameters.

   **Note**: only set the `region` parameter if you want to use IAM authentication. IAM authentication takes precedence over the `password` field.

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   For information on configuring IAM authentication on your RDS instance, see [Connecting with Managed Authentication][3].

2. [Restart the Agent][2].


[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /database_monitoring/guide/managed_authentication
{{% /tab %}}
{{% tab "Docker" %}}

To configure the Database Monitoring Agent running in a Docker container such as in ECS or Fargate, you can set the [Autodiscovery Integration Templates][1] as Docker labels on your agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

### Command line

Get up and running quickly by executing the following command to run the agent from your command line. Replace the values to match your account and environment:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Dockerfile

Labels can also be specified in a `Dockerfile`, so you can build and deploy a custom agent without changing any infrastructure configuration:

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "<UNIQUEPASSWORD>","tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][2] and declare the password using the `ENC[]` syntax, or see the [Autodiscovery template variables documentation][3] to learn how to pass the password as an environment variable.


[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/configuration/secrets-management
[3]: /agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

Follow the instructions to [enable the cluster checks][2] if not already enabled in your Kubernetes cluster. You can declare the Postgres configuration either with static files mounted in the Cluster Agent container or using service annotations:

### Helm

Complete the following steps to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment.

1. Complete the [Datadog Agent installation instructions][3] for Helm.
2. Update your YAML configuration file (`datadog-values.yaml` in the Cluster Agent installation instructions) to include the following:
    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: -|
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <INSTANCE_ADDRESS>
            port: 5432
            username: datadog
            password: '<UNIQUE_PASSWORD>'
            tags:
              - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'

    clusterChecksRunner:
      enabled: true
    ```

    For Postgres 9.6, add the following settings to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

3. Deploy the Agent with the above configuration file from the command line:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site
[3]: /containers/kubernetes/installation/?tab=helm#installation

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: '<PASSWORD>'
    tags:
      - dbinstanceidentifier:<DB_INSTANCE_NAME>
    ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configure with Kubernetes service annotations

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:


```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["postgres"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "tags": [
            "dbinstanceidentifier:<DB_INSTANCE_NAME>"
          ]
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

The Cluster Agent automatically registers this configuration and begin running the Postgres check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][4] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Validate

[Run the Agent's status subcommand][11] and look for `postgres` under the Checks section. Or visit the [Databases][12] page to get started!

## Example Agent Configurations
{{% dbm-postgres-agent-config-examples %}}

## Install the RDS Integration

To see infrastructure metrics from AWS, such as CPU, alongside the database telemetry in DBM, install the [RDS integration][13] (optional).

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][14]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /database_monitoring/data_collected/#sensitive-information
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html
[7]: /integrations/faq/postgres-custom-metric-collection-explained/
[8]: https://www.postgresql.org/docs/current/app-psql.html
[9]: /database_monitoring/guide/managed_authentication
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: /agent/configuration/agent-commands/#agent-status-and-information
[12]: https://app.datadoghq.com/databases
[13]: /integrations/amazon_rds
[14]: /database_monitoring/troubleshooting/?tab=postgres
