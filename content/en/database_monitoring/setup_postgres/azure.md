---
title: Setting Up Database Monitoring for Azure Database for PostgreSQL
kind: documentation
description: Install and configure Database Monitoring for PostgreSQL managed on Azure.
further_reading:
- link: "/integrations/postgres/"
  tag: "Documentation"
  text: "Basic Postgres Integration"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

Database Monitoring provides deep visibility into your Postgres databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your Postgres database:

1. [Configure database parameters](#configure-postgres-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Install the Azure PostgreSQL integration](#install-the-azure-postgresql-integration)

## Before you begin

Supported PostgreSQL versions
: 9.6, 10, 11, 12, 13, 14

Supported Azure PostgreSQL deployment types
: PostgreSQL on Azure VMs, Single Server, Flexible Server

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure Postgres settings

Configure the following [parameters][3] in the [Server parameters][4], then **restart the server** for the settings to take effect.

{{< tabs >}}
{{% tab "Single Server" %}}

| Parameter | Value | Description |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | Required for collection of larger queries. Increases the size of SQL text in `pg_stat_activity` and `pg_stat_statements`. If left at the default value, queries longer than `1024` characters are not collected. |
| `pg_stat_statements.track` | `ALL` | Optional. Enables tracking of statements within stored procedures and functions. |
| `pg_stat_statements.max` | `10000` | Optional. Increases the number of normalized queries tracked in `pg_stat_statements`. This setting is recommended for high-volume databases that see many different types of queries from many different clients. |
| `track_io_timing` | `on` | Optional. Enables collection of block read and write times for queries. |

{{% /tab %}}
{{% tab "Flexible Server" %}}

| Parameter            | Value | Description |
|----------------------| -- | --- |
| `azure.extensions` | `pg_stat_statements` | Required for `postgresql.queries.*` metrics. Enables collection of query metrics using the [pg_stat_statements][1] extension. |
| `track_activity_query_size` | `4096` | Required for collection of larger queries. Increases the size of SQL text in `pg_stat_activity` and `pg_stat_statements`. If left at the default value, queries longer than `1024` characters are not collected. |
| `pg_stat_statements.track` | `ALL` | Optional. Enables tracking of statements within stored procedures and functions. |
| `pg_stat_statements.max` | `10000` | Optional. Increases the number of normalized queries tracked in `pg_stat_statements`. This setting is recommended for high-volume databases that see many different types of queries from many different clients. |
| `track_io_timing` | `on` | Optional. Enables collection of block read and write times for queries. |

[1]: https://www.postgresql.org/docs/current/pgstatstatements.html
{{% /tab %}}
{{< /tabs >}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server in order to collect statistics and queries.

Choose a PostgreSQL database on the database server the Agent to connect to. The Agent can collect telemetry from all databases on the database server regardless of which one it connects to, so a good option is to use the default `postgres` database. Choose a different database only if you need the Agent to run [custom queries against data unique to that database][5].

Connect to the chosen database as a superuser (or another user with sufficient permissions). For example, if your chosen database is `postgres`, connect as the `postgres` user using [psql][6] by running:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Create the `datadog` user:

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Create the following schema **in every database**:

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
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

**Note**: When generating custom metrics that require querying additional tables, you may need to grant the `SELECT` permission on those tables to the `datadog` user. Example: `grant SELECT on <TABLE_NAME> to datadog;`. See  the explanation of [PostgreSQL custom metric collection][5] for more information.

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
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

When it prompts for a password, use the password you entered when you created the `datadog` user.

## Install the Agent

To monitor Azure Postgres databases, install the Datadog Agent in your infrastructure and configure it to connect to each instance endpoint remotely. The Agent does not need to run on the database, it only needs to connect to it. For additional Agent installation methods not mentioned here, see the [Agent installation instructions][7].

{{< tabs >}}
{{% tab "Host" %}}

To configure collecting Database Monitoring metrics for an Agent running on a host, for example when you provision a small virtual machine for the Agent to collect from an Azure database:

1. Edit the `postgres.d/conf.yaml` file to point to your `host` / `port` and set the masters to monitor. See the [sample postgres.d/conf.yaml][1] for all available configuration options.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AZURE_INSTANCE_ENDPOINT>'
       port: 5432
       username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
       password: '<PASSWORD>'
       ssl: true
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
       azure:
        deployment_type: '<DEPLOYMENT_TYPE>'
        name: '<YOUR_INSTANCE_NAME>'
   ```
2. [Restart the Agent][2].

See the [Postgres integration spec][3] for additional information on setting `deployment_type` and `name` fields.

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
{{% /tab %}}
{{% tab "Docker" %}}

To configure the Database Monitoring Agent running in a Docker container, you can set the [Autodiscovery Integration Templates][1] as Docker labels on your agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

### Command line

Execute the following command to run the Agent from your command line. Replace the values to match your account and environment:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
    "password": "<UNIQUEPASSWORD>",
    "ssl": true,
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<YOUR_INSTANCE_NAME>"
    }
  }]' \
  datadog/agent:${DD_AGENT_VERSION}
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Dockerfile

Labels can also be specified in a `Dockerfile`, so you can build and deploy a custom Agent without changing any infrastructure configuration:

```Dockerfile
FROM datadog/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog@<AZURE_INSTANCE_ENDPOINT>","password": "<UNIQUEPASSWORD>", "ssl": true, "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "name": "<YOUR_INSTANCE_NAME>"}}]'
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

See the [Postgres integration spec][2] for additional information on setting `deployment_type` and `name` fields.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][3] and declare the password using the `ENC[]` syntax, or see the [Autodiscovery template variables documentation][4] on how to pass the password in as an environment variable.


[1]: /agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
[3]: /agent/guide/secrets-management
[4]: /agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

Follow the instructions to [enable the cluster checks][2] if not already enabled in your Kubernetes cluster. You can declare the Postgres configuration with static files mounted in the Cluster Agent container, or using service annotations:

### Command line with Helm

Execute the following [Helm][3] command to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterChecksRunner.enabled=true' \
  --set "clusterAgent.confd.postgres\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <AZURE_INSTANCE_ENDPOINT>
    port: 5432
    username: "datadog@<AZURE_INSTANCE_ENDPOINT>"
    password: "<UNIQUEPASSWORD>"
    ssl: true
    azure:
      deployment_type: "<DEPLOYMENT_TYPE>"
      name: "<YOUR_INSTANCE_NAME>" \
  datadog/datadog
```

For Postgres 9.6, add the following settings to the instance config where host and port are specified:

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/postgres.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 5432
    username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
    password: '<PASSWORD>'
    ssl: true
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      name: '<YOUR_INSTANCE_NAME>'

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
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
          "password": "<UNIQUEPASSWORD>",
          "ssl": true,
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "name": "<YOUR_INSTANCE_NAME>"
          }
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

See the [Postgres integration spec][4] for additional information on setting `deployment_type` and `name` fields.

The Cluster Agent automatically registers this configuration and begins running the Postgres check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][5] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/assets/configuration/spec.yaml#L446-L474
[5]: /agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Validate

[Run the Agent's status subcommand][8] and look for `postgres` under the Checks section. Or visit the [Databases][9] page to get started!

## Install the Azure PostgreSQL Integration

To collect more comprehensive database metrics from Azure, install the [Azure PostgreSQL integration][10] (optional).

## Troubleshooting

If you have installed and configured the integrations and Agent as described, and it is not working as expected, see [Troubleshooting][11]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/basic_agent_usage#agent-overhead
[2]: /database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[5]: /integrations/faq/postgres-custom-metric-collection-explained/
[6]: https://www.postgresql.org/docs/current/app-psql.html
[7]: https://app.datadoghq.com/account/settings#agent
[8]: /agent/guide/agent-commands/#agent-status-and-information
[9]: https://app.datadoghq.com/databases
[10]: /integrations/azure_db_for_postgresql/
[11]: /database_monitoring/setup_postgres/troubleshooting/
